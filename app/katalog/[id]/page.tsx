import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { DashedRule } from "@/components/DashedRule";
import { ProductOptions, type SizeOption } from "./ProductOptions";
import { PhotoGallery } from "./PhotoGallery";
import type { Product } from "@/lib/supabase/types";

const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});

type ProductWithCategory = Product & {
  category: { name: string; is_color_customizable: boolean } | null;
};

type Params = Promise<{ id: string }>;

// Detail produk (harga, ukuran, foto) bisa berubah kapan saja lewat Supabase —
// render per request, jangan pakai hasil build lama.
export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { id } = await params;
  const { data } = await supabase.from("products").select("name").eq("id", id).single();
  return { title: data ? `${data.name} — SS Strap` : "Produk — SS Strap" };
}

export default async function ProductDetailPage({ params }: { params: Params }) {
  const { id } = await params;

  const [{ data: productData }, { data: allSizes }, { data: productSizes }, { data: stitchStyles }] =
    await Promise.all([
      supabase
        .from("products")
        .select("*, category:categories(name, is_color_customizable)")
        .eq("id", id)
        .single(),
      supabase.from("sizes").select("*").order("size_mm"),
      supabase.from("product_sizes").select("*").eq("product_id", id),
      supabase.from("stitch_styles").select("*").order("sort_order"),
    ]);

  if (!productData) notFound();

  const product = productData as ProductWithCategory;

  const sizeOptions: SizeOption[] = (allSizes ?? []).map((size) => {
    const match = productSizes?.find((ps) => ps.size_mm === size.size_mm);
    return {
      size_mm: size.size_mm,
      is_available: match?.is_available ?? false,
      price_override: match?.price_override ?? null,
    };
  });

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-16 sm:px-10">
      <Link href="/katalog" className="text-sm text-parchment-dim hover:text-parchment">
        ← Katalog
      </Link>

      <div className="mt-6 grid grid-cols-1 gap-10 sm:grid-cols-2">
        <PhotoGallery photos={product.photos} productName={product.name} />

        <div>
          {product.category?.name ? (
            <p className="font-mono text-xs tracking-wide text-parchment-dim uppercase">
              {product.category.name}
            </p>
          ) : null}
          <h1 className="mt-1 font-display text-3xl text-parchment">{product.name}</h1>
          <p className="mt-2 font-mono text-xl text-brass">{rupiah.format(product.price)}</p>

          {product.category?.is_color_customizable ? (
            <div className="mt-4 flex flex-col items-start gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-bg px-3 py-1 text-xs font-medium text-indigo-text">
                🎨 Custom warna tersedia
              </span>
              <p className="rounded-md bg-indigo-bg px-4 py-3 text-sm text-indigo-text">
                Custom warna tersedia — chat admin untuk konfirmasi.
              </p>
            </div>
          ) : null}

          {product.description ? (
            <p className="mt-4 text-sm text-parchment-dim">{product.description}</p>
          ) : null}

          <DashedRule className="my-8" />

          <ProductOptions
            productId={product.id}
            productName={product.name}
            basePrice={product.price}
            sizeOptions={sizeOptions}
            stitchStyles={stitchStyles ?? []}
            whatsappNumber={whatsappNumber}
          />
        </div>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import { supabase } from "@/lib/supabase/client";
import { DashedRule } from "@/components/DashedRule";
import { KatalogGrid } from "./KatalogGrid";
import { StitchStylesSection } from "./StitchStylesSection";
import { StrapStylesSection } from "./StrapStylesSection";

export const metadata: Metadata = {
  title: "Katalog — SS Strap",
};

// Data produk berubah kapan saja lewat Supabase — render per request,
// jangan pakai hasil build lama (App Router default-nya cache statis).
export const dynamic = "force-dynamic";

export default async function KatalogPage() {
  const [{ data: categories }, { data: products }, { data: stitchStyles }, { data: strapStyles }] =
    await Promise.all([
      supabase.from("categories").select("*").order("sort_order"),
      supabase.from("products").select("*").eq("status", "active"),
      supabase.from("stitch_styles").select("*").order("sort_order"),
      supabase.from("strap_styles").select("*").order("sort_order"),
    ]);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16 sm:px-10">
      <header className="mb-10">
        <h1 className="font-display text-4xl text-parchment sm:text-5xl">
          Katalog
        </h1>
        <p className="mt-3 max-w-xl text-parchment-dim">
          Strap jam tangan kulit handmade — pilih kategori untuk melihat
          pilihan bahan.
        </p>
      </header>

      <DashedRule className="mb-10" />

      <KatalogGrid categories={categories ?? []} products={products ?? []} />

      <DashedRule className="my-16" />

      <StitchStylesSection stitchStyles={stitchStyles ?? []} />

      <DashedRule className="my-16" />

      <StrapStylesSection strapStyles={strapStyles ?? []} />

      <DashedRule className="mt-16" />
    </main>
  );
}

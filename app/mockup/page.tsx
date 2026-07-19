import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { DashedRule } from "@/components/DashedRule";
import { MockupForm } from "./MockupForm";

export const metadata: Metadata = {
  title: "Minta Mockup — SS Strap",
};

type SearchParams = Promise<{ product_id?: string; product_name?: string }>;

export default async function MockupPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { product_id: productId, product_name: productName } = await searchParams;

  const { data: stitchStyles } = await supabase
    .from("stitch_styles")
    .select("*")
    .order("sort_order");

  return (
    <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16 sm:px-10">
      <Link
        href={productId ? `/katalog/${productId}` : "/katalog"}
        className="text-sm text-parchment-dim hover:text-parchment"
      >
        ← Kembali
      </Link>

      <header className="mt-6 mb-10">
        <h1 className="font-display text-4xl text-parchment sm:text-5xl">
          Minta Mockup
        </h1>
        <p className="mt-3 max-w-xl text-parchment-dim">
          {productName ? `Untuk produk: ${productName}. ` : ""}
          Semua isian di bawah opsional — boleh dilewati semua, langsung
          lanjut ke WhatsApp untuk kirim foto jam Anda.
        </p>
      </header>

      <DashedRule className="mb-10" />

      <MockupForm
        productName={productName ?? null}
        stitchStyles={stitchStyles ?? []}
        whatsappNumber={process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""}
      />
    </main>
  );
}

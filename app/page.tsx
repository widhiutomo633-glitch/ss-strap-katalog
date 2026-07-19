import type { Metadata } from "next";
import Link from "next/link";
import { supabase } from "@/lib/supabase/client";
import { DashedRule } from "@/components/DashedRule";

export const metadata: Metadata = {
  title: "SS Strap — Handmade Exotic Leather Straps",
};

export default async function Home() {
  const [{ count: categoryCount }, { count: productCount }] = await Promise.all([
    supabase.from("categories").select("*", { count: "exact", head: true }),
    supabase
      .from("products")
      .select("*", { count: "exact", head: true })
      .eq("status", "active"),
  ]);

  const stats = [
    { value: categoryCount ?? 0, label: "Kategori bahan" },
    { value: productCount ?? 0, label: "Produk aktif" },
    { value: "2018", label: "Sejak tahun" },
  ];

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-16 sm:px-10">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="font-mono text-xs tracking-wide text-parchment-dim uppercase">
            Handmade exotic leather · sejak 2018
          </p>

          <h1 className="mt-4 font-display text-4xl leading-tight text-parchment sm:text-5xl lg:text-6xl">
            Ditenun tangan, diekspor <span className="text-brass italic">dunia.</span>
          </h1>

          <p className="mt-5 max-w-md text-parchment-dim">
            Strap jam tangan kulit handmade dari Wonogiri, Jawa — dikerjakan
            satu per satu dari kulit fine grain hingga eksotis, untuk pembeli
            lokal maupun mancanegara.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/katalog"
              className="rounded-md bg-brass px-6 py-3 text-center font-medium text-brass-dark transition-opacity hover:opacity-90"
            >
              Lihat Katalog →
            </Link>
            <Link
              href="/tentang"
              className="rounded-md border border-thread/40 px-6 py-3 text-center font-medium text-parchment transition-colors hover:border-brass/60"
            >
              Tentang Kami
            </Link>
          </div>

          <div className="mt-10 flex gap-8">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-mono text-2xl text-brass">{stat.value}</p>
                <p className="mt-1 text-xs text-parchment-dim">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          {/* Placeholder visual — ganti isi div ini dengan <img src="..." className="h-full w-full object-cover" />
              begitu foto produk unggulan sudah ada */}
          <div className="flex aspect-[4/5] items-center justify-center rounded-lg border border-thread/20 bg-hide-light">
            <span className="font-mono text-xs text-parchment-dim/60">
              Foto produk unggulan
            </span>
          </div>
        </div>
      </div>

      <DashedRule className="mt-16" />
    </main>
  );
}

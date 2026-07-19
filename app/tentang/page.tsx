import type { Metadata } from "next";
import Link from "next/link";
import { DashedRule } from "@/components/DashedRule";

export const metadata: Metadata = {
  title: "Tentang — SS Strap",
};

export default function TentangPage() {
  return (
    <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16 sm:px-10">
      <h1 className="font-display text-4xl text-parchment sm:text-5xl">
        Tentang SS Strap
      </h1>

      <div className="mt-6 flex flex-col gap-4 text-parchment-dim">
        <p>
          SS Strap adalah rumah produksi strap kulit handmade dari Wonogiri,
          Jawa — mengerjakan kulit eksotis dan fine grain untuk pasar lokal
          dan ekspor sejak 2018.
        </p>
        <p>
          Setiap strap dikerjakan satu per satu dengan tangan, dari bahan
          fine grain hingga kulit eksotis seperti python, buaya, dan biawak.
          Lining dan backing selalu memakai kulit Fine Grain hitam, dengan
          pin buckle tradisional di setiap strap.
        </p>
        <p>
          Ukuran bisa disesuaikan dari 12mm sampai 26mm, dengan pilihan gaya
          jahitan dan gaya potongan strap sesuai kebutuhan. Semua pemesanan
          dilayani langsung lewat WhatsApp, tanpa proses checkout yang
          rumit.
        </p>
      </div>

      <DashedRule className="my-10" />

      <Link
        href="/katalog"
        className="inline-block rounded-md bg-brass px-6 py-3 text-center font-medium text-brass-dark transition-opacity hover:opacity-90"
      >
        Lihat Katalog →
      </Link>
    </main>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { StitchStyle } from "@/lib/supabase/types";

const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});

export type SizeOption = {
  size_mm: number;
  is_available: boolean;
  price_override: number | null;
};

type Props = {
  productId: string;
  productName: string;
  basePrice: number;
  sizeOptions: SizeOption[];
  stitchStyles: StitchStyle[];
  whatsappNumber: string;
};

export function ProductOptions({
  productId,
  productName,
  basePrice,
  sizeOptions,
  stitchStyles,
  whatsappNumber,
}: Props) {
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [selectedStitch, setSelectedStitch] = useState<string | null>(null);

  const whatsappHref = useMemo(() => {
    const lines = [`Halo, saya mau tanya produk *${productName}* dari katalog SS Strap.`];
    if (selectedSize !== null) lines.push(`- Ukuran: ${selectedSize}mm`);
    if (selectedStitch !== null) lines.push(`- Gaya jahitan: ${selectedStitch}`);
    const message = lines.join("\n");
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  }, [productName, selectedSize, selectedStitch, whatsappNumber]);

  const mockupHref = `/mockup?product_id=${encodeURIComponent(productId)}&product_name=${encodeURIComponent(productName)}`;

  return (
    <div>
      <section>
        <h2 className="font-display text-lg text-parchment">Ukuran (lug width)</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {sizeOptions.map((size) => {
            const active = selectedSize === size.size_mm;
            const extra =
              size.price_override !== null && size.price_override > basePrice
                ? size.price_override - basePrice
                : null;

            return (
              <button
                key={size.size_mm}
                type="button"
                disabled={!size.is_available}
                onClick={() => setSelectedSize(size.size_mm)}
                aria-pressed={active}
                className={`relative rounded-full border px-4 py-2 text-sm font-mono transition-colors ${
                  !size.is_available
                    ? "cursor-not-allowed border-thread/15 bg-hide text-parchment-dim/40"
                    : active
                      ? "border-brass bg-brass text-brass-dark"
                      : "border-thread/40 bg-hide text-parchment-dim hover:border-brass/60 hover:text-parchment"
                }`}
              >
                {size.size_mm}mm
                {extra !== null && size.is_available ? (
                  <span className="ml-1.5 rounded-full bg-indigo-bg px-1.5 py-0.5 text-[10px] text-indigo-text">
                    +{rupiah.format(extra)}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-display text-lg text-parchment">Gaya jahitan</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {stitchStyles.map((stitch) => {
            const active = selectedStitch === stitch.name;
            return (
              <button
                key={stitch.id}
                type="button"
                onClick={() => setSelectedStitch(stitch.name)}
                aria-pressed={active}
                className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "border-brass bg-brass text-brass-dark"
                    : "border-thread/40 bg-hide text-parchment-dim hover:border-brass/60 hover:text-parchment"
                }`}
              >
                {stitch.name}
              </button>
            );
          })}
        </div>
      </section>

      <div className="mt-10 flex flex-col gap-3 sm:flex-row">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-md bg-brass px-6 py-3 text-center font-medium text-brass-dark transition-opacity hover:opacity-90"
        >
          Pesan via WhatsApp
        </a>
        <Link
          href={mockupHref}
          className="flex-1 rounded-md border border-thread/40 px-6 py-3 text-center font-medium text-parchment transition-colors hover:border-brass/60"
        >
          Minta Mockup
        </Link>
      </div>
    </div>
  );
}

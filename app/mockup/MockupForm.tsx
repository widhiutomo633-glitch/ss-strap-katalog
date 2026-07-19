"use client";

import { useMemo, useState } from "react";
import type { StitchStyle } from "@/lib/supabase/types";

type Props = {
  productName: string | null;
  stitchStyles: StitchStyle[];
  whatsappNumber: string;
};

const inputClass =
  "w-full rounded-md border border-thread/40 bg-hide px-4 py-2.5 text-parchment placeholder:text-parchment-dim/60 outline-none focus:border-brass";

export function MockupForm({ productName, stitchStyles, whatsappNumber }: Props) {
  const [lugWidth, setLugWidth] = useState("");
  const [caseDiameter, setCaseDiameter] = useState("");
  const [selectedStitch, setSelectedStitch] = useState<string | null>(null);
  const [notes, setNotes] = useState("");

  const whatsappHref = useMemo(() => {
    const lines = [
      productName
        ? `Halo, saya mau minta mockup untuk produk *${productName}*.`
        : "Halo, saya mau minta mockup strap.",
    ];
    if (lugWidth.trim()) lines.push(`- Lug width: ${lugWidth.trim()}`);
    if (caseDiameter.trim()) lines.push(`- Diameter case: ${caseDiameter.trim()}`);
    if (selectedStitch) lines.push(`- Gaya jahitan: ${selectedStitch}`);
    if (notes.trim()) lines.push(`- Catatan: ${notes.trim()}`);
    lines.push("");
    lines.push("Lampirkan foto jam dari depan, dial terlihat jelas.");
    lines.push("Mockup dikirim dalam beberapa jam (sameday).");

    const message = lines.join("\n");
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  }, [productName, lugWidth, caseDiameter, selectedStitch, notes, whatsappNumber]);

  return (
    <div>
      <section>
        <h2 className="font-display text-lg text-parchment">Lug width</h2>
        <input
          type="text"
          value={lugWidth}
          onChange={(e) => setLugWidth(e.target.value)}
          placeholder="cth: 20mm"
          className={`mt-3 ${inputClass}`}
        />
      </section>

      <section className="mt-8">
        <h2 className="font-display text-lg text-parchment">Diameter case</h2>
        <input
          type="text"
          value={caseDiameter}
          onChange={(e) => setCaseDiameter(e.target.value)}
          placeholder="cth: 40mm"
          className={`mt-3 ${inputClass}`}
        />
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
                onClick={() => setSelectedStitch(active ? null : stitch.name)}
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

      <section className="mt-8">
        <h2 className="font-display text-lg text-parchment">Catatan tambahan</h2>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="cth: warna dial biru, mau gesper perak"
          rows={4}
          className={`mt-3 ${inputClass}`}
        />
      </section>

      <a
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 block w-full rounded-md bg-brass px-6 py-3 text-center font-medium text-brass-dark transition-opacity hover:opacity-90"
      >
        Lanjut ke WhatsApp
      </a>
    </div>
  );
}

"use client";

import { useState } from "react";
import type { StitchStyle } from "@/lib/supabase/types";

export function StitchStylesSection({
  stitchStyles,
}: {
  stitchStyles: StitchStyle[];
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <section>
      <h2 className="font-display text-2xl text-parchment sm:text-3xl">
        Pilih Gaya Jahitan
      </h2>
      <p className="mt-2 max-w-xl text-sm text-parchment-dim">
        Gaya jahitan tersedia untuk semua produk — sebutkan gaya pilihan Anda
        saat pesan lewat WhatsApp.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {stitchStyles.map((stitch) => {
          const active = selectedId === stitch.id;
          return (
            <button
              key={stitch.id}
              type="button"
              onClick={() => setSelectedId(active ? null : stitch.id)}
              aria-pressed={active}
              className={`rounded-lg border bg-hide p-4 text-left transition-colors ${
                active ? "border-brass" : "border-thread/20 hover:border-brass/60"
              }`}
            >
              <h3 className="font-display text-base text-parchment">
                {stitch.name}
              </h3>
              {stitch.description ? (
                <p className="mt-1 text-xs text-parchment-dim">
                  {stitch.description}
                </p>
              ) : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}

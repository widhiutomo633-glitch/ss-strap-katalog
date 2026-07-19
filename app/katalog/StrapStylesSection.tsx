import type { StrapStyle } from "@/lib/supabase/types";

export function StrapStylesSection({
  strapStyles,
}: {
  strapStyles: StrapStyle[];
}) {
  return (
    <section>
      <h2 className="font-display text-2xl text-parchment sm:text-3xl">
        Gaya Strap yang Bisa Kami Buat
      </h2>
      <p className="mt-2 max-w-xl text-sm text-parchment-dim">
        Semua gaya potongan tersedia untuk seluruh kategori bahan.
      </p>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {strapStyles.map((strap) => (
          <div
            key={strap.id}
            className="overflow-hidden rounded-lg border border-thread/20 bg-hide"
          >
            <div className="flex aspect-square items-center justify-center bg-hide-light">
              {strap.image_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={strap.image_url}
                  alt={strap.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="px-2 text-center font-mono text-xs text-parchment-dim/70">
                  {strap.name}
                </span>
              )}
            </div>
            {strap.image_url ? (
              <p className="p-3 text-center font-display text-sm text-parchment">
                {strap.name}
              </p>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}

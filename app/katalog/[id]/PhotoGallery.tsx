"use client";

import { useState } from "react";

type Props = {
  photos: string[];
  productName: string;
};

export function PhotoGallery({ photos, productName }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <div className="aspect-square overflow-hidden rounded-lg bg-hide-light">
        {photos[activeIndex] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photos[activeIndex]}
            alt={productName}
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>

      {photos.length > 1 ? (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {photos.map((photo, index) => {
            const active = index === activeIndex;
            return (
              <button
                key={photo}
                type="button"
                onClick={() => setActiveIndex(index)}
                aria-pressed={active}
                aria-label={`Foto ${index + 1}`}
                className={`aspect-square overflow-hidden rounded-md border-2 transition-colors ${
                  active ? "border-brass" : "border-transparent hover:border-thread/40"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo}
                  alt={productName}
                  className="h-full w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

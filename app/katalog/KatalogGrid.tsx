"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Category, Product } from "@/lib/supabase/types";

const rupiah = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});

type Props = {
  categories: Category[];
  products: Product[];
};

export function KatalogGrid({ categories, products }: Props) {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const selectedCategory = categories.find((c) => c.slug === selectedSlug) ?? null;

  const filteredProducts = useMemo(() => {
    if (!selectedCategory) return products;
    return products.filter((p) => p.category_id === selectedCategory.id);
  }, [products, selectedCategory]);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter kategori">
        <CategoryChip
          label="Semua"
          active={selectedSlug === null}
          onClick={() => setSelectedSlug(null)}
        />
        {categories.map((category) => (
          <CategoryChip
            key={category.id}
            label={category.name}
            active={selectedSlug === category.slug}
            onClick={() => setSelectedSlug(category.slug)}
          />
        ))}
      </div>

      <div className="mt-10">
        {filteredProducts.length === 0 ? (
          <p className="py-20 text-center font-mono text-sm text-parchment-dim">
            Belum ada produk.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-brass bg-brass text-brass-dark"
          : "border-thread/40 bg-hide text-parchment-dim hover:border-brass/60 hover:text-parchment"
      }`}
    >
      {label}
    </button>
  );
}

function ProductCard({ product }: { product: Product }) {
  const photo = product.photos[0];

  return (
    <Link
      href={`/katalog/${product.id}`}
      className="block overflow-hidden rounded-lg border border-thread/20 bg-hide transition-colors hover:border-brass/60"
    >
      <div className="aspect-square bg-hide-light">
        {photo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo}
            alt={product.name}
            className="h-full w-full object-cover"
          />
        ) : null}
      </div>
      <div className="p-4">
        <h3 className="font-display text-lg text-parchment">{product.name}</h3>
        <p className="mt-1 font-mono text-sm text-brass">
          {rupiah.format(product.price)}
        </p>
      </div>
    </Link>
  );
}

// Tipe TypeScript manual yang mengikuti supabase/schema.sql.
// Kalau kolom di schema.sql diubah, update juga di sini.

export type ProductStatus = "active" | "draft";

export interface Category {
  id: string;
  slug: string;
  name: string;
  tagline: string | null;
  strengths: string[];
  is_exotic: boolean;
  is_color_customizable: boolean;
  has_patina: boolean;
  story_text: string | null;
  before_photo_url: string | null;
  after_photo_url: string | null;
  hero_image_url: string | null;
  sort_order: number;
  created_at: string;
}

export interface Product {
  id: string;
  category_id: string;
  name: string;
  sku: string | null;
  base_color: string | null;
  price: number;
  photos: string[];
  description: string | null;
  status: ProductStatus;
  created_at: string;
}

export interface Size {
  size_mm: 12 | 14 | 16 | 18 | 20 | 22 | 24 | 26;
}

export interface ProductSize {
  id: string;
  product_id: string;
  size_mm: Size["size_mm"];
  is_available: boolean;
  price_override: number | null;
}

export interface StitchStyle {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  icon_type: string | null;
  sort_order: number;
}

export interface StrapStyle {
  id: string;
  slug: string;
  name: string;
  image_url: string | null;
  sort_order: number;
}

-- SS Strap — Katalog: schema Supabase (Fase 1)
-- Jalankan file ini di Supabase Dashboard > SQL Editor (sekali saja).
-- Aman dijalankan ulang: pakai "if not exists" dan "on conflict do nothing".

create extension if not exists pgcrypto;

-- ============================================================
-- categories — 14 kategori final (10 fixed + 4 custom-eligible)
-- ============================================================
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  tagline text,
  strengths jsonb not null default '[]'::jsonb,
  is_exotic boolean not null default false,
  is_color_customizable boolean not null default false,
  has_patina boolean not null default false,
  story_text text,
  before_photo_url text,
  after_photo_url text,
  hero_image_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- ============================================================
-- products
-- ============================================================
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references categories(id) on delete restrict,
  name text not null,
  sku text unique,
  base_color text,
  price numeric(12,2) not null,
  photos text[] not null default '{}',
  description text,
  status text not null default 'active' check (status in ('active', 'draft')),
  created_at timestamptz not null default now()
);

create index if not exists idx_products_category_id on products(category_id);
create index if not exists idx_products_status on products(status);

-- ============================================================
-- sizes — referensi global, 8 ukuran (mm)
-- ============================================================
create table if not exists sizes (
  size_mm smallint primary key check (size_mm in (12, 14, 16, 18, 20, 22, 24, 26))
);

-- ============================================================
-- product_sizes — join table, diatur admin per produk
-- ============================================================
create table if not exists product_sizes (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  size_mm smallint not null references sizes(size_mm),
  is_available boolean not null default true,
  price_override numeric(12,2),
  unique (product_id, size_mm)
);

create index if not exists idx_product_sizes_product_id on product_sizes(product_id);

-- ============================================================
-- stitch_styles — referensi global, universal (4 gaya)
-- ============================================================
create table if not exists stitch_styles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  description text,
  icon_type text,
  sort_order integer not null default 0
);

-- ============================================================
-- strap_styles — referensi global, universal (9 gaya)
-- ============================================================
create table if not exists strap_styles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  image_url text,
  sort_order integer not null default 0
);

-- ============================================================
-- Row Level Security
-- Website katalog ini publik & read-only dari sisi pengunjung.
-- Semua tabel: siapa saja boleh SELECT, tidak ada yang boleh
-- INSERT/UPDATE/DELETE lewat anon key. Owner mengelola data
-- lewat Supabase Studio (Table Editor) yang pakai service_role,
-- jadi tidak kena RLS ini.
-- ============================================================
alter table categories enable row level security;
alter table products enable row level security;
alter table sizes enable row level security;
alter table product_sizes enable row level security;
alter table stitch_styles enable row level security;
alter table strap_styles enable row level security;

drop policy if exists "public read categories" on categories;
create policy "public read categories" on categories for select using (true);

drop policy if exists "public read products" on products;
create policy "public read products" on products for select using (true);

drop policy if exists "public read sizes" on sizes;
create policy "public read sizes" on sizes for select using (true);

drop policy if exists "public read product_sizes" on product_sizes;
create policy "public read product_sizes" on product_sizes for select using (true);

drop policy if exists "public read stitch_styles" on stitch_styles;
create policy "public read stitch_styles" on stitch_styles for select using (true);

drop policy if exists "public read strap_styles" on strap_styles;
create policy "public read strap_styles" on strap_styles for select using (true);

-- ============================================================
-- Seed: sizes (12–26mm)
-- ============================================================
insert into sizes (size_mm) values
  (12), (14), (16), (18), (20), (22), (24), (26)
on conflict (size_mm) do nothing;

-- ============================================================
-- Seed: categories
-- 10 fixed (is_color_customizable = false) + 4 custom-eligible (true)
-- has_patina = true hanya untuk: Crazy Horse, Hot Wax, Ghost Wax,
-- Vegtan Cowhide, Distressed / Vintage
-- ============================================================
insert into categories (slug, name, is_exotic, is_color_customizable, has_patina, sort_order) values
  ('fine-grain',          'Fine Grain',              false, false, false, 1),
  ('crazy-horse',         'Crazy Horse / Pull-up',   false, false, true,  2),
  ('hot-wax',             'Hot Wax',                 false, false, true,  3),
  ('ghost-wax',           'Ghost Wax',                false, false, true,  4),
  ('pebbled-grain',       'Pebbled Grain',           false, false, false, 5),
  ('chevre-grain',        'Chevre Grain',            false, false, false, 6),
  ('suede',               'Suede',                   false, false, false, 7),
  ('distressed-vintage',  'Distressed / Vintage',    false, false, true,  8),
  ('saffiano',            'Saffiano',                false, false, false, 9),
  ('croco-emboss',        'Croco Emboss (Sapi)',     true,  false, false, 10),
  ('vegtan-cowhide',      'Vegtan Cowhide',          false, true,  true,  11),
  ('python',              'Python',                  true,  true,  false, 12),
  ('buaya',               'Buaya',                   true,  true,  false, 13),
  ('biawak',              'Biawak',                  true,  true,  false, 14)
on conflict (slug) do nothing;

-- ============================================================
-- Seed: stitch_styles (4 gaya jahitan)
-- ============================================================
insert into stitch_styles (slug, name, sort_order) values
  ('point-stitch',      'Point Stitch',      1),
  ('line-stitch',       'Line Stitch',       2),
  ('close-loop-stitch', 'Close Loop Stitch', 3),
  ('open-loop-stitch',  'Open Loop Stitch',  4)
on conflict (slug) do nothing;

-- ============================================================
-- Seed: strap_styles (9 gaya strap — NATO, Fixed Bars, Double Roll
-- sengaja tidak dipakai)
-- ============================================================
insert into strap_styles (slug, name, sort_order) values
  ('classic',              'Classic',                    1),
  ('single-folding',       'Single Folding',              2),
  ('double-folding',       'Double Folding',              3),
  ('middle-cut',           'Middle Cut',                  4),
  ('wing-cut',             'Wing Cut',                    5),
  ('pilot',                'Pilot',                       6),
  ('fixed-2-sides',        'Fixed 2 Sides',                7),
  ('rally-lubang-kecil',   'Rally (Lubang Kecil)',        8),
  ('rally-lubang-besar',   'Rally (Lubang Besar)',        9)
on conflict (slug) do nothing;

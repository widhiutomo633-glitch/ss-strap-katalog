# SS Strap — Katalog Website

## Ringkasan Proyek
Website katalog (BUKAN e-commerce checkout) untuk SS Strap — brand strap jam tangan kulit handmade dari Wonogiri, Jawa, sejak 2018. Tujuan: pembeli lihat katalog, lalu diarahkan ke WhatsApp untuk transaksi. Tidak ada cart, tidak ada payment gateway.

**Stack:** Next.js + Supabase (data only, tanpa auth/order) + Vercel (hosting). Owner baru belajar coding, gunakan pola yang jelas dan tidak over-engineered.

## Desain (sudah final, jangan diubah tanpa konfirmasi)

**Warna** (diambil dari logo asli, jangan pakai warna lain):
```css
--ink: #222222;        /* background utama */
--hide: #2C2C2C;        /* card/panel surface */
--hide-light: #333333;  /* elevated surface */
--parchment: #F5F1E8;   /* teks utama */
--parchment-dim: #ABA79E; /* teks sekunder */
--brass: #C46A15;       /* aksen oranye, warna monogram logo */
--brass-dark: #201A12;  /* teks di atas brass */
--thread: #C9C2B4;      /* garis jahitan/divider */
--indigo-bg: #2C3548;   /* badge info (custom warna) */
--indigo-text: #B9C6DA;
```

**Font:** Fraunces (display/heading, Google Fonts), Inter (body), DM Mono (data/spek/harga/mono elements)

**Signature element:** garis putus-putus ganda (dashed rule, dua baris berdekatan) sebagai pemisah section — meniru jahitan pelana (saddle stitch), dipakai konsisten di seluruh halaman.

**Logo:** monogram "SS" interlocking, warna brass (#C46A15), di atas background gelap. File logo ada di `/public/logo/`.

## Struktur Halaman (Fase 1)
1. **Home** — hero, intro brand, CTA ke katalog
2. **Katalog** — grid produk + filter kategori (14) + filter ukuran + section "Kenali Keistimewaan Bahan" + section "Pilih Gaya Jahitan" + section "Gaya Strap"
3. **Detail Produk** — galeri foto, size selector (chip 12-26mm), badge custom warna (kalau kategori eligible), pemilih gaya jahitan, tombol "Pesan via WhatsApp" + "Minta Mockup"
4. **Tentang** — cerita brand, proses (boleh Fase 2)
5. **Kontak** — link sosial (IG, Shopee, Etsy, WA)

## Skema Database (Supabase)

### `categories`
14 kategori final, JANGAN tambah/kurangi tanpa konfirmasi owner:

**Grup Fixed (10) — TIDAK bisa custom warna:**
Fine Grain, Crazy Horse / Pull-up, Hot Wax, Ghost Wax, Pebbled Grain, Chevre Grain, Suede, Distressed / Vintage, Saffiano, Croco Emboss (Sapi — bukan buaya asli)

**Grup Custom-eligible (4) — BISA custom warna (perlu konfirmasi admin via WA):**
Vegtan Cowhide, Python, Buaya, Biawak

Kolom: `slug`, `name`, `tagline`, `strengths` (jsonb array bullet points), `is_exotic` (bool), `is_color_customizable` (bool), `has_patina` (bool — true untuk: Crazy Horse, Hot Wax, Ghost Wax, Vegtan Cowhide, Distressed), `story_text`, `before_photo_url`, `after_photo_url`, `hero_image_url`, `sort_order`

### `products`
`category_id` (FK), `name`, `sku`, `base_color`, `price`, `photos` (array url), `description`, `status` (active/draft)

### `sizes` (referensi global, isi sekali)
8 ukuran: 12, 14, 16, 18, 20, 22, 24, 26 (mm)

### `product_sizes` (join table — admin atur per produk)
`product_id`, `size_mm`, `is_available` (bool), `price_override` (nullable — kalau null pakai harga dasar produk)

### `stitch_styles` (referensi global, universal untuk SEMUA produk — bukan per-kategori/per-produk)
4 gaya: Point Stitch, Line Stitch, Close Loop Stitch, Open Loop Stitch
Kolom: `slug`, `name`, `description`, `icon_type`, `sort_order`

### `strap_styles` (referensi global, universal)
9 gaya (BUKAN 12 — NATO, Fixed Bars, dan Double Roll sengaja tidak dipakai):
Classic, Single Folding, Double Folding, Middle Cut, Wing Cut, Pilot, Fixed 2 Sides, Rally (Lubang Kecil), Rally (Lubang Besar)
Kolom: `slug`, `name`, `image_url`, `sort_order`

## Aturan Bisnis Penting
- **Custom ukuran (lug width):** SEMUA kategori bisa, tampil sebagai chip selector 12-26mm di halaman detail. Ukuran 24mm & 26mm biasanya +Rp 50.000 (pakai `price_override`, bukan hardcode).
- **Custom warna:** HANYA 4 kategori custom-eligible. Tampilkan badge 🎨 + kotak info "Custom warna tersedia — chat admin untuk konfirmasi" (styling `--indigo-bg`). Kategori fixed TIDAK menampilkan ini sama sekali.
- **Custom jahitan & gaya strap:** universal untuk semua produk, tampil sebagai section referensi di halaman katalog (bukan per-produk, cukup 1 section global).
- **Konstruksi tetap (untuk konten foto, bukan logic web):** lining/backing selalu kulit Fine Grain hitam, buckle selalu pin buckle tradisional (TIDAK ADA quick-release).

## Fitur "Minta Mockup" (bukan AI otomatis!)
Alur: tombol di halaman produk → form ringan (lug width opsional, diameter case opsional, gaya jahitan opsional, catatan opsional) → generate link WhatsApp otomatis terisi data + nama produk → buyer lampirkan foto jam sendiri di WA → admin (owner sendiri) generate mockup MANUAL pakai tool prompt builder terpisah, balas di WA. SLA: sameday.

**PENTING: JANGAN implementasikan AI image generation di website.** Ini keputusan sadar — bukan kelupaan. Tidak perlu API key Gemini/Nano Banana, tidak perlu rate limiting, tidak perlu tabel generation_log. Cukup form + wa.me link.

## Checklist Fase 1 (wajib sebelum launch)
- [ ] Setup Next.js + Supabase + Vercel
- [ ] Tabel: categories, products, sizes, product_sizes, stitch_styles, strap_styles
- [ ] Halaman Home, Katalog (filter kategori+ukuran), Detail Produk
- [ ] Size selector 12-26mm dengan price_override
- [ ] Badge custom warna untuk 4 kategori eligible
- [ ] Section Gaya Jahitan (4) & Gaya Strap (9) — statis dulu boleh
- [ ] Form "Minta Mockup" → wa.me link
- [ ] Tombol "Pesan via WhatsApp" di tiap produk
- [ ] Halaman Tentang & Kontak sederhana
- [ ] Deploy ke Vercel

## Fase 2 (JANGAN dikerjakan dulu kecuali diminta eksplisit)
Viewer 360° (drag-to-rotate dari sequence foto), section "Kenali Keistimewaan Bahan" dengan before/after patina lengkap, trust badge footer, kartu kategori visual, section "Proses Pembuatan", blog/showcase.

## Preferensi Kerja
- Owner baru belajar coding — jelaskan istilah teknis secara singkat saat relevan, jangan asumsikan familiar dengan jargon.
- Owner pakai MacBook Air M1, Terminal biasa (zsh), sudah ada Homebrew + Node + Claude Code terpasang.
- Prioritaskan kode yang jelas/mudah dipelajari di atas kode yang "clever" atau terlalu abstrak.
- Style visual mockup referensi ada — konsisten dengan token warna/font di atas, jangan improvisasi palet baru.

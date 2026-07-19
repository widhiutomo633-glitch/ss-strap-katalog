// Script sekali pakai: import produk dari template_import_produk.xlsx ke Supabase.
// Jalankan dengan: node --env-file=.env.local scripts/import-products.js
// (--env-file supaya SUPABASE_SERVICE_ROLE_KEY di .env.local bisa dibaca script ini)
//
// Kolom "description" kosong di spreadsheet? Otomatis diisi dari
// categories.tagline + categories.strengths milik kategori baris itu
// (berlaku untuk semua kategori, tidak hardcode per nama). Kalau diisi
// manual di spreadsheet, nilai itu dipakai apa adanya.

const path = require("path");
const XLSX = require("xlsx");
const { createClient } = require("@supabase/supabase-js");

const XLSX_PATH = path.join(__dirname, "..", "template_import_produk.xlsx");
const SHEET_NAME = "Produk";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    "NEXT_PUBLIC_SUPABASE_URL atau SUPABASE_SERVICE_ROLE_KEY tidak ketemu.\n" +
      "Jalankan scriptnya dengan: node --env-file=.env.local scripts/import-products.js",
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function main() {
  const workbook = XLSX.readFile(XLSX_PATH);
  const sheet = workbook.Sheets[SHEET_NAME];
  if (!sheet) {
    console.error(`Sheet "${SHEET_NAME}" tidak ditemukan di ${XLSX_PATH}`);
    process.exit(1);
  }

  const rows = XLSX.utils.sheet_to_json(sheet, { defval: null });

  const { data: categories, error: categoriesError } = await supabase
    .from("categories")
    .select("id, name, tagline, strengths");

  if (categoriesError) {
    console.error("Gagal ambil data categories dari Supabase:", categoriesError.message);
    process.exit(1);
  }

  const categoryByName = new Map(categories.map((c) => [c.name, c]));

  const problems = [];
  const productsToInsert = [];

  rows.forEach((row, index) => {
    const excelRow = index + 2; // baris 1 di Excel = header
    const name = (row.name ?? "").toString().trim();
    const categoryName = (row.category ?? "").toString().trim();

    if (!name) {
      problems.push(`Baris ${excelRow}: kolom "name" kosong`);
      return;
    }

    const category = categoryByName.get(categoryName);
    if (!category) {
      problems.push(
        `Baris ${excelRow} ("${name}"): category "${categoryName}" tidak cocok dengan nama kategori manapun di database`,
      );
      return;
    }

    const price = Number(row.price);
    if (!Number.isFinite(price) || price <= 0) {
      problems.push(`Baris ${excelRow} ("${name}"): price tidak valid ("${row.price}")`);
      return;
    }

    const rawDescription = row.description == null ? "" : row.description.toString();
    let description = rawDescription;

    if (rawDescription.trim().length === 0) {
      const hasStrengths = Array.isArray(category.strengths) && category.strengths.length > 0;
      if (!category.tagline || !hasStrengths) {
        problems.push(
          `Baris ${excelRow} ("${name}"): description kosong, dan kategori "${categoryName}" belum punya tagline/strengths lengkap di tabel categories — isi dulu data kategorinya, atau isi description manual di spreadsheet`,
        );
        return;
      }
      description = `${category.tagline} Keunggulan: ${category.strengths.join(", ")}. Dijahit tangan di Wonogiri — bukan produksi massal.`;
    }

    const photos = [row.photo_url_1, row.photo_url_2, row.photo_url_3]
      .map((url) => (url ?? "").toString().trim())
      .filter(Boolean);

    productsToInsert.push({
      name,
      category_id: category.id,
      sku: row.sku ? row.sku.toString().trim() : null,
      price,
      description,
      photos,
      status: "active",
    });
  });

  if (problems.length > 0) {
    console.log(`\n${problems.length} baris bermasalah — TIDAK ADA yang diinsert:\n`);
    problems.forEach((p) => console.log(`  - ${p}`));
    console.log("\nPerbaiki dulu di template_import_produk.xlsx, lalu jalankan lagi scriptnya.");
    process.exit(1);
  }

  console.log(`Semua ${productsToInsert.length} baris valid. Insert ke tabel products...`);

  const { data: inserted, error: insertError } = await supabase
    .from("products")
    .insert(productsToInsert)
    .select("id, name");

  if (insertError) {
    console.error("Gagal insert:", insertError.message);
    process.exit(1);
  }

  console.log(`\n✓ Berhasil insert ${inserted.length} produk:`);
  inserted.forEach((p) => console.log(`  - ${p.name}`));
}

main();

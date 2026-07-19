import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Tanpa generic Database: tipe baris didefinisikan manual di ./types
// dan di-cast di titik query (lihat app/katalog/[id]/page.tsx untuk contoh).
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

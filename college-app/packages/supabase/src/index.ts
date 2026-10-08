export { createClient, type SupabaseClient } from "@supabase/supabase-js";
export type { Database } from "./database.types";
export {
  getSupabaseAnonKey,
  getSupabaseServiceRoleKey,
  getSupabaseUrl,
} from "./env";

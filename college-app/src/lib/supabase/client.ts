"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@college/supabase";
import { getSupabaseAnonKey, getSupabaseUrl } from "./env";

let browserClient: ReturnType<typeof createBrowserClient<Database>> | undefined;

export function createClient() {
  if (!browserClient) {
    browserClient = createBrowserClient<Database>(
      getSupabaseUrl(),
      getSupabaseAnonKey()
    );
  }
  return browserClient;
}

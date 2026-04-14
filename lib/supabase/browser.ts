"use client";

import { createBrowserClient } from "@supabase/ssr";

let cachedBrowserClient: ReturnType<typeof createBrowserClient> | null = null;

export function createBrowserSupabaseClient() {
  if (cachedBrowserClient) {
    return cachedBrowserClient;
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  cachedBrowserClient = createBrowserClient(url, anonKey);
  return cachedBrowserClient;
}

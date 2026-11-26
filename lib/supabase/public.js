import { createClient } from '@supabase/supabase-js';

// Client zonder inlog, voor het lezen van openbare inhoud op de website.
let client;
export function publicClient() {
  if (!client) {
    client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY, {
      auth: { persistSession: false },
    });
  }
  return client;
}

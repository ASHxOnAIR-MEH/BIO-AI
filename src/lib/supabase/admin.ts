import "server-only";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

let adminClient: SupabaseClient | null = null;

/**
 * Server-only Supabase administrative client helper for the Bio-AI Kiosk.
 * 
 * - Strictly guarded against client-side execution via 'server-only'.
 * - Reads SUPABASE_URL and SUPABASE_SECRET_KEY exclusively in server context.
 * - Session persistence, auto token refresh, and URL session detection are disabled.
 * - Preserves existing kiosk registration and session architecture.
 */
export function getSupabaseAdmin(): SupabaseClient {
  if (adminClient) {
    return adminClient;
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

  if (!supabaseUrl) {
    throw new Error(
      "Missing SUPABASE_URL in server environment variables. Please verify .env.local configuration."
    );
  }

  if (!supabaseSecretKey || supabaseSecretKey === "PASTE_SECRET_KEY_HERE") {
    throw new Error(
      "Missing or unconfigured SUPABASE_SECRET_KEY in server environment variables. Please verify .env.local configuration."
    );
  }

  adminClient = createClient(supabaseUrl, supabaseSecretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  });

  return adminClient;
}

export const supabaseAdmin = {
  get client(): SupabaseClient {
    return getSupabaseAdmin();
  },
};


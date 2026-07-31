import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

/**
 * Supabase client instance.
 * May be null during build time when env vars are not available.
 * Use getSupabase() in route handlers to get a guaranteed non-null client.
 */
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

/**
 * Returns a guaranteed non-null Supabase client.
 * Throws a descriptive error if the client is not configured.
 * Use this in API route handlers where Supabase is required.
 */
export function getSupabase(): SupabaseClient {
  if (!supabase) {
    throw new Error(
      "Supabase is not configured. Missing environment variables: " +
        (!supabaseUrl ? "NEXT_PUBLIC_SUPABASE_URL " : "") +
        (!supabaseAnonKey ? "NEXT_PUBLIC_SUPABASE_ANON_KEY" : "") +
        ". Add them to your .env file or Vercel project settings."
    );
  }
  return supabase;
}

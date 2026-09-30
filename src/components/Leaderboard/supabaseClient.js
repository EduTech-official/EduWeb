import { createClient } from "@supabase/supabase-js";

// Supabase Configuration:
// Since deployment access does not allow setting .env variables on the hosting server,
// you can either provide environment variables (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY)
// OR replace the fallback strings below directly with your Supabase Project URL and Anon Key.
const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL || "https://gmejarlknosrbpqjrkug.supabase.co";

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdtZWphcmxrbm9zcmJwcWpya3VnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA3NzMzMTUsImV4cCI6MjEwNjM0OTMxNX0.MR3wUlPzppd_h6yPVoOHEMZFEgSKlmal151Tz2MnWAE";

export const isSupabaseConfigured = () => {
  return (
    Boolean(SUPABASE_URL) &&
    Boolean(SUPABASE_ANON_KEY) &&
    !SUPABASE_URL.includes("YOUR_SUPABASE_PROJECT_URL") &&
    !SUPABASE_ANON_KEY.includes("YOUR_SUPABASE_ANON_KEY")
  );
};

export const supabase = isSupabaseConfigured()
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

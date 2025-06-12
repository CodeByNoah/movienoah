import { cookies } from "next/headers";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs/src/deprecated";

export function createServerSupabase() {
  return createServerComponentSupabaseClient({ cookies });
}

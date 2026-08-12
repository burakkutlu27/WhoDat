import 'server-only'

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

import type { Database } from './database.types'
import { serverEnv } from './env'

/**
 * service_role ile çalışan Supabase istemcisi. RLS'i baypas eder, bu yüzden yalnızca
 * route handler'lardan çağrılır. `server-only` importu, bu modülün yanlışlıkla bir
 * istemci bileşenine sızması durumunda build'i hata ile durdurur.
 */

let cached: SupabaseClient<Database> | null = null

export function supabaseAdmin(): SupabaseClient<Database> {
  if (!cached) {
    cached = createClient<Database>(serverEnv.supabaseUrl, serverEnv.supabaseServiceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    })
  }
  return cached
}

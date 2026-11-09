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

const SUPABASE_FETCH_TIMEOUT_MS = 8000

export function supabaseAdmin(): SupabaseClient<Database> {
  if (!cached) {
    cached = createClient<Database>(serverEnv.supabaseUrl, serverEnv.supabaseServiceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const timeoutSignal = AbortSignal.timeout(SUPABASE_FETCH_TIMEOUT_MS)
          const signal = init?.signal ? AbortSignal.any([init.signal, timeoutSignal]) : timeoutSignal
          return fetch(input, { ...init, signal })
        },
      },
    })
  }
  return cached
}

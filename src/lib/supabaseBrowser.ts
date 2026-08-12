'use client'

import { createClient, type SupabaseClient } from '@supabase/supabase-js'

import type { Database } from './database.types'

/**
 * Tarayıcı istemcisi — yalnızca Realtime aboneliği için.
 *
 * RLS bu anahtara `rooms` ve `players` üzerinde sadece SELECT veriyor. Veri okuma ve
 * tüm yazma işlemleri /api üzerinden gider; bu istemci artık "bir şey değişti" sinyalini
 * almak dışında bir iş yapmaz.
 */

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let cached: SupabaseClient<Database> | null = null

export function supabaseBrowser(): SupabaseClient<Database> | null {
  if (!url || !anonKey) return null
  if (!cached) {
    cached = createClient<Database>(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
      realtime: { params: { eventsPerSecond: 5 } },
    })
  }
  return cached
}

/**
 * RLS duruşunu tarayıcının gördüğü anon anahtarla dışarıdan doğrular.
 *
 * Beklenen: anon rolü rooms/players okuyabilir, names'i hiç göremez ve
 * hiçbir tabloya yazamaz. Tüm yazma işlemleri sunucu route handler'larından geçer.
 *
 * Kullanım: node scripts/verify-rls.mjs
 */

import { readFileSync } from 'node:fs'

function loadEnv() {
  const env = {}
  try {
    for (const line of readFileSync(new URL('../.env.local', import.meta.url), 'utf8').split(/\r?\n/)) {
      const match = line.match(/^([A-Z0-9_]+)=(.*)$/)
      if (match && match[2].trim()) env[match[1]] = match[2].trim()
    }
  } catch {
    // .env.local yoksa process.env'e düşeriz
  }
  return { ...env, ...process.env }
}

const env = loadEnv()
const url = env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || !anonKey) {
  console.error('NEXT_PUBLIC_SUPABASE_URL ve NEXT_PUBLIC_SUPABASE_ANON_KEY gerekli.')
  process.exit(1)
}

const headers = { apikey: anonKey, Authorization: `Bearer ${anonKey}`, 'Content-Type': 'application/json' }

async function request(method, path, body) {
  const res = await fetch(`${url}/rest/v1/${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })
  const text = await res.text()
  return { status: res.status, body: text.slice(0, 200) }
}

const checks = [
  {
    label: 'rooms okunabiliyor (realtime bunu gerektirir)',
    run: () => request('GET', 'rooms?select=id&limit=1'),
    pass: (r) => r.status === 200,
  },
  {
    label: 'players okunabiliyor (realtime bunu gerektirir)',
    run: () => request('GET', 'players?select=id&limit=1'),
    pass: (r) => r.status === 200,
  },
  {
    label: 'names okunamıyor (oyunun doğru cevabı burada)',
    run: () => request('GET', 'names?select=name_text&limit=1'),
    pass: (r) => r.status !== 200 || r.body === '[]',
  },
  {
    label: 'room_runtime okunamıyor (Ortak Hedef hedefi ve isim atamaları burada)',
    run: () => request('GET', 'room_runtime?select=state&limit=1'),
    pass: (r) => r.status !== 200 || r.body === '[]',
  },
  {
    label: 'room_runtime tablosuna yazılamıyor',
    run: () => request('POST', 'room_runtime', { room_id: crypto.randomUUID(), state: {} }),
    pass: (r) => r.status >= 400,
  },
  {
    label: 'player_profiles okunamıyor (cihaz kimlikleri gizli)',
    run: () => request('GET', 'player_profiles?select=device_id&limit=1'),
    pass: (r) => r.status !== 200 || r.body === '[]',
  },
  {
    label: 'game_results okunamıyor',
    run: () => request('GET', 'game_results?select=id&limit=1'),
    pass: (r) => r.status !== 200 || r.body === '[]',
  },
  {
    label: 'rooms tablosuna yazılamıyor',
    run: () => request('POST', 'rooms', { room_code: 'ZZZZZZ' }),
    pass: (r) => r.status >= 400,
  },
  {
    label: 'players tablosuna yazılamıyor',
    run: () => request('POST', 'players', { room_id: crypto.randomUUID(), nickname: 'rls-test' }),
    pass: (r) => r.status >= 400,
  },
  {
    label: 'players skoru değiştirilemiyor',
    run: () => request('PATCH', 'players?score=gte.0', { score: 9999 }),
    pass: (r) => r.status >= 400 || r.body === '[]',
  },
  {
    label: 'rooms tablosu silinemiyor',
    run: () => request('DELETE', 'rooms?status=eq.__nonexistent__'),
    pass: (r) => r.status >= 400,
  },
]

let failed = 0
for (const check of checks) {
  const result = await check.run()
  const ok = check.pass(result)
  if (!ok) failed++
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${check.label}  (HTTP ${result.status})`)
  if (!ok) console.log(`      yanıt: ${result.body}`)
}

console.log(failed === 0 ? '\nTüm RLS kontrolleri geçti.' : `\n${failed} kontrol başarısız.`)
process.exit(failed === 0 ? 0 : 1)

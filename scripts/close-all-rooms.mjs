/**
 * Veritabanındaki tüm açık odaları ('waiting', 'playing', 'finished') 'closed' durumuna getirir.
 * Test aşamasında veya bakım sırasında odaları sıfırlamak için kullanılır.
 *
 * Kullanım: node scripts/close-all-rooms.mjs
 */

import { readFileSync } from 'node:fs'
import { createClient } from '@supabase/supabase-js'

function loadEnv() {
  const env = {}
  try {
    const content = readFileSync(new URL('../.env.local', import.meta.url), 'utf8')
    for (const line of content.split(/\r?\n/)) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const match = trimmed.match(/^([A-Z0-9_]+)=(.*)$/)
      if (match && match[2] !== undefined) {
        env[match[1]] = match[2].trim()
      }
    }
  } catch {
    // .env.local yoksa process.env kullanılır
  }
  return { ...env, ...process.env }
}

const env = loadEnv()
const url = env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = env.SUPABASE_SERVICE_ROLE_KEY

if (!url || !serviceRoleKey) {
  console.error('Hata: NEXT_PUBLIC_SUPABASE_URL ve SUPABASE_SERVICE_ROLE_KEY .env.local dosyasında tanımlı olmalıdır.')
  process.exit(1)
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
})

async function main() {
  console.log(`Bağlanılıyor: ${url}`)

  // 1. Mevcut açık oda sayısını kontrol et
  const { data: openRooms, error: countError } = await supabase
    .from('rooms')
    .select('id, room_code, status, created_at')
    .neq('status', 'closed')

  if (countError) {
    console.error('Odalar sorgulanırken hata oluştu:', countError.message)
    process.exit(1)
  }

  console.log(`Kapatılacak açık oda sayısı: ${openRooms?.length ?? 0}`)
  if (openRooms && openRooms.length > 0) {
    for (const r of openRooms) {
      console.log(` - Oda ID: ${r.id} | Kod: ${r.room_code} | Durum: ${r.status} | Oluşturulma: ${r.created_at}`)
    }

    // 2. Tüm açık odaları kapat
    const { data: updated, error: updateError } = await supabase
      .from('rooms')
      .update({ status: 'closed', is_game_active: false })
      .neq('status', 'closed')
      .select('id')

    if (updateError) {
      console.error('Odalar kapatılırken hata oluştu:', updateError.message)
      process.exit(1)
    }

    console.log(`\nBaşarılı! Toplam ${updated?.length ?? openRooms.length} oda kapatıldı (status='closed', is_game_active=false).`)
  } else {
    console.log('Kapatılacak açık oda bulunamadı. Tüm odalar zaten kapalı.')
  }
}

main().catch((err) => {
  console.error('Beklenmeyen hata:', err)
  process.exit(1)
})

import type { NextRequest } from 'next/server'

import { suggestFamousPerson } from '@/lib/game/engine'
import { jsonOk, route } from '@/lib/http'
import { parseBody, suggestNameSchema } from '@/lib/validation'

/**
 * POST /api/famous-people/suggest
 *
 * Topluluk isim önerisi gönderir.
 * Body:
 * - name: string (2-60 karakter)
 * - category: 'unluler' | 'tarihi_kisiler' | 'cizgi_karakterler' | 'sporcular' | 'dizi_film_karakterleri'
 * - notes?: string (opsiyonel max 200 karakter)
 * - suggestedBy?: string (opsiyonel)
 */
export const POST = route(async (request: NextRequest) => {
  const raw = await request.json()
  const payload = parseBody(suggestNameSchema, raw)

  const suggestion = await suggestFamousPerson(payload)

  return jsonOk({
    success: true,
    message: 'İsim öneriniz başarıyla kaydedildi. Teşekkür ederiz! 🎉',
    data: suggestion,
  })
})

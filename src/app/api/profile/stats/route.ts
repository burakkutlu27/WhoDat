import type { NextRequest } from 'next/server'

import { getDeviceStats } from '@/lib/game/engine'
import { badRequest, jsonOk, route } from '@/lib/http'
import { enforceRateLimit } from '@/lib/rateLimit'
import { statsQuerySchema } from '@/lib/validation'

/**
 * GET /api/profile/stats?deviceId=...
 * Cihaz kimliğine ait geçmiş oyun istatistiklerini (toplam oyun, birincilik, elenmeden bitirme vb.) döner.
 */
export const GET = route(async (request: NextRequest) => {
  enforceRateLimit({
    request,
    bucket: 'get-device-stats',
    limit: 60,
    windowMs: 60 * 1000,
    message: 'Çok fazla istek gönderildi. Lütfen biraz bekleyin.',
  })

  const { searchParams } = new URL(request.url)
  const deviceIdParam = searchParams.get('deviceId')
  if (!deviceIdParam) {
    throw badRequest('missing_device_id', 'deviceId parametresi zorunludur.')
  }

  const parsed = statsQuerySchema.safeParse({ deviceId: deviceIdParam })
  if (!parsed.success) {
    throw badRequest('invalid_device_id', 'Geçersiz cihaz kimliği.')
  }

  const stats = await getDeviceStats(parsed.data.deviceId)
  return jsonOk(stats)
})

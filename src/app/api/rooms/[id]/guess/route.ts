import type { NextRequest } from 'next/server'

import { makeGuess } from '@/lib/game/engine'
import { requireSession } from '@/lib/guards'
import { jsonOk, readJsonBody, route } from '@/lib/http'
import { enforceRateLimit } from '@/lib/rateLimit'
import { roomIdFrom, type RoomRouteContext } from '@/lib/routeContext'
import { guessSchema, parseBody } from '@/lib/validation'

/**
 * POST /api/rooms/[id]/guess — tahmin gönderir.
 *
 * Eşleştirme ve puanlama sunucuda yapılır. Yanlış tahmin sıranın kaybına yol açmaz.
 */
export const POST = route(async (request: NextRequest, context: RoomRouteContext) => {
  const roomId = await roomIdFrom(context)
  const session = requireSession(request, roomId)

  // Doğru cevap istemciye gitmediği için tek yol denemek; deneme hızını sınırla.
  enforceRateLimit({
    request,
    bucket: 'guess',
    limit: 30,
    windowMs: 60 * 1000,
    message: 'Çok hızlı tahmin gönderiyorsunuz. Biraz yavaşlayın.',
  })

  const { guess } = parseBody(guessSchema, await readJsonBody(request))
  const result = await makeGuess(roomId, session.playerId, guess)

  return jsonOk(result)
})

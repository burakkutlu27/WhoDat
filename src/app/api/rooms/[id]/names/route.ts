import type { NextRequest } from 'next/server'

import { submitNames } from '@/lib/game/engine'
import { requireSession } from '@/lib/guards'
import { jsonOk, readJsonBody, route } from '@/lib/http'
import { enforceRateLimit } from '@/lib/rateLimit'
import { roomIdFrom, type RoomRouteContext } from '@/lib/routeContext'
import { parseBody, submitNamesSchema } from '@/lib/validation'

/** POST /api/rooms/[id]/names — oyuncunun isimlerini kaydeder. */
export const POST = route(async (request: NextRequest, context: RoomRouteContext) => {
  const roomId = await roomIdFrom(context)
  const session = requireSession(request, roomId)

  enforceRateLimit({
    request,
    bucket: 'submit-names',
    limit: 20,
    windowMs: 60 * 1000,
    message: 'Çok fazla istek gönderdiniz. Lütfen biraz bekleyin.',
  })

  const { names } = parseBody(submitNamesSchema, await readJsonBody(request))
  const result = await submitNames(roomId, session.playerId, names)

  return jsonOk(result, { status: 201 })
})

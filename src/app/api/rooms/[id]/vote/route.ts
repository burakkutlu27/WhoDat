import type { NextRequest } from 'next/server'

import { submitTextVote } from '@/lib/game/engine'
import { requireSession } from '@/lib/guards'
import { jsonOk, readJsonBody } from '@/lib/http'
import { roomRoute } from '@/lib/roomRoute'
import { enforceRateLimit } from '@/lib/rateLimit'
import { roomIdFrom, type RoomRouteContext } from '@/lib/routeContext'
import { parseBody, submitTextVoteSchema } from '@/lib/validation'

/**
 * POST /api/rooms/[id]/vote — Tam Metin modunda diğer oyuncuların Evet / Hayır oyu vermesi.
 */
export const POST = roomRoute(async (request: NextRequest, context: RoomRouteContext) => {
  const roomId = await roomIdFrom(context)
  const session = requireSession(request, roomId)

  enforceRateLimit({
    request,
    bucket: 'vote',
    limit: 30,
    windowMs: 60 * 1000,
    message: 'Çok hızlı oy kullanıyorsunuz.',
  })

  const { voteId, answer } = parseBody(
    submitTextVoteSchema,
    await readJsonBody(request),
  )

  const result = await submitTextVote(roomId, session.playerId, voteId, answer)
  return jsonOk(result)
})

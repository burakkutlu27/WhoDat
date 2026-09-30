import type { NextRequest } from 'next/server'

import { askSharedQuestion } from '@/lib/game/engine'
import { requireSession } from '@/lib/guards'
import { jsonOk, readJsonBody } from '@/lib/http'
import { roomRoute } from '@/lib/roomRoute'
import { enforceRateLimit } from '@/lib/rateLimit'
import { roomIdFrom, type RoomRouteContext } from '@/lib/routeContext'
import { askQuestionSchema, parseBody } from '@/lib/validation'

/**
 * POST /api/rooms/[id]/question — Ortak Hedef modunda soru gönderir.
 */
export const POST = roomRoute(async (request: NextRequest, context: RoomRouteContext) => {
  const roomId = await roomIdFrom(context)
  const session = requireSession(request, roomId)

  enforceRateLimit({
    request,
    bucket: 'question',
    limit: 20,
    windowMs: 60 * 1000,
    message: 'Çok hızlı soru gönderiyorsunuz. Lütfen biraz bekleyin.',
  })

  const { question } = parseBody(askQuestionSchema, await readJsonBody(request))
  const result = await askSharedQuestion(roomId, session.playerId, question)

  return jsonOk(result)
})

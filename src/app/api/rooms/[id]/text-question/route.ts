import type { NextRequest } from 'next/server'

import { askTextQuestion } from '@/lib/game/engine'
import { requireSession } from '@/lib/guards'
import { jsonOk, readJsonBody } from '@/lib/http'
import { roomRoute } from '@/lib/roomRoute'
import { enforceRateLimit } from '@/lib/rateLimit'
import { roomIdFrom, type RoomRouteContext } from '@/lib/routeContext'
import { askTextQuestionSchema, parseBody } from '@/lib/validation'

/**
 * POST /api/rooms/[id]/text-question — Tam Metin modunda sıradaki oyuncunun soru seçip göndermesi.
 */
export const POST = roomRoute(async (request: NextRequest, context: RoomRouteContext) => {
  const roomId = await roomIdFrom(context)
  const session = requireSession(request, roomId)

  enforceRateLimit({
    request,
    bucket: 'text-question',
    limit: 20,
    windowMs: 60 * 1000,
    message: 'Çok hızlı soru gönderiyorsunuz. Lütfen biraz bekleyin.',
  })

  const { questionId, questionText } = parseBody(
    askTextQuestionSchema,
    await readJsonBody(request),
  )

  const result = await askTextQuestion(roomId, session.playerId, {
    questionId,
    questionText,
  })

  return jsonOk(result)
})

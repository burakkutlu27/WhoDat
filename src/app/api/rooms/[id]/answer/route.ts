import type { NextRequest } from 'next/server'

import { answerSharedQuestion } from '@/lib/game/engine'
import { requireSession } from '@/lib/guards'
import { jsonOk, readJsonBody, route } from '@/lib/http'
import { roomIdFrom, type RoomRouteContext } from '@/lib/routeContext'
import { answerQuestionSchema, parseBody } from '@/lib/validation'

/**
 * POST /api/rooms/[id]/answer — Ortak Hedef modunda Hakem'in soruyu yanıtlaması.
 */
export const POST = route(async (request: NextRequest, context: RoomRouteContext) => {
  const roomId = await roomIdFrom(context)
  const session = requireSession(request, roomId)

  const { questionId, answer } = parseBody(answerQuestionSchema, await readJsonBody(request))
  const result = await answerSharedQuestion(roomId, session.playerId, questionId, answer)

  return jsonOk(result)
})

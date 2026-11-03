import type { NextRequest } from 'next/server'

import { startNextSharedTargetRound } from '@/lib/game/engine'
import { requireSession } from '@/lib/guards'
import { jsonOk, readJsonBody } from '@/lib/http'
import { roomRoute } from '@/lib/roomRoute'
import { roomIdFrom, type RoomRouteContext } from '@/lib/routeContext'
import { parseBody, setTargetSchema } from '@/lib/validation'

/**
 * POST /api/rooms/[id]/next-round — Ortak Hedef modunda sonraki tura geçer.
 */
export const POST = roomRoute(async (request: NextRequest, context: RoomRouteContext) => {
  const roomId = await roomIdFrom(context)
  const session = requireSession(request, roomId)

  const { targetName } = parseBody(setTargetSchema, await readJsonBody(request))
  const result = await startNextSharedTargetRound(roomId, session.playerId, targetName)

  return jsonOk(result)
})

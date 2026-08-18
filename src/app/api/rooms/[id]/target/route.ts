import type { NextRequest } from 'next/server'

import { setRoomTarget } from '@/lib/game/engine'
import { requireSession } from '@/lib/guards'
import { jsonOk, readJsonBody, route } from '@/lib/http'
import { roomIdFrom, type RoomRouteContext } from '@/lib/routeContext'
import { parseBody, setTargetSchema } from '@/lib/validation'

/**
 * POST /api/rooms/[id]/target — Ortak Hedef modunda gizli hedef belirler.
 */
export const POST = route(async (request: NextRequest, context: RoomRouteContext) => {
  const roomId = await roomIdFrom(context)
  const session = requireSession(request, roomId)

  const { targetName } = parseBody(setTargetSchema, await readJsonBody(request))
  const result = await setRoomTarget(roomId, session.playerId, targetName)

  return jsonOk(result)
})

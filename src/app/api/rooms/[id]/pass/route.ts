import type { NextRequest } from 'next/server'

import { passTurn } from '@/lib/game/engine'
import { requireSession } from '@/lib/guards'
import { jsonOk } from '@/lib/http'
import { roomRoute } from '@/lib/roomRoute'
import { roomIdFrom, type RoomRouteContext } from '@/lib/routeContext'

/** POST /api/rooms/[id]/pass — sırayı bir sonraki oyuncuya devreder. */
export const POST = roomRoute(async (request: NextRequest, context: RoomRouteContext) => {
  const roomId = await roomIdFrom(context)
  const session = requireSession(request, roomId)

  const result = await passTurn(roomId, session.playerId)
  return jsonOk(result)
})

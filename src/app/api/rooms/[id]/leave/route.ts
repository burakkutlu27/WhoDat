import type { NextRequest } from 'next/server'

import { leaveRoom } from '@/lib/game/engine'
import { requireSession } from '@/lib/guards'
import { jsonOk } from '@/lib/http'
import { roomRoute } from '@/lib/roomRoute'
import { roomIdFrom, type RoomRouteContext } from '@/lib/routeContext'
import { clearedSessionCookie } from '@/lib/session'

/** POST /api/rooms/[id]/leave — oyuncuyu odadan çıkarır ve oturum çerezini siler. */
export const POST = roomRoute(async (request: NextRequest, context: RoomRouteContext) => {
  const roomId = await roomIdFrom(context)
  const session = requireSession(request, roomId)

  const result = await leaveRoom(roomId, session.playerId)

  const response = jsonOk(result)
  const cookie = clearedSessionCookie()
  response.cookies.set(cookie.name, cookie.value, cookie.options)
  return response
})

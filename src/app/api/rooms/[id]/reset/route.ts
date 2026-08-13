import type { NextRequest } from 'next/server'

import { resetGame } from '@/lib/game/engine'
import { requireSession } from '@/lib/guards'
import { jsonOk, route } from '@/lib/http'
import { roomIdFrom, type RoomRouteContext } from '@/lib/routeContext'

/** POST /api/rooms/[id]/reset — odayı yeni bir tur için bekleme durumuna döndürür. */
export const POST = route(async (request: NextRequest, context: RoomRouteContext) => {
  const roomId = await roomIdFrom(context)
  const session = requireSession(request, roomId)

  await resetGame(roomId, session.playerId)
  return jsonOk({ ok: true })
})

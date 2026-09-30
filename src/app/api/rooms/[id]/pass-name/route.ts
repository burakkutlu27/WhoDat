import type { NextRequest } from 'next/server'

import { giveUp } from '@/lib/game/engine'
import { requireSession } from '@/lib/guards'
import { jsonOk } from '@/lib/http'
import { roomRoute } from '@/lib/roomRoute'
import { roomIdFrom, type RoomRouteContext } from '@/lib/routeContext'

/** POST /api/rooms/[id]/pass-name — mevcut ismi pas geçer (can kaybı olmadan yeni isim alır ve sırayı devreder, toplam 3 hak). */
export const POST = roomRoute(async (request: NextRequest, context: RoomRouteContext) => {
  const roomId = await roomIdFrom(context)
  const session = requireSession(request, roomId)

  const result = await giveUp(roomId, session.playerId)
  return jsonOk(result)
})

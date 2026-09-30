import type { NextRequest } from 'next/server'

import { getGameState } from '@/lib/game/engine'
import { requireSession } from '@/lib/guards'
import { jsonOk } from '@/lib/http'
import { roomRoute } from '@/lib/roomRoute'
import { roomIdFrom, type RoomRouteContext } from '@/lib/routeContext'

/**
 * GET /api/rooms/[id]/state — sanitize edilmiş oyun durumu.
 *
 * İstemcinin tek veri kaynağı burasıdır. Doğru cevap, sırası gelen oyuncuya
 * gönderilmez; önceden bu bilgi herkesin tarayıcısına iniyordu.
 */
export const GET = roomRoute(async (request: NextRequest, context: RoomRouteContext) => {
  const roomId = await roomIdFrom(context)
  const session = requireSession(request, roomId)

  const state = await getGameState(roomId, session.playerId)
  return jsonOk(state, { headers: { 'Cache-Control': 'no-store' } })
})

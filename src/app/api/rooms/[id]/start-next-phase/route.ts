import type { NextRequest } from 'next/server'

import { startNextPhaseByHost } from '@/lib/game/engine'
import { requireSession } from '@/lib/guards'
import { jsonOk } from '@/lib/http'
import { roomRoute } from '@/lib/roomRoute'
import { roomIdFrom, type RoomRouteContext } from '@/lib/routeContext'

/**
 * POST /api/rooms/[id]/start-next-phase
 *
 * 3 Fazlı modda host'un oyuncuların hazır olmasını beklemeden veya herkes hazır olduğunda
 * sonraki faza geçişi anında tetiklemesini sağlar.
 */
export const POST = roomRoute(async (request: NextRequest, context: RoomRouteContext) => {
  const roomId = await roomIdFrom(context)
  const session = requireSession(request, roomId)

  const result = await startNextPhaseByHost(roomId, session.playerId)
  return jsonOk(result)
})

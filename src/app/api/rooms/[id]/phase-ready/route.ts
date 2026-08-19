import type { NextRequest } from 'next/server'

import { setPlayerPhaseReady } from '@/lib/game/engine'
import { requireSession } from '@/lib/guards'
import { jsonOk, route } from '@/lib/http'
import { roomIdFrom, type RoomRouteContext } from '@/lib/routeContext'

/**
 * POST /api/rooms/[id]/phase-ready
 *
 * 3 Fazlı modda faz arası bekleme ekranında oyuncunun hazır olduğunu kaydeder.
 * Tüm oyuncular hazır olduğunda otomatik olarak yeni faz başlatılır.
 */
export const POST = route(async (request: NextRequest, context: RoomRouteContext) => {
  const roomId = await roomIdFrom(context)
  const session = requireSession(request, roomId)

  const result = await setPlayerPhaseReady(roomId, session.playerId)
  return jsonOk(result)
})

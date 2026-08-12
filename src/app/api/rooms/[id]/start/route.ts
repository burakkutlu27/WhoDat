import type { NextRequest } from 'next/server'

import { startGame } from '@/lib/game/engine'
import { requireSession } from '@/lib/guards'
import { jsonOk, route } from '@/lib/http'
import { roomIdFrom, type RoomRouteContext } from '@/lib/routeContext'

/**
 * POST /api/rooms/[id]/start — oyunu başlatır.
 *
 * Host kontrolü sunucuda, veritabanındaki `is_host` sütunundan yapılır.
 * Önceden bu karar `localStorage.isHost === 'true'` ile veriliyordu.
 */
export const POST = route(async (request: NextRequest, context: RoomRouteContext) => {
  const roomId = await roomIdFrom(context)
  const session = requireSession(request, roomId)

  await startGame(roomId, session.playerId)
  return jsonOk({ ok: true })
})

import type { NextRequest } from 'next/server'

import { autoAssignNames } from '@/lib/game/engine'
import { requireSession } from '@/lib/guards'
import { jsonOk, readJsonBody } from '@/lib/http'
import { roomRoute } from '@/lib/roomRoute'
import { roomIdFrom, type RoomRouteContext } from '@/lib/routeContext'
import { autoAssignSchema, parseBody } from '@/lib/validation'

/**
 * POST /api/rooms/[id]/auto-assign
 *
 * Lobide host'un ünlü veritabanından tek tıkla tüm oyunculara isim atamasını sağlar (Hızlı Başlat).
 */
export const POST = roomRoute(async (request: NextRequest, context: RoomRouteContext) => {
  const roomId = await roomIdFrom(context)
  const session = requireSession(request, roomId)

  const { category } = parseBody(autoAssignSchema, await readJsonBody(request))
  const result = await autoAssignNames(roomId, session.playerId, category)

  return jsonOk(result)
})

import type { NextRequest } from 'next/server'

import { setRoomCategory } from '@/lib/game/engine'
import { requireSession } from '@/lib/guards'
import { jsonOk, readJsonBody, route } from '@/lib/http'
import { roomIdFrom, type RoomRouteContext } from '@/lib/routeContext'
import { parseBody, setRoomCategorySchema } from '@/lib/validation'

/**
 * PATCH /api/rooms/[id]/category — host lobi bekleme ekranındayken kategori ve faz ayarlarını günceller.
 */
export const PATCH = route(async (request: NextRequest, context: RoomRouteContext) => {
  const roomId = await roomIdFrom(context)
  const session = requireSession(request, roomId)

  const settings = parseBody(setRoomCategorySchema, await readJsonBody(request))
  const result = await setRoomCategory(roomId, session.playerId, settings)

  return jsonOk(result)
})

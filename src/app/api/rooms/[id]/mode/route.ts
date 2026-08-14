import type { NextRequest } from 'next/server'

import { setRoomMode } from '@/lib/game/engine'
import { requireSession } from '@/lib/guards'
import { jsonOk, readJsonBody, route } from '@/lib/http'
import { roomIdFrom, type RoomRouteContext } from '@/lib/routeContext'
import { parseBody, setRoomModeSchema } from '@/lib/validation'

/**
 * PATCH /api/rooms/[id]/mode — lobide oyun modunu değiştirir (yalnızca host).
 */
export const PATCH = route(async (request: NextRequest, context: RoomRouteContext) => {
  const roomId = await roomIdFrom(context)
  const session = requireSession(request, roomId)

  const { gameMode } = parseBody(setRoomModeSchema, await readJsonBody(request))
  const result = await setRoomMode(roomId, session.playerId, gameMode)

  return jsonOk(result)
})

export const POST = PATCH


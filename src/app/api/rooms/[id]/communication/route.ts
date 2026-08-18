import type { NextRequest } from 'next/server'

import { setCommunicationMode } from '@/lib/game/engine'
import { requireSession } from '@/lib/guards'
import { jsonOk, readJsonBody, route } from '@/lib/http'
import { roomIdFrom, type RoomRouteContext } from '@/lib/routeContext'
import { parseBody, setCommunicationModeSchema } from '@/lib/validation'

/**
 * PATCH /api/rooms/[id]/communication — Lobide iletişim modunu (sesli vs tam metin) günceller.
 */
export const PATCH = route(async (request: NextRequest, context: RoomRouteContext) => {
  const roomId = await roomIdFrom(context)
  const session = requireSession(request, roomId)

  const { communicationMode } = parseBody(
    setCommunicationModeSchema,
    await readJsonBody(request),
  )

  const result = await setCommunicationMode(roomId, session.playerId, communicationMode)
  return jsonOk(result)
})

import type { NextRequest } from 'next/server'

import { moveToTeamInLobby, setTeamMode, shuffleTeams } from '@/lib/game/engine'
import { requireSession } from '@/lib/guards'
import { jsonOk, readJsonBody } from '@/lib/http'
import { roomRoute } from '@/lib/roomRoute'
import { roomIdFrom, type RoomRouteContext } from '@/lib/routeContext'
import { parseBody, teamActionSchema, teamModeSchema } from '@/lib/validation'

/** PATCH /api/rooms/[id]/teams — takım modunu açar/kapatır (yalnızca host). Gövde: { enabled, teamCount? } */
export const PATCH = roomRoute(async (request: NextRequest, context: RoomRouteContext) => {
  const roomId = await roomIdFrom(context)
  const session = requireSession(request, roomId)

  const settings = parseBody(teamModeSchema, await readJsonBody(request))
  return jsonOk(await setTeamMode(roomId, session.playerId, settings))
})

/**
 * POST /api/rooms/[id]/teams — lobide takım işlemi.
 * { action: 'shuffle' } (host) · { action: 'move', playerId, teamId } (kendini herkes, başkasını host)
 */
export const POST = roomRoute(async (request: NextRequest, context: RoomRouteContext) => {
  const roomId = await roomIdFrom(context)
  const session = requireSession(request, roomId)

  const body = parseBody(teamActionSchema, await readJsonBody(request))
  if (body.action === 'shuffle') return jsonOk(await shuffleTeams(roomId, session.playerId))
  return jsonOk(await moveToTeamInLobby(roomId, session.playerId, body.playerId, body.teamId))
})

import type { NextRequest } from 'next/server'

import { postTeamNote } from '@/lib/game/engine'
import { requireSession } from '@/lib/guards'
import { jsonOk, readJsonBody } from '@/lib/http'
import { enforceRateLimit } from '@/lib/rateLimit'
import { roomRoute } from '@/lib/roomRoute'
import { roomIdFrom, type RoomRouteContext } from '@/lib/routeContext'
import { parseBody, teamNoteSchema } from '@/lib/validation'

/** POST /api/rooms/[id]/team-note — takım arkadaşlarına not (yalnızca kendi takımı görür). */
export const POST = roomRoute(async (request: NextRequest, context: RoomRouteContext) => {
  const roomId = await roomIdFrom(context)
  const session = requireSession(request, roomId)

  enforceRateLimit({
    request,
    bucket: 'team-note',
    limit: 20,
    windowMs: 60 * 1000,
    message: 'Çok hızlı not gönderiyorsunuz. Lütfen biraz bekleyin.',
  })

  const { message } = parseBody(teamNoteSchema, await readJsonBody(request))
  return jsonOk(await postTeamNote(roomId, session.playerId, message), { status: 201 })
})

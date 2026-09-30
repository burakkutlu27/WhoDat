import type { NextRequest } from 'next/server'

import { addBot, removeBot } from '@/lib/game/engine'
import { requireSession } from '@/lib/guards'
import { jsonOk, readJsonBody } from '@/lib/http'
import { enforceRateLimit } from '@/lib/rateLimit'
import { roomRoute } from '@/lib/roomRoute'
import { roomIdFrom, type RoomRouteContext } from '@/lib/routeContext'
import { addBotSchema, parseBody, removeBotSchema } from '@/lib/validation'

/** POST /api/rooms/[id]/bots — lobiye bot ekler (yalnızca host). Gövde: { level } */
export const POST = roomRoute(async (request: NextRequest, context: RoomRouteContext) => {
  const roomId = await roomIdFrom(context)
  const session = requireSession(request, roomId)

  enforceRateLimit({
    request,
    bucket: 'add-bot',
    limit: 30,
    windowMs: 60 * 1000,
    message: 'Çok hızlı bot ekliyorsunuz. Lütfen biraz bekleyin.',
  })

  const { level } = parseBody(addBotSchema, await readJsonBody(request))
  const result = await addBot(roomId, session.playerId, level)
  return jsonOk(result, { status: 201 })
})

/** DELETE /api/rooms/[id]/bots?botId=… — lobiden bot çıkarır (yalnızca host). */
export const DELETE = roomRoute(async (request: NextRequest, context: RoomRouteContext) => {
  const roomId = await roomIdFrom(context)
  const session = requireSession(request, roomId)

  const { botId } = parseBody(removeBotSchema, { botId: request.nextUrl.searchParams.get('botId') })
  const result = await removeBot(roomId, session.playerId, botId)
  return jsonOk(result)
})

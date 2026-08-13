import type { NextRequest } from 'next/server'

import { createRoom } from '@/lib/game/engine'
import { jsonOk, readJsonBody, route } from '@/lib/http'
import { enforceRateLimit } from '@/lib/rateLimit'
import { sessionCookie } from '@/lib/session'
import { createRoomSchema, parseBody } from '@/lib/validation'

/** POST /api/rooms — yeni oda oluşturur ve oluşturanı host olarak kaydeder. */
export const POST = route(async (request: NextRequest) => {
  enforceRateLimit({
    request,
    bucket: 'create-room',
    limit: 10,
    windowMs: 10 * 60 * 1000,
    message: 'Çok fazla oda oluşturdunuz. Lütfen birkaç dakika sonra tekrar deneyin.',
  })

  const { nickname } = parseBody(createRoomSchema, await readJsonBody(request))
  const { roomId, roomCode, playerId } = await createRoom(nickname)

  const response = jsonOk({ roomId, roomCode }, { status: 201 })
  const cookie = sessionCookie({ playerId, roomId, isHost: true })
  response.cookies.set(cookie.name, cookie.value, cookie.options)
  return response
})

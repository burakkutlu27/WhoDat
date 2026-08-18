import type { NextRequest } from 'next/server'

import { joinRoom } from '@/lib/game/engine'
import { jsonOk, readJsonBody, route } from '@/lib/http'
import { enforceRateLimit } from '@/lib/rateLimit'
import { sessionCookie } from '@/lib/session'
import { joinRoomSchema, parseBody } from '@/lib/validation'

/** POST /api/rooms/join — oda koduyla mevcut bir odaya katılır. */
export const POST = route(async (request: NextRequest) => {
  // Oda kodu 6 karakterli olduğu için kaba kuvvetle taranabilir; deneme hızını sınırla.
  enforceRateLimit({
    request,
    bucket: 'join-room',
    limit: 20,
    windowMs: 5 * 60 * 1000,
    message: 'Çok fazla deneme yaptınız. Lütfen birkaç dakika sonra tekrar deneyin.',
  })

  const { roomCode, nickname, deviceId } = parseBody(joinRoomSchema, await readJsonBody(request))
  const { roomId, playerId } = await joinRoom(roomCode, nickname, deviceId)

  const response = jsonOk({ roomId })
  const cookie = sessionCookie({ playerId, roomId, isHost: false })
  response.cookies.set(cookie.name, cookie.value, cookie.options)
  return response
})

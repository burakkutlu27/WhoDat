import { NextRequest } from 'next/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { resetRateLimits } from '@/lib/rateLimit'
import { SESSION_COOKIE, createSessionToken } from '@/lib/session'

/**
 * Route seviyesindeki yetki testleri.
 *
 * Oyun mantığı mock'lanıyor; buradaki soru "tahmin doğru mu" değil, "bu isteğin
 * oyun mantığına ulaşmasına izin veriliyor mu ve kimlik nereden okunuyor".
 */

const makeGuess = vi.fn()
vi.mock('@/lib/game/engine', () => ({
  makeGuess: (...args: unknown[]) => makeGuess(...args),
}))

const { POST } = await import('./route')

const ROOM_ID = 'room-1'
const PLAYER_ID = 'player-1'

function request(options: { cookie?: string; body?: unknown } = {}) {
  return new NextRequest(`http://localhost/api/rooms/${ROOM_ID}/guess`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(options.cookie ? { cookie: options.cookie } : {}),
    },
    body: JSON.stringify(options.body ?? { guess: 'Kemal Sunal' }),
  })
}

const context = { params: Promise.resolve({ id: ROOM_ID }) }

beforeEach(() => {
  resetRateLimits()
  makeGuess.mockReset()
  makeGuess.mockResolvedValue({ correct: true, message: 'Doğru tahmin! +10 puan' })
})

describe('POST /api/rooms/[id]/guess', () => {
  it('çerezsiz isteği 401 ile reddeder', async () => {
    const response = await POST(request(), context)

    expect(response.status).toBe(401)
    await expect(response.json()).resolves.toMatchObject({ error: { code: 'unauthorized' } })
    expect(makeGuess).not.toHaveBeenCalled()
  })

  it('imzası geçersiz çerezi reddeder', async () => {
    const response = await POST(request({ cookie: `${SESSION_COOKIE}=uydurma.imza` }), context)

    expect(response.status).toBe(401)
    expect(makeGuess).not.toHaveBeenCalled()
  })

  it('başka bir odaya ait oturumu 403 ile reddeder', async () => {
    const token = createSessionToken({ playerId: PLAYER_ID, roomId: 'baska-oda', isHost: false })
    const response = await POST(request({ cookie: `${SESSION_COOKIE}=${token}` }), context)

    expect(response.status).toBe(403)
    await expect(response.json()).resolves.toMatchObject({ error: { code: 'wrong_room' } })
    expect(makeGuess).not.toHaveBeenCalled()
  })

  it('kimliği gövdeden değil çerezden alır', async () => {
    const token = createSessionToken({ playerId: PLAYER_ID, roomId: ROOM_ID, isHost: false })
    const response = await POST(
      request({
        cookie: `${SESSION_COOKIE}=${token}`,
        // Kimliğe bürünme denemesi: gövdedeki playerId yok sayılmalı.
        body: { guess: 'Kemal Sunal', playerId: 'kurban-oyuncu' },
      }),
      context,
    )

    expect(response.status).toBe(200)
    expect(makeGuess).toHaveBeenCalledWith(ROOM_ID, PLAYER_ID, 'Kemal Sunal')
  })

  it('geçersiz gövdeyi doğrulama hatasıyla reddeder', async () => {
    const token = createSessionToken({ playerId: PLAYER_ID, roomId: ROOM_ID, isHost: false })
    const response = await POST(
      request({ cookie: `${SESSION_COOKIE}=${token}`, body: { guess: '' } }),
      context,
    )

    expect(response.status).toBe(400)
    await expect(response.json()).resolves.toMatchObject({ error: { code: 'validation_error' } })
    expect(makeGuess).not.toHaveBeenCalled()
  })

  it('çok sayıda istekte hız sınırı uygular', async () => {
    const token = createSessionToken({ playerId: PLAYER_ID, roomId: ROOM_ID, isHost: false })
    const cookie = `${SESSION_COOKIE}=${token}`

    let lastStatus = 200
    for (let attempt = 0; attempt < 40; attempt++) {
      lastStatus = (await POST(request({ cookie }), context)).status
    }

    expect(lastStatus).toBe(429)
  })
})

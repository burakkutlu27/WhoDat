import { NextRequest } from 'next/server'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { ApiError } from '@/lib/http'
import { SESSION_COOKIE, createSessionToken } from '@/lib/session'

const startGame = vi.fn()
vi.mock('@/lib/game/engine', () => ({
  startGame: (...args: unknown[]) => startGame(...args),
}))

const { POST } = await import('./route')

const ROOM_ID = 'room-1'
const context = { params: Promise.resolve({ id: ROOM_ID }) }

function request(cookie?: string) {
  return new NextRequest(`http://localhost/api/rooms/${ROOM_ID}/start`, {
    method: 'POST',
    headers: cookie ? { cookie } : undefined,
  })
}

beforeEach(() => {
  startGame.mockReset()
  startGame.mockResolvedValue(undefined)
})

describe('POST /api/rooms/[id]/start', () => {
  it('çerezsiz isteği reddeder', async () => {
    expect((await POST(request(), context)).status).toBe(401)
    expect(startGame).not.toHaveBeenCalled()
  })

  it('host yetkisini çerezdeki bayrağa göre vermez', async () => {
    // Çerez isHost:true taşısa bile karar veritabanındaki is_host sütununa aittir.
    const token = createSessionToken({ playerId: 'sahte-host', roomId: ROOM_ID, isHost: true })
    startGame.mockRejectedValue(
      new ApiError(403, 'not_host', 'Oyunu yalnızca oda sahibi başlatabilir.'),
    )

    const response = await POST(request(`${SESSION_COOKIE}=${token}`), context)

    expect(startGame).toHaveBeenCalledWith(ROOM_ID, 'sahte-host')
    expect(response.status).toBe(403)
    await expect(response.json()).resolves.toMatchObject({ error: { code: 'not_host' } })
  })

  it('geçerli oturumda oyunu başlatır', async () => {
    const token = createSessionToken({ playerId: 'host-1', roomId: ROOM_ID, isHost: true })
    const response = await POST(request(`${SESSION_COOKIE}=${token}`), context)

    expect(response.status).toBe(200)
    expect(startGame).toHaveBeenCalledWith(ROOM_ID, 'host-1')
  })
})

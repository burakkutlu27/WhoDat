import { NextRequest } from 'next/server'
import { describe, expect, it, vi } from 'vitest'

import { conflict, jsonOk } from './http'
import { roomRoute } from './roomRoute'

const context = { params: Promise.resolve({ id: 'room-1' }) }

function request(method: 'GET' | 'POST') {
  return new NextRequest('http://localhost/api/rooms/room-1/state', { method })
}

describe('roomRoute', () => {
  it('GET isteğini state çakışmasında bir kez yeniden dener', async () => {
    const handler = vi
      .fn()
      .mockRejectedValueOnce(conflict('state_conflict', 'çakışma'))
      .mockResolvedValueOnce(jsonOk({ ok: true }))

    const response = await roomRoute(handler)(request('GET'), context)

    expect(response.status).toBe(200)
    expect(handler).toHaveBeenCalledTimes(2)
  })

  it('aksiyonları (POST) yeniden denemez, 409 döner', async () => {
    const handler = vi.fn().mockRejectedValue(conflict('state_conflict', 'çakışma'))

    const response = await roomRoute(handler)(request('POST'), context)

    expect(response.status).toBe(409)
    expect(handler).toHaveBeenCalledTimes(1)
  })
})

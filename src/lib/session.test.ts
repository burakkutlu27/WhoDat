import { describe, expect, it, vi } from 'vitest'

import { createSessionToken, verifySessionToken } from './session'

const payload = { playerId: 'player-1', roomId: 'room-1', isHost: true }

describe('oturum imzalama', () => {
  it('ürettiği jetonu geri doğrular', () => {
    const session = verifySessionToken(createSessionToken(payload))
    expect(session).toMatchObject(payload)
  })

  it('jetonu olmayan isteği reddeder', () => {
    expect(verifySessionToken(undefined)).toBeNull()
    expect(verifySessionToken('')).toBeNull()
  })

  it('biçimi bozuk jetonu reddeder', () => {
    expect(verifySessionToken('cop')).toBeNull()
    expect(verifySessionToken('.imza')).toBeNull()
  })

  it('imzası değiştirilmiş jetonu reddeder', () => {
    const token = createSessionToken(payload)
    const [body] = token.split('.')
    expect(verifySessionToken(`${body}.sahteimza`)).toBeNull()
  })

  it('gövdesi değiştirilmiş jetonu reddeder', () => {
    // Saldırı senaryosu: başka bir oyuncunun kimliğine bürünmek ya da host olmak.
    const token = createSessionToken(payload)
    const signature = token.slice(token.lastIndexOf('.') + 1)
    const forgedBody = Buffer.from(
      JSON.stringify({ ...payload, playerId: 'baska-oyuncu', exp: 9_999_999_999 }),
    ).toString('base64url')

    expect(verifySessionToken(`${forgedBody}.${signature}`)).toBeNull()
  })

  it('isHost alanı kurcalanmış jetonu reddeder', () => {
    const token = createSessionToken({ ...payload, isHost: false })
    const signature = token.slice(token.lastIndexOf('.') + 1)
    const forgedBody = Buffer.from(
      JSON.stringify({ ...payload, isHost: true, exp: 9_999_999_999 }),
    ).toString('base64url')

    expect(verifySessionToken(`${forgedBody}.${signature}`)).toBeNull()
  })

  it('süresi dolmuş jetonu reddeder', () => {
    const token = createSessionToken(payload)

    vi.useFakeTimers()
    try {
      // Oturum ömrü 12 saat.
      vi.setSystemTime(Date.now() + 13 * 60 * 60 * 1000)
      expect(verifySessionToken(token)).toBeNull()
    } finally {
      vi.useRealTimers()
    }
  })

  it('jetonun içinde oda kimliğini taşır', () => {
    // Bir odanın çerezi başka bir odada kullanılamamalı; guard bu alana bakar.
    const session = verifySessionToken(createSessionToken(payload))
    expect(session?.roomId).toBe('room-1')
  })
})

import { describe, expect, it } from 'vitest'

import { roomCodeFromUrl } from './native'

describe('roomCodeFromUrl', () => {
  it('uygulama davet bağlantısından oda kodunu çıkarır', () => {
    expect(roomCodeFromUrl('kimbu://join/abc234')).toBe('ABC234')
  })

  it('web katılma bağlantısından oda kodunu çıkarır', () => {
    expect(roomCodeFromUrl('https://whodat.burakkutlu.com/room/join?code=XY23ZQ')).toBe('XY23ZQ')
  })

  it('geçersiz veya başka sayfaya giden bağlantıda null döner', () => {
    expect(roomCodeFromUrl('kimbu://join/kisa')).toBeNull()
    expect(roomCodeFromUrl('https://whodat.burakkutlu.com/game/123?code=XY23ZQ')).toBeNull()
    expect(roomCodeFromUrl('bozuk url')).toBeNull()
    expect(roomCodeFromUrl('kimbu://join/../../etc')).toBeNull()
  })
})

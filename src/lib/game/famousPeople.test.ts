import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  buildFamousPerson,
  buildPlayer,
  buildRoom,
  createSupabaseFake,
} from '@/test/supabaseFake'

let fake: ReturnType<typeof createSupabaseFake>

vi.mock('@/lib/supabaseAdmin', () => ({
  supabaseAdmin: () => fake.client,
}))

const {
  autoAssignNames,
  getFamousPeople,
  getSharedTargetRoomData,
  setRoomMode,
} = await import('./engine')

describe('Famous People & Auto-Assign Engine', () => {
  beforeEach(() => {
    fake = createSupabaseFake({
      rooms: [],
      players: [],
      names: [],
      famous_people: [
        buildFamousPerson({ name: 'Barış Manço', category: 'unluler' }),
        buildFamousPerson({ name: 'Cem Yılmaz', category: 'unluler' }),
        buildFamousPerson({ name: 'Mustafa Kemal Atatürk', category: 'tarihi_kisiler' }),
        buildFamousPerson({ name: 'Fatih Sultan Mehmet', category: 'tarihi_kisiler' }),
        buildFamousPerson({ name: 'Batman', category: 'cizgi_karakterler' }),
        buildFamousPerson({ name: 'Arda Güler', category: 'sporcular' }),
        buildFamousPerson({ name: 'Behzat Ç.', category: 'dizi_film_karakterleri' }),
      ],
    })
  })

  describe('getFamousPeople', () => {
    it('arama sorgusu ile eşleşen ünlüleri bulur (ilike)', async () => {
      const results = await getFamousPeople({ query: 'kemal' })
      expect(results.length).toBeGreaterThan(0)
      expect(results.some((r) => r.name.includes('Kemal'))).toBe(true)
    })

    it('kategoriye göre filtreleme yapar', async () => {
      const results = await getFamousPeople({ category: 'tarihi_kisiler' })
      expect(results.length).toBeGreaterThan(0)
      expect(results.every((r) => r.category === 'tarihi_kisiler')).toBe(true)
    })

    it('rastgele limitli öneri getirir', async () => {
      const results = await getFamousPeople({ random: true, limit: 3 })
      expect(results.length).toBeLessThanOrEqual(3)
    })

    it('veritabanı boş olsa bile statik seed verisinden döner', async () => {
      fake.tables.famous_people = []
      const results = await getFamousPeople({ query: 'tarkan' })
      expect(results.length).toBeGreaterThan(0)
      expect(results.some((r) => r.name.toLowerCase().includes('tarkan'))).toBe(true)
    })

    it('vito araması yapıldığında Vito Corleone sonucunu getirir', async () => {
      fake.tables.famous_people = []
      const results = await getFamousPeople({ query: 'vito' })
      expect(results.length).toBeGreaterThan(0)
      expect(results[0]?.name).toContain('Vito Corleone')
    })

    it('edebiyat ve mitoloji karakterlerini bulur', async () => {
      fake.tables.famous_people = []
      const donResults = await getFamousPeople({ query: 'don kişot' })
      expect(donResults.length).toBeGreaterThan(0)

      const zeusResults = await getFamousPeople({ query: 'zeus' })
      expect(zeusResults.length).toBeGreaterThan(0)
    })
  })

  describe('autoAssignNames (Klasik Mod)', () => {
    it('tüm oyunculara veritabanından 3 benzersiz isim atar', async () => {
      const room = buildRoom({ status: 'waiting', game_mode: 'classic' })
      const host = buildPlayer(room.id, { nickname: 'Host', is_host: true })
      const guest = buildPlayer(room.id, { nickname: 'Misafir' })
      fake.tables.rooms = [room]
      fake.tables.players = [host, guest]

      const result = await autoAssignNames(room.id, host.id, 'all')

      expect(result.assignedCount).toBe(6) // 2 oyuncu * 3 isim
      expect(fake.tables.names.length).toBe(6)

      const hostNames = fake.tables.names.filter((n) => n.submitted_by === host.id)
      const guestNames = fake.tables.names.filter((n) => n.submitted_by === guest.id)
      expect(hostNames.length).toBe(3)
      expect(guestNames.length).toBe(3)
    })

    it('host olmayan oyuncu otomatik isim atayamaz', async () => {
      const room = buildRoom({ status: 'waiting' })
      const host = buildPlayer(room.id, { is_host: true })
      const guest = buildPlayer(room.id, { is_host: false })
      fake.tables.rooms = [room]
      fake.tables.players = [host, guest]

      await expect(autoAssignNames(room.id, guest.id, 'all')).rejects.toMatchObject({
        status: 403,
      })
    })

    it('oyun başladıktan sonra otomatik isim atanamaz', async () => {
      const room = buildRoom({ status: 'playing' })
      const host = buildPlayer(room.id, { is_host: true })
      fake.tables.rooms = [room]
      fake.tables.players = [host]

      await expect(autoAssignNames(room.id, host.id, 'all')).rejects.toMatchObject({
        status: 409,
      })
    })

    it('seçilen kategoriye göre isim atar', async () => {
      const room = buildRoom({ status: 'waiting' })
      const host = buildPlayer(room.id, { is_host: true })
      const guest = buildPlayer(room.id, { is_host: false })
      fake.tables.rooms = [room]
      fake.tables.players = [host, guest]

      const result = await autoAssignNames(room.id, host.id, 'tarihi_kisiler')
      expect(result.assignedCount).toBe(6)
      expect(fake.tables.names.length).toBe(6)
    })
  })

  describe('autoAssignNames (Ortak Hedef Modu)', () => {
    it('ortak hedef modunda tek bir rastgele hedef isim belirler', async () => {
      const room = buildRoom({ status: 'waiting', game_mode: 'shared_target' })
      const host = buildPlayer(room.id, { is_host: true })
      const guest = buildPlayer(room.id, { is_host: false })
      fake.tables.rooms = [room]
      fake.tables.players = [host, guest]

      setRoomMode(room.id, host.id, 'shared_target')

      const result = await autoAssignNames(room.id, host.id, 'unluler')

      expect(result.isSharedTarget).toBe(true)
      expect(result.sharedTargetName).toBeTruthy()

      const sharedData = getSharedTargetRoomData(room.id)
      expect(sharedData.targetName).toBe(result.sharedTargetName)
    })
  })
})

import { beforeEach, describe, expect, it, vi } from 'vitest'

import { buildPlayer, buildRoom, createSupabaseFake } from '@/test/supabaseFake'
import {
  closeAllRooms,
  closeExpiredRooms,
  getGameState,
  isRoomExpired,
  joinRoom,
} from './engine'

const fake = createSupabaseFake()

vi.mock('@/lib/supabaseAdmin', () => ({
  supabaseAdmin: () => fake.client,
}))

describe('Oda Zaman Aşımı ve Otomatik Kapanma (Room Expiration)', () => {
  beforeEach(() => {
    fake.tables.rooms = []
    fake.tables.players = []
    fake.tables.names = []
    fake.tables.famous_people = []
    fake.tables.player_profiles = []
    fake.tables.game_results = []
  })

  describe('isRoomExpired', () => {
    it('Yeni oluşturulan oda süresi dolmamış kabul edilir', () => {
      const room = buildRoom({ updated_at: new Date().toISOString() })
      expect(isRoomExpired(room)).toBe(false)
    })

    it('Zaman aşımı süresinden (60 dk) eski oda süresi dolmuş kabul edilir', () => {
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      const room = buildRoom({ updated_at: twoHoursAgo })
      expect(isRoomExpired(room)).toBe(true)
    })

    it('Zaten closed olan oda için isRoomExpired false döner', () => {
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      const room = buildRoom({ status: 'closed', updated_at: twoHoursAgo })
      expect(isRoomExpired(room)).toBe(false)
    })
  })

  describe('Oda erişiminde otomatik kapanma', () => {
    it('Süresi dolmuş odaya getGameState çağrıldığında oda status=closed olur', async () => {
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      const room = buildRoom({
        status: 'playing',
        is_game_active: true,
        updated_at: twoHoursAgo,
        created_at: twoHoursAgo,
      })
      const player = buildPlayer(room.id, { is_host: true })
      fake.tables.rooms = [room]
      fake.tables.players = [player]

      const state = await getGameState(room.id, player.id)

      expect(state.room.status).toBe('closed')
      expect(state.room.isGameActive).toBe(false)
      expect(fake.tables.rooms[0]!.status).toBe('closed')
      expect(fake.tables.rooms[0]!.is_game_active).toBe(false)
    })

    it('Süresi dolmuş odaya joinRoom ile katılınmak istendiğinde room_closed hatası verir ve odayı kapatır', async () => {
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      const room = buildRoom({
        room_code: 'EXPIRD',
        status: 'waiting',
        updated_at: twoHoursAgo,
        created_at: twoHoursAgo,
      })
      fake.tables.rooms = [room]

      await expect(joinRoom('EXPIRD', 'YeniOyuncu')).rejects.toMatchObject({
        code: 'room_closed',
      })

      expect(fake.tables.rooms[0]!.status).toBe('closed')
    })
  })

  describe('Toplu Kapatma ve Temizleme Fonksiyonları', () => {
    it('closeExpiredRooms sadece süresi dolmuş odaları kapatır, taze odalara dokunmaz', async () => {
      const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      const freshTime = new Date(Date.now() - 5 * 60 * 1000).toISOString()

      const staleRoom1 = buildRoom({ status: 'waiting', updated_at: twoHoursAgo, created_at: twoHoursAgo })
      const staleRoom2 = buildRoom({ status: 'playing', is_game_active: true, updated_at: twoHoursAgo, created_at: twoHoursAgo })
      const freshRoom = buildRoom({ status: 'waiting', updated_at: freshTime, created_at: freshTime })
      const alreadyClosed = buildRoom({ status: 'closed', updated_at: twoHoursAgo, created_at: twoHoursAgo })

      fake.tables.rooms = [staleRoom1, staleRoom2, freshRoom, alreadyClosed]

      const closedCount = await closeExpiredRooms(60)

      expect(closedCount).toBe(2)
      expect(fake.tables.rooms.find((r) => r.id === staleRoom1.id)?.status).toBe('closed')
      expect(fake.tables.rooms.find((r) => r.id === staleRoom2.id)?.status).toBe('closed')
      expect(fake.tables.rooms.find((r) => r.id === freshRoom.id)?.status).toBe('waiting')
      expect(fake.tables.rooms.find((r) => r.id === alreadyClosed.id)?.status).toBe('closed')
    })

    it('closeAllRooms tüm açık odaları kapatır', async () => {
      const room1 = buildRoom({ status: 'waiting' })
      const room2 = buildRoom({ status: 'playing', is_game_active: true })
      const closedRoom = buildRoom({ status: 'closed' })

      fake.tables.rooms = [room1, room2, closedRoom]

      const count = await closeAllRooms()

      expect(count).toBe(2)
      expect(fake.tables.rooms.every((r) => r.status === 'closed')).toBe(true)
      expect(fake.tables.rooms.every((r) => !r.is_game_active)).toBe(true)
    })
  })
})

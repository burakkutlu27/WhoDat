import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  buildPlayer,
  buildRoom,
  createSupabaseFake,
} from '@/test/supabaseFake'

let fake: ReturnType<typeof createSupabaseFake>

vi.mock('@/lib/supabaseAdmin', () => ({
  supabaseAdmin: () => fake.client,
}))

const {
  createRoom,
  getDeviceStats,
  joinRoom,
  recordGameResults,
} = await import('./engine')

describe('Liderlik Tablosu & Cihaz Bazlı İstatistikler (Seviye 1)', () => {
  beforeEach(() => {
    fake = createSupabaseFake()
  })

  it('createRoom ve joinRoom ile device_id oyunculara atanır', async () => {
    const { roomId, playerId: hostId } = await createRoom('HostUser', 'classic', {
      deviceId: 'dev_host_123',
    })
    const room = fake.tables.rooms.find((r) => r.id === roomId)!
    expect(room).toBeDefined()

    const host = fake.tables.players.find((p) => p.id === hostId)!
    expect(host.device_id).toBe('dev_host_123')

    const { playerId: guestId } = await joinRoom(room.room_code, 'GuestUser', 'dev_guest_456')
    const guest = fake.tables.players.find((p) => p.id === guestId)!
    expect(guest.device_id).toBe('dev_guest_456')
  })

  it('oyun tamamlandığında recordGameResults profilleri ve sonuçları doğru sıralama ile kaydeder', async () => {
    const room = buildRoom({ status: 'finished', game_mode: 'classic' })
    const host = buildPlayer(room.id, {
      nickname: 'Birinci',
      score: 30,
      device_id: 'dev_player_1',
    })
    const guest = buildPlayer(room.id, {
      nickname: 'Ikinci',
      score: 10,
      device_id: 'dev_player_2',
    })

    fake.tables.rooms.push(room)
    fake.tables.players.push(host, guest)

    await recordGameResults(room.id)

    // Profiller oluşturulmuş olmalı
    expect(fake.tables.player_profiles?.length).toBe(2)
    const hostProfile = fake.tables.player_profiles?.find((p) => p.device_id === 'dev_player_1')
    const guestProfile = fake.tables.player_profiles?.find((p) => p.device_id === 'dev_player_2')
    expect(hostProfile).toBeDefined()
    expect(guestProfile).toBeDefined()

    // Sonuçlar kaydedilmiş olmalı
    expect(fake.tables.game_results?.length).toBe(2)
    const hostResult = fake.tables.game_results?.find((r) => r.player_profile_id === hostProfile!.id)
    const guestResult = fake.tables.game_results?.find((r) => r.player_profile_id === guestProfile!.id)

    expect(hostResult?.placement).toBe(1)
    expect(hostResult?.score).toBe(30)
    expect(guestResult?.placement).toBe(2)
    expect(guestResult?.score).toBe(10)
  })

  it('recordGameResults çağrısı idempotent olmalıdır (tekrar çağrıldığında mükerrer kayıt oluşturmaz)', async () => {
    const room = buildRoom({ status: 'finished', game_mode: 'speed' })
    const player = buildPlayer(room.id, {
      nickname: 'TekOyuncu',
      score: 50,
      device_id: 'dev_solo_1',
    })

    fake.tables.rooms.push(room)
    fake.tables.players.push(player)

    await recordGameResults(room.id)
    expect(fake.tables.game_results?.length).toBe(1)

    // İkinci kez çağırıldığında
    await recordGameResults(room.id)
    expect(fake.tables.game_results?.length).toBe(1)
  })

  it('getDeviceStats bilinmeyen cihaz için sıfır istatistik döner', async () => {
    const stats = await getDeviceStats('bilinmeyen_cihaz')
    expect(stats.totalGames).toBe(0)
    expect(stats.totalWins).toBe(0)
    expect(stats.totalSurvived).toBe(0)
    expect(stats.winRate).toBe(0)
    expect(stats.highScore).toBe(0)
    expect(stats.recentGames).toEqual([])
  })

  it('getDeviceStats birden fazla oyun sonucunu doğru özetler', async () => {
    const deviceId = 'dev_pro_player'
    const profileId = 'prof_123'

    fake.tables.player_profiles?.push({
      id: profileId,
      device_id: deviceId,
      created_at: new Date().toISOString(),
    })

    fake.tables.game_results?.push(
      {
        id: 'res_1',
        player_profile_id: profileId,
        game_room_id: 'room_1',
        game_mode: 'classic',
        score: 30,
        placement: 1, // Kazanma
        survived: true,
        played_at: '2026-08-18T10:00:00.000Z',
      },
      {
        id: 'res_2',
        player_profile_id: profileId,
        game_room_id: 'room_2',
        game_mode: 'speed',
        score: 50,
        placement: 1, // Kazanma
        survived: true,
        played_at: '2026-08-18T11:00:00.000Z',
      },
      {
        id: 'res_3',
        player_profile_id: profileId,
        game_room_id: 'room_3',
        game_mode: 'persistent',
        score: 0,
        placement: 3, // Kayıp
        survived: false,
        played_at: '2026-08-18T12:00:00.000Z',
      },
    )

    const stats = await getDeviceStats(deviceId)
    expect(stats.totalGames).toBe(3)
    expect(stats.totalWins).toBe(2)
    expect(stats.totalSurvived).toBe(2)
    expect(stats.winRate).toBe(67) // 2/3 = 66.67% -> 67%
    expect(stats.highScore).toBe(50)
    expect(stats.recentGames.length).toBe(3)
    expect(stats.recentGames[0]?.score).toBe(0) // En son oynanan (desc order)
  })
})

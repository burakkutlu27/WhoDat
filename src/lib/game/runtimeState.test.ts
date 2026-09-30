import { describe, expect, it, vi } from 'vitest'

import { buildName, buildPlayer, buildRoom, createSupabaseFake, type FakeTables } from '@/test/supabaseFake'

let fake: ReturnType<typeof createSupabaseFake>

vi.mock('@/lib/supabaseAdmin', () => ({
  supabaseAdmin: () => fake.client,
}))

const {
  getGameState,
  getPlayerLives,
  getSharedTargetRoomData,
  makeGuess,
  setPlayerLives,
  setPlayerPassRights,
  setPlayerRoundNameId,
  setSharedTargetRoomData,
} = await import('./engine')
const { evictRoomRuntime, withRoomRuntime } = await import('./runtimeState')

/**
 * Serverless ortamda her istek başka bir instance'a düşebilir. "Başka instance"ı,
 * bu sürecin oda hakkındaki bellek bilgisini `evictRoomRuntime` ile silerek taklit ediyoruz:
 * sonraki kapsam her şeyi DB'den (fake) okumak zorunda kalıyor.
 */

function playingRoom() {
  const room = buildRoom({ status: 'playing', is_game_active: true, game_mode: 'classic' })
  const host = buildPlayer(room.id, { nickname: 'Host', is_host: true })
  const guest = buildPlayer(room.id, { nickname: 'Misafir' })
  const hostName = buildName(room.id, host.id, { name_text: 'Kemal Sunal' })
  const guestName = buildName(room.id, guest.id, { name_text: 'Türkan Şoray' })

  room.current_player_id = host.id
  room.current_identity_id = guestName.id

  setPlayerRoundNameId(room.id, host.id, guestName.id)
  setPlayerRoundNameId(room.id, guest.id, hostName.id)
  setPlayerLives(room.id, host.id, 3)
  setPlayerLives(room.id, guest.id, 3)
  setPlayerPassRights(room.id, host.id, 3)
  setPlayerPassRights(room.id, guest.id, 3)

  const tables: FakeTables = { rooms: [room], players: [host, guest], names: [hostName, guestName] }
  fake = createSupabaseFake(tables)
  return { room, host, guest }
}

function runtimeRow(roomId: string) {
  return fake.tables.room_runtime?.find((row) => row.room_id === roomId)
}

describe('withRoomRuntime', () => {
  it('bir instance\'ta düşen can, belleği boş başka bir instance\'ta da düşük görünür', async () => {
    const { room, host } = playingRoom()

    await withRoomRuntime(room.id, () => makeGuess(room.id, host.id, 'Cem Yılmaz'))
    expect(runtimeRow(room.id)?.version).toBe(1)

    evictRoomRuntime(room.id)
    // Kapsam dışında bellek boş: varsayılan can dönüyor.
    expect(getPlayerLives(room.id, host.id)).toBe(3)

    const lives = await withRoomRuntime(room.id, async () => getPlayerLives(room.id, host.id))
    expect(lives).toBe(2)
  })

  it('state değişmediğinde DB\'ye tekrar yazmaz', async () => {
    const { room, guest } = playingRoom()

    await withRoomRuntime(room.id, () => getGameState(room.id, guest.id))
    const versionAfterFirstRead = runtimeRow(room.id)?.version

    await withRoomRuntime(room.id, () => getGameState(room.id, guest.id))
    await withRoomRuntime(room.id, () => getGameState(room.id, guest.id))

    expect(runtimeRow(room.id)?.version).toBe(versionAfterFirstRead)
  })

  it('başka bir instance araya yazdıysa 409 döner, sonraki kapsam güncel state\'i yükler', async () => {
    const { room, host, guest } = playingRoom()
    await withRoomRuntime(room.id, async () => undefined)
    const row = runtimeRow(room.id)!

    await expect(
      withRoomRuntime(room.id, async () => {
        // Bu istek sürerken başka bir instance misafirin canını 1'e indirip yazıyor.
        const other = JSON.parse(JSON.stringify(row.state)) as { lives: { __map: [string, number][] } }
        other.lives.__map = other.lives.__map.map(([id, value]) => [id, id === guest.id ? 1 : value])
        row.state = other
        row.version += 1

        setPlayerLives(room.id, host.id, 2)
      }),
    ).rejects.toMatchObject({ status: 409, code: 'state_conflict' })

    const [hostLives, guestLives] = await withRoomRuntime(room.id, async () => [
      getPlayerLives(room.id, host.id),
      getPlayerLives(room.id, guest.id),
    ])
    // Çakışan yazma kaybolur, diğer instance'ın yazdığı kazanır.
    expect(hostLives).toBe(3)
    expect(guestLives).toBe(1)
  })

  it('Map ve Set içeren state\'i kayıpsız taşır', async () => {
    const { room, host, guest } = playingRoom()

    await withRoomRuntime(room.id, async () => {
      setSharedTargetRoomData(room.id, {
        targetName: 'Barış Manço',
        targetRevealed: false,
        roundWinnerId: null,
        questionLog: [],
        pendingQuestion: null,
        playerPenalties: new Map([[guest.id, true]]),
        roundScores: new Map([[host.id, [100, 0]]]),
      })
    })

    evictRoomRuntime(room.id)
    const data = await withRoomRuntime(room.id, async () => getSharedTargetRoomData(room.id))

    expect(data.targetName).toBe('Barış Manço')
    expect(data.playerPenalties).toBeInstanceOf(Map)
    expect(data.playerPenalties.get(guest.id)).toBe(true)
    expect(data.roundScores.get(host.id)).toEqual([100, 0])
  })

  it('aynı odadaki eşzamanlı istekleri sıraya sokar', async () => {
    const { room } = playingRoom()
    const events: string[] = []

    await Promise.all([
      withRoomRuntime(room.id, async () => {
        events.push('a:start')
        await new Promise((resolve) => setTimeout(resolve, 20))
        events.push('a:end')
      }),
      withRoomRuntime(room.id, async () => {
        events.push('b:start')
        events.push('b:end')
      }),
    ])

    expect(events).toEqual(['a:start', 'a:end', 'b:start', 'b:end'])
  })

  it('aynı oda için iç içe kapsam kendini beklemez', async () => {
    const { room } = playingRoom()

    const value = await withRoomRuntime(room.id, () => withRoomRuntime(room.id, async () => 42))

    expect(value).toBe(42)
  })

  it('iş hata fırlatsa da bellek değişikliklerini yazar ve asıl hatayı iletir', async () => {
    const { room, host } = playingRoom()

    await expect(
      withRoomRuntime(room.id, async () => {
        setPlayerLives(room.id, host.id, 1)
        throw new Error('yarıda kaldı')
      }),
    ).rejects.toThrow('yarıda kaldı')

    evictRoomRuntime(room.id)
    const lives = await withRoomRuntime(room.id, async () => getPlayerLives(room.id, host.id))
    expect(lives).toBe(1)
  })
})

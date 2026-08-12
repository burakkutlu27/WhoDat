import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  buildName,
  buildPlayer,
  buildRoom,
  createSupabaseFake,
  type FakeTables,
} from '@/test/supabaseFake'

let fake: ReturnType<typeof createSupabaseFake>

vi.mock('@/lib/supabaseAdmin', () => ({
  supabaseAdmin: () => fake.client,
}))

const { getGameState, leaveRoom, makeGuess, passTurn, startGame, submitNames } = await import(
  './engine'
)

/** İki oyunculu, oyun başlamış bir oda kurar. */
function playingRoom() {
  const room = buildRoom({ status: 'playing', is_game_active: true, game_round: 1 })
  const host = buildPlayer(room.id, { nickname: 'Host', is_host: true })
  const guest = buildPlayer(room.id, { nickname: 'Misafir' })

  const hostName = buildName(room.id, host.id, { name_text: 'Kemal Sunal' })
  const guestName = buildName(room.id, guest.id, { name_text: 'Türkan Şoray' })

  // Sıra host'ta; host, misafirin yazdığı ismi bulmaya çalışıyor.
  room.current_player_id = host.id
  room.current_identity_id = guestName.id
  guestName.used_in_round = 1

  const tables: FakeTables = { rooms: [room], players: [host, guest], names: [hostName, guestName] }
  return { room, host, guest, hostName, guestName, tables }
}

describe('getGameState', () => {
  it('doğru cevabı sırası gelen oyuncuya göndermez', async () => {
    const { room, host, tables } = playingRoom()
    fake = createSupabaseFake(tables)

    const state = await getGameState(room.id, host.id)

    expect(state.you.isYourTurn).toBe(true)
    expect(state.currentName).toBeNull()
  })

  it('doğru cevabı diğer oyunculara gösterir', async () => {
    const { room, guest, tables } = playingRoom()
    fake = createSupabaseFake(tables)

    const state = await getGameState(room.id, guest.id)

    expect(state.you.isYourTurn).toBe(false)
    expect(state.currentName).toBe('Türkan Şoray')
  })

  it('odada olmayan biri durumu okuyamaz', async () => {
    const { room, tables } = playingRoom()
    fake = createSupabaseFake(tables)

    await expect(getGameState(room.id, 'yabanci-oyuncu')).rejects.toMatchObject({
      code: 'player_not_in_room',
      status: 404,
    })
  })
})

describe('makeGuess', () => {
  beforeEach(() => {
    fake = createSupabaseFake(playingRoom().tables)
  })

  it('sırası olmayan oyuncunun tahminini reddeder', async () => {
    const { room, guest, tables } = playingRoom()
    fake = createSupabaseFake(tables)

    await expect(makeGuess(room.id, guest.id, 'Türkan Şoray')).rejects.toMatchObject({
      code: 'not_your_turn',
      status: 403,
    })
  })

  it('yanlış tahminde sırayı ve puanı değiştirmez', async () => {
    const { room, host, tables } = playingRoom()
    fake = createSupabaseFake(tables)

    const result = await makeGuess(room.id, host.id, 'Cem Yılmaz')

    expect(result.correct).toBe(false)
    expect(tables.rooms[0]!.current_player_id).toBe(host.id)
    expect(tables.players.find((player) => player.id === host.id)!.score).toBe(0)
  })

  it('doğru tahminde 10 puan verir ve sırayı devreder', async () => {
    const { room, host, guest, tables } = playingRoom()
    fake = createSupabaseFake(tables)

    const result = await makeGuess(room.id, host.id, 'Türkan Şoray')

    expect(result.correct).toBe(true)
    expect(tables.players.find((player) => player.id === host.id)!.score).toBe(10)
    expect(tables.rooms[0]!.current_player_id).toBe(guest.id)
    expect(tables.rooms[0]!.game_round).toBe(2)
  })

  it('küçük yazım hatasını doğru sayar', async () => {
    const { room, host, tables } = playingRoom()
    fake = createSupabaseFake(tables)

    const result = await makeGuess(room.id, host.id, 'turkan soray')
    expect(result.correct).toBe(true)
  })

  it('aynı turu iki kez tamamlayarak çift puan almayı engeller', async () => {
    const { room, host, tables } = playingRoom()
    fake = createSupabaseFake(tables)

    // İki istek de "sıra bende" durumunu okuduktan sonra yazmaya çalışıyor.
    const [first, second] = await Promise.allSettled([
      makeGuess(room.id, host.id, 'Türkan Şoray'),
      makeGuess(room.id, host.id, 'Türkan Şoray'),
    ])

    const fulfilled = [first, second].filter((outcome) => outcome.status === 'fulfilled')
    expect(fulfilled).toHaveLength(1)
    expect(tables.players.find((player) => player.id === host.id)!.score).toBe(10)
  })

  it('son isim de bulunduğunda oyunu bitirir', async () => {
    const { room, host, guest, tables } = playingRoom()
    // Host'un yazdığı ismi de kullanılmış işaretle: sırada isim kalmasın.
    tables.names.find((name) => name.submitted_by === host.id)!.used_in_round = 1
    fake = createSupabaseFake(tables)

    const result = await makeGuess(room.id, host.id, 'Türkan Şoray')

    expect(result.finished).toBe(true)
    expect(tables.rooms[0]!.status).toBe('finished')
    expect(tables.rooms[0]!.is_game_active).toBe(false)
    expect(guest.id).toBeTruthy()
  })
})

describe('passTurn', () => {
  it('yalnızca sırası olan oyuncu pas geçebilir', async () => {
    const { room, guest, tables } = playingRoom()
    fake = createSupabaseFake(tables)

    await expect(passTurn(room.id, guest.id)).rejects.toMatchObject({ code: 'not_your_turn' })
  })

  it('pas geçen oyuncuya puan vermez', async () => {
    const { room, host, guest, tables } = playingRoom()
    fake = createSupabaseFake(tables)

    await passTurn(room.id, host.id)

    expect(tables.players.find((player) => player.id === host.id)!.score).toBe(0)
    expect(tables.rooms[0]!.current_player_id).toBe(guest.id)
  })
})

describe('startGame', () => {
  function waitingRoom() {
    const room = buildRoom({ status: 'waiting' })
    const host = buildPlayer(room.id, { nickname: 'Host', is_host: true })
    const guest = buildPlayer(room.id, { nickname: 'Misafir' })
    const tables: FakeTables = {
      rooms: [room],
      players: [host, guest],
      names: [
        buildName(room.id, host.id, { name_text: 'Kemal Sunal' }),
        buildName(room.id, guest.id, { name_text: 'Türkan Şoray' }),
      ],
    }
    return { room, host, guest, tables }
  }

  it('host olmayan oyuncu oyunu başlatamaz', async () => {
    const { room, guest, tables } = waitingRoom()
    fake = createSupabaseFake(tables)

    await expect(startGame(room.id, guest.id)).rejects.toMatchObject({
      code: 'not_host',
      status: 403,
    })
    expect(tables.rooms[0]!.status).toBe('waiting')
  })

  it('odada olmayan biri oyunu başlatamaz', async () => {
    const { room, tables } = waitingRoom()
    fake = createSupabaseFake(tables)

    await expect(startGame(room.id, 'yabanci')).rejects.toMatchObject({
      code: 'player_not_in_room',
    })
  })

  it('tek oyuncuyla başlatmayı reddeder', async () => {
    const { room, host, tables } = waitingRoom()
    tables.players = [host]
    fake = createSupabaseFake(tables)

    await expect(startGame(room.id, host.id)).rejects.toMatchObject({
      code: 'not_enough_players',
    })
  })

  it('bir oyuncu isim göndermediyse başlatmayı reddeder', async () => {
    const { room, host, guest, tables } = waitingRoom()
    tables.names = tables.names.filter((name) => name.submitted_by !== guest.id)
    fake = createSupabaseFake(tables)

    await expect(startGame(room.id, host.id)).rejects.toMatchObject({ code: 'names_missing' })
  })

  it('host oyunu başlatınca ilk sırayı ve ismi belirler', async () => {
    const { room, host, tables } = waitingRoom()
    fake = createSupabaseFake(tables)

    await startGame(room.id, host.id)

    const updated = tables.rooms[0]!
    expect(updated.status).toBe('playing')
    expect(updated.is_game_active).toBe(true)
    expect(updated.current_player_id).toBe(host.id)
    // Host kendi yazdığı ismi tahmin etmemeli.
    const chosen = tables.names.find((name) => name.id === updated.current_identity_id)!
    expect(chosen.submitted_by).not.toBe(host.id)
  })
})

describe('submitNames', () => {
  function lobby() {
    const room = buildRoom({ status: 'waiting' })
    const host = buildPlayer(room.id, { nickname: 'Host', is_host: true })
    const guest = buildPlayer(room.id, { nickname: 'Misafir' })
    const tables: FakeTables = { rooms: [room], players: [host, guest], names: [] }
    return { room, host, guest, tables }
  }

  it('isimleri kaydeder', async () => {
    const { room, host, tables } = lobby()
    fake = createSupabaseFake(tables)

    const result = await submitNames(room.id, host.id, ['Kemal Sunal', 'Türkan Şoray'])

    expect(result.accepted).toHaveLength(2)
    expect(result.duplicates).toHaveLength(0)
    expect(tables.names).toHaveLength(2)
  })

  it('çakışan isim yüzünden gönderimi tamamen kaybetmez', async () => {
    // Eski davranış: döngü ilk çakışmada kırılıyor, oyuncu kalıcı olarak kilitleniyordu.
    const { room, host, guest, tables } = lobby()
    tables.names.push(buildName(room.id, host.id, { name_text: 'Kemal Sunal' }))
    fake = createSupabaseFake(tables)

    const result = await submitNames(room.id, guest.id, ['Kemal Sunal', 'Türkan Şoray'])

    expect(result.accepted).toEqual(['Türkan Şoray'])
    expect(result.duplicates).toEqual(['Kemal Sunal'])
  })

  it('hepsi çakışıyorsa nedenini bildirir', async () => {
    const { room, host, guest, tables } = lobby()
    tables.names.push(buildName(room.id, host.id, { name_text: 'Kemal Sunal' }))
    fake = createSupabaseFake(tables)

    await expect(submitNames(room.id, guest.id, ['Kemal Sunal'])).rejects.toMatchObject({
      code: 'all_names_taken',
    })
  })

  it('aynı istekteki tekrarları ayıklar', async () => {
    const { room, host, tables } = lobby()
    fake = createSupabaseFake(tables)

    const result = await submitNames(room.id, host.id, ['Kemal Sunal', 'kemal sunal'])

    expect(result.accepted).toHaveLength(1)
  })

  it('oyun başladıktan sonra isim eklenemez', async () => {
    const { room, host, tables } = lobby()
    tables.rooms[0]!.status = 'playing'
    fake = createSupabaseFake(tables)

    await expect(submitNames(room.id, host.id, ['Kemal Sunal'])).rejects.toMatchObject({
      code: 'game_already_started',
    })
  })
})

describe('leaveRoom', () => {
  it('host ayrılınca kalan oyunculardan birini host yapar', async () => {
    const { room, host, guest, tables } = playingRoom()
    fake = createSupabaseFake(tables)

    await leaveRoom(room.id, host.id)

    expect(tables.players).toHaveLength(1)
    expect(tables.players[0]!.id).toBe(guest.id)
    expect(tables.players[0]!.is_host).toBe(true)
  })

  it('son oyuncu da ayrılınca odayı kapatır', async () => {
    const room = buildRoom({ status: 'waiting' })
    const solo = buildPlayer(room.id, { is_host: true })
    const tables: FakeTables = { rooms: [room], players: [solo], names: [] }
    fake = createSupabaseFake(tables)

    const result = await leaveRoom(room.id, solo.id)

    expect(result.roomClosed).toBe(true)
    expect(tables.rooms[0]!.status).toBe('closed')
  })
})

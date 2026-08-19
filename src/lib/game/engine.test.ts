import { beforeEach, describe, expect, it, vi } from 'vitest'

import {
  buildName,
  buildPlayer,
  buildRoom,
  createSupabaseFake,
  type FakeTables,
} from '@/test/supabaseFake'
import type { GuessResult } from './types'

let fake: ReturnType<typeof createSupabaseFake>

vi.mock('@/lib/supabaseAdmin', () => ({
  supabaseAdmin: () => fake.client,
}))

const {
  answerSharedQuestion,
  askSharedQuestion,
  askTextQuestion,
  assignNamesForRound,
  autoAssignNames,
  createRoom,
  getClassicRetiredNames,
  getGameState,
  getPlayerLives,
  getPlayerPassRights,
  getRoomMode,
  giveUp,
  leaveRoom,
  makeGuess,
  passTurn,
  setCommunicationMode,
  setPlayerLives,
  setPlayerPassRights,
  setPlayerRoundNameId,
  setPlayerSpeedData,
  setRoomCategory,
  setRoomMode,
  setRoomTarget,
  startGame,
  startNextPhaseByHost,
  startNextSharedTargetRound,
  submitNames,
  submitTextVote,
  setPlayerPhaseReady,
} = await import('./engine')


/** İki oyunculu, oyun başlamış bir oda kurar. */
function playingRoom() {
  const room = buildRoom({ status: 'playing', is_game_active: true, game_round: 1, game_mode: 'classic' })
  const host = buildPlayer(room.id, { nickname: 'Host', is_host: true, score: 0 })
  const guest = buildPlayer(room.id, { nickname: 'Misafir', score: 0 })

  const hostName = buildName(room.id, host.id, { name_text: 'Kemal Sunal' })
  const guestName = buildName(room.id, guest.id, { name_text: 'Türkan Şoray' })

  // Sıra host'ta; host, misafirin yazdığı ismi bulmaya çalışıyor.
  room.current_player_id = host.id
  room.current_identity_id = guestName.id

  getClassicRetiredNames(room.id).clear()
  setPlayerRoundNameId(room.id, host.id, guestName.id)
  setPlayerRoundNameId(room.id, guest.id, hostName.id)
  setPlayerLives(room.id, host.id, 3)
  setPlayerLives(room.id, guest.id, 3)
  setPlayerPassRights(room.id, host.id, 3)
  setPlayerPassRights(room.id, guest.id, 3)

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

describe('makeGuess (Klasik Mod)', () => {
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

  it('yanlış tahminde puanı değiştirmez, deneme hakkını 1 azaltır (3 -> 2), aynı isim kalır ve sırayı devreder', async () => {
    const { room, host, guest, guestName, tables } = playingRoom()
    fake = createSupabaseFake(tables)

    const result = await makeGuess(room.id, host.id, 'Cem Yılmaz')

    expect(result.correct).toBe(false)
    expect(result.livesLeft).toBe(2)
    expect(getPlayerLives(room.id, host.id)).toBe(2)
    expect(tables.rooms[0]!.current_player_id).toBe(guest.id)
    expect(tables.players.find((player) => player.id === host.id)!.score).toBe(0)

    // Misafir sırasını savsın (passTurn)
    await passTurn(room.id, guest.id)

    // Sıra tekrar host'a geldiğinde aynı isimle devam etmeli
    expect(tables.rooms[0]!.current_player_id).toBe(host.id)
    expect(tables.rooms[0]!.current_identity_id).toBe(guestName.id)
  })

  it('3 yanlış tahmin yapıldığında yeni isim atanır, deneme hakkı 3\'e resetlenir ve sıra geçer', async () => {
    const { room, host, guest, tables } = playingRoom()
    // Ekstra isim ekleyelim ki yeni isim seçilebilsin
    const extraName = buildName(room.id, guest.id, { name_text: 'Halit Akçatepe' })
    tables.names.push(extraName)
    fake = createSupabaseFake(tables)

    // 1. yanlış tahmin -> Hak 2
    const r1 = await makeGuess(room.id, host.id, 'Yanlış 1')
    expect(r1.livesLeft).toBe(2)
    expect(getPlayerLives(room.id, host.id)).toBe(2)

    // Misafir pas geçsin
    await passTurn(room.id, guest.id)

    // 2. yanlış tahmin -> Hak 1
    const r2 = await makeGuess(room.id, host.id, 'Yanlış 2')
    expect(r2.livesLeft).toBe(1)
    expect(getPlayerLives(room.id, host.id)).toBe(1)

    // Misafir pas geçsin
    await passTurn(room.id, guest.id)

    // 3. yanlış tahmin -> Hak bitti, yeni isim atandı, hak 3'e resetlendi
    const r3 = await makeGuess(room.id, host.id, 'Yanlış 3')
    expect(r3.correct).toBe(false)
    expect(r3.livesLeft).toBe(3)
    expect(getPlayerLives(room.id, host.id)).toBe(3)
    expect(r3.message).toContain('3 deneme hakkınız bitti')
  })

  it('doğru tahminde 10 puan verir, bilinen ismi emekliye ayırır ve havuzdan yeni isim atar', async () => {
    const { room, host, guest, tables } = playingRoom()
    const extraName = buildName(room.id, guest.id, { name_text: 'Halit Akçatepe' })
    tables.names.push(extraName)
    fake = createSupabaseFake(tables)

    const result = await makeGuess(room.id, host.id, 'Türkan Şoray')

    expect(result.correct).toBe(true)
    expect(result.pointsEarned).toBe(10)
    expect(tables.players.find((player) => player.id === host.id)!.score).toBe(10)
    expect(tables.rooms[0]!.current_player_id).toBe(guest.id)
    expect(result.finished).toBe(false)
  })

  it('küçük yazım hatasını doğru sayar', async () => {
    const { room, host, tables } = playingRoom()
    fake = createSupabaseFake(tables)

    const result = await makeGuess(room.id, host.id, 'turkan soray')
    expect(result.correct).toBe(true)
  })

  it('tüm havuzdaki isimler tamamlandığında oyunu bitirir', async () => {
    const { room, host, guest, tables } = playingRoom()
    fake = createSupabaseFake(tables)

    // Host bildi
    const r1 = await makeGuess(room.id, host.id, 'Türkan Şoray')
    expect(r1.correct).toBe(true)
    expect(r1.finished).toBe(false)

    // Misafir de bildi -> Oyun bitti
    const r2 = await makeGuess(room.id, guest.id, 'Kemal Sunal')
    expect(r2.correct).toBe(true)
    expect(r2.finished).toBe(true)
    expect(tables.rooms[0]!.status).toBe('finished')
    expect(tables.rooms[0]!.is_game_active).toBe(false)
  })
})

describe('passTurn (Klasik Mod)', () => {
  it('yalnızca sırası olan oyuncu pas geçebilir/soru sorabilir', async () => {
    const { room, guest, tables } = playingRoom()
    fake = createSupabaseFake(tables)

    await expect(passTurn(room.id, guest.id)).rejects.toMatchObject({ code: 'not_your_turn' })
  })

  it('soru sorma (passTurn) isim ve can hakkını değiştirmez, sadece sırayı devreder', async () => {
    const { room, host, guest, guestName, tables } = playingRoom()
    fake = createSupabaseFake(tables)

    const res = await passTurn(room.id, host.id)

    expect(res.message).toContain('Sorunuz iletildi')
    expect(getPlayerLives(room.id, host.id)).toBe(3)
    expect(tables.players.find((player) => player.id === host.id)!.score).toBe(0)
    expect(tables.rooms[0]!.current_player_id).toBe(guest.id)

    // Misafir de soru sorsun
    await passTurn(room.id, guest.id)

    // Sıra tekrar host'a geldiğinde host'un ismi ve canı aynı kalmalı
    expect(tables.rooms[0]!.current_player_id).toBe(host.id)
    expect(tables.rooms[0]!.current_identity_id).toBe(guestName.id)
    expect(getPlayerLives(room.id, host.id)).toBe(3)
  })
})

describe('giveUp (Klasik Mod — İsmi Pas Geç)', () => {
  it('yalnızca sırası olan oyuncu ismi pas geçebilir', async () => {
    const { room, guest, tables } = playingRoom()
    fake = createSupabaseFake(tables)

    await expect(giveUp(room.id, guest.id)).rejects.toMatchObject({ code: 'not_your_turn' })
  })

  it('ismi pas geçme can kaybı olmadan yeni isim atar, pas hakkını 1 azaltır, canı 3\'e resetler ve sırayı devreder', async () => {
    const { room, host, guest, tables } = playingRoom()
    const extraName = buildName(room.id, guest.id, { name_text: 'Halit Akçatepe' })
    tables.names.push(extraName)
    fake = createSupabaseFake(tables)

    // Host 1 can kaybetmiş olsun (kalan can: 2)
    setPlayerLives(room.id, host.id, 2)

    const res = await giveUp(room.id, host.id)

    expect(res.livesLeft).toBe(3)
    expect(res.passRightsLeft).toBe(2)
    expect(getPlayerPassRights(room.id, host.id)).toBe(2)
    expect(getPlayerLives(room.id, host.id)).toBe(3)
    expect(res.message).toContain('İsmi pas geçtiniz')
    expect(tables.rooms[0]!.current_player_id).toBe(guest.id)
  })

  it('3 pas hakkı dolduğunda tekrar pas geçmeyi engeller', async () => {
    const { room, host, tables } = playingRoom()
    fake = createSupabaseFake(tables)

    setPlayerPassRights(room.id, host.id, 0)
    await expect(giveUp(room.id, host.id)).rejects.toMatchObject({ code: 'no_pass_rights' })
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

  it('3 ismi eksiksiz kaydeder', async () => {
    const { room, host, tables } = lobby()
    fake = createSupabaseFake(tables)

    const result = await submitNames(room.id, host.id, ['Kemal Sunal', 'Türkan Şoray', 'Şener Şen'])

    expect(result.accepted).toHaveLength(3)
    expect(result.duplicates).toHaveLength(0)
    expect(tables.names).toHaveLength(3)
  })

  it('3 isimden az girildiğinde hata fırlatır', async () => {
    const { room, host, tables } = lobby()
    fake = createSupabaseFake(tables)

    await expect(submitNames(room.id, host.id, ['Kemal Sunal', 'Türkan Şoray'])).rejects.toMatchObject({
      code: 'missing_names',
    })
  })

  it('çakışan isim yüzünden gönderimi tamamen kaybetmez', async () => {
    const { room, host, guest, tables } = lobby()
    tables.names.push(buildName(room.id, host.id, { name_text: 'Kemal Sunal' }))
    fake = createSupabaseFake(tables)

    const result = await submitNames(room.id, guest.id, ['Kemal Sunal', 'Türkan Şoray', 'Şener Şen'])

    expect(result.accepted).toEqual(['Türkan Şoray', 'Şener Şen'])
    expect(result.duplicates).toEqual(['Kemal Sunal'])
  })

  it('hepsi çakışıyorsa nedenini bildirir', async () => {
    const { room, host, guest, tables } = lobby()
    tables.names.push(buildName(room.id, host.id, { name_text: 'Kemal Sunal' }))
    tables.names.push(buildName(room.id, host.id, { name_text: 'Türkan Şoray' }))
    tables.names.push(buildName(room.id, host.id, { name_text: 'Şener Şen' }))
    fake = createSupabaseFake(tables)

    await expect(submitNames(room.id, guest.id, ['Kemal Sunal', 'Türkan Şoray', 'Şener Şen'])).rejects.toMatchObject({
      code: 'all_names_taken',
    })
  })

  it('gönderilmiş isimleri tekrar göndererek düzenlemeye izin verir', async () => {
    const { room, host, tables } = lobby()
    fake = createSupabaseFake(tables)

    // İlk gönderim
    await submitNames(room.id, host.id, ['Kemal Sunal', 'Türkan Şoray', 'Şener Şen'])
    expect(tables.names.map((n) => n.name_text)).toEqual(['Kemal Sunal', 'Türkan Şoray', 'Şener Şen'])

    // Düzenleme / güncelleme gönderimi
    const editResult = await submitNames(room.id, host.id, ['Barış Manço', 'Cem Karaca', 'Neşet Ertaş'])
    expect(editResult.accepted).toEqual(['Barış Manço', 'Cem Karaca', 'Neşet Ertaş'])
    expect(tables.names.map((n) => n.name_text)).toEqual(['Barış Manço', 'Cem Karaca', 'Neşet Ertaş'])
  })

  it('oyun başladıktan sonra isim eklenemez', async () => {
    const { room, host, tables } = lobby()
    tables.rooms[0]!.status = 'playing'
    fake = createSupabaseFake(tables)

    await expect(submitNames(room.id, host.id, ['Kemal Sunal', 'Türkan Şoray', 'Şener Şen'])).rejects.toMatchObject({
      code: 'game_already_started',
    })
  })
})

describe('leaveRoom', () => {
  it('aktif 2 kişilik maçta biri ayrılınca maçı sonlandırır, kalanı host ve galip yapar', async () => {
    const { room, host, guest, tables } = playingRoom()
    host.device_id = 'dev-host'
    guest.device_id = 'dev-guest'
    fake = createSupabaseFake(tables)

    await leaveRoom(room.id, host.id)

    expect(tables.players).toHaveLength(1)
    expect(tables.players[0]!.id).toBe(guest.id)
    expect(tables.players[0]!.is_host).toBe(true)
    expect(tables.rooms[0]!.status).toBe('finished')
    expect(tables.rooms[0]!.is_game_active).toBe(false)

    // İstatistik kayıtları kontrolü
    const results = tables.game_results || []
    expect(results).toHaveLength(2)
    const hostResult = results.find((r) => r.placement === 2)
    const guestResult = results.find((r) => r.placement === 1)
    expect(hostResult?.survived).toBe(false)
    expect(guestResult?.survived).toBe(true)
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

describe('Speed Mode (Hız Modu — Az Soru, Çok Puan)', () => {
  function speedPlayingRoom() {
    const room = buildRoom({
      status: 'playing',
      is_game_active: true,
      game_mode: 'speed',
      game_round: 1,
      total_rounds: 3,
    })
    const host = buildPlayer(room.id, { nickname: 'Host', is_host: true, score: 0, questions_this_round: 0 })
    const guest = buildPlayer(room.id, { nickname: 'Misafir', score: 0, questions_this_round: 0 })

    const hostName = buildName(room.id, host.id, { name_text: 'Kemal Sunal' })
    const guestName = buildName(room.id, guest.id, { name_text: 'Türkan Şoray' })

    room.current_player_id = host.id
    room.current_identity_id = guestName.id
    guestName.used_in_round = 1

    const tables: FakeTables = { rooms: [room], players: [host, guest], names: [hostName, guestName] }
    return { room, host, guest, hostName, guestName, tables }
  }

  it('hız modunda oda oluşturabilir ve mod güncelleyebilir', async () => {
    const tables: FakeTables = { rooms: [], players: [], names: [] }
    fake = createSupabaseFake(tables)

    const created = await createRoom('HostUser', 'speed')
    expect(tables.rooms[0]!.game_mode).toBe('speed')
    expect(tables.rooms[0]!.total_rounds).toBe(3)

    // Modu klasiğe çevirme
    await setRoomMode(created.roomId, created.playerId, 'classic')
    expect(tables.rooms[0]!.game_mode).toBe('classic')
  })

  it('yanlış tahminde can düşürmez, soru sayısını artırır ve sırayı devreder', async () => {
    const { room, host, guest, tables } = speedPlayingRoom()
    fake = createSupabaseFake(tables)

    const result = await makeGuess(room.id, host.id, 'Cem Yılmaz')

    expect(result.correct).toBe(false)
    expect(tables.players.find((p) => p.id === host.id)!.questions_this_round).toBe(1)
    expect(tables.players.find((p) => p.id === host.id)!.score).toBe(0)
    expect(tables.rooms[0]!.current_player_id).toBe(guest.id)
  })

  it('soru sorulduğunda (passTurn) soru sayısını artırır ve sırayı devreder', async () => {
    const { room, host, guest, tables } = speedPlayingRoom()
    fake = createSupabaseFake(tables)

    const result = await passTurn(room.id, host.id)

    expect(result.message).toContain('Sorunuz kaydedildi')
    expect(tables.players.find((p) => p.id === host.id)!.questions_this_round).toBe(1)
    expect(tables.rooms[0]!.current_player_id).toBe(guest.id)
  })

  it('0 soruda doğru bilindiğinde 100 puan verir ve turu tamamlar', async () => {
    const { room, host, tables } = speedPlayingRoom()
    fake = createSupabaseFake(tables)

    const result = await makeGuess(room.id, host.id, 'Türkan Şoray')

    expect(result.correct).toBe(true)
    expect(result.pointsEarned).toBe(100)
    const updatedHost = tables.players.find((p) => p.id === host.id)!
    expect(updatedHost.score).toBe(100)
    expect(updatedHost.round_scores).toEqual([100])
    expect(updatedHost.has_finished_round).toBe(true)
  })

  it('3 soru sorulduktan sonra doğru bilindiğinde 85 puan verir', async () => {
    const { room, host, tables } = speedPlayingRoom()
    setPlayerSpeedData(room.id, host.id, { questionsThisRound: 3, roundScores: [], finishedCurrentRound: false })
    fake = createSupabaseFake(tables)

    const result = await makeGuess(room.id, host.id, 'Türkan Şoray')

    expect(result.correct).toBe(true)
    expect(result.pointsEarned).toBe(85)
    const hostPlayer = tables.players.find((p) => p.id === host.id)!
    expect(hostPlayer.score).toBe(85)
    expect(hostPlayer.round_scores).toEqual([85])
  })

  it('tüm oyuncular turu bitirdiğinde otomatik Tur 2 başlar', async () => {
    const { room, host, guest, tables } = speedPlayingRoom()
    // Guest zaten bilmiş olsun
    tables.players.find((p) => p.id === guest.id)!.has_finished_round = true
    setPlayerSpeedData(room.id, guest.id, { questionsThisRound: 0, roundScores: [100], finishedCurrentRound: true })
    fake = createSupabaseFake(tables)

    const result = await makeGuess(room.id, host.id, 'Türkan Şoray')

    expect(result.correct).toBe(true)
    expect(result.nextRoundStarted).toBe(true)
    expect(tables.rooms[0]!.game_round).toBe(2)
    // Tur 2 başında sorular ve durumlar sıfırlanmış olmalı
    expect(tables.players.find((p) => p.id === host.id)!.has_finished_round).toBe(false)
    expect(tables.players.find((p) => p.id === host.id)!.questions_this_round).toBe(0)
  })

  it('3. turun sonunda tüm oyuncular bitirince oyun tamamlanır', async () => {
    const { room, host, guest, tables } = speedPlayingRoom()
    room.game_round = 3
    tables.players.find((p) => p.id === guest.id)!.has_finished_round = true
    setPlayerSpeedData(room.id, guest.id, { questionsThisRound: 0, roundScores: [100], finishedCurrentRound: true })
    fake = createSupabaseFake(tables)

    const result = await makeGuess(room.id, host.id, 'Türkan Şoray')

    expect(result.correct).toBe(true)
    expect(result.finished).toBe(true)
    expect(tables.rooms[0]!.status).toBe('finished')
    expect(tables.rooms[0]!.is_game_active).toBe(false)
  })

  it('INV-2 & INV-3: Host ve misafir için soru sayacı (passTurn ve yanlış tahmin) birebir aynı artar', async () => {
    const { room, host, guest, tables } = speedPlayingRoom()
    fake = createSupabaseFake(tables)

    // 1. Host bir soru sorsun (passTurn)
    await passTurn(room.id, host.id)
    expect(tables.players.find((p) => p.id === host.id)!.questions_this_round).toBe(1)
    expect(tables.rooms[0]!.current_player_id).toBe(guest.id)

    // 2. Misafir yanlış tahmin yapsın
    await makeGuess(room.id, guest.id, 'Yanlış İsim')
    expect(tables.players.find((p) => p.id === guest.id)!.questions_this_round).toBe(1)
    expect(tables.rooms[0]!.current_player_id).toBe(host.id)

    // 3. Host bu kez yanlış tahmin yapsın
    await makeGuess(room.id, host.id, 'Başka Yanlış İsim')
    expect(tables.players.find((p) => p.id === host.id)!.questions_this_round).toBe(2)
  })

  it('INV-1: 3 oyunculu Hız Modu odasında 3 tur boyunca game_mode daima speed kalır', async () => {
    const room = buildRoom({
      status: 'playing',
      is_game_active: true,
      game_mode: 'speed',
      game_round: 1,
      total_rounds: 3,
    })
    const p1 = buildPlayer(room.id, { nickname: 'P1_Host', is_host: true, score: 0, questions_this_round: 0 })
    const p2 = buildPlayer(room.id, { nickname: 'P2_Guest', is_host: false, score: 0, questions_this_round: 0 })
    const p3 = buildPlayer(room.id, { nickname: 'P3_Guest', is_host: false, score: 0, questions_this_round: 0 })

    const n1 = buildName(room.id, p1.id, { name_text: 'İsim 1' })
    const n2 = buildName(room.id, p2.id, { name_text: 'İsim 2' })
    const n3 = buildName(room.id, p3.id, { name_text: 'İsim 3' })

    room.current_player_id = p1.id
    room.current_identity_id = n2.id

    const tables: FakeTables = {
      rooms: [room],
      players: [p1, p2, p3],
      names: [n1, n2, n3],
    }
    fake = createSupabaseFake(tables)

    // Başlangıçta mod kontrolü
    expect(getRoomMode(room.id, room.game_mode)).toBe('speed')

    // Tur 1: Her oyuncu doğru bilsin
    p1.questions_this_round = 2
    room.current_player_id = p1.id
    room.current_identity_id = n2.id
    await makeGuess(room.id, p1.id, 'İsim 2')

    p2.questions_this_round = 1
    room.current_player_id = p2.id
    room.current_identity_id = n3.id
    await makeGuess(room.id, p2.id, 'İsim 3')

    p3.questions_this_round = 0
    room.current_player_id = p3.id
    room.current_identity_id = n1.id
    const round1End = await makeGuess(room.id, p3.id, 'İsim 1')

    expect(round1End.nextRoundStarted).toBe(true)
    expect(tables.rooms[0]!.game_round).toBe(2)
    // INV-1 Kontrolü: Tur 2'de game_mode hâlâ speed olmalı!
    expect(getRoomMode(room.id, tables.rooms[0]!.game_mode)).toBe('speed')

    // Tur 2: Herkes bilsin
    tables.players.find((p) => p.id === p1.id)!.has_finished_round = true
    tables.players.find((p) => p.id === p2.id)!.has_finished_round = true
    setPlayerSpeedData(room.id, p1.id, { questionsThisRound: 0, roundScores: [100], finishedCurrentRound: true })
    setPlayerSpeedData(room.id, p2.id, { questionsThisRound: 0, roundScores: [100], finishedCurrentRound: true })
    room.current_player_id = p3.id
    room.current_identity_id = n1.id

    const round2End = await makeGuess(room.id, p3.id, 'İsim 1')
    expect(round2End.nextRoundStarted).toBe(true)
    expect(tables.rooms[0]!.game_round).toBe(3)
    // INV-1 Kontrolü: Tur 3'te game_mode hâlâ speed olmalı!
    expect(getRoomMode(room.id, tables.rooms[0]!.game_mode)).toBe('speed')

    // Tur 3: Herkes bilsin -> Oyun bitsin
    tables.players.find((p) => p.id === p1.id)!.has_finished_round = true
    tables.players.find((p) => p.id === p2.id)!.has_finished_round = true
    setPlayerSpeedData(room.id, p1.id, { questionsThisRound: 0, roundScores: [100, 100], finishedCurrentRound: true })
    setPlayerSpeedData(room.id, p2.id, { questionsThisRound: 0, roundScores: [100, 100], finishedCurrentRound: true })
    room.current_player_id = p3.id
    room.current_identity_id = n1.id

    const round3End = await makeGuess(room.id, p3.id, 'İsim 1')
    expect(round3End.finished).toBe(true)
    expect(tables.rooms[0]!.status).toBe('finished')
    // Finalde de game_mode speed olmalı!
    expect(getRoomMode(room.id, tables.rooms[0]!.game_mode)).toBe('speed')
  })

  it('3 tur boyunca her turda oyunculara farklı ve benzersiz isimler dağıtılır', () => {
    const roomId = 'unique-names-room'
    const p1 = buildPlayer(roomId, { id: 'p1', nickname: 'Oyuncu 1' })
    const p2 = buildPlayer(roomId, { id: 'p2', nickname: 'Oyuncu 2' })
    const players = [p1, p2]

    // 6 isim: 3 tanesi p1'den, 3 tanesi p2'den
    const names = [
      buildName(roomId, 'p1', { name_text: 'İsim A' }),
      buildName(roomId, 'p1', { name_text: 'İsim B' }),
      buildName(roomId, 'p1', { name_text: 'İsim C' }),
      buildName(roomId, 'p2', { name_text: 'İsim D' }),
      buildName(roomId, 'p2', { name_text: 'İsim E' }),
      buildName(roomId, 'p2', { name_text: 'İsim F' }),
    ]

    const r1 = assignNamesForRound(roomId, players, names)
    const r2 = assignNamesForRound(roomId, players, names)
    const r3 = assignNamesForRound(roomId, players, names)

    const allAssigned = [
      r1.get('p1')!,
      r1.get('p2')!,
      r2.get('p1')!,
      r2.get('p2')!,
      r3.get('p1')!,
      r3.get('p2')!,
    ]

    // 6 atamanın hepsi birbirinden farklı olmalıdır!
    const uniqueSet = new Set(allAssigned)
    expect(uniqueSet.size).toBe(6)

    // Hiçbir oyuncu kendi yazdığı ismi almamalıdır
    expect(['İsim A', 'İsim B', 'İsim C']).not.toContain(names.find((n) => n.id === r1.get('p1'))?.name_text)
    expect(['İsim D', 'İsim E', 'İsim F']).not.toContain(names.find((n) => n.id === r1.get('p2'))?.name_text)
  })

  it('Hız Modunda her tur kazanılan puanlar toplanarak getRoomState içinde doğru skor döner', async () => {
    const { room, host, guest, tables } = speedPlayingRoom()
    setPlayerSpeedData(room.id, host.id, { questionsThisRound: 0, roundScores: [100, 95], finishedCurrentRound: false })
    setPlayerSpeedData(room.id, guest.id, { questionsThisRound: 0, roundScores: [90, 85], finishedCurrentRound: false })
    fake = createSupabaseFake(tables)

    const state = await getGameState(room.id, host.id)
    const hostPlayer = state.players.find((p) => p.id === host.id)!
    const guestPlayer = state.players.find((p) => p.id === guest.id)!

    expect(hostPlayer.score).toBe(195)
    expect(hostPlayer.roundScores).toEqual([100, 95])
    expect(guestPlayer.score).toBe(175)
    expect(guestPlayer.roundScores).toEqual([90, 85])
  })
})

describe('Ortak Hedef Modu (shared_target)', () => {
  function sharedTargetRoom() {
    const room = buildRoom({
      game_mode: 'shared_target',
      status: 'playing',
      is_game_active: true,
      game_round: 1,
      total_rounds: 3,
    })
    const host = buildPlayer(room.id, { nickname: 'HostHakem', is_host: true })
    const p1 = buildPlayer(room.id, { nickname: 'Yarisimaci1', is_host: false })
    const p2 = buildPlayer(room.id, { nickname: 'Yarisimaci2', is_host: false })

    room.current_player_id = p1.id
    const tables: FakeTables = { rooms: [room], players: [host, p1, p2], names: [] }
    return { room, host, p1, p2, tables }
  }

  it('yalnızca oda sahibi (hakem) gizli hedef belirleyebilir', async () => {
    const { room, host, p1, tables } = sharedTargetRoom()
    fake = createSupabaseFake(tables)

    await expect(setRoomTarget(room.id, p1.id, 'Kemal Sunal')).rejects.toMatchObject({
      code: 'not_host',
      status: 403,
    })

    const res = await setRoomTarget(room.id, host.id, 'Kemal Sunal')
    expect(res.targetName).toBe('Kemal Sunal')
  })

  it('INV-2: Gizli hedef aktifken yarışmacılara sızdırılmaz, sadece hakeme veya tur bitince görünür', async () => {
    const { room, host, p1, tables } = sharedTargetRoom()
    fake = createSupabaseFake(tables)
    await setRoomTarget(room.id, host.id, 'Albert Einstein')

    const hostState = await getGameState(room.id, host.id)
    expect(hostState.room.sharedTargetName).toBe('Albert Einstein')
    expect(hostState.you.isReferee).toBe(true)

    const p1State = await getGameState(room.id, p1.id)
    expect(p1State.room.sharedTargetName).toBeNull()
    expect(p1State.you.isReferee).toBe(false)
  })

  it('sırası gelen yarışmacı hakeme soru sorabilir ve hakem yanıtlayabilir', async () => {
    const { room, host, p1, p2, tables } = sharedTargetRoom()
    fake = createSupabaseFake(tables)
    await setRoomTarget(room.id, host.id, 'Albert Einstein')

    // p2 sırası değilken soramaz
    await expect(askSharedQuestion(room.id, p2.id, 'Erkek mi?')).rejects.toMatchObject({
      code: 'not_your_turn',
      status: 403,
    })

    // p1 sorar
    const askRes = await askSharedQuestion(room.id, p1.id, 'Erkek mi?')
    expect(askRes.question.questionText).toBe('Erkek mi?')

    // p1 hakem olmadığı için yanıtlayamaz
    await expect(answerSharedQuestion(room.id, p1.id, askRes.question.id, 'yes')).rejects.toMatchObject({
      code: 'not_host',
      status: 403,
    })

    // Hakem yanıtlar -> Soru log'a geçer, sıra p2'ye geçer
    const ansRes = await answerSharedQuestion(room.id, host.id, askRes.question.id, 'yes')
    expect(ansRes.nextPlayerId).toBe(p2.id)

    const updatedState = await getGameState(room.id, p1.id)
    expect(updatedState.room.questionLog).toHaveLength(1)
    expect(updatedState.room.questionLog![0]!.answer).toBe('yes')
    expect(tables.rooms[0]!.current_player_id).toBe(p2.id)
  })

  it('herhangi bir yarışmacı sırası onda olmasa bile BUZZER ile tahmin yapabilir', async () => {
    const { room, host, p1, p2, tables } = sharedTargetRoom()
    fake = createSupabaseFake(tables)
    await setRoomTarget(room.id, host.id, 'Albert Einstein')

    // Sıra p1'deyken p2 yanlış tahmin yapar
    const wrongGuess = await makeGuess(room.id, p2.id, 'Kemal Sunal')
    expect(wrongGuess.correct).toBe(false)
    expect(wrongGuess.targetRevealed).toBe(false)

    // Hakem tahmin yapamaz
    await expect(makeGuess(room.id, host.id, 'Albert Einstein')).rejects.toMatchObject({
      code: 'host_cannot_guess',
      status: 403,
    })

    // p1 doğru tahmin yapar -> +100 puan, hedef açılır
    const correctGuess = await makeGuess(room.id, p1.id, 'albert einstein')
    expect(correctGuess.correct).toBe(true)
    expect(correctGuess.pointsEarned).toBe(100)
    expect(correctGuess.targetRevealed).toBe(true)
    expect(correctGuess.revealedTargetName).toBe('Albert Einstein')

    const p1Player = tables.players.find((p) => p.id === p1.id)!
    expect(p1Player.score).toBe(100)

    // Hedef açıldıktan sonra yarışmacı da hedefi görebilir
    const p2State = await getGameState(room.id, p2.id)
    expect(p2State.room.sharedTargetName).toBe('Albert Einstein')
    expect(p2State.room.targetRevealed).toBe(true)
  })

  it('hakem sonraki tura yeni bir hedefle geçebilir', async () => {
    const { room, host, tables } = sharedTargetRoom()
    fake = createSupabaseFake(tables)
    await setRoomTarget(room.id, host.id, 'Albert Einstein')

    await startNextSharedTargetRound(room.id, host.id, 'Barış Manço')
    expect(tables.rooms[0]!.game_round).toBe(2)

    const hostState = await getGameState(room.id, host.id)
    expect(hostState.room.sharedTargetName).toBe('Barış Manço')
    expect(hostState.room.targetRevealed).toBe(false)
  })
})

describe('Kategoriye Özel Lobi & 3 Fazlı Karışık Lobi', () => {
  it('tek kategori seçildiğinde oda ve oyun durumu doğru kategori bilgisine sahip olur', async () => {
    fake = createSupabaseFake()
    const { roomId, playerId } = await createRoom('HostUser', 'classic', {
      categoryMode: 'single',
      category: 'sporcular',
    })

    const state = await getGameState(roomId, playerId)
    expect(state.room.categoryMode).toBe('single')
    expect(state.room.selectedCategory).toBe('sporcular')
    expect(state.room.activeCategory).toBe('sporcular')
    expect(state.room.totalPhases).toBe(1)
    expect(state.room.currentPhase).toBe(1)
  })

  it('3 fazlı mod seçildiğinde 3 kategori sırayla kaydedilir ve faz 1 aktif olur', async () => {
    fake = createSupabaseFake()
    const phaseCategories = ['sporcular', 'cizgi_karakterler', 'tarihi_kisiler'] as const
    const { roomId, playerId } = await createRoom('HostUser', 'classic', {
      categoryMode: 'multi_phase',
      phaseCategories: [...phaseCategories],
    })

    const state = await getGameState(roomId, playerId)
    expect(state.room.categoryMode).toBe('multi_phase')
    expect(state.room.phaseCategories).toEqual(phaseCategories)
    expect(state.room.activeCategory).toBe('sporcular')
    expect(state.room.totalPhases).toBe(3)
    expect(state.room.currentPhase).toBe(1)
  })

  it('host lobi bekleme ekranında kategori ayarlarını güncelleyebilir', async () => {
    fake = createSupabaseFake()
    const { roomId, playerId } = await createRoom('HostUser', 'classic')

    const updated = await setRoomCategory(roomId, playerId, {
      categoryMode: 'multi_phase',
      phaseCategories: ['tarihi_kisiler', 'unluler', 'dizi_film_karakterleri'],
    })

    expect(updated.categoryMode).toBe('multi_phase')
    expect(updated.phaseCategories).toEqual(['tarihi_kisiler', 'unluler', 'dizi_film_karakterleri'])
    expect(updated.totalPhases).toBe(3)

    const state = await getGameState(roomId, playerId)
    expect(state.room.categoryMode).toBe('multi_phase')
    expect(state.room.activeCategory).toBe('tarihi_kisiler')
  })

  it('host olmayan oyuncu kategori ayarlarını değiştiremez', async () => {
    fake = createSupabaseFake()
    const { roomId } = await createRoom('HostUser', 'classic')
    const guest = buildPlayer(roomId, { nickname: 'GuestUser', is_host: false })
    fake.tables.players.push(guest)

    await expect(
      setRoomCategory(roomId, guest.id, {
        categoryMode: 'single',
        category: 'sporcular',
      }),
    ).rejects.toMatchObject({
      code: 'not_host',
      status: 403,
    })
  })

  it('otomatik isim atama seçilen kategoriye göre isim atar', async () => {
    fake = createSupabaseFake()
    const { roomId, playerId: hostId } = await createRoom('HostUser', 'classic', {
      categoryMode: 'single',
      category: 'sporcular',
    })
    const guest = buildPlayer(roomId, { nickname: 'GuestUser', is_host: false })
    fake.tables.players.push(guest)

    const result = await autoAssignNames(roomId, hostId)
    expect(result.assignedCount).toBe(6) // 2 oyuncu * 3 isim
    expect(result.names).toHaveLength(6)
    expect(fake.tables.names.filter((n) => n.room_id === roomId)).toHaveLength(6)
  })

  it('3 fazlı modda Faz 1 bitince faz arası bekleme başlar ve host/hazır ile Faz 2 başlar', async () => {
    fake = createSupabaseFake()
    const phaseCategories = ['sporcular', 'cizgi_karakterler', 'tarihi_kisiler'] as const
    const { roomId, playerId: hostId } = await createRoom('HostUser', 'classic', {
      categoryMode: 'multi_phase',
      phaseCategories: [...phaseCategories],
    })
    const guest = buildPlayer(roomId, { nickname: 'GuestUser', is_host: false })
    fake.tables.players.push(guest)

    // Faz 1 için isim ata (2 oyuncu * 1 isim = 2 isim)
    const assignRes = await autoAssignNames(roomId, hostId)
    expect(assignRes.assignedCount).toBe(2)
    await startGame(roomId, hostId)

    const state = await getGameState(roomId, hostId)
    expect(state.room.status).toBe('playing')
    expect(state.room.currentPhase).toBe(1)
    expect(state.room.activeCategory).toBe('sporcular')

    // Tüm isimleri sırayla doğru bilerek Faz 1'i tamamlayalım
    let lastGuessResult: GuessResult | null = null
    while (!lastGuessResult?.phaseChanged && !lastGuessResult?.finished) {
      const activePlayerId = fake.tables.rooms[0]!.current_player_id!
      const activeIdentityId = fake.tables.rooms[0]!.current_identity_id!
      const activeNameRow = fake.tables.names.find((n) => n.id === activeIdentityId)!
      lastGuessResult = await makeGuess(roomId, activePlayerId, activeNameRow.name_text)
      const current = await getGameState(roomId, hostId)
      if (current.room.phaseIntermission) break
    }

    // Faz 1 bitti, Faz arası bekleme aktif!
    const intermissionState = await getGameState(roomId, hostId)
    expect(intermissionState.room.phaseIntermission).toBeTruthy()
    expect(intermissionState.room.phaseIntermission!.completedPhase).toBe(1)
    expect(intermissionState.room.phaseIntermission!.nextPhase).toBe(2)

    // Host sonraki faza geçer
    const startRes = await startNextPhaseByHost(roomId, hostId)
    expect(startRes.nextPhaseStarted).toBe(true)

    // Yeni oyun durumu kontrolü: Faz 2 aktif, can ve puanlar korundu!
    const phase2State = await getGameState(roomId, hostId)
    expect(phase2State.room.currentPhase).toBe(2)
    expect(phase2State.room.activeCategory).toBe('cizgi_karakterler')
    expect(phase2State.room.status).toBe('playing')
    expect(phase2State.room.phaseIntermission).toBeNull()
    expect(phase2State.players.find((p) => p.id === hostId)?.score).toBeGreaterThan(0)
  })

  it('3 fazlı modda tüm oyuncular hazır olunca otomatik yeni faz başlar', async () => {
    fake = createSupabaseFake()
    const phaseCategories = ['sporcular', 'cizgi_karakterler', 'tarihi_kisiler'] as const
    const { roomId, playerId: hostId } = await createRoom('HostUser', 'classic', {
      categoryMode: 'multi_phase',
      phaseCategories: [...phaseCategories],
    })
    const guest = buildPlayer(roomId, { nickname: 'GuestUser', is_host: false })
    fake.tables.players.push(guest)

    await autoAssignNames(roomId, hostId)
    await startGame(roomId, hostId)

    // Faz 1'i bitir
    while (true) {
      const activePlayerId = fake.tables.rooms[0]!.current_player_id!
      const activeIdentityId = fake.tables.rooms[0]!.current_identity_id!
      const activeNameRow = fake.tables.names.find((n) => n.id === activeIdentityId)!
      await makeGuess(roomId, activePlayerId, activeNameRow.name_text)
      const current = await getGameState(roomId, hostId)
      if (current.room.phaseIntermission) break
    }

    // 1. Oyuncu hazır der
    const res1 = await setPlayerPhaseReady(roomId, hostId)
    expect(res1.allReady).toBe(false)
    expect(res1.nextPhaseStarted).toBe(false)

    // 2. Oyuncu da hazır der -> Herkes hazır olunca otomatik Faz 2 başlar!
    const res2 = await setPlayerPhaseReady(roomId, guest.id)
    expect(res2.allReady).toBe(true)
    expect(res2.nextPhaseStarted).toBe(true)

    const state = await getGameState(roomId, hostId)
    expect(state.room.currentPhase).toBe(2)
    expect(state.room.phaseIntermission).toBeNull()
  })

  it('3 faz tamamlandığında oyun biter (finished)', async () => {
    fake = createSupabaseFake()
    const phaseCategories = ['sporcular', 'cizgi_karakterler', 'tarihi_kisiler'] as const
    const { roomId, playerId: hostId } = await createRoom('HostUser', 'classic', {
      categoryMode: 'multi_phase',
      phaseCategories: [...phaseCategories],
    })
    const guest = buildPlayer(roomId, { nickname: 'GuestUser', is_host: false })
    fake.tables.players.push(guest)

    await autoAssignNames(roomId, hostId)
    await startGame(roomId, hostId)

    // Faz 1 -> Faz 2
    let res: GuessResult | null = null
    while (!res?.phaseChanged && !res?.finished) {
      const pId = fake.tables.rooms[0]!.current_player_id!
      const idId = fake.tables.rooms[0]!.current_identity_id!
      const name = fake.tables.names.find((n) => n.id === idId)!
      res = await makeGuess(roomId, pId, name.name_text)
      const cur = await getGameState(roomId, hostId)
      if (cur.room.phaseIntermission) break
    }
    await startNextPhaseByHost(roomId, hostId)

    // Faz 2 -> Faz 3
    res = null
    while (!res?.phaseChanged && !res?.finished) {
      const pId = fake.tables.rooms[0]!.current_player_id!
      const idId = fake.tables.rooms[0]!.current_identity_id!
      const name = fake.tables.names.find((n) => n.id === idId)!
      res = await makeGuess(roomId, pId, name.name_text)
      const cur = await getGameState(roomId, hostId)
      if (cur.room.phaseIntermission) break
    }
    await startNextPhaseByHost(roomId, hostId)

    // Faz 3 -> Oyun Bitişi
    res = null
    while (!res?.finished) {
      const pId = fake.tables.rooms[0]!.current_player_id!
      const idId = fake.tables.rooms[0]!.current_identity_id!
      const name = fake.tables.names.find((n) => n.id === idId)!
      res = await makeGuess(roomId, pId, name.name_text)
      const cur = await getGameState(roomId, hostId)
      if (cur.room.status === 'finished') break
    }

    const finalState = await getGameState(roomId, hostId)
    expect(finalState.room.status).toBe('finished')
    expect(finalState.room.isGameActive).toBe(false)
  })
})

describe('Tam Metin / Uzaktan Oyun Modu (Text Mode)', () => {
  beforeEach(() => {
    fake = createSupabaseFake()
  })

  it('createRoom ile communicationMode text olarak başlatılabilir', async () => {
    const { roomId, playerId } = await createRoom('HostUser', 'classic', {
      communicationMode: 'text',
    })
    const state = await getGameState(roomId, playerId)
    expect(state.room.communicationMode).toBe('text')
  })

  it('setCommunicationMode ile host lobide modu değiştirebilir, misafir değiştiremez', async () => {
    const { roomId, playerId: hostId } = await createRoom('HostUser', 'classic')
    const guest = buildPlayer(roomId, { nickname: 'GuestUser', is_host: false })
    fake.tables.players.push(guest)

    // Host değiştirebilir
    const res = await setCommunicationMode(roomId, hostId, 'text')
    expect(res.communicationMode).toBe('text')

    const state = await getGameState(roomId, hostId)
    expect(state.room.communicationMode).toBe('text')

    // Misafir değiştiremez
    await expect(setCommunicationMode(roomId, guest.id, 'voice')).rejects.toMatchObject({
      code: 'not_host',
    })
  })

  it('askTextQuestion ile oylama oturumu başlar, hedef sahibi oy veremez, diğer oyuncular Evet/Hayır oylayabilir', async () => {
    const { roomId, playerId: hostId } = await createRoom('HostUser', 'classic', {
      communicationMode: 'text',
    })
    const guest1 = buildPlayer(roomId, { nickname: 'Guest1', is_host: false })
    const guest2 = buildPlayer(roomId, { nickname: 'Guest2', is_host: false })
    fake.tables.players.push(guest1, guest2)

    await autoAssignNames(roomId, hostId)
    await startGame(roomId, hostId)

    const stateBefore = await getGameState(roomId, hostId)
    const currentAskerId = stateBefore.room.currentPlayerId!
    const otherPlayers = [hostId, guest1.id, guest2.id].filter((id) => id !== currentAskerId)

    // Sırası olmayan soru soramaz
    await expect(
      askTextQuestion(roomId, otherPlayers[0]!, { questionId: 'qb-01' }),
    ).rejects.toMatchObject({
      code: 'not_your_turn',
    })

    // Sıradaki oyuncu soru sorar
    const askRes = await askTextQuestion(roomId, currentAskerId, { questionId: 'qb-01' })
    expect(askRes.voteId).toBeDefined()
    expect(askRes.questionText).toBe('Gerçek bir kişi miyim, yoksa kurgu bir karakter miyim?')

    // Oylama oturumu aktif
    const stateDuring = await getGameState(roomId, currentAskerId)
    expect(stateDuring.room.activeVote).toBeDefined()
    expect(stateDuring.room.activeVote?.status).toBe('open')
    expect(stateDuring.room.activeVote?.totalEligible).toBe(2)

    // Asker (hedef sahibi) kendi sorusuna oy veremez
    await expect(
      submitTextVote(roomId, currentAskerId, askRes.voteId, true),
    ).rejects.toMatchObject({
      code: 'asker_cannot_vote',
    })

    // 1. Oyuncu Evet verir
    const vote1 = await submitTextVote(roomId, otherPlayers[0]!, askRes.voteId, true)
    expect(vote1.hasVoted).toBe(true)
    expect(vote1.isResolved).toBe(false)

    // 2. Oyuncu Hayır verir -> Çoğunluk Evet olmadığı için otomatik sonuçlanır ve sıra devreder
    const vote2 = await submitTextVote(roomId, otherPlayers[1]!, askRes.voteId, false)
    expect(vote2.hasVoted).toBe(true)
    expect(vote2.isResolved).toBe(true)
    expect(vote2.clueCardItem).toBeDefined()
    expect(vote2.clueCardItem?.yesCount).toBe(1)
    expect(vote2.clueCardItem?.noCount).toBe(1)
    expect(vote2.clueCardItem?.majority).toBe('tie')
    expect(vote2.turnPassed).toBe(true)

    // Askerin İpucu Kartına otomatik eklenmiştir
    const askerStateAfter = await getGameState(roomId, currentAskerId)
    expect(askerStateAfter.you.clueCard).toHaveLength(1)
    expect(askerStateAfter.you.clueCard?.[0]?.questionText).toBe(
      'Gerçek bir kişi miyim, yoksa kurgu bir karakter miyim?',
    )
    expect(askerStateAfter.you.clueCard?.[0]?.yesCount).toBe(1)
    expect(askerStateAfter.you.clueCard?.[0]?.noCount).toBe(1)
  })

  it('Tam Metin modunda Evet çoğunluğu gelirse sıra soru soranda kalır', async () => {
    const { roomId, playerId: hostId } = await createRoom('HostUser', 'classic', {
      communicationMode: 'text',
    })
    const guest1 = buildPlayer(roomId, { nickname: 'Guest1', is_host: false })
    const guest2 = buildPlayer(roomId, { nickname: 'Guest2', is_host: false })
    fake.tables.players.push(guest1, guest2)

    await autoAssignNames(roomId, hostId)
    await startGame(roomId, hostId)

    const state = await getGameState(roomId, hostId)
    const askerId = state.room.currentPlayerId!
    const otherPlayers = [hostId, guest1.id, guest2.id].filter((id) => id !== askerId)

    const askRes = await askTextQuestion(roomId, askerId, { questionText: 'Ben bir bilim insanı mıyım?' })

    // İki oyuncu da Evet verir
    await submitTextVote(roomId, otherPlayers[0]!, askRes.voteId, true)
    const voteRes = await submitTextVote(roomId, otherPlayers[1]!, askRes.voteId, true)

    expect(voteRes.isResolved).toBe(true)
    expect(voteRes.clueCardItem?.majority).toBe('yes')
    expect(voteRes.turnPassed).toBe(false)

    // Sıra hâlâ askerId'dedir
    const stateAfter = await getGameState(roomId, askerId)
    expect(stateAfter.room.currentPlayerId).toBe(askerId)
    expect(stateAfter.you.isYourTurn).toBe(true)
  })

  it('Israrcı Modda Tam Metin soru sorulduğunda soru bütçesi azalır', async () => {
    const { roomId, playerId: hostId } = await createRoom('HostUser', 'persistent', {
      communicationMode: 'text',
    })
    const guest = buildPlayer(roomId, { nickname: 'GuestUser', is_host: false })
    fake.tables.players.push(guest)

    await autoAssignNames(roomId, hostId)
    await startGame(roomId, hostId)

    const state = await getGameState(roomId, hostId)
    const askerId = state.room.currentPlayerId!

    const stateBefore = await getGameState(roomId, askerId)
    expect(stateBefore.you.questionBudgetRemaining).toBe(10)

    await askTextQuestion(roomId, askerId, { questionText: 'Hayatta mıyım?' })

    const stateAfter = await getGameState(roomId, askerId)
    expect(stateAfter.you.questionBudgetRemaining).toBe(9)
  })
})




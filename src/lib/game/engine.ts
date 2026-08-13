import 'server-only'

import type { NameRow, PlayerRow, RoomRow, RoomStatus } from '../database.types'
import { badRequest, conflict, forbidden, notFound } from '../http'
import { supabaseAdmin } from '../supabaseAdmin'
import { fuzzyMatch } from './matching'
import type { GameState, PublicPlayer } from './types'
import {
  MAX_GUESSES_PER_TURN,
  MAX_NAMES_PER_PLAYER,
  MAX_PLAYERS,
  MIN_PLAYERS,
  POINTS_PER_CORRECT_GUESS,
  TOTAL_LIVES_PER_GAME,
  distributeNames,
  generateRoomCode,
  selectNameForPlayer,
  selectNextPlayer,
} from './rules'

/**
 * Oyunun yetkili (authoritative) mantığı.
 *
 * Bu modülün tamamı sunucuda çalışır ve service_role ile veritabanına yazar.
 * İstemciden gelen hiçbir değer kimlik ya da yetki kaynağı olarak kullanılmaz;
 * oyuncu kimliği her zaman imzalı oturum çerezinden gelir.
 */

const UNIQUE_VIOLATION = '23505'

async function loadRoom(roomId: string): Promise<RoomRow> {
  const { data, error } = await supabaseAdmin().from('rooms').select('*').eq('id', roomId).maybeSingle()
  if (error) throw error
  if (!data) throw notFound('room_not_found', 'Oda bulunamadı.')
  return data
}

/**
 * Oyuncular her zaman katılım sırasına göre döner.
 * Önceden ORDER BY yoktu; sıra dizisinin düzeni sorgudan sorguya değişebildiği için
 * tur rotasyonu oyuncu atlayabiliyor ya da tekrar edebiliyordu.
 */
async function loadPlayers(roomId: string): Promise<PlayerRow[]> {
  const { data, error } = await supabaseAdmin()
    .from('players')
    .select('*')
    .eq('room_id', roomId)
    .order('created_at', { ascending: true })
    .order('id', { ascending: true })
  if (error) throw error
  return data ?? []
}

async function loadNames(roomId: string): Promise<NameRow[]> {
  const { data, error } = await supabaseAdmin()
    .from('names')
    .select('*')
    .eq('room_id', roomId)
    .order('created_at', { ascending: true })
  if (error) throw error
  return data ?? []
}

function requireMembership(players: PlayerRow[], playerId: string): PlayerRow {
  const player = players.find((candidate) => candidate.id === playerId)
  if (!player) throw notFound('player_not_in_room', 'Bu odada değilsiniz.')
  return player
}

export async function createRoom(nickname: string) {
  const admin = supabaseAdmin()

  for (let attempt = 0; attempt < 5; attempt++) {
    const roomCode = generateRoomCode()
    const { data: room, error } = await admin
      .from('rooms')
      .insert({ room_code: roomCode, status: 'waiting' })
      .select()
      .single()

    if (error) {
      if (error.code === UNIQUE_VIOLATION) continue
      throw error
    }

    const { data: host, error: hostError } = await admin
      .from('players')
      .insert({ room_id: room.id, nickname, is_host: true, score: 0 })
      .select()
      .single()

    if (hostError) {
      // Sahipsiz oda bırakma.
      await admin.from('rooms').delete().eq('id', room.id)
      throw hostError
    }

    return { roomId: room.id, roomCode: room.room_code, playerId: host.id }
  }

  throw conflict('room_code_exhausted', 'Oda oluşturulamadı, lütfen tekrar deneyin.')
}

export async function joinRoom(roomCode: string, nickname: string) {
  const admin = supabaseAdmin()

  const { data: room, error } = await admin
    .from('rooms')
    .select('*')
    .eq('room_code', roomCode)
    .maybeSingle()

  if (error) throw error
  if (!room) throw notFound('room_not_found', 'Oda bulunamadı. Oda kodunu kontrol edin.')

  if (room.status === 'finished' || room.status === 'closed') {
    throw conflict('room_closed', 'Bu oda yeni oyuncu kabul etmiyor.')
  }

  const players = await loadPlayers(room.id)
  if (players.length >= MAX_PLAYERS) {
    throw conflict('room_full', `Oda dolu (en fazla ${MAX_PLAYERS} oyuncu).`)
  }

  const { data: player, error: playerError } = await admin
    .from('players')
    .insert({ room_id: room.id, nickname, is_host: false, score: 0 })
    .select()
    .single()

  if (playerError) throw playerError

  return { roomId: room.id, roomCode: room.room_code, playerId: player.id }
}

// Room-wide player lives store: roomId -> Map<playerId, lives>
const roomLivesStore = new Map<string, Map<string, number>>()

function getRoomLivesMap(roomId: string): Map<string, number> {
  let map = roomLivesStore.get(roomId)
  if (!map) {
    map = new Map<string, number>()
    roomLivesStore.set(roomId, map)
  }
  return map
}

function getPlayerLives(roomId: string, playerId: string): number {
  const map = getRoomLivesMap(roomId)
  return map.get(playerId) ?? TOTAL_LIVES_PER_GAME
}

function setPlayerLives(roomId: string, playerId: string, lives: number): void {
  const map = getRoomLivesMap(roomId)
  map.set(playerId, Math.max(0, lives))
}

export async function getGameState(roomId: string, viewerId: string): Promise<GameState> {
  const [room, players, names] = await Promise.all([
    loadRoom(roomId),
    loadPlayers(roomId),
    loadNames(roomId),
  ])

  const viewer = requireMembership(players, viewerId)
  const submitters = new Set(names.map((name) => name.submitted_by))

  const isViewerTurn = room.current_player_id === viewerId
  const currentName = names.find((name) => name.id === room.current_identity_id) ?? null

  const publicPlayers: PublicPlayer[] = players.map((player) => ({
    id: player.id,
    nickname: player.nickname,
    isHost: player.is_host ?? false,
    score: player.score ?? 0,
    hasSubmittedNames: submitters.has(player.id),
    livesLeft: getPlayerLives(roomId, player.id),
  }))


  const allPlayersSubmittedNames =
    players.length > 0 && players.every((player) => submitters.has(player.id))

  const currentRound = room.game_round ?? 1

  return {
    room: {
      id: room.id,
      roomCode: room.room_code,
      status: (room.status ?? 'waiting') as RoomStatus,
      gameRound: currentRound,
      isGameActive: room.is_game_active ?? false,
      currentPlayerId: room.current_player_id,
    },
    players: publicPlayers,
    you: {
      playerId: viewer.id,
      isHost: viewer.is_host ?? false,
      isYourTurn: isViewerTurn,
      submittedNames: names
        .filter((name) => name.submitted_by === viewerId)
        .map((name) => name.name_text),
      livesLeft: getPlayerLives(roomId, viewer.id),
    },
    // Tahmin eden oyuncuya cevap gönderilmez.
    currentName: isViewerTurn ? null : (currentName?.name_text ?? null),
    namesTotal: names.length,
    namesRemaining: names.filter((name) => name.used_in_round === null).length,
    allPlayersSubmittedNames,
    canStart:
      allPlayersSubmittedNames && players.length >= MIN_PLAYERS && players.length <= MAX_PLAYERS,
    maxLives: TOTAL_LIVES_PER_GAME,
  }
}

/**
 * İsimleri tek bir ifadede kaydeder.
 *
 * Önceden isimler döngü içinde tek tek gönderiliyordu ve `UNIQUE (room_id, name_text)`
 * ihlalinde döngü kırılıyordu: bir kısmı kaydedilmiş, oyuncu ise formu bir daha
 * gönderemez hale gelmiş oluyordu. Artık çakışanlar atlanır ve oyuncuya hangi isimlerin
 * zaten alındığı bildirilir.
 */
export async function submitNames(roomId: string, playerId: string, names: string[]) {
  const admin = supabaseAdmin()
  const players = await loadPlayers(roomId)
  requireMembership(players, playerId)

  const room = await loadRoom(roomId)
  if (room.status !== 'waiting') {
    throw conflict('game_already_started', 'Oyun başladıktan sonra isim eklenemez.')
  }

  const existing = await loadNames(roomId)
  if (existing.some((name) => name.submitted_by === playerId)) {
    throw conflict('names_already_submitted', 'İsimlerinizi zaten gönderdiniz.')
  }

  // Aynı istek içindeki tekrarları ayıkla (büyük/küçük harf duyarsız).
  const unique: string[] = []
  const seen = new Set<string>()
  for (const name of names) {
    const key = name.toLocaleLowerCase('tr')
    if (!seen.has(key)) {
      seen.add(key)
      unique.push(name)
    }
  }

  if (unique.length > MAX_NAMES_PER_PLAYER) {
    throw badRequest('too_many_names', `En fazla ${MAX_NAMES_PER_PLAYER} isim gönderebilirsiniz.`)
  }

  const { data: inserted, error } = await admin
    .from('names')
    .upsert(
      unique.map((name) => ({ room_id: roomId, submitted_by: playerId, name_text: name })),
      { onConflict: 'room_id,name_text', ignoreDuplicates: true },
    )
    .select()

  if (error) throw error

  const accepted = (inserted ?? []).map((row) => row.name_text)
  const duplicates = unique.filter((name) => !accepted.includes(name))

  if (accepted.length === 0) {
    throw conflict(
      'all_names_taken',
      'Girdiğiniz isimlerin hepsi bu odada zaten kullanılmış. Farklı isimler deneyin.',
    )
  }

  // Realtime bildirimi: `names` tablosu gizli olduğu ve Realtime yayınında bulunmadığı için
  // `rooms` kaydını güncelleyerek bağlı tüm tarayıcılara oyuncunun hazır olduğunu duyuruyoruz.
  await admin.from('rooms').update({ status: room.status }).eq('id', roomId)

  return { accepted, duplicates }
}

export async function startGame(roomId: string, playerId: string) {
  const admin = supabaseAdmin()
  const players = await loadPlayers(roomId)
  const player = requireMembership(players, playerId)

  if (!player.is_host) {
    throw forbidden('not_host', 'Oyunu yalnızca oda sahibi başlatabilir.')
  }

  const room = await loadRoom(roomId)
  if (room.status === 'playing') {
    throw conflict('game_already_started', 'Oyun zaten başlamış.')
  }

  if (players.length < MIN_PLAYERS) {
    throw badRequest('not_enough_players', `Oyunu başlatmak için en az ${MIN_PLAYERS} oyuncu gerekli.`)
  }
  if (players.length > MAX_PLAYERS) {
    throw badRequest('too_many_players', `Oda dolu (en fazla ${MAX_PLAYERS} oyuncu).`)
  }

  const names = await loadNames(roomId)
  const submitters = new Set(names.map((name) => name.submitted_by))
  if (!players.every((candidate) => submitters.has(candidate.id))) {
    throw badRequest('names_missing', 'Tüm oyuncuların isimlerini göndermesi bekleniyor.')
  }

  // Oyun başında herkesin canını 3 yap
  for (const p of players) {
    setPlayerLives(roomId, p.id, TOTAL_LIVES_PER_GAME)
  }

  const firstPlayer = players[0]!
  const firstName = selectNameForPlayer(names, firstPlayer.id)
  if (!firstName) {
    throw badRequest('names_missing', 'Oyuna başlamak için yeterli isim yok.')
  }

  // İsimleri oyunculara dağıt. Önceden bu, isim başına bir UPDATE ile yapılıyordu
  // (6 oyuncu x 3 isim = 18 ardışık sorgu); artık tek bir toplu upsert.
  const assignedTo = new Map(
    distributeNames(names, players).map(({ nameId, playerId: target }) => [nameId, target]),
  )
  const { error: assignError } = await admin.from('names').upsert(
    names.map((name) => ({
      ...name,
      assigned_to: assignedTo.get(name.id) ?? null,
      used_in_round: name.id === firstName.id ? 1 : null,
    })),
    { onConflict: 'id' },
  )
  if (assignError) throw assignError

  const { error } = await admin
    .from('rooms')
    .update({
      status: 'playing',
      current_player_id: firstPlayer.id,
      current_identity_id: firstName.id,
      game_round: 1,
      is_game_active: true,
    })
    .eq('id', roomId)

  if (error) throw error
}

/**
 * Sırayı bir sonraki oyuncuya devreder.
 *
 * `game_round` üzerinden optimistic locking kullanılır: güncelleme yalnızca sıra hâlâ
 * beklenen oyuncudaysa ve tur numarası değişmemişse uygulanır. Aynı anda gelen ikinci
 * bir istek hiçbir satır güncelleyemez ve reddedilir, böylece çift puan ya da atlanan
 * sıra oluşmaz.
 */
async function advanceTurn(room: RoomRow, players: PlayerRow[], names: NameRow[]) {
  const admin = supabaseAdmin()
  const currentRound = room.game_round ?? 1

  // Canı > 0 olan aktif oyuncular
  const activePlayerIds = new Set(
    players.filter((p) => getPlayerLives(room.id, p.id) > 0).map((p) => p.id),
  )

  const nextPlayer = selectNextPlayer(players, room.current_player_id, activePlayerIds)
  const availableNames = names.filter((name) => name.used_in_round === null)

  if (!nextPlayer || availableNames.length === 0 || activePlayerIds.size === 0) {
    const { data } = await admin
      .from('rooms')
      .update({ status: 'finished', is_game_active: false, current_identity_id: null })
      .eq('id', room.id)
      .eq('game_round', currentRound)
      .select('id')
    return { claimed: (data?.length ?? 0) > 0, finished: true }
  }

  const nextName = selectNameForPlayer(availableNames, nextPlayer.id)!

  const { data, error } = await admin
    .from('rooms')
    .update({
      current_player_id: nextPlayer.id,
      current_identity_id: nextName.id,
      game_round: currentRound + 1,
    })
    .eq('id', room.id)
    .eq('game_round', currentRound)
    .eq('current_player_id', room.current_player_id!)
    .select('id')

  if (error) throw error
  if (!data || data.length === 0) return { claimed: false, finished: false }

  await admin.from('names').update({ used_in_round: currentRound + 1 }).eq('id', nextName.id)

  return { claimed: true, finished: false }
}

function assertPlayersTurn(room: RoomRow, playerId: string) {
  if (room.status !== 'playing' || !room.is_game_active) {
    throw conflict('game_not_active', 'Oyun şu anda aktif değil.')
  }
  if (room.current_player_id !== playerId) {
    throw forbidden('not_your_turn', 'Sıra sizde değil.')
  }
}

export async function makeGuess(roomId: string, playerId: string, guess: string) {
  const [room, players, names] = await Promise.all([
    loadRoom(roomId),
    loadPlayers(roomId),
    loadNames(roomId),
  ])

  requireMembership(players, playerId)
  assertPlayersTurn(room, playerId)

  const currentName = names.find((name) => name.id === room.current_identity_id)
  if (!currentName) {
    throw conflict('no_active_name', 'Bu tur için bir isim seçilmemiş.')
  }

  const currentLives = getPlayerLives(roomId, playerId)
  if (currentLives <= 0) {
    const outcome = await advanceTurn(room, players, names)
    return {
      correct: false,
      message: 'Can hakkınız kalmadı, oyundan elendiniz!',
      livesLeft: 0,
      turnPassed: true,
      finished: outcome.finished,
    }
  }

  if (!fuzzyMatch(guess, currentName.name_text)) {
    const newLives = currentLives - 1
    setPlayerLives(roomId, playerId, newLives)

    const outcome = await advanceTurn(room, players, names)

    // Realtime yayını: Tüm bağlı oyunculara (Host ve Guests) can durumunun değiştiğini duyur
    await supabaseAdmin().from('rooms').update({ status: room.status }).eq('id', roomId)

    if (newLives <= 0) {
      return {
        correct: false,
        message: 'Yanlış tahmin! Can hakkınız bitti ve oyundan elendiniz. Sıra diğer oyuncuya geçti.',
        livesLeft: 0,
        turnPassed: true,
        finished: outcome.finished,
      }
    }

    return {
      correct: false,
      message: `Yanlış tahmin! 1 can kaybettiniz (Kalan Can: ${newLives}). Sıra diğer oyuncuya geçti.`,
      livesLeft: newLives,
      turnPassed: true,
      finished: outcome.finished,
    }
  }


  const outcome = await advanceTurn(room, players, names)
  if (!outcome.claimed) {
    throw conflict('turn_already_advanced', 'Bu tur çoktan tamamlandı.')
  }

  const { error } = await supabaseAdmin().rpc('increment_player_score', {
    p_player_id: playerId,
    p_delta: POINTS_PER_CORRECT_GUESS,
  })
  if (error) throw error

  return {
    correct: true,
    message: `Doğru tahmin! +${POINTS_PER_CORRECT_GUESS} puan`,
    finished: outcome.finished,
    livesLeft: currentLives,
    turnPassed: true,
  }
}



export async function passTurn(roomId: string, playerId: string) {
  const [room, players, names] = await Promise.all([
    loadRoom(roomId),
    loadPlayers(roomId),
    loadNames(roomId),
  ])

  requireMembership(players, playerId)
  assertPlayersTurn(room, playerId)

  const outcome = await advanceTurn(room, players, names)
  if (!outcome.claimed) {
    throw conflict('turn_already_advanced', 'Bu tur çoktan tamamlandı.')
  }

  return { message: 'Sıra bir sonraki oyuncuya geçti.', finished: outcome.finished }
}

export async function resetGame(roomId: string, playerId: string) {
  const admin = supabaseAdmin()
  const players = await loadPlayers(roomId)
  const player = requireMembership(players, playerId)

  if (!player.is_host) {
    throw forbidden('not_host', 'Yeni turu yalnızca oda sahibi başlatabilir.')
  }

  // Oyun sıfırlandığında canlılar tekrar yenilensin
  for (const p of players) {
    setPlayerLives(roomId, p.id, TOTAL_LIVES_PER_GAME)
  }

  const { error: roomError } = await admin
    .from('rooms')
    .update({
      status: 'waiting',
      current_player_id: null,
      current_identity_id: null,
      game_round: 1,
      is_game_active: false,
    })
    .eq('id', roomId)
  if (roomError) throw roomError

  // Yeni turda herkes yeniden isim girsin.
  const { error: namesError } = await admin.from('names').delete().eq('room_id', roomId)
  if (namesError) throw namesError

  const { error: scoresError } = await admin
    .from('players')
    .update({ score: 0 })
    .eq('room_id', roomId)
  if (scoresError) throw scoresError
}


export async function leaveRoom(roomId: string, playerId: string) {
  const admin = supabaseAdmin()
  const players = await loadPlayers(roomId)

  if (!players.some((player) => player.id === playerId)) {
    return { roomClosed: false }
  }

  const room = await loadRoom(roomId)
  const wasCurrentPlayer = room.current_player_id === playerId
  const remaining = players.filter((player) => player.id !== playerId)

  // Ayrılan oyuncunun sırası varsa, satır silinmeden önce sırayı devret.
  // (FK'ler ON DELETE SET NULL olduğu için silme başarısız olmaz ama oyun sırasız kalır.)
  if (wasCurrentPlayer && remaining.length > 0 && room.status === 'playing') {
    const names = await loadNames(roomId)
    await advanceTurn(room, players, names)
  }

  const { error } = await admin.from('players').delete().eq('id', playerId)
  if (error) throw error

  if (remaining.length === 0) {
    await admin.from('rooms').update({ status: 'closed', is_game_active: false }).eq('id', roomId)
    return { roomClosed: true }
  }

  // Oda sahibi ayrıldıysa sıradaki oyuncu host olur, yoksa oda yönetilemez hale gelir.
  const leavingPlayer = players.find((player) => player.id === playerId)
  if (leavingPlayer?.is_host) {
    await admin.from('players').update({ is_host: true }).eq('id', remaining[0]!.id)
  }

  return { roomClosed: false }
}

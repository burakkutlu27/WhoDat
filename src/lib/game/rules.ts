/**
 * Oyun kuralları. Saf fonksiyonlar — veritabanı bağımlılığı yok, hepsi test edilebilir.
 * Rastgelelik dışarıdan enjekte edilir ki testler deterministik olabilsin.
 */

export const MIN_PLAYERS = 2
export const MAX_PLAYERS = 6
export const MAX_NAMES_PER_PLAYER = 3
export const TOTAL_LIVES_PER_GAME = 3
export const MAX_GUESSES_PER_TURN = 3
export const POINTS_PER_CORRECT_GUESS = 10
export const ROOM_CODE_LENGTH = 6

export const SPEED_MODE_MAX_SCORE = 100
export const SPEED_MODE_SCORE_DECREMENT = 5
export const SPEED_MODE_MIN_SCORE = 10
export const SPEED_MODE_MAX_QUESTIONS = 20
export const DEFAULT_SPEED_ROUNDS = 3

/**
 * Hız modu puan hesaplama:
 * Soru sayısı limit (20) veya üstündeyse 0 puan.
 * Aksi halde: max(MIN_PUAN, MAX_PUAN - (soruSayisi * SORU_BASI_DUSUS))
 */
export function calculateSpeedScore(questionCount: number): number {
  if (questionCount >= SPEED_MODE_MAX_QUESTIONS) {
    return 0
  }
  const score = SPEED_MODE_MAX_SCORE - questionCount * SPEED_MODE_SCORE_DECREMENT
  return Math.max(SPEED_MODE_MIN_SCORE, score)
}

/**
 * Canlı arayüzde oyuncunun şu an bilirse alacağı tahmini puanı döndürür.
 */
export function estimateSpeedScore(questionCount: number): number {
  return calculateSpeedScore(questionCount)
}


/**
 * 0/O ve 1/I gibi karıştırılabilecek karakterler alfabede yok: oda kodu genelde
 * masanın karşısındaki arkadaşa sesli okunuyor.
 */
const ROOM_CODE_ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

function secureRandomInt(exclusiveMax: number): number {
  const buffer = new Uint32Array(1)
  crypto.getRandomValues(buffer)
  return buffer[0]! % exclusiveMax
}

export function generateRoomCode(randomInt: (exclusiveMax: number) => number = secureRandomInt): string {
  let code = ''
  for (let i = 0; i < ROOM_CODE_LENGTH; i++) {
    code += ROOM_CODE_ALPHABET[randomInt(ROOM_CODE_ALPHABET.length)]
  }
  return code
}

export interface PlayerLike {
  id: string
}

export interface NameLike {
  id: string
  submitted_by: string
}

/**
 * Sıradaki oyuncuyu döndürür. Canlı/aktif oyuncular filtrelenmiş olarak geçebilir.
 * Mevcut oyuncu listede yoksa sıra baştan başlar.
 */
export function selectNextPlayer<T extends PlayerLike>(
  players: T[],
  currentPlayerId: string | null,
  activePlayerIds?: Set<string>,
): T | null {
  const candidates = activePlayerIds
    ? players.filter((player) => activePlayerIds.has(player.id))
    : players

  if (candidates.length === 0) return null

  const currentIndex = candidates.findIndex((player) => player.id === currentPlayerId)
  if (currentIndex === -1) return candidates[0]!

  return candidates[(currentIndex + 1) % candidates.length]!
}

/**
 * Oyuncuya tahmin ettirilecek ismi seçer.
 *
 * Oyuncunun kendi yazdığı ismi tahmin etmesi anlamsız olacağı için önce başkalarının
 * isimleri denenir. Yalnızca kendi isimleri kalmışsa oyunun kilitlenmemesi için
 * onlardan biri seçilir.
 */
export function selectNameForPlayer<T extends NameLike>(
  availableNames: T[],
  playerId: string,
  random: () => number = Math.random,
): T | null {
  if (availableNames.length === 0) return null

  const fromOthers = availableNames.filter((name) => name.submitted_by !== playerId)
  const pool = fromOthers.length > 0 ? fromOthers : availableNames

  return pool[Math.floor(random() * pool.length)] ?? null
}

/** İsimleri oyunculara round-robin ile dağıtır. */
export function distributeNames<TName extends { id: string }, TPlayer extends PlayerLike>(
  names: TName[],
  players: TPlayer[],
  random: () => number = Math.random,
): Array<{ nameId: string; playerId: string }> {
  if (players.length === 0 || names.length === 0) return []

  const shuffled = [...names]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!]
  }

  return shuffled.map((name, index) => ({
    nameId: name.id,
    playerId: players[index % players.length]!.id,
  }))
}

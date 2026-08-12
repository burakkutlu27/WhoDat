/**
 * Oyun kuralları. Saf fonksiyonlar — veritabanı bağımlılığı yok, hepsi test edilebilir.
 * Rastgelelik dışarıdan enjekte edilir ki testler deterministik olabilsin.
 */

export const MIN_PLAYERS = 2
export const MAX_PLAYERS = 6
export const MAX_NAMES_PER_PLAYER = 3
export const POINTS_PER_CORRECT_GUESS = 10
export const ROOM_CODE_LENGTH = 6

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
 * Sıradaki oyuncuyu döndürür. Mevcut oyuncu listede yoksa (odadan ayrılmışsa)
 * sıra baştan başlar.
 */
export function selectNextPlayer<T extends PlayerLike>(
  players: T[],
  currentPlayerId: string | null,
): T | null {
  if (players.length === 0) return null

  const currentIndex = players.findIndex((player) => player.id === currentPlayerId)
  if (currentIndex === -1) return players[0]!

  return players[(currentIndex + 1) % players.length]!
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

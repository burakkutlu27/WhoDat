import type { DifficultyLevel, FamousPerson } from './types'

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

// Israrcı Mod sabitleri
export const PERSISTENT_MODE_QUESTION_BUDGET = 10
export const PERSISTENT_MODE_MAX_SCORE = 100
export const PERSISTENT_MODE_SCORE_DECREMENT = 8
export const PERSISTENT_MODE_MIN_SCORE = 20

// Ortak Hedef Modu sabitleri
export const DEFAULT_SHARED_TARGET_ROUNDS = 3
export const SHARED_TARGET_POINTS_PER_WIN = 100

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
 * Israrcı Mod puan hesaplama:
 * max(MIN_PUAN, MAX_PUAN - (kullanilanSoruSayisi * SORU_BASI_DUSUS))
 * Bütçe 10, düşüş 8 — 10. soruda bile 20 puan kalır.
 */
export function calculatePersistentScore(questionsUsed: number): number {
  const score = PERSISTENT_MODE_MAX_SCORE - questionsUsed * PERSISTENT_MODE_SCORE_DECREMENT
  return Math.max(PERSISTENT_MODE_MIN_SCORE, score)
}

/**
 * Canlı arayüzde oyuncunun şu an bilirse alacağı tahmini puanı döndürür (Israrcı Mod).
 */
export function estimatePersistentScore(questionsUsed: number): number {
  return calculatePersistentScore(questionsUsed)
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

/**
 * Ortak Hedef Modu: Host hariç yarışmacılar arasında sıradaki soru soran oyuncuyu seçer.
 * Sıra atlama cezası olan oyuncular bu turda atlanır ve cezaları tüketilir.
 */
export function selectNextSharedTargetAsker<T extends PlayerLike>(
  players: T[],
  currentAskerId: string | null,
  hostId: string,
  penalizedPlayerIds?: Set<string>,
): { nextPlayer: T | null; consumedPenalties: string[] } {
  const contestants = players.filter((p) => p.id !== hostId)
  if (contestants.length === 0) return { nextPlayer: null, consumedPenalties: [] }

  const consumedPenalties: string[] = []
  const validCandidates: T[] = []

  let startIdx = 0
  if (currentAskerId) {
    const curr = contestants.findIndex((p) => p.id === currentAskerId)
    if (curr !== -1) {
      startIdx = (curr + 1) % contestants.length
    }
  }

  for (let i = 0; i < contestants.length; i++) {
    const candidate = contestants[(startIdx + i) % contestants.length]!
    if (penalizedPlayerIds && penalizedPlayerIds.has(candidate.id)) {
      consumedPenalties.push(candidate.id)
    } else {
      validCandidates.push(candidate)
      break
    }
  }

  if (validCandidates.length === 0 && contestants.length > 0) {
    const fallback = contestants[startIdx]!
    return { nextPlayer: fallback, consumedPenalties }
  }

  return { nextPlayer: validCandidates[0] ?? null, consumedPenalties }
}

/**
 * Zorluk Seviyesine Göre Ünlüleri Filtreler (08a-zorluk-seviyesi-BASIT.md):
 * - kolay: fameTier <= 2 (Tier 1 veya 2)
 * - orta: fameTier <= 3 (Tier 1, 2 veya 3)
 * - zor: tüm isimler (Tier 1..5, filtre yok)
 */
export function filterByDifficulty(
  people: FamousPerson[],
  difficulty: DifficultyLevel = 'orta',
): FamousPerson[] {
  if (difficulty === 'kolay') return people.filter((p) => (p.fameTier ?? 4) <= 2)
  if (difficulty === 'orta') return people.filter((p) => (p.fameTier ?? 4) <= 3)
  return people // 'zor' -> filtre yok, hepsi
}


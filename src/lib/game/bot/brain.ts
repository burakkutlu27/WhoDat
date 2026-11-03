import type { PersonAttributes } from '../famousPeopleAttributes'
import type { BotLevel } from '../types'
import { ANSWERABLE_QUESTION_IDS, answerFor, lookupAttributes, type BotAnswer } from './knowledge'

/**
 * Bot kararları. Saf fonksiyonlar — veritabanı yok, rastgelelik dışarıdan enjekte edilir
 * (rules.ts ile aynı desen) ki testler deterministik olsun.
 */

export type { BotLevel }

export interface PoolEntry {
  name: string
  fameTier?: number
}

export interface Candidate {
  name: string
  attributes: PersonAttributes | null
  /** Çok ünlü isimler daha olası: otomatik atama çoğunlukla Tier 1-2 dağıtıyor. */
  weight: number
}

/** İpucu kartındaki bir soru ve çoğunluk cevabı (eşitlikler bilgi taşımadığı için gelmez). */
export interface ClueObservation {
  questionId: string
  answer: boolean
}

export type BotAction =
  | { type: 'ask'; questionId: string }
  | { type: 'guess'; name: string }
  | { type: 'pass' }

type Random = () => number

/** Oy verirken yanılma olasılığı: kolay bot insan gibi ara sıra hata yapar. */
const VOTE_ERROR_RATE: Record<BotLevel, number> = { kolay: 0.1, orta: 0.03, zor: 0 }

/** En olası adayın olasılığı bu eşiği geçince bot soru sormak yerine tahmin eder. */
const GUESS_CONFIDENCE: Record<BotLevel, number> = { kolay: 0.25, orta: 0.4, zor: 0.5 }

export function toCandidates(pool: PoolEntry[]): Candidate[] {
  return pool.map((entry) => ({
    name: entry.name,
    attributes: lookupAttributes(entry.name),
    weight: 1 / Math.max(1, entry.fameTier ?? 4),
  }))
}

/**
 * İpuçlarıyla çelişen adayları eler. Cevabı bilinmeyen (null) soru adayı elemez: veri
 * eksikliği yüzünden doğru ismi kaybetmek, fazladan aday tutmaktan daha kötü.
 */
export function filterCandidates(candidates: Candidate[], clues: ClueObservation[], excludedNames: Set<string> = new Set()): Candidate[] {
  return candidates.filter((candidate) => {
    if (excludedNames.has(candidate.name)) return false
    return clues.every((clue) => {
      const answer = answerFor(clue.questionId, candidate.name, candidate.attributes)
      return answer === null || answer === clue.answer
    })
  })
}

/** Seçmen botun oyu: doğru cevap, seviyeye göre ara sıra ters çevrilir. null = oy vermez. */
export function voteAnswer(questionId: string | null, targetName: string, level: BotLevel, random: Random = Math.random): BotAnswer {
  if (!questionId) return null
  const truth = answerFor(questionId, targetName)
  if (truth === null) return null
  return random() < VOTE_ERROR_RATE[level] ? !truth : truth
}

/** Soru, adayları ne kadar dengeli bölüyor (0 = hiç, 0.5 = tam ikiye). Bilinmeyenler sayılmaz. */
function splitScore(questionId: string, candidates: Candidate[]): number {
  let yes = 0
  let no = 0
  for (const candidate of candidates) {
    const answer = answerFor(questionId, candidate.name, candidate.attributes)
    if (answer === true) yes += candidate.weight
    else if (answer === false) no += candidate.weight
  }
  const total = yes + no
  return total === 0 ? 0 : Math.min(yes, no) / total
}

export function chooseQuestion(candidates: Candidate[], askedIds: Set<string>, level: BotLevel, random: Random = Math.random): string | null {
  const options = ANSWERABLE_QUESTION_IDS.filter((id) => !askedIds.has(id))
  if (options.length === 0) return null

  if (level === 'kolay') return options[Math.floor(random() * options.length)]!

  const ranked = options
    .map((id) => ({ id, score: splitScore(id, candidates) }))
    .filter((option) => option.score > 0)
    .sort((a, b) => b.score - a.score)
  if (ranked.length === 0) return null

  if (level === 'zor') return ranked[0]!.id
  const top = ranked.slice(0, 3)
  return top[Math.floor(random() * top.length)]!.id
}

/** En olası aday ve olasılığı (ağırlıklı). */
export function mostLikely(candidates: Candidate[], random: Random = Math.random): { name: string; probability: number } | null {
  if (candidates.length === 0) return null
  const total = candidates.reduce((sum, candidate) => sum + candidate.weight, 0)
  const best = Math.max(...candidates.map((candidate) => candidate.weight))
  const tied = candidates.filter((candidate) => candidate.weight === best)
  const pick = tied[Math.floor(random() * tied.length)]!
  return { name: pick.name, probability: pick.weight / total }
}

export interface DecideInput {
  candidates: Candidate[]
  askedIds: Set<string>
  /** Bu turda/ bütçede soru sorabilir mi (Klasik'te tur başına 1, Israrcı'da bütçe). */
  canAsk: boolean
  level: BotLevel
  random?: Random
}

export function decideAction({ candidates, askedIds, canAsk, level, random = Math.random }: DecideInput): BotAction {
  const likely = mostLikely(candidates, random)
  if (!likely) return { type: 'pass' }

  if (likely.probability >= GUESS_CONFIDENCE[level] || !canAsk) {
    return { type: 'guess', name: likely.name }
  }

  const questionId = chooseQuestion(candidates, askedIds, level, random)
  if (questionId) return { type: 'ask', questionId }
  return { type: 'guess', name: likely.name }
}

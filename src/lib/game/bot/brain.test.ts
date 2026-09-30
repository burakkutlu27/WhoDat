import { describe, expect, it } from 'vitest'

import { FAMOUS_PEOPLE_SEED } from '../famousPeopleData'
import { filterByDifficulty } from '../rules'
import { chooseQuestion, decideAction, filterCandidates, toCandidates, voteAnswer, type BotLevel, type ClueObservation } from './brain'
import { answerFor, lookupAttributes, questionIdForText } from './knowledge'

/** Deterministik rastgelelik (mulberry32). */
function seeded(seed: number) {
  let state = seed
  return () => {
    state |= 0
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const EASY_POOL = filterByDifficulty(
  FAMOUS_PEOPLE_SEED.map((person) => ({ id: person.name, name: person.name, category: person.category, fameTier: person.fameTier })),
  'kolay',
)

describe('knowledge', () => {
  it('veri setindeki gerçek kişiyi cevaplar', () => {
    expect(answerFor('qb-01', 'Novak Djokovic')).toBe(true)
    expect(answerFor('qb-05', 'Novak Djokovic')).toBe(true)
    expect(answerFor('qb-06', 'Novak Djokovic')).toBe(false)
    expect(answerFor('qb-11', 'Novak Djokovic')).toBe(true)
    expect(answerFor('qb-06', 'Naim Süleymanoğlu')).toBe(true)
    expect(answerFor('qb-03', 'Naim Süleymanoğlu')).toBe(false)
  })

  it('isim sorularını veri setinde olmayan isimlerde de cevaplar', () => {
    expect(answerFor('qb-19', 'Uydurma Kişi')).toBe(true)
    expect(answerFor('qb-18', 'Ali Veli')).toBe(false)
    expect(answerFor('qb-18', 'Ronaldinho')).toBe(true)
    // Özellik gerektiren soru: kişi bilinmiyor → çekimser.
    expect(answerFor('qb-05', 'Uydurma Kişi')).toBeNull()
  })

  it('büyük/küçük harf ve Türkçe karakter farkına rağmen kişiyi bulur', () => {
    expect(lookupAttributes('novak djokovic')).not.toBeNull()
  })

  it('verisi olmayan soruda (iyi/kötü karakter) çekimser kalır', () => {
    expect(answerFor('qb-16', 'Novak Djokovic')).toBeNull()
    expect(answerFor('qb-17', 'Novak Djokovic')).toBeNull()
  })

  it('ipucu kartındaki soru metnini bankadaki soruya çevirir, özel soruda null döner', () => {
    expect(questionIdForText('Bir erkek miyim?')).toBe('qb-05')
    expect(questionIdForText('Bıyığım var mı?')).toBeNull()
  })
})

describe('brain', () => {
  it('seçmen bot doğru oyu verir (zor), bilmediği soruda oy vermez', () => {
    expect(voteAnswer('qb-05', 'Novak Djokovic', 'zor')).toBe(true)
    expect(voteAnswer('qb-16', 'Novak Djokovic', 'zor')).toBeNull()
    expect(voteAnswer(null, 'Novak Djokovic', 'zor')).toBeNull()
  })

  it('kolay bot ara sıra yanlış oy verir, zor bot hiç vermez', () => {
    const random = seeded(7)
    const votes = (level: BotLevel) =>
      Array.from({ length: 400 }, () => voteAnswer('qb-05', 'Novak Djokovic', level, random))
    expect(votes('zor').every((vote) => vote === true)).toBe(true)
    const wrongRate = votes('kolay').filter((vote) => vote === false).length / 400
    expect(wrongRate).toBeGreaterThan(0.03)
    expect(wrongRate).toBeLessThan(0.2)
  })

  it('ipucuyla çelişen adayları eler, bilinmeyen cevap adayı elemez', () => {
    const candidates = toCandidates([{ name: 'Novak Djokovic', fameTier: 1 }, { name: 'Naim Süleymanoğlu', fameTier: 1 }, { name: 'Uydurma Kişi' }])
    const turkish: ClueObservation[] = [{ questionId: 'qb-06', answer: true }]
    expect(filterCandidates(candidates, turkish).map((c) => c.name)).toEqual(['Naim Süleymanoğlu', 'Uydurma Kişi'])
  })

  it('zor bot adayları en dengeli bölen soruyu seçer', () => {
    const candidates = toCandidates([
      { name: 'Novak Djokovic', fameTier: 1 },
      { name: 'Naim Süleymanoğlu', fameTier: 1 },
    ])
    const question = chooseQuestion(candidates, new Set(), 'zor')
    expect(question).not.toBeNull()
    const answers = candidates.map((c) => answerFor(question!, c.name, c.attributes))
    expect(new Set(answers).size).toBe(2)
  })

  it('tek aday kaldığında tahmin eder, soru hakkı yoksa en olası adayı tahmin eder', () => {
    const one = toCandidates([{ name: 'Novak Djokovic', fameTier: 1 }])
    expect(decideAction({ candidates: one, askedIds: new Set(), canAsk: true, level: 'zor' })).toEqual({ type: 'guess', name: 'Novak Djokovic' })

    const many = toCandidates(EASY_POOL.slice(0, 50))
    expect(decideAction({ candidates: many, askedIds: new Set(), canAsk: false, level: 'zor' }).type).toBe('guess')
    expect(decideAction({ candidates: many, askedIds: new Set(), canAsk: true, level: 'zor' }).type).toBe('ask')
  })

  it('aday kalmazsa pas geçer', () => {
    expect(decideAction({ candidates: [], askedIds: new Set(), canAsk: true, level: 'zor' })).toEqual({ type: 'pass' })
  })

  /**
   * Simülasyon: bot, kolay havuzundan rastgele bir hedefi dürüst cevaplarla (zor seçmenler)
   * bulmaya çalışır. Zor bot ortalamada daha az aksiyonla bilmeli; her iki bot da çoğunlukla bilmeli.
   */
  it('zor bot kolay bottan daha verimli tahmin eder', () => {
    function play(level: BotLevel, seed: number) {
      const random = seeded(seed)
      const target = EASY_POOL[Math.floor(random() * EASY_POOL.length)]!
      const pool = toCandidates(EASY_POOL)
      const clues: ClueObservation[] = []
      const asked = new Set<string>()
      const wrong = new Set<string>()
      for (let actions = 1; actions <= 30; actions++) {
        const candidates = filterCandidates(pool, clues, wrong)
        const action = decideAction({ candidates, askedIds: asked, canAsk: true, level, random })
        if (action.type === 'pass') return { solved: false, actions }
        if (action.type === 'guess') {
          if (action.name === target.name) return { solved: true, actions }
          wrong.add(action.name)
          continue
        }
        asked.add(action.questionId)
        const truth = answerFor(action.questionId, target.name)
        if (truth !== null) clues.push({ questionId: action.questionId, answer: truth })
      }
      return { solved: false, actions: 30 }
    }

    const summarize = (level: BotLevel) => {
      const games = Array.from({ length: 30 }, (_, i) => play(level, 1000 + i))
      return {
        solvedRate: games.filter((game) => game.solved).length / games.length,
        avgActions: games.reduce((sum, game) => sum + game.actions, 0) / games.length,
      }
    }

    const hard = summarize('zor')
    const easy = summarize('kolay')
    expect(hard.avgActions).toBeLessThan(easy.avgActions)
    expect(hard.solvedRate).toBeGreaterThanOrEqual(easy.solvedRate)
  })
})

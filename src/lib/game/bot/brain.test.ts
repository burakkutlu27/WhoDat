import { describe, expect, it } from 'vitest'

import { FAMOUS_PEOPLE_SEED } from '../famousPeopleData'
import { QUESTION_BANK_SEED } from '../questionBankData'
import { filterByDifficulty } from '../rules'
import { chooseQuestion, decideAction, filterCandidates, toCandidates, voteAnswer, type BotLevel, type ClueObservation } from './brain'
import { ANSWERABLE_QUESTION_IDS, answerFor, lookupAttributes, questionIdForText } from './knowledge'

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
    expect(answerFor('qb-03', 'Novak Djokovic')).toBe(true)
    expect(answerFor('qb-03', 'Harry Potter')).toBe(false)
  })

  it('eklenen dönem, alan ve isim sorularını doğru değerlendirir', () => {
    expect(answerFor('qb-23', 'Mustafa Kemal Atatürk')).toBe(true)
    expect(answerFor('qb-25', 'Mustafa Kemal Atatürk')).toBe(true)
    expect(answerFor('qb-25', 'Novak Djokovic')).toBe(false)
    expect(answerFor('qb-25', 'Harry Potter')).toBe(false)

    expect(answerFor('qb-26', 'Novak Djokovic')).toBe(true)
    expect(answerFor('qb-26', 'Brad Pitt')).toBe(false)
    expect(answerFor('qb-27', 'Brad Pitt')).toBe(true)
    expect(answerFor('qb-27', 'Mustafa Kemal Atatürk')).toBe(false)

    expect(answerFor('qb-28', 'Vito Corleone (Baba / The Godfather)')).toBe(true)
    expect(answerFor('qb-28', 'Shakira')).toBe(false)
    expect(answerFor('qb-29', 'Brad Pitt')).toBe(true)
    expect(answerFor('qb-29', 'Novak Djokovic')).toBe(false)
    expect(answerFor('qb-30', 'Novak Djokovic')).toBe(true)
    expect(answerFor('qb-30', 'Brad Pitt')).toBe(false)
    expect(answerFor('qb-31', 'İsmet İnönü')).toBe(true)
    expect(answerFor('qb-31', 'Şenol Güneş')).toBe(false)
    // Parantez içi ifade harf sorularına dahil edilmez ("Baba" dışında "a" yok)
    expect(answerFor('qb-32', 'Vito Corleone (Baba / The Godfather)')).toBe(false)
    expect(answerFor('qb-33', 'Harry Potter')).toBe(true)
    expect(answerFor('qb-34', 'Harry Potter')).toBe(true)
    expect(answerFor('qb-35', 'İsmet İnönü')).toBe(true)
    expect(answerFor('qb-35', 'Şenol Güneş')).toBe(false)
  })

  it('soru bankasındaki tüm sorular bot tarafından yanıtlanabilir ve tüm veride sıfır null üretir', () => {
    const expectedIds = QUESTION_BANK_SEED.map((q) => q.id)
    expect(ANSWERABLE_QUESTION_IDS).toEqual(expectedIds)

    const nulls: string[] = []
    for (const person of FAMOUS_PEOPLE_SEED) {
      const attrs = lookupAttributes(person.name)
      for (const question of QUESTION_BANK_SEED) {
        if (answerFor(question.id, person.name, attrs) === null) {
          nulls.push(`${person.name} × ${question.id}`)
          if (nulls.length >= 10) break
        }
      }
      if (nulls.length >= 10) break
    }
    expect(nulls).toEqual([])
  })

  it('bölge, spor dalı, doğum dönemi ve kurgusal evren sorularını doğru yanıtlar', () => {
    expect(answerFor('qb-20', 'Novak Djokovic')).toBe(true) // 1987 >= 1950
    expect(answerFor('qb-20', 'Mustafa Kemal Atatürk')).toBe(false)
    expect(answerFor('qb-36', 'Leonardo da Vinci')).toBe(true) // < 1800
    expect(answerFor('qb-37', 'Arda Güler')).toBe(true) // >= 1990
    expect(answerFor('qb-39', 'Novak Djokovic')).toBe(true) // Avrupa
    expect(answerFor('qb-40', 'Brad Pitt')).toBe(true) // Kuzey Amerika
    expect(answerFor('qb-41', 'Lionel Messi')).toBe(true) // Latin Amerika
    expect(answerFor('qb-44', 'Lionel Messi')).toBe(true) // Futbol
    expect(answerFor('qb-45', 'LeBron James')).toBe(true) // Basketbol
    expect(answerFor('qb-46', 'Eda Erdem')).toBe(true) // Voleybol
    expect(answerFor('qb-47', 'Muhammed Ali')).toBe(true) // Dövüş / güreş
    expect(answerFor('qb-48', 'Novak Djokovic')).toBe(true) // Bireysel spor
    expect(answerFor('qb-49', 'Acun Ilıcalı')).toBe(true) // Medya
    expect(answerFor('qb-51', 'Polat Alemdar')).toBe(true) // Yerli dizi/film
    expect(answerFor('qb-52', 'Harry Potter')).toBe(true) // Yabancı canlı aksiyon
    expect(answerFor('qb-55', 'Naruto Uzumaki')).toBe(true) // Anime
    expect(answerFor('qb-56', 'Super Mario')).toBe(true) // Video oyunu
    expect(answerFor('qb-57', 'Don Kişot (Don Quijote)')).toBe(true) // Edebiyat/mitoloji
    expect(answerFor('qb-58', 'Pikachu (Pokemon)')).toBe(true) // Cinsiyetsiz kurgusal varlık
    expect(answerFor('qb-04', 'Pikachu (Pokemon)')).toBe(false)
    expect(answerFor('qb-05', 'Pikachu (Pokemon)')).toBe(false)
    expect(EASY_POOL.length).toBeGreaterThan(0)
    expect(EASY_POOL.every((p) => p.fameTier === 1)).toBe(true)
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

  it('bankada olmayan özel soru kimliğinde çekimser kalır', () => {
    expect(answerFor('qb-custom-unknown', 'Novak Djokovic')).toBeNull()
  })

  it('ipucu kartındaki soru metnini bankadaki soruya çevirir, özel soruda null döner', () => {
    expect(questionIdForText('Bir erkek miyim?')).toBe('qb-05')
    expect(questionIdForText('Bıyığım var mı?')).toBeNull()
  })
})

describe('brain', () => {
  it('seçmen bot doğru oyu verir (zor), bilmediği soruda oy vermez', () => {
    expect(voteAnswer('qb-05', 'Novak Djokovic', 'zor')).toBe(true)
    expect(voteAnswer('qb-custom-unknown', 'Novak Djokovic', 'zor')).toBeNull()
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

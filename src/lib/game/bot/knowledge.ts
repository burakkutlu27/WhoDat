import { FAMOUS_PEOPLE_ATTRIBUTES, type PersonAttributes, type PersonDomain } from '../famousPeopleAttributes'
import { normalizeGuess } from '../matching'
import { QUESTION_BANK_SEED } from '../questionBankData'

/**
 * Bot bilgi tabanı: soru bankasındaki her soruyu bir kişinin özelliklerine göre cevaplar.
 *
 * `null` = bilinmiyor / tartışmalı: bot yanlış cevap vermek yerine çekimser kalır. Bu hem
 * veride karşılığı olmayan sorular ("iyi karakter miyim?") hem de insanların bile farklı
 * cevaplayacağı durumlar (kurgusal karaktere "şu an hayatta mıyım?") için kullanılır.
 */

export type BotAnswer = boolean | null

const ARTS: PersonDomain[] = ['acting', 'film', 'music', 'art']
const SCREEN: PersonDomain[] = ['acting', 'film']
const SCIENCE_LETTERS_POLITICS: PersonDomain[] = ['science', 'literature', 'politics']
const TURKISH_VOWELS = new Set(['A', 'E', 'I', 'İ', 'O', 'Ö', 'U', 'Ü'])

const attributesByNormalizedName = new Map<string, PersonAttributes>(
  Object.entries(FAMOUS_PEOPLE_ATTRIBUTES).map(([name, attributes]) => [normalizeGuess(name), attributes]),
)

/** Veri setindeki kişinin özellikleri; elle girilmiş ve setta olmayan isimde null. */
export function lookupAttributes(name: string): PersonAttributes | null {
  return attributesByNormalizedName.get(normalizeGuess(name)) ?? null
}

/** "Ronaldo (Nazário)" → "Ronaldo": isim soruları insanların söyleyeceği ilk ada bakar. */
function firstName(name: string): string {
  return name.replace(/\([^)]*\)/g, ' ').trim().split(/\s+/)[0] ?? ''
}

/** Gerçek kişide alanlardan biri var mı; alan bilgisi hiç yoksa bilinmiyor. */
function realInDomains(attributes: PersonAttributes, domains: PersonDomain[]): BotAnswer {
  if (!attributes.r) return null
  if (attributes.o.length === 0) return null
  return attributes.o.some((domain) => domains.includes(domain))
}

function negate(answer: BotAnswer): BotAnswer {
  return answer === null ? null : !answer
}

type Evaluator = (attributes: PersonAttributes | null, name: string) => BotAnswer

/** Özellik gerektiren sorular: kişi veri setinde yoksa cevap bilinmiyor. */
const needs = (evaluate: (attributes: PersonAttributes) => BotAnswer): Evaluator =>
  (attributes) => (attributes ? evaluate(attributes) : null)

const EVALUATORS: Record<string, Evaluator> = {
  // Gerçek hayatta yaşamış veya yaşayan bir insan mıyım?
  'qb-01': needs((a) => a.r),
  // Kurgusal veya hayal ürünü bir karakter miyim?
  'qb-02': needs((a) => !a.r),
  // Şu anda hayatta mıyım?
  'qb-03': needs((a) => (a.r ? a.a : null)),
  // Bir kadın mıyım?
  'qb-04': needs((a) => (a.g === null ? null : a.g === 'f')),
  // Bir erkek miyim?
  'qb-05': needs((a) => (a.g === null ? null : a.g === 'm')),
  // Türkiye kökenli / Türk vatandaşı mıyım?
  'qb-06': needs((a) => a.t),
  // Yabancı (Türkiye dışından) biri miyim?
  'qb-07': needs((a) => negate(a.t)),
  // Sanat, sinema veya müzik dünyasından mıyım?
  'qb-08': needs((a) => realInDomains(a, ARTS)),
  // Oyunculuk veya sinema/dizi sektöründe mi tanınıyorum?
  'qb-09': needs((a) => realInDomains(a, SCREEN)),
  // Müzisyen, şarkıcı veya besteci miyim?
  'qb-10': needs((a) => realInDomains(a, ['music'])),
  // Bir sporcu veya spor dünyasından biri miyim?
  'qb-11': needs((a) => realInDomains(a, ['sport'])),
  // Tarihi bir kişilik miyim (20. yüzyıldan önce mi yaşadım)?
  'qb-12': needs((a) => {
    if (!a.r) return false
    if (a.y !== null) return a.y < 1900
    if (a.d !== null) return a.d < 1900
    return null
  }),
  // Bilim, edebiyat veya siyaset alanında mı tanınıyorum?
  'qb-13': needs((a) => realInDomains(a, SCIENCE_LETTERS_POLITICS)),
  // Bir çizgi film, animasyon veya çizgi roman karakteri miyim?
  'qb-14': needs((a) => (a.r ? false : a.n)),
  // Süper güçleri veya fantastik yetenekleri olan bir karakter miyim?
  'qb-15': needs((a) => (a.r ? false : a.s)),
  // Genel olarak olumlu / "iyi" tarafta bir karakter miyim? — veride karşılığı yok
  'qb-16': () => null,
  // Kötü / kötü adam (antagonist) bir karakter miyim? — veride karşılığı yok
  'qb-17': () => null,
  // İsmim (veya ilk adım) 5 harften uzun mu?
  'qb-18': (_, name) => {
    const first = firstName(name).replace(/[^\p{L}]/gu, '')
    return first ? first.length > 5 : null
  },
  // Adım bir sesli harfle mi başlıyor?
  'qb-19': (_, name) => {
    const letter = firstName(name).charAt(0).toLocaleUpperCase('tr')
    return letter ? TURKISH_VOWELS.has(letter) : null
  },
  // Bugün hâlâ aktif/güncel olarak tanınan biri miyim?
  'qb-20': needs((a) => (a.r ? a.a : null)),
}

/** Botun cevaplayabildiği soru kimlikleri (soru seçerken yalnızca bunlar kullanılır). */
export const ANSWERABLE_QUESTION_IDS = Object.keys(EVALUATORS).filter((id) => id !== 'qb-16' && id !== 'qb-17')

const questionIdByText = new Map(QUESTION_BANK_SEED.map((question) => [question.textTr, question.id]))

/** İpucu kartı soru metnini saklıyor; metinden bankadaki soruya dön. Özel sorular null. */
export function questionIdForText(questionText: string): string | null {
  return questionIdByText.get(questionText) ?? null
}

/**
 * Verilen isim için soru bankası sorusunun doğru cevabı.
 * `attributes` verilirse arama yapılmaz (aday listesinde binlerce kez çağrıldığı için).
 */
export function answerFor(questionId: string, name: string, attributes?: PersonAttributes | null): BotAnswer {
  const evaluate = EVALUATORS[questionId]
  if (!evaluate) return null
  return evaluate(attributes === undefined ? lookupAttributes(name) : attributes, name)
}

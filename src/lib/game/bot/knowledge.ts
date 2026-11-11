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
const ASCII_VOWELS = new Set(['A', 'E', 'I', 'O', 'U'])
const FIRST_HALF_LETTERS = new Set(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'])

const attributesByNormalizedName = new Map<string, PersonAttributes>(
  Object.entries(FAMOUS_PEOPLE_ATTRIBUTES).map(([name, attributes]) => [normalizeGuess(name), attributes]),
)

/** Veri setindeki kişinin özellikleri; elle girilmiş ve setta olmayan isimde null. */
export function lookupAttributes(name: string): PersonAttributes | null {
  return attributesByNormalizedName.get(normalizeGuess(name)) ?? null
}

interface NameFeatures {
  wordCount: number
  firstLettersLength: number
  startsVowelTr: boolean
  startsFirstHalf: boolean
  totalLettersLength: number
  endsVowel: boolean
  hasA: boolean
  hasE: boolean
  hasR: boolean
}

const MAX_NAME_CACHE_SIZE = 5000
const nameFeaturesCache = new Map<string, NameFeatures | null>()

function foldAscii(text: string): string {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

function computeNameFeatures(name: string): NameFeatures | null {
  const cleaned = name.replace(/\([^)]*\)/g, ' ').trim()
  if (!cleaned) return null
  const words = cleaned.split(/\s+/)
  const firstWord = words[0] ?? ''
  const firstWordLetters = firstWord.replace(/[^\p{L}]/gu, '')
  const allLetters = words.join('').replace(/[^\p{L}]/gu, '')
  if (!allLetters) return null

  const firstRawChar = firstWord.charAt(0).toLocaleUpperCase('tr')
  const firstFoldedChar = firstWordLetters ? foldAscii(firstWordLetters.charAt(0)).toUpperCase() : ''
  const lastFoldedChar = foldAscii(allLetters.charAt(allLetters.length - 1)).toUpperCase()
  const foldedLower = foldAscii(allLetters).toLowerCase()

  return {
    wordCount: words.length,
    firstLettersLength: firstWordLetters.length,
    startsVowelTr: TURKISH_VOWELS.has(firstRawChar),
    startsFirstHalf: FIRST_HALF_LETTERS.has(firstFoldedChar),
    totalLettersLength: allLetters.length,
    endsVowel: ASCII_VOWELS.has(lastFoldedChar),
    hasA: foldedLower.includes('a'),
    hasE: foldedLower.includes('e'),
    hasR: foldedLower.includes('r'),
  }
}

/** İsim bazlı soruları bot adayı döngülerinde O(1) çözmek için önbellekli öznitelik çıkarımı. */
function getNameFeatures(name: string): NameFeatures | null {
  const cached = nameFeaturesCache.get(name)
  if (cached !== undefined) return cached
  const features = computeNameFeatures(name)
  if (nameFeaturesCache.size < MAX_NAME_CACHE_SIZE) {
    nameFeaturesCache.set(name, features)
  }
  return features
}

/** Gerçek kişide alanlardan biri var mı; kurgusal karakterlerde false. */
function realInDomains(attributes: PersonAttributes, domains: PersonDomain[]): boolean {
  if (!attributes.r) return false
  return domains.some((domain) => attributes.o.includes(domain))
}

type Evaluator = (attributes: PersonAttributes | null, name: string) => BotAnswer

/** Özellik gerektiren sorular: kişi veri setinde yoksa cevap bilinmiyor. */
const needs = (evaluate: (attributes: PersonAttributes) => BotAnswer): Evaluator =>
  (attributes) => (attributes ? evaluate(attributes) : null)

function realBornMatches(attributes: PersonAttributes, predicate: (year: number) => boolean): boolean {
  return attributes.r && attributes.y !== null && predicate(attributes.y)
}

function fictionalMatches(attributes: PersonAttributes, predicate: (attributes: PersonAttributes) => boolean): boolean {
  return !attributes.r && predicate(attributes)
}

const EVALUATORS: Record<string, Evaluator> = {
  // Gerçek hayatta yaşamış veya yaşayan bir insan mıyım?
  'qb-01': needs((a) => a.r),
  // Kurgusal veya hayal ürünü bir karakter miyim?
  'qb-02': needs((a) => !a.r),
  // Gerçek hayatta şu an yaşıyor muyum? (Kurgusal karakterler gerçek dünyada yaşamaz -> false)
  'qb-03': needs((a) => (a.r ? a.a : false)),
  // Bir kadın mıyım?
  'qb-04': needs((a) => a.g === 'f'),
  // Bir erkek miyim?
  'qb-05': needs((a) => a.g === 'm'),
  // Türkiye kökenli / Türk vatandaşı mıyım?
  'qb-06': needs((a) => a.t),
  // Yabancı (Türkiye dışından) biri miyim?
  'qb-07': needs((a) => !a.t),
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
    return false
  }),
  // Bilim, edebiyat veya siyaset alanında mı tanınıyorum?
  'qb-13': needs((a) => realInDomains(a, SCIENCE_LETTERS_POLITICS)),
  // Bir çizgi film, animasyon veya çizgi roman karakteri miyim?
  'qb-14': needs((a) => fictionalMatches(a, (x) => x.n)),
  // Süper güçleri veya fantastik yetenekleri olan bir karakter miyim?
  'qb-15': needs((a) => fictionalMatches(a, (x) => x.s)),
  // İsmim (veya ilk adım) 5 harften uzun mu?
  'qb-18': (_, name) => {
    const f = getNameFeatures(name)
    return f ? f.firstLettersLength > 5 : null
  },
  // Adım bir sesli harfle mi başlıyor?
  'qb-19': (_, name) => getNameFeatures(name)?.startsVowelTr ?? null,
  // 1950 veya daha sonraki bir yılda doğmuş gerçek bir insan mıyım?
  'qb-20': needs((a) => realBornMatches(a, (y) => y >= 1950)),
  // Bilim insanı, matematikçi veya mucit miyim?
  'qb-21': needs((a) => realInDomains(a, ['science'])),
  // Yazar, şair veya düşünür/filozof muyum?
  'qb-22': needs((a) => realInDomains(a, ['literature'])),
  // Siyasetçi, devlet lideri veya hükümdar/komutan mıyım?
  'qb-23': needs((a) => realInDomains(a, ['politics'])),
  // Ressam, heykeltıraş, mimar veya görsel sanatlar alanından mıyım?
  'qb-24': needs((a) => realInDomains(a, ['art'])),
  // Artık hayatta olmayan (vefat etmiş) gerçek bir insan mıyım?
  'qb-25': needs((a) => a.r && !a.a),
  // 1980 veya daha sonraki bir yılda doğmuş gerçek bir insan mıyım?
  'qb-26': needs((a) => realBornMatches(a, (y) => y >= 1980)),
  // 1900–1979 yılları arasında doğmuş gerçek bir insan mıyım?
  'qb-27': needs((a) => realBornMatches(a, (y) => y >= 1900 && y < 1980)),
  // İsmim (parantez içi açıklamalar hariç) birden fazla kelimeden mi oluşuyor?
  'qb-28': (_, name) => {
    const f = getNameFeatures(name)
    return f ? f.wordCount > 1 : null
  },
  // İlk adım 4 harf veya daha kısa mı?
  'qb-29': (_, name) => {
    const f = getNameFeatures(name)
    return f ? f.firstLettersLength <= 4 : null
  },
  // Tam adım (parantez ve boşluklar hariç) 11 harften uzun mu?
  'qb-30': (_, name) => {
    const f = getNameFeatures(name)
    return f ? f.totalLettersLength > 11 : null
  },
  // İlk adım alfabenin ilk yarısındaki bir harfle (A–K, Ç, Ğ, I, İ dahil) mi başlıyor?
  'qb-31': (_, name) => getNameFeatures(name)?.startsFirstHalf ?? null,
  // Adım veya soyadımın (parantez dışı) içinde "A" harfi geçiyor mu?
  'qb-32': (_, name) => getNameFeatures(name)?.hasA ?? null,
  // Adım veya soyadımın (parantez dışı) içinde "E" harfi geçiyor mu?
  'qb-33': (_, name) => getNameFeatures(name)?.hasE ?? null,
  // Adım veya soyadımın (parantez dışı) içinde "R" harfi geçiyor mu?
  'qb-34': (_, name) => getNameFeatures(name)?.hasR ?? null,
  // Tam adımın (parantez dışı) son harfi bir sesli harf mi?
  'qb-35': (_, name) => getNameFeatures(name)?.endsVowel ?? null,
  // 1800 yılından önce doğmuş tarihi bir kişilik miyim?
  'qb-36': needs((a) => realBornMatches(a, (y) => y < 1800)),
  // 1990 veya daha sonraki bir yılda doğmuş gerçek bir insan mıyım?
  'qb-37': needs((a) => realBornMatches(a, (y) => y >= 1990)),
  // 1800–1899 yılları arasında doğmuş gerçek bir insan mıyım?
  'qb-38': needs((a) => realBornMatches(a, (y) => y >= 1800 && y < 1900)),
  // Avrupa kökenli veya Avrupalı bir gerçek kişi miyim?
  'qb-39': needs((a) => a.r && a.rg === 'eu'),
  // Kuzey Amerika (ABD veya Kanada) kökenli bir gerçek kişi miyim?
  'qb-40': needs((a) => a.r && a.rg === 'na'),
  // Latin Amerika kökenli gerçek bir kişi miyim?
  'qb-41': needs((a) => a.r && a.rg === 'la'),
  // Asya (Türkiye hariç) kökenli gerçek bir kişi miyim?
  'qb-42': needs((a) => a.r && a.rg === 'as'),
  // Afrika, Orta Doğu (Türkiye hariç) veya Okyanusya kökenli gerçek bir kişi miyim?
  'qb-43': needs((a) => a.r && (a.rg === 'af' || a.rg === 'me' || a.rg === 'oc')),
  // Futbol dünyasından (futbolcu veya teknik direktör) biri miyim?
  'qb-44': needs((a) => a.r && a.sp === 'fb'),
  // Basketbol dünyasından (oyuncu veya koç) biri miyim?
  'qb-45': needs((a) => a.r && a.sp === 'bk'),
  // Voleybol dünyasından (oyuncu veya antrenör) biri miyim?
  'qb-46': needs((a) => a.r && a.sp === 'vb'),
  // Dövüş sporları veya güreş branşından mıyım?
  'qb-47': needs((a) => a.r && a.sp === 'cm'),
  // Tenis, motor sporları, atletizm, yüzme veya diğer bireysel spor dallarından mıyım?
  'qb-48': needs((a) => a.r && a.sp === 'ind'),
  // İnternet yayıncısı, YouTuber, sunucu, gazeteci veya medya kişiliği miyim?
  'qb-49': needs((a) => realInDomains(a, ['media'])),
  // İş insanı, girişimci, yönetici veya şef/tasarımcı gibi iş dünyasından mıyım?
  'qb-50': needs((a) => realInDomains(a, ['business'])),
  // Yerli (Türk) bir dizi veya filmden kurgusal bir karakter miyim?
  'qb-51': needs((a) => fictionalMatches(a, (x) => x.ft === 'tr_tv' || x.ft === 'tr_film')),
  // Yabancı bir canlı aksiyon dizi veya filminden kurgusal bir karakter miyim?
  'qb-52': needs((a) => fictionalMatches(a, (x) => x.ft === 'global_tv' || x.ft === 'global_film')),
  // Bir televizyon/platform dizisinden (yerli veya yabancı) karakter miyim?
  'qb-53': needs((a) => fictionalMatches(a, (x) => x.ft === 'tr_tv' || x.ft === 'global_tv')),
  // Bir sinema filminden (yerli veya yabancı canlı aksiyon) karakter miyim?
  'qb-54': needs((a) => fictionalMatches(a, (x) => x.ft === 'tr_film' || x.ft === 'global_film')),
  // Bir anime / Japon manga evreninden karakter miyim?
  'qb-55': needs((a) => fictionalMatches(a, (x) => x.ft === 'anime')),
  // Bir video oyunundan (bilgisayar/konsol oyunu) karakter miyim?
  'qb-56': needs((a) => fictionalMatches(a, (x) => x.ft === 'game')),
  // Klasik edebiyat, roman, masal veya mitolojiden bir karakter miyim?
  'qb-57': needs((a) => fictionalMatches(a, (x) => x.ft === 'book_myth')),
  // Erkek veya kadın olmayan (cinsiyetsiz yaratık, robot, canavar veya hayvan) kurgusal bir varlık mıyım?
  'qb-58': needs((a) => fictionalMatches(a, (x) => x.g === 'none')),
}

/** Botun cevaplayabildiği soru kimlikleri (bankadaki tüm sorular sıfır-null desteklidir). */
export const ANSWERABLE_QUESTION_IDS = Object.keys(EVALUATORS)

const questionIdByText = new Map(QUESTION_BANK_SEED.map((question) => [question.textTr, question.id]))
const questionIdByNormalizedText = new Map(
  QUESTION_BANK_SEED.map((question) => [normalizeGuess(question.textTr), question.id]),
)

/** İpucu kartı soru metnini saklıyor; metinden bankadaki soruya dön. Özel sorular null. */
export function questionIdForText(questionText: string): string | null {
  return questionIdByText.get(questionText) ?? questionIdByNormalizedText.get(normalizeGuess(questionText)) ?? null
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

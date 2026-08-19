/**
 * Tahmin eşleştirme. Saf fonksiyonlar — veritabanı ya da ortam bağımlılığı yok.
 *
 * Eşleştirme sunucuda çalışır. Romen rakamları (I, II, III, IV vb.), sıra sayıları
 * (1., 2., 3., birinci, ikinci vb.) ve Türkçe tarihsel isim varyantları (Mahmud/Mahmut,
 * Mehmed/Mehmet vb.) otomatik olarak normalleştirilir.
 */

const TURKISH_LOWERCASE: Record<string, string> = {
  ç: 'c',
  ğ: 'g',
  ı: 'i',
  ö: 'o',
  ş: 's',
  ü: 'u',
}

/** 0.8 => iki karakterlik yazım hatalarına toleranslı, farklı isimleri ayırt edecek kadar sıkı. */
export const SIMILARITY_THRESHOLD = 0.8

/**
 * Metin içindeki Romen rakamlarını ve Türkçe sıra sayılarını standart rakamlara dönüştürür.
 * Örn: "II. Mahmud" -> "2 Mahmud", "İkinci Mahmut" -> "2 Mahmut", "2. Mahmut" -> "2 Mahmut"
 */
export function normalizeNumbersAndOrdinals(text: string): string {
  if (!text) return ''

  return (
    text
      // Türkçe karakterleri temel harflere indirge (önce harf bazında eşleştirebilmek için)
      .replace(/İ/g, 'i')
      .replace(/I/g, 'ı')
      .replace(/[çğıöşüÇĞİÖŞÜ]/g, (char) => TURKISH_LOWERCASE[char.toLowerCase()] ?? char.toLowerCase())
      // Sıra bildiren kelimeler (Türkçe)
      .replace(/\b(on\s*alt[ıi]nc[ıi]|on\s*alt[ıi])\b/gi, '16')
      .replace(/\b(on\s*be[sş]inci|on\s*be[sş])\b/gi, '15')
      .replace(/\b(on\s*d[oö]rd[uü]nc[uü]|on\s*d[oö]rt)\b/gi, '14')
      .replace(/\b(on\s*[uü][cç][uü]nc[uü]|on\s*[uü][cç])\b/gi, '13')
      .replace(/\b(on\s*ikinci|on\s*iki)\b/gi, '12')
      .replace(/\b(on\s*birinci|on\s*bir)\b/gi, '11')
      .replace(/\b(onuncu)\b/gi, '10')
      .replace(/\b(dokuzuncu)\b/gi, '9')
      .replace(/\b(sekizinci)\b/gi, '8')
      .replace(/\b(yedinci)\b/gi, '7')
      .replace(/\b(alt[ıi]nc[ıi])\b/gi, '6')
      .replace(/\b(be[sş]inci)\b/gi, '5')
      .replace(/\b(d[oö]rd[uü]nc[uü])\b/gi, '4')
      .replace(/\b([uü][cç][uü]nc[uü])\b/gi, '3')
      .replace(/\b(ikinci)\b/gi, '2')
      .replace(/\b(birinci)\b/gi, '1')
      // Romen rakamları (kelime sınırları ile)
      .replace(/\b(xvi)\b\.?/gi, '16')
      .replace(/\b(xv)\b\.?/gi, '15')
      .replace(/\b(xiv)\b\.?/gi, '14')
      .replace(/\b(xiii)\b\.?/gi, '13')
      .replace(/\b(xii)\b\.?/gi, '12')
      .replace(/\b(xi)\b\.?/gi, '11')
      .replace(/\b(ix)\b\.?/gi, '9')
      .replace(/\b(viii)\b\.?/gi, '8')
      .replace(/\b(vii)\b\.?/gi, '7')
      .replace(/\b(vi)\b\.?/gi, '6')
      .replace(/\b(iv)\b\.?/gi, '4')
      .replace(/\b(iii)\b\.?/gi, '3')
      .replace(/\b(ii)\b\.?/gi, '2')
      .replace(/\b(x)\b\.?/gi, '10')
      .replace(/\b(v)\b\.?/gi, '5')
      .replace(/\b(i)\b\./gi, '1')
      .replace(/\b(i)\b(?=\s+[a-z0-9])/gi, '1')
      .replace(/(?<=[a-z0-9]\s+)\b(i)\b/gi, '1')
      // Ekli veya noktalı rakamlar: 2'nci, 2.ci, 2., 2'inci -> 2
      .replace(/(\d+)['.](inci|nci|uncu|ncu|üncü|ncü|ünci|inci|ci|cu|cü)\b/gi, '$1')
      .replace(/(\d+)\./g, '$1')
  )
}

export function normalizeGuess(value: string): string {
  if (!value) return ''

  return (
    normalizeNumbersAndOrdinals(value)
      // Türkçe'de İ/I'nın küçük harf karşılıkları
      .replace(/İ/g, 'i')
      .replace(/I/g, 'ı')
      .toLowerCase()
      .replace(/[çğıöşü]/g, (char) => TURKISH_LOWERCASE[char] ?? char)
      // Tarihsel isim sonu d/t yumuşama/sertleşme normalizasyonu (Mahmud -> Mahmut, Mehmed -> Mehmet, Murad -> Murat, Ahmed -> Ahmet vb.)
      .replace(/(\b\w+)d\b/g, '$1t')
      .replace(/\bvahdeddin\b/g, 'vahdettin')
      .replace(/\bnecmeddin\b/g, 'necmettin')
      // Yabancı isimlerdeki aksanları düşür: "Beyoncé" -> "beyonce", "Björk" -> "bjork".
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '')
  )
}

function extractDigits(str: string): string {
  return str.replace(/\D/g, '')
}

/**
 * Bir isimden (hedef veya tahmin) eşleştirme için olası varyantları çıkarır.
 * Özellikle:
 *  - Parantezli kurgusal ve tarihsel karakterler (örn: "Walter White (Heisenberg)", "Fatih Sultan Mehmet (II. Mehmed)")
 *  - Romen rakamlı / sıra sayılı isimler (örn: "II. Mahmud" -> "2. Mahmud", "2. Mahmut", "İkinci Mahmut", "Mahmud", "Mahmut")
 *  - Parantez içindeki takma adlar/açıklamalar
 *  - Tam orijinal ifade
 * varyantlarını döndürür.
 */
export function extractMatchCandidates(text: string): string[] {
  if (!text || typeof text !== 'string') return []

  const trimmed = text.trim()
  if (!trimmed) return []

  const rawCandidates = new Set<string>()
  rawCandidates.add(trimmed)

  // 1. Parantez, köşeli parantez veya tırnak içindeki kısımları çıkar
  const bracketMatches = [
    ...trimmed.matchAll(/\(([^)]+)\)/g),
    ...trimmed.matchAll(/\[([^\]]+)\]/g),
    ...trimmed.matchAll(/["“]([^"”]+)["”]/g),
  ]

  for (const match of bracketMatches) {
    const inside = match[1]?.trim()
    if (inside) {
      rawCandidates.add(inside)

      // Parantez içi çoklu aliasları ayır: "/", "|", ",", " - ", " ve ", " or ", " and "
      const subParts = inside.split(/[/|,]| - |—|\bve\b|\bor\b|\band\b/gi)
      for (const part of subParts) {
        const p = part.trim()
        if (p) rawCandidates.add(p)
      }
    }
  }

  // 2. Parantezsiz/tırnaksız ana gövdeyi temizle
  const cleanMain = trimmed
    .replace(/\([^)]*\)/g, ' ')
    .replace(/\[[^\]]*\]/g, ' ')
    .replace(/["“][^"”]*["”]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()

  if (cleanMain) {
    rawCandidates.add(cleanMain)
  }

  // 3. Üst düzey "/" veya "|" ile ayrılmış isimleri ekle (örn: "Superman / Clark Kent")
  const currentList = Array.from(rawCandidates)
  for (const cand of currentList) {
    if (cand.includes('/') || cand.includes('|')) {
      const parts = cand.split(/[/|]/)
      for (const p of parts) {
        const pt = p.trim()
        if (pt) rawCandidates.add(pt)
      }
    }
  }

  // 4. Yabancı dildeki belirteçleri ("The ", "El ", "La ", "Le ") düşürülmüş varyantları ekle
  const expandedList = Array.from(rawCandidates)
  for (const cand of expandedList) {
    if (/^(the|el|la|le|der|die|das)\s+/i.test(cand)) {
      const withoutArticle = cand.replace(/^(the|el|la|le|der|die|das)\s+/i, '').trim()
      if (withoutArticle) rawCandidates.add(withoutArticle)
    }
  }

  // 5. Tarihsel unvan ve sıfatları tek başına ekle (örn: "Fatih Sultan Mehmet" -> "Fatih", "Kanuni Sultan Süleyman" -> "Kanuni")
  const historicalTitles = ['fatih', 'kanuni', 'yavuz', 'muhtesem', 'yildirim', 'genc', 'avci', 'celebi']
  for (const cand of Array.from(rawCandidates)) {
    const firstWord = cand.split(/\s+/)[0]?.trim()
    if (firstWord && historicalTitles.includes(firstWord.toLowerCase())) {
      rawCandidates.add(firstWord)
    }
  }

  // 6. Romen rakamı / Sayı içeren isimlerde dönüştürülmüş varyantları üret
  const numberExpandedList = Array.from(rawCandidates)
  for (const cand of numberExpandedList) {
    // Rakamla dönüştürülmüş varyant (örn: "2. Mahmud", "2 Mahmut")
    const withDigits = normalizeNumbersAndOrdinals(cand)
    if (withDigits && withDigits !== cand) {
      rawCandidates.add(withDigits)
    }

    // Rakam sonda ise başa al (örn: "Henry 8" -> "8. Henry", "Henry VIII" -> "8. Henry")
    const suffixNumMatch = cand.match(/^(.+?)\s+([0-9]+|(?:xvi|xv|xiv|xiii|xii|xi|x|ix|viii|vii|vi|v|iv|iii|ii|i))$/i)
    if (suffixNumMatch) {
      const namePart = suffixNumMatch[1]?.trim()
      const numPart = suffixNumMatch[2]?.trim()
      if (namePart && numPart) {
        rawCandidates.add(`${numPart}. ${namePart}`)
        rawCandidates.add(`${numPart} ${namePart}`)
      }
    }

    // Rakam başta ise sona al (örn: "8. Henry" -> "Henry 8")
    const prefixNumMatch = cand.match(/^([0-9]+|(?:xvi|xv|xiv|xiii|xii|xi|x|ix|viii|vii|vi|v|iv|iii|ii|i))[\s.]+(.+)$/i)
    if (prefixNumMatch) {
      const numPart = prefixNumMatch[1]?.trim()
      const namePart = prefixNumMatch[2]?.trim()
      if (namePart && numPart) {
        rawCandidates.add(`${namePart} ${numPart}`)
      }
    }

    // D/T son harf alternatifleri (Mahmud -> Mahmut, Mehmed -> Mehmet vb.)
    if (/\bd\b|\w+d\b/i.test(cand)) {
      const withT = cand.replace(/(\b\w+)d\b/gi, '$1t')
      rawCandidates.add(withT)
    }
    if (/\bt\b|\w+t\b/i.test(cand)) {
      const withD = cand.replace(/(\b\w+)t\b/gi, '$1d')
      rawCandidates.add(withD)
    }
  }

  // 7. Normalizasyon ve filtreleme: normalize edilmiş hali boş olmayan ve min 2 karakter olanları al
  const seenNorm = new Set<string>()
  const result: string[] = []

  for (const cand of rawCandidates) {
    const norm = normalizeGuess(cand)
    if (norm.length >= 2 && !seenNorm.has(norm)) {
      seenNorm.add(norm)
      result.push(cand)
    }
  }

  // Eğer 2 karakterden kısa ama orijinali normalize olabiliyorsa en azından orijinali koru
  if (result.length === 0) {
    const fallbackNorm = normalizeGuess(trimmed)
    if (fallbackNorm) {
      result.push(trimmed)
    }
  }

  return result
}

export function levenshteinDistance(a: string, b: string): number {
  if (a === b) return 0
  if (a.length === 0) return b.length
  if (b.length === 0) return a.length

  let previous = Array.from({ length: a.length + 1 }, (_, index) => index)

  for (let j = 1; j <= b.length; j++) {
    const current = [j]
    for (let i = 1; i <= a.length; i++) {
      const substitution = previous[i - 1]! + (a[i - 1] === b[j - 1] ? 0 : 1)
      current[i] = Math.min(current[i - 1]! + 1, previous[i]! + 1, substitution)
    }
    previous = current
  }

  return previous[a.length]!
}

export function similarity(a: string, b: string): number {
  const longest = Math.max(a.length, b.length)
  if (longest === 0) return 1
  return 1 - levenshteinDistance(a, b) / longest
}

export function fuzzyMatch(
  guess: string,
  correct: string,
  threshold = SIMILARITY_THRESHOLD,
): boolean {
  if (!guess || !correct) return false

  const guessCandidates = extractMatchCandidates(guess)
  const correctCandidates = extractMatchCandidates(correct)

  if (guessCandidates.length === 0 || correctCandidates.length === 0) return false

  // Tahmin varyantlarından herhangi biri, hedefin herhangi bir varyantıyla eşleşiyor mu?
  for (const g of guessCandidates) {
    const normG = normalizeGuess(g)
    if (!normG) continue
    const digitsG = extractDigits(normG)

    for (const c of correctCandidates) {
      const normC = normalizeGuess(c)
      if (!normC) continue
      const digitsC = extractDigits(normC)

      // Eğer her iki tarafta da sayı/sıra sayısı belirtilmişse ve sayılar uyuşmuyorsa (örn: 1 vs 2), asla eşleşme!
      if (digitsG.length > 0 && digitsC.length > 0 && digitsG !== digitsC) {
        continue
      }

      if (normG === normC) return true
      if (similarity(normG, normC) >= threshold) return true
    }
  }

  return false
}

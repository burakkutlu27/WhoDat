/**
 * Tahmin eşleştirme. Saf fonksiyonlar — veritabanı ya da ortam bağımlılığı yok.
 *
 * Eşleştirme sunucuda çalışır. Daha önce tarayıcıdaydı, yani doğru cevap istemciye
 * gönderiliyordu ve karşılaştırma istemcinin insafına kalmıştı.
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

export function normalizeGuess(value: string): string {
  return (
    value
      // Türkçe'de İ/I'nın küçük harf karşılıkları JS'in varsayılanından farklıdır:
      // 'I'.toLowerCase() 'i' verir ama Türkçe'de 'ı' olmalıdır.
      .replace(/İ/g, 'i')
      .replace(/I/g, 'ı')
      .toLowerCase()
      .replace(/[çğıöşü]/g, (char) => TURKISH_LOWERCASE[char] ?? char)
      // Yabancı isimlerdeki aksanları düşür: "Beyoncé" -> "beyonce", "Björk" -> "bjork".
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]/g, '')
  )
}

/**
 * Bir isimden (hedef veya tahmin) eşleştirme için olası varyantları çıkarır.
 * Özellikle parantezli kurgusal karakterler (örn: "Walter White (Heisenberg)",
 * "Vito Corleone (Baba / The Godfather)", "Batman (Bruce Wayne)") için:
 *  - Parantezsiz ana isim ("Walter White", "Vito Corleone")
 *  - Parantez içindeki takma adlar/açıklamalar ("Heisenberg", "Baba", "The Godfather")
 *  - Varsa ayrılmış alt isimler ("Godfather")
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

  // 5. Normalizasyon ve filtreleme: normalize edilmiş hali boş olmayan ve min 2 karakter olanları al
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

    for (const c of correctCandidates) {
      const normC = normalizeGuess(c)
      if (!normC) continue

      if (normG === normC) return true
      if (similarity(normG, normC) >= threshold) return true
    }
  }

  return false
}


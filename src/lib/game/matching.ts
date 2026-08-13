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
const SIMILARITY_THRESHOLD = 0.8

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

export function fuzzyMatch(guess: string, correct: string): boolean {
  const normalizedGuess = normalizeGuess(guess)
  const normalizedCorrect = normalizeGuess(correct)

  // Boş tahmin, boş cevaba eşleşmiş sayılmamalı.
  if (!normalizedGuess || !normalizedCorrect) return false
  if (normalizedGuess === normalizedCorrect) return true

  return similarity(normalizedGuess, normalizedCorrect) >= SIMILARITY_THRESHOLD
}

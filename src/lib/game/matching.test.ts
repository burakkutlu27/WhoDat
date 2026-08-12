import { describe, expect, it } from 'vitest'

import { fuzzyMatch, levenshteinDistance, normalizeGuess, similarity } from './matching'

describe('normalizeGuess', () => {
  it('Türkçe karakterleri ASCII karşılıklarına indirger', () => {
    expect(normalizeGuess('Şükrü Çağdaş')).toBe('sukrucagdas')
    expect(normalizeGuess('ĞÜŞİÖÇ')).toBe('gusioc')
  })

  it("Türkçe'ye özgü İ/I küçültmesini doğru yapar", () => {
    // JS'in varsayılan toLowerCase'i 'I' -> 'i' verir; Türkçe'de 'ı' olmalı.
    expect(normalizeGuess('IŞIL')).toBe('isil')
    expect(normalizeGuess('İSTANBUL')).toBe('istanbul')
  })

  it('yabancı isimlerdeki aksanları düşürür', () => {
    expect(normalizeGuess('Beyoncé')).toBe('beyonce')
    expect(normalizeGuess('Björk')).toBe('bjork')
  })

  it('boşluk, noktalama ve büyük/küçük harf farkını yok sayar', () => {
    expect(normalizeGuess('  Kemal   Sunal!  ')).toBe('kemalsunal')
    expect(normalizeGuess('kemal-sunal')).toBe('kemalsunal')
  })
})

describe('levenshteinDistance', () => {
  it('aynı dizeler için sıfır döner', () => {
    expect(levenshteinDistance('abc', 'abc')).toBe(0)
  })

  it('boş dize için diğerinin uzunluğunu döner', () => {
    expect(levenshteinDistance('', 'abcd')).toBe(4)
    expect(levenshteinDistance('abcd', '')).toBe(4)
  })

  it('ekleme, silme ve değiştirmeyi sayar', () => {
    expect(levenshteinDistance('kitten', 'sitting')).toBe(3)
    expect(levenshteinDistance('ali', 'all')).toBe(1)
  })

  it('simetriktir', () => {
    expect(levenshteinDistance('merhaba', 'meraba')).toBe(levenshteinDistance('meraba', 'merhaba'))
  })
})

describe('similarity', () => {
  it('iki boş dize için 1 döner ve sıfıra bölmez', () => {
    expect(similarity('', '')).toBe(1)
  })
})

describe('fuzzyMatch', () => {
  it('birebir eşleşmeyi kabul eder', () => {
    expect(fuzzyMatch('Kemal Sunal', 'Kemal Sunal')).toBe(true)
  })

  it('yazım farklarını ve Türkçe karakter kullanımını tolere eder', () => {
    expect(fuzzyMatch('kemal sunal', 'Kemal Sunal')).toBe(true)
    expect(fuzzyMatch('Sukru Saracoglu', 'Şükrü Saraçoğlu')).toBe(true)
    expect(fuzzyMatch('beyonce', 'Beyoncé')).toBe(true)
  })

  it('küçük bir yazım hatasını kabul eder', () => {
    expect(fuzzyMatch('Cem Yılmaz', 'Cem Yilmaz')).toBe(true)
    expect(fuzzyMatch('Baris Manco', 'Barış Manço')).toBe(true)
  })

  it('farklı isimleri reddeder', () => {
    expect(fuzzyMatch('Cem Yılmaz', 'Kemal Sunal')).toBe(false)
    expect(fuzzyMatch('Ali', 'Veli')).toBe(false)
  })

  it('kısa isimlerde tek harf farkını reddeder', () => {
    // Eşik oranlı olduğu için kısa dizelerde daha sıkı davranır.
    expect(fuzzyMatch('ali', 'all')).toBe(false)
  })

  it('boş tahmini asla doğru saymaz', () => {
    expect(fuzzyMatch('', 'Kemal Sunal')).toBe(false)
    expect(fuzzyMatch('   ', 'Kemal Sunal')).toBe(false)
    // Yalnızca noktalama içeren tahmin de boşa normalize olur.
    expect(fuzzyMatch('!!!', '!!!')).toBe(false)
  })
})

import { describe, expect, it } from 'vitest'

import {
  extractMatchCandidates,
  fuzzyMatch,
  levenshteinDistance,
  normalizeGuess,
  similarity,
} from './matching'

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

describe('extractMatchCandidates', () => {
  it('parantez içermeyen basit isimler için kendisini döner', () => {
    const candidates = extractMatchCandidates('Kemal Sunal')
    expect(candidates).toContain('Kemal Sunal')
  })

  it('parantezli isimlerde hem ana gövdeyi hem parantez içini çıkarır', () => {
    const candidates = extractMatchCandidates('Walter White (Heisenberg)')
    expect(candidates).toContain('Walter White (Heisenberg)')
    expect(candidates).toContain('Walter White')
    expect(candidates).toContain('Heisenberg')
  })

  it('parantez içinde slash ile ayrılmış çoklu aliasları ayrı ayrı çıkarır', () => {
    const candidates = extractMatchCandidates('Vito Corleone (Baba / The Godfather)')
    expect(candidates).toContain('Vito Corleone')
    expect(candidates).toContain('Baba')
    expect(candidates).toContain('The Godfather')
    expect(candidates).toContain('Godfather')
  })

  it('slash ile ayrılmış iki taraflı isimleri böler', () => {
    const candidates = extractMatchCandidates('Superman / Clark Kent')
    expect(candidates).toContain('Superman')
    expect(candidates).toContain('Clark Kent')
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

  describe('parantezli ve takma adlı karakter eşleştirmeleri', () => {
    it('parantezsiz ana ismi yazınca doğru kabul eder (Walter White)', () => {
      expect(fuzzyMatch('Walter White', 'Walter White (Heisenberg)')).toBe(true)
      expect(fuzzyMatch('walter white', 'Walter White (Heisenberg)')).toBe(true)
    })

    it('parantez içindeki takma adı yazınca doğru kabul eder (Heisenberg)', () => {
      expect(fuzzyMatch('Heisenberg', 'Walter White (Heisenberg)')).toBe(true)
      expect(fuzzyMatch('heisenberg', 'Walter White (Heisenberg)')).toBe(true)
    })

    it('parantezli tam ismi yazınca doğru kabul eder', () => {
      expect(fuzzyMatch('Walter White (Heisenberg)', 'Walter White (Heisenberg)')).toBe(true)
      expect(fuzzyMatch('Walter White Heisenberg', 'Walter White (Heisenberg)')).toBe(true)
    })

    it('çoklu alternatifli parantezlerdeki tüm varyantları kabul eder (Vito Corleone)', () => {
      const target = 'Vito Corleone (Baba / The Godfather)'
      expect(fuzzyMatch('Vito Corleone', target)).toBe(true)
      expect(fuzzyMatch('vito corleone', target)).toBe(true)
      expect(fuzzyMatch('Baba', target)).toBe(true)
      expect(fuzzyMatch('baba', target)).toBe(true)
      expect(fuzzyMatch('The Godfather', target)).toBe(true)
      expect(fuzzyMatch('Godfather', target)).toBe(true)
    })

    it('çizgi ve film karakterlerinde parantezsiz ve parantez içi eşleşmeler', () => {
      expect(fuzzyMatch('Batman', 'Batman (Bruce Wayne)')).toBe(true)
      expect(fuzzyMatch('Bruce Wayne', 'Batman (Bruce Wayne)')).toBe(true)

      expect(fuzzyMatch('Jon Snow', 'Jon Snow (Game of Thrones)')).toBe(true)
      expect(fuzzyMatch('Thomas Shelby', 'Thomas Shelby (Peaky Blinders)')).toBe(true)
      expect(fuzzyMatch('Tony Montana', 'Tony Montana (Yaralı Yüz / Scarface)')).toBe(true)
      expect(fuzzyMatch('Scarface', 'Tony Montana (Yaralı Yüz / Scarface)')).toBe(true)
      expect(fuzzyMatch('Yaralı Yüz', 'Tony Montana (Yaralı Yüz / Scarface)')).toBe(true)
      expect(fuzzyMatch('Yarali Yuz', 'Tony Montana (Yaralı Yüz / Scarface)')).toBe(true)
      expect(fuzzyMatch('Dobby', 'Dobby (Ev Cini)')).toBe(true)
      expect(fuzzyMatch('Ronaldo', 'Ronaldo (Nazário)')).toBe(true)
      expect(fuzzyMatch('Nazario', 'Ronaldo (Nazário)')).toBe(true)
      expect(fuzzyMatch('Gandalf', 'Gandalf (Gri/Ak Gandalf)')).toBe(true)
    })

    it('yanlış tahminleri parantezli hedeflerde de reddeder', () => {
      expect(fuzzyMatch('Cem Yılmaz', 'Walter White (Heisenberg)')).toBe(false)
      expect(fuzzyMatch('Jesse Pinkman', 'Walter White (Heisenberg)')).toBe(false)
      expect(fuzzyMatch('Al Pacino', 'Vito Corleone (Baba / The Godfather)')).toBe(false)
      expect(fuzzyMatch('Superman', 'Batman (Bruce Wayne)')).toBe(false)
    })
  })

  describe('Romen rakamları, sıra sayıları ve tarihsel isim eşleştirmeleri', () => {
    it('II. Mahmud hedefini 2. Mahmut, 2. Mahmud, ikinci mahmut, II. Mahmut ile eşleştirir', () => {
      const target = 'II. Mahmud'
      expect(fuzzyMatch('2. Mahmut', target)).toBe(true)
      expect(fuzzyMatch('2. mahmut', target)).toBe(true)
      expect(fuzzyMatch('2. Mahmud', target)).toBe(true)
      expect(fuzzyMatch('2 mahmut', target)).toBe(true)
      expect(fuzzyMatch('2 mahmud', target)).toBe(true)
      expect(fuzzyMatch('ikinci mahmut', target)).toBe(true)
      expect(fuzzyMatch('İkinci Mahmut', target)).toBe(true)
      expect(fuzzyMatch('ii. mahmut', target)).toBe(true)
      expect(fuzzyMatch('II. Mahmut', target)).toBe(true)
      expect(fuzzyMatch('II. Mahmud', target)).toBe(true)
      expect(fuzzyMatch('Mahmut', target)).toBe(true)
      expect(fuzzyMatch('Mahmud', target)).toBe(true)
    })

    it('diğer Osmanlı padişahları ve Romen rakamlı isimleri başarıyla eşleştirir', () => {
      expect(fuzzyMatch('4. Murat', 'IV. Murad')).toBe(true)
      expect(fuzzyMatch('4. Murad', 'IV. Murad')).toBe(true)
      expect(fuzzyMatch('Dördüncü Murat', 'IV. Murad')).toBe(true)
      expect(fuzzyMatch('IV. Murat', 'IV. Murad')).toBe(true)

      expect(fuzzyMatch('3. Selim', 'III. Selim')).toBe(true)
      expect(fuzzyMatch('Üçüncü Selim', 'III. Selim')).toBe(true)

      expect(fuzzyMatch('2. Mehmet', 'Fatih Sultan Mehmet (II. Mehmed)')).toBe(true)
      expect(fuzzyMatch('II. Mehmed', 'Fatih Sultan Mehmet (II. Mehmed)')).toBe(true)
      expect(fuzzyMatch('Fatih', 'Fatih Sultan Mehmet (II. Mehmed)')).toBe(true)

      expect(fuzzyMatch('1. Süleyman', 'Kanuni Sultan Süleyman (I. Süleyman)')).toBe(true)
      expect(fuzzyMatch('Kanuni', 'Kanuni Sultan Süleyman (I. Süleyman)')).toBe(true)

      expect(fuzzyMatch('2. Abdülhamit', 'II. Abdülhamid')).toBe(true)
      expect(fuzzyMatch('II. Abdulhamit', 'II. Abdülhamid')).toBe(true)
      expect(fuzzyMatch('Abdulhamit', 'II. Abdülhamid')).toBe(true)

      expect(fuzzyMatch('8. Henry', 'Henry VIII')).toBe(true)
      expect(fuzzyMatch('Henry 8', 'Henry VIII')).toBe(true)
      expect(fuzzyMatch('VIII. Henry', 'Henry VIII')).toBe(true)
    })

    it('farklı sıra sayılarını veya farklı kişileri reddeder', () => {
      expect(fuzzyMatch('1. Mahmud', 'II. Mahmud')).toBe(false)
      expect(fuzzyMatch('I. Mahmud', 'II. Mahmud')).toBe(false)
      expect(fuzzyMatch('3. Mahmut', 'II. Mahmud')).toBe(false)
      expect(fuzzyMatch('4. Selim', 'III. Selim')).toBe(false)
      expect(fuzzyMatch('2. Murat', 'IV. Murad')).toBe(false)
    })
  })
})


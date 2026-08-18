import { describe, expect, it } from 'vitest'

import {
  ROOM_CODE_LENGTH,
  calculatePersistentScore,
  calculateSpeedScore,
  distributeNames,
  estimatePersistentScore,
  estimateSpeedScore,
  generateRoomCode,
  selectNameForPlayer,
  selectNextPlayer,
  selectNextSharedTargetAsker,
} from './rules'


const players = [{ id: 'p1' }, { id: 'p2' }, { id: 'p3' }]

describe('selectNextPlayer', () => {
  it('sırayı listedeki bir sonraki oyuncuya verir', () => {
    expect(selectNextPlayer(players, 'p1')?.id).toBe('p2')
    expect(selectNextPlayer(players, 'p2')?.id).toBe('p3')
  })

  it('son oyuncudan sonra başa döner', () => {
    expect(selectNextPlayer(players, 'p3')?.id).toBe('p1')
  })

  it('mevcut oyuncu odadan ayrılmışsa baştan başlar', () => {
    expect(selectNextPlayer(players, 'ayrilmis-oyuncu')?.id).toBe('p1')
    expect(selectNextPlayer(players, null)?.id).toBe('p1')
  })

  it('oyuncu kalmamışsa null döner', () => {
    expect(selectNextPlayer([], 'p1')).toBeNull()
  })

  it('tek oyunculu odada aynı oyuncuda kalır', () => {
    expect(selectNextPlayer([{ id: 'p1' }], 'p1')?.id).toBe('p1')
  })
})

describe('selectNameForPlayer', () => {
  const names = [
    { id: 'n1', submitted_by: 'p1' },
    { id: 'n2', submitted_by: 'p2' },
    { id: 'n3', submitted_by: 'p3' },
  ]

  it('oyuncunun kendi yazdığı ismi seçmez', () => {
    // random() = 0 ilk elemanı seçer; p1 elendiği için n2 kalmalı.
    expect(selectNameForPlayer(names, 'p1', () => 0)?.id).toBe('n2')
  })

  it('yalnızca kendi isimleri kaldıysa oyunu kilitlemez', () => {
    const onlyOwn = [{ id: 'n1', submitted_by: 'p1' }]
    expect(selectNameForPlayer(onlyOwn, 'p1', () => 0)?.id).toBe('n1')
  })

  it('hiç isim yoksa null döner', () => {
    expect(selectNameForPlayer([], 'p1')).toBeNull()
  })
})

describe('distributeNames', () => {
  const names = [{ id: 'n1' }, { id: 'n2' }, { id: 'n3' }, { id: 'n4' }, { id: 'n5' }]

  it('her ismi tam olarak bir kez dağıtır', () => {
    const result = distributeNames(names, players, () => 0)
    expect(result).toHaveLength(names.length)
    expect(new Set(result.map((entry) => entry.nameId)).size).toBe(names.length)
  })

  it('isimleri oyunculara dengeli dağıtır', () => {
    const result = distributeNames(names, players, () => 0)
    const counts = players.map(
      (player) => result.filter((entry) => entry.playerId === player.id).length,
    )
    // 5 isim / 3 oyuncu => kimse diğerinden birden fazla isim fazla almamalı.
    expect(Math.max(...counts) - Math.min(...counts)).toBeLessThanOrEqual(1)
  })

  it('oyuncu ya da isim yoksa boş döner', () => {
    expect(distributeNames(names, [], () => 0)).toEqual([])
    expect(distributeNames([], players, () => 0)).toEqual([])
  })
})

describe('generateRoomCode', () => {
  it('doğru uzunlukta ve veritabanı kısıtına uygun kod üretir', () => {
    for (let i = 0; i < 200; i++) {
      const code = generateRoomCode()
      expect(code).toHaveLength(ROOM_CODE_LENGTH)
      // Migration'daki CHECK kısıtıyla aynı desen.
      expect(code).toMatch(/^[A-Z0-9]{6}$/)
    }
  })

  it('birbirine karışan I/1 ve O/0 karakterlerini kullanmaz', () => {
    const codes = Array.from({ length: 200 }, () => generateRoomCode()).join('')
    expect(codes).not.toMatch(/[IO01]/)
  })
})

describe('calculateSpeedScore', () => {
  it('0 soruda (ilk tahminde) tam 100 puan verir', () => {
    expect(calculateSpeedScore(0)).toBe(100)
    expect(estimateSpeedScore(0)).toBe(100)
  })

  it('her soruda 5 puan düşürür', () => {
    expect(calculateSpeedScore(1)).toBe(95)
    expect(calculateSpeedScore(3)).toBe(85)
    expect(calculateSpeedScore(12)).toBe(40)
  })

  it('taban puanın altına düşmez (en az 10 puan)', () => {
    expect(calculateSpeedScore(18)).toBe(10)
    expect(calculateSpeedScore(19)).toBe(10)
  })

  it('20 veya daha fazla soruda limit aşıldığı için 0 puan verir', () => {
    expect(calculateSpeedScore(20)).toBe(0)
    expect(calculateSpeedScore(25)).toBe(0)
  })
})

describe('calculatePersistentScore', () => {
  it('0 soruda (ilk tahminde) tam 100 puan verir', () => {
    expect(calculatePersistentScore(0)).toBe(100)
    expect(estimatePersistentScore(0)).toBe(100)
  })

  it('her soruda 8 puan düşürür', () => {
    expect(calculatePersistentScore(1)).toBe(92)
    expect(calculatePersistentScore(2)).toBe(84)
    expect(calculatePersistentScore(5)).toBe(60)
  })

  it('taban puanın altına düşmez (10. soruda bile en az 20 puan)', () => {
    expect(calculatePersistentScore(10)).toBe(20)
    expect(calculatePersistentScore(11)).toBe(20)
  })
})

describe('selectNextSharedTargetAsker', () => {
  const roomPlayers = [
    { id: 'host-1' },
    { id: 'p1' },
    { id: 'p2' },
    { id: 'p3' },
  ]

  it('hostu atlar ve yarışmacılar arasında döner', () => {
    const r1 = selectNextSharedTargetAsker(roomPlayers, 'p1', 'host-1')
    expect(r1.nextPlayer?.id).toBe('p2')

    const r2 = selectNextSharedTargetAsker(roomPlayers, 'p2', 'host-1')
    expect(r2.nextPlayer?.id).toBe('p3')

    const r3 = selectNextSharedTargetAsker(roomPlayers, 'p3', 'host-1')
    expect(r3.nextPlayer?.id).toBe('p1')
  })

  it('cezalı oyuncuyu atlar ve cezasını tüketir', () => {
    const penalized = new Set(['p2'])
    const r = selectNextSharedTargetAsker(roomPlayers, 'p1', 'host-1', penalized)
    expect(r.nextPlayer?.id).toBe('p3')
    expect(r.consumedPenalties).toEqual(['p2'])
  })

  it('tüm yarışmacılar cezalıysa sıradaki ilk oyuncuya döner ve cezaları temizler', () => {
    const penalized = new Set(['p1', 'p2', 'p3'])
    const r = selectNextSharedTargetAsker(roomPlayers, 'p1', 'host-1', penalized)
    expect(r.nextPlayer?.id).toBe('p2')
    expect(r.consumedPenalties).toContain('p2')
  })
})


import { beforeEach, describe, expect, it, vi } from 'vitest'

import { suggestNameSchema } from '@/lib/validation'
import { createSupabaseFake } from '@/test/supabaseFake'

let fake: ReturnType<typeof createSupabaseFake>

vi.mock('@/lib/supabaseAdmin', () => ({
  supabaseAdmin: () => fake.client,
}))

const { suggestFamousPerson } = await import('./engine')

describe('Community Name Suggestions', () => {
  beforeEach(() => {
    fake = createSupabaseFake({
      rooms: [],
      players: [],
      names: [],
      name_suggestions: [],
    })
  })

  describe('suggestNameSchema validation', () => {
    it('geçerli bir öneriyi başarıyla doğrular', () => {
      const valid = {
        name: 'İlber Ortaylı',
        category: 'unluler',
        notes: 'Tarihçi / Yazar',
      }
      const parsed = suggestNameSchema.parse(valid)
      expect(parsed.name).toBe('İlber Ortaylı')
      expect(parsed.category).toBe('unluler')
      expect(parsed.notes).toBe('Tarihçi / Yazar')
    })

    it('2 karakterden kısa isimleri reddeder', () => {
      expect(() =>
        suggestNameSchema.parse({
          name: 'A',
          category: 'unluler',
        }),
      ).toThrow()
    })

    it('geçersiz kategorileri reddeder', () => {
      expect(() =>
        suggestNameSchema.parse({
          name: 'Superman',
          category: 'gecersiz_kategori',
        }),
      ).toThrow()
    })

    it('60 karakterden uzun isimleri reddeder', () => {
      expect(() =>
        suggestNameSchema.parse({
          name: 'a'.repeat(61),
          category: 'unluler',
        }),
      ).toThrow()
    })
  })

  describe('suggestFamousPerson engine', () => {
    it('veritabanına yeni isim önerisi ekler ve pending statüsünde döner', async () => {
      const result = await suggestFamousPerson({
        name: 'Luka Doncic',
        category: 'sporcular',
        notes: 'NBA oyuncusu',
        suggestedBy: 'burak',
      })

      expect(result.id).toBeTruthy()
      expect(result.name).toBe('Luka Doncic')
      expect(result.category).toBe('sporcular')
      expect(result.notes).toBe('NBA oyuncusu')
      expect(result.status).toBe('pending')

      expect(fake.tables.name_suggestions?.length).toBe(1)
      expect(fake.tables.name_suggestions?.[0]?.name).toBe('Luka Doncic')
    })

    it('veritabanı bağlantı hatası olsa dahi hata fırlatmaz, güvenli fallback döner', async () => {
      // Mock error by emptying fake tables
      delete fake.tables.name_suggestions

      const result = await suggestFamousPerson({
        name: 'Gandalf',
        category: 'cizgi_karakterler',
      })

      expect(result.id).toBeTruthy()
      expect(result.name).toBe('Gandalf')
      expect(result.category).toBe('cizgi_karakterler')
      expect(result.status).toBe('pending')
    })
  })
})

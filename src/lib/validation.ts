import { z } from 'zod'

import { badRequest } from './http'

/**
 * Girdi doğrulama.
 *
 * Daha önce tek koruma HTML `maxLength` attribute'uydu; istek doğrudan Supabase'e
 * gittiği için trivial olarak atlanabiliyordu. Şemalar burada, veritabanı seviyesindeki
 * CHECK kısıtlarıyla aynı sınırları paylaşır (bkz. 20260811120100_cleanup_and_constraints.sql).
 */

export const nicknameSchema = z
  .string()
  .trim()
  .min(1, 'Takma ad boş olamaz.')
  .max(20, 'Takma ad en fazla 20 karakter olabilir.')

export const roomCodeSchema = z
  .string()
  .trim()
  .toUpperCase()
  .regex(/^[A-Z0-9]{6}$/, 'Oda kodu 6 karakterli olmalı (harf ve rakam).')

export const nameTextSchema = z
  .string()
  .trim()
  .min(1, 'İsim boş olamaz.')
  .max(60, 'İsim en fazla 60 karakter olabilir.')

export const gameModeSchema = z.enum(['classic', 'speed', 'persistent', 'shared_target'])

export const lobbyCategoryModeSchema = z.enum(['single', 'multi_phase'])

export const famousPersonCategorySchema = z.enum([
  'all',
  'unluler',
  'tarihi_kisiler',
  'cizgi_karakterler',
  'sporcular',
  'dizi_film_karakterleri',
])

export const createRoomSchema = z.object({
  nickname: nicknameSchema,
  gameMode: gameModeSchema.optional(),
  categoryMode: lobbyCategoryModeSchema.optional(),
  category: famousPersonCategorySchema.optional(),
  phaseCategories: z.array(famousPersonCategorySchema).min(1).max(3).optional(),
})

export const setRoomModeSchema = z.object({
  gameMode: gameModeSchema,
})

export const setRoomCategorySchema = z.object({
  categoryMode: lobbyCategoryModeSchema.optional(),
  category: famousPersonCategorySchema.optional(),
  phaseCategories: z.array(famousPersonCategorySchema).min(1).max(3).optional(),
})

export const joinRoomSchema = z.object({
  roomCode: roomCodeSchema,
  nickname: nicknameSchema,
})

export const submitNamesSchema = z.object({
  names: z
    .array(nameTextSchema)
    .min(1, 'En az bir isim girmelisiniz.')
    .max(3, 'En fazla 3 isim gönderebilirsiniz.'),
})

export const guessSchema = z.object({
  guess: nameTextSchema,
})

export const askQuestionSchema = z.object({
  question: z
    .string()
    .trim()
    .min(1, 'Soru metni boş olamaz.')
    .max(150, 'Soru en fazla 150 karakter olabilir.'),
})

export const answerQuestionSchema = z.object({
  questionId: z.string().min(1, 'Soru ID zorunludur.'),
  answer: z.enum(['yes', 'no', 'uncertain'], {
    message: 'Cevap Evet, Hayır veya Belirsiz olmalıdır.',
  }),
})

export const setTargetSchema = z.object({
  targetName: nameTextSchema,
})


export const famousPeopleQuerySchema = z.object({
  q: z.string().trim().max(60).optional(),
  category: famousPersonCategorySchema.optional(),
  random: z
    .union([z.boolean(), z.enum(['true', 'false', '1', '0'])])
    .optional()
    .transform((val) => val === true || val === 'true' || val === '1'),
  limit: z.coerce.number().int().min(1).max(50).optional(),
})

export const autoAssignSchema = z.object({
  category: famousPersonCategorySchema.optional(),
})


export function parseBody<Schema extends z.ZodType>(schema: Schema, data: unknown): z.infer<Schema> {
  const result = schema.safeParse(data)
  if (!result.success) {
    const message = result.error.issues[0]?.message ?? 'Geçersiz istek.'
    throw badRequest('validation_error', message)
  }
  return result.data
}

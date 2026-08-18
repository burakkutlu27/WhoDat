import type { NextRequest } from 'next/server'

import { filterQuestions, QUESTION_BANK_SEED, QUESTION_TAGS } from '@/lib/game/questionBankData'
import { jsonOk, route } from '@/lib/http'

/**
 * GET /api/question-bank — Soru bankası listesini ve etiketleri döner.
 */
export const GET = route(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q') ?? undefined
  const tag = searchParams.get('tag') ?? undefined

  const questions = filterQuestions(q, tag)

  return jsonOk({
    tags: QUESTION_TAGS,
    total: QUESTION_BANK_SEED.length,
    filteredCount: questions.length,
    questions,
  })
})

import type { NextRequest } from 'next/server'

import { getFamousPeople } from '@/lib/game/engine'
import type { FamousPersonCategory } from '@/lib/game/types'
import { jsonOk, route } from '@/lib/http'
import { famousPeopleQuerySchema, parseBody } from '@/lib/validation'

/**
 * GET /api/famous-people
 *
 * Query params:
 * - q: arama terimi (ilike)
 * - category: 'all' | 'unluler' | 'tarihi_kisiler' | 'cizgi_karakterler' | 'sporcular' | 'dizi_film_karakterleri'
 * - random: 'true' | 'false' (rastgele öneri çeker)
 * - limit: sayı (varsayılan 10, max 50)
 */
export const GET = route(async (request: NextRequest) => {
  const { searchParams } = new URL(request.url)
  const rawParams = {
    q: searchParams.get('q') || undefined,
    category: (searchParams.get('category') as FamousPersonCategory) || undefined,
    random: searchParams.get('random') || undefined,
    limit: searchParams.get('limit') || undefined,
  }

  const { q, category, random, limit } = parseBody(famousPeopleQuerySchema, rawParams)

  const data = await getFamousPeople({
    query: q,
    category,
    random,
    limit,
  })

  return jsonOk({ data })
})

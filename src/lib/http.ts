import 'server-only'

import { NextResponse, type NextRequest } from 'next/server'

/**
 * Tek tip API hata sözleşmesi: `{ error: { code, message } }`.
 *
 * `code` istemcinin dallanma yapacağı sabit anahtardır; `message` kullanıcıya
 * gösterilebilecek Türkçe metindir. Beklenmeyen hatalar sunucuda loglanır ama
 * dışarıya asla stack trace, SQL hatası veya tablo adı sızmaz.
 */

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

export const badRequest = (code: string, message: string) => new ApiError(400, code, message)
export const unauthorized = (message = 'Bu oturum artık geçerli değil.') =>
  new ApiError(401, 'unauthorized', message)
export const forbidden = (code: string, message: string) => new ApiError(403, code, message)
export const notFound = (code: string, message: string) => new ApiError(404, code, message)
export const conflict = (code: string, message: string) => new ApiError(409, code, message)
export const tooManyRequests = (message: string) => new ApiError(429, 'rate_limited', message)

export function jsonOk<T>(data: T, init?: ResponseInit): NextResponse {
  return NextResponse.json(data, init)
}

export function errorResponse(error: unknown): NextResponse {
  if (error instanceof ApiError) {
    return NextResponse.json(
      { error: { code: error.code, message: error.message } },
      { status: error.status },
    )
  }

  // Beklenmeyen hata: ayrıntı sunucuda kalır.
  console.error('[api] beklenmeyen hata:', error)
  return NextResponse.json(
    { error: { code: 'internal_error', message: 'Beklenmeyen bir hata oluştu. Lütfen tekrar deneyin.' } },
    { status: 500 },
  )
}

/** Route handler'ları sarmalayarak hata dönüşümünü tek yerde toplar. */
export function route<Context>(
  handler: (request: NextRequest, context: Context) => Promise<NextResponse>,
) {
  return async (request: NextRequest, context: Context): Promise<NextResponse> => {
    try {
      return await handler(request, context)
    } catch (error) {
      return errorResponse(error)
    }
  }
}

export async function readJsonBody(request: NextRequest): Promise<unknown> {
  try {
    return await request.json()
  } catch {
    throw badRequest('invalid_json', 'İstek gövdesi okunamadı.')
  }
}

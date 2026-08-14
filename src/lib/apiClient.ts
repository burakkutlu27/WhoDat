'use client'

/**
 * /api istemcisi.
 *
 * Sunucu hataları `{ error: { code, message } }` sözleşmesiyle döner. `code` ile
 * dallanma yapılır, `message` doğrudan kullanıcıya gösterilebilir; böylece sayfalarda
 * hata metinlerini string karşılaştırmasıyla eşleme ihtiyacı kalmaz.
 */

export class ApiClientError extends Error {
  constructor(
    readonly code: string,
    message: string,
    readonly status: number,
  ) {
    super(message)
    this.name = 'ApiClientError'
  }
}

const GENERIC_MESSAGE = 'Sunucuya ulaşılamadı. İnternet bağlantınızı kontrol edin.'

export async function apiRequest<T>(
  path: string,
  options: { method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'; body?: unknown; signal?: AbortSignal } = {},
): Promise<T> {
  const { method = 'GET', body, signal } = options

  let response: Response
  try {
    response = await fetch(path, {
      method,
      signal,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error
    throw new ApiClientError('network_error', GENERIC_MESSAGE, 0)
  }

  const payload = await response.json().catch(() => null)

  if (!response.ok) {
    const details = (payload as { error?: { code?: string; message?: string } } | null)?.error
    throw new ApiClientError(
      details?.code ?? 'unknown_error',
      details?.message ?? 'Beklenmeyen bir hata oluştu.',
      response.status,
    )
  }

  return payload as T
}

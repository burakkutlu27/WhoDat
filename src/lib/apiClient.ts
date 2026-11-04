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

/**
 * Yanıt gelmeyen istek sayfanın meşgul durumunu (isBusy) hiç bırakmıyor, oyuncu kendi
 * sırasında kilitli kalıyordu. Sunucu fonksiyonu bundan uzun sürmemeli.
 */
const REQUEST_TIMEOUT_MS = 20000

export async function apiRequest<T>(
  path: string,
  options: { method?: 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'; body?: unknown; signal?: AbortSignal } = {},
): Promise<T> {
  const { method = 'GET', body, signal } = options

  const controller = new AbortController()
  let timedOut = false
  const timer = setTimeout(() => {
    timedOut = true
    controller.abort()
  }, REQUEST_TIMEOUT_MS)
  const forwardAbort = () => controller.abort()
  if (signal?.aborted) controller.abort()
  signal?.addEventListener('abort', forwardAbort)

  let response: Response
  try {
    response = await fetch(path, {
      method,
      signal: controller.signal,
      headers: body ? { 'Content-Type': 'application/json' } : undefined,
      body: body ? JSON.stringify(body) : undefined,
    })
  } catch (error) {
    if (timedOut) throw new ApiClientError('timeout', 'Sunucu yanıt vermedi. Lütfen tekrar deneyin.', 0)
    if (error instanceof DOMException && error.name === 'AbortError') throw error
    throw new ApiClientError('network_error', GENERIC_MESSAGE, 0)
  } finally {
    clearTimeout(timer)
    signal?.removeEventListener('abort', forwardAbort)
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

import type { ApiClientError } from './apiClient'

export const FALLBACK_POLL_MS = 5000
export const MAX_INITIAL_TRANSIENT_RETRIES = 3

const RETRY_BACKOFF_MS = [350, 900, 1800, 3000, 5000] as const

/**
 * Ağ kesintisi, zaman aşımı veya geçici sunucu (5xx) hatalarını
 * kalıcı istemci/yetki (4xx) hatalarından ayırır.
 */
export function isTransientApiError(error: ApiClientError): boolean {
  return error.status === 0 || error.status >= 500
}

/**
 * Tekrar deneme sayısına göre kademeli bekleme süresi (ms) döner.
 */
export function getRetryDelayMs(attempt: number): number {
  const index = Math.max(0, Math.min(attempt, RETRY_BACKOFF_MS.length - 1))
  return RETRY_BACKOFF_MS[index] ?? 5000
}

/**
 * Oda ve oylama durumuna göre güvenli yoklama (polling) aralığını hesaplar.
 */
export function getPollIntervalMs(
  roomStatus: string | undefined,
  activeVoteStatus: string | undefined,
): number {
  if (activeVoteStatus === 'open') return 1000
  if (roomStatus === 'waiting' || roomStatus === 'playing') return 2000
  return FALLBACK_POLL_MS
}

export type FetchErrorDecision =
  | { action: 'fail'; terminal: boolean }
  | { action: 'retry'; delayMs: number; incrementInitialRetry: boolean }

/**
 * `/state` isteği başarısız olduğunda ekranın hata durumuna geçip geçmeyeceğini
 * veya arka planda otomatik yeniden denenip denenmeyeceğini belirler.
 */
export function resolveFetchErrorDecision(params: {
  error: ApiClientError
  hasLoadedState: boolean
  initialRetryCount: number
  transientFailureCount: number
}): FetchErrorDecision {
  if (!isTransientApiError(params.error)) {
    return { action: 'fail', terminal: true }
  }
  if (params.hasLoadedState) {
    return {
      action: 'retry',
      delayMs: getRetryDelayMs(params.transientFailureCount),
      incrementInitialRetry: false,
    }
  }
  if (params.initialRetryCount < MAX_INITIAL_TRANSIENT_RETRIES) {
    return {
      action: 'retry',
      delayMs: getRetryDelayMs(params.initialRetryCount),
      incrementInitialRetry: true,
    }
  }
  return { action: 'fail', terminal: false }
}

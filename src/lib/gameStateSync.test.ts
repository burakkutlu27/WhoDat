import { describe, expect, it } from 'vitest'

import { ApiClientError } from './apiClient'
import {
  FALLBACK_POLL_MS,
  MAX_INITIAL_TRANSIENT_RETRIES,
  getPollIntervalMs,
  getRetryDelayMs,
  isTransientApiError,
  resolveFetchErrorDecision,
} from './gameStateSync'

describe('gameStateSync', () => {
  it('ag ve 5xx hatalarini gecici, 4xx yetki/oda hatalarini kalici sayar', () => {
    expect(isTransientApiError(new ApiClientError('network_error', 'Ag hatasi', 0))).toBe(true)
    expect(isTransientApiError(new ApiClientError('timeout', 'Zaman asimi', 0))).toBe(true)
    expect(isTransientApiError(new ApiClientError('server_error', 'Sunucu', 503))).toBe(true)

    expect(isTransientApiError(new ApiClientError('unauthorized', 'Yetkisiz', 401))).toBe(false)
    expect(isTransientApiError(new ApiClientError('wrong_room', 'Yanlis oda', 403))).toBe(false)
    expect(isTransientApiError(new ApiClientError('not_found', 'Yok', 404))).toBe(false)
  })

  it('oyun yuklendikten sonraki gecici kesintilerde hata ekranina dusmek yerine yeniden dener', () => {
    const decision = resolveFetchErrorDecision({
      error: new ApiClientError('network_error', 'Baglanti koptu', 0),
      hasLoadedState: true,
      initialRetryCount: 0,
      transientFailureCount: 2,
    })

    expect(decision).toEqual({
      action: 'retry',
      delayMs: getRetryDelayMs(2),
      incrementInitialRetry: false,
    })
  })

  it('ilk acilistaki gecici hatalarda limit dolana kadar yeniden dener, dolunca hata verir', () => {
    for (let attempt = 0; attempt < MAX_INITIAL_TRANSIENT_RETRIES; attempt += 1) {
      expect(
        resolveFetchErrorDecision({
          error: new ApiClientError('timeout', 'Zaman asimi', 0),
          hasLoadedState: false,
          initialRetryCount: attempt,
          transientFailureCount: 0,
        }),
      ).toEqual({
        action: 'retry',
        delayMs: getRetryDelayMs(attempt),
        incrementInitialRetry: true,
      })
    }

    expect(
      resolveFetchErrorDecision({
        error: new ApiClientError('timeout', 'Zaman asimi', 0),
        hasLoadedState: false,
        initialRetryCount: MAX_INITIAL_TRANSIENT_RETRIES,
        transientFailureCount: 0,
      }),
    ).toEqual({ action: 'fail', terminal: false })
  })

  it('4xx hatalarda state yuklu olsa bile tekrar denemeden kalici hata verir', () => {
    expect(
      resolveFetchErrorDecision({
        error: new ApiClientError('player_not_in_room', 'Odada degil', 403),
        hasLoadedState: true,
        initialRetryCount: 0,
        transientFailureCount: 0,
      }),
    ).toEqual({ action: 'fail', terminal: true })
  })

  it('backoff ve polling araliklarini sinirli tutar', () => {
    expect(getRetryDelayMs(0)).toBe(350)
    expect(getRetryDelayMs(99)).toBe(5000)

    expect(getPollIntervalMs('playing', 'open')).toBe(1000)
    expect(getPollIntervalMs('playing', undefined)).toBe(2000)
    expect(getPollIntervalMs('waiting', undefined)).toBe(2000)
    expect(getPollIntervalMs('finished', undefined)).toBe(FALLBACK_POLL_MS)
  })
})


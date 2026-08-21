import 'server-only'

import type { NextRequest } from 'next/server'

import { tooManyRequests } from './http'

/**
 * Bellek içi sabit pencere sayacı.
 *
 * Sınır: serverless ortamda her sunucu örneği kendi sayacını tutar, yani bu koruma
 * en iyi çaba (best effort) düzeyindedir. Amaç, tek bir istemcinin oda yaratarak veya
 * tahmin göndererek veritabanı kotasını tüketmesini zorlaştırmak. Kalıcı ve dağıtık
 * bir limit gerekirse Upstash Redis gibi harici bir sayaca geçmek gerekir.
 */

interface Window {
  count: number
  resetAt: number
}

const windows = new Map<string, Window>()
const MAX_TRACKED_KEYS = 10_000

function sweepExpired(now: number) {
  for (const [key, window] of windows) {
    if (window.resetAt <= now) windows.delete(key)
  }
}

export function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0]!.trim()
  return request.headers.get('x-real-ip') ?? 'unknown'
}

export function enforceRateLimit(options: {
  request: NextRequest
  bucket: string
  limit: number
  windowMs: number
  message: string
}): void {
  if (process.env.PLAYWRIGHT_TEST === '1') {
    return
  }

  const { request, bucket, limit, windowMs, message } = options
  const now = Date.now()

  if (windows.size > MAX_TRACKED_KEYS) sweepExpired(now)

  const key = `${bucket}:${clientIp(request)}`
  const existing = windows.get(key)

  if (!existing || existing.resetAt <= now) {
    windows.set(key, { count: 1, resetAt: now + windowMs })
    return
  }

  existing.count += 1
  if (existing.count > limit) {
    throw tooManyRequests(message)
  }
}

/** Yalnızca testler için: sayaçları sıfırlar. */
export function resetRateLimits(): void {
  windows.clear()
}

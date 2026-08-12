import 'server-only'

import { createHmac, timingSafeEqual } from 'node:crypto'
import type { NextRequest } from 'next/server'

import { serverEnv } from './env'

/**
 * Oyuncu kimliği.
 *
 * Daha önce kimlik `localStorage.playerId` içindeki ham UUID'ydi: tarayıcı konsolundan
 * başka bir oyuncunun UUID'si yazılarak onun sırası alınabiliyor, `isHost` true yapılarak
 * host yetkisi elde edilebiliyordu. Artık kimlik HMAC ile imzalanmış httpOnly bir çerezde
 * durur; istemci ne okuyabilir ne de değiştirebilir.
 */

export const SESSION_COOKIE = 'kimbu_session'

const SESSION_TTL_SECONDS = 12 * 60 * 60

export interface SessionPayload {
  playerId: string
  roomId: string
  isHost: boolean
  /** Unix saniye. */
  exp: number
}

function base64UrlEncode(input: string): string {
  return Buffer.from(input, 'utf8').toString('base64url')
}

function sign(data: string): string {
  return createHmac('sha256', serverEnv.sessionSecret).update(data).digest('base64url')
}

function safeEquals(a: string, b: string): boolean {
  const bufferA = Buffer.from(a)
  const bufferB = Buffer.from(b)
  if (bufferA.length !== bufferB.length) return false
  return timingSafeEqual(bufferA, bufferB)
}

export function createSessionToken(input: Omit<SessionPayload, 'exp'>): string {
  const payload: SessionPayload = {
    ...input,
    exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
  }
  const body = base64UrlEncode(JSON.stringify(payload))
  return `${body}.${sign(body)}`
}

export function verifySessionToken(token: string | undefined): SessionPayload | null {
  if (!token) return null

  const separator = token.lastIndexOf('.')
  if (separator <= 0) return null

  const body = token.slice(0, separator)
  const signature = token.slice(separator + 1)

  if (!safeEquals(signature, sign(body))) return null

  try {
    const payload = JSON.parse(Buffer.from(body, 'base64url').toString('utf8')) as SessionPayload
    if (typeof payload.playerId !== 'string' || typeof payload.roomId !== 'string') return null
    if (typeof payload.exp !== 'number' || payload.exp < Math.floor(Date.now() / 1000)) return null
    return payload
  } catch {
    return null
  }
}

export function readSession(request: NextRequest): SessionPayload | null {
  return verifySessionToken(request.cookies.get(SESSION_COOKIE)?.value)
}

const baseCookieOptions = {
  httpOnly: true,
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
  path: '/',
} as const

export function sessionCookie(payload: Omit<SessionPayload, 'exp'>) {
  return {
    name: SESSION_COOKIE,
    value: createSessionToken(payload),
    options: { ...baseCookieOptions, maxAge: SESSION_TTL_SECONDS },
  }
}

export function clearedSessionCookie() {
  return { name: SESSION_COOKIE, value: '', options: { ...baseCookieOptions, maxAge: 0 } }
}

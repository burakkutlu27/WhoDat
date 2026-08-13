import 'server-only'

import type { NextRequest } from 'next/server'

import { forbidden, unauthorized } from './http'
import { readSession, type SessionPayload } from './session'

/**
 * Route handler'ların tek kimlik kaynağı.
 *
 * İstemci hangi oyuncu olduğunu söyleyemez; playerId yalnızca imzalı çerezden okunur.
 * Çerez ayrıca hangi odaya ait olduğunu taşır, böylece bir odanın oturumuyla başka bir
 * odaya istek atılamaz.
 */
export function requireSession(request: NextRequest, roomId: string): SessionPayload {
  const session = readSession(request)
  if (!session) {
    throw unauthorized('Oturumunuz bulunamadı ya da süresi doldu. Odaya yeniden katılın.')
  }
  if (session.roomId !== roomId) {
    throw forbidden('wrong_room', 'Bu oda için yetkiniz yok.')
  }
  return session
}

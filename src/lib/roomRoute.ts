import 'server-only'

import type { NextRequest, NextResponse } from 'next/server'

import { withRoomRuntime } from './game/runtimeState'
import { ApiError, route } from './http'
import { roomIdFrom, type RoomRouteContext } from './routeContext'

/**
 * `/api/rooms/[id]/*` handler'ları için `route()`: isteği odanın runtime kapsamında çalıştırır
 * ki bellek state'i isteğin başında DB'den yüklensin, sonunda DB'ye yazılsın.
 *
 * GET yan etkisiz olduğu için başka bir instance'la çakışmada bir kez yeniden denenir;
 * aksiyonlar (POST) yeniden denenmez, istemci 409'u görüp state'i yeniler.
 */
export function roomRoute(
  handler: (request: NextRequest, context: RoomRouteContext) => Promise<NextResponse>,
) {
  return route(async (request: NextRequest, context: RoomRouteContext) => {
    const roomId = await roomIdFrom(context)
    const run = () => withRoomRuntime(roomId, () => handler(request, context))

    if (request.method !== 'GET') return run()
    try {
      return await run()
    } catch (error) {
      if (error instanceof ApiError && error.code === 'state_conflict') return run()
      throw error
    }
  })
}

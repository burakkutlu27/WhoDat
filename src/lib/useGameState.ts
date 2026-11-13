'use client'

import type { PluginListenerHandle } from '@capacitor/core'
import { useCallback, useEffect, useRef, useState } from 'react'

import { ApiClientError, apiRequest } from './apiClient'
import type { GameState } from './game/types'
import { getPollIntervalMs, resolveFetchErrorDecision } from './gameStateSync'
import { isNativeApp } from './native'
import { supabaseBrowser } from './supabaseBrowser'

/**
 * Oyun durumunu yükler ve canlı tutar.
 *
 * Önceden her sayfa hem Realtime'a abone oluyor hem de 2-3 saniyede bir polling
 * yapıyordu; ikisi de aynı yükü tetiklediği için 6 kişilik bir oyun saniyede ~9 sorgu
 * üretiyordu. Artık Realtime yalnızca "bir şey değişti" sinyali; veriyi tek bir
 * sanitize edilmiş uç noktadan çekiyoruz.
 *
 * Polling tamamen kalkmadı ama koşullu hale geldi: yalnızca Realtime kanalı
 * bağlanamadığında devreye giren bir emniyet ağı olarak çalışıyor.
 */

const REFRESH_DEBOUNCE_MS = 120
const REALTIME_RETRY_MS = 1500
const RESUME_THROTTLE_MS = 250
const REALTIME_STALE_BACKGROUND_MS = 4000

export type GameStatePhase = 'loading' | 'ready' | 'error'

export interface UseGameStateResult {
  state: GameState | null
  phase: GameStatePhase
  error: ApiClientError | null
  /** Realtime veya senkronizasyon kesintisinde true; kullanıcıya "bağlantı zayıf" göstergesi için. */
  degraded: boolean
  /** Arka plandan dönüş veya geçici ağ hatasında otomatik yeniden bağlanma sürüyor mu. */
  reconnecting: boolean
  /** Son başarılı sunucu durumunun istemci zaman damgası (ms). */
  lastSyncedAt: number | null
  /** Son başarılı durum isteğinin gidiş-dönüş süresi (ms). */
  lastSyncLatencyMs: number
  refresh: () => Promise<void>
}

export function useGameState(roomId: string): UseGameStateResult {
  const [state, setState] = useState<GameState | null>(null)
  const [phase, setPhase] = useState<GameStatePhase>('loading')
  const [error, setError] = useState<ApiClientError | null>(null)
  const [realtimeConnected, setRealtimeConnected] = useState(false)
  const [reconnecting, setReconnecting] = useState(false)
  const [lastSyncedAt, setLastSyncedAt] = useState<number | null>(null)
  const [lastSyncLatencyMs, setLastSyncLatencyMs] = useState(0)

  const mounted = useRef(true)
  const hasStateRef = useRef(false)
  const terminalErrorRef = useRef(false)
  const appActiveRef = useRef(true)
  const realtimeConnectedRef = useRef(false)
  const backgroundedAtRef = useRef<number | null>(null)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const retryTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const inFlight = useRef<Promise<void> | null>(null)
  const rerun = useRef(false)
  const epochRef = useRef(0)
  const initialRetryCountRef = useRef(0)
  const transientFailureCountRef = useRef(0)
  const lastResumeAtRef = useRef(0)
  const ensureRealtimeRef = useRef<((forceResubscribe?: boolean) => void) | null>(null)

  const isForeground = useCallback(() => {
    const visible = typeof document === 'undefined' || document.visibilityState === 'visible'
    return visible && appActiveRef.current
  }, [])

  const clearTimers = useCallback(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current)
      debounceTimer.current = null
    }
    if (retryTimer.current) {
      clearTimeout(retryTimer.current)
      retryTimer.current = null
    }
  }, [])

  const invalidateInFlight = useCallback(() => {
    // Arka plana geçerken veya ön plana dönerken askıda kalmış eski isteğin
    // yeni yenilemeyi bloklamasını ve bayat hata/durum yazmasını engelle.
    epochRef.current += 1
    inFlight.current = null
    rerun.current = false
    clearTimers()
  }, [clearTimers])

  // roomId değiştiğinde React state'ini effect içinde senkron setState çağırmadan sıfırla.
  const [trackedRoomId, setTrackedRoomId] = useState(roomId)
  if (trackedRoomId !== roomId) {
    setTrackedRoomId(roomId)
    setLastSyncedAt(null)
    setState(null)
    setError(null)
    setReconnecting(false)
    setPhase('loading')
  }

  const refreshInternalRef = useRef<(resetRetries: boolean) => Promise<void>>(async () => {})

  const refreshInternal = useCallback((resetRetries: boolean): Promise<void> => {
    if (resetRetries) {
      terminalErrorRef.current = false
      initialRetryCountRef.current = 0
      transientFailureCountRef.current = 0
      if (!hasStateRef.current) {
        setError(null)
        setPhase('loading')
      }
    }

    if (inFlight.current) {
      rerun.current = true
      return inFlight.current
    }

    const reqEpoch = epochRef.current

    const fetchOnce = async () => {
      try {
        const startedAt = Date.now()
        const next = await apiRequest<GameState>(`/api/rooms/${roomId}/state`)
        if (!mounted.current || reqEpoch !== epochRef.current) return
        const completedAt = Date.now()
        hasStateRef.current = true
        terminalErrorRef.current = false
        initialRetryCountRef.current = 0
        transientFailureCountRef.current = 0
        if (retryTimer.current) {
          clearTimeout(retryTimer.current)
          retryTimer.current = null
        }
        setLastSyncedAt(completedAt)
        setLastSyncLatencyMs(Math.max(0, completedAt - startedAt))
        setState(next)
        setError(null)
        setReconnecting(false)
        setPhase('ready')
      } catch (caught) {
        if (!mounted.current || reqEpoch !== epochRef.current) return
        if (caught instanceof DOMException && caught.name === 'AbortError') return

        const apiError =
          caught instanceof ApiClientError
            ? caught
            : new ApiClientError('unknown_error', 'Beklenmeyen bir hata oluştu.', 0)

        const decision = resolveFetchErrorDecision({
          error: apiError,
          hasLoadedState: hasStateRef.current,
          initialRetryCount: initialRetryCountRef.current,
          transientFailureCount: transientFailureCountRef.current,
        })

        if (decision.action === 'fail') {
          terminalErrorRef.current = decision.terminal
          setReconnecting(false)
          setError(apiError)
          setPhase('error')
          return
        }

        // Oyun zaten yüklüyse (ya da ilk açılış kısa ağ kesintisiyle çakıştıysa)
        // "Oyun Açılamadı" ekranına düşmeden otomatik yeniden bağlan.
        if (decision.incrementInitialRetry) {
          initialRetryCountRef.current += 1
        } else {
          transientFailureCountRef.current += 1
        }

        setReconnecting(true)
        if (isForeground() && !retryTimer.current) {
          retryTimer.current = setTimeout(() => {
            retryTimer.current = null
            if (mounted.current && isForeground()) {
              void refreshInternalRef.current(false)
            }
          }, decision.delayMs)
        }
      }
    }

    const run = async () => {
      do {
        rerun.current = false
        await fetchOnce()
      } while (rerun.current && mounted.current && reqEpoch === epochRef.current)
    }

    const promise = run().finally(() => {
      if (inFlight.current === promise) {
        inFlight.current = null
      }
    })
    inFlight.current = promise
    return promise
  }, [isForeground, roomId])

  useEffect(() => {
    refreshInternalRef.current = refreshInternal
  }, [refreshInternal])

  const refresh = useCallback((): Promise<void> => {
    return refreshInternal(true)
  }, [refreshInternal])

  /** Zamanlayıcı poll'u: uygulama arka plandaysa, kalıcı hata alındıysa veya istek sürüyorsa atlanır. */
  const poll = useCallback(() => {
    if (!mounted.current || !isForeground() || terminalErrorRef.current) return
    if (!inFlight.current) void refreshInternal(false)
  }, [isForeground, refreshInternal])

  const scheduleRefresh = useCallback(() => {
    if (!isForeground() || terminalErrorRef.current) return
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    debounceTimer.current = setTimeout(() => {
      debounceTimer.current = null
      if (mounted.current && isForeground()) {
        void refreshInternal(false)
      }
    }, REFRESH_DEBOUNCE_MS)
  }, [isForeground, refreshInternal])

  useEffect(() => {
    mounted.current = true
    hasStateRef.current = false
    terminalErrorRef.current = false

    void refreshInternal(true)

    const client = supabaseBrowser()
    if (!client) {
      return () => {
        mounted.current = false
        invalidateInFlight()
      }
    }

    let channel: ReturnType<typeof client.channel> | null = null
    let resubscribeTimer: ReturnType<typeof setTimeout> | null = null
    let channelEpoch = 0

    const clearResubscribeTimer = () => {
      if (resubscribeTimer) {
        clearTimeout(resubscribeTimer)
        resubscribeTimer = null
      }
    }

    const subscribeChannel = () => {
      if (!mounted.current) return
      clearResubscribeTimer()
      const currentChannelEpoch = ++channelEpoch
      if (channel) {
        void client.removeChannel(channel)
        channel = null
      }
      if (!client.realtime.isConnected() && !client.realtime.isConnecting()) {
        client.realtime.connect()
      }

      const nextChannel = client
        .channel(`room:${roomId}`)
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'rooms', filter: `id=eq.${roomId}` },
          scheduleRefresh,
        )
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'players', filter: `room_id=eq.${roomId}` },
          scheduleRefresh,
        )
        .subscribe((status) => {
          if (!mounted.current || currentChannelEpoch !== channelEpoch) return
          const isSubscribed = status === 'SUBSCRIBED'
          realtimeConnectedRef.current = isSubscribed
          setRealtimeConnected(isSubscribed)

          if (status === 'CHANNEL_ERROR' || status === 'TIMED_OUT' || status === 'CLOSED') {
            if (isForeground() && !resubscribeTimer) {
              resubscribeTimer = setTimeout(() => {
                resubscribeTimer = null
                subscribeChannel()
              }, REALTIME_RETRY_MS)
            }
          }
        })

      channel = nextChannel
    }

    ensureRealtimeRef.current = (forceResubscribe = false) => {
      if (!mounted.current) return
      if (forceResubscribe || !realtimeConnectedRef.current || !client.realtime.isConnected()) {
        subscribeChannel()
      }
    }

    subscribeChannel()

    return () => {
      mounted.current = false
      channelEpoch += 1
      ensureRealtimeRef.current = null
      realtimeConnectedRef.current = false
      clearResubscribeTimer()
      invalidateInFlight()
      if (channel) {
        void client.removeChannel(channel)
        channel = null
      }
    }
  }, [invalidateInFlight, isForeground, refreshInternal, roomId, scheduleRefresh])

  // Emniyet ağı & Canlı Senkronizasyon: lobide, oyunda, aktif oylamada ve Realtime kesintilerinde düzenli yenile.
  useEffect(() => {
    const intervalMs = getPollIntervalMs(state?.room.status, state?.room.activeVote?.status)
    const interval = setInterval(poll, intervalMs)
    return () => clearInterval(interval)
  }, [state?.room.status, state?.room.activeVote?.status, poll])

  // Telefonda sekme/uygulama arka plandayken tarayıcı zamanlayıcıları ve WebSocket'i
  // uyutur; geri dönüldüğünde bayat isteği iptal edip hemen tazele ve Realtime'ı uyandır.
  useEffect(() => {
    const markBackgrounded = () => {
      if (backgroundedAtRef.current === null) {
        backgroundedAtRef.current = Date.now()
      }
      invalidateInFlight()
    }

    const resumeNow = () => {
      if (!mounted.current || !isForeground()) return
      const now = Date.now()
      // Aynı dönüşte visibilitychange + appStateChange + pageshow peş peşe ateşlenebilir;
      // az önce başlatılmış taze dönüş isteğini iptal etmemek için kısa süreli birleştir.
      if (now - lastResumeAtRef.current < RESUME_THROTTLE_MS) return
      lastResumeAtRef.current = now

      const backgroundDurationMs =
        backgroundedAtRef.current === null ? 0 : Math.max(0, now - backgroundedAtRef.current)
      backgroundedAtRef.current = null

      invalidateInFlight()
      ensureRealtimeRef.current?.(backgroundDurationMs >= REALTIME_STALE_BACKGROUND_MS)
      void refreshInternal(true)
    }

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        markBackgrounded()
        return
      }
      appActiveRef.current = true
      resumeNow()
    }

    const onPageShow = () => {
      appActiveRef.current = true
      resumeNow()
    }

    const onOnline = () => {
      resumeNow()
    }

    const onFocus = () => {
      if (!mounted.current || !isForeground()) return
      ensureRealtimeRef.current?.(false)
      if (!inFlight.current) {
        scheduleRefresh()
      }
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    window.addEventListener('online', onOnline)
    window.addEventListener('pageshow', onPageShow)
    window.addEventListener('focus', onFocus)

    let appStateHandle: PluginListenerHandle | null = null
    let resumeHandle: PluginListenerHandle | null = null
    let listenerCancelled = false

    if (isNativeApp()) {
      void import('@capacitor/app')
        .then(async ({ App }) => {
          if (listenerCancelled || !mounted.current) return
          const [stateListener, resumeListener] = await Promise.all([
            App.addListener('appStateChange', ({ isActive }) => {
              appActiveRef.current = isActive
              if (!isActive) {
                markBackgrounded()
                return
              }
              resumeNow()
            }),
            App.addListener('resume', () => {
              appActiveRef.current = true
              resumeNow()
            }),
          ])
          if (listenerCancelled || !mounted.current) {
            void stateListener.remove()
            void resumeListener.remove()
            return
          }
          appStateHandle = stateListener
          resumeHandle = resumeListener
        })
        .catch(() => {
          // Web veya eklenti yüklenemediğinde DOM olaylarıyla devam et.
        })
    }

    return () => {
      listenerCancelled = true
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('online', onOnline)
      window.removeEventListener('pageshow', onPageShow)
      window.removeEventListener('focus', onFocus)
      if (appStateHandle) void appStateHandle.remove()
      if (resumeHandle) void resumeHandle.remove()
    }
  }, [invalidateInFlight, isForeground, refreshInternal, scheduleRefresh])

  return {
    state,
    phase,
    error,
    degraded: !realtimeConnected || reconnecting,
    reconnecting,
    lastSyncedAt,
    lastSyncLatencyMs,
    refresh,
  }
}

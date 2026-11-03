'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

import { ApiClientError, apiRequest } from './apiClient'
import type { GameState } from './game/types'
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

const FALLBACK_POLL_MS = 5000
const REFRESH_DEBOUNCE_MS = 120

export type GameStatePhase = 'loading' | 'ready' | 'error'

export interface UseGameStateResult {
  state: GameState | null
  phase: GameStatePhase
  error: ApiClientError | null
  /** Realtime bağlıysa false; kullanıcıya "bağlantı zayıf" göstergesi için. */
  degraded: boolean
  refresh: () => Promise<void>
}

export function useGameState(roomId: string): UseGameStateResult {
  const [state, setState] = useState<GameState | null>(null)
  const [phase, setPhase] = useState<GameStatePhase>('loading')
  const [error, setError] = useState<ApiClientError | null>(null)
  const [realtimeConnected, setRealtimeConnected] = useState(false)

  const mounted = useRef(true)
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const refresh = useCallback(async () => {
    try {
      const next = await apiRequest<GameState>(`/api/rooms/${roomId}/state`)
      if (!mounted.current) return
      setState(next)
      setError(null)
      setPhase('ready')
    } catch (caught) {
      if (!mounted.current) return
      if (caught instanceof DOMException && caught.name === 'AbortError') return
      setError(
        caught instanceof ApiClientError
          ? caught
          : new ApiClientError('unknown_error', 'Beklenmeyen bir hata oluştu.', 0),
      )
      setPhase('error')
    }
  }, [roomId])

  const scheduleRefresh = useCallback(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    debounceTimer.current = setTimeout(() => void refresh(), REFRESH_DEBOUNCE_MS)
  }, [refresh])

  useEffect(() => {
    mounted.current = true

    // refresh() ilk satırında await ettiği için senkron setState çağırmaz; kural
    // async fonksiyonun içini izleyemediği için burada yanlış pozitif veriyor.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void refresh()

    const client = supabaseBrowser()
    if (!client) return () => { mounted.current = false }

    const channel = client
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
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'question_votes', filter: `room_id=eq.${roomId}` },
        scheduleRefresh,
      )
      .subscribe((status) => {
        if (!mounted.current) return
        setRealtimeConnected(status === 'SUBSCRIBED')
      })

    return () => {
      mounted.current = false
      if (debounceTimer.current) clearTimeout(debounceTimer.current)
      void client.removeChannel(channel)
    }
  }, [roomId, refresh, scheduleRefresh])

  // Emniyet ağı & Canlı Senkronizasyon: lobide, oyunda, aktif oylamada ve Realtime kesintilerinde düzenli yenile.
  useEffect(() => {
    const isWaiting = state?.room.status === 'waiting'
    const isPlaying = state?.room.status === 'playing'
    const hasActiveVote = state?.room.activeVote?.status === 'open'
    const intervalMs = hasActiveVote ? 1000 : isWaiting ? 2000 : isPlaying ? 2000 : FALLBACK_POLL_MS
    const interval = setInterval(() => void refresh(), intervalMs)
    return () => clearInterval(interval)
  }, [state?.room.status, state?.room.activeVote?.status, refresh])

  // Telefonda sekme/uygulama arka plandayken tarayıcı zamanlayıcıları ve WebSocket'i
  // uyutur; geri dönüldüğünde bir sonraki poll'u beklemeden hemen tazele.
  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === 'visible') scheduleRefresh()
    }
    document.addEventListener('visibilitychange', onVisible)
    window.addEventListener('online', scheduleRefresh)
    window.addEventListener('pageshow', scheduleRefresh)
    return () => {
      document.removeEventListener('visibilitychange', onVisible)
      window.removeEventListener('online', scheduleRefresh)
      window.removeEventListener('pageshow', scheduleRefresh)
    }
  }, [scheduleRefresh])


  return { state, phase, error, degraded: !realtimeConnected, refresh }
}

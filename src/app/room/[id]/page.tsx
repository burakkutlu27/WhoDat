'use client'

import { Check, Clock, Crown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'

import { ApiClientError, apiRequest } from '@/lib/apiClient'
import type { SubmitNamesResult } from '@/lib/game/types'
import { useGameState } from '@/lib/useGameState'

const NAME_SLOTS = 3

export default function RoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: roomId } = use(params)
  const router = useRouter()
  const { state, phase, error, degraded, refresh } = useGameState(roomId)

  const [names, setNames] = useState<string[]>(Array(NAME_SLOTS).fill(''))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isStarting, setIsStarting] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)
  const [duplicates, setDuplicates] = useState<string[]>([])

  const status = state?.room.status

  // Oyun durumu değiştiğinde doğru ekrana yönlendir.
  useEffect(() => {
    if (!status) return
    if (status === 'playing') router.replace(`/game/${roomId}`)
    else if (status === 'finished') router.replace(`/scores/${roomId}`)
    else if (status === 'closed') router.replace('/')
  }, [status, roomId, router])

  // Oturum yoksa oyuncu bu odaya ait değildir.
  useEffect(() => {
    if (error?.status === 401 || error?.code === 'wrong_room' || error?.code === 'player_not_in_room') {
      router.replace('/')
    }
  }, [error, router])

  const handleSubmitNames = async () => {
    const filled = names.map((name) => name.trim()).filter(Boolean)
    if (filled.length === 0) {
      setActionError('En az bir isim girmelisiniz.')
      return
    }

    setIsSubmitting(true)
    setActionError(null)
    setDuplicates([])

    try {
      const result = await apiRequest<SubmitNamesResult>(`/api/rooms/${roomId}/names`, {
        method: 'POST',
        body: { names: filled },
      })
      setDuplicates(result.duplicates)
      setNames(Array(NAME_SLOTS).fill(''))
      await refresh()
    } catch (caught) {
      setActionError(caught instanceof ApiClientError ? caught.message : 'İsimler kaydedilemedi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleStart = async () => {
    setIsStarting(true)
    setActionError(null)
    try {
      await apiRequest(`/api/rooms/${roomId}/start`, { method: 'POST' })
      router.push(`/game/${roomId}`)
    } catch (caught) {
      setActionError(caught instanceof ApiClientError ? caught.message : 'Oyun başlatılamadı.')
      setIsStarting(false)
    }
  }

  const handleLeave = async () => {
    try {
      await apiRequest(`/api/rooms/${roomId}/leave`, { method: 'POST' })
    } finally {
      router.push('/')
    }
  }

  if (phase === 'loading') {
    return <RoomSkeleton />
  }

  if (phase === 'error' || !state) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <div className="max-w-md text-center">
          <h1 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Oda açılamadı</h1>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            {error?.message ?? 'Oda bilgileri yüklenemedi.'}
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => void refresh()}
              className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              Tekrar dene
            </button>
            <button
              onClick={() => router.push('/')}
              className="rounded-xl bg-gray-100 px-6 py-3 font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200"
            >
              Ana sayfa
            </button>
          </div>
        </div>
      </div>
    )
  }

  const hasSubmitted = state.you.submittedNames.length > 0

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 p-4 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl space-y-6">
        <header className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
                Bekleme odası
              </h1>
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-blue-50 px-3 py-1 font-mono text-lg tracking-widest text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                  {state.room.roomCode}
                </span>
                <span className="text-gray-600 dark:text-gray-300">
                  {state.players.length} oyuncu
                </span>
                {degraded && (
                  <span className="text-sm text-amber-600 dark:text-amber-400">
                    Canlı bağlantı kurulamadı, güncellemeler gecikebilir
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => void handleLeave()}
              className="rounded-xl bg-gray-100 px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Odadan çık
            </button>
          </div>
        </header>

        {!hasSubmitted && (
          <section className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800">
            <h2 className="mb-1 text-xl font-bold text-gray-900 dark:text-white">
              İsimlerinizi girin
            </h2>
            <p className="mb-6 text-gray-600 dark:text-gray-300">
              En fazla {NAME_SLOTS} isim yazın: ünlü, film karakteri, ortak tanıdık...
            </p>

            <div className="space-y-4">
              {names.map((name, index) => (
                <div key={index}>
                  <label
                    htmlFor={`name-${index}`}
                    className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    İsim {index + 1}
                  </label>
                  <input
                    id={`name-${index}`}
                    type="text"
                    value={name}
                    maxLength={60}
                    disabled={isSubmitting}
                    onChange={(event) => {
                      const next = [...names]
                      next[index] = event.target.value
                      setNames(next)
                    }}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:opacity-60 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              ))}
            </div>

            {actionError && (
              <div
                role="alert"
                className="mt-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300"
              >
                {actionError}
              </div>
            )}

            <button
              onClick={() => void handleSubmitNames()}
              disabled={isSubmitting || names.every((name) => !name.trim())}
              className="mt-6 w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {isSubmitting ? 'Kaydediliyor...' : 'İsimleri gönder'}
            </button>
          </section>
        )}

        {hasSubmitted && (
          <section className="rounded-2xl border border-green-200 bg-green-50 p-5 dark:border-green-800 dark:bg-green-900/20">
            <h2 className="mb-3 font-semibold text-green-800 dark:text-green-300">
              İsimleriniz kaydedildi
            </h2>
            <ul className="flex flex-wrap gap-2">
              {state.you.submittedNames.map((name) => (
                <li
                  key={name}
                  className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-800 dark:bg-green-800/50 dark:text-green-200"
                >
                  {name}
                </li>
              ))}
            </ul>
            {duplicates.length > 0 && (
              <p className="mt-3 text-sm text-amber-700 dark:text-amber-400">
                Şunlar bu odada zaten yazılmıştı, atlandı: {duplicates.join(', ')}
              </p>
            )}
          </section>
        )}

        <section className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
            Oyuncular ({state.players.length})
          </h2>

          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {state.players.map((player) => {
              const isYou = player.id === state.you.playerId
              return (
                <li
                  key={player.id}
                  className={`flex items-center justify-between rounded-xl border p-4 ${
                    isYou
                      ? 'border-blue-400 bg-blue-50 dark:border-blue-600 dark:bg-blue-900/20'
                      : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700/40'
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-2">
                    {player.isHost && (
                      <Crown className="h-4 w-4 shrink-0 text-amber-500" aria-label="Oda sahibi" />
                    )}
                    <span className="truncate font-medium text-gray-900 dark:text-white">
                      {player.nickname}
                    </span>
                    {isYou && (
                      <span className="shrink-0 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                        Sen
                      </span>
                    )}
                  </div>

                  {player.hasSubmittedNames ? (
                    <span className="flex shrink-0 items-center gap-1 text-sm text-green-700 dark:text-green-400">
                      <Check className="h-4 w-4" aria-hidden="true" />
                      Hazır
                    </span>
                  ) : (
                    <span className="flex shrink-0 items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <Clock className="h-4 w-4" aria-hidden="true" />
                      Bekleniyor
                    </span>
                  )}
                </li>
              )
            })}
          </ul>
        </section>

        <section className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800">
          {state.you.isHost ? (
            <>
              <button
                onClick={() => void handleStart()}
                disabled={isStarting || !state.canStart}
                className="w-full rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {isStarting ? 'Başlatılıyor...' : 'Oyunu başlat'}
              </button>
              <p className="mt-3 text-center text-sm text-gray-600 dark:text-gray-400" aria-live="polite">
                {state.players.length < 2
                  ? 'Oyunu başlatmak için en az 2 oyuncu gerekli.'
                  : !state.allPlayersSubmittedNames
                    ? 'Tüm oyuncuların isimlerini göndermesi bekleniyor.'
                    : 'Herkes hazır, oyunu başlatabilirsiniz.'}
              </p>
            </>
          ) : (
            <p className="text-center text-gray-600 dark:text-gray-300" aria-live="polite">
              Oda sahibinin oyunu başlatması bekleniyor. Başladığında otomatik yönlendirileceksiniz.
            </p>
          )}
        </section>
      </div>
    </div>
  )
}

function RoomSkeleton() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 p-4 dark:bg-gray-900">
      <div className="mx-auto max-w-4xl space-y-6" aria-busy="true" aria-label="Oda yükleniyor">
        <div className="h-28 animate-pulse rounded-2xl bg-white dark:bg-gray-800" />
        <div className="h-64 animate-pulse rounded-2xl bg-white dark:bg-gray-800" />
        <div className="h-40 animate-pulse rounded-2xl bg-white dark:bg-gray-800" />
      </div>
    </div>
  )
}

'use client'

import { Crown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'

import { ApiClientError, apiRequest } from '@/lib/apiClient'
import { useGameState } from '@/lib/useGameState'

export default function RoomScoresPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: roomId } = use(params)
  const router = useRouter()
  const { state, phase, error, refresh } = useGameState(roomId)

  const [isBusy, setIsBusy] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)

  const status = state?.room.status

  // Oda sahibi yeni tur başlattığında herkes bekleme odasına döner.
  useEffect(() => {
    if (status === 'waiting') router.replace(`/room/${roomId}`)
    else if (status === 'playing') router.replace(`/game/${roomId}`)
    else if (status === 'closed') router.replace('/')
  }, [status, roomId, router])

  useEffect(() => {
    if (error?.status === 401 || error?.code === 'wrong_room' || error?.code === 'player_not_in_room') {
      router.replace('/')
    }
  }, [error, router])

  const handlePlayAgain = async () => {
    setIsBusy(true)
    setActionError(null)
    try {
      await apiRequest(`/api/rooms/${roomId}/reset`, { method: 'POST' })
      router.push(`/room/${roomId}`)
    } catch (caught) {
      setActionError(
        caught instanceof ApiClientError ? caught.message : 'Yeni tur başlatılamadı.',
      )
      setIsBusy(false)
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
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50 p-4 dark:bg-gray-900">
        <div className="mx-auto max-w-3xl space-y-6" aria-busy="true" aria-label="Sonuçlar yükleniyor">
          <div className="h-32 animate-pulse rounded-2xl bg-white dark:bg-gray-800" />
          <div className="h-72 animate-pulse rounded-2xl bg-white dark:bg-gray-800" />
        </div>
      </div>
    )
  }

  if (phase === 'error' || !state) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <div className="max-w-md text-center">
          <h1 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            Sonuçlar açılamadı
          </h1>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            {error?.message ?? 'Sonuç bilgileri yüklenemedi.'}
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

  const standings = [...state.players].sort((a, b) => b.score - a.score)
  const topScore = standings[0]?.score ?? 0
  // Beraberlikte birden fazla kazanan olabilir.
  const winners = standings.filter((player) => player.score === topScore && topScore > 0)

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 p-4 dark:bg-gray-900">
      <div className="mx-auto max-w-3xl space-y-6">
        <header className="rounded-2xl bg-white p-6 text-center shadow-sm dark:bg-gray-800">
          <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">Oyun bitti</h1>
          {winners.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300">Bu turda kimse puan alamadı.</p>
          ) : winners.length === 1 ? (
            <p className="text-gray-600 dark:text-gray-300">
              <span className="font-semibold text-gray-900 dark:text-white">
                {winners[0]!.nickname}
              </span>{' '}
              {topScore} puanla kazandı.
            </p>
          ) : (
            <p className="text-gray-600 dark:text-gray-300">
              Beraberlik: {winners.map((winner) => winner.nickname).join(', ')} — {topScore} puan.
            </p>
          )}
          <p className="mt-3 font-mono text-sm tracking-widest text-gray-500 dark:text-gray-400">
            {state.room.roomCode}
          </p>
        </header>

        <section className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Puan tablosu</h2>
          <ol className="space-y-3">
            {standings.map((player, index) => {
              const isYou = player.id === state.you.playerId
              return (
                <li
                  key={player.id}
                  className={`flex items-center gap-4 rounded-xl border p-4 ${
                    isYou
                      ? 'border-blue-400 bg-blue-50 dark:border-blue-600 dark:bg-blue-900/20'
                      : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700/40'
                  }`}
                >
                  <span className="w-8 shrink-0 text-center text-lg font-bold text-gray-500 dark:text-gray-400">
                    {index + 1}
                  </span>
                  <div className="flex min-w-0 flex-1 items-center gap-2">
                    {player.isHost && (
                      <Crown className="h-4 w-4 shrink-0 text-amber-500" aria-label="Oda sahibi" />
                    )}
                    <span className="truncate font-semibold text-gray-900 dark:text-white">
                      {player.nickname}
                    </span>
                    {isYou && (
                      <span className="shrink-0 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                        Sen
                      </span>
                    )}
                  </div>
                  <span className="shrink-0 text-xl font-bold text-gray-900 dark:text-white">
                    {player.score}
                  </span>
                </li>
              )
            })}
          </ol>
        </section>

        {actionError && (
          <div
            role="alert"
            className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300"
          >
            {actionError}
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          {state.you.isHost && (
            <button
              onClick={() => void handlePlayAgain()}
              disabled={isBusy}
              className="flex-1 rounded-xl bg-green-600 px-6 py-3 font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              {isBusy ? 'Hazırlanıyor...' : 'Yeni tur'}
            </button>
          )}
          <button
            onClick={() => void handleLeave()}
            className="flex-1 rounded-xl bg-gray-100 px-6 py-3 font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
          >
            Odadan çık
          </button>
        </div>

        {!state.you.isHost && (
          <p className="text-center text-sm text-gray-600 dark:text-gray-400" aria-live="polite">
            Oda sahibi yeni bir tur başlatabilir.
          </p>
        )}
      </div>
    </div>
  )
}

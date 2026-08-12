'use client'

import { Crown, Target } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'

import { ApiClientError, apiRequest } from '@/lib/apiClient'
import type { GuessResult } from '@/lib/game/types'
import { useGameState } from '@/lib/useGameState'

type Feedback = { tone: 'success' | 'error'; text: string }

export default function GamePage({ params }: { params: Promise<{ id: string }> }) {
  const { id: roomId } = use(params)
  const router = useRouter()
  const { state, phase, error, degraded, refresh } = useGameState(roomId)

  const [guess, setGuess] = useState('')
  const [isBusy, setIsBusy] = useState(false)
  const [feedback, setFeedback] = useState<Feedback | null>(null)

  const status = state?.room.status

  useEffect(() => {
    if (!status) return
    if (status === 'waiting') router.replace(`/room/${roomId}`)
    else if (status === 'finished') router.replace(`/scores/${roomId}`)
    else if (status === 'closed') router.replace('/')
  }, [status, roomId, router])

  useEffect(() => {
    if (error?.status === 401 || error?.code === 'wrong_room' || error?.code === 'player_not_in_room') {
      router.replace('/')
    }
  }, [error, router])

  // Sıra başkasına geçtiğinde eski geri bildirim ekranda kalmasın.
  // Effect yerine render sırasında düzeltiliyor: böylece ekrana önce eski mesajla
  // boyanıp ardından ikinci bir render ile temizlenmiyor.
  const currentPlayerId = state?.room.currentPlayerId ?? null
  const [turnShown, setTurnShown] = useState(currentPlayerId)
  if (turnShown !== currentPlayerId) {
    setTurnShown(currentPlayerId)
    setFeedback(null)
    setGuess('')
  }

  const handleGuess = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!guess.trim() || isBusy) return

    setIsBusy(true)
    try {
      const result = await apiRequest<GuessResult>(`/api/rooms/${roomId}/guess`, {
        method: 'POST',
        body: { guess: guess.trim() },
      })

      if (result.correct) {
        setFeedback({ tone: 'success', text: result.message })
        setGuess('')
        await refresh()
      } else {
        setFeedback({ tone: 'error', text: result.message })
      }
    } catch (caught) {
      setFeedback({
        tone: 'error',
        text: caught instanceof ApiClientError ? caught.message : 'Tahmin gönderilemedi.',
      })
      await refresh()
    } finally {
      setIsBusy(false)
    }
  }

  const handlePass = async () => {
    if (isBusy) return
    setIsBusy(true)
    try {
      await apiRequest(`/api/rooms/${roomId}/pass`, { method: 'POST' })
      setGuess('')
      await refresh()
    } catch (caught) {
      setFeedback({
        tone: 'error',
        text: caught instanceof ApiClientError ? caught.message : 'Sıra geçilemedi.',
      })
      await refresh()
    } finally {
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
        <div className="mx-auto max-w-5xl space-y-6" aria-busy="true" aria-label="Oyun yükleniyor">
          <div className="h-24 animate-pulse rounded-2xl bg-white dark:bg-gray-800" />
          <div className="h-80 animate-pulse rounded-2xl bg-white dark:bg-gray-800" />
        </div>
      </div>
    )
  }

  if (phase === 'error' || !state) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <div className="max-w-md text-center">
          <h1 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">Oyun açılamadı</h1>
          <p className="mb-6 text-gray-600 dark:text-gray-300">
            {error?.message ?? 'Oyun bilgileri yüklenemedi.'}
          </p>
          <button
            onClick={() => void refresh()}
            className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            Tekrar dene
          </button>
        </div>
      </div>
    )
  }

  const currentPlayer = state.players.find((player) => player.id === state.room.currentPlayerId)

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50 p-4 dark:bg-gray-900">
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">KimBu</h1>
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="rounded-full bg-blue-50 px-3 py-1 font-mono tracking-widest text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                  {state.room.roomCode}
                </span>
                <span className="text-gray-600 dark:text-gray-300">Tur {state.room.gameRound}</span>
                <span className="text-gray-600 dark:text-gray-300">
                  {state.namesRemaining} isim kaldı
                </span>
                {degraded && (
                  <span className="text-amber-600 dark:text-amber-400">Canlı bağlantı yok</span>
                )}
              </div>
            </div>
            <button
              onClick={() => void handleLeave()}
              className="rounded-xl bg-gray-100 px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
            >
              Oyundan çık
            </button>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <main className="lg:col-span-2">
            <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8 dark:bg-gray-800">
              <div className="mb-8 text-center">
                <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {state.you.isYourTurn
                    ? 'Senin sıran'
                    : `${currentPlayer?.nickname ?? 'Oyuncu'} tahmin ediyor`}
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  {state.you.isYourTurn
                    ? 'Diğer oyunculara evet/hayır soruları sor, sonra tahminini yaz.'
                    : 'Sorulara yalnızca evet ya da hayır diye cevap verin.'}
                </p>
              </div>

              {state.you.isYourTurn ? (
                <form onSubmit={handleGuess} className="mx-auto max-w-md space-y-4">
                  <div>
                    <label
                      htmlFor="guess"
                      className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                      Tahminin
                    </label>
                    <input
                      id="guess"
                      type="text"
                      value={guess}
                      onChange={(event) => setGuess(event.target.value)}
                      placeholder="Kim olduğunu yaz..."
                      maxLength={60}
                      autoComplete="off"
                      disabled={isBusy}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 text-center text-lg focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:opacity-60 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    />
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      type="submit"
                      disabled={isBusy || !guess.trim()}
                      className="flex-1 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400"
                    >
                      {isBusy ? 'Gönderiliyor...' : 'Tahmin et'}
                    </button>
                    <button
                      type="button"
                      onClick={() => void handlePass()}
                      disabled={isBusy}
                      className="rounded-xl bg-gray-100 px-6 py-3 font-medium text-gray-700 hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                    >
                      Pas geç
                    </button>
                  </div>
                </form>
              ) : (
                state.currentName && (
                  <div className="mx-auto max-w-md rounded-xl border border-green-200 bg-green-50 p-5 text-center dark:border-green-800 dark:bg-green-900/20">
                    <p className="mb-1 text-sm font-medium text-green-700 dark:text-green-400">
                      {currentPlayer?.nickname ?? 'Sıradaki oyuncu'} bunu bulmaya çalışıyor
                    </p>
                    <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                      {state.currentName}
                    </p>
                  </div>
                )
              )}

              <div aria-live="polite" className="mt-6 min-h-[3rem]">
                {feedback && (
                  <p
                    className={`mx-auto max-w-md rounded-xl border p-4 text-center text-sm ${
                      feedback.tone === 'success'
                        ? 'border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300'
                        : 'border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300'
                    }`}
                  >
                    {feedback.text}
                  </p>
                )}
              </div>
            </div>
          </main>

          <aside className="lg:col-span-1">
            <div className="rounded-2xl bg-white p-6 shadow-sm dark:bg-gray-800">
              <h2 className="mb-4 text-lg font-bold text-gray-900 dark:text-white">
                Oyuncular ({state.players.length})
              </h2>
              <ul className="space-y-3">
                {state.players.map((player) => {
                  const isCurrent = player.id === state.room.currentPlayerId
                  const isYou = player.id === state.you.playerId
                  return (
                    <li
                      key={player.id}
                      className={`flex items-center justify-between rounded-xl border p-3 ${
                        isCurrent
                          ? 'border-amber-400 bg-amber-50 dark:border-amber-600 dark:bg-amber-900/20'
                          : 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-700/40'
                      }`}
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        {isCurrent && (
                          <Target className="h-4 w-4 shrink-0 text-amber-600" aria-label="Sırası" />
                        )}
                        {player.isHost && !isCurrent && (
                          <Crown className="h-4 w-4 shrink-0 text-amber-500" aria-label="Oda sahibi" />
                        )}
                        <span className="truncate text-sm font-medium text-gray-900 dark:text-white">
                          {player.nickname}
                        </span>
                        {isYou && (
                          <span className="shrink-0 rounded-full bg-blue-100 px-2 py-0.5 text-xs text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">
                            Sen
                          </span>
                        )}
                      </div>
                      <span className="shrink-0 text-sm font-semibold text-gray-700 dark:text-gray-200">
                        {player.score}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

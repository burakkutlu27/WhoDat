'use client'

import { Crown, Gamepad2, HelpCircle, Loader2, LogOut, Send, SkipForward, Target, Trophy } from 'lucide-react'
import { motion } from 'motion/react'
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
      <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
        <div className="mx-auto max-w-5xl space-y-6" aria-busy="true" aria-label="Oyun yükleniyor">
          <div className="h-24 animate-pulse rounded-3xl bg-white/70 dark:bg-[#151D2A]/70" />
          <div className="h-80 animate-pulse rounded-3xl bg-white/70 dark:bg-[#151D2A]/70" />
        </div>
      </div>
    )
  }

  if (phase === 'error' || !state) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <div className="max-w-md text-center">
          <h1 className="mb-2 font-display text-xl font-bold text-slate-900 dark:text-white">Oyun Açılamadı</h1>
          <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
            {error?.message ?? 'Oyun bilgileri yüklenemedi.'}
          </p>
          <button
            onClick={() => void refresh()}
            className="rounded-xl bg-indigo-600 px-6 py-3 font-display font-semibold text-white hover:bg-indigo-500"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    )
  }

  const currentPlayer = state.players.find((player) => player.id === state.room.currentPlayerId)

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Game Header Bar */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xl shadow-slate-200/40 backdrop-blur-xl dark:border-slate-800/80 dark:bg-[#151D2A]/90 dark:shadow-indigo-950/20"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-xl font-black text-slate-900 dark:text-white">KimBu</span>
                <span className="rounded-lg border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 font-mono text-xs font-bold text-indigo-700 dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-300">
                  {state.room.roomCode}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-3 text-xs font-semibold text-slate-600 dark:text-slate-400">
                <span className="rounded-full bg-slate-100 px-2.5 py-1 dark:bg-slate-800 dark:text-slate-300">
                  Tur {state.room.gameRound}
                </span>
                <span className="rounded-full bg-slate-100 px-2.5 py-1 dark:bg-slate-800 dark:text-slate-300">
                  {state.namesRemaining} İsim Kaldı
                </span>
                {degraded && <span className="text-amber-500">Canlı bağlantı yok</span>}
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => void handleLeave()}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-100/80 px-4 py-2.5 font-display text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200/80 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <LogOut className="h-4 w-4" />
              <span>Oyundan Çık</span>
            </motion.button>
          </div>
        </motion.header>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Play Arena */}
          <main className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`rounded-3xl border p-6 shadow-xl backdrop-blur-xl sm:p-8 transition-all ${
                state.you.isYourTurn
                  ? 'border-amber-400/80 bg-white/95 ring-2 ring-amber-400/30 dark:border-amber-500/60 dark:bg-[#151D2A]/95 dark:ring-amber-500/20'
                  : 'border-slate-200/80 bg-white/90 dark:border-slate-800/80 dark:bg-[#151D2A]/90'
              }`}
            >
              {/* Turn Banner */}
              <div className="mb-8 text-center">
                {state.you.isYourTurn ? (
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    className="inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-wider text-amber-700 shadow-sm dark:border-amber-800/60 dark:bg-amber-950/40 dark:text-amber-300"
                  >
                    <Gamepad2 className="h-3.5 w-3.5 text-amber-500" />
                    <span>SENİN SIRAN!</span>
                  </motion.div>
                ) : (
                  <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-xs font-semibold tracking-wider text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-300">
                    <Target className="h-3.5 w-3.5 text-indigo-500" />
                    <span>{currentPlayer?.nickname ?? 'Oyuncu'} Tahmin Ediyor</span>
                  </div>
                )}

                <h2 className="mt-4 font-display text-2xl font-black text-slate-900 sm:text-3xl dark:text-white">
                  {state.you.isYourTurn
                    ? 'Ben Kimim? Soru Sor & Tahmin Et!'
                    : `${currentPlayer?.nickname ?? 'Oyuncu'} İpucu Arıyor`}
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm text-slate-600 dark:text-slate-400">
                  {state.you.isYourTurn
                    ? 'Arkadaşlarına evet/hayır soruları sor. Emin olduğunda tahminini yaz!'
                    : 'Sana sorulan sorulara dürüstçe yalnızca evet veya hayır deyin.'}
                </p>
              </div>

              {/* Action Form or Secret Card */}
              {state.you.isYourTurn ? (
                <form onSubmit={handleGuess} className="mx-auto max-w-md space-y-4">
                  <div>
                    <label
                      htmlFor="guess"
                      className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                    >
                      Tahmininiz
                    </label>
                    <input
                      id="guess"
                      type="text"
                      value={guess}
                      onChange={(event) => setGuess(event.target.value)}
                      placeholder="Örn: Kemal Sunal"
                      maxLength={60}
                      autoComplete="off"
                      disabled={isBusy}
                      className="w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-center font-display text-lg font-bold text-slate-900 transition-all placeholder:text-slate-400 focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500/20 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900/80 dark:text-white dark:focus:border-amber-400"
                    />
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      disabled={isBusy || !guess.trim()}
                      className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 font-display text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none dark:disabled:bg-slate-800"
                    >
                      {isBusy ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <>
                          <Send className="h-4 w-4" />
                          <span>Tahmin Et</span>
                        </>
                      )}
                    </motion.button>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => void handlePass()}
                      disabled={isBusy}
                      className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100/80 px-6 py-3.5 font-display text-sm font-semibold text-slate-700 transition-all hover:bg-slate-200/80 disabled:opacity-60 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:bg-slate-800"
                    >
                      <SkipForward className="h-4 w-4" />
                      <span>Pas Geç</span>
                    </motion.button>
                  </div>
                </form>
              ) : (
                state.currentName && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mx-auto max-w-md rounded-2xl border border-emerald-200/80 bg-emerald-50/70 p-6 text-center shadow-inner dark:border-emerald-900/50 dark:bg-emerald-950/30"
                  >
                    <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                      GİZLİ KART (SADECE SİZ GÖRÜYORSUNUZ)
                    </span>
                    <p className="mt-2 font-display text-2xl font-black text-emerald-900 dark:text-emerald-200">
                      {state.currentName}
                    </p>
                    <p className="mt-2 text-xs text-emerald-700 dark:text-emerald-400">
                      {currentPlayer?.nickname ?? 'Sıradaki oyuncu'} bu ismi tahmin etmeye çalışıyor.
                    </p>
                  </motion.div>
                )
              )}

              {/* Guess Feedback Toast Notification */}
              <div aria-live="polite" className="mt-6 min-h-[3rem]">
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={
                      feedback.tone === 'error'
                        ? { opacity: 1, scale: 1, x: [0, -8, 8, -4, 4, 0] }
                        : { opacity: 1, scale: 1 }
                    }
                    transition={{ duration: 0.4 }}
                    className={`mx-auto max-w-md rounded-xl border p-4 text-center text-xs font-semibold ${
                      feedback.tone === 'success'
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-800 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-300'
                        : 'border-rose-200 bg-rose-50 text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300'
                    }`}
                  >
                    {feedback.text}
                  </motion.div>
                )}
              </div>
            </motion.div>
          </main>

          {/* Live Scoreboard Sidebar */}
          <aside className="lg:col-span-1">
            <div className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xl shadow-slate-200/40 backdrop-blur-xl dark:border-slate-800/80 dark:bg-[#151D2A]/90 dark:shadow-indigo-950/20">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display font-bold text-slate-900 dark:text-white">
                  Skor Tablosu
                </h3>
                <Trophy className="h-4 w-4 text-amber-500" />
              </div>

              <div className="space-y-2.5">
                {state.players.map((player) => {
                  const isCurrent = player.id === state.room.currentPlayerId
                  const isYou = player.id === state.you.playerId
                  const initial = player.nickname.charAt(0).toUpperCase()
                  return (
                    <motion.div
                      key={player.id}
                      layout
                      className={`flex items-center justify-between rounded-2xl border p-3 transition-all ${
                        isCurrent
                          ? 'border-amber-400 bg-amber-50/70 dark:border-amber-500/60 dark:bg-amber-950/30'
                          : 'border-slate-200/80 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40'
                      }`}
                    >
                      <div className="flex min-w-0 items-center gap-2.5">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-display text-xs font-bold text-white ${
                            isCurrent
                              ? 'bg-amber-500 shadow-sm'
                              : 'bg-slate-700 dark:bg-slate-800'
                          }`}
                        >
                          {initial}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            {isCurrent && (
                              <Target className="h-3.5 w-3.5 shrink-0 text-amber-600 dark:text-amber-400" aria-label="Sırası" />
                            )}
                            {player.isHost && !isCurrent && (
                              <Crown className="h-3.5 w-3.5 shrink-0 text-amber-500" aria-label="Oda Sahibi" />
                            )}
                            <span className="truncate font-display text-sm font-semibold text-slate-900 dark:text-white">
                              {player.nickname}
                            </span>
                            {isYou && (
                              <span className="shrink-0 rounded-full bg-indigo-100 px-1.5 py-0.5 text-[9px] font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                                SEN
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <span className="shrink-0 font-display text-base font-black text-slate-900 dark:text-white">
                        {player.score} <span className="text-[10px] font-normal text-slate-400">P</span>
                      </span>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}


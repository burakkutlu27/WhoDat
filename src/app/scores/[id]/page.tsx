'use client'

import { Crown, Loader2, LogOut, Medal, RefreshCw, Trophy } from 'lucide-react'
import { motion } from 'motion/react'
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
      <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
        <div className="mx-auto max-w-3xl space-y-6" aria-busy="true" aria-label="Sonuçlar yükleniyor">
          <div className="h-32 animate-pulse rounded-3xl bg-white/70 dark:bg-[#151D2A]/70" />
          <div className="h-72 animate-pulse rounded-3xl bg-white/70 dark:bg-[#151D2A]/70" />
        </div>
      </div>
    )
  }

  if (phase === 'error' || !state) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <div className="max-w-md text-center">
          <h1 className="mb-2 font-display text-xl font-bold text-slate-900 dark:text-white">
            Sonuçlar Açılamadı
          </h1>
          <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
            {error?.message ?? 'Sonuç bilgileri yüklenemedi.'}
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => void refresh()}
              className="rounded-xl bg-indigo-600 px-6 py-3 font-display font-semibold text-white hover:bg-indigo-500"
            >
              Tekrar Dene
            </button>
            <button
              onClick={() => router.push('/')}
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-display font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              Ana Sayfa
            </button>
          </div>
        </div>
      </div>
    )
  }

  const standings = [...state.players].sort((a, b) => b.score - a.score)
  const topScore = standings[0]?.score ?? 0
  const winners = standings.filter((player) => player.score === topScore && topScore > 0)

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Victory Header Card */}
        <motion.header
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-3xl border border-slate-200/80 bg-white/90 p-8 text-center shadow-xl shadow-slate-200/40 backdrop-blur-xl dark:border-slate-800/80 dark:bg-[#151D2A]/90 dark:shadow-indigo-950/20"
        >
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-100 text-amber-600 shadow-md dark:bg-amber-950/60 dark:text-amber-400">
            <Trophy className="h-8 w-8" />
          </div>

          <h1 className="font-display text-3xl font-black text-slate-900 dark:text-white">
            Oyun Bitti!
          </h1>

          {winners.length === 0 ? (
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
              Bu turda kimse puan alamadı.
            </p>
          ) : winners.length === 1 ? (
            <p className="mt-2 text-base text-slate-700 dark:text-slate-300">
              <span className="font-display font-black text-amber-600 dark:text-amber-400">
                {winners[0]!.nickname}
              </span>{' '}
              toplam <span className="font-bold text-slate-900 dark:text-white">{topScore} Puan</span> alarak şampiyon oldu!
            </p>
          ) : (
            <p className="mt-2 text-base text-slate-700 dark:text-slate-300">
              Beraberlik!{' '}
              <span className="font-display font-black text-amber-600 dark:text-amber-400">
                {winners.map((winner) => winner.nickname).join(', ')}
              </span>{' '}
              — {topScore} Puan
            </p>
          )}

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-1 font-mono text-xs font-bold tracking-widest text-slate-600 dark:border-slate-800 dark:bg-slate-900/60 dark:text-slate-400">
            Oda Kodu: {state.room.roomCode}
          </div>
        </motion.header>

        {/* Final Standings List */}
        <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xl shadow-slate-200/40 backdrop-blur-xl sm:p-8 dark:border-slate-800/80 dark:bg-[#151D2A]/90 dark:shadow-indigo-950/20">
          <h2 className="mb-6 font-display text-xl font-bold text-slate-900 dark:text-white">
            Final Puan Tablosu
          </h2>

          <ol className="space-y-3">
            {standings.map((player, index) => {
              const isYou = player.id === state.you.playerId
              const isWinner = index === 0 && player.score > 0
              return (
                <motion.li
                  key={player.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className={`flex items-center justify-between rounded-2xl border p-4 transition-all ${
                    isWinner
                      ? 'border-amber-300 bg-amber-50/60 shadow-md dark:border-amber-700/60 dark:bg-amber-950/30'
                      : isYou
                        ? 'border-indigo-300 bg-indigo-50/50 dark:border-indigo-700/60 dark:bg-indigo-950/20'
                        : 'border-slate-200/80 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40'
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-display text-base font-black ${
                        index === 0
                          ? 'bg-amber-500 text-white shadow-md'
                          : index === 1
                            ? 'bg-slate-400 text-white'
                            : index === 2
                              ? 'bg-amber-700 text-white'
                              : 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
                      }`}
                    >
                      {index === 0 ? <Medal className="h-5 w-5" /> : index + 1}
                    </div>

                    <div className="flex min-w-0 items-center gap-2">
                      {player.isHost && (
                        <Crown className="h-4 w-4 shrink-0 text-amber-500" aria-label="Oda Sahibi" />
                      )}
                      <span className="truncate font-display text-base font-bold text-slate-900 dark:text-white">
                        {player.nickname}
                      </span>
                      {isYou && (
                        <span className="shrink-0 rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                          SEN
                        </span>
                      )}
                    </div>
                  </div>

                  <span className="shrink-0 font-display text-xl font-black text-slate-900 dark:text-white">
                    {player.score} <span className="text-xs font-semibold text-slate-400">Puan</span>
                  </span>
                </motion.li>
              )
            })}
          </ol>
        </section>

        {actionError && (
          <div
            role="alert"
            className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-300"
          >
            {actionError}
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-col gap-3 sm:flex-row">
          {state.you.isHost && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => void handlePlayAgain()}
              disabled={isBusy}
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-600 py-3.5 font-display text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-all hover:bg-emerald-500 disabled:cursor-not-allowed disabled:bg-slate-400 dark:disabled:bg-slate-800"
            >
              {isBusy ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Hazırlanıyor...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4" />
                  <span>Yeni Tur Başlat</span>
                </>
              )}
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => void handleLeave()}
            className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100/80 py-3.5 font-display text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200/80 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            <LogOut className="h-4 w-4" />
            <span>Odadan Çık</span>
          </motion.button>
        </div>

        {!state.you.isHost && (
          <p className="text-center text-xs text-slate-500 dark:text-slate-400" aria-live="polite">
            Oda sahibinin yeni bir tur başlatması bekleniyor.
          </p>
        )}
      </div>
    </div>
  )
}


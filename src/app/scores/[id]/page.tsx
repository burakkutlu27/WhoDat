'use client'

import { Award, BarChart2, Check, Copy, Crown, Layers, Loader2, LogOut, Medal, RefreshCw, Trophy } from 'lucide-react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'

import Confetti from '@/components/Confetti'
import { ApiClientError, apiRequest } from '@/lib/apiClient'
import { CATEGORIES } from '@/lib/game/famousPeopleData'
import { useGameState } from '@/lib/useGameState'

export default function RoomScoresPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: roomId } = use(params)
  const router = useRouter()
  const { state, phase, error, refresh } = useGameState(roomId)

  const [isBusy, setIsBusy] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [copied, setCopied] = useState(false)

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

  useEffect(() => {
    if (phase === 'ready' && state) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowConfetti(true)
    }
  }, [phase, state])

  const handleCopyCode = async () => {
    if (!state?.room.roomCode) return
    try {
      await navigator.clipboard.writeText(state.room.roomCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

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
          <div className="h-32 animate-pulse rounded-xl border-2 border-dashed border-paper-border bg-paper-card" />
          <div className="h-72 animate-pulse rounded-xl border-2 border-dashed border-paper-border bg-paper-card" />
        </div>
      </div>
    )
  }

  if (phase === 'error' || !state) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <div className="max-w-md text-center">
          <h1 className="mb-2 font-display text-3xl font-bold text-ink">
            Sonuçlar Açılamadı
          </h1>
          <p className="mb-6 text-sm text-ink-faded">
            {error?.message ?? 'Sonuç bilgileri yüklenemedi.'}
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => void refresh()}
              className="btn-pencil-red px-6 py-3 font-display text-base"
            >
              Tekrar Dene
            </button>
            <button
              onClick={() => router.push('/')}
              className="btn-outline px-6 py-3 font-display text-base"
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
    <div className="relative min-h-[calc(100vh-4rem)] px-4 py-8">
      <Confetti trigger={showConfetti} />
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Victory Header Card */}
        <motion.header
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className="paper-card-lg p-8 text-center shadow-xl"
        >
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 15, delay: 0.2 }}
            className="mb-3 inline-block rounded-2xl border-2 border-paper-border bg-paper-card p-3 text-pencil-yellow shadow-md animate-trophy-bounce"
          >
            <Trophy className="h-12 w-12" />
          </motion.div>

          <h1 className="font-display text-5xl font-bold text-ink">
            Oyun Bitti!
          </h1>

          {winners.length === 0 ? (
            <p className="mt-2 text-sm text-ink-faded">
              Bu turda kimse puan alamadı.
            </p>
          ) : winners.length === 1 ? (
            <p className="mt-2 text-lg text-ink-faded">
              <span className="highlight-yellow font-display text-2xl font-bold text-pencil-yellow">
                {winners[0]!.nickname}
              </span>{' '}
              toplam <span className="font-bold text-ink">{topScore} Puan</span> alarak şampiyon oldu!
            </p>
          ) : (
            <p className="mt-2 text-lg text-ink-faded">
              Beraberlik!{' '}
              <span className="highlight-yellow font-display text-xl font-bold text-pencil-yellow">
                {winners.map((winner) => winner.nickname).join(', ')}
              </span>{' '}
              — {topScore} Puan
            </p>
          )}

          {/* Kategori ve Faz Özeti */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
            {state.room.categoryMode === 'multi_phase' ? (
              <span className="tag border-pencil-purple text-pencil-purple font-bold text-sm flex items-center gap-1.5">
                <Layers className="h-4 w-4" />
                <span>
                  3 Fazlı Oyun Tamamlandı:{' '}
                  {(state.room.phaseCategories || ['sporcular', 'cizgi_karakterler', 'tarihi_kisiler'])
                    .map((c) => `${CATEGORIES.find((cat) => cat.id === c)?.icon || ''} ${CATEGORIES.find((cat) => cat.id === c)?.label || c}`)
                    .join(' → ')}
                </span>
              </span>
            ) : (
              <span className="tag border-pencil-purple text-pencil-purple font-bold text-sm flex items-center gap-1.5">
                <Layers className="h-4 w-4" />
                <span>
                  Kategori:{' '}
                  {CATEGORIES.find((c) => c.id === (state.room.selectedCategory || 'all'))?.icon || '🎲'}{' '}
                  {CATEGORIES.find((c) => c.id === (state.room.selectedCategory || 'all'))?.label || 'Tümü'}
                </span>
              </span>
            )}
          </div>

          <div className="mt-5 flex justify-center">
            <button
              type="button"
              onClick={() => void handleCopyCode()}
              className="group relative inline-flex items-center gap-2 border-2 border-dashed border-pencil-red bg-paper-card px-5 py-2 font-mono text-base font-bold tracking-widest text-pencil-red transition-all hover:bg-pencil-red hover:text-white"
              style={{ borderRadius: '6px 10px 4px 12px' }}
            >
              <span>ODA KODU: {state.room.roomCode}</span>
              {copied ? (
                <Check className="h-4 w-4 text-pencil-green" />
              ) : (
                <Copy className="h-4 w-4 opacity-60 group-hover:opacity-100" />
              )}
              {copied && (
                <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 rounded bg-ink px-2.5 py-1 font-sans text-xs font-semibold text-paper-card shadow-md">
                  Kopyalandı!
                </span>
              )}
            </button>
          </div>
        </motion.header>

        {/* Final Standings List */}
        <section className="paper-card p-6 sm:p-8">
          <h2 className="mb-6 flex items-center gap-2 font-display text-3xl font-bold text-ink">
            <BarChart2 className="h-6 w-6 text-pencil-blue" />
            <span>Final Puan Tablosu</span>
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
                  className={`flex items-center justify-between border-2 p-4 transition-all ${
                    isWinner
                      ? 'border-solid border-pencil-yellow bg-paper-card shadow-sm'
                      : isYou
                        ? 'border-solid border-pencil-blue bg-paper-card'
                        : 'border-dashed border-paper-border bg-paper-card'
                  }`}
                  style={{ borderRadius: '10px 6px 12px 4px' }}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center font-display text-xl font-bold ${
                        index === 0
                          ? 'bg-pencil-yellow text-white'
                          : index === 1
                            ? 'bg-ink-faded text-white'
                            : index === 2
                              ? 'bg-pencil-orange text-white'
                              : 'bg-paper-card text-ink-faded border-2 border-dashed border-paper-border'
                      }`}
                      style={{ borderRadius: '8px 4px 10px 6px' }}
                    >
                      {index === 0 ? (
                        <Crown className="h-6 w-6 text-white" />
                      ) : index === 1 ? (
                        <Medal className="h-6 w-6 text-white" />
                      ) : index === 2 ? (
                        <Award className="h-6 w-6 text-white" />
                      ) : (
                        index + 1
                      )}
                    </div>

                    <div className="flex min-w-0 flex-col">
                      <div className="flex items-center gap-2">
                        {player.isHost && (
                          <Crown className="h-4 w-4 shrink-0 text-pencil-yellow" aria-label="Oda Sahibi" />
                        )}
                        <span className="truncate font-display text-2xl font-bold text-ink">
                          {player.nickname}
                        </span>
                        {isYou && (
                          <span className="tag tag-you text-xs">SEN</span>
                        )}
                      </div>

                      {/* Hız Modu Tur Kırılımı */}
                      {state.room.gameMode === 'speed' && player.roundScores && player.roundScores.length > 0 && (
                        <div className="mt-1 flex flex-wrap items-center gap-1.5 text-sm font-sans">
                          {player.roundScores.map((rScore, roundIdx) => (
                            <span
                              key={roundIdx}
                              className="rounded bg-paper-card-alt px-2 py-0.5 border border-paper-border text-xs text-ink-faded font-mono font-medium"
                            >
                              T{roundIdx + 1}: <strong className="text-ink">{rScore}P</strong>
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Ortak Hedef Modu Rolü */}
                      {state.room.gameMode === 'shared_target' && player.isHost && (
                        <div className="mt-1 text-sm font-sans font-bold text-pencil-orange flex items-center gap-1.5">
                          <Crown className="h-4 w-4" />
                          <span>Hakem (Hedefleri Belirleyen & Yanıtlayan)</span>
                        </div>
                      )}

                      {/* Israrcı Mod Durum Özeti */}
                      {state.room.gameMode === 'persistent' && (
                        <div className="mt-1 flex items-center gap-2 text-sm font-sans">
                          {player.nameSolved ? (
                            <span className="text-pencil-green font-bold flex items-center gap-1">
                              <Check className="h-4 w-4" />
                              <span>İsim Çözüldü</span>
                              {typeof player.questionBudgetRemaining === 'number' && (
                                <span className="text-ink-faded font-normal">
                                  ({10 - player.questionBudgetRemaining} soru ile)
                                </span>
                              )}
                            </span>
                          ) : (
                            <span className="text-pencil-red font-bold flex items-center gap-1">
                              <LogOut className="h-4 w-4" />
                              <span>Elendi (0 Puan)</span>
                            </span>
                          )}
                        </div>
                      )}


                    </div>
                  </div>

                  <span className="shrink-0 font-display text-3xl font-bold text-ink">
                    {player.score} <span className="text-sm text-ink-extra-faded font-sans">Puan</span>
                  </span>
                </motion.li>
              )
            })}
          </ol>
        </section>

        {actionError && (
          <div role="alert" className="alert-error">
            {actionError}
          </div>
        )}

        {/* Action Controls */}
        <div className="flex flex-col gap-3 sm:flex-row">
          {state.you.isHost && (
            <motion.button
              whileHover={{ scale: 1.02, rotate: -0.5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => void handlePlayAgain()}
              disabled={isBusy}
              className="btn-pencil-green flex flex-1 items-center justify-center gap-2 py-4 font-display text-2xl font-bold"
            >
              {isBusy ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Hazırlanıyor...</span>
                </>
              ) : (
                <>
                  <RefreshCw className="h-5 w-5" />
                  <span>Yeni Tur Başlat</span>
                </>
              )}
            </motion.button>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => void handleLeave()}
            className="btn-outline flex flex-1 items-center justify-center gap-2 py-4 font-display text-xl font-bold"
          >
            <LogOut className="h-5 w-5" />
            <span>Odadan Çık</span>
          </motion.button>
        </div>

        {!state.you.isHost && (
          <p className="text-center font-display text-lg text-ink-faded" aria-live="polite">
            Oda sahibinin yeni bir tur başlatması bekleniyor.
          </p>
        )}
      </div>
    </div>
  )
}

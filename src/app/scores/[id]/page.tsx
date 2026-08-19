'use client'

import { Award, BarChart2, Check, Copy, Crown, Layers, Loader2, LogOut, Medal, RefreshCw, Trophy } from 'lucide-react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'

import Confetti from '@/components/Confetti'
import { CopiedPostIt, PencilLoader } from '@/components/animations'
import { CategoryIcon } from '@/components/CategoryIcon'
import { StatsModal } from '@/components/StatsModal'
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
  const [showStats, setShowStats] = useState(false)

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
        <div className="mx-auto max-w-3xl space-y-6 flex flex-col items-center justify-center min-h-[50vh]" aria-busy="true" aria-label="Sonuçlar yükleniyor">
          <PencilLoader size={44} text="Sonuçlar Hesaplanıyor..." color="var(--pencil-yellow)" />
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
  const youIndex = standings.findIndex((p) => p.id === state.you.playerId)
  const youRank = youIndex !== -1 ? youIndex + 1 : null
  const isYouWinner = winners.some((w) => w.id === state.you.playerId)

  const firstPlace = standings[0]
  const secondPlace = standings[1]
  const thirdPlace = standings[2]

  return (
    <div className="relative min-h-[calc(100vh-4rem)] px-4 py-8">
      <Confetti trigger={showConfetti} />
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Victory / Game Over Header Card */}
        <motion.header
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
          className={`paper-card-lg p-6 sm:p-8 text-center shadow-xl border-4 ${
            isYouWinner
              ? 'border-pencil-yellow bg-pencil-yellow/5'
              : youRank === 2
                ? 'border-ink-faded bg-paper-card'
                : youRank === 3
                  ? 'border-pencil-orange bg-paper-card'
                  : 'border-paper-border bg-paper-card'
          }`}
        >
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 350, damping: 15, delay: 0.2 }}
            className={`mb-3 inline-block rounded-sketch-lg border-2 border-paper-border p-3.5 shadow-md ${
              isYouWinner
                ? 'bg-pencil-yellow text-white animate-trophy-bounce'
                : youRank === 2
                  ? 'bg-ink-faded text-white'
                  : youRank === 3
                    ? 'bg-pencil-orange text-white'
                    : 'bg-paper-card text-pencil-yellow'
            }`}
          >
            {isYouWinner ? (
              <Trophy className="h-14 w-14" />
            ) : youRank === 2 ? (
              <Medal className="h-12 w-12" />
            ) : youRank === 3 ? (
              <Award className="h-12 w-12" />
            ) : (
              <Trophy className="h-12 w-12" />
            )}
          </motion.div>

          <h1 className="font-display text-4xl sm:text-5xl font-bold text-ink">
            {isYouWinner
              ? 'Tebrikler Şampiyon! 🎉'
              : youRank === 2 || youRank === 3
                ? `${youRank}. Oldunuz! Harika Mücadele 👏`
                : 'Oyun Bitti!'}
          </h1>

          {winners.length === 0 ? (
            <p className="mt-2 text-base text-ink-faded">
              Bu oyunda kimse puan alamadı.
            </p>
          ) : isYouWinner ? (
            <p className="mt-2 text-xl text-ink font-display">
              Toplam <strong className="text-pencil-yellow font-bold text-2xl">{topScore} Puan</strong> alarak zirvenin sahibi oldunuz!
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
                    .map((c) => CATEGORIES.find((cat) => cat.id === c)?.label || c)
                    .join(' → ')}
                </span>
              </span>
            ) : (
              <span className="tag border-pencil-purple text-pencil-purple font-bold text-sm flex items-center gap-1.5">
                <CategoryIcon category={state.room.selectedCategory || 'all'} className="h-4 w-4" />
                <span>
                  Kategori: {CATEGORIES.find((c) => c.id === (state.room.selectedCategory || 'all'))?.label || 'Tümü'}
                </span>
              </span>
            )}
          </div>

          <div className="mt-5 flex justify-center">
            <div className="relative inline-block">
              <button
                type="button"
                onClick={() => void handleCopyCode()}
                className="group relative inline-flex items-center gap-2 border-2 border-dashed border-pencil-red bg-paper-card px-5 py-2 font-mono text-base font-bold tracking-widest text-pencil-red transition-all hover:bg-pencil-red hover:text-white active:scale-95"
                style={{ borderRadius: '6px 10px 4px 12px' }}
              >
                <span>ODA KODU: {state.room.roomCode}</span>
                {copied ? (
                  <Check className="h-4 w-4 text-pencil-green" />
                ) : (
                  <Copy className="h-4 w-4 opacity-60 group-hover:opacity-100" />
                )}
              </button>
              <CopiedPostIt show={copied} />
            </div>
          </div>
        </motion.header>

        {/* Hiyerarşik Podyum (Podium) Bölümü */}
        {standings.length >= 2 && (
          <section className="paper-card p-6 sm:p-8">
            <div className="text-center mb-6">
              <h2 className="font-display text-3xl font-bold text-ink flex items-center justify-center gap-2">
                <Trophy className="h-7 w-7 text-pencil-yellow" />
                <span>Podyum</span>
              </h2>
              <p className="text-sm text-ink-faded font-sans mt-0.5">
                Oyunun en yüksek skoruna ulaşan ilk 3 oyuncusu
              </p>
            </div>

            <div className="flex items-end justify-center gap-3 sm:gap-4 max-w-lg mx-auto pt-6 pb-2">
              {/* 2. Sıra (Gümüş - Sol) */}
              {secondPlace && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="flex-1 flex flex-col items-center min-w-0"
                >
                  <div className="mb-2 text-center w-full px-1">
                    <div className="flex items-center justify-center gap-1">
                      <Medal className="h-5 w-5 text-ink-faded shrink-0" />
                      <span className="font-display text-lg sm:text-xl font-bold text-ink truncate">
                        {secondPlace.nickname}
                      </span>
                    </div>
                    {secondPlace.id === state.you.playerId && (
                      <span className="tag tag-you text-xs mt-0.5 inline-block">SEN</span>
                    )}
                    <div className="font-display font-bold text-base text-ink-faded mt-0.5">
                      {secondPlace.score} <span className="text-xs font-sans">P</span>
                    </div>
                  </div>
                  <div
                    className="w-full h-32 sm:h-36 bg-gradient-to-b from-paper-card-alt to-paper-card border-4 border-ink-faded/60 rounded-t-sketch flex flex-col items-center justify-center shadow-md relative"
                    style={{ borderRadius: '12px 12px 0 0' }}
                  >
                    <span className="font-display text-5xl sm:text-6xl font-black text-ink-faded/40 select-none">
                      2
                    </span>
                    <span className="text-xs font-sans font-bold text-ink-faded uppercase tracking-wider mt-1">
                      2. Sıra
                    </span>
                  </div>
                </motion.div>
              )}

              {/* 1. Sıra (Altın / Şampiyon - Orta - En Yüksek) */}
              {firstPlace && (
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="flex-1 flex flex-col items-center min-w-0 z-10"
                >
                  <div className="mb-2 text-center w-full px-1">
                    <div className="flex items-center justify-center gap-1 text-pencil-yellow">
                      <Crown className="h-6 w-6 text-pencil-yellow shrink-0 animate-bounce" />
                      <span className="font-display text-xl sm:text-2xl font-bold text-ink truncate">
                        {firstPlace.nickname}
                      </span>
                    </div>
                    {firstPlace.id === state.you.playerId && (
                      <span className="tag tag-you text-xs mt-0.5 inline-block">SEN</span>
                    )}
                    <div className="font-display font-bold text-lg text-pencil-yellow mt-0.5">
                      {firstPlace.score} <span className="text-xs font-sans">Puan</span>
                    </div>
                  </div>
                  <div
                    className="w-full h-44 sm:h-48 bg-gradient-to-b from-pencil-yellow/20 to-pencil-yellow/10 border-4 border-pencil-yellow rounded-t-sketch flex flex-col items-center justify-center shadow-xl relative"
                    style={{ borderRadius: '14px 14px 0 0' }}
                  >
                    <div className="absolute -top-3.5 px-2.5 py-0.5 bg-pencil-yellow text-white text-xs font-display font-bold rounded-full shadow-xs uppercase tracking-wider">
                      Şampiyon
                    </div>
                    <span className="font-display text-6xl sm:text-7xl font-black text-pencil-yellow select-none">
                      1
                    </span>
                    <span className="text-xs font-sans font-bold text-pencil-yellow uppercase tracking-wider mt-1">
                      1. Sıra
                    </span>
                  </div>
                </motion.div>
              )}

              {/* 3. Sıra (Bronz - Sağ) */}
              {thirdPlace ? (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex-1 flex flex-col items-center min-w-0"
                >
                  <div className="mb-2 text-center w-full px-1">
                    <div className="flex items-center justify-center gap-1">
                      <Award className="h-5 w-5 text-pencil-orange shrink-0" />
                      <span className="font-display text-lg sm:text-xl font-bold text-ink truncate">
                        {thirdPlace.nickname}
                      </span>
                    </div>
                    {thirdPlace.id === state.you.playerId && (
                      <span className="tag tag-you text-xs mt-0.5 inline-block">SEN</span>
                    )}
                    <div className="font-display font-bold text-base text-pencil-orange mt-0.5">
                      {thirdPlace.score} <span className="text-xs font-sans">P</span>
                    </div>
                  </div>
                  <div
                    className="w-full h-24 sm:h-28 bg-gradient-to-b from-pencil-orange/15 to-paper-card border-4 border-pencil-orange/60 rounded-t-sketch flex flex-col items-center justify-center shadow-md relative"
                    style={{ borderRadius: '12px 12px 0 0' }}
                  >
                    <span className="font-display text-4xl sm:text-5xl font-black text-pencil-orange/40 select-none">
                      3
                    </span>
                    <span className="text-xs font-sans font-bold text-pencil-orange uppercase tracking-wider mt-1">
                      3. Sıra
                    </span>
                  </div>
                </motion.div>
              ) : (
                <div className="flex-1 hidden sm:block" />
              )}
            </div>
          </section>
        )}

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

        {/* Genel İstatistikler Butonu */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setShowStats(true)}
            className="group inline-flex items-center gap-2 rounded-sketch-md border-2 border-dashed border-pencil-yellow bg-paper-card px-5 py-2.5 font-display text-lg font-bold text-ink shadow-xs transition-all hover:bg-pencil-yellow hover:text-white"
          >
            <Trophy className="h-5 w-5 text-pencil-yellow transition-colors group-hover:text-white" />
            <span>Genel İstatistiklerimi Gör</span>
          </motion.button>
        </div>

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

      <StatsModal isOpen={showStats} onClose={() => setShowStats(false)} />
    </div>
  )
}

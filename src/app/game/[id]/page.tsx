'use client'

import { Crown, Gamepad2, Heart, HelpCircle, Loader2, LogOut, Pencil, Send, SkipForward, Target, Trophy } from 'lucide-react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'

import Confetti from '@/components/Confetti'
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
  const [showConfetti, setShowConfetti] = useState(false)

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
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 1600)
        await refresh()
      } else {
        setFeedback({ tone: 'error', text: result.message })
        setGuess('')
        await refresh()
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
          <div className="h-24 animate-pulse rounded-xl border-2 border-dashed border-paper-border bg-paper-card" />
          <div className="h-80 animate-pulse rounded-xl border-2 border-dashed border-paper-border bg-paper-card" />
        </div>
      </div>
    )
  }

  if (phase === 'error' || !state) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <div className="max-w-md text-center">
          <h1 className="mb-2 font-display text-3xl font-bold text-ink">Oyun Açılamadı</h1>
          <p className="mb-6 text-sm text-ink-faded">
            {error?.message ?? 'Oyun bilgileri yüklenemedi.'}
          </p>
          <button
            onClick={() => void refresh()}
            className="btn-pencil-red px-6 py-3 font-display text-base"
          >
            Tekrar Dene
          </button>
        </div>
      </div>
    )
  }

  const currentPlayer = state.players.find((player) => player.id === state.room.currentPlayerId)
  const myLives = state.you.livesLeft ?? 3
  const activePlayerLives = currentPlayer ? (currentPlayer.livesLeft ?? 3) : 3
  const maxLives = state.maxLives ?? 3

  return (
    <div className="relative min-h-[calc(100vh-4rem)] px-4 py-8">
      <Confetti trigger={showConfetti} />
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Game Header Bar */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="paper-card-lg p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display text-3xl font-bold text-ink">
                  KimBu<span className="inline-block animate-wiggle text-pencil-yellow">?</span>
                </span>
                <span className="tag font-mono text-xs font-bold tracking-widest text-pencil-red tag-animate">
                  {state.room.roomCode}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <span className="tag">
                  Tur {state.room.gameRound}
                </span>
                <span className="tag">
                  {state.namesRemaining} İsim Kaldı
                </span>
                {degraded && <span className="tag border-pencil-orange text-pencil-orange">Canlı bağlantı yok</span>}
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => void handleLeave()}
              className="btn-outline flex items-center gap-2 px-4 py-2.5 font-display text-sm"
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
              className={`p-6 sm:p-8 transition-all duration-300 ${
                state.you.isYourTurn
                  ? 'paper-card-lg border-pencil-yellow turn-active shadow-lg'
                  : 'paper-card'
              }`}
              style={state.you.isYourTurn ? { borderColor: 'var(--pencil-yellow)', borderWidth: '3px' } : undefined}
            >
              {/* Turn Banner */}
              <div className="mb-6 text-center">
                {state.you.isYourTurn ? (
                  <motion.div
                    initial={{ scale: 0.8, rotate: -3 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className="inline-block"
                  >
                    <span className="highlight-yellow font-display text-2xl font-bold text-pencil-yellow tracking-wide flex items-center justify-center gap-2">
                      <Gamepad2 className="h-6 w-6 animate-bounce text-pencil-yellow" />
                      <span>SENİN SIRAN!</span>
                    </span>
                  </motion.div>
                ) : (
                  <div className="tag tag-turn mx-auto inline-flex items-center gap-1.5 text-sm tag-animate">
                    <Target className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '6s' }} />
                    <span>{currentPlayer?.nickname ?? 'Oyuncu'} Tahmin Ediyor</span>
                  </div>
                )}

                <h2 className="mt-3 font-display text-3xl font-bold text-ink sm:text-4xl">
                  {state.you.isYourTurn
                    ? 'Ben Kimim? Soru Sor & Tahmin Et!'
                    : `${currentPlayer?.nickname ?? 'Oyuncu'} İpucu Arıyor`}
                </h2>
                <p className="mx-auto mt-2 max-w-md text-sm text-ink-faded">
                  {state.you.isYourTurn
                    ? 'Arkadaşlarına evet/hayır soruları sor. Emin olduğunda tahminini yaz!'
                    : 'Sana sorulan sorulara dürüstçe yalnızca evet veya hayır deyin.'}
                </p>

                {/* Arena Ortasındaki Can Göstergesi */}
                <div className="mt-4 flex items-center justify-center gap-2">
                  <span className="font-display text-sm font-bold text-ink-faded">
                    {state.you.isYourTurn ? 'Kalan Canınız:' : `${currentPlayer?.nickname ?? 'Oyuncu'} Kalan Canı:`}
                  </span>
                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: maxLives }).map((_, index) => {
                      const displayLives = state.you.isYourTurn ? myLives : activePlayerLives
                      const isFilled = index < displayLives
                      return (
                        <motion.div
                          key={index}
                          initial={false}
                          animate={{ scale: isFilled ? 1 : 0.85, opacity: isFilled ? 1 : 0.3 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Heart
                            className={`h-6 w-6 ${
                              isFilled
                                ? 'fill-pencil-red text-pencil-red'
                                : 'fill-transparent text-ink-extra-faded opacity-30'
                            }`}
                          />
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </div>

              {/* Action Form or Secret Card */}
              {state.you.isYourTurn ? (
                myLives > 0 ? (
                  <form onSubmit={handleGuess} className="mx-auto max-w-md space-y-4">
                    <div>
                      <label
                        htmlFor="guess"
                        className="mb-2 flex items-center justify-center gap-1.5 font-display text-xl font-bold text-ink"
                      >
                        <Pencil className="h-5 w-5 text-pencil-red" />
                        <span>Tahmininiz</span>
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
                        className="paper-input-boxed text-center font-display text-2xl transition-all duration-200 focus:scale-[1.02]"
                      />
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.03, rotate: -0.5 }}
                        whileTap={{ scale: 0.97 }}
                        disabled={isBusy || !guess.trim()}
                        className="btn-pencil-red flex flex-1 items-center justify-center gap-2 py-3.5 font-display text-lg shadow-md"
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
                        className="btn-outline flex items-center justify-center gap-2 px-6 py-3.5 font-display text-sm"
                      >
                        <SkipForward className="h-4 w-4" />
                        <span>Pas Geç</span>
                      </motion.button>
                    </div>
                  </form>
                ) : (
                  <div className="p-4 text-center font-display text-lg font-bold text-pencil-red">
                    Canınız bittiği için tahmin hakkınız bulunmamaktadır. Sıranız otomatik olarak devredilmiştir.
                  </div>
                )
              ) : (
                state.currentName && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, rotate: -2, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                    transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
                    className="sticky-note sticky-note-green animate-envelope-open mx-auto max-w-md p-6 text-center shadow-lg"
                  >
                    <span className="flex items-center justify-center gap-1.5 font-display text-lg font-bold text-pencil-green">
                      <HelpCircle className="h-5 w-5" />
                      <span>GİZLİ KART (SADECE SEN GÖRÜYORSUN)</span>
                    </span>
                    <p className="mt-2 font-display text-4xl font-bold text-ink tracking-wide">
                      {state.currentName}
                    </p>
                    <p className="mt-2 text-xs text-ink-faded">
                      {currentPlayer?.nickname ?? 'Sıradaki oyuncu'} bu ismi tahmin etmeye çalışıyor.
                    </p>
                  </motion.div>
                )
              )}

              {/* Guess Feedback */}
              <div aria-live="polite" className="mt-6 min-h-[3rem]">
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={
                      feedback.tone === 'error'
                        ? { opacity: 1, scale: 1, x: [0, -10, 10, -5, 5, 0] }
                        : { opacity: 1, scale: 1 }
                    }
                    transition={{ duration: 0.4 }}
                    className={`mx-auto max-w-md text-center font-display text-base font-bold tag-animate ${
                      feedback.tone === 'success'
                        ? 'alert-success'
                        : 'alert-error'
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
            <div className="paper-card-alt p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-2xl font-bold text-ink flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-pencil-yellow" />
                  <span>Skor Tablosu</span>
                </h3>
              </div>

              <div className="space-y-2.5">
                {state.players.map((player) => {
                  const isCurrent = player.id === state.room.currentPlayerId
                  const isYou = player.id === state.you.playerId
                  const initial = player.nickname.charAt(0).toUpperCase()
                  const pLives = typeof player.livesLeft === 'number' ? player.livesLeft : maxLives

                  return (
                    <motion.div
                      key={player.id}
                      layout
                      className={`flex items-center justify-between border-2 p-3 transition-all ${
                        isCurrent
                          ? 'border-solid border-pencil-yellow bg-paper-card shadow-sm'
                          : 'border-dashed border-paper-border bg-paper-card'
                      }`}
                      style={{ borderRadius: '8px 4px 10px 6px' }}
                    >
                      <div className="flex min-w-0 items-center gap-2.5">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center font-display text-sm font-bold text-white ${
                            isCurrent
                              ? 'bg-pencil-yellow'
                              : 'bg-ink-faded'
                          }`}
                          style={{ borderRadius: '6px 3px 8px 4px' }}
                        >
                          {initial}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            {isCurrent && (
                              <Target className="h-3.5 w-3.5 shrink-0 text-pencil-yellow animate-pulse" aria-label="Sırası" />
                            )}
                            {player.isHost && !isCurrent && (
                              <Crown className="h-3.5 w-3.5 shrink-0 text-pencil-yellow" aria-label="Oda Sahibi" />
                            )}
                            <span className="truncate font-display text-lg font-bold text-ink">
                              {player.nickname}
                            </span>
                            {isYou && (
                              <span className="tag tag-you text-[9px]">SEN</span>
                            )}
                          </div>
                          {/* Her Oyuncu İçin Canlı Kalan Kalpler */}
                          <div className="mt-1 flex items-center gap-1">
                            {Array.from({ length: maxLives }).map((_, idx) => (
                              <Heart
                                key={idx}
                                className={`h-3.5 w-3.5 transition-all ${
                                  idx < pLives
                                    ? 'fill-pencil-red text-pencil-red'
                                    : 'fill-transparent text-ink-extra-faded opacity-30'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>

                      <span className="shrink-0 font-display text-xl font-bold text-ink">
                        {player.score} <span className="text-xs text-ink-extra-faded">P</span>
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

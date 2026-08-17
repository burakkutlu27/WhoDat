'use client'

import {
  AlertCircle,
  BellRing,
  Brain,
  Check,
  CheckCircle2,
  Clock,
  Crown,
  Gamepad2,
  Heart,
  HelpCircle,
  Lightbulb,
  Loader2,
  LogOut,
  MessageSquare,
  Pencil,
  Send,
  SkipForward,
  Sparkles,
  Target,
  Trophy,
  Users,
  X,
  Zap,
} from 'lucide-react'

import { motion, AnimatePresence } from 'motion/react'
import { useRouter } from 'next/navigation'
import { use, useEffect, useRef, useState } from 'react'

import Confetti from '@/components/Confetti'
import { ApiClientError, apiRequest } from '@/lib/apiClient'
import type { GuessResult } from '@/lib/game/types'
import { useGameState } from '@/lib/useGameState'

type Feedback = { tone: 'success' | 'error'; text: string }

const NEXT_ROUND_SUGGESTIONS = [
  'Barış Manço',
  'Kemal Sunal',
  'Mustafa Kemal Atatürk',
  'Albert Einstein',
  'Sherlock Holmes',
  'Tarkan',
  'Mona Lisa',
  'Cristiano Ronaldo',
  'Aziz Sancar',
  'Nasreddin Hoca',
]

export default function GamePage({ params }: { params: Promise<{ id: string }> }) {
  const { id: roomId } = use(params)
  const router = useRouter()
  const { state, phase, error, degraded, refresh } = useGameState(roomId)

  const [guess, setGuess] = useState('')
  const [buzzerGuess, setBuzzerGuess] = useState('')
  const [isBuzzerOpen, setIsBuzzerOpen] = useState(false)
  const [questionText, setQuestionText] = useState('')
  const [nextTargetInput, setNextTargetInput] = useState('')
  const [isBusy, setIsBusy] = useState(false)
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [roundTransition, setRoundTransition] = useState<{
    completedRound: number
    nextRound: number
    scores: { nickname: string; isHost: boolean; isYou: boolean; roundScore: number; totalScore: number }[]
  } | null>(null)

  const status = state?.room.status
  const currentRound = state?.room.gameRound ?? 1
  const prevRoundRef = useRef<number>(currentRound)

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

  // Hız Modu Tur Geçişleri Tespiti
  useEffect(() => {
    if (!state || state.room.gameMode !== 'speed') return
    const prev = prevRoundRef.current
    if (currentRound > prev && prev >= 1) {
      const roundIndex = prev - 1
      const scoresSummary = state.players.map((p) => ({
        nickname: p.nickname,
        isHost: p.isHost,
        isYou: p.id === state.you.playerId,
        roundScore: p.roundScores?.[roundIndex] ?? 0,
        totalScore: p.score,
      }))

      setRoundTransition({
        completedRound: prev,
        nextRound: currentRound,
        scores: scoresSummary,
      })

      const timer = setTimeout(() => {
        setRoundTransition(null)
      }, 5000)

      prevRoundRef.current = currentRound
      return () => clearTimeout(timer)
    } else {
      prevRoundRef.current = currentRound
    }
  }, [currentRound, state])

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
        setTimeout(() => setShowConfetti(false), 2000)
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

  const handleBuzzerSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!buzzerGuess.trim() || isBusy) return

    setIsBusy(true)
    try {
      const result = await apiRequest<GuessResult>(`/api/rooms/${roomId}/guess`, {
        method: 'POST',
        body: { guess: buzzerGuess.trim() },
      })

      if (result.correct) {
        setFeedback({ tone: 'success', text: result.message })
        setBuzzerGuess('')
        setIsBuzzerOpen(false)
        setShowConfetti(true)
        setTimeout(() => setShowConfetti(false), 2500)
        await refresh()
      } else {
        setFeedback({ tone: 'error', text: result.message })
        setBuzzerGuess('')
        setIsBuzzerOpen(false)
        await refresh()
      }
    } catch (caught) {
      setFeedback({
        tone: 'error',
        text: caught instanceof ApiClientError ? caught.message : 'Buzzer tahmini gönderilemedi.',
      })
      await refresh()
    } finally {
      setIsBusy(false)
    }
  }

  const handleAskQuestion = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!questionText.trim() || isBusy) return

    setIsBusy(true)
    try {
      const result = await apiRequest<{ message: string }>(`/api/rooms/${roomId}/question`, {
        method: 'POST',
        body: { question: questionText.trim() },
      })
      setQuestionText('')
      setFeedback({ tone: 'success', text: result.message })
      await refresh()
    } catch (caught) {
      setFeedback({
        tone: 'error',
        text: caught instanceof ApiClientError ? caught.message : 'Soru gönderilemedi.',
      })
      await refresh()
    } finally {
      setIsBusy(false)
    }
  }

  const handleAnswerQuestion = async (answer: 'yes' | 'no' | 'uncertain') => {
    if (!state?.room.pendingQuestion || isBusy) return
    setIsBusy(true)
    try {
      const result = await apiRequest<{ message: string }>(`/api/rooms/${roomId}/answer`, {
        method: 'POST',
        body: { questionId: state.room.pendingQuestion.id, answer },
      })
      setFeedback({ tone: 'success', text: result.message })
      await refresh()
    } catch (caught) {
      setFeedback({
        tone: 'error',
        text: caught instanceof ApiClientError ? caught.message : 'Cevap iletilemedi.',
      })
      await refresh()
    } finally {
      setIsBusy(false)
    }
  }

  const handleStartNextRound = async () => {
    if (!nextTargetInput.trim() || isBusy) return
    setIsBusy(true)
    try {
      await apiRequest(`/api/rooms/${roomId}/next-round`, {
        method: 'POST',
        body: { targetName: nextTargetInput.trim() },
      })
      setNextTargetInput('')
      setFeedback(null)
      await refresh()
    } catch (caught) {
      setFeedback({
        tone: 'error',
        text: caught instanceof ApiClientError ? caught.message : 'Sonraki tur başlatılamadı.',
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
      const result = await apiRequest<{ message: string }>(`/api/rooms/${roomId}/pass`, { method: 'POST' })
      setGuess('')
      if (result.message.includes('limit') || !isSpeed) {
        setFeedback({ tone: 'success', text: result.message })
      } else {
        setFeedback(null)
      }
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

  const isSpeed = state.room.gameMode === 'speed'
  const isPersistent = state.room.gameMode === 'persistent'
  const isSharedTarget = state.room.gameMode === 'shared_target'
  const currentPlayer = state.players.find((player) => player.id === state.room.currentPlayerId)
  const myLives = state.you.livesLeft ?? 3
  const activePlayerLives = currentPlayer ? (currentPlayer.livesLeft ?? 3) : 3
  const maxLives = state.maxLives ?? 3
  const isReferee = Boolean(state.you.isReferee)
  const isTargetRevealed = Boolean(state.room.targetRevealed)

  return (
    <div className="relative min-h-[calc(100vh-4rem)] px-4 py-8">
      <Confetti trigger={showConfetti} />

      {/* Hız Modu Tur Geçiş Ekranı Overlay */}
      {roundTransition && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.85, opacity: 0 }}
            className="paper-card-lg max-w-lg w-full p-6 sm:p-8 text-center border-4 border-pencil-yellow shadow-2xl space-y-5"
          >
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pencil-yellow/20 text-pencil-yellow animate-bounce">
              <Trophy className="h-9 w-9 text-pencil-yellow" />
            </div>

            <div>
              <span className="tag border-pencil-yellow text-pencil-yellow font-bold text-xs uppercase tracking-wider">
                Tur Sonu Özeti
              </span>
              <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-ink">
                {roundTransition.completedRound}. Tur Tamamlandı!
              </h2>
              <p className="mt-1 text-sm text-ink-faded font-display">
                {roundTransition.nextRound}. Tur Başlıyor — <strong className="text-pencil-green">Yeni Gizli İsimler Dağıtıldı!</strong>
              </p>
            </div>

            <div className="space-y-2 rounded-xl bg-paper-card-alt p-4 border-2 border-dashed border-paper-border text-left">
              <div className="text-xs font-display font-bold text-ink-faded uppercase tracking-wider mb-2">
                Bu Turdaki Skorlar:
              </div>
              {roundTransition.scores.map((p, idx) => (
                <div key={idx} className="flex items-center justify-between font-display text-sm py-1 border-b border-paper-border/50 last:border-0">
                  <div className="flex items-center gap-1.5">
                    {p.isHost && <Crown className="h-3.5 w-3.5 text-pencil-yellow" />}
                    <span className="font-bold text-ink">{p.nickname}</span>
                    {p.isYou && <span className="tag tag-you text-[9px]">SEN</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-pencil-green font-bold">+{p.roundScore} P</span>
                    <span className="text-ink-faded text-xs font-semibold">({p.totalScore} P Toplam)</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setRoundTransition(null)}
              className="btn-pencil-yellow w-full py-3 font-display text-base font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform"
            >
              {roundTransition.nextRound}. Tura Başla →
            </button>
          </motion.div>
        </div>
      )}

      {/* Ortak Hedef Modu — Tahmin Modalı */}
      <AnimatePresence>
        {isBuzzerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="paper-card-lg max-w-md w-full p-6 sm:p-8 text-center border-2 border-pencil-green shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="tag border-pencil-green text-pencil-green font-bold text-xs uppercase flex items-center gap-1.5">
                  <Target className="h-3.5 w-3.5 text-pencil-green" />
                  <span>Gizli Hedef Tahmini</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsBuzzerOpen(false)}
                  className="rounded-full p-1 text-ink-faded hover:bg-paper-card-alt hover:text-ink transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold text-ink">
                Gizli Hedef Kim?
              </h3>
              <p className="text-sm text-ink-faded font-sans">
                Doğru bilirseniz <strong className="text-pencil-green">+100 Puan</strong> kazanırsınız. Yanlış bilirseniz sonraki soru sıranız atlanır.
              </p>

              <form onSubmit={handleBuzzerSubmit} className="space-y-4 pt-2">
                <input
                  type="text"
                  value={buzzerGuess}
                  onChange={(e) => setBuzzerGuess(e.target.value)}
                  placeholder="Örn: Albert Einstein..."
                  maxLength={60}
                  autoFocus
                  disabled={isBusy}
                  className="paper-input-boxed text-center font-display text-2xl w-full"
                />

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={isBusy || !buzzerGuess.trim()}
                    className="btn-pencil-green flex-1 py-3.5 font-display text-lg font-bold flex items-center justify-center gap-2 shadow-sm"
                  >
                    {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <><span>Tahmini Gönder</span><Send className="h-4 w-4" /></>}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsBuzzerOpen(false)}
                    disabled={isBusy}
                    className="btn-outline px-4 py-3.5 font-display text-sm font-bold"
                  >
                    İptal
                  </button>
                </div>
              </form>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

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
                <span className={`tag ${
                  isSpeed
                    ? 'border-pencil-green text-pencil-green font-bold'
                    : isPersistent
                      ? 'border-pencil-blue text-pencil-blue font-bold'
                      : isSharedTarget
                        ? 'border-pencil-orange text-pencil-orange font-bold'
                        : 'border-pencil-yellow text-pencil-yellow font-bold'
                }`}>
                  {isSpeed && <Zap className="h-3.5 w-3.5 mr-1 inline" />}
                  {isPersistent && <Brain className="h-3.5 w-3.5 mr-1 inline" />}
                  {isSharedTarget && <Users className="h-3.5 w-3.5 mr-1 inline" />}
                  {!isSpeed && !isPersistent && !isSharedTarget && <Target className="h-3.5 w-3.5 mr-1 inline" />}
                  {isSpeed
                    ? `Hız Modu (Tur ${state.room.gameRound} / ${state.room.totalRounds})`
                    : isPersistent
                      ? `Israrcı Mod (10 Soru Bütçesi)`
                      : isSharedTarget
                        ? `Ortak Hedef (Tur ${state.room.gameRound} / ${state.room.totalRounds})`
                        : `Klasik Tur ${state.room.gameRound}`}
                </span>
                {!isSharedTarget && (
                  <span className="tag">
                    {state.namesRemaining} İsim Kaldı
                  </span>
                )}
                {isSharedTarget && isReferee && (
                  <span className="tag border-pencil-yellow text-pencil-yellow font-bold flex items-center gap-1">
                    <Crown className="h-3.5 w-3.5 text-pencil-yellow" />
                    <span>Hakem Rolündesiniz</span>
                  </span>
                )}
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
          <main className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-6 sm:p-8 transition-all duration-300 ${
                state.you.isYourTurn && !isReferee
                  ? 'paper-card-lg border-pencil-yellow turn-active shadow-lg'
                  : 'paper-card'
              }`}
              style={state.you.isYourTurn && !isReferee ? { borderColor: 'var(--pencil-yellow)', borderWidth: '3px' } : undefined}
            >
              {/* ORTAK HEDEF MODU GÖRÜNÜMÜ */}
              {isSharedTarget ? (
                <div className="space-y-6">
                  {/* HAKEM (HOST) GÖRÜNÜMÜ */}
                  {isReferee ? (
                    <div className="space-y-5">
                      {/* Gizli Hedef Kartı */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="sticky-note sticky-note-yellow p-5 text-center shadow-md border-2 border-pencil-yellow"
                      >
                        <span className="flex items-center justify-center gap-1.5 font-display text-sm font-bold text-pencil-yellow uppercase tracking-wider">
                          <Crown className="h-5 w-5" />
                          <span>GİZLİ HEDEF (YALNIZCA SİZ GÖRÜYORSUNUZ)</span>
                        </span>
                        <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-ink">
                          {state.room.sharedTargetName ?? 'Hedef Belirlenmedi'}
                        </h2>
                        <p className="mt-1 text-xs text-ink-faded">
                          Yarışmacıların sorularını aşağıdaki butonlarla dürüstçe yanıtlayın.
                        </p>
                      </motion.div>

                      {/* Bekleyen Soru Yanıtlama Alanı */}
                      {state.room.pendingQuestion ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="paper-card-alt p-5 border-2 border-pencil-orange rounded-xl text-center space-y-4"
                        >
                          <span className="tag border-pencil-orange text-pencil-orange font-bold text-xs uppercase animate-pulse">
                            Yeni Soru Geldi!
                          </span>
                          <div>
                            <span className="font-display text-sm font-bold text-ink-faded block">
                              {state.room.pendingQuestion.askerNickname} Soruyor:
                            </span>
                            <p className="font-display text-2xl font-bold text-ink mt-1">
                              &ldquo;{state.room.pendingQuestion.questionText}&rdquo;
                            </p>
                          </div>

                          <div className="grid grid-cols-3 gap-3 pt-2">
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => void handleAnswerQuestion('yes')}
                              disabled={isBusy}
                              className="btn-pencil-green py-3.5 font-display text-lg font-bold flex items-center justify-center gap-1.5"
                            >
                              <Check className="h-5 w-5" />
                              <span>EVET</span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => void handleAnswerQuestion('no')}
                              disabled={isBusy}
                              className="btn-pencil-red py-3.5 font-display text-lg font-bold flex items-center justify-center gap-1.5"
                            >
                              <X className="h-5 w-5" />
                              <span>HAYIR</span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => void handleAnswerQuestion('uncertain')}
                              disabled={isBusy}
                              className="btn-outline py-3.5 font-display text-base font-bold flex items-center justify-center gap-1.5"
                            >
                              <HelpCircle className="h-5 w-5 text-ink-faded" />
                              <span>BELİRSİZ</span>
                            </motion.button>
                          </div>
                        </motion.div>
                      ) : isTargetRevealed ? (
                        /* Tur Bittiğinde Sonraki Tur Başlatma Kartı */
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="alert-success p-6 rounded-xl space-y-4"
                        >
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-6 w-6 text-pencil-green animate-bounce" />
                            <h3 className="font-display text-2xl font-bold text-pencil-green">
                              {state.room.roundWinnerNickname ? `${state.room.roundWinnerNickname} Hedefi Bildi!` : 'Tur Tamamlandı!'}
                            </h3>
                          </div>
                          <p className="text-sm text-ink">
                            Gizli hedef <strong>{state.room.sharedTargetName}</strong> herkese açıklandı.
                          </p>

                          {state.room.gameRound < state.room.totalRounds ? (
                            <div className="space-y-3 pt-2 border-t border-paper-border">
                              <label className="block font-display text-sm font-bold text-ink text-left">
                                {state.room.gameRound + 1}. Tur İçin Yeni Gizli Hedef Belirleyin:
                              </label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  value={nextTargetInput}
                                  onChange={(e) => setNextTargetInput(e.target.value)}
                                  placeholder="Örn: Barış Manço..."
                                  maxLength={60}
                                  disabled={isBusy}
                                  className="paper-input font-display text-xl flex-1"
                                />
                                <button
                                  type="button"
                                  onClick={() => void handleStartNextRound()}
                                  disabled={isBusy || !nextTargetInput.trim()}
                                  className="btn-pencil-green px-5 py-3 font-display text-base font-bold shrink-0"
                                >
                                  {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : `${state.room.gameRound + 1}. Tura Başla →`}
                                </button>
                              </div>

                              <div className="flex flex-wrap gap-1.5 text-left">
                                {NEXT_ROUND_SUGGESTIONS.slice(0, 5).map((sug) => (
                                  <button
                                    key={sug}
                                    type="button"
                                    onClick={() => setNextTargetInput(sug)}
                                    className="rounded bg-paper-card-alt px-2.5 py-1 text-[11px] font-display font-semibold border border-paper-border hover:border-pencil-green"
                                  >
                                    + {sug}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="p-3 bg-pencil-green/10 rounded-lg text-sm font-display font-bold text-pencil-green">
                              Tüm turlar tamamlandı! Skor ekranına yönlendiriliyorsunuz...
                            </div>
                          )}
                        </motion.div>
                      ) : (
                        <div className="text-center py-6 text-ink-faded font-display space-y-2">
                          <Clock className="h-8 w-8 mx-auto animate-spin text-pencil-yellow" style={{ animationDuration: '6s' }} />
                          <p className="text-xl font-bold text-ink">
                            {currentPlayer?.nickname ?? 'Yarışmacının'} Soru Sorması Bekleniyor...
                          </p>
                          <p className="text-xs text-ink-extra-faded">
                            Soru geldiğinde ekranınızda Evet/Hayır butonları belirecektir.
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* YARIŞMACI GÖRÜNÜMÜ */
                    <div className="space-y-6">
                      {/* Tahmin Butonu & Bilgilendirme */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-2xl bg-paper-card-alt border-2 border-dashed border-pencil-green/40 shadow-xs">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-pencil-green/15 text-pencil-green shadow-xs">
                            <Lightbulb className="h-6 w-6" />
                          </div>
                          <div>
                            <span className="block font-display text-2xl font-bold text-ink leading-tight">
                              Gizli Hedefi Biliyor Musun?
                            </span>
                            <p className="mt-0.5 text-sm text-ink-faded font-sans">
                              Sıranızı beklemeden her an tahmin hakkınızı kullanabilirsiniz.
                            </p>
                          </div>
                        </div>

                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setIsBuzzerOpen(true)}
                          disabled={isBusy || isTargetRevealed}
                          className="btn-pencil-green px-6 py-3 font-display text-lg font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all shrink-0"
                        >
                          <Target className="h-5 w-5" />
                          <span>Tahminde Bulun</span>
                        </motion.button>
                      </div>



                      {/* Soru Sorma Durumu */}
                      {isTargetRevealed ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="sticky-note sticky-note-green p-6 text-center shadow-lg"
                        >
                          <span className="font-display text-sm font-bold text-pencil-green uppercase">
                            HEDEF BULUNDU!
                          </span>
                          <h3 className="mt-2 font-display text-4xl font-bold text-ink">
                            {state.room.sharedTargetName}
                          </h3>
                          <p className="mt-2 text-xs text-ink-faded">
                            {state.room.roundWinnerNickname ? `Tebrikler ${state.room.roundWinnerNickname}! (+100 Puan)` : ''} Hakemin yeni turu başlatması bekleniyor...
                          </p>
                        </motion.div>
                      ) : state.you.isYourTurn ? (
                        <div className="space-y-4 text-center">
                          {state.you.skippedQuestionTurn ? (
                            <div className="alert-error p-4 text-left flex items-start gap-3">
                              <AlertCircle className="h-6 w-6 text-pencil-red shrink-0 mt-0.5" />
                              <div>
                                <span className="font-display text-base font-bold block">
                                  Soru Sıranız Atlandı (Ceza)
                                </span>
                                <span className="text-xs text-ink-faded">
                                  Daha önce yanlış tahmin yaptığınız için bu soru sıranız atlandı. Sırayı devretmek için butona basın. (Buzzer tahmin hakkınız devam etmektedir!)
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <span className="highlight-yellow font-display text-xl font-bold text-pencil-yellow tracking-wide inline-flex items-center gap-1.5 mb-2">
                                <Gamepad2 className="h-5 w-5 animate-bounce" />
                                <span>SENİN SORU SIRAN!</span>
                              </span>
                              <h3 className="font-display text-2xl font-bold text-ink">
                                Hakeme Bir Soru Sor
                              </h3>
                              <p className="text-xs text-ink-faded mb-4">
                                Hakemin Evet ya da Hayır diyebileceği bir soru yazın (Örn: &ldquo;Yaşıyor mu?&rdquo;, &ldquo;Sanatçı mı?&rdquo;).
                              </p>

                              <form onSubmit={handleAskQuestion} className="max-w-md mx-auto space-y-3">
                                <input
                                  type="text"
                                  value={questionText}
                                  onChange={(e) => setQuestionText(e.target.value)}
                                  placeholder="Örn: Gerçek bir kişi mi? Erkek mi?..."
                                  maxLength={150}
                                  disabled={isBusy}
                                  className="paper-input font-display text-xl w-full text-center"
                                />

                                <div className="flex gap-2">
                                  <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={isBusy || !questionText.trim()}
                                    className="btn-pencil-red flex-1 py-3 font-display text-base font-bold flex items-center justify-center gap-1.5"
                                  >
                                    {isBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <><span>Soruyu İlet</span><Send className="h-4 w-4" /></>}
                                  </motion.button>

                                  <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => void handlePass()}
                                    disabled={isBusy}
                                    className="btn-outline px-4 py-3 font-display text-sm"
                                  >
                                    <SkipForward className="h-4 w-4" />
                                    <span>Pas</span>
                                  </motion.button>
                                </div>
                              </form>
                            </div>
                          )}

                          {state.you.skippedQuestionTurn && (
                            <button
                              type="button"
                              onClick={() => void handlePass()}
                              disabled={isBusy}
                              className="btn-outline w-full max-w-xs mx-auto py-3 font-display text-base font-bold"
                            >
                              Sırayı Devret →
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-4 font-display text-ink-faded space-y-1">
                          <p className="text-lg font-bold text-ink">
                            {currentPlayer?.nickname ?? 'Yarışmacı'} Hakeme Soru Soruyor...
                          </p>
                          <p className="text-xs text-ink-extra-faded">
                            Gelen soru ve Hakemin cevabı aşağıdaki not defterine anında eklenecektir.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                /* KLASİK / HIZ / ISRARCI MOD GÖRÜNÜMÜ */
                <div>
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
                        ? isPersistent && (state.you.questionBudgetRemaining ?? 10) === 0
                          ? 'Soru Bütçen Bitti — Karar Anı!'
                          : 'Ben Kimim? Soru Sor & Tahmin Et!'
                        : `${currentPlayer?.nickname ?? 'Oyuncu'} İpucu Arıyor`}
                    </h2>
                    <p className="mx-auto mt-2 max-w-md text-sm text-ink-faded">
                      {state.you.isYourTurn
                        ? isSpeed
                          ? 'Sorunu sesli sor ve "Soru Sordum" butonuna bas, ya da emin olduğunda tahminini yap!'
                          : isPersistent
                            ? (state.you.questionBudgetRemaining ?? 10) > 0
                              ? 'Sorunu sesli sorup "Soru Sordum" butonuna basabilir veya doğrudan tahmin yapabilirsin!'
                              : 'Soru bütçen bitti! Elindeki bilgilerle tahmin yapmak zorundasın.'
                            : 'Arkadaşlarına evet/hayır soruları sor. Emin olduğunda tahminini yaz!'
                        : 'Sana sorulan sorulara dürüstçe yalnızca evet veya hayır deyin.'}
                    </p>

                    {/* Modlara Göre Göstergeler */}
                    {isPersistent ? (
                      <div className="mt-5 space-y-3">
                        <div className="flex flex-wrap items-center justify-center gap-4">
                          {/* Soru Bütçesi Göstergesi */}
                          {(() => {
                            const budget = state.you.isYourTurn
                              ? (state.you.questionBudgetRemaining ?? 10)
                              : (currentPlayer?.questionBudgetRemaining ?? 10)
                            const isLow = budget <= 3 && budget > 0
                            const isZero = budget === 0
                            return (
                              <div
                                className={`flex items-center gap-2 rounded-xl border-2 px-4 py-2 shadow-sm transition-colors ${
                                  isZero
                                    ? 'border-solid border-pencil-red bg-pencil-red/10'
                                    : isLow
                                      ? 'border-solid border-pencil-orange bg-pencil-orange/10'
                                      : 'border-dashed border-paper-border bg-paper-card'
                                }`}
                              >
                                <Pencil
                                  className={`h-5 w-5 ${
                                    isZero
                                      ? 'text-pencil-red'
                                      : isLow
                                        ? 'text-pencil-orange'
                                        : 'text-pencil-blue'
                                  }`}
                                />
                                <span className="font-display text-base font-bold text-ink">
                                  {state.you.isYourTurn ? 'Soru Bütçen: ' : `${currentPlayer?.nickname ?? 'Oyuncu'} Bütçesi: `}
                                  <span
                                    className={`text-lg font-bold ${
                                      isZero
                                        ? 'text-pencil-red'
                                        : isLow
                                          ? 'text-pencil-orange'
                                          : 'text-pencil-blue'
                                    }`}
                                  >
                                    {budget}
                                  </span>{' '}
                                  / 10
                                </span>
                              </div>
                            )
                          })()}

                          {/* Can / Tahmin Hakkı Göstergesi */}
                          <div className="flex items-center gap-2 rounded-xl border-2 border-dashed border-paper-border bg-paper-card px-4 py-2 shadow-sm">
                            <span className="font-display text-sm font-bold text-ink-faded">
                              Tahmin Hakkı:
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
                                      className={`h-5 w-5 ${
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

                          {/* Potansiyel Puan */}
                          <div className="flex items-center gap-2 rounded-xl border-2 border-solid border-pencil-green bg-paper-card px-4 py-2 shadow-sm">
                            <Zap className="h-5 w-5 text-pencil-green animate-pulse" />
                            <span className="font-display text-base font-bold text-ink">
                              {state.you.isYourTurn ? 'Şimdi Bilirsen: ' : `${currentPlayer?.nickname ?? 'Oyuncu'} Bilirse: `}
                              <span className="text-pencil-green text-lg font-bold">
                                +{state.you.isYourTurn ? (state.you.estimatedPoints ?? 100) : (currentPlayer?.estimatedPoints ?? 100)} P
                              </span>
                            </span>
                          </div>
                        </div>

                        {!state.you.isYourTurn && (
                          <div className="text-center font-display text-xs text-ink-faded">
                            Senin durumun: <strong className="text-ink">{state.you.questionBudgetRemaining ?? 10}/10 Soru Bütçesi</strong> • <strong className="text-pencil-red">{myLives} Can</strong> • Sıran geldiğinde bilirsen: <strong className="text-pencil-green">+{state.you.estimatedPoints ?? 100} P</strong>
                          </div>
                        )}
                      </div>
                    ) : isSpeed ? (
                      <div className="mt-5 space-y-3">
                        <div className="flex flex-wrap items-center justify-center gap-4">
                          <div className="flex items-center gap-2 rounded-xl border-2 border-dashed border-paper-border bg-paper-card px-4 py-2 shadow-sm">
                            <Clock className="h-5 w-5 text-pencil-blue" />
                            <span className="font-display text-base font-bold text-ink">
                              {state.you.isYourTurn ? 'Senin Soru Sayın: ' : `${currentPlayer?.nickname ?? 'Oyuncu'} Soru Sayısı: `}
                              <span className="text-pencil-blue text-lg">
                                {state.you.isYourTurn ? state.you.questionsThisRound : (currentPlayer?.questionsThisRound ?? 0)}
                              </span> / 20
                            </span>
                          </div>

                          <div className="flex items-center gap-2 rounded-xl border-2 border-solid border-pencil-green bg-paper-card px-4 py-2 shadow-sm">
                            <Zap className="h-5 w-5 text-pencil-green animate-pulse" />
                            <span className="font-display text-base font-bold text-ink">
                              {state.you.isYourTurn ? 'Şimdi Bilirsen: ' : `${currentPlayer?.nickname ?? 'Oyuncu'} Bilirse: `}
                              <span className="text-pencil-green text-lg font-bold">
                                +{state.you.isYourTurn ? state.you.estimatedPoints : (currentPlayer?.estimatedPoints ?? 100)} P
                              </span>
                            </span>
                          </div>
                        </div>

                        {!state.you.isYourTurn && (
                          <div className="text-center font-display text-xs text-ink-faded">
                            Senin durumun: <strong className="text-ink">{state.you.questionsThisRound} Soru</strong> • Sıran geldiğinde bilirsen: <strong className="text-pencil-green">+{state.you.estimatedPoints} P</strong>
                          </div>
                        )}
                      </div>
                    ) : (
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
                    )}
                  </div>

                  {/* Action Form or Secret Card */}
                  {state.you.isYourTurn ? (
                    isSpeed || myLives > 0 ? (
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
                          
                          {/* Israrcı Modda Bütçe 0 ise "Soru Sordum" butonu kalkar (Kural A: Zorunlu Tahmin) */}
                          {(!isPersistent || (state.you.questionBudgetRemaining ?? 10) > 0) && (
                            <motion.button
                              type="button"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => void handlePass()}
                              disabled={isBusy}
                              className="btn-outline flex items-center justify-center gap-2 px-6 py-3.5 font-display text-base"
                            >
                              <SkipForward className="h-4 w-4" />
                              <span>{isSpeed || isPersistent ? 'Soru Sordum' : 'Pas Geç'}</span>
                            </motion.button>
                          )}
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
                </div>
              )}

              {/* Guess / Feedback Messages */}
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

            {/* Ortak Hedef Modu — Ortak Soru-Cevap Not Defteri (Question Log) */}
            {isSharedTarget && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="paper-card-alt p-6 rounded-xl border-2 border-dashed border-paper-border space-y-4"
              >
                <div className="flex items-center justify-between border-b border-paper-border pb-3">
                  <h3 className="font-display text-xl font-bold text-ink flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-pencil-blue" />
                    <span>Ortak Soru-Cevap Not Defteri</span>
                  </h3>
                  <span className="text-xs font-mono text-ink-faded">
                    {state.room.questionLog?.length ?? 0} Soru
                  </span>
                </div>

                {state.room.questionLog && state.room.questionLog.length > 0 ? (
                  <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                    {state.room.questionLog.map((item, idx) => (
                      <div
                        key={item.id || idx}
                        className="flex flex-wrap items-center justify-between gap-2 p-3 bg-paper-card rounded-lg border border-paper-border text-sm font-display shadow-xs"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-xs font-mono font-bold text-ink-faded">#{idx + 1}</span>
                          <strong className="text-pencil-blue">{item.askerNickname}:</strong>
                          <span className="text-ink truncate">&ldquo;{item.questionText}&rdquo;</span>
                        </div>
                        <div>
                          {item.answer === 'yes' ? (
                            <span className="tag bg-pencil-green text-white font-bold text-xs flex items-center gap-1">
                              <Check className="h-3.5 w-3.5" />
                              <span>EVET</span>
                            </span>
                          ) : item.answer === 'no' ? (
                            <span className="tag bg-pencil-red text-white font-bold text-xs flex items-center gap-1">
                              <X className="h-3.5 w-3.5" />
                              <span>HAYIR</span>
                            </span>
                          ) : (
                            <span className="tag bg-ink-faded text-white font-bold text-xs flex items-center gap-1">
                              <HelpCircle className="h-3.5 w-3.5" />
                              <span>BELİRSİZ</span>
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center py-4 text-xs font-display text-ink-faded italic">
                    Henüz soru sorulmadı. Sırası gelen oyuncunun sorusu ve hakemin cevabı burada listelenecektir.
                  </p>
                )}
              </motion.div>
            )}
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
                  const isPlayerReferee = player.isHost && isSharedTarget

                  return (
                    <motion.div
                      key={player.id}
                      layout
                      className={`flex items-center justify-between border-2 p-3 transition-all ${
                        isCurrent && !isPlayerReferee
                          ? 'border-solid border-pencil-yellow bg-paper-card shadow-sm'
                          : 'border-dashed border-paper-border bg-paper-card'
                      }`}
                      style={{ borderRadius: '8px 4px 10px 6px' }}
                    >
                      <div className="flex min-w-0 items-center gap-2.5">
                        <div
                          className={`flex h-8 w-8 shrink-0 items-center justify-center font-display text-sm font-bold text-white ${
                            isPlayerReferee
                              ? 'bg-pencil-orange'
                              : isCurrent
                                ? 'bg-pencil-yellow'
                                : 'bg-ink-faded'
                          }`}
                          style={{ borderRadius: '6px 3px 8px 4px' }}
                        >
                          {initial}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            {isCurrent && !isPlayerReferee && (
                              <Target className="h-3.5 w-3.5 shrink-0 text-pencil-yellow animate-pulse" aria-label="Sırası" />
                            )}
                            {player.isHost && (
                              <Crown className="h-3.5 w-3.5 shrink-0 text-pencil-yellow" aria-label="Oda Sahibi / Hakem" />
                            )}
                            <span className="truncate font-display text-lg font-bold text-ink">
                              {player.nickname}
                            </span>
                            {isYou && (
                              <span className="tag tag-you text-[9px]">SEN</span>
                            )}
                          </div>

                          {/* Ortak Hedef / Israrcı / Hız / Klasik Mod Sidebar Durumu */}
                          {isSharedTarget ? (
                            <div className="mt-1">
                              {isPlayerReferee ? (
                                <span className="text-[11px] font-display font-bold text-pencil-orange flex items-center gap-1">
                                  <Crown className="h-3 w-3" />
                                  <span>Hakem</span>
                                </span>
                              ) : player.skippedQuestionTurn ? (
                                <span className="text-[11px] font-display font-semibold text-pencil-red flex items-center gap-1">
                                  <AlertCircle className="h-3 w-3" />
                                  <span>Sıra Cezalı</span>
                                </span>
                              ) : (
                                <span className="text-[11px] font-display text-ink-faded">
                                  Yarışmacı
                                </span>
                              )}
                            </div>
                          ) : isPersistent ? (
                            <div className="mt-1 space-y-1">
                              {player.nameSolved ? (
                                <div className="flex items-center gap-1.5 text-xs font-display">
                                  <span className="flex items-center gap-1 text-pencil-green font-bold">
                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                    <span>Bildi (+{player.score}P)</span>
                                  </span>
                                </div>
                              ) : pLives <= 0 ? (
                                <div className="flex items-center gap-1.5 text-xs font-display">
                                  <span className="text-pencil-red font-bold flex items-center gap-1">
                                    <X className="h-3.5 w-3.5" />
                                    <span>Elendi (0P)</span>
                                  </span>
                                </div>
                              ) : (

                                <div className="space-y-1">
                                  <div className="flex items-center justify-between gap-2 text-xs font-display">
                                    <span className="text-ink-faded">
                                      Bütçe: <strong className="text-pencil-blue">{player.questionBudgetRemaining ?? 10}/10</strong>
                                    </span>
                                    <span className="text-pencil-green font-semibold">
                                      +{player.estimatedPoints ?? 100}P
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    {Array.from({ length: maxLives }).map((_, idx) => (
                                      <Heart
                                        key={idx}
                                        className={`h-3 w-3 ${
                                          idx < pLives
                                            ? 'fill-pencil-red text-pencil-red'
                                            : 'fill-transparent text-ink-extra-faded opacity-30'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : isSpeed ? (
                            <div className="mt-1 space-y-1">
                              <div className="flex items-center gap-1.5 text-xs font-display">
                                {player.hasFinishedRound ? (
                                  <span className="flex items-center gap-1 text-pencil-green font-bold">
                                    <CheckCircle2 className="h-3.5 w-3.5" />
                                    <span>Turu Bitirdi</span>
                                  </span>
                                ) : (
                                  <span className="text-ink-faded">
                                    Soru: <strong className="text-ink">{player.questionsThisRound ?? 0}</strong> • Potansiyel: <strong className="text-pencil-green">+{player.estimatedPoints ?? 100}P</strong>
                                  </span>
                                )}
                              </div>
                              {player.roundScores && player.roundScores.length > 0 && (
                                <div className="flex flex-wrap items-center gap-1">
                                  {player.roundScores.map((rScore, roundIdx) => (
                                    <span
                                      key={roundIdx}
                                      className="rounded bg-paper-card-alt px-1.5 py-0.5 border border-paper-border text-[10px] text-ink-faded font-mono"
                                    >
                                      T{roundIdx + 1}: <strong className="text-ink">{rScore}P</strong>
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          ) : (
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
                          )}
                        </div>
                      </div>

                      <span className="shrink-0 font-display text-xl font-bold text-ink">
                        {isPlayerReferee ? '-' : `${player.score} `}
                        {!isPlayerReferee && <span className="text-xs text-ink-extra-faded">P</span>}
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


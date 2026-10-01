'use client'

import {
  AlertCircle,
  Bot,
  Brain,
  Check,
  CheckCircle2,
  Crown,
  Gamepad2,
  HelpCircle,
  Layers,
  Lightbulb,
  Loader2,
  LogOut,
  MessageSquare,
  Mic,
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
import {
  CheckmarkDraw,
  CrossDraw,
  HandDrawnBorder,
  HourglassTimer,
  PageFlipTransition,
  PaperAirplane,
  PencilLoader,
  TornPaperHeart,
} from '@/components/animations'
import { CategoryIcon } from '@/components/CategoryIcon'
import { ClueCard } from '@/components/ClueCard'
import { QuestionPicker } from '@/components/QuestionPicker'
import { TEAM_STYLES } from '@/components/TeamLobby'
import { TeamPanel } from '@/components/TeamPanel'
import { VotingModal } from '@/components/VotingModal'
import { ApiClientError, apiRequest } from '@/lib/apiClient'
import { CATEGORIES } from '@/lib/game/famousPeopleData'
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
  const [isQuestionPickerOpen, setIsQuestionPickerOpen] = useState(false)
  const [isLeaveModalOpen, setIsLeaveModalOpen] = useState(false)
  const [isLeaving, setIsLeaving] = useState(false)
  const [questionText, setQuestionText] = useState('')
  const [nextTargetInput, setNextTargetInput] = useState('')
  const [isBusy, setIsBusy] = useState(false)
  const [feedback, setFeedback] = useState<Feedback | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showPaperAirplane, setShowPaperAirplane] = useState(false)
  const [guessResultModal, setGuessResultModal] = useState<{ isCorrect: boolean; message: string; guessText: string } | null>(null)
  const [roundTransition, setRoundTransition] = useState<{
    completedRound: number
    nextRound: number
    scores: { nickname: string; isHost: boolean; isYou: boolean; roundScore: number; totalScore: number }[]
  } | null>(null)
  const [phaseTransition, setPhaseTransition] = useState<{
    completedPhase: number
    nextPhase: number
    newCategory: string
  } | null>(null)
  const status = state?.room.status
  const currentRound = state?.room.gameRound ?? 1
  const prevRoundRef = useRef<number>(currentRound)

  // Lobiden gelirken "Başlat" için aşağı kaydırılmış konum taşınıyor ve telefonda oyuncu
  // "Senin Sıran" başlığını görmeden sayfanın ortasında açıyordu.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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
  const activeVoteStatus = state?.room.activeVote?.status
  const [turnShown, setTurnShown] = useState(currentPlayerId)
  if (turnShown !== currentPlayerId) {
    setTurnShown(currentPlayerId)
    setFeedback(null)
    setGuess('')
  }

  // Feedback mesajlarının ekranda kalıcı olmasını önlemek için zamanlayıcı
  useEffect(() => {
    if (!feedback) return
    const timer = setTimeout(() => {
      setFeedback(null)
    }, 4000)
    return () => clearTimeout(timer)
  }, [feedback])

  // Oylama veya sıra durumu değiştiğinde eski bildirimleri temizle
  useEffect(() => {
    if (!activeVoteStatus || activeVoteStatus === 'closed') {
      // Oylama kapandığında veya sıra devrinde temizle
    }
  }, [activeVoteStatus, currentPlayerId])

  const handleGuess = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!guess.trim() || isBusy) return

    setIsBusy(true)
    try {
      const result = await apiRequest<GuessResult>(`/api/rooms/${roomId}/guess`, {
        method: 'POST',
        body: { guess: guess.trim() },
      })

      if (result.phaseChanged && result.newPhase) {
        setPhaseTransition({
          completedPhase: result.newPhase - 1,
          nextPhase: result.newPhase,
          newCategory: result.newCategory || 'all',
        })
        setShowConfetti(true)
        setTimeout(() => {
          setPhaseTransition(null)
          setShowConfetti(false)
        }, 4500)
      }

      if (result.correct) {
        setGuessResultModal({ isCorrect: true, message: result.message, guessText: guess.trim() })
        setFeedback({ tone: 'success', text: result.message })
        setGuess('')
        setShowConfetti(true)
        void refresh()
        setTimeout(async () => {
          setGuessResultModal(null)
          setShowConfetti(false)
          await refresh()
        }, 3500)
      } else {
        setGuessResultModal({ isCorrect: false, message: result.message, guessText: guess.trim() })
        setFeedback({ tone: 'error', text: result.message })
        setGuess('')
        void refresh()
        setTimeout(async () => {
          setGuessResultModal(null)
          await refresh()
        }, 3500)
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

  const [isPhaseReadying, setIsPhaseReadying] = useState(false)
  const [isStartingNextPhase, setIsStartingNextPhase] = useState(false)

  const handlePhaseReady = async () => {
    setIsPhaseReadying(true)
    try {
      await apiRequest(`/api/rooms/${roomId}/phase-ready`, { method: 'POST' })
      await refresh()
    } catch {
      //
    } finally {
      setIsPhaseReadying(false)
    }
  }

  const handleStartNextPhase = async () => {
    setIsStartingNextPhase(true)
    try {
      await apiRequest(`/api/rooms/${roomId}/start-next-phase`, { method: 'POST' })
      await refresh()
    } catch {
      //
    } finally {
      setIsStartingNextPhase(false)
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
        setGuessResultModal({ isCorrect: true, message: result.message, guessText: buzzerGuess.trim() })
        setFeedback({ tone: 'success', text: result.message })
        setBuzzerGuess('')
        setIsBuzzerOpen(false)
        setShowConfetti(true)
        setTimeout(async () => {
          setGuessResultModal(null)
          setShowConfetti(false)
          await refresh()
        }, 3500)
      } else {
        setGuessResultModal({ isCorrect: false, message: result.message, guessText: buzzerGuess.trim() })
        setFeedback({ tone: 'error', text: result.message })
        setBuzzerGuess('')
        setIsBuzzerOpen(false)
        setTimeout(async () => {
          setGuessResultModal(null)
          await refresh()
        }, 3500)
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
    setShowPaperAirplane(true)
    setTimeout(() => setShowPaperAirplane(false), 1400)
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

  const handleTextQuestionSubmit = async (params: { questionId?: string; questionText: string }) => {
    setIsBusy(true)
    setShowPaperAirplane(true)
    setTimeout(() => setShowPaperAirplane(false), 1400)
    try {
      const result = await apiRequest<{ message: string; closesAt: string }>(`/api/rooms/${roomId}/text-question`, {
        method: 'POST',
        body: params,
      })
      setIsQuestionPickerOpen(false)
      setFeedback({ tone: 'success', text: result.message })
      await refresh()
    } catch (caught) {
      setFeedback({
        tone: 'error',
        text: caught instanceof ApiClientError ? caught.message : 'Soru iletilemedi.',
      })
    } finally {
      setIsBusy(false)
    }
  }

  // Takım notu oyunun akışını etkilemez; hata panelde gösterilsin diye burada yakalanmaz.
  const handleSendTeamNote = async (message: string) => {
    await apiRequest(`/api/rooms/${roomId}/team-note`, { method: 'POST', body: { message } })
    await refresh()
  }

  const handleTextVoteSubmit = async (answer: boolean) => {
    if (!state?.room.activeVote || isBusy) return
    setIsBusy(true)
    try {
      const result = await apiRequest<{ message: string; isResolved: boolean }>(`/api/rooms/${roomId}/vote`, {
        method: 'POST',
        body: { voteId: state.room.activeVote.id, answer },
      })
      setFeedback({ tone: 'success', text: result.message })
      await refresh()
    } catch (caught) {
      setFeedback({
        tone: 'error',
        text: caught instanceof ApiClientError ? caught.message : 'Oy iletilemedi.',
      })
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

  const handlePassName = async () => {
    if (isBusy) return
    setIsBusy(true)
    try {
      const result = await apiRequest<{ message: string }>(`/api/rooms/${roomId}/pass-name`, { method: 'POST' })
      setGuess('')
      setFeedback({ tone: 'success', text: result.message })
      await refresh()
    } catch (caught) {
      setFeedback({
        tone: 'error',
        text: caught instanceof ApiClientError ? caught.message : 'İsim pas geçilemedi.',
      })
      await refresh()
    } finally {
      setIsBusy(false)
    }
  }

  const handleConfirmLeave = async () => {
    setIsLeaving(true)
    try {
      await apiRequest(`/api/rooms/${roomId}/leave`, { method: 'POST' })
    } finally {
      router.push('/')
    }
  }

  if (phase === 'loading') {
    return (
      <div className="min-h-[calc(100dvh-4rem)] px-4 py-8">
        <div className="mx-auto max-w-5xl space-y-6 flex flex-col items-center justify-center min-h-[50vh]" aria-busy="true" aria-label="Oyun yükleniyor">
          <PencilLoader size={44} text="Oyun Yükleniyor..." color="var(--pencil-yellow)" />
        </div>
      </div>
    )
  }

  if (phase === 'error' || !state) {
    return (
      <div className="flex min-h-[calc(100dvh-4rem)] items-center justify-center p-4">
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
  // Takım modu: sıra takım arkadaşında (isim ondan olduğu gibi benden de gizli, oy da veremem).
  const isTeammateTurn = Boolean(
    state.room.teamMode &&
      !state.you.isYourTurn &&
      currentPlayer &&
      state.room.teams?.find((team) => team.id === state.you.teamId)?.memberIds.includes(currentPlayer.id),
  )

  return (
    <div className="relative min-h-[calc(100dvh-4rem)] px-3 py-4 sm:px-4 sm:py-8">
      <Confetti trigger={showConfetti} />
      <PaperAirplane trigger={showPaperAirplane} />

      {/* Hız Modu Tur Geçiş Ekranı Overlay — Defter Sayfası Çevirme */}
      {roundTransition && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <PageFlipTransition type="flip" className="max-w-lg w-full">
            <div className="paper-card-lg p-6 sm:p-8 text-center border-4 border-pencil-yellow shadow-2xl space-y-5">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pencil-yellow/20 text-pencil-yellow animate-bounce">
                <Trophy className="h-9 w-9 text-pencil-yellow" />
              </div>

              <div>
                <span className="tag border-pencil-yellow text-pencil-yellow font-bold text-sm uppercase tracking-wider">
                  Tur Sonu Özeti
                </span>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-ink">
                  {roundTransition.completedRound}. Tur Tamamlandı!
                </h2>
                <p className="mt-1 text-base text-ink-faded font-display">
                  {roundTransition.nextRound}. Tur Başlıyor — <strong className="text-pencil-green">Yeni Gizli İsimler Dağıtıldı!</strong>
                </p>
              </div>

              <div className="space-y-2 rounded-sketch-md bg-paper-card-alt p-4 border-2 border-dashed border-paper-border text-left">
                <div className="text-sm font-sans font-bold text-ink-faded uppercase tracking-wider mb-2">
                  Bu Turdaki Skorlar:
                </div>
                {roundTransition.scores.map((p, idx) => (
                  <div key={idx} className="flex items-center justify-between font-display text-base py-1 border-b border-paper-border/50 last:border-0">
                    <div className="flex items-center gap-1.5">
                      {p.isHost && <Crown className="h-4 w-4 text-pencil-yellow" />}
                      <span className="font-bold text-ink">{p.nickname}</span>
                      {p.isYou && <span className="tag tag-you text-xs">SEN</span>}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-pencil-green font-bold">+{p.roundScore} P</span>
                      <span className="text-ink-faded text-sm font-semibold">({p.totalScore} P Toplam)</span>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setRoundTransition(null)}
                className="btn-pencil-yellow w-full py-3.5 font-display text-xl font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >
                {roundTransition.nextRound}. Tura Başla →
              </button>
            </div>
          </PageFlipTransition>
        </div>
      )}

      {/* 3 Fazlı Mod Faz Geçiş Ekranı Overlay */}
      {phaseTransition && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
          <PageFlipTransition type="flip" className="max-w-lg w-full">
            <div className="paper-card-lg p-6 sm:p-8 text-center border-4 border-pencil-purple shadow-2xl space-y-5">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-pencil-purple/20 text-pencil-purple animate-bounce">
                <Sparkles className="h-9 w-9 text-pencil-purple" />
              </div>

              <div>
                <span className="tag border-pencil-purple text-pencil-purple font-bold text-sm uppercase tracking-wider">
                  Faz Sonu Özeti
                </span>
                <h2 className="mt-2 font-display text-3xl sm:text-4xl font-bold text-ink">
                  {phaseTransition.completedPhase}. Faz Tamamlandı!
                </h2>
                <p className="mt-1 text-base text-ink-faded font-display">
                  {phaseTransition.nextPhase}. Faza Geçiliyor — Yeni Kategori: <strong className="text-pencil-purple">{CATEGORIES.find((c) => c.id === phaseTransition.newCategory)?.label || phaseTransition.newCategory}</strong>
                </p>
              </div>

              <button
                onClick={() => setPhaseTransition(null)}
                className="btn-pencil-purple w-full py-3.5 font-display text-xl font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >
                {phaseTransition.nextPhase}. Faza Başla →
              </button>
            </div>
          </PageFlipTransition>
        </div>
      )}

      {/* Doğru / Yanlış Tahmin Görsel Animasyon Modalı */}
      <AnimatePresence>
        {guessResultModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.75, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: -10 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className={`paper-card-lg max-w-md w-full p-8 text-center border-4 shadow-2xl space-y-4 ${
                guessResultModal.isCorrect
                  ? 'border-pencil-green bg-paper-card'
                  : 'border-pencil-red bg-paper-card'
              }`}
            >
              <div className="flex justify-center">
                {guessResultModal.isCorrect ? (
                  <CheckmarkDraw size={72} strokeWidth={5} color="var(--pencil-green)" />
                ) : (
                  <CrossDraw size={72} strokeWidth={5} color="var(--pencil-red)" />
                )}
              </div>

              <div>
                <span
                  className={`tag font-bold text-sm uppercase tracking-wider ${
                    guessResultModal.isCorrect
                      ? 'border-pencil-green text-pencil-green'
                      : 'border-pencil-red text-pencil-red'
                  }`}
                >
                  {guessResultModal.isCorrect ? 'Tebrikler! 🎉' : 'Tahmin Yanlış! 💔'}
                </span>
                <h3 className="mt-2 font-display text-3xl font-bold text-ink">
                  &ldquo;{guessResultModal.guessText}&rdquo;
                </h3>
                <p className="mt-2 text-base text-ink-faded font-sans">
                  {guessResultModal.message}
                </p>
              </div>

              {!guessResultModal.isCorrect && !isSpeed && !isSharedTarget && (
                <div className="pt-2 flex items-center justify-center gap-2 text-pencil-red font-display text-base font-bold">
                  <TornPaperHeart isFilled={false} size={28} />
                  <span>1 Can Kaybedildi!</span>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Ortak Hedef Modu — Tahmin Modalı */}
      <AnimatePresence>
        {isBuzzerOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="paper-card-lg max-w-md w-full p-6 sm:p-8 text-center border-2 border-pencil-green shadow-2xl space-y-4"
            >
              <div className="flex items-center justify-between">
                <span className="tag border-pencil-green text-pencil-green font-bold text-sm uppercase flex items-center gap-1.5">
                  <Target className="h-4 w-4 text-pencil-green" />
                  <span>Gizli Hedef Tahmini</span>
                </span>
                <button
                  type="button"
                  onClick={() => setIsBuzzerOpen(false)}
                  className="rounded-full p-1.5 text-ink-faded hover:bg-paper-card-alt hover:text-ink transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <h3 className="font-display text-3xl sm:text-4xl font-bold text-ink">
                Gizli Hedef Kim?
              </h3>
              <p className="text-base text-ink-faded font-sans">
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
                  data-testid="buzzer-input"
                  className="paper-input-boxed text-center font-display text-3xl font-bold w-full"
                />

                <div className="flex gap-2">
                  <button
                    type="submit"
                    disabled={isBusy || !buzzerGuess.trim()}
                    data-testid="buzzer-submit"
                    className="btn-pencil-green flex-1 py-3.5 font-display text-xl font-bold flex items-center justify-center gap-2 shadow-sm"
                  >
                    {isBusy ? <Loader2 className="h-5 w-5 animate-spin" /> : <><span>Tahmini Gönder</span><Send className="h-5 w-5" /></>}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsBuzzerOpen(false)}
                    disabled={isBusy}
                    className="btn-outline px-5 py-3.5 font-display text-base font-bold"
                  >
                    İptal
                  </button>
                </div>
              </form>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

      {/* 3 Fazlı Mod Faz Geçişi Overlay — Rulo Kağıt & Skor Tablosu & Hazır Olma Senkronizasyonu */}
      {state?.room.phaseIntermission && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <PageFlipTransition type="curl" className="max-w-lg w-full">
            <div className="paper-card-lg p-6 sm:p-8 text-center border-4 border-pencil-purple shadow-2xl space-y-4">
              <div>
                <span className="tag border-pencil-purple text-pencil-purple font-bold text-sm uppercase tracking-wider">
                  {state.room.phaseIntermission.completedPhase}. Faz Tamamlandı!
                </span>
                <h2 className="mt-1.5 font-display text-3xl sm:text-4xl font-bold text-ink">
                  {state.room.phaseIntermission.completedPhase}. Faz Sona Erdi
                </h2>
              </div>

              {/* 3 Fazın Durumu Kartları */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-left">
                {(state.room.phaseCategories || ['sporcular', 'cizgi_karakterler', 'tarihi_kisiler']).map(
                  (catId, pIdx) => {
                    const phaseNum = pIdx + 1
                    const isCompleted = phaseNum <= state.room.phaseIntermission!.completedPhase
                    const isNext = phaseNum === state.room.phaseIntermission!.nextPhase
                    const catLabel = CATEGORIES.find((c) => c.id === catId)?.label || catId

                    return (
                      <div
                        key={pIdx}
                        className={`p-2.5 rounded-sketch border transition-all ${
                          isNext
                            ? 'bg-pencil-purple/15 border-pencil-purple text-pencil-purple font-bold shadow-xs'
                            : isCompleted
                              ? 'bg-paper-card-alt border-paper-border text-ink-faded'
                              : 'bg-paper-card border-dashed border-paper-border text-ink-extra-faded'
                        }`}
                      >
                        <div className="flex items-center justify-between text-xs font-sans mb-1">
                          <span className="font-bold">{phaseNum}. Faz</span>
                          {isCompleted ? (
                            <span className="text-pencil-green font-bold flex items-center gap-0.5">
                              <Check className="h-3 w-3" /> Bitti
                            </span>
                          ) : isNext ? (
                            <span className="text-pencil-purple font-bold">
                              ➔ Başlıyor
                            </span>
                          ) : (
                            <span className="text-xs">Beklemede</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1 font-display text-sm truncate">
                          <CategoryIcon category={catId} className="h-3.5 w-3.5 shrink-0" />
                          <span className="truncate">{catLabel}</span>
                        </div>
                      </div>
                    )
                  },
                )}
              </div>

              {/* Güncel Puan Durumu Tablosu */}
              <div className="space-y-1.5 rounded-sketch-md bg-paper-card-alt p-3.5 border-2 border-dashed border-paper-border text-left">
                <div className="text-xs font-sans font-bold text-ink-faded uppercase tracking-wider mb-2 flex items-center justify-between">
                  <span>Güncel Puan Durumu:</span>
                  <span className="text-xs font-mono font-bold text-pencil-purple">
                    {state.room.phaseIntermission.readyCount}/{state.room.phaseIntermission.totalPlayers} Oyuncu Hazır
                  </span>
                </div>
                {[...state.players]
                  .sort((a, b) => b.score - a.score)
                  .map((p, idx) => {
                    const isYou = p.id === state.you.playerId
                    const isReady = state.room.phaseIntermission!.readyPlayerIds.includes(p.id)

                    return (
                      <div
                        key={p.id}
                        className="flex items-center justify-between font-display text-base py-1 border-b border-paper-border/50 last:border-0"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="font-mono text-xs font-bold text-ink-faded w-4">
                            {idx + 1}.
                          </span>
                          {p.isHost && <Crown className="h-4 w-4 text-pencil-yellow shrink-0" />}
                          <span className="font-bold text-ink truncate">{p.nickname}</span>
                          {isYou && <span className="tag tag-you text-xs">SEN</span>}
                          {isReady ? (
                            <span className="tag text-xs border-pencil-green text-pencil-green font-sans font-bold py-0">
                              ✓ Hazır
                            </span>
                          ) : (
                            <span className="text-xs text-ink-extra-faded font-sans">
                              Bekliyor...
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="font-display font-bold text-ink text-base">{p.score} P</span>
                        </div>
                      </div>
                    )
                  })}
              </div>

              <p className="text-xs text-ink-faded font-sans">
                Yeni fazda yeni kategoriden isimler dağıtılır, puanlarınız korunur ve canlarınız yenilenir.
              </p>

              {/* Aksiyon Butonları (Host / Katılımcı) */}
              <div className="space-y-2 pt-1">
                {state.you.isHost ? (
                  <button
                    type="button"
                    disabled={isStartingNextPhase}
                    onClick={() => void handleStartNextPhase()}
                    className="btn-pencil-red w-full py-3.5 font-display text-xl font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                  >
                    {isStartingNextPhase ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Başlatılıyor...</span>
                      </>
                    ) : (
                      <>
                        <span>{state.room.phaseIntermission.nextPhase}. Faza Başla</span>
                        <span className="text-sm font-sans font-normal opacity-90">
                          ({state.room.phaseIntermission.readyCount}/{state.room.phaseIntermission.totalPlayers} Hazır)
                        </span>
                      </>
                    )}
                  </button>
                ) : state.room.phaseIntermission.isReady ? (
                  <div className="p-3 rounded-sketch bg-pencil-green/10 border border-pencil-green text-pencil-green font-display text-base font-bold flex items-center justify-center gap-2">
                    <CheckCircle2 className="h-5 w-5 shrink-0" />
                    <span>Hazırsınız! Oda sahibinin başlatması bekleniyor...</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    disabled={isPhaseReadying}
                    onClick={() => void handlePhaseReady()}
                    className="btn-pencil-green w-full py-3.5 font-display text-xl font-bold shadow-md hover:scale-[1.02] active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                  >
                    {isPhaseReadying ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>Hazırlanıyor...</span>
                      </>
                    ) : (
                      <>
                        <Check className="h-5 w-5" />
                        <span>Hazırım!</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </PageFlipTransition>
        </div>
      )}

      <div className="mx-auto max-w-5xl space-y-4 sm:space-y-6">
        {/* Game Header Bar */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="paper-card-lg p-4 sm:p-6"
        >
          <div className="flex items-start justify-between gap-3 sm:flex-wrap sm:items-center sm:gap-4">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="font-display text-2xl font-bold text-ink sm:text-3xl">
                  KimBu<span className="inline-block animate-wiggle text-pencil-yellow">?</span>
                </span>
                <span className="tag font-mono text-sm font-bold tracking-widest text-pencil-red tag-animate">
                  {state.room.roomCode}
                </span>
              </div>
              {/* Telefonda etiketler tek satırda yatay kayar; başlık kartı ekranın yarısını yemesin. */}
              <div className="no-scrollbar -mx-1 mt-2 flex items-center gap-2 overflow-x-auto whitespace-nowrap px-1 pb-1 sm:mx-0 sm:flex-wrap sm:gap-3 sm:overflow-visible sm:whitespace-normal sm:px-0 sm:pb-0">
                <span className={`tag ${
                  isSpeed
                    ? 'border-pencil-green text-pencil-green font-bold'
                    : isPersistent
                      ? 'border-pencil-blue text-pencil-blue font-bold'
                      : isSharedTarget
                        ? 'border-pencil-orange text-pencil-orange font-bold'
                        : 'border-pencil-yellow text-pencil-yellow font-bold'
                }`}>
                  {isSpeed && <Zap className="h-4 w-4 mr-1 inline" />}
                  {isPersistent && <Brain className="h-4 w-4 mr-1 inline" />}
                  {isSharedTarget && <Users className="h-4 w-4 mr-1 inline" />}
                  {!isSpeed && !isPersistent && !isSharedTarget && <Target className="h-4 w-4 mr-1 inline" />}
                  {isSpeed
                    ? `Hız Modu (Tur ${state.room.gameRound} / ${state.room.totalRounds})`
                    : isPersistent
                      ? `Israrcı Mod (10 Soru Bütçesi)`
                      : isSharedTarget
                        ? `Ortak Hedef (Tur ${state.room.gameRound} / ${state.room.totalRounds})`
                        : `Klasik Tur ${state.room.gameRound}`}
                </span>

                {/* Kategori ve Faz Bilgisi */}
                {state.room.categoryMode === 'multi_phase' ? (
                  <span className="tag border-pencil-purple text-pencil-purple font-bold flex items-center gap-1.5">
                    <Layers className="h-4 w-4" />
                    <span>
                      Faz {state.room.currentPhase || 1}/{state.room.totalPhases || 3}:{' '}
                      <CategoryIcon category={state.room.activeCategory} className="h-3.5 w-3.5 inline" />{' '}
                      {CATEGORIES.find((c) => c.id === state.room.activeCategory)?.label || state.room.activeCategory}
                    </span>
                    <span className="ml-1 flex items-center gap-1 text-xs">
                      {[1, 2, 3].map((step) => (
                        <span
                          key={step}
                          className={`h-2.5 w-2.5 rounded-full ${
                            step === (state.room.currentPhase || 1)
                              ? 'bg-pencil-purple ring-2 ring-pencil-purple'
                              : step < (state.room.currentPhase || 1)
                                ? 'bg-pencil-purple/40'
                                : 'bg-paper-border'
                          }`}
                        />
                      ))}
                    </span>
                  </span>
                ) : (
                  <span className="tag border-pencil-purple text-pencil-purple font-bold flex items-center gap-1">
                    <Layers className="h-4 w-4" />
                    <span>
                      <CategoryIcon category={state.room.selectedCategory || 'all'} className="h-4 w-4 inline" />{' '}
                      {CATEGORIES.find((c) => c.id === (state.room.selectedCategory || 'all'))?.label || 'Tümü'}
                    </span>
                  </span>
                )}

                {!isSharedTarget && (
                  <span className="tag">
                    {state.namesRemaining} İsim Kaldı
                  </span>
                )}
                <span className={`tag ${
                  state.room.communicationMode === 'text'
                    ? 'border-pencil-green text-pencil-green font-bold'
                    : 'border-pencil-yellow text-pencil-yellow font-bold'
                }`}>
                  {state.room.communicationMode === 'text' ? (
                    <>
                      <MessageSquare className="h-4 w-4 mr-1 inline" />
                      <span>Tam Metin</span>
                    </>
                  ) : (
                    <>
                      <Mic className="h-4 w-4 mr-1 inline" />
                      <span>Sesli İletişim</span>
                    </>
                  )}
                </span>
                {isSharedTarget && isReferee && (
                  <span className="tag border-pencil-yellow text-pencil-yellow font-bold flex items-center gap-1">
                    <Crown className="h-4 w-4 text-pencil-yellow" />
                    <span>Hakem Rolündesiniz</span>
                  </span>
                )}
                {degraded && <span className="tag border-pencil-orange text-pencil-orange">Canlı bağlantı yok</span>}
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsLeaveModalOpen(true)}
              aria-label="Oyundan Çık"
              className="btn-outline flex min-h-11 min-w-11 shrink-0 items-center justify-center gap-2 px-3 py-2 font-display text-lg font-bold hover:border-pencil-red hover:text-pencil-red transition-all sm:px-4 sm:py-2.5"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Oyundan Çık</span>
            </motion.button>
          </div>
        </motion.header>


        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-3">
          {/* Main Play Arena */}
          <main className="lg:col-span-2 space-y-6">
            <PageFlipTransition key={`${state.room.gameRound}-${state.room.currentPhase || 1}-${state.room.currentPlayerId}`} type="flip">
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`p-4 sm:p-8 transition-all duration-300 ${
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
                        className="sticky-note sticky-note-yellow p-6 text-center shadow-md border-2 border-pencil-yellow"
                      >
                        <span className="flex items-center justify-center gap-1.5 font-display text-base font-bold text-pencil-yellow uppercase tracking-wider">
                          <Crown className="h-5 w-5" />
                          <span>GİZLİ HEDEF (YALNIZCA SİZ GÖRÜYORSUNUZ)</span>
                        </span>
                        <h2
                          data-testid="active-target-name"
                          className="mt-2 font-display text-4xl sm:text-5xl font-bold text-ink"
                        >
                          {state.room.sharedTargetName ?? 'Hedef Belirlenmedi'}
                        </h2>
                        <p className="mt-1 text-sm text-ink-faded font-sans">
                          Yarışmacıların sorularını aşağıdaki butonlarla dürüstçe yanıtlayın.
                        </p>
                      </motion.div>

                      {/* Bekleyen Soru Yanıtlama Alanı */}
                      {state.room.pendingQuestion ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="paper-card-alt p-5 sm:p-6 border-2 border-pencil-orange rounded-sketch-md text-center space-y-4"
                        >
                          <span className="tag border-pencil-orange text-pencil-orange font-bold text-sm uppercase animate-pulse">
                            Yeni Soru Geldi!
                          </span>
                          <div>
                            <span className="font-display text-base font-bold text-ink-faded block">
                              {state.room.pendingQuestion.askerNickname} Soruyor:
                            </span>
                            <p className="font-display text-3xl font-bold text-ink mt-1">
                              &ldquo;{state.room.pendingQuestion.questionText}&rdquo;
                            </p>
                          </div>

                          <div className="grid grid-cols-3 gap-3 pt-2">
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => void handleAnswerQuestion('yes')}
                              disabled={isBusy}
                              className="btn-pencil-green py-4 font-display text-xl font-bold flex items-center justify-center gap-2"
                            >
                              <Check className="h-6 w-6" />
                              <span>EVET</span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => void handleAnswerQuestion('no')}
                              disabled={isBusy}
                              className="btn-pencil-red py-4 font-display text-xl font-bold flex items-center justify-center gap-2"
                            >
                              <X className="h-6 w-6" />
                              <span>HAYIR</span>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.03 }}
                              whileTap={{ scale: 0.97 }}
                              onClick={() => void handleAnswerQuestion('uncertain')}
                              disabled={isBusy}
                              className="btn-outline py-4 font-display text-lg font-bold flex items-center justify-center gap-2"
                            >
                              <HelpCircle className="h-6 w-6 text-ink-faded" />
                              <span>BELİRSİZ</span>
                            </motion.button>
                          </div>
                        </motion.div>
                      ) : isTargetRevealed ? (
                        /* Tur Bittiğinde Sonraki Tur Başlatma Kartı */
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="alert-success p-6 rounded-sketch-md space-y-4"
                        >
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-6 w-6 text-pencil-green animate-bounce" />
                            <h3 className="font-display text-2xl font-bold text-pencil-green">
                              {state.room.roundWinnerNickname ? `${state.room.roundWinnerNickname} Hedefi Bildi!` : 'Tur Tamamlandı!'}
                            </h3>
                          </div>
                          <p className="text-base text-ink font-sans">
                            Gizli hedef <strong>{state.room.sharedTargetName}</strong> herkese açıklandı.
                          </p>

                          {state.room.gameRound < state.room.totalRounds ? (
                            <div className="space-y-3 pt-2 border-t border-paper-border">
                              <label className="block font-display text-base font-bold text-ink text-left">
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
                                  className="paper-input font-display text-2xl flex-1"
                                />
                                <button
                                  type="button"
                                  onClick={() => void handleStartNextRound()}
                                  disabled={isBusy || !nextTargetInput.trim()}
                                  className="btn-pencil-green px-6 py-3.5 font-display text-xl font-bold shrink-0"
                                >
                                  {isBusy ? <Loader2 className="h-5 w-5 animate-spin" /> : `${state.room.gameRound + 1}. Tura Başla →`}
                                </button>
                              </div>

                              <div className="flex flex-wrap gap-2 text-left">
                                {NEXT_ROUND_SUGGESTIONS.slice(0, 5).map((sug) => (
                                  <button
                                    key={sug}
                                    type="button"
                                    onClick={() => setNextTargetInput(sug)}
                                    className="rounded-sketch bg-paper-card-alt px-3 py-1.5 text-xs font-sans font-bold border border-paper-border hover:border-pencil-green"
                                  >
                                    + {sug}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ) : (
                            <div className="p-3 bg-pencil-green/10 rounded-sketch text-base font-display font-bold text-pencil-green">
                              Tüm turlar tamamlandı! Skor ekranına yönlendiriliyorsunuz...
                            </div>
                          )}
                        </motion.div>
                      ) : (
                        <div className="text-center py-6 text-ink-faded font-display space-y-3">
                          <PencilLoader size={40} color="var(--pencil-yellow)" className="justify-center mx-auto" />
                          <p className="text-2xl font-bold text-ink">
                            {currentPlayer?.nickname ?? 'Yarışmacının'} Soru Sorması Bekleniyor...
                          </p>
                          <p className="text-sm text-ink-extra-faded font-sans">
                            Soru geldiğinde ekranınızda Evet/Hayır butonları belirecektir.
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* YARIŞMACI GÖRÜNÜMÜ */
                    <div className="space-y-6">
                      {/* Tahmin Butonu & Bilgilendirme */}
                      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-5 rounded-sketch-lg bg-paper-card-alt border-2 border-dashed border-pencil-green/40 shadow-xs">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sketch bg-pencil-green/15 text-pencil-green shadow-xs">
                            <Lightbulb className="h-7 w-7" />
                          </div>
                          <div>
                            <span className="block font-display text-2xl font-bold text-ink leading-tight">
                              Gizli Hedefi Biliyor Musun?
                            </span>
                            <p className="mt-0.5 text-base text-ink-faded font-sans">
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
                          data-testid="buzzer-guess-button"
                          className="btn-pencil-green px-7 py-3.5 font-display text-xl font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all shrink-0"
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
                          <span className="font-display text-base font-bold text-pencil-green uppercase">
                            HEDEF BULUNDU!
                          </span>
                          <h3 className="mt-2 font-display text-4xl font-bold text-ink">
                            {state.room.sharedTargetName}
                          </h3>
                          <p className="mt-2 text-sm text-ink-faded font-sans">
                            {state.room.roundWinnerNickname ? `Tebrikler ${state.room.roundWinnerNickname}! (+100 Puan)` : ''} Hakemin yeni turu başlatması bekleniyor...
                          </p>
                        </motion.div>
                      ) : state.you.isYourTurn ? (
                        <div className="space-y-4 text-center">
                          {state.you.skippedQuestionTurn ? (
                            <div className="alert-error p-4 text-left flex items-start gap-3">
                              <AlertCircle className="h-6 w-6 text-pencil-red shrink-0 mt-0.5" />
                              <div>
                                <span className="font-display text-lg font-bold block">
                                  Soru Sıranız Atlandı (Ceza)
                                </span>
                                <span className="text-sm text-ink-faded font-sans">
                                  Daha önce yanlış tahmin yaptığınız için bu soru sıranız atlandı. Sırayı devretmek için butona basın. (Buzzer tahmin hakkınız devam etmektedir!)
                                </span>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <span
                                data-testid="your-turn-banner"
                                className="highlight-yellow font-display text-2xl font-bold text-pencil-yellow tracking-wide inline-flex items-center gap-1.5 mb-2"
                              >
                                <Gamepad2 className="h-6 w-6 animate-bounce" />
                                <span>SENİN SORU SIRAN!</span>
                              </span>
                              <h3 className="font-display text-3xl font-bold text-ink">
                                Hakeme Bir Soru Sor
                              </h3>
                              <p className="text-sm text-ink-faded font-sans mb-4">
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
                                  className="paper-input font-display text-2xl w-full text-center"
                                />

                                <div className="flex gap-2">
                                  <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={isBusy || !questionText.trim()}
                                    className="btn-pencil-red flex-1 py-3.5 font-display text-xl font-bold flex items-center justify-center gap-2"
                                  >
                                    {isBusy ? <Loader2 className="h-5 w-5 animate-spin" /> : <><span>Soruyu İlet</span><Send className="h-5 w-5" /></>}
                                  </motion.button>

                                  <motion.button
                                    type="button"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => void handlePass()}
                                    disabled={isBusy}
                                    data-testid="pass-turn-button"
                                    className="btn-outline px-5 py-3.5 font-display text-base font-bold"
                                  >
                                    <SkipForward className="h-5 w-5" />
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
                              className="btn-outline w-full max-w-xs mx-auto py-3.5 font-display text-lg font-bold"
                            >
                              Sırayı Devret →
                            </button>
                          )}
                        </div>
                      ) : (
                        <div className="text-center py-4 font-display text-ink-faded space-y-2">
                          <PencilLoader size={32} color="var(--pencil-blue)" className="justify-center mx-auto" />
                          <p className="text-xl font-bold text-ink">
                            {currentPlayer?.nickname ?? 'Yarışmacı'} Hakeme Soru Soruyor...
                          </p>
                          <p className="text-sm text-ink-extra-faded font-sans">
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
                  <div className="mb-4 text-center sm:mb-6">
                    {state.you.isYourTurn ? (
                      <HandDrawnBorder color="var(--pencil-yellow)" className="inline-block p-1">
                        <motion.div
                          initial={{ scale: 0.8, rotate: -3 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                          className="inline-block px-3 py-1"
                        >
                          <span
                            data-testid="your-turn-banner"
                            className="highlight-yellow font-display text-2xl font-bold text-pencil-yellow tracking-wide flex items-center justify-center gap-2"
                          >
                            <Gamepad2 className="h-6 w-6 animate-bounce text-pencil-yellow" />
                            <span>SENİN SIRAN!</span>
                          </span>
                        </motion.div>
                      </HandDrawnBorder>
                    ) : (
                      <div className="tag tag-turn mx-auto inline-flex items-center gap-1.5 text-sm tag-animate">
                        <Target className="h-4 w-4 animate-spin" style={{ animationDuration: '6s' }} />
                        <span>{currentPlayer?.nickname ?? 'Oyuncu'} Tahmin Ediyor</span>
                      </div>
                    )}

                    <h2 className="mt-2 font-display text-2xl font-bold text-ink sm:mt-3 sm:text-4xl">
                      {state.you.isYourTurn
                        ? isPersistent && (state.you.questionBudgetRemaining ?? 10) === 0
                          ? 'Soru Bütçen Bitti — Karar Anı!'
                          : 'Ben Kimim? Soru Sor & Tahmin Et!'
                        : `${currentPlayer?.nickname ?? 'Oyuncu'} İpucu Arıyor`}
                    </h2>
                    <p className="mx-auto mt-2 max-w-md text-sm text-ink-faded font-sans sm:text-base">
                      {state.you.isYourTurn
                        ? isSpeed
                          ? 'Sorunu sesli sor ve "Soru Sordum" butonuna bas, ya da emin olduğunda tahminini yap!'
                          : isPersistent
                            ? (state.you.questionBudgetRemaining ?? 10) > 0
                              ? 'Sorunu sesli sorup "Soru Sordum" butonuna basabilir veya doğrudan tahmin yapabilirsin!'
                              : 'Soru bütçen bitti! Elindeki bilgilerle tahmin et ya da sırayı devret.'
                            : 'Sorunu sor ("Soru Sordum"), tahmin et ("Tahmin Et") veya ismi değiştir ("İsmi Pas Geç")!'
                        : isTeammateTurn
                          ? 'Takım arkadaşın ortak isminizi arıyor; cevabı sen de bilmiyorsun. Takım notuyla fikrini paylaş.'
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
                                className={`flex items-center gap-2 rounded-sketch-md border-2 px-4 py-2 shadow-sm transition-colors ${
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
                                <span className="font-display text-lg font-bold text-ink">
                                  {state.you.isYourTurn ? 'Soru Bütçen: ' : `${currentPlayer?.nickname ?? 'Oyuncu'} Bütçesi: `}
                                  <span
                                    className={`text-xl font-bold ${
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

                          {/* Can / Tahmin Hakkı Göstergesi — TornPaperHeart */}
                          <div className="flex items-center gap-2 rounded-sketch-md border-2 border-dashed border-paper-border bg-paper-card px-4 py-2 shadow-sm">
                            <span className="font-display text-base font-bold text-ink-faded">
                              Tahmin Hakkın:
                            </span>
                            <div className="flex items-center gap-1.5">
                              {Array.from({ length: maxLives }).map((_, index) => {
                                const isFilled = index < myLives
                                return (
                                  <TornPaperHeart
                                    key={index}
                                    isFilled={isFilled}
                                    size={22}
                                  />
                                )
                              })}
                            </div>
                          </div>

                          {/* Potansiyel Puan */}
                          <div className="flex items-center gap-2 rounded-sketch-md border-2 border-solid border-pencil-green bg-paper-card px-4 py-2 shadow-sm">
                            <Zap className="h-5 w-5 text-pencil-green animate-pulse" />
                            <span className="font-display text-lg font-bold text-ink">
                              {state.you.isYourTurn ? 'Şimdi Bilirsen: ' : `${currentPlayer?.nickname ?? 'Oyuncu'} Bilirse: `}
                              <span className="text-pencil-green text-xl font-bold">
                                +{state.you.isYourTurn ? (state.you.estimatedPoints ?? 100) : (currentPlayer?.estimatedPoints ?? 100)} P
                              </span>
                            </span>
                          </div>
                        </div>

                        {!state.you.isYourTurn && (
                          <div className="text-center font-sans text-sm text-ink-faded">
                            Senin durumun: <strong className="text-ink">{state.you.questionBudgetRemaining ?? 10}/10 Soru Bütçesi</strong> • <strong className="text-pencil-red">{myLives} Can</strong> • Sıran geldiğinde bilirsen: <strong className="text-pencil-green">+{state.you.estimatedPoints ?? 100} P</strong>
                          </div>
                        )}
                      </div>
                    ) : isSpeed ? (
                      <div className="mt-5 space-y-4">
                        <div className="flex flex-wrap items-center justify-center gap-4">
                          {/* Büyük Kum Saati Sayacı */}
                          <div className="flex items-center gap-3 rounded-sketch-md border-2 border-solid border-pencil-green bg-pencil-green/10 px-5 py-3 shadow-md">
                            <HourglassTimer
                              secondsLeft={Math.max(0, 20 - (state.you.isYourTurn ? state.you.questionsThisRound : (currentPlayer?.questionsThisRound ?? 0)))}
                              totalSeconds={20}
                              size={52}
                              showText={false}
                            />
                            <div className="text-left">
                              <span className="font-display text-xs uppercase tracking-wider text-pencil-green font-bold block">
                                ⏳ Kum Saati (Kalan Soru Bütçesi)
                              </span>
                              <span className="font-display text-2xl font-bold text-ink">
                                <span className="text-pencil-green font-bold text-3xl">
                                  {Math.max(0, 20 - (state.you.isYourTurn ? state.you.questionsThisRound : (currentPlayer?.questionsThisRound ?? 0)))}
                                </span>
                                <span className="text-ink-faded text-base"> / 20 Soru</span>
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 rounded-sketch-md border-2 border-solid border-pencil-green bg-paper-card px-4 py-3 shadow-sm">
                            <Zap className="h-6 w-6 text-pencil-green animate-pulse" />
                            <div className="text-left">
                              <span className="font-display text-xs uppercase tracking-wider text-pencil-green font-bold block">
                                Tur Puanı
                              </span>
                              <span className="font-display text-2xl font-bold text-pencil-green">
                                +{state.you.isYourTurn ? state.you.estimatedPoints : (currentPlayer?.estimatedPoints ?? 100)} P
                              </span>
                            </div>
                          </div>
                        </div>

                        {!state.you.isYourTurn && (
                          <div className="text-center font-sans text-sm text-ink-faded">
                            Senin durumun: <strong className="text-ink">{state.you.questionsThisRound} Soru</strong> • Sıran geldiğinde bilirsen: <strong className="text-pencil-green">+{state.you.estimatedPoints} P</strong>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="mt-3 flex flex-wrap items-center justify-center gap-2 sm:mt-4 sm:gap-3">
                        {/* Deneme Hakkı */}
                        <div
                          data-testid="own-lives-remaining"
                          className="flex items-center gap-2 rounded-sketch-md border-2 border-dashed border-paper-border bg-paper-card px-2.5 py-1.5 shadow-sm sm:px-3.5 sm:py-2"
                        >
                          <span className="font-display text-sm font-bold text-ink-faded">
                            <span className="sm:hidden">Can:</span>
                            <span className="hidden sm:inline">Deneme Hakkın:</span>
                          </span>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: maxLives }).map((_, index) => {
                              const isFilled = index < myLives
                              return (
                                <TornPaperHeart
                                  key={index}
                                  isFilled={isFilled}
                                  size={20}
                                />
                              )
                            })}
                          </div>
                        </div>

                        {/* Pas Geçme Hakkı */}
                        <div
                          data-testid="own-pass-rights"
                          className="flex items-center gap-2 rounded-sketch-md border-2 border-dashed border-paper-border bg-paper-card px-2.5 py-1.5 shadow-sm sm:px-3.5 sm:py-2"
                        >
                          <span className="font-display text-sm font-bold text-ink-faded">
                            <span className="sm:hidden">İsim Pas:</span>
                            <span className="hidden sm:inline">Kalan Pas Hakkın:</span>
                          </span>
                          <span className="font-display text-base font-bold text-pencil-orange">
                            {state.you.passRightsRemaining ?? 3} / 3
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Aktif Tam Metin Oylaması Varsa Göster */}
                  {state.room.activeVote && state.room.activeVote.status === 'open' && (
                    <div className="mb-6">
                      <VotingModal
                        vote={state.room.activeVote}
                        isAsker={state.room.activeVote.askerId === state.you.playerId}
                        onVote={handleTextVoteSubmit}
                        isBusy={isBusy}
                      />
                    </div>
                  )}

                  {/* Action Form or Secret Card */}
                  {state.you.isYourTurn ? (
                    state.you.nameSolved ? (
                      <div
                        data-testid="you-finished-early-banner"
                        className="mx-auto max-w-md p-6 text-center rounded-sketch-lg bg-pencil-green/10 border-2 border-pencil-green space-y-3"
                      >
                        <div className="flex justify-center text-pencil-green">
                          <CheckCircle2 className="h-12 w-12" />
                        </div>
                        <h3 className="font-display text-2xl font-bold text-ink">Tüm İsimlerinizi Tamamladınız! 🎉</h3>
                        <p className="text-sm text-ink-faded font-sans">
                          Tebrikler! Diğer oyuncuların tahminlerini tamamlaması bekleniyor.
                        </p>
                      </div>
                    ) : isSpeed || myLives > 0 ? (
                      <div className="mx-auto max-w-md space-y-4">
                        {/* Tam Metin Modu: Soru Bankasından Soru Seç Butonu veya Hak Kullanıldı Bildirimi */}
                        {state.room.communicationMode === 'text' && (!state.room.activeVote || state.room.activeVote.status === 'closed') && (
                          (!isPersistent || (state.you.questionBudgetRemaining ?? 10) > 0) && (
                            state.you.hasAskedQuestionThisTurn ? (
                              <div className="p-3.5 rounded-sketch-md bg-paper-card border border-dashed border-pencil-orange/50 text-center font-display text-base font-bold text-pencil-orange flex items-center justify-center gap-2">
                                <HelpCircle className="h-5 w-5 shrink-0" />
                                <span>Bu turdaki 1 soru hakkınızı kullandınız. Tahmin yapabilir veya sırayı devredebilirsiniz.</span>
                              </div>
                            ) : (
                              <motion.button
                                type="button"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setIsQuestionPickerOpen(true)}
                                disabled={isBusy}
                                data-testid="ask-question-button"
                                className="btn-pencil-yellow w-full py-3 font-display text-lg font-bold flex items-center justify-center gap-2 shadow-md border-2 border-pencil-yellow sm:py-4 sm:text-xl"
                              >
                                <HelpCircle className="h-6 w-6" />
                                <span className="sm:hidden">Soru Sor (30sn Oylama)</span>
                                <span className="hidden sm:inline">Soru Bankasından Soru Sor (30sn Oylama)</span>
                              </motion.button>
                            )
                          )
                        )}

                        <form onSubmit={handleGuess} className="space-y-4">
                          <div>
                            <label
                              htmlFor="guess"
                              className="mb-2 flex items-center justify-center gap-1.5 font-display text-xl font-bold text-ink sm:text-2xl"
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
                              data-testid="guess-input"
                              className="paper-input-boxed text-center font-display text-2xl font-bold transition-all duration-200 focus:scale-[1.02] sm:text-3xl"
                            />
                          </div>

                          {/* Telefonda: Tahmin Et tam genişlik, ikincil butonlar yan yana (dikey alan kazanmak için). */}
                          <div className="grid grid-cols-2 gap-2.5 sm:flex sm:flex-row">
                            <motion.button
                              type="submit"
                              whileHover={{ scale: 1.03, rotate: -0.5 }}
                              whileTap={{ scale: 0.97 }}
                              disabled={isBusy || !guess.trim()}
                              data-testid="guess-submit"
                              className="btn-pencil-red col-span-2 flex flex-1 items-center justify-center gap-2 py-3.5 font-display text-xl font-bold shadow-md"
                            >
                              {isBusy ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                              ) : (
                                <>
                                  <Send className="h-5 w-5" />
                                  <span>Tahmin Et</span>
                                </>
                              )}
                            </motion.button>
                            
                            {/* Soru Sorma / Sırayı Devretme Butonu — Israrcı'da bütçe bitse de sıra bırakılabilir */}
                            <motion.button
                              type="button"
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => void handlePass()}
                              disabled={isBusy}
                              data-testid="pass-turn-button"
                              className={`btn-outline flex items-center justify-center gap-2 px-3 py-3.5 font-display text-base font-bold sm:px-5 ${
                                !isSpeed && !isPersistent ? '' : 'col-span-2'
                              }`}
                            >
                              <SkipForward className="h-5 w-5" />
                              <span>
                                {state.room.communicationMode === 'text' ||
                                (isPersistent && (state.you.questionBudgetRemaining ?? 10) <= 0)
                                  ? 'Sırayı Devret'
                                  : !isSpeed && !isPersistent
                                    ? 'Soru Sordum'
                                    : 'Cevap Hayır (Sırayı Devret)'}
                              </span>
                            </motion.button>

                            {/* Klasik Modda 3. Seçenek: İsmi Pas Geç (Maksimum 3 hak) */}
                            {!isSpeed && !isPersistent && (
                              <motion.button
                                type="button"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => void handlePassName()}
                                disabled={isBusy || (state.you.passRightsRemaining ?? 3) <= 0}
                                data-testid="give-up-button"
                                className={`btn-outline flex items-center justify-center gap-1.5 px-4 py-3.5 font-display text-base font-bold border-dashed ${
                                  (state.you.passRightsRemaining ?? 3) <= 0
                                    ? 'opacity-40 cursor-not-allowed border-ink-faded text-ink-faded'
                                    : 'text-pencil-orange hover:border-pencil-orange hover:bg-pencil-orange/10'
                                }`}
                                title={
                                  (state.you.passRightsRemaining ?? 3) <= 0
                                    ? 'İsmi pas geçme hakkınız (3/3) doldu'
                                    : 'Can kaybı olmadan mevcut ismi bırakıp yeni bir isim alırsınız (Toplam 3 hak)'
                                }
                              >
                                <SkipForward className="h-4 w-4 text-pencil-orange" />
                                <span>İsmi Pas Geç ({state.you.passRightsRemaining ?? 3}/3)</span>
                              </motion.button>
                            )}
                          </div>
                        </form>
                      </div>
                    ) : (
                      <div className="p-4 text-center font-display text-xl font-bold text-pencil-red">
                        Canınız bittiği için tahmin hakkınız bulunmamaktadır. Sıranız otomatik olarak devredilmiştir.
                      </div>
                    )
                  ) : (
                    <div>
                      {state.you.nameSolved && (
                        <div
                          data-testid="you-finished-early-banner"
                          className="mb-4 mx-auto max-w-md p-3 text-center rounded-sketch bg-pencil-green/10 border border-pencil-green text-pencil-green font-display text-base font-bold flex items-center justify-center gap-2"
                        >
                          <CheckCircle2 className="h-5 w-5 shrink-0" />
                          <span>Tüm İsimlerinizi Tamamladınız! Diğer oyuncuları izliyorsunuz.</span>
                        </div>
                      )}
                      {/* Takım modu: sıra takım arkadaşındaysa isim ondan olduğu gibi senden de gizli */}
                      {!state.currentName && isTeammateTurn && currentPlayer && (
                        <div
                          data-testid="teammate-turn-banner"
                          className="sticky-note sticky-note-yellow mx-auto max-w-md p-5 text-center shadow-md"
                        >
                          <p className="font-display text-2xl font-bold text-ink">Takımının sırası!</p>
                          <p className="mt-1 text-sm text-ink-faded">
                            {currentPlayer.nickname} ortak isminizi tahmin etmeye çalışıyor. Takım notuyla yardım et.
                          </p>
                        </div>
                      )}
                      {state.currentName && (
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
                          <p
                            data-testid="active-target-name"
                            className="mt-2 font-display text-4xl font-bold text-ink tracking-wide"
                          >
                            {state.currentName}
                          </p>
                          <p className="mt-2 text-sm text-ink-faded font-sans">
                            {currentPlayer?.nickname ?? 'Sıradaki oyuncu'} bu ismi tahmin etmeye çalışıyor.
                          </p>
                        </motion.div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Guess / Feedback Messages — CheckmarkDraw & CrossDraw */}
              <div aria-live="polite" className="mt-6 min-h-[3rem]">
                {feedback && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={
                      feedback.tone === 'error'
                        ? { opacity: 1, scale: 1, x: [0, -8, 8, -4, 4, 0] }
                        : { opacity: 1, scale: [0.9, 1.05, 1] }
                    }
                    transition={{ duration: 0.45 }}
                    className={`mx-auto max-w-md text-center font-display text-lg font-bold flex items-center justify-center gap-3 p-3.5 rounded-sketch-lg shadow-sm ${
                      feedback.tone === 'success'
                        ? 'alert-success'
                        : 'alert-error'
                    }`}
                  >
                    {feedback.tone === 'success' ? (
                      <CheckmarkDraw size={28} />
                    ) : (
                      <CrossDraw size={28} />
                    )}
                    <span>{feedback.text}</span>
                  </motion.div>
                )}
              </div>
            </motion.div>
            </PageFlipTransition>

            {/* Ortak Hedef Modu — Ortak Soru-Cevap Not Defteri (Question Log) */}
            {isSharedTarget && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="paper-card-alt p-6 rounded-sketch-md border-2 border-dashed border-paper-border space-y-4"
              >
                <div className="flex items-center justify-between border-b border-paper-border pb-3">
                  <h3 className="font-display text-2xl font-bold text-ink flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-pencil-blue" />
                    <span>Ortak Soru-Cevap Not Defteri</span>
                  </h3>
                  <span className="text-sm font-mono text-ink-faded">
                    {state.room.questionLog?.length ?? 0} Soru
                  </span>
                </div>

                {state.room.questionLog && state.room.questionLog.length > 0 ? (
                  <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                    {state.room.questionLog.map((item, idx) => (
                      <div
                        key={item.id || idx}
                        className="flex flex-wrap items-center justify-between gap-2 p-3.5 bg-paper-card rounded-sketch border border-paper-border text-base font-display shadow-xs"
                      >
                        <div className="flex items-center gap-2 min-w-0">
                          <span className="text-sm font-mono font-bold text-ink-extra-faded">#{idx + 1}</span>
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
                  <p className="text-center py-4 text-sm font-sans text-ink-faded italic">
                    Henüz soru sorulmadı. Sırası gelen oyuncunun sorusu ve hakemin cevabı burada listelenecektir.
                  </p>
                )}
              </motion.div>
            )}
          </main>

          {/* Live Scoreboard & ClueCard Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            {state.room.teamMode && <TeamPanel state={state} onSendNote={handleSendTeamNote} />}

            {/* İpucu Kartı (Tam Metin Modu veya Soru Not Defteri) */}
            <ClueCard
              clueItems={state.you.clueCard}
              communicationMode={state.room.communicationMode}
              roomId={roomId}
              targetNameId={state.you.targetNameId}
            />

            <div className="paper-card-alt p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-display text-2xl font-bold text-ink flex items-center gap-2">
                  <Trophy className="h-6 w-6 text-pencil-yellow" />
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
                  const playerTeam = state.room.teams?.find((team) => team.memberIds.includes(player.id))

                  return (
                    <motion.div
                      key={player.id}
                      layout
                      className={`flex items-center justify-between border-2 p-3.5 transition-all ${
                        isCurrent && !isPlayerReferee
                          ? 'border-solid border-pencil-yellow bg-paper-card shadow-sm'
                          : 'border-dashed border-paper-border bg-paper-card'
                      }`}
                      style={{ borderRadius: '8px 4px 10px 6px' }}
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center font-display text-base font-bold text-white ${
                            isPlayerReferee
                              ? 'bg-pencil-orange'
                              : isCurrent
                                ? 'bg-pencil-yellow'
                                : 'bg-ink-faded'
                          }`}
                          style={{ borderRadius: '6px 3px 8px 4px' }}
                        >
                          {player.isBot ? <Bot className="h-4 w-4" aria-label="Bot" /> : initial}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            {isCurrent && !isPlayerReferee && (
                              <Target className="h-4 w-4 shrink-0 text-pencil-yellow animate-pulse" aria-label="Sırası" />
                            )}
                            {player.isHost && (
                              <Crown className="h-4 w-4 shrink-0 text-pencil-yellow" aria-label="Oda Sahibi / Hakem" />
                            )}
                            {playerTeam && (
                              <span
                                className={`h-3 w-3 shrink-0 rounded-full ${TEAM_STYLES[playerTeam.color].dot}`}
                                aria-label={playerTeam.name}
                              />
                            )}
                            <span className="truncate font-display text-xl font-bold text-ink">
                              {player.nickname}
                            </span>
                            {isYou && (
                              <span className="tag tag-you text-xs">SEN</span>
                            )}
                          </div>

                          {/* Ortak Hedef / Israrcı / Hız / Klasik Mod Sidebar Durumu */}
                          {isSharedTarget ? (
                            <div className="mt-1">
                              {isPlayerReferee ? (
                                <span className="text-xs font-sans font-bold text-pencil-orange flex items-center gap-1">
                                  <Crown className="h-3.5 w-3.5" />
                                  <span>Hakem</span>
                                </span>
                              ) : player.skippedQuestionTurn ? (
                                <span className="text-xs font-sans font-semibold text-pencil-red flex items-center gap-1">
                                  <AlertCircle className="h-3.5 w-3.5" />
                                  <span>Sıra Cezalı</span>
                                </span>
                              ) : (
                                <span className="text-xs font-sans text-ink-faded">
                                  Yarışmacı
                                </span>
                              )}
                            </div>
                          ) : isPersistent ? (
                            <div className="mt-1 space-y-1">
                              {player.nameSolved ? (
                                <div className="flex items-center gap-1.5 text-xs font-sans font-bold">
                                  <span className="flex items-center gap-1 text-pencil-green">
                                    <CheckCircle2 className="h-4 w-4" />
                                    <span>Bildi (+{player.score}P)</span>
                                  </span>
                                </div>
                              ) : pLives <= 0 ? (
                                <div className="flex items-center gap-1.5 text-xs font-sans font-bold">
                                  <span className="text-pencil-red flex items-center gap-1">
                                    <X className="h-4 w-4" />
                                    <span>Elendi (0P)</span>
                                  </span>
                                </div>
                              ) : (

                                <div className="space-y-1">
                                  <div className="flex items-center justify-between gap-2 text-xs font-sans">
                                    <span className="text-ink-faded">
                                      Bütçe: <strong className="text-pencil-blue">{player.questionBudgetRemaining ?? 10}/10</strong>
                                    </span>
                                    <span className="text-pencil-green font-semibold">
                                      +{player.estimatedPoints ?? 100}P
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    {Array.from({ length: maxLives }).map((_, idx) => (
                                      <TornPaperHeart
                                        key={idx}
                                        isFilled={idx < pLives}
                                        size={16}
                                      />
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          ) : isSpeed ? (
                            <div className="mt-1 space-y-1">
                              <div className="flex items-center gap-1.5 text-xs font-sans">
                                {player.hasFinishedRound ? (
                                  <span className="flex items-center gap-1 text-pencil-green font-bold">
                                    <CheckCircle2 className="h-4 w-4" />
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
                                      className="rounded bg-paper-card-alt px-1.5 py-0.5 border border-paper-border text-xs text-ink-faded font-mono"
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
                                <TornPaperHeart
                                  key={idx}
                                  isFilled={idx < pLives}
                                  size={18}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      <span className="shrink-0 font-display text-2xl font-bold text-ink">
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

      {/* Soru Seçici Modal */}
      <QuestionPicker
        isOpen={isQuestionPickerOpen}
        onClose={() => setIsQuestionPickerOpen(false)}
        onSelectQuestion={handleTextQuestionSubmit}
        isBusy={isBusy}
      />

      {/* Oyundan Çıkış Onay Modalı */}
      <AnimatePresence>
        {isLeaveModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isLeaving && setIsLeaveModalOpen(false)}
              className="fixed inset-0 bg-ink/60 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: 'spring', duration: 0.35, bounce: 0.2 }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="leave-modal-title"
              className="paper-card-lg relative z-10 max-w-md w-full p-6 sm:p-8 text-center shadow-2xl space-y-5"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-pencil-red/10 border-2 border-dashed border-pencil-red text-pencil-red">
                <LogOut className="h-7 w-7" />
              </div>

              <div>
                <h3 id="leave-modal-title" className="font-display text-3xl font-bold text-ink">
                  Maçı Terk Etmek İstiyor Musunuz?
                </h3>
                <p className="mt-2 text-sm text-ink-faded font-sans leading-relaxed">
                  Devam eden bir maçtan ayrılırsanız <strong className="text-pencil-red">hükmen mağlup</strong> sayılacaksınız ve bu maç istatistiklerinize yenilgi olarak işlenecektir.
                </p>
              </div>

              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  disabled={isLeaving}
                  onClick={() => setIsLeaveModalOpen(false)}
                  className="btn-outline flex-1 py-3 font-display text-base font-bold"
                >
                  Oyuna Devam Et
                </button>
                <button
                  type="button"
                  disabled={isLeaving}
                  onClick={() => void handleConfirmLeave()}
                  className="btn-pencil-red flex-1 py-3 font-display text-base font-bold flex items-center justify-center gap-2 shadow-md"
                >
                  {isLeaving ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <LogOut className="h-4 w-4" />
                      <span>Maçı Terk Et</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}


'use client'

import { Check, Clock, Loader2, ThumbsDown, ThumbsUp } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'

import { InkStamp } from '@/components/animations/InkStamp'
import { PencilLoader } from '@/components/animations/PencilLoader'
import { playSound, stopSound } from '@/lib/audio'
import type { TextQuestionVote } from '@/lib/game/types'

interface VotingModalProps {
  vote: TextQuestionVote
  isAsker: boolean
  /** Oylama yapan oyuncunun görebildiği gizli hedef karakter (mobilde kart üstte kapanınca görünmesi için). */
  targetName?: string | null
  onVote: (answer: boolean) => Promise<void>
  isBusy: boolean
}

// Tailwind `sm` kırılımının altı.
const MOBILE_QUERY = '(max-width: 639px)'
const CLOCK_SKEW_TOLERANCE_MS = 1500
const DEFAULT_VOTE_DURATION_SECS = 30

function resolveDeadlineMs(closesAt: string, secondsRemaining: number): number {
  const now = Date.now()
  const serverFallback = now + Math.max(0, secondsRemaining) * 1000
  const parsedCloses = Date.parse(closesAt)
  if (!Number.isFinite(parsedCloses)) return serverFallback
  const localRemainingMs = parsedCloses - now
  // İstemci saati sunucudan sapmışsa sunucunun gönderdiği kalan süreyi baz al.
  if (Math.abs(localRemainingMs - secondsRemaining * 1000) > CLOCK_SKEW_TOLERANCE_MS) {
    return serverFallback
  }
  return parsedCloses
}

function getTotalVoteSeconds(openedAt: string, closesAt: string): number {
  const openedMs = Date.parse(openedAt)
  const closesMs = Date.parse(closesAt)
  if (Number.isFinite(openedMs) && Number.isFinite(closesMs) && closesMs > openedMs) {
    return (closesMs - openedMs) / 1000
  }
  return DEFAULT_VOTE_DURATION_SECS
}

function subscribeToMobileQuery(onChange: () => void) {
  const query = window.matchMedia(MOBILE_QUERY)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

function useIsMobile() {
  return useSyncExternalStore(
    subscribeToMobileQuery,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false,
  )
}

export function VotingModal({ vote, isAsker, targetName, onVote, isBusy }: VotingModalProps) {
  const isMobile = useIsMobile()
  const shouldTick = !isAsker && !vote.hasVoted
  const shouldTickRef = useRef(shouldTick)
  const deadlineRef = useRef<number | null>(null)
  const lastVoteKeyRef = useRef<string>('')
  const totalVoteSeconds = getTotalVoteSeconds(vote.openedAt, vote.closesAt)

  const [localSeconds, setLocalSeconds] = useState(() => {
    const deadlineMs = resolveDeadlineMs(vote.closesAt, vote.secondsRemaining)
    return Math.max(0, Math.ceil((deadlineMs - Date.now()) / 1000))
  })

  useEffect(() => {
    shouldTickRef.current = shouldTick
    if (!shouldTick) {
      stopSound('countdown-tick')
    }
  }, [shouldTick])

  useEffect(() => {
    const voteKey = `${vote.id}:${vote.closesAt}`
    const now = Date.now()
    const currentRemaining = deadlineRef.current === null ? null : deadlineRef.current - now
    // Yeni oy oturumunda veya sunucu süresiyle belirgin kayma oluştuğunda bitiş zamanını güncelle.
    if (
      lastVoteKeyRef.current !== voteKey ||
      currentRemaining === null ||
      Math.abs(currentRemaining - vote.secondsRemaining * 1000) > CLOCK_SKEW_TOLERANCE_MS + 1000
    ) {
      lastVoteKeyRef.current = voteKey
      deadlineRef.current = resolveDeadlineMs(vote.closesAt, vote.secondsRemaining)
    }

    let lastTickedSecond = -1
    const tick = () => {
      const deadlineMs = deadlineRef.current ?? resolveDeadlineMs(vote.closesAt, vote.secondsRemaining)
      const secs = Math.max(0, Math.ceil((deadlineMs - Date.now()) / 1000))
      setLocalSeconds(secs)
      const isVisible = typeof document === 'undefined' || document.visibilityState === 'visible'
      if (shouldTickRef.current && isVisible && secs > 0 && secs <= 5 && secs !== lastTickedSecond) {
        lastTickedSecond = secs
        playSound('countdown-tick')
      } else if (!shouldTickRef.current || !isVisible || secs <= 0) {
        stopSound('countdown-tick')
      }
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        stopSound('countdown-tick')
        return
      }
      // Arka plandan dönünce yerel saati mevcut sunucu kalanıyla eşitle.
      deadlineRef.current = resolveDeadlineMs(vote.closesAt, vote.secondsRemaining)
      tick()
    }

    const syncTimer = setTimeout(tick, 0)
    const interval = setInterval(tick, 250)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      clearTimeout(syncTimer)
      clearInterval(interval)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      stopSound('countdown-tick')
    }
  }, [vote.id, vote.closesAt, vote.secondsRemaining])

  const progressPercent = Math.max(0, Math.min(100, (localSeconds / totalVoteSeconds) * 100))

  // İstek sürerken iki buton da aynı gri görünüyordu; seçilen şık vurgulu kalsın.
  const [pendingAnswer, setPendingAnswer] = useState<boolean | null>(null)
  const handleVote = async (answer: boolean) => {
    setPendingAnswer(answer)
    try {
      await onVote(answer)
    } finally {
      setPendingAnswer(null)
    }
  }
  const choiceClass = (answer: boolean) =>
    pendingAnswer === null
      ? ''
      : pendingAnswer === answer
        ? '!opacity-100 ring-4 ring-ink ring-offset-2 ring-offset-paper-card'
        : '!opacity-25'

  // Telefonda kart sayfanın ortasında kalıyor ve seçmen kaydırmazsa 30 sn'lik oylamayı
  // kaçırıyordu. Oy bekleyen seçmen için kart ekranın altına sabitlenir. Kart, sayfa
  // geçiş animasyonunun transform'lu kapsayıcısında durduğu için `fixed` ancak body'ye
  // portal ile taşındığında ekrana göre konumlanır.
  const pinned = isMobile && !isAsker && !vote.hasVoted

  const card = (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: pinned ? 20 : -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      role={pinned ? 'dialog' : undefined}
      aria-label={pinned ? 'Canlı soru oylaması' : undefined}
      className={`paper-card-alt p-5 sm:p-6 border-2 border-pencil-orange rounded-sketch-xl shadow-xl space-y-4 text-center overflow-hidden ${
        pinned
          ? 'fixed inset-x-3 bottom-[calc(var(--safe-bottom)+0.75rem)] z-40 max-h-[75dvh] overflow-y-auto'
          : 'relative'
      }`}
    >
      {/* Top Countdown Bar */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-paper-border">
        <motion.div
          className={`h-full transition-all duration-300 ${
            localSeconds <= 6 ? 'bg-pencil-red' : 'bg-pencil-orange'
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="flex items-center justify-between pt-1">
        <span className="tag border-pencil-orange text-pencil-orange font-bold text-sm uppercase flex items-center gap-1.5 animate-pulse">
          <Clock className="h-4 w-4" />
          <span>Canlı Soru Oylaması</span>
        </span>
        <span className="font-mono text-sm font-bold text-ink-faded flex items-center gap-1.5">
          <span>Kalan Süre:</span>
          <span className={`text-base font-bold ${localSeconds <= 6 ? 'text-pencil-red' : 'text-pencil-orange'}`}>
            {localSeconds}s
          </span>
        </span>
      </div>

      {isAsker ? (
        /* Asker Screen: Waiting for others to vote */
        <div className="py-2 space-y-3">
          <div className="text-sm font-sans font-bold text-ink-faded uppercase tracking-wider">
            Sorunuz Oylanıyor
          </div>
          <h3 className="font-display text-3xl sm:text-4xl font-bold text-ink">
            &ldquo;{vote.questionText}&rdquo;
          </h3>
          <div className="p-3.5 rounded-sketch-md bg-paper-card border border-dashed border-paper-border inline-flex items-center gap-3 text-base font-sans text-ink-faded">
            <PencilLoader size={24} color="var(--pencil-orange)" />
            <span>
              Arkadaşlarınızın oyları toplanıyor... ({vote.yesCount + vote.noCount} / {vote.totalEligible} oy verildi)
            </span>
          </div>
        </div>
      ) : (
        /* Responder Screen: Vote Yes / No with InkStamp effects */
        <div className="py-2 space-y-4">
          {targetName && (
            <div className="inline-flex flex-wrap items-center justify-center gap-1.5 px-3 py-1 rounded-sketch-md bg-pencil-green/10 border border-pencil-green/40 text-sm font-sans">
              <span className="text-pencil-green font-semibold">Hedef Karakter:</span>
              <span className="font-display font-bold text-ink text-base">{targetName}</span>
            </div>
          )}
          <div>
            <span className="font-display text-base font-bold text-pencil-blue block">
              {vote.askerNickname} Soruyor:
            </span>
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-ink mt-1">
              &ldquo;{vote.questionText}&rdquo;
            </h3>
          </div>

          {vote.hasVoted ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="p-4 rounded-sketch-md bg-pencil-green/10 border border-pencil-green/30 text-pencil-green font-display text-lg font-bold flex items-center justify-center gap-2 shadow-xs"
            >
              <Check className="h-6 w-6" />
              <span>
                Oyunuz {vote.myAnswer ? 'EVET' : 'HAYIR'} olarak mühürlendi! Diğer oyuncular bekleniyor...
              </span>
            </motion.div>
          ) : (
            <div className="grid grid-cols-2 gap-4 pt-1">
              <InkStamp
                color="green"
                data-testid="vote-yes"
                disabled={isBusy}
                onClick={() => void handleVote(true)}
                className={`btn-pencil-green w-full py-4 font-display text-2xl font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg ${choiceClass(true)}`}
              >
                {pendingAnswer === true ? <Loader2 className="h-6 w-6 animate-spin" /> : <ThumbsUp className="h-6 w-6" />}
                <span>EVET</span>
              </InkStamp>

              <InkStamp
                color="red"
                data-testid="vote-no"
                disabled={isBusy}
                onClick={() => void handleVote(false)}
                className={`btn-pencil-red w-full py-4 font-display text-2xl font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg ${choiceClass(false)}`}
              >
                {pendingAnswer === false ? <Loader2 className="h-6 w-6 animate-spin" /> : <ThumbsDown className="h-6 w-6" />}
                <span>HAYIR</span>
              </InkStamp>
            </div>
          )}
        </div>
      )}
    </motion.div>
  )

  return pinned ? createPortal(card, document.body) : card
}


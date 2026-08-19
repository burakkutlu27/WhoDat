'use client'

import { Check, Clock, Loader2, ThumbsDown, ThumbsUp } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect, useState } from 'react'

import type { TextQuestionVote } from '@/lib/game/types'

interface VotingModalProps {
  vote: TextQuestionVote
  isAsker: boolean
  onVote: (answer: boolean) => Promise<void>
  isBusy: boolean
}

export function VotingModal({ vote, isAsker, onVote, isBusy }: VotingModalProps) {
  const [localSeconds, setLocalSeconds] = useState(() => {
    const ms = new Date(vote.closesAt).getTime() - Date.now()
    return Math.max(0, Math.ceil(ms / 1000))
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const ms = new Date(vote.closesAt).getTime() - Date.now()
      setLocalSeconds(Math.max(0, Math.ceil(ms / 1000)))
    }, 500)
    return () => clearInterval(interval)
  }, [vote.closesAt])

  const progressPercent = Math.max(0, Math.min(100, (localSeconds / 15) * 100))

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="paper-card-alt p-5 sm:p-6 border-2 border-pencil-orange rounded-sketch-xl shadow-xl space-y-4 text-center relative overflow-hidden"
    >
      {/* Top Countdown Bar */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-paper-border">
        <motion.div
          className={`h-full transition-all duration-300 ${
            localSeconds <= 4 ? 'bg-pencil-red' : 'bg-pencil-orange'
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
          <span className={`text-base font-bold ${localSeconds <= 4 ? 'text-pencil-red' : 'text-pencil-orange'}`}>
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
          <div className="p-3.5 rounded-sketch-md bg-paper-card border border-dashed border-paper-border inline-flex items-center gap-2 text-base font-sans text-ink-faded">
            <Loader2 className="h-5 w-5 animate-spin text-pencil-orange" />
            <span>
              Arkadaşlarınızın oyları toplanıyor... ({vote.yesCount + vote.noCount} / {vote.totalEligible} oy verildi)
            </span>
          </div>
        </div>
      ) : (
        /* Responder Screen: Vote Yes / No */
        <div className="py-2 space-y-4">
          <div>
            <span className="font-display text-base font-bold text-pencil-blue block">
              {vote.askerNickname} Soruyor:
            </span>
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-ink mt-1">
              &ldquo;{vote.questionText}&rdquo;
            </h3>
          </div>

          {vote.hasVoted ? (
            <div className="p-4 rounded-sketch-md bg-pencil-green/10 border border-pencil-green/30 text-pencil-green font-display text-lg font-bold flex items-center justify-center gap-2">
              <Check className="h-6 w-6" />
              <span>
                Oyunuz {vote.myAnswer ? 'EVET' : 'HAYIR'} olarak iletildi! Diğer oyuncular bekleniyor...
              </span>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 pt-1">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => void onVote(true)}
                disabled={isBusy}
                className="btn-pencil-green py-4 font-display text-2xl font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <ThumbsUp className="h-6 w-6" />
                <span>EVET</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => void onVote(false)}
                disabled={isBusy}
                className="btn-pencil-red py-4 font-display text-2xl font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
              >
                <ThumbsDown className="h-6 w-6" />
                <span>HAYIR</span>
              </motion.button>
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}

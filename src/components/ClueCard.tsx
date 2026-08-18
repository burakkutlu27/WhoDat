'use client'

import { Check, ChevronDown, ChevronUp, FileText, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'

import type { ClueCardItem } from '@/lib/game/types'

interface ClueCardProps {
  clueItems?: ClueCardItem[]
  defaultExpanded?: boolean
}

export function ClueCard({ clueItems = [], defaultExpanded = true }: ClueCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)

  return (
    <div className="sticky-note sticky-note-yellow p-4 sm:p-5 rounded-2xl shadow-md border-2 border-pencil-yellow transition-all">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6 text-pencil-yellow" />
          <h3 className="font-display text-2xl font-bold text-ink flex items-center gap-2">
            <span>İpucu Not Defterim</span>
            <span className="text-xs bg-paper-card px-2.5 py-0.5 rounded-full border border-paper-border font-mono font-bold text-ink-faded">
              {clueItems.length}
            </span>
          </h3>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="p-1.5 rounded-md text-ink-faded hover:text-ink hover:bg-paper-card transition-colors"
          aria-label={isExpanded ? 'Not defterini daralt' : 'Not defterini genişlet'}
        >
          {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 pt-3 border-t border-pencil-yellow/30 space-y-2.5 overflow-hidden"
          >
            {clueItems.length > 0 ? (
              <div className="max-h-72 overflow-y-auto overflow-x-hidden space-y-2.5 pr-1 no-scrollbar">
                {clueItems.map((item, index) => {
                  const isYes = item.majority === 'yes'
                  const isNo = item.majority === 'no'
                  return (
                    <div
                      key={item.id || index}
                      className="p-3 bg-paper-card rounded-xl border border-paper-border shadow-2xs space-y-2"
                    >
                      {/* Soru Metni */}
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-mono font-bold text-pencil-blue bg-pencil-blue/10 px-1.5 py-0.5 rounded shrink-0 mt-0.5">
                          #{index + 1}
                        </span>
                        <p className="font-display text-base sm:text-lg font-bold text-ink leading-snug break-words">
                          {item.questionText}
                        </p>
                      </div>

                      {/* Oy Dağılımı ve Çoğunluk Kararı */}
                      <div className="flex items-center justify-between gap-2 pt-1 border-t border-dashed border-paper-border/60">
                        <span className="text-xs font-mono text-ink-faded font-medium">
                          {item.yesCount} Evet, {item.noCount} Hayır
                        </span>
                        <span
                          className={`text-xs font-sans font-bold px-2 py-0.5 rounded-md flex items-center gap-1 shrink-0 ${
                            isYes
                              ? 'bg-pencil-green text-white shadow-2xs'
                              : isNo
                                ? 'bg-pencil-red text-white shadow-2xs'
                                : 'bg-pencil-yellow text-ink shadow-2xs'
                          }`}
                        >
                          {isYes && <Check className="h-3.5 w-3.5" />}
                          {isNo && <X className="h-3.5 w-3.5" />}
                          <span>{isYes ? 'EVET' : isNo ? 'HAYIR' : 'EŞİT'}</span>
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <div className="py-4 text-center text-sm font-sans text-ink-faded">
                💡 Henüz soru sormadınız. Sıranız geldiğinde soru sorarak ipuçlarını buraya toplayın!
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

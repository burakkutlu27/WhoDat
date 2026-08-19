'use client'

import { Check, ChevronDown, ChevronUp, FileText, PenLine, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

import type { ClueCardItem, CommunicationMode } from '@/lib/game/types'

interface ClueCardProps {
  clueItems?: ClueCardItem[]
  defaultExpanded?: boolean
  communicationMode?: CommunicationMode
  roomId?: string
}

const QUICK_TAGS = ['Erkek', 'Kadın', 'Türk', 'Yabancı', 'Yaşıyor', 'Vefat Etti', 'Sanatçı', 'Sporcu']

export function ClueCard({
  clueItems = [],
  defaultExpanded = true,
  communicationMode = 'voice',
  roomId = '',
}: ClueCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded)
  const isVoiceMode = communicationMode === 'voice'

  // Sesli mod serbest not defteri durumu (localStorage ile kalıcı)
  const storageKey = `whoDat_voice_notes_${roomId || 'default'}`
  const [notes, setNotes] = useState('')
  const [isMounted, setIsMounted] = useState(false)
  const [isConfirmingClear, setIsConfirmingClear] = useState(false)
  const clearTimerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true)
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem(storageKey)
        if (saved) setNotes(saved)
      } catch {
        // localStorage erişimi engellenmişse sessizce geç
      }
    }
  }, [storageKey])

  useEffect(() => {
    return () => {
      if (clearTimerRef.current) clearTimeout(clearTimerRef.current)
    }
  }, [])

  const handleNotesChange = (newNotes: string) => {
    setNotes(newNotes)
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(storageKey, newNotes)
      } catch {
        // localStorage hatası
      }
    }
  }

  const handleClearClick = () => {
    if (!notes.trim()) return
    setIsConfirmingClear(true)
    if (clearTimerRef.current) clearTimeout(clearTimerRef.current)
    clearTimerRef.current = setTimeout(() => {
      setIsConfirmingClear(false)
    }, 4000)
  }

  const handleConfirmClear = () => {
    if (clearTimerRef.current) clearTimeout(clearTimerRef.current)
    setIsConfirmingClear(false)
    handleNotesChange('')
  }

  const handleCancelClear = () => {
    if (clearTimerRef.current) clearTimeout(clearTimerRef.current)
    setIsConfirmingClear(false)
  }

  const handleAddTag = (tag: string) => {
    const formattedTag = `• ${tag}`
    const updated = notes.trim() ? `${notes.trimEnd()}\n${formattedTag}` : formattedTag
    handleNotesChange(updated)
  }

  return (
    <div className="sticky-note sticky-note-yellow p-4 sm:p-5 rounded-sketch-lg shadow-md border-2 border-pencil-yellow transition-all">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {isVoiceMode ? (
            <PenLine className="h-6 w-6 text-pencil-yellow shrink-0" />
          ) : (
            <FileText className="h-6 w-6 text-pencil-yellow shrink-0" />
          )}
          <h3 className="font-display text-2xl font-bold text-ink flex items-center gap-2 truncate">
            <span>{isVoiceMode ? 'Not Defterim' : 'İpucu Not Defterim'}</span>
            {!isVoiceMode && (
              <span className="text-xs bg-paper-card px-2.5 py-0.5 rounded-full border border-paper-border font-mono font-bold text-ink-faded shrink-0">
                {clueItems.length}
              </span>
            )}
          </h3>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-sketch text-ink-faded hover:text-ink hover:bg-paper-card transition-colors"
            aria-label={isExpanded ? 'Not defterini daralt' : 'Not defterini genişlet'}
          >
            {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 pt-3 border-t border-pencil-yellow/30 space-y-2.5 overflow-hidden"
          >
            {isVoiceMode ? (
              /* SESLİ MOD: DÜZ YAZILI NOT ALMA ALANI */
              <div className="space-y-2.5">
                {/* Hızlı İpucu Etiketleri */}
                <div className="flex flex-wrap gap-1.5 items-center">
                  <span className="text-xs font-mono font-bold text-ink-extra-faded mr-0.5">
                    Hızlı:
                  </span>
                  {QUICK_TAGS.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleAddTag(tag)}
                      className="text-xs font-sans font-semibold px-2 py-0.5 rounded-sketch-sm bg-paper-card/90 hover:bg-paper-card border border-paper-border text-ink hover:border-pencil-yellow transition-all active:scale-95 shadow-2xs"
                    >
                      +{tag}
                    </button>
                  ))}
                </div>

                {/* Serbest Not Textarea */}
                <div className="relative">
                  <textarea
                    value={notes}
                    onChange={(e) => handleNotesChange(e.target.value)}
                    placeholder="Konuşulan ipuçlarını buraya not alabilirsin...&#10;Örn:&#10;• Erkek&#10;• Şarkıcı değil&#10;• 90'larda ünlü oldu&#10;• Yaşıyor"
                    rows={6}
                    style={{ outline: 'none', boxShadow: 'none', borderRadius: '18px' }}
                    className="paper-textarea !rounded-[18px]"
                  />
                </div>

                {/* Alt Bilgi & Tekil Inline Temizleme Butonu */}
                <div className="flex items-center justify-between text-xs font-mono text-ink-extra-faded px-1 min-h-[22px]">
                  <span>Otomatik kaydedilir</span>
                  {isMounted && notes.trim().length > 0 && (
                    <div>
                      {isConfirmingClear ? (
                        <div className="flex items-center gap-1.5 bg-paper-card px-2 py-0.5 rounded-sketch-sm border border-paper-border text-xs">
                          <span className="text-ink-faded font-medium">Temizlensin mi?</span>
                          <button
                            type="button"
                            onClick={handleConfirmClear}
                            className="text-pencil-red font-bold hover:underline"
                          >
                            Evet
                          </button>
                          <span className="text-paper-border">|</span>
                          <button
                            type="button"
                            onClick={handleCancelClear}
                            className="text-ink-faded hover:text-ink hover:underline"
                          >
                            İptal
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={handleClearClick}
                          className="text-ink-faded hover:text-pencil-red underline transition-colors"
                        >
                          Temizle
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* YAZILI MOD: OTOMATİK SORU & OYLAMA GEÇMİŞİ */
              clueItems.length > 0 ? (
                <div className="max-h-72 overflow-y-auto overflow-x-hidden space-y-2.5 pr-1 no-scrollbar">
                  {clueItems.map((item, index) => {
                    const isYes = item.majority === 'yes'
                    const isNo = item.majority === 'no'
                    return (
                      <div
                        key={item.id || index}
                        className="p-3 bg-paper-card rounded-sketch-md border border-paper-border shadow-2xs space-y-2"
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
                            className={`text-xs font-sans font-bold px-2 py-0.5 rounded-sketch-sm flex items-center gap-1 shrink-0 ${
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
                  Henüz soru sormadınız. Sıranız geldiğinde soru sorarak ipuçlarını buraya toplayın!
                </div>
              )
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

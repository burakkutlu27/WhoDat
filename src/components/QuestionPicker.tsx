'use client'

import { HelpCircle, Loader2, MessageSquarePlus, Search, Send, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useMemo, useState } from 'react'

import { QUESTION_BANK_SEED, QUESTION_TAGS, type QuestionBankItem } from '@/lib/game/questionBankData'

interface QuestionPickerProps {
  isOpen: boolean
  onClose: () => void
  onSelectQuestion: (question: { questionId?: string; questionText: string }) => Promise<void>
  isBusy: boolean
}

export function QuestionPicker({ isOpen, onClose, onSelectQuestion, isBusy }: QuestionPickerProps) {
  const [selectedTag, setSelectedTag] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [customQuestion, setCustomQuestion] = useState('')
  const [isCustomMode, setIsCustomMode] = useState(false)

  const filteredQuestions = useMemo(() => {
    let list = QUESTION_BANK_SEED
    if (selectedTag !== 'all') {
      list = list.filter((q) => q.tag === selectedTag)
    }
    if (searchQuery.trim()) {
      const qLower = searchQuery.trim().toLowerCase()
      list = list.filter((q) => q.textTr.toLowerCase().includes(qLower))
    }
    return list
  }, [selectedTag, searchQuery])

  const handlePickQuestion = async (q: QuestionBankItem) => {
    if (isBusy) return
    await onSelectQuestion({ questionId: q.id, questionText: q.textTr })
  }

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!customQuestion.trim() || isBusy) return
    await onSelectQuestion({ questionText: customQuestion.trim() })
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25 }}
          className="paper-card-lg max-w-2xl w-full p-6 sm:p-7 max-h-[90vh] flex flex-col shadow-2xl border-2 border-pencil-blue"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-paper-border pb-4">
            <div className="flex items-center gap-2.5">
              <div className="rounded-sketch bg-pencil-blue/15 p-2 text-pencil-blue">
                <HelpCircle className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold text-ink">
                  Soru Seçici (Soru Bankası)
                </h3>
                <p className="text-sm text-ink-faded font-sans">
                  Sorunuzu seçin, diğer oyuncular 15 saniyede Evet/Hayır oyu versin!
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              disabled={isBusy}
              className="rounded-sketch p-1.5 text-ink-faded hover:bg-paper-card-alt hover:text-ink transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {!isCustomMode ? (
            <div className="flex flex-col flex-1 overflow-hidden pt-4 space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-ink-extra-faded" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Soru bankasında ara... (örn: Türk, sanat, kadın)"
                  className="paper-input pl-11 text-base py-3"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-ink-extra-faded hover:text-ink font-semibold"
                  >
                    Temizle
                  </button>
                )}
              </div>

              {/* Category Tags */}
              <div className="flex flex-wrap items-center gap-2 text-sm">
                {QUESTION_TAGS.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTag(t.id)}
                    className={`px-3 py-1.5 rounded-sketch font-sans font-bold transition-all border text-xs sm:text-sm flex items-center ${
                      selectedTag === t.id
                        ? 'bg-pencil-blue text-white border-pencil-blue shadow-xs'
                        : 'border-paper-border bg-paper-card text-ink-faded hover:text-ink hover:border-ink-faded'
                    }`}
                  >
                    {t.icon ? <span className="mr-1.5">{t.icon}</span> : null}
                    <span>{t.label}</span>
                  </button>
                ))}
              </div>

              {/* Question List */}
              <div className="flex-1 overflow-y-auto overflow-x-hidden space-y-2.5 p-1.5 max-h-80 min-h-48 no-scrollbar">
                {filteredQuestions.length > 0 ? (
                  filteredQuestions.map((q) => (
                    <motion.button
                      key={q.id}
                      data-testid="question-item"
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handlePickQuestion(q)}
                      disabled={isBusy}
                      className="w-full text-left p-3.5 bg-paper-card hover:bg-paper-card-alt border-2 border-paper-border hover:border-pencil-blue rounded-sketch-md transition-all shadow-2xs hover:shadow-xs flex items-center justify-between gap-3 group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-pencil-blue/10 text-pencil-blue font-bold text-xs font-mono">
                          {q.sortOrder}
                        </span>
                        <span className="font-display text-base sm:text-lg font-bold text-ink group-hover:text-pencil-blue transition-colors leading-snug break-words">
                          {q.textTr}
                        </span>
                      </div>
                      <span className="opacity-0 group-hover:opacity-100 text-pencil-blue text-sm font-display font-bold shrink-0 transition-opacity flex items-center gap-1.5 pl-2">
                        <span>Sor</span>
                        <Send className="h-4 w-4" />
                      </span>
                    </motion.button>
                  ))
                ) : (
                  <div className="py-8 text-center text-sm text-ink-faded font-display">
                    Aradığınız kriterlere uygun soru bulunamadı.
                  </div>
                )}
              </div>

              {/* Bottom: Custom Question Toggle */}
              <div className="border-t border-paper-border pt-3 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsCustomMode(true)}
                  className="text-sm font-sans font-bold text-pencil-blue hover:underline flex items-center gap-1.5"
                >
                  <MessageSquarePlus className="h-4 w-4" />
                  <span>Kendi Sorunu Elle Yaz</span>
                </button>
                <span className="text-xs text-ink-extra-faded font-sans">
                  {filteredQuestions.length} soru listelendi
                </span>
              </div>
            </div>
          ) : (
            /* Custom Question Mode */
            <form onSubmit={handleCustomSubmit} className="pt-5 space-y-4">
              <div>
                <label className="block font-display text-base font-bold text-ink mb-1.5">
                  Özel Soru Metni:
                </label>
                <textarea
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  placeholder="Örn: 2000 yılından sonra mı popüler oldu?"
                  maxLength={150}
                  rows={3}
                  disabled={isBusy}
                  className="paper-input w-full text-lg resize-none"
                  autoFocus
                />
                <span className="text-xs text-ink-faded block mt-1.5">
                  * Evet/Hayır ile cevaplanabilecek sorular sorun. Diğer oyuncular oylayacaktır.
                </span>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsCustomMode(false)}
                  disabled={isBusy}
                  className="btn-outline flex-1 py-3.5 font-display text-base font-bold"
                >
                  ← Listeye Dön
                </button>
                <button
                  type="submit"
                  disabled={isBusy || !customQuestion.trim()}
                  className="btn-pencil-red flex-1 py-3.5 font-display text-xl font-bold flex items-center justify-center gap-2"
                >
                  {isBusy ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>Soruyu Gönder</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

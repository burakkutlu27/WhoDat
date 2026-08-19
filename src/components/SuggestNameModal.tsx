'use client'

import { CheckCircle2, Lightbulb, Loader2, Send, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useState } from 'react'

import { ApiClientError, apiRequest } from '@/lib/apiClient'
import { CategoryIcon } from '@/components/CategoryIcon'
import { CATEGORIES } from '@/lib/game/famousPeopleData'
import type { FamousPersonCategory } from '@/lib/game/types'

interface SuggestNameModalProps {
  isOpen: boolean
  onClose: () => void
  initialName?: string
  initialCategory?: FamousPersonCategory
  onSuccess?: (name: string, category: FamousPersonCategory) => void
}

const SELECTABLE_CATEGORIES = CATEGORIES.filter((c) => c.id !== 'all')

export default function SuggestNameModal({
  isOpen,
  onClose,
  initialName = '',
  initialCategory,
  onSuccess,
}: SuggestNameModalProps) {
  const [name, setName] = useState(initialName)
  const [category, setCategory] = useState<Exclude<FamousPersonCategory, 'all'>>(
    initialCategory && initialCategory !== 'all' ? (initialCategory as Exclude<FamousPersonCategory, 'all'>) : 'unluler',
  )
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setName(initialName)
      if (initialCategory && initialCategory !== 'all') {
        setCategory(initialCategory as Exclude<FamousPersonCategory, 'all'>)
      }
      setNotes('')
      setError(null)
      setIsSuccess(false)
    }
  }, [isOpen, initialName, initialCategory])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const cleanName = name.trim()
    if (cleanName.length < 2) {
      setError('Lütfen en az 2 karakterden oluşan geçerli bir isim girin.')
      return
    }

    setIsSubmitting(true)
    setError(null)

    try {
      await apiRequest('/api/famous-people/suggest', {
        method: 'POST',
        body: {
          name: cleanName,
          category,
          notes: notes.trim() || undefined,
        },
      })

      setIsSuccess(true)
      onSuccess?.(cleanName, category)
      setTimeout(() => {
        if (isOpen) {
          onClose()
        }
      }, 1800)
    } catch (caught) {
      setError(caught instanceof ApiClientError ? caught.message : 'İsim önerisi kaydedilemedi. Lütfen tekrar deneyin.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/50 backdrop-blur-xs"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="suggest-modal-title"
            className="paper-card-lg relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto p-6 sm:p-8 shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-sketch border border-paper-border bg-paper-card p-2 text-ink-faded transition-all hover:rotate-90 hover:border-pencil-red hover:text-pencil-red"
              aria-label="Kapat"
            >
              <X className="h-5 w-5" />
            </button>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 text-center space-y-4"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-sketch-lg border-2 border-dashed border-pencil-green bg-pencil-green/10 text-pencil-green">
                  <CheckCircle2 className="h-10 w-10 animate-bounce" />
                </div>
                <h3 className="font-display text-3xl font-bold text-ink">
                  Öneriniz Kaydedildi! 🎉
                </h3>
                <p className="font-sans text-sm text-ink-faded max-w-xs mx-auto">
                  <strong>&ldquo;{name}&rdquo;</strong> önerisi inceleme havuzumuza eklendi. Oyunda da hemen kullanabilirsiniz!
                </p>
              </motion.div>
            ) : (
              <div>
                {/* Header */}
                <div className="mb-6 text-center">
                  <motion.div
                    animate={{ rotate: [-4, 4, -4] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                    className="mb-2 inline-block rounded-sketch-lg border-2 border-paper-border bg-paper-card p-3 text-pencil-yellow shadow-md"
                  >
                    <Lightbulb className="h-8 w-8 text-pencil-yellow" />
                  </motion.div>
                  <h2 id="suggest-modal-title" className="font-display text-3xl font-bold text-ink">
                    Yeni İsim Öner
                  </h2>
                  <p className="mt-1 font-sans text-sm text-ink-faded">
                    Veritabanımızda olmayan ünlü veya karakterleri eklenmesi için önerin
                  </p>
                </div>

                <div className="divider-sketch mb-6" />

                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-4 rounded-sketch-md border border-pencil-red/40 bg-pencil-red/10 p-3 text-xs font-bold text-pencil-red"
                  >
                    {error}
                  </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* İsim Alanı */}
                  <div>
                    <label htmlFor="suggest-name" className="mb-1.5 block font-display text-lg font-bold text-ink">
                      Önerilen Kişi / Karakter İsmi:
                    </label>
                    <input
                      id="suggest-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Örn: Barış Özcan, Polat Alemdar, Luka Doncic..."
                      maxLength={60}
                      autoFocus
                      required
                      className="paper-input font-display text-xl w-full"
                    />
                  </div>

                  {/* Kategori Seçici */}
                  <div>
                    <label className="mb-2 block font-display text-lg font-bold text-ink">
                      Kategori Seçin:
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {SELECTABLE_CATEGORIES.map((cat) => {
                        const isSelected = category === cat.id
                        return (
                          <button
                            key={cat.id}
                            type="button"
                            onClick={() => setCategory(cat.id as Exclude<FamousPersonCategory, 'all'>)}
                            className={`flex items-center gap-1.5 p-2.5 rounded-sketch-md border-2 transition-all font-sans text-xs font-bold text-left ${
                              isSelected
                                ? 'border-pencil-yellow bg-pencil-yellow/15 text-ink shadow-xs scale-[1.02]'
                                : 'border-paper-border bg-paper-card text-ink-faded hover:bg-paper-card-alt hover:text-ink'
                            }`}
                          >
                            <CategoryIcon category={cat.id} className="h-4 w-4 shrink-0 text-pencil-yellow" />
                            <span className="truncate">{cat.label}</span>
                          </button>
                        )
                      })}
                    </div>
                  </div>

                  {/* Opsiyonel Not / İpucu */}
                  <div>
                    <label htmlFor="suggest-notes" className="mb-1 block font-display text-base font-bold text-ink-faded">
                      Açıklama / İpucu (İsteğe Bağlı):
                    </label>
                    <input
                      id="suggest-notes"
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Örn: YouTube içerik üreticisi, dizi başrolü..."
                      maxLength={200}
                      className="paper-input text-sm w-full"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting || name.trim().length < 2}
                      className="btn-pencil-yellow flex w-full items-center justify-center gap-2 py-3.5 font-display text-lg font-bold shadow-md transition-all hover:scale-[1.01] active:scale-[0.99]"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-5 w-5 animate-spin" />
                          <span>Gönderiliyor...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          <span>Öneriyi Havuza Gönder</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

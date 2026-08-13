'use client'

import { ArrowLeft, FileText, Loader2, Pencil, User } from 'lucide-react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { ApiClientError, apiRequest } from '@/lib/apiClient'

export default function CreateRoomPage() {
  const router = useRouter()
  const [nickname, setNickname] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!nickname.trim() || isSubmitting) return

    setIsSubmitting(true)
    setError(null)

    try {
      const { roomId } = await apiRequest<{ roomId: string; roomCode: string }>('/api/rooms', {
        method: 'POST',
        body: { nickname: nickname.trim() },
      })
      router.push(`/room/${roomId}`)
    } catch (caught) {
      setError(
        caught instanceof ApiClientError
          ? caught.message
          : 'Oda oluşturulamadı. Lütfen tekrar deneyin.',
      )
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 15, rotate: -1 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.4 }}
          className="paper-card-lg p-8"
        >
          <div className="mb-6 text-center">
            <div className="mb-3 inline-block rounded-xl border border-paper-border bg-paper-card p-2.5 text-pencil-red shadow-sm">
              <FileText className="h-8 w-8" />
            </div>
            <h1 className="font-display text-4xl font-bold text-ink">
              Yeni Oda Oluştur
            </h1>
            <p className="mt-1 text-sm text-ink-faded">
              Odanı aç, takma adını belirle ve arkadaşlarını davet et.
            </p>
          </div>

          <div className="divider-sketch mb-6" />

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label
                htmlFor="nickname"
                className="mb-2 flex items-center gap-1.5 font-display text-xl font-bold text-ink"
              >
                <Pencil className="h-4 w-4 text-pencil-yellow" />
                <span>Takma Adınız</span>
              </label>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-ink-extra-faded">
                  <User className="h-4 w-4" />
                </div>
                <input
                  id="nickname"
                  type="text"
                  value={nickname}
                  onChange={(event) => setNickname(event.target.value)}
                  placeholder="Örn: Ahmet"
                  maxLength={20}
                  autoComplete="nickname"
                  disabled={isSubmitting}
                  aria-describedby={error ? 'create-room-error' : undefined}
                  className="paper-input pl-10 font-display text-2xl"
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: [0, -6, 6, -3, 3, 0] }}
                transition={{ duration: 0.4 }}
                id="create-room-error"
                role="alert"
                className="alert-error"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-3 pt-2">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, rotate: -0.5 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting || !nickname.trim()}
                className="btn-pencil-red flex w-full items-center justify-center gap-2 py-3.5 font-display text-xl"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Oda Oluşturuluyor...</span>
                  </>
                ) : (
                  <span>Oda Oluştur</span>
                )}
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/')}
                disabled={isSubmitting}
                className="btn-outline flex w-full items-center justify-center gap-2 py-3.5 font-display text-base"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Geri Dön</span>
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

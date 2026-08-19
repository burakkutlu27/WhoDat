'use client'

import { ArrowLeft, DoorOpen, KeyRound, Loader2, Pencil, User } from 'lucide-react'
import { motion } from 'motion/react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

import { ApiClientError, apiRequest } from '@/lib/apiClient'
import { getDeviceId } from '@/lib/deviceId'

function JoinRoomForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [roomCode, setRoomCode] = useState(searchParams.get('code') ?? '')
  const [nickname, setNickname] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const codeParam = searchParams.get('code')
    if (codeParam) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRoomCode(codeParam.toUpperCase())
    }
  }, [searchParams])

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!roomCode.trim() || !nickname.trim() || isSubmitting) return

    setIsSubmitting(true)
    setError(null)

    try {
      const { roomId } = await apiRequest<{ roomId: string }>('/api/rooms/join', {
        method: 'POST',
        body: { roomCode: roomCode.trim(), nickname: nickname.trim(), deviceId: getDeviceId() },
      })
      router.push(`/room/${roomId}`)
    } catch (caught) {
      setError(
        caught instanceof ApiClientError ? caught.message : 'Odaya katılınamadı. Tekrar deneyin.',
      )
      setIsSubmitting(false)
    }
  }

  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 15, rotate: 0.5 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.4 }}
          className="paper-card p-8"
        >
          <div className="mb-6 text-center">
            <div className="mb-3 inline-block rounded-sketch border border-paper-border bg-paper-card p-2.5 text-pencil-blue shadow-sm">
              <DoorOpen className="h-8 w-8" />
            </div>
            <h1 className="font-display text-4xl font-bold text-ink">
              Odaya Katıl
            </h1>
            <p className="mt-1 text-base text-ink-faded font-sans">
              Arkadaşının paylaştığı 6 haneli oda kodunu gir.
            </p>
          </div>

          <div className="divider-sketch mb-6" />

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label
                htmlFor="roomCode"
                className="mb-2 flex items-center gap-1.5 font-display text-2xl font-bold text-ink"
              >
                <KeyRound className="h-5 w-5 text-pencil-yellow" />
                <span>Oda Kodu</span>
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-ink-extra-faded">
                  <KeyRound className="h-5 w-5" />
                </div>
                <input
                  id="roomCode"
                  type="text"
                  inputMode="text"
                  value={roomCode}
                  onChange={(event) => setRoomCode(event.target.value.toUpperCase())}
                  placeholder="ABCDEF"
                  maxLength={6}
                  autoCapitalize="characters"
                  autoComplete="off"
                  spellCheck={false}
                  disabled={isSubmitting}
                  className="paper-input-boxed pl-10 text-center font-mono text-2xl font-bold tracking-[0.3em] text-pencil-red uppercase"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="nickname"
                className="mb-2 flex items-center gap-1.5 font-display text-2xl font-bold text-ink"
              >
                <Pencil className="h-5 w-5 text-pencil-green" />
                <span>Takma Adınız</span>
              </label>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-ink-extra-faded">
                  <User className="h-5 w-5" />
                </div>
                <input
                  id="nickname"
                  type="text"
                  value={nickname}
                  onChange={(event) => setNickname(event.target.value)}
                  placeholder="Örn: Ayşe"
                  maxLength={20}
                  autoComplete="nickname"
                  disabled={isSubmitting}
                  aria-describedby={error ? 'join-room-error' : undefined}
                  className="paper-input pl-11 font-display text-2xl font-bold"
                />
              </div>
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: [0, -6, 6, -3, 3, 0] }}
                transition={{ duration: 0.4 }}
                id="join-room-error"
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
                disabled={isSubmitting || !roomCode.trim() || !nickname.trim()}
                className="btn-pencil-red flex w-full items-center justify-center gap-2 py-4 font-display text-2xl font-bold shadow-md"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Katılınıyor...</span>
                  </>
                ) : (
                  <span>Odaya Katıl</span>
                )}
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => router.push('/')}
                disabled={isSubmitting}
                className="btn-outline flex w-full items-center justify-center gap-2 py-3.5 font-display text-lg font-bold"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Geri Dön</span>
              </motion.button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default function JoinRoomPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-pencil-red" />
        </div>
      }
    >
      <JoinRoomForm />
    </Suspense>
  )
}

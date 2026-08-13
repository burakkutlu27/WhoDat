'use client'

import { ArrowLeft, KeyRound, Loader2, LogIn, User } from 'lucide-react'
import { motion } from 'motion/react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'

import { ApiClientError, apiRequest } from '@/lib/apiClient'

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
        body: { roomCode: roomCode.trim(), nickname: nickname.trim() },
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
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/50 dark:border-slate-800 dark:bg-[#151D2A] dark:shadow-none"
        >
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400">
              <LogIn className="h-6 w-6" />
            </div>
            <h1 className="font-display text-2xl font-black text-slate-900 dark:text-white">
              Odaya Katıl
            </h1>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Arkadaşının paylaştığı 6 haneli oda kodunu gir.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            <div>
              <label
                htmlFor="roomCode"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
              >
                Oda Kodu
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <KeyRound className="h-4 w-4" />
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
                  className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-3.5 text-center font-mono text-xl font-bold tracking-[0.3em] text-indigo-600 uppercase transition-all placeholder:font-sans placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-indigo-400 dark:focus:border-indigo-400"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="nickname"
                className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
              >
                Takma Adınız
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 text-slate-400">
                  <User className="h-4 w-4" />
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
                  className="w-full rounded-xl border border-slate-300 bg-white pl-10 pr-4 py-3.5 text-base font-semibold text-slate-900 transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-indigo-400"
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
                className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-300"
              >
                {error}
              </motion.div>
            )}

            <div className="space-y-3 pt-2">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting || !roomCode.trim() || !nickname.trim()}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 font-display text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none dark:disabled:bg-slate-800"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
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
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-slate-100/80 py-3.5 font-display text-sm font-semibold text-slate-700 transition-all hover:bg-slate-200/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:bg-slate-800"
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

export default function JoinRoomPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
        </div>
      }
    >
      <JoinRoomForm />
    </Suspense>
  )
}



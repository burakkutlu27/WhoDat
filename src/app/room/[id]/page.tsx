'use client'

import { Check, CheckCircle2, Clock, Copy, Crown, Loader2, LogOut, Play, Users } from 'lucide-react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'

import { ApiClientError, apiRequest } from '@/lib/apiClient'
import type { SubmitNamesResult } from '@/lib/game/types'
import { useGameState } from '@/lib/useGameState'

const NAME_SLOTS = 3

export default function RoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: roomId } = use(params)
  const router = useRouter()
  const { state, phase, error, degraded, refresh } = useGameState(roomId)

  const [names, setNames] = useState<string[]>(Array(NAME_SLOTS).fill(''))
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isStarting, setIsStarting] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)
  const [duplicates, setDuplicates] = useState<string[]>([])
  const [copied, setCopied] = useState(false)

  const status = state?.room.status

  useEffect(() => {
    if (!status) return
    if (status === 'playing') router.replace(`/game/${roomId}`)
    else if (status === 'finished') router.replace(`/scores/${roomId}`)
    else if (status === 'closed') router.replace('/')
  }, [status, roomId, router])

  useEffect(() => {
    if (error?.status === 401 || error?.code === 'wrong_room' || error?.code === 'player_not_in_room') {
      router.replace('/')
    }
  }, [error, router])

  const handleCopyCode = async () => {
    if (!state?.room.roomCode) return
    try {
      await navigator.clipboard.writeText(state.room.roomCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Fallback
    }
  }

  const handleSubmitNames = async () => {
    const filled = names.map((name) => name.trim()).filter(Boolean)
    if (filled.length === 0) {
      setActionError('En az bir isim girmelisiniz.')
      return
    }

    setIsSubmitting(true)
    setActionError(null)
    setDuplicates([])

    try {
      const result = await apiRequest<SubmitNamesResult>(`/api/rooms/${roomId}/names`, {
        method: 'POST',
        body: { names: filled },
      })
      setDuplicates(result.duplicates)
      setNames(Array(NAME_SLOTS).fill(''))
      await refresh()
    } catch (caught) {
      setActionError(caught instanceof ApiClientError ? caught.message : 'İsimler kaydedilemedi.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleStart = async () => {
    setIsStarting(true)
    setActionError(null)
    try {
      await apiRequest(`/api/rooms/${roomId}/start`, { method: 'POST' })
      router.push(`/game/${roomId}`)
    } catch (caught) {
      setActionError(caught instanceof ApiClientError ? caught.message : 'Oyun başlatılamadı.')
      setIsStarting(false)
    }
  }

  const handleLeave = async () => {
    try {
      await apiRequest(`/api/rooms/${roomId}/leave`, { method: 'POST' })
    } finally {
      router.push('/')
    }
  }

  if (phase === 'loading') {
    return <RoomSkeleton />
  }

  if (phase === 'error' || !state) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-4">
        <div className="max-w-md text-center">
          <h1 className="mb-2 font-display text-xl font-bold text-slate-900 dark:text-white">Oda Açılamadı</h1>
          <p className="mb-6 text-sm text-slate-600 dark:text-slate-400">
            {error?.message ?? 'Oda bilgileri yüklenemedi.'}
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => void refresh()}
              className="rounded-xl bg-indigo-600 px-6 py-3 font-display font-semibold text-white hover:bg-indigo-500"
            >
              Tekrar Dene
            </button>
            <button
              onClick={() => router.push('/')}
              className="rounded-xl border border-slate-300 bg-white px-6 py-3 font-display font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              Ana Sayfa
            </button>
          </div>
        </div>
      </div>
    )
  }

  const hasSubmitted = state.you.submittedNames.length > 0

  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header Card */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xl shadow-slate-200/40 backdrop-blur-xl dark:border-slate-800/80 dark:bg-[#151D2A]/90 dark:shadow-indigo-950/20"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                BEKLEME LOBİSİ
              </span>
              <h1 className="font-display text-2xl font-black text-slate-900 dark:text-white">
                Oyun Hazırlığı
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => void handleCopyCode()}
                  className="group relative inline-flex items-center gap-2 rounded-xl border border-indigo-200 bg-indigo-50/80 px-3.5 py-1.5 font-mono text-base font-bold tracking-widest text-indigo-700 transition-all hover:bg-indigo-100 dark:border-indigo-900/60 dark:bg-indigo-950/40 dark:text-indigo-300 dark:hover:bg-indigo-900/60"
                >
                  <span>{state.room.roomCode}</span>
                  {copied ? (
                    <Check className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Copy className="h-4 w-4 opacity-60 group-hover:opacity-100" />
                  )}
                  {copied && (
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 rounded-md bg-slate-900 px-2 py-0.5 font-sans text-xs font-semibold text-white shadow-md">
                      Kopyalandı!
                    </span>
                  )}
                </button>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
                  <Users className="h-3.5 w-3.5 text-indigo-500" />
                  {state.players.length} Oyuncu
                </span>
                {degraded && (
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                    Canlı bağlantı zayıf
                  </span>
                )}
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => void handleLeave()}
              className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-100/80 px-4 py-2.5 font-display text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200/80 dark:border-slate-800 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              <LogOut className="h-4 w-4" />
              <span>Odadan Çık</span>
            </motion.button>
          </div>
        </motion.header>

        {/* Name Entry Section */}
        {!hasSubmitted && (
          <motion.section
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xl shadow-slate-200/40 backdrop-blur-xl sm:p-8 dark:border-slate-800/80 dark:bg-[#151D2A]/90 dark:shadow-indigo-950/20"
          >
            <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
              Gizli İsimlerinizi Yazın
            </h2>
            <p className="mt-1 mb-6 text-sm text-slate-600 dark:text-slate-400">
              Diğer oyuncuların tahmin etmesi için havuza {NAME_SLOTS} isim ekleyin (Ünlü, karakter, tanıdık).
            </p>

            <div className="space-y-4">
              {names.map((name, index) => (
                <div key={index}>
                  <label
                    htmlFor={`name-${index}`}
                    className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300"
                  >
                    İsim {index + 1}
                  </label>
                  <input
                    id={`name-${index}`}
                    type="text"
                    value={name}
                    maxLength={60}
                    disabled={isSubmitting}
                    placeholder={`Örn: ${index === 0 ? 'Albert Einstein' : index === 1 ? 'Sherlock Holmes' : 'Tarkan'}`}
                    onChange={(event) => {
                      const next = [...names]
                      next[index] = event.target.value
                      setNames(next)
                    }}
                    className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base font-semibold text-slate-900 transition-all placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-60 dark:border-slate-700 dark:bg-slate-900/60 dark:text-white dark:focus:border-indigo-400"
                  />
                </div>
              ))}
            </div>

            {actionError && (
              <div
                role="alert"
                className="mt-4 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs font-semibold text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-300"
              >
                {actionError}
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => void handleSubmitNames()}
              disabled={isSubmitting || names.every((name) => !name.trim())}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 font-display text-sm font-bold text-white shadow-lg shadow-indigo-500/25 transition-all hover:bg-indigo-500 disabled:cursor-not-allowed disabled:bg-slate-400 disabled:shadow-none dark:disabled:bg-slate-800"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Kaydediliyor...</span>
                </>
              ) : (
                <span>İsimleri Gönder</span>
              )}
            </motion.button>
          </motion.section>
        )}

        {/* Submitted Names Confirmation */}
        {hasSubmitted && (
          <motion.section
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-3xl border border-emerald-200/80 bg-emerald-50/70 p-6 backdrop-blur-xl dark:border-emerald-900/50 dark:bg-emerald-950/30"
          >
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
              <h2 className="font-display font-bold text-emerald-900 dark:text-emerald-300">
                İsimleriniz Havuza Eklendi
              </h2>
            </div>
            <ul className="flex flex-wrap gap-2">
              {state.you.submittedNames.map((name) => (
                <li
                  key={name}
                  className="rounded-full bg-emerald-100/80 px-3.5 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-200"
                >
                  {name}
                </li>
              ))}
            </ul>
            {duplicates.length > 0 && (
              <p className="mt-3 text-xs text-amber-700 dark:text-amber-400">
                Zaten daha önce girilmiş olan şu isimler atlandı: {duplicates.join(', ')}
              </p>
            )}
          </motion.section>
        )}

        {/* Players Grid Section */}
        <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 shadow-xl shadow-slate-200/40 backdrop-blur-xl sm:p-8 dark:border-slate-800/80 dark:bg-[#151D2A]/90 dark:shadow-indigo-950/20">
          <h2 className="mb-4 font-display text-lg font-bold text-slate-900 dark:text-white">
            Lobideki Oyuncular ({state.players.length})
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {state.players.map((player) => {
              const isYou = player.id === state.you.playerId
              const initial = player.nickname.charAt(0).toUpperCase()
              return (
                <motion.div
                  key={player.id}
                  layout
                  className={`flex items-center justify-between rounded-2xl border p-4 transition-all ${
                    isYou
                      ? 'border-indigo-300 bg-indigo-50/50 dark:border-indigo-700/60 dark:bg-indigo-950/20'
                      : 'border-slate-200/80 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/40'
                  }`}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-500 font-display text-sm font-bold text-white shadow-sm">
                      {initial}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        {player.isHost && (
                          <Crown className="h-4 w-4 shrink-0 text-amber-500" aria-label="Oda Sahibi" />
                        )}
                        <span className="truncate font-display font-semibold text-slate-900 dark:text-white">
                          {player.nickname}
                        </span>
                        {isYou && (
                          <span className="shrink-0 rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                            SEN
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {player.hasSubmittedNames ? (
                    <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-100/80 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400">
                      <Check className="h-3.5 w-3.5" />
                      Hazır
                    </span>
                  ) : (
                    <span className="flex shrink-0 items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                      <Clock className="h-3.5 w-3.5" />
                      Bekleniyor
                    </span>
                  )}
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Start Game Action */}
        <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-6 text-center shadow-xl shadow-slate-200/40 backdrop-blur-xl dark:border-slate-800/80 dark:bg-[#151D2A]/90 dark:shadow-indigo-950/20">
          {state.you.isHost ? (
            <>
              <motion.button
                whileHover={{ scale: state.canStart ? 1.02 : 1 }}
                whileTap={{ scale: state.canStart ? 0.98 : 1 }}
                onClick={() => void handleStart()}
                disabled={isStarting || !state.canStart}
                className={`flex w-full items-center justify-center gap-2 rounded-xl py-4 font-display text-base font-extrabold text-white transition-all ${
                  state.canStart
                    ? 'bg-emerald-600 shadow-lg shadow-emerald-500/25 hover:bg-emerald-500 animate-pulse-glow'
                    : 'cursor-not-allowed bg-slate-300 dark:bg-slate-800 text-slate-500 dark:text-slate-500'
                }`}
              >
                {isStarting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    <span>Oyun Başlatılıyor...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5 fill-current" />
                    <span>Oyunu Başlat</span>
                  </>
                )}
              </motion.button>
              <p className="mt-3 text-xs font-medium text-slate-600 dark:text-slate-400" aria-live="polite">
                {state.players.length < 2
                  ? 'Oyunu başlatmak için en az 2 oyuncu olmalıdır.'
                  : !state.allPlayersSubmittedNames
                    ? 'Tüm oyuncuların isimlerini tamamlaması bekleniyor.'
                    : 'Herkes hazır! Oyunu başlatabilirsiniz.'}
              </p>
            </>
          ) : (
            <div className="py-2 text-slate-600 dark:text-slate-300" aria-live="polite">
              <p className="font-display font-semibold">Oda sahibinin oyunu başlatması bekleniyor...</p>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Oyun başladığında ekranınız otomatik olarak güncellenecektir.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

function RoomSkeleton() {
  return (
    <div className="min-h-[calc(100vh-4rem)] px-4 py-8">
      <div className="mx-auto max-w-4xl space-y-6" aria-busy="true" aria-label="Oda yükleniyor">
        <div className="h-28 animate-pulse rounded-3xl bg-white/70 dark:bg-[#151D2A]/70" />
        <div className="h-64 animate-pulse rounded-3xl bg-white/70 dark:bg-[#151D2A]/70" />
        <div className="h-40 animate-pulse rounded-3xl bg-white/70 dark:bg-[#151D2A]/70" />
      </div>
    </div>
  )
}


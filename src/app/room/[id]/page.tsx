'use client'

import { Brain, Check, CheckCircle2, Clock, Copy, Crown, Loader2, LogOut, Pencil, Play, Send, Target, Users, Zap } from 'lucide-react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'

import Confetti from '@/components/Confetti'
import { ApiClientError, apiRequest } from '@/lib/apiClient'
import type { SubmitNamesResult } from '@/lib/game/types'
import { useGameState } from '@/lib/useGameState'

const NAME_SLOTS = 3

export default function RoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: roomId } = use(params)
  const router = useRouter()
  const { state, phase, error, degraded, refresh } = useGameState(roomId)

  const [names, setNames] = useState<string[]>(Array(NAME_SLOTS).fill(''))
  const [targetNameInput, setTargetNameInput] = useState('')
  const [isSavingTarget, setIsSavingTarget] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isStarting, setIsStarting] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)
  const [duplicates, setDuplicates] = useState<string[]>([])
  const [copied, setCopied] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const status = state?.room.status
  const isSharedTarget = state?.room.gameMode === 'shared_target'

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

  const handleSaveTarget = async (customName?: string) => {
    const nameToSave = (customName ?? targetNameInput).trim()
    if (!nameToSave) return
    setIsSavingTarget(true)
    setActionError(null)
    try {
      await apiRequest(`/api/rooms/${roomId}/target`, {
        method: 'POST',
        body: { targetName: nameToSave },
      })
      setTargetNameInput(nameToSave)
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 1600)
      await refresh()
    } catch (caught) {
      setActionError(caught instanceof ApiClientError ? caught.message : 'Hedef kaydedilemedi.')
    } finally {
      setIsSavingTarget(false)
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
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 1600)
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
          <h1 className="mb-2 font-display text-3xl font-bold text-ink">Oda Açılamadı</h1>
          <p className="mb-6 text-sm text-ink-faded">
            {error?.message ?? 'Oda bilgileri yüklenemedi.'}
          </p>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => void refresh()}
              className="btn-pencil-red px-6 py-3 font-display text-base"
            >
              Tekrar Dene
            </button>
            <button
              onClick={() => router.push('/')}
              className="btn-outline px-6 py-3 font-display text-base"
            >
              Ana Sayfa
            </button>
          </div>
        </div>
      </div>
    )
  }

  const hasSubmitted = isSharedTarget ? Boolean(state.room.sharedTargetName) : state.you.submittedNames.length > 0
  const TARGET_SUGGESTIONS = ['Kemal Sunal', 'Barış Manço', 'Mustafa Kemal Atatürk', 'Albert Einstein', 'Sherlock Holmes', 'Tarkan', 'Mona Lisa']

  return (
    <div className="relative min-h-[calc(100vh-4rem)] px-4 py-8">
      <Confetti trigger={showConfetti} />
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header Card */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="paper-card-lg p-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <span className="flex items-center gap-1.5 font-display text-xl text-pencil-yellow">
                <Clock className="h-4 w-4 animate-spin" style={{ animationDuration: '4s' }} />
                <span>Bekleme Lobisi</span>
              </span>
              <h1 className="font-display text-4xl font-bold text-ink">
                Oyun Hazırlığı
              </h1>
              <div className="mt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => void handleCopyCode()}
                  className="group relative inline-flex items-center gap-2 border-2 border-dashed border-pencil-red bg-paper-card px-4 py-1.5 font-mono text-lg font-bold tracking-widest text-pencil-red transition-all hover:bg-pencil-red hover:text-white"
                  style={{ borderRadius: '6px 10px 4px 12px' }}
                >
                  <span>{state.room.roomCode}</span>
                  {copied ? (
                    <Check className="h-4 w-4 text-pencil-green" />
                  ) : (
                    <Copy className="h-4 w-4 opacity-60 group-hover:opacity-100" />
                  )}
                  {copied && (
                    <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 rounded bg-ink px-2 py-0.5 font-sans text-xs font-semibold text-paper-card shadow-md">
                      Kopyalandı!
                    </span>
                  )}
                </button>
                <span className="tag">
                  <Users className="h-3.5 w-3.5 text-pencil-blue" />
                  {state.players.length} Oyuncu
                </span>
                <span className={`tag ${
                  state.room.gameMode === 'speed'
                    ? 'border-pencil-green text-pencil-green font-bold'
                    : state.room.gameMode === 'persistent'
                      ? 'border-pencil-blue text-pencil-blue font-bold'
                      : state.room.gameMode === 'shared_target'
                        ? 'border-pencil-orange text-pencil-orange font-bold'
                        : 'border-pencil-yellow text-pencil-yellow font-bold'
                }`}>
                  {state.room.gameMode === 'speed' && <Zap className="h-3.5 w-3.5 mr-1 inline" />}
                  {state.room.gameMode === 'persistent' && <Brain className="h-3.5 w-3.5 mr-1 inline" />}
                  {state.room.gameMode === 'shared_target' && <Users className="h-3.5 w-3.5 mr-1 inline" />}
                  {state.room.gameMode === 'classic' && <Target className="h-3.5 w-3.5 mr-1 inline" />}
                  {state.room.gameMode === 'speed'
                    ? 'Hız Modu (3 Tur)'
                    : state.room.gameMode === 'persistent'
                      ? 'Israrcı Mod (10 Soru + 3 Can)'
                      : state.room.gameMode === 'shared_target'
                        ? 'Ortak Hedef (3 Tur)'
                        : 'Klasik Mod (3 Can)'}
                </span>
                {degraded && (
                  <span className="tag border-pencil-orange text-pencil-orange">
                    Canlı bağlantı zayıf
                  </span>
                )}
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => void handleLeave()}
              className="btn-outline flex items-center gap-2 px-4 py-2.5 font-display text-sm"
            >
              <LogOut className="h-4 w-4" />
              <span>Odadan Çık</span>
            </motion.button>
          </div>

          {/* Host Game Mode Switcher in Lobby */}
          {state.you.isHost && (
            <div className="mt-4 pt-4 border-t border-paper-border flex flex-wrap items-center justify-between gap-3">
              <span className="font-display text-sm font-bold text-ink-faded">
                Oyun Modunu Değiştir:
              </span>
              <div className="flex gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={async () => {
                    if (state.room.gameMode === 'classic') return
                    await apiRequest(`/api/rooms/${roomId}/mode`, { method: 'PATCH', body: { gameMode: 'classic' } })
                    await refresh()
                  }}
                  className={`px-3 py-1 text-xs font-display font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                    state.room.gameMode === 'classic'
                      ? 'bg-pencil-yellow text-white shadow-sm ring-1 ring-pencil-yellow'
                      : 'border border-paper-border bg-paper-card text-ink-faded hover:text-ink'
                  }`}
                >
                  <Target className="h-3.5 w-3.5" />
                  <span>Klasik (Can)</span>
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    if (state.room.gameMode === 'speed') return
                    await apiRequest(`/api/rooms/${roomId}/mode`, { method: 'PATCH', body: { gameMode: 'speed' } })
                    await refresh()
                  }}
                  className={`px-3 py-1 text-xs font-display font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                    state.room.gameMode === 'speed'
                      ? 'bg-pencil-green text-white shadow-sm ring-1 ring-pencil-green'
                      : 'border border-paper-border bg-paper-card text-ink-faded hover:text-ink'
                  }`}
                >
                  <Zap className="h-3.5 w-3.5" />
                  <span>Hız Modu (Puan)</span>
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    if (state.room.gameMode === 'persistent') return
                    await apiRequest(`/api/rooms/${roomId}/mode`, { method: 'PATCH', body: { gameMode: 'persistent' } })
                    await refresh()
                  }}
                  className={`px-3 py-1 text-xs font-display font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                    state.room.gameMode === 'persistent'
                      ? 'bg-pencil-blue text-white shadow-sm ring-1 ring-pencil-blue'
                      : 'border border-paper-border bg-paper-card text-ink-faded hover:text-ink'
                  }`}
                >
                  <Brain className="h-3.5 w-3.5" />
                  <span>Israrcı (Bütçe)</span>
                </button>
                <button
                  type="button"
                  onClick={async () => {
                    if (state.room.gameMode === 'shared_target') return
                    await apiRequest(`/api/rooms/${roomId}/mode`, { method: 'PATCH', body: { gameMode: 'shared_target' } })
                    await refresh()
                  }}
                  className={`px-3 py-1 text-xs font-display font-bold rounded-lg transition-all flex items-center gap-1.5 ${
                    state.room.gameMode === 'shared_target'
                      ? 'bg-pencil-orange text-white shadow-sm ring-1 ring-pencil-orange'
                      : 'border border-paper-border bg-paper-card text-ink-faded hover:text-ink'
                  }`}
                >
                  <Users className="h-3.5 w-3.5" />
                  <span>Ortak Hedef (Hakem)</span>
                </button>
              </div>
            </div>
          )}
        </motion.header>

        {/* Ortak Hedef Modu — Host Hedef Belirleme veya Oyuncu Bilgilendirmesi */}
        {isSharedTarget ? (
          state.you.isHost ? (
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="paper-card p-6 sm:p-8"
            >
              <div className="flex items-center gap-2 mb-2">
                <Pencil className="h-6 w-6 text-pencil-orange" />
                <h2 className="font-display text-3xl font-bold text-ink">
                  1. Tur Gizli Hedefini Belirleyin
                </h2>
              </div>
              <p className="mb-4 text-sm text-ink-faded">
                Bu turda <strong>Hakem</strong> sizsiniz! Aşağıdaki ismi yalnızca siz göreceksiniz. Diğer oyuncular sırayla evet/hayır soruları sorup bilmeye çalışacak.
              </p>

              <div className="space-y-4">
                <div>
                  <label htmlFor="target-input" className="mb-1.5 block font-display text-xl font-bold text-ink">
                    Gizli Kişi / Hedef İsim:
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="target-input"
                      type="text"
                      value={targetNameInput}
                      onChange={(e) => setTargetNameInput(e.target.value)}
                      placeholder="Örn: Albert Einstein, Kemal Sunal, Tarkan..."
                      maxLength={60}
                      disabled={isSavingTarget}
                      className="paper-input font-display text-xl flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => void handleSaveTarget()}
                      disabled={isSavingTarget || !targetNameInput.trim()}
                      className="btn-pencil-red px-6 py-3 font-display text-base font-bold shrink-0"
                    >
                      {isSavingTarget ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Kaydet'}
                    </button>
                  </div>
                </div>

                {/* Hızlı Öneri Çipleri */}
                <div>
                  <span className="block text-xs font-display font-bold text-ink-faded mb-2">
                    Hızlı Seçim Önerileri:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {TARGET_SUGGESTIONS.map((sug) => (
                      <button
                        key={sug}
                        type="button"
                        onClick={() => {
                          setTargetNameInput(sug)
                          void handleSaveTarget(sug)
                        }}
                        className="rounded-lg border border-dashed border-paper-border bg-paper-card-alt px-3 py-1 text-xs font-display font-semibold text-ink hover:border-pencil-orange hover:text-pencil-orange transition-colors"
                      >
                        + {sug}
                      </button>
                    ))}
                  </div>
                </div>

                {state.room.sharedTargetName && (
                  <div className="alert-success mt-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-pencil-green" />
                      <span className="font-display text-lg font-bold text-pencil-green">
                        Aktif Gizli Hedef: <u>{state.room.sharedTargetName}</u> (Yalnızca size görünür)
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </motion.section>
          ) : (
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="paper-card p-6 sm:p-8"
            >
              <div className="flex items-center gap-2 mb-2">
                <Crown className="h-6 w-6 text-pencil-orange" />
                <h2 className="font-display text-3xl font-bold text-ink">
                  Ortak Hedef Modu
                </h2>
              </div>
              <p className="text-base text-ink leading-relaxed">
                Bu modda <strong>Oda Sahibi Hakem</strong> rolündedir ve tek bir gizli hedef belirler.
                İsim yazmanıza gerek yoktur — oyun başladığında sırayla sorular soracak ve <strong>Tahmin</strong> butonuna basarak gizli kişiyi ilk bilen olmaya çalışacaksınız!
              </p>
              <div className="mt-4 p-3 bg-paper-card-alt rounded-lg border border-dashed border-paper-border text-xs text-ink-faded font-display flex items-center gap-2">
                <Clock className="h-4 w-4 animate-spin text-pencil-yellow shrink-0" />
                <span>Oda sahibinin hedefi belirleyip oyunu başlatması bekleniyor...</span>
              </div>
            </motion.section>
          )
        ) : (
          /* Klasik / Hız / Israrcı Mod İsim Girişi */
          !hasSubmitted && (
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="paper-card p-6 sm:p-8"
            >
              <h2 className="flex items-center gap-2 font-display text-3xl font-bold text-ink">
                <Pencil className="h-6 w-6 text-pencil-yellow" />
                <span>Gizli İsimlerinizi Yazın</span>
              </h2>
              <p className="mt-1 mb-6 text-sm text-ink-faded">
                Diğer oyuncuların tahmin etmesi için havuza {NAME_SLOTS} isim ekleyin (Ünlü, karakter, tanıdık).
              </p>

              <div className="space-y-4">
                {names.map((name, index) => (
                  <div key={index}>
                    <label
                      htmlFor={`name-${index}`}
                      className="mb-1.5 block font-display text-xl font-bold text-ink"
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
                      className="paper-input font-display text-xl"
                    />
                  </div>
                ))}
              </div>

              {actionError && (
                <div role="alert" className="alert-error mt-4">
                  {actionError}
                </div>
              )}

              <motion.button
                whileHover={{ scale: 1.01, rotate: -0.5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => void handleSubmitNames()}
                disabled={isSubmitting || names.every((name) => !name.trim())}
                className="btn-pencil-red mt-6 flex w-full items-center justify-center gap-2 py-3.5 font-display text-xl"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Kaydediliyor...</span>
                  </>
                ) : (
                  <>
                    <span>İsimleri Gönder</span>
                    <Send className="h-4 w-4" />
                  </>
                )}
              </motion.button>
            </motion.section>
          )
        )}


        {/* Submitted Names Confirmation */}
        {hasSubmitted && (
          <motion.section
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="alert-success"
          >
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle2 className="h-5 w-5 text-pencil-green" />
              <h2 className="font-display text-2xl font-bold text-pencil-green">
                İsimleriniz Havuza Eklendi
              </h2>
            </div>
            <ul className="flex flex-wrap gap-2">
              {state.you.submittedNames.map((name) => (
                <li
                  key={name}
                  className="tag tag-ready font-display text-base"
                >
                  {name}
                </li>
              ))}
            </ul>
            {duplicates.length > 0 && (
              <p className="mt-3 text-xs text-pencil-orange">
                Zaten daha önce girilmiş olan şu isimler atlandı: {duplicates.join(', ')}
              </p>
            )}
          </motion.section>
        )}

        {/* Players Grid Section */}
        <section className="paper-card-alt p-6 sm:p-8">
          <h2 className="mb-4 font-display text-2xl font-bold text-ink flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Users className="h-5 w-5 text-pencil-blue" />
              <span>Lobideki Oyuncular ({state.players.length})</span>
            </span>
            <span className="text-xs font-sans font-normal text-ink-faded waiting-dots">Canlı Senkronize</span>
          </h2>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {state.players.map((player, idx) => {
              const isYou = player.id === state.you.playerId
              const initial = player.nickname.charAt(0).toUpperCase()
              const dealDelayClass = `deal-delay-${(idx % 8) + 1}`
              return (
                <motion.div
                  key={player.id}
                  layout
                  initial={{ opacity: 0, x: 30, rotate: 2 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  transition={{ duration: 0.35, delay: idx * 0.08 }}
                  className={`animate-card-deal ${dealDelayClass} flex items-center justify-between border-2 p-4 transition-all hover:translate-y-[-2px] ${
                    isYou
                      ? 'border-solid border-pencil-blue bg-paper-card shadow-sm'
                      : 'border-dashed border-paper-border bg-paper-card'
                  }`}
                  style={{ borderRadius: '10px 6px 12px 4px' }}
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: -5 }}
                      className="flex h-10 w-10 shrink-0 items-center justify-center bg-pencil-red font-display text-lg font-bold text-white shadow-sm"
                      style={{ borderRadius: '8px 4px 10px 6px' }}
                    >
                      {initial}
                    </motion.div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        {player.isHost && (
                          <Crown className="h-4 w-4 shrink-0 text-pencil-yellow animate-bounce" aria-label="Oda Sahibi" />
                        )}
                        <span className="truncate font-display text-xl font-bold text-ink">
                          {player.nickname}
                        </span>
                        {isYou && (
                          <span className="tag tag-you tag-animate">SEN</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {player.hasSubmittedNames ? (
                    <span className="tag tag-ready tag-animate">
                      <Check className="h-3.5 w-3.5" />
                      Hazır
                    </span>
                  ) : (
                    <span className="tag tag-waiting">
                      <Clock className="h-3.5 w-3.5 animate-spin" style={{ animationDuration: '4s' }} />
                      Bekleniyor
                    </span>
                  )}
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Start Game Action */}
        <section className="paper-card p-6 text-center">
          {state.you.isHost ? (
            <>
              <motion.button
                whileHover={{ scale: state.canStart ? 1.02 : 1, rotate: state.canStart ? -0.5 : 0 }}
                whileTap={{ scale: state.canStart ? 0.98 : 1 }}
                onClick={() => void handleStart()}
                disabled={isStarting || !state.canStart}
                className={`flex w-full items-center justify-center gap-2 py-4 font-display text-xl font-bold text-white transition-all ${
                  state.canStart
                    ? 'btn-pencil-green animate-wiggle'
                    : 'cursor-not-allowed border-2 border-dashed border-paper-border bg-paper-card text-ink-extra-faded'
                }`}
                style={state.canStart ? undefined : { borderRadius: '8px 12px 6px 14px' }}
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
              <p className="mt-3 font-display text-base text-ink-faded" aria-live="polite">
                {state.players.length < 2
                  ? 'Oyunu başlatmak için en az 2 oyuncu olmalıdır.'
                  : !state.allPlayersSubmittedNames
                    ? 'Tüm oyuncuların isimlerini tamamlaması bekleniyor...'
                    : 'Herkes hazır! Oyunu başlatabilirsiniz.'}
              </p>
            </>
          ) : (
            <div className="py-2 text-ink-faded" aria-live="polite">
              <p className="font-display text-2xl font-bold flex items-center justify-center gap-2">
                <Clock className="h-5 w-5 animate-spin" style={{ animationDuration: '5s' }} />
                <span>Oda sahibinin oyunu başlatması bekleniyor...</span>
              </p>
              <p className="mt-1 text-sm text-ink-extra-faded">
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
        <div className="h-28 animate-pulse rounded-xl border-2 border-dashed border-paper-border bg-paper-card" />
        <div className="h-64 animate-pulse rounded-xl border-2 border-dashed border-paper-border bg-paper-card" />
        <div className="h-40 animate-pulse rounded-xl border-2 border-dashed border-paper-border bg-paper-card" />
      </div>
    </div>
  )
}

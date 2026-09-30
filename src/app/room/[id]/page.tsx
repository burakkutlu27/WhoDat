'use client'

import { Brain, Check, CheckCircle2, ChevronDown, ChevronUp, Clock, Copy, Crown, Dices, Gauge, Layers, Loader2, LogOut, MessageSquare, Mic, Pencil, Play, Send, Settings2, Shuffle, Target, Users, Zap } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { use, useEffect, useState } from 'react'

import Confetti from '@/components/Confetti'
import { CopiedPostIt } from '@/components/animations'
import { CategoryIcon } from '@/components/CategoryIcon'
import { CustomSelect } from '@/components/CustomSelect'
import { FamousPersonAutocompleteInput } from '@/components/FamousPersonAutocompleteInput'
import NameSuggestions from '@/components/NameSuggestions'
import { ApiClientError, apiRequest } from '@/lib/apiClient'
import { CATEGORIES } from '@/lib/game/famousPeopleData'
import type { AutoAssignResult, FamousPerson, FamousPersonCategory, SubmitNamesResult } from '@/lib/game/types'
import { useGameState } from '@/lib/useGameState'

const NAME_SLOTS = 3

export default function RoomPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: roomId } = use(params)
  const router = useRouter()
  const { state, phase, error, degraded, refresh } = useGameState(roomId)

  const [names, setNames] = useState<string[]>(Array(NAME_SLOTS).fill(''))
  const [isEditingNames, setIsEditingNames] = useState(false)
  const [targetNameInput, setTargetNameInput] = useState('')
  const [isSavingTarget, setIsSavingTarget] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isStarting, setIsStarting] = useState(false)
  const [isAutoAssigning, setIsAutoAssigning] = useState(false)
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [selectedAutoCategory, setSelectedAutoCategory] = useState<FamousPersonCategory | null>(null)
  const roomCategoryDefault: FamousPersonCategory = state?.room
    ? state.room.categoryMode === 'multi_phase'
      ? (state.room.phaseCategories?.[0] || 'all')
      : (state.room.selectedCategory || 'all')
    : 'all'
  const autoCategory = selectedAutoCategory ?? roomCategoryDefault
  const [autoAssignSuccess, setAutoAssignSuccess] = useState<string | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)
  const [duplicates, setDuplicates] = useState<string[]>([])
  const [copied, setCopied] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const status = state?.room.status
  const isSharedTarget = state?.room.gameMode === 'shared_target'

  // Oda kurma/katılma formundaki kaydırma konumu taşınıyor, telefonda lobi ortadan açılıyordu.
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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

  const handleAutoAssign = async (cat: FamousPersonCategory = autoCategory) => {
    setIsAutoAssigning(true)
    setActionError(null)
    setAutoAssignSuccess(null)
    try {
      const result = await apiRequest<AutoAssignResult>(`/api/rooms/${roomId}/auto-assign`, {
        method: 'POST',
        body: { category: cat },
      })
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 2000)
      if (result.isSharedTarget && result.sharedTargetName) {
        setTargetNameInput(result.sharedTargetName)
        setAutoAssignSuccess(`Gizli hedef belirlendi: "${result.sharedTargetName}"`)
      } else {
        setAutoAssignSuccess(`Tüm oyuncular için ${result.assignedCount} isim veritabanından başarıyla atandı!`)
      }
      setTimeout(() => setAutoAssignSuccess(null), 5000)
      await refresh()
    } catch (caught) {
      setActionError(caught instanceof ApiClientError ? caught.message : 'Otomatik isim ataması yapılamadı.')
    } finally {
      setIsAutoAssigning(false)
    }
  }

  const handleSelectSuggestion = (suggestedName: string) => {
    setNames((prev) => {
      const next = [...prev]
      const emptyIndex = next.findIndex((n) => !n.trim())
      if (emptyIndex !== -1) {
        next[emptyIndex] = suggestedName
      } else {
        next[next.length - 1] = suggestedName
      }
      return next
    })
  }

  const handleFillAllEmpty = (freshNames: string[]) => {
    setNames((prev) => {
      const next = [...prev]
      let freshIdx = 0
      for (let i = 0; i < next.length; i++) {
        if (!next[i]!.trim() && freshIdx < freshNames.length) {
          next[i] = freshNames[freshIdx++]!
        }
      }
      if (freshIdx === 0 && freshNames.length > 0) {
        return freshNames.slice(0, NAME_SLOTS)
      }
      return next
    })
  }

  const handleSubmitNames = async () => {
    const filled = names.map((name) => name.trim()).filter(Boolean)
    if (filled.length < NAME_SLOTS) {
      setActionError(`Lütfen ${NAME_SLOTS} ismi de eksiksiz doldurun.`)
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
      setIsEditingNames(false)
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
      <div className="flex min-h-[calc(100dvh-4rem)] items-center justify-center p-4">
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

  // Ortak Hedef'te oyuncular isim göndermez; "0/3 hazır" yanıltıcı olur.
  const readyLabel = isSharedTarget
    ? ''
    : ` (${state.players.filter((player) => player.hasSubmittedNames).length}/${state.players.length} hazır)`

  return (
    // pb-44: telefonda alttaki sabit "Oyunu Başlat" çubuğu son içeriğin üstüne binmesin.
    <div className="relative min-h-[calc(100dvh-4rem)] px-3 pt-4 pb-44 sm:px-4 sm:py-8">
      <Confetti trigger={showConfetti} />
      <div className="mx-auto max-w-4xl space-y-4 sm:space-y-6">
        {/* Header Card */}
        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="paper-card-lg p-6 sm:p-7 space-y-4"
        >
          {/* Top Title & Leave Button Row */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 font-display text-lg sm:text-xl text-pencil-yellow">
                <Clock className="h-4 w-4 animate-spin" style={{ animationDuration: '4s' }} />
                <span>Bekleme Lobisi</span>
              </span>
              <span className="text-ink-faded font-display text-sm hidden sm:inline">•</span>
              <h1 className="font-display text-xl sm:text-2xl font-bold text-ink hidden sm:inline">
                Oyun Hazırlığı
              </h1>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => void handleLeave()}
              className="btn-outline flex items-center gap-2 px-3.5 py-1.5 font-display text-sm sm:text-base font-bold shrink-0 text-pencil-red border-pencil-red/30 hover:border-pencil-red"
            >
              <LogOut className="h-4 w-4" />
              <span>Odadan Çık</span>
            </motion.button>
          </div>

          {/* 1. ODA KODU: En tepede, ortada, daha büyük ve belirgin */}
          <div className="flex flex-col items-center justify-center pt-1 pb-2">
            <span className="text-xs font-display font-bold uppercase tracking-widest text-ink-faded mb-1.5">
              Oda Kodu
            </span>
            <div className="relative inline-block">
              <button
                type="button"
                onClick={() => void handleCopyCode()}
                title="Kopyalamak için tıkla"
                className="group relative inline-flex items-center justify-center gap-3 border-2 border-dashed border-pencil-red bg-paper-card px-6 py-2.5 shadow-sm transition-all hover:bg-pencil-red/5 hover:border-pencil-red hover:shadow-md active:scale-95 cursor-pointer"
                style={{ borderRadius: '10px 18px 8px 16px' }}
              >
                <span
                  data-testid="room-code"
                  className="font-mono text-3xl sm:text-4xl font-extrabold tracking-[0.2em] text-pencil-red select-all"
                >
                  {state.room.roomCode}
                </span>
                <div className="flex items-center justify-center h-8 w-8 rounded-full bg-pencil-red/10 group-hover:bg-pencil-red group-hover:text-white text-pencil-red transition-colors">
                  {copied ? (
                    <Check className="h-4 w-4 text-pencil-green stroke-[3]" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </div>
              </button>
              <CopiedPostIt show={copied} className="absolute left-1/2 -translate-x-1/2 top-full z-20" />
            </div>
            <span className="text-[11px] font-sans text-ink-faded mt-1.5">
              Kopyalamak ve arkadaşlarını davet etmek için koda tıkla
            </span>
          </div>

          {/* 2. OYUN BİLGİLERİ: Sade ve temiz rozetler */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            <span className="tag text-xs sm:text-sm">
              <Users className="h-3.5 w-3.5 text-pencil-blue" />
              {state.players.length} Oyuncu
            </span>
            <span className={`tag text-xs sm:text-sm ${
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
            <span className="tag text-xs sm:text-sm border-pencil-purple text-pencil-purple font-bold flex items-center gap-1">
              <Layers className="h-3.5 w-3.5" />
              {state.room.categoryMode === 'multi_phase' ? (
                <span>
                  3 Faz (
                  {(state.room.phaseCategories || ['sporcular', 'cizgi_karakterler', 'tarihi_kisiler'])
                    .map((c) => CATEGORIES.find((cat) => cat.id === c)?.label || c)
                    .join(' → ')}
                  )
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <CategoryIcon category={state.room.selectedCategory || 'all'} className="h-3.5 w-3.5" />
                  <span>{CATEGORIES.find((c) => c.id === (state.room.selectedCategory || 'all'))?.label || 'Tümü'}</span>
                </span>
              )}
            </span>
            <span className={`tag text-xs sm:text-sm ${
              state.room.difficulty === 'kolay'
                ? 'border-pencil-green text-pencil-green font-bold'
                : state.room.difficulty === 'zor'
                  ? 'border-pencil-red text-pencil-red font-bold'
                  : 'border-pencil-yellow text-pencil-yellow font-bold'
            }`}>
              <Gauge className="h-3.5 w-3.5 mr-1 inline" />
              {state.room.difficulty === 'kolay'
                ? 'Zorluk: Kolay'
                : state.room.difficulty === 'zor'
                  ? 'Zorluk: Zor'
                  : 'Zorluk: Orta'}
            </span>
            <span className={`tag text-xs sm:text-sm ${
              state.room.communicationMode === 'text'
                ? 'border-pencil-green text-pencil-green font-bold'
                : 'border-pencil-yellow text-pencil-yellow font-bold'
            }`}>
              {state.room.communicationMode === 'text' ? (
                <>
                  <MessageSquare className="h-3.5 w-3.5 mr-1 inline" />
                  <span>Tam Metin</span>
                </>
              ) : (
                <>
                  <Mic className="h-3.5 w-3.5 mr-1 inline" />
                  <span>Sesli İletişim</span>
                </>
              )}
            </span>
            {degraded && (
              <span className="tag text-xs sm:text-sm border-pencil-orange text-pencil-orange">
                Canlı bağlantı zayıf
              </span>
            )}
          </div>

          {/* 3. AYARLARI DÜZENLEME: Ayrı ve belirgin buton */}
          {state.you.isHost && (
            <div className="flex justify-center pt-1">
              <button
                type="button"
                onClick={() => setIsSettingsOpen(!isSettingsOpen)}
                className={`group relative inline-flex items-center justify-center gap-2.5 px-6 py-2.5 rounded-sketch-md font-display text-sm sm:text-base font-bold transition-all shadow-xs active:scale-98 cursor-pointer ${
                  isSettingsOpen
                    ? 'bg-pencil-yellow text-white shadow-md ring-2 ring-pencil-yellow/40'
                    : 'bg-paper-card-alt hover:bg-pencil-yellow/10 text-ink border-2 border-dashed border-pencil-yellow/80 hover:border-pencil-yellow'
                }`}
              >
                <Settings2 className={`h-4 w-4 transition-transform duration-200 ${isSettingsOpen ? 'rotate-90 text-white' : 'text-pencil-yellow group-hover:rotate-45'}`} />
                <span>{isSettingsOpen ? 'Ayarları Kapat' : 'Oyun & Kategori Ayarlarını Düzenle'}</span>
                {isSettingsOpen ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4 opacity-70 group-hover:translate-y-0.5 transition-transform" />
                )}
              </button>
            </div>
          )}

          {/* Host Game Mode & Category Settings (Daraltılabilir / Collapsible) */}
          {state.you.isHost && (
            <AnimatePresence>
              {isSettingsOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                  className="space-y-3.5 pt-4 border-t border-paper-border"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="font-display text-base font-bold text-ink-faded">
                      Oyun Modu:
                    </span>
                    <div className="flex gap-2 flex-wrap">
                      <button
                        type="button"
                        onClick={async () => {
                          if (state.room.gameMode === 'classic') return
                          await apiRequest(`/api/rooms/${roomId}/mode`, { method: 'PATCH', body: { gameMode: 'classic' } })
                          await refresh()
                        }}
                        className={`px-3.5 py-1.5 text-sm font-sans font-bold rounded-sketch transition-all flex items-center gap-1.5 ${
                          state.room.gameMode === 'classic'
                            ? 'bg-pencil-yellow text-white shadow-sm ring-1 ring-pencil-yellow'
                            : 'border border-paper-border bg-paper-card text-ink-faded hover:text-ink'
                        }`}
                      >
                        <Target className="h-4 w-4" />
                        <span>Klasik (Can)</span>
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (state.room.gameMode === 'speed') return
                          await apiRequest(`/api/rooms/${roomId}/mode`, { method: 'PATCH', body: { gameMode: 'speed' } })
                          await refresh()
                        }}
                        className={`px-3.5 py-1.5 text-sm font-sans font-bold rounded-sketch transition-all flex items-center gap-1.5 ${
                          state.room.gameMode === 'speed'
                            ? 'bg-pencil-green text-white shadow-sm ring-1 ring-pencil-green'
                            : 'border border-paper-border bg-paper-card text-ink-faded hover:text-ink'
                        }`}
                      >
                        <Zap className="h-4 w-4" />
                        <span>Hız Modu (Puan)</span>
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (state.room.gameMode === 'persistent') return
                          await apiRequest(`/api/rooms/${roomId}/mode`, { method: 'PATCH', body: { gameMode: 'persistent' } })
                          await refresh()
                        }}
                        className={`px-3.5 py-1.5 text-sm font-sans font-bold rounded-sketch transition-all flex items-center gap-1.5 ${
                          state.room.gameMode === 'persistent'
                            ? 'bg-pencil-blue text-white shadow-sm ring-1 ring-pencil-blue'
                            : 'border border-paper-border bg-paper-card text-ink-faded hover:text-ink'
                        }`}
                      >
                        <Brain className="h-4 w-4" />
                        <span>Israrcı (Bütçe)</span>
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (state.room.gameMode === 'shared_target') return
                          await apiRequest(`/api/rooms/${roomId}/mode`, { method: 'PATCH', body: { gameMode: 'shared_target' } })
                          await refresh()
                        }}
                        className={`px-3.5 py-1.5 text-sm font-sans font-bold rounded-sketch transition-all flex items-center gap-1.5 ${
                          state.room.gameMode === 'shared_target'
                            ? 'bg-pencil-orange text-white shadow-sm ring-1 ring-pencil-orange'
                            : 'border border-paper-border bg-paper-card text-ink-faded hover:text-ink'
                        }`}
                      >
                        <Users className="h-4 w-4" />
                        <span>Ortak Hedef (Hakem)</span>
                      </button>
                    </div>
                  </div>

                  {/* İletişim Tarzı Değiştirme */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2.5 border-t border-dashed border-paper-border">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4 text-pencil-green" />
                      <span className="font-display text-base font-bold text-ink-faded">
                        İletişim Tarzı:
                      </span>
                    </div>
                    <div className="flex gap-2 flex-wrap items-center">
                      <button
                        type="button"
                        onClick={async () => {
                          if (state.room.communicationMode === 'voice') return
                          await apiRequest(`/api/rooms/${roomId}/communication`, { method: 'PATCH', body: { communicationMode: 'voice' } })
                          await refresh()
                        }}
                        className={`px-3.5 py-1.5 text-sm font-sans font-bold rounded-sketch transition-all flex items-center gap-1.5 ${
                          state.room.communicationMode !== 'text'
                            ? 'bg-pencil-yellow text-white shadow-sm ring-1 ring-pencil-yellow'
                            : 'border border-paper-border bg-paper-card text-ink-faded hover:text-ink'
                        }`}
                      >
                        <Mic className="h-4 w-4" />
                        <span>Sesli (Klasik)</span>
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (state.room.communicationMode === 'text') return
                          await apiRequest(`/api/rooms/${roomId}/communication`, { method: 'PATCH', body: { communicationMode: 'text' } })
                          await refresh()
                        }}
                        className={`px-3.5 py-1.5 text-sm font-sans font-bold rounded-sketch transition-all flex items-center gap-1.5 ${
                          state.room.communicationMode === 'text'
                            ? 'bg-pencil-green text-white shadow-sm ring-1 ring-pencil-green'
                            : 'border border-paper-border bg-paper-card text-ink-faded hover:text-ink'
                        }`}
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>Tam Metin (15sn Oylama)</span>
                      </button>
                    </div>
                  </div>

                  {/* Kategori Havuzu Değiştirme */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2.5 border-t border-dashed border-paper-border">
                    <div className="flex items-center gap-2">
                      <Layers className="h-4 w-4 text-pencil-purple" />
                      <span className="font-display text-base font-bold text-ink-faded">
                        Kategori Havuzu:
                      </span>
                    </div>
                    <div className="flex gap-2 flex-wrap items-center">
                      <button
                        type="button"
                        onClick={async () => {
                          if (state.room.categoryMode === 'single') return
                          await apiRequest(`/api/rooms/${roomId}/category`, { method: 'PATCH', body: { categoryMode: 'single' } })
                          await refresh()
                        }}
                        className={`px-3.5 py-1.5 text-sm font-sans font-bold rounded-sketch transition-all flex items-center gap-1.5 ${
                          state.room.categoryMode !== 'multi_phase'
                            ? 'bg-pencil-blue text-white shadow-sm ring-1 ring-pencil-blue'
                            : 'border border-paper-border bg-paper-card text-ink-faded hover:text-ink'
                        }`}
                      >
                        <Target className="h-4 w-4" />
                        <span>Tek Kategori</span>
                      </button>
                      <button
                        type="button"
                        onClick={async () => {
                          if (state.room.categoryMode === 'multi_phase') return
                          await apiRequest(`/api/rooms/${roomId}/category`, { method: 'PATCH', body: { categoryMode: 'multi_phase' } })
                          await refresh()
                        }}
                        className={`px-3.5 py-1.5 text-sm font-sans font-bold rounded-sketch transition-all flex items-center gap-1.5 ${
                          state.room.categoryMode === 'multi_phase'
                            ? 'bg-pencil-purple text-white shadow-sm ring-1 ring-pencil-purple'
                            : 'border border-paper-border bg-paper-card text-ink-faded hover:text-ink'
                        }`}
                      >
                        <Layers className="h-4 w-4" />
                        <span>3 Fazlı Karışık</span>
                      </button>
                    </div>
                  </div>

                  {state.room.categoryMode !== 'multi_phase' ? (
                    <div className="flex items-center justify-between gap-3 p-3 rounded-sketch-md bg-paper-card-alt border border-paper-border">
                      <span className="font-display text-base font-bold text-ink">Kategori:</span>
                      <CustomSelect
                        value={state.room.selectedCategory || 'all'}
                        onChange={async (val) => {
                          const newCat = val as FamousPersonCategory
                          setSelectedAutoCategory(newCat)
                          await apiRequest(`/api/rooms/${roomId}/category`, {
                            method: 'PATCH',
                            body: { category: newCat },
                          })
                          await refresh()
                        }}
                        options={CATEGORIES.map((c) => ({
                          value: c.id,
                          label: c.label,
                          icon: <CategoryIcon category={c.id} className="h-4 w-4" />,
                        }))}
                        align="right"
                        className="min-w-[180px]"
                      />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3 rounded-sketch-md bg-paper-card-alt border border-paper-border">
                      {[0, 1, 2].map((idx) => {
                        const phases = state.room.phaseCategories || ['sporcular', 'cizgi_karakterler', 'tarihi_kisiler']
                        const currentVal = phases[idx] || 'all'
                        return (
                          <div key={idx} className="flex flex-col gap-1.5 bg-paper-card p-2.5 rounded-sketch border border-dashed border-paper-border">
                            <span className="text-xs font-sans font-bold text-ink flex items-center gap-1.5">
                              <span className="h-5 w-5 rounded-full bg-pencil-purple/20 text-pencil-purple flex items-center justify-center text-xs font-bold">
                                {idx + 1}
                              </span>
                              <span>Faz {idx + 1} Kategorisi:</span>
                            </span>
                            <CustomSelect
                              value={currentVal}
                              onChange={async (val) => {
                                const next = [...phases]
                                next[idx] = val as FamousPersonCategory
                                await apiRequest(`/api/rooms/${roomId}/category`, {
                                  method: 'PATCH',
                                  body: { phaseCategories: next },
                                })
                                await refresh()
                              }}
                              options={CATEGORIES.filter((c) => c.id !== 'all').map((c) => ({
                                value: c.id,
                                label: c.label,
                                icon: <CategoryIcon category={c.id} className="h-4 w-4" />,
                              }))}
                              size="sm"
                              className="w-full"
                            />
                          </div>
                        )
                      })}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Host Hızlı Başlat / Sistem Otomatik Atasın (Her zaman açık & erişilebilir) */}
          {state.you.isHost && (
            <div className="mt-4 pt-3.5 border-t border-paper-border">
              <div className="rounded-sketch-md border border-dashed border-paper-border bg-paper-card-alt p-3.5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <Shuffle className="h-5 w-5 text-pencil-yellow shrink-0" />
                  {state.room.categoryMode === 'multi_phase' ? (
                    <div className="flex flex-col">
                      <span className="font-display text-base font-bold text-ink flex items-center gap-1.5">
                        <span>Hızlı Başlat (Seçilen Faz Kategorileri)</span>
                        <span className="tag text-xs border-pencil-purple text-pencil-purple">3 Faz</span>
                      </span>
                      <span className="text-xs text-ink-faded font-sans">
                        1. Faz: <strong>{CATEGORIES.find((c) => c.id === (state.room.phaseCategories?.[0] || 'sporcular'))?.label}</strong> (her fazda otomatik dağıtılır)
                      </span>
                    </div>
                  ) : (
                    <>
                      <span className="font-display text-base font-bold text-ink">
                        Hızlı Başlat (Sistem Atasın):
                      </span>
                      <CustomSelect
                        value={autoCategory}
                        onChange={(val) => setSelectedAutoCategory(val as FamousPersonCategory)}
                        options={CATEGORIES.map((c) => ({
                          value: c.id,
                          label: c.label,
                          icon: <CategoryIcon category={c.id} className="h-4 w-4" />,
                        }))}
                        size="sm"
                        className="min-w-[170px]"
                      />
                    </>
                  )}
                </div>

                <button
                  type="button"
                  data-testid="auto-assign-button"
                  disabled={isAutoAssigning}
                  onClick={() =>
                    void handleAutoAssign(
                      state.room.categoryMode === 'multi_phase'
                        ? (state.room.phaseCategories?.[0] || 'all')
                        : autoCategory,
                    )
                  }
                  className="btn-pencil-yellow flex items-center gap-1.5 px-3.5 py-2 text-sm font-sans font-bold transition-all shadow-xs"
                >
                  {isAutoAssigning ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Dices className="h-4 w-4" />
                  )}
                  <span>
                    {isSharedTarget ? 'Rastgele Hedef Seç' : 'Tüm Oyunculara İsim Ata'}
                  </span>
                </button>
              </div>
            </div>
          )}
        </motion.header>

        {autoAssignSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="alert-success flex items-center gap-2 font-display text-base"
          >
            <CheckCircle2 className="h-5 w-5 text-pencil-green shrink-0" />
            <span>{autoAssignSuccess}</span>
          </motion.div>
        )}

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
                    <FamousPersonAutocompleteInput
                      id="target-input"
                      value={targetNameInput}
                      onChange={(val: string) => setTargetNameInput(val)}
                      onSelect={(person: FamousPerson) => {
                        setTargetNameInput(person.name)
                        void handleSaveTarget(person.name)
                      }}
                      placeholder="Örn: Albert Einstein, Kemal Sunal, Tarkan..."
                      disabled={isSavingTarget}
                      maxLength={60}
                      difficultyFilter={state.room.difficulty}
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

                {/* Öneri Çipleri & Fikir Ver */}
                <NameSuggestions
                  onSelectName={(name) => {
                    setTargetNameInput(name)
                    void handleSaveTarget(name)
                  }}
                  disabled={isSavingTarget}
                  difficultyFilter={state.room.difficulty}
                  selectedNames={targetNameInput ? [targetNameInput] : []}
                />

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
          /* Klasik / Hız / Israrcı Mod İsim Girişi & Düzenleme */
          (!hasSubmitted || isEditingNames) && (
            <motion.section
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="paper-card p-6 sm:p-8"
            >
              <div className="flex items-center justify-between gap-2">
                <h2 className="flex items-center gap-2 font-display text-3xl font-bold text-ink">
                  <Pencil className="h-6 w-6 text-pencil-yellow" />
                  <span>{isEditingNames ? 'İsimlerinizi Düzenleyin' : 'Gizli İsimlerinizi Yazın'}</span>
                </h2>
                {isEditingNames && (
                  <button
                    type="button"
                    onClick={() => setIsEditingNames(false)}
                    className="btn-outline px-3.5 py-1.5 text-sm font-display font-bold text-ink-faded hover:text-ink"
                  >
                    Vazgeç
                  </button>
                )}
              </div>
              <p className="mt-1 mb-4 text-base text-ink-faded">
                Diğer oyuncuların tahmin etmesi için havuza {NAME_SLOTS} isim ekleyin (Ünlü, karakter, tanıdık).
              </p>

              {state.room.categoryMode === 'multi_phase' ? (
                <div className="mb-4 inline-flex items-center gap-2 px-3.5 py-2 rounded-sketch bg-pencil-purple/10 border border-pencil-purple/30 text-pencil-purple text-sm font-display font-bold">
                  <Layers className="h-4 w-4" />
                  <span>
                    3 Fazlı Mod: Her kutuya ilgili fazın kategorisine uygun 1 isim yazın.
                  </span>
                </div>
              ) : state.room.selectedCategory && state.room.selectedCategory !== 'all' ? (
                <div className="mb-4 inline-flex items-center gap-2 px-3.5 py-2 rounded-sketch bg-pencil-blue/10 border border-pencil-blue/30 text-pencil-blue text-sm font-display font-bold">
                  <span className="flex items-center gap-1.5">
                    <span>Seçili Kategori:</span>
                    <CategoryIcon category={state.room.selectedCategory} className="h-4 w-4" />
                    <span>{CATEGORIES.find((c) => c.id === state.room.selectedCategory)?.label}</span>
                  </span>
                </div>
              ) : null}

              <div className="space-y-4">
                {names.map((name, index) => {
                  const isMulti = state.room.categoryMode === 'multi_phase'
                  const phaseCat = isMulti
                    ? (state.room.phaseCategories?.[index] || 'all')
                    : (state.room.selectedCategory || 'all')
                  const phaseCategoryLabel = CATEGORIES.find((c) => c.id === phaseCat)?.label || phaseCat

                  return (
                    <div key={index}>
                      <label
                        htmlFor={`name-${index}`}
                        className="mb-1.5 flex flex-wrap items-center justify-between gap-1 font-display text-2xl font-bold text-ink"
                      >
                        <span className="flex items-center gap-2">
                          {isMulti && (
                            <span className="h-6 w-6 rounded-full bg-pencil-purple/20 text-pencil-purple text-xs font-bold flex items-center justify-center font-sans">
                              {index + 1}
                            </span>
                          )}
                          <span>
                            {isMulti ? `${index + 1}. Faz İsmi:` : `İsim ${index + 1}`}
                          </span>
                        </span>
                        {isMulti && (
                          <span className="tag text-xs border-pencil-purple text-pencil-purple flex items-center gap-1 font-sans font-bold">
                            <CategoryIcon category={phaseCat} className="h-3.5 w-3.5" />
                            <span>{phaseCategoryLabel}</span>
                          </span>
                        )}
                      </label>
                      <FamousPersonAutocompleteInput
                        id={`name-${index}`}
                        value={name}
                        maxLength={60}
                        disabled={isSubmitting}
                        placeholder={
                          isMulti
                            ? `${index + 1}. Faz (${phaseCategoryLabel}) için bir isim girin...`
                            : `Örn: ${index === 0 ? 'Albert Einstein' : index === 1 ? 'Sherlock Holmes' : 'Tarkan'}`
                        }
                        categoryFilter={phaseCat}
                        difficultyFilter={state.room.difficulty}
                        onChange={(val: string) => {
                          const next = [...names]
                          next[index] = val
                          setNames(next)
                        }}
                        onSelect={(person: FamousPerson) => {
                          const next = [...names]
                          next[index] = person.name
                          setNames(next)
                        }}
                      />
                    </div>
                  )
                })}
              </div>

              {/* Fikir mi lazım? Öneri Kartları */}
              <NameSuggestions
                categoryFilter={state.room.activeCategory || 'all'}
                difficultyFilter={state.room.difficulty}
                onSelectName={handleSelectSuggestion}
                onFillAllEmpty={handleFillAllEmpty}
                emptySlotsCount={names.filter((n) => !n.trim()).length}
                disabled={isSubmitting}
                selectedNames={names.filter(Boolean)}
              />

              {actionError && (
                <div role="alert" className="alert-error mt-4">
                  {actionError}
                </div>
              )}

              <div className="mt-6 flex flex-wrap gap-2">
                <motion.button
                  whileHover={{ scale: 1.01, rotate: -0.5 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => void handleSubmitNames()}
                  disabled={isSubmitting || names.some((name) => !name.trim())}
                  data-testid="submit-names-button"
                  className="btn-pencil-red flex flex-1 items-center justify-center gap-2 py-4 font-display text-2xl font-bold"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Kaydediliyor...</span>
                    </>
                  ) : (
                    <>
                      <span>{isEditingNames ? 'İsimleri Güncelle' : 'İsimleri Gönder (3 İsim)'}</span>
                      <Send className="h-5 w-5" />
                    </>
                  )}
                </motion.button>

                {isEditingNames && (
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => setIsEditingNames(false)}
                    className="btn-outline px-6 py-4 font-display text-lg font-bold"
                  >
                    İptal
                  </button>
                )}
              </div>
            </motion.section>
          )
        )}



        {/* Submitted Names Confirmation & Edit Action */}
        {hasSubmitted && !isEditingNames && (
          <motion.section
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="alert-success"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-pencil-green" />
                <h2 className="font-display text-2xl font-bold text-pencil-green">
                  İsimleriniz Havuza Eklendi
                </h2>
              </div>
              <button
                type="button"
                onClick={() => {
                  const existing = state.you.submittedNames || []
                  const padded = Array(NAME_SLOTS).fill('').map((_, i) => existing[i] || '')
                  setNames(padded)
                  setIsEditingNames(true)
                }}
                className="btn-outline flex items-center gap-1.5 px-3 py-1.5 text-sm font-display font-bold text-ink hover:text-pencil-blue hover:border-pencil-blue transition-all"
              >
                <Pencil className="h-4 w-4" />
                <span>İsimleri Düzenle</span>
              </button>
            </div>
            <ul className="flex flex-wrap gap-2">
              {state.you.submittedNames.map((name) => (
                <li
                  key={name}
                  className="tag tag-ready font-display text-lg"
                >
                  {name}
                </li>
              ))}
            </ul>
            {duplicates.length > 0 && (
              <p className="mt-3 text-sm text-pencil-orange">
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
            <span className="text-sm font-sans font-semibold text-ink-faded waiting-dots">Canlı Senkronize</span>
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
                          <span className="tag tag-you tag-animate text-xs">SEN</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {player.hasSubmittedNames ? (
                    <span className="tag tag-ready tag-animate text-xs">
                      <Check className="h-4 w-4" />
                      Hazır
                    </span>
                  ) : (
                    <span className="tag tag-waiting text-xs">
                      <Clock className="h-4 w-4 animate-spin" style={{ animationDuration: '4s' }} />
                      Bekleniyor
                    </span>
                  )}
                </motion.div>
              )
            })}
          </div>
        </section>

        {/* Start Game Action — telefonda ekranın altına sabit: lobi uzun, host "Başlat" için en alta kaydırmasın */}
        <section
          data-testid="lobby-action-bar"
          className="paper-card p-6 text-center max-sm:fixed max-sm:inset-x-0 max-sm:bottom-0 max-sm:z-30 max-sm:rounded-none max-sm:border-x-0 max-sm:border-b-0 max-sm:p-3 max-sm:pb-[calc(env(safe-area-inset-bottom)+0.75rem)] max-sm:shadow-[0_-4px_14px_rgba(0,0,0,0.10)]"
        >
          {state.you.isHost ? (
            <>
              <motion.button
                whileHover={{ scale: state.canStart ? 1.02 : 1, rotate: state.canStart ? -0.5 : 0 }}
                whileTap={{ scale: state.canStart ? 0.98 : 1 }}
                onClick={() => void handleStart()}
                disabled={isStarting || !state.canStart}
                data-testid="start-game-button"
                className={`flex w-full items-center justify-center gap-2 py-3 font-display text-xl font-bold transition-all sm:py-4 sm:text-2xl ${
                  state.canStart
                    ? 'btn-pencil-green animate-wiggle text-white'
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
              <p className="mt-2 font-display text-sm text-ink-faded sm:mt-3 sm:text-lg" aria-live="polite">
                {state.players.length < 2
                  ? 'Oyunu başlatmak için en az 2 oyuncu olmalıdır.'
                  : !state.allPlayersSubmittedNames
                    ? `Tüm oyuncuların isimlerini tamamlaması bekleniyor...${readyLabel}`
                    : 'Herkes hazır! Oyunu başlatabilirsiniz.'}
              </p>
            </>
          ) : (
            <div className="py-1 text-ink-faded sm:py-2" aria-live="polite">
              <p className="font-display text-base font-bold flex items-center justify-center gap-2 sm:text-2xl">
                <Clock className="h-5 w-5 animate-spin" style={{ animationDuration: '5s' }} />
                <span>Oda sahibinin oyunu başlatması bekleniyor...{readyLabel}</span>
              </p>
              <p className="mt-1 hidden text-base text-ink-extra-faded sm:block">
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
    <div className="min-h-[calc(100dvh-4rem)] px-4 py-8">
      <div className="mx-auto max-w-4xl space-y-6" aria-busy="true" aria-label="Oda yükleniyor">
        <div className="h-28 animate-pulse rounded-xl border-2 border-dashed border-paper-border bg-paper-card" />
        <div className="h-64 animate-pulse rounded-xl border-2 border-dashed border-paper-border bg-paper-card" />
        <div className="h-40 animate-pulse rounded-xl border-2 border-dashed border-paper-border bg-paper-card" />
      </div>
    </div>
  )
}

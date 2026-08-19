'use client'

import { ArrowLeft, Brain, Check, Feather, Flame, Gauge, Layers, Loader2, MessageSquare, Mic, Pencil, Target, User, Users, Zap } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { CategoryIcon } from '@/components/CategoryIcon'
import { CustomSelect } from '@/components/CustomSelect'
import { ApiClientError, apiRequest } from '@/lib/apiClient'
import { getDeviceId } from '@/lib/deviceId'
import { CATEGORIES } from '@/lib/game/famousPeopleData'
import type { CommunicationMode, DifficultyLevel, FamousPersonCategory, GameMode, LobbyCategoryMode } from '@/lib/game/types'

export default function CreateRoomPage() {
  const router = useRouter()
  const [nickname, setNickname] = useState('')
  const [gameMode, setGameMode] = useState<GameMode>('classic')
  const [communicationMode, setCommunicationMode] = useState<CommunicationMode>('voice')
  const [difficulty, setDifficulty] = useState<DifficultyLevel>('orta')
  const [categoryMode, setCategoryMode] = useState<LobbyCategoryMode>('single')
  const [selectedCategory, setSelectedCategory] = useState<FamousPersonCategory>('all')
  const [phaseCategories, setPhaseCategories] = useState<FamousPersonCategory[]>([
    'sporcular',
    'cizgi_karakterler',
    'tarihi_kisiler',
  ])
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
        body: {
          nickname: nickname.trim(),
          gameMode,
          communicationMode,
          difficulty,
          categoryMode,
          category: selectedCategory,
          phaseCategories: categoryMode === 'multi_phase' ? phaseCategories : undefined,
          deviceId: getDeviceId(),
        },
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
      <div className="w-full max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 15, rotate: -1 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 0.4 }}
          className="paper-card-lg p-6 sm:p-8"
        >
          <div className="mb-6 text-center">
            <h1 className="font-display text-4xl font-bold text-ink sm:text-5xl">
              Yeni Oda Oluştur
            </h1>
            <p className="mt-1 text-base text-ink-faded">
              Odanı aç, oyun modunu seç ve arkadaşlarını davet et.
            </p>
          </div>

          <div className="divider-sketch mb-6" />

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label
                htmlFor="nickname"
                className="mb-2 flex items-center gap-1.5 font-display text-2xl font-bold text-ink"
              >
                <Pencil className="h-5 w-5 text-pencil-yellow" />
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
                  placeholder="Örn: Ahmet"
                  maxLength={20}
                  autoComplete="nickname"
                  disabled={isSubmitting}
                  aria-describedby={error ? 'create-room-error' : undefined}
                  className="paper-input pl-11 font-display text-3xl font-bold"
                />
              </div>
            </div>

            {/* Oyun Modu Seçimi */}
            <div>
              <label className="mb-2 block font-display text-2xl font-bold text-ink flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Target className="h-5 w-5 text-pencil-yellow" />
                  <span>Oyun Modu</span>
                </span>
                <span className="text-sm font-sans font-semibold text-ink-faded">
                  {gameMode === 'classic'
                    ? 'Klasik (3 Can)'
                    : gameMode === 'speed'
                      ? 'Hız Modu (3 Tur)'
                      : gameMode === 'persistent'
                        ? 'Israrcı (10 Soru)'
                        : 'Ortak Hedef (Hakem)'}
                </span>
              </label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    id: 'classic' as const,
                    title: 'Klasik',
                    desc: '3 Can Hakkı. Yanlış tahmin can götürür, hayatta kalan kazanır!',
                    icon: Target,
                    color: 'var(--pencil-yellow)',
                    borderClass: 'border-pencil-yellow',
                    bgClass: 'bg-pencil-yellow/10',
                    badgeBg: 'bg-pencil-yellow',
                  },
                  {
                    id: 'speed' as const,
                    title: 'Hız Modu',
                    desc: 'Az Soru, Çok Puan! 3 turda en az soruyla bil, puanları topla!',
                    icon: Zap,
                    color: 'var(--pencil-green)',
                    borderClass: 'border-pencil-green',
                    bgClass: 'bg-pencil-green/10',
                    badgeBg: 'bg-pencil-green',
                  },
                  {
                    id: 'persistent' as const,
                    title: 'Israrcı',
                    desc: '10 Soru Bütçesi & 3 Can. Bütçen bitince zorunlu tahmin!',
                    icon: Brain,
                    color: 'var(--pencil-blue)',
                    borderClass: 'border-pencil-blue',
                    bgClass: 'bg-pencil-blue/10',
                    badgeBg: 'bg-pencil-blue',
                  },
                  {
                    id: 'shared_target' as const,
                    title: 'Ortak Hedef',
                    desc: 'Tek Gizli Kişi & Hakem! Sırayla soru sor, ilk sen bil!',
                    icon: Users,
                    color: 'var(--pencil-orange)',
                    borderClass: 'border-pencil-orange',
                    bgClass: 'bg-pencil-orange/10',
                    badgeBg: 'bg-pencil-orange',
                  },
                ].map((item) => {
                  const isSelected = gameMode === item.id
                  const Icon = item.icon
                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98, y: 1 }}
                      onClick={() => setGameMode(item.id)}
                      className={`relative p-3.5 sm:p-4 text-left transition-colors duration-200 border-2 rounded-sketch-md flex flex-col justify-between ${
                        isSelected
                          ? 'border-transparent font-bold text-ink bg-paper-card'
                          : 'border-dashed border-paper-border bg-paper-card text-ink-faded hover:text-ink hover:border-ink-faded'
                      }`}
                    >
                      {/* ÜSTTEN KAYAN AKTİF ÇERÇEVE & GÖLGE KATMANI (Z-20 ile üstten süzülür) */}
                      {isSelected && (
                        <motion.div
                          layoutId="gameModeSelectedHighlight"
                          className={`pointer-events-none absolute -inset-0.5 rounded-sketch-md border-2 ${item.borderClass} ${item.bgClass} shadow-md z-20`}
                          transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                        />
                      )}

                      <div className="relative z-10 space-y-1.5 pr-6">
                        <span className="font-display text-lg sm:text-xl font-bold text-ink flex items-center gap-1.5">
                          <Icon className="h-5 w-5 shrink-0" style={{ color: item.color }} />
                          <span>{item.title}</span>
                        </span>
                        <span className="block text-xs sm:text-sm text-ink-faded font-sans font-normal leading-relaxed">
                          {item.desc}
                        </span>
                      </div>

                      {/* ÜSTTEN KAYAN ONAY ROZETİ (Z-30) */}
                      {isSelected && (
                        <motion.span
                          layoutId="gameModeCheck"
                          className={`absolute top-2.5 right-2.5 h-5 w-5 rounded-full ${item.badgeBg} text-white flex items-center justify-center shadow-md z-30`}
                          transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                        >
                          <Check className="h-3.5 w-3.5" />
                        </motion.span>
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* İletişim Tarzı (Sesli vs Tam Metin) */}
            <div>
              <label className="mb-2 block font-display text-2xl font-bold text-ink flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="h-5 w-5 text-pencil-green" />
                  <span>İletişim Tarzı</span>
                </span>
                <span className="text-sm font-sans font-semibold text-ink-faded">
                  {communicationMode === 'voice' ? 'Sesli Sohbet' : 'Tam Metin Modu'}
                </span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    id: 'voice' as const,
                    title: 'Sesli İletişim (Klasik)',
                    desc: 'Sorular ve cevaplar Discord veya sesli ortamda konuşulur.',
                    icon: Mic,
                    color: 'var(--pencil-yellow)',
                    borderClass: 'border-pencil-yellow',
                    bgClass: 'bg-pencil-yellow/10',
                    badgeBg: 'bg-pencil-yellow',
                  },
                  {
                    id: 'text' as const,
                    title: 'Tam Metin / Uzaktan',
                    desc: 'Sesli konuşma gerekmez! Hazır soru bankası, 15sn Evet/Hayır oylaması ve not defteri.',
                    icon: MessageSquare,
                    color: 'var(--pencil-green)',
                    borderClass: 'border-pencil-green',
                    bgClass: 'bg-pencil-green/10',
                    badgeBg: 'bg-pencil-green',
                  },
                ].map((item) => {
                  const isSelected = communicationMode === item.id
                  const Icon = item.icon
                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98, y: 1 }}
                      onClick={() => setCommunicationMode(item.id)}
                      className={`relative p-4 text-left transition-colors duration-200 border-2 rounded-sketch-md flex items-center justify-between ${
                        isSelected
                          ? 'border-transparent font-bold text-ink bg-paper-card'
                          : 'border-dashed border-paper-border bg-paper-card text-ink-faded hover:text-ink hover:border-ink-faded'
                      }`}
                    >
                      {/* ÜSTTEN KAYAN AKTİF ÇERÇEVE & GÖLGE KATMANI */}
                      {isSelected && (
                        <motion.div
                          layoutId="commModeSelectedHighlight"
                          className={`pointer-events-none absolute -inset-0.5 rounded-sketch-md border-2 ${item.borderClass} ${item.bgClass} shadow-md z-20`}
                          transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                        />
                      )}

                      <div className="relative z-10 space-y-1.5 pr-8">
                        <span className="font-display text-xl font-bold flex items-center gap-2 text-ink">
                          <Icon className="h-5 w-5" style={{ color: item.color }} />
                          <span>{item.title}</span>
                        </span>
                        <span className="block text-sm text-ink-faded font-sans font-normal leading-relaxed">
                          {item.desc}
                        </span>
                      </div>

                      {isSelected && (
                        <motion.span
                          layoutId="commModeCheck"
                          className={`absolute top-3.5 right-3.5 h-6 w-6 rounded-full ${item.badgeBg} text-white flex items-center justify-center text-sm shadow-md z-30`}
                          transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                        >
                          <Check className="h-4 w-4" />
                        </motion.span>
                      )}
                    </motion.button>
                  )
                })}
              </div>
            </div>

            {/* Kategori Seçimi */}
            <div>
              <label className="mb-2 block font-display text-2xl font-bold text-ink flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Layers className="h-5 w-5 text-pencil-purple" />
                  <span>Kategori Havuzu</span>
                </span>
                <span className="text-sm font-sans font-semibold text-ink-faded">
                  {categoryMode === 'single' ? 'Tek Kategori' : '3 Fazlı Çoklu Kategori'}
                </span>
              </label>

              {/* Kategori Modu Seçimi: Tek vs 3 Fazlı */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {[
                  {
                    id: 'single' as const,
                    title: 'Tek Kategori',
                    desc: 'Tüm oyun tek kategoriden',
                    icon: Target,
                    color: 'var(--pencil-blue)',
                    borderClass: 'border-pencil-blue',
                    bgClass: 'bg-pencil-blue/5',
                    badgeBg: 'bg-pencil-blue',
                  },
                  {
                    id: 'multi_phase' as const,
                    title: '3 Fazlı Karışık',
                    desc: '3 turda 3 farklı kategori',
                    icon: Layers,
                    color: 'var(--pencil-purple)',
                    borderClass: 'border-pencil-purple',
                    bgClass: 'bg-pencil-purple/5',
                    badgeBg: 'bg-pencil-purple',
                  },
                ].map((item) => {
                  const isSelected = categoryMode === item.id
                  const Icon = item.icon
                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98, y: 1 }}
                      onClick={() => setCategoryMode(item.id)}
                      className={`relative p-3.5 text-left transition-colors duration-200 border-2 rounded-sketch-md flex items-center justify-between ${
                        isSelected
                          ? 'border-transparent font-bold text-ink bg-paper-card'
                          : 'border-dashed border-paper-border bg-paper-card text-ink-faded hover:text-ink hover:border-ink-faded'
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="catModeSelectedHighlight"
                          className={`pointer-events-none absolute -inset-0.5 rounded-sketch-md border-2 ${item.borderClass} ${item.bgClass} shadow-md z-20`}
                          transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                        />
                      )}

                      <div className="relative z-10 pr-7">
                        <span className="font-display text-xl font-bold flex items-center gap-1.5">
                          <Icon className="h-5 w-5" style={{ color: item.color }} />
                          <span>{item.title}</span>
                        </span>
                        <span className="mt-1 block text-sm font-sans text-ink-faded font-normal">
                          {item.desc}
                        </span>
                      </div>

                      {isSelected && (
                        <motion.span
                          layoutId="catModeCheck"
                          className={`absolute top-3 right-3 h-6 w-6 rounded-full ${item.badgeBg} text-white flex items-center justify-center text-sm shadow-md z-30`}
                          transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                        >
                          <Check className="h-4 w-4" />
                        </motion.span>
                      )}
                    </motion.button>
                  )
                })}
              </div>

              {/* Tek Kategori İçin Kategori Çipleri vs 3 Faz Seçimi (AnimatePresence) */}
              <AnimatePresence mode="wait">
                {categoryMode === 'single' ? (
                  <motion.div
                    key="single-cat-panel"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="p-4 rounded-sketch-md border border-paper-border bg-paper-card-alt space-y-2.5"
                  >
                    <span className="text-sm font-display text-base font-bold text-ink block">
                      Oynanacak Kategoriyi Seçin:
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {CATEGORIES.map((cat) => {
                        const isSelected = selectedCategory === cat.id
                        return (
                          <motion.button
                            key={cat.id}
                            type="button"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`relative px-3.5 py-2.5 text-sm font-sans font-bold rounded-sketch border transition-colors flex items-center gap-2 ${
                              isSelected
                                ? 'border-pencil-blue text-ink shadow-sm font-bold bg-paper-card'
                                : 'border-paper-border bg-paper-card text-ink-faded hover:text-ink hover:border-ink-faded'
                            }`}
                          >
                            {isSelected && (
                              <motion.div
                                layoutId="activeCategoryChipHighlight"
                                className="pointer-events-none absolute -inset-0.5 bg-pencil-blue/15 border border-pencil-blue rounded-sketch shadow-sm z-10"
                                transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                              />
                            )}
                            <CategoryIcon category={cat.id} className="relative z-20 h-4 w-4 shrink-0 text-pencil-blue" />
                            <span className="relative z-20 truncate">{cat.label}</span>
                          </motion.button>
                        )
                      })}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="multi-phase-panel"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="p-4 rounded-sketch-md border border-paper-border bg-paper-card-alt space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-display text-base font-bold text-ink block">
                        3 Faz İçin Sıralı Kategoriler:
                      </span>
                      <span className="text-xs text-pencil-purple font-sans font-bold">
                        Fazlar arası can & puan korunur
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[0, 1, 2].map((idx) => {
                        const currentVal = phaseCategories[idx] || 'all'
                        return (
                          <div
                            key={idx}
                            className="p-3 bg-paper-card rounded-sketch border border-dashed border-paper-border space-y-1.5"
                          >
                            <div className="flex items-center justify-between text-sm font-sans font-bold text-ink">
                              <span className="flex items-center gap-1.5">
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-pencil-purple/20 text-pencil-purple text-xs font-bold">
                                  {idx + 1}
                                </span>
                                <span>Faz {idx + 1}</span>
                              </span>
                            </div>
                            <CustomSelect
                              value={currentVal}
                              onChange={(val) => {
                                const next = [...phaseCategories]
                                next[idx] = val as FamousPersonCategory
                                setPhaseCategories(next)
                              }}
                              options={CATEGORIES.filter((c) => c.id !== 'all').map((c) => ({
                                value: c.id,
                                label: c.label,
                                icon: <CategoryIcon category={c.id} className="h-4 w-4" />,
                              }))}
                              className="w-full"
                            />
                          </div>
                        )
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Zorluk Seviyesi Seçimi */}
            <div>
              <label className="mb-2 block font-display text-2xl font-bold text-ink flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Gauge className="h-5 w-5 text-pencil-orange" />
                  <span>Zorluk Seviyesi</span>
                </span>
                <span className="text-sm font-sans font-semibold text-ink-faded">
                  {difficulty === 'kolay' ? 'Kolay' : difficulty === 'orta' ? 'Orta' : 'Zor'}
                </span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    id: 'kolay' as const,
                    title: 'Kolay',
                    tier: 'Tier 1-2',
                    desc: 'En popüler ve herkesin bildiği isimler. Rahat ve eğlenceli.',
                    icon: Feather,
                    color: 'var(--pencil-green)',
                    borderClass: 'border-pencil-green',
                    bgClass: 'bg-pencil-green/10',
                    badgeBg: 'bg-pencil-green/20 text-pencil-green',
                  },
                  {
                    id: 'orta' as const,
                    title: 'Orta',
                    tier: 'Tier 1-3',
                    desc: 'Popüler ve bilinen isimler. Standart oyun deneyimi.',
                    icon: Zap,
                    color: 'var(--pencil-yellow)',
                    borderClass: 'border-pencil-yellow',
                    bgClass: 'bg-pencil-yellow/10',
                    badgeBg: 'bg-pencil-yellow/20 text-pencil-yellow',
                  },
                  {
                    id: 'zor' as const,
                    title: 'Zor',
                    tier: 'Tier 1-5',
                    desc: 'Tüm havuz! Niş ve detaylı karakterler dahil.',
                    icon: Flame,
                    color: 'var(--pencil-red)',
                    borderClass: 'border-pencil-red',
                    bgClass: 'bg-pencil-red/10',
                    badgeBg: 'bg-pencil-red/20 text-pencil-red',
                  },
                ].map((item) => {
                  const isSelected = difficulty === item.id
                  const Icon = item.icon
                  return (
                    <motion.button
                      key={item.id}
                      type="button"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98, y: 1 }}
                      onClick={() => setDifficulty(item.id)}
                      className={`relative flex flex-col justify-between text-left p-3.5 transition-colors duration-200 border-2 rounded-sketch-md ${
                        isSelected
                          ? 'border-transparent text-ink shadow-sm font-bold bg-paper-card'
                          : 'border-dashed border-paper-border bg-paper-card text-ink-faded hover:text-ink hover:border-ink-faded'
                      }`}
                    >
                      {/* ÜSTTEN KAYAN ÇERÇEVE */}
                      {isSelected && (
                        <motion.div
                          layoutId="diffModeSelectedHighlight"
                          className={`pointer-events-none absolute -inset-0.5 rounded-sketch-md border-2 ${item.borderClass} ${item.bgClass} shadow-md z-20`}
                          transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                        />
                      )}

                      <div className="relative z-10 space-y-1 w-full">
                        <div className="flex items-center justify-between">
                          <span className="font-display text-xl font-bold text-ink flex items-center gap-1.5">
                            <Icon className="h-4 w-4" style={{ color: item.color }} />
                            <span>{item.title}</span>
                          </span>
                          <span className={`text-xs font-sans font-bold px-2 py-0.5 rounded-full ${item.badgeBg}`}>
                            {item.tier}
                          </span>
                        </div>
                        <span className="block text-xs font-normal text-ink-faded font-sans leading-relaxed">
                          {item.desc}
                        </span>
                      </div>
                    </motion.button>
                  )
                })}
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
                className="btn-pencil-red flex w-full items-center justify-center gap-2 py-4 font-display text-2xl font-bold tracking-wide"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
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
                className="btn-outline flex w-full items-center justify-center gap-2 py-3.5 font-display text-xl font-bold"
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

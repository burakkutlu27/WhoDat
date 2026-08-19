'use client'

import { ArrowLeft, Brain, Check, Feather, Flame, Gauge, Layers, Loader2, MessageSquare, Mic, Pencil, Target, User, Users, Zap } from 'lucide-react'
import { motion } from 'motion/react'
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
                <button
                  type="button"
                  onClick={() => setGameMode('classic')}
                  className={`relative p-3.5 sm:p-4 text-left transition-all duration-200 border-2 rounded-sketch-md flex flex-col justify-between ${
                    gameMode === 'classic'
                      ? 'border-pencil-yellow bg-pencil-yellow/10 shadow-xs font-bold text-ink'
                      : 'border-dashed border-paper-border bg-paper-card text-ink-faded hover:text-ink'
                  }`}
                >
                  <div className="space-y-1.5 pr-6">
                    <span className="font-display text-lg sm:text-xl font-bold text-ink flex items-center gap-1.5">
                      <Target className="h-5 w-5 text-pencil-yellow shrink-0" />
                      <span>Klasik</span>
                    </span>
                    <span className="block text-xs sm:text-sm text-ink-faded font-sans font-normal leading-relaxed">
                      3 Can Hakkı. Yanlış tahmin can götürür, hayatta kalan kazanır!
                    </span>
                  </div>
                  {gameMode === 'classic' && (
                    <span className="absolute top-3 right-3 h-5 w-5 rounded-full bg-pencil-yellow text-white flex items-center justify-center shadow-2xs">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setGameMode('speed')}
                  className={`relative p-3.5 sm:p-4 text-left transition-all duration-200 border-2 rounded-sketch-md flex flex-col justify-between ${
                    gameMode === 'speed'
                      ? 'border-pencil-green bg-pencil-green/10 shadow-xs font-bold text-ink'
                      : 'border-dashed border-paper-border bg-paper-card text-ink-faded hover:text-ink'
                  }`}
                >
                  <div className="space-y-1.5 pr-6">
                    <span className="font-display text-lg sm:text-xl font-bold text-ink flex items-center gap-1.5">
                      <Zap className="h-5 w-5 text-pencil-green shrink-0" />
                      <span>Hız Modu</span>
                    </span>
                    <span className="block text-xs sm:text-sm text-ink-faded font-sans font-normal leading-relaxed">
                      Az Soru, Çok Puan! 3 turda en az soruyla bil, puanları topla!
                    </span>
                  </div>
                  {gameMode === 'speed' && (
                    <span className="absolute top-3 right-3 h-5 w-5 rounded-full bg-pencil-green text-white flex items-center justify-center shadow-2xs">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setGameMode('persistent')}
                  className={`relative p-3.5 sm:p-4 text-left transition-all duration-200 border-2 rounded-sketch-md flex flex-col justify-between ${
                    gameMode === 'persistent'
                      ? 'border-pencil-blue bg-pencil-blue/10 shadow-xs font-bold text-ink'
                      : 'border-dashed border-paper-border bg-paper-card text-ink-faded hover:text-ink'
                  }`}
                >
                  <div className="space-y-1.5 pr-6">
                    <span className="font-display text-lg sm:text-xl font-bold text-ink flex items-center gap-1.5">
                      <Brain className="h-5 w-5 text-pencil-blue shrink-0" />
                      <span>Israrcı</span>
                    </span>
                    <span className="block text-xs sm:text-sm text-ink-faded font-sans font-normal leading-relaxed">
                      10 Soru Bütçesi & 3 Can. Bütçen bitince zorunlu tahmin!
                    </span>
                  </div>
                  {gameMode === 'persistent' && (
                    <span className="absolute top-3 right-3 h-5 w-5 rounded-full bg-pencil-blue text-white flex items-center justify-center shadow-2xs">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setGameMode('shared_target')}
                  className={`relative p-3.5 sm:p-4 text-left transition-all duration-200 border-2 rounded-sketch-md flex flex-col justify-between ${
                    gameMode === 'shared_target'
                      ? 'border-pencil-orange bg-pencil-orange/10 shadow-xs font-bold text-ink'
                      : 'border-dashed border-paper-border bg-paper-card text-ink-faded hover:text-ink'
                  }`}
                >
                  <div className="space-y-1.5 pr-6">
                    <span className="font-display text-lg sm:text-xl font-bold text-ink flex items-center gap-1.5">
                      <Users className="h-5 w-5 text-pencil-orange shrink-0" />
                      <span>Ortak Hedef</span>
                    </span>
                    <span className="block text-xs sm:text-sm text-ink-faded font-sans font-normal leading-relaxed">
                      Tek Gizli Kişi & Hakem! Sırayla soru sor, ilk sen bil!
                    </span>
                  </div>
                  {gameMode === 'shared_target' && (
                    <span className="absolute top-3 right-3 h-5 w-5 rounded-full bg-pencil-orange text-white flex items-center justify-center shadow-2xs">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  )}
                </button>
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
                <button
                  type="button"
                  onClick={() => setCommunicationMode('voice')}
                  className={`relative p-4 text-left transition-all duration-200 border-2 rounded-sketch-md flex items-center justify-between ${
                    communicationMode === 'voice'
                      ? 'border-pencil-yellow bg-pencil-yellow/10 shadow-xs font-bold text-ink'
                      : 'border-dashed border-paper-border bg-paper-card text-ink-faded hover:text-ink'
                  }`}
                >
                  <div className="space-y-1.5 pr-8">
                    <span className="font-display text-xl font-bold flex items-center gap-2 text-ink">
                      <Mic className="h-5 w-5 text-pencil-yellow" />
                      <span>Sesli İletişim (Klasik)</span>
                    </span>
                    <span className="block text-sm text-ink-faded font-sans font-normal leading-relaxed">
                      Sorular ve cevaplar Discord veya sesli ortamda konuşulur.
                    </span>
                  </div>
                  {communicationMode === 'voice' && (
                    <span className="absolute top-4 right-4 h-6 w-6 rounded-full bg-pencil-yellow text-white flex items-center justify-center text-sm shadow-2xs">
                      <Check className="h-4 w-4" />
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setCommunicationMode('text')}
                  className={`relative p-4 text-left transition-all duration-200 border-2 rounded-sketch-md flex items-center justify-between ${
                    communicationMode === 'text'
                      ? 'border-pencil-green bg-pencil-green/10 shadow-xs font-bold text-ink'
                      : 'border-dashed border-paper-border bg-paper-card text-ink-faded hover:text-ink'
                  }`}
                >
                  <div className="space-y-1.5 pr-8">
                    <span className="font-display text-xl font-bold flex items-center gap-2 text-ink">
                      <MessageSquare className="h-5 w-5 text-pencil-green" />
                      <span>Tam Metin / Uzaktan</span>
                    </span>
                    <span className="block text-sm text-ink-faded font-sans font-normal leading-relaxed">
                      Sesli konuşma gerekmez! Hazır soru bankası, 15sn Evet/Hayır oylaması ve not defteri.
                    </span>
                  </div>
                  {communicationMode === 'text' && (
                    <span className="absolute top-4 right-4 h-6 w-6 rounded-full bg-pencil-green text-white flex items-center justify-center text-sm shadow-2xs">
                      <Check className="h-4 w-4" />
                    </span>
                  )}
                </button>
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
                <button
                  type="button"
                  onClick={() => setCategoryMode('single')}
                  className={`relative p-3.5 text-left transition-all duration-200 border-2 rounded-sketch-md flex items-center justify-between ${
                    categoryMode === 'single'
                      ? 'border-pencil-blue bg-pencil-blue/5 shadow-xs font-bold text-ink'
                      : 'border-dashed border-paper-border bg-paper-card text-ink-faded hover:text-ink'
                  }`}
                >
                  <div className="pr-7">
                    <span className="font-display text-xl font-bold flex items-center gap-1.5">
                      <Target className="h-5 w-5 text-pencil-blue" />
                      <span>Tek Kategori</span>
                    </span>
                    <span className="mt-1 block text-sm font-sans text-ink-faded font-normal">
                      Tüm oyun tek kategoriden
                    </span>
                  </div>
                  {categoryMode === 'single' && (
                    <span className="absolute top-3.5 right-3.5 h-6 w-6 rounded-full bg-pencil-blue text-white flex items-center justify-center text-sm shadow-2xs">
                      <Check className="h-4 w-4" />
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setCategoryMode('multi_phase')}
                  className={`relative p-3.5 text-left transition-all duration-200 border-2 rounded-sketch-md flex items-center justify-between ${
                    categoryMode === 'multi_phase'
                      ? 'border-pencil-purple bg-pencil-purple/5 shadow-xs font-bold text-ink'
                      : 'border-dashed border-paper-border bg-paper-card text-ink-faded hover:text-ink'
                  }`}
                >
                  <div className="pr-7">
                    <span className="font-display text-xl font-bold flex items-center gap-1.5">
                      <Layers className="h-5 w-5 text-pencil-purple" />
                      <span>3 Fazlı Karışık</span>
                    </span>
                    <span className="mt-1 block text-sm font-sans text-ink-faded font-normal">
                      3 turda 3 farklı kategori
                    </span>
                  </div>
                  {categoryMode === 'multi_phase' && (
                    <span className="absolute top-3.5 right-3.5 h-6 w-6 rounded-full bg-pencil-purple text-white flex items-center justify-center text-sm shadow-2xs">
                      <Check className="h-4 w-4" />
                    </span>
                  )}
                </button>
              </div>

              {/* Tek Kategori İçin Kategori Çipleri */}
              {categoryMode === 'single' ? (
                <div className="p-4 rounded-sketch-md border border-paper-border bg-paper-card-alt space-y-2.5">
                  <span className="text-sm font-display text-base font-bold text-ink block">
                    Oynanacak Kategoriyi Seçin:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {CATEGORIES.map((cat) => {
                      const isSelected = selectedCategory === cat.id
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`px-3.5 py-2.5 text-sm font-sans font-bold rounded-sketch border transition-all flex items-center gap-2 ${
                            isSelected
                              ? 'bg-pencil-blue/15 text-ink shadow-xs border-pencil-blue'
                              : 'border-paper-border bg-paper-card text-ink-faded hover:text-ink hover:border-ink-faded'
                          }`}
                        >
                          <CategoryIcon category={cat.id} className="h-4 w-4 shrink-0 text-pencil-blue" />
                          <span className="truncate">{cat.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ) : (
                /* 3 Fazlı Mod İçin 3 Aşama Seçimi */
                <div className="p-4 rounded-sketch-md border border-paper-border bg-paper-card-alt space-y-3">
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
                </div>
              )}
            </div>

            {/* Zorluk Seviyesi Seçimi (08a-zorluk-seviyesi-BASIT.md) */}
            <div>
              <label className="mb-2 block font-display text-2xl font-bold text-ink flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Gauge className="h-5 w-5 text-pencil-orange" />
                  <span>Zorluk Seviyesi</span>
                </span>
                <span className="text-sm font-sans font-semibold text-ink-faded">
                  {difficulty === 'kolay' ? 'Kolay (Tier 1-2)' : difficulty === 'orta' ? 'Orta (Tier 1-3)' : 'Zor (Tüm Havuz)'}
                </span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setDifficulty('kolay')}
                  className={`flex flex-col justify-between text-left p-3.5 transition-all duration-200 border-2 rounded-sketch-md ${
                    difficulty === 'kolay'
                      ? 'border-pencil-green bg-pencil-green/10 shadow-xs text-ink'
                      : 'border-dashed border-paper-border bg-paper-card text-ink-faded hover:text-ink'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-xl font-bold text-ink flex items-center gap-1.5">
                        <Feather className="h-4 w-4 text-pencil-green" />
                        <span>Kolay</span>
                      </span>
                      <span className="text-xs font-sans font-bold px-2 py-0.5 rounded-full bg-pencil-green/20 text-pencil-green">
                        Tier 1-2
                      </span>
                    </div>
                    <span className="block text-xs font-normal text-ink-faded font-sans leading-relaxed">
                      En popüler ve herkesin bildiği isimler. Rahat ve eğlenceli.
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDifficulty('orta')}
                  className={`flex flex-col justify-between text-left p-3.5 transition-all duration-200 border-2 rounded-sketch-md ${
                    difficulty === 'orta'
                      ? 'border-pencil-yellow bg-pencil-yellow/10 shadow-xs text-ink'
                      : 'border-dashed border-paper-border bg-paper-card text-ink-faded hover:text-ink'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-xl font-bold text-ink flex items-center gap-1.5">
                        <Zap className="h-4 w-4 text-pencil-yellow" />
                        <span>Orta</span>
                      </span>
                      <span className="text-xs font-sans font-bold px-2 py-0.5 rounded-full bg-pencil-yellow/20 text-pencil-yellow">
                        Tier 1-3
                      </span>
                    </div>
                    <span className="block text-xs font-normal text-ink-faded font-sans leading-relaxed">
                      Popüler ve bilinen isimler. Standart oyun deneyimi.
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setDifficulty('zor')}
                  className={`flex flex-col justify-between text-left p-3.5 transition-all duration-200 border-2 rounded-sketch-md ${
                    difficulty === 'zor'
                      ? 'border-pencil-red bg-pencil-red/10 shadow-xs text-ink'
                      : 'border-dashed border-paper-border bg-paper-card text-ink-faded hover:text-ink'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-display text-xl font-bold text-ink flex items-center gap-1.5">
                        <Flame className="h-4 w-4 text-pencil-red" />
                        <span>Zor</span>
                      </span>
                      <span className="text-xs font-sans font-bold px-2 py-0.5 rounded-full bg-pencil-red/20 text-pencil-red">
                        Tier 1-5
                      </span>
                    </div>
                    <span className="block text-xs font-normal text-ink-faded font-sans leading-relaxed">
                      Tüm havuz! Niş ve detaylı karakterler dahil.
                    </span>
                  </div>
                </button>
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

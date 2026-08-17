'use client'

import { ArrowLeft, Brain, Check, FileText, Layers, Loader2, Pencil, Target, User, Users, Zap } from 'lucide-react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { ApiClientError, apiRequest } from '@/lib/apiClient'
import { CATEGORIES } from '@/lib/game/famousPeopleData'
import type { FamousPersonCategory, GameMode, LobbyCategoryMode } from '@/lib/game/types'

export default function CreateRoomPage() {
  const router = useRouter()
  const [nickname, setNickname] = useState('')
  const [gameMode, setGameMode] = useState<GameMode>('classic')
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
          categoryMode,
          category: selectedCategory,
          phaseCategories: categoryMode === 'multi_phase' ? phaseCategories : undefined,
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
            <div className="mb-3 inline-block rounded-xl border border-paper-border bg-paper-card p-2.5 text-pencil-red shadow-sm">
              <FileText className="h-8 w-8" />
            </div>
            <h1 className="font-display text-4xl font-bold text-ink">
              Yeni Oda Oluştur
            </h1>
            <p className="mt-1 text-sm text-ink-faded">
              Odanı aç, oyun modunu seç ve arkadaşlarını davet et.
            </p>
          </div>

          <div className="divider-sketch mb-6" />

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
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

            {/* Oyun Modu Seçimi */}
            <div>
              <label className="mb-2 block font-display text-xl font-bold text-ink">
                Oyun Modu
              </label>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                <button
                  type="button"
                  onClick={() => setGameMode('classic')}
                  className={`flex flex-col justify-between text-left p-3.5 transition-all duration-200 ${
                    gameMode === 'classic'
                      ? 'sticky-note sticky-note-yellow scale-[1.02] shadow-md border-pencil-yellow ring-2 ring-pencil-yellow'
                      : 'paper-card hover:bg-paper-card-alt opacity-70 hover:opacity-100'
                  }`}
                  style={{ borderRadius: '8px 4px 10px 6px' }}
                >
                  <div>
                    <span className="font-display text-base font-bold text-ink flex items-center justify-between gap-1">
                      <span className="flex items-center gap-1.5">
                        <Target className="h-4 w-4 text-pencil-yellow" />
                        <span>Klasik</span>
                      </span>
                      {gameMode === 'classic' && <span className="text-[10px] bg-pencil-yellow text-white px-1.5 py-0.5 rounded-full font-bold">SEÇİLDİ</span>}
                    </span>
                    <span className="mt-1 block text-xs text-ink-faded leading-relaxed">
                      3 Can Hakkı. Yanlış tahmin can götürür, hayatta kalan kazanır!
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setGameMode('speed')}
                  className={`flex flex-col justify-between text-left p-3.5 transition-all duration-200 ${
                    gameMode === 'speed'
                      ? 'sticky-note sticky-note-green scale-[1.02] shadow-md border-pencil-green ring-2 ring-pencil-green'
                      : 'paper-card hover:bg-paper-card-alt opacity-70 hover:opacity-100'
                  }`}
                  style={{ borderRadius: '6px 10px 4px 8px' }}
                >
                  <div>
                    <span className="font-display text-base font-bold text-ink flex items-center justify-between gap-1">
                      <span className="flex items-center gap-1.5">
                        <Zap className="h-4 w-4 text-pencil-green" />
                        <span>Hız Modu</span>
                      </span>
                      {gameMode === 'speed' && <span className="text-[10px] bg-pencil-green text-white px-1.5 py-0.5 rounded-full font-bold">SEÇİLDİ</span>}
                    </span>
                    <span className="mt-1 block text-xs text-ink-faded leading-relaxed">
                      Az Soru, Çok Puan! 3 turda en az soruyla bil, puanları topla!
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setGameMode('persistent')}
                  className={`flex flex-col justify-between text-left p-3.5 transition-all duration-200 ${
                    gameMode === 'persistent'
                      ? 'sticky-note sticky-note-blue scale-[1.02] shadow-md border-pencil-blue ring-2 ring-pencil-blue'
                      : 'paper-card hover:bg-paper-card-alt opacity-70 hover:opacity-100'
                  }`}
                  style={{ borderRadius: '10px 6px 8px 4px' }}
                >
                  <div>
                    <span className="font-display text-base font-bold text-ink flex items-center justify-between gap-1">
                      <span className="flex items-center gap-1.5">
                        <Brain className="h-4 w-4 text-pencil-blue" />
                        <span>Israrcı</span>
                      </span>
                      {gameMode === 'persistent' && <span className="text-[10px] bg-pencil-blue text-white px-1.5 py-0.5 rounded-full font-bold">SEÇİLDİ</span>}
                    </span>
                    <span className="mt-1 block text-xs text-ink-faded leading-relaxed">
                      10 Soru Bütçesi & 3 Can. Bütçen bitince zorunlu tahmin!
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setGameMode('shared_target')}
                  className={`flex flex-col justify-between text-left p-3.5 transition-all duration-200 ${
                    gameMode === 'shared_target'
                      ? 'sticky-note sticky-note-orange scale-[1.02] shadow-md border-pencil-orange ring-2 ring-pencil-orange'
                      : 'paper-card hover:bg-paper-card-alt opacity-70 hover:opacity-100'
                  }`}
                  style={{ borderRadius: '8px 10px 6px 8px' }}
                >
                  <div>
                    <span className="font-display text-base font-bold text-ink flex items-center justify-between gap-1">
                      <span className="flex items-center gap-1.5">
                        <Users className="h-4 w-4 text-pencil-orange" />
                        <span>Ortak Hedef</span>
                      </span>
                      {gameMode === 'shared_target' && <span className="text-[10px] bg-pencil-orange text-white px-1.5 py-0.5 rounded-full font-bold">SEÇİLDİ</span>}
                    </span>
                    <span className="mt-1 block text-xs text-ink-faded leading-relaxed">
                      Tek Gizli Kişi & Hakem! Sırayla soru sor, ilk sen bil!
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Kategori Seçimi */}
            <div>
              <label className="mb-2 block font-display text-xl font-bold text-ink flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Layers className="h-4 w-4 text-pencil-purple" />
                  <span>Kategori Havuzu</span>
                </span>
                <span className="text-xs font-sans font-normal text-ink-faded">
                  {categoryMode === 'single' ? 'Tek Kategori' : '3 Fazlı Çoklu Kategori'}
                </span>
              </label>

              {/* Kategori Modu Seçimi: Tek vs 3 Fazlı */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setCategoryMode('single')}
                  className={`p-3 text-left transition-all duration-200 border-2 rounded-xl flex items-center justify-between ${
                    categoryMode === 'single'
                      ? 'border-pencil-blue bg-pencil-blue/5 shadow-xs font-bold text-ink'
                      : 'border-dashed border-paper-border bg-paper-card text-ink-faded hover:text-ink'
                  }`}
                >
                  <div>
                    <span className="font-display text-base flex items-center gap-1.5">
                      <Target className="h-4 w-4 text-pencil-blue" />
                      <span>Tek Kategori</span>
                    </span>
                    <span className="mt-0.5 block text-xs text-ink-faded font-normal">
                      Tüm oyun tek kategoriden
                    </span>
                  </div>
                  {categoryMode === 'single' && (
                    <span className="h-5 w-5 rounded-full bg-pencil-blue text-white flex items-center justify-center text-xs shrink-0">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setCategoryMode('multi_phase')}
                  className={`p-3 text-left transition-all duration-200 border-2 rounded-xl flex items-center justify-between ${
                    categoryMode === 'multi_phase'
                      ? 'border-pencil-purple bg-pencil-purple/5 shadow-xs font-bold text-ink'
                      : 'border-dashed border-paper-border bg-paper-card text-ink-faded hover:text-ink'
                  }`}
                >
                  <div>
                    <span className="font-display text-base flex items-center gap-1.5">
                      <Layers className="h-4 w-4 text-pencil-purple" />
                      <span>3 Fazlı Karışık</span>
                    </span>
                    <span className="mt-0.5 block text-xs text-ink-faded font-normal">
                      3 turda 3 farklı kategori
                    </span>
                  </div>
                  {categoryMode === 'multi_phase' && (
                    <span className="h-5 w-5 rounded-full bg-pencil-purple text-white flex items-center justify-center text-xs shrink-0">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                  )}
                </button>
              </div>

              {/* Tek Kategori İçin Kategori Çipleri */}
              {categoryMode === 'single' ? (
                <div className="p-3.5 rounded-xl border border-paper-border bg-paper-card-alt space-y-2">
                  <span className="text-xs font-display font-bold text-ink-faded block">
                    Oynanacak Kategoriyi Seçin:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {CATEGORIES.map((cat) => {
                      const isSelected = selectedCategory === cat.id
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`px-3 py-2 text-xs font-display font-bold rounded-lg border transition-all flex items-center gap-2 ${
                            isSelected
                              ? 'bg-paper-card text-ink shadow-xs border-pencil-blue ring-2 ring-pencil-blue/40'
                              : 'border-paper-border bg-paper-card text-ink-faded hover:text-ink hover:border-ink-faded'
                          }`}
                        >
                          <span className="text-base">{cat.icon}</span>
                          <span className="truncate">{cat.label}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ) : (
                /* 3 Fazlı Mod İçin 3 Aşama Seçimi */
                <div className="p-3.5 rounded-xl border border-paper-border bg-paper-card-alt space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-display font-bold text-ink-faded block">
                      3 Faz İçin Sıralı Kategoriler:
                    </span>
                    <span className="text-[11px] text-pencil-purple font-display font-bold">
                      Fazlar arası can & puan korunur
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    {[0, 1, 2].map((idx) => {
                      const currentVal = phaseCategories[idx] || 'all'
                      return (
                        <div
                          key={idx}
                          className="p-2.5 bg-paper-card rounded-lg border border-dashed border-paper-border space-y-1"
                        >
                          <div className="flex items-center justify-between text-xs font-display font-bold text-ink">
                            <span className="flex items-center gap-1">
                              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-pencil-purple/20 text-pencil-purple text-[10px] font-bold">
                                {idx + 1}
                              </span>
                              <span>Faz {idx + 1}</span>
                            </span>
                          </div>
                          <select
                            value={currentVal}
                            onChange={(e) => {
                              const next = [...phaseCategories]
                              next[idx] = e.target.value as FamousPersonCategory
                              setPhaseCategories(next)
                            }}
                            className="w-full rounded-md border border-paper-border bg-paper-card-alt px-2 py-1.5 text-xs font-display text-ink"
                          >
                            {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                              <option key={c.id} value={c.id}>
                                {c.icon} {c.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
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

'use client'

import { Lightbulb, Loader2, Plus, RefreshCw, Shuffle } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useEffect, useState } from 'react'

import { apiRequest } from '@/lib/apiClient'
import { CATEGORIES } from '@/lib/game/famousPeopleData'
import type { FamousPerson, FamousPersonCategory } from '@/lib/game/types'

interface NameSuggestionsProps {
  onSelectName: (name: string) => void
  onFillAllEmpty?: (names: string[]) => void
  emptySlotsCount?: number
  disabled?: boolean
  selectedNames?: string[]
  categoryFilter?: FamousPersonCategory
}

const ROTATION_CLASSES = [
  'hover:-rotate-1',
  'hover:rotate-1',
  'hover:-rotate-2',
  'hover:rotate-2',
  'hover:-rotate-0.5',
  'hover:rotate-0.5',
]

const COLOR_BORDER_MAP: Record<string, string> = {
  unluler: 'border-pencil-red text-pencil-red bg-pencil-red/5 hover:bg-pencil-red/10',
  tarihi_kisiler: 'border-pencil-blue text-pencil-blue bg-pencil-blue/5 hover:bg-pencil-blue/10',
  cizgi_karakterler: 'border-pencil-purple text-pencil-purple bg-pencil-purple/5 hover:bg-pencil-purple/10',
  sporcular: 'border-pencil-green text-pencil-green bg-pencil-green/5 hover:bg-pencil-green/10',
  dizi_film_karakterleri: 'border-pencil-orange text-pencil-orange bg-pencil-orange/5 hover:bg-pencil-orange/10',
}

export default function NameSuggestions({
  onSelectName,
  onFillAllEmpty,
  emptySlotsCount = 3,
  disabled = false,
  selectedNames = [],
  categoryFilter,
}: NameSuggestionsProps) {
  const isLockedCategory = Boolean(categoryFilter && categoryFilter !== 'all')
  const [selectedCategory, setSelectedCategory] = useState<FamousPersonCategory | null>(null)
  const activeCategory = isLockedCategory ? categoryFilter! : (selectedCategory ?? 'all')
  const [suggestions, setSuggestions] = useState<FamousPerson[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isFillingAll, setIsFillingAll] = useState(false)

  useEffect(() => {
    let ignore = false
    const load = async () => {
      setIsLoading(true)
      try {
        const catParam = activeCategory !== 'all' ? `&category=${activeCategory}` : ''
        const res = await apiRequest<{ data: FamousPerson[] }>(
          `/api/famous-people?random=true&limit=8${catParam}`,
        )
        if (!ignore) {
          setSuggestions(res.data || [])
        }
      } catch {
        // Fallback
      } finally {
        if (!ignore) {
          setIsLoading(false)
        }
      }
    }

    void load()

    return () => {
      ignore = true
    }
  }, [activeCategory])

  const handleRefresh = async () => {
    setIsLoading(true)
    try {
      const catParam = activeCategory !== 'all' ? `&category=${activeCategory}` : ''
      const res = await apiRequest<{ data: FamousPerson[] }>(
        `/api/famous-people?random=true&limit=8${catParam}`,
      )
      setSuggestions(res.data || [])
    } catch {
      // Fallback
    } finally {
      setIsLoading(false)
    }
  }

  const handleCardClick = (person: FamousPerson) => {
    if (disabled) return
    onSelectName(person.name)
    setSuggestions((prev) => prev.filter((p) => p.name !== person.name))
  }

  const handleFillAll = async () => {
    if (!onFillAllEmpty || disabled || emptySlotsCount <= 0) return
    setIsFillingAll(true)
    try {
      const catParam = activeCategory !== 'all' ? `&category=${activeCategory}` : ''
      const res = await apiRequest<{ data: FamousPerson[] }>(
        `/api/famous-people?random=true&limit=${Math.max(emptySlotsCount + 4, 10)}${catParam}`,
      )
      const freshNames = (res.data || [])
        .map((p) => p.name)
        .filter((name) => !selectedNames.includes(name))
        .slice(0, emptySlotsCount)

      onFillAllEmpty(freshNames)
    } catch {
      // Fallback
    } finally {
      setIsFillingAll(false)
    }
  }

  return (
    <div className="mt-4 rounded-xl border-2 border-dashed border-paper-border bg-paper-card-alt p-4 sm:p-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-pencil-yellow" />
          <h3 className="font-display text-2xl font-bold text-ink">
            Fikir mi lazım?
          </h3>
          <span className="text-sm text-ink-faded font-sans hidden sm:inline">
            (Tıkla, kutuna eklensin)
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            disabled={isLoading || disabled}
            onClick={() => void handleRefresh()}
            className="btn-outline flex items-center gap-1.5 px-3 py-1.5 text-sm font-sans font-bold text-ink hover:text-pencil-red transition-all"
            title="Yeni öneriler getir"
          >
            <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span>Yenile</span>
          </button>

          {onFillAllEmpty && emptySlotsCount > 0 && (
            <button
              type="button"
              disabled={isFillingAll || disabled}
              onClick={() => void handleFillAll()}
              className="btn-pencil-yellow flex items-center gap-1.5 px-3.5 py-1.5 text-sm font-sans font-bold transition-all shadow-xs"
              title="Kalan boş kutuları rastgele isimlerle doldur"
            >
              {isFillingAll ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Shuffle className="h-4 w-4" />
              )}
              <span>Rastgele Doldur</span>
            </button>
          )}
        </div>
      </div>

      {/* Category Filter Chips / Locked Badge */}
      {isLockedCategory ? (
        <div className="flex items-center gap-2 mb-3">
          <span className="tag border-pencil-purple text-pencil-purple font-bold text-sm flex items-center gap-1">
            <span>{CATEGORIES.find((c) => c.id === categoryFilter)?.icon}</span>
            <span>{CATEGORIES.find((c) => c.id === categoryFilter)?.label || categoryFilter} Kategorisi</span>
          </span>
          <span className="text-xs text-ink-faded font-sans">
            (Lobi kategorisinden öneriler listeleniyor)
          </span>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 mb-3.5">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id
            return (
              <button
                key={cat.id}
                type="button"
                disabled={disabled}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-sans font-bold rounded-lg transition-all ${
                  isActive
                    ? 'bg-ink text-paper-card shadow-xs ring-1 ring-ink'
                    : 'border border-paper-border bg-paper-card text-ink-faded hover:text-ink hover:border-ink-faded'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            )
          })}
        </div>
      )}

      {/* Suggestions Grid */}
      <div className="min-h-[64px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-6 text-sm text-ink-faded font-sans gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-pencil-yellow" />
            <span>Öneriler aranıyor...</span>
          </div>
        ) : suggestions.length === 0 ? (
          <div className="py-4 text-center text-sm text-ink-faded font-sans">
            Bu kategoride öneri bulunamadı.
          </div>
        ) : (
          <motion.div layout className="flex flex-wrap gap-2">
            <AnimatePresence>
              {suggestions.map((person, idx) => {
                const isAlreadySelected = selectedNames.includes(person.name)
                const colorClasses =
                  COLOR_BORDER_MAP[person.category] ||
                  'border-paper-border text-ink bg-paper-card'
                const rotClass = ROTATION_CLASSES[idx % ROTATION_CLASSES.length]

                return (
                  <motion.button
                    key={person.name}
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="button"
                    disabled={disabled || isAlreadySelected}
                    onClick={() => handleCardClick(person)}
                    className={`group relative flex items-center gap-1.5 rounded-lg border-2 border-dashed px-3.5 py-2 font-display text-base font-bold transition-all shadow-2xs ${rotClass} ${
                      isAlreadySelected
                        ? 'opacity-40 line-through border-paper-border text-ink-faded cursor-not-allowed bg-paper-card'
                        : `${colorClasses} cursor-pointer`
                    }`}
                    style={{ borderRadius: '8px 10px 6px 12px' }}
                  >
                    <span>+ {person.name}</span>
                    <Plus className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                  </motion.button>
                )
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  )
}

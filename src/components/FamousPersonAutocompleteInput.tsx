'use client'

import { Lightbulb, Loader2, Plus, Search } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

import { apiRequest } from '@/lib/apiClient'
import { CategoryIcon } from '@/components/CategoryIcon'
import { CATEGORIES } from '@/lib/game/famousPeopleData'
import type { DifficultyLevel, FamousPerson, FamousPersonCategory } from '@/lib/game/types'

import SuggestNameModal from './SuggestNameModal'

interface AutocompleteInputProps {
  id?: string
  'data-testid'?: string
  value: string
  onChange: (val: string) => void
  onSelect?: (person: FamousPerson) => void
  placeholder?: string
  disabled?: boolean
  maxLength?: number
  categoryFilter?: FamousPersonCategory
  difficultyFilter?: DifficultyLevel
  className?: string
  autoFocus?: boolean
}

export function FamousPersonAutocompleteInput({
  id,
  'data-testid': testId,
  value,
  onChange,
  onSelect,
  placeholder = 'İsim yazmaya başlayın...',
  disabled = false,
  maxLength = 60,
  categoryFilter = 'all',
  difficultyFilter,
  className = '',
  autoFocus = false,
}: AutocompleteInputProps) {
  const [results, setResults] = useState<FamousPerson[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const [isSuggestModalOpen, setIsSuggestModalOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const isUserTypingRef = useRef(false)

  // Click outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        isUserTypingRef.current = false
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Debounced search when value changes - ONLY opens dropdown if the user actively typed
  useEffect(() => {
    const trimmed = value.trim()
    if (trimmed.length < 2 || !isUserTypingRef.current) {
      if (!isUserTypingRef.current) {
        setIsOpen(false)
      }
      return
    }

    let isMounted = true
    const timer = setTimeout(async () => {
      setIsLoading(true)
      try {
        const catParam = categoryFilter !== 'all' ? `&category=${categoryFilter}` : ''
        const diffParam = difficultyFilter ? `&difficulty=${difficultyFilter}` : ''
        const res = await apiRequest<{ data: FamousPerson[] }>(
          `/api/famous-people?q=${encodeURIComponent(trimmed)}${catParam}${diffParam}&limit=6`,
        )
        if (isMounted) {
          setResults(res.data || [])
          if (isUserTypingRef.current) {
            setIsOpen(true)
          }
          setHighlightedIndex(-1)
        }
      } catch {
        if (isMounted) {
          setResults([])
          if (isUserTypingRef.current) {
            setIsOpen(true)
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }, 250)

    return () => {
      isMounted = false
      clearTimeout(timer)
    }
  }, [value, categoryFilter, difficultyFilter])

  const handleSelect = (person: FamousPerson) => {
    isUserTypingRef.current = false
    onChange(person.name)
    onSelect?.(person)
    setIsOpen(false)
    setResults([])
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || results.length === 0) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1))
    } else if (e.key === 'Enter' && highlightedIndex >= 0 && results[highlightedIndex]) {
      e.preventDefault()
      handleSelect(results[highlightedIndex]!)
    } else if (e.key === 'Escape') {
      isUserTypingRef.current = false
      setIsOpen(false)
    }
  }

  const trimmedVal = value.trim()
  const showNoResults = isOpen && !isLoading && trimmedVal.length >= 2 && results.length === 0

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <input
          id={id}
          data-testid={testId || id}
          type="text"
          value={value}
          maxLength={maxLength}
          disabled={disabled}
          autoFocus={autoFocus}
          placeholder={placeholder}
          onChange={(e) => {
            isUserTypingRef.current = true
            onChange(e.target.value)
            if (e.target.value.trim().length < 2) {
              setIsOpen(false)
              setResults([])
            }
          }}
          onFocus={() => {
            // Kullanıcı daha önce bizzat yazdıysa ve sonuçlar varsa aç
            if (isUserTypingRef.current && value.trim().length >= 2) {
              setIsOpen(true)
            }
          }}
          onBlur={(e) => {
            // Eğer tıklanan yer dropdown içi değilse kapat
            if (containerRef.current && !containerRef.current.contains(e.relatedTarget as Node)) {
              isUserTypingRef.current = false
              setIsOpen(false)
            }
          }}
          onKeyDown={handleKeyDown}
          className={`paper-input font-display text-2xl w-full pr-10 ${className}`}
        />
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-extra-faded">
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin text-pencil-yellow" />
          ) : (
            <Search className="h-5 w-5 opacity-40" />
          )}
        </div>
      </div>

      {/* Dropdown Suggestions & Name Suggestion Action */}
      <AnimatePresence>
        {isOpen && trimmedVal.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: -5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 z-50 mt-1 max-h-72 overflow-auto rounded-sketch-md border-2 border-paper-border bg-paper-card py-1.5 shadow-xl"
          >
            {results.length > 0 ? (
              <>
                <ul className="divide-y divide-dashed divide-paper-border/60">
                  {results.map((person, index) => {
                    const catInfo = CATEGORIES.find((c) => c.id === person.category)
                    const isSelected = index === highlightedIndex
                    return (
                      <li
                        key={person.id || person.name}
                        onClick={() => handleSelect(person)}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        className={`flex cursor-pointer items-center justify-between px-3.5 py-2.5 transition-colors ${
                          isSelected
                            ? 'bg-paper-card-alt text-pencil-red font-bold'
                            : 'text-ink hover:bg-paper-card-alt'
                        }`}
                      >
                        <span className="font-display text-xl font-bold">{person.name}</span>
                        {catInfo && (
                          <span
                            className="inline-flex items-center gap-1.5 rounded-sketch-sm border border-dashed border-paper-border bg-paper-card px-2.5 py-1 font-sans text-xs font-semibold text-ink-faded"
                          >
                            <CategoryIcon category={catInfo.id} className="h-3.5 w-3.5" />
                            <span>{catInfo.label}</span>
                          </span>
                        )}
                      </li>
                    )
                  })}
                </ul>

                {/* Listenin Altında İsim Öner Seçeneği */}
                <div className="border-t-2 border-dashed border-paper-border mt-1 p-2 bg-paper-card-alt/50">
                  <button
                    type="button"
                    onClick={() => {
                      setIsOpen(false)
                      setIsSuggestModalOpen(true)
                    }}
                    className="flex w-full items-center justify-between gap-2 px-3 py-2 text-xs font-display font-bold text-ink-faded hover:text-pencil-yellow transition-colors rounded-sketch hover:bg-paper-card"
                  >
                    <span className="flex items-center gap-1.5">
                      <Lightbulb className="h-4 w-4 text-pencil-yellow" />
                      <span>Aradığın ismi bulamadın mı?</span>
                    </span>
                    <span className="underline-sketch text-pencil-yellow font-bold flex items-center gap-1">
                      <Plus className="h-3.5 w-3.5" />
                      <span>Havuza Yeni İsim Öner</span>
                    </span>
                  </button>
                </div>
              </>
            ) : showNoResults ? (
              /* Arama Sonucu Yokken Çıkan Özel Öneri Kartı */
              <div className="p-4 text-center space-y-3">
                <div className="text-sm font-sans text-ink-faded">
                  Veritabanımızda <strong>&ldquo;{trimmedVal}&rdquo;</strong> ile eşleşen isim bulunamadı.
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false)
                    setIsSuggestModalOpen(true)
                  }}
                  className="btn-pencil-yellow inline-flex items-center gap-2 px-4 py-2 text-sm font-display font-bold shadow-sm"
                >
                  <Lightbulb className="h-4 w-4" />
                  <span>&ldquo;{trimmedVal}&rdquo; İsmini Havuza Öner!</span>
                </button>
              </div>
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>

      {/* İsim Öneri Modalı */}
      <SuggestNameModal
        isOpen={isSuggestModalOpen}
        onClose={() => setIsSuggestModalOpen(false)}
        initialName={trimmedVal}
        initialCategory={categoryFilter}
        onSuccess={(suggestedName) => {
          onChange(suggestedName)
          setIsOpen(false)
          setResults([])
        }}
      />
    </div>
  )
}

export default FamousPersonAutocompleteInput

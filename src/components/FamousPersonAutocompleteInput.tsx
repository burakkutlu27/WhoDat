'use client'

import { Loader2, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

import { apiRequest } from '@/lib/apiClient'
import { CATEGORIES } from '@/lib/game/famousPeopleData'
import type { FamousPerson, FamousPersonCategory } from '@/lib/game/types'

interface AutocompleteInputProps {
  id?: string
  value: string
  onChange: (val: string) => void
  onSelect?: (person: FamousPerson) => void
  placeholder?: string
  disabled?: boolean
  maxLength?: number
  categoryFilter?: FamousPersonCategory
  className?: string
  autoFocus?: boolean
}

export default function FamousPersonAutocompleteInput({
  id,
  value,
  onChange,
  onSelect,
  placeholder = 'İsim yazmaya başlayın...',
  disabled = false,
  maxLength = 60,
  categoryFilter = 'all',
  className = '',
  autoFocus = false,
}: AutocompleteInputProps) {
  const [results, setResults] = useState<FamousPerson[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const containerRef = useRef<HTMLDivElement>(null)

  // Click outside listener to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Debounced search when value changes
  useEffect(() => {
    const trimmed = value.trim()
    if (trimmed.length < 2) {
      return
    }

    let isMounted = true
    const timer = setTimeout(async () => {
      setIsLoading(true)
      try {
        const catParam = categoryFilter !== 'all' ? `&category=${categoryFilter}` : ''
        const res = await apiRequest<{ data: FamousPerson[] }>(
          `/api/famous-people?q=${encodeURIComponent(trimmed)}${catParam}&limit=6`,
        )
        if (isMounted) {
          setResults(res.data || [])
          setIsOpen((res.data || []).length > 0)
          setHighlightedIndex(-1)
        }
      } catch {
        if (isMounted) {
          setResults([])
          setIsOpen(false)
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
  }, [value, categoryFilter])

  const handleSelect = (person: FamousPerson) => {
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
      setIsOpen(false)
    }
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <div className="relative">
        <input
          id={id}
          type="text"
          value={value}
          maxLength={maxLength}
          disabled={disabled}
          autoFocus={autoFocus}
          placeholder={placeholder}
          onChange={(e) => {
            onChange(e.target.value)
            if (e.target.value.trim().length < 2) {
              setIsOpen(false)
              setResults([])
            }
          }}
          onFocus={() => {
            if (results.length > 0 && value.trim().length >= 2) {
              setIsOpen(true)
            }
          }}
          onKeyDown={handleKeyDown}
          className={`paper-input font-display text-xl w-full pr-10 ${className}`}
        />
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-extra-faded">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin text-pencil-yellow" />
          ) : (
            <Search className="h-4 w-4 opacity-40" />
          )}
        </div>
      </div>

      {/* Dropdown Suggestions */}
      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -5, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -5, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-xl border-2 border-paper-border bg-paper-card py-1.5 shadow-lg"
            style={{ borderRadius: '10px 6px 12px 8px' }}
          >
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
                  <span className="font-display text-lg">{person.name}</span>
                  {catInfo && (
                    <span
                      className="inline-flex items-center gap-1 rounded-md border border-dashed border-paper-border bg-paper-card px-2 py-0.5 font-sans text-xs text-ink-faded"
                      style={{ borderRadius: '6px 4px 6px 4px' }}
                    >
                      <span>{catInfo.icon}</span>
                      <span>{catInfo.label}</span>
                    </span>
                  )}
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

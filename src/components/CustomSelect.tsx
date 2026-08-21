'use client'

import { Check, ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import React, { useEffect, useRef, useState } from 'react'

export interface SelectOption {
  value: string
  label: string
  icon?: string | React.ReactNode
}

interface CustomSelectProps {
  value: string
  onChange: (value: string) => void
  options: SelectOption[]
  placeholder?: string
  className?: string
  disabled?: boolean
  size?: 'sm' | 'md'
  id?: string
  ariaLabel?: string
  align?: 'left' | 'right'
}

export function CustomSelect({
  value,
  onChange,
  options,
  placeholder = 'Seçiniz...',
  className = '',
  disabled = false,
  size = 'md',
  id,
  ariaLabel,
  align = 'left',
}: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedOption = options.find((opt) => opt.value === value)

  // Click outside listener
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (disabled) return

    if (event.key === 'Escape') {
      setIsOpen(false)
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setIsOpen(!isOpen)
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (!isOpen) {
        setIsOpen(true)
        return
      }
      if (options.length === 0) return
      const currentIndex = options.findIndex((opt) => opt.value === value)
      const nextIndex = (currentIndex + 1) % options.length
      const nextOpt = options[nextIndex]
      if (nextOpt) onChange(nextOpt.value)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (!isOpen) {
        setIsOpen(true)
        return
      }
      if (options.length === 0) return
      const currentIndex = options.findIndex((opt) => opt.value === value)
      const prevIndex = (currentIndex - 1 + options.length) % options.length
      const prevOpt = options[prevIndex]
      if (prevOpt) onChange(prevOpt.value)
    }
  }

  const isSmall = size === 'sm'

  return (
    <div
      ref={containerRef}
      className={`relative inline-block text-left ${className}`}
      onKeyDown={handleKeyDown}
    >
      {/* Trigger Button */}
      <button
        id={id}
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={ariaLabel}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between gap-2 border-2 transition-all bg-paper-card text-ink ${
          isSmall
            ? 'px-2.5 py-1.5 text-xs font-sans font-bold rounded-sketch-sm'
            : 'px-3.5 py-2 text-sm font-sans font-bold rounded-sketch'
        } ${
          isOpen
            ? 'border-pencil-purple shadow-sm'
            : 'border-paper-border hover:border-pencil-purple/60 hover:bg-paper-card-alt'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      >
        <span className="flex items-center gap-2 truncate">
          {selectedOption?.icon && (
            <span className="shrink-0 flex items-center text-ink-faded">{selectedOption.icon}</span>
          )}
          <span className="truncate">{selectedOption?.label || placeholder}</span>
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.15 }}
          className="shrink-0 text-ink-faded"
        >
          <ChevronDown className={isSmall ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
        </motion.div>
      </button>

      {/* Dropdown Menu Popover */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            role="listbox"
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.12 }}
            className={`absolute ${
              align === 'right' ? 'right-0' : 'left-0'
            } z-50 mt-1.5 min-w-[200px] max-h-60 overflow-y-auto rounded-sketch-md border-2 border-paper-border bg-paper-card p-1 shadow-xl backdrop-blur-md`}
          >
            {options.map((option) => {
              const isSelected = option.value === value
              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(option.value)
                    setIsOpen(false)
                  }}
                  className={`flex cursor-pointer items-center justify-between gap-2 rounded-sketch-sm px-3 py-2 text-sm font-sans transition-colors ${
                    isSelected
                      ? 'bg-pencil-purple/15 text-pencil-purple font-bold'
                      : 'text-ink hover:bg-paper-card-alt hover:font-semibold'
                  }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    {option.icon && <span className="shrink-0 flex items-center text-ink-faded">{option.icon}</span>}
                    <span className="truncate">{option.label}</span>
                  </span>
                  {isSelected && <Check className="h-4 w-4 text-pencil-purple shrink-0" />}
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}

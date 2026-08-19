'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useState } from 'react'

interface InkStampProps {
  children: React.ReactNode
  color?: 'green' | 'red' | 'yellow' | 'blue' | 'orange' | 'purple' | 'ink'
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  disabled?: boolean
  className?: string
  type?: 'button' | 'submit' | 'reset'
  'aria-label'?: string
}

const COLOR_MAP = {
  green: {
    bg: 'var(--pencil-green)',
    splatter: 'rgba(43, 122, 120, 0.18)',
    border: 'var(--pencil-green)',
  },
  red: {
    bg: 'var(--pencil-red)',
    splatter: 'rgba(217, 79, 61, 0.18)',
    border: 'var(--pencil-red)',
  },
  yellow: {
    bg: 'var(--pencil-yellow)',
    splatter: 'rgba(232, 168, 56, 0.22)',
    border: 'var(--pencil-yellow)',
  },
  blue: {
    bg: 'var(--pencil-blue)',
    splatter: 'rgba(59, 107, 154, 0.18)',
    border: 'var(--pencil-blue)',
  },
  orange: {
    bg: 'var(--pencil-orange)',
    splatter: 'rgba(217, 123, 61, 0.18)',
    border: 'var(--pencil-orange)',
  },
  purple: {
    bg: 'var(--pencil-purple)',
    splatter: 'rgba(123, 94, 167, 0.18)',
    border: 'var(--pencil-purple)',
  },
  ink: {
    bg: 'var(--ink)',
    splatter: 'rgba(45, 42, 38, 0.15)',
    border: 'var(--ink)',
  },
}

/**
 * InkStamp — Damga Thud ve Mürekkep Dokusu Efektli Buton.
 * Evet/Hayır oylamalarında ve mühür basma hissi gereken aksiyonlarda kullanılır.
 */
export function InkStamp({
  children,
  color = 'green',
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  'aria-label': ariaLabel,
}: InkStampProps) {
  const [isPressed, setIsPressed] = useState(false)
  const [stampKey, setStampKey] = useState(0)
  const shouldReduceMotion = useReducedMotion()

  const activeColor = COLOR_MAP[color]

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return
    setIsPressed(true)
    setStampKey((prev) => prev + 1)
    setTimeout(() => setIsPressed(false), 600)
    onClick?.(e)
  }

  return (
    <div className="relative inline-block w-full">
      <motion.button
        type={type}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={handleClick}
        whileHover={!disabled && !shouldReduceMotion ? { scale: 1.02, rotate: -0.5 } : undefined}
        whileTap={
          !disabled && !shouldReduceMotion
            ? {
                scale: 0.94,
                rotate: 1,
                transition: { duration: 0.08 },
              }
            : undefined
        }
        className={`relative overflow-hidden ${className}`}
      >
        {children}

        {/* Damga Mürekkep Dokusu Patlaması */}
        <AnimatePresence>
          {isPressed && !shouldReduceMotion && (
            <motion.div
              key={stampKey}
              initial={{ scale: 0.5, opacity: 0.85, rotate: -5 }}
              animate={{ scale: 1.25, opacity: 0, rotate: 5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: 'easeOut' }}
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <svg
                viewBox="0 0 100 100"
                className="h-full w-full opacity-60"
                fill={activeColor.splatter}
              >
                {/* Organik Mürekkep Lekesi & Damla Şekli */}
                <path d="M50 15 C65 12, 85 28, 82 50 C79 72, 68 85, 50 82 C32 79, 15 68, 18 50 C21 32, 35 18, 50 15 Z" />
                <circle cx="25" cy="25" r="4" />
                <circle cx="78" cy="72" r="3" />
                <circle cx="82" cy="30" r="2.5" />
                <circle cx="20" cy="70" r="3.5" />
              </svg>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}

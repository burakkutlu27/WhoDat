'use client'

import { motion, useReducedMotion } from 'motion/react'

interface HandDrawnBorderProps {
  children?: React.ReactNode
  color?: string
  strokeWidth?: number
  className?: string
}

/**
 * HandDrawnBorder — Kalemle çiziliyormuş hissi veren el çizimi tam çerçeve.
 * Sırası gelen oyuncu kartı ve aktif öğelerde kullanılır.
 * SVG çerçeve, parent'ın boyutlarına göre stretch eder.
 */
export function HandDrawnBorder({
  children,
  color = 'var(--pencil-yellow)',
  strokeWidth = 2.5,
  className = '',
}: HandDrawnBorderProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className={`relative inline-block ${className}`}>
      {/* SVG Çerçeve — parent'ı çevreleyen absolute overlay */}
      <svg
        className="pointer-events-none absolute -inset-2 overflow-visible"
        style={{ width: 'calc(100% + 16px)', height: 'calc(100% + 16px)' }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Ana El Çizimi Dikdörtgen Çerçeve — piksel koordinatlarıyla çizer */}
        <motion.rect
          x="4"
          y="4"
          rx="6"
          ry="4"
          width="calc(100% - 8px)"
          height="calc(100% - 8px)"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={shouldReduceMotion ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        />
        {/* İkinci hafif asimetrik çizgi (katmanlı el çizimi hissi) */}
        {!shouldReduceMotion && (
          <motion.rect
            x="6"
            y="6"
            rx="4"
            ry="6"
            width="calc(100% - 12px)"
            height="calc(100% - 12px)"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth * 0.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={0.35}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.35 }}
            transition={{ duration: 0.6, delay: 0.08, ease: 'easeOut' }}
          />
        )}
      </svg>

      <div className="relative z-10">{children}</div>
    </div>
  )
}

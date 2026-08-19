'use client'

import { motion, useReducedMotion } from 'motion/react'

interface CheckmarkDrawProps {
  size?: number
  strokeWidth?: number
  color?: string
  className?: string
}

/**
 * CheckmarkDraw — Yeşil kalemle elle çiziliyormuş gibi beliren onay işareti (✓).
 * Doğru tahminlerde ve onay anlarında kullanılır.
 */
export function CheckmarkDraw({
  size = 48,
  strokeWidth = 4,
  color = 'var(--pencil-green)',
  className = '',
}: CheckmarkDrawProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { scale: 0.8, opacity: 0 }}
      animate={
        shouldReduceMotion
          ? { opacity: 1, scale: 1 }
          : {
              scale: [0.8, 1.08, 1],
              opacity: 1,
            }
      }
      transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
      className={`inline-flex items-center justify-center ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="overflow-visible"
      >
        {/* Çizilen Ana Onay Çizgisi */}
        <motion.path
          d="M10 25 L20 35 L38 13"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        />
        {/* İkinci hafif kalem gölgesi (organik el çizimi dokusu) */}
        {!shouldReduceMotion && (
          <motion.path
            d="M11 26 L20 35.5 L37 14"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth * 0.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity={0.4}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.4, delay: 0.08, ease: 'easeOut' }}
          />
        )}
      </svg>
    </motion.div>
  )
}

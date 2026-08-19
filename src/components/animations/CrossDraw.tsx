'use client'

import { motion, useReducedMotion } from 'motion/react'

interface CrossDrawProps {
  size?: number
  strokeWidth?: number
  color?: string
  className?: string
}

/**
 * CrossDraw — Kırmızı kalemle elle çizilen çarpı işareti (✗).
 * Yanlış tahminlerde ve uyarı anlarında kağıt sallantısı ile birlikte kullanılır.
 */
export function CrossDraw({
  size = 48,
  strokeWidth = 4,
  color = 'var(--pencil-red)',
  className = '',
}: CrossDrawProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { scale: 0.85, opacity: 0, rotate: 0 }}
      animate={
        shouldReduceMotion
          ? { opacity: 1, scale: 1 }
          : {
              scale: 1,
              opacity: 1,
              rotate: [0, -3, 3, -2, 2, 0],
            }
      }
      transition={{ duration: 0.45, ease: 'easeOut' }}
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
        {/* Birinci Çapraz Çizgi */}
        <motion.path
          d="M12 12 L36 36"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
        />
        {/* İkinci Çapraz Çizgi (Hafif gecikmeli) */}
        <motion.path
          d="M36 12 L12 36"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.22, delay: 0.12, ease: 'easeOut' }}
        />
        {/* Kalemle hızlı çizilmiş hissi veren hafif sapma çizgisi */}
        {!shouldReduceMotion && (
          <motion.path
            d="M13 13 L35 35"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth * 0.4}
            strokeLinecap="round"
            strokeOpacity={0.4}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.2, delay: 0.05, ease: 'easeOut' }}
          />
        )}
      </svg>
    </motion.div>
  )
}

'use client'

import { motion, useReducedMotion } from 'motion/react'

interface WinnerWreathProps {
  children?: React.ReactNode
  size?: number
  color?: string
  className?: string
}

/**
 * WinnerWreath — Şampiyon ekranı için kalemle çizilen zafer çelengi.
 * Kazananın kupasının veya isminin etrafına çizilen el çizimi defne yaprakları.
 */
export function WinnerWreath({
  children,
  size = 140,
  color = 'var(--pencil-yellow)',
  className = '',
}: WinnerWreathProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      {/* SVG Zafer Çelengi (Sol ve Sağ Dal) */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 160 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute inset-0 overflow-visible"
      >
        {/* Sol Dal Yay */}
        <motion.path
          d="M 80,145 C 40,140 20,105 20,75 C 20,45 42,22 75,18"
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />

        {/* Sol Dal Yaprakları */}
        {[
          'M 26,120 C 18,116 16,108 24,106 C 28,106 30,114 26,120 Z',
          'M 20,90 C 10,88 10,78 18,78 C 22,78 24,86 20,90 Z',
          'M 24,60 C 16,54 20,44 28,48 C 32,50 30,58 24,60 Z',
          'M 42,34 C 36,26 44,18 50,24 C 52,28 48,34 42,34 Z',
          'M 68,20 C 64,12 74,8 78,16 C 78,20 74,22 68,20 Z',
        ].map((d, i) => (
          <motion.path
            key={`left-leaf-${i}`}
            d={d}
            fill={color}
            stroke={color}
            strokeWidth="1"
            opacity="0.8"
            initial={shouldReduceMotion ? { scale: 1, opacity: 0.8 } : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ duration: 0.3, delay: 0.2 + i * 0.08, ease: 'backOut' }}
          />
        ))}

        {/* Sağ Dal Yay */}
        <motion.path
          d="M 80,145 C 120,140 140,105 140,75 C 140,45 118,22 85,18"
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />

        {/* Sağ Dal Yaprakları */}
        {[
          'M 134,120 C 142,116 144,108 136,106 C 132,106 130,114 134,120 Z',
          'M 140,90 C 150,88 150,78 142,78 C 138,78 136,86 140,90 Z',
          'M 136,60 C 144,54 140,44 132,48 C 128,50 130,58 136,60 Z',
          'M 118,34 C 124,26 116,18 110,24 C 108,28 112,34 118,34 Z',
          'M 92,20 C 96,12 86,8 82,16 C 82,20 86,22 92,20 Z',
        ].map((d, i) => (
          <motion.path
            key={`right-leaf-${i}`}
            d={d}
            fill={color}
            stroke={color}
            strokeWidth="1"
            opacity="0.8"
            initial={shouldReduceMotion ? { scale: 1, opacity: 0.8 } : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.8 }}
            transition={{ duration: 0.3, delay: 0.2 + i * 0.08, ease: 'backOut' }}
          />
        ))}

        {/* Alt Kurdele Düğümü */}
        <motion.path
          d="M 74,142 Q 80,148 86,142 Q 80,154 74,142 Z"
          fill="var(--pencil-red)"
          stroke="var(--pencil-red)"
          strokeWidth="1.5"
          initial={shouldReduceMotion ? { opacity: 1 } : { scale: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.6, ease: 'backOut' }}
        />
      </svg>

      <div className="relative z-10">{children}</div>
    </div>
  )
}

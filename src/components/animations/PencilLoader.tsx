'use client'

import { motion, useReducedMotion } from 'motion/react'

interface PencilLoaderProps {
  size?: number
  color?: string
  text?: string
  className?: string
}

/**
 * PencilLoader — Jenerik spinner yerine el çizimi doodle karalama döngüsü.
 * "Biri düşünüyor / kağıda bir şey karalıyor" hissi verir.
 */
export function PencilLoader({
  size = 32,
  color = 'var(--pencil-yellow)',
  text,
  className = '',
}: PencilLoaderProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div
        className="relative inline-flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          {/* Sürekli Çizilip Silinen El Çizimi Spiral / Döngü */}
          <motion.path
            d="M 20,20 m -14,0 a 14,14 0 1,0 28,0 a 14,14 0 1,0 -28,0 M 14,20 C 14,14 26,14 26,20 C 26,26 14,26 14,20"
            fill="none"
            stroke={color}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={shouldReduceMotion ? { opacity: 0.8 } : { pathLength: 0, rotate: 0 }}
            animate={
              shouldReduceMotion
                ? { opacity: [0.5, 1, 0.5] }
                : {
                    pathLength: [0, 1, 0],
                    rotate: [0, 360],
                    strokeDashoffset: [0, -20, -40],
                  }
            }
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Kalem Ucu Mikro Noktası */}
          {!shouldReduceMotion && (
            <motion.circle
              cx="20"
              cy="6"
              r="2"
              fill="var(--pencil-red)"
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              style={{ transformOrigin: '20px 20px' }}
            />
          )}
        </svg>
      </div>

      {text && (
        <span className="font-display text-base font-bold text-ink-faded">
          {text}
        </span>
      )}
    </div>
  )
}

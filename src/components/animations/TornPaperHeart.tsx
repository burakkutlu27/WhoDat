'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'

interface TornPaperHeartProps {
  isFilled: boolean
  size?: number
  className?: string
}

/**
 * TornPaperHeart — Can kaybedildiğinde kağıt gibi yırtılıp düşen kalp animasyonu.
 * Kalp kaybedildiğinde hafif rotasyonla aşağı düşüp söner ve yerinde soluk bir çizim izi bırakır.
 */
export function TornPaperHeart({
  isFilled,
  size = 22,
  className = '',
}: TornPaperHeartProps) {
  const prevFilledRef = useRef(isFilled)
  const [justLost, setJustLost] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (prevFilledRef.current && !isFilled) {
      setJustLost(true)
      const timer = setTimeout(() => setJustLost(false), 750)
      prevFilledRef.current = isFilled
      return () => clearTimeout(timer)
    }
    prevFilledRef.current = isFilled
  }, [isFilled])

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Sabit Arka Plan: Boş / Soluk Kağıt Kalp Çizgisi */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="opacity-30"
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          stroke="var(--ink-extra-faded)"
          strokeWidth="1.8"
          strokeDasharray="2 2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Dolu Kırmızı Kağıt Kalp */}
      {isFilled && (
        <motion.div
          initial={false}
          animate={{ scale: 1, opacity: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="var(--pencil-red)"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_1px_2px_rgba(217,79,61,0.25)]"
          >
            <path
              d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              stroke="var(--pencil-red)"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      )}

      {/* Yırtılarak Düşen Parça Animasyonu */}
      <AnimatePresence>
        {justLost && !shouldReduceMotion && (
          <motion.div
            initial={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
            animate={{
              y: [0, 6, 24],
              opacity: [1, 0.8, 0],
              scale: [1, 0.95, 0.7],
              rotate: [0, -12, 18],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.65, ease: [0.32, 0, 0.67, 0] }}
            className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
          >
            <svg
              width={size}
              height={size}
              viewBox="0 0 24 24"
              fill="var(--pencil-red)"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Yırtık zigzag yarıklı kalp */}
              <path
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                stroke="var(--pencil-red)"
                strokeWidth="1.5"
              />
              {/* Yırtık Zigzag Çizgisi */}
              <path
                d="M12 5 L10 9 L14 12 L10 16 L12 20"
                stroke="#FFFDF7"
                strokeWidth="1.8"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'

interface PaperAirplaneProps {
  trigger?: boolean
  className?: string
  onComplete?: () => void
}

/**
 * PaperAirplane — Soru gönderildiğinde ekranda kavisli rotada süzülen el çizimi kağıt uçak.
 * trigger true olduğunda uçar, parent setTimeout ile trigger'ı false'a çevirince kaybolur.
 */
export function PaperAirplane({ trigger = false, className = '' }: PaperAirplaneProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return null
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[999] overflow-hidden ${className}`}
    >
      <AnimatePresence>
        {trigger && (
          <motion.div
            key="airplane"
            initial={{
              x: '10vw',
              y: '75vh',
              scale: 0.6,
              rotate: -20,
              opacity: 0,
            }}
            animate={{
              x: ['10vw', '40vw', '70vw', '100vw'],
              y: ['75vh', '40vh', '20vh', '5vh'],
              scale: [0.6, 1.2, 1, 0.5],
              rotate: [-20, -8, -30, -45],
              opacity: [0, 1, 1, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 1.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute"
          >
            {/* El Çizimi Kağıt Uçak SVG */}
            <div className="relative">
              <svg
                width="72"
                height="72"
                viewBox="0 0 64 64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.3)]"
              >
                <path
                  d="M6 34 L58 10 L32 54 L24 38 Z"
                  fill="#FFFDF7"
                  stroke="#1E1B18"
                  strokeWidth="2.5"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <path
                  d="M58 10 L24 38"
                  stroke="#2563EB"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
                <path
                  d="M24 38 L30 46 L32 54"
                  fill="#E2DCD2"
                  stroke="#1E1B18"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <circle cx="58" cy="10" r="2.5" fill="#DC2626" />
              </svg>

              {/* Rüzgar İzi */}
              <svg
                width="100"
                height="50"
                viewBox="0 0 100 50"
                fill="none"
                className="absolute -left-20 top-6 opacity-80"
              >
                <path
                  d="M0 40 Q35 45 60 25 T95 10"
                  stroke="#3B82F6"
                  strokeWidth="2.5"
                  strokeDasharray="5 5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

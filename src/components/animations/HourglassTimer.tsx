'use client'

import { motion, useReducedMotion } from 'motion/react'

interface HourglassTimerProps {
  secondsLeft?: number
  totalSeconds?: number
  size?: number
  className?: string
  showText?: boolean
}

/**
 * HourglassTimer — Hız Modu (Kum Saati Modu) için el çizimi kum saati SVG sayacı.
 * Üst hazneden alt hazneye süzülen kum taneleri ve dökülme animasyonu.
 */
export function HourglassTimer({
  secondsLeft = 45,
  totalSeconds = 60,
  size = 48,
  className = '',
  showText = true,
}: HourglassTimerProps) {
  const shouldReduceMotion = useReducedMotion()

  const ratio = Math.max(0, Math.min(1, secondsLeft / totalSeconds))
  const isUrgent = secondsLeft <= 10

  // Üst haznedeki kum yüksekliği (oran azaldıkça azalır)
  const topSandHeight = ratio * 14
  // Alt haznedeki kum yüksekliği (oran azaldıkça artar)
  const bottomSandHeight = (1 - ratio) * 14

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`overflow-visible ${isUrgent && !shouldReduceMotion ? 'animate-wiggle' : ''}`}
        >
          {/* Ahşap / Kağıt Üst ve Alt Destek Çubukları */}
          <rect
            x="14"
            y="6"
            width="36"
            height="5"
            rx="2"
            fill="var(--paper-card)"
            stroke="var(--ink)"
            strokeWidth="2"
          />
          <rect
            x="14"
            y="53"
            width="36"
            height="5"
            rx="2"
            fill="var(--paper-card)"
            stroke="var(--ink)"
            strokeWidth="2"
          />

          {/* Cam Gövde Çizgileri */}
          <path
            d="M18 11 C18 24, 30 29, 31 32 C30 35, 18 40, 18 53 L46 53 C46 40, 34 35, 33 32 C34 29, 46 24, 46 11 Z"
            fill="rgba(255, 253, 247, 0.5)"
            stroke="var(--ink)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          {/* Üst Haznedeki Kum (Gittikçe Azalır) */}
          <path
            d={`M${20 + (1 - ratio) * 6} ${25 - topSandHeight * 0.7} Q32 ${29 - topSandHeight * 0.2} ${44 - (1 - ratio) * 6} ${25 - topSandHeight * 0.7} L33 32 L31 32 Z`}
            fill={isUrgent ? 'var(--pencil-red)' : 'var(--pencil-yellow)'}
            opacity="0.9"
          />

          {/* Dökülen İnce Kum Akıntısı (Trickle) */}
          {ratio > 0.05 && (
            <line
              x1="32"
              y1="31"
              x2="32"
              y2="51"
              stroke={isUrgent ? 'var(--pencil-red)' : 'var(--pencil-yellow)'}
              strokeWidth="1.8"
              strokeDasharray="2 2"
              className={!shouldReduceMotion ? 'animate-pulse' : ''}
            />
          )}

          {/* Alt Haznede Biriken Kum Piramidi (Gittikçe Büyür) */}
          {bottomSandHeight > 1 && (
            <path
              d={`M${32 - bottomSandHeight * 0.9} 52 Q32 ${52 - bottomSandHeight * 0.8} ${32 + bottomSandHeight * 0.9} 52 Z`}
              fill={isUrgent ? 'var(--pencil-red)' : 'var(--pencil-yellow)'}
              opacity="0.9"
            />
          )}

          {/* Düşen kum damlaları mikro animasyonu */}
          {!shouldReduceMotion && ratio > 0.05 && (
            <>
              <motion.circle
                cx="32"
                cy="36"
                r="1.2"
                fill={isUrgent ? 'var(--pencil-red)' : 'var(--pencil-orange)'}
                animate={{ y: [0, 14], opacity: [1, 0] }}
                transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
              />
              <motion.circle
                cx="32"
                cy="38"
                r="1"
                fill={isUrgent ? 'var(--pencil-red)' : 'var(--pencil-yellow)'}
                animate={{ y: [0, 12], opacity: [1, 0] }}
                transition={{ duration: 0.5, delay: 0.2, repeat: Infinity, ease: 'linear' }}
              />
            </>
          )}

          {/* Cam Işıltısı El Çizimi Çizgisi */}
          <path
            d="M21 16 Q23 22 26 26"
            stroke="#FFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-ink-extra-faded">
            Kalan Süre
          </span>
          <span
            className={`font-display text-2xl font-bold ${
              isUrgent ? 'text-pencil-red' : 'text-pencil-yellow'
            }`}
          >
            {secondsLeft}s
          </span>
        </div>
      )}
    </div>
  )
}

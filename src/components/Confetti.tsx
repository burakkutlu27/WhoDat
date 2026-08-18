'use client'

import { useEffect, useState } from 'react'

interface ConfettiPiece {
  id: number
  x: number
  y: number
  color: string
  delay: number
  rotation: number
  shape: 'rect' | 'circle' | 'triangle'
}

const CONFETTI_COLORS = [
  'var(--pencil-red)',
  'var(--pencil-yellow)',
  'var(--pencil-green)',
  'var(--pencil-blue)',
  'var(--pencil-purple)',
  'var(--pencil-orange)',
]

const PIECE_COUNT = 24

function createPieces(): ConfettiPiece[] {
  return Array.from({ length: PIECE_COUNT }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 20 - 10,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]!,
    delay: Math.random() * 0.4,
    rotation: Math.random() * 360,
    shape: (['rect', 'circle', 'triangle'] as const)[Math.floor(Math.random() * 3)]!,
  }))
}

/**
 * Confetti — Kağıt konfeti patlama efekti.
 * Doğru tahmin ve şampiyon duyurusu gibi anlarda tetiklenir.
 * Tamamıyla CSS animasyonlu, bir kez patlar ve kaybolur.
 */
export default function Confetti({ trigger }: { trigger: boolean }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (trigger) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPieces(createPieces())
      setActive(true)
      const timer = setTimeout(() => setActive(false), 1500)
      return () => clearTimeout(timer)
    }
  }, [trigger])

  if (!active || pieces.length === 0) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-10 overflow-hidden"
    >
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className={`confetti-piece ${active ? 'active' : ''}`}
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            animationDelay: `${piece.delay}s`,
            transform: `rotate(${piece.rotation}deg)`,
          }}
        >
          {piece.shape === 'rect' && (
            <div
              style={{
                width: '8px',
                height: '6px',
                backgroundColor: piece.color,
                borderRadius: '1px',
              }}
            />
          )}
          {piece.shape === 'circle' && (
            <div
              style={{
                width: '6px',
                height: '6px',
                backgroundColor: piece.color,
                borderRadius: '50%',
              }}
            />
          )}
          {piece.shape === 'triangle' && (
            <div
              style={{
                width: 0,
                height: 0,
                borderLeft: '4px solid transparent',
                borderRight: '4px solid transparent',
                borderBottom: `7px solid ${piece.color}`,
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}

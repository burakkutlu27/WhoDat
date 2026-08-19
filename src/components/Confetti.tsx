'use client'

import { useEffect, useState } from 'react'

interface ConfettiPiece {
  id: number
  x: number
  y: number
  color: string
  delay: number
  rotation: number
  shape: 'paper_scrap' | 'post_it' | 'torn_strip' | 'polygon'
  width: number
  height: number
  tilt: number
}

const CONFETTI_COLORS = [
  'var(--pencil-red)',
  'var(--pencil-yellow)',
  'var(--pencil-green)',
  'var(--pencil-blue)',
  'var(--pencil-purple)',
  'var(--pencil-orange)',
]

const PIECE_COUNT = 32

function createPieces(): ConfettiPiece[] {
  const shapes = ['paper_scrap', 'post_it', 'torn_strip', 'polygon'] as const
  return Array.from({ length: PIECE_COUNT }, (_, i) => {
    const shape = shapes[Math.floor(Math.random() * shapes.length)]!
    let width = 8
    let height = 6
    if (shape === 'torn_strip') {
      width = 12 + Math.random() * 4
      height = 4 + Math.random() * 2
    } else if (shape === 'post_it') {
      width = 9 + Math.random() * 3
      height = 9 + Math.random() * 3
    } else if (shape === 'paper_scrap') {
      width = 8 + Math.random() * 5
      height = 6 + Math.random() * 4
    } else {
      width = 7 + Math.random() * 4
      height = 7 + Math.random() * 4
    }

    return {
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 25 - 15,
      color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)]!,
      delay: Math.random() * 0.45,
      rotation: Math.random() * 360,
      shape,
      width,
      height,
      tilt: (Math.random() - 0.5) * 20,
    }
  })
}

/**
 * Confetti — Kağıt konfeti patlama efekti.
 * Doğru tahmin ve şampiyon duyurusu gibi anlarda tetiklenir.
 * Masaya dökülen el kesimi kağıt ve post-it parçacıkları hissi verir.
 */
export default function Confetti({ trigger }: { trigger: boolean }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (trigger) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPieces(createPieces())
      setActive(true)
      const timer = setTimeout(() => setActive(false), 1600)
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
          {piece.shape === 'post_it' && (
            <div
              style={{
                width: `${piece.width}px`,
                height: `${piece.height}px`,
                backgroundColor: piece.color,
                borderRadius: '1px 1px 4px 1px',
                boxShadow: '1px 1px 2px rgba(0,0,0,0.12)',
                transform: `rotate(${piece.tilt}deg)`,
              }}
            />
          )}

          {piece.shape === 'torn_strip' && (
            <div
              style={{
                width: `${piece.width}px`,
                height: `${piece.height}px`,
                backgroundColor: piece.color,
                borderRadius: '2px 0px 3px 1px',
                opacity: 0.9,
                transform: `rotate(${piece.tilt * 1.5}deg)`,
              }}
            />
          )}

          {piece.shape === 'paper_scrap' && (
            <div
              style={{
                width: `${piece.width}px`,
                height: `${piece.height}px`,
                backgroundColor: piece.color,
                clipPath: 'polygon(0% 15%, 85% 0%, 100% 85%, 15% 100%)',
                boxShadow: '1px 1px 2px rgba(0,0,0,0.08)',
              }}
            />
          )}

          {piece.shape === 'polygon' && (
            <div
              style={{
                width: `${piece.width}px`,
                height: `${piece.height}px`,
                backgroundColor: piece.color,
                clipPath: 'polygon(25% 0%, 100% 20%, 75% 100%, 0% 80%)',
              }}
            />
          )}
        </div>
      ))}
    </div>
  )
}


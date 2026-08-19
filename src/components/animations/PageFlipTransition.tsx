'use client'

import { motion, useReducedMotion } from 'motion/react'

interface PageFlipTransitionProps {
  children: React.ReactNode
  type?: 'flip' | 'curl' | 'slide'
  className?: string
}

/**
 * PageFlipTransition — Tur ve Faz geçişlerinde defter sayfası çevirme ve kağıt rulo efekti.
 * Gerçek 3D defter sayfası çevirme hissi verir.
 */
export function PageFlipTransition({
  children,
  type = 'flip',
  className = '',
}: PageFlipTransitionProps) {
  const shouldReduceMotion = useReducedMotion()

  if (shouldReduceMotion) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={className}
      >
        {children}
      </motion.div>
    )
  }

  if (type === 'flip') {
    return (
      <div className="w-full [perspective:1400px]">
        <motion.div
          initial={{
            opacity: 0,
            rotateY: -35,
            scale: 0.94,
            transformOrigin: 'left center',
          }}
          animate={{
            opacity: 1,
            rotateY: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            rotateY: 35,
            scale: 0.94,
            transformOrigin: 'right center',
          }}
          transition={{
            duration: 0.6,
            ease: [0.25, 1, 0.5, 1],
          }}
          style={{ transformStyle: 'preserve-3d' }}
          className={className}
        >
          {children}
        </motion.div>
      </div>
    )
  }

  // Curl up / Rulo kağıt efekti
  return (
    <div className="w-full [perspective:1200px]">
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
          rotateX: 25,
          transformOrigin: 'bottom center',
        }}
        animate={{
          opacity: 1,
          y: 0,
          rotateX: 0,
        }}
        exit={{
          opacity: 0,
          y: -40,
          rotateX: -25,
          transformOrigin: 'top center',
        }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        style={{ transformStyle: 'preserve-3d' }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  )
}

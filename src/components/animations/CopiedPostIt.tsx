'use client'

import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { Check } from 'lucide-react'

interface CopiedPostItProps {
  show: boolean
  text?: string
  className?: string
}

/**
 * CopiedPostIt — Oda kodu kopyalandığında beliren basit sarı Post-it bildirimi.
 * Butona göre relative konumlanır, overflow sorunlarını önlemek için margin-top kullanır.
 */
export function CopiedPostIt({
  show,
  text = 'Kopyalandı!',
  className = '',
}: CopiedPostItProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: -4, scale: 0.9 }
          }
          animate={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 1, y: 0, scale: 1 }
          }
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: -4, scale: 0.9, transition: { duration: 0.15 } }
          }
          transition={{
            duration: 0.25,
            ease: [0.34, 1.56, 0.64, 1],
          }}
          className={`mt-2 flex justify-center ${className}`}
        >
          <div className="inline-flex items-center gap-1.5 rounded-sm bg-pencil-yellow px-3 py-1 font-display text-sm font-bold text-white shadow-md">
            <Check className="h-4 w-4 stroke-[3]" />
            <span>{text}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

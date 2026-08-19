'use client'

import { Moon, Sun } from 'lucide-react'
import { motion } from 'motion/react'

import { useTheme } from '@/contexts/ThemeContext'

export default function ThemeSwitcher() {
  const { toggleTheme } = useTheme()

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.08, rotate: -6 }}
      whileTap={{ scale: 0.9, rotate: 12 }}
      aria-label="Açık ve koyu tema arasında geçiş yap"
      className="relative inline-flex h-10 w-10 items-center justify-center border-2 border-dashed border-paper-border-strong bg-paper-card text-ink-faded shadow-xs transition-all duration-200 hover:border-pencil-yellow hover:text-pencil-yellow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pencil-red"
      style={{ borderRadius: '8px 4px 10px 6px' }}
    >
      <motion.div
        initial={false}
        animate={{ rotate: 360 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        key="theme-icon-container"
        className="flex items-center justify-center"
      >
        <Sun className="hidden h-5 w-5 dark:block" aria-hidden="true" />
        <Moon className="h-5 w-5 dark:hidden" aria-hidden="true" />
      </motion.div>
    </motion.button>
  )
}


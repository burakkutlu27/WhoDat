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
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.92 }}
      aria-label="Açık ve koyu tema arasında geçiş yap"
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white/80 text-slate-700 shadow-sm backdrop-blur-md transition-colors hover:border-indigo-300 hover:text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-300 dark:hover:border-indigo-500/50 dark:hover:text-indigo-400"
    >
      <Sun className="hidden h-5 w-5 dark:block text-amber-400" aria-hidden="true" />
      <Moon className="h-5 w-5 dark:hidden text-indigo-600" aria-hidden="true" />
    </motion.button>
  )
}


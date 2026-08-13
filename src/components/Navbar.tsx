'use client'

import Link from 'next/link'
import { motion } from 'motion/react'

import ThemeSwitcher from './ThemeSwitcher'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/75 backdrop-blur-md dark:border-slate-800/80 dark:bg-[#0B0F17]/75">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          <motion.div
            whileHover={{ scale: 1.05, rotate: -5 }}
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 font-display text-lg font-black text-white shadow-md shadow-indigo-500/20"
          >
            K
          </motion.div>
          <span className="font-display text-xl font-extrabold tracking-tight text-slate-900 transition-colors group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
            KimBu<span className="text-indigo-500">.</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  )
}


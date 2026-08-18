'use client'

import Link from 'next/link'
import { motion } from 'motion/react'

import ThemeSwitcher from './ThemeSwitcher'

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-20 border-b-2 border-dashed border-paper-border bg-paper-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pencil-red"
        >
          {/* Elle çizilmiş soru işareti logosu */}
          <motion.div
            whileHover={{ rotate: [-4, 6, -6, 0], scale: 1.15 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="flex h-10 w-10 items-center justify-center"
          >
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <rect x="2" y="2" width="32" height="32" rx="4" className="fill-paper-card stroke-paper-border transition-colors group-hover:stroke-pencil-red" strokeWidth="2"/>
              <path d="M14 12 C14 9 16.5 7.5 18.5 7.5 C20.5 7.5 23 9 22.5 12 C22 14 19.5 14.5 19 16.5" className="stroke-pencil-red" strokeWidth="3" strokeLinecap="round" fill="none"/>
              <circle cx="18.5" cy="21" r="2" className="fill-pencil-red"/>
              <path d="M11 27 Q18 24.5 25 27" className="stroke-pencil-yellow" strokeWidth="2" strokeLinecap="round" fill="none"/>
            </svg>
          </motion.div>
          <span className="font-display text-3xl font-bold tracking-tight text-ink transition-colors group-hover:text-pencil-red">
            KimBu<span className="inline-block animate-wiggle text-pencil-yellow">?</span>
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <ThemeSwitcher />
        </div>
      </div>
    </nav>

  )
}

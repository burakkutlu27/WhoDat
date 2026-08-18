'use client'

import FloatingDoodles from '@/components/FloatingDoodles'
import Navbar from '@/components/Navbar'
import VersionDisplay from '@/components/VersionDisplay'
import { ThemeProvider } from '@/contexts/ThemeContext'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-paper-bg transition-colors">
        <FloatingDoodles />
        <Navbar />
        <main className="relative">{children}</main>
        <VersionDisplay />
      </div>
    </ThemeProvider>
  )
}


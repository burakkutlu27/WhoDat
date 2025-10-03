'use client'

import { ThemeProvider } from '@/contexts/ThemeContext'
import Navbar from '@/components/Navbar'
import VersionDisplay from '@/components/VersionDisplay'

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
        <Navbar />
        <main>{children}</main>
        <VersionDisplay />
      </div>
    </ThemeProvider>
  )
}

'use client'

import { ThemeProvider } from '@/contexts/ThemeContext'
import Navbar from '@/components/Navbar'

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
      </div>
    </ThemeProvider>
  )
}

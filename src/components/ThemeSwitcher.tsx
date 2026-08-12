'use client'

import { Moon, Sun } from 'lucide-react'

import { useTheme } from '@/contexts/ThemeContext'

/**
 * Hangi ikonun görüneceğine JS değil CSS karar verir: her ikisi de render edilir ve
 * Tailwind'in `dark:` varyantı <html> üzerindeki sınıfa göre birini gizler.
 *
 * Bunun nedeni hidrasyon: sunucu kullanıcının temasını bilemez. Önceki sürüm bunu bir
 * `mounted` bayrağıyla çözüyordu, yani düğme ilk render'da hep güneş ikonu gösterip
 * sonra değişiyordu. CSS ile ikon daha ilk boyamada doğru oluyor.
 */
export default function ThemeSwitcher() {
  const { toggleTheme } = useTheme()

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Açık ve koyu tema arasında geçiş yap"
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-900 shadow-sm transition-colors hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700"
    >
      <Sun className="hidden h-5 w-5 dark:block" aria-hidden="true" />
      <Moon className="h-5 w-5 dark:hidden" aria-hidden="true" />
    </button>
  )
}

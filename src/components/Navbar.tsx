'use client'

import Link from 'next/link'

import ThemeSwitcher from './ThemeSwitcher'

/**
 * Gezinme oyun içinde oda akışıyla yürüdüğü için üst barda yalnızca ana sayfa bağlantısı
 * ve tema anahtarı var.
 *
 * Kaldırılan bağlantılar: "/game" (böyle bir sayfa hiç yoktu, 404 veriyordu) ve
 * "/scores" (global liderlik tablosu her zaman uydurma veri gösteriyordu).
 */
export default function Navbar() {
  return (
    <nav className="border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-900">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <span className="text-xl font-bold text-gray-900 dark:text-white">KimBu</span>
        </Link>

        <ThemeSwitcher />
      </div>
    </nav>
  )
}

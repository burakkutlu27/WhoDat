'use client'

import { useEffect } from 'react'

/**
 * Service worker'ı yalnızca üretimde kaydeder.
 *
 * Geliştirmede SW, HMR ile çakışıp eski sayfaları gösterebildiği için kayıtlı değil.
 * SW'nin kendisi bilerek yalnızca çevrimdışı yedek sayfası sunar (bkz. public/sw.js).
 */
export default function ServiceWorkerRegistrar() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production' || !('serviceWorker' in navigator)) return
    navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {
      // Kayıt başarısızsa site normal çalışmaya devam eder; yalnızca çevrimdışı sayfası olmaz.
    })
  }, [])

  return null
}

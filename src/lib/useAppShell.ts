'use client'

import { useSyncExternalStore } from 'react'

import { isNativeApp } from './native'

/**
 * Uygulama kabuğunda mıyız: Capacitor (Google Play) veya ana ekrana eklenmiş PWA.
 *
 * Uygulamada ana sayfa ve oda kurma, web'deki uzun tanıtım/SEO sayfası yerine tek ekranlık,
 * adım adım düzende gösterilir. Normal tarayıcıda (web sitesi) her şey olduğu gibi kalır.
 */

const STANDALONE_QUERY = '(display-mode: standalone)'

function subscribe(onChange: () => void) {
  const query = window.matchMedia(STANDALONE_QUERY)
  query.addEventListener('change', onChange)
  return () => query.removeEventListener('change', onChange)
}

function getSnapshot(): boolean {
  return isNativeApp() || window.matchMedia(STANDALONE_QUERY).matches
}

export function useAppShell(): boolean {
  // Sunucuda her zaman web düzeni: arama motorları ve ilk boyama web sayfasını görür.
  return useSyncExternalStore(subscribe, getSnapshot, () => false)
}

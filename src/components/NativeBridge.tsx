'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { initAds } from '@/lib/ads'
import { initNativeShell } from '@/lib/native'

/** Uygulama (Capacitor) içinde açılış ayarlarını yapar; web'de hiçbir şey yapmaz. */
export default function NativeBridge() {
  const router = useRouter()

  useEffect(() => {
    let cleanup: (() => void) | undefined
    let cancelled = false
    void initNativeShell((path) => router.push(path)).then((dispose) => {
      if (cancelled) dispose()
      else cleanup = dispose
    })
    // Onay formu (UMP) açılışta çıksın; maç sonunda reklamı beklerken çıkmasın.
    void initAds()
    return () => {
      cancelled = true
      cleanup?.()
    }
  }, [router])

  return null
}

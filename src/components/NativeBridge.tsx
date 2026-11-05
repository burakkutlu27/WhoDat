'use client'

import { Download } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

import { initAds } from '@/lib/ads'
import { initNativeShell, isUpdateRequired, openPlayStore } from '@/lib/native'

/** Uygulama (Capacitor) içinde açılış ayarlarını yapar; web'de hiçbir şey yapmaz. */
export default function NativeBridge() {
  const router = useRouter()
  const [updateRequired, setUpdateRequired] = useState(false)

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

  // Açılışta ve uygulamaya her dönüşte (Play'den güncellemeden dönmüş olabilir) kontrol edilir.
  useEffect(() => {
    let active = true
    const check = () => {
      void isUpdateRequired().then((required) => {
        if (active) setUpdateRequired(required)
      })
    }
    check()
    const onVisible = () => {
      if (document.visibilityState === 'visible') check()
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => {
      active = false
      document.removeEventListener('visibilitychange', onVisible)
    }
  }, [])

  if (!updateRequired) return null

  return (
    <div
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="force-update-title"
      data-testid="force-update"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-paper-bg p-6 pt-[env(safe-area-inset-top)] pb-[var(--safe-bottom)]"
    >
      <div className="paper-card-lg w-full max-w-sm space-y-4 p-6 text-center">
        <div className="mx-auto inline-flex rounded-sketch-lg border-2 border-paper-border bg-pencil-yellow p-3 text-white shadow-md">
          <Download className="h-8 w-8" />
        </div>
        <h2 id="force-update-title" className="font-display text-3xl font-bold text-ink">
          Uygulama güncel değil
        </h2>
        <p className="font-sans text-base text-ink-faded">
          Oynamaya devam etmek için KimBu&apos;nun yeni sürümünü Google Play&apos;den yükle.
        </p>
        <button
          type="button"
          onClick={openPlayStore}
          className="btn-pencil-red flex w-full items-center justify-center gap-2 py-3.5 font-display text-xl shadow-md"
        >
          <Download className="h-5 w-5" />
          <span>Google Play&apos;de Güncelle</span>
        </button>
      </div>
    </div>
  )
}

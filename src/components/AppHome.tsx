'use client'

import { ArrowRight, Bot, Play, Trophy } from 'lucide-react'
import { motion } from 'motion/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { isAdTestUnlocked, markInterstitialPending, showPendingInterstitial, unlockAdTest } from '@/lib/ads'
import { isNativeApp } from '@/lib/native'

const AD_TEST_TAPS = 5

interface AppHomeProps {
  onOpenStats: () => void
}

/**
 * Uygulama (Capacitor / ana ekrana eklenmiş PWA) ana ekranı: tek ekran, kaydırma yok.
 * Web'deki tanıtım/SEO bölümleri burada yok; oyuncu doğrudan oyuna girer.
 * Test kimlikleri web ana sayfasıyla aynı ki aynı akışlar iki düzende de çalışsın.
 */
export function AppHome({ onOpenStats }: AppHomeProps) {
  const router = useRouter()
  const [code, setCode] = useState('')
  // AppHome yalnızca istemcide çizilir (useAppShell), localStorage okumak güvenli.
  const [adTestVisible, setAdTestVisible] = useState(() => isNativeApp() && isAdTestUnlocked())
  const [adTestStatus, setAdTestStatus] = useState<string | null>(null)
  const titleTaps = useRef(0)

  const onTitleTap = () => {
    if (adTestVisible || !isNativeApp()) return
    titleTaps.current += 1
    if (titleTaps.current >= AD_TEST_TAPS) {
      unlockAdTest()
      setAdTestVisible(true)
      // Gizli dokunuşun algılandığı görünsün; düğme altta, gözden kaçabiliyor.
      setAdTestStatus('Reklam testi açıldı: alttaki "Test reklamı"na dokun.')
    }
  }

  // Maçtan dönüşteki akışın aynısı: başka sayfaya git, ana sayfaya geri gelince reklam çıkar.
  const runAdTest = () => {
    markInterstitialPending('test')
    router.push('/gizlilik')
  }

  useEffect(() => {
    let active = true
    void showPendingInterstitial().then((result) => {
      if (active && result?.kind === 'test') {
        setAdTestStatus(result.error ? `Test reklamı gösterilemedi: ${result.error}` : 'Test reklamı gösterildi.')
      }
    })
    return () => {
      active = false
    }
  }, [])

  const join = (event: React.FormEvent) => {
    event.preventDefault()
    const trimmed = code.trim().toUpperCase()
    router.push(trimmed.length === 6 ? `/room/join?code=${trimmed}` : '/room/join')
  }

  return (
    <main
      data-testid="app-home"
      // 4rem + 2px: navbar yüksekliği ve alt çizgisi; çentik boşluğu navbar'ın üst padding'inde.
      className="page-enter mx-auto flex min-h-[calc(100dvh-4rem-2px-env(safe-area-inset-top))] max-w-md flex-col justify-between gap-5 px-5 pt-6 pb-[calc(var(--safe-bottom)+1.25rem)]"
    >
      {/* Başlık ve eylemler ekranın ortasında birlikte; alt bilgi en altta. */}
      <div className="flex flex-1 flex-col justify-center gap-8">
      <motion.header
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 onClick={onTitleTap} className="select-none font-display text-5xl font-bold text-ink">Ben Kimim?</h1>
        <p className="mt-1 font-display text-2xl text-pencil-red">Kimliğini bul, puanları kap.</p>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="space-y-3"
      >
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push('/room/create')}
          data-testid="create-room-link"
          className="btn-pencil-red flex w-full items-center justify-center gap-2 py-4 font-display text-2xl shadow-md"
        >
          <Play className="h-5 w-5 fill-current" />
          <span>Oda Oluştur</span>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => router.push('/room/create?bots=1')}
          data-testid="play-vs-bots-link"
          className="btn-outline flex w-full items-center justify-center gap-2 py-4 font-display text-xl"
        >
          <Bot className="h-5 w-5 text-pencil-blue" />
          <span>Botlara Karşı Oyna</span>
        </motion.button>

        <form onSubmit={join} className="paper-card flex items-center gap-2 p-2.5">
          <input
            value={code}
            onChange={(event) => setCode(event.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
            placeholder="ODA KODU"
            maxLength={6}
            inputMode="text"
            autoCapitalize="characters"
            aria-label="Oda kodu"
            data-testid="quick-code-input"
            className="paper-input-boxed min-w-0 flex-1 text-center font-mono text-xl tracking-[0.25em] uppercase"
          />
          <button
            type="submit"
            data-testid="quick-join-button"
            className="btn-outline flex min-h-12 shrink-0 items-center gap-1.5 px-4 font-display text-lg"
          >
            <span>Katıl</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>
      </motion.div>
      </div>

      <footer className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onOpenStats}
          className="flex min-h-11 items-center gap-2 rounded-sketch-md border-2 border-dashed border-pencil-yellow bg-paper-card px-4 font-display text-lg font-bold text-ink"
        >
          <Trophy className="h-5 w-5 text-pencil-yellow" />
          <span>İstatistiklerim</span>
        </button>
        {adTestVisible && (
          <button
            type="button"
            onClick={runAdTest}
            data-testid="test-ad-button"
            className="flex min-h-11 items-center px-2 font-sans text-sm text-pencil-blue underline"
          >
            Test reklamı
          </button>
        )}
        <Link href="/gizlilik" className="flex min-h-11 items-center font-sans text-sm text-ink-faded underline">
          Gizlilik
        </Link>
      </footer>
      {adTestStatus && (
        <p role="status" className="-mt-3 text-center font-sans text-sm text-ink-faded">
          {adTestStatus}
        </p>
      )}
    </main>
  )
}

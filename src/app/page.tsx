'use client'

import { ArrowRight, KeyRound, Pencil, Pin, Play, Trophy } from 'lucide-react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { StatsModal } from '@/components/StatsModal'

export default function Home() {
  const router = useRouter()
  const [quickCode, setQuickCode] = useState('')
  const [showStats, setShowStats] = useState(false)

  const handleJoinWithCode = (e: React.FormEvent) => {
    e.preventDefault()
    if (quickCode.trim().length === 6) {
      router.push(`/room/join?code=${quickCode.trim().toUpperCase()}`)
    } else {
      router.push('/room/join')
    }
  }

  return (
    <>
      <main className="page-enter mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col justify-center px-4 py-8">
        {/* Hero Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 text-center sm:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
            className="max-w-2xl"
          >
            <h1 className="font-display text-5xl font-bold text-ink sm:text-7xl">
              Ben Kimim? <br />
              <span className="underline-sketch text-pencil-red inline-block transform transition-transform hover:scale-[1.02]">
                Kimliğini bul, puanları kap.
              </span>
            </h1>
            <p className="mt-4 text-base text-ink-faded sm:text-lg">
              Arkadaşlarınla aynı odada toplan, gizli isimler belirle ve sorular sorarak kim olduğunu tahmin et!
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowStats(true)}
            className="group self-center sm:self-end flex items-center gap-2 rounded-xl border-2 border-dashed border-pencil-yellow bg-paper-card px-4 py-2.5 font-display text-lg font-bold text-ink shadow-sm transition-all hover:bg-pencil-yellow hover:text-white"
          >
            <Trophy className="h-5 w-5 text-pencil-yellow transition-colors group-hover:text-white" />
            <span>İstatistiklerim</span>
          </motion.button>
        </div>

      {/* Main Action Hub Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* Create Room Box (Primary) */}
        <motion.div
          initial={{ opacity: 0, y: 25, rotate: -2 }}
          animate={{ opacity: 1, y: 0, rotate: -1.2 }}
          whileHover={{ y: -4, rotate: -0.5, transition: { duration: 0.2 } }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="paper-card-lg tilt-3 flex flex-col justify-between p-6 md:col-span-7 sm:p-8 hover:shadow-2xl"
        >
          <div>
            {/* Dekoratif Kalem İkonu */}
            <motion.div
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="mb-3 inline-block rounded-xl border border-paper-border bg-paper-card p-2 text-pencil-yellow shadow-sm"
            >
              <Pencil className="h-7 w-7" />
            </motion.div>
            <h2 className="font-display text-3xl font-bold text-ink sm:text-4xl">
              Yeni Oyun Odası Aç
            </h2>
            <p className="mt-2 text-sm text-ink-faded sm:text-base">
              Hemen bir oda kur, 6 haneli kodu arkadaşlarınla paylaş ve oynamaya başla.
            </p>
          </div>

          <div className="mt-8">
            <motion.button
              whileHover={{ scale: 1.03, rotate: -0.5 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => router.push('/room/create')}
              className="btn-pencil-red flex w-full items-center justify-center gap-2 py-4 font-display text-xl tracking-wide shadow-md"
            >
              <Play className="h-5 w-5 fill-current" />
              <span>Oda Oluştur</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Join Room Box */}
        <motion.div
          initial={{ opacity: 0, y: 25, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0.8 }}
          whileHover={{ y: -4, rotate: 1.5, transition: { duration: 0.2 } }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="paper-card tilt-2 flex flex-col justify-between p-6 md:col-span-5 sm:p-8 hover:shadow-xl"
        >
          <div>
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="mb-3 inline-block rounded-xl border border-paper-border bg-paper-card p-2 text-pencil-blue shadow-sm"
            >
              <KeyRound className="h-7 w-7" />
            </motion.div>
            <h2 className="font-display text-3xl font-bold text-ink">
              Odaya Katıl
            </h2>
            <p className="mt-1 text-sm text-ink-faded">
              Arkadaşının verdiği 6 haneli oda kodunu gir.
            </p>
          </div>

          <form onSubmit={handleJoinWithCode} className="mt-6 space-y-3">
            <div className="relative">
              <input
                type="text"
                value={quickCode}
                onChange={(e) => setQuickCode(e.target.value.toUpperCase())}
                placeholder="ODA KODU"
                maxLength={6}
                className="paper-input-boxed text-center font-mono text-xl tracking-[0.3em] uppercase transition-all duration-200 focus:scale-[1.01]"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02, rotate: 0.5 }}
              whileTap={{ scale: 0.98 }}
              className="btn-outline flex w-full items-center justify-center gap-2 py-3.5 font-display text-lg"
            >
              <span>Koda Katıl</span>
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Örnek Gizli Oyuncu İsimleri — Post-it'ler */}
      <div className="mt-12">
        <h3 className="mb-4 font-display text-2xl font-bold text-ink-faded flex items-center gap-2">
          <Pin className="h-5 w-5 text-pencil-red" />
          <span>Örnek Gizli Oyuncu İsimleri</span>
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">

          <motion.div
            initial={{ opacity: 0, y: 15, rotate: -3 }}
            animate={{ opacity: 1, y: 0, rotate: -2.5 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="sticky-note sticky-note-yellow animate-sticky-peel tilt-1 p-4 text-center cursor-pointer"
          >
            <span className="font-display text-sm font-bold text-pencil-red">Sinema / Dizi</span>
            <p className="mt-1 font-display text-xl font-bold text-ink">Kemal Sunal</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 15, rotate: 2 }}
            animate={{ opacity: 1, y: 0, rotate: 1.5 }}
            transition={{ delay: 0.45, duration: 0.4 }}
            className="sticky-note sticky-note-pink animate-sticky-peel tilt-4 p-4 text-center cursor-pointer"
          >
            <span className="font-display text-sm font-bold text-pencil-purple">Kurgusal Karakter</span>
            <p className="mt-1 font-display text-xl font-bold text-ink">Sherlock Holmes</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 15, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: -1 }}
            transition={{ delay: 0.55, duration: 0.4 }}
            className="sticky-note sticky-note-blue animate-sticky-peel tilt-5 p-4 text-center cursor-pointer"
          >
            <span className="font-display text-sm font-bold text-pencil-blue">Bilim İnsanı</span>
            <p className="mt-1 font-display text-xl font-bold text-ink">Albert Einstein</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 15, rotate: 3 }}
            animate={{ opacity: 1, y: 0, rotate: 2 }}
            transition={{ delay: 0.65, duration: 0.4 }}
            className="sticky-note sticky-note-green animate-sticky-peel tilt-2 p-4 text-center cursor-pointer"
          >
            <span className="font-display text-sm font-bold text-pencil-green">Müzik / Pop</span>
            <p className="mt-1 font-display text-xl font-bold text-ink">Barış Manço</p>
          </motion.div>
        </div>
      </div>
    </main>

    <StatsModal isOpen={showStats} onClose={() => setShowStats(false)} />
  </>
)

}

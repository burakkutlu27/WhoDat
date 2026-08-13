'use client'

import { ArrowRight, KeyRound, Play, Plus, Users } from 'lucide-react'
import { motion } from 'motion/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [quickCode, setQuickCode] = useState('')

  const handleJoinWithCode = (e: React.FormEvent) => {
    e.preventDefault()
    if (quickCode.trim().length === 6) {
      router.push(`/room/join?code=${quickCode.trim().toUpperCase()}`)
    } else {
      router.push('/room/join')
    }
  }

  return (
    <main className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-5xl flex-col justify-center px-4 py-8">
      {/* Hero Header */}
      <div className="text-center sm:text-left">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-2xl"
        >
          <h1 className="font-display text-4xl font-black tracking-tight text-slate-900 sm:text-6xl dark:text-white">
            Ben Kimim? <br />
            <span className="text-indigo-600 dark:text-indigo-400">Kimliğini bul, puanları kap.</span>
          </h1>
          <p className="mt-4 text-base text-slate-600 sm:text-lg dark:text-slate-300">
            Arkadaşlarınla aynı odada toplan, gizli isimler belirle ve sorular sorarak kim olduğunu tahmin et!
          </p>
        </motion.div>
      </div>

      {/* Main Action Hub Grid */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-12">
        {/* Create Room Box (Primary) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="flex flex-col justify-between rounded-3xl border border-indigo-200 bg-indigo-600 p-6 text-white shadow-xl shadow-indigo-600/20 md:col-span-7 sm:p-8 dark:border-indigo-500/30 dark:bg-indigo-600"
        >
          <div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-md">
              <Plus className="h-6 w-6" />
            </div>
            <h2 className="mt-6 font-display text-2xl font-black text-white sm:text-3xl">
              Yeni Oyun Odası Aç
            </h2>
            <p className="mt-2 text-sm text-indigo-100 sm:text-base">
              Hemen bir oda kur, 6 haneli kodu arkadaşlarınla paylaş ve oynamaya başla.
            </p>
          </div>

          <div className="mt-8">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push('/room/create')}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-4 font-display text-base font-extrabold text-indigo-700 shadow-md transition-all hover:bg-indigo-50 active:scale-[0.99]"
            >
              <Play className="h-5 w-5 fill-current text-indigo-700" />
              <span>Oda Oluştur</span>
            </motion.button>
          </div>
        </motion.div>

        {/* Join Room Box (Secondary / Direct Code Input) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/50 md:col-span-5 sm:p-8 dark:border-slate-800 dark:bg-[#151D2A] dark:shadow-none"
        >
          <div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
              <KeyRound className="h-6 w-6" />
            </div>
            <h2 className="mt-6 font-display text-2xl font-bold text-slate-900 dark:text-white">
              Odaya Katıl
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Arkadaşının verdiği 6 haneli oda kodunu gir.
            </p>
          </div>

          <form onSubmit={handleJoinWithCode} className="mt-6 space-y-3">
            <div className="relative">
              <input
                type="text"
                value={quickCode}
                onChange={(e) => setQuickCode(e.target.value.toUpperCase())}
                placeholder="ODA KODU (ABCDEF)"
                maxLength={6}
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3.5 text-center font-mono text-base font-bold tracking-widest text-slate-900 uppercase transition-all placeholder:font-sans placeholder:text-xs placeholder:tracking-normal placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:focus:border-indigo-400"
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-slate-900 py-3.5 font-display text-sm font-bold text-white shadow-md transition-all hover:bg-slate-800 dark:border-slate-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
            >
              <span>Koda Katıl</span>
              <ArrowRight className="h-4 w-4" />
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Real Game Cards Showcase */}
      <div className="mt-12">
        <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Örnek Gizli Oyuncu İsimleri
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 text-center shadow-sm dark:border-slate-800 dark:bg-[#151D2A]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Sinema / Dizi</span>
            <p className="mt-1 font-display text-base font-extrabold text-slate-900 dark:text-white">Kemal Sunal</p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 text-center shadow-sm dark:border-slate-800 dark:bg-[#151D2A]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Kurgusal Karakter</span>
            <p className="mt-1 font-display text-base font-extrabold text-slate-900 dark:text-white">Sherlock Holmes</p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 text-center shadow-sm dark:border-slate-800 dark:bg-[#151D2A]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Bilim İnsanı</span>
            <p className="mt-1 font-display text-base font-extrabold text-slate-900 dark:text-white">Albert Einstein</p>
          </div>
          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 text-center shadow-sm dark:border-slate-800 dark:bg-[#151D2A]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">Müzik / Pop</span>
            <p className="mt-1 font-display text-base font-extrabold text-slate-900 dark:text-white">Barış Manço</p>
          </div>
        </div>
      </div>
    </main>
  )
}



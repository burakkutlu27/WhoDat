'use client'

import {
  ArrowRight,
  BookOpen,
  ChevronDown,
  Globe,
  HelpCircle,
  KeyRound,
  Layers,
  MessageSquare,
  Pencil,
  Pin,
  Play,
  Sparkles,
  Trophy,
  Users,
  Zap,
} from 'lucide-react'
import { motion, AnimatePresence } from 'motion/react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const StatsModal = dynamic(
  () => import('@/components/StatsModal').then((mod) => mod.StatsModal),
  { ssr: false }
)
const SuggestNameModal = dynamic(
  () => import('@/components/SuggestNameModal'),
  { ssr: false }
)

const FAQ_ITEMS = [
  {
    q: 'KimBu (Ben Kimim) oyunu nasıl oynanır?',
    a: "KimBu, arkadaşlarınızla online bir oda kurarak veya 6 haneli kodla bir odaya katılarak oynanan bir ünlü tahmin oyunudur. Her oyuncu diğer oyuncular için gizli isimler belirler. Sırası gelen oyuncu 'Evet / Hayır' şeklinde cevaplanabilecek sorular sorarak kendi alnındaki gizli ismi tahmin etmeye çalışır.",
  },
  {
    q: 'KimBu oyunu tamamen ücretsiz mi?',
    a: 'Evet, KimBu tamamen ücretsizdir. Herhangi bir üyelik, kayıt veya uygulama indirme gerektirmeden tarayıcınızdan doğrudan oynayabilirsiniz.',
  },
  {
    q: 'Kaç kişiyle oynanabilir ve hangi oyun modları bulunur?',
    a: "KimBu en az 2 kişiyle oynanabilir. Klasik (3 Can), Hız Modu (3 Tur), Israrcı (10 Soru) ve Ortak Hedef (Hakemli) olmak üzere 4 farklı oyun modu ve 7.450'den fazla doğrulanmış isim içeren zengin bir veri tabanı bulunmaktadır.",
  },
  {
    q: 'Sesli iletişim şart mı, sessiz de oynanabilir mi?',
    a: 'Hayır, sesli iletişim şart değildir. Discord veya sesli sohbetin yanı sıra Tam Metin (Yazılı) modu ile hazır soru kalıpları, 15 saniyelik Evet/Hayır oylama sistemi ve oyun içi not defteriyle tamamen sessiz ve uzaktan oynayabilirsiniz.',
  },
]

export default function Home() {
  const router = useRouter()
  const [quickCode, setQuickCode] = useState('')
  const [showStats, setShowStats] = useState(false)
  const [showSuggest, setShowSuggest] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null)

  const handleJoinWithCode = (e: React.FormEvent) => {
    e.preventDefault()
    if (quickCode.trim().length === 6) {
      router.push(`/room/join?code=${quickCode.trim().toUpperCase()}`)
    } else {
      router.push('/room/join')
    }
  }

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index)
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
            className="group self-center sm:self-end flex items-center gap-2 rounded-sketch-md border-2 border-dashed border-pencil-yellow bg-paper-card px-4 py-2.5 font-display text-lg font-bold text-ink shadow-sm transition-all hover:bg-pencil-yellow hover:text-white"
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
                className="mb-3 inline-block rounded-sketch border border-paper-border bg-paper-card p-2 text-pencil-yellow shadow-sm"
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
                data-testid="create-room-link"
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
                className="mb-3 inline-block rounded-sketch border border-paper-border bg-paper-card p-2 text-pencil-blue shadow-sm"
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
                  data-testid="quick-code-input"
                  className="paper-input-boxed text-center font-mono text-xl tracking-[0.3em] uppercase transition-all duration-200 focus:scale-[1.01]"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, rotate: 0.5 }}
                whileTap={{ scale: 0.98 }}
                data-testid="quick-join-button"
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
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-2xl font-bold text-ink-faded flex items-center gap-2">
              <Pin className="h-5 w-5 text-pencil-red" />
              <span>Örnek Gizli Oyuncu İsimleri</span>
            </h3>
            <button
              type="button"
              onClick={() => setShowSuggest(true)}
              className="flex items-center gap-1.5 text-sm font-display font-bold text-pencil-yellow hover:underline-sketch transition-all"
            >
              <span>+ İsim Öner</span>
            </button>
          </div>
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

        {/* ── SEO & İçerik Zenginleştirme: Nasıl Oynanır? ── */}
        <section className="mt-16 border-t-2 border-dashed border-paper-border pt-12">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-pencil-red/30 bg-pencil-red/10 px-3 py-1 text-xs font-bold text-pencil-red mb-3">
              <BookOpen className="h-3.5 w-3.5" />
              Oyun Rehberi
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
              KimBu Nedir ve Nasıl Oynanır?
            </h2>
            <p className="mt-2 text-sm sm:text-base text-ink-faded">
              Geleneksel &quot;Alna Kağıt Yapıştırma&quot; oyununun dijital hali! 4 basit adımda arkadaşlarınla hemen eğlenceye başla.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="paper-card p-5 hover-tilt flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pencil-red text-white font-display text-lg font-bold">1</span>
                  <Users className="h-5 w-5 text-pencil-red" />
                </div>
                <h3 className="font-display text-xl font-bold text-ink mb-1">Oda Kur veya Katıl</h3>
                <p className="text-xs sm:text-sm text-ink-faded leading-relaxed">
                  Lobi oluşturup oyun modunu seçin. 6 haneli oda kodunu arkadaşlarınızla paylaşarak saniyeler içinde toplanın.
                </p>
              </div>
            </div>

            <div className="paper-card p-5 hover-tilt-r flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pencil-yellow text-white font-display text-lg font-bold">2</span>
                  <Pin className="h-5 w-5 text-pencil-yellow" />
                </div>
                <h3 className="font-display text-xl font-bold text-ink mb-1">Gizli İsimleri Seç</h3>
                <p className="text-xs sm:text-sm text-ink-faded leading-relaxed">
                  7.450+ kişilik doğrulanmış havuzdan ya da aklınızdan her arkadaşınız için gizli bir ünlü veya karakter belirleyin.
                </p>
              </div>
            </div>

            <div className="paper-card p-5 hover-tilt flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pencil-blue text-white font-display text-lg font-bold">3</span>
                  <HelpCircle className="h-5 w-5 text-pencil-blue" />
                </div>
                <h3 className="font-display text-xl font-bold text-ink mb-1">Akıllı Sorular Sor</h3>
                <p className="text-xs sm:text-sm text-ink-faded leading-relaxed">
                  Sıranız geldiğinde yalnızca &quot;Evet&quot; veya &quot;Hayır&quot; ile cevaplanabilecek stratejik sorularla kimliğinizi daraltın.
                </p>
              </div>
            </div>

            <div className="paper-card p-5 hover-tilt-r flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-pencil-green text-white font-display text-lg font-bold">4</span>
                  <Sparkles className="h-5 w-5 text-pencil-green" />
                </div>
                <h3 className="font-display text-xl font-bold text-ink mb-1">Kimliğini Tahmin Et!</h3>
                <p className="text-xs sm:text-sm text-ink-faded leading-relaxed">
                  İpuçlarını birleştirip kim olduğunuzu doğru tahmin edin, puanları toplayın ve skor tablosunun zirvesine yerleşin!
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Öne Çıkan Oyun Özellikleri ── */}
        <section className="mt-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
              Neden KimBu? Öne Çıkan Özellikler
            </h2>
            <p className="mt-2 text-sm text-ink-faded">
              Her türlü arkadaş ortamı için tasarlanmış modern, esnek ve zengin parti oyunu deneyimi.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="paper-card-alt p-5 space-y-2">
              <div className="flex items-center gap-2 text-pencil-red font-display text-lg font-bold">
                <Zap className="h-5 w-5" />
                <span>4 Farklı Oyun Modu</span>
              </div>
              <p className="text-xs sm:text-sm text-ink-faded leading-relaxed">
                Klasik (3 Can), Hız Modu (3 Tur), Israrcı (10 Soru Bütçesi) ve Hakemli Ortak Hedef modlarıyla oyunu dilediğiniz rekabet düzeyinde oynayın.
              </p>
            </div>

            <div className="paper-card-alt p-5 space-y-2">
              <div className="flex items-center gap-2 text-pencil-green font-display text-lg font-bold">
                <MessageSquare className="h-5 w-5" />
                <span>Sesli & Tam Metin Modu</span>
              </div>
              <p className="text-xs sm:text-sm text-ink-faded leading-relaxed">
                İster Discord üzerinden konuşarak, ister sessiz ortamlarda hazır soru bankası ve 15 saniyelik oylama sistemiyle metin üzerinden oynayın.
              </p>
            </div>

            <div className="paper-card-alt p-5 space-y-2">
              <div className="flex items-center gap-2 text-pencil-purple font-display text-lg font-bold">
                <Layers className="h-5 w-5" />
                <span>7.450+ Zengin İsim Havuzu</span>
              </div>
              <p className="text-xs sm:text-sm text-ink-faded leading-relaxed">
                Sinema, müzik, spor, tarih, bilim ve kurgusal kategorilerinde filtrelenebilir, zorluk seviyelerine göre ayrılmış devasa veri tabanı.
              </p>
            </div>
          </div>
        </section>

        {/* ── Sıkça Sorulan Sorular (SSS / FAQ) ── */}
        <section className="mt-16 border-t-2 border-dashed border-paper-border pt-12">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-pencil-yellow/30 bg-pencil-yellow/10 px-3 py-1 text-xs font-bold text-pencil-yellow mb-3">
              <HelpCircle className="h-3.5 w-3.5" />
              Merak Edilenler
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-ink">
              Sıkça Sorulan Sorular
            </h2>
          </div>

          <div className="space-y-3 max-w-3xl mx-auto">
            {FAQ_ITEMS.map((item, index) => {
              const isOpen = openFaqIndex === index
              return (
                <div
                  key={index}
                  className="paper-card transition-all duration-200 overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-display text-lg sm:text-xl font-bold text-ink hover:text-pencil-red transition-colors"
                  >
                    <span>{item.q}</span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-ink-faded transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-pencil-red' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-sm sm:text-base text-ink-faded leading-relaxed border-t border-dashed border-paper-border mt-1">
                          {item.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── Semantik Footer & Sosyal Bağlantılar ── */}
        <footer className="mt-20 border-t-2 border-dashed border-paper-border pt-8 pb-12">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="text-center sm:text-left space-y-1">
              <span className="font-display text-2xl font-bold text-ink">
                KimBu<span className="text-pencil-yellow">?</span>
              </span>
              <p className="text-xs sm:text-sm text-ink-faded">
                Online Ben Kimim & Ünlü Tahmin Oyunu. Ücretsiz ve çok oyunculu.
              </p>
              <p className="text-xs text-ink-extra-faded">
                Geliştirici:{' '}
                <a
                  href="https://burakkutlu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-ink hover:text-pencil-red underline transition-colors"
                >
                  Burak Kutlu
                </a>
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm font-sans font-semibold text-ink-faded">
              <Link href="/room/create" className="hover:text-pencil-red transition-colors">
                Oda Oluştur
              </Link>
              <span>•</span>
              <Link href="/room/join" className="hover:text-pencil-red transition-colors">
                Odaya Katıl
              </Link>
              <span>•</span>
              <button
                type="button"
                onClick={() => setShowSuggest(true)}
                className="hover:text-pencil-red transition-colors"
              >
                İsim Öner
              </button>
            </div>

            <div className="flex items-center gap-3">
              <a
                href="https://burakkutlu.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Burak Kutlu Web Sitesi"
                className="flex h-9 w-9 items-center justify-center rounded-sketch border border-paper-border bg-paper-card text-ink-faded hover:text-pencil-red hover:border-pencil-red transition-all"
                title="Geliştirici Web Sitesi"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href="https://github.com/burakkutlu27"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profili"
                className="flex h-9 w-9 items-center justify-center rounded-sketch border border-paper-border bg-paper-card text-ink-faded hover:text-pencil-red hover:border-pencil-red transition-all"
                title="GitHub"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/brkktl/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profili"
                className="flex h-9 w-9 items-center justify-center rounded-sketch border border-paper-border bg-paper-card text-ink-faded hover:text-pencil-red hover:border-pencil-red transition-all"
                title="LinkedIn"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45c-.9 0-1.63.73-1.63 1.63 0 .9.73 1.63 1.63 1.63.9 0 1.63-.73 1.63-1.63 0-.9-.73-1.63-1.63-1.63z" />
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </main>

      <StatsModal isOpen={showStats} onClose={() => setShowStats(false)} />
      <SuggestNameModal isOpen={showSuggest} onClose={() => setShowSuggest(false)} />
    </>
  )
}


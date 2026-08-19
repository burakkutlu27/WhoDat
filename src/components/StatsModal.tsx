'use client'

import { BarChart2, Flame, HelpCircle, Info, Loader2, ShieldCheck, Trophy, X, Zap } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useState } from 'react'

import { ApiClientError, apiRequest } from '@/lib/apiClient'
import { getDeviceId } from '@/lib/deviceId'
import type { DeviceStats } from '@/lib/game/types'

interface StatsModalProps {
  isOpen: boolean
  onClose: () => void
}

const MODE_LABELS: Record<string, { label: string; icon: string }> = {
  classic: { label: 'Klasik Mod', icon: '🎩' },
  speed: { label: 'Hız Modu', icon: '⚡' },
  persistent: { label: 'Israrcı Mod', icon: '🎯' },
  shared_target: { label: 'Ortak Hedef', icon: '👥' },
}

export function StatsModal({ isOpen, onClose }: StatsModalProps) {
  const [stats, setStats] = useState<DeviceStats | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchStats = useCallback(async () => {
    const deviceId = getDeviceId()
    if (!deviceId) return

    setIsLoading(true)
    setError(null)

    try {
      const data = await apiRequest<DeviceStats>(`/api/profile/stats?deviceId=${encodeURIComponent(deviceId)}`)
      setStats(data)
    } catch (caught) {
      setError(
        caught instanceof ApiClientError
          ? caught.message
          : 'İstatistikler yüklenemedi. Lütfen tekrar deneyin.',
      )
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      void fetchStats()
    }
  }, [isOpen, fetchStats])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-ink/50 backdrop-blur-xs"
          />

          {/* Modal Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: 'spring', duration: 0.4, bounce: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="stats-modal-title"
            className="paper-card-lg relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto p-6 sm:p-8 shadow-2xl"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-sketch border border-paper-border bg-paper-card p-2 text-ink-faded transition-all hover:rotate-90 hover:border-pencil-red hover:text-pencil-red"
              aria-label="Kapat"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="mb-6 text-center">
              <motion.div
                animate={{ rotate: [-3, 3, -3] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="mb-2 inline-block rounded-sketch-lg border-2 border-paper-border bg-paper-card p-3 text-pencil-yellow shadow-md"
              >
                <Trophy className="h-9 w-9" />
              </motion.div>
              <h2 id="stats-modal-title" className="font-display text-4xl font-bold text-ink">
                İstatistiklerim
              </h2>
              <p className="mt-1 text-sm text-ink-faded font-sans">
                Bu cihazda oynadığınız oyunların geçmişi ve başarıları
              </p>
            </div>

            <div className="divider-sketch mb-6" />

            {/* Content States */}
            {isLoading ? (
              <div className="space-y-4 py-8 text-center" aria-busy="true" aria-label="İstatistikler yükleniyor">
                <Loader2 className="mx-auto h-8 w-8 animate-spin text-pencil-blue" />
                <p className="font-display text-lg text-ink-faded">İstatistikleriniz getiriliyor...</p>
              </div>
            ) : error ? (
              <div className="py-6 text-center">
                <p className="mb-4 text-sm text-pencil-red">{error}</p>
                <button
                  onClick={() => void fetchStats()}
                  className="btn-pencil-red px-5 py-2 font-display text-base"
                >
                  Tekrar Dene
                </button>
              </div>
            ) : stats ? (
              <div className="space-y-6">
                {/* 3 Ana Metrik Kartı */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {/* Toplam Oyun */}
                  <div
                    className="flex flex-col items-center justify-center border-2 border-dashed border-pencil-blue bg-paper-card p-4 text-center shadow-xs rounded-sketch-md"
                  >
                    <span className="font-display text-sm font-bold text-pencil-blue flex items-center gap-1">
                      <BarChart2 className="h-4 w-4" />
                      <span>Toplam Oyun</span>
                    </span>
                    <span className="mt-1 font-display text-4xl font-bold text-ink">
                      {stats.totalGames}
                    </span>
                  </div>

                  {/* Toplam Birincilik & Kazanma Oranı */}
                  <div
                    className="flex flex-col items-center justify-center border-2 border-solid border-pencil-yellow bg-paper-card p-4 text-center shadow-xs rounded-sketch-md"
                  >
                    <span className="font-display text-sm font-bold text-pencil-yellow flex items-center gap-1">
                      <Trophy className="h-4 w-4" />
                      <span>Birincilik</span>
                    </span>
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span className="font-display text-4xl font-bold text-ink">
                        {stats.totalWins}
                      </span>
                      {stats.totalGames > 0 && (
                        <span className="rounded-full bg-pencil-yellow/15 px-2 py-0.5 font-mono text-xs font-bold text-pencil-yellow">
                          %{stats.winRate}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Elenmeden Bitirme */}
                  <div
                    className="flex flex-col items-center justify-center border-2 border-dashed border-pencil-green bg-paper-card p-4 text-center shadow-xs rounded-sketch-md"
                  >
                    <span className="font-display text-sm font-bold text-pencil-green flex items-center gap-1">
                      <ShieldCheck className="h-4 w-4" />
                      <span>Elenmeden Bitirme</span>
                    </span>
                    <span className="mt-1 font-display text-4xl font-bold text-ink">
                      {stats.totalSurvived}
                    </span>
                  </div>
                </div>

                {/* En Yüksek Skor Şeridi */}
                {stats.totalGames > 0 && (
                  <div
                    className="flex items-center justify-between border-2 border-pencil-purple bg-paper-card px-5 py-3 shadow-xs rounded-sketch-md"
                  >
                    <div className="flex items-center gap-2">
                      <Flame className="h-5 w-5 text-pencil-purple animate-pulse" />
                      <span className="font-display text-lg font-bold text-ink">
                        Kişisel En Yüksek Skor
                      </span>
                    </div>
                    <span className="font-display text-2xl font-bold text-pencil-purple">
                      {stats.highScore} <span className="text-sm font-sans text-ink-faded">Puan</span>
                    </span>
                  </div>
                )}

                {/* Son Oyunlar Listesi */}
                {stats.recentGames.length > 0 ? (
                  <div>
                    <h3 className="mb-3 font-display text-2xl font-bold text-ink flex items-center gap-2">
                      <Zap className="h-5 w-5 text-pencil-orange" />
                      <span>Son Oyunlar</span>
                    </h3>

                    <div className="space-y-2">
                      {stats.recentGames.map((game, index) => {
                        const modeInfo = MODE_LABELS[game.gameMode] || {
                          label: game.gameMode,
                          icon: '🎮',
                        }
                        const formattedDate = game.playedAt
                          ? new Intl.DateTimeFormat('tr-TR', {
                              day: 'numeric',
                              month: 'short',
                              hour: '2-digit',
                              minute: '2-digit',
                            }).format(new Date(game.playedAt))
                          : ''

                        return (
                          <div
                            key={game.id || index}
                            className="flex items-center justify-between border border-dashed border-paper-border bg-paper-card p-3 text-sm transition-all hover:bg-paper-card-alt rounded-sketch"
                          >
                            <div className="flex items-center gap-3">
                              {/* Sıralama Rozeti */}
                              <div
                                className={`flex h-8 w-8 items-center justify-center rounded-sketch font-display font-bold text-sm ${
                                  game.placement === 1
                                    ? 'bg-pencil-yellow text-white'
                                    : game.placement === 2
                                      ? 'bg-ink-faded text-white'
                                      : game.placement === 3
                                        ? 'bg-pencil-orange text-white'
                                        : 'bg-paper-border text-ink-faded'
                                }`}
                              >
                                {game.placement === 1 ? '🥇' : game.placement === 2 ? '🥈' : game.placement === 3 ? '🥉' : `${game.placement}.`}
                              </div>

                              <div>
                                <span className="font-display text-base font-bold text-ink flex items-center gap-1.5">
                                  <span>{modeInfo.icon}</span>
                                  <span>{modeInfo.label}</span>
                                </span>
                                <span className="text-xs text-ink-extra-faded font-mono block">
                                  {formattedDate}
                                </span>
                              </div>
                            </div>

                            <div className="text-right">
                              <span className="font-display text-lg font-bold text-pencil-blue block">
                                {game.score} Puan
                              </span>
                              <span className="text-xs font-sans text-ink-faded">
                                {game.survived ? 'Hayatta 🏁' : 'Elendi 💀'}
                              </span>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ) : (
                  /* Henüz oyun oynanmamışsa Empty State */
                  <div
                    className="sticky-note sticky-note-yellow p-6 text-center tilt-1 shadow-md rounded-sketch-lg"
                  >
                    <HelpCircle className="mx-auto mb-2 h-8 w-8 text-pencil-yellow" />
                    <h4 className="font-display text-2xl font-bold text-ink">
                      Henüz Kayıtlı Oyununuz Yok!
                    </h4>
                    <p className="mt-1 font-sans text-sm text-ink-faded">
                      Hemen bir oda kurarak veya arkadaşınızın odasına katılarak ilk oyununuzu tamamlayın.
                      Sonuçlarınız burada birikmeye başlayacak!
                    </p>
                  </div>
                )}

                {/* Footer Bilgilendirme Notu */}
                <div className="flex items-center gap-2 rounded-sketch-md bg-paper-card-alt border border-paper-border p-3 text-xs text-ink-faded">
                  <Info className="h-4 w-4 shrink-0 text-pencil-blue" />
                  <span>
                    İstatistikleriniz bu cihaza (tarayıcıya) özeldir. Tarayıcı verilerinizi temizlemediğiniz sürece geçmişiniz saklanır.
                  </span>
                </div>
              </div>
            ) : null}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

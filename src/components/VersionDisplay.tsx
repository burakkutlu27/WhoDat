'use client'

import { useState } from 'react'

interface VersionInfo {
  version: string
  environment: string
}

export default function VersionDisplay() {
  const [isVisible, setIsVisible] = useState(false)

  const versionInfo: VersionInfo = {
    version: '3.7.0',
    environment: process.env.NODE_ENV || 'development'
  }

  return (
    <div className="fixed bottom-4 right-4 z-20">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="rounded-sketch-sm border-2 border-dashed border-paper-border bg-paper-card px-3 py-1 font-mono text-xs text-ink-faded shadow-xs transition-colors hover:border-pencil-yellow hover:text-ink"
        title="Versiyon bilgilerini göster"
      >
        v{versionInfo.version}
      </button>
      
      {isVisible && (
        <div
          className="paper-card-alt absolute bottom-8 right-0 min-w-64 p-4 rounded-sketch-md"
        >
          <div className="mb-2 flex items-center justify-between">
            <h3 className="font-display text-xl font-bold text-ink">Versiyon Bilgisi</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-ink-faded hover:text-pencil-red"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-ink-faded">Versiyon:</span>
              <span className="font-mono text-pencil-blue font-bold">v{versionInfo.version}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-ink-faded">Durum:</span>
              <span className={`tag ${
                versionInfo.environment === 'production' 
                  ? 'tag-ready' 
                  : 'border-pencil-yellow text-pencil-yellow'
              }`}>
                {versionInfo.environment === 'production' ? 'Canlı' : 'Geliştirme'}
              </span>
            </div>
            <div className="divider-sketch my-2" />
            <p className="text-xs text-ink-extra-faded">
              Zorluk Seviyesi Seçimi (Kolay / Orta / Zor), 7.450+ İsim Havuzu, Cihaz Bazlı İstatistikler & Liderlik Tablosu, Tam Metin Modu, Soru Bankası, Kategori Lobisi ve 4 Oyun Modu Aktif
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

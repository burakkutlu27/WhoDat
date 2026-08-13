'use client'

import { useState } from 'react'

interface VersionInfo {
  version: string
  environment: string
}

export default function VersionDisplay() {
  const [isVisible, setIsVisible] = useState(false)

  const versionInfo: VersionInfo = {
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="bg-gray-800 dark:bg-gray-700 text-white text-xs px-3 py-1 rounded-full hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors shadow-lg"
        title="Versiyon bilgilerini göster"
      >
        v{versionInfo.version}
      </button>
      
      {isVisible && (
        <div className="absolute bottom-8 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl p-4 min-w-64">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-gray-800 dark:text-white">Versiyon Bilgisi</h3>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              ✕
            </button>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Versiyon:</span>
              <span className="font-mono text-blue-600 dark:text-blue-400">v{versionInfo.version}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Durum:</span>
              <span className={`px-2 py-1 rounded text-xs ${
                versionInfo.environment === 'production' 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                  : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
              }`}>
                {versionInfo.environment === 'production' ? 'Canlı' : 'Geliştirme'}
              </span>
            </div>
            <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                MVP - Temel oyun özellikleri aktif
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

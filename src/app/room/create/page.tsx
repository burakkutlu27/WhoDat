'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { roomFlowHelpers } from '@/utils/supabaseClient'

export default function CreateRoom() {
  const router = useRouter()
  const [nickname, setNickname] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!nickname.trim()) {
      setError('Lütfen bir takma ad girin')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const { roomId, roomCode, playerId } = await roomFlowHelpers.createRoom(nickname.trim())
      
      // Store player info in localStorage for the session
      localStorage.setItem('playerId', playerId)
      localStorage.setItem('playerNickname', nickname.trim())
      localStorage.setItem('isHost', 'true')
      
      // Redirect to room waiting screen
      router.push(`/room/${roomId}`)
    } catch (err) {
      setError('Oda oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.')
      console.error('Error creating room:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏠</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Oda Oluştur
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Yeni bir oyun odası oluşturun ve arkadaşlarınızı davet edin
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleCreateRoom} className="space-y-6">
            <div>
              <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Takma Adınız
              </label>
              <input
                type="text"
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Örn: Ahmet, Oyuncu123"
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                maxLength={20}
                disabled={isLoading}
              />
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}

            <div className="space-y-3">
              <button
                type="submit"
                disabled={isLoading || !nickname.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Oda Oluşturuluyor...
                  </span>
                ) : (
                  'Oda Oluştur'
                )}
              </button>

              <button
                type="button"
                onClick={() => router.push('/')}
                className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-xl transition-colors"
                disabled={isLoading}
              >
                Geri Dön
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
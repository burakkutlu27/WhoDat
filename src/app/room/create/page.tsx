'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { gameFlowHelpers } from '@/utils/supabaseClient'

export default function CreateRoomPage() {
  const router = useRouter()
  const [playerName, setPlayerName] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const [error, setError] = useState('')

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!playerName.trim()) {
      setError('Lütfen isminizi girin')
      return
    }

    setIsCreating(true)
    setError('')

    try {
      const { roomId, playerId } = await gameFlowHelpers.createRoom(playerName.trim())
      
      // Store player info in localStorage for session management
      localStorage.setItem('playerId', playerId)
      localStorage.setItem('playerName', playerName.trim())
      localStorage.setItem('isHost', 'true')
      
      // Redirect to room page
      router.push(`/room/${roomId}`)
    } catch (err) {
      console.error('Error creating room:', err)
      setError('Oda oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsCreating(false)
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
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Oda Oluştur
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Yeni bir oyun odası oluşturun ve arkadaşlarınızı davet edin
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleCreateRoom} className="space-y-6">
            <div>
              <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                İsminiz
              </label>
              <input
                type="text"
                id="playerName"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="İsminizi girin..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                disabled={isCreating}
                maxLength={20}
              />
            </div>

            {error && (
              <div className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 px-4 py-3 rounded-xl text-center">
                {error}
              </div>
            )}

            <div className="space-y-3">
              <button
                type="submit"
                disabled={isCreating || !playerName.trim()}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg disabled:transform-none disabled:cursor-not-allowed"
              >
                {isCreating ? (
                  <>
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                    Oda Oluşturuluyor...
                  </>
                ) : (
                  <>
                    <span className="text-xl mr-2">🚀</span>
                    Oda Oluştur
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => router.push('/')}
                className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-xl transition-colors"
                disabled={isCreating}
              >
                <span className="mr-2">←</span>
                Ana Sayfa
              </button>
            </div>
          </form>

          {/* Info */}
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-300 mb-2">
              💡 Bilgi
            </h3>
            <p className="text-xs text-blue-700 dark:text-blue-400">
              Oda oluşturduktan sonra arkadaşlarınızla oda kodunu paylaşabilir ve hep birlikte oynayabilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

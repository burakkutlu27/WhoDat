'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { gameFlowHelpers, whoDatHelpers } from '@/utils/supabaseClient'

export default function JoinRoomPage() {
  const router = useRouter()
  const [playerName, setPlayerName] = useState('')
  const [roomCode, setRoomCode] = useState('')
  const [isJoining, setIsJoining] = useState(false)
  const [error, setError] = useState('')

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!playerName.trim()) {
      setError('Lütfen isminizi girin')
      return
    }

    if (!roomCode.trim()) {
      setError('Lütfen oda kodunu girin')
      return
    }

    setIsJoining(true)
    setError('')

    try {
      // First check if room exists
      const room = await whoDatHelpers.getRoom(roomCode.trim())
      
      if (!room) {
        setError('Bu oda kodu bulunamadı. Lütfen doğru kodu girdiğinizden emin olun.')
        setIsJoining(false)
        return
      }

      // Check if room is still accepting players
      if (room.status === 'playing' || room.status === 'finished') {
        setError('Bu oda zaten oyunda veya oyun bitti. Lütfen başka bir oda deneyin.')
        setIsJoining(false)
        return
      }

      // Join the room
      const playerId = await gameFlowHelpers.joinRoom(roomCode.trim(), playerName.trim())
      
      // Store player info in localStorage for session management
      localStorage.setItem('playerId', playerId)
      localStorage.setItem('playerName', playerName.trim())
      localStorage.setItem('isHost', 'false')
      
      // Redirect to room page
      router.push(`/room/${roomCode.trim()}`)
    } catch (err) {
      console.error('Error joining room:', err)
      setError('Odaya katılırken bir hata oluştu. Lütfen oda kodunu kontrol edin ve tekrar deneyin.')
    } finally {
      setIsJoining(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🚪</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
              Odaya Katıl
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Oda kodunu girerek mevcut bir oyuna katılın
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleJoinRoom} className="space-y-6">
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
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                disabled={isJoining}
                maxLength={20}
              />
            </div>

            <div>
              <label htmlFor="roomCode" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Oda Kodu
              </label>
              <input
                type="text"
                id="roomCode"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                placeholder="Oda kodunu girin..."
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all text-center text-lg font-mono tracking-wider"
                disabled={isJoining}
                maxLength={10}
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
                disabled={isJoining || !playerName.trim() || !roomCode.trim()}
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg disabled:transform-none disabled:cursor-not-allowed"
              >
                {isJoining ? (
                  <>
                    <span className="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                    Katılıyor...
                  </>
                ) : (
                  <>
                    <span className="text-xl mr-2">🎮</span>
                    Odaya Katıl
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => router.push('/')}
                className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-xl transition-colors"
                disabled={isJoining}
              >
                <span className="mr-2">←</span>
                Ana Sayfa
              </button>
            </div>
          </form>

          {/* Info */}
          <div className="mt-8 bg-green-50 dark:bg-green-900/20 rounded-xl p-4">
            <h3 className="text-sm font-semibold text-green-800 dark:text-green-300 mb-2">
              💡 Bilgi
            </h3>
            <p className="text-xs text-green-700 dark:text-green-400">
              Oda kodunu oda sahibinden alın. Kod genellikle 6-8 karakter uzunluğundadır.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

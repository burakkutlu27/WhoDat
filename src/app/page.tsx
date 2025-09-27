'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { gameFlowHelpers } from '@/utils/supabaseClient'

export default function Home() {
  const [roomCode, setRoomCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleCreateGame = async () => {
    setLoading(true)
    setError('')
    
    try {
      const roomId = await gameFlowHelpers.createRoom('waiting')
      router.push(`/room/${roomId}`)
    } catch (err) {
      setError('Oyun oluşturulurken hata oluştu')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleJoinGame = async () => {
    if (!roomCode.trim()) {
      setError('Lütfen oda kodunu girin')
      return
    }

    setLoading(true)
    setError('')
    
    try {
      // Validate room exists by trying to get it
      const room = await gameFlowHelpers.getRoom(roomCode.trim())
      if (!room) {
        setError('Geçersiz oda kodu')
        return
      }
      router.push(`/room/${roomCode.trim()}`)
    } catch (err) {
      setError('Geçersiz oda kodu')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-2">WhoDat</h1>
            <p className="text-gray-600">Kimlik oyunu oyna!</p>
          </div>

          <div className="space-y-6">
            {/* Dashboard Link */}
            <div className="text-center">
              <button
                onClick={() => router.push('/dashboard')}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200 transform hover:scale-105"
              >
                📊 Dashboard
              </button>
            </div>

            {/* Create New Game */}
            <div className="text-center">
              <button
                onClick={handleCreateGame}
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 px-6 rounded-xl transition-colors duration-200 transform hover:scale-105 disabled:scale-100"
              >
                {loading ? 'Oluşturuluyor...' : '🎮 Yeni Oyun Oluştur'}
              </button>
            </div>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">veya</span>
              </div>
            </div>

            {/* Join Existing Game */}
            <div className="space-y-4">
              <div>
                <label htmlFor="roomCode" className="block text-sm font-medium text-gray-700 mb-2">
                  Oda Kodu
                </label>
                <input
                  id="roomCode"
                  type="text"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value)}
                  placeholder="Oda kodunu girin"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  onKeyPress={(e) => e.key === 'Enter' && handleJoinGame()}
                />
              </div>
              
              <button
                onClick={handleJoinGame}
                disabled={loading || !roomCode.trim()}
                className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-xl transition-colors duration-200 transform hover:scale-105 disabled:scale-100"
              >
                {loading ? 'Katılıyor...' : '🚪 Odaya Katıl'}
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}
          </div>

          <div className="mt-8 text-center text-sm text-gray-500">
            <p>Nasıl oynanır?</p>
            <ul className="mt-2 space-y-1 text-xs">
              <li>• Her oyuncu 3 kimlik yazar</li>
              <li>• Kimlikler rastgele dağıtılır</li>
              <li>• Kimliğinizi tahmin etmeye çalışın!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/utils/supabaseClient'

interface PlayerScore {
  id: string
  name: string
  score: number
  is_host: boolean
  created_at: string
}

export default function ScoresPage() {
  const router = useRouter()
  const [userScore, setUserScore] = useState(0)
  const [leaderboard, setLeaderboard] = useState<PlayerScore[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadScores = async () => {
      try {
        // Get all players with their scores
        const { data: players, error } = await supabase
          .from('players')
          .select('id, name, score, is_host, created_at')
          .order('score', { ascending: false })
          .limit(20)

        if (error) throw error

        setLeaderboard(players || [])

        // Load user's current score from localStorage
        const playerName = localStorage.getItem('playerName')
        if (playerName && players) {
          const userPlayer = players.find(p => p.name === playerName)
          if (userPlayer) {
            setUserScore(userPlayer.score)
          }
        }
      } catch (err) {
        console.error('Error loading scores:', err)
        // Fallback to dummy data
        const dummyLeaderboard: PlayerScore[] = [
          { id: '1', name: 'Ahmet Yılmaz', score: 95, is_host: false, created_at: '2024-01-15' },
          { id: '2', name: 'Ayşe Demir', score: 90, is_host: false, created_at: '2024-01-14' },
          { id: '3', name: 'Mehmet Kaya', score: 85, is_host: false, created_at: '2024-01-13' },
          { id: '4', name: 'Fatma Öz', score: 80, is_host: false, created_at: '2024-01-12' },
          { id: '5', name: 'Ali Çelik', score: 75, is_host: false, created_at: '2024-01-11' }
        ]
        setLeaderboard(dummyLeaderboard)
      } finally {
        setLoading(false)
      }
    }

    loadScores()
  }, [])

  const getRankIcon = (index: number) => {
    switch (index + 1) {
      case 1: return '🥇'
      case 2: return '🥈'
      case 3: return '🥉'
      default: return `#${index + 1}`
    }
  }

  const getRankColor = (index: number) => {
    switch (index + 1) {
      case 1: return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-300'
      case 2: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300'
      case 3: return 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-300'
      default: return 'bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Skorlar yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => router.push('/')}
            className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg transition-colors"
          >
            ← Ana Sayfa
          </button>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white text-center">
            🏆 Skorlar
          </h1>
          <div></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* User Score Card */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
                Senin Skorun
              </h2>
              <div className="text-center">
                <div className="text-6xl font-bold text-blue-600 mb-2">{userScore}</div>
                <div className="text-gray-600 dark:text-gray-300 mb-4">Toplam Puan</div>
                {userScore === 0 ? (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Henüz oyun oynamadın. Hemen başla!
                  </p>
                ) : (
                  <div className="space-y-2">
                    <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-3">
                      <div className="text-sm text-gray-600 dark:text-gray-300">En İyi Skor</div>
                      <div className="text-2xl font-bold text-blue-600">{userScore}</div>
                    </div>
                  </div>
                )}
                <button
                  onClick={() => router.push('/')}
                  className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                >
                  🎮 Oyun Oyna
                </button>
              </div>
            </div>
          </div>

          {/* Leaderboard */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">
                Liderlik Tablosu
              </h2>
              
              <div className="space-y-3">
                {leaderboard.map((player, index) => (
                  <div
                    key={player.id}
                    className={`flex items-center justify-between p-4 rounded-xl transition-colors ${
                      index < 3 
                        ? 'bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/10 dark:to-orange-900/10' 
                        : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${getRankColor(index)}`}>
                        {getRankIcon(index)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800 dark:text-white flex items-center">
                          {player.name}
                          {player.is_host && <span className="ml-2 text-yellow-600">👑</span>}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(player.created_at).toLocaleDateString('tr-TR')}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-800 dark:text-white">
                        {player.score}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        puan
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-blue-600">{leaderboard.length}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Toplam Oyuncu</div>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                    <div className="text-2xl font-bold text-green-600">{leaderboard[0]?.score || 0}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">En Yüksek Skor</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

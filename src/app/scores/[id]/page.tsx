'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, whoDatHelpers, roomFlowHelpers } from '@/utils/supabaseClient'

interface Player {
  id: string
  nickname: string
  is_host: boolean
  score: number
}

interface Room {
  id: string
  room_code: string
  status: 'waiting' | 'playing' | 'finished' | 'closed'
  players: Player[]
}

export default function ScoresPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [room, setRoom] = useState<Room | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [playerId, setPlayerId] = useState<string | null>(null)
  const [isHost, setIsHost] = useState(false)

  useEffect(() => {
    // Get player info from localStorage
    const storedPlayerId = localStorage.getItem('playerId')
    const storedIsHost = localStorage.getItem('isHost')
    
    if (!storedPlayerId) {
      router.push('/')
      return
    }
    
    setPlayerId(storedPlayerId)
    setIsHost(storedIsHost === 'true')
    
    loadRoom()
    
    // Setup realtime subscription to prevent redirect
    const channel = supabase
      .channel(`scores-${params.id}`)
      .on('postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'rooms',
          filter: `id=eq.${params.id}`
        },
        (payload) => {
          console.log('Room status change detected:', payload.new.status)
          // If room status changes from finished, reload
          if (payload.new.status !== 'finished') {
            loadRoom()
          }
        }
      )
      .subscribe((status) => {
        console.log('Scores realtime subscription status:', status)
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [params.id, router])

  const loadRoom = async () => {
    try {
      const roomData = await whoDatHelpers.getRoomWithPlayers(params.id)
      
      if (!roomData) {
        router.push('/')
        return
      }

      // Sort players by score (highest first)
      const sortedPlayers = roomData.players.sort((a: any, b: any) => b.score - a.score)
      
      setRoom({
        ...roomData,
        players: sortedPlayers
      })
    } catch (err) {
      console.error('Error loading room:', err)
      router.push('/')
    } finally {
      setIsLoading(false)
    }
  }

  const handlePlayAgain = async () => {
    try {
      // Reset game state
      await whoDatHelpers.updateRoomStatus(params.id, 'waiting')
      await roomFlowHelpers.resetGame(params.id)
      
      // Redirect to room
      router.push(`/room/${params.id}`)
    } catch (err) {
      console.error('Error resetting game:', err)
    }
  }

  const handleLeaveGame = async () => {
    try {
      if (playerId) {
        await whoDatHelpers.removePlayerFromRoom(playerId)
        await whoDatHelpers.checkAndCloseEmptyRoom(params.id)
      }
    } catch (err) {
      console.error('Error leaving game:', err)
    } finally {
      localStorage.removeItem('playerId')
      localStorage.removeItem('playerNickname')
      localStorage.removeItem('isHost')
      router.push('/')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Sonuçlar yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!room) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">❌</span>
          </div>
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Oyun Bulunamadı</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">Oyun bilgileri yüklenemedi</p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl transition-colors"
          >
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    )
  }

  const winner = room.players[0] // Highest score (already sorted)
  const isWinner = winner && playerId === winner.id

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                🏆 Oyun Bitti!
              </h1>
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 dark:bg-purple-900/20 px-3 py-1 rounded-full">
                  <span className="text-purple-600 dark:text-purple-400 font-mono text-lg">
                    {room.room_code}
                  </span>
                </div>
                <span className="text-gray-600 dark:text-gray-300">
                  {room.players.length} oyuncu
                </span>
              </div>
            </div>
            <button
              onClick={handleLeaveGame}
              className="bg-red-100 dark:bg-red-900/20 hover:bg-red-200 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-xl transition-colors"
            >
              Oyundan Çık
            </button>
          </div>
        </div>

        {/* Winner Announcement */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl shadow-xl p-8 mb-6 text-center">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">👑</span>
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            {isWinner ? 'Tebrikler! Sen Kazandın!' : `${winner?.nickname} Kazandı!`}
          </h2>
          <p className="text-white/90 text-lg">
            {winner?.score} puan ile birinci oldu!
          </p>
        </div>

        {/* Leaderboard */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            🏅 Puan Tablosu
          </h3>
          
          <div className="space-y-4">
            {room.players.map((player, index) => {
              const isCurrentPlayer = player.id === playerId
              const isPodium = index < 3
              
              return (
                <div
                  key={player.id}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    isCurrentPlayer
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : isPodium
                      ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-900/20'
                      : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    {/* Rank */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      index === 0 
                        ? 'bg-yellow-400 text-yellow-900' 
                        : index === 1 
                        ? 'bg-gray-300 text-gray-700' 
                        : index === 2 
                        ? 'bg-orange-400 text-orange-900'
                        : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300'
                    }`}>
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : index + 1}
                    </div>
                    
                    {/* Player Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-gray-800 dark:text-white text-lg">
                          {player.nickname}
                        </span>
                        {player.is_host && (
                          <span className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 text-xs px-2 py-1 rounded-full">
                            Host
                          </span>
                        )}
                        {isCurrentPlayer && (
                          <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs px-2 py-1 rounded-full">
                            Sen
                          </span>
                        )}
                        {isPodium && (
                          <span className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 text-xs px-2 py-1 rounded-full">
                            Podium
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {player.score} puan
                      </p>
                    </div>
                    
                    {/* Score Display */}
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-800 dark:text-white">
                        {player.score}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        puan
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={handlePlayAgain}
            className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            🔄 Tekrar Oyna
          </button>
          
          <button
            onClick={() => router.push('/')}
            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            🏠 Ana Sayfa
          </button>
        </div>
      </div>
    </div>
  )
}

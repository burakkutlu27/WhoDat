'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, whoDatHelpers, roomFlowHelpers } from '@/utils/supabaseClient'

interface Player {
  id: string
  nickname: string
  is_host: boolean
  score: number
  assigned_name?: string
}

interface GameState {
  room: any
  players: Player[]
  currentIdentity: any
  isActive: boolean
  currentPlayerId: string | null
  round: number
}

export default function GamePage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [gameState, setGameState] = useState<GameState | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [playerId, setPlayerId] = useState<string | null>(null)
  const [isHost, setIsHost] = useState(false)
  const [guess, setGuess] = useState('')
  const [isSubmittingGuess, setIsSubmittingGuess] = useState(false)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error' | 'info'>('info')
  const [hasRedirected, setHasRedirected] = useState(false)

  const loadGameState = useCallback(async () => {
    try {
      const state = await roomFlowHelpers.getGameState(params.id)
      setGameState(state)
      
      // If game is not playing, redirect back to room
      if (state.room.status !== 'playing') {
        if (state.room.status === 'finished' && !hasRedirected) {
          // Game is finished - show results or redirect to scores
          setHasRedirected(true)
          router.push(`/scores/${params.id}`)
        } else if (state.room.status !== 'finished') {
          router.push(`/room/${params.id}`)
        }
        return
      }
    } catch (err) {
      console.error('Error loading game state:', err)
      router.push('/')
    } finally {
      setIsLoading(false)
    }
  }, [params.id, router, hasRedirected])

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
    
    // Load initial game state
    loadGameState()
    
    // Setup realtime subscription for game updates
    const channel = supabase
      .channel(`game-${params.id}`)
      .on('postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'rooms',
          filter: `id=eq.${params.id}`
        },
        (payload) => {
          console.log('Game state change detected:', payload.new)
          // Only reload if game is still active
          if (payload.new.status === 'playing') {
            loadGameState()
          }
        }
      )
      .on('postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'players',
          filter: `room_id=eq.${params.id}`
        },
        (payload) => {
          console.log('Player score change detected:', payload.new)
          loadGameState()
        }
      )
      .on('postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'names',
          filter: `room_id=eq.${params.id}`
        },
        (payload) => {
          console.log('Names change detected:', payload.new)
          loadGameState()
        }
      )
      .subscribe((status) => {
        console.log('Game realtime subscription status:', status)
      })

    // Add polling fallback for game state updates (only if game is active)
    const pollingInterval = setInterval(() => {
      console.log('Polling for game state updates...')
      loadGameState()
    }, 2000)

    return () => {
      supabase.removeChannel(channel)
      clearInterval(pollingInterval)
    }
  }, [params.id, router, loadGameState])

  const handleGuess = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!playerId || !guess.trim()) return

    setIsSubmittingGuess(true)
    setMessage('')

    try {
      const result = await roomFlowHelpers.makeGuess(params.id, playerId, guess.trim())
      
      if (result.isCorrect) {
        setMessageType('success')
        setMessage(result.message)
        setGuess('')
        // Force reload game state to get updated scores and turn
        setTimeout(async () => {
          await loadGameState()
        }, 500) // Small delay to ensure database updates are complete
      } else {
        setMessageType('error')
        setMessage(result.message)
      }
    } catch (err: any) {
      setMessageType('error')
      setMessage(err.message || 'Tahmin gönderilirken bir hata oluştu')
      console.error('Error making guess:', err)
    } finally {
      setIsSubmittingGuess(false)
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

  const startActiveGame = async () => {
    if (!isHost) return
    
    try {
      await roomFlowHelpers.startActiveGame(params.id)
      await loadGameState()
    } catch (err) {
      console.error('Error starting active game:', err)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-200 border-t-green-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Oyun yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (!gameState) {
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

  const isMyTurn = gameState.currentPlayerId === playerId
  const currentPlayer = gameState.players.find(p => p.id === gameState.currentPlayerId)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                KimBu Oyunu
              </h1>
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 dark:bg-green-900/20 px-3 py-1 rounded-full">
                  <span className="text-green-600 dark:text-green-400 font-mono text-lg">
                    {gameState.room.room_code}
                  </span>
                </div>
                <span className="text-gray-600 dark:text-gray-300">
                  {gameState.players.length} oyuncu
                </span>
                <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-1 rounded-full text-sm">
                  Tur {gameState.round}
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

        {/* Game Status */}
        {!gameState.isActive && isHost && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6 mb-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-400 mb-2">
                Oyun Aktif Değil
              </h3>
              <p className="text-yellow-600 dark:text-yellow-300 mb-4">
                Oyunu başlatmak için butona basın
              </p>
              <button
                onClick={startActiveGame}
                className="bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded-xl transition-colors"
              >
                Oyunu Başlat
              </button>
            </div>
          </div>
        )}

        {!gameState.isActive && !isHost && (
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 mb-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-400 mb-2">
                Oyun Başlamayı Bekliyor
              </h3>
              <p className="text-blue-600 dark:text-blue-300">
                Host oyunu başlatmayı bekliyor
              </p>
            </div>
          </div>
        )}

        {/* Game Content */}
        {gameState.isActive && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Game Area */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
                {/* Current Player Info */}
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                    {isMyTurn ? 'Senin Sıran!' : `${currentPlayer?.nickname} Tahmin Ediyor`}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300">
                    {isMyTurn ? 'Kim olduğunu tahmin et!' : 'Tahminci düşünüyor...'}
                  </p>
                </div>

                {/* Guess Input (Only for current player) */}
                {isMyTurn && (
                  <div className="max-w-md mx-auto">
                    <form onSubmit={handleGuess} className="space-y-4">
                      <div>
                        <label htmlFor="guess" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Tahminin
                        </label>
                        <input
                          type="text"
                          id="guess"
                          value={guess}
                          onChange={(e) => setGuess(e.target.value)}
                          placeholder="Kim olduğunu tahmin et..."
                          className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors text-center text-lg"
                          disabled={isSubmittingGuess}
                          autoFocus
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmittingGuess || !guess.trim()}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg"
                      >
                        {isSubmittingGuess ? 'Tahmin Ediliyor...' : 'Tahmin Et'}
                      </button>
                    </form>

                    {/* Message Display */}
                    {message && (
                      <div className={`mt-4 p-4 rounded-xl ${
                        messageType === 'success' 
                          ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800' 
                          : messageType === 'error'
                          ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                          : 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800'
                      }`}>
                        <p className={`text-sm ${
                          messageType === 'success' 
                            ? 'text-green-600 dark:text-green-400' 
                            : messageType === 'error'
                            ? 'text-red-600 dark:text-red-400'
                            : 'text-blue-600 dark:text-blue-400'
                        }`}>
                          {message}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Waiting Message (For other players) */}
                {!isMyTurn && (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl">⏳</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      Bekleme Ekranı
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {currentPlayer?.nickname} tahmin ediyor...
                    </p>
                  </div>
                )}

                {/* Current Identity Display (For all players except the guesser) */}
                {!isMyTurn && gameState.currentIdentity && (
                  <div className="mt-8 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4">
                    <h4 className="text-sm font-semibold text-green-600 dark:text-green-400 mb-2">
                      Doğru Cevap
                    </h4>
                    <p className="text-lg font-bold text-green-700 dark:text-green-300">
                      {gameState.currentIdentity.name_text}
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                      {currentPlayer?.nickname} bu kişiyi tahmin etmeye çalışıyor
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Players Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
                <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">
                  Oyuncular ({gameState.players.length})
                </h3>
                
                <div className="space-y-3">
                  {gameState.players.map((player) => (
                    <div
                      key={player.id}
                      className={`p-3 rounded-xl border-2 transition-colors ${
                        player.id === playerId
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : player.id === gameState.currentPlayerId
                          ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
                          : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          player.is_host 
                            ? 'bg-yellow-100 dark:bg-yellow-900/20' 
                            : player.id === gameState.currentPlayerId
                            ? 'bg-orange-100 dark:bg-orange-900/20'
                            : 'bg-purple-100 dark:bg-purple-900/20'
                        }`}>
                          <span className="text-sm">
                            {player.is_host ? '👑' : player.id === gameState.currentPlayerId ? '🎯' : '👤'}
                          </span>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-800 dark:text-white text-sm">
                              {player.nickname}
                            </span>
                            {player.is_host && (
                              <span className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 text-xs px-1.5 py-0.5 rounded-full">
                                Host
                              </span>
                            )}
                            {player.id === gameState.currentPlayerId && (
                              <span className="bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-xs px-1.5 py-0.5 rounded-full">
                                Sıra
                              </span>
                            )}
                            {player.id === playerId && (
                              <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs px-1.5 py-0.5 rounded-full">
                                Sen
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-300">
                            Skor: {player.score}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
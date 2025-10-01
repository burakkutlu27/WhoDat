'use client'

import { useState, useEffect, useCallback } from 'react'
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
  status: 'waiting' | 'playing' | 'finished'
  players: Player[]
}

export default function RoomPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [room, setRoom] = useState<Room | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isStarting, setIsStarting] = useState(false)
  const [error, setError] = useState('')
  const [playerId, setPlayerId] = useState<string | null>(null)
  const [isHost, setIsHost] = useState(false)
  const [names, setNames] = useState<string[]>(['', '', ''])
  const [submittedNames, setSubmittedNames] = useState<string[]>([])
  const [isSubmittingNames, setIsSubmittingNames] = useState(false)
  const [allPlayersSubmittedNames, setAllPlayersSubmittedNames] = useState(false)

  const loadRoom = useCallback(async () => {
    try {
      const roomData = await whoDatHelpers.getRoomWithPlayers(params.id)
      setRoom(roomData)
      
      // Check if room is closed
      if (roomData.status === 'closed') {
        router.push('/')
        return
      }
      
      // Check if game has started
      if (roomData.status === 'playing') {
        router.push(`/game/${params.id}`)
        return
      }
      
      // Check if all players have submitted names
      if (playerId) {
        const namesInRoom = await whoDatHelpers.getNamesInRoom(params.id)
        const playerNames = namesInRoom.filter((name: any) => name.submitted_by === playerId)
        setSubmittedNames(playerNames.map((name: any) => name.name_text))
        
        // Check if all players have submitted at least one name
        const allPlayers = roomData.players
        const playersWithNames = new Set(namesInRoom.map((name: any) => name.submitted_by))
        const allSubmitted = allPlayers.every((player: any) => playersWithNames.has(player.id))
        setAllPlayersSubmittedNames(allSubmitted)
      }
    } catch (err) {
      setError('Oda bilgileri yüklenirken bir hata oluştu')
      console.error('Error loading room:', err)
    } finally {
      setIsLoading(false)
    }
  }, [params.id, router, playerId])

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
    
    // Load initial room data
    loadRoom()
    
    // Setup realtime subscription with better error handling
    const channel = supabase
      .channel(`room-${params.id}`, {
        config: {
          broadcast: { self: true },
          presence: { key: storedPlayerId }
        }
      })
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'players',
          filter: `room_id=eq.${params.id}`
        }, 
        (payload) => {
          console.log('New player joined:', payload.new)
          loadRoom()
        }
      )
      .on('postgres_changes', 
        { 
          event: 'DELETE', 
          schema: 'public', 
          table: 'players',
          filter: `room_id=eq.${params.id}`
        }, 
        (payload) => {
          console.log('Player left:', payload.old)
          loadRoom()
        }
      )
      .on('postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'rooms',
          filter: `id=eq.${params.id}`
        },
        (payload) => {
          console.log('Room status change detected:', payload.new.status)
          // Check if room status changed to playing
          if (payload.new.status === 'playing') {
            router.push(`/game/${params.id}`)
          } else {
            // Reload room data for other status changes
            loadRoom()
          }
        }
      )
      .on('postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'names',
          filter: `room_id=eq.${params.id}`
        },
        (payload) => {
          console.log('Names table change detected:', payload)
          loadRoom()
        }
      )
      .subscribe((status) => {
        console.log('Realtime subscription status:', status)
        if (status === 'SUBSCRIBED') {
          console.log('Successfully subscribed to room updates')
        } else if (status === 'CHANNEL_ERROR') {
          console.error('Realtime subscription error')
        }
      })

    // Fallback: Polling every 3 seconds if realtime fails
    const pollingInterval = setInterval(() => {
      console.log('Polling for room updates...')
      loadRoom()
    }, 3000)

    return () => {
      console.log('Cleaning up realtime subscription and polling')
      supabase.removeChannel(channel)
      clearInterval(pollingInterval)
    }
  }, [params.id, router, loadRoom])

  const handleStartGame = async () => {
    if (!isHost) return
    
    setIsStarting(true)
    setError('')
    try {
      console.log('Starting game...')
      
      // Assign names to players
      console.log('Assigning names...')
      await roomFlowHelpers.assignNames(params.id)
      
      // Start the room (set status to playing)
      console.log('Setting room status to playing...')
      await roomFlowHelpers.startGame(params.id)
      
      // Start the active game (set up game state)
      console.log('Starting active game...')
      await roomFlowHelpers.startActiveGame(params.id)
      
      console.log('Game started successfully, redirecting...')
      // Direct redirect instead of waiting for realtime
      router.push(`/game/${params.id}`)
    } catch (err: any) {
      setError(err.message || 'Oyun başlatılırken bir hata oluştu')
      console.error('Error starting game:', err)
    } finally {
      setIsStarting(false)
    }
  }

  const handleNameChange = (index: number, value: string) => {
    const newNames = [...names]
    newNames[index] = value
    setNames(newNames)
  }

  const handleSubmitNames = async () => {
    if (!playerId) return
    
    const validNames = names.filter(name => name.trim() !== '')
    if (validNames.length === 0) {
      setError('En az bir isim girmelisiniz')
      return
    }

    setIsSubmittingNames(true)
    setError('')

    try {
      // Submit each name
      for (const name of validNames) {
        await whoDatHelpers.submitName(params.id, playerId, name.trim())
      }
      
      setSubmittedNames(validNames)
      setNames(['', '', ''])
    } catch (err) {
      setError('İsimler kaydedilirken bir hata oluştu')
      console.error('Error submitting names:', err)
    } finally {
      setIsSubmittingNames(false)
    }
  }

  const handleLeaveRoom = async () => {
    try {
      // Remove player from database if playerId exists
      if (playerId) {
        await whoDatHelpers.removePlayerFromRoom(playerId)
        
        // Check if room is now empty and close it
        await whoDatHelpers.checkAndCloseEmptyRoom(params.id)
      }
    } catch (err) {
      console.error('Error removing player from room:', err)
    } finally {
      // Clean up localStorage
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
          <p className="text-gray-600 dark:text-gray-300">Oda yükleniyor...</p>
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
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-2">Oda Bulunamadı</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">{error}</p>
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                Oda Bekleme Ekranı
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
              onClick={handleLeaveRoom}
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-xl transition-colors"
            >
              Odadan Çık
            </button>
          </div>
        </div>

        {/* Name Input Form */}
        {submittedNames.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              İsimlerinizi Girin
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Her oyuncu 3 isim yazabilir (ünlü, karakter, tanıdık vb.)
            </p>
            
            <div className="space-y-4">
              {names.map((name, index) => (
                <div key={index}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    İsim {index + 1}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => handleNameChange(index, e.target.value)}
                    placeholder={`İsim ${index + 1} girin...`}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
                    disabled={isSubmittingNames}
                  />
                </div>
              ))}
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mt-4">
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              onClick={handleSubmitNames}
              disabled={isSubmittingNames || names.every(name => name.trim() === '')}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg mt-6"
            >
              {isSubmittingNames ? 'İsimler Kaydediliyor...' : 'İsimleri Gönder'}
            </button>
          </div>
        )}

        {/* Submitted Names Display */}
        {submittedNames.length > 0 && (
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-6">
            <h3 className="text-lg font-semibold text-green-800 dark:text-green-400 mb-2">
              ✅ İsimleriniz Kaydedildi
            </h3>
            <div className="flex flex-wrap gap-2">
              {submittedNames.map((name, index) => (
                <span
                  key={index}
                  className="bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Players List */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Oyuncular ({room.players.length})
          </h2>
          
          {room.players.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <p className="text-gray-600 dark:text-gray-300">Henüz oyuncu yok</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {room.players.map((player) => (
                <div
                  key={player.id}
                  className={`p-4 rounded-xl border-2 transition-colors ${
                    player.id === playerId
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      player.is_host 
                        ? 'bg-yellow-100 dark:bg-yellow-900/20' 
                        : 'bg-purple-100 dark:bg-purple-900/20'
                    }`}>
                      <span className="text-lg">
                        {player.is_host ? '👑' : '👤'}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-800 dark:text-white">
                          {player.nickname}
                        </span>
                        {player.is_host && (
                          <span className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 text-xs px-2 py-1 rounded-full">
                            Host
                          </span>
                        )}
                        {player.id === playerId && (
                          <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs px-2 py-1 rounded-full">
                            Sen
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Skor: {player.score}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Host Controls */}
        {isHost && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
                Host Kontrolleri
              </h3>
              
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
                  <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
                </div>
              )}

              <button
                onClick={handleStartGame}
                disabled={isStarting || !allPlayersSubmittedNames || room.players.length < 2 || room.players.length > 6}
                className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg"
              >
                {isStarting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Oyun Başlatılıyor...
                  </span>
                ) : (
                  'Oyunu Başlat'
                )}
              </button>
              
              {room.players.length < 2 && (
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-3">
                  Oyunu başlatmak için en az 2 oyuncu gerekli
                </p>
              )}
              
              {room.players.length >= 6 && (
                <p className="text-sm text-red-500 dark:text-red-400 mt-3">
                  Oda dolu (maksimum 6 oyuncu)
                </p>
              )}
              
              {!allPlayersSubmittedNames && room.players.length >= 2 && (
                <p className="text-sm text-orange-500 dark:text-orange-400 mt-3">
                  Tüm oyuncuların isim göndermesini bekleyin
                </p>
              )}
              
              {allPlayersSubmittedNames && room.players.length >= 2 && (
                <p className="text-sm text-green-500 dark:text-green-400 mt-3">
                  ✅ Tüm oyuncular isimlerini gönderdi, oyunu başlatabilirsiniz
                </p>
              )}
            </div>
          </div>
        )}

        {/* Waiting Message for Non-Hosts */}
        {!isHost && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⏳</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                Host Oyunu Başlatmayı Bekliyor
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Oyun başladığında otomatik olarak yönlendirileceksiniz
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
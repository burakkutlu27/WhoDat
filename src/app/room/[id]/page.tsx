'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { whoDatHelpers, gameFlowHelpers } from '@/utils/supabaseClient'

interface Player {
  id: string
  name: string
  is_ready: boolean
  has_submitted_names: boolean
  score: number
  is_host: boolean
  assigned_identity: string | null
}

interface Room {
  id: string
  status: string
  game_status: string
  host_id: string
  current_turn_player_id: string | null
  players: Player[]
}

export default function RoomPage() {
  const params = useParams()
  const router = useRouter()
  const roomId = params.id as string

  const [room, setRoom] = useState<Room | null>(null)
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Load room data
  useEffect(() => {
    if (!roomId) return

    const loadRoomData = async () => {
      try {
        const roomData = await whoDatHelpers.getRoomWithPlayersAndIdentities(roomId)
        setRoom(roomData)

        // Get current player info from localStorage
        const playerId = localStorage.getItem('playerId')
        if (playerId) {
          const player = roomData.players.find((p: any) => p.id === playerId)
          setCurrentPlayer(player || null)
        }
      } catch (err) {
        console.error('Error loading room:', err)
        setError('Oda bilgileri yüklenirken bir hata oluştu.')
      } finally {
        setLoading(false)
      }
    }

    loadRoomData()

    // Set up real-time subscription
    const subscription = whoDatHelpers.supabase
      .channel(`room-${roomId}`)
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'rooms', filter: `id=eq.${roomId}` },
        () => loadRoomData()
      )
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'players', filter: `room_id=eq.${roomId}` },
        () => loadRoomData()
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [roomId])

  const handleStartNameCollection = async () => {
    if (!currentPlayer?.is_host) return

    try {
      await gameFlowHelpers.startNameCollection(roomId)
    } catch (err) {
      console.error('Error starting name collection:', err)
      setError('İsim toplama aşaması başlatılırken bir hata oluştu.')
    }
  }

  const handleStartGame = async () => {
    if (!currentPlayer?.is_host) return

    try {
      // Check if all players have submitted names
      const allSubmitted = await gameFlowHelpers.allPlayersSubmittedNames(roomId)
      if (!allSubmitted) {
        setError('Tüm oyuncular isimlerini göndermelidir.')
        return
      }

      // Assign identities and start game
      await gameFlowHelpers.assignIdentities(roomId)
    } catch (err) {
      console.error('Error starting game:', err)
      setError('Oyun başlatılırken bir hata oluştu.')
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600 dark:text-gray-300">Oda yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (error || !room) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center">
            <div className="text-6xl mb-4">❌</div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Hata
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {error || 'Oda bulunamadı veya erişim hatası.'}
            </p>
            <button
              onClick={() => router.push('/')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
            >
              Ana Sayfaya Dön
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Determine current phase
  const isWaiting = room.game_status === 'waiting'
  const isCollectingNames = room.game_status === 'collecting_names'
  const isPlaying = room.game_status === 'playing'
  const isFinished = room.game_status === 'finished'

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                Oda: {roomId}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {isWaiting && 'Oyuncular bekleniyor...'}
                {isCollectingNames && 'İsimler toplanıyor...'}
                {isPlaying && 'Oyun devam ediyor...'}
                {isFinished && 'Oyun bitti!'}
              </p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-gray-400">Oyuncu Sayısı</div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {room.players.length}
              </div>
            </div>
          </div>
        </div>

        {/* Players List */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
            Oyuncular ({room.players.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {room.players.map((player) => (
              <div
                key={player.id}
                className={`p-4 rounded-xl border-2 transition-all ${
                  player.id === currentPlayer?.id
                    ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-800 dark:text-white">
                      {player.name}
                      {player.is_host && ' 👑'}
                      {player.id === currentPlayer?.id && ' (Sen)'}
                    </h3>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {isCollectingNames && (
                        <span className={player.has_submitted_names ? 'text-green-600' : 'text-orange-600'}>
                          {player.has_submitted_names ? '✅ İsimler gönderildi' : '⏳ Bekleniyor'}
                        </span>
                      )}
                      {isPlaying && (
                        <span className="text-blue-600">
                          Skor: {player.score}
                        </span>
                      )}
                    </div>
                  </div>
                  {isPlaying && player.assigned_identity && (
                    <div className="text-right">
                      {player.id === currentPlayer?.id ? (
                        <div className="bg-purple-100 dark:bg-purple-900/20 border border-purple-300 dark:border-purple-700 rounded-lg p-2">
                          <div className="text-purple-800 dark:text-purple-300 font-semibold text-sm">
                            Sen: {player.assigned_identity}
                          </div>
                        </div>
                      ) : (
                        <div className="bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg p-2">
                          <div className="text-gray-600 dark:text-gray-400 text-sm">
                            Kimlik: ?
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Game Controls */}
        {currentPlayer?.is_host && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
              Oyun Kontrolleri
            </h2>
            <div className="space-y-4">
              {isWaiting && (
                <div className="space-y-3">
                  <p className="text-gray-600 dark:text-gray-300">
                    En az 2 oyuncu gereklidir. Oyuncular katıldıktan sonra isim toplama aşamasını başlatabilirsiniz.
                  </p>
                  <button
                    onClick={handleStartNameCollection}
                    disabled={room.players.length < 2}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-colors disabled:cursor-not-allowed"
                  >
                    İsim Toplama Aşamasını Başlat
                  </button>
                </div>
              )}

              {isCollectingNames && (
                <div className="space-y-3">
                  <p className="text-gray-600 dark:text-gray-300">
                    Tüm oyuncular isimlerini gönderdikten sonra oyunu başlatabilirsiniz.
                  </p>
                  <button
                    onClick={handleStartGame}
                    disabled={!room.players.every((p: any) => p.has_submitted_names)}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-colors disabled:cursor-not-allowed"
                  >
                    Oyunu Başlat
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Name Submission (for collecting names phase) */}
        {isCollectingNames && currentPlayer && !currentPlayer.has_submitted_names && (
          <NameSubmissionForm roomId={roomId} playerId={currentPlayer.id} />
        )}

        {/* Game Interface (for playing phase) */}
        {isPlaying && currentPlayer && (
          <GameInterface room={room} currentPlayer={currentPlayer} />
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 px-4 py-3 rounded-xl text-center mb-6">
            {error}
          </div>
        )}

        {/* Back to Home */}
        <div className="text-center">
          <button
            onClick={() => router.push('/')}
            className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-xl transition-colors"
          >
            <span className="mr-2">←</span>
            Ana Sayfa
          </button>
        </div>
      </div>
    </div>
  )
}

// Name Submission Component
function NameSubmissionForm({ roomId, playerId }: { roomId: string; playerId: string }) {
  const [names, setNames] = useState(['', '', ''])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validNames = names.filter(name => name.trim())
    if (validNames.length < 3) {
      setError('Lütfen 3 isim girin')
      return
    }

    setIsSubmitting(true)
    setError('')

    try {
      await gameFlowHelpers.submitIdentities(roomId, playerId, validNames)
    } catch (err) {
      console.error('Error submitting names:', err)
      setError('İsimler gönderilirken bir hata oluştu.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        İsimlerinizi Girin
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        3 isim yazın (ünlü, karakter, tanıdık kişi vb.). Bu isimler havuzda toplanacak ve herkese rastgele dağıtılacak.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {names.map((name, index) => (
          <div key={index}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              İsim {index + 1}
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                const newNames = [...names]
                newNames[index] = e.target.value
                setNames(newNames)
              }}
              placeholder={`İsim ${index + 1}...`}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              disabled={isSubmitting}
              maxLength={30}
            />
          </div>
        ))}

        {error && (
          <div className="bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-300 px-4 py-3 rounded-xl text-center">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || names.filter(n => n.trim()).length < 3}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-colors disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Gönderiliyor...' : 'İsimleri Gönder'}
        </button>
      </form>
    </div>
  )
}

// Game Interface Component
function GameInterface({ room, currentPlayer }: { room: Room; currentPlayer: Player }) {
  const [question, setQuestion] = useState('')
  const [guess, setGuess] = useState('')
  const [isMyTurn, setIsMyTurn] = useState(false)

  useEffect(() => {
    setIsMyTurn(room.current_turn_player_id === currentPlayer.id)
  }, [room.current_turn_player_id, currentPlayer.id])

  const handleAskQuestion = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim() || !isMyTurn) return

    try {
      await whoDatHelpers.addQuestion(room.id, currentPlayer.id, question.trim())
      setQuestion('')
    } catch (err) {
      console.error('Error asking question:', err)
    }
  }

  const handleMakeGuess = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!guess.trim() || !isMyTurn) return

    try {
      const isCorrect = await gameFlowHelpers.makeGuess(room.id, currentPlayer.id, guess.trim())
      if (isCorrect) {
        alert('🎉 Doğru! Tebrikler!')
      } else {
        alert('❌ Yanlış! Tekrar deneyin.')
      }
      setGuess('')
    } catch (err) {
      console.error('Error making guess:', err)
    }
  }

  const currentTurnPlayer = room.players.find((p: any) => p.id === room.current_turn_player_id)

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Oyun Devam Ediyor
      </h2>
      
      <div className="mb-6">
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <p className="text-blue-800 dark:text-blue-300 font-semibold">
            Şu an sıra: {currentTurnPlayer?.name}
            {isMyTurn && ' (Senin sıran!)'}
          </p>
        </div>
      </div>

      {isMyTurn && (
        <div className="space-y-6">
          {/* Ask Question */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              Soru Sor
            </h3>
            <form onSubmit={handleAskQuestion} className="flex gap-3">
              <input
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Evet/Hayır ile cevaplanabilecek bir soru sorun..."
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
              <button
                type="submit"
                disabled={!question.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-colors disabled:cursor-not-allowed"
              >
                Sor
              </button>
            </form>
          </div>

          {/* Make Guess */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
              Tahmin Et
            </h3>
            <form onSubmit={handleMakeGuess} className="flex gap-3">
              <input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Kim olduğunuzu tahmin edin..."
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
              />
              <button
                type="submit"
                disabled={!guess.trim()}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-colors disabled:cursor-not-allowed"
              >
                Tahmin Et
              </button>
            </form>
          </div>
        </div>
      )}

      {!isMyTurn && (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-300">
            {currentTurnPlayer?.name} oyuncusunun sırası. Sorularını bekleyin ve "Evet" veya "Hayır" ile cevap verin.
          </p>
        </div>
      )}
    </div>
  )
}
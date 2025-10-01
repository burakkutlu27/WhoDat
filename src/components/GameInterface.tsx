'use client'

import { useState } from 'react'

interface Player {
  id: string
  name: string
  assigned_identity: string | null
}

interface Identity {
  id: string
  name: string
  submitted_by: string
}

interface Room {
  id: string
  status: string
  players: Player[]
  identities: Identity[]
}

interface GameInterfaceProps {
  room: Room
  currentPlayer: Player
}

export default function GameInterface({ room, currentPlayer }: GameInterfaceProps) {
  const [currentTurn, setCurrentTurn] = useState(0)
  const [showIdentity, setShowIdentity] = useState(false)
  const [revealedIdentities, setRevealedIdentities] = useState<Set<string>>(new Set())

  const currentPlayerIndex = room.players.findIndex(p => p.id === currentPlayer.id)
  const currentTurnPlayer = room.players[currentTurn]
  const isMyTurn = currentTurn === currentPlayerIndex

  const nextTurn = () => {
    setCurrentTurn((prev) => (prev + 1) % room.players.length)
  }

  const revealIdentity = (playerId: string) => {
    setRevealedIdentities(prev => {
      const newSet = new Set(prev)
      newSet.add(playerId)
      return newSet
    })
  }

  const hideIdentity = (playerId: string) => {
    setRevealedIdentities(prev => {
      const newSet = new Set(prev)
      newSet.delete(playerId)
      return newSet
    })
  }

  const toggleIdentity = (playerId: string) => {
    if (revealedIdentities.has(playerId)) {
      hideIdentity(playerId)
    } else {
      revealIdentity(playerId)
    }
  }

  return (
    <div className="space-y-6">
      {/* Game Status */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">🎮 Oyun Başladı!</h2>
          
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
            <p className="text-blue-800 font-semibold">
              Şu an sıra: <span className="text-xl">{currentTurnPlayer?.name}</span>
            </p>
            {isMyTurn && (
              <p className="text-blue-600 text-sm mt-1">🎯 Senin sıran!</p>
            )}
          </div>

          <div className="flex justify-center space-x-4">
            <button
              onClick={nextTurn}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl transition-colors"
            >
              Sırayı Geç →
            </button>
          </div>
        </div>
      </div>

      {/* Players and Identities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {room.players.map((player) => {
          const isRevealed = revealedIdentities.has(player.id)
          const isCurrentPlayer = player.id === currentPlayer.id
          
          return (
            <div
              key={player.id}
              className={`p-4 rounded-xl border-2 transition-all ${
                player.id === currentTurnPlayer?.id
                  ? 'border-yellow-400 bg-yellow-50'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className={`font-bold ${
                  player.id === currentTurnPlayer?.id ? 'text-yellow-800' : 'text-gray-800'
                }`}>
                  {player.name}
                  {isCurrentPlayer && ' (Sen)'}
                  {player.id === currentTurnPlayer?.id && ' 🎯'}
                </h3>
                
                {!isCurrentPlayer && player.assigned_identity && (
                  <button
                    onClick={() => toggleIdentity(player.id)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      isRevealed
                        ? 'bg-red-500 hover:bg-red-600 text-white'
                        : 'bg-green-500 hover:bg-green-600 text-white'
                    }`}
                  >
                    {isRevealed ? 'Gizle' : 'Göster'}
                  </button>
                )}
              </div>

              {player.assigned_identity && (
                <div className="text-center">
                  {isCurrentPlayer ? (
                    <div className="bg-purple-100 border border-purple-300 rounded-lg p-3">
                      <p className="text-purple-800 font-semibold">
                        Senin kimliğin: {player.assigned_identity}
                      </p>
                      <p className="text-purple-600 text-sm mt-1">
                        Bu kimliği tahmin etmeye çalışın!
                      </p>
                    </div>
                  ) : isRevealed ? (
                    <div className="bg-green-100 border border-green-300 rounded-lg p-3">
                      <p className="text-green-800 font-semibold">
                        Kimlik: {player.assigned_identity}
                      </p>
                    </div>
                  ) : (
                    <div className="bg-gray-100 border border-gray-300 rounded-lg p-3">
                      <p className="text-gray-600">
                        Kimlik gizli
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Game Instructions */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-3">📋 Nasıl Oynanır?</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>1. Sıradaki oyuncu kimliğini tahmin etmeye çalışır</p>
          <p>2. Diğer oyuncular &ldquo;Evet&rdquo; veya &ldquo;Hayır&rdquo; ile cevap verir</p>
          <p>3. Doğru tahmin edilirse oyuncu kazanır!</p>
          <p>4. Sırayı geçmek için &ldquo;Sırayı Geç&rdquo; butonuna basın</p>
        </div>
      </div>
    </div>
  )
}

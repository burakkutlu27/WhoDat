'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { gameFlowHelpers, whoDatHelpers } from '@/utils/supabaseClient'
import { supabase } from '@/utils/supabaseClient'
import PlayerNameInput from '@/components/PlayerNameInput'
import IdentityForm from '@/components/IdentityForm'
import PlayerList from '@/components/PlayerList'
import GameInterface from '@/components/GameInterface'

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

export default function RoomPage() {
  const params = useParams()
  const roomId = params.id as string
  
  const [room, setRoom] = useState<Room | null>(null)
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showNameInput, setShowNameInput] = useState(false)

  useEffect(() => {
    if (!roomId) return

    // Check if player is already in room (from localStorage)
    const savedPlayerId = localStorage.getItem(`player_${roomId}`)
    if (savedPlayerId) {
      loadRoomData()
    } else {
      setShowNameInput(true)
      setLoading(false)
    }
  }, [roomId])

  const loadRoomData = async () => {
    try {
      const roomData = await whoDatHelpers.getRoomWithPlayersAndIdentities(roomId)
      setRoom(roomData)
      
      // Check if current player exists
      const savedPlayerId = localStorage.getItem(`player_${roomId}`)
      if (savedPlayerId) {
        const player = roomData.players.find(p => p.id === savedPlayerId)
        setCurrentPlayer(player || null)
      }
    } catch (err) {
      setError('Oda bilgileri yüklenirken hata oluştu')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handlePlayerJoin = async (playerName: string) => {
    try {
      const player = await gameFlowHelpers.joinRoom(roomId, playerName)
      localStorage.setItem(`player_${roomId}`, player.id)
      setCurrentPlayer(player)
      setShowNameInput(false)
      await loadRoomData()
    } catch (err) {
      setError('Oyuncu eklenirken hata oluştu')
      console.error(err)
    }
  }

  const handleIdentitySubmit = async (identities: string[]) => {
    if (!currentPlayer) return
    
    try {
      await gameFlowHelpers.submitIdentities(roomId, currentPlayer.id, identities)
      await loadRoomData()
    } catch (err) {
      setError('Kimlikler gönderilirken hata oluştu')
      console.error(err)
    }
  }

  const handleAssignIdentities = async () => {
    try {
      await gameFlowHelpers.assignIdentities(roomId)
      await loadRoomData()
    } catch (err) {
      setError('Kimlikler dağıtılırken hata oluştu')
      console.error(err)
    }
  }

  // Set up real-time subscription
  useEffect(() => {
    if (!roomId) return

    const channel = supabase
      .channel(`room_${roomId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'players',
          filter: `room_id=eq.${roomId}`
        },
        () => {
          loadRoomData()
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'identities',
          filter: `room_id=eq.${roomId}`
        },
        () => {
          loadRoomData()
        }
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'rooms',
          filter: `id=eq.${roomId}`
        },
        () => {
          loadRoomData()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [roomId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Hata</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-xl transition-colors"
          >
            Ana Sayfaya Dön
          </button>
        </div>
      </div>
    )
  }

  if (showNameInput) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Odaya Katıl</h1>
            <p className="text-gray-600">Oda Kodu: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{roomId}</span></p>
          </div>
          <PlayerNameInput onJoin={handlePlayerJoin} />
        </div>
      </div>
    )
  }

  if (!room || !currentPlayer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Oda bilgileri yükleniyor...</p>
        </div>
      </div>
    )
  }

  const hasPlayerSubmittedIdentities = room.identities.some(
    identity => identity.submitted_by === currentPlayer.id
  )

  const allPlayersSubmitted = room.players.every(player => 
    room.identities.some(identity => identity.submitted_by === player.id)
  )

  const isHost = room.players[0]?.id === currentPlayer.id

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Oda: {roomId}</h1>
              <p className="text-gray-600">Durum: {room.status}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Oyuncu: {currentPlayer.name}</p>
              <p className="text-xs text-gray-400">ID: {currentPlayer.id.slice(0, 8)}...</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Players List */}
          <div className="lg:col-span-1">
            <PlayerList 
              players={room.players} 
              currentPlayer={currentPlayer}
              roomStatus={room.status}
            />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2">
            {room.status === 'waiting' && !hasPlayerSubmittedIdentities && (
              <IdentityForm onSubmit={handleIdentitySubmit} />
            )}

            {room.status === 'waiting' && hasPlayerSubmittedIdentities && !allPlayersSubmitted && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6 text-center">
                <div className="text-yellow-600 text-4xl mb-4">⏳</div>
                <h3 className="text-xl font-bold text-yellow-800 mb-2">Diğer Oyuncular Bekleniyor</h3>
                <p className="text-yellow-700">
                  Tüm oyuncuların kimliklerini girmesini bekleyin...
                </p>
              </div>
            )}

            {room.status === 'waiting' && allPlayersSubmitted && isHost && (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-6 text-center">
                <div className="text-green-600 text-4xl mb-4">🎯</div>
                <h3 className="text-xl font-bold text-green-800 mb-2">Kimlikleri Dağıt</h3>
                <p className="text-green-700 mb-4">
                  Tüm oyuncular kimliklerini girdi. Şimdi kimlikleri dağıtabilirsiniz!
                </p>
                <button
                  onClick={handleAssignIdentities}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-colors"
                >
                  İsimleri Dağıt
                </button>
              </div>
            )}

            {room.status === 'assigned' && (
              <GameInterface 
                room={room}
                currentPlayer={currentPlayer}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useState } from 'react'

interface PlayerNameInputProps {
  onJoin: (playerName: string) => void
}

export default function PlayerNameInput({ onJoin }: PlayerNameInputProps) {
  const [playerName, setPlayerName] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!playerName.trim()) return

    setLoading(true)
    try {
      await onJoin(playerName.trim())
    } catch (error) {
      console.error('Error joining room:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="playerName" className="block text-sm font-medium text-gray-700 mb-2">
          Oyuncu Adı
        </label>
        <input
          id="playerName"
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Adınızı girin"
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          required
          maxLength={20}
        />
      </div>
      
      <button
        type="submit"
        disabled={loading || !playerName.trim()}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 px-6 rounded-xl transition-colors duration-200 transform hover:scale-105 disabled:scale-100"
      >
        {loading ? 'Katılıyor...' : '🚪 Odaya Katıl'}
      </button>
    </form>
  )
}

'use client'

interface Player {
  id: string
  name: string
  assigned_identity: string | null
}

interface PlayerListProps {
  players: Player[]
  currentPlayer: Player
  roomStatus: string
  playersWithNames?: Set<string>
}

export default function PlayerList({ players, currentPlayer, roomStatus, playersWithNames }: PlayerListProps) {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
        👥 Oyuncular ({players.length})
      </h3>
      
      <div className="space-y-3">
        {players.map((player) => (
          <div
            key={player.id}
            className={`p-4 rounded-xl border-2 transition-all ${
              player.id === currentPlayer.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${
                  player.id === currentPlayer.id ? 'bg-blue-500' : 'bg-green-500'
                }`}></div>
                <span className={`font-medium ${
                  player.id === currentPlayer.id ? 'text-blue-800' : 'text-gray-800'
                }`}>
                  {player.name}
                  {player.id === currentPlayer.id && ' (Sen)'}
                </span>
                {playersWithNames && (
                  <div className="flex items-center space-x-2">
                    {playersWithNames.has(player.id) ? (
                      <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded-full flex items-center">
                        <span className="mr-1">✅</span>
                        İsim Gönderdi
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded-full flex items-center">
                        <span className="mr-1">⏳</span>
                        Bekliyor
                      </span>
                    )}
                  </div>
                )}
              </div>
              
              {roomStatus === 'assigned' && player.assigned_identity && (
                <div className="text-right">
                  <div className="text-xs text-gray-500 mb-1">Kimlik:</div>
                  <div className="text-sm font-semibold text-purple-600">
                    {player.assigned_identity}
                  </div>
                </div>
              )}
            </div>
            
            {roomStatus === 'waiting' && (
              <div className="mt-2 text-xs text-gray-500">
                {player.id === currentPlayer.id ? 'Hazır' : 'Bekleniyor...'}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {roomStatus === 'waiting' && (
        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
          <p className="text-sm text-yellow-800">
            ⏳ Tüm oyuncuların kimliklerini girmesini bekleyin...
          </p>
        </div>
      )}
      
      {roomStatus === 'assigned' && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl">
          <p className="text-sm text-green-800">
            ✅ Kimlikler dağıtıldı! Oyun başlayabilir.
          </p>
        </div>
      )}
    </div>
  )
}

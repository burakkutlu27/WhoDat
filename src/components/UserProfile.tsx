'use client'

interface User {
  name: string
  email: string
  avatar: string
  joinDate: string
  totalGames: number
  winRate: number
}

interface UserProfileProps {
  user: User
}

export default function UserProfile({ user }: UserProfileProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Avatar and Basic Info */}
      <div className="text-center mb-6">
        <div className="relative inline-block">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-20 h-20 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
          />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
        </div>
        <h2 className="text-xl font-bold text-gray-900 mt-4">{user.name}</h2>
        <p className="text-gray-600 text-sm">{user.email}</p>
        <p className="text-gray-500 text-xs mt-1">Üye olma: {user.joinDate}</p>
      </div>

      {/* Stats */}
      <div className="space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-sm text-gray-600">Toplam Oyun</span>
          <span className="font-semibold text-gray-900">{user.totalGames}</span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-gray-100">
          <span className="text-sm text-gray-600">Kazanma Oranı</span>
          <span className="font-semibold text-green-600">{user.winRate}%</span>
        </div>
        <div className="flex justify-between items-center py-2">
          <span className="text-sm text-gray-600">Seviye</span>
          <span className="font-semibold text-blue-600">Uzman</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Seviye İlerlemesi</span>
          <span>2,400 / 3,000 XP</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" style={{width: '80%'}}></div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-6 space-y-2">
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors">
          Profili Düzenle
        </button>
        <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium py-2 px-4 rounded-lg transition-colors">
          Ayarlar
        </button>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">Bu Hafta</h3>
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-gray-900">5</div>
            <div className="text-xs text-gray-500">Oyun</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-600">3</div>
            <div className="text-xs text-gray-500">Kazanma</div>
          </div>
        </div>
      </div>
    </div>
  )
}

'use client'

export default function ActivityCard() {
  const activities = [
    {
      id: 1,
      type: 'game_completed',
      title: 'Kimlik Oyunu tamamlandı',
      description: 'Aile oyununda "Doktor" kimliğini doğru tahmin ettiniz',
      time: '2 saat önce',
      icon: '🏆',
      color: 'green'
    },
    {
      id: 2,
      type: 'game_joined',
      title: 'Yeni oyuna katıldınız',
      description: 'İş arkadaşları oyununa katıldınız',
      time: '1 gün önce',
      icon: '👥',
      color: 'blue'
    },
    {
      id: 3,
      type: 'achievement',
      title: 'Yeni başarı kazandınız',
      description: '5 oyun üst üste kazandınız!',
      time: '3 gün önce',
      icon: '🎖️',
      color: 'yellow'
    },
    {
      id: 4,
      type: 'game_created',
      title: 'Yeni oyun oluşturdunuz',
      description: 'Üniversite arkadaşları için oyun oluşturdunuz',
      time: '1 hafta önce',
      icon: '🎮',
      color: 'purple'
    }
  ]

  const getColorClasses = (color: string) => {
    const colorMap = {
      green: 'bg-green-100 text-green-600',
      blue: 'bg-blue-100 text-blue-600',
      yellow: 'bg-yellow-100 text-yellow-600',
      purple: 'bg-purple-100 text-purple-600'
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.blue
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Son Aktiviteler</h3>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          Tümünü Gör
        </button>
      </div>

      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getColorClasses(activity.color)}`}>
              <span className="text-lg">{activity.icon}</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-gray-900">{activity.title}</h4>
              <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
              <p className="text-xs text-gray-500 mt-2">{activity.time}</p>
            </div>
            <div className="flex-shrink-0">
              <button className="text-gray-400 hover:text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="text-center">
          <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
            Daha fazla aktivite yükle
          </button>
        </div>
      </div>
    </div>
  )
}

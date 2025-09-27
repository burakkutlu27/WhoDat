'use client'

export default function QuickActionsCard() {
  const quickActions = [
    {
      title: 'Yeni Oyun Oluştur',
      description: 'Arkadaşlarınla yeni bir kimlik oyunu başlat',
      icon: '🎮',
      color: 'blue',
      action: () => console.log('Yeni oyun oluştur')
    },
    {
      title: 'Odaya Katıl',
      description: 'Mevcut bir odaya oda kodu ile katıl',
      icon: '🚪',
      color: 'green',
      action: () => console.log('Odaya katıl')
    },
    {
      title: 'İstatistikleri Gör',
      description: 'Oyun geçmişinizi ve performansınızı inceleyin',
      icon: '📊',
      color: 'purple',
      action: () => console.log('İstatistikler')
    },
    {
      title: 'Ayarlar',
      description: 'Hesap ve oyun ayarlarınızı düzenleyin',
      icon: '⚙️',
      color: 'gray',
      action: () => console.log('Ayarlar')
    }
  ]

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100',
      green: 'bg-green-50 border-green-200 text-green-600 hover:bg-green-100',
      purple: 'bg-purple-50 border-purple-200 text-purple-600 hover:bg-purple-100',
      gray: 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
    }
    return colorMap[color as keyof typeof colorMap] || colorMap.gray
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Hızlı İşlemler</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions.map((action, index) => (
          <button
            key={index}
            onClick={action.action}
            className={`p-4 rounded-lg border-2 transition-all duration-200 hover:scale-105 ${getColorClasses(action.color)}`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{action.icon}</span>
              <div className="text-left">
                <h4 className="font-medium">{action.title}</h4>
                <p className="text-sm opacity-75">{action.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-blue-600 text-lg">💡</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-900">İpucu</h4>
              <p className="text-sm text-gray-600">
                Daha fazla oyuncu ile oynamak için oda kodunu arkadaşlarınızla paylaşın!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

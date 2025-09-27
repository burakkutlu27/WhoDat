'use client'

export default function RecentFilesCard() {
  const recentFiles = [
    {
      id: 1,
      name: 'Kimlik Oyunu - Aile',
      type: 'Oyun',
      date: '2 saat önce',
      status: 'Tamamlandı',
      players: 4
    },
    {
      id: 2,
      name: 'Kimlik Oyunu - İş Arkadaşları',
      type: 'Oyun',
      date: '1 gün önce',
      status: 'Devam Ediyor',
      players: 6
    },
    {
      id: 3,
      name: 'Kimlik Oyunu - Üniversite',
      type: 'Oyun',
      date: '3 gün önce',
      status: 'Tamamlandı',
      players: 8
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Tamamlandı':
        return 'bg-green-100 text-green-800'
      case 'Devam Ediyor':
        return 'bg-blue-100 text-blue-800'
      case 'Beklemede':
        return 'bg-yellow-100 text-yellow-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Son Oyunlar</h3>
        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          Tümünü Gör
        </button>
      </div>

      <div className="space-y-4">
        {recentFiles.map((file) => (
          <div key={file.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-lg">🎮</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-900">{file.name}</h4>
                <p className="text-sm text-gray-500">{file.date} • {file.players} oyuncu</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(file.status)}`}>
                {file.status}
              </span>
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
        <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors">
          + Yeni Oyun Başlat
        </button>
      </div>
    </div>
  )
}

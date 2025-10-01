'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const handleCreateRoom = () => {
    router.push('/room/create')
  }

  const handleJoinRoom = () => {
    router.push('/room/join')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 sm:p-12">
          {/* Logo and Title */}
          <div className="mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">🎭</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-800 dark:text-white mb-4">
              KimBu
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-md mx-auto">
              &ldquo;Ben Kimim&rdquo; oyunu - Kimliğini bul, puan kazan!
            </p>
          </div>

          {/* Game Description */}
          <div className="mb-8">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
                Nasıl Oynanır?
              </h2>
              <ul className="text-gray-600 dark:text-gray-300 space-y-2 text-left">
                <li className="flex items-center">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm mr-3">1</span>
                  Oda oluştur veya odaya katıl
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm mr-3">2</span>
                  Herkes 3 isim yazar (ünlü, karakter, tanıdık)
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm mr-3">3</span>
                  Sırayla sorular sor, kimliğini bul!
                </li>
                <li className="flex items-center">
                  <span className="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm mr-3">4</span>
                  Doğru tahmin et, puan kazan!
                </li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleCreateRoom}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <span className="text-xl mr-2">🏠</span>
              Oda Oluştur
            </button>
            
            <button
              onClick={handleJoinRoom}
              className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              <span className="text-xl mr-2">🚪</span>
              Odaya Katıl
            </button>
            
            <button
              onClick={() => router.push('/scores')}
              className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium py-3 px-6 rounded-xl transition-colors"
            >
              <span className="mr-2">🏆</span>
              Skorları Gör
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

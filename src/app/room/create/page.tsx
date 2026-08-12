'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { ApiClientError, apiRequest } from '@/lib/apiClient'

export default function CreateRoomPage() {
  const router = useRouter()
  const [nickname, setNickname] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    if (!nickname.trim() || isSubmitting) return

    setIsSubmitting(true)
    setError(null)

    try {
      // Oturum çerezi sunucuda ayarlanır; istemci hiçbir kimlik bilgisi saklamaz.
      const { roomId } = await apiRequest<{ roomId: string; roomCode: string }>('/api/rooms', {
        method: 'POST',
        body: { nickname: nickname.trim() },
      })
      router.push(`/room/${roomId}`)
    } catch (caught) {
      setError(
        caught instanceof ApiClientError
          ? caught.message
          : 'Oda oluşturulamadı. Lütfen tekrar deneyin.',
      )
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-gray-50 p-4 dark:bg-gray-900">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-lg dark:bg-gray-800">
          <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">Oda Oluştur</h1>
          <p className="mb-8 text-gray-600 dark:text-gray-300">
            Yeni bir oyun odası açın ve oda kodunu arkadaşlarınızla paylaşın.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label
                htmlFor="nickname"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Takma adınız
              </label>
              <input
                id="nickname"
                type="text"
                value={nickname}
                onChange={(event) => setNickname(event.target.value)}
                placeholder="Örn: Ahmet"
                maxLength={20}
                autoComplete="nickname"
                disabled={isSubmitting}
                aria-describedby={error ? 'create-room-error' : undefined}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 transition-colors focus:border-transparent focus:ring-2 focus:ring-blue-500 disabled:opacity-60 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {error && (
              <div
                id="create-room-error"
                role="alert"
                className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300"
              >
                {error}
              </div>
            )}

            <div className="space-y-3">
              <button
                type="submit"
                disabled={isSubmitting || !nickname.trim()}
                className="w-full rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:bg-gray-400"
              >
                {isSubmitting ? 'Oda oluşturuluyor...' : 'Oda oluştur'}
              </button>

              <button
                type="button"
                onClick={() => router.push('/')}
                disabled={isSubmitting}
                className="w-full rounded-xl bg-gray-100 px-6 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                Geri dön
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

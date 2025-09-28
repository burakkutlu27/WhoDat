'use client'

import { useState } from 'react'

interface LoginFormProps {
  onLogin: (email: string, password: string) => Promise<void>
  onSwitchToRegister: () => void
  isLoading: boolean
  error: string
}

export default function LoginForm({ onLogin, onSwitchToRegister, isLoading, error }: LoginFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim() || !password.trim()) return
    
    await onLogin(email.trim(), password.trim())
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🔐</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Giriş Yap
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Hesabınıza giriş yapın
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            E-posta
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ornek@email.com"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
            disabled={isLoading}
            required
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Şifre
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
            disabled={isLoading}
            required
          />
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
            <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !email.trim() || !password.trim()}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg"
        >
          {isLoading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
            disabled={isLoading}
          >
            Hesabınız yok mu? Kayıt olun
          </button>
        </div>
      </form>
    </div>
  )
}

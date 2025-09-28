'use client'

import { useState } from 'react'

interface RegisterFormProps {
  onRegister: (email: string, password: string, nickname: string) => Promise<void>
  onSwitchToLogin: () => void
  isLoading: boolean
  error: string
}

export default function RegisterForm({ onRegister, onSwitchToLogin, isLoading, error }: RegisterFormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nickname, setNickname] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      setPasswordError('Şifreler eşleşmiyor')
      return
    }
    
    if (!email.trim() || !password.trim() || !nickname.trim()) return
    
    setPasswordError('')
    await onRegister(email.trim(), password.trim(), nickname.trim())
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">📝</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
          Kayıt Ol
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          Yeni hesap oluşturun
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="nickname" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Takma Ad
          </label>
          <input
            type="text"
            id="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="Oyuncu123"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
            disabled={isLoading}
            maxLength={20}
            required
          />
        </div>

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
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
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
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
            disabled={isLoading}
            minLength={6}
            required
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Şifre Tekrar
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:text-white transition-colors"
            disabled={isLoading}
            required
          />
        </div>

        {(error || passwordError) && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4">
            <p className="text-red-600 dark:text-red-400 text-sm">{error || passwordError}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !email.trim() || !password.trim() || !nickname.trim() || password !== confirmPassword}
          className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg"
        >
          {isLoading ? 'Kayıt Olunuyor...' : 'Kayıt Ol'}
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 font-medium transition-colors"
            disabled={isLoading}
          >
            Zaten hesabınız var mı? Giriş yapın
          </button>
        </div>
      </form>
    </div>
  )
}

'use client'

import { useState } from 'react'

interface IdentityFormProps {
  onSubmit: (identities: string[]) => void
}

export default function IdentityForm({ onSubmit }: IdentityFormProps) {
  const [identities, setIdentities] = useState(['', '', ''])
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const validIdentities = identities.filter(identity => identity.trim())
    if (validIdentities.length < 3) {
      alert('Lütfen en az 3 kimlik girin')
      return
    }

    setLoading(true)
    try {
      await onSubmit(validIdentities)
    } catch (error) {
      console.error('Error submitting identities:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleIdentityChange = (index: number, value: string) => {
    const newIdentities = [...identities]
    newIdentities[index] = value
    setIdentities(newIdentities)
  }

  const addIdentity = () => {
    if (identities.length < 10) {
      setIdentities([...identities, ''])
    }
  }

  const removeIdentity = (index: number) => {
    if (identities.length > 3) {
      const newIdentities = identities.filter((_, i) => i !== index)
      setIdentities(newIdentities)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6">
      <div className="text-center mb-6">
        <div className="text-4xl mb-4">🎭</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Kimliklerinizi Girin</h2>
        <p className="text-gray-600">
          En az 3 kimlik yazın. Bu kimlikler diğer oyunculara dağıtılacak.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {identities.map((identity, index) => (
          <div key={index} className="flex gap-2">
            <div className="flex-1">
              <input
                type="text"
                value={identity}
                onChange={(e) => handleIdentityChange(index, e.target.value)}
                placeholder={`Kimlik ${index + 1}`}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                maxLength={30}
              />
            </div>
            {identities.length > 3 && (
              <button
                type="button"
                onClick={() => removeIdentity(index)}
                className="px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        ))}

        {identities.length < 10 && (
          <button
            type="button"
            onClick={addIdentity}
            className="w-full py-2 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-blue-400 hover:text-blue-500 transition-colors"
          >
            + Kimlik Ekle
          </button>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 className="font-semibold text-blue-800 mb-2">💡 İpucu:</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Meslekler: Doktor, Öğretmen, Mühendis</li>
            <li>• Hayvanlar: Aslan, Kartal, Yunus</li>
            <li>• Nesneler: Telefon, Kitap, Araba</li>
            <li>• Ünlüler: Einstein, Mozart, Atatürk</li>
          </ul>
        </div>

        <button
          type="submit"
          disabled={loading || identities.filter(i => i.trim()).length < 3}
          className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-xl transition-colors duration-200 transform hover:scale-105 disabled:scale-100"
        >
          {loading ? 'Gönderiliyor...' : '✅ Kimlikleri Gönder'}
        </button>
      </form>
    </div>
  )
}

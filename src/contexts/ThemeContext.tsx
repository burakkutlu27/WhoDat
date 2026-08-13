'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

/**
 * Başlangıç değeri, layout'taki hidrasyon öncesi script'in <html> üzerine koyduğu
 * sınıftan okunur. Böylece durumu bir effect içinde düzeltmek gerekmiyor; effect
 * yalnızca değişikliği dışarıya (DOM ve localStorage) yazıyor.
 */
function readThemeFromDocument(): Theme {
  if (typeof document === 'undefined') return 'light'
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(readThemeFromDocument)

  useEffect(() => {
    document.documentElement.classList.remove('light', 'dark')
    document.documentElement.classList.add(theme)
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // Gizli sekmede localStorage yazılamayabilir; tema yine de bu oturumda çalışır.
    }
  }, [theme])

  const toggleTheme = useCallback(() => {
    setThemeState((previous) => (previous === 'light' ? 'dark' : 'light'))
  }, [])

  const setTheme = useCallback((next: Theme) => setThemeState(next), [])

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext)
  if (!context) {
    // Sunucuda render edilirken sağlayıcı yoktur; işlevsiz bir varsayılan döndürülür.
    return { theme: 'light', toggleTheme: () => {}, setTheme: () => {} }
  }
  return context
}

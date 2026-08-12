import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KimBu - Ünlü Tahmin Oyunu',
  description: 'Ünlü kişileri tahmin et, puan kazan! Eğlenceli tahmin oyunu.',
}

/**
 * Tema sınıfını React hidrasyonundan önce uygular.
 *
 * Önceden tema bir effect içinde ayarlanıyordu: sayfa önce açık temayla boyanıyor,
 * sonra koyuya atlıyordu. Bu script ilk boyamadan önce çalıştığı için o sıçrama olmuyor.
 */
const themeInitScript = `
(function(){try{
  var t = localStorage.getItem('theme');
  if (t !== 'dark' && t !== 'light') {
    t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.classList.add(t);
}catch(e){document.documentElement.classList.add('light')}})();
`.trim()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Caveat, JetBrains_Mono, Nunito } from 'next/font/google'
import './globals.css'
import ClientLayout from '@/components/ClientLayout'

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
})

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
})

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'KimBu | Ünlü Tahmin Oyunu',
    template: '%s | KimBu',
  },
  description:
    'Arkadaşlarınla online oda oluştur, 3 gizli isim yaz ve sorular sorarak kimliğini tahmin et!',
  icons: {
    icon: '/icon.svg',
  },
  keywords: ['kimbu', 'ünlü tahmin oyunu', 'ben kimim oyunu', 'online parti oyunu', 'multiplayer game'],
  authors: [{ name: 'KimBu Team' }],
  openGraph: {
    title: 'KimBu | Ünlü Tahmin Oyunu',
    description:
      'Arkadaşlarınla online oda oluştur, 3 gizli isim yaz ve sorular sorarak kimliğini tahmin et!',
    url: 'https://kimbu.app',
    siteName: 'KimBu',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KimBu | Ünlü Tahmin Oyunu',
    description: 'Arkadaşlarınla online odaya katıl, kimliğini ilk tahmin eden sen ol!',
  },
}

/**
 * Tema sınıfını React hidrasyonundan önce uygular.
 * Ilk boyamadan önce çalıştığı için temasal parlamalar (flash) engellenir.
 * Varsayılan tema dark olarak ayarlandı.
 */
const themeInitScript = `
(function(){try{
  var t = localStorage.getItem('theme');
  if (t !== 'dark' && t !== 'light') {
    t = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  document.documentElement.classList.add(t);
}catch(e){document.documentElement.classList.add('dark')}})();
`.trim()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${caveat.variable} ${nunito.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="bg-paper-bg font-sans text-ink antialiased">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}

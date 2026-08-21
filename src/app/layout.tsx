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
  metadataBase: new URL('https://whodat.burakkutlu.com'),
  title: {
    default: 'KimBu | Online Ben Kimim ve Ünlü İsim Tahmin Oyunu',
    template: '%s | KimBu',
  },
  description:
    'Arkadaşlarınla online oda kur, gizli isimler belirle ve evet/hayır soruları sorarak kimliğini tahmin et. Ücretsiz, eğlenceli ve çok oyunculu parti oyunu!',
  applicationName: 'KimBu',
  authors: [{ name: 'Burak Kutlu', url: 'https://burakkutlu.com' }],
  creator: 'Burak Kutlu',
  publisher: 'Burak Kutlu',
  category: 'game',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/icon.svg',
  },
  keywords: [
    'kimbu',
    'ben kimim oyunu',
    'ünlü tahmin oyunu',
    'online parti oyunu',
    'arkadaşlarla oyun',
    'oda kur',
    'isim tahmin',
    'kelime oyunu',
    'multiplayer web game',
    'tahmin oyunu',
    'kutu oyunu',
    'alna kağıt yapıştırma',
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    title: 'KimBu | Online Ben Kimim ve Ünlü İsim Tahmin Oyunu',
    description:
      'Arkadaşlarınla online oda kur, gizli isimler belirle ve evet/hayır soruları sorarak kimliğini tahmin et. Ücretsiz ve çok oyunculu parti oyunu!',
    url: 'https://whodat.burakkutlu.com',
    siteName: 'KimBu',
    locale: 'tr_TR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KimBu | Online Ben Kimim ve Ünlü İsim Tahmin Oyunu',
    description:
      'Arkadaşlarınla online oda kur, gizli isimler belirle ve sorular sorarak kimliğini tahmin et!',
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

const jsonLdStructuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebApplication',
      '@id': 'https://whodat.burakkutlu.com/#webapp',
      name: 'KimBu',
      url: 'https://whodat.burakkutlu.com',
      applicationCategory: 'GameApplication',
      genre: 'Party Game',
      operatingSystem: 'All',
      browserRequirements: 'Requires JavaScript. Requires HTML5.',
      description:
        'Arkadaşlarınla online oda kur, gizli isimler belirle ve evet/hayır soruları sorarak kimliğini tahmin et. Ücretsiz, eğlenceli ve çok oyunculu parti oyunu!',
      inLanguage: 'tr-TR',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'TRY',
        availability: 'https://schema.org/InStock',
      },
      author: {
        '@type': 'Person',
        name: 'Burak Kutlu',
        url: 'https://burakkutlu.com',
        sameAs: [
          'https://github.com/burakkutlu27',
          'https://www.linkedin.com/in/brkktl/',
        ],
      },
    },
    {
      '@type': 'WebSite',
      '@id': 'https://whodat.burakkutlu.com/#website',
      name: 'KimBu',
      url: 'https://whodat.burakkutlu.com',
      inLanguage: 'tr-TR',
      description: 'Online Ben Kimim ve Ünlü İsim Tahmin Oyunu',
      publisher: {
        '@type': 'Person',
        name: 'Burak Kutlu',
        url: 'https://burakkutlu.com',
      },
    },
    {
      '@type': 'Person',
      '@id': 'https://burakkutlu.com/#person',
      name: 'Burak Kutlu',
      url: 'https://burakkutlu.com',
      jobTitle: 'Software Engineer',
      sameAs: [
        'https://github.com/burakkutlu27',
        'https://www.linkedin.com/in/brkktl/',
      ],
    },
    {
      '@type': 'FAQPage',
      '@id': 'https://whodat.burakkutlu.com/#faq',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'KimBu (Ben Kimim) oyunu nasıl oynanır?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "KimBu, arkadaşlarınızla online bir oda kurarak veya 6 haneli kodla bir odaya katılarak oynanan bir ünlü tahmin oyunudur. Her oyuncu diğer oyuncular için gizli isimler belirler. Sırası gelen oyuncu 'Evet / Hayır' şeklinde cevaplanabilecek sorular sorarak kendi alnındaki gizli ismi tahmin etmeye çalışır.",
          },
        },
        {
          '@type': 'Question',
          name: 'KimBu oyunu ücretsiz mi?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Evet, KimBu tamamen ücretsizdir. Herhangi bir üyelik, kayıt veya uygulama indirme gerektirmeden tarayıcınızdan doğrudan oynayabilirsiniz.',
          },
        },
        {
          '@type': 'Question',
          name: 'Kaç kişiyle oynanabilir ve hangi oyun modları vardır?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: "KimBu en az 2 kişiyle oynanabilir. Klasik (3 Can), Hız Modu (3 Tur), Israrcı (10 Soru) ve Ortak Hedef (Hakemli) olmak üzere 4 farklı oyun modu ve 7.450'den fazla isim içeren zengin bir veri tabanı bulunmaktadır.",
          },
        },
        {
          '@type': 'Question',
          name: 'Sesli iletişim şart mı?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Hayır. Sesli iletişimin yanı sıra Tam Metin (Yazılı) modu ile hazır soru kalıpları ve 15 saniyelik oylama sistemiyle tamamen sessiz ve uzaktan da oynayabilirsiniz.',
          },
        },
      ],
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="tr" className={`${caveat.variable} ${nunito.variable} ${mono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdStructuredData) }}
        />
      </head>
      <body className="bg-paper-bg font-sans text-ink antialiased">
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}

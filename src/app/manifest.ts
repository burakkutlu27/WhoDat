import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    // Kalıcı kimlik: start_url ileride değişse de yüklü uygulama aynı uygulama sayılır.
    id: '/',
    name: 'KimBu - Online Ben Kimim & Ünlü Tahmin Oyunu',
    short_name: 'KimBu',
    description:
      'Arkadaşlarınla online oda kur, gizli isimler belirle ve sorular sorarak kimliğini tahmin et!',
    lang: 'tr',
    dir: 'ltr',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    orientation: 'portrait',
    categories: ['games', 'entertainment'],
    background_color: '#F5F0E8',
    theme_color: '#F5F0E8',
    icons: [
      { src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
      { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icons/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  }
}

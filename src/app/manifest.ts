import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'KimBu - Online Ben Kimim & Ünlü Tahmin Oyunu',
    short_name: 'KimBu',
    description:
      'Arkadaşlarınla online oda kur, gizli isimler belirle ve sorular sorarak kimliğini tahmin et!',
    start_url: '/',
    display: 'standalone',
    background_color: '#F5F0E8',
    theme_color: '#D94F3D',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  }
}

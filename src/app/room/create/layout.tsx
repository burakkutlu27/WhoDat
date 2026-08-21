import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Yeni Oyun Odası Aç',
  description:
    'KimBu ile yeni bir oyun odası kur, oyun modunu ve zorluk seviyesini seç, 6 haneli kodla arkadaşlarını davet et!',
  alternates: {
    canonical: '/room/create',
  },
  openGraph: {
    title: 'Yeni Oyun Odası Aç | KimBu',
    description: 'KimBu ile yeni bir oyun odası kur ve arkadaşlarını davet et!',
    url: 'https://whodat.burakkutlu.com/room/create',
  },
}

export default function CreateRoomLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

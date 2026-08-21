import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Odaya Katıl',
  description:
    'Arkadaşının paylaştığı 6 haneli oda kodunu ve takma adını girerek anında KimBu oyun odasına katıl!',
  alternates: {
    canonical: '/room/join',
  },
  openGraph: {
    title: 'Odaya Katıl | KimBu',
    description: '6 haneli oda koduyla KimBu oyun odasına katıl!',
    url: 'https://whodat.burakkutlu.com/room/join',
  },
}

export default function JoinRoomLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}

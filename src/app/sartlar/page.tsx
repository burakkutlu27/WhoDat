import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Hizmet Şartları ve Kullanım Koşulları',
  description: 'KimBu web sitesi ve mobil uygulaması kullanım koşulları ve hizmet şartları.',
  alternates: { canonical: '/sartlar' },
}

const LAST_UPDATED = '10 Kasım 2026'

/**
 * Hizmet Şartları (Terms of Service)
 * Google Play Console ve AB DSA mevzuatı için resmi şartlar sayfası.
 */
export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <article className="paper-card-lg space-y-6 p-6 sm:p-10 font-sans text-ink leading-relaxed">
        <header>
          <h1 className="font-display text-4xl font-bold">Hizmet Şartları ve Kullanım Koşulları</h1>
          <p className="mt-1 text-sm text-ink-faded">Son güncelleme: {LAST_UPDATED}</p>
          <p className="mt-4">
            KimBu (&quot;Uygulama&quot; veya &quot;Hizmet&quot;), arkadaşlarla veya botlara karşı oynanan bir
            &quot;Ben Kimim?&quot; tahmin oyunudur. Bu Hizmet Şartları, <strong>whodat.burakkutlu.com</strong> web sitesi
            ve KimBu Android mobil uygulaması için geçerlidir. Hizmeti kullanarak bu şartları kabul etmiş sayılırsınız.
          </p>
        </header>

        <section className="space-y-2">
          <h2 className="font-display text-2xl font-bold">1. Hizmetin Niteliği ve Kullanımı</h2>
          <p>
            KimBu, kullanıcılara eğlence amacıyla sunulan ücretsiz bir kelime/tahmin oyunudur. Hizmet &quot;olduğu gibi&quot;
            (as-is) sağlanmakta olup, kesintisiz veya tamamen hatasız olacağı taahhüt edilmez. Geliştirici,
            hizmet özelliklerini önceden bildirmeksizin değiştirme, güncelleme veya sonlandırma hakkını saklı tutar.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-2xl font-bold">2. Kullanıcı Davranış Kuralları</h2>
          <p>Oyuncuların güvenli ve saygılı bir ortamda vakit geçirmesi esastır. Aşağıdaki eylemler yasaktır:</p>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              Oda adı, oyuncu takma adı veya isim önerilerinde küfür, hakaret, tehdit, nefret söylemi,
              müstehcenlik veya taciz içeren ifadeler kullanmak.
            </li>
            <li>
              Sistemi kasıtlı olarak yavaşlatacak veya sunucu kaynaklarını tüketecek otomatik sorgular (bot, spam oda açma) göndermek.
            </li>
            <li>
              Uygulama veya web sitesi kaynak kodlarına zarar vermeye, tersine mühendislik yapmaya veya güvenlik mekanizmalarını aşmaya çalışmak.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-2xl font-bold">3. Fikri Mülkiyet</h2>
          <p>
            KimBu&apos;nun tasarımı, kodları, logosu, ses efektleri ve marka unsurları geliştiricisine aittir.
            Oyunda tahmin kartı veya soru bankası olarak kullanılan kişi adları, popüler kültür ve tarihsel
            karakterler yalnızca genel bilgi, tanıma ve eğlence bağlamında referans verilmektedir; adı geçen
            kişi veya kurumsal markalarla doğrudan bir ticari bağ veya sponsorluk ilişkisi bulunmamaktadır.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-2xl font-bold">4. Reklamlar ve Üçüncü Taraf Hizmetleri</h2>
          <p>
            KimBu Android uygulaması, oyun deneyimini ücretsiz sunabilmek amacıyla maç sonlarında
            <strong> Google AdMob</strong> aracılığıyla reklam gösterir. Reklam sağlayıcıların ve üçüncü taraf
            bağlantılarının içeriği kendi sorumluluklarındadır. Gizlilik uygulamaları için lütfen{' '}
            <Link href="/gizlilik" className="font-bold text-pencil-red underline">
              Gizlilik Politikamızı
            </Link>{' '}
            inceleyin.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-2xl font-bold">5. Sorumluluğun Sınırlandırılması</h2>
          <p>
            Geliştirici; teknik aksaklıklar, bağlantı kopmaları, sunucu bakım dönemleri veya oyuncular
            tarafından girilen takma adlardan/içeriklerden kaynaklanabilecek dolaylı ya da doğrudan zararlardan
            yasal mevzuatın izin verdiği azami ölçüde sorumlu tutulamaz.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-2xl font-bold">6. İletişim ve Destek</h2>
          <p>
            Hizmet Şartları veya tüketici hakları ile ilgili her türlü soru ve bildiriminiz için{' '}
            <a href="https://burakkutlu.com" className="font-bold text-pencil-red underline" rel="noopener">
              burakkutlu.com
            </a>{' '}
            üzerindeki iletişim kanallarını kullanabilirsiniz.
          </p>
        </section>

        <footer className="border-t border-dashed border-paper-border pt-4 flex items-center gap-3 text-sm font-bold text-pencil-red">
          <Link href="/" className="underline">
            ← Ana sayfaya dön
          </Link>
          <span className="text-ink-faded font-normal">•</span>
          <Link href="/gizlilik" className="underline">
            Gizlilik Politikası
          </Link>
        </footer>
      </article>
    </main>
  )
}


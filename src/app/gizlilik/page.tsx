import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Gizlilik Politikası',
  description: 'KimBu web sitesi ve mobil uygulamasının hangi verileri neden işlediği.',
  alternates: { canonical: '/gizlilik' },
}

const LAST_UPDATED = '1 Ekim 2026'

/**
 * Gizlilik politikası — Google Play her uygulama için bir URL istiyor.
 * Yalnızca kodda gerçekten işlenen verileri anlatır; giriş/reklam eklenince güncellenmeli.
 */
export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <article className="paper-card-lg space-y-6 p-6 sm:p-10 font-sans text-ink leading-relaxed">
        <header>
          <h1 className="font-display text-4xl font-bold">Gizlilik Politikası</h1>
          <p className="mt-1 text-sm text-ink-faded">Son güncelleme: {LAST_UPDATED}</p>
          <p className="mt-4">
            KimBu, arkadaşlarla oynanan bir &quot;Ben Kimim?&quot; tahmin oyunudur. Bu sayfa, web sitesi
            (whodat.burakkutlu.com) ve Android uygulaması için hangi verilerin neden işlendiğini anlatır.
            Hesap açmak gerekmez; oyun e-posta, telefon numarası veya gerçek ad istemez.
          </p>
        </header>

        <section className="space-y-2">
          <h2 className="font-display text-2xl font-bold">İşlenen veriler</h2>
          <ul className="list-disc space-y-1.5 pl-5">
            <li>
              <strong>Takma ad:</strong> Oda kurarken veya katılırken yazdığınız ad, odadaki diğer oyunculara gösterilir.
            </li>
            <li>
              <strong>Oyun içi içerik:</strong> Havuza eklediğiniz ünlü isimleri, sorduğunuz sorular, verdiğiniz oylar
              ve tahminler oyunun çalışması için sunucuda tutulur.
            </li>
            <li>
              <strong>Cihaz kimliği:</strong> Tarayıcınızda/uygulamada rastgele üretilen bir kimlik
              (<code>kimbu_device_id</code>) saklanır. &quot;İstatistiklerim&quot; ekranındaki maç geçmişi, puan ve
              derecelerin bu cihazla eşleşmesi için kullanılır. Kişisel bir bilgiden türetilmez.
            </li>
            <li>
              <strong>Oturum çerezi:</strong> Oyunun sizi odadaki oyuncu olarak tanıması için zorunlu, 12 saat geçerli
              bir çerez (<code>kimbu_session</code>). Reklam veya takip amacıyla kullanılmaz.
            </li>
            <li>
              <strong>İsim önerileri:</strong> &quot;İsim Öner&quot; ile gönderdiğiniz isim, kategori, isteğe bağlı not ve isteğe bağlı olarak yazdığınız öneren adı.
            </li>
            <li>
              <strong>Teknik veriler:</strong> Kötüye kullanımı (ör. çok hızlı oda açma) önlemek için IP adresi geçici
              olarak kullanılır; barındırma sağlayıcısı standart sunucu kayıtları tutabilir.
            </li>
            <li>
              <strong>Tercihler:</strong> Açık/koyu tema seçimi yalnızca cihazınızda saklanır.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-2xl font-bold">Kullanmadıklarımız</h2>
          <p>
            Şu anda reklam, kullanıcı hesabı veya analitik/takip aracı yoktur. Konum, kamera, mikrofon ve kişiler
            gibi cihaz izinleri istenmez. Uygulama yalnızca davet paylaşımı için sistemin paylaşım menüsünü ve
            sıranız geldiğinde titreşimi kullanır. Bunlardan biri değişirse (ör. isteğe bağlı Google ile giriş veya
            reklam eklenirse) bu sayfa önceden güncellenir.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-2xl font-bold">Hizmet sağlayıcılar</h2>
          <p>
            Veriler <strong>Supabase</strong> (veritabanı) ve <strong>Vercel</strong> (barındırma) altyapısında
            işlenir. Veriler satılmaz ve reklam amacıyla üçüncü kişilerle paylaşılmaz.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-2xl font-bold">Saklama süresi</h2>
          <p>
            Bir saat boyunca kullanılmayan odalar otomatik kapatılır. Kapanan odaların ve istatistiklerin kayıtları
            teknik nedenlerle bir süre saklanabilir; silinmelerini istediğiniz zaman talep edebilirsiniz. Cihaz
            kimliğinizi tarayıcı verilerini veya uygulama verilerini temizleyerek kendiniz de sıfırlayabilirsiniz.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-2xl font-bold">Çocuklar</h2>
          <p>KimBu 13 yaş altındaki çocuklara yönelik değildir.</p>
        </section>

        <section className="space-y-2">
          <h2 className="font-display text-2xl font-bold">Haklarınız ve iletişim</h2>
          <p>
            6698 sayılı KVKK kapsamında verilerinize erişme, düzeltilmesini veya silinmesini isteme haklarınız vardır.
            Talepleriniz için{' '}
            <a href="https://burakkutlu.com" className="font-bold text-pencil-red underline" rel="noopener">
              burakkutlu.com
            </a>{' '}
            üzerindeki iletişim kanallarını kullanabilirsiniz.
          </p>
        </section>

        <footer className="border-t border-dashed border-paper-border pt-4">
          <Link href="/" className="font-display text-lg font-bold text-pencil-red underline">
            ← Ana sayfaya dön
          </Link>
        </footer>
      </article>
    </main>
  )
}

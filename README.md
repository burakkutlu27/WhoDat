# KimBu

Ben Kimim? (Who Am I?) parti oyununun Next.js ve Supabase ile geliştirilmiş online çok oyunculu sürümü.

## Oyuna Hızlı Bakış

Oyuncular 6 haneli oda koduyla aynı lobiye katılır, gizli isim havuzuna 3 karakter ekler ve sırayla evet/hayır soruları sorarak kendi kimliklerini tahmin etmeye çalışır.

## Özellikler

- **Çok Oyunculu Oda Yönetimi:** 6 haneli kod ile oda açma, odaya katılma ve canlı oyuncu lobisi.
- **İsim Havuzu & Dağıtım:** Her oyuncunun eklediği isimleri çakışmasız biçimde oyunculara dağıtan sunucu mantığı.
- **Sıra & Tur Yönetimi:** Sorular sorarak tahmin etme, pas geçme ve canlı skor güncellemeleri.
- **Duyarlı Tasarım & Animasyonlar:** Koyu tema ağırlıklı arayüz, `motion` ile mikro-etkileşimler (yanlış tahminde sarsılma, sıra efektleri).

## Teknoloji Yığını

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, `motion` (Framer Motion)
- **Backend & Veritabanı:** Supabase (PostgreSQL), Service Role Client, HMAC imzalı oturum çerezleri
- **Test:** Vitest (68 birim ve API testi)

## Geliştirme ve Kurulum

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

2. `.env.local` dosyasını oluşturup veritabanı anahtarlarını tanımlayın:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   SESSION_SECRET=your-32-byte-secret-key
   ```

3. Dev sunucuyu çalıştırın:
   ```bash
   npm run dev
   ```

## Çalıştırma Komutları

- `npm run dev`: Geliştirme sunucusunu başlatır (`localhost:3000`).
- `npm run build`: Production derlemesini alır.
- `npm run typecheck`: TypeScript tip denetimini çalıştırır.
- `npm run test`: Vitest test takımını çalıştırır.
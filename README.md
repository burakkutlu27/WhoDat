# KimBu (v2.0)

**Ben Kimim? (Who Am I?)** parti ve masa oyununun Next.js ve Supabase ile geliştirilmiş online çok oyunculu sürümü.

---

## Oyuna Hızlı Bakış

Oyuncular 6 haneli oda koduyla aynı lobiye katılır, gizli isim havuzuna 3 karakter ekler ve sırayla evet/hayır soruları sorarak kendi kimliklerini tahmin etmeye çalışır.

---

## Özellikler & Oyun Mantığı

- **Çok Oyunculu Oda Yönetimi:** 6 haneli kod ile hızlı oda açma, odaya katılma, kopyalanabilir oda kodları ve canlı oyuncu lobisi.
- **İsim Havuzu & Dağıtım:** Her oyuncunun eklediği isimleri çakışmasız biçimde oyunculara dağıtan yetkili (authoritative) sunucu mantığı.
- **Toplam Can Hakkı Sistemi (v2.0):**
  - Her oyuncunun tüm oyun (maç) boyunca toplam **3 Can Hakkı** bulunur.
  - Yanlış tahmin yapıldığında 1 can eksilir ve sıra **otomatik olarak** bir sonraki oyuncuya geçer.
  - Skor Tablosunda ve Oyun Arenasında tüm oyuncuların kalan canlı kalpleri (`Heart` ikonları) anlık ve senkronize biçimde gösterilir.
  - Tüm canları biten oyuncu elenir.
- **Sıra & Tur Yönetimi:** Sorular sorarak tahmin etme, pas geçme, otomatik sıra aktarımı ve canlı skor tablosu güncellemeleri.
- **Kopyalanabilir Oda Kodu (v2.0):** Hem Bekleme Lobisinde hem de Oyun Bitiş (Skor) Ekranında tek tıkla kopyalanabilir oda kodu ve kopyalandı bildirimi.
- **Özgün Kağıt/Tahta Oyunu Tasarımı (v2.0):** Jenerik AI/SaaS şablonlarından uzak; analog, sıcak, masada arkadaşlarınla kağıt üzerinde oynuyormuş hissi veren özgün tasarım dili.

---

## Tasarım & UI Konsepti (v2.0)

Uygulamanın tüm arayüzü sıradan dijital/dashboard kalıplarından arındırılarak parti ve masa oyunu ruhunu yansıtacak şekilde yenilenmiştir:

- 🎨 **Kağıt & Masa Oyunu Estetiği:** Sıcak krem/kraft kağıt tonları (`#F5F0E8` / `#1A1814`), organik/düzensiz el çizimi kenarlar (`hand-drawn border-radius`) ve arka planda hafif kağıt dokusu (grain/noise).
- 🖋️ **Renkli Kalem Paleti & Vurgular:** Kırmızı kalem (`#D94F3D`), yeşil kalem (`#2B7A78`) ve sarı fosforlu kalem highlight/marker çizgileri.
- ✍️ **Tipografi:** Başlıklarda ve vurucu alanlarda samimi/oyunsu **Caveat** el yazısı fontu, gövde metinlerinde ise yuvarlak ve okunabilir **Nunito**.
- 📌 **Post-it & Not Kağıdı Öğeleri:** Örnek oyuncu isimleri, gizli kartlar ve versiyon rozeti yapışkan not kağıtları (post-it) ve çizgili not defteri sayfaları şeklinde tasarlandı.
- ✨ **Profesyonel İkonlar & Animasyonlar (v2.0):**
  - AI hissiyatı veren ham emojiler temizlendi; yerlerine tema renkleriyle uyumlu **Lucide SVG İkonları** (`Pencil`, `KeyRound`, `Heart`, `Trophy`, `Crown`, `Medal` vb.) entegre edildi.
  - Yüzen arka plan kağıt ikonları (`FloatingDoodles`), patlayan kağıt konfetileri (`Confetti`), zarftan çıkan gizli kart (`envelopeOpen`) ve şampiyon kupa zıplaması (`trophyBounce`) animasyonları eklendi.
- 🌓 **Varsayılan Dark Mode & Esnek Tema:** Gece parti ortamlarına uygun koyu kağıt teması varsayılan yapıldı, istendiğinde açık renge geçiş desteği korundu.

---

## Teknoloji Yığını

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, `motion` (Framer Motion), `lucide-react`
- **Tipografi:** Google Fonts (`Caveat`, `Nunito`, `JetBrains Mono`)
- **Backend & Veritabanı:** Supabase (PostgreSQL), Service Role Client, HMAC imzalı oturum çerezleri, Supabase Realtime
- **Test:** Vitest (68 birim ve API testi)

---

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

3. Geliştirme sunucusunu çalıştırın:
   ```bash
   npm run dev
   ```

---

## Çalıştırma Komutları

- `npm run dev`: Geliştirme sunucusunu başlatır (`localhost:3000`).
- `npm run build`: Production derlemesini alır.
- `npm run typecheck`: TypeScript tip denetimini çalıştırır.
- `npm run test`: Vitest test takımını çalıştırır (68 test).
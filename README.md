# KimBu (v3.1)

**Ben Kimim? (Who Am I?)** parti ve masa oyununun Next.js ve Supabase ile geliştirilmiş online çok oyunculu sürümü.

---

## Oyuna Hızlı Bakış

Oyuncular 6 haneli oda koduyla aynı lobiye katılır, seçilen oyun moduna göre gizli isimleri belirler (veya **4.955+ isimlik zengin veritabanından** otomatik/öneriyle seçer) ve arkadaşlarına evet/hayır soruları sorarak gizli kimlikleri tahmin etmeye çalışır.

---

## 🌟 Öne Çıkan Yeni Özellikler (v3.1)

### 🎭 4.955+ Doğrulanmış Yerel Ünlü/Karakter Veritabanı
Oyun sırasında hiçbir dış API bağımlılığı olmadan, sıfır gecikmeyle çalışan 5 ana kategoride devasa yerel isim havuzu:
- 🎭 **Ünlüler (2.056 İsim):** Türk ve dünya sinema/dizi oyuncuları, müzisyenler, komedyenler, popüler sanatçılar.
- ⚽ **Sporcular (1.481 İsim):** Süper Lig & milli takım futbolcuları, NBA yıldızları, Filenin Sultanları, Olimpiyat şampiyonları, F1 pilotları.
- 🏛️ **Tarihi Kişiler & Bilim (980 İsim):** Padişahlar, devlet büyükleri, filozoflar, mucitler, Nobel ödüllü bilim insanları.
- 🎨 **Çizgi Karakterler & Oyun (282 İsim):** Disney, Marvel, DC, anime kahramanları ve efsane video oyun ikonları.
- 🎬 **Dizi & Film Karakterleri (156 İsim):** Kurtlar Vadisi, Ezel, Aşk-ı Memnu, Harry Potter, Yüzüklerin Efendisi, Star Wars, Breaking Bad, Peaky Blinders karakterleri.

### 🔍 Canlı Otomatik Tamamlama (Autocomplete)
- Lobi ekranında isim yazmaya başladığınızda (2+ harf) açılan kağıt tasarımlı açılır menü.
- Kategori rozetleri ve klavye/fare ile hızlı seçim.

### 🎲 "Fikir mi lazım?" Öneri Kartları
- Post-it notu şeklinde kategori filtreli tıklanabilir öneri butonları.
- **Yenile 🔄:** Anında yeni rastgele kartlar getirir.
- **Rastgele Doldur ⚡:** Kalan boş isim kutularını tek tıkla seçili kategoriden benzersiz isimlerle doldurur.

### ⚡ Hızlı Başlat (Oda Sahibi Tek Tıkla Dağıtsın)
- Oyuncuların tek tek isim yazmasını beklemeden, oda sahibinin kategori seçerek tüm oyunculara sistemden 3'er benzersiz isim atamasını veya Ortak Hedef modunda tek bir gizli hedef belirlemesini sağlayan Gartic.io tarzı hızlı başlatma modu.

---

## Oyun Modları

Oda kurulurken veya lobide oda sahibi tarafından 4 farklı oyun modu seçilebilir:

### 1. Ortak Hedef Modu — "Herkes Aynı Kişiyi Bilmeye Çalışır"
- **Hakem Rolü:** Oda sahibi hakemdir. Tur başında gizli hedefi belirler (veya sistemden rastgele seçtirir) ve diğer oyuncuların sorularını **Evet / Hayır / Belirsiz** olarak yanıtlar.
- **Gizlilik Güvencesi:** Gizli hedef tur sırasında yarışmacılara asla sızdırılmaz; sadece hakeme görünür ve doğru tahmin edildiğinde herkese açılır.
- **Soru Rotasyonu:** Yarışmacılar sırayla hakeme tek bir evet/hayır sorusu sorar; hakem yanıtladığında soru canlı not defterine eklenir ve sıra sonraki yarışmacıya geçer.
- **Tahmin / Buzzer Mekaniği:** Yarışmacılar soru sıralarını beklemeden istedikleri an tahminde bulunabilir.
  - Doğru tahmin: **+100 Puan** kazandırır, hedef açılır ve tur tamamlanır.
  - Yanlış tahmin: Oyuncunun bir sonraki soru sorma sırasını atlatır (ceza), ancak tahmin hakkı devam eder.
- **3 Tur Akışı:** Hakem her tur yeni bir gizli hedef belirler; 3 turun sonunda en çok puanı toplayan yarışmacı kazanır.

### 2. Hız Modu — "Az Soru, Çok Puan"
- **Puanlama Sistemi:** Bir oyuncu gizli kimliğini ne kadar az soru ile bilirse o kadar çok puan alır.
  - Formül: `Puan = max(100 - (Soru Sayısı × 5), 0)`
  - 0 soru (ilk tahminde bilme): **100 Puan**
  - 1 soru: **95 Puan** ... 19 soru: **5 Puan** | 20 soru limiti: **0 Puan**.
- **Can Hakkı Yok:** Yanlış tahmin oyuncuyu elemez; her soru veya yanlış tahmin o turdaki soru sayacını 1 artırır.
- **3 Tur Mücadelesi:** Oyun 3 tur sürer. Her turda oyunculara isim havuzundan **daha önce hiç atanmamış yepyeni gizli isimler** dağıtılır.
- **Tur Geçiş & Özet Modalı:** Her tur bittiğinde ekranda o turun skor özeti çıkar ve yeni tur başlar.
- **Tur Kırılımlı Skor Tablosu:** Oyun sonunda ve oyun içi skor tablosunda her turun puanı (`T1`, `T2`, `T3`) ve genel toplam listelenir.

### 3. Israrcı Mod — "Bilene Kadar Sor" (Sürekli Soru)
- **Kesintisiz Sıra:** Oyuncunun sırası soru sorduğunda veya yanlış tahmin yaptığında diğer oyuncuya geçmez; oyuncu ismini çözene kadar sıra kendisinde kalır.
- **Soru Bütçesi & Can:** Her oyuncunun **10 Soru Bütçesi** ve **3 Can Hakkı** bulunur.
- **Puanlama Sistemi:** Kalan soru bütçesine göre puan kazanılır: `Puan = Kalan Soru Bütçesi × 10` (En fazla 100 Puan).
- **Sıra Devir Koşulları:** Sıra ancak oyuncu ismini doğru bildiğinde, 10 soru bütçesini tükettiğinde veya 3 canı bittiğinde sonraki oyuncuya geçer.

### 4. Klasik Mod — "Hayatta Kalma"
- Her oyuncunun tüm maç boyunca toplam **3 Can Hakkı** bulunur.
- Yanlış tahmin yapıldığında 1 can eksilir ve sıra otomatik olarak sonraki oyuncuya geçer.
- Canları tükenen oyuncu elenir; doğru bilenler puan kazanır ve son isim bulunana kadar oyun devam eder.

---

## Özellikler & Oyun Mimarisi

- **Çok Oyunculu Oda Yönetimi:** 6 haneli kod ile hızlı oda açma, odaya katılma, kopyalanabilir oda kodları ve canlı oyuncu lobisi.
- **Tekil & Yetkili (Authoritative) Sunucu Mantığı:** Eşleştirme, gizli isim dağıtımı, soru rotasyonu, soru sayacı ve puanlama sunucu tarafında doğrulanır.
- **Turlar Boyunca Benzersiz İsim Dağıtımı:** Hız Modu'nda 3 tur boyunca hiçbir oyuncuya aynı isim iki kez atanmaz veya kendi yazdığı isim verilmez.
- **Güvenli Oturumlar:** HMAC imzalı HTTP-only çerezler ile oyuncu kimlik doğrulaması.
- **Canlı Senkronizasyon:** Supabase Realtime WebSocket bildirimleri + aralıklı emniyet polling mekanizması.
- **Özgün Kağıt/Tahta Oyunu Tasarımı:** Analog, samimi kraft/koyu kağıt paleti, el çizimi kenarlıklar, post-it kartları ve zarif Lucide SVG ikonları.

---

## Tasarım & UI Konsepti

- **Kağıt & Masa Oyunu Estetiği:** Sıcak kraft/koyu kağıt tonları (`#F5F0E8` / `#1A1814`), organik el çizimi kenarlıklar (`hand-drawn border-radius`) ve hafif kağıt dokusu.
- **Renkli Kalem Paleti & Vurgular:** Kırmızı kalem (`#D94F3D`), yeşil kalem (`#2B7A78`), mavi kalem (`#2E6B9E`) ve sarı fosforlu kalem vurguları.
- **Tipografi:** Başlıklarda sıcak ve oyunsu **Caveat** el yazısı fontu, içeriklerde yuvarlak ve net **Nunito**, kod ve etiketlerde **JetBrains Mono**.
- **Mikro-Animasyonlar & Efektler:** Konfeti patlaması (`Confetti`), kupa/madalya rozetleri, interaktif kart çevirme ve sıra animasyonları.

---

## Teknoloji Yığını

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, `motion` (Framer Motion), `lucide-react`
- **Tipografi:** Google Fonts (`Caveat`, `Nunito`, `JetBrains Mono`)
- **Backend & Veritabanı:** Supabase (PostgreSQL), Service Role Client, HMAC imzalı oturum çerezleri, Supabase Realtime
- **Test:** Vitest (103 kapsamlı birim, motor, arama ve API testi)

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
- `npm run lint`: ESLint kod kalitesi kontrolünü çalıştırır.
- `npm run test`: Vitest test takımını çalıştırır (103 test).
- `node scripts/fetch-wikidata-seed.mjs`: Wikipedia açık veri setinden yerel veritabanını günceller.
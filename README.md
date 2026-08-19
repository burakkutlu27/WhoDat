# KimBu (v3.7)

**Ben Kimim? (Who Am I?)** parti ve masa oyununun Next.js ve Supabase ile geliştirilmiş çok oyunculu çevrimiçi sürümü.

---

## Proje Özeti

Oyuncular 6 haneli oda koduyla aynı lobiye katılır, seçilen oyun moduna, kategoriye ve zorluk seviyesine göre gizli isimleri belirler (veya **7.451+ isimlik** zengin yerel veri havuzundan otomatik atamayla seçer) ve arkadaşlarına sırayla evet/hayır soruları sorarak gizli kimlikleri tahmin etmeye çalışır.

---

## Sürüm Geçmişi & Öne Çıkan Özellikler

### v3.7 — Zorluk Seviyesi Seçimi (Kolay / Orta / Zor) & Veri Filtreleme
- **3 Sabit Zorluk Seviyesi:**
  - **Kolay (Tier 1-2):** En popüler ve herkesin bildiği isimler. Rahat ve eğlenceli parti oyunları için ideal.
  - **Orta (Tier 1-3 - Varsayılan):** Popüler ve bilinen dengeli isim havuzu. Standart WhoDat deneyimi.
  - **Zor (Tier 1-5):** Tüm isim havuzu (niş, detaylı karakterler ve yan figürler dahil). Gerçek ustalar için!
- **Kusursuz Lobi & Havuz Entegrasyonu:**
  - **Lobi Kurulum Seçimi:** Host oda kurarken zorluk seviyesini tek tıkla seçer.
  - **Otomatik İsim Atama:** Seçilen zorluk seviyesine göre oyunculara veya ortak hedefe uygun `fameTier` sınırlarında isim dağıtılır.
  - **"Fikir Ver" ve Arama Filtresi:** `NameSuggestions` kartları ve `FamousPersonAutocompleteInput` arama sonuçları odanın zorluk seviyesine göre dinamik olarak filtrelenir.
  - **3 Fazlı Karışık Lobi Uyumu:** Çoklu faz geçişlerinde odanın zorluk seviyesi tüm fazlar boyunca korunur.
- **143 Birim & Entegrasyon Testi:** %100 yeşil test güvencesi.

### v3.6 — Kapsamlı Veri Havuzu & Topluluk İsim Öneri Sistemi
- **Topluluk İsim Öneri Sistemi (Community Suggestions):**
  - **Arama Esnasında Akıllı Keşif:** Lobi veya hedef ekranında aranan isim veri havuzunda çıkmadığında (0 sonuç) ya da listenin en altında doğrudan `"..." İsmini Havuza Öner!` butonu belirir.
  - **Kesintisiz Akış:** Önerilen isim otomatik olarak oyuncunun o anki kutusuna aktarılır ve oyunu aksatmaz.
  - **Paper/Doodle Modalı (`SuggestNameModal`):** 5 ana kategori seçicili, ipucu/açıklama notlu ve konfetili geri bildirim arayüzü.
  - **Lobi, Navbar ve Ana Sayfa Entegrasyonu:** Her ekrandan kolay erişim.
  - **Supabase Moderasyon Tablosu (`name_suggestions`):** Gönderilen öneriler inceleme havuzuna kaydedilir.
- **7.451+ Küratörlü İsim ve Kült Karakter:** 5 ana kategori altında ~45 alt tür/meslek kırılımı ile yapay limitler olmadan, kalite filtrelerinden geçirilmiş zengin havuz:
  - **Ünlüler (2.704 İsim):** Siyasetçiler, yönetmenler, oyuncular, müzisyenler, komedyenler, gazeteci/sunucular, iş insanları, moda tasarımcıları, şef aşçılar, podcast yapımcıları ve sosyal medya fenomenleri (YouTuber, Instagram, TikTok, Twitch yayıncıları).
  - **Tarihi Kişiler & Bilim (1.400 İsim):** Osmanlı padişahları, sadrazamlar ve denizciler, Cumhuriyet liderleri, dünya liderleri, bilim insanları, filozoflar, kaşifler, besteciler, heykeltıraşlar, ressamlar, şair ve yazarlar.
  - **Sporcular (1.913 İsim):** Süper Lig ve dünya futbol efsaneleri, NBA ve Türk basketbolcular, Filenin Sultanları ve dünya voleybolu, boksörler, güreşçiler ve halterciler, tenis şampiyonları, atletler, yüzücüler, F1 ve motor sporları, jimnastikçiler ve olimpik şampiyonlar.
  - **Kurgusal & Çizgi Karakterler (920 İsim):** Yerli çizgi diziler (Rafadan Tayfa, Kral Şakir, Pepee vb.), Disney & Pixar animasyonları, popüler anime kahramanları (Dragon Ball, Naruto, One Piece, Attack on Titan, Death Note vb.), klasik çizgi diziler (Looney Tunes, Scooby-Doo, Tom ve Jerry vb.) ve modern yetişkin çizgi dizileri (Simpsons, Family Guy, Rick and Morty, BoJack Horseman vb.).
  - **Dizi & Film Karakterleri (514 İsim):** Türk dizileri (Yargı, Kızılcık Şerbeti, Muhteşem Yüzyıl, Kurtlar Vadisi, Ezel, Çukur, Aşk-ı Memnu vb.), Türk sineması (Hababam Sınıfı, Yeşilçam, Eşkıya, Vizontele, G.O.R.A vb.), dünya sineması (MCU Marvel, DC, Star Wars, Harry Potter, Yüzüklerin Efendisi, Baba, Matrix vb.) ve dünya dizileri (Friends, Breaking Bad, Game of Thrones, The Office, Stranger Things vb.).
- **5 Seviyeli Ünlülük Sınıflandırması (Fame Tier):**
  - **Tier 1 (Çok Ünlü - 1.168 İsim):** Türkiye ve dünyada neredeyse herkesin anında bildiği dev ikonlar (Atatürk, Tarkan, Cem Yılmaz, Barış Manço, Recep İvedik, Ronaldo, Messi, Batman, MrBeast, Elraenn vb.).
  - **Tier 2 (Ünlü - 1.150 İsim):** Geniş kitlelerce tanınan popüler sanatçılar, sporcular ve kült karakterler (Hadise, Kenan İmirzalıoğlu, Şener Şen, Naim Süleymanoğlu, Walter White, Alperen Şengün vb.).
  - **Tier 3 (Orta Derece - 614 İsim):** Belli bir alan veya dönemi takip edenlerce bilinen figürler (Poyraz Karayel, Nurcan Taylan, İbn-i Sina, Cedi Osman, Pintipanda vb.).
  - **Tier 4 (Az Bilinen - 4.003 İsim):** Daha niş sporcular, yan karakterler ve yerel figürler.
  - **Tier 5 (Nişli - 516 İsim):** Uzmanlık seviyesinde bilgi gerektiren figürler.
- **Yalnızca Popüler İsimlerle Otomatik Atama:** Lobideki *Otomatik İsim Ata* ve *Ortak Hedef* modunda oyunculara **yalnızca Tier 1 ve Tier 2 (en ünlü 2.318 isim)** dağıtılır.

### v3.5 — Cihaz Bazlı Liderlik Tablosu & Kalıcı İstatistikler
- **Hesapsız Kalıcı Kimlik:** Oyuncuların tarayıcısında `localStorage` üzerinde saklanan kalıcı ve görünmez bir cihaz kimliği (`kimbu_device_id`) oluşturulur; e-posta veya kayıt sürtünmesi olmadan tüm oyun geçmişi bu kimliğe işlenir.
- **Otomatik Sonuç Kaydı:** Her oyun bittiğinde (`status = finished`), tüm oyuncuların puanı, derecesi (1., 2., 3.), oynadığı mod ve elenme durumu `game_results` tablosuna otomatik olarak kaydedilir.
- **"İstatistiklerim" Paneli:** Kraft kağıt ve skeç estetiğine uygun interaktif modal:
  - **Toplam Oyun Sayısı**
  - **Toplam Birincilik & Kazanma Oranı (%)**
  - **Elenmeden Bitirilen Oyunlar**
  - **Kişisel En Yüksek Skor**
  - **Son 10 Oyun Geçmişi (Mod, Derece Rozetleri [1./2./3.], Puan ve Tarih)**
- **Her Yerden Hızlı Erişim:** Navbar'daki kupa butonu, ana sayfa ve oyun sonu skor tablosu ekranından tek tıkla istatistikleri görüntüleme.

### v3.4 — Tam Metin / Uzaktan Oyun Modu (Text Mode)
- **Sesli Konuşma Gerektirmez:** Discord veya harici sesli sohbet olmadan, tamamen oyun içi etkileşimle uzaktan oynama imkanı.
- **Hazır Soru Bankası & Canlı Arama:** 15 temel Türkçe soru (Kimlik, Yaşam, Meslek, Sanat, Coğrafya vb.) arasından hızlı filtreleme ve tek tıkla soru sorma.
- **Özel Soru Desteği:** İsteğe bağlı olarak kendi özel sorusunu elle yazıp gönderebilme.
- **15 Saniyelik Canlı Evet / Hayır Oylaması:** Soru sorulduğunda hedef sahibi hariç odadaki tüm oyuncuların ekranında geri sayımlı oylama kartı (`VotingModal`) belirir.
- **Otomatik İpucu Not Defteri (Clue Card):** Oylama sonuçları ("3 Evet, 1 Hayır") çoğunluk rozetleriyle oyuncunun ekranındaki not defterine otomatik ve kronolojik olarak işlenir.
- **Tüm Modlarla Tam Uyum:** Klasik (canlı), Hız (puanlı) ve Israrcı (bütçeli) modların tüm kuralları Tam Metin moduyla senkronize çalışır.

### v3.3 — Kategori Lobisi & 3 Fazlı Karışık Mod
- **Kategoriye Özel Lobi (Tek Kategori Modu):** Oda kurulurken veya lobi bekleme ekranında oda sahibi dilediği konsepti seçebilir.
- **3 Fazlı Karışık Lobi (Multi-Phase Mode):** Oyun 3 aşamalı sıralı bir akışta oynanır (Örn: 1. Faz: Sporcular -> 2. Faz: Çizgi Karakterler -> 3. Faz: Tarihi Kişiler).
- **Kümülatif İlerleme:** Her faz tamamlandığında yeni kategoriden taze isimler dağıtılır; oyuncuların önceki fazlardan kazandığı puanlar ve kalan canları korunur.
- **Faz Geçiş Modalı:** Faz tamamlandığında ara geçiş ekranı açılır ve oyuncuları yeni faza hazırlar.

### v3.2 — Gelişmiş Lobi & İsim Yönetimi
- **Gönderilen İsimleri Düzenleme:** İsimlerini gönderen oyuncular, lobi onay kartındaki **İsimleri Düzenle** butonunu kullanarak oyun başlamadan önce isimlerini geri yükleyebilir ve güncelleyebilir.
- **Kategoriye Duyarlı Öneri ve Otomatik Atama:** Lobide belirli bir kategori seçildiğinde, isim önerileri ve hızlı doldurma fonksiyonları yalnızca seçili kategoriyle filtrelenir.
- **Hibrit Arama Altyapısı:** Supabase veritabanı ile yerel seed verilerini aynı anda tarayan hibrit arama mekanizması.

### v3.1 — Oyun Modları Çeşitliliği (Hız, Israrcı, Ortak Hedef)
- Puanlama temelli Hız Modu, bütçe temelli Israrcı Mod ve hakemli Ortak Hedef modu entegrasyonu.

### v3.0 — Temel Çok Oyunculu Çevrimiçi Altyapı
- Klasik parti oyunu mekaniği, oda oluşturma ve katılma, realtime senkronizasyon, can sistemi ve puan tabloları.

---

## Oyun Modları

Oda kurulurken veya lobide oda sahibi tarafından 4 farklı oyun modu seçilebilir:

### 1. Ortak Hedef Modu
- **Hakem Rolü:** Oda sahibi hakemdir. Tur başında gizli hedefi belirler ve diğer oyuncuların sorularını **Evet / Hayır / Belirsiz** olarak yanıtlar.
- **Gizlilik:** Gizli hedef tur sırasında yarışmacılara gösterilmez; yalnızca hakeme görünür ve doğru tahmin edildiğinde açılır.
- **Soru Rotasyonu:** Yarışmacılar sırayla tek bir soru sorar; hakem yanıtladığında sıra sonraki yarışmacıya geçer.
- **Tahmin (Buzzer):** Yarışmacılar soru sırasını beklemeden istedikleri an tahminde bulunabilir.
  - Doğru tahmin: +100 Puan kazandırır, hedef açılır ve tur biter.
  - Yanlış tahmin: Oyuncunun bir sonraki soru hakkını atlatır (ceza), tahmin hakkı devam eder.
- **Tur Sayısı:** 3 turun sonunda en çok puanı toplayan yarışmacı kazanır.

### 2. Hız Modu
- **Puanlama:** Gizli kimliği az soruyla bilmek yüksek puan kazandırır (`Puan = max(100 - Soru Sayısı * 5, 0)`).
- **Can Kısıtı Yok:** Yanlış tahmin oyuncuyu elemez, soru sayacını 1 artırır.
- **3 Tur Akışı:** 3 tur boyunca her turda daha önce atanmamış yeni gizli isimler dağıtılır.
- **Skor Kırılımı:** Oyun sonunda her turun puanı (T1, T2, T3) ve genel toplam listelenir.

### 3. Israrcı Mod
- **Kesintisiz Sıra:** Soru sorulduğunda veya yanlış tahmin yapıldığında sıra hemen devredilmez; oyuncu ismini bilene kadar sıra kendisinde kalır.
- **Bütçe ve Can:** Her oyuncunun 10 Soru Bütçesi ve 3 Can Hakkı bulunur.
- **Puanlama:** Kalan soru bütçesi üzerinden puan hesaplanır (`Puan = Kalan Soru * 10`).
- **Sıra Devri:** İsim doğru bilindiğinde, soru bütçesi bittiğinde veya 3 can tükendiğinde sıra sonraki oyuncuya geçer.

### 4. Klasik Mod
- Her oyuncunun tüm maç boyunca toplam 3 Can Hakkı bulunur.
- Yanlış tahmin yapıldığında 1 can eksilir ve sıra sonraki oyuncuya geçer.
- Canları tükenen oyuncu elenir; son isim bulunana kadar oyun devam eder.

---

## Mimari ve Güvenlik

- **Yetkili (Authoritative) Sunucu:** Eşleştirme, gizli isim dağıtımı, soru rotasyonu, oylama oturumları, can/bütçe takibi ve puanlama sunucu tarafında doğrulanır.
- **Güvenli Oturumlar:** HMAC imzalı HTTP-only çerezler ile oyuncu kimlik doğrulaması (`session.ts`).
- **Canlı Senkronizasyon:** Supabase Realtime WebSocket bildirimleri ve aralıklı polling mekanizması.
- **Arayüz:** Kraft ve koyu kağıt teması, organik kenarlıklar, modern CustomSelect bileşenleri ve Lucide ikon seti.

---

## Teknoloji Yığını

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, motion (Framer Motion), lucide-react
- **Tipografi:** Google Fonts (Caveat, Nunito, JetBrains Mono)
- **Backend & Veritabanı:** Supabase (PostgreSQL), Service Role Client, HMAC imzalı çerezler, Supabase Realtime
- **Test:** Vitest (143 birim, kural ve entegrasyon testi)

---

## Kurulum ve Çalıştırma

1. Bağımlılıkları yükleyin:
   ```bash
   npm install
   ```

2. `.env.local` dosyasını oluşturup ortam değişkenlerini tanımlayın:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   SESSION_SECRET=your-32-byte-secret-key
   ```

3. Geliştirme sunucusunu başlatın:
   ```bash
   npm run dev
   ```

---

## Komutlar

- `npm run dev`: Geliştirme sunucusunu başlatır (`localhost:3000`).
- `npm run build`: Production derlemesini alır (Turbopack).
- `npm run typecheck`: TypeScript tip denetimini çalıştırır.
- `npm run lint`: ESLint kod kalitesi kontrolünü çalıştırır.
- `npm test`: Vitest test takımını çalıştırır (143 test).
- `node scripts/build-complete-dataset.mjs`: Karakter veri setini derler.
- `node scripts/assign-fame-tiers.mjs`: Ünlülük katsayısı (fameTier) dağıtımını çalıştırır.
- `node scripts/verify-rls.mjs`: Supabase RLS politikalarını doğrular.
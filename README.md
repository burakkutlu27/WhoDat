# KimBu (v3.5)

**Ben Kimim? (Who Am I?)** parti ve masa oyununun Next.js ve Supabase ile geliştirilmiş çok oyunculu çevrimiçi sürümü.

---

## Proje Özeti

Oyuncular 6 haneli oda koduyla aynı lobiye katılır, seçilen oyun moduna ve kategoriye göre gizli isimleri belirler (veya 5.452+ isimlik yerel veri havuzundan otomatik atamayla seçer) ve arkadaşlarına sırayla evet/hayır soruları sorarak gizli kimlikleri tahmin etmeye çalışır.

---

## Öne Çıkan Özellikler (v3.5)

### Cihaz Bazlı Liderlik Tablosu & Kalıcı İstatistikler (v3.5)
- **Hesapsız Kalıcı Kimlik (Seviye 1):** Oyuncuların tarayıcısında `localStorage` üzerinde saklanan kalıcı ve görünmez bir cihaz kimliği (`kimbu_device_id`) oluşturulur; e-posta veya kayıt sürtünmesi olmadan tüm oyun geçmişi bu kimliğe işlenir.
- **Otomatik Sonuç Kaydı:** Her oyun bittiğinde (`status = finished`), tüm oyuncuların puanı, derecesi (1., 2., 3.), oynadığı mod ve elenme durumu `game_results` tablosuna otomatik olarak kaydedilir.
- **"İstatistiklerim" Paneli:** Kraft kağıt ve skeç estetiğine uygun interaktif modal:
  - 🎮 **Toplam Oyun Sayısı**
  - 🏆 **Toplam Birincilik & Kazanma Oranı (%)**
  - 🛡️ **Elenmeden Bitirilen Oyunlar**
  - 🌟 **Kişisel En Yüksek Skor**
  - ⚡ **Son 10 Oyun Geçmişi (Mod, Derece Rozetleri 🥇/🥈/🥉, Puan ve Tarih)**
- **Her Yerden Hızlı Erişim:** Navbar'daki kupa butonu, ana sayfa ve oyun sonu skor tablosu ekranından tek tıkla istatistikleri görüntüleme.

### Ünlülük Katsayısı & Akıllı İsim Öneri Sistemi (Fame Tier)
- **5 Seviyeli Ünlülük Sınıflandırması:** 5.452+ isimlik veri havuzunun tamamı popülerlik ve tanınırlık düzeyine göre etiketlenmiştir:
  - **Tier 1 (Çok Ünlü):** Türkiye ve dünyada neredeyse herkesin bildiği dev ikonlar (Atatürk, Tarkan, Cem Yılmaz, Barış Manço, Recep İvedik, Ronaldo, Messi, Batman vb.).
  - **Tier 2 (Ünlü):** Geniş kitlelerce tanınan popüler sanatçılar, sporcular ve kült karakterler (Hadise, Kenan İmirzalıoğlu, Şener Şen, Naim Süleymanoğlu, Walter White vb.).
  - **Tier 3 (Orta Derece):** Belli bir alan veya dönemi takip edenlerce bilinen figürler (Poyraz Karayel, Nurcan Taylan, İbn-i Sina, Cedi Osman vb.).
  - **Tier 4 (Az Bilinen):** Daha niş sporcular, yan karakterler ve yerel figürler.
  - **Tier 5 (Nişli):** Uzmanlık seviyesinde bilgi gerektiren figürler.
- **Yalnızca Popüler İsimlerle Otomatik Atama:** Lobideki *Otomatik İsim Ata* ve *Ortak Hedef* modunda oyunculara **yalnızca Tier 1 ve Tier 2 (en ünlü ~1.214 isim)** dağıtılır. Böylece oyuncuların hiç tanımadığı isimlerle karşılaşması önlenir.
- **Akıllı ve Dinamik "Fikir Ver" Önerileri:** İsim önerileri önce `fameTier` seviyesine göre sıralanır, aynı seviye içindeki isimler her seferinde karıştırılarak (shuffle) hem popüler hem de değişken öneriler sunulur.
- **Ünlülük Öncelikli Canlı Arama:** Arama kutusunda arama yapıldığında aynı eşleşme kalitesine sahip isimler arasından daha ünlü olanlar otomatik olarak üstte listelenir.

### Tam Metin / Uzaktan Oyun Modu (Text Mode)
- **Sesli Konuşma Gerektirmez:** Discord veya harici sesli sohbet olmadan, tamamen oyun içi etkileşimle uzaktan oynama imkanı.
- **Hazır Soru Bankası & Canlı Arama:** 15 temel Türkçe soru (Kimlik, Yaşam, Meslek, Sanat, Coğrafya vb.) arasından hızlı filtreleme ve tek tıkla soru sorma.
- **Özel Soru Desteği:** İsteğe bağlı olarak kendi özel sorusunu elle yazıp gönderebilme.
- **15 Saniyelik Canlı Evet / Hayır Oylaması:** Soru sorulduğunda hedef sahibi hariç odadaki tüm oyuncuların ekranında geri sayımlı oylama kartı (`VotingModal`) belirir.
- **Otomatik İpucu Not Defteri (Clue Card):** Oylama sonuçları ("3 Evet, 1 Hayır") çoğunluk rozetleriyle oyuncunun ekranındaki not defterine otomatik ve kronolojik olarak işlenir.
- **Tüm Modlarla Tam Uyum:** Klasik (canlı), Hız (puanlı) ve Israrcı (bütçeli) modların tüm kuralları Tam Metin moduyla senkronize çalışır.

### Kategoriye Özel Lobi (Tek Kategori Modu)
- Oda kurulurken veya lobi bekleme ekranında oda sahibi dilediği konsepti seçebilir.
- **Kategoriler:**
  - **Sporcular:** Süper Lig & milli takım futbolcuları, NBA yıldızları, Filenin Sultanları, Olimpiyat şampiyonları, F1 pilotları.
  - **Tarihi Kişiler & Bilim:** Devlet yöneticileri, filozoflar, mucitler, Nobel ödüllü bilim insanları.
  - **Kurgusal & Çizgi Karakterler:** Mitolojik figürler, edebiyat, çizgi roman ve oyun karakterleri.
  - **Ünlüler:** Sinema/dizi oyuncuları, müzisyenler, popüler sanatçılar.
  - **Dizi & Film Karakterleri:** Popüler yerli ve yabancı yapımlardaki kült karakterler.
  - **Tümü (Karışık):** Tüm kategorilerden karma isim havuzu.

### 3 Fazlı Karışık Lobi (Multi-Phase Mode)
- Oyun 3 aşamalı sıralı bir akışta oynanır (Örn: 1. Faz: Sporcular -> 2. Faz: Çizgi Karakterler -> 3. Faz: Tarihi Kişiler).
- **Kümülatif İlerleme:** Her faz tamamlandığında yeni kategoriden taze isimler dağıtılır; oyuncuların önceki fazlardan kazandığı puanlar ve kalan canları korunur.
- **Faz Geçiş Modalı:** Faz tamamlandığında ara geçiş ekranı açılır ve oyuncuları yeni faza hazırlar.

### Gönderilen İsimleri Düzenleme
- İsimlerini gönderen oyuncular, lobi onay kartındaki **İsimleri Düzenle** butonunu kullanarak oyun başlamadan önce isimlerini geri yükleyebilir ve güncelleyebilir.

### Kategoriye Duyarlı Öneri ve Otomatik Atama
- Lobide belirli bir kategori seçildiğinde, isim önerileri ve hızlı doldurma fonksiyonları yalnızca seçili kategoriyle filtrelenir.
- **Hızlı Başlat:** Oda sahibi tek tıkla tüm oyunculara seçili kategoriye uygun benzersiz isimler atayabilir.

### Hibrit Arama Altyapısı
- Supabase veritabanı ile yerel seed verilerini aynı anda tarayan hibrit arama mekanizması.
- Yazılan kelimeyle başlayan eşleşmeleri önceliklendiren akıllı sıralama.

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
- **Test:** Vitest (123 birim, kural ve entegrasyon testi)

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
- `npm test`: Vitest test takımını çalıştırır (123 test).
- `node scripts/build-complete-dataset.mjs`: Karakter veri setini derler.
- `node scripts/assign-fame-tiers.mjs`: Ünlülük katsayısı (fameTier) dağıtımını çalıştırır.
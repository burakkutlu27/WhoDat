# KimBu (v3.3)

**Ben Kimim? (Who Am I?)** parti ve masa oyununun Next.js ve Supabase ile geliştirilmiş çok oyunculu çevrimiçi sürümü.

---

## Proje Özeti

Oyuncular 6 haneli oda koduyla aynı lobiye katılır, seçilen oyun moduna ve kategoriye göre gizli isimleri belirler (veya 5.452+ isimlik yerel veri havuzundan otomatik atamayla seçer) ve arkadaşlarına sırayla evet/hayır soruları sorarak gizli kimlikleri tahmin etmeye çalışır.

---

## Öne Çıkan Özellikler (v3.3)

### 💬 Tam Metin / Uzaktan Oyun Modu (Text Mode)
- **Sesli Konuşma Gerektirmez:** Discord veya harici sesli sohbet olmadan, tamamen oyun içi etkileşimle uzaktan oynama imkanı.
- **Hazır Soru Bankası & Canlı Arama:** 15 temel Türkçe soru (Kimlik, Yaşam, Meslek, Sanat, Coğrafya vb.) arasından hızlı filtreleme ve tek tıkla soru sorma.
- **Özel Soru Desteği:** İsteğe bağlı olarak kendi özel sorusunu elle yazıp gönderebilme.
- **15 Saniyelik Canlı Evet / Hayır Oylaması:** Soru sorulduğunda hedef sahibi hariç odadaki tüm oyuncuların ekranında geri sayımlı oylama kartı (`VotingModal`) belirir.
- **Otomatik İpucu Not Defteri (Clue Card):** Oylama sonuçları ("3 Evet, 1 Hayır") çoğunluk rozetleriyle oyuncunun ekranındaki not defterine otomatik ve kronolojik olarak işlenir.
- **Tüm Modlarla Tam Uyum:** Klasik (canlı), Hız (puanlı) ve Israrcı (bütçeli) modların tüm kuralları Tam Metin moduyla senkronize çalışır.

### 🎭 Kategoriye Özel Lobi (Tek Kategori Modu)
- Oda kurulurken veya lobi bekleme ekranında oda sahibi dilediği konsepti seçebilir.
- **Kategoriler:**
  - **Sporcular:** Süper Lig & milli takım futbolcuları, NBA yıldızları, Filenin Sultanları, Olimpiyat şampiyonları, F1 pilotları.
  - **Tarihi Kişiler & Bilim:** Devlet yöneticileri, filozoflar, mucitler, Nobel ödüllü bilim insanları.
  - **Kurgusal & Çizgi Karakterler:** Mitolojik figürler, edebiyat, çizgi roman ve oyun karakterleri.
  - **Ünlüler:** Sinema/dizi oyuncuları, müzisyenler, popüler sanatçılar.
  - **Dizi & Film Karakterleri:** Popüler yerli ve yabancı yapımlardaki kült karakterler.
  - **Tümü (Karışık):** Tüm kategorilerden karma isim havuzu.

### 🔄 3 Fazlı Karışık Lobi (Multi-Phase Mode)
- Oyun 3 aşamalı sıralı bir akışta oynanır (Örn: 1. Faz: Sporcular -> 2. Faz: Çizgi Karakterler -> 3. Faz: Tarihi Kişiler).
- **Kümülatif İlerleme:** Her faz tamamlandığında yeni kategoriden taze isimler dağıtılır; oyuncuların önceki fazlardan kazandığı puanlar ve kalan canları korunur.
- **Faz Geçiş Modalı:** Faz tamamlandığında ara geçiş ekranı açılır ve oyuncuları yeni faza hazırlar.

### ✏️ Gönderilen İsimleri Düzenleme
- İsimlerini gönderen oyuncular, lobi onay kartındaki **İsimleri Düzenle** butonunu kullanarak oyun başlamadan önce isimlerini geri yükleyebilir ve güncelleyebilir.

### 🎲 Kategoriye Duyarlı Öneri ve Otomatik Atama
- Lobide belirli bir kategori seçildiğinde, isim önerileri ve hızlı doldurma fonksiyonları yalnızca seçili kategoriyle filtrelenir.
- **Hızlı Başlat:** Oda sahibi tek tıkla tüm oyunculara seçili kategoriye uygun benzersiz isimler atayabilir.

### 🔍 Hibrit Arama Altyapısı
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
- **Test:** Vitest (117 birim, kural ve entegrasyon testi)

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
- `npm test`: Vitest test takımını çalıştırır (117 test).
- `node scripts/build-complete-dataset.mjs`: Karakter veri setini derler.
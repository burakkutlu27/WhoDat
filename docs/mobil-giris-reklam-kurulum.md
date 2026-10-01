# Mobil Uygulama, Giriş ve Reklam — Kurulum Adımları

Kod tarafı Claude ile yapılıyor; aşağıdakiler hesap/panel işleri ve senin yapman gerekiyor.
Sırayla ilerle; her bölümün sonunda "hazır olunca Claude'a ver" kısmı var.

---

## 0. Hemen (güvenlik, 2 dk)

1. Supabase → SQL Editor → `supabase/migrations/20261001100000_close_profile_tables.sql` içeriğini çalıştır.
2. `npm run verify:rls` → tüm satırlar PASS olmalı (player_profiles / game_results artık okunamıyor).

Neden: cihaz kimlikleri herkese açıktı; giriş özelliği gelmeden kapanmalı. Sitede görünür bir değişiklik olmaz.

---

## 1. Android Studio ve ilk derleme (~30 dk, çoğu indirme)

1. https://developer.android.com/studio adresinden Android Studio'yu kur (JDK içinde gelir).
2. İlk açılışta "Standard" kurulumu seç (SDK + emülatör iner).
3. Proje klasöründe: `npx cap sync android` ardından `npx cap open android`.
4. Android Studio'da Device Manager → bir Pixel emülatörü oluştur → ▶ Run.
   Uygulama canlı siteyi (whodat.burakkutlu.com) açar.
5. Yerel geliştirme sunucusuyla denemek için: `npm run dev` açıkken
   `set CAP_SERVER_URL=http://<bilgisayarın-yerel-ip>:3100` (PowerShell: `$env:CAP_SERVER_URL=...`)
   sonra `npx cap sync android` ve Run.

Kontrol listesi: açılış ekranı → ana sayfa; lobide "Davet Et" telefonun paylaşım menüsünü açmalı;
sıra sana gelince telefon titremeli; geri tuşu uygulamayı kapatmamalı.

---

## 2. İmzalama anahtarı ve Google Play Console

1. Android Studio → Build → Generate Signed Bundle → Android App Bundle → "Create new" ile anahtar oluştur.
   - Dosyayı repo DIŞINDA sakla (ör. `Belgeler/kimbu-upload.jks`), şifreleri parola yöneticisine yaz.
   - `.jks` / `.keystore` repoya girmez (`.gitignore`'da), yine de proje klasörüne koyma.
   - **Kaybedersen uygulamayı güncelleyemezsin.** Play App Signing açık olursa kurtarılabilir; aç.
2. https://play.google.com/console → geliştirici hesabı (tek seferlik 25$).
3. Yeni uygulama: ad "KimBu", paket adı `com.burakkutlu.kimbu` (değiştirilemez).
4. Gerekli formlar: gizlilik politikası URL'si (Faz 4'te site içine ekleyeceğiz), veri güvenliği,
   içerik derecelendirmesi, **hedef kitle: 13+** (çocuk karakterler yüzünden "çocuklara yönelik" seçme).
5. İlk sürümü "Dahili test" kanalına yükle.

Hazır olunca Claude'a ver: Play App Signing'deki **SHA-256 ve SHA-1 parmak izleri** (Uygulama bütünlüğü sayfası).
Bunlar `https://.../room/join` bağlantılarının uygulamayı açması ve Google girişi için gerekiyor.

---

## 3. Google ile giriş (Faz 4)

1. https://console.cloud.google.com → yeni proje "KimBu".
2. APIs & Services → OAuth consent screen: External, uygulama adı **KimBu**, logo (public/icons/icon-512.png),
   destek e-postası, yetkili alan adı `burakkutlu.com`. Böylece giriş ekranında "KimBu" görünür.
3. Credentials → Create OAuth client ID:
   - **Web application** — Authorized redirect URI: `https://<supabase-proje-ref>.supabase.co/auth/v1/callback`
   - **Android** — paket adı `com.burakkutlu.kimbu` + 2. adımdaki SHA-1 (uygulama içi native giriş için)
4. Supabase → Authentication → Providers → Google: Web client ID ve secret'ı gir, kaydet.
   Authentication → URL Configuration → Site URL: `https://whodat.burakkutlu.com`.

Hazır olunca Claude'a ver: Web client ID (gizli değil). **Client secret'ı sohbete yazma**; yalnızca Supabase paneline girilir.
Sonra: `20261001110000_link_profiles_to_auth_users.sql` migration'ı ve giriş kodu.

---

## 4. Reklam hesapları (Faz 5)

1. **AdMob** (uygulama): https://admob.google.com → uygulama ekle (Android, Play'deki uygulamayı seç) →
   reklam birimleri: 1 banner (lobi/skor), 1 geçiş reklamı (maç sonu). App ID + birim ID'lerini not et.
2. AdMob → Privacy & messaging → **GDPR/KVKK onay mesajı** oluştur (UMP) ve yayınla.
3. **AdSense** (web): https://adsense.google.com → site ekle (whodat.burakkutlu.com). Onay için sitede
   gizlilik politikası ve yeterli içerik gerekir; onay günler sürebilir, erken başvur.
4. AdMob'u Firebase'e bağla (isteğe bağlı, daha iyi raporlar): Firebase konsolu → proje → Android uygulaması
   ekle (`com.burakkutlu.kimbu`) → `google-services.json` indir. Bu dosyayı repoya ekleme; Claude'a konumunu söyle.

Hazır olunca Claude'a ver: AdMob App ID, reklam birim ID'leri, AdSense yayıncı ID'si (`ca-pub-…`). Bunlar gizli değil.

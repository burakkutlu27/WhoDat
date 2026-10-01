# KimBu (WhoDat) — Proje Durumu

## Ne Yapıyor
Çok oyunculu online "Ben Kimim?" tahmin oyunu: oda kodu ile katılım, gizli ünlü ismi evet/hayır soruları ile bulma.
Web (whodat.burakkutlu.com) + PWA + Google Play uygulaması (Capacitor, yayına hazırlık aşamasında). Hedef: reklamla gelir.

## Tech Stack
- Frontend: Next.js 16.3.8 (App Router), React 19, Tailwind 3, motion, lucide-react
- Backend: Next.js route handler'ları (stateless, Vercel), HMAC imzalı httpOnly oturum çerezi (`kimbu_session`)
- Veritabanı: Supabase Postgres + Realtime (yalnızca "değişti" sinyali; veri `/api/rooms/[id]/state`'ten)
- Mobil: PWA (`public/sw.js` yalnızca çevrimdışı sayfası) + Capacitor 8 (`android/`, uzak URL modu, appId `com.burakkutlu.kimbu`)
- Test: Vitest (430), Playwright (masaüstü + `mobile-chrome`; 37 senaryo, ~10 dk; hızlı tur: `--project=chromium`)

## Mimari Özet
- `src/lib/game/engine.ts` (~4.5k satır) yetkili oyun motoru; state senkron bellek Map'lerinde. Serverless için
  `runtimeState.ts` her isteği oda kapsamında çalıştırır (giriş: `room_runtime`'dan yükle, çıkış: sürüm kilidiyle yaz).
  **Yeni bellek store'u → `registerRuntimeStores` listesine eklenmeli.** Tüm `/api/rooms/[id]/*` → `roomRoute()`.
- Gizlilik: `rooms`/`players` anon'a okunur + realtime → oraya sır yazma. Sırlar `names`, `room_runtime`'da (kapalı).
- Botlar `src/lib/game/bot/`: `knowledge.ts` (soru↔özellik), `brain.ts` (saf karar), `runner.ts` (/state okunurken
  tetiklenir; `room_runtime.bot_next_action_at` ile atomik hamle; bot kendi ismini okumaz). Veri:
  `famousPeopleAttributes.ts` (üretilmiş ~940 KB; `node scripts/enrich-attributes.mjs`, önbellek `scripts/.cache/`).
- Takım modu: `teams.ts` (saf) + engine `stateKey()` — takımın can/isim/pas/Hız verisi ilk üyenin anahtarında ortak;
  sıra `loadPlayers` içinde takımlar arası dönüşümlü dizilimle. Takım bilgisi/notlar `room_runtime`'da.
- Native: `src/lib/native.ts` + `components/NativeBridge.tsx` (paylaşım, titreşim, geri tuşu, `kimbu://join/KOD`).
  İkonlar/açılış: `node scripts/generate-icons.mjs` (PWA + Android). Mağaza dosyaları: `store/play/`.

## Şu Anki Durum
- **Tamam:** 4 mod (Klasik, Hız, Israrcı, Ortak Hedef) · Tam Metin/Sesli · 3 fazlı lobi · botlar + "Botlara Karşı Oyna"
  · takım modu (2–3 takım, takım notları, takım sıralaması) · mobil-first düzen · PWA · Capacitor Android projesi
  (ikon, açılış, paylaşım, titreşim, deep link) · gizlilik sayfası (`/gizlilik`) · Play mağaza görselleri ve metinleri.
- **Hiç denenmedi:** Android uygulaması hiç derlenmedi/açılmadı (makinede Android Studio yoktu). Çerez, klavye,
  çentik boşlukları uygulama içinde doğrulanmalı.
- **Eksik:** botlar Ortak Hedef + 3 fazlıda yok · takım modu Israrcı/Ortak Hedef/3 fazlıda yok · giriş/hesap yok ·
  reklam yok · iOS yok · https App Links yok (imza parmak izi gerekiyor; `kimbu://` çalışıyor).
- **Bilinen:** Kurgusal/Türk yapımı karakterlerin ~%30'u Wikidata'da eşleşmedi (bot çekimser kalır). Bot bilmediği
  soruda yazı-tura oy verir. Lint'te 32 eski uyarı (0 hata). Gizlilik sayfasında iletişim e-postası yok.

## Veritabanı Migration Durumu (prod'a kullanıcı uygular: Supabase SQL Editor)
- ✅ Uygulandı: `20260930120000_create_room_runtime`, `20260930140000_add_bot_players`
- ⚠️ **Uygulanmalı (güvenlik):** `20261001100000_close_profile_tables` — cihaz kimlikleri şu an herkese açık.
  Kontrol: `npm run verify:rls` → 11/11 PASS olmalı (uygulanmadan 2'si FAIL verir; beklenen).
- ⏸️ Faz 4 ile: `20261001110000_link_profiles_to_auth_users` (şimdi uygulama).
- Kural: migration'lar ekleyici yazılır ve **kod deploy edilmeden önce** uygulanır.

## Bugüne Kadar Yapılan Revizyon Kararları
- Faz 0 runtime state → `room_runtime` · Faz 1a mobil düzen · 1b PWA · Faz 2 botlar (LLM yok, Wikidata kural tabanlı)
  · Faz 3 takım modu (ortak kimlik) · Faz 1c Capacitor + mağaza hazırlığı. (2026-09-30 → 2026-10-01)
- Israrcı mod (kullanıcı kararı): sıra yalnızca can bitince, isim bilinince veya oyuncu pas geçince geçer.
- Backend Supabase'de kalır; Firebase yalnızca uygulamada (Analytics/Crashlytics/FCM). Firestore'a geçiş yok.
- Google girişi uygulamada native (`signInWithIdToken`) — webview'de supabase.co adresi görünmesin.
- Next 16.3.0 → 16.3.8 (next/og RCE dahil kritik açıklar). Prod bağımlılıklarında 0 açık.
- Play hedef kitle 13+ (çocuk karakterler → Families politikası riski). Reklam oyun sırasında gösterilmez.
- Commit'leri kullanıcı atar; her faz sonunda "commit noktası" bildirilir. Stil: scope'suz conventional, İngilizce.

## Dokunulmaması Gerekenler
- Kağıt/kalem tasarım teması (sadakat modu). `room_runtime`/`names`'in anon'a kapalı olması. `.env*` dosyaları.
- `appId` (`com.burakkutlu.kimbu`) Play'e ilk yüklemeden sonra değişmez. İmzalama anahtarı repoya girmez.

## Sıradaki Adım
**Kullanıcının yapacakları** (adım adım: `docs/mobil-giris-reklam-kurulum.md`):
1. `20261001100000_close_profile_tables.sql`'i uygula → `npm run verify:rls`.
2. Android Studio → `npx cap sync android` → `npx cap open android` → emülatörde Run; sorun varsa hata metnini getir.
3. İmzalama anahtarı (repo dışında sakla) → Play Console (25$) → `store/play/listing.md` ile kaydı doldur → dahili test.
4. Gizlilik/Play için iletişim e-postasını belirle (iş e-postası değil).
5. Faz 4–5 için: Google Cloud OAuth + Supabase Google sağlayıcısı; AdMob/AdSense hesapları.

**Sonraki kod işleri** (öncelik sırasıyla):
1. Android ilk derlemede çıkan sorunları düzelt; Play SHA-256 gelince `public/.well-known/assetlinks.json` (https App Links).
2. Faz 4: Google ile giriş (web OAuth + uygulamada native) · cihaz geçmişini hesaba bağlama · hesap silme (uygulama
   içi + web, Play şartı) · gizlilik sayfasını güncelle.
3. Faz 5: AdMob (`@capacitor-community/admob`, önce `arac-secimi`) + AdSense · UMP onayı · Firebase Analytics · CSP.
4. Opsiyonel: botları Ortak Hedef'e getir (bot hakem → tek kişi oynayabilir); takım modunu Israrcı'ya genişlet.

Ayrıntılı ana plan: `~/.claude/plans/bu-oyunu-u-3-temporal-plum.md` · faz notları: `plans/17-*`, `18-*` (gitignore'da, yerel).

## Son Güncelleme
2026-10-01

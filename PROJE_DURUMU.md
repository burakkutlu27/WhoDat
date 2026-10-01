# KimBu (WhoDat) — Proje Durumu

## Ne Yapıyor
Çok oyunculu online "Ben Kimim?" tahmin oyunu: oda kodu ile katılım, gizli ünlü ismi evet/hayır soruları ile bulma.
Web (whodat.burakkutlu.com) + PWA; Google Play uygulaması (Capacitor) hazırlık aşamasında. Hedef: reklamla gelir.

## Tech Stack
- Frontend: Next.js 16.3.8 (App Router), React 19, Tailwind 3, motion, lucide-react
- Backend: Next.js route handler'ları (stateless, Vercel), HMAC imzalı httpOnly oturum çerezi
- Veritabanı: Supabase Postgres + Realtime (yalnızca "değişti" sinyali; veri `/state` uç noktasından)
- Mobil: PWA (manifest, `public/sw.js` yalnızca çevrimdışı sayfası) + Capacitor 8 (`android/`, uzak URL modu)
- Test: Vitest (~430), Playwright E2E (masaüstü + `mobile-chrome` projesi, ~37 senaryo, ~10 dk)

## Mimari Özet
- `src/lib/game/engine.ts` (~4.5k satır): yetkili oyun motoru. Oyun state'i senkron bellek Map'lerinde; serverless için
  `runtimeState.ts` her isteği oda kapsamında çalıştırır (giriş: `room_runtime`'dan yükle, çıkış: sürüm kilidiyle yaz).
  Yeni bellek store'u → `registerRuntimeStores` listesine eklenmeli. Tüm `/api/rooms/[id]/*` → `roomRoute()`.
- `room_runtime` tablosu anon'a kapalı (gizli bilgi); `rooms`/`players` anon'a okunabilir + realtime → oraya sır yazma.
- Botlar: `src/lib/game/bot/` — `knowledge.ts` (soru↔özellik), `brain.ts` (saf karar), `runner.ts` (/state okunurken
  tetiklenir, `room_runtime.bot_next_action_at` ile atomik hamle). Veri: `famousPeopleAttributes.ts` (üretilmiş, ~940 KB;
  `node scripts/enrich-attributes.mjs`, Wikidata önbelleği `scripts/.cache/` gitignore'da).
- Takım modu: `teams.ts` (saf) + engine'de `stateKey()` — takımın can/isim/pas/Hız verisi ilk üyenin anahtarında ortak;
  sıra `loadPlayers` içinde takımlar arası dönüşümlü dizilim ile. Takım bilgisi/notlar `room_runtime`'da.
- Native köprü: `src/lib/native.ts` + `components/NativeBridge.tsx` (paylaşım, titreşim, geri tuşu, `kimbu://join/KOD`).

## Şu Anki Durum
- Tamam: 4 mod (Klasik, Hız, Israrcı, Ortak Hedef), Tam Metin/Sesli, 3 fazlı lobi, botlar (Klasik/Hız/Israrcı, Tam Metin,
  tek kategori), takım modu (Klasik/Hız, eşit takımlar), mobil-first düzen, PWA, Capacitor iskeleti.
- Eksik: botlar Ortak Hedef + 3 fazlı lobide yok; takım modu Israrcı/Ortak Hedef/3 fazlıda yok; Android derlemesi
  hiç yapılmadı (makinede Java/Android SDK yok); iOS yok; giriş/hesap yok; reklam yok.
- Bilinen: Kurgusal/Türk yapımı karakterlerin ~%30'u Wikidata'da eşleşmedi (bot o sorularda çekimser). Bot bilmediği
  soruda yazı-tura oy verir. Lint'te 32 eski uyarı (0 hata).

## Bugüne Kadar Yapılan Revizyon Kararları
- Faz 0: bellek state'i `room_runtime`'a taşındı (Vercel çoklu instance). Faz 1a/1b: mobil düzen + PWA.
  Faz 2: botlar (LLM yok, Wikidata kural tabanlı). Faz 3: takım modu (ortak kimlik). Faz 1c: Capacitor iskeleti.
- Israrcı mod kuralı (kullanıcı kararı): sıra yalnızca can bitince, isim bilinince veya oyuncu pas geçince geçer.
- Backend Supabase'de kalır; Firebase yalnızca uygulama tarafında (Analytics/Crashlytics/FCM) eklenecek.
- Google girişi uygulamada native (`signInWithIdToken`) olacak — webview'de supabase.co adresi görünmesin diye.
- appId: `com.burakkutlu.kimbu` (Play'e ilk yüklemeden sonra değişmez). Next 16.3.0 → 16.3.8 (RCE açıkları).
- Commit'leri kullanıcı atar; her faz sonunda "commit noktası" bildirilir. Stil: scope'suz conventional, İngilizce.

## Dokunulmaması Gerekenler
- Kağıt/kalem tasarım teması (sadakat modu). `room_runtime`'ın anon'a kapalı olması. `.env*` dosyaları.
- Migration'ları prod'a kullanıcı uygular (SQL Editor); ekleyici olmalı, deploy'dan önce uygulanmalı.

## Sıradaki Adım
1. Android Studio kur → `npx cap open android` → emülatörde dene; imzalama anahtarı oluştur (repoya girmez).
2. Faz 4: isteğe bağlı Google girişi + rekor/geçmiş (`device_id` geçmişi hesaba bağlanır) + hesap silme (Play şartı).
3. Faz 5: AdMob (uygulama) / AdSense (web), maç sonu reklam, KVKK/UMP onayı, hedef kitle 13+.
4. Opsiyonel: botları Ortak Hedef'e getir (bot hakem → tek kişi oynayabilir).
Ayrıntılı plan: `~/.claude/plans/bu-oyunu-u-3-temporal-plum.md`; faz notları: `plans/17-*`, `18-*` (gitignore'da).

## Son Güncelleme
2026-10-01

# AGENTS.md

Bu dosya, bu repo üzerinde çalışan tüm AI coding agent'ları (Claude Code,
Antigravity, Cursor, Codex, Copilot, Gemini CLI vb.) için geçerli ortak
kurallardır. Araç/model bağımsızdır — hangi ajanla çalışırsan çalış bu
kurallara uy.

---

## 1. Komut Onayı Politikası

Herhangi bir terminal komutu, dosya silme/taşıma, git push/force-push,
paket kurulumu, migration veya sistem durumunu değiştiren HER işlemden
önce, onay isteğiyle BİRLİKTE şunu tek satırda özetle:

```
🔧 [AMAÇ] → [KOMUT] → [ETKİ/RİSK: düşük|orta|yüksek]
```

- **Amaç:** Bu komut hangi görevin parçası, ne çözüyor?
- **Etki:** Ne değişecek (dosya, bağımlılık, veritabanı, prod/local)?
- **Geri alınabilirlik:** Tersine çevrilebilir mi, kalıcı mı?

Riskli komutlarda (`rm`, `sudo`, `git push --force`, `DROP`, `migrate`,
`deploy`, ortam değişkeni/secret değişikliği) mutlaka "⚠️ Geri alınamaz"
ibaresi ekle ve tek başına otomatik çalıştırma; kullanıcıdan açık onay
bekle. Birden fazla komut öneriyorsan her birini ayrı satırda, aynı
formatla açıkla — tek blokta toplama.

## 2. Çalışma Akışı

Büyük/karmaşık bir görev geldiğinde direkt koda geçme:

1. **Anla:** Belirsiz bir istek varsa varsayımını tek cümlede belirt, sonra devam et.
2. **Planla:** Uygulamaya geçmeden önce kısa bir plan sun (max 5-7 madde).
3. **Uygula:** Küçük, gözden geçirilebilir adımlarla ilerle — tek seferde
   devasa bir diff üretme.
4. **Doğrula:** Değişiklikten sonra ilgili testleri/lint'i çalıştır,
   sonucu raporla. Test yoksa ve mantıklıysa ekle.
5. **Özetle:** Ne değişti, neden değişti, hangi dosyalar etkilendi — kısaca.

## 3. Kod Standartları

- Var olan proje konvansiyonlarına (isimlendirme, klasör yapısı, lint
  kuralları) uy; kendi tercihini dayatma.
- Yeni bağımlılık eklemeden önce zaten var olan bir çözüm olup olmadığını
  kontrol et; eklerken sebebini belirt.
- Ölü kod, kullanılmayan import, debug `print`/`console.log` bırakma.
- Fonksiyon/dosya bir işten fazlasını yapıyorsa böl; okunabilirliği
  kısalıktan önce tut.
- Yorum satırlarını "ne yaptığını" değil "neden öyle yaptığını" açıklamak
  için kullan.

## 4. Git & Versiyon Kontrolü

- Commit mesajlarını kısa, açıklayıcı ve tek bir mantıksal değişikliğe
  odaklı yaz (conventional commits tarzı tercih edilir: `feat:`, `fix:`,
  `refactor:`, `docs:`, `chore:`).
- `main`/`master`'a doğrudan push etme; `git push --force` özellikle
  onay gerektirir (bkz. Madde 1).
- Kullanıcı açıkça istemedikçe otomatik commit/push yapma; değişikliği
  göster, onay iste.

## 5. Güvenlik

- Secret, API key, token, şifre gibi bilgileri koda hardcode etme;
  ortam değişkeni/`.env` kullan ve `.env`'in `.gitignore`'da olduğundan
  emin ol.
- Kullanıcı girdisini doğrulamadan SQL/komut/şablon içine gömme (injection
  riski).
- Üçüncü parti paket eklerken güncel ve aktif bakımı olan bir paket seç;
  şüpheli/az bilinen paketleri önerirken belirt.
- Prod/canlı ortamı etkileyebilecek her işlemi Madde 1'deki formatla işaretle.

## 6. Test & Doğrulama

- Yeni özellik veya bugfix'te ilgili testi de ekle/güncelle.
- Değişiklik sonrası mevcut test paketini çalıştır; başarısız testleri
  görmezden gelip devam etme — ya düzelt ya da kullanıcıya bildir.
- "Çalışıyor" demeden önce gerçekten çalıştırıp doğrula; varsayımla rapor etme.

## 7. İletişim Tarzı

- Gereksiz uzun açıklama yapma; değişikliği ve gerekçesini kısa tut.
- Belirsizlik varsa en makul varsayımı yap ve belirterek ilerle; sürekli
  soru sorarak işi durdurma.
- Bir şeyi yapamıyorsan ya da riskli buluyorsan nedenini açıkça söyle,
  sessizce atlama veya farklı bir şey yapma.

---

## Proje-Özel Notlar
> Bu bölümü her proje için doldur (stack, çalıştırma komutları, klasör
> yapısı vb.). Yukarıdaki kurallar tüm projelerde ortak, buradan sonrası
> projeye özel.

- Dil/Framework:
- Kurulum komutu:
- Test komutu:
- Lint/format komutu:
- Build/çalıştırma komutu:

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

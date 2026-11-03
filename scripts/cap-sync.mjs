/**
 * Capacitor Android projesini hangi sunucuya bağlanacağını seçerek senkronlar.
 *
 *   npm run cap:dev   → bilgisayardaki geliştirme sunucusu (npm run dev, port 3100). Kod değişiklikleri
 *                       emülatörde anında görünür; her seferinde main'e merge/deploy gerekmez.
 *   npm run cap:prod  → canlı site. Play'e yüklenecek sürümden ÖNCE mutlaka çalıştırılmalı.
 *
 * Emülatör bilgisayara 10.0.2.2 ile ulaşır. Gerçek telefon için:
 *   CAP_SERVER_URL=http://<bilgisayarın-yerel-ip>:3100 npm run cap:dev
 * (ya da USB ile: `adb reverse tcp:3100 tcp:3100` + CAP_SERVER_URL=http://localhost:3100)
 */

import { spawnSync } from 'node:child_process'

const mode = process.argv[2]
if (mode !== 'dev' && mode !== 'prod') {
  console.error('Kullanım: node scripts/cap-sync.mjs <dev|prod>')
  process.exit(1)
}

const env = { ...process.env }
if (mode === 'dev') {
  env.CAP_SERVER_URL = process.env.CAP_SERVER_URL || 'http://10.0.2.2:3100'
} else {
  delete env.CAP_SERVER_URL
}

// Windows'ta npx bir .cmd olduğu için shell gerekiyor; komut sabit, kullanıcı girdisi içermiyor.
const result = spawnSync('npx cap sync android', { env, stdio: 'inherit', shell: true })
if (result.status !== 0) process.exit(result.status ?? 1)

const target = mode === 'dev' ? env.CAP_SERVER_URL : 'https://whodat.burakkutlu.com'
console.log(`\n→ Uygulama şu adresi açacak: ${target}`)
if (mode === 'dev') {
  console.log('  Önce `npm run dev` çalışıyor olmalı. Android Studio\'da ▶ Run.')
  console.log('  ⚠️  Bu ayarla mağazaya sürüm ÇIKARMA: önce `npm run cap:prod`.')
}

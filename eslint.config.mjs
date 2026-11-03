import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

/** ESLint 9+ flat config. Eski .eslintrc.json bu dosyayla değiştirildi. */
const config = [
  // android/: Capacitor/Gradle'ın kopyaladığı ve ürettiği JS (bizim kodumuz değil); mobile/: çevrimdışı yedek sayfa.
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts', 'coverage/**', 'android/**', 'mobile/**'] },
  ...nextCoreWebVitals,
  ...nextTypescript,
]

export default config

import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'
import nextTypescript from 'eslint-config-next/typescript'

/** ESLint 9+ flat config. Eski .eslintrc.json bu dosyayla değiştirildi. */
const config = [
  { ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts', 'coverage/**'] },
  ...nextCoreWebVitals,
  ...nextTypescript,
]

export default config

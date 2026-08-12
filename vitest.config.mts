import path from 'node:path'

import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.ts'],
    setupFiles: ['src/test/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      // `server-only` bir istemci bundle'ında import edilirse hata fırlatır.
      // Test ortamı sunucu koşulunu bilmediği için boş modüle yönlendiriyoruz.
      'server-only': path.resolve(import.meta.dirname, 'src/test/empty.ts'),
    },
  },
})

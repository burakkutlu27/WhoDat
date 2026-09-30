/**
 * PWA / Android / iOS uygulama ikonlarını src/app/icon.svg ile aynı çizimden üretir.
 *
 * Yeni bir görüntü bağımlılığı eklememek için SVG'ler, projede zaten kurulu olan
 * Playwright'ın Chromium'u ile PNG'ye çevrilir. Çıktılar public/icons/ altına yazılır
 * ve repoya commit'lenir; bu script yalnızca ikon değiştiğinde yeniden çalıştırılır.
 *
 * Kullanım: node scripts/generate-icons.mjs
 */

import { mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

import { chromium } from '@playwright/test'

const OUT_DIR = resolve(import.meta.dirname, '../public/icons')
const PAPER = '#FFFDF7'

// Soru işareti + alt çizgi (icon.svg'deki çizim, 32'lik koordinat sistemi).
const GLYPH = `
  <path d="M12.5 11 C12.5 7.5 14.5 6 16.5 6 C18.8 6 21 7.8 20.5 11 C20 13 17.5 13.5 17 15.5" stroke="#D94F3D" stroke-width="3" stroke-linecap="round" fill="none"/>
  <circle cx="16.8" cy="20" r="2" fill="#D94F3D"/>
  <path d="M8 26 Q16 23.5 24 26" stroke="#E8A838" stroke-width="2" stroke-linecap="round" fill="none"/>`

// "any": favicon ile birebir aynı; köşeleri yuvarlak, çerçeveli kart.
const cardSvg = `
<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <rect x="1" y="1" width="30" height="30" rx="4" fill="${PAPER}" stroke="#C9BFA8" stroke-width="1.5"/>
  ${GLYPH}
</svg>`

// "maskable" ve iOS: sistem köşeleri kendisi keser, zemin tam dolu olmalı. Çizim, Android'in
// güvenli bölgesi (merkezdeki %80'lik daire) içinde kalsın diye %78'e küçültülüp ortalanır.
const fullBleedSvg = `
<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" fill="${PAPER}"/>
  <g transform="translate(16 16) scale(0.78) translate(-16 -16)">${GLYPH}</g>
</svg>`

const targets = [
  { file: 'icon-192.png', size: 192, svg: cardSvg },
  { file: 'icon-512.png', size: 512, svg: cardSvg },
  { file: 'icon-maskable-512.png', size: 512, svg: fullBleedSvg },
  { file: 'apple-touch-icon.png', size: 180, svg: fullBleedSvg },
]

mkdirSync(OUT_DIR, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage()

for (const { file, size, svg } of targets) {
  await page.setViewportSize({ width: size, height: size })
  await page.setContent(
    `<html><body style="margin:0;background:transparent">${svg.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body></html>`,
  )
  await page.locator('svg').screenshot({ path: resolve(OUT_DIR, file), omitBackground: true })
  console.log(`✓ public/icons/${file} (${size}×${size})`)
}

await browser.close()

/**
 * PWA / Android / iOS uygulama ikonlarını src/app/icon.svg ile aynı çizimden üretir.
 *
 * Yeni bir görüntü bağımlılığı eklememek için SVG'ler, projede zaten kurulu olan
 * Playwright'ın Chromium'u ile PNG'ye çevrilir. Çıktılar public/icons/ altına yazılır
 * ve repoya commit'lenir; bu script yalnızca ikon değiştiğinde yeniden çalıştırılır.
 *
 * Kullanım: node scripts/generate-icons.mjs
 */

import { existsSync, mkdirSync } from 'node:fs'
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

// Android yuvarlak ikon (eski başlatıcılar).
const roundSvg = `
<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <circle cx="16" cy="16" r="16" fill="${PAPER}"/>
  <g transform="translate(16 16) scale(0.7) translate(-16 -16)">${GLYPH}</g>
</svg>`

// Android adaptive ikon ön planı: zemin şeffaf (renk res/values/ic_launcher_background.xml'de).
// Üreticiler ikonu farklı kırptığı için çizim 108dp'nin ortadaki 66dp'lik güvenli alanında kalmalı.
const adaptiveForegroundSvg = `
<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <g transform="translate(16 16) scale(0.6) translate(-16 -16)">${GLYPH}</g>
</svg>`

/** Açılış ekranı: kağıt zemin, ortada logo (kısa kenarın ~%35'i). */
function splashSvg(width, height) {
  const scale = (Math.min(width, height) * 0.35) / 32
  return `
<svg viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#F5F0E8"/>
  <g transform="translate(${width / 2} ${height / 2}) scale(${scale}) translate(-16 -16)">${GLYPH}</g>
</svg>`
}

const ANDROID_RES = resolve(import.meta.dirname, '../android/app/src/main/res')
const DENSITIES = { mdpi: 1, hdpi: 1.5, xhdpi: 2, xxhdpi: 3, xxxhdpi: 4 }
const SPLASH_PORTRAIT = { mdpi: [320, 480], hdpi: [480, 800], xhdpi: [720, 1280], xxhdpi: [960, 1600], xxxhdpi: [1280, 1920] }

const targets = [
  { path: resolve(OUT_DIR, 'icon-192.png'), width: 192, height: 192, svg: cardSvg },
  { path: resolve(OUT_DIR, 'icon-512.png'), width: 512, height: 512, svg: cardSvg },
  { path: resolve(OUT_DIR, 'icon-maskable-512.png'), width: 512, height: 512, svg: fullBleedSvg },
  { path: resolve(OUT_DIR, 'apple-touch-icon.png'), width: 180, height: 180, svg: fullBleedSvg },
]

// Android (Capacitor `npx cap add android` varsayılan logosunun yerine).
if (existsSync(ANDROID_RES)) {
  for (const [density, factor] of Object.entries(DENSITIES)) {
    const launcher = 48 * factor
    const foreground = 108 * factor
    const dir = resolve(ANDROID_RES, `mipmap-${density}`)
    targets.push(
      { path: resolve(dir, 'ic_launcher.png'), width: launcher, height: launcher, svg: cardSvg },
      { path: resolve(dir, 'ic_launcher_round.png'), width: launcher, height: launcher, svg: roundSvg },
      { path: resolve(dir, 'ic_launcher_foreground.png'), width: foreground, height: foreground, svg: adaptiveForegroundSvg },
    )
    const [w, h] = SPLASH_PORTRAIT[density]
    targets.push(
      { path: resolve(ANDROID_RES, `drawable-port-${density}`, 'splash.png'), width: w, height: h, svg: splashSvg(w, h) },
      { path: resolve(ANDROID_RES, `drawable-land-${density}`, 'splash.png'), width: h, height: w, svg: splashSvg(h, w) },
    )
  }
  targets.push({ path: resolve(ANDROID_RES, 'drawable', 'splash.png'), width: 480, height: 320, svg: splashSvg(480, 320) })
}

mkdirSync(OUT_DIR, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage()

for (const { path, width, height, svg } of targets) {
  await page.setViewportSize({ width, height })
  await page.setContent(
    `<html><body style="margin:0;background:transparent">${svg.replace('<svg ', `<svg width="${width}" height="${height}" `)}</body></html>`,
  )
  await page.locator('svg').screenshot({ path, omitBackground: true })
  console.log(`✓ ${path.replace(resolve(import.meta.dirname, '..'), '.')} (${width}×${height})`)
}

await browser.close()

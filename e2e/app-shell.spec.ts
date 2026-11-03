import { expect, test, type Page } from '@playwright/test'

/**
 * Uygulama kabuğu (Capacitor / ana ekrana eklenmiş PWA) düzeni. Playwright'ta Capacitor'ı taklit
 * etmek native köprüyü tetikleyeceği için "standalone PWA" durumu taklit edilir: aynı düzen.
 */

test.skip(({ isMobile }) => !isMobile, 'yalnızca mobil projede koşar')

async function asInstalledApp(page: Page) {
  await page.addInitScript(() => {
    const original = window.matchMedia.bind(window)
    window.matchMedia = (query: string) =>
      query.includes('display-mode: standalone')
        ? ({ matches: true, media: query, onchange: null, addEventListener() {}, removeEventListener() {}, addListener() {}, removeListener() {}, dispatchEvent: () => false } as MediaQueryList)
        : original(query)
  })
}

const SHOTS = process.env.SHOT_DIR

test('uygulama ana sayfası tek ekrana sığar, kaydırma gerekmez', async ({ page }) => {
  await asInstalledApp(page)
  await page.goto('/')

  await expect(page.getByTestId('app-home')).toBeVisible()
  for (const id of ['create-room-link', 'play-vs-bots-link', 'quick-code-input', 'quick-join-button']) {
    await expect(page.getByTestId(id)).toBeInViewport({ ratio: 1 })
  }
  const scrollable = await page.evaluate(() => document.documentElement.scrollHeight - window.innerHeight)
  expect(scrollable).toBeLessThanOrEqual(1)
  if (SHOTS) await page.screenshot({ path: `${SHOTS}/40-app-home.png` })
})

test('uygulamada oda kurma adım adım ilerler ve botlu oyun başlar', async ({ page }) => {
  await asInstalledApp(page)
  await page.goto('/')
  await page.getByTestId('play-vs-bots-link').click()
  await page.waitForURL(/\/room\/create/)

  const header = page.getByTestId('create-wizard-header')
  await expect(header).toContainText('Takma Ad')
  await expect(header).toContainText('1 / 5') // botla oynarken İletişim adımı atlanır

  // Takma ad olmadan ilerlemez.
  await page.getByTestId('wizard-next').click()
  await expect(header).toContainText('Takma Ad')

  await page.getByTestId('nickname-input').fill('Uygulama')
  if (SHOTS) await page.screenshot({ path: `${SHOTS}/41-wizard-ad.png` })

  const labels: string[] = []
  for (let step = 2; step <= 5; step++) {
    await page.getByTestId('wizard-next').click()
    await expect(header).toContainText(`${step} / 5`)
    labels.push((await header.locator('h1').textContent())!.trim())
    // Her adımın Devam butonu ekranda (sabit alt çubuk).
    if (step < 5) await expect(page.getByTestId('wizard-next')).toBeInViewport({ ratio: 1 })
    if (SHOTS) await page.screenshot({ path: `${SHOTS}/4${step}-wizard.png` })
  }
  expect(labels).toEqual(['Oyun Modu', 'Kategori', 'Zorluk', 'Botlar'])

  // Geri tuşu bir adım geri götürür, seçimler korunur.
  await page.getByTestId('wizard-back').click()
  await expect(header).toContainText('Zorluk')
  await page.getByTestId('wizard-next').click()

  await page.getByTestId('bot-count-1').click()
  await expect(page.getByTestId('create-room-button')).toBeInViewport({ ratio: 1 })
  await page.getByTestId('create-room-button').click()
  await page.waitForURL(/\/game\//, { timeout: 45000 })

  // Oyun ekranı: üst menü yok, alt sekme çubuğu var; sıra bizdeyken kontroller kaydırmadan görünür.
  const ask = page.getByTestId('ask-question-button')
  const vote = page.getByTestId('vote-yes')
  await expect(ask.or(vote)).toBeVisible({ timeout: 60000 })
  if (await vote.isVisible()) {
    await vote.click()
    await expect(ask).toBeVisible({ timeout: 60000 })
  }
  await expect(page.getByTestId('app-tabbar')).toBeInViewport({ ratio: 1 })
  for (const id of ['your-turn-banner', 'ask-question-button', 'guess-input', 'guess-submit', 'pass-turn-button']) {
    await expect(page.getByTestId(id)).toBeInViewport({ ratio: 1 })
  }
  await page.waitForTimeout(700)
  if (SHOTS) await page.screenshot({ path: `${SHOTS}/47-app-game.png` })

  await page.getByTestId('app-tab-score').click()
  await expect(page.getByTestId('game-side-panel')).toContainText('Skor Tablosu')
  if (SHOTS) await page.screenshot({ path: `${SHOTS}/48-app-score-sheet.png` })
  await page.getByTestId('app-tab-score').click()
  await expect(page.getByTestId('game-side-panel')).toBeHidden()
})

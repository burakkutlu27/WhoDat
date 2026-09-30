import { expect, test, type Page } from '@playwright/test'

import { createPlayerContexts } from './helpers/harness'

/**
 * Botlara karşı tek başına oynama: gerçek sunucu, gerçek bot tetikleyicisi.
 * Botlar 1–4 sn "düşünüp" hamle yaptığı için zaman aşımları cömert.
 */

async function startSoloVsBots(page: Page, botCount: number, level: 'kolay' | 'orta' | 'zor') {
  await page.goto('/room/create?bots=1')
  await page.getByTestId('nickname-input').fill('Solo')
  await page.getByTestId(`bot-count-${botCount}`).click()
  await page.getByTestId(`bot-level-${level}`).click()
  await page.getByTestId('create-room-button').click()
  await page.waitForURL(/\/game\/[0-9a-f-]+/, { timeout: 45000 })
}

/** Botun sorusu gelirse oy verir; sıra insana dönene kadar bekler. */
async function waitForMyTurn(page: Page) {
  const askButton = page.getByTestId('ask-question-button')
  const voteYes = page.getByTestId('vote-yes')
  for (let i = 0; i < 6; i++) {
    await expect(askButton.or(voteYes)).toBeVisible({ timeout: 45000 })
    if (await askButton.isVisible()) return
    await voteYes.click()
    await expect(voteYes).not.toBeVisible({ timeout: 15000 })
  }
  await expect(askButton).toBeVisible()
}

test('Botlara karşı: oyun tek dokunuşla başlar, bot oy verir ve sırası gelince hamle yapar', async ({ browser }) => {
  const [player] = await createPlayerContexts(browser, 1)
  const page = player!.page

  try {
    await startSoloVsBots(page, 1, 'zor')
    await expect(page.getByLabel('Bot').first()).toBeVisible()

    await waitForMyTurn(page)

    // İnsan soru sorar; tek seçmen bottur, oyunu kaydırmadan oylaması ve oylamanın kapanması gerekir.
    await page.getByTestId('ask-question-button').click()
    await page.getByTestId('question-item').first().click()
    await expect(page.getByRole('heading', { name: /İpucu Not Defterim\s*1/ })).toBeVisible({ timeout: 20000 })

    // Klasik: soru-cevap sonrası sıra bota geçer; bot hamlesini yapar ve sıra insana döner.
    await expect(page.getByText(/Bot Tahmin Ediyor/i)).toBeVisible({ timeout: 15000 })
    await waitForMyTurn(page)
  } finally {
    await player!.context.close()
  }
})

test('Botlara karşı: lobiden bot eklenip çıkarılabilir', async ({ browser }) => {
  const [player] = await createPlayerContexts(browser, 1)
  const page = player!.page

  try {
    await page.goto('/room/create')
    await page.getByTestId('nickname-input').fill('Host')
    await page.getByTestId('create-room-button').click()
    await page.waitForURL(/\/room\/[0-9a-f-]+/)

    await page.getByTestId('add-bot-orta').click()
    await expect(page.getByTestId('remove-bot-button')).toHaveCount(1, { timeout: 15000 })
    await page.getByTestId('add-bot-kolay').click()
    await expect(page.getByTestId('remove-bot-button')).toHaveCount(2, { timeout: 15000 })

    await page.getByTestId('remove-bot-button').first().click()
    await expect(page.getByTestId('remove-bot-button')).toHaveCount(1, { timeout: 15000 })

    // Bot yazdığı isimlerle hazır: insan da isim atayınca oyun başlatılabilir.
    await page.getByTestId('auto-assign-button').click({ force: true })
    await expect(page.getByTestId('start-game-button')).toBeEnabled({ timeout: 15000 })
  } finally {
    await player!.context.close()
  }
})

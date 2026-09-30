import { expect, test, type Page } from '@playwright/test'

import { autoAssignNames, createPlayerContexts, createRoom, joinRoom, startGame } from './helpers/harness'

/**
 * Mobil düzen regresyonları: telefonda kritik kontroller kaydırmadan erişilebilir olmalı.
 * Yalnızca mobil projede anlamlı (masaüstünde her şey zaten ilk ekranda).
 */

test.skip(({ isMobile }) => !isMobile, 'yalnızca mobil projede koşar')

async function whoseTurn(p1: Page, p2: Page): Promise<[Page, Page]> {
  const askButton = (page: Page) => page.getByTestId('ask-question-button')
  await expect
    .poll(async () => (await askButton(p1).isVisible()) || (await askButton(p2).isVisible()), { timeout: 15000 })
    .toBe(true)
  return (await askButton(p1).isVisible()) ? [p1, p2] : [p2, p1]
}

test('Tam Metin oyununda soru, tahmin ve oylama kontrolleri kaydırmadan görünür', async ({ browser }) => {
  const [a, b] = await createPlayerContexts(browser, 2)
  const p1 = a!.page
  const p2 = b!.page

  try {
    const { roomCode } = await createRoom(p1, 'Asker', { gameMode: 'classic', communicationMode: 'text' })
    // Lobi en üstten açılmalı; host "Oyunu Başlat"ı kaydırmadan görmeli (alt sabit çubuk).
    await expect(p1.getByTestId('room-code')).toBeInViewport()
    await expect(p1.getByTestId('start-game-button')).toBeInViewport({ ratio: 1 })

    await joinRoom(p2, 'Voter', roomCode)
    await expect(p2.getByTestId('lobby-action-bar')).toBeInViewport({ ratio: 1 })
    await autoAssignNames(p1)
    await startGame(p1)
    await p2.waitForURL(/\/game\//)

    const [asker, voter] = await whoseTurn(p1, p2)

    // Oyun sayfası lobideki kaydırma konumunu devralmamalı.
    await expect(asker.getByTestId('your-turn-banner')).toBeInViewport()
    await expect(asker.getByTestId('ask-question-button')).toBeInViewport()
    await expect(asker.getByTestId('guess-input')).toBeInViewport()

    await asker.getByTestId('ask-question-button').click()
    await expect(asker.getByTestId('question-item').first()).toBeInViewport()
    await asker.getByTestId('question-item').first().click()

    // Seçmen kaydırmadan oy verebilmeli (kart ekranın altına sabitlenir).
    await expect(voter.getByTestId('vote-yes')).toBeInViewport({ ratio: 1 })
    await expect(voter.getByTestId('vote-no')).toBeInViewport({ ratio: 1 })
    await voter.getByTestId('vote-yes').click()
    await expect(voter.getByTestId('vote-yes')).not.toBeVisible()
  } finally {
    await a!.context.close()
    await b!.context.close()
  }
})

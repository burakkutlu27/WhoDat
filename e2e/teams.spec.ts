import { expect, test, type Page } from '@playwright/test'

import { autoAssignNames, createPlayerContexts, createRoom, joinRoom, startGame } from './helpers/harness'

/** Oyuncu kendi takımına geçer (zaten oradaysa buton yoktur). */
async function joinTeam(page: Page, teamId: 'red' | 'blue') {
  const button = page.getByTestId(`join-team-${teamId}`)
  await expect(page.getByTestId('team-lobby')).toBeVisible({ timeout: 15000 })
  if (await button.isVisible()) {
    await button.click()
    await expect(button).not.toBeVisible({ timeout: 15000 })
  }
}

test('Takım modu 2v2: isim takımdan gizlenir, rakip görür, takım notu yalnızca takıma gider', async ({ browser }) => {
  const players = await createPlayerContexts(browser, 4)
  const [red1, red2, blue1, blue2] = players.map((p) => p.page)

  try {
    const { roomCode } = await createRoom(red1!, 'Kirmizi1', { gameMode: 'classic', communicationMode: 'voice' })
    await joinRoom(red2!, 'Kirmizi2', roomCode)
    await joinRoom(blue1!, 'Mavi1', roomCode)
    await joinRoom(blue2!, 'Mavi2', roomCode)

    await red1!.getByTestId('team-mode-2').click()
    await joinTeam(red1!, 'red')
    await joinTeam(red2!, 'red')
    await joinTeam(blue1!, 'blue')
    await joinTeam(blue2!, 'blue')

    await autoAssignNames(red1!)
    await startGame(red1!)
    for (const page of [red2!, blue1!, blue2!]) await page.waitForURL(/\/game\//, { timeout: 30000 })

    // Sırası gelen oyuncuyu ve takımını bul.
    const pages = { red1: red1!, red2: red2!, blue1: blue1!, blue2: blue2! }
    let active: keyof typeof pages | null = null
    await expect
      .poll(async () => {
        for (const [key, page] of Object.entries(pages)) {
          if (await page.getByTestId('your-turn-banner').isVisible()) active = key as keyof typeof pages
        }
        return active
      }, { timeout: 20000 })
      .not.toBeNull()

    const activeKey = active as unknown as keyof typeof pages
    const teammateKey = ({ red1: 'red2', red2: 'red1', blue1: 'blue2', blue2: 'blue1' } as const)[activeKey]
    const rivalKey = activeKey.startsWith('red') ? 'blue1' : 'red1'
    const teammate = pages[teammateKey]
    const rival = pages[rivalKey]

    // İsim: takım arkadaşından gizli, rakipte görünür.
    await expect(teammate.getByTestId('teammate-turn-banner')).toBeVisible({ timeout: 15000 })
    await expect(teammate.getByTestId('active-target-name')).toHaveCount(0)
    await expect(rival.getByTestId('active-target-name')).toBeVisible({ timeout: 15000 })

    // Takım notu: takım arkadaşı yazar, sırası gelen görür, rakip görmez.
    await teammate.getByTestId('team-note-input').fill('bence gercek kisi')
    await teammate.getByTestId('team-note-send').click()
    await expect(pages[activeKey].getByTestId('team-notes')).toContainText('bence gercek kisi', { timeout: 15000 })
    await expect(rival.getByTestId('team-notes')).not.toContainText('bence gercek kisi')

    // Takım paneli iki takımı gösterir.
    await expect(rival.getByTestId('team-panel')).toContainText('Kırmızı Takım')
    await expect(rival.getByTestId('team-panel')).toContainText('Mavi Takım')
  } finally {
    for (const p of players) await p.context.close()
  }
})

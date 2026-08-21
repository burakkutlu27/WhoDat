import { type Browser, type BrowserContext, type Page, expect } from '@playwright/test'

export interface RoomSettings {
  gameMode?: 'classic' | 'speed' | 'persistent' | 'shared_target'
  communicationMode?: 'voice' | 'text'
  categoryMode?: 'single' | 'multi_phase'
  difficulty?: 'kolay' | 'orta' | 'zor'
}

export async function createPlayerContexts(browser: Browser, count: number): Promise<{ context: BrowserContext; page: Page }[]> {
  const players: { context: BrowserContext; page: Page }[] = []
  for (let i = 0; i < count; i++) {
    const context = await browser.newContext()
    const page = await context.newPage()
    players.push({ context, page })
  }
  return players
}

export async function createRoom(
  page: Page,
  nickname: string,
  settings: RoomSettings = {},
): Promise<{ roomId: string; roomCode: string }> {
  await page.goto('/room/create')
  await page.getByTestId('nickname-input').fill(nickname)

  if (settings.gameMode) {
    await page.getByTestId(`mode-${settings.gameMode}`).click()
  }

  if (settings.communicationMode) {
    await page.getByTestId(`communication-${settings.communicationMode}`).click()
  }

  if (settings.categoryMode) {
    await page.getByTestId(`category-mode-${settings.categoryMode}`).click()
  }

  await page.getByTestId('create-room-button').click()
  await page.waitForURL(/\/room\/[0-9a-f-]+/)

  const url = page.url()
  const roomId = url.split('/room/')[1]?.split('?')[0] || ''

  const roomCodeElement = page.getByTestId('room-code')
  await expect(roomCodeElement).toBeVisible()
  const roomCode = (await roomCodeElement.textContent())?.trim() || ''

  return { roomId, roomCode }
}

export async function joinRoom(page: Page, nickname: string, roomCode: string): Promise<void> {
  await page.goto('/room/join')
  await page.getByTestId('join-code-input').fill(roomCode)
  await page.getByTestId('join-nickname-input').fill(nickname)
  await page.getByTestId('join-button').click()
  await page.waitForURL(/\/room\/[0-9a-f-]+/)
}

export async function submitNames(page: Page, names: string[]): Promise<void> {
  for (let i = 0; i < names.length; i++) {
    const input = page.getByTestId(`name-${i}`)
    await input.fill(names[i]!)
    await input.press('Escape')
  }
  const submitBtn = page.getByTestId('submit-names-button')
  await expect(submitBtn).toBeEnabled({ timeout: 10000 })
  await submitBtn.click({ force: true })
  await expect(page.getByText('İsimleriniz Havuza Eklendi')).toBeVisible({ timeout: 15000 })
}

export async function autoAssignNames(page: Page): Promise<void> {
  const autoBtn = page.getByTestId('auto-assign-button')
  await autoBtn.click({ force: true })
  await expect(page.getByText(/başarıyla atandı|belirlendi/i)).toBeVisible({ timeout: 15000 })
}

export async function startGame(page: Page): Promise<void> {
  const startBtn = page.getByTestId('start-game-button')
  await expect(startBtn).toBeEnabled({ timeout: 15000 })
  await startBtn.click({ force: true })
  await page.waitForURL(/\/game\/[0-9a-f-]+/, { timeout: 30000 })
}

export async function makeGuess(page: Page, guessText: string): Promise<void> {
  const guessInput = page.getByTestId('guess-input')
  await expect(guessInput).toBeVisible()
  await guessInput.fill(guessText)
  await page.getByTestId('guess-submit').click()
}

export async function giveUp(page: Page): Promise<void> {
  const giveUpBtn = page.getByTestId('give-up-button')
  await expect(giveUpBtn).toBeVisible()
  await giveUpBtn.click()
}

export async function passTurn(page: Page): Promise<void> {
  const passBtn = page.getByTestId('pass-turn-button')
  await expect(passBtn).toBeVisible()
  await passBtn.click()
}

export async function vote(page: Page, answer: boolean): Promise<void> {
  const voteBtn = answer ? page.getByTestId('vote-yes') : page.getByTestId('vote-no')
  await expect(voteBtn).toBeVisible()
  await voteBtn.click()
}

export async function readPassRights(page: Page): Promise<string> {
  const el = page.getByTestId('own-pass-rights')
  return (await el.textContent())?.trim() || ''
}

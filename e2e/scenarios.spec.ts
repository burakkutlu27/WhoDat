import { expect, test } from '@playwright/test'

import {
  autoAssignNames,
  createPlayerContexts,
  createRoom,
  joinRoom,
  makeGuess,
  passTurn,
  startGame,
  vote,
} from './helpers/harness'

test.describe('Katman 2 E2E Çoklu Oyuncu Senaryoları', () => {
  test('Senaryo 1: 2 Oyuncu Klasik Yanlış Tahminde Can Kaybı ve Tur Geçişi İzolasyonu', async ({
    browser,
  }) => {
    const players = await createPlayerContexts(browser, 2)
    const p1 = players[0]!.page
    const p2 = players[1]!.page

    try {
      const { roomCode } = await createRoom(p1, 'Player1', {
        gameMode: 'classic',
        communicationMode: 'voice',
      })

      await joinRoom(p2, 'Player2', roomCode)
      await autoAssignNames(p1)
      await startGame(p1)
      await p2.waitForURL(/\/game\/[0-9a-f-]+/)

      await expect(p1.getByTestId('your-turn-banner')).toBeVisible({ timeout: 10000 })
      await makeGuess(p1, 'Tamamen Yanlış Bir Tahmin 123')

      await expect(p2.getByTestId('your-turn-banner')).toBeVisible({ timeout: 15000 })
      await expect(p1.getByTestId('your-turn-banner')).not.toBeVisible()

      const p2Lives = p2.getByTestId('own-lives-remaining')
      await expect(p2Lives).toBeVisible()
    } finally {
      for (const p of players) {
        await p.context.close()
      }
    }
  })

  test('Senaryo 2: 3 Oyuncu Klasik Tam Metin Canlı Oylama ve Sıra Devri', async ({ browser }) => {
    const players = await createPlayerContexts(browser, 3)
    const p1 = players[0]!.page
    const p2 = players[1]!.page
    const p3 = players[2]!.page

    try {
      const { roomCode } = await createRoom(p1, 'Player1', {
        gameMode: 'classic',
        communicationMode: 'text',
      })

      await joinRoom(p2, 'Player2', roomCode)
      await joinRoom(p3, 'Player3', roomCode)

      await autoAssignNames(p1)
      await startGame(p1)
      await p2.waitForURL(/\/game\/[0-9a-f-]+/)
      await p3.waitForURL(/\/game\/[0-9a-f-]+/)

      const askBtn = p1.getByTestId('ask-question-button')
      await expect(askBtn).toBeVisible({ timeout: 10000 })
      await askBtn.click()

      const firstQuestion = p1.getByTestId('question-item').first()
      await expect(firstQuestion).toBeVisible({ timeout: 10000 })
      await firstQuestion.click()

      await expect(p2.getByTestId('vote-yes')).toBeVisible({ timeout: 10000 })
      await expect(p3.getByTestId('vote-yes')).toBeVisible({ timeout: 10000 })

      await vote(p2, true)
      await vote(p3, true)

      await expect(p1.getByTestId('pass-turn-button')).toBeVisible({ timeout: 10000 })
      await passTurn(p1)

      await expect(p2.getByTestId('your-turn-banner')).toBeVisible({ timeout: 15000 })
      await expect(p1.getByTestId('your-turn-banner')).not.toBeVisible()
    } finally {
      for (const p of players) {
        await p.context.close()
      }
    }
  })

  test('Senaryo 3: Klasik + Sesli + Tek Kategori + 4 Oyuncu (4lü Rotasyon)', async ({ browser }) => {
    const players = await createPlayerContexts(browser, 4)
    const p1 = players[0]!.page

    try {
      const { roomCode } = await createRoom(p1, 'ClassicHost4', {
        gameMode: 'classic',
        communicationMode: 'voice',
        categoryMode: 'single',
      })

      for (let i = 1; i < 4; i++) {
        await joinRoom(players[i]!.page, `ClassicGuest4_${i}`, roomCode)
      }

      await autoAssignNames(p1)
      await startGame(p1)

      for (let i = 1; i < 4; i++) {
        await players[i]!.page.waitForURL(/\/game\/[0-9a-f-]+/)
      }

      await expect(p1.getByTestId('your-turn-banner')).toBeVisible({ timeout: 15000 })
      await passTurn(p1)

      await expect(players[1]!.page.getByTestId('your-turn-banner')).toBeVisible({ timeout: 15000 })
      await passTurn(players[1]!.page)

      await expect(players[2]!.page.getByTestId('your-turn-banner')).toBeVisible({ timeout: 15000 })
    } finally {
      for (const p of players) {
        await p.context.close()
      }
    }
  })

  test('Senaryo 4: Hız Modu + Tam Metin + 3 Fazlı Karışık + 6 Oyuncu', async ({ browser }) => {
    const players = await createPlayerContexts(browser, 6)
    const p1 = players[0]!.page

    try {
      const { roomCode } = await createRoom(p1, 'SpeedHost', {
        gameMode: 'speed',
        communicationMode: 'text',
        categoryMode: 'multi_phase',
      })

      for (let i = 1; i < 6; i++) {
        await joinRoom(players[i]!.page, `SpeedGuest_${i}`, roomCode)
      }

      await autoAssignNames(p1)
      await startGame(p1)

      for (let i = 1; i < 6; i++) {
        await players[i]!.page.waitForURL(/\/game\/[0-9a-f-]+/)
      }

      await expect(p1.getByTestId('your-turn-banner')).toBeVisible({ timeout: 15000 })

      await p1.getByTestId('ask-question-button').click()
      await p1.getByTestId('question-item').first().click()

      for (let i = 1; i < 6; i++) {
        await expect(players[i]!.page.getByTestId('vote-yes')).toBeVisible({ timeout: 15000 })
        await vote(players[i]!.page, true)
      }

      await expect(p1.getByTestId('pass-turn-button')).toBeVisible({ timeout: 10000 })
      await passTurn(p1)

      await expect(players[1]!.page.getByTestId('your-turn-banner')).toBeVisible({ timeout: 15000 })
      await expect(p1.getByTestId('your-turn-banner')).not.toBeVisible()
    } finally {
      for (const p of players) {
        await p.context.close()
      }
    }
  })

  test('Senaryo 5: Hız Modu + Sesli + 3 Fazlı + 2 Oyuncu', async ({ browser }) => {
    const players = await createPlayerContexts(browser, 2)
    const p1 = players[0]!.page
    const p2 = players[1]!.page

    try {
      const { roomCode } = await createRoom(p1, 'Speed2Host', {
        gameMode: 'speed',
        communicationMode: 'voice',
        categoryMode: 'multi_phase',
      })

      await joinRoom(p2, 'Speed2Guest', roomCode)
      await autoAssignNames(p1)
      await startGame(p1)
      await p2.waitForURL(/\/game\/[0-9a-f-]+/)

      await expect(p1.getByTestId('your-turn-banner')).toBeVisible({ timeout: 15000 })
      await passTurn(p1)

      await expect(p2.getByTestId('your-turn-banner')).toBeVisible({ timeout: 15000 })
      await expect(p1.getByTestId('your-turn-banner')).not.toBeVisible()
    } finally {
      for (const p of players) {
        await p.context.close()
      }
    }
  })

  test('Senaryo 6: Hız Modu + Sesli + Tek Kategori + 3 Oyuncu', async ({ browser }) => {
    const players = await createPlayerContexts(browser, 3)
    const p1 = players[0]!.page
    const p2 = players[1]!.page

    try {
      const { roomCode } = await createRoom(p1, 'Speed3Host', {
        gameMode: 'speed',
        communicationMode: 'voice',
        categoryMode: 'single',
      })

      await joinRoom(p2, 'Speed3Guest1', roomCode)
      await joinRoom(players[2]!.page, 'Speed3Guest2', roomCode)

      await autoAssignNames(p1)
      await startGame(p1)
      await p2.waitForURL(/\/game\/[0-9a-f-]+/)
      await players[2]!.page.waitForURL(/\/game\/[0-9a-f-]+/)

      await expect(p1.getByTestId('your-turn-banner')).toBeVisible({ timeout: 15000 })
      await passTurn(p1)

      await expect(p2.getByTestId('your-turn-banner')).toBeVisible({ timeout: 15000 })
      await passTurn(p2)

      await expect(players[2]!.page.getByTestId('your-turn-banner')).toBeVisible({ timeout: 15000 })
    } finally {
      for (const p of players) {
        await p.context.close()
      }
    }
  })

  test('Senaryo 7: Israrcı + Tam Metin + Tek Kategori + 2 Oyuncu (Bütçe & Oylama)', async ({
    browser,
  }) => {
    const players = await createPlayerContexts(browser, 2)
    const p1 = players[0]!.page
    const p2 = players[1]!.page

    try {
      const { roomCode } = await createRoom(p1, 'Persist2Host', {
        gameMode: 'persistent',
        communicationMode: 'text',
        categoryMode: 'single',
      })

      await joinRoom(p2, 'Persist2Guest', roomCode)
      await autoAssignNames(p1)
      await startGame(p1)
      await p2.waitForURL(/\/game\/[0-9a-f-]+/)

      await expect(p1.getByTestId('your-turn-banner')).toBeVisible({ timeout: 15000 })

      // Soru sorar
      await p1.getByTestId('ask-question-button').click()
      await p1.getByTestId('question-item').first().click()

      // P2 oylar
      await expect(p2.getByTestId('vote-yes')).toBeVisible({ timeout: 15000 })
      await vote(p2, true)
      await expect(p2.getByTestId('vote-yes')).not.toBeVisible({ timeout: 10000 })

      // Israrcı Mod: oylama kapansa da sıra P1'de kalır; yeniden soru sorabilir (bütçe 9/10).
      await expect(p1.getByTestId('ask-question-button')).toBeVisible({ timeout: 15000 })
      await expect(p1.getByTestId('your-turn-banner')).toBeVisible()
      await expect(p2.getByTestId('your-turn-banner')).not.toBeVisible()

      // Sıra yalnızca P1 kendisi pas geçince devredilir
      await passTurn(p1)
      await expect(p2.getByTestId('your-turn-banner')).toBeVisible({ timeout: 15000 })
    } finally {
      for (const p of players) {
        await p.context.close()
      }
    }
  })

  test('Senaryo 8: Ortak Hedef + Tam Metin + 3 Fazlı Karışık + 4 Oyuncu (Host Hakem)', async ({
    browser,
  }) => {
    const players = await createPlayerContexts(browser, 4)
    const p1 = players[0]!.page
    const p2 = players[1]!.page

    try {
      const { roomCode } = await createRoom(p1, 'RefereeHost', {
        gameMode: 'shared_target',
        communicationMode: 'text',
        categoryMode: 'multi_phase',
      })

      for (let i = 1; i < 4; i++) {
        await joinRoom(players[i]!.page, `Contestant_${i}`, roomCode)
      }

      await autoAssignNames(p1)
      await startGame(p1)

      for (let i = 1; i < 4; i++) {
        await players[i]!.page.waitForURL(/\/game\/[0-9a-f-]+/)
      }

      await expect(p2.getByTestId('your-turn-banner')).toBeVisible({ timeout: 15000 })
      await expect(p1.getByTestId('your-turn-banner')).not.toBeVisible()

      await expect(p2.getByTestId('pass-turn-button')).toBeVisible({ timeout: 10000 })
      await passTurn(p2)

      await expect(players[2]!.page.getByTestId('your-turn-banner')).toBeVisible({ timeout: 15000 })
    } finally {
      for (const p of players) {
        await p.context.close()
      }
    }
  })

  test('Senaryo 9: Ortak Hedef + Sesli + Tek Kategori + 2 Oyuncu', async ({ browser }) => {
    const players = await createPlayerContexts(browser, 2)
    const p1 = players[0]!.page
    const p2 = players[1]!.page

    try {
      const { roomCode } = await createRoom(p1, 'Shared2Host', {
        gameMode: 'shared_target',
        communicationMode: 'voice',
        categoryMode: 'single',
      })

      await joinRoom(p2, 'Shared2Guest', roomCode)
      await autoAssignNames(p1)
      await startGame(p1)
      await p2.waitForURL(/\/game\/[0-9a-f-]+/)

      // Host hakemdir, P2 tek yarışmacıdır
      await expect(p2.getByTestId('your-turn-banner')).toBeVisible({ timeout: 15000 })
      await expect(p1.getByTestId('your-turn-banner')).not.toBeVisible()
    } finally {
      for (const p of players) {
        await p.context.close()
      }
    }
  })

  test('Senaryo 10: Ortak Hedef + Tam Metin + Tek Kategori + 3 Oyuncu', async ({ browser }) => {
    const players = await createPlayerContexts(browser, 3)
    const p1 = players[0]!.page
    const p2 = players[1]!.page

    try {
      const { roomCode } = await createRoom(p1, 'Shared3Host', {
        gameMode: 'shared_target',
        communicationMode: 'text',
        categoryMode: 'single',
      })

      await joinRoom(p2, 'Shared3Guest1', roomCode)
      await joinRoom(players[2]!.page, 'Shared3Guest2', roomCode)

      await autoAssignNames(p1)
      await startGame(p1)
      await p2.waitForURL(/\/game\/[0-9a-f-]+/)
      await players[2]!.page.waitForURL(/\/game\/[0-9a-f-]+/)

      await expect(p2.getByTestId('your-turn-banner')).toBeVisible({ timeout: 15000 })
      await expect(p1.getByTestId('your-turn-banner')).not.toBeVisible()

      await expect(p2.getByTestId('pass-turn-button')).toBeVisible({ timeout: 10000 })
      await passTurn(p2)

      await expect(players[2]!.page.getByTestId('your-turn-banner')).toBeVisible({ timeout: 15000 })
    } finally {
      for (const p of players) {
        await p.context.close()
      }
    }
  })

  test('Senaryo 11: Israrcı + Sesli + 3 Fazlı Karışık + 3 Oyuncu (Soru Bütçesi)', async ({
    browser,
  }) => {
    const players = await createPlayerContexts(browser, 3)
    const p1 = players[0]!.page
    const p2 = players[1]!.page

    try {
      const { roomCode } = await createRoom(p1, 'PersistHost', {
        gameMode: 'persistent',
        communicationMode: 'voice',
        categoryMode: 'multi_phase',
      })

      await joinRoom(p2, 'PersistGuest1', roomCode)
      await joinRoom(players[2]!.page, 'PersistGuest2', roomCode)

      await autoAssignNames(p1)
      await startGame(p1)

      await p2.waitForURL(/\/game\/[0-9a-f-]+/)
      await players[2]!.page.waitForURL(/\/game\/[0-9a-f-]+/)

      await expect(p1.getByTestId('your-turn-banner')).toBeVisible({ timeout: 15000 })

      await expect(p1.getByTestId('pass-turn-button')).toBeVisible({ timeout: 10000 })
      await passTurn(p1)

      await expect(p2.getByTestId('your-turn-banner')).toBeVisible({ timeout: 15000 })
      await expect(p1.getByTestId('your-turn-banner')).not.toBeVisible()
    } finally {
      for (const p of players) {
        await p.context.close()
      }
    }
  })

  test('Senaryo 12: Ortak Hedef + Sesli + 6 Oyuncu (Hakem & Max Rotasyon)', async ({
    browser,
  }) => {
    const players = await createPlayerContexts(browser, 6)
    const p1 = players[0]!.page
    const p2 = players[1]!.page

    try {
      const { roomCode } = await createRoom(p1, 'SharedHost6', {
        gameMode: 'shared_target',
        communicationMode: 'voice',
      })

      for (let i = 1; i < 6; i++) {
        await joinRoom(players[i]!.page, `Contestant6_${i}`, roomCode)
      }

      await autoAssignNames(p1)
      await startGame(p1)

      for (let i = 1; i < 6; i++) {
        await players[i]!.page.waitForURL(/\/game\/[0-9a-f-]+/)
      }

      await expect(p2.getByTestId('your-turn-banner')).toBeVisible({ timeout: 15000 })
      await expect(p1.getByTestId('your-turn-banner')).not.toBeVisible()

      await expect(p2.getByTestId('pass-turn-button')).toBeVisible({ timeout: 10000 })
      await passTurn(p2)

      await expect(players[2]!.page.getByTestId('your-turn-banner')).toBeVisible({ timeout: 15000 })
    } finally {
      for (const p of players) {
        await p.context.close()
      }
    }
  })
})

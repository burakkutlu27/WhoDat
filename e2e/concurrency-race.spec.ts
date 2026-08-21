import { expect, test } from '@playwright/test'

import {
  autoAssignNames,
  createPlayerContexts,
  createRoom,
  joinRoom,
  passTurn,
  startGame,
  vote,
} from './helpers/harness'

test.describe('Eşzamanlılık & Race Condition E2E Testleri', () => {
  test('Ortak Hedef Buzzer Yarışı: İki yarışmacı aynı anda doğru tahminde bulunduğunda tek bir kazanan belirlenir', async ({
    browser,
  }) => {
    const players = await createPlayerContexts(browser, 3)
    const p1 = players[0]!.page // Hakem (Host)
    const p2 = players[1]!.page // Yarışmacı 1
    const p3 = players[2]!.page // Yarışmacı 2

    try {
      const { roomId, roomCode } = await createRoom(p1, 'RefereeHost', {
        gameMode: 'shared_target',
        communicationMode: 'text',
      })

      await joinRoom(p2, 'Contestant1', roomCode)
      await joinRoom(p3, 'Contestant2', roomCode)

      await autoAssignNames(p1)
      await startGame(p1)

      await p2.waitForURL(/\/game\/[0-9a-f-]+/)
      await p3.waitForURL(/\/game\/[0-9a-f-]+/)

      // 1. Hakem ekranından gizli hedef ismini oku
      const targetElement = p1.getByTestId('active-target-name')
      await expect(targetElement).toBeVisible({ timeout: 15000 })
      const targetName = (await targetElement.textContent())?.trim() || ''
      expect(targetName.length).toBeGreaterThan(0)

      // 2. Her iki yarışmacı da buzzer butonunu görür
      await expect(p2.getByTestId('buzzer-guess-button')).toBeVisible({ timeout: 10000 })
      await expect(p3.getByTestId('buzzer-guess-button')).toBeVisible({ timeout: 10000 })

      // 3. P2 ve P3 AYNI ANDA (Promise.all) buzzer tahmininde bulunur
      await Promise.allSettled([
        (async () => {
          await p2.getByTestId('buzzer-guess-button').click()
          await p2.getByTestId('buzzer-input').fill(targetName)
          await p2.getByTestId('buzzer-submit').click()
        })(),
        (async () => {
          await p3.getByTestId('buzzer-guess-button').click()
          await p3.getByTestId('buzzer-input').fill(targetName)
          await p3.getByTestId('buzzer-submit').click()
        })(),
      ])

      // 4. Oyun biter ve her iki yarışmacı da skor podyumuna yönlendirilir
      await p2.waitForURL(/\/scores\/[0-9a-f-]+/, { timeout: 25000 })
      await p3.waitForURL(/\/scores\/[0-9a-f-]+/, { timeout: 25000 })

      // 5. Podyumda tam olarak tek bir şampiyon (100 Puan) ve tek bir 0 Puan yer alır
      await expect(p2.getByText(/100 Puan/i)).toBeVisible({ timeout: 15000 })
      await expect(p3.getByText(/100 Puan/i)).toBeVisible({ timeout: 15000 })

      // 6. Sunucu state kontrolü: İki oyuncunun puanları toplamı tam 100 olmalıdır (çift kazanan/çift puan bug'ı yok)
      const state = await p1.evaluate(async () => {
        const rid = window.location.pathname.split('/scores/')[1] || window.location.pathname.split('/game/')[1]
        const res = await fetch(`/api/rooms/${rid}/state`)
        return res.json()
      })

      const c1 = state.players.find((p: { nickname: string }) => p.nickname === 'Contestant1')
      const c2 = state.players.find((p: { nickname: string }) => p.nickname === 'Contestant2')
      const totalScore = (c1?.score ?? 0) + (c2?.score ?? 0)
      expect(totalScore).toBe(100)
    } finally {
      for (const p of players) {
        await p.context.close()
      }
    }
  })

  test('Canlı Oylama Eşzamanlılığı: İki seçmen aynı milisaniyede oy kullandığında tüm oylar kayıpsız işlenir', async ({
    browser,
  }) => {
    const players = await createPlayerContexts(browser, 3)
    const p1 = players[0]!.page // Soru soran
    const p2 = players[1]!.page // Seçmen 1
    const p3 = players[2]!.page // Seçmen 2

    try {
      const { roomCode } = await createRoom(p1, 'Asker', {
        gameMode: 'classic',
        communicationMode: 'text',
      })

      await joinRoom(p2, 'Voter1', roomCode)
      await joinRoom(p3, 'Voter2', roomCode)

      await autoAssignNames(p1)
      await startGame(p1)

      await p2.waitForURL(/\/game\/[0-9a-f-]+/)
      await p3.waitForURL(/\/game\/[0-9a-f-]+/)

      // P1 soru sorar
      await p1.getByTestId('ask-question-button').click()
      await p1.getByTestId('question-item').first().click()

      // P2 ve P3 ekranında oylama görünür
      await expect(p2.getByTestId('vote-yes')).toBeVisible({ timeout: 15000 })
      await expect(p3.getByTestId('vote-yes')).toBeVisible({ timeout: 15000 })

      // P2 ve P3 TAMAMEN AYNI ANDA (Promise.all) oy kullanır
      await Promise.all([
        vote(p2, true),
        vote(p3, false),
      ])

      await expect(p2.getByTestId('vote-yes')).not.toBeVisible({ timeout: 15000 })
      await expect(p3.getByTestId('vote-yes')).not.toBeVisible({ timeout: 15000 })

      // Oylama çözülür ve P1 ekranında pas geçme butonu görünür
      const passBtn = p1.getByTestId('pass-turn-button')
      await expect(passBtn).toBeVisible({ timeout: 20000 })
      await passTurn(p1)

      // Sıra 2. oyuncuya (Voter1) geçer
      await expect(p2.getByTestId('your-turn-banner')).toBeVisible({ timeout: 20000 })
      await expect(p1.getByTestId('your-turn-banner')).not.toBeVisible()
    } finally {
      for (const p of players) {
        await p.context.close()
      }
    }
  })
})

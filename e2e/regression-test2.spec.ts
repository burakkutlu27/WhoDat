import { expect, test } from '@playwright/test'

import {
  createPlayerContexts,
  createRoom,
  giveUp,
  joinRoom,
  makeGuess,
  passTurn,
  startGame,
  submitNames,
} from './helpers/harness'

test.describe('E2E Test 2 Regresyon Testi: İsim İzolasyonu & Havuz Tükenmesi', () => {
  test('2 kişilik oyunda, bir oyuncu diğerinin tüm isimlerini bitirdiğinde kendi yazdığı ismi almaz', async ({
    browser,
  }) => {
    const [player1, player2] = await createPlayerContexts(browser, 2)
    const p1 = player1!.page
    const p2 = player2!.page

    try {
      // 1. P1 odayı kurar
      const { roomCode } = await createRoom(p1, 'Oyuncu1_Host', {
        gameMode: 'classic',
        communicationMode: 'voice',
      })

      // 2. P2 odaya katılır
      await joinRoom(p2, 'Oyuncu2_Guest', roomCode)

      // 3. P1 ve P2 isimlerini gönderir
      await submitNames(p1, ['Prens Harry', 'Şahan Gökbakar', 'Elraenn'])
      await submitNames(p2, ['The Weeknd', 'Karl Lagerfeld', 'Christopher Nolan'])

      // 4. P1 oyunu başlatır
      await startGame(p1)
      await p2.waitForURL(/\/game\/[0-9a-f-]+/)

      // 5. Başlangıçta P2'nin ekranındaki gizli kartı oku (P1'in tahmin etmeye çalıştığı isim)
      // P1'in ismi KESİNLİKLE P2'nin yazdığı 3 isimden biri olmalıdır (asla P1'in kendi yazdığı değil)
      const p2Card = p2.getByTestId('active-target-name')
      await expect(p2Card).toBeVisible({ timeout: 10000 })
      const p1Assigned = (await p2Card.textContent())?.trim() || ''
      expect(['The Weeknd', 'Karl Lagerfeld', 'Christopher Nolan']).toContain(p1Assigned)
      expect(['Prens Harry', 'Şahan Gökbakar', 'Elraenn']).not.toContain(p1Assigned)

      // 6. P1 ilk ismini doğru tahmin etsin
      await makeGuess(p1, p1Assigned)

      // Sıra P2'ye geçer -> P2 pas geçsin (passTurn)
      await expect(p2.getByTestId('pass-turn-button')).toBeVisible({ timeout: 10000 })
      await passTurn(p2)

      // 7. Sıra tekrar P1'de -> P1 2. ismini pas geçsin (giveUp)
      await expect(p1.getByTestId('give-up-button')).toBeVisible({ timeout: 10000 })
      await giveUp(p1)

      // Sıra tekrar P2'de -> P2 pas geçsin
      await expect(p2.getByTestId('pass-turn-button')).toBeVisible({ timeout: 10000 })
      await passTurn(p2)

      // 8. Sıra tekrar P1'de -> P1 3. ismini de pas geçsin (giveUp)
      // Bu noktada P2'nin yazdığı tüm 3 isim (Nolan, Weeknd, Lagerfeld) P1 tarafından tüketildi!
      await expect(p1.getByTestId('give-up-button')).toBeVisible({ timeout: 10000 })
      await giveUp(p1)

      // 9. P1 için havuzda başka isim kalmadığı için erken tamamlama banner'ı görünmeli
      // ve P1'e ASLA kendi yazdığı isimler (Prens Harry, Şahan Gökbakar, Elraenn) verilmemelidir!
      await expect(p1.getByTestId('you-finished-early-banner')).toBeVisible({ timeout: 10000 })
    } finally {
      await player1?.context.close()
      await player2?.context.close()
    }
  })
})

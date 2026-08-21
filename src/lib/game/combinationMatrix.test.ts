import { beforeEach, describe, expect, it, vi } from 'vitest'

import type { DifficultyLevel, GameMode } from '@/lib/game/types'
import {
  buildName,
  buildPlayer,
  buildRoom,
  createSupabaseFake,
  type FakeTables,
} from '@/test/supabaseFake'

let fake: ReturnType<typeof createSupabaseFake>

vi.mock('@/lib/supabaseAdmin', () => ({
  supabaseAdmin: () => fake.client,
}))

const {
  answerSharedQuestion,
  askSharedQuestion,
  autoAssignNames,
  createRoom,
  getClassicRetiredNames,
  getGameState,
  getPlayerLives,
  getPlayerPassRights,
  getPlayerPersistentData,
  getPlayerSpeedData,
  getRoomMode,
  giveUp,
  makeGuess,
  passTurn,
  setPlayerLives,
  setPlayerPassRights,
  setPlayerSpeedData,
  setRoomDifficulty,
  setRoomTarget,
  startGame,
  submitNames,
} = await import('./engine')

const modes: GameMode[] = ['classic', 'speed', 'persistent', 'shared_target']
const difficulties: DifficultyLevel[] = ['kolay', 'orta', 'zor']
const playerCounts = [2, 3, 4, 6]

describe('Katman 1 — Motor Kombinasyon Matrisi (48 Kombinasyon)', () => {
  beforeEach(() => {
    fake = createSupabaseFake()
  })

  describe.each(modes)('Mod: %s', (mode) => {
    describe.each(difficulties)('Zorluk: %s', (difficulty) => {
      describe.each(playerCounts)('Oyuncu Sayısı: %i', (count) => {
        // Yardımcı fonksiyon: Belirtilen konfigürasyonda oda kurar
        async function setupGameRoom() {
          const { roomId, playerId: hostId } = await createRoom('Player_1', mode, {
            difficulty,
            categoryMode: 'single',
            category: 'unluler',
          })

          const playerIds = [hostId]
          for (let i = 2; i <= count; i++) {
            const player = buildPlayer(roomId, {
              nickname: `Player_${i}`,
              is_host: false,
              score: 0,
            })
            fake.tables.players.push(player)
            playerIds.push(player.id)
          }

          if (mode === 'shared_target') {
            // Ortak hedef modunda önce host hedef belirler, sonra oyun başlatılır
            await setRoomTarget(roomId, hostId, 'Kemal Sunal')
            await startGame(roomId, hostId)
          } else {
            // Otomatik isim ataması yap
            await autoAssignNames(roomId, hostId)
            await startGame(roomId, hostId)
          }

          return { roomId, hostId, playerIds }
        }

        it('Kural 1: Kimse kendi yazdığı ismi almaz / isim izolasyonu sağlanır', async () => {
          const { roomId, hostId, playerIds } = await setupGameRoom()

          if (mode === 'shared_target') {
            // Ortak hedef modunda yarışmacılar hedefi doğrudan bilmez
            for (const pid of playerIds) {
              const state = await getGameState(roomId, pid)
              if (pid === hostId) {
                expect(state.you.isReferee).toBe(true)
                expect(state.room.sharedTargetName).toBe('Kemal Sunal')
              } else {
                expect(state.you.isReferee).toBe(false)
                expect(state.room.sharedTargetName).toBeNull()
              }
            }
          } else {
            // Klasik, Hız ve Israrcı modlarda hiçbir oyuncu kendi submitted_by olan ismini alamaz
            for (const pid of playerIds) {
              const state = await getGameState(roomId, pid)
              if (state.you.targetNameId) {
                const assignedRow = fake.tables.names.find((n) => n.id === state.you.targetNameId)
                expect(assignedRow).toBeDefined()
                expect(assignedRow?.submitted_by).not.toBe(pid)
              }
            }
          }
        })

        it('Kural 2: Emekliye ayrılmış / çözülmüş isim tekrar atanmaz', async () => {
          const { roomId, hostId, playerIds } = await setupGameRoom()

          if (mode === 'classic') {
            const initialRetired = getClassicRetiredNames(roomId)
            const retiredCountBefore = initialRetired.size

            // Sıradaki oyuncu ismi doğru tahmin etsin
            const stateBefore = await getGameState(roomId, hostId)
            const currentNameId = fake.tables.rooms[0]!.current_identity_id
            const currentName = fake.tables.names.find((n) => n.id === currentNameId)!
            const activePlayerId = fake.tables.rooms[0]!.current_player_id!

            const guessRes = await makeGuess(roomId, activePlayerId, currentName.name_text)
            expect(guessRes.correct).toBe(true)

            // Emekli isimler listesine eklenmeli ve bir daha hiçbir oyuncuya verilmemelidir
            const retiredAfter = getClassicRetiredNames(roomId)
            expect(retiredAfter.has(currentName.id)).toBe(true)
            expect(retiredAfter.size).toBeGreaterThan(retiredCountBefore)
          } else if (mode === 'speed') {
            // Hız modunda round bazlı atama yapılır ve round içinde isim değişmez
            const state = await getGameState(roomId, hostId)
            const round1NameId = state.you.targetNameId
            expect(round1NameId).toBeTruthy()
          } else if (mode === 'persistent') {
            const activePlayerId = fake.tables.rooms[0]!.current_player_id!
            const currentNameId = fake.tables.rooms[0]!.current_identity_id
            const currentName = fake.tables.names.find((n) => n.id === currentNameId)!

            const guessRes = await makeGuess(roomId, activePlayerId, currentName.name_text)
            expect(guessRes.correct).toBe(true)
            const pState = getPlayerPersistentData(roomId, activePlayerId)
            expect(pState.nameSolved).toBe(true)
          } else if (mode === 'shared_target') {
            const nonHost = playerIds.find((id) => id !== hostId)!
            const guessRes = await makeGuess(roomId, nonHost, 'Kemal Sunal')
            expect(guessRes.correct).toBe(true)
            expect(guessRes.targetRevealed).toBe(true)
          }
        })

        it('Kural 3: Sıra ve aksiyon akışı kuralına uygun ilerler', async () => {
          const { roomId, hostId, playerIds } = await setupGameRoom()

          if (mode === 'classic') {
            const initialPlayer = fake.tables.rooms[0]!.current_player_id!
            const initialLives = getPlayerLives(roomId, initialPlayer)

            // Yanlış tahmin -> 1 can kaybeder, sıra devreder
            const guessRes = await makeGuess(roomId, initialPlayer, 'Tamamen Yanlış İsim')
            expect(guessRes.correct).toBe(false)
            expect(getPlayerLives(roomId, initialPlayer)).toBe(initialLives - 1)
            expect(fake.tables.rooms[0]!.current_player_id).not.toBe(initialPlayer)
          } else if (mode === 'speed') {
            const initialPlayer = fake.tables.rooms[0]!.current_player_id!
            const speedDataBefore = getPlayerSpeedData(roomId, initialPlayer)

            // Soru sorma (passTurn) -> soru sayacı 1 artar, sıra devreder
            const res = await passTurn(roomId, initialPlayer)
            expect(res.message).toContain('Sorunuz kaydedildi')
            expect(getPlayerSpeedData(roomId, initialPlayer).questionsThisRound).toBe(
              speedDataBefore.questionsThisRound + 1,
            )
            expect(fake.tables.rooms[0]!.current_player_id).not.toBe(initialPlayer)
          } else if (mode === 'persistent') {
            const initialPlayer = fake.tables.rooms[0]!.current_player_id!
            const pDataBefore = getPlayerPersistentData(roomId, initialPlayer)

            // Soru sorma (passTurn) -> bütçe 1 azalır, sıra devreder
            await passTurn(roomId, initialPlayer)
            const pDataAfter = getPlayerPersistentData(roomId, initialPlayer)
            expect(pDataAfter.questionBudgetRemaining).toBe(pDataBefore.questionBudgetRemaining - 1)
            expect(pDataAfter.totalQuestionsUsed).toBe(pDataBefore.totalQuestionsUsed + 1)
            expect(fake.tables.rooms[0]!.current_player_id).not.toBe(initialPlayer)
          } else if (mode === 'shared_target') {
            const currentAsker = fake.tables.rooms[0]!.current_player_id!
            expect(currentAsker).not.toBe(hostId)

            const askRes = await askSharedQuestion(roomId, currentAsker, 'Oyuncu mu?')
            expect(askRes.question.questionText).toBe('Oyuncu mu?')

            const ansRes = await answerSharedQuestion(roomId, hostId, askRes.question.id, 'yes')
            expect(ansRes.message).toContain('Cevap kaydedildi')
            if (count > 2) {
              expect(fake.tables.rooms[0]!.current_player_id).not.toBe(currentAsker)
            }
          }
        })

        it('Kural 4: Oyun bitiş koşulu sağlandığında finished durumuna ulaşır', async () => {
          const { roomId, hostId, playerIds } = await setupGameRoom()

          if (mode === 'classic') {
            // Tüm isimler bildirilirse oyun finished olur
            while (fake.tables.rooms[0]!.status === 'playing') {
              const activePlayerId = fake.tables.rooms[0]!.current_player_id
              const activeIdentityId = fake.tables.rooms[0]!.current_identity_id
              if (!activePlayerId || !activeIdentityId) break
              const nameRow = fake.tables.names.find((n) => n.id === activeIdentityId)
              if (!nameRow) break
              const res = await makeGuess(roomId, activePlayerId, nameRow.name_text)
              if (res.finished) break
            }
            const finalState = await getGameState(roomId, hostId)
            expect(finalState.room.status).toBe('finished')
            expect(finalState.room.isGameActive).toBe(false)
          } else if (mode === 'speed') {
            // Tüm oyuncular turlarını bitirince oyun biter
            fake.tables.rooms[0]!.game_round = 3
            for (const pid of playerIds) {
              setPlayerSpeedData(roomId, pid, {
                questionsThisRound: 2,
                roundScores: [90, 85],
                finishedCurrentRound: true,
              })
              const pRow = fake.tables.players.find((p) => p.id === pid)
              if (pRow) pRow.has_finished_round = true
            }

            // Son oyuncu son tahminini yapar
            const lastPlayerId = playerIds[0]!
            fake.tables.rooms[0]!.current_player_id = lastPlayerId
            const activeId = fake.tables.rooms[0]!.current_identity_id || fake.tables.names[0]!.id
            const nameRow = fake.tables.names.find((n) => n.id === activeId)!

            const res = await makeGuess(roomId, lastPlayerId, nameRow.name_text)
            expect(res.finished).toBe(true)
            expect(fake.tables.rooms[0]!.status).toBe('finished')
          } else if (mode === 'persistent') {
            // Tüm oyuncular solved olunca biter
            for (let i = 0; i < playerIds.length - 1; i++) {
              const pid = playerIds[i]!
              const pData = getPlayerPersistentData(roomId, pid)
              pData.nameSolved = true
            }

            const lastPid = playerIds[playerIds.length - 1]!
            fake.tables.rooms[0]!.current_player_id = lastPid
            const activeId = fake.tables.rooms[0]!.current_identity_id || fake.tables.names[0]!.id
            const nameRow = fake.tables.names.find((n) => n.id === activeId)!

            const res = await makeGuess(roomId, lastPid, nameRow.name_text)
            expect(res.finished).toBe(true)
            expect(fake.tables.rooms[0]!.status).toBe('finished')
          } else if (mode === 'shared_target') {
            // Son turda doğru tahmin yapıldığında
            fake.tables.rooms[0]!.game_round = 3
            const nonHost = playerIds.find((id) => id !== hostId)!
            const res = await makeGuess(roomId, nonHost, 'Kemal Sunal')
            expect(res.correct).toBe(true)
            expect(res.finished).toBe(true)
            expect(fake.tables.rooms[0]!.status).toBe('finished')
          }
        })
      })
    })
  })
})

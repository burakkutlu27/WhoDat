import { beforeEach, describe, expect, it, vi } from 'vitest'

import { buildPlayer, createSupabaseFake } from '@/test/supabaseFake'

let fake: ReturnType<typeof createSupabaseFake>

vi.mock('@/lib/supabaseAdmin', () => ({
  supabaseAdmin: () => fake.client,
}))

const {
  askTextQuestion,
  autoAssignNames,
  createRoom,
  getGameState,
  getPlayerPersistentData,
  makeGuess,
  passTurn,
  startGame,
  submitTextVote,
} = await import('./engine')

/**
 * Israrcı Mod sıra kuralı: sıra yalnızca tahmin hakları (can) bitince, isim bilinince
 * veya oyuncu kendisi pas geçince devredilir. Soru-cevap ve can kalan yanlış tahmin
 * sırayı devretmez.
 */

async function persistentRoom(communicationMode: 'voice' | 'text') {
  const { roomId, playerId: hostId } = await createRoom('Host', 'persistent', { communicationMode })
  const guest = buildPlayer(roomId, { nickname: 'Misafir' })
  fake.tables.players.push(guest)

  await autoAssignNames(roomId, hostId)
  await startGame(roomId, hostId)

  const activeId = fake.tables.rooms[0]!.current_player_id!
  const otherId = activeId === hostId ? guest.id : hostId
  return { roomId, activeId, otherId }
}

const currentPlayer = () => fake.tables.rooms[0]!.current_player_id

beforeEach(() => {
  fake = createSupabaseFake()
})

describe('Israrcı Mod sıra kuralı', () => {
  it('can kalan yanlış tahminde sıra oyuncuda kalır', async () => {
    const { roomId, activeId } = await persistentRoom('voice')

    const result = await makeGuess(roomId, activeId, 'Kesinlikle Yanlış İsim')

    expect(result.correct).toBe(false)
    expect(result.turnPassed).toBe(false)
    expect(result.livesLeft).toBe(2)
    expect(currentPlayer()).toBe(activeId)
  })

  it('son can da gidince sıra devredilir', async () => {
    const { roomId, activeId, otherId } = await persistentRoom('voice')

    await makeGuess(roomId, activeId, 'Yanlış 1')
    await makeGuess(roomId, activeId, 'Yanlış 2')
    const last = await makeGuess(roomId, activeId, 'Yanlış 3')

    expect(last.turnPassed).toBe(true)
    expect(currentPlayer()).toBe(otherId)
  })

  it('metin modunda oylama bitince sıra oyuncuda kalır ve yeniden soru sorabilir', async () => {
    const { roomId, activeId, otherId } = await persistentRoom('text')

    const { voteId } = await askTextQuestion(roomId, activeId, { questionText: 'Hayatta mıyım?' })
    const voteResult = await submitTextVote(roomId, otherId, voteId, true)

    expect(voteResult.isResolved).toBe(true)
    expect(voteResult.turnPassed).toBe(false)
    expect(currentPlayer()).toBe(activeId)

    const state = await getGameState(roomId, activeId)
    expect(state.you.isYourTurn).toBe(true)
    expect(state.you.hasAskedQuestionThisTurn).toBe(false)
    expect(state.you.clueCard).toHaveLength(1)

    await askTextQuestion(roomId, activeId, { questionText: 'Erkek miyim?' })
    expect(getPlayerPersistentData(roomId, activeId).questionBudgetRemaining).toBe(8)
  })

  it('metin modunda pas, bütçe düşürmeden sırayı devreder', async () => {
    const { roomId, activeId, otherId } = await persistentRoom('text')
    const { voteId } = await askTextQuestion(roomId, activeId, { questionText: 'Hayatta mıyım?' })
    await submitTextVote(roomId, otherId, voteId, false)

    await passTurn(roomId, activeId)

    expect(currentPlayer()).toBe(otherId)
    expect(getPlayerPersistentData(roomId, activeId).questionBudgetRemaining).toBe(9)
  })

  it('bütçesi biten oyuncu sesli modda da pas geçebilir, bütçe eksiye düşmez', async () => {
    const { roomId, activeId, otherId } = await persistentRoom('voice')
    getPlayerPersistentData(roomId, activeId).questionBudgetRemaining = 0

    await passTurn(roomId, activeId)

    expect(currentPlayer()).toBe(otherId)
    expect(getPlayerPersistentData(roomId, activeId).questionBudgetRemaining).toBe(0)
  })

  it('sesli modda "Cevap Hayır" bütçeden düşer ve sırayı devreder (değişmedi)', async () => {
    const { roomId, activeId, otherId } = await persistentRoom('voice')

    await passTurn(roomId, activeId)

    expect(currentPlayer()).toBe(otherId)
    expect(getPlayerPersistentData(roomId, activeId).questionBudgetRemaining).toBe(9)
  })
})

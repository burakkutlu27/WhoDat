import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { buildPlayer, createSupabaseFake } from '@/test/supabaseFake'

let fake: ReturnType<typeof createSupabaseFake>

vi.mock('@/lib/supabaseAdmin', () => ({
  supabaseAdmin: () => fake.client,
}))

const {
  addBot,
  askTextQuestion,
  autoAssignNames,
  createRoom,
  getGameState,
  getPlayerRoundNameId,
  removeBot,
  setCommunicationMode,
  startGame,
  submitNames,
  submitTextVote,
} = await import('../engine')
const { withRoomRuntime } = await import('../runtimeState')
const { runBotTick } = await import('./runner')

beforeEach(() => {
  fake = createSupabaseFake()
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date('2026-09-30T12:00:00Z'))
})

afterEach(() => {
  vi.useRealTimers()
})

/** Bot tetiklemesini route'taki gibi oda kapsamında çalıştırır. */
const tick = (roomId: string) => withRoomRuntime(roomId, () => runBotTick(roomId))
const later = (ms: number) => vi.setSystemTime(Date.now() + ms)

async function roomWithBot() {
  const { roomId, playerId: hostId } = await createRoom('Host', 'classic', { communicationMode: 'voice' })
  const { botId } = await addBot(roomId, hostId, 'zor')
  return { roomId, hostId, botId }
}

describe('addBot / removeBot', () => {
  it('bot ekler, odayı Tam Metin\'e çevirir ve bota veri setinden 3 isim yazar', async () => {
    const { roomId, botId } = await roomWithBot()

    const bot = fake.tables.players.find((player) => player.id === botId)!
    expect(bot).toMatchObject({ is_bot: true, bot_level: 'zor', is_host: false })
    expect(fake.tables.rooms[0]!.communication_mode).toBe('text')
    expect(fake.tables.names.filter((name) => name.submitted_by === botId)).toHaveLength(3)

    const state = await getGameState(roomId, fake.tables.players[0]!.id)
    expect(state.players.find((player) => player.id === botId)).toMatchObject({ isBot: true, botLevel: 'zor', hasSubmittedNames: true })
  })

  it('yalnızca host bot ekleyip çıkarabilir', async () => {
    const { roomId, botId } = await roomWithBot()
    const guest = buildPlayer(roomId, { nickname: 'Misafir' })
    fake.tables.players.push(guest)

    await expect(addBot(roomId, guest.id, 'kolay')).rejects.toMatchObject({ code: 'not_host' })
    await expect(removeBot(roomId, guest.id, botId)).rejects.toMatchObject({ code: 'not_host' })
  })

  it('bot çıkarılınca botun isimleri de havuzdan silinir', async () => {
    const { roomId, hostId, botId } = await roomWithBot()

    await removeBot(roomId, hostId, botId)

    expect(fake.tables.players.some((player) => player.id === botId)).toBe(false)
    expect(fake.tables.names.some((name) => name.submitted_by === botId)).toBe(false)
  })

  it('botlu odada sesli moda geçilemez ve listede olmayan isim girilemez', async () => {
    const { roomId, hostId } = await roomWithBot()

    await expect(setCommunicationMode(roomId, hostId, 'voice')).rejects.toMatchObject({ code: 'bots_need_text_mode' })
    await expect(submitNames(roomId, hostId, ['Tarkan', 'Uydurma Birisi', 'Barış Manço'])).rejects.toMatchObject({
      code: 'unknown_name_for_bots',
    })
  })
})

describe('runBotTick', () => {
  async function startedGame() {
    const { roomId, hostId, botId } = await roomWithBot()
    await autoAssignNames(roomId, hostId)
    await startGame(roomId, hostId)
    return { roomId, hostId, botId }
  }

  it('bot hamlesini önce zamanlar, süre dolunca tek sefer yapar', async () => {
    const { roomId, botId } = await startedGame()
    fake.tables.rooms[0]!.current_player_id = botId
    const turnBefore = fake.tables.rooms[0]!.updated_at

    await tick(roomId)
    expect(fake.tables.question_votes ?? []).toHaveLength(0)
    expect(fake.tables.room_runtime![0]!.bot_next_action_at).not.toBeNull()

    // Süre dolmadan tekrar tetiklemek bir şey yapmaz.
    await tick(roomId)
    expect(fake.tables.question_votes ?? []).toHaveLength(0)

    later(5000)
    await Promise.all([tick(roomId), tick(roomId)])

    const acted = (fake.tables.question_votes ?? []).length + (fake.tables.rooms[0]!.updated_at !== turnBefore ? 1 : 0)
    expect(acted).toBeGreaterThan(0)
    // Eşzamanlı iki tetikleme tek hamle üretir.
    expect((fake.tables.question_votes ?? []).length).toBeLessThanOrEqual(1)
  })

  it('insan soru sorunca bot oy verir ve oylama kapanınca sıra bota geçer', async () => {
    const { roomId, hostId, botId } = await startedGame()
    fake.tables.rooms[0]!.current_player_id = hostId

    const { voteId } = await withRoomRuntime(roomId, () => askTextQuestion(roomId, hostId, { questionId: 'qb-01' }))

    await tick(roomId) // zamanla
    later(3000)
    await tick(roomId) // oy ver

    const response = (fake.tables.question_vote_responses ?? []).find((row) => row.vote_id === voteId)
    expect(response?.responder_player_id).toBe(botId)
    // Tek seçmen bottu: oylama kapandı, Klasik modda sıra bir sonraki oyuncuya geçti.
    expect(fake.tables.question_votes!.find((vote) => vote.id === voteId)!.status).toBe('closed')
    expect(fake.tables.rooms[0]!.current_player_id).toBe(botId)
  })

  it('bot, insanın sorusuna hedef hakkındaki doğru cevabı verir (zor bot)', async () => {
    const { roomId, hostId } = await startedGame()
    fake.tables.rooms[0]!.current_player_id = hostId
    // Sıra elle verildiği için current_identity_id hâlâ ilk oyuncunun ismi olabilir; host'un kendi ismine bak.
    const hostTargetId = getPlayerRoundNameId(roomId, hostId)
    const hostTarget = fake.tables.names.find((name) => name.id === hostTargetId)!

    const { voteId } = await withRoomRuntime(roomId, () => askTextQuestion(roomId, hostId, { questionId: 'qb-01' }))
    await tick(roomId)
    later(3000)
    await tick(roomId)

    const { lookupAttributes } = await import('./knowledge')
    const truth = lookupAttributes(hostTarget.name_text)?.r
    const response = fake.tables.question_vote_responses!.find((row) => row.vote_id === voteId)!
    if (truth !== undefined) expect(response.answer).toBe(truth)
  })

  it('oyuncu oy vermişse bot aynı oylamaya ikinci kez oy vermez', async () => {
    const { roomId, hostId, botId } = await startedGame()
    fake.tables.rooms[0]!.current_player_id = hostId
    const { voteId } = await withRoomRuntime(roomId, () => askTextQuestion(roomId, hostId, { questionId: 'qb-05' }))
    await withRoomRuntime(roomId, () => submitTextVote(roomId, botId, voteId, true)).catch(() => undefined)

    const before = (fake.tables.question_vote_responses ?? []).length
    await tick(roomId)
    later(3000)
    await tick(roomId)
    expect((fake.tables.question_vote_responses ?? []).length).toBe(before)
  })
})

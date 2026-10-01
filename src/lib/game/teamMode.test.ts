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
  getPlayerLives,
  getTeamConfig,
  makeGuess,
  moveToTeamInLobby,
  passTurn,
  postTeamNote,
  setRoomMode,
  setTeamMode,
  startGame,
} = await import('./engine')

beforeEach(() => {
  fake = createSupabaseFake()
})

/**
 * 2v2 oda: Kırmızı = [host, a2], Mavi = [b1, b2]. Takımlar elle kurulur ki sıra deterministik olsun.
 */
async function twoVsTwo(communicationMode: 'voice' | 'text' = 'voice', gameMode: 'classic' | 'speed' = 'classic') {
  const { roomId, playerId: host } = await createRoom('Host', gameMode, { communicationMode })
  const [a2, b1, b2] = ['A2', 'B1', 'B2'].map((nickname) => buildPlayer(roomId, { nickname }))
  fake.tables.players.push(a2!, b1!, b2!)

  await setTeamMode(roomId, host, { enabled: true, teamCount: 2 })
  for (const id of [host, a2!.id]) await moveToTeamInLobby(roomId, host, id, 'red')
  for (const id of [b1!.id, b2!.id]) await moveToTeamInLobby(roomId, host, id, 'blue')

  await autoAssignNames(roomId, host)
  await startGame(roomId, host)
  return { roomId, host, a2: a2!.id, b1: b1!.id, b2: b2!.id }
}

const current = () => fake.tables.rooms[0]!.current_player_id
const currentName = () => fake.tables.names.find((n) => n.id === fake.tables.rooms[0]!.current_identity_id)!

describe('Takım modu', () => {
  it('sıra takımlar arasında dönüşümlü döner: A1 → B1 → A2 → B2', async () => {
    const { roomId, host, a2, b1, b2 } = await twoVsTwo()
    const order = [current()]
    for (let i = 0; i < 3; i++) {
      await passTurn(roomId, current()!)
      order.push(current())
    }
    expect(order).toEqual([host, b1, a2, b2])
  })

  it('takım canı ortaktır: bir üyenin yanlış tahmini tüm takımın canını düşürür', async () => {
    const { roomId, host, a2, b1 } = await twoVsTwo()
    await makeGuess(roomId, host, 'Kesinlikle Yanlış İsim')

    expect(getPlayerLives(roomId, host)).toBe(2)
    expect(getPlayerLives(roomId, a2)).toBe(2)
    expect(getPlayerLives(roomId, b1)).toBe(3)
  })

  it('takım ismi ortaktır ve takımın tamamından gizlenir; rakip takım görür', async () => {
    const { roomId, host, a2, b1 } = await twoVsTwo()

    const hostView = await getGameState(roomId, host)
    const teammateView = await getGameState(roomId, a2)
    const rivalView = await getGameState(roomId, b1)

    expect(hostView.currentName).toBeNull()
    expect(teammateView.currentName).toBeNull()
    expect(rivalView.currentName).toBe(currentName().name_text)
    expect(hostView.you.targetNameId).toBe(teammateView.you.targetNameId)
  })

  it('takıma hiçbir üyesinin yazdığı isim verilmez', async () => {
    for (let run = 0; run < 5; run++) {
      fake = createSupabaseFake()
      const { roomId, host, a2, b1, b2 } = await twoVsTwo()
      const redTargetId = (await getGameState(roomId, host)).you.targetNameId
      const blueTargetId = (await getGameState(roomId, b1)).you.targetNameId
      const redTarget = fake.tables.names.find((n) => n.id === redTargetId)!
      const blueTarget = fake.tables.names.find((n) => n.id === blueTargetId)!
      expect([host, a2]).not.toContain(redTarget.submitted_by)
      expect([b1, b2]).not.toContain(blueTarget.submitted_by)
    }
  })

  it('bir üye doğru bilince tüm takım yeni isme geçer', async () => {
    const { roomId, host, a2 } = await twoVsTwo()
    const solved = currentName()

    const result = await makeGuess(roomId, host, solved.name_text)

    expect(result.correct).toBe(true)
    const hostTarget = (await getGameState(roomId, host)).you.targetNameId
    const a2Target = (await getGameState(roomId, a2)).you.targetNameId
    expect(hostTarget).not.toBe(solved.id)
    expect(a2Target).toBe(hostTarget)
  })

  it('Tam Metin: soranın takım arkadaşı oy veremez, ipucu kartı takımca paylaşılır', async () => {
    const { roomId, host, a2, b1, b2 } = await twoVsTwo('text')
    await askTextQuestion(roomId, host, { questionId: 'qb-01' })

    const teammateView = await getGameState(roomId, a2)
    const rivalView = await getGameState(roomId, b1)
    expect(teammateView.room.activeVote?.totalEligible).toBe(2)
    expect(rivalView.room.activeVote?.totalEligible).toBe(2)

    const { submitTextVote } = await import('./engine')
    const voteId = rivalView.room.activeVote!.id
    await expect(submitTextVote(roomId, a2, voteId, true)).rejects.toMatchObject({ code: 'not_eligible_voter' })
    await submitTextVote(roomId, b1, voteId, true)
    await submitTextVote(roomId, b2, voteId, true)

    const a2Clues = (await getGameState(roomId, a2)).you.clueCard ?? []
    expect(a2Clues.map((item) => item.questionText)).toContain('Gerçek hayatta yaşamış veya yaşayan bir insan mıyım?')
    expect((await getGameState(roomId, b1)).you.clueCard ?? []).toHaveLength(0)
  })

  it('takım notu yalnızca takıma gider', async () => {
    const { roomId, host, a2, b1 } = await twoVsTwo()
    await postTeamNote(roomId, host, 'bence gerçek kişi')

    expect((await getGameState(roomId, a2)).you.teamNotes?.map((n) => n.message)).toEqual(['bence gerçek kişi'])
    expect((await getGameState(roomId, b1)).you.teamNotes).toEqual([])
  })

  it('takım puanı üyelerin puan toplamıdır', async () => {
    const { roomId, host } = await twoVsTwo()
    await makeGuess(roomId, host, currentName().name_text)

    const teams = (await getGameState(roomId, host)).room.teams!
    const red = teams.find((team) => team.id === 'red')!
    expect(red.score).toBeGreaterThan(0)
    expect(teams.find((team) => team.id === 'blue')!.score).toBe(0)
  })

  it('eşit olmayan takımlarla oyun başlamaz; takım modunda desteklenmeyen mod seçilemez', async () => {
    const { roomId, playerId: host } = await createRoom('Host', 'classic')
    const others = ['A2', 'B1'].map((nickname) => buildPlayer(roomId, { nickname }))
    fake.tables.players.push(...others)
    await setTeamMode(roomId, host, { enabled: true, teamCount: 2 })
    await moveToTeamInLobby(roomId, host, host, 'red')
    await moveToTeamInLobby(roomId, host, others[0]!.id, 'red')
    await moveToTeamInLobby(roomId, host, others[1]!.id, 'blue')
    await autoAssignNames(roomId, host)

    await expect(startGame(roomId, host)).rejects.toMatchObject({ code: 'uneven_teams' })
    await expect(setRoomMode(roomId, host, 'persistent')).rejects.toMatchObject({ code: 'team_mode_unsupported' })
  })

  it('oyuncu kendini taşıyabilir, başkasını yalnızca host taşıyabilir', async () => {
    const { roomId, playerId: host } = await createRoom('Host', 'classic')
    const [p2, p3] = ['P2', 'P3'].map((nickname) => buildPlayer(roomId, { nickname }))
    fake.tables.players.push(p2!, p3!)
    await setTeamMode(roomId, host, { enabled: true, teamCount: 2 })

    await moveToTeamInLobby(roomId, p2!.id, p2!.id, 'blue')
    expect(getTeamConfig(roomId)!.teams.find((t) => t.id === 'blue')!.memberIds).toContain(p2!.id)
    await expect(moveToTeamInLobby(roomId, p2!.id, p3!.id, 'red')).rejects.toMatchObject({ code: 'not_host' })
  })

  it('Hız modunda takım turu birlikte bitirir', async () => {
    const { roomId, host, a2 } = await twoVsTwo('voice', 'speed')
    await makeGuess(roomId, host, currentName().name_text)

    expect((await getGameState(roomId, a2)).you.hasFinishedRound).toBe(true)
  })
})

import 'server-only'

import type { NameRow, PlayerRow, RoomRow } from '../../database.types'
import { ApiError } from '../../http'
import { supabaseAdmin } from '../../supabaseAdmin'
import {
  askTextQuestion,
  getActivePhaseCategory,
  getActiveTextVote,
  getBotMemory,
  getPlayerClueCardDb,
  getPlayerPersistentData,
  getPlayerRoundNameId,
  getRoomCategoryData,
  getRoomDifficulty,
  getRoomMode,
  hasPlayerAskedQuestionInTurn,
  isTeammate,
  makeGuess,
  passTurn,
  setBotMemory,
  submitTextVote,
} from '../engine'
import { FAMOUS_PEOPLE_SEED } from '../famousPeopleData'
import { filterByDifficulty } from '../rules'
import type { BotLevel, DifficultyLevel, FamousPersonCategory } from '../types'
import { decideAction, filterCandidates, toCandidates, voteAnswer, type Candidate, type ClueObservation } from './brain'
import { questionIdForText } from './knowledge'

/**
 * Bot tetikleyicisi.
 *
 * Arka planda çalışan bir süreç yok (serverless); oyun durumu her okunduğunda (istemciler
 * 1–2 sn'de bir /state çağırıyor) sıradaki bot işi kontrol edilir — oylamaları kapatan
 * "lazy cleanup" deseniyle aynı. Botlar insan gibi görünsün diye her hamle önce
 * zamanlanır, süre dolunca yapılır.
 *
 * Aynı hamlenin iki kez yapılmaması: süre dolmuş zamanlama, room_runtime.bot_next_action_at
 * üzerinde "update … where = <okunan> returning" ile atomik alınır; yalnızca alan instance
 * hamleyi yapar.
 *
 * Adil oyun: bot kendi ismini hiç okumaz. Yalnızca bir insanın da bildiklerini kullanır —
 * ipucu kartı, diğer oyunculara atanmış (ekranda görünen) isimler ve kendi yazdığı isimler.
 */

const TURN_DELAY_MS: [number, number] = [1500, 4000]
const VOTE_DELAY_MS: [number, number] = [1000, 2500]

type BotWork =
  | { kind: 'vote'; bot: PlayerRow; voteId: string; questionText: string; askerTargetName: string | null }
  | { kind: 'turn'; bot: PlayerRow }

function randomDelay([min, max]: [number, number]): number {
  return min + Math.random() * (max - min)
}

async function loadTables(roomId: string) {
  const admin = supabaseAdmin()
  const [{ data: room }, { data: players }, { data: names }] = await Promise.all([
    admin.from('rooms').select('*').eq('id', roomId).maybeSingle(),
    admin.from('players').select('*').eq('room_id', roomId).order('created_at', { ascending: true }),
    admin.from('names').select('*').eq('room_id', roomId),
  ])
  return { room: room as RoomRow | null, players: (players ?? []) as PlayerRow[], names: (names ?? []) as NameRow[] }
}

async function findWork(room: RoomRow, players: PlayerRow[], names: NameRow[]): Promise<BotWork | null> {
  const bots = players.filter((player) => player.is_bot)
  if (bots.length === 0) return null

  const vote = await getActiveTextVote(room.id, players)
  if (vote && vote.status === 'open') {
    const voter = bots.find((bot) => vote.eligibleVoterIds.has(bot.id) && !vote.responses.has(bot.id))
    if (!voter) return null // Oylama sürerken sıradaki oyuncu hamle yapamaz.
    const askerTargetId = getPlayerRoundNameId(room.id, vote.askerId) ?? room.current_identity_id
    return {
      kind: 'vote',
      bot: voter,
      voteId: vote.id,
      questionText: vote.questionText,
      askerTargetName: names.find((name) => name.id === askerTargetId)?.name_text ?? null,
    }
  }

  const current = bots.find((bot) => bot.id === room.current_player_id)
  return current ? { kind: 'turn', bot: current } : null
}

/** Zamanlama: yoksa kurar (false döner); süresi dolmuşsa atomik olarak alır (true döner). */
async function claimSlot(roomId: string, delayMs: number): Promise<boolean> {
  const admin = supabaseAdmin()
  const { data: row } = await admin.from('room_runtime').select('bot_next_action_at').eq('room_id', roomId).maybeSingle()
  if (!row) return false

  const scheduled = row.bot_next_action_at
  if (!scheduled) {
    await admin
      .from('room_runtime')
      .update({ bot_next_action_at: new Date(Date.now() + delayMs).toISOString() })
      .eq('room_id', roomId)
    return false
  }
  if (new Date(scheduled).getTime() > Date.now()) return false

  const { data: claimed } = await admin
    .from('room_runtime')
    .update({ bot_next_action_at: null })
    .eq('room_id', roomId)
    .eq('bot_next_action_at', scheduled)
    .select('room_id')
  return (claimed?.length ?? 0) > 0
}

const poolCache = new Map<string, Candidate[]>()

/** Oda kategorisi ve zorluğuna uygun ünlüler (bir insanın aklından geçirebileceği aday uzayı). */
function candidatePool(category: FamousPersonCategory, difficulty: DifficultyLevel): Candidate[] {
  const key = `${category}:${difficulty}`
  let pool = poolCache.get(key)
  if (!pool) {
    const people = FAMOUS_PEOPLE_SEED
      .filter((person) => category === 'all' || person.category === category)
      .map((person) => ({ id: person.name, name: person.name, category: person.category, fameTier: person.fameTier }))
    pool = toCandidates(filterByDifficulty(people, difficulty))
    poolCache.set(key, pool)
  }
  return pool
}

async function playTurn(room: RoomRow, players: PlayerRow[], names: NameRow[], bot: PlayerRow): Promise<void> {
  const roomId = room.id
  const level = (bot.bot_level ?? 'orta') as BotLevel
  const gameMode = getRoomMode(roomId, room.game_mode)

  // Hedef ismi değişince (çözüldü / yeni isim) eski yanlış tahminler anlamsız.
  const targetKey = getPlayerRoundNameId(roomId, bot.id)
  let memory = getBotMemory(roomId, bot.id)
  if (memory.targetKey !== targetKey) memory = { targetKey, wrongGuesses: [] }

  const clueCard = await getPlayerClueCardDb(roomId, bot.id, players)
  const clues: ClueObservation[] = []
  const askedIds = new Set<string>()
  for (const item of clueCard) {
    const questionId = questionIdForText(item.questionText)
    if (!questionId) continue
    askedIds.add(questionId)
    if (item.majority !== 'tie') clues.push({ questionId, answer: item.majority === 'yes' })
  }

  const visibleToBot = new Set<string>(memory.wrongGuesses)
  for (const player of players) {
    // Takım arkadaşının ismi botun kendi hedefiyle aynı; onu elemek doğru cevabı elemek olurdu.
    if (isTeammate(roomId, bot.id, player.id)) continue
    const nameId = getPlayerRoundNameId(roomId, player.id)
    const text = names.find((name) => name.id === nameId)?.name_text
    if (text) visibleToBot.add(text)
  }
  for (const name of names) {
    if (name.submitted_by === bot.id) visibleToBot.add(name.name_text)
  }

  const categoryData = getRoomCategoryData(roomId, room)
  const pool = candidatePool(getActivePhaseCategory(categoryData), getRoomDifficulty(roomId, room.difficulty))
  const candidates = filterCandidates(pool, clues, visibleToBot)

  const canAsk =
    gameMode === 'persistent'
      ? getPlayerPersistentData(roomId, bot.id).questionBudgetRemaining > 0
      : gameMode === 'classic'
        ? !hasPlayerAskedQuestionInTurn(roomId, bot.id)
        : true

  const action = decideAction({ candidates, askedIds, canAsk, level })

  if (action.type === 'ask') {
    await askTextQuestion(roomId, bot.id, { questionId: action.questionId })
  } else if (action.type === 'guess') {
    const result = await makeGuess(roomId, bot.id, action.name)
    if (!result.correct) memory = { ...memory, wrongGuesses: [...memory.wrongGuesses, action.name] }
  } else {
    await passTurn(roomId, bot.id)
  }
  setBotMemory(roomId, bot.id, memory)
}

async function castVote(roomId: string, work: Extract<BotWork, { kind: 'vote' }>): Promise<void> {
  const level = (work.bot.bot_level ?? 'orta') as BotLevel
  const questionId = questionIdForText(work.questionText)
  // Bot bilmediği (özel metinli veya verisi olmayan) soruda da oy verir; aksi halde oylama
  // 30 sn zaman aşımını beklerdi. İnsan seçmenler varsa çoğunluğu onlar belirler.
  const answer = (work.askerTargetName ? voteAnswer(questionId, work.askerTargetName, level) : null) ?? Math.random() < 0.5
  await submitTextVote(roomId, work.bot.id, work.voteId, answer)
}

/**
 * Sıradaki bot işini (varsa) yapar. Çağıran, oda runtime kapsamında olmalı (roomRoute).
 * Hata oyunu bozmasın: bot hamlesi reddedilirse (ör. durum arada değişti) sessizce atlanır.
 */
export async function runBotTick(roomId: string): Promise<void> {
  const { room, players, names } = await loadTables(roomId)
  if (!room || room.status !== 'playing' || !room.is_game_active) return

  const work = await findWork(room, players, names)
  if (!work) return

  const delay = randomDelay(work.kind === 'vote' ? VOTE_DELAY_MS : TURN_DELAY_MS)
  if (!(await claimSlot(roomId, delay))) return

  try {
    if (work.kind === 'vote') await castVote(roomId, work)
    else await playTurn(room, players, names, work.bot)
  } catch (error) {
    if (error instanceof ApiError) return
    throw error
  }
}

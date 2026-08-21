import 'server-only'

import { randomUUID } from 'node:crypto'

import type { Database, NameRow, PlayerRow, RoomRow, RoomStatus } from '../database.types'
import { badRequest, conflict, forbidden, notFound } from '../http'
import { supabaseAdmin } from '../supabaseAdmin'
import { FAMOUS_PEOPLE_SEED } from './famousPeopleData'
import { fuzzyMatch } from './matching'
import { QUESTION_BANK_SEED } from './questionBankData'
import type { AutoAssignResult, ClueCardItem, CommunicationMode, DeviceStats, DifficultyLevel, FamousPerson, FamousPersonCategory, GameMode, GameState, GuessResult, LobbyCategoryMode, NameSuggestion, PublicPlayer, RecentGameItem, SharedQuestionItem, SuggestNamePayload, TextQuestionVote } from './types'
import {
  DEFAULT_SHARED_TARGET_ROUNDS,
  DEFAULT_SPEED_ROUNDS,
  MAX_NAMES_PER_PLAYER,
  MAX_PLAYERS,
  MIN_PLAYERS,
  PERSISTENT_MODE_QUESTION_BUDGET,
  POINTS_PER_CORRECT_GUESS,
  SHARED_TARGET_POINTS_PER_WIN,
  SPEED_MODE_MAX_QUESTIONS,
  TOTAL_LIVES_PER_GAME,
  calculatePersistentScore,
  calculateSpeedScore,
  estimatePersistentScore,
  estimateSpeedScore,
  filterByDifficulty,
  generateRoomCode,
  selectNextPlayer,
  selectNextSharedTargetAsker,
} from './rules'

/**
 * Oyunun yetkili (authoritative) mantığı.
 *
 * INVARIANT'LAR (Değişmez Kurallar):
 * INV-1: game_mode sabittir. Lobi kilitlenip oyun başladığında asla değişmez, resetlenmez.
 * INV-2: Host idari roldür; oyun mantığında (soru sorma, tahmin, puanlama) diğer oyuncularla birebirdir (Ortak Hedef modunda Hakemdir).
 * INV-3: Soru sayacı kim aksiyon alırsa (soru veya tahmin, doğru/yanlış) 1 artar.
 * INV-4: Klasik mod ve Hız Modu birbirinden tamamen izole edilmiş dallara sahiptir.
 */

const UNIQUE_VIOLATION = '23505'

interface RoomModeData {
  gameMode: GameMode
  totalRounds: number
}

export interface RoomCategoryData {
  categoryMode: LobbyCategoryMode
  category: FamousPersonCategory
  phaseCategories: FamousPersonCategory[]
  currentPhase: number
  totalPhases: number
  phaseIntermission?: {
    completedPhase: number
    nextPhase: number
    readyPlayerIds: string[]
  } | null
}

interface PlayerSpeedData {
  questionsThisRound: number
  roundScores: number[]
  finishedCurrentRound: boolean
}

// Global persistent state across Next.js dev server worker/HMR reloads
interface PlayerPersistentData {
  questionBudgetRemaining: number
  totalQuestionsUsed: number
  nameSolved: boolean
  roundScore: number
}

// Ortak Hedef Modu State
interface SharedTargetRoomData {
  targetName: string | null
  targetRevealed: boolean
  roundWinnerId: string | null
  questionLog: SharedQuestionItem[]
  pendingQuestion: SharedQuestionItem | null
  playerPenalties: Map<string, boolean>
  roundScores: Map<string, number[]>
}

// Tam Metin Modu Oylama Oturumu State
export const TEXT_VOTE_DURATION_MS = 30000 // 30 saniye

export interface TextQuestionVoteInternal {
  id: string
  roomId: string
  askerId: string
  askerNickname: string
  questionText: string
  status: 'open' | 'closed'
  openedAt: number
  closesAt: number
  responses: Map<string, boolean>
  eligibleVoterIds: Set<string>
}

const globalRef = globalThis as unknown as {
  __whoDat_roomModeStore?: Map<string, RoomModeData>
  __whoDat_roomCommunicationModeStore?: Map<string, CommunicationMode>
  __whoDat_roomDifficultyStore?: Map<string, DifficultyLevel>
  __whoDat_roomCategoryStore?: Map<string, RoomCategoryData>
  __whoDat_playerSpeedStore?: Map<string, Map<string, PlayerSpeedData>>
  __whoDat_playerRoundNameStore?: Map<string, Map<string, string>>
  __whoDat_roomLivesStore?: Map<string, Map<string, number>>
  __whoDat_roomUsedNamesStore?: Map<string, Set<string>>
  __whoDat_playerPersistentStore?: Map<string, Map<string, PlayerPersistentData>>
  __whoDat_sharedTargetStore?: Map<string, SharedTargetRoomData>
  __whoDat_roomActiveVoteStore?: Map<string, TextQuestionVoteInternal>
  __whoDat_playerClueCardStore?: Map<string, Map<string, ClueCardItem[]>>
  __whoDat_playerSubmittedPhaseNamesStore?: Map<string, Map<string, string[]>>
  __whoDat_playerClassicSolvedStore?: Map<string, Set<string>>
  __whoDat_playerPassRightsStore?: Map<string, Map<string, number>>
  __whoDat_classicRetiredNamesStore?: Map<string, Set<string>>
  __whoDat_playerTurnAskedStore?: Map<string, Set<string>>
}

globalRef.__whoDat_roomModeStore = globalRef.__whoDat_roomModeStore ?? new Map()
globalRef.__whoDat_roomCommunicationModeStore = globalRef.__whoDat_roomCommunicationModeStore ?? new Map()
globalRef.__whoDat_roomDifficultyStore = globalRef.__whoDat_roomDifficultyStore ?? new Map()
globalRef.__whoDat_roomCategoryStore = globalRef.__whoDat_roomCategoryStore ?? new Map()
globalRef.__whoDat_playerSpeedStore = globalRef.__whoDat_playerSpeedStore ?? new Map()
globalRef.__whoDat_playerRoundNameStore = globalRef.__whoDat_playerRoundNameStore ?? new Map()
globalRef.__whoDat_roomLivesStore = globalRef.__whoDat_roomLivesStore ?? new Map()
globalRef.__whoDat_roomUsedNamesStore = globalRef.__whoDat_roomUsedNamesStore ?? new Map()
globalRef.__whoDat_playerPersistentStore = globalRef.__whoDat_playerPersistentStore ?? new Map()
globalRef.__whoDat_sharedTargetStore = globalRef.__whoDat_sharedTargetStore ?? new Map()
globalRef.__whoDat_roomActiveVoteStore = globalRef.__whoDat_roomActiveVoteStore ?? new Map()
globalRef.__whoDat_playerClueCardStore = globalRef.__whoDat_playerClueCardStore ?? new Map()
globalRef.__whoDat_playerSubmittedPhaseNamesStore = globalRef.__whoDat_playerSubmittedPhaseNamesStore ?? new Map()
globalRef.__whoDat_playerClassicSolvedStore = globalRef.__whoDat_playerClassicSolvedStore ?? new Map()
globalRef.__whoDat_playerPassRightsStore = globalRef.__whoDat_playerPassRightsStore ?? new Map()
globalRef.__whoDat_classicRetiredNamesStore = globalRef.__whoDat_classicRetiredNamesStore ?? new Map()
globalRef.__whoDat_playerTurnAskedStore = globalRef.__whoDat_playerTurnAskedStore ?? new Map()

const roomModeStore = globalRef.__whoDat_roomModeStore
const roomCommunicationModeStore = globalRef.__whoDat_roomCommunicationModeStore
const roomDifficultyStore = globalRef.__whoDat_roomDifficultyStore
const roomCategoryStore = globalRef.__whoDat_roomCategoryStore
const playerSpeedStore = globalRef.__whoDat_playerSpeedStore
const playerRoundNameStore = globalRef.__whoDat_playerRoundNameStore
const roomLivesStore = globalRef.__whoDat_roomLivesStore
const roomUsedNamesStore = globalRef.__whoDat_roomUsedNamesStore
const playerPersistentStore = globalRef.__whoDat_playerPersistentStore
const sharedTargetStore = globalRef.__whoDat_sharedTargetStore
const roomActiveVoteStore = globalRef.__whoDat_roomActiveVoteStore
const playerClueCardStore = globalRef.__whoDat_playerClueCardStore
const playerSubmittedPhaseNamesStore = globalRef.__whoDat_playerSubmittedPhaseNamesStore
const playerClassicSolvedStore = globalRef.__whoDat_playerClassicSolvedStore
const playerPassRightsStore = globalRef.__whoDat_playerPassRightsStore
const classicRetiredNamesStore = globalRef.__whoDat_classicRetiredNamesStore
const playerTurnAskedStore = globalRef.__whoDat_playerTurnAskedStore

export const CLASSIC_MODE_MAX_PASSES = 3 // Oyuncu başına oyun boyunca en fazla 3 isim pas geçme hakkı

export function getPlayerPassRights(roomId: string, playerId: string): number {
  const map = playerPassRightsStore.get(roomId)
  return map?.get(playerId) ?? CLASSIC_MODE_MAX_PASSES
}

export function setPlayerPassRights(roomId: string, playerId: string, rights: number): void {
  let map = playerPassRightsStore.get(roomId)
  if (!map) {
    map = new Map()
    playerPassRightsStore.set(roomId, map)
  }
  map.set(playerId, Math.max(0, rights))
}

export function getClassicRetiredNames(roomId: string): Set<string> {
  let set = classicRetiredNamesStore.get(roomId)
  if (!set) {
    set = new Set()
    classicRetiredNamesStore.set(roomId, set)
  }
  return set
}

export function retireClassicName(roomId: string, nameId: string): void {
  getClassicRetiredNames(roomId).add(nameId)
}

export function isPlayerClassicSolved(roomId: string, playerId: string): boolean {
  return playerClassicSolvedStore.get(roomId)?.has(playerId) ?? false
}

export function setPlayerClassicSolved(roomId: string, playerId: string, solved: boolean): void {
  let set = playerClassicSolvedStore.get(roomId)
  if (!set) {
    set = new Set()
    playerClassicSolvedStore.set(roomId, set)
  }
  if (solved) {
    set.add(playerId)
  } else {
    set.delete(playerId)
  }
}

/**
 * Klasik Mod: Oyuncuya havuzdan daha önce kullanılmamış/emekliye ayrılmamış yeni bir gizli isim atar
 * ve o isim için deneme hakkını 3'e resetler.
 * Emekliye ayrılmış isimler ve şu an başka bir oyuncuda olan isimler havuzdan çıkarılır.
 * Oyuncunun kendi yazdığı isim KESİNLİKLE ATANMAZ (fallback yapılmaz).
 */
export async function assignNewClassicName(
  roomId: string,
  player: PlayerRow,
  names: NameRow[],
): Promise<string | null> {
  const retiredSet = getClassicRetiredNames(roomId)
  const roomNameMap = playerRoundNameStore.get(roomId)
  const currentlyAssignedToOthers = new Set<string>()
  if (roomNameMap) {
    for (const [pid, nameId] of roomNameMap.entries()) {
      if (pid !== player.id && nameId) {
        currentlyAssignedToOthers.add(nameId)
      }
    }
  }
  for (const n of names) {
    if (n.assigned_to && n.assigned_to !== player.id && (n.used_in_round == null)) {
      currentlyAssignedToOthers.add(n.id)
    }
  }

  // Kullanılabilir isimler: KESİNLİKLE oyuncunun kendi yazmadığı, emekli olmayan, DB'de used_in_round olmayan ve başka bir oyuncunun elinde olmayan isimler
  const pool = names.filter(
    (n) =>
      n.submitted_by !== player.id &&
      !retiredSet.has(n.id) &&
      (n.used_in_round == null) &&
      !currentlyAssignedToOthers.has(n.id),
  )

  if (pool.length === 0) {
    // Havuzda bu oyuncu için isim kalmadı -> Erken tamamlama (Kural 6)
    setPlayerRoundNameId(roomId, player.id, null)
    setPlayerClassicSolved(roomId, player.id, true)
    return null
  }

  const picked = pool[Math.floor(Math.random() * pool.length)]!
  setPlayerRoundNameId(roomId, player.id, picked.id)
  setPlayerLives(roomId, player.id, TOTAL_LIVES_PER_GAME)
  setPlayerClassicSolved(roomId, player.id, false)
  try {
    await supabaseAdmin().from('names').update({ assigned_to: player.id }).eq('id', picked.id)
  } catch {
    // ignore
  }
  return picked.id
}

/**
 * Kategori Lobisi & Faz Store Yardımcıları
 */
export function getRoomCategoryData(
  roomId: string,
  dbRoom?: {
    category_mode?: string | null
    selected_category?: string | null
    phase_categories?: unknown
    current_phase?: number | null
    total_phases?: number | null
  },
): RoomCategoryData {
  const stored = roomCategoryStore.get(roomId)
  if (stored) {
    return stored
  }

  const categoryMode: LobbyCategoryMode = dbRoom?.category_mode === 'multi_phase' ? 'multi_phase' : 'single'
  const category: FamousPersonCategory = (dbRoom?.selected_category as FamousPersonCategory) || 'all'
  let phaseCategories: FamousPersonCategory[] = ['unluler', 'sporcular', 'cizgi_karakterler']
  if (Array.isArray(dbRoom?.phase_categories) && dbRoom.phase_categories.length > 0) {
    phaseCategories = dbRoom.phase_categories as FamousPersonCategory[]
  }
  const currentPhase = dbRoom?.current_phase || 1
  const totalPhases = categoryMode === 'multi_phase' ? 3 : 1

  const data: RoomCategoryData = {
    categoryMode,
    category,
    phaseCategories,
    currentPhase,
    totalPhases,
  }
  roomCategoryStore.set(roomId, data)
  return data
}

export function setRoomCategoryData(
  roomId: string,
  data: Partial<RoomCategoryData>,
): RoomCategoryData {
  const existing = getRoomCategoryData(roomId)
  const categoryMode = data.categoryMode ?? existing.categoryMode
  const totalPhases = categoryMode === 'multi_phase' ? 3 : 1
  const updated: RoomCategoryData = {
    categoryMode,
    category: data.category ?? existing.category,
    phaseCategories: data.phaseCategories ?? existing.phaseCategories,
    currentPhase: data.currentPhase ?? existing.currentPhase,
    totalPhases,
    phaseIntermission: data.phaseIntermission !== undefined ? data.phaseIntermission : existing.phaseIntermission,
  }
  roomCategoryStore.set(roomId, updated)
  return updated
}

export function getActivePhaseCategory(categoryData: RoomCategoryData): FamousPersonCategory {
  if (categoryData.categoryMode === 'single') {
    return categoryData.category
  }
  const phaseIdx = Math.max(0, Math.min(categoryData.currentPhase - 1, categoryData.phaseCategories.length - 1))
  return categoryData.phaseCategories[phaseIdx] || 'all'
}

/**
 * INV-1: game_mode okuma.
 * Eğer oda bellekte kayıtlıysa kesinlikle stored mod döner (round geçişlerinde asla resetlenmez).
 */
export function getRoomMode(roomId: string, dbRoomMode?: string | null): GameMode {
  const stored = roomModeStore.get(roomId)
  if (stored) {
    return stored.gameMode
  }
  if (dbRoomMode === 'speed' || dbRoomMode === 'classic' || dbRoomMode === 'persistent' || dbRoomMode === 'shared_target') {
    const totalRounds = dbRoomMode === 'speed' || dbRoomMode === 'shared_target' ? DEFAULT_SHARED_TARGET_ROUNDS : 1
    roomModeStore.set(roomId, { gameMode: dbRoomMode, totalRounds })
    return dbRoomMode
  }
  const defaultMode: GameMode = 'classic'
  roomModeStore.set(roomId, { gameMode: defaultMode, totalRounds: 1 })
  return defaultMode
}

export function setRoomModeData(roomId: string, gameMode: GameMode) {
  const totalRounds = gameMode === 'speed' ? DEFAULT_SPEED_ROUNDS : gameMode === 'shared_target' ? DEFAULT_SHARED_TARGET_ROUNDS : 1
  const data: RoomModeData = { gameMode, totalRounds }
  roomModeStore.set(roomId, data)
  return data
}

/**
 * Tam Metin Modu Store & Helper'ları
 */
export function getRoomCommunicationMode(roomId: string, dbRoomCommMode?: string | null): CommunicationMode {
  const stored = roomCommunicationModeStore.get(roomId)
  if (stored) return stored
  if (dbRoomCommMode === 'text' || dbRoomCommMode === 'voice') {
    roomCommunicationModeStore.set(roomId, dbRoomCommMode)
    return dbRoomCommMode
  }
  const defaultMode: CommunicationMode = 'voice'
  roomCommunicationModeStore.set(roomId, defaultMode)
  return defaultMode
}

export function setRoomCommunicationModeData(roomId: string, mode: CommunicationMode) {
  roomCommunicationModeStore.set(roomId, mode)
  return mode
}

/**
 * Zorluk Seviyesi Store & Helper'ları
 */
export function getRoomDifficulty(roomId: string, dbDifficulty?: string | null): DifficultyLevel {
  const stored = roomDifficultyStore.get(roomId)
  if (stored) return stored
  if (dbDifficulty === 'kolay' || dbDifficulty === 'orta' || dbDifficulty === 'zor') {
    roomDifficultyStore.set(roomId, dbDifficulty)
    return dbDifficulty
  }
  const defaultDifficulty: DifficultyLevel = 'orta'
  roomDifficultyStore.set(roomId, defaultDifficulty)
  return defaultDifficulty
}

export function setRoomDifficulty(roomId: string, difficulty: DifficultyLevel): DifficultyLevel {
  roomDifficultyStore.set(roomId, difficulty)
  return difficulty
}

export function hasPlayerAskedQuestionInTurn(roomId: string, playerId: string): boolean {
  return playerTurnAskedStore.get(roomId)?.has(playerId) ?? false
}

export function setPlayerAskedQuestionInTurn(roomId: string, playerId: string, asked: boolean) {
  let roomSet = playerTurnAskedStore.get(roomId)
  if (!roomSet) {
    roomSet = new Set()
    playerTurnAskedStore.set(roomId, roomSet)
  }
  if (asked) roomSet.add(playerId)
  else roomSet.delete(playerId)
}

export function clearRoomTurnAskedData(roomId: string) {
  playerTurnAskedStore.get(roomId)?.clear()
}

export function getPlayerClueCard(roomId: string, playerId: string): ClueCardItem[] {
  let roomClueMap = playerClueCardStore.get(roomId)
  if (!roomClueMap) {
    roomClueMap = new Map()
    playerClueCardStore.set(roomId, roomClueMap)
  }
  let cards = roomClueMap.get(playerId)
  if (!cards) {
    cards = []
    roomClueMap.set(playerId, cards)
  }
  return cards
}

export function addClueCardItem(roomId: string, playerId: string, item: ClueCardItem) {
  const cards = getPlayerClueCard(roomId, playerId)
  if (!cards.some((c) => c.id === item.id || (c.questionText === item.questionText && c.timestamp === item.timestamp))) {
    cards.push(item)
  }
  return cards
}

export function clearPlayerClueCardMemory(roomId: string, playerId: string): void {
  const roomClueMap = playerClueCardStore.get(roomId)
  if (roomClueMap) {
    roomClueMap.delete(playerId)
  }
}

export async function clearPlayerClueCard(roomId: string, playerId: string): Promise<void> {
  clearPlayerClueCardMemory(roomId, playerId)
  try {
    const admin = supabaseAdmin()
    const { data: dbVotes } = await admin
      .from('question_votes')
      .select('id')
      .eq('room_id', roomId)
      .eq('asker_player_id', playerId)

    if (dbVotes && dbVotes.length > 0) {
      const voteIds = dbVotes.map((v) => v.id)
      await admin.from('question_vote_responses').delete().in('vote_id', voteIds)
      await admin.from('question_votes').delete().in('id', voteIds)
    }
  } catch {
    // DB hatası durumunda memory zaten temizlendi
  }
}

export async function getPlayerClueCardDb(roomId: string, playerId: string, players?: PlayerRow[]): Promise<ClueCardItem[]> {
  try {
    const admin = supabaseAdmin()
    const { data: dbVotes } = await admin
      .from('question_votes')
      .select()
      .eq('room_id', roomId)
      .eq('asker_player_id', playerId)
      .eq('status', 'closed')
      .order('created_at', { ascending: true })

    if (!dbVotes || dbVotes.length === 0) {
      return getPlayerClueCard(roomId, playerId)
    }

    const voteIds = dbVotes.map((v) => v.id)
    const { data: dbResponses } = await admin
      .from('question_vote_responses')
      .select()
      .in('vote_id', voteIds)

    const responsesByVote = new Map<string, { yes: number; no: number; total: number }>()
    if (dbResponses) {
      for (const r of dbResponses) {
        let stats = responsesByVote.get(r.vote_id)
        if (!stats) {
          stats = { yes: 0, no: 0, total: 0 }
          responsesByVote.set(r.vote_id, stats)
        }
        stats.total++
        if (r.answer) stats.yes++
        else stats.no++
      }
    }

    const roomPlayers = players || (await loadPlayers(roomId))
    const totalEligible = Math.max(0, roomPlayers.filter((p) => p.id !== playerId).length)

    const items: ClueCardItem[] = dbVotes.map((v) => {
      const stats = responsesByVote.get(v.id) || { yes: 0, no: 0, total: 0 }
      const unansweredCount = Math.max(0, totalEligible - stats.total)
      const majority: 'yes' | 'no' | 'tie' = stats.yes > stats.no ? 'yes' : stats.no > stats.yes ? 'no' : 'tie'
      return {
        id: v.id,
        questionText: v.question_text,
        yesCount: stats.yes,
        noCount: stats.no,
        unansweredCount,
        majority,
        timestamp: v.created_at || new Date().toISOString(),
      }
    })

    // Memory store ile senkronize et
    for (const item of items) {
      addClueCardItem(roomId, playerId, item)
    }

    return items
  } catch {
    return getPlayerClueCard(roomId, playerId)
  }
}

export async function getActiveTextVote(roomId: string, players?: PlayerRow[]): Promise<TextQuestionVoteInternal | null> {
  try {
    const admin = supabaseAdmin()
    const { data: dbVote } = await admin
      .from('question_votes')
      .select()
      .eq('room_id', roomId)
      .eq('status', 'open')
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (!dbVote) {
      roomActiveVoteStore.delete(roomId)
      return null
    }

    const openedAtTime = dbVote.opened_at ? new Date(dbVote.opened_at).getTime() : Date.now()
    const closesAtTime = dbVote.closes_at ? new Date(dbVote.closes_at).getTime() : openedAtTime + TEXT_VOTE_DURATION_MS

    if (Date.now() >= closesAtTime) {
      await resolveTextVoteInternal(roomId, dbVote.id)
      return null
    }

    const { data: dbResponses } = await admin
      .from('question_vote_responses')
      .select()
      .eq('vote_id', dbVote.id)

    const responses = new Map<string, boolean>()
    if (dbResponses) {
      for (const r of dbResponses) {
        responses.set(r.responder_player_id, r.answer)
      }
    }

    const roomPlayers = players || (await loadPlayers(roomId))
    const eligibleVoterIds = new Set(roomPlayers.filter((p) => p.id !== dbVote.asker_player_id).map((p) => p.id))
    const askerPlayer = roomPlayers.find((p) => p.id === dbVote.asker_player_id)

    const voteInternal: TextQuestionVoteInternal = {
      id: dbVote.id,
      roomId,
      askerId: dbVote.asker_player_id,
      askerNickname: askerPlayer?.nickname || 'Oyuncu',
      questionText: dbVote.question_text,
      status: 'open',
      openedAt: openedAtTime,
      closesAt: closesAtTime,
      responses,
      eligibleVoterIds,
    }

    roomActiveVoteStore.set(roomId, voteInternal)
    return voteInternal
  } catch {
    const memVote = roomActiveVoteStore.get(roomId)
    if (memVote && memVote.status === 'open') {
      if (Date.now() >= memVote.closesAt) {
        await resolveTextVoteInternal(roomId, memVote.id)
        return null
      }
      return memVote
    }
    return null
  }
}

export async function resolveTextVoteInternal(roomId: string, voteId: string): Promise<ClueCardItem | null> {
  const admin = supabaseAdmin()
  const memVote = roomActiveVoteStore.get(roomId)

  let qText = memVote?.questionText
  let askerId = memVote?.askerId
  let alreadyClosed = false

  try {
    // Atomik koşullu güncelleme: Yalnızca status='open' olanı kapat (Race Condition Koruması)
    const { data: updatedRows } = await admin
      .from('question_votes')
      .update({ status: 'closed' })
      .eq('id', voteId)
      .eq('status', 'open')
      .select()

    if (updatedRows && updatedRows.length > 0) {
      const closedVote = updatedRows[0]!
      qText = closedVote.question_text
      askerId = closedVote.asker_player_id
    } else {
      // Başka bir istek aynı anda zaten kapatmış veya kayıt yok
      const { data: dbVote } = await admin
        .from('question_votes')
        .select()
        .eq('id', voteId)
        .maybeSingle()

      if (dbVote) {
        qText = dbVote.question_text
        askerId = dbVote.asker_player_id
        if (dbVote.status === 'closed') {
          alreadyClosed = true
        }
      }
    }
  } catch {
    // DB hatası durumunda memory üzerinden devam
  }

  if (memVote && memVote.id === voteId) {
    memVote.status = 'closed'
  }

  if (alreadyClosed || !qText || !askerId) {
    return null
  }

  let yesCount = 0
  let noCount = 0
  const responsesMap = new Map<string, boolean>()

  try {
    const { data: dbResponses } = await admin
      .from('question_vote_responses')
      .select()
      .eq('vote_id', voteId)

    if (dbResponses && dbResponses.length > 0) {
      for (const r of dbResponses) {
        responsesMap.set(r.responder_player_id, r.answer)
        if (r.answer) yesCount++
        else noCount++
      }
    } else if (memVote) {
      for (const ans of memVote.responses.values()) {
        if (ans) yesCount++
        else noCount++
      }
    }
  } catch {
    if (memVote) {
      for (const ans of memVote.responses.values()) {
        if (ans) yesCount++
        else noCount++
      }
    }
  }

  let totalEligible = memVote?.eligibleVoterIds.size ?? 0
  try {
    const players = await loadPlayers(roomId)
    totalEligible = Math.max(0, players.filter((p) => p.id !== askerId).length)
  } catch {
    //
  }

  const totalAnswered = responsesMap.size || (memVote?.responses.size ?? 0)
  const unansweredCount = Math.max(0, totalEligible - totalAnswered)
  const majority: 'yes' | 'no' | 'tie' = yesCount > noCount ? 'yes' : noCount > yesCount ? 'no' : 'tie'

  const clueItem: ClueCardItem = {
    id: voteId,
    questionText: qText,
    yesCount,
    noCount,
    unansweredCount,
    majority,
    timestamp: new Date().toISOString(),
  }

  addClueCardItem(roomId, askerId, clueItem)
  roomActiveVoteStore.delete(roomId)
  return clueItem
}

function clearRoomTextVoteData(roomId: string) {
  roomActiveVoteStore.delete(roomId)
  clearRoomTurnAskedData(roomId)
}

// --- Ortak Hedef Modu Store Helpers ---

export function getSharedTargetRoomData(roomId: string): SharedTargetRoomData {
  let data = sharedTargetStore.get(roomId)
  if (!data) {
    data = {
      targetName: null,
      targetRevealed: false,
      roundWinnerId: null,
      questionLog: [],
      pendingQuestion: null,
      playerPenalties: new Map(),
      roundScores: new Map(),
    }
    sharedTargetStore.set(roomId, data)
  }
  return data
}

export function setSharedTargetRoomData(roomId: string, data: SharedTargetRoomData) {
  sharedTargetStore.set(roomId, data)
}

function clearRoomSharedTargetData(roomId: string) {
  sharedTargetStore.delete(roomId)
}

export async function setRoomTarget(roomId: string, playerId: string, targetName: string) {
  const players = await loadPlayers(roomId)
  const player = requireMembership(players, playerId)
  if (!player.is_host) {
    throw forbidden('not_host', 'Hedef ismi yalnızca oda sahibi belirleyebilir.')
  }
  const sharedData = getSharedTargetRoomData(roomId)
  sharedData.targetName = targetName.trim()
  setSharedTargetRoomData(roomId, sharedData)
  return { targetName: sharedData.targetName }
}

// --- Israrcı Mod Store Helpers ---


export function getPlayerPersistentData(roomId: string, playerId: string): PlayerPersistentData {
  let map = playerPersistentStore.get(roomId)
  if (!map) {
    map = new Map()
    playerPersistentStore.set(roomId, map)
  }
  let data = map.get(playerId)
  if (!data) {
    data = {
      questionBudgetRemaining: PERSISTENT_MODE_QUESTION_BUDGET,
      totalQuestionsUsed: 0,
      nameSolved: false,
      roundScore: 0,
    }
    map.set(playerId, data)
  }
  return data
}

export function setPlayerPersistentData(roomId: string, playerId: string, data: PlayerPersistentData) {
  let map = playerPersistentStore.get(roomId)
  if (!map) {
    map = new Map()
    playerPersistentStore.set(roomId, map)
  }
  map.set(playerId, data)
}

function clearRoomPersistentData(roomId: string) {
  playerPersistentStore.delete(roomId)
}

/** Israrcı modda oyuncu bitirmiş (solved/eliminated) mi? */
function isPersistentPlayerFinished(roomId: string, playerId: string): boolean {
  const pData = getPlayerPersistentData(roomId, playerId)
  const lives = getPlayerLives(roomId, playerId)
  return pData.nameSolved || lives <= 0
}

export function getPlayerSpeedData(roomId: string, playerId: string): PlayerSpeedData {
  let map = playerSpeedStore.get(roomId)
  if (!map) {
    map = new Map()
    playerSpeedStore.set(roomId, map)
  }
  let data = map.get(playerId)
  if (!data) {
    data = { questionsThisRound: 0, roundScores: [], finishedCurrentRound: false }
    map.set(playerId, data)
  }
  return data
}

export function setPlayerSpeedData(roomId: string, playerId: string, data: PlayerSpeedData) {
  let map = playerSpeedStore.get(roomId)
  if (!map) {
    map = new Map()
    playerSpeedStore.set(roomId, map)
  }
  map.set(playerId, data)
}

function resetRoomSpeedRound(roomId: string) {
  const map = playerSpeedStore.get(roomId)
  if (map) {
    for (const [playerId, val] of map.entries()) {
      map.set(playerId, { ...val, questionsThisRound: 0, finishedCurrentRound: false })
    }
  }
}

function clearRoomSpeedData(roomId: string) {
  const map = playerSpeedStore.get(roomId)
  if (map) {
    for (const [playerId] of map.entries()) {
      map.set(playerId, { questionsThisRound: 0, roundScores: [], finishedCurrentRound: false })
    }
  }
  playerRoundNameStore.delete(roomId)
  roomUsedNamesStore.delete(roomId)
}

export function getPlayerRoundNameId(roomId: string, playerId: string): string | null {
  const val = playerRoundNameStore.get(roomId)?.get(playerId)
  return val && val.trim() ? val.trim() : null
}

export function setPlayerRoundNameId(roomId: string, playerId: string, nameId: string | null | undefined) {
  let map = playerRoundNameStore.get(roomId)
  if (!map) {
    map = new Map()
    playerRoundNameStore.set(roomId, map)
  }
  if (!nameId || !nameId.trim()) {
    map.delete(playerId)
  } else {
    map.set(playerId, nameId.trim())
  }
}

/**
 * Yeni tur için isim havuzundan çakışmasız gizli isim ataması yapar.
 * Önceki turlarda kullanılan isimleri tekrar seçmez!
 * Round içinde bu atama ASLA değişmez.
 */
export function assignNamesForRound(
  roomId: string,
  players: PlayerRow[],
  names: NameRow[],
) {
  let usedAcrossRounds = roomUsedNamesStore.get(roomId)
  if (!usedAcrossRounds) {
    usedAcrossRounds = new Set<string>()
    roomUsedNamesStore.set(roomId, usedAcrossRounds)
  }

  const usedInThisRound = new Set<string>()
  const assignments = new Map<string, string>()
  const shuffled = [...names].sort(() => Math.random() - 0.5)

  for (const player of players) {
    const candidate =
      shuffled.find((n) => n.submitted_by !== player.id && !usedAcrossRounds!.has(n.id) && !usedInThisRound.has(n.id)) ||
      shuffled.find((n) => n.submitted_by !== player.id && !usedInThisRound.has(n.id)) ||
      shuffled.find((n) => n.submitted_by !== player.id) ||
      null

    if (candidate) {
      usedAcrossRounds.add(candidate.id)
      usedInThisRound.add(candidate.id)
      assignments.set(player.id, candidate.id)
      setPlayerRoundNameId(roomId, player.id, candidate.id)
    }
  }

  return assignments
}

function getRoomLivesMap(roomId: string): Map<string, number> {
  let map = roomLivesStore.get(roomId)
  if (!map) {
    map = new Map<string, number>()
    roomLivesStore.set(roomId, map)
  }
  return map
}

export function getPlayerLives(roomId: string, playerId: string): number {
  const map = getRoomLivesMap(roomId)
  return map.get(playerId) ?? TOTAL_LIVES_PER_GAME
}

export function setPlayerLives(roomId: string, playerId: string, lives: number): void {
  const map = getRoomLivesMap(roomId)
  map.set(playerId, Math.max(0, lives))
}

export const ROOM_INACTIVITY_TIMEOUT_MS = 60 * 60 * 1000 // 60 dakika

export function isRoomExpired(room: RoomRow, timeoutMs: number = ROOM_INACTIVITY_TIMEOUT_MS): boolean {
  if (room.status === 'closed') return false
  const lastActiveStr = room.updated_at || room.created_at
  if (!lastActiveStr) return false
  const lastActiveTime = new Date(lastActiveStr).getTime()
  if (Number.isNaN(lastActiveTime)) return false
  return Date.now() - lastActiveTime > timeoutMs
}

export function clearRoomMemoryState(roomId: string): void {
  roomModeStore.delete(roomId)
  roomCommunicationModeStore.delete(roomId)
  roomCategoryStore.delete(roomId)
  playerSpeedStore.delete(roomId)
  playerRoundNameStore.delete(roomId)
  roomLivesStore.delete(roomId)
  roomUsedNamesStore.delete(roomId)
  playerPersistentStore.delete(roomId)
  sharedTargetStore.delete(roomId)
  roomActiveVoteStore.delete(roomId)
  playerClueCardStore.delete(roomId)
  playerClassicSolvedStore.delete(roomId)
  playerPassRightsStore.delete(roomId)
  classicRetiredNamesStore.delete(roomId)
}

export async function closeExpiredRoom(roomId: string): Promise<void> {
  clearRoomMemoryState(roomId)
  try {
    await supabaseAdmin()
      .from('rooms')
      .update({ status: 'closed', is_game_active: false })
      .eq('id', roomId)
  } catch (err) {
    console.error(`closeExpiredRoom(${roomId}) hatası:`, err)
  }
}

export async function closeExpiredRooms(inactivityMinutes: number = 60): Promise<number> {
  const admin = supabaseAdmin()
  try {
    const { data, error } = await admin.rpc('close_expired_rooms', {
      p_inactivity_minutes: inactivityMinutes,
    })
    if (!error && typeof data === 'number') {
      return data
    }
  } catch {
    // RPC başarısız olursa sorgu ile devam et
  }

  try {
    const cutoff = new Date(Date.now() - inactivityMinutes * 60 * 1000).toISOString()
    const { data: expiredRooms, error: selectErr } = await admin
      .from('rooms')
      .select('id')
      .neq('status', 'closed')
      .lt('updated_at', cutoff)

    if (selectErr || !expiredRooms || expiredRooms.length === 0) return 0

    const expiredIds = expiredRooms.map((r) => r.id)
    for (const id of expiredIds) {
      clearRoomMemoryState(id)
    }

    const { error: updateErr } = await admin
      .from('rooms')
      .update({ status: 'closed', is_game_active: false })
      .neq('status', 'closed')
      .lt('updated_at', cutoff)

    if (updateErr) throw updateErr
    return expiredIds.length
  } catch (err) {
    console.error('closeExpiredRooms fallback hatası:', err)
    return 0
  }
}

export async function closeAllRooms(): Promise<number> {
  const admin = supabaseAdmin()
  try {
    const { data: openRooms, error: selectErr } = await admin
      .from('rooms')
      .select('id')
      .neq('status', 'closed')

    if (selectErr || !openRooms) return 0

    for (const r of openRooms) {
      clearRoomMemoryState(r.id)
    }

    const { error: updateErr } = await admin
      .from('rooms')
      .update({ status: 'closed', is_game_active: false })
      .neq('status', 'closed')

    if (updateErr) throw updateErr
    return openRooms.length
  } catch (err) {
    console.error('closeAllRooms hatası:', err)
    return 0
  }
}

async function loadRoom(roomId: string): Promise<RoomRow> {
  const { data, error } = await supabaseAdmin().from('rooms').select('*').eq('id', roomId).maybeSingle()
  if (error) throw error
  if (!data) throw notFound('room_not_found', 'Oda bulunamadı.')
  if (data.status !== 'closed' && isRoomExpired(data)) {
    await closeExpiredRoom(data.id)
    data.status = 'closed'
    data.is_game_active = false
  }
  return data
}

async function loadPlayers(roomId: string): Promise<PlayerRow[]> {
  const { data, error } = await supabaseAdmin()
    .from('players')
    .select('*')
    .eq('room_id', roomId)
    .order('created_at', { ascending: true })
    .order('id', { ascending: true })
  if (error) throw error
  return data ?? []
}

async function loadNames(roomId: string): Promise<NameRow[]> {
  const { data, error } = await supabaseAdmin()
    .from('names')
    .select('*')
    .eq('room_id', roomId)
    .order('created_at', { ascending: true })
  if (error) throw error
  return data ?? []
}

function requireMembership(players: PlayerRow[], playerId: string): PlayerRow {
  const player = players.find((candidate) => candidate.id === playerId)
  if (!player) throw notFound('player_not_in_room', 'Bu odada değilsiniz.')
  return player
}

/**
 * INV-3: Soru sayacını artıran tekil fonksiyon.
 * is_host veya host_id kontrolü KESİNLİKLE YOKTUR. Host ve misafir aynı kod yolundan geçer.
 * Doğrudan oyuncunun kendi bağımsız depolanan sayacını 1 artırır.
 */
function incrementQuestionCount(roomId: string, playerId: string): number {
  const speed = getPlayerSpeedData(roomId, playerId)
  const updated = speed.questionsThisRound + 1
  setPlayerSpeedData(roomId, playerId, {
    ...speed,
    questionsThisRound: updated,
  })
  return updated
}

/**
 * Lobi Kurulumu: game_mode ve category ayarları burada yazılır (INV-1).
 */
export async function createRoom(
  nickname: string,
  gameMode: GameMode = 'classic',
  categorySettings?: {
    categoryMode?: LobbyCategoryMode
    category?: FamousPersonCategory
    phaseCategories?: FamousPersonCategory[]
    communicationMode?: CommunicationMode
    difficulty?: DifficultyLevel
    deviceId?: string
  },
) {
  // Arka planda süresi dolmuş eski odaları temizle
  void closeExpiredRooms().catch(() => {})

  const admin = supabaseAdmin()
  const totalRounds = gameMode === 'speed' ? DEFAULT_SPEED_ROUNDS : 1
  const communicationMode = categorySettings?.communicationMode || 'voice'
  const difficulty = categorySettings?.difficulty || 'orta'
  const deviceId = categorySettings?.deviceId || null

  for (let attempt = 0; attempt < 5; attempt++) {
    const roomCode = generateRoomCode()
    
    const categoryMode: LobbyCategoryMode = categorySettings?.categoryMode || 'single'
    const category: FamousPersonCategory = categorySettings?.category || 'all'
    const phaseCategories: FamousPersonCategory[] =
      categorySettings?.phaseCategories && categorySettings.phaseCategories.length > 0
        ? categorySettings.phaseCategories
        : ['unluler', 'sporcular', 'cizgi_karakterler']
    const totalPhases = categoryMode === 'multi_phase' ? 3 : 1

    const { data: room, error } = await admin
      .from('rooms')
      .insert({
        room_code: roomCode,
        status: 'waiting',
        game_mode: gameMode,
        communication_mode: communicationMode,
        difficulty,
        total_rounds: totalRounds,
        category_mode: categoryMode,
        selected_category: category,
        phase_categories: phaseCategories,
        current_phase: 1,
        total_phases: totalPhases,
      })
      .select()
      .single()

    if (error) {
      if (error.code === UNIQUE_VIOLATION) continue
      throw error
    }

    const { data: host, error: hostError } = await admin
      .from('players')
      .insert({ room_id: room.id, nickname, is_host: true, score: 0, device_id: deviceId })
      .select()
      .single()

    if (hostError) {
      await admin.from('rooms').delete().eq('id', room.id)
      throw hostError
    }

    // In-memory store'ları da hemen senkronize et
    setRoomModeData(room.id, gameMode)
    setRoomCommunicationModeData(room.id, communicationMode)
    setRoomDifficulty(room.id, difficulty)
    setPlayerSpeedData(room.id, host.id, { questionsThisRound: 0, roundScores: [], finishedCurrentRound: false })

    setRoomCategoryData(room.id, {
      categoryMode,
      category,
      phaseCategories,
      currentPhase: 1,
      totalPhases,
    })

    return { roomId: room.id, roomCode: room.room_code, playerId: host.id }
  }

  throw conflict('room_code_exhausted', 'Oda oluşturulamadı, lütfen tekrar deneyin.')
}

/**
 * Tek bir oyuncunun oyun sonucunu cihaz kimliğine göre `game_results` tablosuna kaydeder.
 */
export async function savePlayerGameResult(
  roomId: string,
  gameMode: GameMode,
  player: PlayerRow,
  placement: number,
  survived: boolean,
): Promise<void> {
  if (!player.device_id) return
  try {
    const admin = supabaseAdmin()
    let profileId: string | null = null
    const { data: existingProfile } = await admin
      .from('player_profiles')
      .select('id')
      .eq('device_id', player.device_id)
      .maybeSingle()

    if (existingProfile?.id) {
      profileId = existingProfile.id
    } else {
      const { data: newProfile } = await admin
        .from('player_profiles')
        .insert({ device_id: player.device_id })
        .select('id')
        .maybeSingle()
      profileId = newProfile?.id ?? null
    }

    if (!profileId) return

    // İdempotency: Aynı oyun ve profil için daha önce kayıt atılmış mı?
    const { data: existingResult } = await admin
      .from('game_results')
      .select('id')
      .eq('game_room_id', roomId)
      .eq('player_profile_id', profileId)
      .maybeSingle()

    if (!existingResult) {
      await admin.from('game_results').insert({
        player_profile_id: profileId,
        game_room_id: roomId,
        game_mode: gameMode,
        score: player.score ?? 0,
        placement,
        survived,
        played_at: new Date().toISOString(),
      })
    }
  } catch (err) {
    console.error('savePlayerGameResult error:', err)
  }
}

/**
 * Oyun tamamlandığında odadaki tüm oyuncuların sonuçlarını (Seviye 1 Cihaz Bazlı İstatistikler)
 * `game_results` tablosuna kaydeder.
 */
export async function recordGameResults(roomId: string): Promise<void> {
  try {
    const [room, players] = await Promise.all([loadRoom(roomId), loadPlayers(roomId)])
    if (!room || players.length === 0) return

    // Oyuncuları skorlarına göre sırala
    const standings = [...players].sort((a, b) => (b.score ?? 0) - (a.score ?? 0))

    // Sıralamaları (placement) hesapla (aynı skor aynı dereceyi paylaşır)
    const placements = new Map<string, number>()
    let currentRank = 1
    for (let i = 0; i < standings.length; i++) {
      const p = standings[i]!
      if (i > 0 && (p.score ?? 0) === (standings[i - 1]?.score ?? 0)) {
        placements.set(p.id, placements.get(standings[i - 1]!.id) ?? currentRank)
      } else {
        currentRank = i + 1
        placements.set(p.id, currentRank)
      }
    }

    const gameMode = getRoomMode(room.id, room.game_mode)

    for (const player of players) {
      if (!player.device_id) continue

      // Hayatta kalma / elenmeme durumunu belirle
      let survived = true
      if (gameMode === 'classic') {
        survived = isPlayerClassicSolved(room.id, player.id) || (player.score ?? 0) > 0
      } else if (gameMode === 'persistent') {
        const pData = playerPersistentStore.get(room.id)?.get(player.id)
        survived = pData ? pData.nameSolved : (player.score ?? 0) > 0
      }

      const placement = placements.get(player.id) ?? 1
      await savePlayerGameResult(roomId, gameMode, player, placement, survived)
    }
  } catch (err) {
    // İstatistik kaydı ana oyun akışını asla kesmemelidir
    console.error('recordGameResults error:', err)
  }
}

/**
 * Cihaz kimliğine ait istatistik özetini döner.
 */
export async function getDeviceStats(deviceId: string): Promise<DeviceStats> {
  const admin = supabaseAdmin()

  const { data: profile } = await admin
    .from('player_profiles')
    .select('id')
    .eq('device_id', deviceId)
    .maybeSingle()

  if (!profile?.id) {
    return {
      totalGames: 0,
      totalWins: 0,
      totalSurvived: 0,
      winRate: 0,
      highScore: 0,
      recentGames: [],
    }
  }

  const { data: results, error } = await admin
    .from('game_results')
    .select('id, game_mode, score, placement, survived, played_at')
    .eq('player_profile_id', profile.id)
    .order('played_at', { ascending: false })

  if (error || !results || results.length === 0) {
    return {
      totalGames: 0,
      totalWins: 0,
      totalSurvived: 0,
      winRate: 0,
      highScore: 0,
      recentGames: [],
    }
  }

  const totalGames = results.length
  const totalWins = results.filter((r) => r.placement === 1).length
  const totalSurvived = results.filter((r) => r.survived).length
  const winRate = totalGames > 0 ? Math.round((totalWins / totalGames) * 100) : 0
  const highScore = Math.max(...results.map((r) => r.score ?? 0))

  const recentGames: RecentGameItem[] = results.slice(0, 10).map((r) => ({
    id: r.id,
    gameMode: r.game_mode,
    score: r.score,
    placement: r.placement,
    survived: r.survived,
    playedAt: r.played_at,
  }))

  return {
    totalGames,
    totalWins,
    totalSurvived,
    winRate,
    highScore,
    recentGames,
  }
}

/**
 * Lobi Ayarı: Yalnızca oyun başlamadan önce host kategori ayarlarını değiştirebilir.
 */
export async function setRoomCategory(
  roomId: string,
  playerId: string,
  settings: {
    categoryMode?: LobbyCategoryMode
    category?: FamousPersonCategory
    phaseCategories?: FamousPersonCategory[]
  },
) {
  const admin = supabaseAdmin()
  const players = await loadPlayers(roomId)
  const player = requireMembership(players, playerId)

  if (!player.is_host) {
    throw forbidden('not_host', 'Kategori ayarlarını yalnızca oda sahibi değiştirebilir.')
  }

  const room = await loadRoom(roomId)
  if (room.status !== 'waiting') {
    throw conflict('game_already_started', 'Oyun başladıktan sonra kategori ayarları değiştirilemez.')
  }

  const updated = setRoomCategoryData(roomId, settings)

  try {
    await admin.from('rooms').update({
      category_mode: updated.categoryMode,
      selected_category: updated.category,
      phase_categories: updated.phaseCategories,
      current_phase: updated.currentPhase,
      total_phases: updated.totalPhases,
    }).eq('id', roomId)
  } catch {
    // Sütun yoksa yut
  }

  await admin.from('rooms').update({ status: room.status }).eq('id', roomId)

  return updated
}

/**
 * Lobi Ayarı: Yalnızca oyun başlamadan önce host modu değiştirebilir.
 */
export async function setRoomMode(roomId: string, playerId: string, gameMode: GameMode) {
  const admin = supabaseAdmin()
  const players = await loadPlayers(roomId)
  const player = requireMembership(players, playerId)

  if (!player.is_host) {
    throw forbidden('not_host', 'Oyun modunu yalnızca oda sahibi değiştirebilir.')
  }

  const room = await loadRoom(roomId)
  if (room.status !== 'waiting') {
    throw conflict('game_already_started', 'Oyun başladıktan sonra mod değiştirilemez.')
  }

  const modeData = setRoomModeData(roomId, gameMode)

  try {
    await admin.from('rooms').update({ game_mode: gameMode, total_rounds: modeData.totalRounds }).eq('id', roomId)
  } catch {
    // Sütun yoksa yut
  }

  await admin.from('rooms').update({ status: room.status }).eq('id', roomId)

  return { gameMode: modeData.gameMode, totalRounds: modeData.totalRounds }
}

export async function joinRoom(roomCode: string, nickname: string, deviceId?: string) {
  const admin = supabaseAdmin()

  const { data: room, error } = await admin
    .from('rooms')
    .select('*')
    .eq('room_code', roomCode)
    .maybeSingle()

  if (error) throw error
  if (!room) throw notFound('room_not_found', 'Oda bulunamadı. Oda kodunu kontrol edin.')

  if (room.status !== 'closed' && isRoomExpired(room)) {
    await closeExpiredRoom(room.id)
    room.status = 'closed'
  }

  if (room.status === 'finished' || room.status === 'closed') {
    throw conflict('room_closed', 'Bu oda yeni oyuncu kabul etmiyor.')
  }

  const players = await loadPlayers(room.id)
  if (players.length >= MAX_PLAYERS) {
    throw conflict('room_full', `Oda dolu (en fazla ${MAX_PLAYERS} oyuncu).`)
  }

  const { data: player, error: playerError } = await admin
    .from('players')
    .insert({ room_id: room.id, nickname, is_host: false, score: 0, device_id: deviceId || null })
    .select()
    .single()

  if (playerError) throw playerError

  setPlayerSpeedData(room.id, player.id, { questionsThisRound: 0, roundScores: [], finishedCurrentRound: false })

  try {
    await admin.from('players').update({ questions_this_round: 0, round_scores: [], has_finished_round: false }).eq('id', player.id)
  } catch {
    // Sütun yoksa yut
  }

  return { roomId: room.id, roomCode: room.room_code, playerId: player.id }
}

export async function getGameState(roomId: string, viewerId: string): Promise<GameState> {
  const [room, players, names] = await Promise.all([
    loadRoom(roomId),
    loadPlayers(roomId),
    loadNames(roomId),
  ])

  const viewer = requireMembership(players, viewerId)
  const submitters = new Set(names.map((name) => name.submitted_by))

  const isViewerTurn = room.current_player_id === viewerId
  const currentName = names.find((name) => name.id === room.current_identity_id) ?? null
  
  // INV-1: gameMode daima kaydedilen sabit moddur
  const gameMode = getRoomMode(roomId, room.game_mode)
  const isSpeed = gameMode === 'speed'
  const isPersistent = gameMode === 'persistent'
  const isSharedTarget = gameMode === 'shared_target'
  const totalRounds = isSpeed || isSharedTarget ? (room.total_rounds || DEFAULT_SHARED_TARGET_ROUNDS) : 1

  const sharedData = getSharedTargetRoomData(roomId)
  const roundWinner = sharedData.roundWinnerId
    ? (players.find((p) => p.id === sharedData.roundWinnerId)?.nickname ?? null)
    : null

  const categoryData = getRoomCategoryData(roomId, room)
  const activeCategory = getActivePhaseCategory(categoryData)

  const isClassic = gameMode === 'classic'

  const publicPlayers: PublicPlayer[] = players.map((player) => {
    const speed = getPlayerSpeedData(roomId, player.id)
    const pData = getPlayerPersistentData(roomId, player.id)
    const speedScore = speed.roundScores.reduce((sum, s) => sum + s, 0)
    const isPlayerHost = player.is_host ?? false
    const isClassicSolved = isPlayerClassicSolved(roomId, player.id)

    let score: number
    if (isSpeed) {
      score = speed.roundScores.length > 0 ? speedScore : (player.score ?? 0)
    } else if (isPersistent) {
      score = pData.roundScore
    } else {
      score = player.score ?? 0
    }

    const hasPenalty = isSharedTarget ? (sharedData.playerPenalties.get(player.id) ?? false) : false

    return {
      id: player.id,
      nickname: player.nickname,
      isHost: isPlayerHost,
      score,
      hasSubmittedNames: isSharedTarget ? true : submitters.has(player.id),
      livesLeft: getPlayerLives(roomId, player.id),
      questionsThisRound: speed.questionsThisRound,
      roundScores: speed.roundScores,
      hasFinishedRound: isClassic ? isClassicSolved : speed.finishedCurrentRound,
      estimatedPoints: isPersistent
        ? estimatePersistentScore(pData.totalQuestionsUsed)
        : estimateSpeedScore(speed.questionsThisRound),
      // Israrcı & Klasik Mod alanları
      questionBudgetRemaining: isPersistent ? pData.questionBudgetRemaining : undefined,
      passRightsRemaining: isClassic ? getPlayerPassRights(roomId, player.id) : undefined,
      nameSolved: isClassic ? isClassicSolved : isPersistent ? pData.nameSolved : undefined,
      persistentScore: isPersistent ? pData.roundScore : undefined,
      // Ortak Hedef Modu alanları
      isReferee: isSharedTarget ? isPlayerHost : undefined,
      skippedQuestionTurn: isSharedTarget ? hasPenalty : undefined,
      hasGuessCooldown: isSharedTarget ? hasPenalty : undefined,
    }
  })

  const allPlayersSubmittedNames = isSharedTarget
    ? Boolean(sharedData.targetName && sharedData.targetName.trim().length > 0)
    : (players.length > 0 && players.every((player) => submitters.has(player.id)))

  const currentRound = room.game_round ?? 1
  const viewerSpeed = getPlayerSpeedData(roomId, viewer.id)
  const viewerPersistent = getPlayerPersistentData(roomId, viewer.id)
  const isViewerClassicSolved = isPlayerClassicSolved(roomId, viewer.id)

  const canStart = isSharedTarget
    ? (players.length >= MIN_PLAYERS && players.length <= MAX_PLAYERS && Boolean(sharedData.targetName))
    : (allPlayersSubmittedNames && players.length >= MIN_PLAYERS && players.length <= MAX_PLAYERS)

  const communicationMode = getRoomCommunicationMode(roomId, room.communication_mode)
  let rawActiveVote = await getActiveTextVote(roomId, players)

  // Süresi dolmuş açık oylama varsa sonuçlandır ve Hayır ise turu devret
  if (rawActiveVote && rawActiveVote.status === 'open' && Date.now() >= rawActiveVote.closesAt) {
    const clueItem = await resolveTextVoteInternal(roomId, rawActiveVote.id)
    if (clueItem && room.status === 'playing') {
      await advanceTurn(room, players, names)
      const freshRoom = await loadRoom(roomId)
      room.current_player_id = freshRoom.current_player_id
      room.current_identity_id = freshRoom.current_identity_id
      room.game_round = freshRoom.game_round
    }
    rawActiveVote = await getActiveTextVote(roomId, players)
  }

  let formattedActiveVote: TextQuestionVote | null = null
  if (rawActiveVote) {
    let yesCount = 0
    let noCount = 0
    for (const ans of rawActiveVote.responses.values()) {
      if (ans) yesCount++
      else noCount++
    }
    const remainingMs = Math.max(0, rawActiveVote.closesAt - Date.now())
    const secondsRemaining = rawActiveVote.status === 'open' ? Math.ceil(remainingMs / 1000) : 0

    formattedActiveVote = {
      id: rawActiveVote.id,
      askerId: rawActiveVote.askerId,
      askerNickname: rawActiveVote.askerNickname,
      questionText: rawActiveVote.questionText,
      status: rawActiveVote.status,
      openedAt: new Date(rawActiveVote.openedAt).toISOString(),
      closesAt: new Date(rawActiveVote.closesAt).toISOString(),
      secondsRemaining,
      yesCount,
      noCount,
      totalEligible: rawActiveVote.eligibleVoterIds.size,
      hasVoted: rawActiveVote.responses.has(viewer.id),
      myAnswer: rawActiveVote.responses.get(viewer.id),
    }
  }

  const viewerClueCard = await getPlayerClueCardDb(roomId, viewer.id, players)
  const hasAskedThisTurn = hasPlayerAskedQuestionInTurn(roomId, viewer.id)

  return {
    room: {
      id: room.id,
      roomCode: room.room_code,
      status: (room.status ?? 'waiting') as RoomStatus,
      gameRound: currentRound,
      totalRounds,
      gameMode,
      communicationMode,
      difficulty: getRoomDifficulty(roomId, (room as unknown as { difficulty?: string }).difficulty),
      isGameActive: room.is_game_active ?? false,
      currentPlayerId: room.current_player_id,
      categoryMode: categoryData.categoryMode,
      selectedCategory: categoryData.category,
      phaseCategories: categoryData.phaseCategories,
      currentPhase: categoryData.currentPhase,
      totalPhases: categoryData.totalPhases,
      activeCategory,
      phaseIntermission: categoryData.phaseIntermission
        ? {
            completedPhase: categoryData.phaseIntermission.completedPhase,
            nextPhase: categoryData.phaseIntermission.nextPhase,
            nextCategory: categoryData.phaseCategories[categoryData.phaseIntermission.nextPhase - 1] || 'all',
            readyPlayerIds: categoryData.phaseIntermission.readyPlayerIds,
            isReady: categoryData.phaseIntermission.readyPlayerIds.includes(viewer.id),
            totalPlayers: players.length,
            readyCount: categoryData.phaseIntermission.readyPlayerIds.length,
          }
        : null,
      questionBudgetPerPlayer: isPersistent ? PERSISTENT_MODE_QUESTION_BUDGET : undefined,
      // INV-2: current_target_name sadece Host'a veya hedef açıklandığında gönderilir
      sharedTargetName: isSharedTarget
        ? (viewer.is_host || sharedData.targetRevealed ? sharedData.targetName : null)
        : undefined,
      targetRevealed: isSharedTarget ? sharedData.targetRevealed : undefined,
      pendingQuestion: isSharedTarget ? sharedData.pendingQuestion : undefined,
      questionLog: isSharedTarget ? sharedData.questionLog : undefined,
      roundWinnerNickname: isSharedTarget ? roundWinner : undefined,
      activeVote: formattedActiveVote,
    },
    players: publicPlayers,
    you: {
      playerId: viewer.id,
      isHost: viewer.is_host ?? false,
      isYourTurn: isViewerTurn,
      submittedNames: isSharedTarget
        ? (sharedData.targetName ? [sharedData.targetName] : [])
        : names.filter((name) => name.submitted_by === viewerId).map((name) => name.name_text),
      livesLeft: getPlayerLives(roomId, viewer.id),
      questionsThisRound: viewerSpeed.questionsThisRound,
      roundScores: viewerSpeed.roundScores,
      hasFinishedRound: isClassic ? isViewerClassicSolved : viewerSpeed.finishedCurrentRound,
      estimatedPoints: isPersistent
        ? estimatePersistentScore(viewerPersistent.totalQuestionsUsed)
        : estimateSpeedScore(viewerSpeed.questionsThisRound),
      // Israrcı & Klasik Mod alanları
      questionBudgetRemaining: isPersistent ? viewerPersistent.questionBudgetRemaining : undefined,
      passRightsRemaining: isClassic ? getPlayerPassRights(roomId, viewer.id) : undefined,
      nameSolved: isClassic ? isViewerClassicSolved : isPersistent ? viewerPersistent.nameSolved : undefined,
      persistentScore: isPersistent ? viewerPersistent.roundScore : undefined,
      // Ortak Hedef Modu alanları
      isReferee: isSharedTarget ? (viewer.is_host ?? false) : undefined,
      canBuzz: isSharedTarget ? (!viewer.is_host && !sharedData.targetRevealed) : undefined,
      skippedQuestionTurn: isSharedTarget ? (sharedData.playerPenalties.get(viewer.id) ?? false) : undefined,
      clueCard: viewerClueCard,
      hasAskedQuestionThisTurn: hasAskedThisTurn,
      targetNameId:
        getPlayerRoundNameId(roomId, viewer.id) ||
        names.find((n) => n.assigned_to === viewer.id && (n.used_in_round == null))?.id ||
        null,
    },
    currentName: isViewerTurn ? null : (currentName?.name_text ?? null),
    namesTotal: isSharedTarget ? 1 : names.length,
    namesRemaining: isSharedTarget
      ? 1
      : names.filter((name) => (name.used_in_round == null) && !getClassicRetiredNames(roomId).has(name.id)).length,
    allPlayersSubmittedNames,
    canStart,
    maxLives: TOTAL_LIVES_PER_GAME,
  }
}


export async function submitNames(roomId: string, playerId: string, names: string[]) {
  const admin = supabaseAdmin()
  const players = await loadPlayers(roomId)
  requireMembership(players, playerId)

  const room = await loadRoom(roomId)
  if (room.status !== 'waiting') {
    throw conflict('game_already_started', 'Oyun başladıktan sonra isim eklenemez veya düzenlenemez.')
  }

  const unique: string[] = []
  const seen = new Set<string>()
  for (const name of names) {
    const trimmed = name.trim()
    if (!trimmed) continue
    const key = trimmed.toLocaleLowerCase('tr')
    if (!seen.has(key)) {
      seen.add(key)
      unique.push(trimmed)
    }
  }

  if (unique.length < MAX_NAMES_PER_PLAYER) {
    throw badRequest('missing_names', `Lütfen ${MAX_NAMES_PER_PLAYER} ismi de eksiksiz doldurun.`)
  }

  if (unique.length > MAX_NAMES_PER_PLAYER) {
    throw badRequest('too_many_names', `En fazla ${MAX_NAMES_PER_PLAYER} isim gönderebilirsiniz.`)
  }

  // Faz bazlı isim store'una oyuncunun girdiği 3 ismi kaydet
  let roomPhaseMap = playerSubmittedPhaseNamesStore.get(roomId)
  if (!roomPhaseMap) {
    roomPhaseMap = new Map()
    playerSubmittedPhaseNamesStore.set(roomId, roomPhaseMap)
  }
  roomPhaseMap.set(playerId, [...unique])

  // Oyuncu daha önce isim göndermişse (düzenleme akışı), eski isimlerini silip yenilerini kaydedelim
  await admin.from('names').delete().eq('room_id', roomId).eq('submitted_by', playerId)

  const { data: inserted, error } = await admin
    .from('names')
    .upsert(
      unique.map((name) => ({ room_id: roomId, submitted_by: playerId, name_text: name })),
      { onConflict: 'room_id,name_text', ignoreDuplicates: true },
    )
    .select()

  if (error) throw error

  const accepted = (inserted ?? []).map((row) => row.name_text)
  const duplicates = unique.filter((name) => !accepted.includes(name))

  if (accepted.length === 0) {
    throw conflict(
      'all_names_taken',
      'Girdiğiniz isimlerin hepsi bu odada başka oyuncular tarafından kullanılmış. Farklı isimler deneyin.',
    )
  }

  await admin.from('rooms').update({ status: room.status }).eq('id', roomId)

  return { accepted, duplicates }
}

export async function getFamousPeople(options: {
  query?: string
  category?: FamousPersonCategory
  difficulty?: DifficultyLevel
  random?: boolean
  limit?: number
  maxFameTier?: number
  fameTiers?: number[]
}): Promise<FamousPerson[]> {
  const { query, category, difficulty, random, limit = 10, fameTiers } = options
  const admin = supabaseAdmin()

  // Zorluk seviyesine göre maksimum fameTier belirle (08a-zorluk-seviyesi-BASIT.md)
  let difficultyMaxTier: number | undefined = undefined
  if (difficulty === 'kolay') difficultyMaxTier = 2
  else if (difficulty === 'orta') difficultyMaxTier = 3
  else if (difficulty === 'zor') difficultyMaxTier = undefined

  const maxFameTier =
    options.maxFameTier !== undefined && difficultyMaxTier !== undefined
      ? Math.min(options.maxFameTier, difficultyMaxTier)
      : (options.maxFameTier ?? difficultyMaxTier)

  const combinedMap = new Map<string, FamousPerson>()

  // 1. Supabase veritabanından ara (varsa)
  try {
    let q = admin.from('famous_people').select('id, name, category, fame_tier')
    if (category && category !== 'all') {
      q = q.eq('category', category)
    }
    if (query && query.trim()) {
      q = q.ilike('name', `%${query.trim()}%`)
    }
    if (maxFameTier !== undefined) {
      q = q.lte('fame_tier', maxFameTier)
    } else if (fameTiers && fameTiers.length > 0) {
      q = q.in('fame_tier', fameTiers)
    }
    const { data, error } = await q
    if (!error && data && data.length > 0) {
      for (const rawItem of data as Array<{ id: string; name: string; category: string; fame_tier?: number | null }>) {
        const key = rawItem.name.toLocaleLowerCase('tr').trim()
        combinedMap.set(key, {
          id: rawItem.id,
          name: rawItem.name,
          category: rawItem.category,
          fameTier: rawItem.fame_tier ?? undefined,
        })
      }
    }
  } catch {
    // DB bağlantı/sorgu hatası durumunda yerel seed verisi devreye girer
  }

  // 2. Yerel statik veri setinden sorgula ve birleştir (kesin sonuç güvencesi)
  const rawQ = query ? query.trim() : ''
  const lowerQ = rawQ.toLocaleLowerCase('tr')
  const asciiQ = rawQ.toLowerCase()

  for (let idx = 0; idx < FAMOUS_PEOPLE_SEED.length; idx++) {
    const seedItem = FAMOUS_PEOPLE_SEED[idx]
    if (!seedItem) continue

    if (category && category !== 'all' && seedItem.category !== category) {
      continue
    }

    const tier = seedItem.fameTier ?? 4
    if (maxFameTier !== undefined && tier > maxFameTier) {
      continue
    }
    if (fameTiers && fameTiers.length > 0 && !fameTiers.includes(tier)) {
      continue
    }

    if (rawQ) {
      const lowerName = seedItem.name.toLocaleLowerCase('tr')
      const asciiName = seedItem.name.toLowerCase()
      if (!lowerName.includes(lowerQ) && !asciiName.includes(asciiQ)) {
        continue
      }
    }

    const key = seedItem.name.toLocaleLowerCase('tr').trim()
    if (!combinedMap.has(key)) {
      combinedMap.set(key, {
        id: `seed-${idx}`,
        name: seedItem.name,
        category: seedItem.category as Exclude<FamousPersonCategory, 'all'>,
        fameTier: seedItem.fameTier,
      })
    }

    if (!random && rawQ && combinedMap.size >= limit * 3) {
      break
    }
  }

  const results = filterByDifficulty(Array.from(combinedMap.values()), difficulty)

  // Öneri & Rastgele Mod: Önce fameTier'a göre küçükten büyüğe sırala,
  // aynı tier içindeki isimleri rastgele karıştır (shuffle) ve ilk limit kadarını getir.
  if (random) {
    const tierGroups = new Map<number, FamousPerson[]>()
    for (const person of results) {
      const tier = person.fameTier && person.fameTier >= 1 && person.fameTier <= 5 ? person.fameTier : 4
      const group = tierGroups.get(tier) || []
      group.push(person)
      tierGroups.set(tier, group)
    }

    const sortedTiers = Array.from(tierGroups.keys()).sort((a, b) => a - b)
    const orderedList: FamousPerson[] = []

    for (const t of sortedTiers) {
      const group = tierGroups.get(t)!
      for (let i = group.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = group[i]!
        group[i] = group[j]!
        group[j] = temp
      }
      orderedList.push(...group)
    }

    return orderedList.slice(0, limit)
  }

  // Arama sonuçlarında eşleşme kalitesine ve ünlülüğe göre sırala
  if (lowerQ) {
    results.sort((a, b) => {
      const aLower = a.name.toLocaleLowerCase('tr')
      const bLower = b.name.toLocaleLowerCase('tr')
      const aStarts = aLower.startsWith(lowerQ) ? 0 : 1
      const bStarts = bLower.startsWith(lowerQ) ? 0 : 1
      if (aStarts !== bStarts) return aStarts - bStarts

      // Aynı eşleşme kalitesinde daha ünlü olanlar (fameTier küçük) önce gelsin
      const aTier = a.fameTier ?? 4
      const bTier = b.fameTier ?? 4
      if (aTier !== bTier) return aTier - bTier

      return a.name.length - b.name.length
    })
  }

  return results.slice(0, limit)
}

export async function suggestFamousPerson(payload: SuggestNamePayload): Promise<NameSuggestion> {
  const admin = supabaseAdmin()
  const cleanName = payload.name.trim()
  const cleanNotes = payload.notes?.trim() || null
  const category = payload.category

  try {
    const { data, error } = await admin
      .from('name_suggestions')
      .insert({
        name: cleanName,
        category,
        notes: cleanNotes,
        suggested_by: payload.suggestedBy?.trim() || null,
        status: 'pending',
      })
      .select('id, name, category, notes, suggested_by, status, created_at')
      .single()

    if (!error && data) {
      return {
        id: data.id,
        name: data.name,
        category: data.category as FamousPersonCategory,
        notes: data.notes,
        suggestedBy: data.suggested_by,
        status: data.status as 'pending' | 'approved' | 'rejected',
        createdAt: data.created_at,
      }
    }
  } catch {
    // DB tablosu veya bağlantı hatası durumunda dahi kullanıcı akışını kesintiye uğratmaz
  }

  return {
    id: randomUUID(),
    name: cleanName,
    category,
    notes: cleanNotes,
    suggestedBy: payload.suggestedBy?.trim() || null,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }
}

export async function autoAssignNames(
  roomId: string,
  playerId: string,
  category: FamousPersonCategory = 'all',
): Promise<AutoAssignResult> {
  const admin = supabaseAdmin()
  const players = await loadPlayers(roomId)
  const host = requireMembership(players, playerId)

  if (!host.is_host) {
    throw forbidden('not_host', 'Otomatik isim atamayı yalnızca oda sahibi yapabilir.')
  }

  const room = await loadRoom(roomId)
  if (room.status !== 'waiting') {
    throw conflict('game_already_started', 'Oyun başladıktan sonra isim ataması yapılamaz.')
  }

  const categoryData = getRoomCategoryData(roomId, room)
  const isMultiPhase = categoryData.categoryMode === 'multi_phase'
  const effectiveCategory: FamousPersonCategory = isMultiPhase
    ? (categoryData.phaseCategories[0] || 'all')
    : (category && category !== 'all' ? category : getActivePhaseCategory(categoryData))

  // 3 Fazlı modda kişi başı 1 isim atanır (her fazda 1 isim döner)
  const namesPerPlayer = isMultiPhase ? 1 : MAX_NAMES_PER_PLAYER

  if (isMultiPhase) {
    playerSubmittedPhaseNamesStore.delete(roomId)
  }

  const gameMode = getRoomMode(roomId, room.game_mode)
  const difficulty = getRoomDifficulty(roomId, (room as unknown as { difficulty?: string }).difficulty)

  if (gameMode === 'shared_target') {
    let candidates = await getFamousPeople({
      category: effectiveCategory,
      difficulty,
      random: true,
      limit: 10,
    })
    if (candidates.length === 0 && effectiveCategory !== 'all') {
      candidates = await getFamousPeople({
        category: 'all',
        difficulty,
        random: true,
        limit: 10,
      })
    }
    if (candidates.length === 0) {
      throw badRequest('no_famous_people', 'Seçilen kriterlere uygun ünlü bulunamadı.')
    }
    const picked = candidates[0]!
    const sharedData = getSharedTargetRoomData(roomId)
    sharedData.targetName = picked.name
    setSharedTargetRoomData(roomId, sharedData)
    return {
      assignedCount: 1,
      names: [picked.name],
      isSharedTarget: true,
      sharedTargetName: picked.name,
    }
  }

  const totalNamesNeeded = players.length * namesPerPlayer
  const pool = (await getFamousPeople({
    category: effectiveCategory,
    difficulty,
    random: true,
    limit: Math.max(totalNamesNeeded + 10, 50),
  })).filter((p) => p.name.trim().length > 0 && p.name.trim().length <= 60)

  if (pool.length < totalNamesNeeded && effectiveCategory !== 'all') {
    const extra = (await getFamousPeople({
      category: 'all',
      difficulty,
      random: true,
      limit: totalNamesNeeded + 10,
    })).filter((p) => p.name.trim().length > 0 && p.name.trim().length <= 60)
    for (const item of extra) {
      if (!pool.some((p) => p.name.toLocaleLowerCase('tr') === item.name.toLocaleLowerCase('tr'))) {
        pool.push(item)
      }
    }
  }

  await admin.from('names').delete().eq('room_id', roomId)

  const shuffledPool = [...pool].sort(() => Math.random() - 0.5)
  const assignedNames: { room_id: string; submitted_by: string; name_text: string }[] = []
  let poolIdx = 0

  for (const p of players) {
    for (let slot = 0; slot < namesPerPlayer; slot++) {
      if (poolIdx >= shuffledPool.length) {
        poolIdx = 0
      }
      const person = shuffledPool[poolIdx++]!
      assignedNames.push({
        room_id: roomId,
        submitted_by: p.id,
        name_text: person.name.trim().slice(0, 60),
      })
    }
  }

  const { error } = await admin.from('names').insert(assignedNames)
  if (error) throw error

  await admin.from('rooms').update({ status: room.status }).eq('id', roomId)

  return {
    assignedCount: assignedNames.length,
    names: assignedNames.map((n) => n.name_text),
  }
}

export async function startGame(roomId: string, playerId: string) {
  const admin = supabaseAdmin()
  const players = await loadPlayers(roomId)
  const player = requireMembership(players, playerId)

  if (!player.is_host) {
    throw forbidden('not_host', 'Oyunu yalnızca oda sahibi başlatabilir.')
  }

  const room = await loadRoom(roomId)
  if (room.status === 'playing') {
    throw conflict('game_already_started', 'Oyun zaten başlamış.')
  }

  if (players.length < MIN_PLAYERS) {
    throw badRequest('not_enough_players', `Oyunu başlatmak için en az ${MIN_PLAYERS} oyuncu gerekli.`)
  }
  if (players.length > MAX_PLAYERS) {
    throw badRequest('too_many_players', `Oda dolu (en fazla ${MAX_PLAYERS} oyuncu).`)
  }

  const gameMode = getRoomMode(roomId, room.game_mode)
  const isSpeed = gameMode === 'speed'
  const isPersistent = gameMode === 'persistent'
  const isSharedTarget = gameMode === 'shared_target'

  if (!isSharedTarget) {
    const names = await loadNames(roomId)
    const submitters = new Set(names.map((name) => name.submitted_by))
    if (!players.every((candidate) => submitters.has(candidate.id))) {
      throw badRequest('names_missing', 'Tüm oyuncuların isimlerini göndermesi bekleniyor.')
    }
  }

  // Canları ve hız modu sayaçlarını sıfırla
  for (const p of players) {
    setPlayerLives(roomId, p.id, TOTAL_LIVES_PER_GAME)
  }
  clearRoomSpeedData(roomId)
  clearRoomPersistentData(roomId)

  await admin
    .from('players')
    .update({ score: 0 })
    .eq('room_id', roomId)

  try {
    await admin
      .from('players')
      .update({ questions_this_round: 0, round_scores: [], has_finished_round: false })
      .eq('room_id', roomId)
  } catch {
    // Sütun yoksa yut
  }

  if (isSharedTarget) {
    const contestants = players.filter((p) => !p.is_host)
    if (contestants.length === 0) {
      throw badRequest('not_enough_players', 'Oyunu başlatmak için en az bir yarışmacı oyuncu gereklidir.')
    }

    const sharedData = getSharedTargetRoomData(roomId)
    if (!sharedData.targetName) {
      throw badRequest('target_missing', 'Lütfen önce bu tur için bir gizli hedef belirleyin.')
    }
    sharedData.targetRevealed = false
    sharedData.roundWinnerId = null
    sharedData.pendingQuestion = null
    sharedData.questionLog = []
    sharedData.playerPenalties.clear()
    setSharedTargetRoomData(roomId, sharedData)

    const firstAsker = contestants[0]!

    const { error } = await admin
      .from('rooms')
      .update({
        status: 'playing',
        current_player_id: firstAsker.id,
        current_identity_id: null,
        game_round: 1,
        is_game_active: true,
      })
      .eq('id', roomId)

    if (error) throw error
    return
  }

  const categoryData = getRoomCategoryData(roomId, room)
  categoryData.phaseIntermission = null
  categoryData.currentPhase = 1
  setRoomCategoryData(roomId, categoryData)

  let names = await loadNames(roomId)

  // 3 Fazlı modda manuel girilmiş isimler varsa Faz 1 için sadece 1. isimleri (kişi başı 1 isim) ayarla
  if (categoryData.categoryMode === 'multi_phase') {
    const submittedPhaseMap = playerSubmittedPhaseNamesStore.get(roomId)
    const hasManual =
      submittedPhaseMap &&
      players.every((p) => {
        const list = submittedPhaseMap.get(p.id)
        return list && list.length >= 1 && Boolean(list[0])
      })
    if (hasManual) {
      await admin.from('names').delete().eq('room_id', roomId)
      const phase1Names = players.map((p) => ({
        id: randomUUID(),
        room_id: roomId,
        submitted_by: p.id,
        name_text: submittedPhaseMap.get(p.id)![0]!,
      }))
      const { error: insErr } = await admin.from('names').insert(phase1Names)
      if (insErr) throw insErr
      names = await loadNames(roomId)
    }
  }

  const firstPlayer = players[0]!

  if (isPersistent) {
    // Israrcı Mod: Her oyuncuya sabit gizli isim ata + persistent data başlat
    assignNamesForRound(roomId, players, names)
    for (const p of players) {
      setPlayerPersistentData(roomId, p.id, {
        questionBudgetRemaining: PERSISTENT_MODE_QUESTION_BUDGET,
        totalQuestionsUsed: 0,
        nameSolved: false,
        roundScore: 0,
      })
    }
    const firstNameId = getPlayerRoundNameId(roomId, firstPlayer.id)

    const { error } = await admin
      .from('rooms')
      .update({
        status: 'playing',
        current_player_id: firstPlayer.id,
        current_identity_id: firstNameId,
        game_round: 1,
        is_game_active: true,
      })
      .eq('id', roomId)

    if (error) throw error
    return
  }

  if (isSpeed) {
    // Hız Modu: 1. Tur için her oyuncuya sabit bir gizli isim ata (round içinde sabit kalır)
    assignNamesForRound(roomId, players, names)
    const firstNameId = getPlayerRoundNameId(roomId, firstPlayer.id)

    const { error } = await admin
      .from('rooms')
      .update({
        status: 'playing',
        current_player_id: firstPlayer.id,
        current_identity_id: firstNameId,
        game_round: 1,
        is_game_active: true,
      })
      .eq('id', roomId)

    if (error) throw error
    return
  }


  // Klasik Mod: Her oyuncuya çakışmasız gizli bir isim ata
  classicRetiredNamesStore.delete(roomId)
  playerClassicSolvedStore.delete(roomId)
  playerPassRightsStore.delete(roomId)
  for (const p of players) {
    setPlayerLives(roomId, p.id, TOTAL_LIVES_PER_GAME)
    setPlayerPassRights(roomId, p.id, CLASSIC_MODE_MAX_PASSES)
  }
  const assignments = assignNamesForRound(roomId, players, names)
  for (const [pId, nId] of assignments.entries()) {
    try {
      await admin.from('names').update({ assigned_to: pId, used_in_round: null }).eq('id', nId)
    } catch {
      // ignore
    }
  }
  const firstNameId = getPlayerRoundNameId(roomId, firstPlayer.id)

  const { error } = await admin
    .from('rooms')
    .update({
      status: 'playing',
      current_player_id: firstPlayer.id,
      current_identity_id: firstNameId,
      game_round: 1,
      is_game_active: true,
    })
    .eq('id', roomId)

  if (error) throw error
}

interface AdvanceTurnOutcome {
  claimed: boolean
  finished: boolean
  nextRoundStarted?: boolean
  phaseChanged?: boolean
  newPhase?: number
  newCategory?: FamousPersonCategory
}

/**
 * 3 Fazlı modda faz tamamlandığında faz arası bekleme durumunu başlatır.
 * Tüm oyuncular hazır olana veya host sonraki faza geçirene kadar bu durumda kalınır.
 */
export async function startPhaseIntermission(
  room: RoomRow,
  players: PlayerRow[],
  categoryData: RoomCategoryData,
): Promise<AdvanceTurnOutcome> {
  const admin = supabaseAdmin()
  const currentPhase = categoryData.currentPhase
  const nextPhase = currentPhase + 1

  categoryData.phaseIntermission = {
    completedPhase: currentPhase,
    nextPhase,
    readyPlayerIds: [],
  }
  setRoomCategoryData(room.id, categoryData)

  // Realtime tetiklemek için rooms tablosuna dokun
  await admin.from('rooms').update({ updated_at: new Date().toISOString() }).eq('id', room.id)

  return {
    claimed: true,
    finished: false,
    nextRoundStarted: false,
    phaseChanged: false,
  }
}

/**
 * Oyuncunun faz geçişinde hazır olduğunu kaydeder.
 * Tüm oyuncular hazır olduysa otomatik olarak yeni fazı başlatır.
 */
export async function setPlayerPhaseReady(
  roomId: string,
  playerId: string,
): Promise<{ success: boolean; allReady: boolean; nextPhaseStarted: boolean }> {
  const admin = supabaseAdmin()
  const players = await loadPlayers(roomId)
  requireMembership(players, playerId)

  const room = await loadRoom(roomId)
  const categoryData = getRoomCategoryData(roomId, room)

  if (!categoryData.phaseIntermission) {
    return { success: true, allReady: false, nextPhaseStarted: false }
  }

  if (!categoryData.phaseIntermission.readyPlayerIds.includes(playerId)) {
    categoryData.phaseIntermission.readyPlayerIds.push(playerId)
    setRoomCategoryData(roomId, categoryData)
  }

  const allReady = categoryData.phaseIntermission.readyPlayerIds.length >= players.length
  if (allReady) {
    await transitionToNextPhase(room, players, categoryData)
    return { success: true, allReady: true, nextPhaseStarted: true }
  }

  await admin.from('rooms').update({ updated_at: new Date().toISOString() }).eq('id', roomId)
  return { success: true, allReady: false, nextPhaseStarted: false }
}

/**
 * Host'un tüm oyuncuların hazır olmasını beklemeden veya herkes hazır olduğunda
 * sonraki faza doğrudan geçmesini sağlar.
 */
export async function startNextPhaseByHost(
  roomId: string,
  playerId: string,
): Promise<{ success: boolean; nextPhaseStarted: boolean }> {
  const players = await loadPlayers(roomId)
  const player = requireMembership(players, playerId)

  if (!player.is_host) {
    throw forbidden('not_host', 'Sonraki fazı yalnızca oda sahibi başlatabilir.')
  }

  const room = await loadRoom(roomId)
  const categoryData = getRoomCategoryData(roomId, room)

  if (!categoryData.phaseIntermission) {
    return { success: true, nextPhaseStarted: false }
  }

  await transitionToNextPhase(room, players, categoryData)
  return { success: true, nextPhaseStarted: true }
}

/**
 * 3 Fazlı modda bir sonraki faza geçiş:
 * İsim havuzunu sıfırlar, yeni fazın isimlerini dağıtır (kişi başı 1 isim), can/puan kümülatif devam eder.
 */
export async function transitionToNextPhase(
  room: RoomRow,
  players: PlayerRow[],
  categoryData: RoomCategoryData,
): Promise<AdvanceTurnOutcome> {
  const admin = supabaseAdmin()
  const currentPhase = categoryData.currentPhase
  const totalPhases = categoryData.totalPhases

  if (currentPhase >= totalPhases) {
    // Tüm 3 faz tamamlandı -> Oyun biter
    categoryData.phaseIntermission = null
    setRoomCategoryData(room.id, categoryData)
    const { data } = await admin
      .from('rooms')
      .update({ status: 'finished', is_game_active: false, current_identity_id: null })
      .eq('id', room.id)
      .select('id')
    await recordGameResults(room.id)
    return { claimed: (data?.length ?? 0) > 0, finished: true }
  }

  const nextPhase = currentPhase + 1
  const nextCategory = categoryData.phaseCategories[nextPhase - 1] || 'all'
  categoryData.currentPhase = nextPhase
  categoryData.phaseIntermission = null
  setRoomCategoryData(room.id, categoryData)

  // 1. Önceki fazın isimlerini temizle
  await admin.from('names').delete().eq('room_id', room.id)

  const difficulty = getRoomDifficulty(room.id, (room as unknown as { difficulty?: string }).difficulty)
  const newAssignedNames: { id: string; room_id: string; submitted_by: string; name_text: string }[] = []

  // Manuel girilen isimler kontrolü
  const submittedPhaseMap = playerSubmittedPhaseNamesStore.get(room.id)
  const hasManualNames =
    submittedPhaseMap &&
    players.every((p) => {
      const list = submittedPhaseMap.get(p.id)
      return list && list.length >= nextPhase && Boolean(list[nextPhase - 1])
    })

  if (hasManualNames) {
    // Oyuncuların bu faz için lobide girdiği isimleri ata (kişi başı 1 isim)
    for (const p of players) {
      const list = submittedPhaseMap.get(p.id)!
      newAssignedNames.push({
        id: randomUUID(),
        room_id: room.id,
        submitted_by: p.id,
        name_text: list[nextPhase - 1]!,
      })
    }
  } else {
    // Otomatik atama: yeni fazın kategorisinden kişi başı 1 isim çek ve dağıt
    const totalNamesNeeded = players.length * 1
    const pool = await getFamousPeople({
      category: nextCategory,
      difficulty,
      random: true,
      limit: Math.max(totalNamesNeeded + 10, 50),
    })

    if (pool.length < totalNamesNeeded && nextCategory !== 'all') {
      const extra = await getFamousPeople({
        category: 'all',
        difficulty,
        random: true,
        limit: totalNamesNeeded + 10,
      })
      for (const item of extra) {
        if (!pool.some((p) => p.name.toLocaleLowerCase('tr') === item.name.toLocaleLowerCase('tr'))) {
          pool.push(item)
        }
      }
    }

    const shuffledPool = [...pool].sort(() => Math.random() - 0.5)
    let poolIdx = 0

    for (const p of players) {
      if (poolIdx >= shuffledPool.length) {
        poolIdx = 0
      }
      const person = shuffledPool[poolIdx++]!
      newAssignedNames.push({
        id: randomUUID(),
        room_id: room.id,
        submitted_by: p.id,
        name_text: person.name,
      })
    }
  }

  const { error: insertErr } = await admin.from('names').insert(newAssignedNames)
  if (insertErr) throw insertErr

  // 3. Bellek içi tur atama store'larını bu faz için sıfırla
  playerRoundNameStore.delete(room.id)
  roomUsedNamesStore.delete(room.id)
  resetRoomSpeedRound(room.id)
  classicRetiredNamesStore.delete(room.id)
  playerClassicSolvedStore.delete(room.id)
  playerPassRightsStore.delete(room.id)
  playerClueCardStore.delete(room.id)

  // 4. Canları ve pas haklarını yenile — yeni fazda herkes tam can ve 3 pas hakkıyla başlar
  roomLivesStore.delete(room.id)
  for (const p of players) {
    setPlayerLives(room.id, p.id, TOTAL_LIVES_PER_GAME)
    setPlayerPassRights(room.id, p.id, CLASSIC_MODE_MAX_PASSES)
  }

  const firstPlayer = players[0]!
  const availableFirstName = newAssignedNames.find((n) => n.submitted_by !== firstPlayer.id) || newAssignedNames[0]!
  setPlayerRoundNameId(room.id, firstPlayer.id, availableFirstName.id)

  const currentRound = (room.game_round ?? 1) + 1

  const { data, error } = await admin
    .from('rooms')
    .update({
      current_phase: nextPhase,
      game_round: currentRound,
      current_player_id: firstPlayer.id,
      current_identity_id: availableFirstName.id,
      status: 'playing',
      is_game_active: true,
    })
    .eq('id', room.id)
    .select('id')

  if (error) throw error

  try {
    await admin.from('names').update({ used_in_round: currentRound }).eq('id', availableFirstName.id)
  } catch {
    // Sütun yoksa yut
  }

  return {
    claimed: (data?.length ?? 0) > 0,
    finished: false,
    nextRoundStarted: true,
    phaseChanged: true,
    newPhase: nextPhase,
    newCategory: nextCategory,
  }
}

/**
 * Sırayı bir sonraki oyuncuya devreder.
 * INV-1: game_mode alanına asla yazmaz.
 * INV-2: is_host kontrolü yapmaz.
 */
async function advanceTurn(
  room: RoomRow,
  players: PlayerRow[],
  names: NameRow[],
): Promise<AdvanceTurnOutcome> {
  clearRoomTurnAskedData(room.id)
  const admin = supabaseAdmin()
  const gameMode = getRoomMode(room.id, room.game_mode)
  const categoryData = getRoomCategoryData(room.id, room)

  if (gameMode === 'speed') {
    const currentRound = room.game_round ?? 1
    const totalRounds = room.total_rounds || DEFAULT_SPEED_ROUNDS

    // Bu turu henüz tamamlamamış oyuncular — YALNIZCA speedStore'dan oku (DB stale olabilir)
    const unfinishedPlayers = players.filter((p) => {
      const speed = getPlayerSpeedData(room.id, p.id)
      return !speed.finishedCurrentRound
    })

    if (unfinishedPlayers.length === 0) {
      if (categoryData.categoryMode === 'multi_phase' && categoryData.currentPhase < categoryData.totalPhases) {
        return startPhaseIntermission(room, players, categoryData)
      }

      if (currentRound >= totalRounds) {
        // Tüm turlar bitti -> Oyun tamamlandı
        const { data } = await admin
          .from('rooms')
          .update({ status: 'finished', is_game_active: false, current_identity_id: null })
          .eq('id', room.id)
          .select('id')
        await recordGameResults(room.id)
        return { claimed: (data?.length ?? 0) > 0, finished: true, nextRoundStarted: false }
      }

      // Sıradaki tura geçiş (startNextRound)
      const nextRound = currentRound + 1
      resetRoomSpeedRound(room.id)

      try {
        await admin
          .from('players')
          .update({ questions_this_round: 0, has_finished_round: false })
          .eq('room_id', room.id)
      } catch {
        // Sütun yoksa yut
      }

      // Yeni round için isim havuzundan çakışmasız YENİ isimler ata (isimler yeniden YAZILMAZ, sadece atama yenilenir)
      assignNamesForRound(room.id, players, names)

      const firstPlayer = players[0]!
      const nextNameId = getPlayerRoundNameId(room.id, firstPlayer.id)

      const { data, error } = await admin
        .from('rooms')
        .update({
          game_round: nextRound,
          current_player_id: firstPlayer.id,
          current_identity_id: nextNameId,
        })
        .eq('id', room.id)
        .select('id')

      if (error) throw error
      return { claimed: (data?.length ?? 0) > 0, finished: false, nextRoundStarted: true }
    }

    // Tur devam ediyor: round-robin ile sıradaki bitirmemiş oyuncuya geç
    const nextPlayer = selectNextPlayer(
      players,
      room.current_player_id,
      new Set(unfinishedPlayers.map((p) => p.id)),
    )

    if (!nextPlayer) {
      return { claimed: true, finished: false, nextRoundStarted: false }
    }

    // nextPlayer'ın bu turdaki ATANMIŞ SABİT İSMİNİ al (tur içinde ASLA değişmez!)
    let nextNameId = getPlayerRoundNameId(room.id, nextPlayer.id)
    if (!nextNameId || !names.some((n) => n.id === nextNameId)) {
      const candidate = names.find((n) => n.submitted_by !== nextPlayer.id) || names[0]
      nextNameId = candidate?.id ?? null
      if (nextNameId) setPlayerRoundNameId(room.id, nextPlayer.id, nextNameId)
    }

    const { data, error } = await admin
      .from('rooms')
      .update({
        current_player_id: nextPlayer.id,
        current_identity_id: nextNameId,
      })
      .eq('id', room.id)
      .select('id')

    if (error) throw error
    return { claimed: (data?.length ?? 0) > 0, finished: false, nextRoundStarted: false }
  }

  if (gameMode === 'persistent') {
    // Israrcı Mod: bitirmemiş (solved/eliminated olmayan) oyuncularla round-robin
    const unfinishedPlayers = players.filter((p) => !isPersistentPlayerFinished(room.id, p.id))

    if (unfinishedPlayers.length === 0) {
      if (categoryData.categoryMode === 'multi_phase' && categoryData.currentPhase < categoryData.totalPhases) {
        return startPhaseIntermission(room, players, categoryData)
      }

      // Tüm oyuncular solved veya eliminated → oyun biter
      const { data } = await admin
        .from('rooms')
        .update({ status: 'finished', is_game_active: false, current_identity_id: null })
        .eq('id', room.id)
        .select('id')
      await recordGameResults(room.id)
      return { claimed: (data?.length ?? 0) > 0, finished: true }
    }

    const nextPlayer = selectNextPlayer(
      players,
      room.current_player_id,
      new Set(unfinishedPlayers.map((p) => p.id)),
    )

    if (!nextPlayer) {
      return { claimed: true, finished: false }
    }

    // nextPlayer'ın atanmış sabit ismini al
    let nextNameId = getPlayerRoundNameId(room.id, nextPlayer.id)
    if (!nextNameId || !names.some((n) => n.id === nextNameId)) {
      const candidate = names.find((n) => n.submitted_by !== nextPlayer.id) || names[0]
      nextNameId = candidate?.id ?? null
      if (nextNameId) setPlayerRoundNameId(room.id, nextPlayer.id, nextNameId)
    }

    const { data, error } = await admin
      .from('rooms')
      .update({
        current_player_id: nextPlayer.id,
        current_identity_id: nextNameId,
      })
      .eq('id', room.id)
      .select('id')

    if (error) throw error
    return { claimed: (data?.length ?? 0) > 0, finished: false }
  }

  // Klasik Mod
  const currentRound = room.game_round ?? 1
  const activePlayers = players.filter((p) => !isPlayerClassicSolved(room.id, p.id))

  if (activePlayers.length === 0) {
    if (categoryData.categoryMode === 'multi_phase' && categoryData.currentPhase < categoryData.totalPhases) {
      return startPhaseIntermission(room, players, categoryData)
    }

    const { data } = await admin
      .from('rooms')
      .update({ status: 'finished', is_game_active: false, current_identity_id: null })
      .eq('id', room.id)
      .select('id')
    await recordGameResults(room.id)
    return { claimed: (data?.length ?? 0) > 0, finished: true }
  }

  const nextPlayer = selectNextPlayer(
    players,
    room.current_player_id,
    new Set(activePlayers.map((p) => p.id)),
  )

  if (!nextPlayer) {
    return { claimed: true, finished: false }
  }

  let nextNameId = getPlayerRoundNameId(room.id, nextPlayer.id)
  if (!nextNameId || !names.some((n) => n.id === nextNameId)) {
    const dbAssigned = names.find((n) => n.assigned_to === nextPlayer.id && (n.used_in_round == null))
    if (dbAssigned) {
      nextNameId = dbAssigned.id
      setPlayerRoundNameId(room.id, nextPlayer.id, nextNameId)
    } else {
      nextNameId = await assignNewClassicName(room.id, nextPlayer, names)
    }
  }

  if (!nextNameId || !names.some((n) => n.id === nextNameId)) {
    setPlayerClassicSolved(room.id, nextPlayer.id, true)
    return advanceTurn(room, players, names)
  }

  const { data, error } = await admin
    .from('rooms')
    .update({
      current_player_id: nextPlayer.id,
      current_identity_id: nextNameId,
      game_round: currentRound + 1,
    })
    .eq('id', room.id)
    .select('id')

  if (error) throw error
  return { claimed: (data?.length ?? 0) > 0, finished: false }
}

function assertPlayersTurn(room: RoomRow, playerId: string) {
  if (room.status !== 'playing' || !room.is_game_active) {
    throw conflict('game_not_active', 'Oyun şu anda aktif değil.')
  }
  if (room.current_player_id !== playerId) {
    throw forbidden('not_your_turn', 'Sıra sizde değil.')
  }
}

// ==========================================
// MERKEZİ AKSİYON İŞLEYİCİLERİ (Bölüm 2 & 3)
// ==========================================

export async function makeGuess(roomId: string, playerId: string, guess: string): Promise<GuessResult> {
  const [room, players, names] = await Promise.all([
    loadRoom(roomId),
    loadPlayers(roomId),
    loadNames(roomId),
  ])

  requireMembership(players, playerId)

  const gameMode = getRoomMode(roomId, room.game_mode)

  if (gameMode === 'shared_target') {
    // Ortak Hedef Modunda BUZZER mantığı: Sıra onda olsun ya da olmasın her yarışmacı tahmin edebilir!
    return handleSharedTargetGuess(room, players, playerId, guess)
  }

  assertPlayersTurn(room, playerId)

  const activeVote = roomActiveVoteStore.get(roomId)
  if (activeVote && activeVote.status === 'open' && Date.now() < activeVote.closesAt) {
    throw conflict('vote_in_progress', 'Şu anda oylama devam ediyor. Lütfen sorunuzun yanıtlanmasını bekleyin.')
  }

  const currentName = names.find((name) => name.id === room.current_identity_id)
  if (!currentName) {
    throw conflict('no_active_name', 'Bu tur için bir isim seçilmemiş.')
  }

  if (gameMode === 'speed') {
    return handleSpeedModeGuess(room, players, names, playerId, guess, currentName.name_text)
  } else if (gameMode === 'persistent') {
    return handlePersistentModeGuess(room, players, names, playerId, guess, currentName.name_text)
  } else if (gameMode === 'classic') {
    return handleClassicModeGuess(room, players, names, playerId, guess, currentName.name_text)
  } else {
    throw new Error(`game_mode tanımsız — bu asla olmamalı (INV-1 ihlali): ${gameMode}`)
  }
}

export async function passTurn(roomId: string, playerId: string) {
  const [room, players, names] = await Promise.all([
    loadRoom(roomId),
    loadPlayers(roomId),
    loadNames(roomId),
  ])

  requireMembership(players, playerId)
  assertPlayersTurn(room, playerId)

  const gameMode = getRoomMode(roomId, room.game_mode)

  if (gameMode === 'speed') {
    return handleSpeedModeAskQuestion(room, players, names, playerId)
  } else if (gameMode === 'persistent') {
    return handlePersistentModeAskQuestion(room, players, names, playerId)
  } else if (gameMode === 'classic') {
    return handleClassicModePassTurn(room, players, names)
  } else if (gameMode === 'shared_target') {
    return handleSharedTargetPassTurn(room, players)
  } else {
    throw new Error(`game_mode tanımsız — bu asla olmamalı (INV-1 ihlali): ${gameMode}`)
  }
}


// -------------------------------------------------------------
// HIZ MODU AKSİYON İŞLEYİCİLERİ (handleSpeedModeAction)
// -------------------------------------------------------------

async function handleSpeedModeAskQuestion(
  room: RoomRow,
  players: PlayerRow[],
  names: NameRow[],
  playerId: string,
) {
  const admin = supabaseAdmin()
  const speedData = getPlayerSpeedData(room.id, playerId)

  // INV-3: Host dahil HERKES için aynı satır — is_host kontrolü KESİNLİKLE YOK
  const newQuestions = incrementQuestionCount(room.id, playerId)
  const reachedLimit = newQuestions >= SPEED_MODE_MAX_QUESTIONS

  if (reachedLimit) {
    const updatedRoundScores = [...speedData.roundScores, 0]
    const newTotalScore = updatedRoundScores.reduce((sum, s) => sum + s, 0)
    setPlayerSpeedData(room.id, playerId, {
      questionsThisRound: newQuestions,
      roundScores: updatedRoundScores,
      finishedCurrentRound: true,
    })

    try {
      await admin.from('players').update({ score: newTotalScore }).eq('id', playerId)
    } catch {
      // Sütun hatası yut
    }
  }

  try {
    await admin.from('players').update({
      questions_this_round: newQuestions,
      has_finished_round: reachedLimit,
      round_scores: reachedLimit ? [...speedData.roundScores, 0] : speedData.roundScores,
    }).eq('id', playerId)
  } catch {
    // Sütun yoksa yut
  }

  const updatedPlayers = players.map((p) => {
    if (p.id !== playerId) return p
    const speed = getPlayerSpeedData(room.id, playerId)
    const totalScore = speed.roundScores.reduce((sum, s) => sum + s, 0)
    return {
      ...p,
      score: totalScore,
      questions_this_round: newQuestions,
      has_finished_round: reachedLimit,
      round_scores: speed.roundScores,
    }
  })

  const outcome = await advanceTurn(room, updatedPlayers, names)

  const remainingUnfinished = updatedPlayers.filter((p) => {
    const speed = getPlayerSpeedData(room.id, p.id)
    return !speed.finishedCurrentRound
  }).length

  const msg = reachedLimit
    ? '20 soru limitine ulaşıldı! Bu turdan 0 puan aldınız.'
    : remainingUnfinished <= 1
      ? `Sorunuz kaydedildi (Soru: ${newQuestions}). Sıra sizde devam ediyor.`
      : `Sorunuz kaydedildi (Soru: ${newQuestions}). Sıra bir sonraki oyuncuya geçti.`

  return {
    message: msg,
    finished: outcome.finished,
    nextRoundStarted: outcome.nextRoundStarted,
  }
}

async function handleSpeedModeGuess(
  room: RoomRow,
  players: PlayerRow[],
  names: NameRow[],
  playerId: string,
  guess: string,
  targetNameText: string,
): Promise<GuessResult> {
  const admin = supabaseAdmin()
  const speedData = getPlayerSpeedData(room.id, playerId)

  const isCorrect = fuzzyMatch(guess, targetNameText)

  if (isCorrect) {
    // Doğru tahmin! Sorulan soru sayısına göre puan hesapla
    const qCount = speedData.questionsThisRound
    const roundScore = calculateSpeedScore(qCount)
    const updatedRoundScores = [...speedData.roundScores, roundScore]
    const newTotalScore = updatedRoundScores.reduce((sum, s) => sum + s, 0)

    setPlayerSpeedData(room.id, playerId, {
      questionsThisRound: qCount,
      roundScores: updatedRoundScores,
      finishedCurrentRound: true,
    })

    try {
      await admin.from('players').update({
        score: newTotalScore,
      }).eq('id', playerId)
    } catch {
      await admin.rpc('increment_player_score', {
        p_player_id: playerId,
        p_delta: roundScore,
      })
    }

    try {
      await admin.from('players').update({
        round_scores: updatedRoundScores,
        has_finished_round: true,
      }).eq('id', playerId)
    } catch {
      // Sütun yoksa yut
    }

    const updatedPlayers = players.map((p) =>
      p.id === playerId
        ? {
            ...p,
            score: newTotalScore,
            round_scores: updatedRoundScores,
            has_finished_round: true,
          }
        : p,
    )

    const outcome = await advanceTurn(room, updatedPlayers, names)

    return {
      correct: true,
      message: `Doğru tahmin! Bu turdan ${roundScore} puan kazandınız.`,
      pointsEarned: roundScore,
      turnPassed: true,
      finished: outcome.finished,
      nextRoundStarted: outcome.nextRoundStarted,
    }
  }

  // Yanlış tahmin: INV-3 uyarınca soru sayısını 1 artır (host dahil HERKES için)
  const newQuestions = incrementQuestionCount(room.id, playerId)
  const reachedLimit = newQuestions >= SPEED_MODE_MAX_QUESTIONS
  const updatedRoundScores = reachedLimit ? [...speedData.roundScores, 0] : speedData.roundScores
  const newTotalScore = updatedRoundScores.reduce((sum, s) => sum + s, 0)

  setPlayerSpeedData(room.id, playerId, {
    questionsThisRound: newQuestions,
    roundScores: updatedRoundScores,
    finishedCurrentRound: reachedLimit,
  })

  if (reachedLimit) {
    try {
      await admin.from('players').update({
        score: newTotalScore,
      }).eq('id', playerId)
    } catch {
      // ignore
    }
  }

  try {
    await admin.from('players').update({
      questions_this_round: newQuestions,
      has_finished_round: reachedLimit,
      round_scores: updatedRoundScores,
    }).eq('id', playerId)
  } catch {
    // Sütun yoksa yut
  }

  const updatedPlayers = players.map((p) =>
    p.id === playerId
      ? {
          ...p,
          score: newTotalScore,
          questions_this_round: newQuestions,
          has_finished_round: reachedLimit,
          round_scores: updatedRoundScores,
        }
      : p,
  )

  const outcome = await advanceTurn(room, updatedPlayers, names)

  const remainingUnfinished = updatedPlayers.filter((p) => {
    const speed = getPlayerSpeedData(room.id, p.id)
    return !speed.finishedCurrentRound
  }).length

  const msg = reachedLimit
    ? 'Yanlış tahmin ve 20 soru limitine ulaşıldı! Bu turdan 0 puan aldınız.'
    : remainingUnfinished <= 1
      ? 'Yanlış tahmin! Sıra sizde devam ediyor.'
      : 'Yanlış tahmin! Sıra diğer oyuncuya geçti.'

  return {
    correct: false,
    message: msg,
    turnPassed: true,
    finished: outcome.finished,
    nextRoundStarted: outcome.nextRoundStarted,
    phaseChanged: outcome.phaseChanged,
    newPhase: outcome.newPhase,
    newCategory: outcome.newCategory,
  }
}

// -------------------------------------------------------------
// ISRARCI MOD AKSİYON İŞLEYİCİLERİ (handlePersistentModeAction)
// -------------------------------------------------------------

async function handlePersistentModeAskQuestion(
  room: RoomRow,
  players: PlayerRow[],
  names: NameRow[],
  playerId: string,
) {
  const pData = getPlayerPersistentData(room.id, playerId)

  if (pData.questionBudgetRemaining <= 0) {
    throw badRequest('budget_exhausted', 'Soru bütçeniz bitti, sadece tahmin edebilirsiniz.')
  }

  // Bütçeden 1 düş
  const newBudget = pData.questionBudgetRemaining - 1
  const newUsed = pData.totalQuestionsUsed + 1
  setPlayerPersistentData(room.id, playerId, {
    ...pData,
    questionBudgetRemaining: newBudget,
    totalQuestionsUsed: newUsed,
  })

  const outcome = await advanceTurn(room, players, names)

  const budgetWarning = newBudget === 0
    ? ' Soru bütçeniz bitti! Bundan sonra sadece tahmin edebilirsiniz.'
    : ''

  return {
    message: `Sorunuz kaydedildi (Kalan Bütçe: ${newBudget}/${PERSISTENT_MODE_QUESTION_BUDGET}).${budgetWarning}`,
    finished: outcome.finished,
    phaseChanged: outcome.phaseChanged,
    newPhase: outcome.newPhase,
    newCategory: outcome.newCategory,
  }
}

async function handlePersistentModeGuess(
  room: RoomRow,
  players: PlayerRow[],
  names: NameRow[],
  playerId: string,
  guess: string,
  targetNameText: string,
): Promise<GuessResult> {
  const admin = supabaseAdmin()
  const pData = getPlayerPersistentData(room.id, playerId)
  const currentLives = getPlayerLives(room.id, playerId)

  // Elenmişse (can 0) — bu kontrole normalde ulaşılmamalı ama güvenlik amaçlı
  if (currentLives <= 0) {
    const outcome = await advanceTurn(room, players, names)
    return {
      correct: false,
      message: 'Can hakkınız kalmadı, oyundan elendiniz!',
      livesLeft: 0,
      turnPassed: true,
      finished: outcome.finished,
      phaseChanged: outcome.phaseChanged,
      newPhase: outcome.newPhase,
      newCategory: outcome.newCategory,
    }
  }

  const isCorrect = fuzzyMatch(guess, targetNameText)

  if (isCorrect) {
    // Doğru tahmin — puan hesapla (az soru = yüksek puan)
    const roundScore = calculatePersistentScore(pData.totalQuestionsUsed)
    setPlayerPersistentData(room.id, playerId, {
      ...pData,
      nameSolved: true,
      roundScore,
    })

    // DB'ye puanı yaz
    try {
      await admin.from('players').update({ score: roundScore }).eq('id', playerId)
    } catch {
      await admin.rpc('increment_player_score', {
        p_player_id: playerId,
        p_delta: roundScore,
      })
    }

    const outcome = await advanceTurn(room, players, names)

    return {
      correct: true,
      message: `Doğru tahmin! ${pData.totalQuestionsUsed} soruyla bildiniz, ${roundScore} puan kazandınız!`,
      pointsEarned: roundScore,
      livesLeft: currentLives,
      turnPassed: true,
      finished: outcome.finished,
      phaseChanged: outcome.phaseChanged,
      newPhase: outcome.newPhase,
      newCategory: outcome.newCategory,
    }
  }

  // Yanlış tahmin — can düş
  const newLives = currentLives - 1
  setPlayerLives(room.id, playerId, newLives)

  if (newLives <= 0) {
    // Elendi — puan 0
    setPlayerPersistentData(room.id, playerId, {
      ...pData,
      roundScore: 0,
    })

    try {
      await admin.from('players').update({ score: 0 }).eq('id', playerId)
    } catch {
      // ignore
    }

    const outcome = await advanceTurn(room, players, names)

    return {
      correct: false,
      message: 'Yanlış tahmin! Can hakkınız bitti ve oyundan elendiniz.',
      livesLeft: 0,
      turnPassed: true,
      finished: outcome.finished,
      phaseChanged: outcome.phaseChanged,
      newPhase: outcome.newPhase,
      newCategory: outcome.newCategory,
    }
  }

  // Can hâlâ var — sıra geçer
  const outcome = await advanceTurn(room, players, names)
  await admin.from('rooms').update({ status: room.status }).eq('id', room.id)

  return {
    correct: false,
    message: `Yanlış tahmin! 1 can kaybettiniz (Kalan Can: ${newLives}). Sıra diğer oyuncuya geçti.`,
    livesLeft: newLives,
    turnPassed: true,
    finished: outcome.finished,
    phaseChanged: outcome.phaseChanged,
    newPhase: outcome.newPhase,
    newCategory: outcome.newCategory,
  }
}

// -------------------------------------------------------------
// ORTAK HEDEF MODU AKSİYON İŞLEYİCİLERİ (handleSharedTargetAction)
// -------------------------------------------------------------

export async function askSharedQuestion(
  roomId: string,
  playerId: string,
  questionText: string,
) {
  const [room, players] = await Promise.all([loadRoom(roomId), loadPlayers(roomId)])
  const player = requireMembership(players, playerId)

  if (room.status !== 'playing' || !room.is_game_active) {
    throw conflict('game_not_active', 'Oyun şu anda aktif değil.')
  }

  const gameMode = getRoomMode(roomId, room.game_mode)
  if (gameMode !== 'shared_target') {
    throw badRequest('invalid_mode', 'Bu aksiyon yalnızca Ortak Hedef Modunda geçerlidir.')
  }

  if (player.is_host) {
    throw forbidden('host_cannot_ask', 'Hakem (Host) soru soramaz.')
  }

  const sharedData = getSharedTargetRoomData(roomId)
  if (sharedData.targetRevealed) {
    throw conflict('target_already_revealed', 'Bu turun hedefi zaten bilindi.')
  }

  if (sharedData.pendingQuestion) {
    throw conflict('question_pending', 'Önceki soru henüz Hakem tarafından yanıtlanmadı.')
  }

  if (room.current_player_id !== playerId) {
    throw forbidden('not_your_turn', 'Soru sorma sırası sizde değil.')
  }

  const questionItem: SharedQuestionItem = {
    id: randomUUID(),
    askerId: playerId,
    askerNickname: player.nickname,
    questionText: questionText.trim(),
    answer: null,
    createdAt: new Date().toISOString(),
  }

  sharedData.pendingQuestion = questionItem
  setSharedTargetRoomData(roomId, sharedData)

  // Realtime tetikle
  await supabaseAdmin().from('rooms').update({ status: room.status }).eq('id', roomId)

  return {
    message: 'Sorunuz hakeme iletildi, cevap bekleniyor...',
    question: questionItem,
  }
}

export async function answerSharedQuestion(
  roomId: string,
  playerId: string,
  questionId: string,
  answer: 'yes' | 'no' | 'uncertain',
) {
  const [room, players] = await Promise.all([loadRoom(roomId), loadPlayers(roomId)])
  const player = requireMembership(players, playerId)

  if (!player.is_host) {
    throw forbidden('not_host', 'Soruları yalnızca Hakem (Oda Sahibi) yanıtlayabilir.')
  }

  const gameMode = getRoomMode(roomId, room.game_mode)
  if (gameMode !== 'shared_target') {
    throw badRequest('invalid_mode', 'Bu aksiyon yalnızca Ortak Hedef Modunda geçerlidir.')
  }

  const sharedData = getSharedTargetRoomData(roomId)
  if (!sharedData.pendingQuestion || sharedData.pendingQuestion.id !== questionId) {
    throw notFound('question_not_found', 'Yanıtlanacak soru bulunamadı.')
  }

  const answeredItem: SharedQuestionItem = {
    ...sharedData.pendingQuestion,
    answer,
  }

  sharedData.questionLog.push(answeredItem)
  sharedData.pendingQuestion = null

  // Sıradaki soru soranı seç (cezalılar atlanır ve cezaları tüketilir)
  const host = players.find((p) => p.is_host)!
  const penalizedSet = new Set(
    Array.from(sharedData.playerPenalties.entries())
      .filter(([, hasPenalty]) => hasPenalty)
      .map(([pid]) => pid),
  )

  const { nextPlayer, consumedPenalties } = selectNextSharedTargetAsker(
    players,
    room.current_player_id,
    host.id,
    penalizedSet,
  )

  for (const pid of consumedPenalties) {
    sharedData.playerPenalties.delete(pid)
  }

  setSharedTargetRoomData(roomId, sharedData)

  if (nextPlayer) {
    await supabaseAdmin()
      .from('rooms')
      .update({ current_player_id: nextPlayer.id })
      .eq('id', roomId)
  }

  const answerLabel = answer === 'yes' ? 'Evet' : answer === 'no' ? 'Hayır' : 'Belirsiz'
  return {
    message: `Cevap kaydedildi: ${answerLabel}. Sıra ${nextPlayer?.nickname ?? 'diğer oyuncuya'} geçti.`,
    nextPlayerId: nextPlayer?.id ?? null,
  }
}

async function handleSharedTargetPassTurn(room: RoomRow, players: PlayerRow[]) {
  const host = players.find((p) => p.is_host)!
  const sharedData = getSharedTargetRoomData(room.id)
  const penalizedSet = new Set(
    Array.from(sharedData.playerPenalties.entries())
      .filter(([, hasPenalty]) => hasPenalty)
      .map(([pid]) => pid),
  )

  const { nextPlayer, consumedPenalties } = selectNextSharedTargetAsker(
    players,
    room.current_player_id,
    host.id,
    penalizedSet,
  )

  for (const pid of consumedPenalties) {
    sharedData.playerPenalties.delete(pid)
  }
  setSharedTargetRoomData(room.id, sharedData)

  if (nextPlayer) {
    await supabaseAdmin()
      .from('rooms')
      .update({ current_player_id: nextPlayer.id })
      .eq('id', room.id)
  }

  return { message: `Sıra ${nextPlayer?.nickname ?? 'diğer oyuncuya'} geçti.` }
}

async function handleSharedTargetGuess(
  room: RoomRow,
  players: PlayerRow[],
  playerId: string,
  guess: string,
): Promise<GuessResult> {
  const admin = supabaseAdmin()
  const player = players.find((p) => p.id === playerId)!

  if (player.is_host) {
    throw forbidden('host_cannot_guess', 'Hakem (Host) tahmin yapamaz.')
  }

  if (room.status !== 'playing' || !room.is_game_active) {
    throw conflict('game_not_active', 'Oyun şu anda aktif değil.')
  }

  const sharedData = getSharedTargetRoomData(room.id)
  if (sharedData.targetRevealed) {
    throw conflict('target_already_revealed', 'Bu turun hedefi zaten bilindi.')
  }

  const targetName = sharedData.targetName ?? ''
  const isCorrect = fuzzyMatch(guess, targetName)

  if (isCorrect) {
    sharedData.targetRevealed = true
    sharedData.roundWinnerId = playerId
    const roundScore = SHARED_TARGET_POINTS_PER_WIN
    const newTotal = (player.score ?? 0) + roundScore

    try {
      await admin.from('players').update({ score: newTotal }).eq('id', playerId)
    } catch {
      await admin.rpc('increment_player_score', {
        p_player_id: playerId,
        p_delta: roundScore,
      })
    }

    const currentRound = room.game_round ?? 1
    const totalRounds = room.total_rounds || DEFAULT_SHARED_TARGET_ROUNDS
    const isGameFinished = currentRound >= totalRounds

    if (isGameFinished) {
      await admin.from('rooms').update({
        status: 'finished',
        is_game_active: false,
      }).eq('id', room.id)
      await recordGameResults(room.id)
    }

    setSharedTargetRoomData(room.id, sharedData)

    return {
      correct: true,
      message: `Tebrikler! Doğru bildiniz! Gizli Hedef: ${targetName} (+${roundScore} Puan)`,
      pointsEarned: roundScore,
      finished: isGameFinished,
      targetRevealed: true,
      revealedTargetName: targetName,
    }
  }

  // Yanlış tahmin: Ceza uygula (bir sonraki soru sırasını atlar)
  sharedData.playerPenalties.set(playerId, true)
  setSharedTargetRoomData(room.id, sharedData)

  await admin.from('rooms').update({ status: room.status }).eq('id', room.id)

  return {
    correct: false,
    message: `Yanlış tahmin! Hedef '${guess}' değil. Ceza: Bir sonraki soru sorma sıranız atlanacak.`,
    targetRevealed: false,
  }
}

export async function startNextSharedTargetRound(
  roomId: string,
  playerId: string,
  nextTargetName: string,
) {
  const admin = supabaseAdmin()
  const [room, players] = await Promise.all([loadRoom(roomId), loadPlayers(roomId)])
  const player = requireMembership(players, playerId)

  if (!player.is_host) {
    throw forbidden('not_host', 'Sonraki turu yalnızca oda sahibi başlatabilir.')
  }

  const currentRound = room.game_round ?? 1
  const totalRounds = room.total_rounds || DEFAULT_SHARED_TARGET_ROUNDS

  if (currentRound >= totalRounds) {
    throw conflict('game_already_finished', 'Tüm turlar tamamlandı.')
  }

  const nextRound = currentRound + 1
  const sharedData = getSharedTargetRoomData(roomId)
  sharedData.targetName = nextTargetName.trim()
  sharedData.targetRevealed = false
  sharedData.roundWinnerId = null
  sharedData.pendingQuestion = null
  sharedData.questionLog = []
  sharedData.playerPenalties.clear()
  setSharedTargetRoomData(roomId, sharedData)

  const contestants = players.filter((p) => !p.is_host)
  const firstPlayer = contestants[0]!

  const { error } = await admin
    .from('rooms')
    .update({
      status: 'playing',
      game_round: nextRound,
      current_player_id: firstPlayer.id,
      is_game_active: true,
    })
    .eq('id', roomId)

  if (error) throw error

  return { gameRound: nextRound }
}

// -------------------------------------------------------------
// KLASİK MOD AKSİYON İŞLEYİCİLERİ (handleClassicModeAction)
// -------------------------------------------------------------

export async function giveUp(roomId: string, playerId: string) {
  const [room, players, names] = await Promise.all([
    loadRoom(roomId),
    loadPlayers(roomId),
    loadNames(roomId),
  ])

  requireMembership(players, playerId)
  assertPlayersTurn(room, playerId)

  const activeVote = roomActiveVoteStore.get(roomId)
  if (activeVote && activeVote.status === 'open' && Date.now() < activeVote.closesAt) {
    throw conflict('vote_in_progress', 'Şu anda oylama devam ediyor. Lütfen sorunuzun yanıtlanmasını bekleyin.')
  }

  const gameMode = getRoomMode(roomId, room.game_mode)

  if (gameMode === 'classic') {
    return handleClassicModeGiveUp(room, players, names, playerId)
  } else {
    throw badRequest('invalid_mode_action', 'İsmi pas geçme seçeneği yalnızca Klasik Modda geçerlidir.')
  }
}

async function handleClassicModeGiveUp(
  room: RoomRow,
  players: PlayerRow[],
  names: NameRow[],
  playerId: string,
) {
  const player = players.find((p) => p.id === playerId)!
  const passRights = getPlayerPassRights(room.id, playerId)

  if (passRights <= 0) {
    throw badRequest('no_pass_rights', 'İsmi pas geçme hakkınız (toplam 3) tükenmiştir.')
  }

  const newPassRights = passRights - 1
  setPlayerPassRights(room.id, playerId, newPassRights)

  let currentNameId = getPlayerRoundNameId(room.id, playerId)
  if (!currentNameId) {
    if (room.current_player_id === playerId && room.current_identity_id) {
      currentNameId = room.current_identity_id
    } else {
      const assigned = names.find((n) => n.assigned_to === playerId && n.used_in_round === null)
      if (assigned) currentNameId = assigned.id
    }
  }

  if (currentNameId) {
    retireClassicName(room.id, currentNameId)
    await supabaseAdmin().from('names').update({ used_in_round: 1, assigned_to: null }).eq('id', currentNameId)
    const foundName = names.find((n) => n.id === currentNameId)
    if (foundName) foundName.used_in_round = 1
  }

  // Not defterini / ipucu kartını temizle (yeni isme geçiliyor)
  await clearPlayerClueCard(room.id, playerId)

  // Taze isim listesi ile yeni isim ata (can kaybı yok, hak 3'e resetlenir)
  const freshNames = await loadNames(room.id)
  const nextNameId = await assignNewClassicName(room.id, player, freshNames)

  const outcome = await advanceTurn(room, players, freshNames)

  return {
    message: nextNameId
      ? `İsmi pas geçtiniz (Kalan Pas Hakkı: ${newPassRights}/3). Yeni bir gizli isim atandı (3 deneme hakkı). Sıra diğer oyuncuya geçti.`
      : `İsmi pas geçtiniz (Kalan Pas Hakkı: ${newPassRights}/3). Havuzda başka isim kalmadı. Sıra diğer oyuncuya geçti.`,
    livesLeft: TOTAL_LIVES_PER_GAME,
    passRightsLeft: newPassRights,
    turnPassed: true,
    finished: outcome.finished,
    phaseChanged: outcome.phaseChanged,
    newPhase: outcome.newPhase,
    newCategory: outcome.newCategory,
  }
}

async function handleClassicModeGuess(
  room: RoomRow,
  players: PlayerRow[],
  names: NameRow[],
  playerId: string,
  guess: string,
  targetNameText: string,
): Promise<GuessResult> {
  const player = players.find((p) => p.id === playerId)!
  const currentLives = getPlayerLives(room.id, playerId)
  let currentNameId = getPlayerRoundNameId(room.id, playerId)
  if (!currentNameId) {
    if (room.current_player_id === playerId && room.current_identity_id) {
      currentNameId = room.current_identity_id
    } else {
      const assigned = names.find((n) => n.assigned_to === playerId && n.used_in_round === null)
      if (assigned) currentNameId = assigned.id
    }
  }

  const isCorrect = fuzzyMatch(guess, targetNameText)

  if (isCorrect) {
    // Doğru tahmin! Bu isim başarıyla çözüldü, emekliye ayrılır (+10 puan)
    if (currentNameId) {
      retireClassicName(room.id, currentNameId)
      await supabaseAdmin().from('names').update({ used_in_round: 1, assigned_to: null }).eq('id', currentNameId)
      const foundName = names.find((n) => n.id === currentNameId)
      if (foundName) foundName.used_in_round = 1
    }

    // Not defterini / ipucu kartını temizle (yeni isme geçiliyor)
    await clearPlayerClueCard(room.id, playerId)

    const { error } = await supabaseAdmin().rpc('increment_player_score', {
      p_player_id: playerId,
      p_delta: POINTS_PER_CORRECT_GUESS,
    })
    if (error) {
      try {
        await supabaseAdmin().from('players').update({
          score: (player.score ?? 0) + POINTS_PER_CORRECT_GUESS,
        }).eq('id', playerId)
      } catch {
        // ignore
      }
    }

    // Taze isim listesi ile yeni isim ata
    const freshNames = await loadNames(room.id)
    const nextNameId = await assignNewClassicName(room.id, player, freshNames)

    const outcome = await advanceTurn(room, players, freshNames)

    return {
      correct: true,
      message: nextNameId
        ? `Doğru tahmin! +${POINTS_PER_CORRECT_GUESS} puan! Size yeni bir gizli isim atandı.`
        : `Doğru tahmin! +${POINTS_PER_CORRECT_GUESS} puan! Tüm isimlerinizi tamamladınız!`,
      pointsEarned: POINTS_PER_CORRECT_GUESS,
      finished: outcome.finished,
      livesLeft: TOTAL_LIVES_PER_GAME,
      turnPassed: true,
      phaseChanged: outcome.phaseChanged,
      newPhase: outcome.newPhase,
      newCategory: outcome.newCategory,
    }
  }

  // Yanlış tahmin: Deneme hakkı 1 azalır (3 -> 2 -> 1 -> 0)
  const newLives = currentLives - 1
  setPlayerLives(room.id, playerId, newLives)

  if (newLives <= 0) {
    // Deneme hakkı tükendi -> Bu isim elendi, yeni isim atanır (deneme hakkı 3'e resetlenir)
    if (currentNameId) {
      retireClassicName(room.id, currentNameId)
      await supabaseAdmin().from('names').update({ used_in_round: 1, assigned_to: null }).eq('id', currentNameId)
      const foundName = names.find((n) => n.id === currentNameId)
      if (foundName) foundName.used_in_round = 1
    }

    // Not defterini / ipucu kartını temizle (yeni isme geçiliyor)
    await clearPlayerClueCard(room.id, playerId)

    const freshNames = await loadNames(room.id)
    const nextNameId = await assignNewClassicName(room.id, player, freshNames)

    const outcome = await advanceTurn(room, players, freshNames)

    return {
      correct: false,
      message: nextNameId
        ? '3 deneme hakkınız bitti, bu isim elendi. Size yeni bir gizli isim atandı (3 hak). Sıra diğer oyuncuya geçti.'
        : '3 deneme hakkınız bitti, bu isim elendi ve havuzda başka isim kalmadı. Sıra diğer oyuncuya geçti.',
      livesLeft: TOTAL_LIVES_PER_GAME,
      turnPassed: true,
      finished: outcome.finished,
      phaseChanged: outcome.phaseChanged,
      newPhase: outcome.newPhase,
      newCategory: outcome.newCategory,
    }
  }

  // Hak tükenmediyse (> 0): İsim DEĞİŞMEZ, aynı isimle devam eder, sıra sonrakine geçer
  const outcome = await advanceTurn(room, players, names)

  return {
    correct: false,
    message: `Yanlış tahmin! 1 deneme hakkınız azaldı (Kalan Hak: ${newLives}). Sıra diğer oyuncuya geçti.`,
    livesLeft: newLives,
    turnPassed: true,
    finished: outcome.finished,
    phaseChanged: outcome.phaseChanged,
    newPhase: outcome.newPhase,
    newCategory: outcome.newCategory,
  }
}

async function handleClassicModePassTurn(
  room: RoomRow,
  players: PlayerRow[],
  names: NameRow[],
) {
  // Sadece soru sorulur, başka hiçbir şey değişmez (isim ve deneme hakkı korunur)
  const outcome = await advanceTurn(room, players, names)
  if (!outcome.claimed) {
    throw conflict('turn_already_advanced', 'Bu tur çoktan tamamlandı.')
  }

  return {
    message: 'Sorunuz iletildi. Sıra bir sonraki oyuncuya geçti.',
    finished: outcome.finished,
    phaseChanged: outcome.phaseChanged,
    newPhase: outcome.newPhase,
    newCategory: outcome.newCategory,
  }
}

// -------------------------------------------------------------
// TAM METİN MODU AKSİYON İŞLEYİCİLERİ
// -------------------------------------------------------------

export async function setCommunicationMode(
  roomId: string,
  playerId: string,
  mode: CommunicationMode,
) {
  const players = await loadPlayers(roomId)
  const player = requireMembership(players, playerId)
  if (!player.is_host) {
    throw forbidden('not_host', 'İletişim modunu yalnızca oda sahibi değiştirebilir.')
  }
  const room = await loadRoom(roomId)
  if (room.status !== 'waiting') {
    throw conflict('game_already_started', 'Oyun başladıktan sonra iletişim modu değiştirilemez.')
  }

  setRoomCommunicationModeData(roomId, mode)
  try {
    await supabaseAdmin().from('rooms').update({ communication_mode: mode }).eq('id', roomId)
  } catch {
    // Sütun yoksa yut
  }
  return { communicationMode: mode }
}

export async function askTextQuestion(
  roomId: string,
  playerId: string,
  params: { questionId?: string; questionText?: string },
) {
  const [room, players] = await Promise.all([loadRoom(roomId), loadPlayers(roomId)])
  const player = requireMembership(players, playerId)

  if (room.status !== 'playing' || !room.is_game_active) {
    throw conflict('game_not_active', 'Oyun şu anda aktif değil.')
  }

  const commMode = getRoomCommunicationMode(roomId, room.communication_mode)
  if (commMode !== 'text') {
    throw badRequest('invalid_communication_mode', 'Bu işlem yalnızca Tam Metin modunda geçerlidir.')
  }

  if (room.current_player_id !== playerId) {
    throw forbidden('not_your_turn', 'Soru sorma sırası sizde değil.')
  }

  const gameMode = getRoomMode(roomId, room.game_mode)
  if (gameMode === 'classic' && hasPlayerAskedQuestionInTurn(roomId, playerId)) {
    throw conflict('question_already_asked', 'Bu turdaki 1 soru hakkınızı zaten kullandınız. Lütfen tahmin yapın veya sırayı devredin.')
  }
  if (gameMode === 'persistent') {
    const pData = getPlayerPersistentData(roomId, playerId)
    if (pData.questionBudgetRemaining <= 0) {
      throw badRequest('budget_exhausted', 'Soru bütçeniz bitti, sadece tahmin edebilirsiniz.')
    }
  }

  // Soru metnini belirle
  let qText = params.questionText?.trim()
  if (!qText && params.questionId) {
    const found = QUESTION_BANK_SEED.find((q) => q.id === params.questionId)
    if (found) {
      qText = found.textTr
    }
  }

  if (!qText) {
    throw badRequest('missing_question', 'Lütfen listeden geçerli bir soru seçin veya soru metni girin.')
  }

  // Önceki açık oylama var mı kontrol et
  const existingVote = await getActiveTextVote(roomId, players)
  if (existingVote && existingVote.status === 'open') {
    if (Date.now() >= existingVote.closesAt) {
      await resolveTextVoteInternal(roomId, existingVote.id)
    } else {
      throw conflict('vote_already_active', 'Şu anda devam eden bir oylama var.')
    }
  }

  // Oy kullanabilecek oyuncular: Hedef sahibi (Asker) hariç tüm oyuncular
  const eligibleVoterIds = new Set(players.filter((p) => p.id !== playerId).map((p) => p.id))
  if (eligibleVoterIds.size === 0) {
    throw badRequest('not_enough_voters', 'Oylama için odada başka oyuncu bulunmuyor.')
  }

  const now = Date.now()
  const closesAt = now + TEXT_VOTE_DURATION_MS // 30 saniye
  const voteId = randomUUID()

  const voteInternal: TextQuestionVoteInternal = {
    id: voteId,
    roomId,
    askerId: playerId,
    askerNickname: player.nickname,
    questionText: qText,
    status: 'open',
    openedAt: now,
    closesAt,
    responses: new Map(),
    eligibleVoterIds,
  }

  roomActiveVoteStore.set(roomId, voteInternal)
  setPlayerAskedQuestionInTurn(roomId, playerId, true)

  // DB'ye oylama kaydı ekle
  try {
    const admin = supabaseAdmin()
    await admin.from('question_votes').insert({
      id: voteId,
      room_id: roomId,
      asker_player_id: playerId,
      question_text: qText,
      status: 'open',
      opened_at: new Date(now).toISOString(),
      closes_at: new Date(closesAt).toISOString(),
    })
  } catch {
    // DB tablosu yoksa memory store ile devam
  }

  // Soru sayısını veya bütçesini güncelle
  if (gameMode === 'speed') {
    const speed = getPlayerSpeedData(roomId, playerId)
    setPlayerSpeedData(roomId, playerId, {
      ...speed,
      questionsThisRound: speed.questionsThisRound + 1,
    })
  } else if (gameMode === 'persistent') {
    const pData = getPlayerPersistentData(roomId, playerId)
    pData.questionBudgetRemaining = Math.max(0, pData.questionBudgetRemaining - 1)
    pData.totalQuestionsUsed += 1
  } else {
    // Klasik mod: questions_this_round 1 artar
    try {
      await supabaseAdmin()
        .from('players')
        .update({ questions_this_round: (player.questions_this_round ?? 0) + 1 })
        .eq('id', playerId)
    } catch {
      //
    }
  }

  // Realtime tetikle
  try {
    await supabaseAdmin().from('rooms').update({ updated_at: new Date().toISOString() }).eq('id', roomId)
  } catch {
    //
  }

  return {
    message: 'Sorunuz diğer oyunculara iletildi, oylar bekleniyor (30 saniye)...',
    voteId: voteInternal.id,
    questionText: qText,
    closesAt: new Date(closesAt).toISOString(),
  }
}

export async function submitTextVote(
  roomId: string,
  voterPlayerId: string,
  voteId: string,
  answer: boolean,
) {
  const players = await loadPlayers(roomId)
  requireMembership(players, voterPlayerId)

  let vote = await getActiveTextVote(roomId, players)
  if (!vote || vote.id !== voteId) {
    // DB'den doğrudan kontrol et
    const { data: dbVote } = await supabaseAdmin()
      .from('question_votes')
      .select()
      .eq('id', voteId)
      .maybeSingle()

    if (!dbVote) {
      throw notFound('vote_not_found', 'Aktif oylama oturumu bulunamadı.')
    }
    if (dbVote.status !== 'open') {
      throw conflict('vote_closed', 'Bu oylama oturumu sona ermiştir.')
    }
    vote = await getActiveTextVote(roomId, players)
  }

  if (!vote) {
    throw notFound('vote_not_found', 'Aktif oylama oturumu bulunamadı.')
  }

  if (vote.status !== 'open') {
    throw conflict('vote_closed', 'Bu oylama oturumu sona ermiştir.')
  }

  if (Date.now() >= vote.closesAt) {
    const [room, names] = await Promise.all([loadRoom(roomId), loadNames(roomId)])
    const resolvedClue = await resolveTextVoteInternal(roomId, voteId)
    if (resolvedClue && resolvedClue.majority !== 'yes' && room.status === 'playing') {
      await advanceTurn(room, players, names)
    }
    throw conflict('vote_expired', 'Oylama süresi (30 saniye) doldu.')
  }

  if (vote.askerId === voterPlayerId) {
    throw forbidden('asker_cannot_vote', 'Kendi sorduğunuz soruya oy kullanamazsınız.')
  }

  if (!vote.eligibleVoterIds.has(voterPlayerId)) {
    throw forbidden('not_eligible_voter', 'Bu soru için oy kullanma yetkiniz bulunmamaktadır.')
  }

  vote.responses.set(voterPlayerId, answer)

  // DB'ye oyu kaydet
  try {
    await supabaseAdmin().from('question_vote_responses').upsert(
      {
        vote_id: voteId,
        responder_player_id: voterPlayerId,
        answer,
        responded_at: new Date().toISOString(),
      },
      { onConflict: 'vote_id,responder_player_id' },
    )
  } catch {
    // DB hatasında memory store üzerinden devam
  }

  // Eğer tüm uygun oyuncular oy kullandıysa hemen sonuçlandır
  let isResolved = false
  let clueCardItem: ClueCardItem | null = null
  let turnPassed = false

  if (vote.responses.size >= vote.eligibleVoterIds.size) {
    const [room, names] = await Promise.all([loadRoom(roomId), loadNames(roomId)])
    clueCardItem = await resolveTextVoteInternal(roomId, voteId)
    isResolved = true

    if (room.status === 'playing') {
      await advanceTurn(room, players, names)
      turnPassed = true
    }
  } else {
    // Soru AÇIK KALMAYA DEVAM EDİYOR! Realtime tetikle
    try {
      await supabaseAdmin().from('rooms').update({ updated_at: new Date().toISOString() }).eq('id', roomId)
    } catch {
      //
    }
  }

  const message = clueCardItem
    ? `Cevap: ${clueCardItem.yesCount} Evet, ${clueCardItem.noCount} Hayır (${clueCardItem.majority === 'yes' ? 'EVET' : clueCardItem.majority === 'no' ? 'HAYIR' : 'EŞİTLİK'}). Sıra bir sonraki oyuncuya geçti.`
    : 'Oyunuz kaydedildi. Diğer oyuncuların oyları bekleniyor...'

  return {
    message,
    hasVoted: true,
    isResolved,
    clueCardItem,
    turnPassed,
  }
}

export async function resetGame(roomId: string, playerId: string) {
  const admin = supabaseAdmin()
  const players = await loadPlayers(roomId)
  const player = requireMembership(players, playerId)

  if (!player.is_host) {
    throw forbidden('not_host', 'Yeni oyunu yalnızca oda sahibi başlatabilir.')
  }

  for (const p of players) {
    setPlayerLives(roomId, p.id, TOTAL_LIVES_PER_GAME)
  }
  clearRoomSpeedData(roomId)
  clearRoomPersistentData(roomId)
  clearRoomSharedTargetData(roomId)
  clearRoomTextVoteData(roomId)
  playerClassicSolvedStore.delete(roomId)
  playerPassRightsStore.delete(roomId)
  classicRetiredNamesStore.delete(roomId)

  const categoryData = getRoomCategoryData(roomId)
  categoryData.currentPhase = 1
  setRoomCategoryData(roomId, categoryData)

  const { error: roomError } = await admin
    .from('rooms')
    .update({
      status: 'waiting',
      current_player_id: null,
      current_identity_id: null,
      game_round: 1,
      is_game_active: false,
    })
    .eq('id', roomId)
  if (roomError) throw roomError

  const { error: namesError } = await admin.from('names').delete().eq('room_id', roomId)
  if (namesError) throw namesError

  const { error: scoresError } = await admin
    .from('players')
    .update({ score: 0 })
    .eq('room_id', roomId)
  if (scoresError) throw scoresError
}

export async function leaveRoom(roomId: string, playerId: string) {
  const admin = supabaseAdmin()
  const players = await loadPlayers(roomId)

  if (!players.some((player) => player.id === playerId)) {
    return { roomClosed: false }
  }

  const room = await loadRoom(roomId)
  const wasCurrentPlayer = room.current_player_id === playerId
  const remaining = players.filter((player) => player.id !== playerId)
  const leavingPlayer = players.find((player) => player.id === playerId)!
  const gameMode = getRoomMode(roomId, room.game_mode)

  if (room.status === 'playing') {
    if (remaining.length < 2) {
      // 2 kişilik veya tek kalan maçta biri çıktığında maç hükmen biter:
      // Terk eden mağlup (sonuncu), kalan oyuncu(lar) galip (1.lik)
      await savePlayerGameResult(roomId, gameMode, leavingPlayer, players.length, false)
      for (const remPlayer of remaining) {
        await savePlayerGameResult(roomId, gameMode, remPlayer, 1, true)
      }

      // Odayı sonlandır (Kalan oyuncu otomatik olarak skor ekranına yönlendirilir)
      await admin
        .from('rooms')
        .update({ status: 'finished', is_game_active: false, current_identity_id: null })
        .eq('id', roomId)
    } else {
      // 3 veya daha fazla oyuncu varsa terk eden sonuncu olarak kaydedilir, oyun devam eder
      await savePlayerGameResult(roomId, gameMode, leavingPlayer, players.length, false)

      if (wasCurrentPlayer) {
        const names = await loadNames(roomId)
        await advanceTurn(room, remaining, names)
      }
    }
  }

  const { error } = await admin.from('players').delete().eq('id', playerId)
  if (error) throw error

  if (remaining.length === 0) {
    clearRoomMemoryState(roomId)
    await admin.from('rooms').update({ status: 'closed', is_game_active: false }).eq('id', roomId)
    return { roomClosed: true }
  }

  if (leavingPlayer?.is_host && remaining.length > 0) {
    await admin.from('players').update({ is_host: true }).eq('id', remaining[0]!.id)
  }

  return { roomClosed: false }
}

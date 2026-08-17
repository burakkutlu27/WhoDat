import type { RoomStatus } from '../database.types'

/**
import type { RoomStatus } from '../database.types'

/**
 * Sunucu ile istemci arasındaki sözleşme.
 *
 * Ayrı bir dosyada duruyor çünkü engine.ts `server-only` işaretli; istemci bileşenleri
 * bu tipleri motoru bundle'a çekmeden kullanabilmeli.
 */

export type GameMode = 'classic' | 'speed' | 'persistent' | 'shared_target'

export type LobbyCategoryMode = 'single' | 'multi_phase'

export type FamousPersonCategory =
  | 'all'
  | 'unluler'
  | 'tarihi_kisiler'
  | 'cizgi_karakterler'
  | 'sporcular'
  | 'dizi_film_karakterleri'

export interface RoomCategorySettings {
  categoryMode: LobbyCategoryMode
  category: FamousPersonCategory
  phaseCategories: FamousPersonCategory[]
  currentPhase: number
  totalPhases: number
}

export interface SharedQuestionItem {
  id: string
  askerId: string
  askerNickname: string
  questionText: string
  answer: 'yes' | 'no' | 'uncertain' | null
  createdAt: string
}

export interface PublicPlayer {
  id: string
  nickname: string
  isHost: boolean
  score: number
  hasSubmittedNames: boolean
  livesLeft: number
  questionsThisRound: number
  roundScores: number[]
  hasFinishedRound: boolean
  estimatedPoints?: number
  /** Israrcı Mod: kalan soru bütçesi (10'dan geri sayım) */
  questionBudgetRemaining?: number
  /** Israrcı Mod: oyuncu bu ismi çözdü mü */
  nameSolved?: boolean
  /** Israrcı Mod: bu moddaki kazanılan puan */
  persistentScore?: number
  /** Ortak Hedef Modu: Hakem mi (Host hakemdir, tahmin edemez) */
  isReferee?: boolean
  /** Ortak Hedef Modu: Yanlış tahmin sonrası sıra atlama cezası */
  skippedQuestionTurn?: boolean
  /** Ortak Hedef Modu: Buzzer tahmin cooldown'ı */
  hasGuessCooldown?: boolean
}

export interface GameState {
  room: {
    id: string
    roomCode: string
    status: RoomStatus
    gameRound: number
    totalRounds: number
    gameMode: GameMode
    isGameActive: boolean
    currentPlayerId: string | null
    /** Kategori Lobisi Alanları */
    categoryMode?: LobbyCategoryMode
    selectedCategory?: FamousPersonCategory
    phaseCategories?: FamousPersonCategory[]
    currentPhase?: number
    totalPhases?: number
    activeCategory?: FamousPersonCategory
    /** Israrcı Mod: oyuncu başına toplam soru bütçesi */
    questionBudgetPerPlayer?: number
    /** Ortak Hedef Modu: Hedef isim (SADECE host'a veya hedef açıklandığında gönderilir) */
    sharedTargetName?: string | null
    /** Ortak Hedef Modu: Hedef isim herkese açıklandı mı */
    targetRevealed?: boolean
    /** Ortak Hedef Modu: Hakemin yanıtlamasını bekleyen soru */
    pendingQuestion?: SharedQuestionItem | null
    /** Ortak Hedef Modu: Soru-cevap geçmişi not defteri */
    questionLog?: SharedQuestionItem[]
    /** Ortak Hedef Modu: Turu kazanan oyuncu */
    roundWinnerNickname?: string | null
  }
  players: PublicPlayer[]
  you: {
    playerId: string
    isHost: boolean
    isYourTurn: boolean
    submittedNames: string[]
    livesLeft: number
    questionsThisRound: number
    roundScores: number[]
    hasFinishedRound: boolean
    estimatedPoints?: number
    /** Israrcı Mod: kalan soru bütçesi */
    questionBudgetRemaining?: number
    /** Israrcı Mod: isim çözüldü mü */
    nameSolved?: boolean
    /** Israrcı Mod: bu moddaki kazanılan puan */
    persistentScore?: number
    /** Ortak Hedef Modu: Hakem mi */
    isReferee?: boolean
    /** Ortak Hedef Modu: Buzzer tahmin yapabilir mi */
    canBuzz?: boolean
    /** Ortak Hedef Modu: Sıra atlama cezası var mı */
    skippedQuestionTurn?: boolean
  }
  /** Tahmin sırası sizdeyse null: doğru cevap tahmin edene gönderilmez. */
  currentName: string | null
  namesTotal: number
  namesRemaining: number
  allPlayersSubmittedNames: boolean
  canStart: boolean
  maxLives: number
}

export interface SubmitNamesResult {
  accepted: string[]
  duplicates: string[]
}

export interface GuessResult {
  correct: boolean
  message: string
  finished?: boolean
  livesLeft?: number
  turnPassed?: boolean
  pointsEarned?: number
  nextRoundStarted?: boolean
  targetRevealed?: boolean
  revealedTargetName?: string
  phaseChanged?: boolean
  newPhase?: number
  newCategory?: FamousPersonCategory
}

export interface FamousPerson {
  id: string
  name: string
  category: string
}

export interface AutoAssignResult {
  assignedCount: number
  names: string[]
  isSharedTarget?: boolean
  sharedTargetName?: string
}

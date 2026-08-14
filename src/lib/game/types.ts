import type { RoomStatus } from '../database.types'

/**
 * Sunucu ile istemci arasındaki sözleşme.
 *
 * Ayrı bir dosyada duruyor çünkü engine.ts `server-only` işaretli; istemci bileşenleri
 * bu tipleri motoru bundle'a çekmeden kullanabilmeli.
 */

export type GameMode = 'classic' | 'speed'

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
}



import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL')
}

if (!supabaseAnonKey) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_ANON_KEY')
}

// Database types for WhoDat application
export type Database = {
  public: {
    Tables: {
      rooms: {
        Row: {
          id: string
          room_code: string
          created_at: string
          status: 'waiting' | 'playing' | 'finished' | 'closed'
          current_player_id: string | null
          current_identity_id: string | null
          game_round: number
          is_game_active: boolean
          used_names: string[]
        }
        Insert: {
          id?: string
          room_code: string
          created_at?: string
          status?: 'waiting' | 'playing' | 'finished' | 'closed'
          current_player_id?: string | null
          current_identity_id?: string | null
          game_round?: number
          is_game_active?: boolean
          used_names?: string[]
        }
        Update: {
          id?: string
          room_code?: string
          created_at?: string
          status?: 'waiting' | 'playing' | 'finished' | 'closed'
          current_player_id?: string | null
          current_identity_id?: string | null
          game_round?: number
          is_game_active?: boolean
          used_names?: string[]
        }
      }
      players: {
        Row: {
          id: string
          room_id: string
          nickname: string
          is_host: boolean
          score: number
        }
        Insert: {
          id?: string
          room_id: string
          nickname: string
          is_host?: boolean
          score?: number
        }
        Update: {
          id?: string
          room_id?: string
          nickname?: string
          is_host?: boolean
          score?: number
        }
      }
      names: {
        Row: {
          id: string
          room_id: string
          submitted_by: string
          name_text: string
          assigned_to: string | null
          created_at: string
          used_in_round: number | null
        }
        Insert: {
          id?: string
          room_id: string
          submitted_by: string
          name_text: string
          assigned_to?: string | null
          created_at?: string
          used_in_round?: number | null
        }
        Update: {
          id?: string
          room_id?: string
          submitted_by?: string
          name_text?: string
          assigned_to?: string | null
          created_at?: string
          used_in_round?: number | null
        }
      }
      identities: {
        Row: {
          id: string
          room_id: string
          submitted_by: string
          name: string
        }
        Insert: {
          id?: string
          room_id: string
          submitted_by: string
          name: string
        }
        Update: {
          id?: string
          room_id?: string
          submitted_by?: string
          name?: string
        }
      }
      game_questions: {
        Row: {
          id: string
          room_id: string
          asked_by: string
          question: string
          created_at: string
        }
        Insert: {
          id?: string
          room_id: string
          asked_by: string
          question: string
          created_at?: string
        }
        Update: {
          id?: string
          room_id?: string
          asked_by?: string
          question?: string
          created_at?: string
        }
      }
      game_guesses: {
        Row: {
          id: string
          room_id: string
          guessed_by: string
          guessed_identity: string
          is_correct: boolean
          created_at: string
        }
        Insert: {
          id?: string
          room_id: string
          guessed_by: string
          guessed_identity: string
          is_correct: boolean
          created_at?: string
        }
        Update: {
          id?: string
          room_id?: string
          guessed_by?: string
          guessed_identity?: string
          is_correct?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions for common CRUD operations
export const supabaseHelpers = {
  // Create a new record
  async create(table: string, data: any) {
    const { data: result, error } = await supabase
      .from(table)
      .insert(data)
      .select()
      .single()

    if (error) throw error
    return result
  },

  // Read records
  async read(
    table: string,
    options?: {
      select?: string
      filter?: Record<string, any>
      orderBy?: { column: string; ascending?: boolean }
      limit?: number
    }
  ) {
    let query = supabase.from(table).select(options?.select || '*')

    if (options?.filter) {
      Object.entries(options.filter).forEach(([key, value]) => {
        query = query.eq(key, value)
      })
    }

    if (options?.orderBy) {
      query = query.order(options.orderBy.column, {
        ascending: options.orderBy.ascending ?? true,
      })
    }

    if (options?.limit) {
      query = query.limit(options.limit)
    }

    const { data, error } = await query

    if (error) throw error
    return data
  },

  // Update a record
  async update(table: string, id: string, data: any) {
    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return result
  },

  // Delete a record
  async delete(table: string, id: string) {
    const { error } = await supabase.from(table).delete().eq('id', id)

    if (error) throw error
    return true
  },

  // Get a single record by ID
  async getById(table: string, id: string) {
    const { data, error } = await supabase
      .from(table)
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw error
    return data
  },
}

// WhoDat specific helper functions
export const whoDatHelpers = {
  // Room operations
  async createRoom(roomCode: string, status: 'waiting' | 'playing' | 'finished' | 'closed' = 'waiting') {
    return await supabaseHelpers.create('rooms', { 
      room_code: roomCode,
      status
    })
  },

  async getRoom(roomId: string) {
    const result = await supabaseHelpers.getById('rooms', roomId)
    return result as any
  },

  async getRoomByCode(roomCode: string) {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .eq('room_code', roomCode)
      .single()

    if (error) throw error
    return data
  },

  async updateRoomStatus(roomId: string, status: 'waiting' | 'playing' | 'finished' | 'closed') {
    return await supabaseHelpers.update('rooms', roomId, { status })
  },

  // Player operations
  async addPlayerToRoom(roomId: string, nickname: string, isHost: boolean = false) {
    return await supabaseHelpers.create('players', { 
      room_id: roomId, 
      nickname,
      is_host: isHost,
      score: 0
    })
  },

  async getPlayersInRoom(roomId: string) {
    const result = await supabaseHelpers.read('players', {
      filter: { room_id: roomId }
    })
    return result as any[]
  },

  async updatePlayerScore(playerId: string, score: number) {
    return await supabaseHelpers.update('players', playerId, { score })
  },

  async removePlayerFromRoom(playerId: string) {
    return await supabaseHelpers.delete('players', playerId)
  },

  // Check if room is empty and close it
  async checkAndCloseEmptyRoom(roomId: string): Promise<boolean> {
    const players = await whoDatHelpers.getPlayersInRoom(roomId)
    if (players.length === 0) {
      await whoDatHelpers.updateRoomStatus(roomId, 'closed')
      return true
    }
    return false
  },

  // Get room status with player count
  async getRoomStatus(roomId: string) {
    const room = await whoDatHelpers.getRoom(roomId)
    const players = await whoDatHelpers.getPlayersInRoom(roomId)
    return {
      ...room,
      playerCount: players.length,
      isEmpty: players.length === 0
    }
  },

  // Names operations
  async submitName(roomId: string, submittedBy: string, nameText: string) {
    return await supabaseHelpers.create('names', {
      room_id: roomId,
      submitted_by: submittedBy,
      name_text: nameText
    })
  },

  async getNamesInRoom(roomId: string) {
    const result = await supabaseHelpers.read('names', {
      filter: { room_id: roomId }
    })
    return result as any[]
  },

  async getNamesByPlayer(playerId: string) {
    return await supabaseHelpers.read('names', {
      filter: { submitted_by: playerId }
    })
  },

  async assignName(nameId: string, assignedTo: string | null) {
    return await supabaseHelpers.update('names', nameId, { assigned_to: assignedTo })
  },

  async getAssignedNames(roomId: string) {
    const { data, error } = await supabase
      .from('names')
      .select('*')
      .eq('room_id', roomId)
      .not('assigned_to', 'is', null)

    if (error) throw error
    return data
  },

  // Assign names to players - distribute names evenly among all players
  // Each name is assigned to ONE player only, but players can guess any name during the game
  async assignNamesToPlayers(roomId: string): Promise<void> {
    // Get all players in room
    const players = await whoDatHelpers.getPlayersInRoom(roomId)
    if (!players || players.length === 0) {
      throw new Error('No players found in room')
    }

    // Get all names in room
    const names = await whoDatHelpers.getNamesInRoom(roomId)
    if (!names || names.length === 0) {
      throw new Error('No names found in room')
    }

    // Reset all assignments first
    for (const name of names) {
      await whoDatHelpers.assignName((name as any).id, null)
    }

    // Shuffle all names for random distribution
    const shuffledNames = [...names].sort(() => Math.random() - 0.5)
    
    // Distribute names evenly among players using round-robin
    // Each name gets assigned to exactly ONE player
    for (let i = 0; i < shuffledNames.length; i++) {
      const name = shuffledNames[i]
      const playerIndex = i % players.length
      const assignedPlayer = players[playerIndex]
      
      // Assign this name to the current player in rotation
      await whoDatHelpers.assignName((name as any).id, (assignedPlayer as any).id)
    }
  },

  // Generate random 6-character room code
  generateRoomCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let result = ''
    for (let i = 0; i < 6; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  },

  // Get room with players
  async getRoomWithPlayers(roomId: string) {
    // First get the room
    const room = await whoDatHelpers.getRoom(roomId)
    
    // Then get players separately
    const players = await whoDatHelpers.getPlayersInRoom(roomId)
    
    return {
      ...room,
      players
    }
  }
}

// Simple room flow functions for WhoDat
export const roomFlowHelpers = {
  // Create a new room with host
  async createRoom(hostNickname: string): Promise<{ roomId: string; roomCode: string; playerId: string }> {
    // Generate unique room code
    let roomCode: string = ''
    let isUnique = false
    
    while (!isUnique) {
      roomCode = whoDatHelpers.generateRoomCode()
      try {
        await whoDatHelpers.getRoomByCode(roomCode)
        // If we get here, room code already exists, try again
      } catch {
        // Room code doesn't exist, we can use it
        isUnique = true
      }
    }
    
    // Create room
    const room = await whoDatHelpers.createRoom(roomCode, 'waiting')
    
    // Create host player
    const hostPlayer = await whoDatHelpers.addPlayerToRoom(room.id, hostNickname, true)
    
    return { roomId: room.id, roomCode, playerId: hostPlayer.id }
  },

  // Join a room by room code
  async joinRoom(roomCode: string, playerNickname: string): Promise<{ roomId: string; playerId: string }> {
    // Find room by code
    const room = await whoDatHelpers.getRoomByCode(roomCode)
    
    if (!room) {
      throw new Error('Room not found')
    }
    
    // Allow joining only if room is waiting or playing (not finished or closed)
    if (room.status === 'finished' || room.status === 'closed') {
      throw new Error('Room is not accepting new players')
    }
    
    // Check current player count
    const players = await whoDatHelpers.getPlayersInRoom(room.id)
    if (players.length >= 6) {
      throw new Error('Room is full (maximum 6 players allowed)')
    }
    
    // Add player to room
    const player = await whoDatHelpers.addPlayerToRoom(room.id, playerNickname, false)
    
    return { roomId: room.id, playerId: player.id }
  },

  // Start game (host only)
  async startGame(roomId: string): Promise<void> {
    await whoDatHelpers.updateRoomStatus(roomId, 'playing')
  },

  // Assign names to players (host only)
  async assignNames(roomId: string): Promise<void> {
    await whoDatHelpers.assignNamesToPlayers(roomId)
  },

  // Start active game
  async startActiveGame(roomId: string): Promise<void> {
    // Get all players in room
    const players = await whoDatHelpers.getPlayersInRoom(roomId)
    if (players.length === 0) {
      throw new Error('No players in room')
    }

    console.log(`Starting game for room ${roomId} with ${players.length} players`)

    // Set first player as current player
    const firstPlayer = players[0]
    console.log(`First player: ${firstPlayer.nickname} (${firstPlayer.id})`)
    
    // Get all names in the room
    const allNames = await whoDatHelpers.getNamesInRoom(roomId)
    console.log(`Total names in room: ${allNames.length}`)
    
    if (allNames.length === 0) {
      throw new Error('No names found in room')
    }

    // Get names from OTHER players only (not the current player)
    const otherPlayersNames = allNames.filter((name: any) => name.submitted_by !== firstPlayer.id)
    console.log(`Names from other players: ${otherPlayersNames.length}`)
    
    if (otherPlayersNames.length === 0) {
      throw new Error('No names from other players available')
    }

    // Pick a random name from OTHER players' names only
    const randomName = otherPlayersNames[Math.floor(Math.random() * otherPlayersNames.length)]
    console.log(`Selected random name from other players: ${randomName.name_text}`)

    // Mark this name as used in round 1
    await roomFlowHelpers.markNameAsUsed(roomId, randomName.id, 1)

    // Update room with game state
    await supabaseHelpers.update('rooms', roomId, {
      current_player_id: firstPlayer.id,
      current_identity_id: randomName.id,
      game_round: 1,
      is_game_active: true
    })
    
    console.log(`Game started successfully for room ${roomId}`)
  },

  // Get current game state
  async getGameState(roomId: string) {
    const room = await whoDatHelpers.getRoom(roomId)
    const players = await whoDatHelpers.getPlayersInRoom(roomId)
    const currentIdentity = room.current_identity_id ? 
      await supabaseHelpers.getById('names', room.current_identity_id) : null

    return {
      room,
      players,
      currentIdentity,
      isActive: room.is_game_active,
      currentPlayerId: room.current_player_id,
      round: room.game_round
    }
  },

  // Make a guess
  async makeGuess(roomId: string, playerId: string, guess: string): Promise<{ isCorrect: boolean; message: string }> {
    const gameState = await roomFlowHelpers.getGameState(roomId)
    
    if (!gameState.isActive) {
      throw new Error('Game is not active')
    }

    if (gameState.currentPlayerId !== playerId) {
      throw new Error('Not your turn')
    }

    if (!gameState.currentIdentity) {
      throw new Error('No current identity')
    }

    const correctName = gameState.currentIdentity.name_text
    const isCorrect = roomFlowHelpers.fuzzyMatch(guess, correctName)

    if (isCorrect) {
      // Add score to player
      const currentPlayer = gameState.players.find((p: any) => p.id === playerId)
      if (currentPlayer) {
        await whoDatHelpers.updatePlayerScore(playerId, currentPlayer.score + 10)
      }

      // Move to next player and select new identity
      await roomFlowHelpers.nextTurn(roomId)
      
      return { isCorrect: true, message: 'Doğru tahmin! +10 puan' }
    } else {
      return { isCorrect: false, message: 'Yanlış tahmin, tekrar deneyin' }
    }
  },

  // Move to next turn
  async nextTurn(roomId: string): Promise<void> {
    const gameState = await roomFlowHelpers.getGameState(roomId)
    const players = gameState.players
    
    // Check if game should end
    const totalNames = await whoDatHelpers.getNamesInRoom(roomId)
    const totalRounds = totalNames.length
    
    if (gameState.round >= totalRounds) {
      // Game is over - set status to finished
      await whoDatHelpers.updateRoomStatus(roomId, 'finished')
      return
    }
    
    // Find current player index
    const currentIndex = players.findIndex((p: any) => p.id === gameState.currentPlayerId)
    const nextIndex = (currentIndex + 1) % players.length
    const nextPlayer = players[nextIndex]

    // Get names that have been used in previous rounds
    const usedNames = await roomFlowHelpers.getUsedNamesInGame(roomId)
    const availableNames = totalNames.filter((name: any) => !usedNames.includes(name.id))
    
    // If all names have been used, game is over
    if (availableNames.length === 0) {
      await whoDatHelpers.updateRoomStatus(roomId, 'finished')
      return
    }
    
    // Get names from OTHER players only (not the current player)
    const otherPlayersNames = availableNames.filter((name: any) => name.submitted_by !== nextPlayer.id)
    
    // If no names from other players available, use any available name
    const namesToChooseFrom = otherPlayersNames.length > 0 ? otherPlayersNames : availableNames
    
    // Pick a random name from the filtered list
    const randomName = namesToChooseFrom[Math.floor(Math.random() * namesToChooseFrom.length)]

    // Mark this name as used
    await roomFlowHelpers.markNameAsUsed(roomId, randomName.id, gameState.round + 1)

    // Update room with next player and identity
    await supabaseHelpers.update('rooms', roomId, {
      current_player_id: nextPlayer.id,
      current_identity_id: randomName.id,
      game_round: gameState.round + 1
    })
  },

  // Fuzzy string matching for guesses
  fuzzyMatch(guess: string, correct: string): boolean {
    // Normalize strings: lowercase, remove accents, remove punctuation
    const normalize = (str: string) => {
      return str
        .toLowerCase()
        .replace(/[çğıöşü]/g, (match) => {
          const map: { [key: string]: string } = {
            'ç': 'c', 'ğ': 'g', 'ı': 'i', 'ö': 'o', 'ş': 's', 'ü': 'u'
          }
          return map[match] || match
        })
        .replace(/[^a-z0-9]/g, '') // Remove all non-alphanumeric
    }

    const normalizedGuess = normalize(guess)
    const normalizedCorrect = normalize(correct)

    // Exact match
    if (normalizedGuess === normalizedCorrect) {
      return true
    }

    // Levenshtein distance check (allow 1-2 character differences)
    const distance = roomFlowHelpers.levenshteinDistance(normalizedGuess, normalizedCorrect)
    const maxLength = Math.max(normalizedGuess.length, normalizedCorrect.length)
    const similarity = 1 - (distance / maxLength)

    return similarity >= 0.8 // 80% similarity threshold
  },

  // Levenshtein distance calculation
  levenshteinDistance(str1: string, str2: string): number {
    const matrix = Array(str2.length + 1).fill(null).map(() => Array(str1.length + 1).fill(null))

    for (let i = 0; i <= str1.length; i++) matrix[0][i] = i
    for (let j = 0; j <= str2.length; j++) matrix[j][0] = j

    for (let j = 1; j <= str2.length; j++) {
      for (let i = 1; i <= str1.length; i++) {
        const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1
        matrix[j][i] = Math.min(
          matrix[j][i - 1] + 1,
          matrix[j - 1][i] + 1,
          matrix[j - 1][i - 1] + indicator
        )
      }
    }

    return matrix[str2.length][str1.length]
  },

  // Get used names in current game (all names that have been used)
  async getUsedNamesInGame(roomId: string): Promise<string[]> {
    // Get all names that have been used in current game
    const { data, error } = await supabase
      .from('names')
      .select('id, name_text, used_in_round')
      .eq('room_id', roomId)
      .not('used_in_round', 'is', null)

    if (error) throw error
    
    const usedNames = data?.map(name => name.id) || []
    console.log(`Used names in game: ${usedNames.length}`, data?.map(n => `${n.name_text} (round ${n.used_in_round})`))
    
    return usedNames
  },

  // Mark name as used in current game
  async markNameAsUsed(roomId: string, nameId: string, round: number): Promise<void> {
    console.log(`Marking name ${nameId} as used in round ${round}`)
    // Update the name record to mark it as used in this round
    await supabaseHelpers.update('names', nameId, {
      used_in_round: round
    })
    console.log(`Name ${nameId} marked as used in round ${round}`)
  },

  // Reset game for new round
  async resetGame(roomId: string): Promise<void> {
    // Reset game state
    await supabaseHelpers.update('rooms', roomId, {
      current_player_id: null,
      current_identity_id: null,
      game_round: 1,
      is_game_active: false,
      used_names: []
    })
    
    // Reset all names used_in_round to null
    await supabase
      .from('names')
      .update({ used_in_round: null })
      .eq('room_id', roomId)
  }
}

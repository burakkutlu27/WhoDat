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
          created_at: string
          status: 'waiting' | 'collecting_names' | 'assigned' | 'playing' | 'finished'
          host_id: string
          current_turn_player_id: string | null
          game_status: 'waiting' | 'collecting_names' | 'playing' | 'finished'
        }
        Insert: {
          id?: string
          created_at?: string
          status?: 'waiting' | 'collecting_names' | 'assigned' | 'playing' | 'finished'
          host_id: string
          current_turn_player_id?: string | null
          game_status?: 'waiting' | 'collecting_names' | 'playing' | 'finished'
        }
        Update: {
          id?: string
          created_at?: string
          status?: 'waiting' | 'collecting_names' | 'assigned' | 'playing' | 'finished'
          host_id?: string
          current_turn_player_id?: string | null
          game_status?: 'waiting' | 'collecting_names' | 'playing' | 'finished'
        }
      }
      players: {
        Row: {
          id: string
          room_id: string
          name: string
          assigned_identity: string | null
          is_ready: boolean
          has_submitted_names: boolean
          score: number
          is_host: boolean
        }
        Insert: {
          id?: string
          room_id: string
          name: string
          assigned_identity?: string | null
          is_ready?: boolean
          has_submitted_names?: boolean
          score?: number
          is_host?: boolean
        }
        Update: {
          id?: string
          room_id?: string
          name?: string
          assigned_identity?: string | null
          is_ready?: boolean
          has_submitted_names?: boolean
          score?: number
          is_host?: boolean
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
  async createRoom(hostId: string, status: 'waiting' | 'collecting_names' | 'assigned' | 'playing' | 'finished' = 'waiting') {
    return await supabaseHelpers.create('rooms', { 
      status, 
      host_id: hostId,
      game_status: 'waiting'
    })
  },

  async getRoom(roomId: string) {
    return await supabaseHelpers.getById('rooms', roomId)
  },

  async updateRoomStatus(roomId: string, status: 'waiting' | 'collecting_names' | 'assigned' | 'playing' | 'finished') {
    return await supabaseHelpers.update('rooms', roomId, { status })
  },

  async updateGameStatus(roomId: string, gameStatus: 'waiting' | 'collecting_names' | 'playing' | 'finished') {
    return await supabaseHelpers.update('rooms', roomId, { game_status: gameStatus })
  },

  async setCurrentTurnPlayer(roomId: string, playerId: string | null) {
    return await supabaseHelpers.update('rooms', roomId, { current_turn_player_id: playerId })
  },

  // Player operations
  async addPlayerToRoom(roomId: string, name: string, isHost: boolean = false) {
    return await supabaseHelpers.create('players', { 
      room_id: roomId, 
      name,
      is_ready: false,
      has_submitted_names: false,
      score: 0,
      is_host: isHost
    })
  },

  async getPlayersInRoom(roomId: string) {
    return await supabaseHelpers.read('players', {
      filter: { room_id: roomId }
    })
  },

  async updatePlayerReady(playerId: string, isReady: boolean) {
    return await supabaseHelpers.update('players', playerId, { is_ready: isReady })
  },

  async updatePlayerSubmittedNames(playerId: string, hasSubmitted: boolean) {
    return await supabaseHelpers.update('players', playerId, { has_submitted_names: hasSubmitted })
  },

  async updatePlayerScore(playerId: string, score: number) {
    return await supabaseHelpers.update('players', playerId, { score })
  },

  async assignIdentityToPlayer(playerId: string, identity: string) {
    return await supabaseHelpers.update('players', playerId, { 
      assigned_identity: identity 
    })
  },

  // Identity operations
  async submitIdentity(roomId: string, submittedBy: string, name: string) {
    return await supabaseHelpers.create('identities', {
      room_id: roomId,
      submitted_by: submittedBy,
      name
    })
  },

  async submitMultipleIdentities(roomId: string, submittedBy: string, names: string[]) {
    // First, delete any existing identities for this player in this room
    await supabase
      .from('identities')
      .delete()
      .eq('room_id', roomId)
      .eq('submitted_by', submittedBy)

    // Insert new identities
    const identitiesToInsert = names.map(name => ({
      room_id: roomId,
      submitted_by: submittedBy,
      name
    }))

    const { error } = await supabase
      .from('identities')
      .insert(identitiesToInsert)

    if (error) throw error
    return true
  },

  async getIdentitiesInRoom(roomId: string) {
    return await supabaseHelpers.read('identities', {
      filter: { room_id: roomId }
    })
  },

  async getIdentitiesByPlayer(playerId: string) {
    return await supabaseHelpers.read('identities', {
      filter: { submitted_by: playerId }
    })
  },

  // Game operations
  async addQuestion(roomId: string, askedBy: string, question: string) {
    return await supabaseHelpers.create('game_questions', {
      room_id: roomId,
      asked_by: askedBy,
      question
    })
  },

  async addGuess(roomId: string, guessedBy: string, guessedIdentity: string, isCorrect: boolean) {
    return await supabaseHelpers.create('game_guesses', {
      room_id: roomId,
      guessed_by: guessedBy,
      guessed_identity: guessedIdentity,
      is_correct: isCorrect
    })
  },

  async getGameQuestions(roomId: string) {
    return await supabaseHelpers.read('game_questions', {
      filter: { room_id: roomId },
      orderBy: { column: 'created_at', ascending: true }
    })
  },

  async getGameGuesses(roomId: string) {
    return await supabaseHelpers.read('game_guesses', {
      filter: { room_id: roomId },
      orderBy: { column: 'created_at', ascending: true }
    })
  },

  // Complex queries
  async getRoomWithPlayersAndIdentities(roomId: string) {
    const { data, error } = await supabase
      .from('rooms')
      .select(`
        *,
        players:players(*),
        identities:identities(*)
      `)
      .eq('id', roomId)
      .single()

    if (error) throw error
    return data
  },

  async getPlayerWithIdentities(playerId: string) {
    const { data, error } = await supabase
      .from('players')
      .select(`
        *,
        identities:identities(*)
      `)
      .eq('id', playerId)
      .single()

    if (error) throw error
    return data
  }
}

// Game flow functions for WhoDat
export const gameFlowHelpers = {
  // 1. Create a new room with host
  async createRoom(hostName: string): Promise<{ roomId: string; playerId: string }> {
    // Create room first
    const room = await supabaseHelpers.create('rooms', { 
      status: 'waiting',
      host_id: '', // Will be updated after player creation
      game_status: 'waiting'
    })
    
    // Create host player
    const hostPlayer = await supabaseHelpers.create('players', {
      room_id: room.id,
      name: hostName,
      is_ready: false,
      has_submitted_names: false,
      score: 0,
      is_host: true
    })
    
    // Update room with host_id
    await supabaseHelpers.update('rooms', room.id, { host_id: hostPlayer.id })
    
    return { roomId: room.id, playerId: hostPlayer.id }
  },

  // 2. Join a room as a player
  async joinRoom(roomId: string, playerName: string): Promise<string> {
    const player = await supabaseHelpers.create('players', {
      room_id: roomId,
      name: playerName,
      is_ready: false,
      has_submitted_names: false,
      score: 0,
      is_host: false
    })
    return player.id
  },

  // 3. Submit identities for a player
  async submitIdentities(roomId: string, playerId: string, names: string[]): Promise<void> {
    // Submit multiple identities
    await whoDatHelpers.submitMultipleIdentities(roomId, playerId, names)
    
    // Mark player as having submitted names
    await whoDatHelpers.updatePlayerSubmittedNames(playerId, true)
  },

  // 4. Start name collection phase
  async startNameCollection(roomId: string): Promise<void> {
    await whoDatHelpers.updateGameStatus(roomId, 'collecting_names')
    await whoDatHelpers.updateRoomStatus(roomId, 'collecting_names')
  },

  // 5. Check if all players have submitted names
  async allPlayersSubmittedNames(roomId: string): Promise<boolean> {
    const players = await whoDatHelpers.getPlayersInRoom(roomId)
    return players.every((player: any) => player.has_submitted_names)
  },

  // 6. Assign identities to players
  async assignIdentities(roomId: string): Promise<string> {
    // Get all players in the room
    const players = await whoDatHelpers.getPlayersInRoom(roomId)
    if (!players || players.length === 0) {
      throw new Error('No players found in room')
    }

    // Get all identities in the room
    const identities = await whoDatHelpers.getIdentitiesInRoom(roomId)
    if (!identities || identities.length === 0) {
      throw new Error('No identities found in room')
    }

    // Create a map of player IDs to their submitted identities
    const playerIdentities = new Map<string, string[]>()
    identities.forEach((identity: any) => {
      if (!playerIdentities.has(identity.submitted_by)) {
        playerIdentities.set(identity.submitted_by, [])
      }
      playerIdentities.get(identity.submitted_by)!.push(identity.name)
    })

    // Shuffle identities for random assignment
    const shuffledIdentities = [...identities].sort(() => Math.random() - 0.5)

    // Assign identities to each player
    for (const player of players) {
      const playerSubmittedIdentities = playerIdentities.get((player as any).id) || []
      
      // Get all identities except the ones this player submitted
      const availableIdentities = shuffledIdentities.filter(
        (identity: any) => !playerSubmittedIdentities.includes(identity.name)
      )

      if (availableIdentities.length === 0) {
        throw new Error(`No available identities for player ${(player as any).name}`)
      }

      // Randomly select an identity for this player
      const randomIndex = Math.floor(Math.random() * availableIdentities.length)
      const assignedIdentity = (availableIdentities[randomIndex] as any).name

      // Update player's assigned identity
      await whoDatHelpers.assignIdentityToPlayer((player as any).id, assignedIdentity)

      // Remove the assigned identity from available identities to avoid duplicates
      const identityIndex = shuffledIdentities.findIndex((id: any) => id.name === assignedIdentity)
      if (identityIndex > -1) {
        shuffledIdentities.splice(identityIndex, 1)
      }
    }

    // Set first player as current turn
    await whoDatHelpers.setCurrentTurnPlayer(roomId, (players[0] as any).id)

    // Update room status to 'playing'
    await whoDatHelpers.updateRoomStatus(roomId, 'playing')
    await whoDatHelpers.updateGameStatus(roomId, 'playing')

    return 'playing'
  },

  // 7. Get next turn player
  async getNextTurnPlayer(roomId: string): Promise<string | null> {
    const room = await whoDatHelpers.getRoom(roomId)
    const players = await whoDatHelpers.getPlayersInRoom(roomId)
    
    if (!(room as any).current_turn_player_id) {
      return (players[0] as any)?.id || null
    }
    
    const currentIndex = players.findIndex((p: any) => p.id === (room as any).current_turn_player_id)
    const nextIndex = (currentIndex + 1) % players.length
    
    return (players[nextIndex] as any)?.id || null
  },

  // 8. Pass turn to next player
  async passTurn(roomId: string): Promise<string | null> {
    const nextPlayerId = await gameFlowHelpers.getNextTurnPlayer(roomId)
    await whoDatHelpers.setCurrentTurnPlayer(roomId, nextPlayerId)
    return nextPlayerId
  },

  // 9. Make a guess
  async makeGuess(roomId: string, guessedBy: string, guessedIdentity: string): Promise<boolean> {
    // Get the player's assigned identity
    const players = await whoDatHelpers.getPlayersInRoom(roomId)
    const player = players.find((p: any) => p.id === guessedBy)
    
    if (!player || !(player as any).assigned_identity) {
      throw new Error('Player not found or no assigned identity')
    }
    
    const isCorrect = (player as any).assigned_identity.toLowerCase() === guessedIdentity.toLowerCase()
    
    // Record the guess
    await whoDatHelpers.addGuess(roomId, guessedBy, guessedIdentity, isCorrect)
    
    if (isCorrect) {
      // Update player score
      await whoDatHelpers.updatePlayerScore(guessedBy, (player as any).score + 10)
    }
    
    return isCorrect
  }
}

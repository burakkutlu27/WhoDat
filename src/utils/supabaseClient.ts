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
          status: string
        }
        Insert: {
          id?: string
          created_at?: string
          status: string
        }
        Update: {
          id?: string
          created_at?: string
          status?: string
        }
      }
      players: {
        Row: {
          id: string
          room_id: string
          name: string
          assigned_identity: string | null
        }
        Insert: {
          id?: string
          room_id: string
          name: string
          assigned_identity?: string | null
        }
        Update: {
          id?: string
          room_id?: string
          name?: string
          assigned_identity?: string | null
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
  async createRoom(status: string) {
    return await supabaseHelpers.create('rooms', { status })
  },

  async getRoom(roomId: string) {
    return await supabaseHelpers.getById('rooms', roomId)
  },

  async updateRoomStatus(roomId: string, status: string) {
    return await supabaseHelpers.update('rooms', roomId, { status })
  },

  // Player operations
  async addPlayerToRoom(roomId: string, name: string) {
    return await supabaseHelpers.create('players', { room_id: roomId, name })
  },

  async getPlayersInRoom(roomId: string) {
    return await supabaseHelpers.read('players', {
      filter: { room_id: roomId }
    })
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
  // 1. Create a new room
  async createRoom(status: string = 'waiting'): Promise<string> {
    const room = await supabaseHelpers.create('rooms', { status })
    return room.id
  },

  // 2. Join a room as a player
  async joinRoom(roomId: string, playerName: string): Promise<string> {
    const player = await supabaseHelpers.create('players', {
      room_id: roomId,
      name: playerName
    })
    return player.id
  },

  // 3. Submit identities for a player
  async submitIdentities(roomId: string, playerId: string, names: string[]): Promise<void> {
    // First, delete any existing identities for this player in this room
    await supabase
      .from('identities')
      .delete()
      .eq('room_id', roomId)
      .eq('submitted_by', playerId)

    // Insert new identities
    const identitiesToInsert = names.map(name => ({
      room_id: roomId,
      submitted_by: playerId,
      name
    }))

    const { error } = await supabase
      .from('identities')
      .insert(identitiesToInsert)

    if (error) throw error
  },

  // 4. Assign identities to players
  async assignIdentities(roomId: string): Promise<string> {
    // Get all players in the room using direct supabase query
    const { data: players, error: playersError } = await supabase
      .from('players')
      .select('*')
      .eq('room_id', roomId)

    if (playersError) throw playersError
    if (!players || players.length === 0) {
      throw new Error('No players found in room')
    }

    // Get all identities in the room using direct supabase query
    const { data: identities, error: identitiesError } = await supabase
      .from('identities')
      .select('*')
      .eq('room_id', roomId)

    if (identitiesError) throw identitiesError
    if (!identities || identities.length === 0) {
      throw new Error('No identities found in room')
    }

    // Create a map of player IDs to their submitted identities
    const playerIdentities = new Map<string, string[]>()
    identities.forEach(identity => {
      if (!playerIdentities.has(identity.submitted_by)) {
        playerIdentities.set(identity.submitted_by, [])
      }
      playerIdentities.get(identity.submitted_by)!.push(identity.name)
    })

    // Assign identities to each player
    for (const player of players) {
      const playerSubmittedIdentities = playerIdentities.get(player.id) || []
      
      // Get all identities except the ones this player submitted
      const availableIdentities = identities.filter(
        identity => !playerSubmittedIdentities.includes(identity.name)
      )

      if (availableIdentities.length === 0) {
        throw new Error(`No available identities for player ${player.name}`)
      }

      // Randomly select an identity for this player
      const randomIndex = Math.floor(Math.random() * availableIdentities.length)
      const assignedIdentity = availableIdentities[randomIndex].name

      // Update player's assigned identity
      await supabaseHelpers.update('players', player.id, {
        assigned_identity: assignedIdentity
      })

      // Remove the assigned identity from available identities to avoid duplicates
      const identityIndex = identities.findIndex(id => id.name === assignedIdentity)
      if (identityIndex > -1) {
        identities.splice(identityIndex, 1)
      }
    }

    // Update room status to 'assigned'
    await supabaseHelpers.update('rooms', roomId, { status: 'assigned' })

    return 'assigned'
  }
}

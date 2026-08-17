/**
 * Supabase şemasından üretilmiştir. Elle düzenlemeyin.
 * Yenilemek için: npm run db:types
 *
 * Bu dosyadan önce tipler elle yazılıyordu ve şemadan kopmuştu: var olmayan
 * `game_questions` / `game_guesses` tabloları tanımlıydı, silinmiş sütunlar duruyordu.
 *
 * Tek elle eklenen parça `Functions.increment_player_score`; üretici, service_role
 * dışındaki rollerden EXECUTE yetkisi alınmış fonksiyonları listelemiyor.
 */

export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: '13.0.5'
  }
  public: {
    Tables: {
      famous_people: {
        Row: {
          created_at: string | null
          id: string
          name: string
          category: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          category: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          category?: string
        }
        Relationships: []
      }
      names: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          id: string
          name_text: string
          room_id: string
          submitted_by: string
          used_in_round: number | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          id?: string
          name_text: string
          room_id: string
          submitted_by: string
          used_in_round?: number | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          id?: string
          name_text?: string
          room_id?: string
          submitted_by?: string
          used_in_round?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'names_assigned_to_fkey'
            columns: ['assigned_to']
            isOneToOne: false
            referencedRelation: 'players'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'names_room_id_fkey'
            columns: ['room_id']
            isOneToOne: false
            referencedRelation: 'rooms'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'names_submitted_by_fkey'
            columns: ['submitted_by']
            isOneToOne: false
            referencedRelation: 'players'
            referencedColumns: ['id']
          },
        ]
      }
      players: {
        Row: {
          created_at: string
          has_finished_round: boolean
          id: string
          is_host: boolean | null
          nickname: string
          questions_this_round: number
          room_id: string
          round_scores: Json
          score: number | null
        }
        Insert: {
          created_at?: string
          has_finished_round?: boolean
          id?: string
          is_host?: boolean | null
          nickname: string
          questions_this_round?: number
          room_id: string
          round_scores?: Json
          score?: number | null
        }
        Update: {
          created_at?: string
          has_finished_round?: boolean
          id?: string
          is_host?: boolean | null
          nickname?: string
          questions_this_round?: number
          room_id?: string
          round_scores?: Json
          score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'players_room_id_fkey'
            columns: ['room_id']
            isOneToOne: false
            referencedRelation: 'rooms'
            referencedColumns: ['id']
          },
        ]
      }
      rooms: {
        Row: {
          created_at: string | null
          current_identity_id: string | null
          current_player_id: string | null
          game_mode: string | null
          game_round: number | null
          id: string
          is_game_active: boolean | null
          room_code: string
          status: string | null
          total_rounds: number | null
        }
        Insert: {
          created_at?: string | null
          current_identity_id?: string | null
          current_player_id?: string | null
          game_mode?: string | null
          game_round?: number | null
          id?: string
          is_game_active?: boolean | null
          room_code: string
          status?: string | null
          total_rounds?: number | null
        }
        Update: {
          created_at?: string | null
          current_identity_id?: string | null
          current_player_id?: string | null
          game_mode?: string | null
          game_round?: number | null
          id?: string
          is_game_active?: boolean | null
          room_code?: string
          status?: string | null
          total_rounds?: number | null
        }
        Relationships: [
          {
            foreignKeyName: 'rooms_current_identity_id_fkey'
            columns: ['current_identity_id']
            isOneToOne: false
            referencedRelation: 'names'
            referencedColumns: ['id']
          },
          {
            foreignKeyName: 'rooms_current_player_id_fkey'
            columns: ['current_player_id']
            isOneToOne: false
            referencedRelation: 'players'
            referencedColumns: ['id']
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      increment_player_score: {
        Args: { p_player_id: string; p_delta: number }
        Returns: number
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type RoomRow = Database['public']['Tables']['rooms']['Row']
export type PlayerRow = Database['public']['Tables']['players']['Row']
export type NameRow = Database['public']['Tables']['names']['Row']
export type FamousPersonRow = Database['public']['Tables']['famous_people']['Row']

export type RoomStatus = 'waiting' | 'playing' | 'finished' | 'closed'

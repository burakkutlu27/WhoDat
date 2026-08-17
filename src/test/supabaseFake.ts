import { randomUUID } from 'node:crypto'

import type { FamousPersonRow, NameRow, PlayerRow, RoomRow } from '@/lib/database.types'

/**
 * Bellek içi Supabase test ikizi.
 *
 * Motorun kullandığı sorgu zincirlerinin yalnızca gerçekten ihtiyaç duyulan kısmını
 * uygular. Amaç ağı taklit etmek değil; yetki kontrollerinin ve durum geçişlerinin
 * gerçek motor kodu üzerinde çalıştırılabilmesi.
 */

export interface FakeTables {
  rooms: RoomRow[]
  players: PlayerRow[]
  names: NameRow[]
  famous_people?: FamousPersonRow[]
}

type TableName = keyof FakeTables
type Row = Record<string, unknown>

interface Result<T> {
  data: T
  error: { code?: string; message: string } | null
}

class QueryBuilder implements PromiseLike<Result<Row[] | Row | null>> {
  private operation: 'select' | 'insert' | 'update' | 'upsert' | 'delete' = 'select'
  private payload: Row[] = []
  private filters: Array<[string, unknown, 'eq' | 'ilike']> = []
  private sorts: Array<{ column: string; ascending: boolean }> = []
  private limitCount?: number
  private wantsRows = false
  private cardinality: 'many' | 'maybe' | 'one' = 'many'
  private conflictColumns: string[] = ['id']
  private ignoreDuplicates = false

  constructor(
    private readonly tables: FakeTables,
    private readonly table: TableName,
  ) {}

  private get rows(): Row[] {
    if (!this.tables[this.table]) {
      ;(this.tables as unknown as Record<string, Row[]>)[this.table] = []
    }
    return (this.tables[this.table] ?? []) as unknown as Row[]
  }

  select() {
    this.wantsRows = true
    return this
  }

  insert(values: Row | Row[]) {
    this.operation = 'insert'
    this.payload = Array.isArray(values) ? values : [values]
    return this
  }

  upsert(values: Row | Row[], options?: { onConflict?: string; ignoreDuplicates?: boolean }) {
    this.operation = 'upsert'
    this.payload = Array.isArray(values) ? values : [values]
    this.conflictColumns = options?.onConflict?.split(',').map((column) => column.trim()) ?? ['id']
    this.ignoreDuplicates = options?.ignoreDuplicates ?? false
    return this
  }

  update(values: Row) {
    this.operation = 'update'
    this.payload = [values]
    return this
  }

  delete() {
    this.operation = 'delete'
    return this
  }

  eq(column: string, value: unknown) {
    this.filters.push([column, value, 'eq'])
    return this
  }

  ilike(column: string, pattern: string) {
    this.filters.push([column, pattern, 'ilike'])
    return this
  }

  limit(count: number) {
    this.limitCount = count
    return this
  }

  order(column: string, options?: { ascending?: boolean }) {
    this.sorts.push({ column, ascending: options?.ascending ?? true })
    return this
  }

  maybeSingle() {
    this.cardinality = 'maybe'
    return this
  }

  single() {
    this.cardinality = 'one'
    return this
  }

  private matches(row: Row): boolean {
    return this.filters.every(([column, value, op]) => {
      if (op === 'ilike') {
        const strVal = String(row[column] ?? '').toLocaleLowerCase('tr')
        const pattern = String(value ?? '').replace(/%/g, '').toLocaleLowerCase('tr')
        return strVal.includes(pattern)
      }
      return row[column] === value
    })
  }

  private sorted(rows: Row[]): Row[] {
    if (this.sorts.length === 0) return rows
    return [...rows].sort((a, b) => {
      for (const { column, ascending } of this.sorts) {
        const left = a[column] as string | number
        const right = b[column] as string | number
        if (left === right) continue
        return (left < right ? -1 : 1) * (ascending ? 1 : -1)
      }
      return 0
    })
  }

  private run(): Result<Row[] | Row | null> {
    let affected: Row[] = []

    switch (this.operation) {
      case 'select': {
        const filtered = this.sorted(this.rows.filter((row) => this.matches(row)))
        affected = this.limitCount !== undefined ? filtered.slice(0, this.limitCount) : filtered
        break
      }

      case 'insert':
      case 'upsert': {
        const conflictColumns = this.operation === 'insert' ? ['id'] : this.conflictColumns

        for (const incoming of this.payload) {
          const record: Row = { id: (incoming.id as string) ?? randomUUID(), ...incoming }
          const existingIndex = this.rows.findIndex((row) =>
            conflictColumns.every((column) => row[column] === record[column]),
          )

          if (existingIndex >= 0) {
            if (this.operation === 'insert') {
              return { data: null, error: { code: '23505', message: 'duplicate key' } }
            }
            // ON CONFLICT DO NOTHING: satır güncellenmez ve döndürülmez.
            if (this.ignoreDuplicates) continue
            this.rows[existingIndex] = { ...this.rows[existingIndex], ...record }
            affected.push(this.rows[existingIndex]!)
          } else {
            this.rows.push(record)
            affected.push(record)
          }
        }
        break
      }

      case 'update':
        for (const row of this.rows) {
          if (!this.matches(row)) continue
          Object.assign(row, this.payload[0])
          affected.push(row)
        }
        break

      case 'delete': {
        const kept: Row[] = []
        for (const row of this.rows) {
          if (this.matches(row)) affected.push(row)
          else kept.push(row)
        }
        this.rows.length = 0
        this.rows.push(...kept)
        break
      }
    }

    if (this.cardinality === 'one') {
      if (affected.length !== 1) {
        return { data: null, error: { message: 'tek satır bekleniyordu' } }
      }
      return { data: affected[0]!, error: null }
    }

    if (this.cardinality === 'maybe') {
      return { data: affected[0] ?? null, error: null }
    }

    return { data: this.wantsRows || this.operation === 'select' ? affected : [], error: null }
  }

  then<TResult1 = Result<Row[] | Row | null>, TResult2 = never>(
    onfulfilled?: ((value: Result<Row[] | Row | null>) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ): PromiseLike<TResult1 | TResult2> {
    return Promise.resolve(this.run()).then(onfulfilled, onrejected)
  }
}

export function createSupabaseFake(
  tables: FakeTables = { rooms: [], players: [], names: [], famous_people: [] },
) {
  if (!tables.famous_people) tables.famous_people = []
  if (!tables.rooms) tables.rooms = []
  if (!tables.players) tables.players = []
  if (!tables.names) tables.names = []
  return {
    tables,
    client: {
      from(table: TableName) {
        return new QueryBuilder(tables, table)
      },
      rpc(name: string, args: Record<string, unknown>) {
        if (name === 'increment_player_score') {
          const player = tables.players.find((candidate) => candidate.id === args.p_player_id)
          if (player) player.score = (player.score ?? 0) + (args.p_delta as number)
          return Promise.resolve({ data: player?.score ?? null, error: null })
        }
        return Promise.resolve({ data: null, error: { message: `bilinmeyen fonksiyon: ${name}` } })
      },
    },
  }
}

let counter = 0
const nextTimestamp = () => new Date(Date.UTC(2026, 0, 1, 0, 0, counter++)).toISOString()

export function buildRoom(overrides: Partial<RoomRow> = {}): RoomRow {
  return {
    id: randomUUID(),
    created_at: nextTimestamp(),
    room_code: 'ABCDEF',
    status: 'waiting',
    current_player_id: null,
    current_identity_id: null,
    game_mode: 'classic',
    game_round: 1,
    is_game_active: false,
    total_rounds: 3,
    category_mode: 'single',
    selected_category: 'all',
    phase_categories: null,
    current_phase: 1,
    total_phases: 1,
    ...overrides,
  }
}

export function buildPlayer(roomId: string, overrides: Partial<PlayerRow> = {}): PlayerRow {
  return {
    id: randomUUID(),
    room_id: roomId,
    nickname: 'oyuncu',
    is_host: false,
    score: 0,
    round_scores: [],
    questions_this_round: 0,
    has_finished_round: false,
    created_at: nextTimestamp(),
    ...overrides,
  }
}

export function buildName(
  roomId: string,
  submittedBy: string,
  overrides: Partial<NameRow> = {},
): NameRow {
  return {
    id: randomUUID(),
    room_id: roomId,
    submitted_by: submittedBy,
    name_text: 'Kemal Sunal',
    assigned_to: null,
    created_at: nextTimestamp(),
    used_in_round: null,
    ...overrides,
  }
}

export function buildFamousPerson(overrides: Partial<FamousPersonRow> = {}): FamousPersonRow {
  return {
    id: randomUUID(),
    name: 'Barış Manço',
    category: 'unluler',
    created_at: nextTimestamp(),
    ...overrides,
  }
}


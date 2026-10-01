/**
 * Takım modu kuralları. Saf fonksiyonlar — veritabanı yok (rules.ts ile aynı desen).
 *
 * Model: takım, oyuncu state'ini (can, isim, pas hakkı, Hız verisi) paylaşan tek bir birimdir.
 * Motor, takım modunda bu state'i oyuncu yerine takım anahtarıyla (liderin kimliği) saklar;
 * sıra ise oyuncu listesinin takımlar arasında dönüşümlü dizilmesiyle (A1, B1, A2, B2 …)
 * kendiliğinden hem takımlar arası hem takım içi döner.
 */

export const MIN_TEAMS = 2
export const MAX_TEAMS = 3
export const TEAM_NOTE_MAX_LENGTH = 200
export const TEAM_NOTES_PER_TEAM = 30

export interface TeamDefinition {
  id: string
  name: string
  color: 'red' | 'blue' | 'green'
  memberIds: string[]
}

export interface TeamConfig {
  enabled: boolean
  teams: TeamDefinition[]
}

export const TEAM_PRESETS: Omit<TeamDefinition, 'memberIds'>[] = [
  { id: 'red', name: 'Kırmızı Takım', color: 'red' },
  { id: 'blue', name: 'Mavi Takım', color: 'blue' },
  { id: 'green', name: 'Yeşil Takım', color: 'green' },
]

export function emptyTeams(count: number): TeamDefinition[] {
  return TEAM_PRESETS.slice(0, count).map((preset) => ({ ...preset, memberIds: [] }))
}

export function teamOf(config: TeamConfig | undefined, playerId: string): TeamDefinition | null {
  if (!config?.enabled) return null
  return config.teams.find((team) => team.memberIds.includes(playerId)) ?? null
}

/** Oyuncunun takım state'inin saklandığı anahtar: takımın ilk üyesi (takım dışıysa kendisi). */
export function teamStateKey(config: TeamConfig | undefined, playerId: string): string {
  return teamOf(config, playerId)?.memberIds[0] ?? playerId
}

export function areTeammates(config: TeamConfig | undefined, a: string, b: string): boolean {
  const team = teamOf(config, a)
  return Boolean(team && team.memberIds.includes(b))
}

/** Yeni oyuncuyu en az üyeli takıma koyar (eşitlikte ilk takım). */
export function addToSmallestTeam(teams: TeamDefinition[], playerId: string): TeamDefinition[] {
  if (teams.some((team) => team.memberIds.includes(playerId)) || teams.length === 0) return teams
  const smallest = teams.reduce((best, team) => (team.memberIds.length < best.memberIds.length ? team : best))
  return teams.map((team) => (team.id === smallest.id ? { ...team, memberIds: [...team.memberIds, playerId] } : team))
}

export function removeFromTeams(teams: TeamDefinition[], playerId: string): TeamDefinition[] {
  return teams.map((team) => ({ ...team, memberIds: team.memberIds.filter((id) => id !== playerId) }))
}

export function moveToTeam(teams: TeamDefinition[], playerId: string, teamId: string): TeamDefinition[] {
  if (!teams.some((team) => team.id === teamId)) return teams
  return removeFromTeams(teams, playerId).map((team) =>
    team.id === teamId ? { ...team, memberIds: [...team.memberIds, playerId] } : team,
  )
}

/** Oyuncuları takımlara rastgele ve olabildiğince eşit dağıtır. */
export function shuffleIntoTeams(playerIds: string[], count: number, random: () => number = Math.random): TeamDefinition[] {
  const shuffled = [...playerIds]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!]
  }
  const teams = emptyTeams(count)
  shuffled.forEach((id, index) => teams[index % count]!.memberIds.push(id))
  return teams
}

/**
 * Sıra düzeni: takımlar dönüşümlü (A1, B1, A2, B2 …). Takımlar eşit büyüklükte olduğu
 * sürece mevcut round-robin sıra mantığı hem takımları hem takım içi üyeleri döndürür.
 */
export function interleaveByTeam<T extends { id: string }>(players: T[], teams: TeamDefinition[]): T[] {
  const byId = new Map(players.map((player) => [player.id, player]))
  const ordered: T[] = []
  const longest = Math.max(0, ...teams.map((team) => team.memberIds.length))
  for (let slot = 0; slot < longest; slot++) {
    for (const team of teams) {
      const player = byId.get(team.memberIds[slot] ?? '')
      if (player) ordered.push(player)
    }
  }
  // Takıma girmemiş oyuncu kalmamalı; kalırsa sona eklenir ki kimse kaybolmasın.
  for (const player of players) if (!ordered.includes(player)) ordered.push(player)
  return ordered
}

export type TeamValidationError =
  | { code: 'too_few_teams'; message: string }
  | { code: 'player_without_team'; message: string }
  | { code: 'empty_team'; message: string }
  | { code: 'uneven_teams'; message: string }

/** Oyun başlamadan önce takım düzeninin oynanabilir olduğunu doğrular. */
export function validateTeams(teams: TeamDefinition[], playerIds: string[]): TeamValidationError | null {
  if (teams.length < MIN_TEAMS) {
    return { code: 'too_few_teams', message: `Takım modu için en az ${MIN_TEAMS} takım gerekir.` }
  }
  const assigned = new Set(teams.flatMap((team) => team.memberIds))
  if (playerIds.some((id) => !assigned.has(id))) {
    return { code: 'player_without_team', message: 'Her oyuncu bir takıma katılmalı.' }
  }
  if (teams.some((team) => team.memberIds.length === 0)) {
    return { code: 'empty_team', message: 'Boş takım var. Takım sayısını azaltın veya oyuncu ekleyin.' }
  }
  const sizes = new Set(teams.map((team) => team.memberIds.length))
  if (sizes.size > 1) {
    return {
      code: 'uneven_teams',
      message: 'Takımlar eşit sayıda oyuncudan oluşmalı (sıra adil dönsün diye). Gerekirse bot ekleyin.',
    }
  }
  return null
}

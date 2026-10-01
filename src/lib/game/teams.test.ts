import { describe, expect, it } from 'vitest'

import {
  addToSmallestTeam,
  areTeammates,
  emptyTeams,
  interleaveByTeam,
  moveToTeam,
  shuffleIntoTeams,
  teamStateKey,
  validateTeams,
  type TeamConfig,
} from './teams'
import { selectNextPlayer } from './rules'

const players = ['a1', 'a2', 'b1', 'b2'].map((id) => ({ id }))
const config: TeamConfig = {
  enabled: true,
  teams: [
    { id: 'red', name: 'Kırmızı Takım', color: 'red', memberIds: ['a1', 'a2'] },
    { id: 'blue', name: 'Mavi Takım', color: 'blue', memberIds: ['b1', 'b2'] },
  ],
}

describe('teams', () => {
  it('oyuncuları takımlar arasında dönüşümlü dizer', () => {
    expect(interleaveByTeam(players, config.teams).map((p) => p.id)).toEqual(['a1', 'b1', 'a2', 'b2'])
  })

  it('dönüşümlü dizilimde mevcut round-robin hem takımları hem üyeleri döndürür', () => {
    const order = interleaveByTeam(players, config.teams)
    const turns: string[] = []
    let current: string | null = null
    for (let i = 0; i < 6; i++) {
      current = selectNextPlayer(order, current)!.id
      turns.push(current)
    }
    expect(turns).toEqual(['a1', 'b1', 'a2', 'b2', 'a1', 'b1'])
  })

  it('takım state anahtarı takımın ilk üyesidir; takım modu kapalıysa oyuncunun kendisi', () => {
    expect(teamStateKey(config, 'a2')).toBe('a1')
    expect(teamStateKey(config, 'b1')).toBe('b1')
    expect(teamStateKey({ ...config, enabled: false }, 'a2')).toBe('a2')
    expect(teamStateKey(config, 'yabanci')).toBe('yabanci')
  })

  it('takım arkadaşlığını belirler', () => {
    expect(areTeammates(config, 'a1', 'a2')).toBe(true)
    expect(areTeammates(config, 'a1', 'b1')).toBe(false)
  })

  it('yeni oyuncuyu en az üyeli takıma koyar, taşıma üyeliği tekil tutar', () => {
    const teams = addToSmallestTeam(emptyTeams(2), 'x')
    expect(addToSmallestTeam(teams, 'y').map((t) => t.memberIds)).toEqual([['x'], ['y']])

    const moved = moveToTeam(config.teams, 'a2', 'blue')
    expect(moved.map((t) => t.memberIds)).toEqual([['a1'], ['b1', 'b2', 'a2']])
  })

  it('rastgele dağıtım dengeli olur', () => {
    const teams = shuffleIntoTeams(['1', '2', '3', '4', '5', '6'], 3, () => 0.3)
    expect(teams.map((t) => t.memberIds.length)).toEqual([2, 2, 2])
    expect(new Set(teams.flatMap((t) => t.memberIds)).size).toBe(6)
  })

  it('başlamadan önce takım düzenini doğrular', () => {
    expect(validateTeams(config.teams, ['a1', 'a2', 'b1', 'b2'])).toBeNull()
    expect(validateTeams(config.teams.slice(0, 1), ['a1', 'a2'])?.code).toBe('too_few_teams')
    expect(validateTeams(config.teams, ['a1', 'a2', 'b1', 'b2', 'c1'])?.code).toBe('player_without_team')
    expect(validateTeams(moveToTeam(config.teams, 'a2', 'blue'), ['a1', 'a2', 'b1', 'b2'])?.code).toBe('uneven_teams')
    expect(validateTeams([...config.teams, { id: 'green', name: 'Yeşil Takım', color: 'green', memberIds: [] }], ['a1', 'a2', 'b1', 'b2'])?.code).toBe('empty_team')
  })
})

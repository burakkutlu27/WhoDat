'use client'

import { Bot, Check, Clock, Crown, Shuffle, Users } from 'lucide-react'

import type { GameState, PublicTeam } from '@/lib/game/types'

/** Takım rengi → kağıt temasındaki kalem renkleri (Tailwind sınıfları sabit olmalı). */
export const TEAM_STYLES: Record<PublicTeam['color'], { border: string; text: string; bg: string; dot: string }> = {
  red: { border: 'border-pencil-red', text: 'text-pencil-red', bg: 'bg-pencil-red/10', dot: 'bg-pencil-red' },
  blue: { border: 'border-pencil-blue', text: 'text-pencil-blue', bg: 'bg-pencil-blue/10', dot: 'bg-pencil-blue' },
  green: { border: 'border-pencil-green', text: 'text-pencil-green', bg: 'bg-pencil-green/10', dot: 'bg-pencil-green' },
}

interface TeamLobbyProps {
  state: GameState
  busy: boolean
  onShuffle: () => void
  onMove: (playerId: string, teamId: string) => void
}

/**
 * Lobi takım düzeni: takımlar renkli sütunlarda. Herkes "Bu takıma geç" ile kendi takımını
 * seçer; host her oyuncuyu (botlar dahil) renk noktalarıyla taşıyabilir ve karıştırabilir.
 */
export function TeamLobby({ state, busy, onShuffle, onMove }: TeamLobbyProps) {
  const teams = state.room.teams ?? []
  const playersById = new Map(state.players.map((player) => [player.id, player]))
  const sizes = new Set(teams.map((team) => team.memberIds.length))
  const uneven = sizes.size > 1

  return (
    <div className="space-y-3" data-testid="team-lobby">
      <div className={`grid grid-cols-1 gap-3 ${teams.length === 3 ? 'sm:grid-cols-3' : 'sm:grid-cols-2'}`}>
        {teams.map((team) => {
          const style = TEAM_STYLES[team.color]
          const isMine = team.memberIds.includes(state.you.playerId)
          return (
            <section
              key={team.id}
              data-testid={`team-column-${team.id}`}
              className={`rounded-sketch-md border-2 ${style.border} ${style.bg} p-3`}
            >
              <header className="mb-2 flex items-center justify-between gap-2">
                <h3 className={`flex items-center gap-1.5 font-display text-xl font-bold ${style.text}`}>
                  <Users className="h-4 w-4" />
                  <span>{team.name}</span>
                  <span className="text-sm font-sans">({team.memberIds.length})</span>
                </h3>
                {!isMine && (
                  <button
                    type="button"
                    onClick={() => onMove(state.you.playerId, team.id)}
                    disabled={busy}
                    data-testid={`join-team-${team.id}`}
                    className={`min-h-11 rounded-sketch border ${style.border} bg-paper-card px-3 font-sans text-xs font-bold ${style.text} disabled:opacity-50`}
                  >
                    Bu takıma geç
                  </button>
                )}
              </header>

              <ul className="space-y-2">
                {team.memberIds.map((memberId) => {
                  const player = playersById.get(memberId)
                  if (!player) return null
                  const isYou = player.id === state.you.playerId
                  return (
                    <li
                      key={player.id}
                      className={`flex items-center justify-between gap-2 rounded-sketch border bg-paper-card p-2 ${
                        isYou ? 'border-pencil-blue' : 'border-dashed border-paper-border'
                      }`}
                    >
                      <span className="flex min-w-0 items-center gap-1.5">
                        {player.isBot && <Bot className="h-4 w-4 shrink-0 text-pencil-blue" aria-label="Bot" />}
                        {player.isHost && <Crown className="h-4 w-4 shrink-0 text-pencil-yellow" aria-label="Oda Sahibi" />}
                        <span className="truncate font-display text-lg font-bold text-ink">{player.nickname}</span>
                        {isYou && <span className="tag tag-you text-xs">SEN</span>}
                      </span>
                      <span className="flex shrink-0 items-center gap-1">
                        {player.hasSubmittedNames ? (
                          <Check className="h-4 w-4 text-pencil-green" aria-label="Hazır" />
                        ) : (
                          <Clock className="h-4 w-4 text-ink-extra-faded" aria-label="Bekleniyor" />
                        )}
                        {/* Host başka takıma taşıyabilir: diğer takımların renk noktaları */}
                        {state.you.isHost &&
                          teams
                            .filter((other) => other.id !== team.id)
                            .map((other) => (
                              <button
                                key={other.id}
                                type="button"
                                onClick={() => onMove(player.id, other.id)}
                                disabled={busy}
                                aria-label={`${player.nickname} oyuncusunu ${other.name} takımına taşı`}
                                className="flex h-11 w-8 items-center justify-center disabled:opacity-50"
                              >
                                <span className={`h-4 w-4 rounded-full ${TEAM_STYLES[other.color].dot}`} />
                              </button>
                            ))}
                      </span>
                    </li>
                  )
                })}
                {team.memberIds.length === 0 && (
                  <li className="py-2 text-center text-sm text-ink-extra-faded">Henüz kimse yok</li>
                )}
              </ul>
            </section>
          )
        })}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className={`text-sm ${uneven ? 'font-bold text-pencil-orange' : 'text-ink-faded'}`} aria-live="polite">
          {uneven
            ? 'Takımlar eşit sayıda olmalı. Oyuncu taşıyın veya bot ekleyin.'
            : 'Takım ortak bir isim tahmin eder; sırası gelen üye oynar, diğerleri takım notuyla yardım eder.'}
        </p>
        {state.you.isHost && (
          <button
            type="button"
            onClick={onShuffle}
            disabled={busy}
            data-testid="shuffle-teams"
            className="btn-outline flex min-h-11 items-center gap-1.5 px-3 font-sans text-sm font-bold disabled:opacity-50"
          >
            <Shuffle className="h-4 w-4" />
            <span>Karıştır</span>
          </button>
        )}
      </div>
    </div>
  )
}

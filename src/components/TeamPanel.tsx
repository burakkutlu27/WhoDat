'use client'

import { Loader2, Send, StickyNote, Users } from 'lucide-react'
import { useState } from 'react'

import { TEAM_STYLES } from '@/components/TeamLobby'
import type { GameState } from '@/lib/game/types'

interface TeamPanelProps {
  state: GameState
  onSendNote: (message: string) => Promise<void>
}

const NOTE_MAX_LENGTH = 200

/**
 * Oyun içi takım paneli: takım puan sıralaması ve yalnızca kendi takımının gördüğü not kanalı.
 * Not göndermek bir aksiyon sayılmaz; sıra kimdeyse o istediği an yazabilir.
 */
export function TeamPanel({ state, onSendNote }: TeamPanelProps) {
  const [draft, setDraft] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const teams = [...(state.room.teams ?? [])].sort((a, b) => b.score - a.score)
  const myTeam = teams.find((team) => team.id === state.you.teamId)
  const playersById = new Map(state.players.map((player) => [player.id, player]))
  const notes = state.you.teamNotes ?? []
  const canNote = Boolean(myTeam && myTeam.memberIds.length > 1)

  const send = async (event: React.FormEvent) => {
    event.preventDefault()
    const message = draft.trim()
    if (!message || sending) return
    setSending(true)
    setError(null)
    try {
      await onSendNote(message)
      setDraft('')
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Not gönderilemedi.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section className="paper-card p-4 sm:p-5 space-y-4" data-testid="team-panel">
      <h3 className="flex items-center gap-2 font-display text-2xl font-bold text-ink">
        <Users className="h-5 w-5 text-pencil-purple" />
        <span>Takımlar</span>
      </h3>

      <ol className="space-y-2">
        {teams.map((team, index) => {
          const style = TEAM_STYLES[team.color]
          return (
            <li
              key={team.id}
              className={`flex items-center justify-between gap-2 rounded-sketch border-2 p-2.5 ${style.border} ${
                team.id === state.you.teamId ? style.bg : 'bg-paper-card'
              }`}
            >
              <span className="min-w-0">
                <span className={`block font-display text-lg font-bold ${style.text}`}>
                  {index + 1}. {team.name}
                  {team.id === state.you.teamId && <span className="ml-1.5 text-xs font-sans text-ink-faded">(senin takımın)</span>}
                </span>
                <span className="block truncate text-xs text-ink-faded">
                  {team.memberIds.map((id) => playersById.get(id)?.nickname).filter(Boolean).join(' · ')}
                </span>
              </span>
              <span className="shrink-0 font-display text-2xl font-bold text-ink">{team.score}<span className="text-sm text-ink-faded"> p</span></span>
            </li>
          )
        })}
      </ol>

      {canNote && myTeam && (
        <div className="sticky-note sticky-note-yellow space-y-2 p-3">
          <h4 className="flex items-center gap-1.5 font-display text-lg font-bold text-ink">
            <StickyNote className="h-4 w-4 text-pencil-yellow" />
            <span>Takım Notları</span>
            <span className="text-xs font-sans font-normal text-ink-faded">— yalnızca {myTeam.name} görür</span>
          </h4>

          <ul className="max-h-48 space-y-1.5 overflow-y-auto" aria-live="polite" data-testid="team-notes">
            {notes.length === 0 ? (
              <li className="text-sm text-ink-faded">Henüz not yok. Sırası gelen arkadaşına ipucu fısılda!</li>
            ) : (
              notes.map((note) => (
                <li key={note.id} className="text-sm text-ink">
                  <strong className="font-bold">{note.senderId === state.you.playerId ? 'Sen' : note.senderNickname}:</strong>{' '}
                  {note.message}
                </li>
              ))
            )}
          </ul>

          <form onSubmit={send} className="flex gap-2">
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value.slice(0, NOTE_MAX_LENGTH))}
              placeholder="Örn: bence gerçek kişi, sporcu olabilir"
              aria-label="Takım notu"
              data-testid="team-note-input"
              className="paper-input min-w-0 flex-1 text-base"
            />
            <button
              type="submit"
              disabled={sending || !draft.trim()}
              aria-label="Notu gönder"
              data-testid="team-note-send"
              className="btn-pencil-red flex min-h-11 min-w-11 items-center justify-center px-3 disabled:opacity-50"
            >
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </button>
          </form>
          {error && <p role="alert" className="text-sm text-pencil-red">{error}</p>}
        </div>
      )}
    </section>
  )
}

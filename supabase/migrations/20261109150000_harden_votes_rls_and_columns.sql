-- Denetim sertleştirmeleri:
-- 1. question_votes ve question_vote_responses tablolarında RLS'i aç ve anon/authenticated erişimini kapat.
-- 2. players.device_id ve rooms.room_code sütunlarının anon/authenticated tarafından okunmasını engelle.
-- 3. game_results tablosunda (game_room_id, player_profile_id) için tekillik kısıtı ekle (idempotent kayıt).

-- 1. Oylama tabloları RLS ve yetki daraltması
alter table public.question_votes enable row level security;
alter table public.question_vote_responses enable row level security;

revoke all on public.question_votes from anon, authenticated;
revoke all on public.question_vote_responses from anon, authenticated;

do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    if exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'question_votes'
    ) then
      alter publication supabase_realtime drop table public.question_votes;
    end if;
    if exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'question_vote_responses'
    ) then
      alter publication supabase_realtime drop table public.question_vote_responses;
    end if;
  end if;
end $$;

-- 2. Hassas sütunların (players.device_id, rooms.room_code) anonim okumaya kapatılması
-- Realtime yalnızca "değişti" sinyali için id ve room_id filtrelerini kullanır.
revoke select on public.players from anon, authenticated;
grant select (
  id,
  room_id,
  nickname,
  is_host,
  score,
  created_at,
  questions_this_round,
  round_scores,
  has_finished_round,
  is_bot,
  bot_level
) on public.players to anon, authenticated;

revoke select on public.rooms from anon, authenticated;
grant select (
  id,
  status,
  current_player_id,
  current_identity_id,
  game_round,
  is_game_active,
  created_at,
  updated_at,
  game_mode,
  total_rounds,
  category_mode,
  selected_category,
  phase_categories,
  current_phase,
  total_phases,
  communication_mode,
  difficulty
) on public.rooms to anon, authenticated;

-- 3. game_results tekillik indeksi (varsa mükerrer kayıtları temizleyerek)
delete from public.game_results a
using public.game_results b
where a.id > b.id
  and a.game_room_id is not null
  and a.game_room_id = b.game_room_id
  and a.player_profile_id = b.player_profile_id;

create unique index if not exists idx_game_results_room_profile_unique
  on public.game_results (game_room_id, player_profile_id);


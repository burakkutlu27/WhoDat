-- Baseline: mevcut şemayı repoya taşır.
-- Bu şema daha önce Supabase panelinden elle uygulanmıştı ve sürüm kontrolünde değildi.
-- Tümü idempotent: kurulu projede no-op, boş projede şemayı sıfırdan kurar.

create extension if not exists "uuid-ossp";

create table if not exists public.rooms (
  id                  uuid primary key default uuid_generate_v4(),
  created_at          timestamptz default now(),
  room_code           varchar not null unique,
  status              varchar default 'waiting'
                        check (status in ('waiting', 'playing', 'finished', 'closed')),
  current_player_id   uuid,
  current_identity_id uuid,
  game_round          integer default 1,
  is_game_active      boolean default false
);

create table if not exists public.players (
  id       uuid primary key default uuid_generate_v4(),
  room_id  uuid not null references public.rooms(id) on delete cascade,
  nickname varchar not null,
  is_host  boolean default false,
  score    integer default 0
);

create table if not exists public.names (
  id            uuid primary key default uuid_generate_v4(),
  room_id       uuid not null references public.rooms(id) on delete cascade,
  submitted_by  uuid not null references public.players(id) on delete cascade,
  name_text     text not null,
  assigned_to   uuid references public.players(id) on delete set null,
  created_at    timestamptz default now(),
  used_in_round integer
);

do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'rooms_current_player_id_fkey') then
    alter table public.rooms
      add constraint rooms_current_player_id_fkey
      foreign key (current_player_id) references public.players(id);
  end if;

  if not exists (select 1 from pg_constraint where conname = 'rooms_current_identity_id_fkey') then
    alter table public.rooms
      add constraint rooms_current_identity_id_fkey
      foreign key (current_identity_id) references public.names(id);
  end if;
end $$;

create index if not exists idx_rooms_room_code         on public.rooms (room_code);
create index if not exists idx_rooms_created_at        on public.rooms (created_at);
create index if not exists idx_rooms_current_player    on public.rooms (current_player_id);
create index if not exists idx_rooms_current_identity  on public.rooms (current_identity_id);
create index if not exists idx_players_room_id         on public.players (room_id);
create index if not exists idx_names_room_id           on public.names (room_id);
create index if not exists idx_names_submitted_by      on public.names (submitted_by);
create index if not exists idx_names_assigned_to       on public.names (assigned_to);
create unique index if not exists idx_names_room_text_unique on public.names (room_id, name_text);

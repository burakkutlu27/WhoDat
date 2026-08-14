-- Hız Modu (Az Soru, Çok Puan) için gerekli sütunları ekler.

-- 1. Odalara oyun modu ve toplam tur sayısı ekleme
alter table public.rooms
  add column if not exists game_mode varchar default 'classic'
    check (game_mode in ('classic', 'speed')),
  add column if not exists total_rounds integer default 3;

-- 2. Oyunculara tur puanları, turdaki soru sayısı ve tur tamamlama durumu ekleme
alter table public.players
  add column if not exists round_scores jsonb not null default '[]'::jsonb,
  add column if not exists questions_this_round integer not null default 0,
  add column if not exists has_finished_round boolean not null default false;

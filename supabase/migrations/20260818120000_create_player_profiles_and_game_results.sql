-- Migration: 20260818120000_create_player_profiles_and_game_results.sql
-- Description: Creates player_profiles and game_results tables for device-based leaderboards & statistics (Level 1)

-- 1. players tablosuna device_id ekle
ALTER TABLE public.players
ADD COLUMN IF NOT EXISTS device_id TEXT;

-- 2. Cihaz Profilleri Tablosu (Hesapsız kalıcı kimlik)
CREATE TABLE IF NOT EXISTS public.player_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  device_id TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Oyun Sonuçları Tablosu
CREATE TABLE IF NOT EXISTS public.game_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  player_profile_id UUID REFERENCES public.player_profiles(id) ON DELETE CASCADE NOT NULL,
  game_room_id UUID REFERENCES public.rooms(id) ON DELETE SET NULL,
  game_mode TEXT NOT NULL,
  score INT NOT NULL DEFAULT 0,
  placement INT NOT NULL DEFAULT 1,
  survived BOOLEAN NOT NULL DEFAULT true,
  played_at TIMESTAMPTZ DEFAULT now()
);

-- 4. İndeksler
CREATE INDEX IF NOT EXISTS idx_player_profiles_device_id ON public.player_profiles(device_id);
CREATE INDEX IF NOT EXISTS idx_game_results_profile_id ON public.game_results(player_profile_id);
CREATE INDEX IF NOT EXISTS idx_game_results_played_at ON public.game_results(played_at DESC);
CREATE INDEX IF NOT EXISTS idx_players_device_id ON public.players(device_id);

-- 5. RLS & Güvenlik
ALTER TABLE public.player_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.game_results ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "player_profiles_public_read" ON public.player_profiles;
DROP POLICY IF EXISTS "game_results_public_read" ON public.game_results;

CREATE POLICY "player_profiles_public_read"
  ON public.player_profiles FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "game_results_public_read"
  ON public.game_results FOR SELECT
  TO anon, authenticated
  USING (true);

REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.player_profiles FROM anon, authenticated;
REVOKE INSERT, UPDATE, DELETE, TRUNCATE ON public.game_results FROM anon, authenticated;

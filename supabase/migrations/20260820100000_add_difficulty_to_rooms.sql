-- Migration: 20260820100000_add_difficulty_to_rooms.sql
-- Description: Adds difficulty column to rooms table for full lobby settings persistence

ALTER TABLE public.rooms
  ADD COLUMN IF NOT EXISTS difficulty TEXT DEFAULT 'orta';

COMMENT ON COLUMN public.rooms.difficulty IS 'Oyun zorluk seviyesi: kolay, orta, zor';

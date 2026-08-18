-- Migration: 20260818100000_add_text_mode_and_question_bank.sql
-- Description: Adds communication_mode to rooms, creates question_bank and voting tables

-- 1. rooms tablosuna communication_mode sütunu ekle ('voice' | 'text')
ALTER TABLE rooms
ADD COLUMN IF NOT EXISTS communication_mode TEXT DEFAULT 'voice';

-- 2. Soru Bankası tablosu
CREATE TABLE IF NOT EXISTS question_bank (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  text_tr TEXT NOT NULL,
  category_scope TEXT[] DEFAULT NULL,
  difficulty TEXT DEFAULT 'genel',
  tag TEXT DEFAULT 'genel',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Soru Bankası başlangıç verisi (15 Temel Soru)
INSERT INTO question_bank (text_tr, tag, difficulty, sort_order) VALUES
('Gerçek bir kişi miyim, yoksa kurgu bir karakter miyim?', 'kimlik', 'genel', 1),
('Hayatta mıyım?', 'durum', 'genel', 2),
('Bir kadın mıyım?', 'cinsiyet', 'genel', 3),
('Tanınırlığım sanat/eğlence dünyasından mı geliyor?', 'meslek', 'genel', 4),
('Spor dünyasından mıyım?', 'meslek', 'genel', 5),
('Tarihi bir figür müyüm (20. yüzyıldan önce mi yaşadım)?', 'tarih', 'daraltici', 6),
('Türk müyüm?', 'koken', 'daraltici', 7),
('Filmlerde ya da dizilerde mi tanınıyorum?', 'sanat', 'daraltici', 8),
('Müzikle mi tanınıyorum?', 'sanat', 'daraltici', 9),
('Bir çizgi film karakteri miyim?', 'kurgu', 'daraltici', 10),
('İsmim üç harften uzun mu?', 'isim', 'spesifik', 11),
('Adım bir sesli harfle mi başlıyor?', 'isim', 'spesifik', 12),
('Genel olarak "iyi" bir karakter olarak mı biliniyorum?', 'kisilik', 'daraltici', 13),
('Bugün hâlâ aktif/güncel biri miyim?', 'durum', 'genel', 14),
('Bir spor dalında ünlü müyüm?', 'spor', 'daraltici', 15);

-- 4. Oylama ve Cevap Tabloları (Opsiyonel veritabanı kalıcılığı için)
CREATE TABLE IF NOT EXISTS question_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
  asker_player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  question_text TEXT NOT NULL,
  status TEXT DEFAULT 'open', -- 'open' | 'closed'
  opened_at TIMESTAMPTZ DEFAULT now(),
  closes_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS question_vote_responses (
  vote_id UUID REFERENCES question_votes(id) ON DELETE CASCADE,
  responder_player_id UUID REFERENCES players(id) ON DELETE CASCADE,
  answer BOOLEAN NOT NULL, -- true = evet, false = hayır
  responded_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY (vote_id, responder_player_id)
);

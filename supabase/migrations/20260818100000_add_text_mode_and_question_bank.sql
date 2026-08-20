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

-- 3. Soru Bankası başlangıç verisi (Evet / Hayır Formatında Standart Sorular)
INSERT INTO question_bank (text_tr, tag, difficulty, sort_order) VALUES
('Gerçek hayatta yaşamış veya yaşayan bir insan mıyım?', 'kimlik', 'genel', 1),
('Kurgusal veya hayal ürünü bir karakter miyim?', 'kimlik', 'genel', 2),
('Şu anda hayatta mıyım?', 'durum', 'genel', 3),
('Bir kadın mıyım?', 'kimlik', 'genel', 4),
('Bir erkek miyim?', 'kimlik', 'genel', 5),
('Türkiye kökenli / Türk vatandaşı mıyım?', 'koken', 'daraltici', 6),
('Yabancı (Türkiye dışından) biri miyim?', 'koken', 'daraltici', 7),
('Sanat, sinema veya müzik dünyasından mıyım?', 'sanat', 'genel', 8),
('Oyunculuk veya sinema/dizi sektöründe mi tanınıyorum?', 'sanat', 'daraltici', 9),
('Müzisyen, şarkıcı veya besteci miyim?', 'sanat', 'daraltici', 10),
('Bir sporcu veya spor dünyasından biri miyim?', 'spor', 'daraltici', 11),
('Tarihi bir kişilik miyim (20. yüzyıldan önce mi yaşadım)?', 'durum', 'daraltici', 12),
('Bilim, edebiyat veya siyaset alanında mı tanınıyorum?', 'meslek', 'daraltici', 13),
('Bir çizgi film, animasyon veya çizgi roman karakteri miyim?', 'kimlik', 'daraltici', 14),
('Süper güçleri veya fantastik yetenekleri olan bir karakter miyim?', 'kimlik', 'spesifik', 15),
('Genel olarak olumlu / "iyi" tarafta bir karakter miyim?', 'kisilik', 'daraltici', 16),
('Kötü / kötü adam (antagonist) bir karakter miyim?', 'kisilik', 'daraltici', 17),
('İsmim (veya ilk adım) 5 harften uzun mu?', 'isim', 'spesifik', 18),
('Adım bir sesli harfle (A, E, I, İ, O, Ö, U, Ü) mi başlıyor?', 'isim', 'spesifik', 19),
('Bugün hâlâ aktif/güncel olarak tanınan biri miyim?', 'durum', 'genel', 20);

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

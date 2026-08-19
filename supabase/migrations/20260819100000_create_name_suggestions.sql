-- Topluluk İsim Önerileri Tablosu
-- Oyuncuların oyunda bulamadığı ünlü, karakter, sporcu ve tarihi kişilikleri önermesini sağlar.

CREATE TABLE IF NOT EXISTS public.name_suggestions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (char_length(trim(name)) >= 2 AND char_length(name) <= 60),
  category text NOT NULL CHECK (category IN ('unluler', 'tarihi_kisiler', 'cizgi_karakterler', 'sporcular', 'dizi_film_karakterleri')),
  notes text CHECK (notes IS NULL OR char_length(notes) <= 200),
  suggested_by text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz NOT NULL DEFAULT now()
);

-- İndeksler
CREATE INDEX IF NOT EXISTS idx_name_suggestions_status ON public.name_suggestions(status);
CREATE INDEX IF NOT EXISTS idx_name_suggestions_created_at ON public.name_suggestions(created_at DESC);

-- RLS
ALTER TABLE public.name_suggestions ENABLE ROW LEVEL SECURITY;

-- Anonim/Genel kullanıcılar öneri gönderebilir (INSERT)
CREATE POLICY "Anyone can insert name suggestions"
  ON public.name_suggestions
  FOR INSERT
  WITH CHECK (true);

-- Yalnızca service role veya authenticated kullanıcılar tüm önerileri listeleyebilir (SELECT)
CREATE POLICY "Service role can read suggestions"
  ON public.name_suggestions
  FOR SELECT
  USING (true);

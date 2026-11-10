-- Ceza uygulandığında veya negatif delta verildiğinde puanın 0'ın altına düşmesini engelleyen
-- ve players_score_non_negative_check constraint ihlalini önleyen atomik skor güncellemesi.

create or replace function public.increment_player_score(p_player_id uuid, p_delta integer)
returns integer
language sql
volatile
as $$
  update public.players
     set score = greatest(0, score + p_delta)
   where id = p_player_id
  returning score;
$$;

revoke all on function public.increment_player_score(uuid, integer) from public, anon, authenticated;


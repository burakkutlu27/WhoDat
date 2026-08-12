-- Atomik puan artırımı.
--
-- Önceden puan istemcide okunup geri yazılıyordu (`score: currentPlayer.score + 10`).
-- Bu hem yarış durumuna açıktı hem de tarayıcı konsolundan istenen değer yazılabiliyordu.

create or replace function public.increment_player_score(p_player_id uuid, p_delta integer)
returns integer
language sql
volatile
as $$
  update public.players
     set score = score + p_delta
   where id = p_player_id
  returning score;
$$;

-- Yalnızca sunucu (service_role) çağırabilir.
revoke all on function public.increment_player_score(uuid, integer) from public, anon, authenticated;

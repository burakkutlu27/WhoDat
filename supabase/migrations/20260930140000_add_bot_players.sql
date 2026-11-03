-- Bot oyuncular.
--
-- Botlar players tablosunda normal oyuncu gibi durur; oturumları (çerez) yoktur, aksiyonları
-- sunucudaki bot tetikleyicisi (src/lib/game/bot/runner.ts) aynı motor fonksiyonlarıyla yapar.
-- is_bot/bot_level gizli değil: istemci botu robot ikonuyla gösterebilsin diye players'ta.

alter table public.players
  add column if not exists is_bot boolean not null default false,
  add column if not exists bot_level text;

alter table public.players
  drop constraint if exists players_bot_level_check;
alter table public.players
  add constraint players_bot_level_check
  check (
    (is_bot = false and bot_level is null)
    or (is_bot = true and bot_level in ('kolay', 'orta', 'zor'))
  );

-- Botun bir sonraki hamlesinin zamanı. room_runtime'da (anon'a kapalı, realtime'da değil):
-- rooms'ta olsaydı her zamanlama tüm istemcilere gereksiz realtime yenilemesi tetiklerdi.
-- Hamle hakkı "update … where bot_next_action_at = <okunan> returning" ile atomik alınır;
-- iki instance aynı anda tetiklese bile bot tek hamle yapar.
alter table public.room_runtime
  add column if not exists bot_next_action_at timestamptz;

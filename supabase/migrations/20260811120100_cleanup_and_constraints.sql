-- Ölü şema nesnelerini kaldırır, eksik sütunu ekler ve veri bütünlüğü kısıtlarını tanımlar.

-- 1. Ölü nesneler.
-- `identities` tablosu hiç kullanılmıyordu; oyun `names` tablosu üzerinden çalışıyor.
drop table if exists public.identities cascade;

-- `players.name` her zaman NULL'dı (kod `nickname` yazıyor), `assigned_identity` hiç yazılmadı.
alter table public.players drop column if exists name;
alter table public.players drop column if exists assigned_identity;

-- `rooms.used_names` yerine `names.used_in_round` kullanılıyor; sütun hep boş kaldı.
alter table public.rooms drop column if exists used_names;

-- 2. Eksik sütun.
-- /scores sayfası bu sütunu seçiyordu ama sütun yoktu; sorgu her çağrıda hata veriyordu.
alter table public.players
  add column if not exists created_at timestamptz not null default now();

-- 3. Silme davranışı düzeltmeleri.
-- Bu iki FK'de ON DELETE tanımlı değildi. Sırası gelen oyuncu ya da o anki ismi gönderen
-- oyuncu odadan çıkmak istediğinde DELETE, FK ihlaliyle başarısız oluyordu.
alter table public.rooms drop constraint if exists rooms_current_player_id_fkey;
alter table public.rooms
  add constraint rooms_current_player_id_fkey
  foreign key (current_player_id) references public.players(id) on delete set null;

alter table public.rooms drop constraint if exists rooms_current_identity_id_fkey;
alter table public.rooms
  add constraint rooms_current_identity_id_fkey
  foreign key (current_identity_id) references public.names(id) on delete set null;

-- 4. Eski veriyi kısıtlara uygun hale getir.
-- Oda kodu üreticisi yazılmadan önceki iki kayıtta kod, UUID'nin ilk 6 hanesi ve küçük harfli.
-- Kod aramaları zaten büyük harfe çevrilerek yapıldığı için bunlar hiçbir zaman bulunamıyordu.
update public.rooms
   set room_code = upper(room_code)
 where room_code ~ '^[a-z0-9]{6}$';

-- 5. Veri bütünlüğü kısıtları.
-- Şu ana kadar tek doğrulama istemcideki `maxLength` attribute'uydu; bu trivial olarak atlanabilir.
do $$
begin
  if not exists (select 1 from pg_constraint where conname = 'players_nickname_length_check') then
    alter table public.players
      add constraint players_nickname_length_check
      check (char_length(btrim(nickname)) between 1 and 20);
  end if;

  if not exists (select 1 from pg_constraint where conname = 'players_score_non_negative_check') then
    alter table public.players
      add constraint players_score_non_negative_check check (score >= 0);
  end if;

  if not exists (select 1 from pg_constraint where conname = 'names_text_length_check') then
    alter table public.names
      add constraint names_text_length_check
      check (char_length(btrim(name_text)) between 1 and 60);
  end if;

  if not exists (select 1 from pg_constraint where conname = 'rooms_room_code_format_check') then
    alter table public.rooms
      add constraint rooms_room_code_format_check check (room_code ~ '^[A-Z0-9]{6}$');
  end if;

  if not exists (select 1 from pg_constraint where conname = 'rooms_game_round_check') then
    alter table public.rooms
      add constraint rooms_game_round_check check (game_round >= 1);
  end if;
end $$;

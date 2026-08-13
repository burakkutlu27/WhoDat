-- Row Level Security.
--
-- Model: tarayıcı yalnızca okur, tüm yazma işlemleri Next.js route handler'larından
-- service_role ile yapılır (service_role RLS'i baypas eder).
--
-- `rooms` ve `players` anon'a okumaya açık kalır; Supabase Realtime abonelikleri
-- RLS'e tabi olduğu için bu olmadan canlı güncellemeler çalışmaz. İkisinde de sır yok.
--
-- `names` anon'a tamamen kapalıdır. Oyunun tek sırrı (doğru cevap) burada durur ve
-- daha önce tahmin eden oyuncunun tarayıcısına da gönderiliyordu. Artık istemci bu
-- tabloyu hiç göremez; sanitize edilmiş oyun durumu sunucudan gelir.

alter table public.rooms   enable row level security;
alter table public.players enable row level security;
alter table public.names   enable row level security;

drop policy if exists "rooms_public_read"   on public.rooms;
drop policy if exists "players_public_read" on public.players;

create policy "rooms_public_read"
  on public.rooms for select
  to anon, authenticated
  using (true);

create policy "players_public_read"
  on public.players for select
  to anon, authenticated
  using (true);

-- names için hiçbir politika tanımlanmaz: RLS açıkken politikasız tablo tümüyle kapalıdır.

-- RLS'e ek olarak tablo düzeyindeki grant'ları da daraltıyoruz.
-- Supabase varsayılan olarak public şemadaki tablolara anon/authenticated için
-- tüm yetkileri verir; RLS bunu zaten durdurur ama iki katman daha güvenli.
revoke insert, update, delete, truncate on public.rooms   from anon, authenticated;
revoke insert, update, delete, truncate on public.players from anon, authenticated;
revoke all on public.names from anon, authenticated;

-- Realtime yayınının doğru tabloları içerdiğinden emin ol.
do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime') then
    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'rooms'
    ) then
      alter publication supabase_realtime add table public.rooms;
    end if;

    if not exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'players'
    ) then
      alter publication supabase_realtime add table public.players;
    end if;

    -- names artık istemciye kapalı; realtime yayınından da çıkarılır.
    if exists (
      select 1 from pg_publication_tables
      where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'names'
    ) then
      alter publication supabase_realtime drop table public.names;
    end if;
  end if;
end $$;

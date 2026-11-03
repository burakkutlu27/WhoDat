-- Faz 4: isteğe bağlı hesap (Google ile giriş).
--
-- Hesapsız oyun aynen sürer; profil cihaz kimliğine (device_id) bağlı kalır. Kullanıcı giriş
-- yapınca o cihazın profili hesabına bağlanır (user_id); başka cihazdan girişte geçmişler
-- sunucuda birleştirilir. Hesap silinince (Google Play şartı) profil ve tüm maç geçmişi
-- cascade ile silinir.
--
-- ÖNKOŞUL: 20261001100000_close_profile_tables.sql uygulanmış olmalı (device_id gizli).

alter table public.player_profiles
  add column if not exists user_id uuid unique references auth.users(id) on delete cascade;

create index if not exists idx_player_profiles_user_id on public.player_profiles(user_id);

-- Birden çok cihaz aynı hesaba bağlanabilsin diye device_id artık hesabın birincil anahtarı
-- değil; aynı kullanıcının ek cihazları ayrı tabloda tutulur.
create table if not exists public.profile_devices (
  device_id  text primary key,
  profile_id uuid not null references public.player_profiles(id) on delete cascade,
  linked_at  timestamptz not null default now()
);

alter table public.profile_devices enable row level security;
revoke all on public.profile_devices from anon, authenticated;

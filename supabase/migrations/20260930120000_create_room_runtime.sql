-- Oda runtime state'i.
--
-- Can, pas hakkı, Israrcı bütçesi, Hız turu verisi, Ortak Hedef hedefi/logu, açık oylama
-- gibi oyun state'i daha önce yalnızca sunucu sürecinin belleğinde duruyordu. Serverless
-- (Vercel) ortamda istekler farklı instance'lara düştüğü için bu state kayboluyor ya da
-- çatallanıyordu. Artık her istek bu satırı okuyup yazıyor (bkz. src/lib/game/runtimeState.ts).
--
-- `rooms`/`players` anon'a okumaya açık ve realtime'da yayınlanıyor; bu tablo ise gizli
-- bilgi (Ortak Hedef'in hedef ismi, kimin hangi ismi aldığı) taşıdığı için `names` gibi
-- tamamen kapalı ve realtime yayınında değil. Yalnızca service_role erişir.

create table if not exists public.room_runtime (
  room_id    uuid primary key references public.rooms(id) on delete cascade,
  state      jsonb not null default '{}'::jsonb,
  -- İyimser kilit: yazma yalnızca okunan sürüm hâlâ güncelse başarılı olur.
  version    integer not null default 1 check (version > 0),
  updated_at timestamptz not null default now()
);

alter table public.room_runtime enable row level security;

-- Politika tanımlanmıyor: RLS açıkken politikasız tablo anon/authenticated'a tümüyle kapalıdır.
revoke all on public.room_runtime from anon, authenticated;

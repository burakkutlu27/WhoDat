-- Odalara güncellenme / son hareket zamanı ekler, trigger ile otomatik günceller,
-- eski odaları kapatan fonksiyon tanımlar ve mevcut tüm açık odaları 'closed' yapar.

-- 1. rooms tablosuna updated_at sütunu ekle
alter table public.rooms
  add column if not exists updated_at timestamptz default now();

-- 2. Mevcut kayıtların updated_at değerini created_at ile doldur
update public.rooms
   set updated_at = coalesce(created_at, now())
 where updated_at is null;

-- 3. Otomatik updated_at tetikleyicisi (trigger)
create or replace function public.handle_rooms_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists on_rooms_updated on public.rooms;
create trigger on_rooms_updated
  before update on public.rooms
  for each row
  execute function public.handle_rooms_updated_at();

-- 4. Sorgu performansı için indeksler
create index if not exists idx_rooms_status_updated_at on public.rooms (status, updated_at);

-- 5. Zaman aşımına uğramış odaları toplu kapatan yardımcı fonksiyon
create or replace function public.close_expired_rooms(p_inactivity_minutes integer default 60)
returns integer as $$
declare
  v_count integer;
begin
  update public.rooms
     set status = 'closed',
         is_game_active = false
   where status != 'closed'
     and coalesce(updated_at, created_at) < now() - (p_inactivity_minutes || ' minutes')::interval;

  get diagnostics v_count = row_count;
  return v_count;
end;
$$ language plpgsql security definer;

-- 6. Test aşaması temizliği: Mevcut tüm açık odaları 'closed' durumuna getir
update public.rooms
   set status = 'closed',
       is_game_active = false
 where status != 'closed';

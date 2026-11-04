-- Odalara güncellenme / son hareket zamanı ekler, trigger ile otomatik günceller ve
-- eski odaları kapatan fonksiyonu tanımlar.
--
-- Prod'a 2026-11-04'te uygulandı (o güne dek uygulanmamıştı: motorun "değişti" sinyali
-- olan rooms.updated_at güncellemeleri sessizce hata veriyor, oda süresi kuruluş anından
-- sayılıyordu). Uygulamadan önce iki değişiklik yapıldı:
--   * "tüm açık odaları kapat" test temizliği çıkarıldı (canlıdaki oyunları bitirirdi),
--   * close_expired_rooms anon/authenticated'a kapatıldı (security definer; herkes
--     p_inactivity_minutes = 0 ile tüm odaları kapatabilirdi).

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
$$ language plpgsql set search_path = '';

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
$$ language plpgsql security definer set search_path = '';

-- Yalnızca sunucu (service_role) çağırır.
revoke execute on function public.close_expired_rooms(integer) from public, anon, authenticated;
grant execute on function public.close_expired_rooms(integer) to service_role;

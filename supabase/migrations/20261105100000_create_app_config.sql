-- Uygulama ayarları (anahtar/değer). İlk kullanım: zorunlu güncelleme.
--
-- min_android_build: Play'deki Android versionCode'u bundan küçük olan uygulama "güncel değil"
-- ekranında kilitlenir. Yükseltmeden önce yeni sürüm Play'de yayında olmalı; yoksa kullanıcı
-- güncelleme bulamaz ve uygulamayı açamaz.
--
-- Değeri yalnızca sunucu okur (/api/app-version, service_role); anon/authenticated'a kapalı.

create table if not exists public.app_config (
  key text primary key,
  value text not null,
  updated_at timestamptz not null default now()
);

alter table public.app_config enable row level security;
revoke all on public.app_config from anon, authenticated;

insert into public.app_config (key, value)
values ('min_android_build', '1')
on conflict (key) do nothing;

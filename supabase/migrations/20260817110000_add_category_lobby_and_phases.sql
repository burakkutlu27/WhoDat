-- Kategoriye Özel Lobi ve 3 Fazlı Lobi Desteği
-- rooms tablosuna kategori ve faz yönetimi sütunları eklenir

alter table public.rooms
  add column if not exists category_mode text default 'single',
  add column if not exists selected_category text default 'all',
  add column if not exists phase_categories jsonb default '["unluler", "sporcular", "cizgi_karakterler"]'::jsonb,
  add column if not exists current_phase integer default 1,
  add column if not exists total_phases integer default 1;

comment on column public.rooms.category_mode is 'Lobi kategori modu: single (tek kategori) veya multi_phase (3 fazlı)';
comment on column public.rooms.selected_category is 'Tek kategori modunda seçilen kategori: all, unluler, sporcular, tarihi_kisiler, cizgi_karakterler, dizi_film_karakterleri';
comment on column public.rooms.phase_categories is '3 fazlı modda sırayla oynanacak kategoriler listesi';
comment on column public.rooms.current_phase is '3 fazlı modda aktif olan faz (1, 2, 3)';
comment on column public.rooms.total_phases is 'Toplam faz sayısı (single modda 1, multi_phase modda 3)';

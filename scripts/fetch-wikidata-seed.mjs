/**
 * Tek seferlik (offline) Wikipedia / Wikidata veri çekme script'i.
 *
 * Canlı oyunda API ÇAĞRILMAZ.
 * Bu script geliştirme ortamında 1 kez çalıştırılır,
 * binlerce ünlü ismini çeker ve doğrudan `famousPeopleData.ts` ile
 * SQL migration dosyasına yerel (hardcoded) veri olarak yazar.
 */

import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

const CATEGORY_MAPPINGS = [
  {
    category: 'unluler',
    wikiCategories: [
      'Türk_erkek_sinema_oyuncuları',
      'Türk_kadın_sinema_oyuncuları',
      'Türk_erkek_dizi_oyuncuları',
      'Türk_kadın_dizi_oyuncuları',
      'Türk_pop_şarkıcıları',
      'Türk_rock_şarkıcıları',
      'Türk_rap_şarkıcıları',
      'Türk_halk_müziği_şarkıcıları',
      'Türk_sanat_müziği_şarkıcıları',
      'Türk_komedyenler',
      'Türk_televizyon_sunucuları',
      'Amerikalı_erkek_sinema_oyuncuları',
      'Amerikalı_kadın_sinema_oyuncuları',
      'İngiliz_erkek_sinema_oyuncuları',
      'İngiliz_kadın_sinema_oyuncuları',
      'Amerikalı_pop_şarkıcıları',
      'İngiliz_şarkıcılar',
      'Altın_Küre_Ödülü_sahipleri',
    ],
  },
  {
    category: 'tarihi_kisiler',
    wikiCategories: [
      'Osmanlı_padişahları',
      'Büyük_Selçuklu_Devleti_hükümdarları',
      'Türkiye_cumhurbaşkanları',
      'Türk_hükümdarlar',
      'Roma_imparatorları',
      'Antik_Yunan_filozofları',
      'Nobel_Fizik_Ödülü_sahipleri',
      'Nobel_Kimya_Ödülü_sahipleri',
      'Nobel_Fizyoloji_veya_Tıp_Ödülü_sahipleri',
      'Nobel_Edebiyat_Ödülü_sahipleri',
      'Rönesans_sanatçıları',
      'Klasik_müzik_bestecileri',
      'Tarihteki_kadın_hükümdarlar',
      'Alman_filozoflar',
      'Fransız_filozoflar',
      'Antik_Yunan_matematikçileri',
      'Astronomlar',
    ],
  },
  {
    category: 'cizgi_karakterler',
    wikiCategories: [
      'Disney_karakterleri',
      'Looney_Tunes_karakterleri',
      'Marvel_Comics_karakterleri',
      'DC_Comics_karakterleri',
      'Süper_kahramanlar',
      'Anime_ve_manga_karakterleri',
      'Video_oyunu_karakterleri',
      'Kurgusal_dedektifler',
      'Çizgi_roman_karakterleri',
      'Kurgusal_büyücüler',
    ],
  },
  {
    category: 'sporcular',
    wikiCategories: [
      'Türk_erkek_futbolcular',
      'Türk_kadın_futbolcular',
      'Türk_erkek_basketbolcular',
      'Türk_kadın_voleybolcular',
      'Türkiye_millî_futbol_takımı_futbolcuları',
      'Süper_Lig_futbolcuları',
      'Altın_Top_kazananları',
      'FIFA_Dünya_Kupası_kazanan_futbolcular',
      'NBA_oyuncuları',
      'Türk_Olimpiyat_sporcuları',
      'Formula_1_Dünya_Sürücüler_Şampiyonları',
      'Grand_Slam_tekler_şampiyonları',
      'Türk_güreşçiler',
      'Türk_boksörler',
    ],
  },
  {
    category: 'dizi_film_karakterleri',
    wikiCategories: [
      'Türk_televizyon_dizisi_karakterleri',
      'Sinema_karakterleri',
      'Harry_Potter_karakterleri',
      'Yüzüklerin_Efendisi_karakterleri',
      'Star_Wars_karakterleri',
      'Taht_Oyunları_karakterleri',
      'Breaking_Bad_karakterleri',
      'Kurgusal_ajanlar',
      'Kurgusal_suçlular',
      'Kurgusal_korsanlar',
    ],
  },
]

async function fetchCategoryMembers(categoryName) {
  const url = `https://tr.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:${encodeURIComponent(categoryName)}&cmlimit=250&cmtype=page&format=json&origin=*`
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'WhoDatTriviaBot/2.0 (https://whodat.app; contact@whodat.app)',
        Accept: 'application/json',
      },
    })
    if (!res.ok) return []
    const data = await res.json()
    const members = data.query?.categorymembers || []
    return members.map((m) => m.title)
  } catch {
    return []
  }
}

function cleanTitle(title) {
  let clean = title.replace(/\s*\([^)]*\)/g, '').trim()
  if (
    clean.startsWith('Liste') ||
    clean.startsWith('Taslak') ||
    clean.startsWith('Kategori') ||
    clean.startsWith('Dosya') ||
    clean.includes('Ödülü') ||
    clean.includes('şablon') ||
    clean.includes('listesi') ||
    clean.includes('maddesi') ||
    clean.includes('sezonu') ||
    clean.includes('filmleri') ||
    clean.includes('dizileri') ||
    clean.length < 2 ||
    clean.length > 45
  ) {
    return null
  }
  return clean
}

async function main() {
  console.log('🚀 Wikipedia açık veritabanından isimler çekiliyor (Tek Seferlik)...')

  const allEntries = []
  const seenNames = new Set()

  for (const group of CATEGORY_MAPPINGS) {
    console.log(`\n📦 Kategori taranıyor: [${group.category}]`)
    let categoryCount = 0

    for (const catName of group.wikiCategories) {
      await sleep(250) // Wikipedia rate limit koruması
      const titles = await fetchCategoryMembers(catName)
      for (const rawTitle of titles) {
        const cleaned = cleanTitle(rawTitle)
        if (!cleaned) continue
        const key = cleaned.toLocaleLowerCase('tr')
        if (!seenNames.has(key)) {
          seenNames.add(key)
          allEntries.push({ name: cleaned, category: group.category })
          categoryCount++
        }
      }
    }
    console.log(`  ✓ ${group.category}: ${categoryCount} isim bulundu`)
  }

  console.log(`\n🎉 Toplam ${allEntries.length} tekil isim çekildi!`)

  if (allEntries.length < 100) {
    console.error('❌ Yeterli veri çekilemedi, dosyalar güncellenmedi.')
    return
  }

  // 1. famousPeopleData.ts oluştur
  const tsContent = `export type FamousPersonCategory =
  | 'all'
  | 'unluler'
  | 'tarihi_kisiler'
  | 'cizgi_karakterler'
  | 'sporcular'
  | 'dizi_film_karakterleri'

export interface CategoryInfo {
  id: FamousPersonCategory
  label: string
  icon: string
  color: string
}

export const CATEGORIES: CategoryInfo[] = [
  { id: 'all', label: 'Tümü / Karışık', icon: '🎲', color: 'pencil-yellow' },
  { id: 'unluler', label: 'Ünlüler', icon: '🎭', color: 'pencil-red' },
  { id: 'tarihi_kisiler', label: 'Tarihi Kişiler', icon: '🏛️', color: 'pencil-blue' },
  { id: 'cizgi_karakterler', label: 'Çizgi Karakterler', icon: '🎨', color: 'pencil-purple' },
  { id: 'sporcular', label: 'Sporcular', icon: '⚽', color: 'pencil-green' },
  { id: 'dizi_film_karakterleri', label: 'Dizi & Film', icon: '🎬', color: 'pencil-orange' },
]

export interface FamousPersonItem {
  id: string
  name: string
  category: Exclude<FamousPersonCategory, 'all'>
}

export interface FamousPersonSeed {
  name: string
  category: string
}

export const FAMOUS_PEOPLE_SEED: FamousPersonSeed[] = ${JSON.stringify(allEntries, null, 2)}
`

  const tsPath = resolve(process.cwd(), 'src/lib/game/famousPeopleData.ts')
  writeFileSync(tsPath, tsContent, 'utf-8')
  console.log(`✅ ${tsPath} yerel dosyası güncellendi.`)

  // 2. Migration SQL oluştur
  const sqlValues = allEntries
    .map((e) => `  ('${e.name.replace(/'/g, "''")}', '${e.category}')`)
    .join(',\n')

  const sqlContent = `-- Ünlü/Karakter Veritabanı Tablosu ve Kapsamlı Başlangıç Veri Seti (${allEntries.length} Kayıt)

create table if not exists public.famous_people (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null check (category in ('unluler', 'tarihi_kisiler', 'cizgi_karakterler', 'sporcular', 'dizi_film_karakterleri')),
  created_at timestamptz default now()
);

create index if not exists famous_people_category_idx on public.famous_people (category);
create index if not exists famous_people_name_idx on public.famous_people (name);

alter table public.famous_people enable row level security;

create policy "famous_people_select_policy"
  on public.famous_people
  for select
  using (true);

insert into public.famous_people (name, category) values
${sqlValues}
on conflict do nothing;
`

  const sqlPath = resolve(process.cwd(), 'supabase/migrations/20260817100000_create_famous_people.sql')
  writeFileSync(sqlPath, sqlContent, 'utf-8')
  console.log(`✅ ${sqlPath} migration dosyası güncellendi.`)
}

main().catch(console.error)

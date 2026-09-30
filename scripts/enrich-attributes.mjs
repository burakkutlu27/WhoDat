/**
 * Ünlü veri setini botların soru cevaplayabilmesi için özelliklerle zenginleştirir.
 *
 * Canlı oyunda API çağrılmaz: bu script geliştirmede çalıştırılır, çıktıyı
 * src/lib/game/famousPeopleAttributes.ts dosyasına yazar ve o dosya commit'lenir.
 *
 * Akış:
 *   1. Her isim Wikidata'da aranır (önce tr, sonra en); adaylar arasından kategoriye uyan
 *      (gerçek kişi → insan, kurgusal → karakter) ve en çok Wikipedia maddesi olan seçilir.
 *   2. Seçilen öğelerden cinsiyet, doğum/ölüm yılı, uyruk, meslek ve karakter türü okunur.
 *   3. Meslekler alanlara (oyunculuk, müzik, spor, bilim …) çevrilir; kategori/alt kategori
 *      bilgisi eksikleri tamamlar.
 *
 * Wikidata yanıtları scripts/.cache/wikidata/ altında önbelleğe alınır (gitignore'da):
 * yarıda kesilirse kaldığı yerden devam eder, yeniden çalıştırmak ağa gitmez.
 *
 * Kullanım: node scripts/enrich-attributes.mjs
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const ROOT = resolve(import.meta.dirname, '..')
const CACHE_DIR = resolve(ROOT, 'scripts/.cache/wikidata')
const SEED_FILE = resolve(ROOT, 'src/lib/game/famousPeopleData.ts')
const OUT_FILE = resolve(ROOT, 'src/lib/game/famousPeopleAttributes.ts')

const API = 'https://www.wikidata.org/w/api.php'
// Wikimedia politikası açıklayıcı bir User-Agent istiyor.
const USER_AGENT = 'KimBuDataScript/1.0 (https://whodat.burakkutlu.com; offline dataset build)'
const SEARCH_CONCURRENCY = 4

const REAL_CATEGORIES = new Set(['unluler', 'sporcular', 'tarihi_kisiler'])

const HUMAN = 'Q5'
const MALE = new Set(['Q6581097', 'Q44148', 'Q2449503'])
const FEMALE = new Set(['Q6581072', 'Q43445', 'Q1052281'])
const TURKISH_STATES = new Set(['Q43', 'Q12560']) // Türkiye, Osmanlı İmparatorluğu
const FICTIONAL_TYPES = new Set([
  'Q95074', // kurgusal karakter
  'Q15632617', // kurgusal insan
  'Q15711870', // animasyon karakteri
  'Q15773317', // televizyon karakteri
  'Q15773347', // film karakteri
  'Q1114461', // çizgi roman karakteri
  'Q188784', // süper kahraman
  'Q3658341', // edebi karakter
  'Q1569167', // video oyunu karakteri
  'Q21070568', // kurgusal hayvan karakteri
])
const ANIMATED_TYPES = new Set(['Q15711870', 'Q1114461'])
const SUPERHERO_TYPES = new Set(['Q188784', 'Q1062123'])

// Meslek etiketi (en) → oyun alanı. Soru bankasındaki alan sorularıyla birebir.
const DOMAIN_PATTERNS = {
  acting: /\b(actor|actress|voice actor)\b/,
  film: /\b(film director|director|filmmaker|screenwriter|film producer|cinematographer)\b/,
  music: /\b(singer|musician|composer|rapper|songwriter|guitarist|pianist|disc jockey|drummer|violinist|conductor|lyricist|record producer)\b/,
  art: /\b(painter|sculptor|visual artist|artist|architect|photographer|fashion designer|illustrator|cartoonist)\b/,
  sport: /\b(footballer|association football player|basketball player|volleyball player|tennis player|athlete|boxer|wrestler|swimmer|cyclist|racing driver|gymnast|sprinter|runner|weightlifter|skier|fencer|judoka|martial artist|mixed martial artist|golfer|chess player|coach|sport shooter|archer)\b/,
  science: /\b(scientist|physicist|chemist|mathematician|biologist|astronomer|engineer|inventor|physician|economist|historian|academic|university teacher|computer scientist|geographer|explorer)\b/,
  literature: /\b(writer|poet|novelist|author|playwright|philosopher|essayist|linguist)\b/,
  politics: /\b(politician|diplomat|monarch|sultan|emperor|statesperson|military officer|military personnel|sovereign|ruler|grand vizier|head of state|revolutionary)\b/,
  media: /\b(television presenter|presenter|journalist|youtuber|influencer|streamer|comedian|podcaster|entertainer|model)\b/,
  business: /\b(businessperson|entrepreneur|business executive|chef|investor)\b/,
}

// Alt kategori → alan: Wikidata'da bulunamayan isimlerde de alan soruları cevaplanabilsin.
const SUBCATEGORY_DOMAINS = {
  oyuncu: ['acting'], yonetmen: ['film'], komedyen: ['media', 'acting'], muzisyen: ['music'], besteci: ['music'],
  ressam: ['art'], heykeltiras: ['art'], moda_tasarimci: ['art'],
  bilim_insani: ['science'], akademisyen_yazar: ['science', 'literature'], kasif: ['science'],
  yazar_sair: ['literature'], filozof: ['literature'],
  siyasetci: ['politics'], dunya_lideri: ['politics'], osmanli_padisahlari: ['politics'], osmanli_devlet_adamlari: ['politics'],
  osmanli_turk_lideri: ['politics'], cumhuriyet_donemi_liderleri: ['politics'], kraliyet_ailesi: ['politics'],
  gazeteci_sunucu: ['media'], youtuber: ['media'], youtuber_yayinci: ['media'], instagram_fenomeni: ['media'],
  tiktoker: ['media'], twitch_yayincisi: ['media'], podcast_yapimcisi: ['media'],
  is_insani: ['business'], sef_asci: ['business'],
}

const sleep = (ms) => new Promise((done) => setTimeout(done, ms))

function cacheFile(name) {
  return resolve(CACHE_DIR, `${name}.json`)
}

function loadCache(name) {
  const file = cacheFile(name)
  return existsSync(file) ? JSON.parse(readFileSync(file, 'utf8')) : {}
}

function saveCache(name, data) {
  writeFileSync(cacheFile(name), JSON.stringify(data))
}

async function api(params, attempt = 0) {
  const url = `${API}?${new URLSearchParams({ format: 'json', maxlag: '5', ...params })}`
  let res
  try {
    res = await fetch(url, { headers: { 'User-Agent': USER_AGENT, Accept: 'application/json' } })
  } catch (error) {
    // Uzun çalışmada sunucu bağlantıyı ara sıra kapatıyor ("other side closed"); geçici say.
    if (attempt >= 6) throw error
    await sleep(1000 * 2 ** attempt)
    return api(params, attempt + 1)
  }
  const retryAfter = Number(res.headers.get('retry-after')) || 0
  if (res.status === 429 || res.status >= 500) {
    if (attempt >= 6) throw new Error(`Wikidata ${res.status}: ${url}`)
    await sleep(Math.max(retryAfter * 1000, 1000 * 2 ** attempt))
    return api(params, attempt + 1)
  }
  const body = await res.json()
  if (body.error?.code === 'maxlag') {
    await sleep(Math.max(retryAfter * 1000, 5000))
    return api(params, attempt + 1)
  }
  if (body.error) throw new Error(`Wikidata hatası: ${body.error.code} ${body.error.info}`)
  return body
}

function loadSeed() {
  const src = readFileSync(SEED_FILE, 'utf8')
  const start = src.indexOf('[', src.indexOf('=', src.indexOf('FAMOUS_PEOPLE_SEED')))
  let depth = 0
  let end = start
  for (; end < src.length; end++) {
    if (src[end] === '[') depth++
    else if (src[end] === ']' && --depth === 0) break
  }
  return JSON.parse(src.slice(start, end + 1))
}

/**
 * Aranacak terimler, öncelik sırasıyla.
 * "Ronaldo (Nazário)" → ["Ronaldo Nazário", "Ronaldo"]: parantez bazen ayırt edici (yalnızca
 * "Ronaldo" Cristiano Ronaldo'ya gider), bazen açıklama ("Superman (Clark Kent)").
 */
function searchTerms(name) {
  const base = name.replace(/\s*\([^)]*\)\s*/g, ' ').replace(/\s+/g, ' ').trim()
  const inner = name.match(/\(([^)]*)\)/)?.[1]?.trim()
  return inner ? [`${base} ${inner}`, base] : [base]
}

async function searchCandidates(people, cache) {
  const pending = people.filter((person) => !(person.name in cache))
  console.log(`Arama: ${people.length - pending.length} önbellekte, ${pending.length} yeni`)

  let done = 0
  async function worker(queue) {
    for (let person = queue.shift(); person; person = queue.shift()) {
      // Her terim için ayrı liste: seçimde öncelikli terimin sonuçları önce denenir.
      const groups = []
      for (const term of searchTerms(person.name)) {
        const ids = new Set()
        for (const language of ['tr', 'en']) {
          const body = await api({ action: 'wbsearchentities', search: term, language, uselang: language, type: 'item', limit: '7' })
          for (const hit of body.search ?? []) ids.add(hit.id)
          if (ids.size >= 3) break
        }
        groups.push([...ids])
      }
      cache[person.name] = groups
      if (++done % 200 === 0) {
        saveCache('search-v2', cache)
        console.log(`  … ${done}/${pending.length}`)
      }
    }
  }
  const queue = [...pending]
  await Promise.all(Array.from({ length: SEARCH_CONCURRENCY }, () => worker(queue)))
  saveCache('search-v2', cache)
}

/**
 * Wikidata iddiaları: "deprecated" (hatalı olduğu bilinen) kayıtlar atlanır, "preferred" olanlar
 * öne alınır. İlk kayda körü körüne güvenmek Rafael Nadal'ı 300 doğumlu yapıyordu.
 */
function rankedClaims(entity, property) {
  const claims = (entity.claims?.[property] ?? []).filter((claim) => claim.rank !== 'deprecated')
  return [...claims.filter((claim) => claim.rank === 'preferred'), ...claims.filter((claim) => claim.rank !== 'preferred')]
}

function claimIds(entity, property) {
  return rankedClaims(entity, property)
    .map((claim) => claim.mainsnak?.datavalue?.value?.id)
    .filter(Boolean)
}

function claimYear(entity, property) {
  const time = rankedClaims(entity, property)[0]?.mainsnak?.datavalue?.value?.time
  if (!time) return null
  const year = Number.parseInt(time.slice(0, time.indexOf('-', 1)), 10)
  return Number.isFinite(year) ? year : null
}

/** Öğeleri 50'lik gruplar halinde çeker; yalnızca oyunun ihtiyaç duyduğu alanları saklar. */
async function fetchEntities(ids, cache) {
  const pending = [...new Set(ids)].filter((id) => !(id in cache))
  console.log(`Öğeler: ${pending.length} yeni`)
  for (let i = 0; i < pending.length; i += 50) {
    const batch = pending.slice(i, i + 50)
    const body = await api({ action: 'wbgetentities', ids: batch.join('|'), props: 'claims|sitelinks' })
    for (const id of batch) {
      const entity = body.entities?.[id]
      if (!entity || entity.missing !== undefined) {
        cache[id] = null
        continue
      }
      cache[id] = {
        types: claimIds(entity, 'P31'),
        sex: claimIds(entity, 'P21'),
        citizenship: claimIds(entity, 'P27'),
        occupations: claimIds(entity, 'P106'),
        born: claimYear(entity, 'P569'),
        died: claimYear(entity, 'P570'),
        fictionalUniverse: claimIds(entity, 'P1080').length + claimIds(entity, 'P1441').length > 0,
        sitelinks: Object.keys(entity.sitelinks ?? {}).length,
      }
    }
    if ((i / 50) % 20 === 0) {
      saveCache('entities-v2', cache)
      console.log(`  … ${Math.min(i + 50, pending.length)}/${pending.length}`)
    }
    await sleep(100)
  }
  saveCache('entities-v2', cache)
}

async function fetchLabels(ids, cache) {
  const pending = [...new Set(ids)].filter((id) => !(id in cache))
  console.log(`Meslek etiketleri: ${pending.length} yeni`)
  for (let i = 0; i < pending.length; i += 50) {
    const batch = pending.slice(i, i + 50)
    const body = await api({ action: 'wbgetentities', ids: batch.join('|'), props: 'labels', languages: 'en' })
    for (const id of batch) cache[id] = body.entities?.[id]?.labels?.en?.value?.toLowerCase() ?? ''
    await sleep(100)
  }
  saveCache('labels', cache)
}

/**
 * Terim grupları öncelik sırasıyla denenir; bir grupta kategoriye uyan aday varsa en çok
 * Wikipedia maddesi olan seçilir (aynı adlı film/şarkı yerine kişinin kendisi).
 */
function pickEntity(person, candidateGroups, entities) {
  const wantsHuman = REAL_CATEGORIES.has(person.category)
  for (const group of candidateGroups) {
    const candidates = group
      .map((id) => ({ id, entity: entities[id] }))
      .filter(({ entity }) => {
        if (!entity) return false
        const isHuman = entity.types.includes(HUMAN)
        if (wantsHuman) return isHuman
        return !isHuman && (entity.fictionalUniverse || entity.types.some((type) => FICTIONAL_TYPES.has(type)))
      })
    candidates.sort((a, b) => b.entity.sitelinks - a.entity.sitelinks)
    if (candidates[0]) return candidates[0]
  }
  return null
}

function buildAttributes(person, picked, labels) {
  const isReal = REAL_CATEGORIES.has(person.category)
  const entity = picked?.entity
  const domains = new Set(SUBCATEGORY_DOMAINS[person.subcategory] ?? [])
  if (person.category === 'sporcular') domains.add('sport')

  let gender = null
  if (entity?.sex.some((id) => MALE.has(id))) gender = 'm'
  else if (entity?.sex.some((id) => FEMALE.has(id))) gender = 'f'

  // Sorular "…alanında mı tanınıyorum?" diye soruyor: bot, yan meslekleri değil insanların
  // bildiği ana alanı cevaplamalı. Wikidata'da ana meslekler genelde ilk sıralarda; sporcular
  // için alan kategoriden zaten kesin (Ronaldinho "müzisyen" sayılmasın).
  if (entity && person.category !== 'sporcular') {
    for (const occupation of entity.occupations.slice(0, 3)) {
      const label = labels[occupation] ?? ''
      for (const [domain, pattern] of Object.entries(DOMAIN_PATTERNS)) {
        if (pattern.test(label)) domains.add(domain)
      }
    }
  }

  const turkishBySubcategory = person.subcategory?.startsWith('turk_') || person.subcategory?.startsWith('osmanli_') ||
    person.subcategory === 'cumhuriyet_donemi_liderleri'
  let turkish = turkishBySubcategory ? true : null
  if (turkish === null && entity && isReal && entity.citizenship.length > 0) {
    turkish = entity.citizenship.some((id) => TURKISH_STATES.has(id))
  }

  // Wikidata'da vandalizm/hata var (Rafael Nadal "300 doğumlu" kayıtlı). Günümüz ünlüleri ve
  // sporcularında 1850 öncesi doğum yılı güvenilmez sayılır; tarihi kişilerde gerçek olabilir.
  const born = entity?.born ?? null
  const bornIsPlausible = born !== null && (person.category === 'tarihi_kisiler' || born >= 1850)
  const birthYear = bornIsPlausible ? born : null

  let alive = null
  if (isReal && entity) {
    if (entity.died !== null) alive = false
    // Doğum yılı bilinen ve ölüm kaydı olmayan kişi: 110 yaşından gençse hayatta say.
    else if (birthYear !== null) alive = new Date().getFullYear() - birthYear < 110
  }

  const types = entity?.types ?? []
  return {
    r: isReal,
    g: gender,
    a: isReal ? alive : false,
    t: turkish,
    y: isReal ? birthYear : null,
    d: isReal ? entity?.died ?? null : null,
    o: [...domains].sort(),
    n: person.category === 'cizgi_karakterler' || types.some((type) => ANIMATED_TYPES.has(type)),
    s: isReal ? false : types.some((type) => SUPERHERO_TYPES.has(type)) ? true : null,
    q: picked?.id ?? null,
  }
}

function writeOutput(attributes) {
  const header = `/**
 * OTOMATİK ÜRETİLDİ — elle düzenleme; \`node scripts/enrich-attributes.mjs\` ile yeniden üret.
 *
 * Botların soru bankasına cevap verebilmesi için isim → özellik tablosu (kaynak: Wikidata +
 * kategori/alt kategori). Bilinmeyen değer \`null\`: bot o soruda çekimser kalır.
 */

export type PersonDomain =
  | 'acting' | 'art' | 'business' | 'film' | 'literature' | 'media' | 'music' | 'politics' | 'science' | 'sport'

export interface PersonAttributes {
  /** Gerçek kişi mi (false: kurgusal karakter) */
  r: boolean
  /** Cinsiyet */
  g: 'm' | 'f' | null
  /** Hayatta mı (kurgusal karakterler için false) */
  a: boolean | null
  /** Türkiye / Osmanlı kökenli mi */
  t: boolean | null
  /** Doğum yılı */
  y: number | null
  /** Ölüm yılı */
  d: number | null
  /** Tanındığı alanlar */
  o: PersonDomain[]
  /** Çizgi film / animasyon / çizgi roman karakteri mi */
  n: boolean
  /** Süper gücü olan bir karakter mi */
  s: boolean | null
  /** Wikidata öğesi (hata ayıklama için) */
  q: string | null
}

export const FAMOUS_PEOPLE_ATTRIBUTES: Record<string, PersonAttributes> = `
  writeFileSync(OUT_FILE, `${header}${JSON.stringify(attributes, null, 0).replace(/},"/g, '},\n  "').replace(/^{/, '{\n  ').replace(/}$/, '\n}')}\n`)
}

mkdirSync(CACHE_DIR, { recursive: true })
// LIMIT=50 gibi bir değerle eşleştirme mantığı küçük bir örnekte denenebilir.
const people = loadSeed().slice(0, Number(process.env.LIMIT) || undefined)

const searchCache = loadCache('search-v2')
await searchCandidates(people, searchCache)

const entityCache = loadCache('entities-v2')
await fetchEntities(Object.values(searchCache).flat(2), entityCache)

const labelCache = loadCache('labels')
await fetchLabels(
  Object.values(entityCache).flatMap((entity) => entity?.occupations ?? []),
  labelCache,
)

const attributes = {}
const stats = { total: 0, matched: 0, gender: 0, alive: 0, turkish: 0, domains: 0 }
for (const person of people) {
  const picked = pickEntity(person, searchCache[person.name] ?? [], entityCache)
  const attrs = buildAttributes(person, picked, labelCache)
  attributes[person.name] = attrs
  stats.total++
  if (attrs.q) stats.matched++
  if (attrs.g) stats.gender++
  if (attrs.a !== null) stats.alive++
  if (attrs.t !== null) stats.turkish++
  if (attrs.o.length) stats.domains++
}
writeOutput(attributes)

const pct = (n) => `${((n / stats.total) * 100).toFixed(1)}%`
console.log(`\n${stats.total} isim → ${OUT_FILE}`)
console.log(`Wikidata eşleşmesi: ${pct(stats.matched)} · cinsiyet: ${pct(stats.gender)} · hayatta: ${pct(stats.alive)} · Türk: ${pct(stats.turkish)} · alan: ${pct(stats.domains)}`)

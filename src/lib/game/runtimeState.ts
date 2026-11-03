import 'server-only'

import { AsyncLocalStorage } from 'node:async_hooks'

import type { Json } from '../database.types'
import { conflict } from '../http'
import { supabaseAdmin } from '../supabaseAdmin'

/**
 * Oda runtime state'inin DB ile eşitlenmesi.
 *
 * Motor oyun state'inin bir kısmını (can, pas hakkı, bütçe, Ortak Hedef, açık oylama …)
 * senkron erişilen bellek Map'lerinde tutar. Serverless ortamda her istek başka bir
 * instance'a düşebildiği için bu Map'ler tek başına güvenilir değil. Yüzlerce senkron
 * çağrıyı async'e çevirmek yerine, her istek bir "oda kapsamı" içinde çalışır:
 *
 *   giriş  → DB'deki sürüm bu instance'ın bildiğinden farklıysa bellek DB'den yüklenir
 *   çıkış  → bellek değiştiyse sürüm kontrolüyle (iyimser kilit) DB'ye yazılır
 *
 * Aynı instance içindeki eşzamanlı istekler oda bazında sıraya sokulur; farklı
 * instance'lar arasındaki çakışmayı `version` sütunu yakalar.
 */

type RoomKeyedStore = Map<string, unknown>

type SerializedValue =
  | null
  | boolean
  | number
  | string
  | SerializedValue[]
  | { [key: string]: SerializedValue }

const MAP_TAG = '__map'
const SET_TAG = '__set'

interface RuntimeGlobals {
  stores: Map<string, RoomKeyedStore>
  /** Belleğin DB'deki hangi sürümle eşit olduğu. Kayıt yoksa bellek DB'ye henüz yazılmamış demektir. */
  versions: Map<string, number>
  /** Son yüklenen/yazılan state'in serileştirilmiş hali; gereksiz yazmayı önler. */
  lastSynced: Map<string, string>
  locks: Map<string, Promise<unknown>>
  /**
   * DB'deki snapshot'ta olup bu süreçte kayıtlı olmayan store'lar. Serverless'ta her route ayrı
   * paketlenebilir; bir store'u tanımayan route yazarken o store'un verisini silmesin diye
   * olduğu gibi geri yazılır.
   */
  foreign: Map<string, Record<string, SerializedValue>>
}

// Store'lar gibi bunlar da HMR yeniden yüklemelerinde kaybolmasın diye globalThis'te.
const globalRef = globalThis as unknown as { __whoDat_runtime?: Partial<RuntimeGlobals> }
const runtimeRef = (globalRef.__whoDat_runtime ??= {})
runtimeRef.stores ??= new Map()
runtimeRef.versions ??= new Map()
runtimeRef.lastSynced ??= new Map()
runtimeRef.locks ??= new Map()
runtimeRef.foreign ??= new Map()
const runtime = runtimeRef as RuntimeGlobals

const activeRooms = new AsyncLocalStorage<ReadonlySet<string>>()

/** Motor, oda anahtarlı bellek store'larını modül yüklenirken buraya kaydeder. */
export function registerRuntimeStores(stores: Record<string, RoomKeyedStore>): void {
  for (const [name, store] of Object.entries(stores)) {
    runtime.stores.set(name, store)
  }
}

function encode(value: unknown): SerializedValue {
  if (value instanceof Map) {
    return { [MAP_TAG]: [...value.entries()].map(([key, item]) => [encode(key), encode(item)]) }
  }
  if (value instanceof Set) {
    return { [SET_TAG]: [...value].map(encode) }
  }
  if (Array.isArray(value)) return value.map(encode)
  if (value && typeof value === 'object') {
    const out: Record<string, SerializedValue> = {}
    for (const [key, item] of Object.entries(value)) {
      // JSON undefined'ı zaten atıyor; açıkça atlamak karşılaştırmayı kararlı tutar.
      if (item !== undefined) out[key] = encode(item)
    }
    return out
  }
  return (value ?? null) as SerializedValue
}

function decode(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(decode)
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>
    if (Array.isArray(record[MAP_TAG])) {
      return new Map((record[MAP_TAG] as Array<[unknown, unknown]>).map(([key, item]) => [decode(key), decode(item)]))
    }
    if (Array.isArray(record[SET_TAG])) {
      return new Set((record[SET_TAG] as unknown[]).map(decode))
    }
    const out: Record<string, unknown> = {}
    for (const [key, item] of Object.entries(record)) out[key] = decode(item)
    return out
  }
  return value
}

/** Odanın tüm store'lardaki kaydını tek bir JSON nesnesine çevirir. */
export function exportRoomRuntime(roomId: string): Record<string, SerializedValue> {
  const snapshot: Record<string, SerializedValue> = { ...runtime.foreign.get(roomId) }
  for (const [name, store] of runtime.stores) {
    if (store.has(roomId)) snapshot[name] = encode(store.get(roomId))
  }
  return snapshot
}

/** Odanın bellek kaydını verilen snapshot ile tamamen değiştirir. */
export function importRoomRuntime(roomId: string, snapshot: Record<string, unknown>): void {
  for (const [name, store] of runtime.stores) {
    if (name in snapshot) store.set(roomId, decode(snapshot[name]))
    else store.delete(roomId)
  }
  const foreign: Record<string, SerializedValue> = {}
  for (const [name, value] of Object.entries(snapshot)) {
    if (!runtime.stores.has(name)) foreign[name] = value as SerializedValue
  }
  if (Object.keys(foreign).length > 0) runtime.foreign.set(roomId, foreign)
  else runtime.foreign.delete(roomId)
}

/** Bu instance'ın oda hakkındaki bellek ve önbellek bilgisini unutur; sonraki kapsam DB'den yükler. */
export function evictRoomRuntime(roomId: string): void {
  for (const store of runtime.stores.values()) store.delete(roomId)
  runtime.versions.delete(roomId)
  runtime.lastSynced.delete(roomId)
  runtime.foreign.delete(roomId)
}

async function hydrate(roomId: string): Promise<void> {
  const { data, error } = await supabaseAdmin()
    .from('room_runtime')
    .select('state, version')
    .eq('room_id', roomId)
    .maybeSingle()
  if (error) throw error

  // Satır yoksa oda henüz hiç yazılmamış: bellekte ne varsa (yeni oda) o geçerli.
  if (!data) return
  if (runtime.versions.get(roomId) === data.version) return

  importRoomRuntime(roomId, (data.state ?? {}) as Record<string, unknown>)
  runtime.versions.set(roomId, data.version)
  // jsonb anahtar sırasını korumaz; referansı DB'den değil bellekten üretiyoruz ki
  // hiçbir şey değişmediğinde karşılaştırma eşit çıksın.
  runtime.lastSynced.set(roomId, JSON.stringify(exportRoomRuntime(roomId)))
}

async function persist(roomId: string): Promise<void> {
  const snapshot = exportRoomRuntime(roomId)
  const serialized = JSON.stringify(snapshot)
  const known = runtime.versions.get(roomId)

  if (serialized === runtime.lastSynced.get(roomId)) return
  if (known === undefined && Object.keys(snapshot).length === 0) return

  const admin = supabaseAdmin()
  const state = snapshot as Json
  const nextVersion = (known ?? 0) + 1

  if (known === undefined) {
    const { error } = await admin.from('room_runtime').insert({ room_id: roomId, state, version: nextVersion })
    if (error) {
      evictRoomRuntime(roomId)
      if (error.code === '23505') throw staleRuntime()
      throw error
    }
  } else {
    const { data, error } = await admin
      .from('room_runtime')
      .update({ state, version: nextVersion, updated_at: new Date().toISOString() })
      .eq('room_id', roomId)
      .eq('version', known)
      .select('version')
    if (error) {
      evictRoomRuntime(roomId)
      throw error
    }
    if (!data || data.length === 0) {
      evictRoomRuntime(roomId)
      throw staleRuntime()
    }
  }

  runtime.versions.set(roomId, nextVersion)
  runtime.lastSynced.set(roomId, serialized)
}

function staleRuntime() {
  return conflict('state_conflict', 'Oyun durumu aynı anda güncellendi. Lütfen tekrar deneyin.')
}

/** Aynı instance'taki eşzamanlı istekleri oda bazında sıraya sokar. */
async function runExclusive<T>(roomId: string, task: () => Promise<T>): Promise<T> {
  const previous = runtime.locks.get(roomId) ?? Promise.resolve()
  const current = previous.catch(() => undefined).then(task)
  const tail = current.catch(() => undefined)
  runtime.locks.set(roomId, tail)
  try {
    return await current
  } finally {
    if (runtime.locks.get(roomId) === tail) runtime.locks.delete(roomId)
  }
}

/**
 * Verilen işi odanın runtime kapsamında çalıştırır.
 *
 * İç içe çağrılar (aynı oda) doğrudan çalışır; aksi halde kilit kendini beklerdi.
 * İş hata fırlatsa bile bellekte yaptığı değişiklikler yazılır: eski davranışta da
 * yarıda kalan bir aksiyonun bellek değişiklikleri kalıcıydı.
 */
export async function withRoomRuntime<T>(roomId: string, task: () => Promise<T>): Promise<T> {
  if (runtime.stores.size === 0) return task()
  if (activeRooms.getStore()?.has(roomId)) return task()

  return runExclusive(roomId, () => {
    const scope = new Set(activeRooms.getStore() ?? [])
    scope.add(roomId)

    return activeRooms.run(scope, async () => {
      await hydrate(roomId)

      let result: T
      try {
        result = await task()
      } catch (taskError) {
        try {
          await persist(roomId)
        } catch {
          // Asıl hata daha anlamlı; yazma hatası önbelleği zaten geçersiz kıldı.
        }
        throw taskError
      }

      await persist(roomId)
      return result
    })
  })
}

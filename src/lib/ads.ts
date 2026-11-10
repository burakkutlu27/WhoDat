'use client'

import { isNativeApp } from './native'

/**
 * AdMob geçiş reklamı (yalnızca uygulamada; web'de her fonksiyon hiçbir şey yapmaz).
 *
 * Reklam birimi kimliği gizli değildir (AndroidManifest.xml'deki APPLICATION_ID gibi istemciye
 * gömülür). Üretimde varsayılan olarak KimBu geçiş reklamı birimi kullanılır; gerekirse
 * NEXT_PUBLIC_ADMOB_INTERSTITIAL_ID ile ezilebilir. Geliştirme ortamında ise Google'ın resmi
 * test birimi kullanılır: geliştirici kendi gerçek reklamını görüp tıklarsa AdMob hesabı
 * askıya alınabilir.
 */

const GOOGLE_TEST_INTERSTITIAL = 'ca-app-pub-3940256099942544/1033173712'
const DEFAULT_PROD_INTERSTITIAL = 'ca-app-pub-2960863530366414/6445160781'
const configuredId = process.env.NEXT_PUBLIC_ADMOB_INTERSTITIAL_ID?.trim() || DEFAULT_PROD_INTERSTITIAL
const useTestAds = process.env.NODE_ENV !== 'production'
const interstitialId = useTestAds ? GOOGLE_TEST_INTERSTITIAL : configuredId

let initPromise: Promise<boolean> | null = null

/** Capacitor hataları düz nesne olarak gelir; console'da `{}` görünmesin diye mesaj ve kod çıkarılır. */
function describe(error: unknown): string {
  if (error && typeof error === 'object') {
    const { message, code } = error as { message?: unknown; code?: unknown }
    if (message || code) return [code, message].filter(Boolean).join(': ')
  }
  return String(error)
}

/** SDK'yı bir kez başlatır ve gerekiyorsa KVKK/GDPR onay formunu (UMP) gösterir. */
export function initAds(): Promise<boolean> {
  if (!isNativeApp()) return Promise.resolve(false)
  initPromise ??= (async () => {
    try {
      const { AdMob, AdmobConsentStatus } = await import('@capacitor-community/admob')
      await AdMob.initialize({ initializeForTesting: useTestAds })
      // Onay sorgusu ayrı yakalanır: AdMob'da gizlilik mesajı henüz yoksa hata verir, ama bu
      // reklamı tamamen kapatmamalı (onaysız kullanıcıya Google kişiselleştirilmemiş reklam gösterir).
      try {
        const consent = await AdMob.requestConsentInfo()
        if (consent.isConsentFormAvailable && consent.status === AdmobConsentStatus.REQUIRED) {
          await AdMob.showConsentForm()
        }
      } catch (error) {
        console.warn(`[ads] onay bilgisi alınamadı: ${describe(error)}`)
      }
      // SDK başarıyla açıldıktan sonra ilk geçiş reklamını arka planda önceden indir:
      void preloadInterstitial()
      return true
    } catch (error) {
      // Reklam altyapısı çalışmasa da oyun çalışmalı.
      console.warn(`[ads] başlatılamadı: ${describe(error)}`)
      return false
    }
  })()
  return initPromise
}

const guardKey = (roomId: string) => `kimbu_ad_${roomId}`

/**
 * Aynı maç için en fazla bir geçiş reklamı: sonuç ekranı yenilenince tekrar çıkmasın.
 * Oda "Tekrar Oyna" ile yeniden kullanıldığından koruma oda kimliğine bağlı ve oyun ekranı
 * açılınca resetInterstitialGuard ile sıfırlanır.
 */
function alreadyShownFor(roomId: string): boolean {
  try {
    if (sessionStorage.getItem(guardKey(roomId))) return true
    sessionStorage.setItem(guardKey(roomId), '1')
  } catch {
    // Depolama kapalıysa sınırlamasız devam et.
  }
  return false
}

/** Yeni maç başladı: bitişinde yine bir geçiş reklamı gösterilebilir. */
export function resetInterstitialGuard(roomId: string): void {
  try {
    sessionStorage.removeItem(guardKey(roomId))
  } catch {
    // Depolama kapalıysa koruma zaten yok.
  }
}

/** Maç sonu geçiş reklamı. Hata olursa sessizce geçer; oyunu asla engellemez. */
export async function showInterstitialOnce(roomId: string): Promise<void> {
  if (!isNativeApp() || alreadyShownFor(roomId)) return
  // Bu maçın reklamı burada gösterildi; ana sayfaya dönüşte ikincisi çıkmasın.
  clearInterstitialPending()
  await showInterstitial()
}

/**
 * Maçtan ana sayfaya dönüş reklamı. Skor ekranına hiç gelinmeden çıkılan maçlarda (botlu
 * oyunda "Çık", maç ortasında ayrılma) reklam hiç gösterilmiyordu. Oyun ekranı açılınca
 * işaretlenir, ana sayfa açılınca bir kez gösterilir. Uygulama açılışında işaret olmadığı
 * için reklam çıkmaz.
 */
const PENDING_KEY = 'kimbu_ad_pending'

/** `test`: ana sayfadaki test düğmesi; dönüşte Google'ın test birimi gösterilir. */
export function markInterstitialPending(kind: 'match' | 'test' = 'match'): void {
  try {
    // Test işareti, araya giren bir maç işaretiyle ezilmesin (test birimi güvenli olan).
    if (kind === 'match' && sessionStorage.getItem(PENDING_KEY) === 'test') return
    sessionStorage.setItem(PENDING_KEY, kind)
  } catch {
    // Depolama kapalıysa dönüş reklamı yok; maç sonu reklamı yine çalışır.
  }
}

function clearInterstitialPending(): void {
  try {
    sessionStorage.removeItem(PENDING_KEY)
  } catch {
    // Depolama kapalı.
  }
}

/** Bekleyen dönüş reklamını gösterir. Test işaretinde hata metnini döndürür (cihazda görünsün). */
export async function showPendingInterstitial(): Promise<{ kind: 'match' | 'test'; error: string | null } | null> {
  if (!isNativeApp()) return null
  let kind: string | null
  try {
    kind = sessionStorage.getItem(PENDING_KEY)
  } catch {
    return null
  }
  if (kind !== 'match' && kind !== 'test') return null
  clearInterstitialPending()
  const error = kind === 'test' ? await showInterstitial(GOOGLE_TEST_INTERSTITIAL, true) : await showInterstitial()
  return { kind, error }
}

/**
 * Reklamı cihazda denemek için her maçı bitirmek gerekmesin. Uygulama canlı siteyi açtığı için
 * düğme üretimde de çalışmalı; ama herkes görmesin diye gizli: ana sayfa başlığına 5 dokunuş
 * cihazda açar (bkz. AppHome). Geliştirmede her zaman açık.
 */
const AD_TEST_KEY = 'kimbu_ad_test'

export function isAdTestUnlocked(): boolean {
  if (process.env.NODE_ENV !== 'production') return true
  try {
    return localStorage.getItem(AD_TEST_KEY) === '1'
  } catch {
    return false
  }
}

export function unlockAdTest(): void {
  try {
    localStorage.setItem(AD_TEST_KEY, '1')
  } catch {
    // Depolama kapalıysa düğme yalnızca bu oturumda görünür.
  }
}

let isInterstitialPrepared = false
let preparePromise: Promise<boolean> | null = null

/**
 * Geçiş reklamını arka planda önceden indirip RAM'e alır (preload/pre-cache).
 * Bu sayede maç bittiğinde veya ana sayfaya dönüldüğünde reklam gecikmesiz (0ms) açılır.
 */
export async function preloadInterstitial(adId = interstitialId, isTesting = useTestAds): Promise<boolean> {
  if (!isNativeApp()) return false
  if (!(await initAds())) return false
  if (isInterstitialPrepared) return true
  if (preparePromise) return preparePromise

  preparePromise = (async () => {
    try {
      const { AdMob } = await import('@capacitor-community/admob')
      await AdMob.prepareInterstitial({ adId, isTesting })
      isInterstitialPrepared = true
      return true
    } catch (error) {
      console.warn(`[ads] preload başarısız: ${describe(error)}`)
      isInterstitialPrepared = false
      return false
    } finally {
      preparePromise = null
    }
  })()

  return preparePromise
}

/**
 * Test düğmesi her zaman Google'ın test birimini kullanır (markInterstitialPending('test')):
 * geliştiricinin kendi gerçek reklamına dokunması AdMob hesabını askıya aldırabilir.
 */
async function showInterstitial(adId = interstitialId, isTesting = useTestAds): Promise<string | null> {
  if (!(await initAds())) return 'Reklam altyapısı başlatılamadı.'
  try {
    const { AdMob } = await import('@capacitor-community/admob')
    if (!isInterstitialPrepared) {
      await AdMob.prepareInterstitial({ adId, isTesting })
    }
    isInterstitialPrepared = false
    await AdMob.showInterstitial()
    // Gösterimden hemen sonra bir sonraki reklamı arka planda önceden hazırla:
    void preloadInterstitial(adId, isTesting)
    return null
  } catch (error) {
    isInterstitialPrepared = false
    const reason = describe(error)
    console.warn(`[ads] geçiş reklamı gösterilemedi: ${reason}`)
    return reason
  }
}

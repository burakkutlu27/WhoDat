'use client'

import { isNativeApp } from './native'

/**
 * AdMob geçiş reklamı (yalnızca uygulamada; web'de her fonksiyon hiçbir şey yapmaz).
 *
 * Reklam birimi kimliği NEXT_PUBLIC_ADMOB_INTERSTITIAL_ID'den gelir. Kimlik yoksa veya üretim
 * dışındaysak Google'ın resmi test birimi kullanılır: geliştirici kendi gerçek reklamını görüp
 * tıklarsa AdMob hesabı askıya alınabilir.
 */

const GOOGLE_TEST_INTERSTITIAL = 'ca-app-pub-3940256099942544/1033173712'
const configuredId = process.env.NEXT_PUBLIC_ADMOB_INTERSTITIAL_ID?.trim()
const useTestAds = process.env.NODE_ENV !== 'production' || !configuredId
const interstitialId = useTestAds ? GOOGLE_TEST_INTERSTITIAL : configuredId!

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
  await showInterstitial()
}

/** Geliştirmede reklamı denemek için her maçı bitirmek gerekmesin (üretimde buton hiç çıkmaz). */
export const canTestAds = process.env.NODE_ENV !== 'production'

export async function showTestInterstitial(): Promise<void> {
  if (!canTestAds || !isNativeApp()) return
  await showInterstitial()
}

async function showInterstitial(): Promise<void> {
  if (!(await initAds())) return
  try {
    const { AdMob } = await import('@capacitor-community/admob')
    await AdMob.prepareInterstitial({ adId: interstitialId, isTesting: useTestAds })
    await AdMob.showInterstitial()
  } catch (error) {
    console.warn(`[ads] geçiş reklamı gösterilemedi: ${describe(error)}`)
  }
}

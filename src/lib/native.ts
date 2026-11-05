'use client'

import { Capacitor } from '@capacitor/core'

/**
 * Native (Capacitor) köprüsü. Web'de her fonksiyon sessizce hiçbir şey yapmaz; eklentiler
 * yalnızca uygulama içinde dinamik yüklenir ki web paketi büyümesin.
 */

const SITE_URL = 'https://whodat.burakkutlu.com'
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.burakkutlu.kimbu'

/**
 * Yüklü uygulamanın versionCode'u Supabase'deki eşiğin altındaysa true. Kontrol web kodunda
 * olduğu için eski sürümlerde de çalışır. Hata olursa (ağ, eşik okunamadı) false: uygulamayı
 * kilitlemek, güncel olmamasından daha kötü.
 */
export async function isUpdateRequired(): Promise<boolean> {
  if (!isNativeApp()) return false
  try {
    const { App } = await import('@capacitor/app')
    const [info, config] = await Promise.all([
      App.getInfo(),
      fetch('/api/app-version', { cache: 'no-store' }).then((res) => res.json() as Promise<{ minAndroidBuild?: number }>),
    ])
    const installed = Number.parseInt(info.build, 10)
    return Number.isFinite(installed) && installed < (config.minAndroidBuild ?? 0)
  } catch {
    return false
  }
}

/** Play Store sayfasını açar; Capacitor başka alan adlarını sistemde (Play uygulamasında) açar. */
export function openPlayStore(): void {
  window.location.href = PLAY_STORE_URL
}

export function isNativeApp(): boolean {
  return Capacitor.isNativePlatform()
}

/** Paylaşım menüsü destekleniyor mu (uygulama veya dokunmatik cihazda Web Share). */
export function canShareInvite(): boolean {
  if (isNativeApp()) return true
  return typeof navigator !== 'undefined' && typeof navigator.share === 'function' &&
    window.matchMedia('(pointer: coarse)').matches
}

/**
 * Oda davetini sistemin paylaşım menüsüyle gönderir. Paylaşım yapıldıysa ya da kullanıcı
 * vazgeçtiyse true; desteklenmiyorsa false (çağıran panoya kopyalamaya döner).
 */
export async function shareRoomInvite(roomCode: string): Promise<boolean> {
  const url = `${SITE_URL}/room/join?code=${encodeURIComponent(roomCode)}`
  const text = `KimBu'da odama katıl! Oda kodu: ${roomCode}`
  try {
    if (isNativeApp()) {
      const { Share } = await import('@capacitor/share')
      await Share.share({ title: 'KimBu', text, url, dialogTitle: 'Arkadaşını davet et' })
      return true
    }
    if (canShareInvite()) {
      await navigator.share({ title: 'KimBu', text, url })
      return true
    }
  } catch (error) {
    // Kullanıcının paylaşım menüsünü kapatması hata değil.
    if (error instanceof Error && /cancel|abort/i.test(`${error.name} ${error.message}`)) return true
  }
  return false
}

export type HapticKind = 'turn' | 'vote' | 'success' | 'error'

/** Kısa titreşim — yalnızca uygulamada; dikkat isteyen anlarda (sıra, oylama). */
export async function haptic(kind: HapticKind): Promise<void> {
  if (!isNativeApp()) return
  try {
    const { Haptics, ImpactStyle, NotificationType } = await import('@capacitor/haptics')
    if (kind === 'success') await Haptics.notification({ type: NotificationType.Success })
    else if (kind === 'error') await Haptics.notification({ type: NotificationType.Error })
    else await Haptics.impact({ style: kind === 'turn' ? ImpactStyle.Heavy : ImpactStyle.Medium })
  } catch {
    // Titreşim desteklenmiyorsa sessiz geç.
  }
}

/** kimbu://join/ABC123 veya https://…/room/join?code=ABC123 → oda kodu. */
export function roomCodeFromUrl(rawUrl: string): string | null {
  try {
    const url = new URL(rawUrl)
    if (url.protocol === 'kimbu:' && url.hostname === 'join') {
      const code = url.pathname.replace(/^\//, '')
      return /^[A-Z0-9]{6}$/i.test(code) ? code.toUpperCase() : null
    }
    const code = url.searchParams.get('code')
    return url.pathname === '/room/join' && code && /^[A-Z0-9]{6}$/i.test(code) ? code.toUpperCase() : null
  } catch {
    return null
  }
}

/**
 * Uygulama açılışında bir kez: açılış ekranı, durum çubuğu, Android geri tuşu ve davet
 * bağlantıları. `navigate` Next router'ın push'u.
 */
export async function initNativeShell(navigate: (path: string) => void): Promise<() => void> {
  if (!isNativeApp()) return () => undefined

  const [{ App }, { SplashScreen }, { StatusBar, Style }] = await Promise.all([
    import('@capacitor/app'),
    import('@capacitor/splash-screen'),
    import('@capacitor/status-bar'),
  ])

  const isDark = document.documentElement.classList.contains('dark')
  await StatusBar.setStyle({ style: isDark ? Style.Dark : Style.Light }).catch(() => undefined)
  await StatusBar.setBackgroundColor({ color: isDark ? '#1A1814' : '#F5F0E8' }).catch(() => undefined)
  await SplashScreen.hide().catch(() => undefined)

  const handles = await Promise.all([
    // Oyun ortasında geri tuşu uygulamayı kapatmasın: önce geri git, gidecek yer yoksa arka plana al.
    App.addListener('backButton', ({ canGoBack }) => {
      if (canGoBack) window.history.back()
      else void App.minimizeApp()
    }),
    App.addListener('appUrlOpen', ({ url }) => {
      const code = roomCodeFromUrl(url)
      if (code) navigate(`/room/join?code=${code}`)
    }),
  ])

  const stopKeyboardWatch = watchKeyboard()

  return () => {
    stopKeyboardWatch()
    for (const handle of handles) void handle.remove()
  }
}

/**
 * Klavye açıkken <html>'e `keyboard-open` ekler (globals.css'te --safe-bottom'ı sıfırlar).
 * Ayrı Keyboard eklentisi yerine yükseklikten anlıyoruz: Capacitor klavye açılınca WebView'i
 * küçülttüğü için innerHeight belirgin şekilde düşer. Geri tuşuyla kapatmayı da yakalar.
 */
function watchKeyboard(): () => void {
  let fullHeight = window.innerHeight
  let lastWidth = window.innerWidth

  const update = () => {
    // Döndürmede tam yükseklik değişir; genişlik değiştiyse referansı baştan al.
    if (window.innerWidth !== lastWidth) {
      lastWidth = window.innerWidth
      fullHeight = window.innerHeight
    }
    fullHeight = Math.max(fullHeight, window.innerHeight)
    document.documentElement.classList.toggle('keyboard-open', fullHeight - window.innerHeight > 150)
  }

  window.addEventListener('resize', update)
  return () => {
    window.removeEventListener('resize', update)
    document.documentElement.classList.remove('keyboard-open')
  }
}

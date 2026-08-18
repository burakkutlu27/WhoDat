/**
 * Cihaz Bazlı Kimlik Yönetimi (Hesapsız Kalıcı İstatistikler)
 *
 * Oyuncunun tarayıcısına kalıcı, görünmez bir kimlik UUID'si verir.
 * Bu kimlik localStorage'da saklanır ve oyun sonuçları bu kimlikle eşleştirilir.
 */

export const DEVICE_ID_STORAGE_KEY = 'kimbu_device_id'

/**
 * Tarayıcıda kayıtlı device_id değerini döner, yoksa yeni bir UUID üretip kaydeder.
 * SSR ortamında boş string döner.
 */
export function getDeviceId(): string {
  if (typeof window === 'undefined') return ''

  try {
    let deviceId = localStorage.getItem(DEVICE_ID_STORAGE_KEY)
    if (!deviceId || deviceId.trim().length === 0) {
      deviceId = typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `dev_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
      localStorage.setItem(DEVICE_ID_STORAGE_KEY, deviceId)
    }
    return deviceId
  } catch {
    return ''
  }
}

/**
 * Cihaz kimliğinin mevcut olup olmadığını kontrol eder.
 */
export function hasDeviceId(): boolean {
  if (typeof window === 'undefined') return false
  try {
    return Boolean(localStorage.getItem(DEVICE_ID_STORAGE_KEY))
  } catch {
    return false
  }
}

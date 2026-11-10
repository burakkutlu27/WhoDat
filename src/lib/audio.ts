'use client'

/**
 * KimBu Ses Efektleri Yöneticisi (Web Audio / HTML5 Audio).
 *
 * MP3 dosyaları `public/sounds/` klasöründen okunur.
 * Dosyalar henüz eklenmediyse veya tarayıcı izin vermediyse oyun akışını asla bozmaz.
 */

export type SoundEffect =
  | 'correct-guess'
  | 'game-victory'
  | 'wrong-guess'
  | 'card-flip'
  | 'vote-ping'
  | 'countdown-tick'
  | 'pencil-scribble'
  | 'pass'
  | 'button-tap'
  | 'modal-open'
  | 'dice-roll'
  | 'check-tick'
  | 'round-start'

const audioCache = new Map<SoundEffect, HTMLAudioElement>()
let isMuted = false

/** Kullanıcı sesleri kapatmış mı kontrol eder / ayarlar. */
export function isAudioMuted(): boolean {
  if (typeof window === 'undefined') return true
  try {
    return localStorage.getItem('kimbu_sound_muted') === '1'
  } catch {
    return isMuted
  }
}

export function setAudioMuted(muted: boolean): void {
  isMuted = muted
  try {
    localStorage.setItem('kimbu_sound_muted', muted ? '1' : '0')
  } catch {
    // Depolama kapalı
  }
}

const EFFECT_FILE_MAP: Partial<Record<SoundEffect, string>> = {
  pass: 'card-flip',
}

/**
 * Belirtilen ses efektini çalar.
 */
export function playSound(effect: SoundEffect): void {
  if (typeof window === 'undefined' || isAudioMuted()) return

  try {
    let audio = audioCache.get(effect)
    if (!audio) {
      const fileName = EFFECT_FILE_MAP[effect] || effect
      audio = new Audio(`/sounds/${fileName}.mp3`)
      audio.preload = 'auto'
      audioCache.set(effect, audio)
    }

    // Ses zaten çalıyorsa başa sar
    audio.currentTime = 0
    void audio.play().catch(() => {
      // Otomatik oynatma engeli veya dosya henüz yüklenmemişse sessizce geç
    })
  } catch {
    // Ses desteği yoksa oyunu engelleme
  }
}

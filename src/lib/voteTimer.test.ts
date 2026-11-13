import { describe, expect, it } from 'vitest'

import {
  computeRemainingSeconds,
  resolveDeadlineMs,
  shouldReanchorDeadline,
} from './voteTimer'

describe('voteTimer', () => {
  it('arka plandan donunce duvar saatine gore kalan sureyi dogru azaltir', () => {
    const startMs = Date.parse('2026-06-01T12:00:00.000Z')
    const closesAt = '2026-06-01T12:00:30.000Z'

    const deadlineMs = resolveDeadlineMs(closesAt, 30, startMs, 100)
    expect(deadlineMs).toBe(Date.parse(closesAt))
    expect(computeRemainingSeconds(deadlineMs, startMs)).toBe(30)

    // Kullanici 14 saniye WhatsApp/Chrome'da kalip dondugunde kalan sure 16s olmali.
    const resumedMs = startMs + 14_000
    expect(computeRemainingSeconds(deadlineMs, resumedMs)).toBe(16)
  })

  it('uyanis anindaki yavas ag gecikmesini saat sapmasi sanip sureyi geri almaz', () => {
    const requestFinishMs = Date.parse('2026-06-01T12:00:04.000Z')
    const closesAt = '2026-06-01T12:00:30.000Z'

    // Sunucu yaniti 4 saniyelik RTT'nin ortasinda urettiyse (29s kalmisken),
    // istemci saati dogru oldugu halde closesAt - finishMs = 26s cikar.
    const deadlineMs = resolveDeadlineMs(closesAt, 29, requestFinishMs, 4000)
    expect(deadlineMs).toBe(Date.parse(closesAt))
    expect(computeRemainingSeconds(deadlineMs, requestFinishMs)).toBe(26)
  })

  it('istemci saati gercekten sapmissa bitisi yanit anina sabitler ve arka planda sure islemeye devam eder', () => {
    // Istemci saati sunucudan 120 saniye geride.
    const clientSyncMs = Date.parse('2026-06-01T12:00:00.200Z')
    const serverClosesAt = '2026-06-01T12:02:30.000Z'

    const deadlineMs = resolveDeadlineMs(serverClosesAt, 30, clientSyncMs, 200)
    expect(computeRemainingSeconds(deadlineMs, clientSyncMs)).toBe(30)

    // 12 saniye arka planda kalindiktan sonra eski prop (30) yerine sabitlenen deadline kullanilirsa
    // kalan sure 18 saniyeye duser.
    const afterBackgroundMs = clientSyncMs + 12_000
    expect(computeRemainingSeconds(deadlineMs, afterBackgroundMs)).toBe(18)
  })

  it('sadece taze sunucu yaniti ile belirgin ayrismada yeniden hizalar, arka plan sonrasi yanlislikla sifirlamaz', () => {
    const t0 = Date.parse('2026-06-01T12:00:00.000Z')
    const deadlineMs = Date.parse('2026-06-01T12:00:30.000Z')

    // Normal 1 saniyelik yuvarlama/gecikmede gereksiz re-anchor yapmaz.
    expect(shouldReanchorDeadline(deadlineMs, 29, t0 + 1_200, 100)).toBe(false)

    // Sunucu oylamayi erken guncellediyse (orn. 10s kaldi dediyse) yeniden hizalar.
    expect(shouldReanchorDeadline(deadlineMs, 10, t0 + 2_000, 100)).toBe(true)

    // Null iken her zaman hizalar.
    expect(shouldReanchorDeadline(null, 20, t0, 0)).toBe(true)
  })
})


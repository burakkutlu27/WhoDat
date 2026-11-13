export const CLOCK_SKEW_TOLERANCE_MS = 1500
export const REANCHOR_DRIFT_TOLERANCE_MS = CLOCK_SKEW_TOLERANCE_MS + 1000

/**
 * Sunucunun `closesAt` ISO zamanı ile `secondsRemaining` değerini karşılaştırır;
 * istemci saati sunucudan belirgin biçimde sapmışsa sunucunun kalan süresini
 * yanıtın geldiği `syncedAtMs` bazına sabitleyerek döner.
 */
export function resolveDeadlineMs(
  closesAt: string,
  secondsRemaining: number,
  syncedAtMs: number = Date.now(),
  syncLatencyMs: number = 0,
): number {
  const safeLatency = Math.max(0, syncLatencyMs)
  const serverMidpointMs = syncedAtMs - Math.round(safeLatency / 2)
  const serverFallback = serverMidpointMs + Math.max(0, secondsRemaining) * 1000
  const parsedCloses = Date.parse(closesAt)
  if (!Number.isFinite(parsedCloses)) return serverFallback

  const localRemainingAtSync = parsedCloses - syncedAtMs
  const minExpectedMs = Math.max(0, secondsRemaining - 1) * 1000 - safeLatency - CLOCK_SKEW_TOLERANCE_MS
  const maxExpectedMs = Math.max(0, secondsRemaining) * 1000 + CLOCK_SKEW_TOLERANCE_MS

  // İstemci saati ağ gecikmesi payı dışında sunucudan sapmışsa sunucunun kalan süresini baz al.
  if (localRemainingAtSync < minExpectedMs || localRemainingAtSync > maxExpectedMs) {
    return serverFallback
  }
  return parsedCloses
}

/**
 * Sabitlenmiş bitiş zamanına göre kalan tam saniyeyi (>= 0) hesaplar.
 */
export function computeRemainingSeconds(
  deadlineMs: number,
  nowMs: number = Date.now(),
): number {
  return Math.max(0, Math.ceil((deadlineMs - nowMs) / 1000))
}

/**
 * Taze sunucu yanıtı geldiğinde mevcut yerel bitiş zamanının sunucuyla
 * belirgin biçimde ayrışıp ayrışmadığını kontrol eder.
 * Arka plandan dönüşte eski prop ile çağrılmamalıdır; yalnızca yeni sunucu verisi geldiğinde kullanılmalıdır.
 */
export function shouldReanchorDeadline(
  currentDeadlineMs: number | null,
  serverSecondsRemaining: number,
  syncedAtMs: number = Date.now(),
  syncLatencyMs: number = 0,
): boolean {
  if (currentDeadlineMs === null) return true
  const currentRemainingMs = currentDeadlineMs - syncedAtMs
  const latencyAllowance = Math.max(0, syncLatencyMs)
  return (
    Math.abs(currentRemainingMs - serverSecondsRemaining * 1000) >
    REANCHOR_DRIFT_TOLERANCE_MS + latencyAllowance
  )
}

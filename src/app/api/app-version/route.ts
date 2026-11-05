import { jsonOk, route } from '@/lib/http'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

/**
 * GET /api/app-version — zorunlu güncelleme eşiği (Supabase app_config.min_android_build).
 *
 * Okunamazsa 0 döner: ayar okunamadı diye kimse uygulamanın dışında kalmasın.
 * Kısa önbellek: her açılışta DB'ye gitmesin, eşik değişince bir dakikada yayılsın.
 */
export const GET = route(async () => {
  let minAndroidBuild = 0
  try {
    const { data } = await supabaseAdmin()
      .from('app_config')
      .select('value')
      .eq('key', 'min_android_build')
      .maybeSingle()
    const parsed = Number.parseInt(data?.value ?? '', 10)
    if (Number.isFinite(parsed)) minAndroidBuild = parsed
  } catch {
    // Eşik okunamadı: güncelleme zorlanmaz.
  }

  return jsonOk(
    { minAndroidBuild },
    { headers: { 'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300' } },
  )
})

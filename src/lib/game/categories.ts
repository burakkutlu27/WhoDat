import type { FamousPersonCategory } from './types'

/**
 * Kategori listesi — istemci bileşenleri buradan import eder.
 *
 * Önceden famousPeopleData.ts'ten (7.400+ isimlik, ~740 KB) alınıyordu; 6 satırlık liste için
 * her sayfa o dev dosyayı da paketliyordu. Geliştirme sunucusu bunu her sayfa için ayrı
 * derleyip belleği şişiriyor (route'lar 404 dönmeye başlıyordu), tarayıcı paketi de büyüyordu.
 * famousPeopleData.ts script'lerle yeniden üretildiği için oradaki kopya da korunuyor;
 * kategori eklenirse iki yerde güncellenmeli.
 */

export interface CategoryInfo {
  id: FamousPersonCategory
  label: string
  icon?: string
  color: string
}

export const CATEGORIES: CategoryInfo[] = [
  { id: 'all', label: 'Tümü / Karışık', color: 'pencil-yellow' },
  { id: 'unluler', label: 'Ünlüler', color: 'pencil-red' },
  { id: 'tarihi_kisiler', label: 'Tarihi Kişiler', color: 'pencil-blue' },
  { id: 'cizgi_karakterler', label: 'Kurgusal & Çizgi', color: 'pencil-purple' },
  { id: 'sporcular', label: 'Sporcular', color: 'pencil-green' },
  { id: 'dizi_film_karakterleri', label: 'Dizi & Film', color: 'pencil-orange' },
]

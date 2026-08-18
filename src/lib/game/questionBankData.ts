/**
 * Soru Bankası Başlangıç Veri Seti & Yardımcıları
 *
 * 06-tam-metin-modu-BASIT.md ve 06-tam-metin-uzaktan-oyun-modu.md gereksinimlerine
 * uygun 15 temel soru ve filtreleme işlevleri.
 */

export interface QuestionBankItem {
  id: string
  textTr: string
  tag: 'kimlik' | 'durum' | 'cinsiyet' | 'meslek' | 'tarih' | 'koken' | 'sanat' | 'kurgu' | 'isim' | 'kisilik' | 'spor' | 'genel'
  difficulty: 'genel' | 'daraltici' | 'spesifik'
  sortOrder: number
}

export const QUESTION_TAGS: { id: string; label: string; icon: string }[] = [
  { id: 'all', label: 'Tümü', icon: '' },
  { id: 'kimlik', label: 'Kimlik & Tür', icon: '👤' },
  { id: 'durum', label: 'Yaşam & Dönem', icon: '⏳' },
  { id: 'meslek', label: 'Meslek & Alan', icon: '💼' },
  { id: 'sanat', label: 'Sanat & Medya', icon: '🎬' },
  { id: 'koken', label: 'Köken & Coğrafya', icon: '🌍' },
  { id: 'isim', label: 'İsim Özellikleri', icon: '🔤' },
]

export const QUESTION_BANK_SEED: QuestionBankItem[] = [
  {
    id: 'qb-01',
    textTr: 'Gerçek bir kişi miyim, yoksa kurgu bir karakter miyim?',
    tag: 'kimlik',
    difficulty: 'genel',
    sortOrder: 1,
  },
  {
    id: 'qb-02',
    textTr: 'Hayatta mıyım?',
    tag: 'durum',
    difficulty: 'genel',
    sortOrder: 2,
  },
  {
    id: 'qb-03',
    textTr: 'Bir kadın mıyım?',
    tag: 'kimlik',
    difficulty: 'genel',
    sortOrder: 3,
  },
  {
    id: 'qb-04',
    textTr: 'Tanınırlığım sanat veya eğlence dünyasından mı geliyor?',
    tag: 'meslek',
    difficulty: 'genel',
    sortOrder: 4,
  },
  {
    id: 'qb-05',
    textTr: 'Spor dünyasından mıyım?',
    tag: 'meslek',
    difficulty: 'genel',
    sortOrder: 5,
  },
  {
    id: 'qb-06',
    textTr: 'Tarihi bir figür müyüm (20. yüzyıldan önce mi yaşadım)?',
    tag: 'tarih',
    difficulty: 'daraltici',
    sortOrder: 6,
  },
  {
    id: 'qb-07',
    textTr: 'Türk müyüm?',
    tag: 'koken',
    difficulty: 'daraltici',
    sortOrder: 7,
  },
  {
    id: 'qb-08',
    textTr: 'Filmlerde ya da dizilerde mi tanınıyorum?',
    tag: 'sanat',
    difficulty: 'daraltici',
    sortOrder: 8,
  },
  {
    id: 'qb-09',
    textTr: 'Müzikle mi tanınıyorum?',
    tag: 'sanat',
    difficulty: 'daraltici',
    sortOrder: 9,
  },
  {
    id: 'qb-10',
    textTr: 'Bir çizgi film karakteri miyim?',
    tag: 'kurgu',
    difficulty: 'daraltici',
    sortOrder: 10,
  },
  {
    id: 'qb-11',
    textTr: 'İsmim üç harften uzun mu?',
    tag: 'isim',
    difficulty: 'spesifik',
    sortOrder: 11,
  },
  {
    id: 'qb-12',
    textTr: 'Adım bir sesli harfle mi başlıyor?',
    tag: 'isim',
    difficulty: 'spesifik',
    sortOrder: 12,
  },
  {
    id: 'qb-13',
    textTr: 'Genel olarak "iyi" bir karakter olarak mı biliniyorum?',
    tag: 'kisilik',
    difficulty: 'daraltici',
    sortOrder: 13,
  },
  {
    id: 'qb-14',
    textTr: 'Bugün hâlâ aktif/güncel biri miyim?',
    tag: 'durum',
    difficulty: 'genel',
    sortOrder: 14,
  },
  {
    id: 'qb-15',
    textTr: 'Bir spor dalında ünlü müyüm?',
    tag: 'meslek',
    difficulty: 'daraltici',
    sortOrder: 15,
  },
]

export function filterQuestions(
  query?: string,
  tag?: string,
): QuestionBankItem[] {
  let list = QUESTION_BANK_SEED

  if (tag && tag !== 'all') {
    list = list.filter((q) => q.tag === tag)
  }

  if (query && query.trim()) {
    const qLower = query.trim().toLowerCase()
    list = list.filter((q) => q.textTr.toLowerCase().includes(qLower))
  }

  return list.sort((a, b) => a.sortOrder - b.sortOrder)
}

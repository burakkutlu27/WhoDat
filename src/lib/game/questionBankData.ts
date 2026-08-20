/**
 * Soru Bankası Başlangıç Veri Seti & Yardımcıları
 *
 * Tam Metin modunda sırası gelen oyuncunun seçebileceği,
 * kesinlikle yalnızca "Evet" veya "Hayır" ile cevaplanabilen standart soru havuzu.
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
  { id: 'sanat', label: 'Sanat & Medya', icon: '🎬' },
  { id: 'spor', label: 'Spor', icon: '⚽' },
  { id: 'meslek', label: 'Meslek & Alan', icon: '💼' },
  { id: 'koken', label: 'Köken & Ülke', icon: '🌍' },
  { id: 'kisilik', label: 'Rol & Kişilik', icon: '🎭' },
  { id: 'isim', label: 'İsim Özellikleri', icon: '🔤' },
]

export const QUESTION_BANK_SEED: QuestionBankItem[] = [
  {
    id: 'qb-01',
    textTr: 'Gerçek hayatta yaşamış veya yaşayan bir insan mıyım?',
    tag: 'kimlik',
    difficulty: 'genel',
    sortOrder: 1,
  },
  {
    id: 'qb-02',
    textTr: 'Kurgusal veya hayal ürünü bir karakter miyim?',
    tag: 'kimlik',
    difficulty: 'genel',
    sortOrder: 2,
  },
  {
    id: 'qb-03',
    textTr: 'Şu anda hayatta mıyım?',
    tag: 'durum',
    difficulty: 'genel',
    sortOrder: 3,
  },
  {
    id: 'qb-04',
    textTr: 'Bir kadın mıyım?',
    tag: 'kimlik',
    difficulty: 'genel',
    sortOrder: 4,
  },
  {
    id: 'qb-05',
    textTr: 'Bir erkek miyim?',
    tag: 'kimlik',
    difficulty: 'genel',
    sortOrder: 5,
  },
  {
    id: 'qb-06',
    textTr: 'Türkiye kökenli / Türk vatandaşı mıyım?',
    tag: 'koken',
    difficulty: 'daraltici',
    sortOrder: 6,
  },
  {
    id: 'qb-07',
    textTr: 'Yabancı (Türkiye dışından) biri miyim?',
    tag: 'koken',
    difficulty: 'daraltici',
    sortOrder: 7,
  },
  {
    id: 'qb-08',
    textTr: 'Sanat, sinema veya müzik dünyasından mıyım?',
    tag: 'sanat',
    difficulty: 'genel',
    sortOrder: 8,
  },
  {
    id: 'qb-09',
    textTr: 'Oyunculuk veya sinema/dizi sektöründe mi tanınıyorum?',
    tag: 'sanat',
    difficulty: 'daraltici',
    sortOrder: 9,
  },
  {
    id: 'qb-10',
    textTr: 'Müzisyen, şarkıcı veya besteci miyim?',
    tag: 'sanat',
    difficulty: 'daraltici',
    sortOrder: 10,
  },
  {
    id: 'qb-11',
    textTr: 'Bir sporcu veya spor dünyasından biri miyim?',
    tag: 'spor',
    difficulty: 'daraltici',
    sortOrder: 11,
  },
  {
    id: 'qb-12',
    textTr: 'Tarihi bir kişilik miyim (20. yüzyıldan önce mi yaşadım)?',
    tag: 'durum',
    difficulty: 'daraltici',
    sortOrder: 12,
  },
  {
    id: 'qb-13',
    textTr: 'Bilim, edebiyat veya siyaset alanında mı tanınıyorum?',
    tag: 'meslek',
    difficulty: 'daraltici',
    sortOrder: 13,
  },
  {
    id: 'qb-14',
    textTr: 'Bir çizgi film, animasyon veya çizgi roman karakteri miyim?',
    tag: 'kimlik',
    difficulty: 'daraltici',
    sortOrder: 14,
  },
  {
    id: 'qb-15',
    textTr: 'Süper güçleri veya fantastik yetenekleri olan bir karakter miyim?',
    tag: 'kimlik',
    difficulty: 'spesifik',
    sortOrder: 15,
  },
  {
    id: 'qb-16',
    textTr: 'Genel olarak olumlu / "iyi" tarafta bir karakter miyim?',
    tag: 'kisilik',
    difficulty: 'daraltici',
    sortOrder: 16,
  },
  {
    id: 'qb-17',
    textTr: 'Kötü / kötü adam (antagonist) bir karakter miyim?',
    tag: 'kisilik',
    difficulty: 'daraltici',
    sortOrder: 17,
  },
  {
    id: 'qb-18',
    textTr: 'İsmim (veya ilk adım) 5 harften uzun mu?',
    tag: 'isim',
    difficulty: 'spesifik',
    sortOrder: 18,
  },
  {
    id: 'qb-19',
    textTr: 'Adım bir sesli harfle (A, E, I, İ, O, Ö, U, Ü) mi başlıyor?',
    tag: 'isim',
    difficulty: 'spesifik',
    sortOrder: 19,
  },
  {
    id: 'qb-20',
    textTr: 'Bugün hâlâ aktif/güncel olarak tanınan biri miyim?',
    tag: 'durum',
    difficulty: 'genel',
    sortOrder: 20,
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

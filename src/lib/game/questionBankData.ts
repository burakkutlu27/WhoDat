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
  { id: 'kurgu', label: 'Kurgu & Evren', icon: '🎭' },
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
    textTr: 'Gerçek hayatta şu an yaşıyor muyum? (Kurgusal karakterler: Hayır)',
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
    tag: 'kurgu',
    difficulty: 'daraltici',
    sortOrder: 14,
  },
  {
    id: 'qb-15',
    textTr: 'Süper güçleri veya fantastik yetenekleri olan bir karakter miyim?',
    tag: 'kurgu',
    difficulty: 'spesifik',
    sortOrder: 15,
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
    textTr: '1950 veya daha sonraki bir yılda doğmuş gerçek bir insan mıyım?',
    tag: 'durum',
    difficulty: 'daraltici',
    sortOrder: 20,
  },
  {
    id: 'qb-21',
    textTr: 'Bilim insanı, matematikçi veya mucit miyim?',
    tag: 'meslek',
    difficulty: 'daraltici',
    sortOrder: 21,
  },
  {
    id: 'qb-22',
    textTr: 'Yazar, şair veya düşünür/filozof muyum?',
    tag: 'meslek',
    difficulty: 'daraltici',
    sortOrder: 22,
  },
  {
    id: 'qb-23',
    textTr: 'Siyasetçi, devlet lideri veya hükümdar/komutan mıyım?',
    tag: 'meslek',
    difficulty: 'daraltici',
    sortOrder: 23,
  },
  {
    id: 'qb-24',
    textTr: 'Ressam, heykeltıraş, mimar veya görsel sanatlar alanından mıyım?',
    tag: 'sanat',
    difficulty: 'daraltici',
    sortOrder: 24,
  },
  {
    id: 'qb-25',
    textTr: 'Artık hayatta olmayan (vefat etmiş) gerçek bir insan mıyım?',
    tag: 'durum',
    difficulty: 'genel',
    sortOrder: 25,
  },
  {
    id: 'qb-26',
    textTr: '1980 veya daha sonraki bir yılda doğmuş gerçek bir insan mıyım?',
    tag: 'durum',
    difficulty: 'daraltici',
    sortOrder: 26,
  },
  {
    id: 'qb-27',
    textTr: '1900–1979 yılları arasında doğmuş gerçek bir insan mıyım?',
    tag: 'durum',
    difficulty: 'daraltici',
    sortOrder: 27,
  },
  {
    id: 'qb-28',
    textTr: 'İsmim (parantez içi açıklamalar hariç) birden fazla kelimeden mi oluşuyor?',
    tag: 'isim',
    difficulty: 'genel',
    sortOrder: 28,
  },
  {
    id: 'qb-29',
    textTr: 'İlk adım 4 harf veya daha kısa mı?',
    tag: 'isim',
    difficulty: 'spesifik',
    sortOrder: 29,
  },
  {
    id: 'qb-30',
    textTr: 'Tam adım (parantez ve boşluklar hariç) 11 harften uzun mu?',
    tag: 'isim',
    difficulty: 'spesifik',
    sortOrder: 30,
  },
  {
    id: 'qb-31',
    textTr: 'İlk adım alfabenin ilk yarısındaki bir harfle (A–K, Ç, Ğ, I, İ dahil) mi başlıyor?',
    tag: 'isim',
    difficulty: 'spesifik',
    sortOrder: 31,
  },
  {
    id: 'qb-32',
    textTr: 'Adım veya soyadımın (parantez dışı) içinde "A" harfi geçiyor mu?',
    tag: 'isim',
    difficulty: 'spesifik',
    sortOrder: 32,
  },
  {
    id: 'qb-33',
    textTr: 'Adım veya soyadımın (parantez dışı) içinde "E" harfi geçiyor mu?',
    tag: 'isim',
    difficulty: 'spesifik',
    sortOrder: 33,
  },
  {
    id: 'qb-34',
    textTr: 'Adım veya soyadımın (parantez dışı) içinde "R" harfi geçiyor mu?',
    tag: 'isim',
    difficulty: 'spesifik',
    sortOrder: 34,
  },
  {
    id: 'qb-35',
    textTr: 'Tam adımın (parantez dışı) son harfi bir sesli harf (A, E, I, İ, O, Ö, U, Ü) mi?',
    tag: 'isim',
    difficulty: 'spesifik',
    sortOrder: 35,
  },
  {
    id: 'qb-36',
    textTr: '1800 yılından önce doğmuş tarihi bir kişilik miyim?',
    tag: 'durum',
    difficulty: 'spesifik',
    sortOrder: 36,
  },
  {
    id: 'qb-37',
    textTr: '1990 veya daha sonraki bir yılda doğmuş gerçek bir insan mıyım?',
    tag: 'durum',
    difficulty: 'daraltici',
    sortOrder: 37,
  },
  {
    id: 'qb-38',
    textTr: '1800–1899 yılları arasında doğmuş gerçek bir insan mıyım?',
    tag: 'durum',
    difficulty: 'spesifik',
    sortOrder: 38,
  },
  {
    id: 'qb-39',
    textTr: 'Avrupa kökenli veya Avrupalı bir gerçek kişi miyim?',
    tag: 'koken',
    difficulty: 'daraltici',
    sortOrder: 39,
  },
  {
    id: 'qb-40',
    textTr: 'Kuzey Amerika (ABD veya Kanada) kökenli bir gerçek kişi miyim?',
    tag: 'koken',
    difficulty: 'daraltici',
    sortOrder: 40,
  },
  {
    id: 'qb-41',
    textTr: 'Latin Amerika (Güney/Orta Amerika veya Karayipler) kökenli gerçek bir kişi miyim?',
    tag: 'koken',
    difficulty: 'spesifik',
    sortOrder: 41,
  },
  {
    id: 'qb-42',
    textTr: 'Asya (Türkiye hariç: Japonya, Kore, Çin, Hindistan, Orta Asya vb.) kökenli gerçek bir kişi miyim?',
    tag: 'koken',
    difficulty: 'spesifik',
    sortOrder: 42,
  },
  {
    id: 'qb-43',
    textTr: 'Afrika, Orta Doğu (Türkiye hariç) veya Okyanusya kökenli gerçek bir kişi miyim?',
    tag: 'koken',
    difficulty: 'spesifik',
    sortOrder: 43,
  },
  {
    id: 'qb-44',
    textTr: 'Futbol dünyasından (futbolcu veya teknik direktör) biri miyim?',
    tag: 'spor',
    difficulty: 'daraltici',
    sortOrder: 44,
  },
  {
    id: 'qb-45',
    textTr: 'Basketbol dünyasından (oyuncu veya koç) biri miyim?',
    tag: 'spor',
    difficulty: 'spesifik',
    sortOrder: 45,
  },
  {
    id: 'qb-46',
    textTr: 'Voleybol dünyasından (oyuncu veya antrenör) biri miyim?',
    tag: 'spor',
    difficulty: 'spesifik',
    sortOrder: 46,
  },
  {
    id: 'qb-47',
    textTr: 'Dövüş sporları veya güreş (boks, MMA, güreş, tekvando, judo vb.) branşından mıyım?',
    tag: 'spor',
    difficulty: 'spesifik',
    sortOrder: 47,
  },
  {
    id: 'qb-48',
    textTr: 'Tenis, motor sporları, atletizm, yüzme veya diğer bireysel spor dallarından mıyım?',
    tag: 'spor',
    difficulty: 'spesifik',
    sortOrder: 48,
  },
  {
    id: 'qb-49',
    textTr: 'İnternet yayıncısı, YouTuber, sunucu, gazeteci veya medya kişiliği miyim?',
    tag: 'meslek',
    difficulty: 'daraltici',
    sortOrder: 49,
  },
  {
    id: 'qb-50',
    textTr: 'İş insanı, girişimci, yönetici veya şef/tasarımcı gibi iş dünyasından mıyım?',
    tag: 'meslek',
    difficulty: 'spesifik',
    sortOrder: 50,
  },
  {
    id: 'qb-51',
    textTr: 'Yerli (Türk) bir dizi veya filmden kurgusal bir karakter miyim?',
    tag: 'kurgu',
    difficulty: 'daraltici',
    sortOrder: 51,
  },
  {
    id: 'qb-52',
    textTr: 'Yabancı bir canlı aksiyon dizi veya filminden kurgusal bir karakter miyim?',
    tag: 'kurgu',
    difficulty: 'daraltici',
    sortOrder: 52,
  },
  {
    id: 'qb-53',
    textTr: 'Bir televizyon/platform dizisinden (yerli veya yabancı) karakter miyim?',
    tag: 'kurgu',
    difficulty: 'daraltici',
    sortOrder: 53,
  },
  {
    id: 'qb-54',
    textTr: 'Bir sinema filminden (yerli veya yabancı canlı aksiyon) karakter miyim?',
    tag: 'kurgu',
    difficulty: 'daraltici',
    sortOrder: 54,
  },
  {
    id: 'qb-55',
    textTr: 'Bir anime / Japon manga evreninden karakter miyim?',
    tag: 'kurgu',
    difficulty: 'spesifik',
    sortOrder: 55,
  },
  {
    id: 'qb-56',
    textTr: 'Bir video oyunundan (bilgisayar/konsol oyunu) karakter miyim?',
    tag: 'kurgu',
    difficulty: 'spesifik',
    sortOrder: 56,
  },
  {
    id: 'qb-57',
    textTr: 'Klasik edebiyat, roman, masal veya mitolojiden bir karakter miyim?',
    tag: 'kurgu',
    difficulty: 'spesifik',
    sortOrder: 57,
  },
  {
    id: 'qb-58',
    textTr: 'Erkek veya kadın olmayan (cinsiyetsiz yaratık, robot, canavar veya hayvan) kurgusal bir varlık mıyım?',
    tag: 'kurgu',
    difficulty: 'spesifik',
    sortOrder: 58,
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

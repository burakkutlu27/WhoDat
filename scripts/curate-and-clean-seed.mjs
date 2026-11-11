import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const seedPath = path.join(repoRoot, 'src/lib/game/famousPeopleData.ts')
const seedText = fs.readFileSync(seedPath, 'utf8')

// Extract prefix before FAMOUS_PEOPLE_SEED array and array literal itself
const seedDeclIdx = seedText.indexOf('export const FAMOUS_PEOPLE_SEED')
if (seedDeclIdx === -1) throw new Error('Could not find FAMOUS_PEOPLE_SEED')
const eqIdx = seedText.indexOf('=', seedDeclIdx)
const arrStart = seedText.indexOf('[', eqIdx)
// Find matching closing bracket of FAMOUS_PEOPLE_SEED
let depth = 0
let inStr = false
let quote = ''
let arrEnd = -1
for (let i = arrStart; i < seedText.length; i++) {
  const ch = seedText[i]
  if (inStr) {
    if (ch === '\\') {
      i++
    } else if (ch === quote) {
      inStr = false
    }
  } else {
    if (ch === "'" || ch === '"' || ch === '`') {
      inStr = true
      quote = ch
    } else if (ch === '[') {
      depth++
    } else if (ch === ']') {
      depth--
      if (depth === 0) {
        arrEnd = i
        break
      }
    }
  }
}
if (arrEnd === -1) throw new Error('Could not find closing bracket of FAMOUS_PEOPLE_SEED')

const seed = Function(`"use strict"; return (${seedText.slice(arrStart, arrEnd + 1)})`)()

// 1. Exact names to remove (Wikipedia non-entity pages, events, films/franchises, bands, groups, duos,
//    anonymous streamers/stubs without verifiable DOBs, and duplicate aliases merged into canonical entry)
const REMOVE_EXACT = new Set([
  // Non-entity / Wikipedia system / event / object / concept pages
  'Kullanıcı:Bugraork/Taslak',
  'Kullanıcı mesaj:TRMuzikGozlemcisi',
  'Türkiye cumhurbaşkanı',
  'Türkiye cumhurbaşkanı vekili',
  "Türkiye'de cumhurbaşkanlığı seçimleri",
  'Şablon:Türkiye cumhurbaşkanları',
  'Roma imparatoru',
  'Beş İmparator Yılı',
  'Beş İyi İmparator',
  'Altı İmparator Yılı',
  'Antik Roma tarihinin zaman çizelgesi',
  'Asker imparator',
  'Caracalla Yazıtı',
  'Flavius Hanedanı',
  'İliryalı imparatorlar',
  'Tetrarşi',
  'Şablon:Roma imparatorları',
  'Polioksimetilen',
  'Uyandırılmış Toprak',
  'Peer Gynt',
  'Din Felsefesi Üzerine Dersler',
  'Astronom',
  'Milyoner',
  'Kurgusal karakter',
  'Bishōjo',
  'Bishōnen',
  'Soft butch',
  'Süper kahraman',
  'Süper kahraman romanları',
  'The Return of Doctor Mysterio',
  'DreamWorks Ejderhalar',
  'Rafadan Tayfa',
  'Karlar Ülkesi',
  'Karlar Ülkesi 2',
  'Karlar Ülkesi 3',
  'Karayip Korsanları: Dünyanın Sonu',
  'Karayip Korsanları: Gizemli Denizlerde',
  'Karayip Korsanları: Ölü Adamın Sandığı',
  "Karayip Korsanları: Salazar'ın İntikamı",
  "Karayip Korsanları: Siyah İnci'nin Laneti",
  'Gülseren Budayıcıoğlu Karakterleri',
  'Longbottom ailesi',

  // Music bands, duos, teams, collective channels
  'Mor ve Ötesi',
  'Gripin',
  'Duman',
  'Manga',
  'Kafalar (Bilal Hancı, Atakan Özyurt, Fatih Yasin)',
  'Smosh (Ian Hecox & Anthony Padilla)',
  'Dude Perfect',
  'Daily Dose Of Internet',
  'Colin and Samir',
  'Limon Tayfa',
  'Bebar Bilim',
  'DFT Tarih',
  'Coen Kardeşler (Joel ve Ethan Coen)',
  'Wright Kardeşler',
  'Abbott ve Costello',
  'Zahir Kardeşler (Erman Toroğlu & Şansal Büyüka)',
  'Wile E. Coyote ve Road Runner',
  'Ed, Edd ve Eddy',
  'Cin, Can ve Cem',
  'Cin Fikri, Can Fikri, Canan (Huey, Dewey, Louie / Can, Cin, Cem)',
  'Hansel ve Gretel',
  'Pamuk Prenses ve Yedi Cüceler',
  'Fred ve George Weasley',
  'Tommy ve Tuppence',
  'Madam Vastra, Jenny Flint ve Strax',
  'Móði ve Magni',
  'Thjalfi ve Röskva',
  'Vili ve Vé',
  'Dr. Jekyll ve Mr. Hyde',
  'Tweedledum ve Tweedledee',
  'William ve Jack Dalton',
  'Bebop ve Rocksteady',
  'Elif ve Arkadaşları',
  'Maysa ve Bulut',
  'Kaptan Pengu ve Arkadaşları',
  'Köstebekgiller (Boyo, Süslü, Kösteban)',
  'Ege ile Gaga',
  'Kare Takımı (Kuti, Aypa, Rupi, Enda)',
  'Ninja Kaplumbağalar (Leonardo, Raphael, Donatello, Michelangelo)',
  'Roket Takımı (Jessie, James, Meowth)',
  'Timon ve Pumbaa (Hakuna Matata)',
  'Beyblade Takımı (Tyson Granger / Takao Kinomiya, Kai Hiwatari, Ray Kon, Max Tate)',
  'Gravity Falls (Dipper Pines, Mabel Pines, Grunkle Stan)',
  'Beagle Boys',
  "Chip 'n' Dale",
  'McDuck Klanı',
  'Eternals',
  'Fantastik Dörtlü',
  'Üç Savaşçılar',
  'X-Men',
  'Powerpuff Girls',
  'Baker Sokağı Çetesi',
  'Hogwarts kadrosu',
  'Thénardierler',
  'Azmanlar',
  'Bremen Mızıkacıları',
  'Kırk Haramiler',
  'Gargantua ile Pantagruel',
  'Voltran (Beş Aslan)',
  'Minyonlar (Minions)',
  'Kâinatın Hâkimleri',
  'Gözcüler',

  // Anonymous/undisclosed DOB Tier 3-5 internet figures & hopeless 1-word ambiguous stubs
  'Erlik',
  'Grimnax (Alp Saraç)',
  'Neo Toprak',
  'Ağır Mimar',
  'HolyThoth (Cenk Erdur)',
  'Rip (Fatih Soytekin)',
  'Deniz Bodur',
  'Barış Dadada (Barış Resmi)',
  'Easter GamersTv (Mete Özbey)',
  'Kaanflix',
  'Yusuf Kayaalp',
  'Hikayesi Ne (Murat Şen)',
  'Videoyun (Batu Bozkan)',
  'Beverly Aadlen',
  'Aydın',
  'John Davis',
  'John Baker',
  'Agus',
  'Félix',
  'Akif Kilman',
  'Mesut Çevik',
  'Abdullah Çuhacıoğlu',
  'Nihat Ertuğ',
  'Mehmet Ali Bey',
  'Ahmet Kurt',
  'Gözler Anlatır (Sarp Levendoğlu)',
  'Black Sails',
  'Athena',
  'John Kramer',
  "Harry Potter'daki büyülü yaratıklar",
  'Ölüm Yiyen',
  'The Curse of Monkey Island',
  'Define Adası',
  'Define Adasına Dönüş',
  'Escape from Monkey Island',
  'Karayip Korsanları',
  'Rivyalı Geralt',
  'Rivialı Geralt (The Witcher)',
  'Kaptan Hook',
  'Kanca',
  'Herakles',
  'Raquel Murillo',
  'Finn the Human (Adventure Time)',
  'Gumball Watterson (Gumball)',
  'Darwin Watterson (Gumball)',
  'Prens Süleyman (Muhteşem Yüzyıl)',

  // True duplicates & typos -> merged to canonical name
  'Hilary Clinton',
  'Gülbence (Gülben Ergen)',
  'Oppenheimer (Cillian Murphy / Film)',
  'Meryem Uzerli (Hürrem)',
  'Kel Mahmut',
  'Zlatan Ibrahimovic',
  'Edin Dzeko',
  'Muhammad Ali',
  'Eda Erdem Dündar',
  'Luis Suarez',
  'Luka Doncic',
  'Nikola Jokic',
  'Vasilije Micic',
  'Bogdan Bogdanovic',
  'Iga Swiatek',
  'Leon Marchand',
  'Canelo Alvarez',
  'Yasmani Copello',
  'Bahar Toksoy',
  'Jose Mourinho',
  'Jurgen Klopp',
  'Zeljko Obradovic',
  'Andres Iniesta',
  'Kimi Raikkonen',
  'Walter White (Heisenberg)',
  'Saul Goodman (Jimmy McGill)',
  'Gandalf (Gri/Ak Gandalf)',
  'Aragorn (Yolgezer)',
  'Gollum (Smeagol)',
  'Yoda (Usta Yoda)',
  'Kaptan Jack Sparrow',
  'Profesör',
  'Berlin',
  'Tokyo',
  'Arif Işık',
  'Don Kişot',
  'Kont Drakula',
  'Faust',
  'Şapkacı',
  'Külkedisi',
  'Aladdin (Alaaddin)',
  'Zeus (Yunan Baş Tanrısı)',
  'Hermes (Haberci Tanrı)',
  'Artemis (Avcılık Tanrıçası)',
  'Odin (İskandinav Baş Tanrısı)',
  'Thor (Şimşek Tanrısı)',
  'Thor (Marvel)',
  'Loki (Fesatlık Tanrısı)',
  'Batman (Bruce Wayne)',
  'Superman (Clark Kent)',
  'Örümcek Adam (Spider-Man / Peter Parker)',
  'Demir Adam (Iron Man / Tony Stark)',
  'Tony Stark',
  'Hulk (Bruce Banner)',
  'Doktor Strange (Stephen Strange)',
  'Stephen Strange',
  'Deadpool (Wade Wilson)',
  'Wolverine (Logan)',
  'Flash (Barry Allen)',
  'Aquaman (Arthur Curry)',
  'Wonder Woman (Diana Prince)',
  'Trevor Philips',
  'Creeper',
  'Son Goku (Dragon Ball)',
  'Kirpi Sonic',
  'Carl Johnson',
  'Dominic Toretto',
  'Kedi Kadın',
  'Wanda Maximoff (Kızıl Cadı / Scarlet Witch)',
  'Kızıl Cadı',
  'Squidward Dokunaç (Squidward Tentacles)',
  'Arsız Daffy',
  'Shaggy Rogers (Scooby-Doo)',
  'Jake the Dog (Adventure Time)',
  'Hızlı Gonzales',
  'Carol Danvers',
  'Ms. Marvel',
  'Profesör Moriarty',
  'Jim Moriarty (Andrew Scott / Did you miss me?)',
  'Dr. Watson',
  'John Watson (Martin Freeman / Sherlock Dizi)',
  'Tommy Shelby',
  'Rodion Romanoviç Raskolnikov',
  'Lemuel Gulliver',
  'Sinbad (Denizci Sinbad)',
  'Apollon',
  'Freyja',
  'İbn-i Sina (Avicenna)',
  'İbn Rüşd',
  'Pisagor (Pythagoras)',
  'Arşimet (Archimedes)',
  'Hipokrat (Hippocrates)',
  'John F. Kennedy (JFK)',
  'Farabi (Al-Farabi)',
  'Harezmi (Al-Khwarizmi)',
  'Biruni (El-Biruni)',
  'Cezeri (El-Cezeri)',
  'Kâtip Çelebi',
  'Köprülü Mehmet Paşa',
  'Neron',
  'Salvador Dali',
  'Rembrandt van Rijn',
  'Paul Cezanne',
  'Pierre-Auguste Renoir',
  'Diego Velazquez',
  'Fikret Muallâ',
  'Niccolo Machiavelli',
  'Rene Descartes',
  'Georg Wilhelm Friedrich Hegel',
  'Julius Caesar',
  'Josef Stalin',
  'Tutankamon (Firavun)',
  'II. Ramses (Büyük Ramses)',
  'I. Bayezid (Yıldırım Bayezid)',
  'I. Mehmed (Çelebi Mehmed)',
  'II. Osman (Genç Osman)',
  'VI. Mehmed (Vahdettin)',
  'I. Konstantin',
  'Laozi',
  'Hatice Turhan Sultan',
])

// Renames & splits & category fixes
const CATEGORY_OVERRIDES = {
  'Homer Simpson': 'cizgi_karakterler',
  'Yoda': 'dizi_film_karakterleri',
  'Wolfgang Amadeus Mozart': 'tarihi_kisiler',
  'Ludwig van Beethoven': 'tarihi_kisiler',
  'Johann Sebastian Bach': 'tarihi_kisiler',
  'Antonio Vivaldi': 'tarihi_kisiler',
  'John Adams': 'tarihi_kisiler',
  'John D. Rockefeller': 'tarihi_kisiler',
  'Andrew Carnegie': 'tarihi_kisiler',
  'Frederic Chopin': 'tarihi_kisiler',
  'Frédéric Chopin': 'tarihi_kisiler',
  'Jürgen Klopp': 'sporcular',
  'Željko Obradović': 'sporcular',
  'Carlo Ancelotti': 'sporcular',
}

// Curated Tier 1: universally recognized household names in Turkey (~50 per category)
const CURATED_TIER1 = {
  unluler: [
    'Kemal Sunal', 'Şener Şen', 'Cem Yılmaz', 'Türkan Şoray', 'Tarık Akan', 'Kadir İnanır',
    'Münir Özkul', 'Adile Naşit', 'Cüneyt Arkın', 'Barış Manço', 'Tarkan', 'Sezen Aksu',
    'İbrahim Tatlıses', 'Müslüm Gürses', 'Zeki Müren', 'Ajda Pekkan', 'Neşet Ertaş', 'Aşık Veysel',
    'Orhan Gencebay', 'Ahmet Kaya', 'Kenan İmirzalıoğlu', 'Kıvanç Tatlıtuğ', 'Haluk Bilginer',
    'Beren Saat', 'Yılmaz Erdoğan', 'Ata Demirer', 'Beyazıt Öztürk', 'Acun Ilıcalı', 'Müge Anlı',
    'Seda Sayan', 'Hadise', 'Yıldız Tilbe', 'Şahan Gökbakar', 'Tolga Çevik', 'Recep Tayyip Erdoğan',
    'Ekrem İmamoğlu', 'Mansur Yavaş', 'Michael Jackson', 'Elvis Presley', 'Freddie Mercury',
    'Madonna', 'Taylor Swift', 'Eminem', 'Rihanna', 'Leonardo DiCaprio', 'Brad Pitt', 'Tom Cruise',
    'Johnny Depp', 'Angelina Jolie', 'Jackie Chan', 'Charlie Chaplin', 'Marilyn Monroe',
    'Elon Musk', 'Donald Trump', 'Barack Obama', 'Vladimir Putin',
  ],
  sporcular: [
    'Lionel Messi', 'Cristiano Ronaldo', 'Neymar', 'Kylian Mbappé', 'Erling Haaland', 'Ronaldinho',
    'Ronaldo (Nazário)', 'Pelé', 'Diego Maradona', 'Zinedine Zidane', 'David Beckham',
    'Zlatan Ibrahimović', 'Mohamed Salah', 'Mauro Icardi', 'Victor Osimhen', 'Gheorghe Hagi',
    'Alex de Souza', 'Didier Drogba', 'Ricardo Quaresma', 'Wesley Sneijder', 'Arda Güler',
    'Hakan Çalhanoğlu', 'Kerem Aktürkoğlu', 'Arda Turan', 'Hakan Şükür', 'Burak Yılmaz',
    'Sergen Yalçın', 'Volkan Demirel', 'Fernando Muslera', 'Rüştü Reçber', 'Metin Oktay',
    'Lefter Küçükandonyadis', 'Fatih Terim', 'Şenol Güneş', 'José Mourinho', 'Michael Jordan',
    'LeBron James', 'Kobe Bryant', 'Stephen Curry', "Shaquille O'Neal", 'Alperen Şengün',
    'Naim Süleymanoğlu', 'Mete Gazoz', 'Yusuf Dikeç', 'Zehra Güneş', 'Ebrar Karakurt',
    'Eda Erdem', 'Kenan Sofuoğlu', 'Toprak Razgatlıoğlu', 'Usain Bolt', 'Muhammed Ali',
    'Mike Tyson', 'Novak Djokovic', 'Roger Federer', 'Rafael Nadal', 'Michael Phelps',
    'Lewis Hamilton', 'Michael Schumacher',
  ],
  tarihi_kisiler: [
    'Mustafa Kemal Atatürk', 'İsmet İnönü', 'Fatih Sultan Mehmet', 'Kanuni Sultan Süleyman',
    'Yavuz Sultan Selim', 'Osman Gazi', 'Orhan Gazi', 'II. Abdülhamid', 'Yıldırım Bayezid',
    'IV. Murad', 'Mimar Sinan', 'Piri Reis', 'Barbaros Hayreddin Paşa', 'Mevlana Celaleddin Rumi',
    'Yunus Emre', 'Hürrem Sultan', 'Kösem Sultan', 'Evliya Çelebi', 'Sabiha Gökçen', 'Nazım Hikmet',
    'Mehmet Akif Ersoy', 'Yaşar Kemal', 'Aziz Nesin', 'Orhan Pamuk', 'Aziz Sancar', 'Cahit Arf',
    'Albert Einstein', 'Isaac Newton', 'Nikola Tesla', 'Thomas Edison', 'Galileo Galilei',
    'Marie Curie', 'Charles Darwin', 'Stephen Hawking', 'Alexander Graham Bell', 'İbn-i Sina',
    'Sokrates', 'Platon', 'Aristoteles', 'Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh',
    'Michelangelo', 'William Shakespeare', 'Fyodor Dostoyevski', 'Lev Tolstoy', 'Jül Sezar',
    'Napolyon Bonapart', 'Kleopatra', 'Adolf Hitler', 'Büyük İskender', 'Cengiz Han',
    'Karl Marx', 'Kraliçe II. Elizabeth', 'Wolfgang Amadeus Mozart', 'Ludwig van Beethoven',
  ],
  dizi_film_karakterleri: [
    'Polat Alemdar', 'Memati Baş', 'Süleyman Çakır', 'Behzat Ç.', 'Ezel Bayraktar',
    'Ramiz Dayı (Ramiz Karaeski)', 'Bihter Ziyagil', 'Behlül Haznedar', 'İnek Şaban',
    'Mahmut Hoca (Kel Mahmut)', 'Badi Ekrem', 'Tosun Paşa', 'Arif Işık (G.O.R.A.)',
    'Burhan Altıntop', 'Mecnun Çınar', 'İsmail Abi', 'Erdal Bakkal', 'Rıza Baba (Arka Sokaklar)',
    'Hüsnü Çoban', 'Recep İvedik', 'Harry Potter', 'Hermione Granger', 'Ron Weasley',
    'Albus Dumbledore', 'Lord Voldemort', 'Darth Vader (Anakin Skywalker)', 'Luke Skywalker',
    'Yoda', 'Gandalf', 'Frodo Baggins', 'Gollum', 'Sherlock Holmes', 'James Bond (007)',
    'Indiana Jones', 'Jack Sparrow', 'Rocky Balboa', 'John Rambo', 'Terminatör (T-800)',
    'Neo (Matrix / Thomas Anderson)', 'John Wick', 'Tony Montana (Yaralı Yüz / Scarface)',
    'Walter White', 'Jesse Pinkman', 'Jon Snow (Game of Thrones)', 'Daenerys Targaryen',
    'Profesör (La Casa de Papel)', 'Wednesday Addams', 'Michael Scofield (Prison Break)',
    'Chandler Bing (Matthew Perry / Friends)', "Joey Tribbiani (Matt LeBlanc / How you doin'?)",
  ],
  cizgi_karakterler: [
    'Pepee', 'Niloya', 'Kral Şakir', 'Fil Necati', 'Nasreddin Hoca', 'Keloğlan',
    'Kırmızı Başlıklı Kız', 'Pamuk Prenses', 'Külkedisi (Sindirella)', 'Pinokyo (Pinocchio)',
    'Temel Reis', 'Red Kit (Lucky Luke)', 'Şirin Baba', 'Şirine', 'Gargamel', 'Mickey Mouse',
    'Donald Duck', 'Bugs Bunny', 'Daffy Duck', 'Tweety', 'Sylvester', 'SüngerBob KareŞort',
    'Patrick Yıldız', 'Fred Çakmaktaş', 'Scooby-Doo', 'Garfield', 'Homer Simpson', 'Bart Simpson',
    'Shrek', 'Elsa (Karlar Ülkesi / Frozen)', 'Simba (Aslan Kral)',
    'Şimşek McQueen (Arabalar)', 'Woody (Oyuncak Hikayesi)', 'Buzz Lightyear',
    'Örümcek Adam', 'Batman', 'Superman', 'Demir Adam', 'Hulk',
    'Kaptan Amerika (Steve Rogers)', 'Thor', 'Joker', 'Thanos', 'Pikachu (Pokemon)',
    'Naruto Uzumaki', 'Super Mario', 'Sonic (Kirpi Sonic)', 'Steve (Minecraft)', 'Zeus',
    'Herkül (Herakles)', 'Kaptan Tsubasa (Tsubasa Ozora)', 'Heidi', 'Tom (Tom ve Jerry)',
    'Jerry (Tom ve Jerry)',
  ],
}

const tier1SetByCat = new Map(
  Object.entries(CURATED_TIER1).map(([cat, list]) => [cat, new Set(list)]),
)

const cleaned = []
const seenNames = new Set()

for (const rawItem of seed) {
  let item = { ...rawItem }

  // Fix band Athena duplicate vs mythological Athena
  if (item.name === 'Athena' && item.subCategory === 'muzisyen') {
    continue
  }
  // Fix Frédéric Chopin duplicate (keep 'Frédéric Chopin' in tarihi_kisiler, drop 'Frederic Chopin')
  if (item.name === 'Frederic Chopin') {
    continue
  }
  // Remove second 'Athena' duplicate
  if (item.name === 'Athena' && seenNames.has('Athena (Bilgelik Tanrıçası)')) {
    continue
  }

  // Split Tom ve Jerry duo into two iconic individuals
  if (item.name === 'Tom ve Jerry') {
    for (const solo of ['Tom (Tom ve Jerry)', 'Jerry (Tom ve Jerry)']) {
      if (!seenNames.has(solo)) {
        seenNames.add(solo)
        cleaned.push({
          name: solo,
          category: 'cizgi_karakterler',
          fameTier: 1,
        })
      }
    }
    continue
  }

  // Rename mis-spelled RRaenee alias
  if (item.name === 'RRaenee (Doğukan Adal)') {
    item.name = 'RRaenee (Mert Yılmaz)'
  }

  if (REMOVE_EXACT.has(item.name)) {
    continue
  }

  // Apply category overrides
  if (CATEGORY_OVERRIDES[item.name]) {
    item.category = CATEGORY_OVERRIDES[item.name]
  }

  // Ensure Frédéric Chopin in tarihi_kisiler
  if (item.name === 'Frédéric Chopin' && item.category === 'tarihi_kisiler') {
    // ok
  }

  // Dedupe exact name collisions
  const key = item.name.toLocaleLowerCase('tr').trim()
  if (seenNames.has(key)) continue
  seenNames.add(key)

  // Re-curate Tier 1 strictly; demote non-selected old Tier 1s to Tier 2 so 'orta' (<=3) keeps them!
  const tier1ForCat = tier1SetByCat.get(item.category)
  if (tier1ForCat && tier1ForCat.has(item.name)) {
    item.fameTier = 1
  } else if ((item.fameTier ?? 4) <= 1) {
    item.fameTier = 2
  }

  cleaned.push(item)
}

// Verify every CURATED_TIER1 entry landed in cleaned!
const cleanedMap = new Map(cleaned.map((x) => [x.name, x]))
for (const [cat, list] of Object.entries(CURATED_TIER1)) {
  const missing = list.filter((n) => !cleanedMap.has(n))
  const wrongCat = list.filter((n) => cleanedMap.has(n) && cleanedMap.get(n).category !== cat)
  if (missing.length > 0 || wrongCat.length > 0) {
    throw new Error(`CURATED_TIER1 mismatch in ${cat}: missing=${JSON.stringify(missing)} wrongCat=${JSON.stringify(wrongCat)}`)
  }
}

// Sort tiers stats report
const stats = {}
for (const item of cleaned) {
  stats[item.category] ??= { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, total: 0 }
  const t = item.fameTier ?? 4
  stats[item.category][t] = (stats[item.category][t] ?? 0) + 1
  stats[item.category].total++
}

const DEPRECATED_KEYS = Array.from(
  new Set(
    [
      ...REMOVE_EXACT,
      'Athena',
      'Frederic Chopin',
      'Tom ve Jerry',
      'RRaenee (Doğukan Adal)',
    ].map((n) => n.toLocaleLowerCase('tr').trim()),
  ),
).sort()

// Format cleanly matching existing famousPeopleData.ts style
const formattedItems = cleaned.map((item) => {
  const parts = [`name: ${JSON.stringify(item.name)}`, `category: ${JSON.stringify(item.category)}`]
  if (item.subCategory) parts.push(`subCategory: ${JSON.stringify(item.subCategory)}`)
  parts.push(`fameTier: ${item.fameTier ?? 4}`)
  return `  { ${parts.join(', ')} },`
})

const rawAfterSeed = seedText.slice(arrEnd + 1)
const afterSeed = rawAfterSeed.replace(
  /\n*(?:\/\*\* Kaldırılan[^\n]*\*\/\s*)?export const DEPRECATED_FAMOUS_PEOPLE_KEYS:[\s\S]*$/g,
  '',
)
if (/\bexport\b/.test(afterSeed)) {
  throw new Error('Unexpected export found after DEPRECATED_FAMOUS_PEOPLE_KEYS in famousPeopleData.ts')
}

const deprecatedBlock =
  '\n\n/** Kaldırılan veya birleştirilen eski seed kayıtları (Supabase önbelleğinden sızmasını önler). */\n' +
  'export const DEPRECATED_FAMOUS_PEOPLE_KEYS: ReadonlySet<string> = new Set<string>([\n' +
  DEPRECATED_KEYS.map((k) => `  ${JSON.stringify(k)},`).join('\n') +
  '\n])\n'

const newSeedText =
  seedText.slice(0, arrStart) +
  '[\n' +
  formattedItems.join('\n') +
  '\n]' +
  deprecatedBlock +
  afterSeed.replace(/^\n+/, '')

fs.writeFileSync(seedPath, newSeedText, 'utf8')
console.log('Updated famousPeopleData.ts successfully!')
console.log('Removed:', seed.length - cleaned.length, 'entries; Final count:', cleaned.length)
console.log('Category breakdown:', stats)

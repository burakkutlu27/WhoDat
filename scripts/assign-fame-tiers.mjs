/**
 * Kesin İsim Eşleşmeli ve Sıfır False-Positive Fame Tier Dağıtım Motoru
 */

import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'node:fs'
import { resolve, join } from 'node:path'

const PROJECT_ROOT = resolve('.')
const DATA_FILE = join(PROJECT_ROOT, 'src/lib/game/famousPeopleData.ts')
const PROGRESS_FILE = join(PROJECT_ROOT, 'fame-tier-progress.json')

function normalizeName(str) {
  return str
    .toLocaleLowerCase('tr')
    .replace(/\s*\([^)]*\)/g, '') // Parantez içindeki açıklamaları kaldır
    .replace(/[^a-z0-9çğıöşü\s]/g, ' ') // Özel karakterleri boşluğa çevir
    .replace(/\s+/g, ' ')
    .trim()
}

// ─────────────────────────────────────────────────────────────
// 1. TIER 1: EN BÜYÜK SÜPERSTARLAR & DEV İKONLAR (~150-200 isim)
// ─────────────────────────────────────────────────────────────
const TIER_1_RAW = [
  // Tarihi Kişiler & Liderler
  'Mustafa Kemal Atatürk', 'Kemal Atatürk', 'Atatürk', 'İsmet İnönü', 'Fatih Sultan Mehmet',
  'Kanuni Sultan Süleyman', 'Yavuz Sultan Selim', 'Osman Gazi', 'II. Abdülhamid', 'Mevlana Celaleddin Rumi',
  'Mimar Sinan', 'Yunus Emre', 'Albert Einstein', 'Isaac Newton', 'Leonardo da Vinci',
  'Nikola Tesla', 'Kristof Kolomb', 'Büyük İskender', 'Jül Sezar', 'Julius Caesar',
  'Napolyon Bonapart', 'Napoleon Bonaparte', 'Adolf Hitler', 'Winston Churchill', 'Abraham Lincoln',
  'Vladimir Lenin', 'Joseph Stalin', 'Mahatma Gandhi', 'Nelson Mandela', 'Che Guevara',
  'Kraliçe II. Elizabeth', 'Prenses Diana',

  // Türk Müzik Efsaneleri
  'Tarkan', 'Sezen Aksu', 'Barış Manço', 'Cem Karaca', 'Müslüm Gürses', 'İbrahim Tatlıses',
  'Ajda Pekkan', 'Zeki Müren', 'Ahmet Kaya', 'Orhan Gencebay', 'Ferdi Tayfur', 'Neşet Ertaş',
  'Aşık Veysel', 'Kemal Sunal', 'Cem Yılmaz', 'Şener Şen', 'Halit Akçatepe', 'Münir Özkul',
  'Adile Naşit', 'Tarık Akan', 'Cüneyt Arkın', 'Türkan Şoray', 'Fatma Girik', 'Filiz Akın',
  'Hülya Koçyiğit', 'Kadir İnanır', 'Sadri Alışık', 'Zeki Alasya', 'Metin Akpınar',
  'Ayşen Gruda', 'İlyas Salman', 'Levent Kırca', 'Nejat Uygur', 'Yılmaz Erdoğan', 'Ata Demirer',
  'Beyazıt Öztürk', 'Acun Ilıcalı', 'Mehmet Ali Erbil', 'Müge Anlı', 'Haluk Bilginer',
  'Kenan İmirzalıoğlu', 'Kıvanç Tatlıtuğ', 'Beren Saat',

  // Yabancı Müzik & Sinema Devleri
  'Michael Jackson', 'Madonna', 'Freddie Mercury', 'Elvis Presley', 'Eminem', 'Shakira',
  'Rihanna', 'Beyoncé', 'Taylor Swift', 'Justin Bieber', 'Lady Gaga', 'Britney Spears',
  'Brad Pitt', 'Leonardo DiCaprio', 'Tom Cruise', 'Angelina Jolie', 'Johnny Depp',
  'Arnold Schwarzenegger', 'Sylvester Stallone', 'Marilyn Monroe', 'Charlie Chaplin',
  'Morgan Freeman', 'Will Smith', 'Keanu Reeves', 'Jackie Chan', 'Bruce Lee',

  // Spor Efsaneleri
  'Fatih Terim', 'Mustafa Denizli', 'Şenol Güneş', 'Arda Turan', 'Hakan Şükür',
  'Naim Süleymanoğlu', 'Alex de Souza', 'Gheorghe Hagi', 'Fernando Muslera', 'Volkan Demirel',
  'Rüştü Reçber', 'Cristiano Ronaldo', 'Lionel Messi', 'Diego Maradona', 'Pelé',
  'Zinedine Zidane', 'David Beckham', 'Ronaldinho', 'Ronaldo', 'Neymar', 'Kylian Mbappé',
  'Michael Jordan', 'Kobe Bryant', 'LeBron James', 'Shaquille O\'Neal', 'Muhammed Ali',
  'Mike Tyson', 'Usain Bolt', 'Michael Schumacher', 'Roger Federer',

  // Kurgusal & Çizgi Karakterler
  'Recep İvedik', 'Polat Alemdar', 'Süleyman Çakır', 'Ramiz Dayı', 'Ramiz Karaeski',
  'Bihter Ziyagil', 'Behlül Haznedar', 'Burhan Altıntop', 'İnek Şaban', 'Mahmut Hoca',
  'Kel Mahmut', 'Güdük Necmi', 'Damat Ferit', 'Badi Ekrem', 'Tosun Paşa', 'Kibar Feyzo',
  'Maho Ağa', 'Züğürt Ağa', 'Turist Ömer', 'Arif Işık', 'Harry Potter', 'Lord Voldemort',
  'Albus Dumbledore', 'Gandalf', 'Darth Vader', 'Yoda', 'Luke Skywalker', 'Kaptan Jack Sparrow',
  'Sherlock Holmes', 'James Bond', 'Terminatör', 'Rocky Balboa', 'John Rambo',
  'Batman', 'Superman', 'Örümcek Adam', 'Spider-Man', 'Demir Adam', 'Iron Man', 'Hulk',
  'Kaptan Amerika', 'Thor', 'Joker', 'Mickey Mouse', 'Donald Duck', 'Tom ve Jerry',
  'Bugs Bunny', 'Temel Reis', 'Garfield', 'Red Kit', 'Şirin Baba', 'Gargamel',
  'Fred Çakmaktaş', 'Shrek', 'SüngerBob KareŞort', 'Pikachu', 'Super Mario',
  'Don Kişot', 'Drakula', 'Kont Drakula', 'Frankenstein', 'Küçük Prens', 'Robin Hood',
  'Pinokyo', 'Pamuk Prenses', 'Külkedisi', 'Kırmızı Başlıklı Kız', 'Aladdin',
  'Zeus', 'Herkül', 'Keloğlan', 'Nasreddin Hoca', 'Dede Korkut'
]

// ─────────────────────────────────────────────────────────────
// 2. TIER 2: YAYGIN BİLİNEN ÜNLÜLER & KARAKTERLER (~400-600 isim)
// ─────────────────────────────────────────────────────────────
const TIER_2_RAW = [
  // Popüler Türk Müzisyenler
  'Gülben Ergen', 'Hadise', 'Murat Boz', 'Gülşen', 'Aleyna Tilki', 'Edis', 'Simge',
  'Demet Akalın', 'Hande Yener', 'Sıla', 'Kenan Doğulu', 'Sertab Erener', 'Serdar Ortaç',
  'Mustafa Sandal', 'Haluk Levent', 'Teoman', 'Şebnem Ferah', 'Kayahan', 'Erkin Koray',
  'İlhan İrem', 'Mahsun Kırmızıgül', 'Özcan Deniz', 'Ebru Gündeş', 'Sibel Can',
  'Yıldız Tilbe', 'Emre Aydın', 'Manga', 'Duman', 'Mor ve Ötesi', 'Athena',
  'Gökhan Özoğuz', 'Ceza', 'Sagopa Kajmer', 'Ezhel', 'Uzi', 'Motive', 'Sefo', 'Reynmen',
  'Çelik', 'Bendeniz', 'Hakan Peker', 'Burak Kut', 'Yonca Evcimik', 'Aşkın Nur Yengi',
  'İzel', 'Ercan Saatçi', 'Yalın', 'Gökhan Tepe', 'Soner Sarıkabadayı', 'Ferhat Göçer',
  'Kıraç', 'Murat Kekilli', 'Cem Adrian', 'Mabel Matiz', 'Manuş Baba', 'Koray Avcı',
  'Kubat', 'Zara', 'Şevval Sam', 'Volkan Konak', 'Cengiz Kurtoğlu', 'Ümit Besen',
  'Hakan Altun', 'Coşkun Sabah', 'Muazzez Ersoy', 'Muazzez Abacı', 'Emel Sayın',
  'Nükhet Duru', 'Nilüfer', 'Erol Evgin', 'Selda Bağcan', 'Cahit Berkay', 'Moğollar',
  'Barış Akarsu', 'Kazım Koyuncu', 'İntizar', 'Ceylan', 'Alişan', 'Nihat Doğan',
  'Doğuş', 'Rober Hatemo', 'Kibariye', 'Güllü', 'Linet', 'Fatih Ürek', 'Kuşum Aydın',
  'Bedia Akartürk', 'Belkıs Akkale', 'İzzet Altınmeşe', 'Mahmut Tuncer', 'Latif Doğan',
  'Banu Alkan', 'Ahu Tuğba', 'Serpil Çakmaklı', 'Oya Aydoğan', 'Sinan Akçıl',
  'Mustafa Ceceli', 'Emre Altuğ', 'Berkay', 'Gökhan Özen', 'Tan Taşçı', 'Kutsi',
  'Gripin', 'Pinhani', 'Yüksek Sadakat', 'Redd', 'Fatma Turgut', 'Ceylan Ertem',
  'Kalben', 'Sena Şener', 'Melike Şahin', 'Emir Can İğrek', 'Köfn', 'Semicenk',
  'Dedublüman', 'Can Bonomo', 'Gökhan Türkmen', 'İlyas Yalçıntaş', 'Bilal Sonses',
  'Buray', 'Ece Seçkin', 'Derya Uluğ', 'İrem Derici', 'Tuğçe Kandemir', 'Melek Mosso',

  // Türk Oyuncular
  'Çetin Tekindor', 'Tolga Çevik', 'Bülent İnal', 'Engin Altan Düzyatan', 'Burak Özçivit',
  'Fahriye Evcen', 'Tolga Sarıtaş', 'Çağatay Ulusoy', 'Aras Bulut İynemli', 'Engin Akyürek',
  'Cansu Dere', 'Merve Dizdar', 'Farah Zeynep Abdullah', 'Kerem Bürsin', 'Demet Özdemir',
  'Pınar Deniz', 'Kaan Urgancıoğlu', 'Afra Saraçoğlu', 'Mert Ramazan Demir', 'Hazal Kaya',
  'Ali Atay', 'Serkan Keskin', 'Ahmet Kural', 'Murat Cemcir', 'Rasim Öztekin',
  'Erdal Beşikçioğlu', 'Perran Kutman', 'Gülşen Bubikoğlu', 'Kartal Tibet', 'Hulusi Kentmen',
  'Ali Şen', 'Ahmet Tarık Tekçe', 'Nubar Terziyan', 'Necdet Tosun', 'Erdal Özyağcılar',
  'Halit Ergenç', 'Bergüzar Korel', 'Okan Yalabık', 'Nebahat Çehre', 'Meryem Uzerli',
  'Vahide Perçin', 'Tuba Büyüküstün', 'Serenay Sarıkaya', 'Hande Erçel', 'Barış Arduç',
  'Elçin Sangu', 'Burcu Biricik', 'Özge Özpirinçci', 'Gökçe Bahadır', 'Salih Bademci',
  'Uraz Kaygılaroğlu', 'Feyyaz Yiğit', 'Kıvanç Kılınç', 'Doğu Demirkol', 'Hasan Can Kaya',
  'Kaan Sekban', 'Eser Yenenler', 'İbrahim Büyükak', 'Oğuzhan Koç', 'Büşra Pekin',
  'Şahin Irmak', 'Sarp Apak', 'Öner Erkan', 'Hasibe Eren', 'Gupse Özay', 'Ezgi Mola',
  'Demet Evgar', 'Songül Öden', 'Ceyda Düvenci', 'Berna Laçin', 'Zuhal Olcay',
  'Derya Baykal', 'Şafak Sezer', 'Ertan Saban', 'Önder Açıkbaş', 'Alper Kul',
  'Aylin Kontante', 'Meltem Cumbul', 'Mehmet Günsür', 'Nur Fettahoğlu', 'Ozan Güven',
  'Selma Ergeç', 'Engin Günaydın', 'Binnur Kaya', 'Necip Memili', 'Rıza Kocaoğlu',
  'Erkan Kolçak Köstendil', 'Taner Ölmez', 'Salih Kalyon', 'Zafer Algöz', 'Zerrin Tekindor',
  'Yurdaer Okur', 'İlker Kaleli', 'Birce Akalay', 'Buğra Gülsoy', 'Şükrü Özyıldız',
  'Hazal Subaşı', 'Burcu Özberk', 'Alp Navruz', 'Aytaç Şaşmaz', 'Deniz Baysal',
  'Ahmet Mümtaz Taylan', 'Ali İhsan Varol', 'Ulaş Tuna Astepe', 'Arif Erkin',
  'Alperen Duymaz', 'Berk Atan', 'Serkan Çayoğlu', 'Furkan Andıç', 'Boran Kuzum',
  'Dilan Çiçek Deniz', 'Ebru Şahin', 'Melis Sezen', 'Mert Yazıcıoğlu', 'Miray Daner',
  'Öykü Karayel', 'Özge Gürel', 'Özgü Namal', 'Pelin Akil', 'Pelin Karahan',
  'Seda Bakan', 'Selahattin Paşalı', 'Settar Tanrıöğen', 'Sinem Kobal', 'Şebnem Bozoklu',
  'Tolgahan Sayışman', 'Tuba Ünsal', 'Ufuk Bayraktar', 'Yiğit Özşener', 'Begüm Kütük',
  'Begüm Birgören', 'Başak Parlak', 'Ceyda Ateş', 'Bige Önal', 'Simay Barlas',
  'Sümeyye Aydoğan', 'Rabia Soytürk', 'Lizge Cömert', 'Su Burcu Yazgı Coşkun',
  'Onur Seyit Yaran', 'Cihan Şimşek', 'Yiğit Koçak', 'Halit Özgür Sarı',

  // Yabancı Sanatçılar (Tam Adıyla)
  'Adele', 'Billie Eilish', 'Dua Lipa', 'Bruno Mars', 'Katy Perry', 'Selena Gomez',
  'Ariana Grande', 'Ed Sheeran', 'Coldplay', 'Metallica', 'Queen', 'Pink Floyd',
  'Nirvana', 'Bob Marley', '2Pac', 'Tupac Shakur', 'Snoop Dogg', '50 Cent', 'Drake',
  'The Weeknd', 'Avicii', 'Daft Punk', 'Robert De Niro', 'Al Pacino', 'Anthony Hopkins',
  'Samuel L. Jackson', 'Clint Eastwood', 'George Clooney', 'Matt Damon', 'Ben Affleck',
  'Harrison Ford', 'Tom Hanks', 'Denzel Washington', 'Meryl Streep', 'Julia Roberts',
  'Scarlett Johansson', 'Emma Watson', 'Jennifer Aniston', 'Jennifer Lawrence',
  'Anne Hathaway', 'Natalie Portman', 'Hugh Jackman', 'Chris Hemsworth',
  'Robert Downey Jr.', 'Chris Evans', 'Mark Ruffalo', 'Ryan Reynolds', 'Cillian Murphy',
  'Heath Ledger', 'Christian Bale', 'Joaquin Phoenix', 'Pedro Pascal',
  'Timothée Chalamet', 'Zendaya', 'Woody Allen', 'Steven Spielberg', 'Christopher Nolan',
  'Quentin Tarantino', 'Martin Scorsese', 'Stanley Kubrick', 'Alfred Hitchcock',
  'Bradley Cooper',

  // Spor Dünyası
  'Arda Güler', 'Hakan Çalhanoğlu', 'Kerem Aktürkoğlu', 'Barış Alper Yılmaz', 'Semih Kılıçsoy',
  'Ferdi Kadıoğlu', 'Kenan Yıldız', 'Merih Demiral', 'Çağlar Söyüncü', 'Cenk Tosun',
  'Burak Yılmaz', 'Selçuk İnan', 'Emre Belözoğlu', 'Sergen Yalçın', 'Tugay Kerimoğlu',
  'Nihat Kahveci', 'İlkay Gündoğan', 'Mesut Özil', 'Cedi Osman', 'Alperen Şengün',
  'Furkan Korkmaz', 'Hidayet Türkoğlu', 'Mehmet Okur', 'İbrahim Kutluay', 'Eda Erdem',
  'Zehra Güneş', 'Melissa Vargas', 'Ebrar Karakurt', 'Hande Baladın', 'Gizem Örge',
  'Mete Gazoz', 'Busenaz Sürmeneli', 'Buse Naz Çakıroğlu', 'Rıza Kayaalp', 'Taha Akgül',
  'Servet Tazegül', 'Hamza Yerlikaya', 'Halil Mutlu', 'Semih Saygıner', 'Kenan Sofuoğlu',
  'Toprak Razgatlıoğlu', 'Erling Haaland', 'Mauro Icardi', 'Edin Dzeko', 'Dusan Tadic',
  'Dries Mertens', 'Lucas Torreira', 'Vincent Aboubakar', 'Fred', 'Dominik Livakovic',
  'Rafa Silva', 'Ciro Immobile', 'Victor Osimhen', 'Zlatan Ibrahimovic', 'Karim Benzema',
  'Robert Lewandowski', 'Luka Modric', 'Kevin De Bruyne', 'Mohamed Salah',
  'Gianluigi Buffon', 'Manuel Neuer', 'Thierry Henry', 'Stephen Curry',
  'Giannis Antetokounmpo', 'Novak Djokovic', 'Rafael Nadal', 'Serena Williams',
  'Lewis Hamilton', 'Max Verstappen', 'Conor McGregor', 'Khabib Nurmagomedov',
  'Carlos Alcaraz', 'Jannik Sinner', 'Pep Guardiola', 'Jose Mourinho', 'Carlo Ancelotti',
  'Jürgen Klopp', 'Arsène Wenger', 'Alex Ferguson', 'Didier Drogba', 'Wesley Sneijder',
  'Robin van Persie', 'Dirk Kuyt', 'Mario Gomez', 'Ricardo Quaresma', 'Pepe', 'Talisca',

  // Tarih / Edebiyat / Bilim
  'Barbaros Hayreddin Paşa', 'Piri Reis', 'Hacı Bektaş-ı Veli', 'Evliya Çelebi',
  'Osman Hamdi Bey', 'Namık Kemal', 'Mehmet Akif Ersoy', 'Ziya Gökalp', 'Nazım Hikmet',
  'Orhan Veli Kanık', 'Necip Fazıl Kısakürek', 'Yaşar Kemal', 'Aziz Nesin', 'Oğuz Atay',
  'Sabahattin Ali', 'Halide Edip Adıvar', 'Reşat Nuri Güntekin', 'Peyami Safa',
  'Ahmet Hamdi Tanpınar', 'Aziz Sancar', 'Cahit Arf', 'İlber Ortaylı', 'Celal Şengör',
  'Halil İnalcık', 'Adnan Menderes', 'Turgut Özal', 'Süleyman Demirel', 'Bülent Ecevit',
  'Necmettin Erbakan', 'Alparslan Türkeş', 'Deniz Gezmiş', 'Uğur Mumcu', 'Abdi İpekçi',
  'Attila', 'Cengiz Han', 'Timur', 'Selahaddin Eyyubi', 'Alparslan', 'Mete Han',
  'Bilge Kağan', 'Konfüçyüs', 'Buda', 'Sokrates', 'Platon', 'Aristoteles', 'Karl Marx',
  'Friedrich Nietzsche', 'Sigmund Freud', 'Charles Darwin', 'Stephen Hawking',
  'Marie Curie', 'Thomas Edison', 'Alexander Graham Bell', 'Louis Pasteur', 'Pisagor',
  'Arşimet', 'Hipokrat', 'Kleopatra', 'Spartaküs', 'Jeanne d\'Arc', 'Kraliçe Victoria',
  'John F. Kennedy', 'Martin Luther King', 'Ömer Hayyam', 'İbn-i Haldun',

  // Dizi / Film Karakterleri
  'Walter White', 'Jesse Pinkman', 'Saul Goodman', 'Jon Snow', 'Daenerys Targaryen',
  'Tyrion Lannister', 'Thomas Shelby', 'Arthur Shelby', 'Vito Corleone', 'Michael Corleone',
  'Tony Montana', 'Frodo Baggins', 'Aragorn', 'Legolas', 'Gollum', 'Sauron',
  'Neo', 'Morpheus', 'John Wick', 'Forrest Gump', 'Indiana Jones', 'Hannibal Lecter',
  'Tyler Durden', 'Patrick Bateman', 'Jordan Belfort', 'Profesör', 'Berlin', 'Tokyo',
  'Michael Scofield', 'Theodore Bagwell', 'Dexter Morgan', 'Wednesday Addams',
  'Eleven', 'Homelander', 'Memati Baş', 'Abdülhey Çoban', 'Seyfo Dayı', 'Aslan Akbey',
  'Testere Necmi', 'Laz Ziya', 'İskender Büyük', 'Pala', 'Ezel Bayraktar',
  'Eyşan Tezcan', 'Cengiz Atay', 'Kerpeten Ali', 'Behzat Ç.', 'Harun', 'Hayalet',
  'Akbaba', 'Ercüment Çözer', 'Yamaç Koçovalı', 'İdris Koçovalı', 'Vartolu Sadettin',
  'Cumali Koçovalı', 'Aliço', 'Mecnun Çınar', 'İsmail Abi', 'Erdal Bakkal',
  'Yılmaz', 'İlkkan', 'Ersoy', 'Gaffur Aksoy', 'Şahika Koçarslanlı', 'Kuzey Tekinoğlu',
  'Güney Tekinoğlu', 'Rıza Baba', 'Mesut Komiser', 'Hüsnü Çoban', 'Hızır Çakırbeyli',
  'İlyas Çakırbeyli', 'Komutan Logar', 'Robot 216', 'Bob Marley Faruk', 'Erşan Kuneri',

  // Çizgi & Kurgusal
  'Deadpool', 'Wolverine', 'Kara Dul', 'Black Widow', 'Doktor Strange', 'Doctor Strange',
  'Flash', 'Aquaman', 'Wonder Woman', 'Harley Quinn', 'Thanos', 'Venom', 'Patrick Yıldız',
  'Squidward', 'Bay Yengeç', 'Plankton', 'Goofy', 'Daffy Duck', 'Tweety', 'Sylvester',
  'Scooby-Doo', 'Shaggy', 'Safinaz', 'Kabasakal', 'Joe Dalton', 'Asteriks', 'Oburiks',
  'Tenten', 'Şirine', 'Barni Moloztaş', 'Cedric', 'Heidi', 'Winnie the Pooh',
  'Simba', 'Mufasa', 'Scar', 'Fiona', 'Eşek', 'Çizmeli Kedi', 'Kung Fu Panda',
  'Manny', 'Sid', 'Diego', 'Scrat', 'Woody', 'Buzz Lightyear', 'Şimşek McQueen',
  'Nemo', 'Gru', 'Minyonlar', 'Ben 10', 'Samurai Jack', 'Johnny Bravo', 'Gumball',
  'Mordecai', 'Rigby', 'Finn', 'Jake', 'Rafadan Tayfa', 'Hayri', 'Kamil', 'Kral Şakir',
  'Fil Necati', 'Pepee', 'Ash Ketchum', 'Goku', 'Vegeta', 'Naruto Uzumaki',
  'Sasuke Uchiha', 'Kakashi Hatake', 'Monkey D. Luffy', 'Roronoa Zoro', 'Sailor Moon',
  'Kaptan Tsubasa', 'Luigi', 'Prenses Peach', 'Bowser', 'Sonic', 'Link', 'Pac-Man',
  'Crash Bandicoot', 'Lara Croft', 'Kratos', 'Geralt of Rivia', 'Arthur Morgan',
  'John Marston', 'CJ', 'Tommy Vercetti', 'Trevor Philips', 'Niko Bellic',
  'Master Chief', 'Doom Slayer', 'Gordon Freeman', 'Nathan Drake', 'Joel Miller',
  'Ellie Williams', 'Scorpion', 'Sub-Zero', 'Ryu', 'Steve', 'Creeper', 'Dorian Gray',
  'Raskolnikov', 'Jean Valjean', 'Müfettiş Javert', 'Robinson Crusoe', 'Gulliver',
  'Tom Sawyer', 'Oliver Twist', 'Romeo', 'Juliet', 'Hamlet', 'Macbeth', 'Faust',
  'Alice', 'Şapkacı', 'Moby Dick', 'Tarzan', 'Peter Pan', 'Kaptan Kanca',
  'Tinker Bell', 'Gepetto Usta', 'Rapunzel', 'Uyuyan Güzel', 'Poseidon', 'Hades',
  'Medusa', 'Afrodit', 'Ares', 'Hermes', 'Apollo', 'Artemis', 'Athena', 'Odin',
  'Loki', 'Anubis', 'Ra', 'Osiris', 'İsis', 'Şahmeran', 'Köroğlu'
]

// ─────────────────────────────────────────────────────────────
// SET'LERE NORMALİZE EDİLMİŞ ŞEKİLDE EKLE
// ─────────────────────────────────────────────────────────────
const TIER_1_SET = new Set(TIER_1_RAW.map(normalizeName))
const TIER_2_SET = new Set(TIER_2_RAW.map(normalizeName))

function classifyPerson(item) {
  const norm = normalizeName(item.name)
  const baseNorm = normalizeName(item.name.replace(/\s*\([^)]*\)/g, ''))

  // 1. TIER 1 KONTROLÜ (Kesin Eşleşme)
  if (TIER_1_SET.has(norm) || TIER_1_SET.has(baseNorm)) {
    return 1
  }

  // 2. TIER 2 KONTROLÜ (Kesin Eşleşme)
  if (TIER_2_SET.has(norm) || TIER_2_SET.has(baseNorm)) {
    return 2
  }

  // 3. TIER 3 (Genel Kültürde Belli Bir Alan/Dönem Takipçilerince Bilinenler)
  if (item.category === 'cizgi_karakterler') {
    return 3
  }
  if (item.category === 'dizi_film_karakterleri') {
    // Parantez içinde dizi/film adı olan karakterler Tier 3, diğerleri Tier 4
    if (/\(.*\)/.test(item.name)) {
      return 3
    }
    return 4
  }
  if (item.category === 'tarihi_kisiler') {
    const lower = item.name.toLocaleLowerCase('tr')
    if (/sultan|padişah|kral|kraliçe|imparator|cumhurbaşkanı|başbakan|filozof|bilim|nobel/i.test(lower)) {
      return 3
    }
    if (/I\.|II\.|III\.|IV\.|V\.|VI\.|VII\.|VIII\.|IX\.|X\./.test(item.name)) {
      return 3
    }
    // Nişli / eski stubs
    if (/m\.ö\.|valisi|sadrazam|mutasarrıf|kadı|beylerbeyi|müderris|oğlu/i.test(lower) || item.name.length > 22) {
      return 5
    }
    return 4
  }

  if (item.category === 'sporcular') {
    const lower = item.name.toLocaleLowerCase('tr')
    if (/milli|şampiyon|olimpiyat|süper lig|fc|sk/i.test(lower)) {
      return 3
    }
    if (/[éèêëàâäôöûüïîç]/i.test(item.name) || item.name.length > 22 || /güreş|boks|atlet|kürek|halter|voleybolcu|basketbolcu/i.test(lower)) {
      return 5
    }
    return 4
  }

  if (item.category === 'unluler') {
    if (item.name.length > 24 || item.name.split(' ').length >= 4) {
      return 5
    }
    return 4
  }

  return 4
}

async function main() {
  console.log('📖 famousPeopleData.ts okunuyor...')
  const content = readFileSync(DATA_FILE, 'utf-8')
  
  const seedMatch = content.match(/export const FAMOUS_PEOPLE_SEED: FamousPersonSeed\[\] = (\[[\s\S]*?\n\])/)
  if (!seedMatch || !seedMatch[1]) {
    throw new Error('FAMOUS_PEOPLE_SEED dizisi bulunamadı!')
  }
  
  const seedArray = JSON.parse(seedMatch[1])
  const totalCount = seedArray.length
  console.log(`📊 Toplam ${totalCount} isim bulundu.`)
  
  const BATCH_SIZE = 100
  let lastProcessedIndex = 0
  
  while (lastProcessedIndex < totalCount) {
    const endIndex = Math.min(lastProcessedIndex + BATCH_SIZE, totalCount)
    for (let i = lastProcessedIndex; i < endIndex; i++) {
      seedArray[i].fameTier = classifyPerson(seedArray[i])
    }
    lastProcessedIndex = endIndex
  }

  // Dağılım Kontrolü
  console.log('\n🔍 Doğrulama ve Dağılım Raporu:')
  const tierCounts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  let missingFameTier = 0
  
  for (const item of seedArray) {
    if (!item.fameTier || item.fameTier < 1 || item.fameTier > 5) {
      missingFameTier++
    } else {
      tierCounts[item.fameTier]++
    }
  }
  
  if (missingFameTier > 0) {
    throw new Error(`❌ HATA: ${missingFameTier} adet ismin fameTier değeri boş veya geçersiz!`)
  }
  
  const tier1Pct = ((tierCounts[1] / totalCount) * 100).toFixed(1)
  const tier2Pct = ((tierCounts[2] / totalCount) * 100).toFixed(1)
  const tier3Pct = ((tierCounts[3] / totalCount) * 100).toFixed(1)
  const tier4Pct = ((tierCounts[4] / totalCount) * 100).toFixed(1)
  const tier5Pct = ((tierCounts[5] / totalCount) * 100).toFixed(1)
  const tier1And2Pct = (((tierCounts[1] + tierCounts[2]) / totalCount) * 100).toFixed(1)
  
  console.log(`- Tier 1 (Çok Ünlü): ${tierCounts[1]} isim (%${tier1Pct})`)
  console.log(`- Tier 2 (Ünlü): ${tierCounts[2]} isim (%${tier2Pct})`)
  console.log(`- Tier 3 (Orta Derece Bilinen): ${tierCounts[3]} isim (%${tier3Pct})`)
  console.log(`- Tier 4 (Az Bilinen): ${tierCounts[4]} isim (%${tier4Pct})`)
  console.log(`- Tier 5 (Nişli): ${tierCounts[5]} isim (%${tier5Pct})`)
  console.log(`👉 Toplam Tier 1 + Tier 2: ${tierCounts[1] + tierCounts[2]} isim (%${tier1And2Pct})`)
  
  // Örnek kontrol: Brad Sherwood ve Erdöl Boratap ne oldu?
  const brad = seedArray.find(i => i.name === 'Brad Sherwood')
  const erdol = seedArray.find(i => i.name === 'Erdöl Boratap')
  const gulben = seedArray.find(i => i.name === 'Gülben Ergen')
  console.log(`\n🎯 Özel Kontroller:`)
  console.log(`- Brad Sherwood: Tier ${brad?.fameTier}`)
  console.log(`- Erdöl Boratap: Tier ${erdol?.fameTier}`)
  console.log(`- Gülben Ergen: Tier ${gulben?.fameTier}`)

  let newContent = content
  
  const formattedJson = JSON.stringify(seedArray, null, 2)
  newContent = newContent.replace(
    /export const FAMOUS_PEOPLE_SEED: FamousPersonSeed\[\] = \[[\s\S]*?\n\]/,
    `export const FAMOUS_PEOPLE_SEED: FamousPersonSeed[] = ${formattedJson}`
  )
  
  writeFileSync(DATA_FILE, newContent, 'utf-8')
  console.log('\n✅ famousPeopleData.ts başarıyla güncellendi!')
}

main().catch(err => {
  console.error('❌ Hata:', err)
  process.exit(1)
})

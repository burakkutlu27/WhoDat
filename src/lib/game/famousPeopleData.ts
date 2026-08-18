export type FamousPersonCategory =
  | 'all'
  | 'unluler'
  | 'tarihi_kisiler'
  | 'cizgi_karakterler'
  | 'sporcular'
  | 'dizi_film_karakterleri'

export interface CategoryInfo {
  id: FamousPersonCategory
  label: string
  icon: string
  color: string
}

export const CATEGORIES: CategoryInfo[] = [
  { id: 'all', label: 'Tümü / Karışık', icon: '🎲', color: 'pencil-yellow' },
  { id: 'unluler', label: 'Ünlüler', icon: '🎭', color: 'pencil-red' },
  { id: 'tarihi_kisiler', label: 'Tarihi Kişiler', icon: '🏛️', color: 'pencil-blue' },
  { id: 'cizgi_karakterler', label: 'Kurgusal & Çizgi', icon: '🎨', color: 'pencil-purple' },
  { id: 'sporcular', label: 'Sporcular', icon: '⚽', color: 'pencil-green' },
  { id: 'dizi_film_karakterleri', label: 'Dizi & Film', icon: '🎬', color: 'pencil-orange' },
]

export interface FamousPersonItem {
  id: string
  name: string
  category: Exclude<FamousPersonCategory, 'all'>
  fameTier?: number
}

export interface FamousPersonSeed {
  name: string
  category: string
  fameTier: number
}

export const FAMOUS_PEOPLE_SEED: FamousPersonSeed[] = [
  {
    "name": "Novak Djokovic",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Rafael Nadal",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Roger Federer",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Usain Bolt",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Mike Tyson",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Muhammed Ali",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Stephen Curry",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Shaquille O'Neal",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "LeBron James",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Kobe Bryant",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Michael Jordan",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Luka Modric",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Robert Lewandowski",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Karim Benzema",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Zlatan Ibrahimovic",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Erling Haaland",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Neymar",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Ronaldo (Nazário)",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Ronaldinho",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "David Beckham",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Zinedine Zidane",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Pelé",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Cristiano Ronaldo",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Dusan Tadic",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Edin Dzeko",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Mauro Icardi",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Toprak Razgatlıoğlu",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Kenan Sofuoğlu",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Semih Saygıner",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Halil Mutlu",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Hamza Yerlikaya",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Taha Akgül",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Rıza Kayaalp",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Mete Gazoz",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Zehra Güneş",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Mehmet Okur",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "İlkay Gündoğan",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Kenan Yıldız",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Kerem Aktürkoğlu",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Hakan Çalhanoğlu",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Sergen Yalçın",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Rüştü Reçber",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Volkan Demirel",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Fernando Muslera",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Gheorghe Hagi",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Naim Süleymanoğlu",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Hakan Şükür",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Şenol Güneş",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Fatih Terim",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Jackie Chan",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Keanu Reeves",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Will Smith",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Morgan Freeman",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Marilyn Monroe",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Sylvester Stallone",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Arnold Schwarzenegger",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Johnny Depp",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Angelina Jolie",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Tom Cruise",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Leonardo DiCaprio",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Brad Pitt",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Taylor Swift",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Beyoncé",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Rihanna",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Shakira",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Eminem",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Elvis Presley",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Freddie Mercury",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Madonna",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Michael Jackson",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Kenan Doğulu",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Serdar Ortaç",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Gülşen",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Murat Boz",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Hadise",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Yıldız Tilbe",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Beren Saat",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Kıvanç Tatlıtuğ",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Haluk Bilginer",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Beyazıt Öztürk",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Yılmaz Erdoğan",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Nejat Uygur",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Levent Kırca",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Metin Akpınar",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Kadir İnanır",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Hülya Koçyiğit",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Türkan Şoray",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Tarık Akan",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Münir Özkul",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Halit Akçatepe",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Şener Şen",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Cem Yılmaz",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Kemal Sunal",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Aşık Veysel",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Neşet Ertaş",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Orhan Gencebay",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Ahmet Kaya",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Zeki Müren",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "İbrahim Tatlıses",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Müslüm Gürses",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Sezen Aksu",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Tarkan",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Kleopatra",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Thomas Edison",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Stephen Hawking",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Charles Darwin",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Sigmund Freud",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Aristoteles",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Platon",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Sokrates",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Celal Şengör",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "İlber Ortaylı",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Cahit Arf",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Mete Han",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Alparslan",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Selahaddin Eyyubi",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Attila",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Timur",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Cengiz Han",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Prenses Diana",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Kraliçe II. Elizabeth",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Che Guevara",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Nelson Mandela",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Mahatma Gandhi",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Joseph Stalin",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Vladimir Lenin",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Abraham Lincoln",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Adolf Hitler",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Napolyon Bonapart",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Jül Sezar",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Büyük İskender",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Kristof Kolomb",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Nikola Tesla",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Leonardo da Vinci",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Isaac Newton",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Piri Reis",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Barbaros Hayreddin Paşa",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Yunus Emre",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Mimar Sinan",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Mevlana Celaleddin Rumi",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "II. Abdülhamid",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Osman Gazi",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Yavuz Sultan Selim",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Kanuni Sultan Süleyman",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Fatih Sultan Mehmet",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "İsmet İnönü",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Mustafa Kemal Atatürk",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Vito Corleone (Baba / The Godfather)",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Michael Corleone",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Sonny Corleone",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Tony Montana (Yaralı Yüz / Scarface)",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Walter White (Heisenberg)",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Jesse Pinkman",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Saul Goodman (Jimmy McGill)",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Gus Fring",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Mike Ehrmantraut",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Hank Schrader",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Thomas Shelby (Peaky Blinders)",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Arthur Shelby",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Polly Gray (Peaky Blinders)",
    "category": "dizi_film_karakterleri",
    "fameTier": 3
  },
  {
    "name": "Alfie Solomons",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Jon Snow (Game of Thrones)",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Daenerys Targaryen",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Tyrion Lannister",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Cersei Lannister",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Jaime Lannister",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Arya Stark",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Sansa Stark",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Ned Stark",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Gece Kralı (Night King)",
    "category": "dizi_film_karakterleri",
    "fameTier": 3
  },
  {
    "name": "Harry Potter",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Hermione Granger",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Ron Weasley",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Lord Voldemort",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Albus Dumbledore",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Severus Snape",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Sirius Black",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Rubeus Hagrid",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Draco Malfoy",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Bellatrix Lestrange",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Dobby (Ev Cini)",
    "category": "dizi_film_karakterleri",
    "fameTier": 3
  },
  {
    "name": "Frodo Baggins",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Samwise Gamgee",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Gandalf (Gri/Ak Gandalf)",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Aragorn (Yolgezer)",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Legolas",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Gimli",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Boromir",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Gollum (Smeagol)",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Sauron",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Saruman",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Bilbo Baggins",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Luke Skywalker",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Darth Vader (Anakin Skywalker)",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Prenses Leia",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Han Solo",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Chewbacca",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Yoda (Usta Yoda)",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Obi-Wan Kenobi",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "İmparator Palpatine",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Darth Maul",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Kylo Ren",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Mandalorian (Din Djarin)",
    "category": "dizi_film_karakterleri",
    "fameTier": 3
  },
  {
    "name": "Bebek Yoda (Grogu)",
    "category": "dizi_film_karakterleri",
    "fameTier": 3
  },
  {
    "name": "Kaptan Jack Sparrow",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Will Turner",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Elizabeth Swann",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Kaptan Hector Barbossa",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Davy Jones",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Sherlock Holmes",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Dr. John Watson",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Profesör James Moriarty",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "James Bond (007)",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Neo (Matrix / Thomas Anderson)",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Morpheus (Matrix)",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Trinity (Matrix)",
    "category": "dizi_film_karakterleri",
    "fameTier": 3
  },
  {
    "name": "Ajan Smith",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "John Wick",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Terminatör (T-800)",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Sarah Connor",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Forrest Gump",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Indiana Jones",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Rocky Balboa",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "John Rambo",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Hannibal Lecter",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Tyler Durden (Dövüş Kulübü)",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Patrick Bateman (Amerikan Sapığı)",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Jordan Belfort (Para Avcısı)",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Profesör (La Casa de Papel)",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Berlin (La Casa de Papel)",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Tokyo (La Casa de Papel)",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Michael Scofield (Prison Break)",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Theodore Bagwell (T-Bag)",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Dexter Morgan",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Wednesday Addams",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Eleven (Stranger Things)",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Homelander (The Boys)",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Billy Butcher (The Boys)",
    "category": "dizi_film_karakterleri",
    "fameTier": 3
  },
  {
    "name": "Polat Alemdar",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Süleyman Çakır",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Memati Baş",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Abdülhey Çoban",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Seyfo Dayı",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Aslan Akbey",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Testere Necmi",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Laz Ziya",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "İskender Büyük",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Pala (Kurtlar Vadisi)",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Ramiz Dayı (Ramiz Karaeski)",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Ezel Bayraktar",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Eyşan Tezcan",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Cengiz Atay",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Kerpeten Ali (Ali Kırgız)",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Kenan Birkan",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Tefo (Tevfik Zaim)",
    "category": "dizi_film_karakterleri",
    "fameTier": 3
  },
  {
    "name": "Behzat Ç.",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Harun (Behzat Ç.)",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Hayalet (Behzat Ç.)",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Akbaba (Behzat Ç.)",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Ercüment Çözer",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Behlül Haznedar",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Bihter Ziyagil",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Adnan Ziyagil",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Firdevs Yöreoğlu",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Matmazel (Aşk-ı Memnu)",
    "category": "dizi_film_karakterleri",
    "fameTier": 3
  },
  {
    "name": "Yamaç Koçovalı",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "İdris Koçovalı",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Vartolu Sadettin",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Cumali Koçovalı",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Aliço (Çukur)",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Mecnun Çınar",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "İsmail Abi",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Erdal Bakkal",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Yılmaz (Gibi)",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "İlkkan (Gibi)",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Ersoy (Gibi)",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Burhan Altıntop",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Gaffur Aksoy",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Şahika Koçarslanlı",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Kuzey Tekinoğlu",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Güney Tekinoğlu",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Rıza Baba (Arka Sokaklar)",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Mesut Komiser",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Hüsnü Çoban",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Hızır Çakırbeyli (EDHO)",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "İlyas Çakırbeyli",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Recep İvedik",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "İnek Şaban",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Damat Ferit",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Güdük Necmi",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Mahmut Hoca (Kel Mahmut)",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Badi Ekrem",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Tosun Paşa",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Hakiki Tosun Paşa",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Kibar Feyzo",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Maho Ağa",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Züğürt Ağa",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Turist Ömer",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Arif Işık (G.O.R.A.)",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Komutan Logar",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Robot 216",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Bob Marley Faruk",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Erşan Kuneri",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Don Kişot (Don Quijote)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Sanço Panço (Sancho Panza)",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Kont Drakula (Dracula)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Frankenstein (Canavar)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Dorian Gray",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Raskolnikov (Suç ve Ceza)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Jean Valjean (Sefiller)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Müfettiş Javert",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Küçük Prens (Le Petit Prince)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Robinson Crusoe",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Cuma (Robinson Crusoe)",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Gulliver (Gulliver’in Gezileri)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Huckleberry Finn",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Tom Sawyer",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Oliver Twist",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Romeo (Romeo ve Juliet)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Juliet (Romeo ve Juliet)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Hamlet",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Kral Lear",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Macbeth",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Othello",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Faust (Goethe)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Mefistofeles (Faust)",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Alice (Harikalar Diyarında)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Şapkacı (Mad Hatter)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Kupa Kraliçesi (Queen of Hearts)",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Cheshire Kedisi",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Zeze (Şeker Portakalı)",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Kaptan Ahab (Moby Dick)",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Moby Dick (Beyaz Balina)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Tarzan",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Robin Hood",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Peter Pan",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Kaptan Kanca (Captain Hook)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Tinker Bell",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Pinokyo (Pinocchio)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Gepetto Usta",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Kırmızı Başlıklı Kız",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Kötü Kalpli Kurt (Masal)",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Pamuk Prenses",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Külkedisi (Sindirella)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Rapunzel",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Uyuyan Güzel",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Aladdin (Alaaddin)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Sihirli Lambanın Cini",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Ali Baba (Kırk Haramiler)",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Sinbad (Denizci Sinbad)",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Zeus (Yunan Baş Tanrısı)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Poseidon (Denizler Tanrısı)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Hades (Yeraltı Tanrısı)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Herkül (Herakles)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Medusa (Yılan Saçlı)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Afrodit (Aşk Tanrıçası)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Ares (Savaş Tanrısı)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Hermes (Haberci Tanrı)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Apollo (Güneş Tanrısı)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Artemis (Avcılık Tanrıçası)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Athena (Bilgelik Tanrıçası)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Odin (İskandinav Baş Tanrısı)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Thor (Şimşek Tanrısı)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Loki (Fesatlık Tanrısı)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Freya",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Anubis (Mısır Ölüm Tanrısı)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Ra (Güneş Tanrısı)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Osiris",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "İsis",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Şahmeran (Yılanların Şahı)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Keloğlan",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Nasreddin Hoca",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Dede Korkut",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Köroğlu",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Batman (Bruce Wayne)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Joker",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Superman (Clark Kent)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Örümcek Adam (Spider-Man / Peter Parker)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Demir Adam (Iron Man / Tony Stark)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Kaptan Amerika (Steve Rogers)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Thor (Marvel)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Hulk (Bruce Banner)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Kara Dul (Black Widow / Natasha Romanoff)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Doktor Strange (Stephen Strange)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Deadpool (Wade Wilson)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Wolverine (Logan)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Flash (Barry Allen)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Aquaman (Arthur Curry)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Wonder Woman (Diana Prince)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Harley Quinn",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Thanos",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Venom",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "SüngerBob KareŞort",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Patrick Yıldız",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Squidward",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Bay Yengeç",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Plankton",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Mickey Mouse",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Donald Duck",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Goofy",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Bugs Bunny",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Daffy Duck",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Tweety",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Sylvester",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Tom ve Jerry",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Scooby-Doo",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Shaggy",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Temel Reis",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Safinaz",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Kabasakal",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Garfield",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Red Kit (Lucky Luke)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Joe Dalton",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Asteriks (Asterix)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Oburiks (Obelix)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Tenten (Tintin)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Şirin Baba",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Şirine",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Gargamel",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Fred Çakmaktaş",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Barni Moloztaş",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Cedric",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Heidi",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Winnie the Pooh",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Simba (Aslan Kral)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Mufasa",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Scar (Aslan Kral)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Shrek",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Fiona (Shrek)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Eşek (Shrek)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Çizmeli Kedi",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Kung Fu Panda (Po)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Manny (Buz Devri)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Sid (Buz Devri)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Diego (Buz Devri)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Scrat (Buz Devri)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Woody (Oyuncak Hikayesi)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Buzz Lightyear",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Şimşek McQueen (Arabalar)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Nemo (Kayıp Balık Nemo)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Gru (Çılgın Hırsız)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Minyonlar (Minions)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Ben 10",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Samurai Jack",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Johnny Bravo",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Gumball",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Darwin (Gumball)",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Mordecai (Sürekli Dizi)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Rigby (Sürekli Dizi)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Finn (Adventure Time)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Jake (Adventure Time)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Rafadan Tayfa",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Hayri (Rafadan Tayfa)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Kamil (Rafadan Tayfa)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Kral Şakir",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Fil Necati",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Pepee",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Pikachu (Pokemon)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Ash Ketchum (Pokemon)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Goku (Dragon Ball)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Vegeta (Dragon Ball)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Naruto Uzumaki",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Sasuke Uchiha",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Kakashi Hatake",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Monkey D. Luffy (One Piece)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Roronoa Zoro (One Piece)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Sailor Moon (Ay Savaşçısı)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Kaptan Tsubasa (Tsubasa Ozora)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Kojiro Hyuga",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Super Mario",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Luigi",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Prenses Peach",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Bowser",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Sonic (Kirpi Sonic)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Link (Zelda)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Prenses Zelda",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Pac-Man",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Crash Bandicoot",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Lara Croft (Tomb Raider)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Kratos (God of War)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Atreus (God of War)",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Rivialı Geralt (The Witcher)",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Ciri (The Witcher)",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Yennefer of Vengerberg",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Arthur Morgan (Red Dead Redemption 2)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "John Marston (Red Dead Redemption)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "CJ (Carl Johnson - GTA San Andreas)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Tommy Vercetti (GTA Vice City)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Trevor Philips (GTA V)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Niko Bellic (GTA IV)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Master Chief (Halo)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Doom Slayer (Doom)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Gordon Freeman (Half-Life)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Nathan Drake (Uncharted)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Joel Miller (The Last of Us)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Ellie Williams (The Last of Us)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Scorpion (Mortal Kombat)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Sub-Zero (Mortal Kombat)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Ryu (Street Fighter)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Steve (Minecraft)",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Creeper (Minecraft)",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Abdulkadir Tuncer",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Abdullah Şahin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Abdullah Yüce",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Abdurrahman Palay",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Abdülhennan Sefa",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Abidin Görsev",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Abidin Yerebakan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Numan Acar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Adem Ayral",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Adem Taşay",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Adnan Biricik",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Adnan Karabacak",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Adnan Maral",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Adnan Mersinli",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Adnan Tönel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Agah Hün",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ahmet Ağgün",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ahmet Arıman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ahmet Fehim",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ahmet Gülhan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ahmet Kayakesen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ahmet Kostarika",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ahmet Kural",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Ahmet Levendoğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ahmet Mümtaz Taylan",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Ahmet Özhan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ahmet Rıfat Şungar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ahmet Saraçoğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ahmet Sezerel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ahmet Şafak",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ahmet Tarık Tekçe",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Ahmet Uğurlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ahmet Uz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ahmet Üstel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ahmet Üstün",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ahmet Varlı",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ahmet Yenilmez",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ajlan Aktuğ",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ozan Akbaba",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Akın Akınözü",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Akın Tunç",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Akın Uğurlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Akif Kilman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Akil Öztuna",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alaeddin Şensoy",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Zeki Alasya",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Alev Sezer",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Abdi Algül",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Sadri Alışık",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Ali Atay",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Ali Avaz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Barışık",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Başar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Berktay",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Biçim",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Buhara Mete",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Cağaloğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Çatalbaş",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Çelik",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Demir",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Demirel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Ecder Akışık",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Erkazan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Ersan Duru",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Fuat Onan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Güney",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Hürol",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali İhsan Bozdemir",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali İhsan Varol",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Ali İl",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali İnce",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali İpin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Karagöz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Kemal İskender",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Meriç",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Osman Okumuş",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Poyrazoğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Rıza Kubilay",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Rıza Soydan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Seçkiner Alıcı",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Sirmen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Sunal",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Sururi",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Sürmeli",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Taygun",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Tutal",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Uyandıran",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Üstüntaş",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Yalaz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Yaylı",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alican Albayrak",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alican Yücesoy",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alişan",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Alp Çoker",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alp Kırşan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alp Korkmaz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alp Navruz",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Alpaslan Özmol",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alpay İzer",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alpay Kemal Atalan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alper Atak",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alper Kul",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Alper Rende",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alper Saldıran",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alperen Duymaz",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Alptekin Serdengeçti",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Altan Akışık",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Altan Bozkurt",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Altan Erbulak",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Altan Erkekli",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Altan Günbay",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hüseyin Altın",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Andrew Hughes",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anıl İlter",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anıl Tetik",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ankaralı Turgut",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ararat Mor",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aras Aydın",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aras Bulut İynemli",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Arda Aydın",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Arda Esen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Arda Kanpolat",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Arda Kural",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Arda Öziri",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Barış Arduç",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Argun Kınal",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Arif Akkaya",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Arif Erkin Güzelbeyoğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Arif Kilisli",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Arif Pişkin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cüneyt Arkın",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Arslan Kacar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Arşavir Alyanak",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Asım Par",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aslan Altın",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ulaş Tuna Astepe",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Asuman Korad",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ata Berk Mutlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ata Demirer",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Ata Saka",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Atacan Arseven",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Atakan Çelik",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Atalay Demirci",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "İrfan Atasoy",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Atıf Kaptan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Atilla Alpar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Atilla Arcan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Atilla Ergün",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Atilla Pekdemir",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Atilla Saral",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Atilla Şendil",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Atilla Yiğit",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Atsız Karaduman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Attila Olgaç",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Mustafa Avkıran",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Avni Dilligil",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Avni Yalçın",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayberk Attila",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayberk Pekcan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aydemir Akbaş",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aydın Babaoğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aydın Haberdar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aydın Tezel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aydın Tolan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayhan Hülagü",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayhan Işık",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayhan Kavas",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ozan Ayhan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aykut Oray",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aykut Sözeri",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aykut Şahin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aytaç Arman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aytaç Şaşmaz",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Aytaç Uşun",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aytaç Yürükaslan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aytekin Akkaya",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayton Sert",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Azer Bülbül",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aziz Aslan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aziz Basmacı",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aziz Sarvan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bahadır Tok",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bahri Ateş",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bahri Beyat",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bahtiyar Engin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Baki Çallıoğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Baki Tamer",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Barış Alpaykut",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Barış Atay",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Barış Bağcı",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Barış Çakmak",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Barış Falay",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Barış Kılıç",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Barış Koçak",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Barış Murat Yağcı",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Barış Sezer",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Barış Yıldız",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Batuhan Aydar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Batuhan Karacakaya",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bayhan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Baykal Kent",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bedir Bedir",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bedri Uğur",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Behçet Nacar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Behzat Uygur",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bekir Aksoy",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Beklan Algan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Berat Efe Parlar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Berat Yenilmez",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Berhan Şimşek",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Berk Atan",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Berk Bakioğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Berk Hakman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Berkan Şal",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Berkay Ateş",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Berke Üzrek",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Berker Güven",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Beyti Engin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bican Günalan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bilal Çatalçekiç",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ozan Bilen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bilge Zobu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Birkan Sokullu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Birol Ünel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bora Akkaş",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bora Ayanoğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bora Cengiz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bora Sivri",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bora Tekay",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Boran Kuzum",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Bozkurt Kuruç",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kullanıcı:Bugraork/Taslak",
    "category": "unluler",
    "fameTier": 5
  },
  {
    "name": "Buğra Gülsoy",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Buğrahan Çayır",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Onur Buldu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bulut Aras",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Burak Alkaş",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Burak Dakak",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Burak Davutoğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Burak Demir",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Burak Deniz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Burak Özçivit",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Burak Sağyaşar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Burak Satıbol",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Burak Serdar Şanal",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Burak Sergen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Burak Sevinç",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Burak Tamdoğan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Burak Topaloğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Burak Tozkoparan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Farah Zeynep Abdullah",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Açelya Akkoyun",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Açelya Devrim Yılhan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Açelya Elmas",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Açelya Özcan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Açelya Topaloğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Adile Naşit",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Afra Saraçoğlu",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Ahu Sungur",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ahu Tuğba",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Ahu Türkpençe",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ahu Yağtu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ajda Pekkan",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Akasya Asıltürkmen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Demet Akbağ",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Sezin Akbaşoğulları",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Filiz Akın",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Zeynep Aksu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Sevda Aktolga",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Derya Alabora",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alara Turan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alev Baymur",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alev Gürzap",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alev Koral",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alev Oraloğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alev Sururi",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aleyna Solaker",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayla Algan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Algı Eke",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alina Boz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alisa Sezen Sever",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aliye Rona",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aliye Uzunatağan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Yasemin Allen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alma Terzic",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Almila Bağrıaçık",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Almila Uluer",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Altan Karındaş",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Mehtap Anıl",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anta Toros",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Meriç Aral",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Melda Arat",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Derya Arbaş",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Zerrin Arbaş",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Arsen Gürzap",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Arzu Gamze Kılınç",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Arzu Okay",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Arzu Oş",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Arzu Yanardağ",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Asena Keskinci",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Asena Tuğal",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Asiye Dinçsoy",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aslı Altaylar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aslı Bekiroğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aslı Enver",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aslı İçözü",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aslı İnandık",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aslı Omağ",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aslı Orcan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aslı Öngören",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aslı Tandoğan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aslıhan Gürbüz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aslıhan Malbora",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Asude Kalebek",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Asuman Arsan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Asuman Dabak",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Asuman Tuğberk Yolaç",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aşkın Nur Yengi",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Bala Atabek",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Vildan Atasever",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hülya Avşar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayben Erman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayça Ayşin Turan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayça Bingöl",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayça Eren",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayça Erturan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayça İnci",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayça Telırmak",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayça Varlıer",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayçe Abana",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayçin İnci",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayda Aksel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aydan Burhan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aydan Şener",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aydan Taş",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayfer Dönmez",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayfer Feray",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayla Arslancan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayla Karaca",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aylin Aslım",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aylin Kabasakal",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aylin Kontente",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aylin Tunceli",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aynur Aydan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aysan Sümercan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aysel Tanju",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aysun Güven",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aysun Metiner",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayşe Emel Mesçi",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayşe Günyüz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayşe Kırca",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayşe Kökçü",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayşe Mine",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayşe Nana",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayşe Selen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayşe Tolga",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayşe Tunaboylu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayşegül Akdemir",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayşegül Aldinç",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayşegül Atik",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayşegül Cengiz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayşegül Çıdamlı",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayşegül Devrim",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayşegül Ünsal",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayşen Aydemir",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayşen Cansev",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayşen Çetiner",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayşen Gruda",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Ayşen Tekin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayşenil Şamlıoğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayşenur Yazıcı",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayşin Atav",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayta Sözeri",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aytaç Öztuna",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayten Erman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayten Koçak",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayten Kuyululu Ürkmez",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayten Soykök",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Azize Gencebay",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Azra Akın",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bahar Erdeniz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bahar Öztan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bahar Şahin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bahar Yanılmaz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bahri Selin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Banu Alkan",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Banu Kuday",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Başak Daşman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Başak Kıvılcım Ertanoğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Başak Köklükaya",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Başak Meşe",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Başak Özel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Başak Parlak",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Başak Sayan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bedia Ener",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bedia Muvahhit",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Begüm Akkaya",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Begüm Birgören",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Begüm Kütük Yaşaroğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Begüm Öner",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Belçim Bilgin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Belgin Doruk",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Belgin Güven",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Belkıs Akkale",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Belkıs Dilligil",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bengi Öztürk",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Benli Belkıs",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bennu Yıldırımlar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bensu Orhunöz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bensu Soral",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bercis Fesçi",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Beren Gökyıldız",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Berfu Öngören",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bergüzar Korel",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Berna Laçin",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Berrak Tüzünataç",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Berrin Akdeniz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Berrin Koper",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Beste Bereket",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bestemsu Özdemir",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Betül Arım",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Betül Aşçıoğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Betül Kızılok Bavli",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Beyhan Saran",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Beyza Şekerci",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bige Önal",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Biğkem Karavus",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bihter Dinçel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bilge Şen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Billur Kalkavan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Binnur Kaya",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Binnur Özpınar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Biran Damla Yılmaz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Birce Akalay",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Birgül Ulusoy",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gülse Birsel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Birsen Ayda",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Birsen Dürülü",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Birsen Kaplangı",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Birsen Menekşeli",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Birtanem Candaner",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Boncuk Yılmaz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Buket Dereoğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Burcu Altın",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Burcu Biricik",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Burcu Gönder",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Burcu Kara",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Burcu Kıratlı",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Burcu Özberk",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Burçin Abdullah",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Burçin Orhon",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Burçin Terzioğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Buse Arslan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Büşra Develi",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Büşra Pekin",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Nihan Büyükağaç",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Tuba Büyüküstün",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Cahide Sonku",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Sibel Can",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Canan Çiftel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Canan Hoşgör",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Canan Perver",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Canan Sanan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Belma Canciğer",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Candan Erçetin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Candan Sabuncu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hale Caneroğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cansın Özyosun",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cansu Dere",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Cansu Tosun",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cavidan Dora",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cemre Baysel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cemre Ebüzziya",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cemre Kemer",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ceren Benderlioğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ceren Erginsoy",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ceren Moray",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ceren Soylu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ceren Taşçı",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ceyda Ateş",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Ceyda Düvenci",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Ceyda Kasabalı",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ceylan Ece",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Laçin Ceylan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Meltem Cumbul",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Çağla Akalın",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Çağla Şimşek",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Nebahat Çehre",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Sanem Çelik",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Feride Çetin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Çiğdem Batur",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Çiğdem Selışık Onat",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Çiğdem Tunç",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayça Damgacı",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Damla Sönmez",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Defne Halman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Defne Kayalar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Defne Yalnız",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Zeynep Değirmencioğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Demet Evgâr",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ahmet Tansu Taşanlar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Atik",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Düşenkalkar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alp Öyken",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Atakan Özkaya",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Atılay Uluışık",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Atılgan Gümüş",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Atilla Klinçe",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aybars Kartal Özson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Barış Akarsu",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Barış Gönenen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Baykal Saran",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Berk Cankat",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Berk Oktay",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Berkay Hardal",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Beyazıt Gülercan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Birtan Turan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Emin Boztepe",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Buğra Özmüldür",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Burak Aksak",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Burak Kut",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Burak Yamantürk",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Burak Yörük",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Burç Kümbetlioğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Burçin Bildik",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Burçin Oraloğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bülend Çolak",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bülent Alkış",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bülent Babayiğit",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bülent Çetinaslan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bülent Emin Yarar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bülent Emrah Parlak",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bülent İnal",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Bülent Kayabaş",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bülent Oran",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bülent Polat",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bülent Seyran",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bülent Şakrak",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bülent Yıldıran",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kerem Bürsin",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Cahit Gök",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cahit Kaşıkçılar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cahit Şaher",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Can Başak",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Can Bonomo",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Can Doğan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Can Gürzap",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Can Kahraman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Can Kolukısa",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Can Nergis",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Can Sipahi",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Can Verel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Erkan Can",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Canberk Uçucu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Caner Cindoruk",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Caner Çandarlı",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Caner Erdem",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Caner Kurtaran",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Caner Özyurtlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Caner Şahin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Caner Topçu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cansel Elçin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Celal Al",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Celal Belgil",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Celal Kadri Kınoğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Celal Tak",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Fırat Çelik",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Celil Nalçakan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cem Bender",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ahsen Eroğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Merih Akalın",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Sevil Akı Saner",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aleyna Şirin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Almeda Abazi",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Almila Ada",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Andaç Haznedaroğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ani İpekkaya",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Arzum Onan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aslı Öyken Taylan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aslı Sümen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aslı Yılmaz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aslıhan Kandemir",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Asu Maralman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Asuman Krause",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ava Yaman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aybüke Pusat",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayça Işıldar Ak",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayça Mutlugil",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aylin Arasıl",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayşe Erbulak",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayşe Hatun Önal",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayşecan Tatari",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayten Uncuoğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Başak Gümülcinelioğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bengi İdil Uras",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bengisu Gürbüzer Doğru",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Beril Pozam",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Berna Başer",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Berna Koraltürk",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Berrak Kuş",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Burcu Esmersoy",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Canan Atalay",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cansu Demirci",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ceren Karakoç",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Damla Colbay",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Çağla Kubat",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Çağla Şıkel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Çiğdem Gürel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Damla Babacan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Damla Özen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Defne Joy Foster",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Burak Bulut",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Tibet Ağırtan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gaye Su Akyol",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Asım Can Gündüz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aslı Gökyokuş",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayça Şen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aydilge",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aziz Azmet",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Selda Bağcan",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Bahadır Akkuzu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Barış Manço",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Batu Akdeniz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Batu Mutlugil",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gizem Berk",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bertuğ Cemil",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bilge Kösebalaban",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cahit Berkay",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Koray Candemir",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cansu Koç",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cem Karaca",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Cem Kısmet",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cem Özkan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cemil Demirbakan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cemil Özeren",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cenk Durmazel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cenk Eroğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hayko Cepkin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Çelik",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Demir Demirkan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Demirhan Baylan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Deniz Arcak",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Deniz Yılmaz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Deniz Özbey",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Nev",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Edip Akbayram",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Edis İlhan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Emrah Karaca",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Emre Altuğ",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Emre Aydın",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Erdem Yener",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Erhan Güleryüz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Barlas Erinç",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Erol Büyükburç",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ete Kurttekin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Fatih Erdemci",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Fatma Turgut",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Şebnem Ferah",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Feridun Düzağaç",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ferman Akgül",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Özge Fışkın",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Fikret Kızılok",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Genç Osman Yavaş",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gökalp Baykal",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gökçe",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gökhan Özoğuz",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Gökhan Semiz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Güler",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gülhan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gültekin Kaan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Fuat Güner",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gür Akad",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gürol Ağırbaş",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hakan Tunçbilek",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Halil Sezai",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Haluk Levent",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Harun Tekin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "İlhan İrem",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Öztürk İlmaz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "İskender Türsen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kaan Boşnak",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kaan Tangöze",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kalben",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Kâzım Koyuncu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kenan Vural",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kıraç",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Erkin Koray",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Kudret Kurtcebe",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aylin Livaneli",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Mabel Matiz",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Melis Danişmend",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Mesut Aytunca",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Metin Kor",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Murat Ertel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Murat Evgin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Murat Göğebakan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Murat İlkan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Murat Kekilli",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Murat Net",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Nedim Hazar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Nejat Toksoy",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Nejat Yavaşoğulları",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Niyazi Koyuncu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cahit Oben",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ogün Sanlısoy",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Orhan Atasoy",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Nazan Öncel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Özgür Çevik",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Özlem Tekin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Pınar Aylin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Renan Bilek",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Sabih Cangil",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Sarp Sanin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Savaş Alp Başar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Serdar Öztop",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Sertab Erener",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Seyhan Karabay",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Seyyal Taner",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Sibel Tüzün",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Sinan Kaynakçı",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Pamela Spence",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Erkut Taçkın",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cenk Taner",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Tarkan Çakır",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Teoman",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Umut Kaya",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ünol Büyükgönenç",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Yamaç Telli",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Yasemin Mori",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Yaşar Kurt",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Yavuz Çetin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ufo361",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ados",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ağaçkakan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Allâme",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alper Ağa",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anıl Piyancı",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ati242",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayben",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ben Fero",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Beta Berk Bayındır",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Blok3",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Boe B",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Burak King",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cakal",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ceg",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ceza",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Contra",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Dr. Fuchs",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ege Çubukçu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Erci E",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Eypio",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ezhel",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Fuat Ergin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gazapizm",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Güneş",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hayki",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hey! Douglas",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kabus Kerim",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kamufle",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kubilay Karça",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kayra",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Keişan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Khontkar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Killa Hakan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kool Savas",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Lvbel C5",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Massaka",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Mehmet Borukcu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Mirac",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Motive",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Murda",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Norm Ender",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ogeday",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ozbi",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Patron",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ragga Oktay",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Reyhan Şahin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Sagopa Kajmer",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Saian",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Sansar Salvo",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Sefo",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Server Uraz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Sokrat St",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Şanışer",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Şehinşah",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Tankurt Manas",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Tepki",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kullanıcı mesaj:TRMuzikGozlemcisi",
    "category": "unluler",
    "fameTier": 5
  },
  {
    "name": "Uzi",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Vio",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Yener Çevik",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Zen-G",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "İlyas Salman",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Oya Başar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Pelinsu Pir",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Yasemin Yalçın",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ahmet Çakar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ahmet Murat Özel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ahmet Tezcan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ahmet Vardar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ahmet Yeşiltepe",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Sunay Akın",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hakan Akkaya",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Nur Tuğba Namlı",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ali Esin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayşe Aral",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aslı Hünel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aslıhan Yeltekin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Atilla Taş",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Banu Avar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aydan Önder",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aydın",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hakan Aygün",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aylin Özmenek",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aziz Üstel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bahar Feyzan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Banu Atabay",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Banu Taviloğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bilgehan Demir",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Boran Kaya",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Yiğit Bulut",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Burcu Çetinkaya",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Burcu Kaya",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bülend Özveren",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bülent Ülgen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Can Akbel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Can Ataklı",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Can Okanar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cansu Canan Özgen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cem Ceminay",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cem Davran",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cem Kurtoğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cem Küçük",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cem Özer",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cemal Can Canseven",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cengiz Çandar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cengiz Semercioğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cenk Koray",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ceyhun Yılmaz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Çağıl Özge Özkul",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Çetin Çiftçioğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Faik Çetiner",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Demet Akalın",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Demet Şener",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Deniz Akkaya",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Deniz Pulaş",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Deniz Seki",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Derya Baykal",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Derya Taşbaşı",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Didem Arslan Yılmaz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Didem İnselel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Dilara Gönder",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Dilaver Uyanık",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Doğa Bekleriz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Doğu Demirkol",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Güzide Duran",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ersin Düzen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ebru Akel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ebru Gündeş",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Ebru Karanfilci",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ebru Şallı",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ece Erken",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ece Vahapoğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Eda Ece",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ela Rumeysa Cebeci",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Elif Güvendik",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Emel Büyükburç",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Emre Karayel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Engin Altan Düzyatan",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Ercan Saatçi",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Erdöl Boratap",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gülben Ergen",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Erhan Konuk",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Erhan Yazıcıoğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Erol Evgin",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Esra Eron",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ertem Şener",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Eser Yenenler",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Esra Balamir",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Esra Ceyhan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Esra Erol",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Eşref Şefik",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Evrim Akın",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ezgi Sertel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ezgi Sütcü",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Faik Uyanık",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Fatih Kısaparmak",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Fatih Ürek",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Fatoş Kabasakal",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Fatoş Seğmen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Fecri Ebcioğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ferdi Tayfur",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Ferit Aktuğ",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Fikret Bila",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Fuat Kozluklu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gamze Karaman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gamze Özçelik",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gani Müjde",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Fatma Girik",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Emre Gönlüşen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gözde Kansu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ayşegül Günay",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gül Gölge",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gülriz Sururi",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gülseren Budayıcıoğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Güner Ümit",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Güneri Cıvaoğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Güneş Tecelli",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Güntekin Onay",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gürsu Arat",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Güven İslamoğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hakan Artış",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hakan Çelik",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hakan Eratik",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hakan Hatipoğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hakan Ural",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hakan Yılmaz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Halit Ergenç",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Hande Ataizi",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hande Kazanova",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Harun Can",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hidayet Karaca",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hilal Cebeci",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hilal Ergenekon",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Acun Ilıcalı",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Uğur Işılak",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Işın Eliçin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "İbrahim Büyükak",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "İbrahim Güneş",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "İbrahim Selim",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "İclal Aydın",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "İdil Öztamer",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "İkbal Gürpınar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "İlker Akkurt",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "İlker Ayrık",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "İlker Karagöz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "İnci Özkasnak",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "İnci Türkay",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "İrfan Kangı",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "İsmet Badem",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kaan Kural",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kaan Sekban",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Kaan Yakuphan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kadir Çetin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kadir Çöpdemir",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ümit Kantarcılar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Okan Karacan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kartal Balaban",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Zeynep Kasımlıoğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aysun Kayacı",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kayra Şenocak",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kemal Uçar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kenan İmirzalıoğlu",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Kerem Alışık",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kerem Demircioğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Keriman Ulusoy",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kıvanç Kasabalı",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Korhan Abay",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Senem Kuyucuoğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "İsmail Küçükkaya",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Lemi Filozof",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Lerzan Mutlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Levent Ünsal",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "M. Serdar Kuzuloğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Mahmut Tuncer",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Mehmet Ali Erbil",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Mehmet Çepiç",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Mehtap Altunok",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Melek Baykal",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Meltem Ören",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Meral Konrat",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Mert Öğün",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Merva Ulusoy",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Metin Uca",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jess Molho",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Murat Başoğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Murat Ceylan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Murat Güloğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Murat Kosova",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Murat Murathanoğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Murat Serezli",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Murat Yeni",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Murat Yıldırım",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Mübeccel Argun",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Emel Müftüoğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Müge Anlı",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Müge Oruçkaptan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Nagehan Alçı",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Nazlı",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Nazlı Çelik",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Nazlı Tolga",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Nebil Özgentürk",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Nefise Karatay",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Nehir Babataş",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Nergis Kumbasar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Nermin Tuğuşlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Neslihan Yavuzcan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Nevşin Mengü",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Nihan Günay",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Nihat Hatipoğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Nil Pınar İnanoğlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Nilay Ceylan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Nurhayat Kavrak",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Nursel Ergin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Nükhet Duru",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Oğuzhan Koç",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Okan Bayülgen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Oktay Kaynarca",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "50 Cent",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "A Boogie wit da Hoodie",
    "category": "unluler",
    "fameTier": 5
  },
  {
    "name": "Aaron Himelstein",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aaron Paul",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aaron Sorkin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aaron Stanford",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Abbott ve Costello",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bud Abbott",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Abe Vigoda",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jake Abel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Omid Abtahi",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Adam Rich",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "John Adames",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Don Adams",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kip Addotta",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Adolphe Menjou",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "James Adomian",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Afa Anoaʻi",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ben Affleck",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Casey Affleck",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jonathan Ahdout",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ahilleas-Andreas",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aidan Quinn",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Danny Aiello",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Liam Aiken",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Al Harrington",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Al Strobel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alan Alda",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alan Arkin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alan Rachins",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alan Young",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Joe Alaskey",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Carlos Alazraqui",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alden Ehrenreich",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alex Cord",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alex D. Linz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jason Alexander",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alfred Lunt",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jed Allan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Marty Allen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Woody Allen",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Joaquim de Almeida",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alvin Ing",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Dan Amboyer",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Morey Amsterdam",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kevin Anderson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anderson Cooper",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anthony Anderson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Arthur Anderson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Louie Anderson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Michael J. Anderson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Richard Anderson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Richard Dean Anderson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Stanley Anderson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "André 3000",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Andre Braugher",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Andreas Katsulas",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Andrew Bowen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Andrew Divoff",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Andrew Stanton",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Brian Andrews",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Andy Milonakis",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Andy Samberg",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Angel Bismark Curiel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jack Angel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Angus Cloud",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Angus T. Jones",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aziz Ansari",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ansel Elgort",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anson Mount",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anthony De La Torre",
    "category": "unluler",
    "fameTier": 5
  },
  {
    "name": "Anthony Edwards",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anthony Franciosa",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anthony Geary",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anthony Gonzalez",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anthony Guidera",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anthony Jeselnik",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anthony Johnson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anthony Mann",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anthony O'Sullivan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anthony Ramos",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Marc Anthony",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Brent Antonello",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Roscoe Arbuckle",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Allan Arbus",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ari Gold",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Armando Silvestre",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Iain Armitage",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "James Arness",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Arnold Vosloo",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "David Arquette",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Art Carney",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Art LaFleur",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Art Metrano",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Arthur Edmund Carewe",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Arthur Garfunkel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Arthur Kennedy",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ashley Hamilton",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Luke Askew",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ed Asner",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Armand Assante",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Fred Astaire",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "René Auberjonois",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "John August",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Austin Abrams",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Austin Butler",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Frankie Avalon",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "James Avery",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Tex Avery",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Robert Axelrod",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Dan Aykroyd",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hank Azaria",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Babs Olusanmokun",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Michael Bacall",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Christopher Backus",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kevin Bacon",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Penn Badgley",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Max Baer",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Larry Bagby",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Scott Baio",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "John Baker",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Troy Baker",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bob Balaban",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Adam Baldwin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alec Baldwin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Stephen Baldwin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Christian Bale",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Eric Balfour",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bam Bam Bigelow",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jack Bannon",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Lance Barber",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Tony Barbieri",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Barney Martin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "John Barrowman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Barry Nelson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Barry Newman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Barry Shabaka Henley",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Barry Watson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "John Blyth Barrymore",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Lionel Barrymore",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Blake Bashoff",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Basil Hoffman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Lance Bass",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Warner Baxter",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Orson Bean",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Clyde Beatty",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ned Beatty",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Warren Beatty",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Beau Bridges",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jim Beaver",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Harry Belafonte",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Tobin Bell",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jim Belushi",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "John Belushi",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ben Falcone",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ben Johnson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ben Jones",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ben Marsters",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ben Schwartz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ben Winchell",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jay Benedict",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Benjamin Bratt",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "H. Jon Benjamin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Benny Safdie",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Tom Berenger",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Justin Berfield",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Peter Berg",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Henry Bergman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jeff Bergman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Xander Berkeley",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Warren Berlinger",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Andy Berman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Christopher Bernau",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bernie Mac",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Dehl Berti",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ahmed Best",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Turhan Bey",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Michael Biehn",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Big Boi",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Big Show",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Big Van Vader",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bill Bixby",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bill Burr",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bill Camp",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bill Cobbs",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bill Duke",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bill Goldberg",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bill Hayes",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bill Maher",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bill Moseley",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bill Pullman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bill Stevenson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Billy Bob Thornton",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Billy Burke",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Billy Crystal",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Billy Dean",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Billy Dee Williams",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Billy Drago",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Billy Preston",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Billy Unger",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bing Crosby",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Biz Markie",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Black Thought",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jack Black",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Lucas Black",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Shane Black",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Tyler Blackburn",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Robert Blanche",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hunt Block",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Brian Bloom",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "David Blue",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Mark Blum",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bo Burnham",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bo Hopkins",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bob Elmore",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bob Fosse",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bob Gunton",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bob Newhart",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bob Uecker",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bobby Darin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bobby Lashley",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bobby Rydell",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Humphrey Bogart",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ian Bohen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bokeem Woodbine",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Joseph Bologna",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jon Bon Jovi",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Pat Boone",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Powers Boothe",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "David Boreanaz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ernest Borgnine",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Roscoe Born",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Frank Borzage",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Philip Bosco",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Barry Bostwick",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Loren Bouchard",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jim Bouton",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Dennis Boutsikaris",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bow Wow",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cameron Boyce",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Boyd Holbrook",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jim Boyd",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Stephen Boyd",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Charles Boyer",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Brad Dexter",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Brad Johnson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Brad Sherwood",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Richard Bradford",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bradley Cooper",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "Bradley Steven Perry",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Beverly Aadlen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aaliyah",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Abbe Lane",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Abby Ryder Fortson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Iris Acker",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Amy Adams",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Edie Adams",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jane Adams",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Joey Lauren Adams",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Julie Adams",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Marla Adams",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Stella Adler",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Pamela Adlon",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Adria Arjona",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Adrienne Ames",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Adrienne Bailon",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Uzo Aduba",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aarthi Agarwal",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Shohreh Aghdashloo",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Agnes Ayres",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Dianna Agron",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Christina Aguilera",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Lassie Lou Ahern",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aimee Garcia",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jessica Alba",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Lola Albright",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Rutanya Alda",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alexa Demie",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alexandra Bokyun Chun",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alexandra Daddario",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alice Brady",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alice Calhoun",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alice Greczyn",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alice Hirson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alicia Fox",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aline MacMahon",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gia Allemand",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Joan Allen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jonelle Allen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Phyllis Allen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Sara Allgood",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Allie Grant",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Allison Miller",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Allison Tolman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ally Walker",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alona Tal",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gitta Alpár",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Carol Alt",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alycia Delmore",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Amanda Bearse",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Amanda Cerny",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Amanda Schull",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Amber Frank",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Amber Heard",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Amber Midthunder",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Amerie",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Mädchen Amick",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Amy Acker",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Amy Gumenick",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Amy Jo Johnson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Amy Madigan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Amy Pietz",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Amy Purdy",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Amy Schumer",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ana de Armas",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ananda Lewis",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bridgette Andersen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Nicole Anderson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Mary Anderson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Mignon Anderson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Andra Day",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Andrea Barber",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Andrea Deck",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Andrea Evans",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Andrea Fay Friedman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Andrea Leeds",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Andrea Londo",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Andrea Navedo",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Patty Andrews",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Angela Kinsey",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Angie Everhart",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Angie Stone",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anita Page",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ann Blyth",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ann Cusack",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ann Harding",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ann Rutherford",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ann-Margret",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anna Camp",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anna Chlumsky",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anna Q. Nilsson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anna-Lisa",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Annalise Basso",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "AnnaSophia Robb",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anne Buydens",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anne Heche",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anne Revere",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anne Schedeen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anne Shirley",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anne V",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Annette McCarthy",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Susan Anspach",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anya Taylor-Joy",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Christina Applegate",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "April Hunter",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anne Archer",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ariana Greenblatt",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ariel Winter",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Arleen Sorkin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Arlene Dahl",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Arlene Francis",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Arlene Golonka",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Arlene Harris",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Dimitra Arliss",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Allisyn Ashley Arm",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bess Armstrong",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Samaire Armstrong",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Béatrice Arnac",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alexis Arquette",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Patricia Arquette",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Beatrice Arthur",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Carol Arthur",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Katie Aselton",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ashanti",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Daphne Ashbrook",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ashley Liao",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ashley Roberts",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ashly Burch",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ashlynn Yennie",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Asia Carrera",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Essence Atkins",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aubrey Plaza",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Audie England",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Auliʻi Cravalho",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Tina Aumont",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aunjanue Ellis",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Karen Austin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ava Acres",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Patricia Avery",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Awkwafina",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Nicki Aycox",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Odessa A'zion",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Barbara Babcock",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Lauren Bacall",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Morena Baccarin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Helen Badgley",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jane Badler",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bai Ling",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Barbara Bain",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Diora Baird",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Leah Baird",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Carroll Baker",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Diane Baker",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Fairuza Balk",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Lucille Ball",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kaye Ballard",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Mabel Ballin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Talia Balsam",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gertrude Bambrick",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anne Bancroft",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Tallulah Bankhead",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Christine Baranski",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Barbara Bouchet",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Barbara Britton",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Barbara O'Neil",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Barbara Rush",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Barbara Stanwyck",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Barbara Whiting Smith",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Adrienne Barbeau",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ellen Barkin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Binnie Barnes",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Joanne Baron",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alice Barrett",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Majel Barrett",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Barbara Barrie",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Wendy Barrie",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Patricia Barry",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Drew Barrymore",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ethel Barrymore",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Mischa Barton",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Skye McCole Bartusiak",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kim Basinger",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Nicole Bass",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Angela Bassett",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Brec Bassinger",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Justine Bateman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kathy Bates",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jessica Barth",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Simone Battle",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Elizabeth Baur",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anne Baxter",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Beah Richards",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jennifer Beals",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Beata Poźniak",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bebe Neuwirth",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Becky Ann Baker",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Becky G",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Emily Beecham",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Judi Beecher",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Nicole Beharie",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Barbara Bel Geddes",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Doris Belack",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ashley Bell",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Catherine Bell",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Emma Bell",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kristen Bell",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Belle Baker",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Camilla Belle",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Maria Bello",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Annette Bening",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Chloe Bennet",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alma Bennett",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Barbara Bennett",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Constance Bennett",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Haley Bennett",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Julie Bennett",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Patricia Benoit",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Amber Benson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ashley Benson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Berry Berenson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bergen Williams",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Candice Bergen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Polly Bergen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Àstrid Bergès-Frisbey",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ingrid Bergman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Elizabeth Berkley",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Brigid Berlin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Crystal Bernard",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Susan Bernard",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Elizabeth Berridge",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Valerie Bertinelli",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Marcheline Bertrand",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bibi Besch",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bessie Love",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Beth Behrs",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Beth Broderick",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Beth Fowler",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Zina Bethune",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Betsy Blair",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Betsy Gay",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Betsy Randle",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bette Davis",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Betty Ann Bruno",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Betty Blythe",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Betty Buckley",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Betty Compson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Betty Lynn",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Beulah Bondi",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Beverly Todd",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Aaron Taylor-Johnson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Adam Astill",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Adam Howden",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Adeel Akhtar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Adewale Akinnuoye-Agbaje",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Adrian Rawlins",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anthony Ainley",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Akın Gazi",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alan Price",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Albert Austin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alec B. Francis",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alex Lawther",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Olly Alexander",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alfie Allen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alfie Curtis",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alfred Enoch",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Tom Alter",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Josef Altin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Joe Alwyn",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Samuel Anderson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Andrew Jack",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Naveen Andrews",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Andy Smart",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Michael Angelis",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anthony Quayle",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anthony Sher",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Michael Apted",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Sean Arnold",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Asa Butterfield",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Rowan Atkinson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Richard Attenborough",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Colin Baker",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "George Baker",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Tom Baker",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Max Baldry",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bobby Ball",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Roy Barraclough",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Barrie Ingham",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Keith Barron",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Basil Rathbone",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alan Bates",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Trevor Baxter",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Geoffrey Bayldon",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Sean Bean",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Sam Beazley",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Max Beesley",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ben Barnes",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ben Cross",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ben Hull",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ben Kingsley",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ben Miller",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ben Roberts",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Benedict Cumberbatch",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Benedict Wong",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "John Benfield",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bernard Atha",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bernard Lee",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bertie Carvel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Rodney Bewes",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Paul Bhattacharjee",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bill Bailey",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bill Treacher",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Billy Armstrong",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Billy Idol",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Orlando Bloom",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bob Hoskins",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Philip Bond",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anthony Booth",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "David Bowie",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "David Bradley",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Russell Brand",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Brian Bedford",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Brian Blessed",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Brian Cant",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Brian George",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Brian Glover",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Brian Murphy",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Tony Britton",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jim Broadbent",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Clive Brook",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Tim Brooke-Taylor",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bruno Lawrence",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bryan Ferry",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bryan Marshall",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Burt Kwouk",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Callum Blue",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Callum Turner",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Earl Cameron",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cary Elwes",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Caspar Zafer",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "John Castle",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Keith-Lee Castle",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Chance Perdomo",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ben Chaplin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Charlie Chaplin",
    "category": "unluler",
    "fameTier": 1
  },
  {
    "name": "Graham Chapman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Mark Lindsay Chapman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Charles Dance",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Charlie Heaton",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Charlie Hunnam",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Chiwetel Ejiofor",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Chris Gauthier",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Chris Wiggins",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Christian Coulson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Christian Roberts",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Christopher Beeny",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Christopher Benjamin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Christopher Eccleston",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Noel Clarke",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Claude Rains",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cliff Richard",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Clifford Rose",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Clive Dunn",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Clive Mantle",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Clive Standen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Colin Clive",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Sacha Baron Cohen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Raphaël Coleman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Colin Firth",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Colin Lawrence",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Phil Collins",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ronald Colman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Con O'Neill",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Connor Swindells",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Corin Redgrave",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Tom Courtenay",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Noël Coward",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Charlie Cox",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Daniel Craig",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bernard Cribbins",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Quentin Crisp",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Andy Cunningham",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Peter Cushing",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Dale Meeks",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Daniel Day-Lewis",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Daniel Ings",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Daniel Massey",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Daniel Peacock",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Daniel Radcliffe",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Daniel Sharman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anthony Daniels",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Phil Daniels",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "James D'Arcy",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Darren Kent",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Darren Shahlavi",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Paul Darrow",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Arthur Darvill",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Dave Legeno",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "David Bailie",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "David Bateson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "David English",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "David Graham",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "David Hewlett",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "David Horovitch",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "David Jason",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "David Niven",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "David Walliams",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "David Warner",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jaye Davidson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Greg Davies",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Windsor Davies",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alexander Davion",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Warwick Davis",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Peter Davison",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Roger Delgado",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Denholm Elliott",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Dennis Waterman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Derek Jacobi",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Dev Patel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Sacha Dhawan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Harris Dickinson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Frank Dillane",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Stephen Dillane",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Dirk Bogarde",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Divian Ladwa",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Dominic Cooper",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Dominic Holland",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Dominic Sherwood",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Dominic West",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Donald Crisp",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Donald Pleasence",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Robert Donat",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Doug Bradley",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Douglas Booth",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Sam Douglas",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Robin Atkin Downes",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Dudley Moore",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Carl Duering",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Duggie Brown",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Simon Dutton",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ed Skrein",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ed Westwick",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Eddie Marsan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Eddie Redmayne",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Mark Eden",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Edmund Gwenn",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Edward Fox",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Edward Tudor-Pole",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Eric Idle",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Julian Fellowes",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Tom Felton",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ralph Fiennes",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Peter Finch",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Neil Fingleton",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Frank Finlay",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Finn Cole",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Albert Finney",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Fionn Whitehead",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jason Flemyng",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ian McShane",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bruce Forsyth",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Derek Fowlds",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "James Fox",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Clement von Franckenstein",
    "category": "unluler",
    "fameTier": 5
  },
  {
    "name": "Frank Willams",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Freddie Highmore",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Nick Frost",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Stephen Fry",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Michael Gambon",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Matthew Garber",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Andrew Garfield",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Tony Garnett",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Mark Gatiss",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "George A. Cooper",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "George Arliss",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "George Blagden",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "George Hilton",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "George MacKay",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "George Relph",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "George Sanders",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gerald Harper",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gerald Home",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ricky Gervais",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "John Gielgud",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gildart Jackson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Peter Gilmore",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Julian Glover",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Adam Godley",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cary Grant",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hugh Grant",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Leslie Grantham",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Rupert Grint",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alec Guinness",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "David Gyasi",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kenneth Haigh",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Andrew Hall",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anthony Hamilton",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Abigail Cruttenden",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Olivia d'Abo",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Afshan Azad",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jenny Agutter",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Freema Agyeman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alana Boden",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jean Alexander",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alison Carroll",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alison Newman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Freya Allan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Lily Allen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Amanda Holden",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Amanda Tapping",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Amy Nuttall",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Julie Andrews",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Angela Pleasence",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Angela Thorne",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anjli Mohindra",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ann Davies",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ann Emery",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Annabel Scholey",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Annabelle Wallis",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anne-Marie Duff",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gabrielle Anwar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Mina Anwar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gemma Arterton",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jane Asher",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kate Ashfield",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ashley Madekwe",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Zawe Ashton",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Coral Atkins",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Eileen Atkins",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gemma Atkinson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Audrey Hepburn",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hermione Baddeley",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Elli Bamber",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Barbara Leigh-Hunt",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alexandra Bastedo",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Helen Baxendale",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Amber Beattie",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Victoria Beckham",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kate Beckinsale",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bel Powley",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Lynda Bellingham",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Eliza Bennett",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Leanne Best",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Daisy Bevan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Billie Piper",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Billie Whitelaw",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jacqueline Bisset",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Honor Blackman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Emily Blunt",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Lilian Bond",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Helena Bonham Carter",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bonnie Langford",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Leah Bracknell",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Louise Brealey",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Brenda Blethyn",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Briony McRoberts",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Dora Bryan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Nicola Bryant",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jackie Burroughs",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Naomi Campbell",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cara Seymour",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cara Theobold",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Carmen Chaplin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Judy Carne",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Carol Raye",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Carole Shelley",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Caroline Goodall",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jane Carr",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Catherine McCormack",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kim Cattrall",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jessie Cave",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Celia Johnson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Chanel Cresswell",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Charli XCX",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Charlotte Rampling",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "China Chow",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Julie Christie",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Christina Pickles",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Claire Bloom",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Claire Forlani",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Claire Foy",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Claire Rushbrook",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Clare Calbraith",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Petula Clark",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Claudie Blakley",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cleo Laine",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Camille Coduri",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Lauren Cohan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Christina Cole",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jenna Coleman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Joan Collins",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Joely Collins",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Lily Collins",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Pauline Collins",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Charlotte Cornwell",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cicely Courtneidge",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Peggy Cummins",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Pamela Cundell",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cynthia Erivo",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Dafne Keen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Daisy Edgar-Jones",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Daisy Ridley",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Damaris Hayman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Elizabeth Dawn",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Olivia de Havilland",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Julia Deakin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jeanne de Casalis",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Janie Dee",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Frances de la Tour",
    "category": "unluler",
    "fameTier": 5
  },
  {
    "name": "Judi Dench",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Denise Bryer",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Denise Coffey",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Denise van Outen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Diana Dors",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Diana Rigg",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Diane Langton",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Diane Morgan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Monica Dolan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Amanda Donohoe",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hazel Douglas",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Freda Dowie",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Joan Dowling",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Roma Downey",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hilary Dwyer",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Edith Evans",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Samantha Eggar",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jennifer Ehle",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Eleanor Tomlinson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Elisabeth Sladen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Elizabeth Tan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ella Hunt",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ellen Terry",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Elsa Lanchester",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Elsie Kelly",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Bella Emberg",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Emerald Fennell",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Emilia Clarke",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Emilia Jones",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Emily Carey",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Emily Watson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Emma Bunton",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Emma Chambers",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Emma Corrin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Emma Greenwell",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Emma Laird",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Emma Samms",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gladys Cooper",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jill Esmond",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Eileen Essell",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Estelle",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Eva Le Gallienne",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alice Eve",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Evie Templeton",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Suzan Farmer",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Fenella Fielding",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Flora Robson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Florence Pugh",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Joan Fontaine",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Emilia Fox",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Frances Fisher",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Cornelia Frances",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Francesca Annis",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Liz Fraser",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Anna Friel",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gabriella Wilde",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Patricia Gage",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Charlotte Gainsbourg",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Greer Garson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Patricia Garwood",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jill Gascoine",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Eunice Gayson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gemma Chan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gemma Whelan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Geneviève Waïte",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Susan George",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Geri Halliwell",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Mandip Gill",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Fiona Gillies",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Lou Gish",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Glenda Jackson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Lucy Gordon",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Mia Goth",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Gugu Mbatha-Raw",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Sienna Guillory",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Rebecca Hall",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hannah Arterton",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hannah John-Kamen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hannah Murray",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hannah New",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hannah Spearritt",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hannah Waddingham",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Harriet Walter",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Naomie Harris",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Sally Hawkins",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jill Haworth",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Haydn Gwynne",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hayley Atwell",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hazel Court",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hazel Crowney",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Lena Headey",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Heather Sears",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Emma Heming Willis",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Georgie Henley",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Elizabeth Henstridge",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Hermione Gingold",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jean Heywood",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Joan Hickson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Clare Higgins",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jacqueline Hill",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Thora Hird",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Kelly Hunter",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Rosie Huntington-Whiteley",
    "category": "unluler",
    "fameTier": 5
  },
  {
    "name": "Elizabeth Hurley",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ida Lupino",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Imogen Poots",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Isa Briones",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Isla Bevan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jackie Forster",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Geraldine James",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Louise Jameson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jane Birkin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jane Horrocks",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jane Lapotaire",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jane Seymour",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jane Wymark",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Janet McTeer",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jayalalithaa",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jean Lodge",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jean Marsh",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jean Simmons",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jeannette Charles",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jemma Redgrave",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Julika Jenkins",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jenna Russell",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jennifer Kendal",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jennifer Saunders",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jenny Seagrove",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jenny Tomasin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jessica Barden",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jessica Brown Findlay",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "AJ Mitchell",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Chubby Checker",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "David Archuleta",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Florence Warner",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Buddy Greco",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Harry Nilsson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jeong Yoonchae",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "John Davis",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jon McLaughlin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "R. Kelly",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Lara Rajagopalan",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Michael Henderson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Redfoo",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "SkyBlu",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Smokey Robinson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Trini Lopez",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Lucy Thomas",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Marianne Faithfull",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Nathan Carter",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Peter Frampton",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Sandy Denny",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Shelia Mathews",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Alain Berliner",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Brenda Song",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Catherine O'Hara",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Darren Criss",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "David Janssen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Dean Martin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Dean Stockwell",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Brian Dennehy",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Joely Fisher",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ruth Prawer Jhabvala",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "John Adams",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "László Benedek",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Leonard Nimoy",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Leopold Lindtberg",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Eva Longoria",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Madeleine Stowe",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Michael Kamen",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Milyoner",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Mira Nair",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Roger Moore",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Noah Hawley",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Oscar Isaac",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Patrick Stewart",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Deborah Raffin",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "A. R. Rahman",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ray Dolby",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Mark Ruffalo",
    "category": "unluler",
    "fameTier": 2
  },
  {
    "name": "S. Epatha Merkerson",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Simone Signoret",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jason Sudeikis",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Mike Todd",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Paul Verhoeven",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Ving Rhames",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "Jeremy Allen White",
    "category": "unluler",
    "fameTier": 4
  },
  {
    "name": "II. Bayezid",
    "category": "tarihi_kisiler",
    "fameTier": 3
  },
  {
    "name": "Türkiye cumhurbaşkanı",
    "category": "tarihi_kisiler",
    "fameTier": 3
  },
  {
    "name": "Ahmet Necdet Sezer",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Türkiye cumhurbaşkanı vekili",
    "category": "tarihi_kisiler",
    "fameTier": 3
  },
  {
    "name": "Türkiye'de cumhurbaşkanlığı seçimleri",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Şablon:Türkiye cumhurbaşkanları",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Roma imparatoru",
    "category": "tarihi_kisiler",
    "fameTier": 3
  },
  {
    "name": "Beş İmparator Yılı",
    "category": "tarihi_kisiler",
    "fameTier": 3
  },
  {
    "name": "Beş İyi İmparator",
    "category": "tarihi_kisiler",
    "fameTier": 3
  },
  {
    "name": "Altı İmparator Yılı",
    "category": "tarihi_kisiler",
    "fameTier": 3
  },
  {
    "name": "Antik Roma tarihinin zaman çizelgesi",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Asker imparator",
    "category": "tarihi_kisiler",
    "fameTier": 3
  },
  {
    "name": "Caracalla Yazıtı",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Flavius Hanedanı",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Herakleios",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "İliryalı imparatorlar",
    "category": "tarihi_kisiler",
    "fameTier": 3
  },
  {
    "name": "I. Konstantin",
    "category": "tarihi_kisiler",
    "fameTier": 3
  },
  {
    "name": "Tetrarşi",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Şablon:Roma imparatorları",
    "category": "tarihi_kisiler",
    "fameTier": 3
  },
  {
    "name": "Alain Aspect",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Aleksandr Prohorov",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Aleksey Abrikosov",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Alex Müller",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jores Alfyorov",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Alfred Kastler",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Hannes Alfvén",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Carl Anderson",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Andrea Ghez",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Anne L'Huillier",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Anton Zeilinger",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Arthur B. McDonald",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Arthur Schawlow",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Arthur Ashkin",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "John Bardeen",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Charles Barkla",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Barry Barish",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Henri Becquerel",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ben R. Mottelson",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Hans Bethe",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Patrick Blackett",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Nicolaas Bloembergen",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Max Born",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Walther Bothe",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Lawrence Bragg",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Brian Josephson",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Percy Bridgman",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Bertram Brockhouse",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Louis de Broglie",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Mario Capecchi",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Carl Wieman",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Carlo Rubbia",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Owen Chamberlain",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Charles Édouard Guillaume",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Charles Townes",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Charles Wilson",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Georges Charpak",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Steven Chu",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Claude Cohen-Tannoudji",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Arthur Compton",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Leon Cooper",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Marie Curie",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Pierre Curie",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Pavel Çerenkov",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Gustaf Dalén",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "David Gross",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "David Lee",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Raymond Davis",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Clinton Davisson",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Paul Dirac",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Donald A. Glaser",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Donna Strickland",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Douglas Osheroff",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Duncan Haldane",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Edward Appleton",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Edward Purcell",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Albert Einstein",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Emilio Segrè",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "François Englert",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Eric Cornell",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Leo Esaki",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Eugene Wigner",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Felix Bloch",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ferdinand Braun",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Enrico Fermi",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Albert Fert",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Richard Feynman",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "William Fowler",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Dennis Gabor",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Gabriel Lippmann",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Murray Gell-Mann",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Geoffrey Hinton",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Georg Bednorz",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "George Smith",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "George Smoot",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "George Thomson",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Gerard 't Hooft",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Gerd Binnig",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Riccardo Giacconi",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ivar Giaever",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Vitali Ginzburg",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Giorgio Parisi",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Sheldon Glashow",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Roy Glauber",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Maria Goeppert-Mayer",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Peter Grünberg",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "John Hall",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Hans Dehmelt",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Hans Jensen",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Theodor W. Hänsch",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Heinrich Rohrer",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Werner Heisenberg",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Hendrik Lorentz",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Henry Kendall",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Gustav Hertz",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Victor Hess",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Antony Hewish",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Peter Higgs",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Hiroshi Amano",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Russell Hulse",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Isamu Akasaki",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Isidor Isaac Rabi",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "İgor Tamm",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "İlya Frank",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jack Steinberger",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "James Chadwick",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "James Cronin",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "James Franck",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "James Rainwater",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jerome Friedman",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "John Clarke",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "John Clauser",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "John Cockcroft",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "John Martinis",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "John Van Vleck",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "John William Strutt",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Joseph Taylor",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Kai Siegbahn",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Heike Kamerlingh Onnes",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Charles Kao",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Wolfgang Ketterle",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jack Kilby",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Klaus Hasselmann",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Klaus von Klitzing",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ferenc Krausz",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Herbert Kroemer",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Polykarp Kusch",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Willis Lamb",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Robert Laughlin",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Paul Lauterbur",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ernest Lawrence",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Leon Lederman",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Tsung-Dao Lee",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Anthony Leggett",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Philipp Lenard",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Lev Landau",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Luis Alvarez",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Makoto Kobayashi",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Manne Siegbahn",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Peter Mansfield",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Guglielmo Marconi",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Masatoshi Koshiba",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "John Mather",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Max von Laue",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Michel Mayor",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Melvin Schwartz",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Michael Kosterlitz",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Albert Michelson",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Robert A. Millikan",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Nevill Mott",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Gérard Mourou",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Rudolf Mössbauer",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Muhammed Abdüsselam",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Yoichiro Nambu",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Louis Néel",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Nikolay Basov",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Konstantin Novoselov",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Wolfgang Paul",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Wolfgang Pauli",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jim Peebles",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Arno Penzias",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Martin Perl",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Saul Perlmutter",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jean Perrin",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Philip Anderson",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "William Phillips",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Pierre-Gilles de Gennes",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Max Planck",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "David Politzer",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "C. F. Powell",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Pyotr Kapitsa",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Didier Queloz",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "C. V. Raman",
    "category": "tarihi_kisiler",
    "fameTier": 3
  },
  {
    "name": "Norman Ramsey",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Frederick Reines",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Reinhard Genzel",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Richard Taylor",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Owen Richardson",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Burton Richter",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Adam Riess",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Robert Hofstadter",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Robert Richardson",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Robert Wilson",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Roger Penrose",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ernst Ruska",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Martin Ryle",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Brian Schmidt",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Robert Schrieffer",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Erwin Schrödinger",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Julian Schwinger",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Serge Haroche",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Shin'ichirō Tomonaga",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "William Shockley",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Shuji Nakamura",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Clifford Shull",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Simon van der Meer",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Johannes Stark",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Otto Stern",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Steven Weinberg",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Horst Störmer",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Subrahmanyan Chandrasekhar",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Syukuro Manabe",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Takaaki Kajita",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "J. J. Thomson",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Kip Thorne",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "David Thouless",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Samuel C. C. Ting",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Toshihide Maskawa",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Daniel Tsui",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Val Fitch",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Johannes Diderik van der Waals",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Martinus Veltman",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Walter Brattain",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ernest Walton",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Rainer Weiss",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Frank Wilczek",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Wilhelm Röntgen",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Wilhelm Wien",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Willard Boyle",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "William Bragg",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Kenneth Wilson",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "David Wineland",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Chen Ning Yang",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Hideki Yukava",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Pieter Zeeman",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Frits Zernike",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Aaron Ciechanover",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Adolf Butenandt",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Peter Agre",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Akira Yoshino",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Alan MacDiarmid",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Aleksey Yekimov",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Alexander Todd",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Sidney Altman",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Christian Anfinsen",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Archer Martin",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Arieh Warshel",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Arne Tiselius",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Arthur Harden",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Artturi Virtanen",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Avram Hershko",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Aziz Sancar",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Adolf von Baeyer",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Barry Sharpless",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Benjamin List",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Paul Berg",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Friedrich Bergius",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Bernard L. Feringa",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Paul D. Boyer",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Bruce Merrifield",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Carl Bosch",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Carolyn R. Bertozzi",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Thomas Cech",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Charles Pedersen",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Yves Chauvin",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "John Cornforth",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Paul Crutzen",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Cyril Hinshelwood",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Dan Şehtman",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "David MacMillan",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Demis Hassabis",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Derek Barton",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Donald Cram",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Dorothy Hodgkin",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jacques Dubochet",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Vincent du Vigneaud",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Eduard Buchner",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ei-ichi Negishi",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Elias James Corey",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Emil Fischer",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Emmanuelle Charpentier",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Eric Betzig",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ernst Otto Fischer",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Richard Ernst",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "John Fenn",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Paul Flory",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Frances Arnold",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Francis Aston",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Fraser Stoddart",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Frédéric Joliot-Curie",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Frederick Sanger",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Frederick Soddy",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Fritz Pregl",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Kenichi Fukui",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Geoffrey Wilkinson",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Georg Wittig",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Gerhard Ertl",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Gerhard Herzberg",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Walter Gilbert",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Giulio Natta",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Robert Grubbs",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Fritz Haber",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Otto Hahn",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Hans Fischer",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Hans von Euler-Chelpin",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Hartmut Michel",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Herbert A. Hauptman",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Norman Haworth",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Alan Heeger",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Heinrich Wieland",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Henri Moissan",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Herbert Brown",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Hermann Staudinger",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Dudley Herschbach",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "George de Hevesy",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Roald Hoffmann",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Irwin Rose",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jacobus Henricus van 't Hoff",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Jaroslav Heyrovský",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jean-Pierre Sauvage",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jennifer Doudna",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jens Skou",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Joachim Frank",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Johann Deisenhofer",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "John E. Walker",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "John Goodenough",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "John Howard Northrop",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "John Kendrew",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "John M. Jumper",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "John Polanyi",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Irène Joliot-Curie",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Karl Ziegler",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jerome Karle",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Aaron Klug",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Brian Kobilka",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Walter Kohn",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Koichi Tanaka",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Roger Kornberg",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Harry Kroto",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Kurt Alder",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Kurt Wüthrich",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Irving Langmuir",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Lavoslav Ružička",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Yuan T. Lee",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jean-Marie Lehn",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Willard Libby",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "William Lipscomb",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Louis Brus",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Luis Leloir",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Manfred Eigen",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Rudolph Marcus",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Martin Chalfie",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Martin Karplus",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Edwin McMillan",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Melvin Calvin",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Michael Levitt",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Michael Smith",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Michel Devoret",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Mario Molina",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Stanford Moore",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Morten Meldal",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Moungi Bawendi",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Robert S. Mulliken",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Kary Mullis",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Walther Nernst",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Nikolay Semyonov",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ryōji Noyori",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Odd Hassel",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "George Olah",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Lars Onsager",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Osamu Shimomura",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Otto Diels",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Otto Wallach",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Paul Karrer",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Paul Modrich",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Paul Sabatier",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Linus Pauling",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Max Perutz",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Peter Debye",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Polioksimetilen",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "John Pople",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Peter Mitchell",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "George Porter",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ilya Prigogine",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Venkatraman Ramakrishnan",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Richard Heck",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Richard Henderson",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Richard Kuhn",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Richard Robson",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Richard Schrock",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Richard Synge",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Richard Zsigmondy",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Robert Curl",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Robert Huber",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Robert Lefkowitz",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Robert Robinson",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Robert Woodward",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Roderick MacKinnon",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Roger Tsien",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ronald Norrish",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Sherwood Rowland",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ernest Rutherford",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Paul Scherrer",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Glenn T. Seaborg",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Hideki Shirakawa",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Richard Smalley",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Stanley Whittingham",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Stefan Hell",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "James Sumner",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Susumu Kitagawa",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Akira Suzuki",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Svante Arrhenius",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Henry Taube",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Theodor Svedberg",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Theodore Richards",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Thomas A. Steitz",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Tomas Lindahl",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Harold Urey",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Victor Grignard",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Vladimir Prelog",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Wendell Stanley",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Alfred Werner",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Wilhelm Ostwald",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "William Giauque",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "William Knowles",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "William Moerner",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "William Ramsay",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "William Stein",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Richard Willstätter",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Adolf Windaus",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Gregory Winter",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ada Yonath",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ahmed Zewail",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Alfred G. Gilman",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Allvar Gullstrand",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "André Michel Lwoff",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Werner Arber",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ardem Patapoutian",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Arthur Kornberg",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Arvid Carlsson",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "August Krogh",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Richard Axel",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Baruch Samuel Blumberg",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Baruj Benacerraf",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Bengt I. Samuelsson",
    "category": "tarihi_kisiler",
    "fameTier": 3
  },
  {
    "name": "Sune Bergström",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Bernard Katz",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Bernardo Houssay",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Bert Sakmann",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Bruce Beutler",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Günter Blobel",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Konrad Emil Bloch",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Daniel Bovet",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Sydney Brenner",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Michael Stuart Brown",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Linda B. Buck",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Carl Ferdinand Cori",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Alexis Carrel",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "César Milstein",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Charles Brenton Huggins",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Charles Louis Alphonse Laveran",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Charles M. Rice",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Charles Scott Sherrington",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Christiaan Eijkman",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Albert Claude",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Stanley Cohen",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Allan McLeod Cormack",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Corneille Heymans",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "André Frédéric Cournand",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Craig C. Mello",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Francis Crick",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Henrik Dam",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Daniel Carleton Gajdusek",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Jean Dausset",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "David Baltimore",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "David H. Hubel",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "David Julius",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Christian de Duve",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Max Delbrück",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Gerhard Domagk",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Drew Weissman",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Renato Dulbecco",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Gerald Edelman",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Edgar Douglas Adrian",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Edmond H. Fischer",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Edvard Moser",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Edward Adelbert Doisy",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Edward B. Lewis",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Edward Calvin Kendall",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Edward Lawrie Tatum",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Edwin G. Krebs",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Paul Ehrlich",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Gertrude Belle Elion",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Elizabeth Blackburn",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Emil Adolf von Behring",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Emil Theodor Kocher",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "John Franklin Enders",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Eric F. Wieschaus",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Eric Kandel",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ernst Boris Chain",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Erwin Neher",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Andrew Z. Fire",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Alexander Fleming",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Werner Forssmann",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "François Jacob",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Françoise Barré-Sinoussi",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Frank Macfarlane Burnet",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Fred Ramsdell",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Frederick Banting",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Frederick Gowland Hopkins",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Karl von Frisch",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Georg von Békésy",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "George Wells Beadle",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Georges J. F. Köhler",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Gerty Theresa Cori",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Joseph L. Goldstein",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Camillo Golgi",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Paul Greengard",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Gregg L. Semenza",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "H. Robert Horvitz",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Haldan Keffer Hartline",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jeffrey C. Hall",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Hamilton O. Smith",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Harald zur Hausen",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Harold E. Varmus",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Leland H. Hartwell",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Harvey J. Alter",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Henry Hallett Dale",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Herbert Spencer Gasser",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Alfred Hershey",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Archibald Hill",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "George H. Hitchings",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Alan Lloyd Hodgkin",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Robert William Holley",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Godfrey Hounsfield",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Howard Walter Florey",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Andrew Huxley",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Louis Ignarro",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "J. Michael Bishop",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "James P. Allison",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "James Rothman",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "James W. Black",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "John Carew Eccles",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "John E. Sulston",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "John Gurdon",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "John James Rickard Macleod",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "John O'Keefe",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "John Robert Vane",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Joseph Erlanger",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Joseph Murray",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Joshua Lederberg",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jules A. Hoffmann",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Julius Axelrod",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Julius Wagner-Jauregg",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Katalin Karikó",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Har Gobind Khorana",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Robert Koch",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Albrecht Kossel",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Hans Adolf Krebs",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Karl Landsteiner",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Fritz Albert Lipmann",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Konrad Lorenz",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Salvador Edward Luria",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Feodor Felix Konrad Lynen",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Barry Marshall",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Martin Evans",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Martin Rodbell",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Mary E. Brunkow",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Barbara McClintock",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "İlya Meçnikov",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Michael Houghton",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Michael Rosbash",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Michael W. Young",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "George Minot",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "António Egas Moniz",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jacques Monod",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Luc Montagnier",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Thomas Hunt Morgan",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Hermann Joseph Muller",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ferid Murad",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "William P. Murphy",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Daniel Nathans",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Charles Nicolle",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Niels Kaj Jerne",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Niels Ryberg Finsen",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Marshall Warren Nirenberg",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Carol W. Greider",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Christiane Nüsslein-Volhard",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Otto Fritz Meyerhof",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Otto Heinrich Warburg",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Otto Loewi",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "George Emil Palade",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Paul Hermann Müller",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Paul Nurse",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "İvan Pavlov",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Peter C. Doherty",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Peter J. Ratcliffe",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Peter Medawar",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Philip Showalter Hench",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Phillip Allen Sharp",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Stanley B. Prusiner",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ragnar Granit",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ralph M. Steinman",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Randy Schekman",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Richard J. Roberts",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Dickinson Woodruff Richards",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Charles Robert Richet",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Rita Levi-Montalcini",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Frederick Chapman Robbins",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Robert Bárány",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Robert F. Furchgott",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Robert G. Edwards",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Robin Warren",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Rodney Robert Porter",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Roger Guillemin",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ronald Ross",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Francis Peyton Rous",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Santiago Ramón y Cajal",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Satoshi Ōmura",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Andrew Schally",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Severo Ochoa",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Shimon Sakaguchi",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Shinya Yamanaka",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Oliver Smithies",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "George Davis Snell",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Hans Spemann",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Roger Wolcott Sperry",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Susumu Tonegawa",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Earl Wilbur Sutherland",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Svante Pääbo",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Albert Szent-Györgyi",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jack Szostak",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Tadeus Reichstein",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Tasuku Honjo",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Howard Martin Temin",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Max Theiler",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Hugo Theorell",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Thomas C. Südhof",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "E. Donnall Thomas",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Tim Hunt",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Nikolaas Tinbergen",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Tu Youyou",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ulf von Euler",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Victor Ambros",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Selman Abraham Waksman",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "George Wald",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Walter Rudolf Hess",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "James Dewey Watson",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Thomas Huckle Weller",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "George Whipple",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Torsten N. Wiesel",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Maurice Wilkins",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Willem Einthoven",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "William C. Campbell",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "William Kaelin",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Rosalyn Sussman Yalow",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Yoshinori Ohsumi",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Rolf M. Zinkernagel",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Abdulrazak Gurnah",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Vicente Aleixandre",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Aleksandr Soljenitsin",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ivo Andrić",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Annie Ernaux",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Miguel Angel Asturias",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Samuel Beckett",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jacinto Benavente",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Bertrand Russell",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Björnstjerne Björnson",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Heinrich Böll",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Camilo José Cela",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Albert Camus",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Elias Canetti",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Carl Spitteler",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Winston Churchill",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Czesław Miłosz",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Grazia Deledda",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Derek Walcott",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Bob Dylan",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Elfriede Jelinek",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "T. S. Eliot",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Erik Axel Karlfeldt",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Eugene O'Neill",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Eugenio Montale",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Eyvind Johnson",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "William Faulkner",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Dario Fo",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Anatole France",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Gao Xingjian",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Roger Martin du Gard",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "George Bernard Shaw",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Gerhart Hauptmann",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "André Gide",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Giosue Carducci",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "William Golding",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Nadine Gordimer",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Günter Grass",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Halldór Laxness",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Knut Hamsun",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Han Kang",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Harold Pinter",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Harry Martinson",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Seamus Heaney",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ernest Hemingway",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Henri Bergson",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Herta Müller",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Hermann Hesse",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Imre Kertész",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "İvan Bunin",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "J. M. Coetzee",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jaroslav Seifert",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jean-Marie Gustave Le Clézio",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Juan Ramón Jiménez",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Johannes Vilhelm Jensen",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "John Galsworthy",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jon Fosse",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jose Echegaray",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "José Saramago",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Joseph Brodsky",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Karl Adolph Gjellerup",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Kazuo Ishiguro",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Kenzaburo Oe",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Rudyard Kipling",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Selma Lagerlöf",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "László Krasznahorkai",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Doris Lessing",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Sinclair Lewis",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Louise Glück",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Luigi Pirandello",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Maurice Maeterlinck",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Mario Vargas Llosa",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Gabriel García Márquez",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "François Mauriac",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Frederic Mistral",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Gabriela Mistral",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Mo Yan",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Theodor Mommsen",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Alice Munro",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Necib Mahfuz",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Pablo Neruda",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Odisseus Elitis",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Orhan Pamuk",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Pär Lagerkvist",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Boris Pasternak",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Patrick Modiano",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Patrick White",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Paul Heyse",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Octavio Paz",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Pearl S. Buck",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Peter Handke",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Henrik Pontoppidan",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Salvatore Quasimodo",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Władysław Reymont",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Romain Rolland",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Rudolf Christoph Eucken",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Nelly Sachs",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Saint-John Perse",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jean-Paul Sartre",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Saul Bellow",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Shmuel Yosef Agnon",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Henryk Sienkiewicz",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Frans Eemil Sillanpää",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Claude Simon",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Isaac Bashevis Singer",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "John Steinbeck",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Sully Prudhomme",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Svetlana Aleksiyeviç",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Wislawa Szymborska",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Mihail Şolohov",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Rabindranath Tagore",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Thomas Mann",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Tomas Tranströmer",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Toni Morrison",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Uyandırılmış Toprak",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "V. S. Naipaul",
    "category": "tarihi_kisiler",
    "fameTier": 3
  },
  {
    "name": "Verner von Heidenstam",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "William Butler Yeats",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Wole Soyinka",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Yasunari Kavabata",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Yorgos Seferis",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Annibale Caccavello",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Filippo Brunelleschi",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Giorgio Vasari",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Giovanni Antonio Amadeo",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Urs Graf",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Francesco Laurana",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Marcantonio Raimondi",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Matteo di Giovanni",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Michelangelo",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Prospero Spani",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Bülent Arel",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ana-Maria Avram",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Philippe Boesmans",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Bruno Coulais",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Don Shirley",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ekrem Zeki Ün",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "George Enescu",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Eugen Doga",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Giuseppe Torelli",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Marvin Hamlisch",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Gustav Holst",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Isaac de Camondo",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "John Williams",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Mehmet Ali Bey",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "María Luisa Ozaita",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Peer Gynt",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Miklós Rózsa",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Spiridon Samaras",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Stefan Pohlit",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Tomaso Albinoni",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Yiruma",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Albertus Magnus",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Karl-Otto Apel",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Arnold Gehlen",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Arnold Ruge",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Bruno Bauer",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Alexander Gottlieb Baumgarten",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Walter Benjamin",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jakob Böhme",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Carl Friedrich von Weizsäcker",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Carl Gustav Hempel",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Paul Henri Thiry d'Holbach",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Wilhelm Dilthey",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Din Felsefesi Üzerine Dersler",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Hoimar von Ditfurth",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Eduard Bernstein",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Friedrich Engels",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Erich Fromm",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ernst von Aster",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Eugen Dühring",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ferdinand Fellmann",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ludwig Andreas Feuerbach",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Johann Gottlieb Fichte",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Franz Brentano",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Franz Xaver von Baader",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Fredrich Fröbel",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Friedrich Albert Lange",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Friedrich Meinecke",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Friedrich Schelling",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Friedrich Schiller",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Georg Jellinek",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Johann Wolfgang von Goethe",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Gottfried Leibniz",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Gottlob Frege",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jürgen Habermas",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Hans Freyer",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Hans Reichenbach",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Georg Wilhelm Friedrich Hegel",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Heinz Heimsoeth",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Johann Gottfried Herder",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Hermann Conring",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Hermann Samuel Reimarus",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Paul Hoyningen-Huene",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Alexander von Humboldt",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Wilhelm von Humboldt",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Edmund Husserl",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Immanuel Kant",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Johann Friedrich Herbart",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Joseph Dietzgen",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ernst Jünger",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Karl Daub",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Karl Jaspers",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Karl Joel",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Karl Korsch",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Karl Kautsky",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ursula Klein",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ferdinand Lassalle",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Leo Kofler",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Gotthold Ephraim Lessing",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Ludwig Büchner",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Herbert Marcuse",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Karl Marx",
    "category": "tarihi_kisiler",
    "fameTier": 1
  },
  {
    "name": "Max Beer",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Max Horkheimer",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Meister Eckhart",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Nicolai Hartmann",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Oskar Negt",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Otfried Höffe",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Philipp Mainländer",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Samuel von Pufendorf",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Richard Avenarius",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Rüdiger Safranski",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Saint Victorlu Hugh",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Saksonyalı Albert",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Max Ferdinand Scheler",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Friedrich Schleiermacher",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Moritz Schlick",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Arthur Schopenhauer",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Oswald Spengler",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Edith Stein",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Max Stirner",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Theodor W. Adorno",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ulrich von Hutten",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Pierre Abélard",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Miguel Abensour",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Alain Badiou",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Antoine Augustin Cournot",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Antoine Destutt de Tracy",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Auvergneli William",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Georges Bataille",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Pierre Bayle",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Bernard",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Pierre Bourdieu",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Émile Boutroux",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Lucien Braun",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Étienne Cabet",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Charles Bernard Renouvier",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Charles Fourier",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Christian Bonaud",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Henry Corbin",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Daniel Bensaïd",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Guy Debord",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "René Descartes",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Denis Diderot",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Emmanuel Mounier",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Frantz Fanon",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Bernard le Bovier de Fontenelle",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Francisque Bouillier",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Fulcanelli",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Gaston Bachelard",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Georges Politzer",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Sophie Germain",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Gustave Le Bon",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jacques-André Naigeon",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jean Bodin",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jean Buridan",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jean le Rond d'Alembert",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Jean-François Lyotard",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jean-Luc Nancy",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Joseph de Maistre",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jules Lachelier",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Julia Kristeva",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Julien Offray de La Mettrie",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Etienne de La Boétie",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Didier Lapeyronnie",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Émile Littré",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Louis Althusser",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Louis Claude de Saint-Martin",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Maine de Biran",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Sylvain Maréchal",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jacques Maritain",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Marquis de Condorcet",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Pierre Louis Maupertuis",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Maurice Clavel",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Maurice Merleau-Ponty",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jean Meslier",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Michel de Certeau",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Monique Wittig",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Michel de Montaigne",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Edgar Morin",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Nicholas Malebranche",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Blaise Pascal",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Paul Janet",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Charles Péguy",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Pierre Duhem",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Pierre Gassendi",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Pierre Leroux",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Pierre-Joseph Proudhon",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Rémi Brague",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Renaud Barbaras",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "René Guénon",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Roland Barthes",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Roscelinus",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Jean-Jacques Rousseau",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Sarah Kofman",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Lucien Sève",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Simone de Beauvoir",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Julius Sezar Skaliger",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Georges Vacher de Lapouge",
    "category": "tarihi_kisiler",
    "fameTier": 5
  },
  {
    "name": "Vincent Cespedes",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Voltaire",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Astronom",
    "category": "tarihi_kisiler",
    "fameTier": 4
  },
  {
    "name": "Ayı Humphrey",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Beagle Boys",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Bucky Bug",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Chip 'n' Dale",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Cin, Can ve Cem",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Clarabelle Cow",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Daisy Duck",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "John D. Rockerduck",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "José Carioca",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Justin Russo",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Ludwig Von Drake",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Magica De Spell",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Max Goof",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "McDuck Klanı",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Paperinik",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Arsız Daffy",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Bosko",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Buddy",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Elmer Fudd",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Hızlı Gonzales",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Lola Bunny",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Pepé Le Pew",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Porky Pig",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Tazmanya Canavarı",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Wile E. Coyote ve Road Runner",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Yosemite Sam",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Black Widow",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Blade",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Carol Danvers",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Daredevil",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Darren Cross",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Deadpool",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Demir Adam",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Doktor Octopus",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Doktor Strange",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Dormammu",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Dum Dum Dugan",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Eternals",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "F.R.I.D.A.Y.",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Fantastik Dörtlü",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Leo Fitz",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Howard Stark",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Hulk",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "J. Jonah Jameson",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Jane Foster",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Jim Morita",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Joan The Mouse",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Kandöken",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Kingpin",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Mary Jane Watson",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Melinda May",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Morgan Stark",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Mr. Bumpo",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Ms. Marvel",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Mystique",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "New Goblin",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Nick Fury",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Nyx",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Optimus Prime",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Örümcek Adam",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Para-Man",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Punisher",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Rogue",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Savaş Makinesi",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Skaar",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Storm",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Şahin",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Thor",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Tony Stark",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Turk Barrett",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Ulik",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Uzay Şövalyesi Rom",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Üç Savaşçılar",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Wolverine",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "X-Men",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Ymir",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Zuri",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Aquaman",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Atom",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Batgirl",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Batman",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Black Canary",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Captain Marvel",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Cassie Cage",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Doomsday",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Eobard Thawne",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Flash",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "General Zod",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Green Lantern",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Harvey Bullock",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "James Gordon",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Jason Todd",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Kedi Kadın",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Lana Lang",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Lex Luthor",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Lois Lane",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Nightwing",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Superman",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Tim Drake",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Vartox",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Wonder Woman",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Zatanna",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Zatara",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Zehirli Sarmaşık",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Süper kahraman",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Freakazoid!",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Gözcüler",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Hellboy",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Kâinatın Hâkimleri",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Pırılkız",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Powerpuff Girls",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "The Return of Doctor Mysterio",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Süper kahraman romanları",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Spawn",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Abraham Van Helsing",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Bishōjo",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Bishōnen",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Eren Yeager",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Jun Misugi",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Levi Ackerman",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Light Yagami",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Metal Sonic",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Ryuga",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Soft butch",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Spike Spiegel",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Amy Rose",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Armadillo Mighty",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Chao Cheese",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Desmond Miles",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Druuna",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Kyle Katarn",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Kirpi Nazo",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Kirpi Silver",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Prenses Sally Acorn",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Rivyalı Geralt",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Tavşan Cream",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Uçan Sincap Ray",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Amanvermez Avni",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Arthur Hastings",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Baker Sokağı Çetesi",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Başkomiser Battle",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Başmüfettiş Japp",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Bukalemun Espio",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Dedektif Fix",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Irene Adler",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Jack Bauer",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Jesse Stone",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Hans Landa",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Dedektif Lestrade",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Luke Cage",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Madam Vastra, Jenny Flint ve Strax",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Martin Mystère",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Mayk Hammer",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Miss Marple",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Moon Knight",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Mycroft Holmes",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Myron Bolitar",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Nick Raider",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Dipper Pines",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Hercule Poirot",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Question",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Robin",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Saga Norén",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Tommy ve Tuppence",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Velma Dinkley",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Dr. Watson",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Aang",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Aladdin",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Alex Russo",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Amergin",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Apollon",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Arnemetia",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Artemis",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Artio",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Hao Asakura",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Athena",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Avcı Herne",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Aveta",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Balder",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Bloom",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Bonnie Bennett",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Brigid",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Búri",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Büyüfiks",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Chao Chocola",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Dagda",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Dellingr",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Demeter",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Demirci Völund",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Denizci Sinbad",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Cedric Diggory",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Doktor",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Kont Drakula",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "DreamWorks Ejderhalar",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Efsuncu Amora",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Ekidne Knuckles",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Eragon",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Faust",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Freyja",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Glaistig",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Hebe",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Heimdallr",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Herakles",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Hermes",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Hermóðr",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Hestia",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Hogwarts kadrosu",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Iðunn",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "İmhotep",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Kar Kraliçesi",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Karlar Ülkesi",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Karlar Ülkesi 2",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Karlar Ülkesi 3",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Katara",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Kharis",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Kırk Haramiler",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Kızıl Cadı",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Kirke",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Kirpi Sonic",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Korkut Ata",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Kutsanmış Bran",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Ler",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Light Gaia",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Llyr",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Lóðurr",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Loki",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Neville Longbottom",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Lugh",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Remus Lupin",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Mace Windu",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Minerva McGonagall",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Meili",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Merlin",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Miles \"Tails\" Prower",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Móði ve Magni",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Morgan le Fay",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Nuada",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Odin",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Óðr",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Ogmios",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Oz Büyücüsü",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Prenses Yasemin",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Qui-Gon Jinn",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Radagast",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Segomo",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Shang Tsung",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Sif",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Stephen Strange",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Taranis",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Thjalfi ve Röskva",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Toph Beifong",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Tutatis",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Utgard Loki",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Uther Pendragon",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Väinämöinen",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Vili ve Vé",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Fred ve George Weasley",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Ginny Weasley",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Wong",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Yarasa Rouge",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Yoda",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Zeus",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Zia Raşit",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Zuko",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Kurgusal karakter",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Arif Işık",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Büyük Amiral Thrawn",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Candyman",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Creeper",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Desdemona",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Harry Morgan",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Jack Twist",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "James Doakes",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Jin Kazama",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Karınca Adam",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Leo Valdez",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Malcolm",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Matt Cordell",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Maurice",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Michael De Santa",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Noddy",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Palyaço Art",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Pinhead",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Proximus Sezar",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Pugsley Addams",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Ramona Flowers",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Roxane",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Sezar",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Tall Man",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Thénardierler",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Tommy Shelby",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Twilight Sparkle",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Tywin Lannister",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Victor Crowley",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Victor Trevor",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Abdul Alhazred",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Alığ Han",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Alp Er Tunga",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Alpamış",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Altınay",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Aragorn",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Astinus",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Ay Kağan",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Azmanlar",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Banu Çiçek",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Basat",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Battal Gazi",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Bayındır Han",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Begin Oğlu Emren",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Beowulf",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Bernie Rhodenbarr",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Beyaz Tavşan",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Blinky Bill",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Bozkurt",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Bremen Mızıkacıları",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Carter Kane",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Chemosh",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Chibiabos",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Chingachook",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Conseil",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Cormoran",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Cuchulainn",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Culhwch",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Cyrus Smith",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "D'Artagnan",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Dağ Han",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Dalamar",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Daleli Allan",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Deli Dumrul",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Dodo",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Don Kişot",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Dr. Jekyll ve Mr. Hyde",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Eldarion",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Erik",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Fatih Robur",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Fistandantilus",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Flint Fireforge",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Frankenstein'ın canavarı",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Fritz",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Galahad",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Gargantua",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Gargantua ile Pantagruel",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Gawain",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Gılgamış",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Gilean",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Gilles de Rais",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Grandgousier",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Gregor Samsa",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Grendel",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Griffin",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Lemuel Gulliver",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Habbakuk",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Haldir",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Hansel ve Gretel",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Hanuman",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Hiawatha",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Hiddukel",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Huban Arığ",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Hueil mab Caw",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Humpty Dumpty",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Ichabod Crane",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Ivanhoe",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "İason",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "İlmarinen",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Kaptan Blood",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Kaptan Flint",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Kaptan Hook",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Kaptan Nemo",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Kaptan Smollet",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Kel Mahmut",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Kertenkele Bill",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Keşiş Tuck",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Kıvırcık Çalıdibi",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Kızıl Kral",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Kintarō",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Kiri-Jolith",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Kitiara Uth Matar",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Kör Pew",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Krabat",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Kral Arthur",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Küçük John",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Külkedisi",
    "category": "cizgi_karakterler",
    "fameTier": 1
  },
  {
    "name": "Kür Şad",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Lady Crysania",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Laurana Kanan",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Dr. Livesey",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Lord Glenarvan",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Lord Soth",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Maedhros",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Magnus Chase",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Magwa",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Majere",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Raistlin Majere",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Meg McCaffrey",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Mishakal",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Mordred",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Mudjekeevis",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Baron Münchausen",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Natty Bumppo",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Ned Land",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Nehiryeli",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Nottingham Şerifi",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Oğuz Kağan",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Orodreth",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Paddington Ayısı",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Paladine",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Pamuk Prenses ve Yedi Cüceler",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Pantagruel",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Panurge",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Percy Jackson",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Picrochole",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Porthos",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Profesör Aronnax",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Profesör Challenger",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Profesör Moriarty",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Reorx",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Scarlet Pimpernel",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Sigurd",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Smaug",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Lemony Snicket",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Squire Trelawney",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Geronimo Stilton",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Sturm Brightblade",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Şapkacı",
    "category": "cizgi_karakterler",
    "fameTier": 2
  },
  {
    "name": "Takhisis",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Tanin Majere",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Tanis Yarımelf",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Tasslehoff Burrfoot",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Tepegöz",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "The Yellow Kid",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Theseus",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Thingol",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Tika Waylan",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Tom Ayrton",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Tristan",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Tweedledum ve Tweedledee",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Uncas",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Uzun İhsan Efendi",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Vána",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Walt Stone",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Will Scarlet",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Yürek Oğlanı",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Şatarupa",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Thersites",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Can Manay",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Laurent LeClaire",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Piyer Bezuhov",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Rodion Romanoviç Raskolnikov",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Rufus Scrimgeour",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Kilgore Trout",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Vasily Kuragin",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Çirkin Ördek Yavrusu",
    "category": "cizgi_karakterler",
    "fameTier": 3
  },
  {
    "name": "Anıl Abanoz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Abbas Elkatipzade",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Eymen Abdülaziz",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Abdi Aktaş",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Abdulaziz Demircan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Abdulaziz Solmaz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Abdulhamit Yıldız",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Abdulkadir Kuzey",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Abdulkadir Özdemir",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Abdulkadir Parmak",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Abdulkadir Sünger",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Abdulkadir Şakşak",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Abdullah Avcı",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Abdullah Aydın",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Abdullah Balıkuv",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Abdullah Boz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Abdullah Çuhacıoğlu",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Abdullah Şahindere",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Abdullah Topluoğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Abdullah Ünal",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Abdullah Yiğiter",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Abdulsamed Damlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Abdurrahim Dursun",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Abdurrahman Canlı",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Abdurrahman Dereli",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Abdurrahman Üresin",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Abdülkadir Akyıldız",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Abdülkadir Arun",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Abdülkadir Çelik",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Abdülkadir Demirci",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Abdülkadir Ömür",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Abdürrezzak Tığ",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Abidin Akmanol",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Tolgahan Acar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Tunay Acar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Sadullah Acele",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Akın Açık",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Merthan Açıl",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ada İbik",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ertan Adatepe",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adem Aydın",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adem Çak",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Adem Çalık",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Adem Gezici",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adem Gökçe",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Adem Güven",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Adem Kaya",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adem Kurukaya",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adem Metin Türk",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Adem Neboğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adem Sağlam",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adem Sarı",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adem Tula",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adem Yeşilyurt",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adil Akyüz",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Adil Demirbağ",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Olcan Adın",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adnan Baytar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adnan Çavdar",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Adnan Erkan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adnan Esen",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adnan İbrahim Pirioğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adnan İncirmen",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adnan Karahan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adnan Örnek",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Adnan Sezgin",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adnan Süvari",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Adnan Şentürk",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Emrecan Afacanoğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Berkan Afşarlı",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Halil Ağan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmed Ildız",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmed Kutucu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Aras",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Arda Tuzcu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Arı",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Arslaner",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Asena",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Aslan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Bahçıvan",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ahmet Bal",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Börtücene",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ahmet Bulut",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Burgaz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Canbaz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Çağıran",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ahmet Çalık",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ahmet Çelikhan",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ahmet Dereli",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Devret",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Engin",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Erol",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Gülay",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ahmet Hacıhamzaoğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Karademir",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Karlıklı",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Keloğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Kılıçarslan",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ahmet Kurt",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Mercan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Nuri Çelik",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ahmet Oğuz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Özacar",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ahmet Robenson",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Sabri Fener",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Sağat",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Sağlam",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Suat Özyazıcı",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ahmet Suphi Evke",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Şahin",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Taşyürek",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ahmet Yakak",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Yılmaz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Yılmazer",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Ziya Genç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ahmet Ziya Yüce",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ahmetcan Kaplan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmethan Köse",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Aytaç Ak",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Metin Akan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Nihat Akbay",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Furkan Akbulut",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Akburç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Önder Akdağ",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Erdal Akdarı",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Uğur Akdemir",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Burak Akdiş",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "İsa Akgöl",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Aykut Akgün",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Mehmet Akgün",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Oğuzhan Akgün",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Akhan Karakurt",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Akın Akman",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Akın Alkan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Akın Beyazoğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Akın Sağlam",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Akın Sinan Dağdelen",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Akın Vardar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Akif Başaran",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "İbrahim Akın",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Murat Akın",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Göksel Akıncı",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Aksel Aktaş",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Gürsel Aksel",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Oğuz Aksoy",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Cafercan Aksu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aktan Kutlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Metin Aktaş",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Orhan Aktaş",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Fatih Akyel",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Lokman Akyıldız",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Fahri Akyol",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Serhat Akyüz",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Kerem Can Akyüz",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Mehmet Al",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alaaddin Okumuş",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alaattin Baydar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Emin Aladağ",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alaettin Çiçek",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Alaettin Ekici",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Sinan Alaağaç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Eren Albayrak",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Erhan Albayrak",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Mikail Albayrak",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alberk Koç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Aldoğan Argon",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aleko Yordan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Göksu Alhas",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ali Akdeniz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Akman",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Bayraktar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Beratlıgil",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Beykoz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Bilgin",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Çamdalı",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ali Çanakçı",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ali Çebi",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ali Çoban",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ali Çobanoğlu",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ali Değer",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Emre Yanar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Eren Beşerler",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Eren İyican",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Filibeli",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Gençay",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ali Gültiken",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ali Günçar",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ali Güneş",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ali Güzeldal",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ali Habeşoğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Helvacı",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali İhsan Karayiğit",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali İhsan Okçuoğlu",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ali Kaan Güneren",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ali Kandil",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Kemal Bakoğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Kemal Denizci",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Kemal Karabal",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Keten",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Kılıç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ali Kireş",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Köksal",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ali Kuçik",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ali Kulaksız",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Nail Durmuş",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Nihat Çınar",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ali Osman Antepli",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Osman Çınar",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ali Öztürk",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ali Rıza Şenol",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Rıza Tansu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Rıza Turan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Sami Yen",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Serçek",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ali Soydan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Sümer",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ali Şahin Yılmaz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Şen Kandil",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Tandoğan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Turan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Turap Bülbül",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ali Türkan",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ali Uğur Özen",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ali Yalçın",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ali Yaşar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Yavuz Kol",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Yüksel Usta",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ali Zengin",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Zorlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alican Karadağ",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alican Özfesli",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Alican Tez",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alihan Kubalas",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alim Koyun",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alim Öztürk",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Alioum Boukar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adem Alkaşi",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Bülent Alkılıç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Cenk Ahmet Alkılıç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Álmos Kaan Kalafat",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alp Arda",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alp Sümeralp",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Alparslan Erdem",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alpaslan Eradlı",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alpaslan Öztürk",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Alpay Çelebi",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Alper Boğuşlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alper Efe Pazar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Arzu Karabulut",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Arzu Sema Canbul",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aslı Canan Sabırlı",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aslı Karataş",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aybüke Arslan",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Aycan Yanaç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ayfer Topluoğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ayşe Kuru",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ayşenur Büyükciğer",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Bahar Güvenç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Bahar Özgüvenç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Başak Ersoy",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Başak İçinözbebek",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Benan Altıntaş",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Berivan İçen",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Berna Yeniçeri",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Berra Bayraktar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Bilge Su Koyun",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Bilgin Defterli",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Birgül Sadıkoğlu",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Busem Şeker",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Büşra Ahlatcı",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Büşra Kenet",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Cansu Nur Kaya",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Cansu Yağ",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ceren Nurlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ceren Yağcı",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Çağla Korkmaz",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Çiğdem Belci",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Damla Bozyel",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Demet Bozkurt",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Derya Arhan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Didem Dülber",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Didem Karagenç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Dilan Ağgül",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Dilara Soley Deli",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Duygu Erdoğan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ebru Bayraktar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ebru Topçu",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ece Tekmen",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ece Türkoğlu",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ecem Cumert",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Eda Karataş",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Elif Keskin",
    "category": "sporcular",
    "fameTier": 3
  },
  {
    "name": "Elifenur Karabulut",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Emine Demir",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Emine Gümüş",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Melahat Eryurt",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Emine Ecem Esen",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Esra Özkan",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Esra Sibel Tezkan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Eylül Elgalp",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ezgi Çağlar",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Fatma Kara",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Fatma Şahin",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Fatma Şakar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Fatoş Yıldırım",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Feride Akgün",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Filiz Koç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Gamze Bezan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Gamze Nur Yaman",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Gizem Yazıcı",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Göknur Güleryüz",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Gizem Gönültaş",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Gülbin Hız",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Başak Gündoğdu",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Halle Houssein",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Hilal Çetinkaya",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Hümeyra Şanver",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "İlayda Cansu Kara",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "İlayda Civelek",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "İrem Damla Şahin",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Kader Hançar",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "İpek Kaya",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Kezban Tağ",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Lale Orta",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Esra Manya",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Medine Erkan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Melike Öztürk",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Melis Özçiğdem",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Meryem Cennet Çal",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Meryem Koç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Meryem Küçükbirinci",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Meryem Özyumşak",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Meryem Yamak",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Miray Cin",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Nagehan Akşan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Nazlıcan Parlak",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Nihal Saraç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Nihan Su",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Nihan Üçerler",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Nurcan Çelik",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Özlem Başyurt",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Melike Pekel",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Pelin Nur Çelebi",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Peritan Bozdağ",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Reyhan Şeker",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Reyhan Yüksekoğlu",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Rojda Doğan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Rojin Polat",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Safa Merve Nalçacı",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Seda Nur İncik",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Sejde Abrahamsson",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Selda Akgöz",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Selen Altunkulak",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Selin Cemal Başdüdükçü",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Selin Dişli",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Selin Sivrikaya",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Selina Çerçi",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Serenay Aktaş",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Serenay Öziri",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Servet Uzunlar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Sevgi Çınar",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Seyhan Gündüz",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Sibel Nohut",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Sümeyye Özşahin",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Şehnaz Dilan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Şevval Alpavut",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Tuğba Karataş",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Tuğçe Bayındır",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ümran Özev",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Yağmur Uraz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Yaşam Göksu",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Yeliz Açar",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Adem Bona",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adem Ören",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ahmet Can Duran",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Düverioğlu",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ahmet Gürgen",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ahmet Kandemir",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Sarı",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Şeref Alemdar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Işık",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Limoncuoğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Tuncer",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alican Güney",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Alihan Deniz Genç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Alpay Öztaş",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Alper Yılmaz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alperen Şengün",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Altan Dinçer",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Altan Erol",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Altar Tunçkol",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Anıl Alyanak",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Arca Tülüoğlu",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Arda Berk Kaya",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Arda Erdoğan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Armağan Asena",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Hayri Arsebük",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Asım Pars",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ata Kahraman",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ata Özbek",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Atahan Demirtaş",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ateş Çubukçu",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ayberk Olmaz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aydan Siyavuş",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aydın Örs",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Aydın Uysal",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ayduk Koray",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aytek Gürkan",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Aziz Bekir",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Azizcan Özdemir",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Barış Ermiş",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Barış Güney",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Barış Hersek",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Barış Küce",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Barış Özcan",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Avram Barokas",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Bartu Encü",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Battal Durusel",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Bekir Yarangüme",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Berk Demir",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Berk Uğurlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Berkan Durmaz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Berkay Candan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Berke Aygündüz",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Berke Büyüktuncel",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Birkan Batuk",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Bobby Dixon",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Bora Hun Paçun",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Bora Sancar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Bora Yaşar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Buğra Gacemer",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Buğrahan Tuncer",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Burak Bıyıktay",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Burak Can Yıldızlı",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Burak Gözeneli",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Burak Sezgin",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Burak Yacan Yüksel",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ömer Büyükaycan",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Bülent Tacettin",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Can Akın",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Can Altıntığ",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Can Bartu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Can Kaan Turgut",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Can Korkmaz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Can Maxim Mutaf",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Can Özcan",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Can Sonat",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Can Uğur Öğüt",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Özhan Canaydın",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Canberk Kuş",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Caner Erdeniz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Caner Osman",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Caner Öner",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Caner Topaloğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Cavit Altunay",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Cavit Ege Havsa",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Cedi Osman",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Cem Akdağ",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Cem Dinç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Cemal Nalga",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Cenk Akyol",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Cenk Renda",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Cevher Özer",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ceyhun Altay",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Cihan Mumcuoğulları",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Cudi İmamoğulları",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Cüneyt Erden",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Yunus Çankaya",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Damir Mrsic",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Darius Karutasu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Demircan Demir",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Deniz Can Çevik",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Deniz Kılıçlı",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Derin Saran",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Derya Yannier",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Nejat Diyarbekirli",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Doğan Bozveli",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Doğan Hakyemez",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Doğukan Sönmez",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Doğukan Şanlı",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Doğuş Balbay",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Doğuş Özdemiroğlu",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Doruk Dora",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Dorukhan Engindeniz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Duşan Cantekin",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Efe Aydan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Efe Postel",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Efe Tahmaz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Efekan Coşar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ege Akçay",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ege Arar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ege Demir",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ege Özçelik",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Egehan Arna",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Egemen Güven",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ekrem Sancaklı",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Emir Adıgüzel",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Emir Arda Sivas",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Emir Gökalp",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Emir Preldžić",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Emircan Koşut",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Emre Bayav",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Emre Ekim",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Zaza Enden",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ender Arslan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Enes Kanter Freedom",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Engin Atsür",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Eray Büyükcangaz",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Erbey Paltacı",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Erbil Eroğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ercan Bayrak",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ercan Osmani",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Erdal Bibo",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Erdal Koşan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Erdal Poyrazoğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Erdem Türetken",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Erden Eryüz",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Erdi Gülaslan",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Erdim Öztokat",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Erdoğan Karabelen",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Eren Beyaz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ergi Tırpancı",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ergin Ataman",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Erhan Yetim",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Erkan Veyseloğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Erkan Yılmaz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ermal Kurtoğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Erman Kunter",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Erol Demiroma",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Erolcan Çinko",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ersan İlyasova",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Orkun Kemal Ertaş",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ertem Göreç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Erten Gazi",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Nihat Ertuğ",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ertuğrul Bayraktar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Evren Büker",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Faruk Akagün",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Faruk Beşok",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Fatih Özal",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Fatih Solak",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Fehmi Sadıkoğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Fensal Gürkan",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ferhan Baras",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ferhat Oktay",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Fırat Alemdaroğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Fırat Töz",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "David Filiba",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Furkan Aldemir",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Furkan Haltalı",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Furkan Korkmaz",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Gökbörü Aygar",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Gökhan Şirin",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Gökhan Üçoklar",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Gökhan Yazıcıoğlu",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Göksenin Köksal",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Göktuğ Baş",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Görkem Doğan",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Görkem Sönmez",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Zeki Gülay",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Sadi Gülçelik",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Yılmaz Gündüz",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Güner Yalçıner",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Güray Kanan",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Hadi Özdemir",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Hakan Demirel",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Hakan Köseoğlu",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Hakan Sayılı",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Hakan Yapar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Halil Dağlı",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Halil İbrahim Kuzucu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Halil Üner",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Haluk Yıldırım",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Harun Erdenay",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Hasan Arat",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Henry Turner",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Hidayet Türkoğlu",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Hikmet Vardar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Hurşit Baytok",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Hüdai Budanur",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Hüseyin Alp",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Hüseyin Beşok",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Hüseyin Engin Muratoğlu",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Hüseyin Kozluca",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Hüseyin Öztürk",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Hüsnü Çakırgil",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "İbrahim Kutluay",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "İbrahim Yıldırım",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "İhsan Bayülken",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "İlkan Karaman",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ömercan İlyasoğlu",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "İnanç Koç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "İnanç Mert Hotamış",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "İren İmre",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "İsmail Cem Ulusoy",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "İsmail Karabilen",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "İzzet Türkyılmaz",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Kaan Berk Tarla",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Kaan Onat",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Kamil Ocak",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Karahan Tuan Efeoğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Kartal Özmızrak",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Kaya Peker",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Kemal Can Aktuna",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Kemal Canbolat",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Kemal Dinçer",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Kemal Erdenay",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Kemal Tunçeri",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Kenan Sipahi",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Kerem Gönlüm",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Kerem Hotiç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Kerem Konan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Kerem Tunçeri",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Kristijan Nikolov",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Leon Harun Apaydın",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Levent Bilgin",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Levent Topsakal",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Levent Türknas",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Levent Yavuz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ada Korkmaz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alara Altundağ",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aleksia Karutasu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aleyna Göçmen",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Aleyna Sevim",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aleyna Vence",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Arelya Karasoy",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Arzu Göllü",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Arzum Tezcan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aslı Ertek Aşçıoğlu",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Aslı Kalaç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Aslı Köprülü",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Aslı Tecimer",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aslıhan Kılıç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Aslıhan Sinanoğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Asuman Karakoyun",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aybüke Özel",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ayça Aykaç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ayça Naz İhtiyaroğlu",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ayçin Akyol",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Aylin Sarıoğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aylin Toktamış",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aylin Uysalcan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aysun Özbek",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ayşe Çürük",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ayşe Melis Gürkaynak",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Bahanur Gökalp",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Bahar Akbay",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Bahar Mert",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Bahar Toksoy",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Begüm Hepkaptan",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Begüm Kaçmaz",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Beliz Başkır",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Bengisu Aygün",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Beren Yeşilırmak",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Beril Çoban",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Berin Yıldırım",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Berka Buse Özden",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Berra Eren",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Berrak Deniz Kakaşçı",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Berre İnce",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Beyza Arıcı",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Bianka İlayda Mumcular",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Bihter Dumanoğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Bilge Paşa",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Funda Bilgi",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Birgül Güler",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Buket Gülübay",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Buket Yılmaz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Burcu Yönder",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Buse Kara",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Buse Kayacan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Buse Ünal",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Büşra Güneş",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Büşra Kılıçlı",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Canel Konvur",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Cansın Sendir",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Cansın Şurgun",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Cansu Aydınoğulları",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Cansu Ayyıldız",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Cansu Bir",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Cansu Çetin",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Cansu Özbay",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Cemre Erol",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ceren Baysal",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ceren Hasdemir",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ceren Kapucu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ceren Karagöl",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ceren Mengüç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ceren Nur Domaç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ceren Önal",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ceren Yüzgenç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ceyda Aktaş",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ceyda Kuyan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ceylan Arısan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ceylin Kuyan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Çağla Akın",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Çağla Salih",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Çiğdem Can",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Çiğdem Öztoprak",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Dalia Wilson",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Damla Çakıroğlu",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Damla Gül Çakan",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Damla Nur Dündar",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Damla Tokman",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Defne Başyolcu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Defne Kandemir",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Deniz Emrelli",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Deniz Hakyemez",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Deniz Nazlıcan Zengin",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Deniz Uyanık",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Derya Cebecioğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Derya Çayırgan",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Derya Güç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Dicle Nur Babat",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Didem Ege",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Dilara Bağcı",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Dilara Bilge",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Dilara Yeşil",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Dilay Özdemir",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Dilek Kınık",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Duru Aksu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Duru Şah Tırpancı",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Duygu Bal",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Duygu Çetav",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Duygu Düzceler",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Duygu Sipahioğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ebrar Karakurt",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Ebru Ceylan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ebru Elhan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ece Deniz Uçarı",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ece Eke",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ece Hitayca",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ece Hocaoğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ece Kozdere",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ece Morova",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ecem Aknam",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ecenur Aksoy",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ecesu Soner",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Eda Erdem",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Ege Melisa Bükmen",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Elif Ağca Yarar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Elif Boran",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Elif Gülbayrak",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Elif İlhan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Elif Kapar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Elif Onur Başaran",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Elif Su Eriçek",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Elif Su Yavuz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Elif Şahin",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Elif Uzun",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Elisa Tuana Köse",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Emine Arıcı",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Erçe Su Kasapoğlu",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ergül Avcı",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Eslem Yılmaz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Esra Gümüş",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Esra Yılmaz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Eylül Durgun",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Eylül Karadaş",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Eylül Yatgın",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ezel Balık",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ezgi Akyaldız",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ezgi Arslan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ezgi Bektaş",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ezgi Dilik",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ezgi Kapdan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ezgi Kara",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ezgi Uludağ",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Fatma Beyaz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Fatma Nur Yılmaz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Fatma Şekerci",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Firdevs Kiremitçi",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Fulden Ural",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Gamze Alikaya",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Gizem Çerağ Düzeltir",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Gizem Giraygil",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Gizem Güreşen",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Gizem Mısra Aşçı",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Gizem Örge",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Gizem Türegün",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Gökçen Denkel",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Gözde Dal İrgi",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Gözde Kırdar",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Gözde Yılmaz",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Gülcan Özyıldız",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Gülce Erdemir",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Gülce Güçtekin",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Gülçin Doğan",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Gülden Kayalar",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Güldeniz Önal",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Zülfiye Gündoğdu",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Güneş Çapa",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Hande Baladın",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Hande Korkut",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Hande Naz Sunar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Hanife Nur Özaydınlı",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Hazal Nas Bahtiyar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Hazal Selin Uygur",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Helin Kayıkçı",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Hilal Kocakara",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Hilal Yabuz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Hülya Cömert",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Hülya Erçin",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Hümay Fırıncıoğlu",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Işıl Kartalkanat",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Işıl Öz",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "İdil Naz Kanbur",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "İlarya Zararsız",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "İlayda Naz Gergef",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "İlayda Uçak",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "İlkin Aydın",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "İpar Kurt",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "İpek Soroğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "İrem Çor",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "İrem Nur Özsoy",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Janset Cemre Erkul",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Kardelen İpek Sümer",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Karmen Aksoy",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Oksana Kotelnikova",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Kübra Akman",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Kübra Evşen",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Kübra Kegan",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Lal Verda Akın",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Lila Şengün",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Liray Akpınar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Liza Safronova",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Mahiru Akdağ",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Mehtap Öztunalı",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Meliha Diken",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Melike Yılmaz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Melis Demir",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Melis Durul",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Melis Erdoğan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Melis Yılmaz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Melisa Kerman",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Melissa Vargas",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Merve Atlıer",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Merve Çepni",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Merve Dalbeler",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Merve İzbilir",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Merve Nezir",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Merve Nur Öztürk",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Merve Tanıl",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Merve Tanyel",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Meryem Boz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Mesude Kuyan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Nalan Ural",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Natalia Hanikoğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Naz Aydemir Akyol",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Naz Döner",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Nazlı Eda Kafkas",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Nazlı Özyıldız",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Necla Güçlü Esepaşa",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Nefize Bayramoğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Nehir Kurtulan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Neriman Özsoy",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Neslihan Demir",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Neşve Büyükbayram",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Nihal Yeşil",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Nihan Yeldan Güneyligil",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Nilay Karaağaç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Nilay Konar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Nisa Kuliyeva",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Nisa Nur Yılmaz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Nisan Barut",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Nisan Eroğuz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Nur Hacıeyüpoğlu",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Nur Sevil Aydınlar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alper Potuk",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alper Timur",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Altan Aksoy",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Altay Yavuzaslan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Erhan Altın",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Yusuf Altıntaş",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Hamit Altıntop",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aral Şimşir",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Sabih Arca",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Arda Güler",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Arda Turan",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Arif Güney",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Arif Kocabıyık",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Hakan Arıkan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Özcan Arkoç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Cihat Arman",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Volkan Arslan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Artuner",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Emre Aşık",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Atakan Karazor",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Necati Ateş",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Atila Turan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Cengiz Atila",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Koray Avcı",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Avni Kurgan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aydemir Nemli",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aydın Karabulut",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aydın Tohumcu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ayhan Akman",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ayhan Hançer",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Aykut Kocaman",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aykut Yiğit",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aytaç Kara",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Volkan Babacan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Bahaddin Güneş",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Bahri Altıntabak",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Bahtiyar Yorulmaz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Baki Mercimek",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Serkan Balcı",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Abdülkerim Bardakcı",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Barış Alper Yılmaz",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Deniz Barış",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Yıldıray Baştürk",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Kemal Batmaz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Batuhan Karadeniz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Faruk Bayar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Altay Bayındır",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Engin Baytar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Bedri Gürsoy",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Bekir Barçın",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Bekir İrtegün",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Bekir Refet Teker",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Berat Özdemir",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Berkan Kutlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Berkay Özcan",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Berke Özer",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Candemir Berkman",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Berman",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Bertuğ Yıldırım",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Bilal Kısa",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Nazmi Bilge",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Zafer Bilgetay",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Birol Pekel",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Şenol Birol",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Rıdvan Bolatlı",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Uğur Boral",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Umut Bulut",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Burak Yılmaz",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Burhan Atak",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Burhan Tözer",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Adem Büyük",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Bülent Baturman",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Bülent Bölükbaşı",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Bülent Gürbüz",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Bülent Uygun",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Cafer Aydın",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Cafer Çağatay",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Cahit Dikici",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Uğurcan Çakır",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Can Arat",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Can Uzun",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Caner Erkin",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Hasan Çelik",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Yasin Çelik",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Celil Sağır",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Cenk Gönen",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Abdullah Çevrim",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ceyhun Eriş",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Orhan Çıkırıkçı",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Colin Kâzım-Richards",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Coşkun Ferman",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Coşkun Özarı",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Çağdaş Atan",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Çağlar Birinci",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Çağlayan Derebaşı",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Beyhan Çalışkan",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Tarık Çamdal",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ömer Çatkıç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Oğuz Çetin",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Çetiner Erdoğan",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Raşit Çetiner",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Hüseyin Çimşir",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Emre Çolak",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Uğur Dağdelen",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Demir Ege Tıknaz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aykut Demir",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Muhammet Demir",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Merih Demiral",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Coşkun Demirbakan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Deniz Gül",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Deniz Türüç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Mustafa Denizli",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Oktay Derelioğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Enis Destan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Rıdvan Dilmen",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Basri Dirimlili",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Tolga Doğantez",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Doğan Alemdar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Doğan Küçükduru",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ziya Doğan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Doğukan Sinik",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Dorukhan Toköz",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Candan Dumanlı",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Abdülkerim Durmaz",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ahmet Dursun",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Serdar Dursun",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Murat Duruer",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Bülent Eken",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Reha Eken",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ekrem Günalp",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Mehmet Ekşi",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ayfer Elmastaşoğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ayhan Elmastaşoğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Emirhan İlkhan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Emirhan Topçu",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Emre Akbaba",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Emre Belözoğlu",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Emre Kılınç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Emre Taşdemir",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Emre Toraman",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ender Konca",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Enes Ünal",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Engin Özdemir",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Engin Verel",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Erbil Uzel",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ercan Aktuna",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ercan Koloğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Abdullah Ercan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ercüment Şahin",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Aykut Erçetin",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Erdal Kocaçimen",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Arif Erdem",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Naci Erdem",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Erdoğan Arıca",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Eren Elmalı",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Eren Talu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ergin Gürses",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ergün Acuner",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ergun Ercins",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ergun Öztuna",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ergün Penbe",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Erhan Arslan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Rebii Erkal",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Erkan Avseren",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Erol Bulut",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Erol Dinler",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Erol Togay",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ersan Gülüm",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ersel Altıparmak",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ersen Martin",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ercan Ertuğ",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ertuğrul Ersoy",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Rober Eryol",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Bülent Esel",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Eser Özaltındere",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Eşref Bilgiç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Eşref Özmenç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Evren Turhan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Fahrettin Cansever",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Faruk Barlas",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Faruk Sağnak",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Fatih Tekke",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Fehmi Sağınoğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ferdi Kadıoğlu",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Feridun Buğeker",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Feti Okuroğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Feyyaz Uçar",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Fikret Arıcan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Fikret Demirer",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Fikret Kırcan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Galip Haktanır",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Garbis İstanbulluoğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Mehmet Nazif Gerçin",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Sercan Görgülü",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Şeref Görkey",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Gökdeniz Karadeniz",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Gökhan Akkan",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Gökhan Gedikali",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Gökhan Gönül",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Gökhan Keskin",
    "category": "sporcular",
    "fameTier": 3
  },
  {
    "name": "Gökhan Ünal",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Gökhan Zan",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Gökmen Özdenak",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Zafer Göncüler",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Şanver Göymen",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ceyhun Gülselam",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Emre Güngör",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ceyhun Güray",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Muharrem Gürbüz",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Orhan Gülle",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Aaron Appindangoyé",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Aaron Boupendza",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aaron Lennon",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aaron Opoku",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aatif Chahechouhe",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Muhammed Abarhun",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Abat Ayımbetov",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Abbasbek Feyzullayev",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Abdelaziz Barrada",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Liban Abdi",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Abdou Razack Traoré",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Abdoul Sissoko",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Abdoulay Diaby",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Abdoulaye Ba",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Abdoulaye Diallo",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Abdoulaye Touré",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Abdul Aziz Tetteh",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Abdulsamet Burak",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Abdül Cabbar",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Abdülilah Fehmi",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Abdüzzâhir es-Saka",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Aboubakar Kamara",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Tammy Abraham",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Abuda",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adalto",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adam Bareiro",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adam Buksa",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adam Stachowiak",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adama Traoré",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Adamo Nagalo",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adamu Mohammed",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Emmanuel Adebayor",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adedire Mebude",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adel Bettaieb",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adem Arus",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adem Eren Kabak",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adem Ljajić",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adis Jahović",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Admir Teli",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adnan Gušo",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adnan Januzaj",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adnan Uğur",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adnane Tighadouini",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adolfo Gaich",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adolphe Teikeu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adrian Benedyczak",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adriano",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adriano Facchini",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Adrien Regattin",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Luis Advíncula",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Afonso Sousa",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Afriyie Acquah",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Victor Agali",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alex Agbo",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Joachim Yaw",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Agim Ibraimi",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Agon Mehmeti",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alloysius Agu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Agus",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmed Bilal",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmed el-Mesudi",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmed Hassan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmed Musa",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmed Salah Hüsnü",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ahmed Yasin",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmed Yasir Reyyan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Kanca",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ahmet Kıvanç",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ahmet Yazar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aílton",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ismaïl Aissati",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Akaki Hubutia",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Jerry Akaminko",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alper Akçam",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Akeem Agbetu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Akhilleas Punguras",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ákos Elek",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Burak Akyıldız",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alain Eyobo",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alain Traoré",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Alan Cariús",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alan Walsh",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alanzinho",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alassane Ndao",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alban Meha",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Roland Alberg",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Albian Ajeti",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aldin Čajić",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alejandro Capurro",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alejandro Pozuelo",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aleksandar Aleksandrov",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aleksandar Jovanović",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aleksandar Pešić",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aleksandar Šćekić",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aleksandre Amisulaşvili",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Aleksandros Ciolis",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aleksandros Katranis",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aleksandros Kiziridis",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alen Avdić",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alessandro Cambalhota",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alessio Cerci",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alex de Souza",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Alex Teixeira",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alex Telles",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alexander Djiku",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alexander Löbe",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Alexander Søderlund",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alexander Sørloth",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alexandru Bourceanu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alexandru Cicâldău",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Alexandru Maxim",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alexis Flips",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alexis Pérez",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ali Adnan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Ahamada",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Faiz Atiyye",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Fuat Demircioğlu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ali Gökdemir",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Alain Boghossian",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alberto Tarantini",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Raúl Albiol",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alcides Ghiggia",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aldair",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aldo Olivieri",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alessandro Del Piero",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Álex Baena",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Álex Grimaldo",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alexis Mac Allister",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alfred Pfaff",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alessandro Altobelli",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Amarildo",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Amedeo Biavati",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Américo Gallego",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ânderson Polga",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "José Andrade",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ángel Correa",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Angelo Peruzzi",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Angelo Schiavio",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Antoine Griezmann",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Antonio Cabrini",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Álvaro Arbeloa",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Osvaldo Ardiles",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alphonse Areola",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Jimmy Armfield",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Raimond Aumann",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Aymeric Laporte",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Franco Baresi",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Andrea Barzagli",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Bebeto",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Hilderaldo Bellini",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Benjamin Pavard",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Giuseppe Bergomi",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Bernard Diomède",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Bernard Lama",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Bernd Hölzenbein",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Bernhard Klodt",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Thomas Berthold",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Bixente Lizarazu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Laurent Blanc",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Jérôme Boateng",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Bobby Charlton",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Bodo Illgner",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Rainer Bonhof",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Borja Iglesias",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Branco",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Andreas Brehme",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Paul Breitner",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Brito",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Bruno Conti",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Gianluigi Buffon",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Jorge Burruchaga",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Sergio Busquets",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Cafu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Fabio Cannavaro",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Carles Puyol",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Carlos Alberto Torres",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Carlos Castilho",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Carlos Daniel Tapia",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Carlos Romero",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Iker Casillas",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Héctor Castro",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Jack Charlton",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Christophe Dugarry",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Claudio Borghi",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Claudio Gentile",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Clodoaldo",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Corentin Tolisso",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Cristian Romero",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Bernhard Cullmann",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Dani Olmo",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Daniel Bertoni",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "David Raya",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "David Trezeguet",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "David Villa",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Denílson",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Didier Deschamps",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ángel Di María",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Dida",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Didi",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Diego Maradona",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Djalma Santos",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Djibril Sidibé",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Dunga",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Edílson",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Edmílson",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Émerson Leão",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Emiliano Martínez",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Enrique Ballestrero",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Enrique Guaita",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Enzo Fernández",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Eric García",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ernesto Vidal",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Eusebio Tejera",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Everaldo",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Exequiel Palacios",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Fabián Ruiz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Fabien Barthez",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Fabio Grosso",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Cesc Fàbregas",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Felice Borel",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Félix",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Ferran Torres",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Giovanni Ferrari",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Filippo Inzaghi",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ubaldo Fillol",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Francesco Graziani",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Francesco Totti",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Franco Armani",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Franco Causio",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Frank Leboeuf",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Franz Beckenbauer",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Fulvio Collovati",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Gabriele Oriali",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Gaetano Scirea",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Oscar Garré",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Garrincha",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Gavi",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Gennaro Gattuso",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Geoff Hurst",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "George Cohen",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Germán Pezzella",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Gerónimo Rulli",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Gerry Byrne",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Gérson",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Giancarlo Antognoni",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Gianluca Zambrotta",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Gianpiero Combi",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alberto Gilardino",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Gilberto Silva",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Gilmar",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Gilmar Rinaldi",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Gino Colaussi",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Giovanni Galli",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Olivier Giroud",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Giuseppe Meazza",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Gonzalo Montiel",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Gordon Banks",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Jimmy Greaves",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Guido Buchwald",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Guido Rodríguez",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Hans-Georg Schwarzenbeck",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Héctor Enrique",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Héctor Zelada",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Heinz Flohe",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Helmut Rahn",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Thierry Henry",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Uli Hoeneß",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Horst Eckel",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Horst-Dieter Höttges",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Hugo Lloris",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ian Callaghan",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Vincenzo Iaquinta",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Andrés Iniesta",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Jair da Costa",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Jairzinho",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Joan Capdevila",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Joan García",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Jorginho",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "José Altafini",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "José Luis Brown",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "José Luis Cuciuffo",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "José Maria Rodrigues Alves",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "José Nasazzi",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Josef Posipal",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Juan Foyth",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Julián Álvarez",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Julian Draxler",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Juliano Belletti",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Julio César Britos",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Julio Olarticoechea",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Julio Pérez",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Juninho Paulista",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Juninho Pernambucano",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Júnior",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Jupp Heynckes",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Jürgen Grabowski",
    "category": "sporcular",
    "fameTier": 3
  },
  {
    "name": "Jürgen Kohler",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Kaká",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "N'Golo Kanté",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Christian Karembeu",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Karl Mai",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Karl-Heinz Riedle",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Mario Kempes",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Kevin Großkreutz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "José Kléberson",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Jürgen Klinsmann",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Andreas Köpke",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Toni Kroos",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ricardo La Volpe",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Lamine Yamal",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Lautaro Martínez",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Leandro Paredes",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Leonardo Araújo",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Leopoldo Luque",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Lilian Thuram",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Lionel Charbonnier",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Lionel Messi",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Lisandro Martínez",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Fernando Llorente",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Lucas Hernández",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Lúcio",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Luigi Allemandi",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Luigi Bertolini",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Luis Galván",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Luis Islas",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Luizão",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Sepp Maier",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Steve Mandanda",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Manfred Kaltz",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Marc Cucurella",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Marc Pubill",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Marcel Desailly",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Marcelo Trobbiani",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Carlos Marchena",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Márcio Santos",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Marco Amelia",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Marco Materazzi",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Marco Tardelli",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Marcos",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Marcos Acuña",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Marcos Llorente",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Jair Marinho",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Gianpiero Marini",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Mario Götze",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Mário Zagallo",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Martin Peters",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Martín Zubimendi",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Javi Martínez",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Roque Máspoli",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Daniele Massaro",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Juan Mata",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Lothar Matthäus",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Matthias Ginter",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Blaise Matuidi",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Mauro Camoranesi",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Mauro Ramos",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Mauro Silva",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Mazinho",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Kylian Mbappé",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Mesut Özil",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Óscar Míguez",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Miho Fukumoto",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Mikel Merino",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Mikel Oyarzabal",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Andreas Möller",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Luis Monti",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Bobby Moore",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Max Morlock",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alan Jones",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Fernando Alonso",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Mario Andretti",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alberto Ascari",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Ayrton Senna",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Jim Clark",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Denny Hulme",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Giuseppe Farina",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Emerson Fittipaldi",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Mika Häkkinen",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Mike Hawthorn",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Damon Hill",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Graham Hill",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "James Hunt",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Jack Brabham",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Jackie Stewart",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Jacques Villeneuve",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Jenson Button",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Jochen Rindt",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Jody Scheckter",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Juan Manuel Fangio",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Keke Rosberg",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Kimi Räikkönen",
    "category": "sporcular",
    "fameTier": 5
  },
  {
    "name": "Lando Norris",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Niki Lauda",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Lewis Hamilton",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Nigel Mansell",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Michael Schumacher",
    "category": "sporcular",
    "fameTier": 1
  },
  {
    "name": "Nelson Piquet",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Phil Hill",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Alain Prost",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Nico Rosberg",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Sebastian Vettel",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "John Surtees",
    "category": "sporcular",
    "fameTier": 4
  },
  {
    "name": "Max Verstappen",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Harry Potter'daki büyülü yaratıklar",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Longbottom ailesi",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Luna Lovegood",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Ölüm Yiyen",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Dolores Umbridge",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Ağaçsakal",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Altınyemiş",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Arwen",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Tom Bombadil",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Cadı Kral",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Celebrimbor",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Déagol",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Denethor",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Elrond",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Éomer",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Éowyn",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Faramir",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Galadriel",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Gandalf",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Gollum",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Gothmog",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Gríma Solucandil",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Isildur",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Meriadoc Brandybuck",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Nazgûl",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Peregrin Took",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Shelob",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Théoden",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Lydia Rodarte Quayle",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Marie Schrader",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Saul Goodman",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Skyler White",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Walter White",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Walter White Jr.",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Ada Wong",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Noah Bennet",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "E-123 Omega",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Erin Driscoll",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Kim Bauer",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Leon S. Kennedy",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Matt Parkman",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Max Payne",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Tony Almeida",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Varys",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Kate Austen",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Bea Smith",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Bender",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Benjamin Miles \"C-Note\" Franklin",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Berlin",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Bowser Jr.",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Brian O'Conner",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Carl Johnson",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Claude",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Crazy Eyes",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Daniel Holtz",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Roland Deschain",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Diabolik",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Dominic Toretto",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Mr. Eko",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Electro",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Eric Cartman",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Fernando Sucre",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Figüran Bob",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "James \"Sawyer\" Ford",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Franky Doyle",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Front Man",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Ganon",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Han",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "D.L. Hawkins",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Homer Simpson",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Gregory House",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Jax Teller",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "John Kramer",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Kano",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Keyser Söze",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Kim Wexler",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Kraven the Hunter",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Jin-Soo Kwon",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Lance Vance",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Lorna Morello",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Luis Fernando Lopez",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Frank Martin",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Maxine Conway",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Mona Simpson",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Nelson Muntz",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Nairobi",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Painkiller Jane",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Piper Chapman",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Profesör",
    "category": "dizi_film_karakterleri",
    "fameTier": 1
  },
  {
    "name": "Puck",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Raquel Murillo",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Rio",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Rupert Thorne",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Tecavüzcü Coşkun",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Tokyo",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Toni Cipriani",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Trevor Philips",
    "category": "dizi_film_karakterleri",
    "fameTier": 2
  },
  {
    "name": "Alex Vause",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Vulcan Raven",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Waluigi",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Wario",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Zorro",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Belit",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Black Sails",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Billy Bones",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Bootstrap Bill Turner",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Carina Smyth",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Conan",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "The Curse of Monkey Island",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Çılgın Korsan Jack",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Define Adası",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Define Adasına Dönüş",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Escape from Monkey Island",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Ben Gunn",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Israel Hands",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Hector Barbossa",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Jack Sparrow",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Jim Hawkins",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Joshamee Gibbs",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Kanca",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Karayip Korsanları",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Karayip Korsanları: Dünyanın Sonu",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Karayip Korsanları: Gizemli Denizlerde",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Karayip Korsanları: Ölü Adamın Sandığı",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Karayip Korsanları: Salazar'ın İntikamı",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Karayip Korsanları: Siyah İnci'nin Laneti",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Long John Silver",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Maymun Jack",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Sandokan",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Smee",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Pippi Uzunçorap",
    "category": "dizi_film_karakterleri",
    "fameTier": 4
  },
  {
    "name": "Namık Kemal",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Mehmet Akif Ersoy",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Ziya Gökalp",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Nazım Hikmet",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Orhan Veli Kanık",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Necip Fazıl Kısakürek",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Yaşar Kemal",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Aziz Nesin",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Oğuz Atay",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Sabahattin Ali",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Halide Edip Adıvar",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Reşat Nuri Güntekin",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Peyami Safa",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Ahmet Hamdi Tanpınar",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Cahit Sıtkı Tarancı",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Attila İlhan",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Cemal Süreya",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Edip Cansever",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Turgut Uyar",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "İbn-i Sina (Avicenna)",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "İbn-i Rüşd",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "İbn-i Haldun",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Hacı Bektaş-ı Veli",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Evliya Çelebi",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Osman Hamdi Bey",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Ömer Seyfettin",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Tevfik Fikret",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Halit Ziya Uşaklıgil",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Adnan Menderes",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Turgut Özal",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Süleyman Demirel",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Bülent Ecevit",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Necmettin Erbakan",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Alparslan Türkeş",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Deniz Gezmiş",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Uğur Mumcu",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Abdi İpekçi",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Halil İnalcık",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Bilge Kağan",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Kül Tigin",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Tonyukuk",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Konfüçyüs",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Buda (Siddhartha Gautama)",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Friedrich Nietzsche",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Louis Pasteur",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Alexander Graham Bell",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Pisagor (Pythagoras)",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Arşimet (Archimedes)",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Hipokrat (Hippocrates)",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Spartaküs",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Jeanne d'Arc",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Kraliçe Victoria",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "John F. Kennedy (JFK)",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Martin Luther King Jr.",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Ömer Hayyam",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Farabi (Al-Farabi)",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Harezmi (Al-Khwarizmi)",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Ali Kuşçu",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Katip Çelebi",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Köprülü Mehmet Paşa",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Enver Paşa",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Talat Paşa",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Cemal Paşa",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Kazım Karabekir",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Fevzi Çakmak",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Rauf Orbay",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Ali Fuat Cebesoy",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Sabiha Gökçen",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Nene Hatun",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Seyit Onbaşı",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Kara Fatma",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Şerife Bacı",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Sütçü İmam",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Hasan Tahsin",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Galileo Galilei",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Johannes Kepler",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Nicolaus Copernicus",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Gregor Mendel",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Dmitri Mendeleyev",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Alfred Nobel",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "James Watt",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Wright Kardeşler",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Yuri Gagarin",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Neil Armstrong",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Ferdinand Macellan",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Vasco da Gama",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Marco Polo",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "İbni Batuta",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Sun Tzu",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Homeros",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Herodot",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Çiçero (Cicero)",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Nero",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Marcus Aurelius",
    "category": "tarihi_kisiler",
    "fameTier": 2
  },
  {
    "name": "Semih Kılıçsoy",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Çağlar Söyüncü",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Cenk Tosun",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Selçuk İnan",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Tugay Kerimoğlu",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Nihat Kahveci",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Busenaz Sürmeneli",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Buse Naz Çakıroğlu",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Servet Tazegül",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Şahika Ercümen",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Dries Mertens",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Lucas Torreira",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Vincent Aboubakar",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Fred",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Dominik Livakovic",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Rafa Silva",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Ciro Immobile",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Victor Osimhen",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Kevin De Bruyne",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Mohamed Salah",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Manuel Neuer",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Giannis Antetokounmpo",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Serena Williams",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Conor McGregor",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Khabib Nurmagomedov",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Carlos Alcaraz",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Jannik Sinner",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Pep Guardiola",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Jose Mourinho",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Carlo Ancelotti",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Jürgen Klopp",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Arsène Wenger",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Alex Ferguson",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Didier Drogba",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Wesley Sneijder",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Robin van Persie",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Dirk Kuyt",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Mario Gomez",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Ricardo Quaresma",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Pepe",
    "category": "sporcular",
    "fameTier": 2
  },
  {
    "name": "Talisca",
    "category": "sporcular",
    "fameTier": 2
  }
]

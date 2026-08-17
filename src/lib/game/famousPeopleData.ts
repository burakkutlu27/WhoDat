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
}

export interface FamousPersonSeed {
  name: string
  category: string
}

export const FAMOUS_PEOPLE_SEED: FamousPersonSeed[] = [
  {
    "name": "Vito Corleone (Baba / The Godfather)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Michael Corleone",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Sonny Corleone",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Tony Montana (Yaralı Yüz / Scarface)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Walter White (Heisenberg)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Jesse Pinkman",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Saul Goodman (Jimmy McGill)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Gus Fring",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Mike Ehrmantraut",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Hank Schrader",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Thomas Shelby (Peaky Blinders)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Arthur Shelby",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Polly Gray (Peaky Blinders)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Alfie Solomons",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Jon Snow (Game of Thrones)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Daenerys Targaryen",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Tyrion Lannister",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Cersei Lannister",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Jaime Lannister",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Arya Stark",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Sansa Stark",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Ned Stark",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Gece Kralı (Night King)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Harry Potter",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Hermione Granger",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Ron Weasley",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Lord Voldemort",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Albus Dumbledore",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Severus Snape",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Sirius Black",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Rubeus Hagrid",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Draco Malfoy",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Bellatrix Lestrange",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Dobby (Ev Cini)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Frodo Baggins",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Samwise Gamgee",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Gandalf (Gri/Ak Gandalf)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Aragorn (Yolgezer)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Legolas",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Gimli",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Boromir",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Gollum (Smeagol)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Sauron",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Saruman",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Bilbo Baggins",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Luke Skywalker",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Darth Vader (Anakin Skywalker)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Prenses Leia",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Han Solo",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Chewbacca",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Yoda (Usta Yoda)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Obi-Wan Kenobi",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "İmparator Palpatine",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Darth Maul",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Kylo Ren",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Mandalorian (Din Djarin)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Bebek Yoda (Grogu)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Kaptan Jack Sparrow",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Will Turner",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Elizabeth Swann",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Kaptan Hector Barbossa",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Davy Jones",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Sherlock Holmes",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Dr. John Watson",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Profesör James Moriarty",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "James Bond (007)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Neo (Matrix / Thomas Anderson)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Morpheus (Matrix)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Trinity (Matrix)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Ajan Smith",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "John Wick",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Terminatör (T-800)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Sarah Connor",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Forrest Gump",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Indiana Jones",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Rocky Balboa",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "John Rambo",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Hannibal Lecter",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Tyler Durden (Dövüş Kulübü)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Patrick Bateman (Amerikan Sapığı)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Jordan Belfort (Para Avcısı)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Profesör (La Casa de Papel)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Berlin (La Casa de Papel)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Tokyo (La Casa de Papel)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Michael Scofield (Prison Break)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Theodore Bagwell (T-Bag)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Dexter Morgan",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Wednesday Addams",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Eleven (Stranger Things)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Homelander (The Boys)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Billy Butcher (The Boys)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Polat Alemdar",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Süleyman Çakır",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Memati Baş",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Abdülhey Çoban",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Seyfo Dayı",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Aslan Akbey",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Testere Necmi",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Laz Ziya",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "İskender Büyük",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Pala (Kurtlar Vadisi)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Ramiz Dayı (Ramiz Karaeski)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Ezel Bayraktar",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Eyşan Tezcan",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Cengiz Atay",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Kerpeten Ali (Ali Kırgız)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Kenan Birkan",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Tefo (Tevfik Zaim)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Behzat Ç.",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Harun (Behzat Ç.)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Hayalet (Behzat Ç.)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Akbaba (Behzat Ç.)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Ercüment Çözer",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Behlül Haznedar",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Bihter Ziyagil",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Adnan Ziyagil",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Firdevs Yöreoğlu",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Matmazel (Aşk-ı Memnu)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Yamaç Koçovalı",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "İdris Koçovalı",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Vartolu Sadettin",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Cumali Koçovalı",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Aliço (Çukur)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Mecnun Çınar",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "İsmail Abi",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Erdal Bakkal",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Yılmaz (Gibi)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "İlkkan (Gibi)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Ersoy (Gibi)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Burhan Altıntop",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Gaffur Aksoy",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Şahika Koçarslanlı",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Kuzey Tekinoğlu",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Güney Tekinoğlu",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Rıza Baba (Arka Sokaklar)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Mesut Komiser",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Hüsnü Çoban",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Hızır Çakırbeyli (EDHO)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "İlyas Çakırbeyli",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Recep İvedik",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "İnek Şaban",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Damat Ferit",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Güdük Necmi",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Mahmut Hoca (Kel Mahmut)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Badi Ekrem",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Tosun Paşa",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Hakiki Tosun Paşa",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Kibar Feyzo",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Maho Ağa",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Züğürt Ağa",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Turist Ömer",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Arif Işık (G.O.R.A.)",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Komutan Logar",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Robot 216",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Bob Marley Faruk",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Erşan Kuneri",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Don Kişot (Don Quijote)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Sanço Panço (Sancho Panza)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kont Drakula (Dracula)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Frankenstein (Canavar)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Dorian Gray",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Raskolnikov (Suç ve Ceza)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Jean Valjean (Sefiller)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Müfettiş Javert",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Küçük Prens (Le Petit Prince)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Robinson Crusoe",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Cuma (Robinson Crusoe)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Gulliver (Gulliver’in Gezileri)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Huckleberry Finn",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Tom Sawyer",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Oliver Twist",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Romeo (Romeo ve Juliet)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Juliet (Romeo ve Juliet)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Hamlet",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kral Lear",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Macbeth",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Othello",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Faust (Goethe)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Mefistofeles (Faust)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Alice (Harikalar Diyarında)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Şapkacı (Mad Hatter)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kupa Kraliçesi (Queen of Hearts)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Cheshire Kedisi",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Zeze (Şeker Portakalı)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kaptan Ahab (Moby Dick)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Moby Dick (Beyaz Balina)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Tarzan",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Robin Hood",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Peter Pan",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kaptan Kanca (Captain Hook)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Tinker Bell",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Pinokyo (Pinocchio)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Gepetto Usta",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kırmızı Başlıklı Kız",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kötü Kalpli Kurt (Masal)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Pamuk Prenses",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Külkedisi (Sindirella)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Rapunzel",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Uyuyan Güzel",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Aladdin (Alaaddin)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Sihirli Lambanın Cini",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Ali Baba (Kırk Haramiler)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Sinbad (Denizci Sinbad)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Zeus (Yunan Baş Tanrısı)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Poseidon (Denizler Tanrısı)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Hades (Yeraltı Tanrısı)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Herkül (Herakles)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Medusa (Yılan Saçlı)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Afrodit (Aşk Tanrıçası)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Ares (Savaş Tanrısı)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Hermes (Haberci Tanrı)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Apollo (Güneş Tanrısı)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Artemis (Avcılık Tanrıçası)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Athena (Bilgelik Tanrıçası)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Odin (İskandinav Baş Tanrısı)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Thor (Şimşek Tanrısı)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Loki (Fesatlık Tanrısı)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Freya",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Anubis (Mısır Ölüm Tanrısı)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Ra (Güneş Tanrısı)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Osiris",
    "category": "cizgi_karakterler"
  },
  {
    "name": "İsis",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Şahmeran (Yılanların Şahı)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Keloğlan",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Nasreddin Hoca",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Dede Korkut",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Köroğlu",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Batman (Bruce Wayne)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Joker",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Superman (Clark Kent)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Örümcek Adam (Spider-Man / Peter Parker)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Demir Adam (Iron Man / Tony Stark)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kaptan Amerika (Steve Rogers)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Thor (Marvel)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Hulk (Bruce Banner)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kara Dul (Black Widow / Natasha Romanoff)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Doktor Strange (Stephen Strange)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Deadpool (Wade Wilson)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Wolverine (Logan)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Flash (Barry Allen)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Aquaman (Arthur Curry)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Wonder Woman (Diana Prince)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Harley Quinn",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Thanos",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Venom",
    "category": "cizgi_karakterler"
  },
  {
    "name": "SüngerBob KareŞort",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Patrick Yıldız",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Squidward",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Bay Yengeç",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Plankton",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Mickey Mouse",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Donald Duck",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Goofy",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Bugs Bunny",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Daffy Duck",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Tweety",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Sylvester",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Tom ve Jerry",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Scooby-Doo",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Shaggy",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Temel Reis",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Safinaz",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kabasakal",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Garfield",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Red Kit (Lucky Luke)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Joe Dalton",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Asteriks (Asterix)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Oburiks (Obelix)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Tenten (Tintin)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Şirin Baba",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Şirine",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Gargamel",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Fred Çakmaktaş",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Barni Moloztaş",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Cedric",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Heidi",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Winnie the Pooh",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Simba (Aslan Kral)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Mufasa",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Scar (Aslan Kral)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Shrek",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Fiona (Shrek)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Eşek (Shrek)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Çizmeli Kedi",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kung Fu Panda (Po)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Manny (Buz Devri)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Sid (Buz Devri)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Diego (Buz Devri)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Scrat (Buz Devri)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Woody (Oyuncak Hikayesi)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Buzz Lightyear",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Şimşek McQueen (Arabalar)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Nemo (Kayıp Balık Nemo)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Gru (Çılgın Hırsız)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Minyonlar (Minions)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Ben 10",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Samurai Jack",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Johnny Bravo",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Gumball",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Darwin (Gumball)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Mordecai (Sürekli Dizi)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Rigby (Sürekli Dizi)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Finn (Adventure Time)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Jake (Adventure Time)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Rafadan Tayfa",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Hayri (Rafadan Tayfa)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kamil (Rafadan Tayfa)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kral Şakir",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Fil Necati",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Pepee",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Pikachu (Pokemon)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Ash Ketchum (Pokemon)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Goku (Dragon Ball)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Vegeta (Dragon Ball)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Naruto Uzumaki",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Sasuke Uchiha",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kakashi Hatake",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Monkey D. Luffy (One Piece)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Roronoa Zoro (One Piece)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Sailor Moon (Ay Savaşçısı)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kaptan Tsubasa (Tsubasa Ozora)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kojiro Hyuga",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Super Mario",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Luigi",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Prenses Peach",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Bowser",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Sonic (Kirpi Sonic)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Link (Zelda)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Prenses Zelda",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Pac-Man",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Crash Bandicoot",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Lara Croft (Tomb Raider)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kratos (God of War)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Atreus (God of War)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Rivialı Geralt (The Witcher)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Ciri (The Witcher)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Yennefer of Vengerberg",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Arthur Morgan (Red Dead Redemption 2)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "John Marston (Red Dead Redemption)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "CJ (Carl Johnson - GTA San Andreas)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Tommy Vercetti (GTA Vice City)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Trevor Philips (GTA V)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Niko Bellic (GTA IV)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Master Chief (Halo)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Doom Slayer (Doom)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Gordon Freeman (Half-Life)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Nathan Drake (Uncharted)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Joel Miller (The Last of Us)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Ellie Williams (The Last of Us)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Scorpion (Mortal Kombat)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Sub-Zero (Mortal Kombat)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Ryu (Street Fighter)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Steve (Minecraft)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Creeper (Minecraft)",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Abdulkadir Tuncer",
    "category": "unluler"
  },
  {
    "name": "Abdullah Şahin",
    "category": "unluler"
  },
  {
    "name": "Abdullah Yüce",
    "category": "unluler"
  },
  {
    "name": "Abdurrahman Palay",
    "category": "unluler"
  },
  {
    "name": "Abdülhennan Sefa",
    "category": "unluler"
  },
  {
    "name": "Abidin Görsev",
    "category": "unluler"
  },
  {
    "name": "Abidin Yerebakan",
    "category": "unluler"
  },
  {
    "name": "Numan Acar",
    "category": "unluler"
  },
  {
    "name": "Adem Ayral",
    "category": "unluler"
  },
  {
    "name": "Adem Taşay",
    "category": "unluler"
  },
  {
    "name": "Adnan Biricik",
    "category": "unluler"
  },
  {
    "name": "Adnan Karabacak",
    "category": "unluler"
  },
  {
    "name": "Adnan Maral",
    "category": "unluler"
  },
  {
    "name": "Adnan Mersinli",
    "category": "unluler"
  },
  {
    "name": "Adnan Tönel",
    "category": "unluler"
  },
  {
    "name": "Agah Hün",
    "category": "unluler"
  },
  {
    "name": "Ahmet Ağgün",
    "category": "unluler"
  },
  {
    "name": "Ahmet Arıman",
    "category": "unluler"
  },
  {
    "name": "Ahmet Fehim",
    "category": "unluler"
  },
  {
    "name": "Ahmet Gülhan",
    "category": "unluler"
  },
  {
    "name": "Ahmet Kayakesen",
    "category": "unluler"
  },
  {
    "name": "Ahmet Kostarika",
    "category": "unluler"
  },
  {
    "name": "Ahmet Kural",
    "category": "unluler"
  },
  {
    "name": "Ahmet Levendoğlu",
    "category": "unluler"
  },
  {
    "name": "Ahmet Mümtaz Taylan",
    "category": "unluler"
  },
  {
    "name": "Ahmet Özhan",
    "category": "unluler"
  },
  {
    "name": "Ahmet Rıfat Şungar",
    "category": "unluler"
  },
  {
    "name": "Ahmet Saraçoğlu",
    "category": "unluler"
  },
  {
    "name": "Ahmet Sezerel",
    "category": "unluler"
  },
  {
    "name": "Ahmet Şafak",
    "category": "unluler"
  },
  {
    "name": "Ahmet Tarık Tekçe",
    "category": "unluler"
  },
  {
    "name": "Ahmet Uğurlu",
    "category": "unluler"
  },
  {
    "name": "Ahmet Uz",
    "category": "unluler"
  },
  {
    "name": "Ahmet Üstel",
    "category": "unluler"
  },
  {
    "name": "Ahmet Üstün",
    "category": "unluler"
  },
  {
    "name": "Ahmet Varlı",
    "category": "unluler"
  },
  {
    "name": "Ahmet Yenilmez",
    "category": "unluler"
  },
  {
    "name": "Ajlan Aktuğ",
    "category": "unluler"
  },
  {
    "name": "Ozan Akbaba",
    "category": "unluler"
  },
  {
    "name": "Akın Akınözü",
    "category": "unluler"
  },
  {
    "name": "Akın Tunç",
    "category": "unluler"
  },
  {
    "name": "Akın Uğurlu",
    "category": "unluler"
  },
  {
    "name": "Akif Kilman",
    "category": "unluler"
  },
  {
    "name": "Akil Öztuna",
    "category": "unluler"
  },
  {
    "name": "Alaeddin Şensoy",
    "category": "unluler"
  },
  {
    "name": "Zeki Alasya",
    "category": "unluler"
  },
  {
    "name": "Alev Sezer",
    "category": "unluler"
  },
  {
    "name": "Abdi Algül",
    "category": "unluler"
  },
  {
    "name": "Sadri Alışık",
    "category": "unluler"
  },
  {
    "name": "Ali Atay",
    "category": "unluler"
  },
  {
    "name": "Ali Avaz",
    "category": "unluler"
  },
  {
    "name": "Ali Barışık",
    "category": "unluler"
  },
  {
    "name": "Ali Başar",
    "category": "unluler"
  },
  {
    "name": "Ali Berktay",
    "category": "unluler"
  },
  {
    "name": "Ali Biçim",
    "category": "unluler"
  },
  {
    "name": "Ali Buhara Mete",
    "category": "unluler"
  },
  {
    "name": "Ali Cağaloğlu",
    "category": "unluler"
  },
  {
    "name": "Ali Çatalbaş",
    "category": "unluler"
  },
  {
    "name": "Ali Çelik",
    "category": "unluler"
  },
  {
    "name": "Ali Demir",
    "category": "unluler"
  },
  {
    "name": "Ali Demirel",
    "category": "unluler"
  },
  {
    "name": "Ali Ecder Akışık",
    "category": "unluler"
  },
  {
    "name": "Ali Erkazan",
    "category": "unluler"
  },
  {
    "name": "Ali Ersan Duru",
    "category": "unluler"
  },
  {
    "name": "Ali Fuat Onan",
    "category": "unluler"
  },
  {
    "name": "Ali Güney",
    "category": "unluler"
  },
  {
    "name": "Ali Hürol",
    "category": "unluler"
  },
  {
    "name": "Ali İhsan Bozdemir",
    "category": "unluler"
  },
  {
    "name": "Ali İhsan Varol",
    "category": "unluler"
  },
  {
    "name": "Ali İl",
    "category": "unluler"
  },
  {
    "name": "Ali İnce",
    "category": "unluler"
  },
  {
    "name": "Ali İpin",
    "category": "unluler"
  },
  {
    "name": "Ali Karagöz",
    "category": "unluler"
  },
  {
    "name": "Ali Kemal İskender",
    "category": "unluler"
  },
  {
    "name": "Ali Meriç",
    "category": "unluler"
  },
  {
    "name": "Ali Osman Okumuş",
    "category": "unluler"
  },
  {
    "name": "Ali Poyrazoğlu",
    "category": "unluler"
  },
  {
    "name": "Ali Rıza Kubilay",
    "category": "unluler"
  },
  {
    "name": "Ali Rıza Soydan",
    "category": "unluler"
  },
  {
    "name": "Ali Seçkiner Alıcı",
    "category": "unluler"
  },
  {
    "name": "Ali Sirmen",
    "category": "unluler"
  },
  {
    "name": "Ali Sunal",
    "category": "unluler"
  },
  {
    "name": "Ali Sururi",
    "category": "unluler"
  },
  {
    "name": "Ali Sürmeli",
    "category": "unluler"
  },
  {
    "name": "Ali Taygun",
    "category": "unluler"
  },
  {
    "name": "Ali Tutal",
    "category": "unluler"
  },
  {
    "name": "Ali Uyandıran",
    "category": "unluler"
  },
  {
    "name": "Ali Üstüntaş",
    "category": "unluler"
  },
  {
    "name": "Ali Yalaz",
    "category": "unluler"
  },
  {
    "name": "Ali Yaylı",
    "category": "unluler"
  },
  {
    "name": "Alican Albayrak",
    "category": "unluler"
  },
  {
    "name": "Alican Yücesoy",
    "category": "unluler"
  },
  {
    "name": "Alişan",
    "category": "unluler"
  },
  {
    "name": "Alp Çoker",
    "category": "unluler"
  },
  {
    "name": "Alp Kırşan",
    "category": "unluler"
  },
  {
    "name": "Alp Korkmaz",
    "category": "unluler"
  },
  {
    "name": "Alp Navruz",
    "category": "unluler"
  },
  {
    "name": "Alpaslan Özmol",
    "category": "unluler"
  },
  {
    "name": "Alpay İzer",
    "category": "unluler"
  },
  {
    "name": "Alpay Kemal Atalan",
    "category": "unluler"
  },
  {
    "name": "Alper Atak",
    "category": "unluler"
  },
  {
    "name": "Alper Kul",
    "category": "unluler"
  },
  {
    "name": "Alper Rende",
    "category": "unluler"
  },
  {
    "name": "Alper Saldıran",
    "category": "unluler"
  },
  {
    "name": "Alperen Duymaz",
    "category": "unluler"
  },
  {
    "name": "Alptekin Serdengeçti",
    "category": "unluler"
  },
  {
    "name": "Altan Akışık",
    "category": "unluler"
  },
  {
    "name": "Altan Bozkurt",
    "category": "unluler"
  },
  {
    "name": "Altan Erbulak",
    "category": "unluler"
  },
  {
    "name": "Altan Erkekli",
    "category": "unluler"
  },
  {
    "name": "Altan Günbay",
    "category": "unluler"
  },
  {
    "name": "Hüseyin Altın",
    "category": "unluler"
  },
  {
    "name": "Andrew Hughes",
    "category": "unluler"
  },
  {
    "name": "Anıl İlter",
    "category": "unluler"
  },
  {
    "name": "Anıl Tetik",
    "category": "unluler"
  },
  {
    "name": "Ankaralı Turgut",
    "category": "unluler"
  },
  {
    "name": "Ararat Mor",
    "category": "unluler"
  },
  {
    "name": "Aras Aydın",
    "category": "unluler"
  },
  {
    "name": "Aras Bulut İynemli",
    "category": "unluler"
  },
  {
    "name": "Arda Aydın",
    "category": "unluler"
  },
  {
    "name": "Arda Esen",
    "category": "unluler"
  },
  {
    "name": "Arda Kanpolat",
    "category": "unluler"
  },
  {
    "name": "Arda Kural",
    "category": "unluler"
  },
  {
    "name": "Arda Öziri",
    "category": "unluler"
  },
  {
    "name": "Barış Arduç",
    "category": "unluler"
  },
  {
    "name": "Argun Kınal",
    "category": "unluler"
  },
  {
    "name": "Arif Akkaya",
    "category": "unluler"
  },
  {
    "name": "Arif Erkin Güzelbeyoğlu",
    "category": "unluler"
  },
  {
    "name": "Arif Kilisli",
    "category": "unluler"
  },
  {
    "name": "Arif Pişkin",
    "category": "unluler"
  },
  {
    "name": "Cüneyt Arkın",
    "category": "unluler"
  },
  {
    "name": "Arslan Kacar",
    "category": "unluler"
  },
  {
    "name": "Arşavir Alyanak",
    "category": "unluler"
  },
  {
    "name": "Asım Par",
    "category": "unluler"
  },
  {
    "name": "Aslan Altın",
    "category": "unluler"
  },
  {
    "name": "Ulaş Tuna Astepe",
    "category": "unluler"
  },
  {
    "name": "Asuman Korad",
    "category": "unluler"
  },
  {
    "name": "Ata Berk Mutlu",
    "category": "unluler"
  },
  {
    "name": "Ata Demirer",
    "category": "unluler"
  },
  {
    "name": "Ata Saka",
    "category": "unluler"
  },
  {
    "name": "Atacan Arseven",
    "category": "unluler"
  },
  {
    "name": "Atakan Çelik",
    "category": "unluler"
  },
  {
    "name": "Atalay Demirci",
    "category": "unluler"
  },
  {
    "name": "İrfan Atasoy",
    "category": "unluler"
  },
  {
    "name": "Atıf Kaptan",
    "category": "unluler"
  },
  {
    "name": "Atilla Alpar",
    "category": "unluler"
  },
  {
    "name": "Atilla Arcan",
    "category": "unluler"
  },
  {
    "name": "Atilla Ergün",
    "category": "unluler"
  },
  {
    "name": "Atilla Pekdemir",
    "category": "unluler"
  },
  {
    "name": "Atilla Saral",
    "category": "unluler"
  },
  {
    "name": "Atilla Şendil",
    "category": "unluler"
  },
  {
    "name": "Atilla Yiğit",
    "category": "unluler"
  },
  {
    "name": "Atsız Karaduman",
    "category": "unluler"
  },
  {
    "name": "Attila Olgaç",
    "category": "unluler"
  },
  {
    "name": "Mustafa Avkıran",
    "category": "unluler"
  },
  {
    "name": "Avni Dilligil",
    "category": "unluler"
  },
  {
    "name": "Avni Yalçın",
    "category": "unluler"
  },
  {
    "name": "Ayberk Attila",
    "category": "unluler"
  },
  {
    "name": "Ayberk Pekcan",
    "category": "unluler"
  },
  {
    "name": "Aydemir Akbaş",
    "category": "unluler"
  },
  {
    "name": "Aydın Babaoğlu",
    "category": "unluler"
  },
  {
    "name": "Aydın Haberdar",
    "category": "unluler"
  },
  {
    "name": "Aydın Tezel",
    "category": "unluler"
  },
  {
    "name": "Aydın Tolan",
    "category": "unluler"
  },
  {
    "name": "Ayhan Hülagü",
    "category": "unluler"
  },
  {
    "name": "Ayhan Işık",
    "category": "unluler"
  },
  {
    "name": "Ayhan Kavas",
    "category": "unluler"
  },
  {
    "name": "Ozan Ayhan",
    "category": "unluler"
  },
  {
    "name": "Aykut Oray",
    "category": "unluler"
  },
  {
    "name": "Aykut Sözeri",
    "category": "unluler"
  },
  {
    "name": "Aykut Şahin",
    "category": "unluler"
  },
  {
    "name": "Aytaç Arman",
    "category": "unluler"
  },
  {
    "name": "Aytaç Şaşmaz",
    "category": "unluler"
  },
  {
    "name": "Aytaç Uşun",
    "category": "unluler"
  },
  {
    "name": "Aytaç Yürükaslan",
    "category": "unluler"
  },
  {
    "name": "Aytekin Akkaya",
    "category": "unluler"
  },
  {
    "name": "Ayton Sert",
    "category": "unluler"
  },
  {
    "name": "Azer Bülbül",
    "category": "unluler"
  },
  {
    "name": "Aziz Aslan",
    "category": "unluler"
  },
  {
    "name": "Aziz Basmacı",
    "category": "unluler"
  },
  {
    "name": "Aziz Sarvan",
    "category": "unluler"
  },
  {
    "name": "Bahadır Tok",
    "category": "unluler"
  },
  {
    "name": "Bahri Ateş",
    "category": "unluler"
  },
  {
    "name": "Bahri Beyat",
    "category": "unluler"
  },
  {
    "name": "Bahtiyar Engin",
    "category": "unluler"
  },
  {
    "name": "Baki Çallıoğlu",
    "category": "unluler"
  },
  {
    "name": "Baki Tamer",
    "category": "unluler"
  },
  {
    "name": "Barış Alpaykut",
    "category": "unluler"
  },
  {
    "name": "Barış Atay",
    "category": "unluler"
  },
  {
    "name": "Barış Bağcı",
    "category": "unluler"
  },
  {
    "name": "Barış Çakmak",
    "category": "unluler"
  },
  {
    "name": "Barış Falay",
    "category": "unluler"
  },
  {
    "name": "Barış Kılıç",
    "category": "unluler"
  },
  {
    "name": "Barış Koçak",
    "category": "unluler"
  },
  {
    "name": "Barış Murat Yağcı",
    "category": "unluler"
  },
  {
    "name": "Barış Sezer",
    "category": "unluler"
  },
  {
    "name": "Barış Yıldız",
    "category": "unluler"
  },
  {
    "name": "Batuhan Aydar",
    "category": "unluler"
  },
  {
    "name": "Batuhan Karacakaya",
    "category": "unluler"
  },
  {
    "name": "Bayhan",
    "category": "unluler"
  },
  {
    "name": "Baykal Kent",
    "category": "unluler"
  },
  {
    "name": "Bedir Bedir",
    "category": "unluler"
  },
  {
    "name": "Bedri Uğur",
    "category": "unluler"
  },
  {
    "name": "Behçet Nacar",
    "category": "unluler"
  },
  {
    "name": "Behzat Uygur",
    "category": "unluler"
  },
  {
    "name": "Bekir Aksoy",
    "category": "unluler"
  },
  {
    "name": "Beklan Algan",
    "category": "unluler"
  },
  {
    "name": "Berat Efe Parlar",
    "category": "unluler"
  },
  {
    "name": "Berat Yenilmez",
    "category": "unluler"
  },
  {
    "name": "Berhan Şimşek",
    "category": "unluler"
  },
  {
    "name": "Berk Atan",
    "category": "unluler"
  },
  {
    "name": "Berk Bakioğlu",
    "category": "unluler"
  },
  {
    "name": "Berk Hakman",
    "category": "unluler"
  },
  {
    "name": "Berkan Şal",
    "category": "unluler"
  },
  {
    "name": "Berkay Ateş",
    "category": "unluler"
  },
  {
    "name": "Berke Üzrek",
    "category": "unluler"
  },
  {
    "name": "Berker Güven",
    "category": "unluler"
  },
  {
    "name": "Beyti Engin",
    "category": "unluler"
  },
  {
    "name": "Bican Günalan",
    "category": "unluler"
  },
  {
    "name": "Bilal Çatalçekiç",
    "category": "unluler"
  },
  {
    "name": "Ozan Bilen",
    "category": "unluler"
  },
  {
    "name": "Bilge Zobu",
    "category": "unluler"
  },
  {
    "name": "Birkan Sokullu",
    "category": "unluler"
  },
  {
    "name": "Birol Ünel",
    "category": "unluler"
  },
  {
    "name": "Bora Akkaş",
    "category": "unluler"
  },
  {
    "name": "Bora Ayanoğlu",
    "category": "unluler"
  },
  {
    "name": "Bora Cengiz",
    "category": "unluler"
  },
  {
    "name": "Bora Sivri",
    "category": "unluler"
  },
  {
    "name": "Bora Tekay",
    "category": "unluler"
  },
  {
    "name": "Boran Kuzum",
    "category": "unluler"
  },
  {
    "name": "Bozkurt Kuruç",
    "category": "unluler"
  },
  {
    "name": "Kullanıcı:Bugraork/Taslak",
    "category": "unluler"
  },
  {
    "name": "Buğra Gülsoy",
    "category": "unluler"
  },
  {
    "name": "Buğrahan Çayır",
    "category": "unluler"
  },
  {
    "name": "Onur Buldu",
    "category": "unluler"
  },
  {
    "name": "Bulut Aras",
    "category": "unluler"
  },
  {
    "name": "Burak Alkaş",
    "category": "unluler"
  },
  {
    "name": "Burak Dakak",
    "category": "unluler"
  },
  {
    "name": "Burak Davutoğlu",
    "category": "unluler"
  },
  {
    "name": "Burak Demir",
    "category": "unluler"
  },
  {
    "name": "Burak Deniz",
    "category": "unluler"
  },
  {
    "name": "Burak Özçivit",
    "category": "unluler"
  },
  {
    "name": "Burak Sağyaşar",
    "category": "unluler"
  },
  {
    "name": "Burak Satıbol",
    "category": "unluler"
  },
  {
    "name": "Burak Serdar Şanal",
    "category": "unluler"
  },
  {
    "name": "Burak Sergen",
    "category": "unluler"
  },
  {
    "name": "Burak Sevinç",
    "category": "unluler"
  },
  {
    "name": "Burak Tamdoğan",
    "category": "unluler"
  },
  {
    "name": "Burak Topaloğlu",
    "category": "unluler"
  },
  {
    "name": "Burak Tozkoparan",
    "category": "unluler"
  },
  {
    "name": "Farah Zeynep Abdullah",
    "category": "unluler"
  },
  {
    "name": "Açelya Akkoyun",
    "category": "unluler"
  },
  {
    "name": "Açelya Devrim Yılhan",
    "category": "unluler"
  },
  {
    "name": "Açelya Elmas",
    "category": "unluler"
  },
  {
    "name": "Açelya Özcan",
    "category": "unluler"
  },
  {
    "name": "Açelya Topaloğlu",
    "category": "unluler"
  },
  {
    "name": "Adile Naşit",
    "category": "unluler"
  },
  {
    "name": "Afra Saraçoğlu",
    "category": "unluler"
  },
  {
    "name": "Ahu Sungur",
    "category": "unluler"
  },
  {
    "name": "Ahu Tuğba",
    "category": "unluler"
  },
  {
    "name": "Ahu Türkpençe",
    "category": "unluler"
  },
  {
    "name": "Ahu Yağtu",
    "category": "unluler"
  },
  {
    "name": "Ajda Pekkan",
    "category": "unluler"
  },
  {
    "name": "Akasya Asıltürkmen",
    "category": "unluler"
  },
  {
    "name": "Demet Akbağ",
    "category": "unluler"
  },
  {
    "name": "Sezin Akbaşoğulları",
    "category": "unluler"
  },
  {
    "name": "Filiz Akın",
    "category": "unluler"
  },
  {
    "name": "Zeynep Aksu",
    "category": "unluler"
  },
  {
    "name": "Sevda Aktolga",
    "category": "unluler"
  },
  {
    "name": "Derya Alabora",
    "category": "unluler"
  },
  {
    "name": "Alara Turan",
    "category": "unluler"
  },
  {
    "name": "Alev Baymur",
    "category": "unluler"
  },
  {
    "name": "Alev Gürzap",
    "category": "unluler"
  },
  {
    "name": "Alev Koral",
    "category": "unluler"
  },
  {
    "name": "Alev Oraloğlu",
    "category": "unluler"
  },
  {
    "name": "Alev Sururi",
    "category": "unluler"
  },
  {
    "name": "Aleyna Solaker",
    "category": "unluler"
  },
  {
    "name": "Ayla Algan",
    "category": "unluler"
  },
  {
    "name": "Algı Eke",
    "category": "unluler"
  },
  {
    "name": "Alina Boz",
    "category": "unluler"
  },
  {
    "name": "Alisa Sezen Sever",
    "category": "unluler"
  },
  {
    "name": "Aliye Rona",
    "category": "unluler"
  },
  {
    "name": "Aliye Uzunatağan",
    "category": "unluler"
  },
  {
    "name": "Yasemin Allen",
    "category": "unluler"
  },
  {
    "name": "Alma Terzic",
    "category": "unluler"
  },
  {
    "name": "Almila Bağrıaçık",
    "category": "unluler"
  },
  {
    "name": "Almila Uluer",
    "category": "unluler"
  },
  {
    "name": "Altan Karındaş",
    "category": "unluler"
  },
  {
    "name": "Mehtap Anıl",
    "category": "unluler"
  },
  {
    "name": "Anta Toros",
    "category": "unluler"
  },
  {
    "name": "Meriç Aral",
    "category": "unluler"
  },
  {
    "name": "Melda Arat",
    "category": "unluler"
  },
  {
    "name": "Derya Arbaş",
    "category": "unluler"
  },
  {
    "name": "Zerrin Arbaş",
    "category": "unluler"
  },
  {
    "name": "Arsen Gürzap",
    "category": "unluler"
  },
  {
    "name": "Arzu Gamze Kılınç",
    "category": "unluler"
  },
  {
    "name": "Arzu Okay",
    "category": "unluler"
  },
  {
    "name": "Arzu Oş",
    "category": "unluler"
  },
  {
    "name": "Arzu Yanardağ",
    "category": "unluler"
  },
  {
    "name": "Asena Keskinci",
    "category": "unluler"
  },
  {
    "name": "Asena Tuğal",
    "category": "unluler"
  },
  {
    "name": "Asiye Dinçsoy",
    "category": "unluler"
  },
  {
    "name": "Aslı Altaylar",
    "category": "unluler"
  },
  {
    "name": "Aslı Bekiroğlu",
    "category": "unluler"
  },
  {
    "name": "Aslı Enver",
    "category": "unluler"
  },
  {
    "name": "Aslı İçözü",
    "category": "unluler"
  },
  {
    "name": "Aslı İnandık",
    "category": "unluler"
  },
  {
    "name": "Aslı Omağ",
    "category": "unluler"
  },
  {
    "name": "Aslı Orcan",
    "category": "unluler"
  },
  {
    "name": "Aslı Öngören",
    "category": "unluler"
  },
  {
    "name": "Aslı Tandoğan",
    "category": "unluler"
  },
  {
    "name": "Aslıhan Gürbüz",
    "category": "unluler"
  },
  {
    "name": "Aslıhan Malbora",
    "category": "unluler"
  },
  {
    "name": "Asude Kalebek",
    "category": "unluler"
  },
  {
    "name": "Asuman Arsan",
    "category": "unluler"
  },
  {
    "name": "Asuman Dabak",
    "category": "unluler"
  },
  {
    "name": "Asuman Tuğberk Yolaç",
    "category": "unluler"
  },
  {
    "name": "Aşkın Nur Yengi",
    "category": "unluler"
  },
  {
    "name": "Bala Atabek",
    "category": "unluler"
  },
  {
    "name": "Vildan Atasever",
    "category": "unluler"
  },
  {
    "name": "Hülya Avşar",
    "category": "unluler"
  },
  {
    "name": "Ayben Erman",
    "category": "unluler"
  },
  {
    "name": "Ayça Ayşin Turan",
    "category": "unluler"
  },
  {
    "name": "Ayça Bingöl",
    "category": "unluler"
  },
  {
    "name": "Ayça Eren",
    "category": "unluler"
  },
  {
    "name": "Ayça Erturan",
    "category": "unluler"
  },
  {
    "name": "Ayça İnci",
    "category": "unluler"
  },
  {
    "name": "Ayça Telırmak",
    "category": "unluler"
  },
  {
    "name": "Ayça Varlıer",
    "category": "unluler"
  },
  {
    "name": "Ayçe Abana",
    "category": "unluler"
  },
  {
    "name": "Ayçin İnci",
    "category": "unluler"
  },
  {
    "name": "Ayda Aksel",
    "category": "unluler"
  },
  {
    "name": "Aydan Burhan",
    "category": "unluler"
  },
  {
    "name": "Aydan Şener",
    "category": "unluler"
  },
  {
    "name": "Aydan Taş",
    "category": "unluler"
  },
  {
    "name": "Ayfer Dönmez",
    "category": "unluler"
  },
  {
    "name": "Ayfer Feray",
    "category": "unluler"
  },
  {
    "name": "Ayla Arslancan",
    "category": "unluler"
  },
  {
    "name": "Ayla Karaca",
    "category": "unluler"
  },
  {
    "name": "Aylin Aslım",
    "category": "unluler"
  },
  {
    "name": "Aylin Kabasakal",
    "category": "unluler"
  },
  {
    "name": "Aylin Kontente",
    "category": "unluler"
  },
  {
    "name": "Aylin Tunceli",
    "category": "unluler"
  },
  {
    "name": "Aynur Aydan",
    "category": "unluler"
  },
  {
    "name": "Aysan Sümercan",
    "category": "unluler"
  },
  {
    "name": "Aysel Tanju",
    "category": "unluler"
  },
  {
    "name": "Aysun Güven",
    "category": "unluler"
  },
  {
    "name": "Aysun Metiner",
    "category": "unluler"
  },
  {
    "name": "Ayşe Emel Mesçi",
    "category": "unluler"
  },
  {
    "name": "Ayşe Günyüz",
    "category": "unluler"
  },
  {
    "name": "Ayşe Kırca",
    "category": "unluler"
  },
  {
    "name": "Ayşe Kökçü",
    "category": "unluler"
  },
  {
    "name": "Ayşe Mine",
    "category": "unluler"
  },
  {
    "name": "Ayşe Nana",
    "category": "unluler"
  },
  {
    "name": "Ayşe Selen",
    "category": "unluler"
  },
  {
    "name": "Ayşe Tolga",
    "category": "unluler"
  },
  {
    "name": "Ayşe Tunaboylu",
    "category": "unluler"
  },
  {
    "name": "Ayşegül Akdemir",
    "category": "unluler"
  },
  {
    "name": "Ayşegül Aldinç",
    "category": "unluler"
  },
  {
    "name": "Ayşegül Atik",
    "category": "unluler"
  },
  {
    "name": "Ayşegül Cengiz",
    "category": "unluler"
  },
  {
    "name": "Ayşegül Çıdamlı",
    "category": "unluler"
  },
  {
    "name": "Ayşegül Devrim",
    "category": "unluler"
  },
  {
    "name": "Ayşegül Ünsal",
    "category": "unluler"
  },
  {
    "name": "Ayşen Aydemir",
    "category": "unluler"
  },
  {
    "name": "Ayşen Cansev",
    "category": "unluler"
  },
  {
    "name": "Ayşen Çetiner",
    "category": "unluler"
  },
  {
    "name": "Ayşen Gruda",
    "category": "unluler"
  },
  {
    "name": "Ayşen Tekin",
    "category": "unluler"
  },
  {
    "name": "Ayşenil Şamlıoğlu",
    "category": "unluler"
  },
  {
    "name": "Ayşenur Yazıcı",
    "category": "unluler"
  },
  {
    "name": "Ayşin Atav",
    "category": "unluler"
  },
  {
    "name": "Ayta Sözeri",
    "category": "unluler"
  },
  {
    "name": "Aytaç Öztuna",
    "category": "unluler"
  },
  {
    "name": "Ayten Erman",
    "category": "unluler"
  },
  {
    "name": "Ayten Koçak",
    "category": "unluler"
  },
  {
    "name": "Ayten Kuyululu Ürkmez",
    "category": "unluler"
  },
  {
    "name": "Ayten Soykök",
    "category": "unluler"
  },
  {
    "name": "Azize Gencebay",
    "category": "unluler"
  },
  {
    "name": "Azra Akın",
    "category": "unluler"
  },
  {
    "name": "Bahar Erdeniz",
    "category": "unluler"
  },
  {
    "name": "Bahar Öztan",
    "category": "unluler"
  },
  {
    "name": "Bahar Şahin",
    "category": "unluler"
  },
  {
    "name": "Bahar Yanılmaz",
    "category": "unluler"
  },
  {
    "name": "Bahri Selin",
    "category": "unluler"
  },
  {
    "name": "Banu Alkan",
    "category": "unluler"
  },
  {
    "name": "Banu Kuday",
    "category": "unluler"
  },
  {
    "name": "Başak Daşman",
    "category": "unluler"
  },
  {
    "name": "Başak Kıvılcım Ertanoğlu",
    "category": "unluler"
  },
  {
    "name": "Başak Köklükaya",
    "category": "unluler"
  },
  {
    "name": "Başak Meşe",
    "category": "unluler"
  },
  {
    "name": "Başak Özel",
    "category": "unluler"
  },
  {
    "name": "Başak Parlak",
    "category": "unluler"
  },
  {
    "name": "Başak Sayan",
    "category": "unluler"
  },
  {
    "name": "Bedia Ener",
    "category": "unluler"
  },
  {
    "name": "Bedia Muvahhit",
    "category": "unluler"
  },
  {
    "name": "Begüm Akkaya",
    "category": "unluler"
  },
  {
    "name": "Begüm Birgören",
    "category": "unluler"
  },
  {
    "name": "Begüm Kütük Yaşaroğlu",
    "category": "unluler"
  },
  {
    "name": "Begüm Öner",
    "category": "unluler"
  },
  {
    "name": "Belçim Bilgin",
    "category": "unluler"
  },
  {
    "name": "Belgin Doruk",
    "category": "unluler"
  },
  {
    "name": "Belgin Güven",
    "category": "unluler"
  },
  {
    "name": "Belkıs Akkale",
    "category": "unluler"
  },
  {
    "name": "Belkıs Dilligil",
    "category": "unluler"
  },
  {
    "name": "Bengi Öztürk",
    "category": "unluler"
  },
  {
    "name": "Benli Belkıs",
    "category": "unluler"
  },
  {
    "name": "Bennu Yıldırımlar",
    "category": "unluler"
  },
  {
    "name": "Bensu Orhunöz",
    "category": "unluler"
  },
  {
    "name": "Bensu Soral",
    "category": "unluler"
  },
  {
    "name": "Bercis Fesçi",
    "category": "unluler"
  },
  {
    "name": "Beren Gökyıldız",
    "category": "unluler"
  },
  {
    "name": "Berfu Öngören",
    "category": "unluler"
  },
  {
    "name": "Bergüzar Korel",
    "category": "unluler"
  },
  {
    "name": "Berna Laçin",
    "category": "unluler"
  },
  {
    "name": "Berrak Tüzünataç",
    "category": "unluler"
  },
  {
    "name": "Berrin Akdeniz",
    "category": "unluler"
  },
  {
    "name": "Berrin Koper",
    "category": "unluler"
  },
  {
    "name": "Beste Bereket",
    "category": "unluler"
  },
  {
    "name": "Bestemsu Özdemir",
    "category": "unluler"
  },
  {
    "name": "Betül Arım",
    "category": "unluler"
  },
  {
    "name": "Betül Aşçıoğlu",
    "category": "unluler"
  },
  {
    "name": "Betül Kızılok Bavli",
    "category": "unluler"
  },
  {
    "name": "Beyhan Saran",
    "category": "unluler"
  },
  {
    "name": "Beyza Şekerci",
    "category": "unluler"
  },
  {
    "name": "Bige Önal",
    "category": "unluler"
  },
  {
    "name": "Biğkem Karavus",
    "category": "unluler"
  },
  {
    "name": "Bihter Dinçel",
    "category": "unluler"
  },
  {
    "name": "Bilge Şen",
    "category": "unluler"
  },
  {
    "name": "Billur Kalkavan",
    "category": "unluler"
  },
  {
    "name": "Binnur Kaya",
    "category": "unluler"
  },
  {
    "name": "Binnur Özpınar",
    "category": "unluler"
  },
  {
    "name": "Biran Damla Yılmaz",
    "category": "unluler"
  },
  {
    "name": "Birce Akalay",
    "category": "unluler"
  },
  {
    "name": "Birgül Ulusoy",
    "category": "unluler"
  },
  {
    "name": "Gülse Birsel",
    "category": "unluler"
  },
  {
    "name": "Birsen Ayda",
    "category": "unluler"
  },
  {
    "name": "Birsen Dürülü",
    "category": "unluler"
  },
  {
    "name": "Birsen Kaplangı",
    "category": "unluler"
  },
  {
    "name": "Birsen Menekşeli",
    "category": "unluler"
  },
  {
    "name": "Birtanem Candaner",
    "category": "unluler"
  },
  {
    "name": "Boncuk Yılmaz",
    "category": "unluler"
  },
  {
    "name": "Buket Dereoğlu",
    "category": "unluler"
  },
  {
    "name": "Burcu Altın",
    "category": "unluler"
  },
  {
    "name": "Burcu Biricik",
    "category": "unluler"
  },
  {
    "name": "Burcu Gönder",
    "category": "unluler"
  },
  {
    "name": "Burcu Kara",
    "category": "unluler"
  },
  {
    "name": "Burcu Kıratlı",
    "category": "unluler"
  },
  {
    "name": "Burcu Özberk",
    "category": "unluler"
  },
  {
    "name": "Burçin Abdullah",
    "category": "unluler"
  },
  {
    "name": "Burçin Orhon",
    "category": "unluler"
  },
  {
    "name": "Burçin Terzioğlu",
    "category": "unluler"
  },
  {
    "name": "Buse Arslan",
    "category": "unluler"
  },
  {
    "name": "Büşra Develi",
    "category": "unluler"
  },
  {
    "name": "Büşra Pekin",
    "category": "unluler"
  },
  {
    "name": "Nihan Büyükağaç",
    "category": "unluler"
  },
  {
    "name": "Tuba Büyüküstün",
    "category": "unluler"
  },
  {
    "name": "Cahide Sonku",
    "category": "unluler"
  },
  {
    "name": "Sibel Can",
    "category": "unluler"
  },
  {
    "name": "Canan Çiftel",
    "category": "unluler"
  },
  {
    "name": "Canan Hoşgör",
    "category": "unluler"
  },
  {
    "name": "Canan Perver",
    "category": "unluler"
  },
  {
    "name": "Canan Sanan",
    "category": "unluler"
  },
  {
    "name": "Belma Canciğer",
    "category": "unluler"
  },
  {
    "name": "Candan Erçetin",
    "category": "unluler"
  },
  {
    "name": "Candan Sabuncu",
    "category": "unluler"
  },
  {
    "name": "Hale Caneroğlu",
    "category": "unluler"
  },
  {
    "name": "Cansın Özyosun",
    "category": "unluler"
  },
  {
    "name": "Cansu Dere",
    "category": "unluler"
  },
  {
    "name": "Cansu Tosun",
    "category": "unluler"
  },
  {
    "name": "Cavidan Dora",
    "category": "unluler"
  },
  {
    "name": "Cemre Baysel",
    "category": "unluler"
  },
  {
    "name": "Cemre Ebüzziya",
    "category": "unluler"
  },
  {
    "name": "Cemre Kemer",
    "category": "unluler"
  },
  {
    "name": "Ceren Benderlioğlu",
    "category": "unluler"
  },
  {
    "name": "Ceren Erginsoy",
    "category": "unluler"
  },
  {
    "name": "Ceren Moray",
    "category": "unluler"
  },
  {
    "name": "Ceren Soylu",
    "category": "unluler"
  },
  {
    "name": "Ceren Taşçı",
    "category": "unluler"
  },
  {
    "name": "Ceyda Ateş",
    "category": "unluler"
  },
  {
    "name": "Ceyda Düvenci",
    "category": "unluler"
  },
  {
    "name": "Ceyda Kasabalı",
    "category": "unluler"
  },
  {
    "name": "Ceylan Ece",
    "category": "unluler"
  },
  {
    "name": "Laçin Ceylan",
    "category": "unluler"
  },
  {
    "name": "Meltem Cumbul",
    "category": "unluler"
  },
  {
    "name": "Çağla Akalın",
    "category": "unluler"
  },
  {
    "name": "Çağla Şimşek",
    "category": "unluler"
  },
  {
    "name": "Nebahat Çehre",
    "category": "unluler"
  },
  {
    "name": "Sanem Çelik",
    "category": "unluler"
  },
  {
    "name": "Feride Çetin",
    "category": "unluler"
  },
  {
    "name": "Çiğdem Batur",
    "category": "unluler"
  },
  {
    "name": "Çiğdem Selışık Onat",
    "category": "unluler"
  },
  {
    "name": "Çiğdem Tunç",
    "category": "unluler"
  },
  {
    "name": "Ayça Damgacı",
    "category": "unluler"
  },
  {
    "name": "Damla Sönmez",
    "category": "unluler"
  },
  {
    "name": "Defne Halman",
    "category": "unluler"
  },
  {
    "name": "Defne Kayalar",
    "category": "unluler"
  },
  {
    "name": "Defne Yalnız",
    "category": "unluler"
  },
  {
    "name": "Zeynep Değirmencioğlu",
    "category": "unluler"
  },
  {
    "name": "Demet Evgâr",
    "category": "unluler"
  },
  {
    "name": "Ahmet Tansu Taşanlar",
    "category": "unluler"
  },
  {
    "name": "Ali Atik",
    "category": "unluler"
  },
  {
    "name": "Ali Düşenkalkar",
    "category": "unluler"
  },
  {
    "name": "Alp Öyken",
    "category": "unluler"
  },
  {
    "name": "Atakan Özkaya",
    "category": "unluler"
  },
  {
    "name": "Atılay Uluışık",
    "category": "unluler"
  },
  {
    "name": "Atılgan Gümüş",
    "category": "unluler"
  },
  {
    "name": "Atilla Klinçe",
    "category": "unluler"
  },
  {
    "name": "Aybars Kartal Özson",
    "category": "unluler"
  },
  {
    "name": "Barış Akarsu",
    "category": "unluler"
  },
  {
    "name": "Barış Gönenen",
    "category": "unluler"
  },
  {
    "name": "Baykal Saran",
    "category": "unluler"
  },
  {
    "name": "Berk Cankat",
    "category": "unluler"
  },
  {
    "name": "Berk Oktay",
    "category": "unluler"
  },
  {
    "name": "Berkay Hardal",
    "category": "unluler"
  },
  {
    "name": "Beyazıt Gülercan",
    "category": "unluler"
  },
  {
    "name": "Birtan Turan",
    "category": "unluler"
  },
  {
    "name": "Emin Boztepe",
    "category": "unluler"
  },
  {
    "name": "Buğra Özmüldür",
    "category": "unluler"
  },
  {
    "name": "Burak Aksak",
    "category": "unluler"
  },
  {
    "name": "Burak Kut",
    "category": "unluler"
  },
  {
    "name": "Burak Yamantürk",
    "category": "unluler"
  },
  {
    "name": "Burak Yörük",
    "category": "unluler"
  },
  {
    "name": "Burç Kümbetlioğlu",
    "category": "unluler"
  },
  {
    "name": "Burçin Bildik",
    "category": "unluler"
  },
  {
    "name": "Burçin Oraloğlu",
    "category": "unluler"
  },
  {
    "name": "Bülend Çolak",
    "category": "unluler"
  },
  {
    "name": "Bülent Alkış",
    "category": "unluler"
  },
  {
    "name": "Bülent Babayiğit",
    "category": "unluler"
  },
  {
    "name": "Bülent Çetinaslan",
    "category": "unluler"
  },
  {
    "name": "Bülent Emin Yarar",
    "category": "unluler"
  },
  {
    "name": "Bülent Emrah Parlak",
    "category": "unluler"
  },
  {
    "name": "Bülent İnal",
    "category": "unluler"
  },
  {
    "name": "Bülent Kayabaş",
    "category": "unluler"
  },
  {
    "name": "Bülent Oran",
    "category": "unluler"
  },
  {
    "name": "Bülent Polat",
    "category": "unluler"
  },
  {
    "name": "Bülent Seyran",
    "category": "unluler"
  },
  {
    "name": "Bülent Şakrak",
    "category": "unluler"
  },
  {
    "name": "Bülent Yıldıran",
    "category": "unluler"
  },
  {
    "name": "Kerem Bürsin",
    "category": "unluler"
  },
  {
    "name": "Cahit Gök",
    "category": "unluler"
  },
  {
    "name": "Cahit Kaşıkçılar",
    "category": "unluler"
  },
  {
    "name": "Cahit Şaher",
    "category": "unluler"
  },
  {
    "name": "Can Başak",
    "category": "unluler"
  },
  {
    "name": "Can Bonomo",
    "category": "unluler"
  },
  {
    "name": "Can Doğan",
    "category": "unluler"
  },
  {
    "name": "Can Gürzap",
    "category": "unluler"
  },
  {
    "name": "Can Kahraman",
    "category": "unluler"
  },
  {
    "name": "Can Kolukısa",
    "category": "unluler"
  },
  {
    "name": "Can Nergis",
    "category": "unluler"
  },
  {
    "name": "Can Sipahi",
    "category": "unluler"
  },
  {
    "name": "Can Verel",
    "category": "unluler"
  },
  {
    "name": "Erkan Can",
    "category": "unluler"
  },
  {
    "name": "Canberk Uçucu",
    "category": "unluler"
  },
  {
    "name": "Caner Cindoruk",
    "category": "unluler"
  },
  {
    "name": "Caner Çandarlı",
    "category": "unluler"
  },
  {
    "name": "Caner Erdem",
    "category": "unluler"
  },
  {
    "name": "Caner Kurtaran",
    "category": "unluler"
  },
  {
    "name": "Caner Özyurtlu",
    "category": "unluler"
  },
  {
    "name": "Caner Şahin",
    "category": "unluler"
  },
  {
    "name": "Caner Topçu",
    "category": "unluler"
  },
  {
    "name": "Cansel Elçin",
    "category": "unluler"
  },
  {
    "name": "Celal Al",
    "category": "unluler"
  },
  {
    "name": "Celal Belgil",
    "category": "unluler"
  },
  {
    "name": "Celal Kadri Kınoğlu",
    "category": "unluler"
  },
  {
    "name": "Celal Tak",
    "category": "unluler"
  },
  {
    "name": "Fırat Çelik",
    "category": "unluler"
  },
  {
    "name": "Celil Nalçakan",
    "category": "unluler"
  },
  {
    "name": "Cem Bender",
    "category": "unluler"
  },
  {
    "name": "Ahsen Eroğlu",
    "category": "unluler"
  },
  {
    "name": "Merih Akalın",
    "category": "unluler"
  },
  {
    "name": "Sevil Akı Saner",
    "category": "unluler"
  },
  {
    "name": "Aleyna Şirin",
    "category": "unluler"
  },
  {
    "name": "Almeda Abazi",
    "category": "unluler"
  },
  {
    "name": "Almila Ada",
    "category": "unluler"
  },
  {
    "name": "Andaç Haznedaroğlu",
    "category": "unluler"
  },
  {
    "name": "Ani İpekkaya",
    "category": "unluler"
  },
  {
    "name": "Arzum Onan",
    "category": "unluler"
  },
  {
    "name": "Aslı Öyken Taylan",
    "category": "unluler"
  },
  {
    "name": "Aslı Sümen",
    "category": "unluler"
  },
  {
    "name": "Aslı Yılmaz",
    "category": "unluler"
  },
  {
    "name": "Aslıhan Kandemir",
    "category": "unluler"
  },
  {
    "name": "Asu Maralman",
    "category": "unluler"
  },
  {
    "name": "Asuman Krause",
    "category": "unluler"
  },
  {
    "name": "Ava Yaman",
    "category": "unluler"
  },
  {
    "name": "Aybüke Pusat",
    "category": "unluler"
  },
  {
    "name": "Ayça Işıldar Ak",
    "category": "unluler"
  },
  {
    "name": "Ayça Mutlugil",
    "category": "unluler"
  },
  {
    "name": "Aylin Arasıl",
    "category": "unluler"
  },
  {
    "name": "Ayşe Erbulak",
    "category": "unluler"
  },
  {
    "name": "Ayşe Hatun Önal",
    "category": "unluler"
  },
  {
    "name": "Ayşecan Tatari",
    "category": "unluler"
  },
  {
    "name": "Ayten Uncuoğlu",
    "category": "unluler"
  },
  {
    "name": "Başak Gümülcinelioğlu",
    "category": "unluler"
  },
  {
    "name": "Bengi İdil Uras",
    "category": "unluler"
  },
  {
    "name": "Bengisu Gürbüzer Doğru",
    "category": "unluler"
  },
  {
    "name": "Beril Pozam",
    "category": "unluler"
  },
  {
    "name": "Berna Başer",
    "category": "unluler"
  },
  {
    "name": "Berna Koraltürk",
    "category": "unluler"
  },
  {
    "name": "Berrak Kuş",
    "category": "unluler"
  },
  {
    "name": "Burcu Esmersoy",
    "category": "unluler"
  },
  {
    "name": "Canan Atalay",
    "category": "unluler"
  },
  {
    "name": "Cansu Demirci",
    "category": "unluler"
  },
  {
    "name": "Ceren Karakoç",
    "category": "unluler"
  },
  {
    "name": "Damla Colbay",
    "category": "unluler"
  },
  {
    "name": "Çağla Kubat",
    "category": "unluler"
  },
  {
    "name": "Çağla Şıkel",
    "category": "unluler"
  },
  {
    "name": "Çiğdem Gürel",
    "category": "unluler"
  },
  {
    "name": "Damla Babacan",
    "category": "unluler"
  },
  {
    "name": "Damla Özen",
    "category": "unluler"
  },
  {
    "name": "Defne Joy Foster",
    "category": "unluler"
  },
  {
    "name": "Burak Bulut",
    "category": "unluler"
  },
  {
    "name": "Tibet Ağırtan",
    "category": "unluler"
  },
  {
    "name": "Gaye Su Akyol",
    "category": "unluler"
  },
  {
    "name": "Asım Can Gündüz",
    "category": "unluler"
  },
  {
    "name": "Aslı Gökyokuş",
    "category": "unluler"
  },
  {
    "name": "Ayça Şen",
    "category": "unluler"
  },
  {
    "name": "Aydilge",
    "category": "unluler"
  },
  {
    "name": "Aziz Azmet",
    "category": "unluler"
  },
  {
    "name": "Selda Bağcan",
    "category": "unluler"
  },
  {
    "name": "Bahadır Akkuzu",
    "category": "unluler"
  },
  {
    "name": "Barış Manço",
    "category": "unluler"
  },
  {
    "name": "Batu Akdeniz",
    "category": "unluler"
  },
  {
    "name": "Batu Mutlugil",
    "category": "unluler"
  },
  {
    "name": "Gizem Berk",
    "category": "unluler"
  },
  {
    "name": "Bertuğ Cemil",
    "category": "unluler"
  },
  {
    "name": "Bilge Kösebalaban",
    "category": "unluler"
  },
  {
    "name": "Cahit Berkay",
    "category": "unluler"
  },
  {
    "name": "Koray Candemir",
    "category": "unluler"
  },
  {
    "name": "Cansu Koç",
    "category": "unluler"
  },
  {
    "name": "Cem Karaca",
    "category": "unluler"
  },
  {
    "name": "Cem Kısmet",
    "category": "unluler"
  },
  {
    "name": "Cem Özkan",
    "category": "unluler"
  },
  {
    "name": "Cemil Demirbakan",
    "category": "unluler"
  },
  {
    "name": "Cemil Özeren",
    "category": "unluler"
  },
  {
    "name": "Cenk Durmazel",
    "category": "unluler"
  },
  {
    "name": "Cenk Eroğlu",
    "category": "unluler"
  },
  {
    "name": "Hayko Cepkin",
    "category": "unluler"
  },
  {
    "name": "Çelik",
    "category": "unluler"
  },
  {
    "name": "Demir Demirkan",
    "category": "unluler"
  },
  {
    "name": "Demirhan Baylan",
    "category": "unluler"
  },
  {
    "name": "Deniz Arcak",
    "category": "unluler"
  },
  {
    "name": "Deniz Yılmaz",
    "category": "unluler"
  },
  {
    "name": "Deniz Özbey",
    "category": "unluler"
  },
  {
    "name": "Nev",
    "category": "unluler"
  },
  {
    "name": "Edip Akbayram",
    "category": "unluler"
  },
  {
    "name": "Edis İlhan",
    "category": "unluler"
  },
  {
    "name": "Emrah Karaca",
    "category": "unluler"
  },
  {
    "name": "Emre Altuğ",
    "category": "unluler"
  },
  {
    "name": "Emre Aydın",
    "category": "unluler"
  },
  {
    "name": "Erdem Yener",
    "category": "unluler"
  },
  {
    "name": "Erhan Güleryüz",
    "category": "unluler"
  },
  {
    "name": "Barlas Erinç",
    "category": "unluler"
  },
  {
    "name": "Erol Büyükburç",
    "category": "unluler"
  },
  {
    "name": "Ete Kurttekin",
    "category": "unluler"
  },
  {
    "name": "Fatih Erdemci",
    "category": "unluler"
  },
  {
    "name": "Fatma Turgut",
    "category": "unluler"
  },
  {
    "name": "Şebnem Ferah",
    "category": "unluler"
  },
  {
    "name": "Feridun Düzağaç",
    "category": "unluler"
  },
  {
    "name": "Ferman Akgül",
    "category": "unluler"
  },
  {
    "name": "Özge Fışkın",
    "category": "unluler"
  },
  {
    "name": "Fikret Kızılok",
    "category": "unluler"
  },
  {
    "name": "Genç Osman Yavaş",
    "category": "unluler"
  },
  {
    "name": "Gökalp Baykal",
    "category": "unluler"
  },
  {
    "name": "Gökçe",
    "category": "unluler"
  },
  {
    "name": "Gökhan Özoğuz",
    "category": "unluler"
  },
  {
    "name": "Gökhan Semiz",
    "category": "unluler"
  },
  {
    "name": "Güler",
    "category": "unluler"
  },
  {
    "name": "Gülhan",
    "category": "unluler"
  },
  {
    "name": "Gültekin Kaan",
    "category": "unluler"
  },
  {
    "name": "Fuat Güner",
    "category": "unluler"
  },
  {
    "name": "Gür Akad",
    "category": "unluler"
  },
  {
    "name": "Gürol Ağırbaş",
    "category": "unluler"
  },
  {
    "name": "Hakan Tunçbilek",
    "category": "unluler"
  },
  {
    "name": "Halil Sezai",
    "category": "unluler"
  },
  {
    "name": "Haluk Levent",
    "category": "unluler"
  },
  {
    "name": "Harun Tekin",
    "category": "unluler"
  },
  {
    "name": "İlhan İrem",
    "category": "unluler"
  },
  {
    "name": "Öztürk İlmaz",
    "category": "unluler"
  },
  {
    "name": "İskender Türsen",
    "category": "unluler"
  },
  {
    "name": "Kaan Boşnak",
    "category": "unluler"
  },
  {
    "name": "Kaan Tangöze",
    "category": "unluler"
  },
  {
    "name": "Kalben",
    "category": "unluler"
  },
  {
    "name": "Kâzım Koyuncu",
    "category": "unluler"
  },
  {
    "name": "Kenan Vural",
    "category": "unluler"
  },
  {
    "name": "Kıraç",
    "category": "unluler"
  },
  {
    "name": "Erkin Koray",
    "category": "unluler"
  },
  {
    "name": "Kudret Kurtcebe",
    "category": "unluler"
  },
  {
    "name": "Aylin Livaneli",
    "category": "unluler"
  },
  {
    "name": "Mabel Matiz",
    "category": "unluler"
  },
  {
    "name": "Melis Danişmend",
    "category": "unluler"
  },
  {
    "name": "Mesut Aytunca",
    "category": "unluler"
  },
  {
    "name": "Metin Kor",
    "category": "unluler"
  },
  {
    "name": "Murat Ertel",
    "category": "unluler"
  },
  {
    "name": "Murat Evgin",
    "category": "unluler"
  },
  {
    "name": "Murat Göğebakan",
    "category": "unluler"
  },
  {
    "name": "Murat İlkan",
    "category": "unluler"
  },
  {
    "name": "Murat Kekilli",
    "category": "unluler"
  },
  {
    "name": "Murat Net",
    "category": "unluler"
  },
  {
    "name": "Nedim Hazar",
    "category": "unluler"
  },
  {
    "name": "Nejat Toksoy",
    "category": "unluler"
  },
  {
    "name": "Nejat Yavaşoğulları",
    "category": "unluler"
  },
  {
    "name": "Niyazi Koyuncu",
    "category": "unluler"
  },
  {
    "name": "Cahit Oben",
    "category": "unluler"
  },
  {
    "name": "Ogün Sanlısoy",
    "category": "unluler"
  },
  {
    "name": "Orhan Atasoy",
    "category": "unluler"
  },
  {
    "name": "Nazan Öncel",
    "category": "unluler"
  },
  {
    "name": "Özgür Çevik",
    "category": "unluler"
  },
  {
    "name": "Özlem Tekin",
    "category": "unluler"
  },
  {
    "name": "Pınar Aylin",
    "category": "unluler"
  },
  {
    "name": "Renan Bilek",
    "category": "unluler"
  },
  {
    "name": "Sabih Cangil",
    "category": "unluler"
  },
  {
    "name": "Sarp Sanin",
    "category": "unluler"
  },
  {
    "name": "Savaş Alp Başar",
    "category": "unluler"
  },
  {
    "name": "Serdar Öztop",
    "category": "unluler"
  },
  {
    "name": "Sertab Erener",
    "category": "unluler"
  },
  {
    "name": "Seyhan Karabay",
    "category": "unluler"
  },
  {
    "name": "Seyyal Taner",
    "category": "unluler"
  },
  {
    "name": "Sibel Tüzün",
    "category": "unluler"
  },
  {
    "name": "Sinan Kaynakçı",
    "category": "unluler"
  },
  {
    "name": "Pamela Spence",
    "category": "unluler"
  },
  {
    "name": "Erkut Taçkın",
    "category": "unluler"
  },
  {
    "name": "Cenk Taner",
    "category": "unluler"
  },
  {
    "name": "Tarkan Çakır",
    "category": "unluler"
  },
  {
    "name": "Teoman",
    "category": "unluler"
  },
  {
    "name": "Umut Kaya",
    "category": "unluler"
  },
  {
    "name": "Ünol Büyükgönenç",
    "category": "unluler"
  },
  {
    "name": "Yamaç Telli",
    "category": "unluler"
  },
  {
    "name": "Yasemin Mori",
    "category": "unluler"
  },
  {
    "name": "Yaşar Kurt",
    "category": "unluler"
  },
  {
    "name": "Yavuz Çetin",
    "category": "unluler"
  },
  {
    "name": "Ufo361",
    "category": "unluler"
  },
  {
    "name": "Ados",
    "category": "unluler"
  },
  {
    "name": "Ağaçkakan",
    "category": "unluler"
  },
  {
    "name": "Allâme",
    "category": "unluler"
  },
  {
    "name": "Alper Ağa",
    "category": "unluler"
  },
  {
    "name": "Anıl Piyancı",
    "category": "unluler"
  },
  {
    "name": "Ati242",
    "category": "unluler"
  },
  {
    "name": "Ayben",
    "category": "unluler"
  },
  {
    "name": "Ben Fero",
    "category": "unluler"
  },
  {
    "name": "Beta Berk Bayındır",
    "category": "unluler"
  },
  {
    "name": "Blok3",
    "category": "unluler"
  },
  {
    "name": "Boe B",
    "category": "unluler"
  },
  {
    "name": "Burak King",
    "category": "unluler"
  },
  {
    "name": "Cakal",
    "category": "unluler"
  },
  {
    "name": "Ceg",
    "category": "unluler"
  },
  {
    "name": "Ceza",
    "category": "unluler"
  },
  {
    "name": "Contra",
    "category": "unluler"
  },
  {
    "name": "Dr. Fuchs",
    "category": "unluler"
  },
  {
    "name": "Ege Çubukçu",
    "category": "unluler"
  },
  {
    "name": "Erci E",
    "category": "unluler"
  },
  {
    "name": "Eypio",
    "category": "unluler"
  },
  {
    "name": "Ezhel",
    "category": "unluler"
  },
  {
    "name": "Fuat Ergin",
    "category": "unluler"
  },
  {
    "name": "Gazapizm",
    "category": "unluler"
  },
  {
    "name": "Güneş",
    "category": "unluler"
  },
  {
    "name": "Hayki",
    "category": "unluler"
  },
  {
    "name": "Hey! Douglas",
    "category": "unluler"
  },
  {
    "name": "Kabus Kerim",
    "category": "unluler"
  },
  {
    "name": "Kamufle",
    "category": "unluler"
  },
  {
    "name": "Kubilay Karça",
    "category": "unluler"
  },
  {
    "name": "Kayra",
    "category": "unluler"
  },
  {
    "name": "Keişan",
    "category": "unluler"
  },
  {
    "name": "Khontkar",
    "category": "unluler"
  },
  {
    "name": "Killa Hakan",
    "category": "unluler"
  },
  {
    "name": "Kool Savas",
    "category": "unluler"
  },
  {
    "name": "Lvbel C5",
    "category": "unluler"
  },
  {
    "name": "Massaka",
    "category": "unluler"
  },
  {
    "name": "Mehmet Borukcu",
    "category": "unluler"
  },
  {
    "name": "Mirac",
    "category": "unluler"
  },
  {
    "name": "Motive",
    "category": "unluler"
  },
  {
    "name": "Murda",
    "category": "unluler"
  },
  {
    "name": "Norm Ender",
    "category": "unluler"
  },
  {
    "name": "Ogeday",
    "category": "unluler"
  },
  {
    "name": "Ozbi",
    "category": "unluler"
  },
  {
    "name": "Patron",
    "category": "unluler"
  },
  {
    "name": "Ragga Oktay",
    "category": "unluler"
  },
  {
    "name": "Reyhan Şahin",
    "category": "unluler"
  },
  {
    "name": "Sagopa Kajmer",
    "category": "unluler"
  },
  {
    "name": "Saian",
    "category": "unluler"
  },
  {
    "name": "Sansar Salvo",
    "category": "unluler"
  },
  {
    "name": "Sefo",
    "category": "unluler"
  },
  {
    "name": "Server Uraz",
    "category": "unluler"
  },
  {
    "name": "Sokrat St",
    "category": "unluler"
  },
  {
    "name": "Şanışer",
    "category": "unluler"
  },
  {
    "name": "Şehinşah",
    "category": "unluler"
  },
  {
    "name": "Tankurt Manas",
    "category": "unluler"
  },
  {
    "name": "Tepki",
    "category": "unluler"
  },
  {
    "name": "Kullanıcı mesaj:TRMuzikGozlemcisi",
    "category": "unluler"
  },
  {
    "name": "Uzi",
    "category": "unluler"
  },
  {
    "name": "Vio",
    "category": "unluler"
  },
  {
    "name": "Yener Çevik",
    "category": "unluler"
  },
  {
    "name": "Zen-G",
    "category": "unluler"
  },
  {
    "name": "İlyas Salman",
    "category": "unluler"
  },
  {
    "name": "Oya Başar",
    "category": "unluler"
  },
  {
    "name": "Pelinsu Pir",
    "category": "unluler"
  },
  {
    "name": "Yasemin Yalçın",
    "category": "unluler"
  },
  {
    "name": "Ahmet Çakar",
    "category": "unluler"
  },
  {
    "name": "Ahmet Murat Özel",
    "category": "unluler"
  },
  {
    "name": "Ahmet Tezcan",
    "category": "unluler"
  },
  {
    "name": "Ahmet Vardar",
    "category": "unluler"
  },
  {
    "name": "Ahmet Yeşiltepe",
    "category": "unluler"
  },
  {
    "name": "Sunay Akın",
    "category": "unluler"
  },
  {
    "name": "Hakan Akkaya",
    "category": "unluler"
  },
  {
    "name": "Nur Tuğba Namlı",
    "category": "unluler"
  },
  {
    "name": "Ali Esin",
    "category": "unluler"
  },
  {
    "name": "Ayşe Aral",
    "category": "unluler"
  },
  {
    "name": "Aslı Hünel",
    "category": "unluler"
  },
  {
    "name": "Aslıhan Yeltekin",
    "category": "unluler"
  },
  {
    "name": "Atilla Taş",
    "category": "unluler"
  },
  {
    "name": "Banu Avar",
    "category": "unluler"
  },
  {
    "name": "Aydan Önder",
    "category": "unluler"
  },
  {
    "name": "Aydın",
    "category": "unluler"
  },
  {
    "name": "Hakan Aygün",
    "category": "unluler"
  },
  {
    "name": "Aylin Özmenek",
    "category": "unluler"
  },
  {
    "name": "Aziz Üstel",
    "category": "unluler"
  },
  {
    "name": "Bahar Feyzan",
    "category": "unluler"
  },
  {
    "name": "Banu Atabay",
    "category": "unluler"
  },
  {
    "name": "Banu Taviloğlu",
    "category": "unluler"
  },
  {
    "name": "Bilgehan Demir",
    "category": "unluler"
  },
  {
    "name": "Boran Kaya",
    "category": "unluler"
  },
  {
    "name": "Yiğit Bulut",
    "category": "unluler"
  },
  {
    "name": "Burcu Çetinkaya",
    "category": "unluler"
  },
  {
    "name": "Burcu Kaya",
    "category": "unluler"
  },
  {
    "name": "Bülend Özveren",
    "category": "unluler"
  },
  {
    "name": "Bülent Ülgen",
    "category": "unluler"
  },
  {
    "name": "Can Akbel",
    "category": "unluler"
  },
  {
    "name": "Can Ataklı",
    "category": "unluler"
  },
  {
    "name": "Can Okanar",
    "category": "unluler"
  },
  {
    "name": "Cansu Canan Özgen",
    "category": "unluler"
  },
  {
    "name": "Cem Ceminay",
    "category": "unluler"
  },
  {
    "name": "Cem Davran",
    "category": "unluler"
  },
  {
    "name": "Cem Kurtoğlu",
    "category": "unluler"
  },
  {
    "name": "Cem Küçük",
    "category": "unluler"
  },
  {
    "name": "Cem Özer",
    "category": "unluler"
  },
  {
    "name": "Cemal Can Canseven",
    "category": "unluler"
  },
  {
    "name": "Cengiz Çandar",
    "category": "unluler"
  },
  {
    "name": "Cengiz Semercioğlu",
    "category": "unluler"
  },
  {
    "name": "Cenk Koray",
    "category": "unluler"
  },
  {
    "name": "Ceyhun Yılmaz",
    "category": "unluler"
  },
  {
    "name": "Çağıl Özge Özkul",
    "category": "unluler"
  },
  {
    "name": "Çetin Çiftçioğlu",
    "category": "unluler"
  },
  {
    "name": "Faik Çetiner",
    "category": "unluler"
  },
  {
    "name": "Demet Akalın",
    "category": "unluler"
  },
  {
    "name": "Demet Şener",
    "category": "unluler"
  },
  {
    "name": "Deniz Akkaya",
    "category": "unluler"
  },
  {
    "name": "Deniz Pulaş",
    "category": "unluler"
  },
  {
    "name": "Deniz Seki",
    "category": "unluler"
  },
  {
    "name": "Derya Baykal",
    "category": "unluler"
  },
  {
    "name": "Derya Taşbaşı",
    "category": "unluler"
  },
  {
    "name": "Didem Arslan Yılmaz",
    "category": "unluler"
  },
  {
    "name": "Didem İnselel",
    "category": "unluler"
  },
  {
    "name": "Dilara Gönder",
    "category": "unluler"
  },
  {
    "name": "Dilaver Uyanık",
    "category": "unluler"
  },
  {
    "name": "Doğa Bekleriz",
    "category": "unluler"
  },
  {
    "name": "Doğu Demirkol",
    "category": "unluler"
  },
  {
    "name": "Güzide Duran",
    "category": "unluler"
  },
  {
    "name": "Ersin Düzen",
    "category": "unluler"
  },
  {
    "name": "Ebru Akel",
    "category": "unluler"
  },
  {
    "name": "Ebru Gündeş",
    "category": "unluler"
  },
  {
    "name": "Ebru Karanfilci",
    "category": "unluler"
  },
  {
    "name": "Ebru Şallı",
    "category": "unluler"
  },
  {
    "name": "Ece Erken",
    "category": "unluler"
  },
  {
    "name": "Ece Vahapoğlu",
    "category": "unluler"
  },
  {
    "name": "Eda Ece",
    "category": "unluler"
  },
  {
    "name": "Ela Rumeysa Cebeci",
    "category": "unluler"
  },
  {
    "name": "Elif Güvendik",
    "category": "unluler"
  },
  {
    "name": "Emel Büyükburç",
    "category": "unluler"
  },
  {
    "name": "Emre Karayel",
    "category": "unluler"
  },
  {
    "name": "Engin Altan Düzyatan",
    "category": "unluler"
  },
  {
    "name": "Ercan Saatçi",
    "category": "unluler"
  },
  {
    "name": "Erdöl Boratap",
    "category": "unluler"
  },
  {
    "name": "Gülben Ergen",
    "category": "unluler"
  },
  {
    "name": "Erhan Konuk",
    "category": "unluler"
  },
  {
    "name": "Erhan Yazıcıoğlu",
    "category": "unluler"
  },
  {
    "name": "Erol Evgin",
    "category": "unluler"
  },
  {
    "name": "Esra Eron",
    "category": "unluler"
  },
  {
    "name": "Ertem Şener",
    "category": "unluler"
  },
  {
    "name": "Eser Yenenler",
    "category": "unluler"
  },
  {
    "name": "Esra Balamir",
    "category": "unluler"
  },
  {
    "name": "Esra Ceyhan",
    "category": "unluler"
  },
  {
    "name": "Esra Erol",
    "category": "unluler"
  },
  {
    "name": "Eşref Şefik",
    "category": "unluler"
  },
  {
    "name": "Evrim Akın",
    "category": "unluler"
  },
  {
    "name": "Ezgi Sertel",
    "category": "unluler"
  },
  {
    "name": "Ezgi Sütcü",
    "category": "unluler"
  },
  {
    "name": "Faik Uyanık",
    "category": "unluler"
  },
  {
    "name": "Fatih Kısaparmak",
    "category": "unluler"
  },
  {
    "name": "Fatih Ürek",
    "category": "unluler"
  },
  {
    "name": "Fatoş Kabasakal",
    "category": "unluler"
  },
  {
    "name": "Fatoş Seğmen",
    "category": "unluler"
  },
  {
    "name": "Fecri Ebcioğlu",
    "category": "unluler"
  },
  {
    "name": "Ferdi Tayfur",
    "category": "unluler"
  },
  {
    "name": "Ferit Aktuğ",
    "category": "unluler"
  },
  {
    "name": "Fikret Bila",
    "category": "unluler"
  },
  {
    "name": "Fuat Kozluklu",
    "category": "unluler"
  },
  {
    "name": "Gamze Karaman",
    "category": "unluler"
  },
  {
    "name": "Gamze Özçelik",
    "category": "unluler"
  },
  {
    "name": "Gani Müjde",
    "category": "unluler"
  },
  {
    "name": "Fatma Girik",
    "category": "unluler"
  },
  {
    "name": "Emre Gönlüşen",
    "category": "unluler"
  },
  {
    "name": "Gözde Kansu",
    "category": "unluler"
  },
  {
    "name": "Ayşegül Günay",
    "category": "unluler"
  },
  {
    "name": "Gül Gölge",
    "category": "unluler"
  },
  {
    "name": "Gülriz Sururi",
    "category": "unluler"
  },
  {
    "name": "Gülseren Budayıcıoğlu",
    "category": "unluler"
  },
  {
    "name": "Güner Ümit",
    "category": "unluler"
  },
  {
    "name": "Güneri Cıvaoğlu",
    "category": "unluler"
  },
  {
    "name": "Güneş Tecelli",
    "category": "unluler"
  },
  {
    "name": "Güntekin Onay",
    "category": "unluler"
  },
  {
    "name": "Gürsu Arat",
    "category": "unluler"
  },
  {
    "name": "Güven İslamoğlu",
    "category": "unluler"
  },
  {
    "name": "Hakan Artış",
    "category": "unluler"
  },
  {
    "name": "Hakan Çelik",
    "category": "unluler"
  },
  {
    "name": "Hakan Eratik",
    "category": "unluler"
  },
  {
    "name": "Hakan Hatipoğlu",
    "category": "unluler"
  },
  {
    "name": "Hakan Ural",
    "category": "unluler"
  },
  {
    "name": "Hakan Yılmaz",
    "category": "unluler"
  },
  {
    "name": "Halit Ergenç",
    "category": "unluler"
  },
  {
    "name": "Hande Ataizi",
    "category": "unluler"
  },
  {
    "name": "Hande Kazanova",
    "category": "unluler"
  },
  {
    "name": "Harun Can",
    "category": "unluler"
  },
  {
    "name": "Hidayet Karaca",
    "category": "unluler"
  },
  {
    "name": "Hilal Cebeci",
    "category": "unluler"
  },
  {
    "name": "Hilal Ergenekon",
    "category": "unluler"
  },
  {
    "name": "Acun Ilıcalı",
    "category": "unluler"
  },
  {
    "name": "Uğur Işılak",
    "category": "unluler"
  },
  {
    "name": "Işın Eliçin",
    "category": "unluler"
  },
  {
    "name": "İbrahim Büyükak",
    "category": "unluler"
  },
  {
    "name": "İbrahim Güneş",
    "category": "unluler"
  },
  {
    "name": "İbrahim Selim",
    "category": "unluler"
  },
  {
    "name": "İclal Aydın",
    "category": "unluler"
  },
  {
    "name": "İdil Öztamer",
    "category": "unluler"
  },
  {
    "name": "İkbal Gürpınar",
    "category": "unluler"
  },
  {
    "name": "İlker Akkurt",
    "category": "unluler"
  },
  {
    "name": "İlker Ayrık",
    "category": "unluler"
  },
  {
    "name": "İlker Karagöz",
    "category": "unluler"
  },
  {
    "name": "İnci Özkasnak",
    "category": "unluler"
  },
  {
    "name": "İnci Türkay",
    "category": "unluler"
  },
  {
    "name": "İrfan Kangı",
    "category": "unluler"
  },
  {
    "name": "İsmet Badem",
    "category": "unluler"
  },
  {
    "name": "Kaan Kural",
    "category": "unluler"
  },
  {
    "name": "Kaan Sekban",
    "category": "unluler"
  },
  {
    "name": "Kaan Yakuphan",
    "category": "unluler"
  },
  {
    "name": "Kadir Çetin",
    "category": "unluler"
  },
  {
    "name": "Kadir Çöpdemir",
    "category": "unluler"
  },
  {
    "name": "Ümit Kantarcılar",
    "category": "unluler"
  },
  {
    "name": "Okan Karacan",
    "category": "unluler"
  },
  {
    "name": "Kartal Balaban",
    "category": "unluler"
  },
  {
    "name": "Zeynep Kasımlıoğlu",
    "category": "unluler"
  },
  {
    "name": "Aysun Kayacı",
    "category": "unluler"
  },
  {
    "name": "Kayra Şenocak",
    "category": "unluler"
  },
  {
    "name": "Kemal Uçar",
    "category": "unluler"
  },
  {
    "name": "Kenan İmirzalıoğlu",
    "category": "unluler"
  },
  {
    "name": "Kerem Alışık",
    "category": "unluler"
  },
  {
    "name": "Kerem Demircioğlu",
    "category": "unluler"
  },
  {
    "name": "Keriman Ulusoy",
    "category": "unluler"
  },
  {
    "name": "Kıvanç Kasabalı",
    "category": "unluler"
  },
  {
    "name": "Korhan Abay",
    "category": "unluler"
  },
  {
    "name": "Senem Kuyucuoğlu",
    "category": "unluler"
  },
  {
    "name": "İsmail Küçükkaya",
    "category": "unluler"
  },
  {
    "name": "Lemi Filozof",
    "category": "unluler"
  },
  {
    "name": "Lerzan Mutlu",
    "category": "unluler"
  },
  {
    "name": "Levent Ünsal",
    "category": "unluler"
  },
  {
    "name": "M. Serdar Kuzuloğlu",
    "category": "unluler"
  },
  {
    "name": "Mahmut Tuncer",
    "category": "unluler"
  },
  {
    "name": "Mehmet Ali Erbil",
    "category": "unluler"
  },
  {
    "name": "Mehmet Çepiç",
    "category": "unluler"
  },
  {
    "name": "Mehtap Altunok",
    "category": "unluler"
  },
  {
    "name": "Melek Baykal",
    "category": "unluler"
  },
  {
    "name": "Meltem Ören",
    "category": "unluler"
  },
  {
    "name": "Meral Konrat",
    "category": "unluler"
  },
  {
    "name": "Mert Öğün",
    "category": "unluler"
  },
  {
    "name": "Merva Ulusoy",
    "category": "unluler"
  },
  {
    "name": "Metin Uca",
    "category": "unluler"
  },
  {
    "name": "Jess Molho",
    "category": "unluler"
  },
  {
    "name": "Murat Başoğlu",
    "category": "unluler"
  },
  {
    "name": "Murat Ceylan",
    "category": "unluler"
  },
  {
    "name": "Murat Güloğlu",
    "category": "unluler"
  },
  {
    "name": "Murat Kosova",
    "category": "unluler"
  },
  {
    "name": "Murat Murathanoğlu",
    "category": "unluler"
  },
  {
    "name": "Murat Serezli",
    "category": "unluler"
  },
  {
    "name": "Murat Yeni",
    "category": "unluler"
  },
  {
    "name": "Murat Yıldırım",
    "category": "unluler"
  },
  {
    "name": "Mübeccel Argun",
    "category": "unluler"
  },
  {
    "name": "Emel Müftüoğlu",
    "category": "unluler"
  },
  {
    "name": "Müge Anlı",
    "category": "unluler"
  },
  {
    "name": "Müge Oruçkaptan",
    "category": "unluler"
  },
  {
    "name": "Nagehan Alçı",
    "category": "unluler"
  },
  {
    "name": "Nazlı",
    "category": "unluler"
  },
  {
    "name": "Nazlı Çelik",
    "category": "unluler"
  },
  {
    "name": "Nazlı Tolga",
    "category": "unluler"
  },
  {
    "name": "Nebil Özgentürk",
    "category": "unluler"
  },
  {
    "name": "Nefise Karatay",
    "category": "unluler"
  },
  {
    "name": "Nehir Babataş",
    "category": "unluler"
  },
  {
    "name": "Nergis Kumbasar",
    "category": "unluler"
  },
  {
    "name": "Nermin Tuğuşlu",
    "category": "unluler"
  },
  {
    "name": "Neslihan Yavuzcan",
    "category": "unluler"
  },
  {
    "name": "Nevşin Mengü",
    "category": "unluler"
  },
  {
    "name": "Nihan Günay",
    "category": "unluler"
  },
  {
    "name": "Nihat Hatipoğlu",
    "category": "unluler"
  },
  {
    "name": "Nil Pınar İnanoğlu",
    "category": "unluler"
  },
  {
    "name": "Nilay Ceylan",
    "category": "unluler"
  },
  {
    "name": "Nurhayat Kavrak",
    "category": "unluler"
  },
  {
    "name": "Nursel Ergin",
    "category": "unluler"
  },
  {
    "name": "Nükhet Duru",
    "category": "unluler"
  },
  {
    "name": "Oğuzhan Koç",
    "category": "unluler"
  },
  {
    "name": "Okan Bayülgen",
    "category": "unluler"
  },
  {
    "name": "Oktay Kaynarca",
    "category": "unluler"
  },
  {
    "name": "50 Cent",
    "category": "unluler"
  },
  {
    "name": "A Boogie wit da Hoodie",
    "category": "unluler"
  },
  {
    "name": "Aaron Himelstein",
    "category": "unluler"
  },
  {
    "name": "Aaron Paul",
    "category": "unluler"
  },
  {
    "name": "Aaron Sorkin",
    "category": "unluler"
  },
  {
    "name": "Aaron Stanford",
    "category": "unluler"
  },
  {
    "name": "Abbott ve Costello",
    "category": "unluler"
  },
  {
    "name": "Bud Abbott",
    "category": "unluler"
  },
  {
    "name": "Abe Vigoda",
    "category": "unluler"
  },
  {
    "name": "Jake Abel",
    "category": "unluler"
  },
  {
    "name": "Omid Abtahi",
    "category": "unluler"
  },
  {
    "name": "Adam Rich",
    "category": "unluler"
  },
  {
    "name": "John Adames",
    "category": "unluler"
  },
  {
    "name": "Don Adams",
    "category": "unluler"
  },
  {
    "name": "Kip Addotta",
    "category": "unluler"
  },
  {
    "name": "Adolphe Menjou",
    "category": "unluler"
  },
  {
    "name": "James Adomian",
    "category": "unluler"
  },
  {
    "name": "Afa Anoaʻi",
    "category": "unluler"
  },
  {
    "name": "Ben Affleck",
    "category": "unluler"
  },
  {
    "name": "Casey Affleck",
    "category": "unluler"
  },
  {
    "name": "Jonathan Ahdout",
    "category": "unluler"
  },
  {
    "name": "Ahilleas-Andreas",
    "category": "unluler"
  },
  {
    "name": "Aidan Quinn",
    "category": "unluler"
  },
  {
    "name": "Danny Aiello",
    "category": "unluler"
  },
  {
    "name": "Liam Aiken",
    "category": "unluler"
  },
  {
    "name": "Al Harrington",
    "category": "unluler"
  },
  {
    "name": "Al Strobel",
    "category": "unluler"
  },
  {
    "name": "Alan Alda",
    "category": "unluler"
  },
  {
    "name": "Alan Arkin",
    "category": "unluler"
  },
  {
    "name": "Alan Rachins",
    "category": "unluler"
  },
  {
    "name": "Alan Young",
    "category": "unluler"
  },
  {
    "name": "Joe Alaskey",
    "category": "unluler"
  },
  {
    "name": "Carlos Alazraqui",
    "category": "unluler"
  },
  {
    "name": "Alden Ehrenreich",
    "category": "unluler"
  },
  {
    "name": "Alex Cord",
    "category": "unluler"
  },
  {
    "name": "Alex D. Linz",
    "category": "unluler"
  },
  {
    "name": "Jason Alexander",
    "category": "unluler"
  },
  {
    "name": "Alfred Lunt",
    "category": "unluler"
  },
  {
    "name": "Jed Allan",
    "category": "unluler"
  },
  {
    "name": "Marty Allen",
    "category": "unluler"
  },
  {
    "name": "Woody Allen",
    "category": "unluler"
  },
  {
    "name": "Joaquim de Almeida",
    "category": "unluler"
  },
  {
    "name": "Alvin Ing",
    "category": "unluler"
  },
  {
    "name": "Dan Amboyer",
    "category": "unluler"
  },
  {
    "name": "Morey Amsterdam",
    "category": "unluler"
  },
  {
    "name": "Kevin Anderson",
    "category": "unluler"
  },
  {
    "name": "Anderson Cooper",
    "category": "unluler"
  },
  {
    "name": "Anthony Anderson",
    "category": "unluler"
  },
  {
    "name": "Arthur Anderson",
    "category": "unluler"
  },
  {
    "name": "Louie Anderson",
    "category": "unluler"
  },
  {
    "name": "Michael J. Anderson",
    "category": "unluler"
  },
  {
    "name": "Richard Anderson",
    "category": "unluler"
  },
  {
    "name": "Richard Dean Anderson",
    "category": "unluler"
  },
  {
    "name": "Stanley Anderson",
    "category": "unluler"
  },
  {
    "name": "André 3000",
    "category": "unluler"
  },
  {
    "name": "Andre Braugher",
    "category": "unluler"
  },
  {
    "name": "Andreas Katsulas",
    "category": "unluler"
  },
  {
    "name": "Andrew Bowen",
    "category": "unluler"
  },
  {
    "name": "Andrew Divoff",
    "category": "unluler"
  },
  {
    "name": "Andrew Stanton",
    "category": "unluler"
  },
  {
    "name": "Brian Andrews",
    "category": "unluler"
  },
  {
    "name": "Andy Milonakis",
    "category": "unluler"
  },
  {
    "name": "Andy Samberg",
    "category": "unluler"
  },
  {
    "name": "Angel Bismark Curiel",
    "category": "unluler"
  },
  {
    "name": "Jack Angel",
    "category": "unluler"
  },
  {
    "name": "Angus Cloud",
    "category": "unluler"
  },
  {
    "name": "Angus T. Jones",
    "category": "unluler"
  },
  {
    "name": "Aziz Ansari",
    "category": "unluler"
  },
  {
    "name": "Ansel Elgort",
    "category": "unluler"
  },
  {
    "name": "Anson Mount",
    "category": "unluler"
  },
  {
    "name": "Anthony De La Torre",
    "category": "unluler"
  },
  {
    "name": "Anthony Edwards",
    "category": "unluler"
  },
  {
    "name": "Anthony Franciosa",
    "category": "unluler"
  },
  {
    "name": "Anthony Geary",
    "category": "unluler"
  },
  {
    "name": "Anthony Gonzalez",
    "category": "unluler"
  },
  {
    "name": "Anthony Guidera",
    "category": "unluler"
  },
  {
    "name": "Anthony Jeselnik",
    "category": "unluler"
  },
  {
    "name": "Anthony Johnson",
    "category": "unluler"
  },
  {
    "name": "Anthony Mann",
    "category": "unluler"
  },
  {
    "name": "Anthony O'Sullivan",
    "category": "unluler"
  },
  {
    "name": "Anthony Ramos",
    "category": "unluler"
  },
  {
    "name": "Marc Anthony",
    "category": "unluler"
  },
  {
    "name": "Brent Antonello",
    "category": "unluler"
  },
  {
    "name": "Roscoe Arbuckle",
    "category": "unluler"
  },
  {
    "name": "Allan Arbus",
    "category": "unluler"
  },
  {
    "name": "Ari Gold",
    "category": "unluler"
  },
  {
    "name": "Armando Silvestre",
    "category": "unluler"
  },
  {
    "name": "Iain Armitage",
    "category": "unluler"
  },
  {
    "name": "James Arness",
    "category": "unluler"
  },
  {
    "name": "Arnold Vosloo",
    "category": "unluler"
  },
  {
    "name": "David Arquette",
    "category": "unluler"
  },
  {
    "name": "Art Carney",
    "category": "unluler"
  },
  {
    "name": "Art LaFleur",
    "category": "unluler"
  },
  {
    "name": "Art Metrano",
    "category": "unluler"
  },
  {
    "name": "Arthur Edmund Carewe",
    "category": "unluler"
  },
  {
    "name": "Arthur Garfunkel",
    "category": "unluler"
  },
  {
    "name": "Arthur Kennedy",
    "category": "unluler"
  },
  {
    "name": "Ashley Hamilton",
    "category": "unluler"
  },
  {
    "name": "Luke Askew",
    "category": "unluler"
  },
  {
    "name": "Ed Asner",
    "category": "unluler"
  },
  {
    "name": "Armand Assante",
    "category": "unluler"
  },
  {
    "name": "Fred Astaire",
    "category": "unluler"
  },
  {
    "name": "René Auberjonois",
    "category": "unluler"
  },
  {
    "name": "John August",
    "category": "unluler"
  },
  {
    "name": "Austin Abrams",
    "category": "unluler"
  },
  {
    "name": "Austin Butler",
    "category": "unluler"
  },
  {
    "name": "Frankie Avalon",
    "category": "unluler"
  },
  {
    "name": "James Avery",
    "category": "unluler"
  },
  {
    "name": "Tex Avery",
    "category": "unluler"
  },
  {
    "name": "Robert Axelrod",
    "category": "unluler"
  },
  {
    "name": "Dan Aykroyd",
    "category": "unluler"
  },
  {
    "name": "Hank Azaria",
    "category": "unluler"
  },
  {
    "name": "Babs Olusanmokun",
    "category": "unluler"
  },
  {
    "name": "Michael Bacall",
    "category": "unluler"
  },
  {
    "name": "Christopher Backus",
    "category": "unluler"
  },
  {
    "name": "Kevin Bacon",
    "category": "unluler"
  },
  {
    "name": "Penn Badgley",
    "category": "unluler"
  },
  {
    "name": "Max Baer",
    "category": "unluler"
  },
  {
    "name": "Larry Bagby",
    "category": "unluler"
  },
  {
    "name": "Scott Baio",
    "category": "unluler"
  },
  {
    "name": "John Baker",
    "category": "unluler"
  },
  {
    "name": "Troy Baker",
    "category": "unluler"
  },
  {
    "name": "Bob Balaban",
    "category": "unluler"
  },
  {
    "name": "Adam Baldwin",
    "category": "unluler"
  },
  {
    "name": "Alec Baldwin",
    "category": "unluler"
  },
  {
    "name": "Stephen Baldwin",
    "category": "unluler"
  },
  {
    "name": "Christian Bale",
    "category": "unluler"
  },
  {
    "name": "Eric Balfour",
    "category": "unluler"
  },
  {
    "name": "Bam Bam Bigelow",
    "category": "unluler"
  },
  {
    "name": "Jack Bannon",
    "category": "unluler"
  },
  {
    "name": "Lance Barber",
    "category": "unluler"
  },
  {
    "name": "Tony Barbieri",
    "category": "unluler"
  },
  {
    "name": "Barney Martin",
    "category": "unluler"
  },
  {
    "name": "John Barrowman",
    "category": "unluler"
  },
  {
    "name": "Barry Nelson",
    "category": "unluler"
  },
  {
    "name": "Barry Newman",
    "category": "unluler"
  },
  {
    "name": "Barry Shabaka Henley",
    "category": "unluler"
  },
  {
    "name": "Barry Watson",
    "category": "unluler"
  },
  {
    "name": "John Blyth Barrymore",
    "category": "unluler"
  },
  {
    "name": "Lionel Barrymore",
    "category": "unluler"
  },
  {
    "name": "Blake Bashoff",
    "category": "unluler"
  },
  {
    "name": "Basil Hoffman",
    "category": "unluler"
  },
  {
    "name": "Lance Bass",
    "category": "unluler"
  },
  {
    "name": "Warner Baxter",
    "category": "unluler"
  },
  {
    "name": "Orson Bean",
    "category": "unluler"
  },
  {
    "name": "Clyde Beatty",
    "category": "unluler"
  },
  {
    "name": "Ned Beatty",
    "category": "unluler"
  },
  {
    "name": "Warren Beatty",
    "category": "unluler"
  },
  {
    "name": "Beau Bridges",
    "category": "unluler"
  },
  {
    "name": "Jim Beaver",
    "category": "unluler"
  },
  {
    "name": "Harry Belafonte",
    "category": "unluler"
  },
  {
    "name": "Tobin Bell",
    "category": "unluler"
  },
  {
    "name": "Jim Belushi",
    "category": "unluler"
  },
  {
    "name": "John Belushi",
    "category": "unluler"
  },
  {
    "name": "Ben Falcone",
    "category": "unluler"
  },
  {
    "name": "Ben Johnson",
    "category": "unluler"
  },
  {
    "name": "Ben Jones",
    "category": "unluler"
  },
  {
    "name": "Ben Marsters",
    "category": "unluler"
  },
  {
    "name": "Ben Schwartz",
    "category": "unluler"
  },
  {
    "name": "Ben Winchell",
    "category": "unluler"
  },
  {
    "name": "Jay Benedict",
    "category": "unluler"
  },
  {
    "name": "Benjamin Bratt",
    "category": "unluler"
  },
  {
    "name": "H. Jon Benjamin",
    "category": "unluler"
  },
  {
    "name": "Benny Safdie",
    "category": "unluler"
  },
  {
    "name": "Tom Berenger",
    "category": "unluler"
  },
  {
    "name": "Justin Berfield",
    "category": "unluler"
  },
  {
    "name": "Peter Berg",
    "category": "unluler"
  },
  {
    "name": "Henry Bergman",
    "category": "unluler"
  },
  {
    "name": "Jeff Bergman",
    "category": "unluler"
  },
  {
    "name": "Xander Berkeley",
    "category": "unluler"
  },
  {
    "name": "Warren Berlinger",
    "category": "unluler"
  },
  {
    "name": "Andy Berman",
    "category": "unluler"
  },
  {
    "name": "Christopher Bernau",
    "category": "unluler"
  },
  {
    "name": "Bernie Mac",
    "category": "unluler"
  },
  {
    "name": "Dehl Berti",
    "category": "unluler"
  },
  {
    "name": "Ahmed Best",
    "category": "unluler"
  },
  {
    "name": "Turhan Bey",
    "category": "unluler"
  },
  {
    "name": "Michael Biehn",
    "category": "unluler"
  },
  {
    "name": "Big Boi",
    "category": "unluler"
  },
  {
    "name": "Big Show",
    "category": "unluler"
  },
  {
    "name": "Big Van Vader",
    "category": "unluler"
  },
  {
    "name": "Bill Bixby",
    "category": "unluler"
  },
  {
    "name": "Bill Burr",
    "category": "unluler"
  },
  {
    "name": "Bill Camp",
    "category": "unluler"
  },
  {
    "name": "Bill Cobbs",
    "category": "unluler"
  },
  {
    "name": "Bill Duke",
    "category": "unluler"
  },
  {
    "name": "Bill Goldberg",
    "category": "unluler"
  },
  {
    "name": "Bill Hayes",
    "category": "unluler"
  },
  {
    "name": "Bill Maher",
    "category": "unluler"
  },
  {
    "name": "Bill Moseley",
    "category": "unluler"
  },
  {
    "name": "Bill Pullman",
    "category": "unluler"
  },
  {
    "name": "Bill Stevenson",
    "category": "unluler"
  },
  {
    "name": "Billy Bob Thornton",
    "category": "unluler"
  },
  {
    "name": "Billy Burke",
    "category": "unluler"
  },
  {
    "name": "Billy Crystal",
    "category": "unluler"
  },
  {
    "name": "Billy Dean",
    "category": "unluler"
  },
  {
    "name": "Billy Dee Williams",
    "category": "unluler"
  },
  {
    "name": "Billy Drago",
    "category": "unluler"
  },
  {
    "name": "Billy Preston",
    "category": "unluler"
  },
  {
    "name": "Billy Unger",
    "category": "unluler"
  },
  {
    "name": "Bing Crosby",
    "category": "unluler"
  },
  {
    "name": "Biz Markie",
    "category": "unluler"
  },
  {
    "name": "Black Thought",
    "category": "unluler"
  },
  {
    "name": "Jack Black",
    "category": "unluler"
  },
  {
    "name": "Lucas Black",
    "category": "unluler"
  },
  {
    "name": "Shane Black",
    "category": "unluler"
  },
  {
    "name": "Tyler Blackburn",
    "category": "unluler"
  },
  {
    "name": "Robert Blanche",
    "category": "unluler"
  },
  {
    "name": "Hunt Block",
    "category": "unluler"
  },
  {
    "name": "Brian Bloom",
    "category": "unluler"
  },
  {
    "name": "David Blue",
    "category": "unluler"
  },
  {
    "name": "Mark Blum",
    "category": "unluler"
  },
  {
    "name": "Bo Burnham",
    "category": "unluler"
  },
  {
    "name": "Bo Hopkins",
    "category": "unluler"
  },
  {
    "name": "Bob Elmore",
    "category": "unluler"
  },
  {
    "name": "Bob Fosse",
    "category": "unluler"
  },
  {
    "name": "Bob Gunton",
    "category": "unluler"
  },
  {
    "name": "Bob Newhart",
    "category": "unluler"
  },
  {
    "name": "Bob Uecker",
    "category": "unluler"
  },
  {
    "name": "Bobby Darin",
    "category": "unluler"
  },
  {
    "name": "Bobby Lashley",
    "category": "unluler"
  },
  {
    "name": "Bobby Rydell",
    "category": "unluler"
  },
  {
    "name": "Humphrey Bogart",
    "category": "unluler"
  },
  {
    "name": "Ian Bohen",
    "category": "unluler"
  },
  {
    "name": "Bokeem Woodbine",
    "category": "unluler"
  },
  {
    "name": "Joseph Bologna",
    "category": "unluler"
  },
  {
    "name": "Jon Bon Jovi",
    "category": "unluler"
  },
  {
    "name": "Pat Boone",
    "category": "unluler"
  },
  {
    "name": "Powers Boothe",
    "category": "unluler"
  },
  {
    "name": "David Boreanaz",
    "category": "unluler"
  },
  {
    "name": "Ernest Borgnine",
    "category": "unluler"
  },
  {
    "name": "Roscoe Born",
    "category": "unluler"
  },
  {
    "name": "Frank Borzage",
    "category": "unluler"
  },
  {
    "name": "Philip Bosco",
    "category": "unluler"
  },
  {
    "name": "Barry Bostwick",
    "category": "unluler"
  },
  {
    "name": "Loren Bouchard",
    "category": "unluler"
  },
  {
    "name": "Jim Bouton",
    "category": "unluler"
  },
  {
    "name": "Dennis Boutsikaris",
    "category": "unluler"
  },
  {
    "name": "Bow Wow",
    "category": "unluler"
  },
  {
    "name": "Cameron Boyce",
    "category": "unluler"
  },
  {
    "name": "Boyd Holbrook",
    "category": "unluler"
  },
  {
    "name": "Jim Boyd",
    "category": "unluler"
  },
  {
    "name": "Stephen Boyd",
    "category": "unluler"
  },
  {
    "name": "Charles Boyer",
    "category": "unluler"
  },
  {
    "name": "Brad Dexter",
    "category": "unluler"
  },
  {
    "name": "Brad Johnson",
    "category": "unluler"
  },
  {
    "name": "Brad Sherwood",
    "category": "unluler"
  },
  {
    "name": "Richard Bradford",
    "category": "unluler"
  },
  {
    "name": "Bradley Cooper",
    "category": "unluler"
  },
  {
    "name": "Bradley Steven Perry",
    "category": "unluler"
  },
  {
    "name": "Beverly Aadlen",
    "category": "unluler"
  },
  {
    "name": "Aaliyah",
    "category": "unluler"
  },
  {
    "name": "Abbe Lane",
    "category": "unluler"
  },
  {
    "name": "Abby Ryder Fortson",
    "category": "unluler"
  },
  {
    "name": "Iris Acker",
    "category": "unluler"
  },
  {
    "name": "Amy Adams",
    "category": "unluler"
  },
  {
    "name": "Edie Adams",
    "category": "unluler"
  },
  {
    "name": "Jane Adams",
    "category": "unluler"
  },
  {
    "name": "Joey Lauren Adams",
    "category": "unluler"
  },
  {
    "name": "Julie Adams",
    "category": "unluler"
  },
  {
    "name": "Marla Adams",
    "category": "unluler"
  },
  {
    "name": "Stella Adler",
    "category": "unluler"
  },
  {
    "name": "Pamela Adlon",
    "category": "unluler"
  },
  {
    "name": "Adria Arjona",
    "category": "unluler"
  },
  {
    "name": "Adrienne Ames",
    "category": "unluler"
  },
  {
    "name": "Adrienne Bailon",
    "category": "unluler"
  },
  {
    "name": "Uzo Aduba",
    "category": "unluler"
  },
  {
    "name": "Aarthi Agarwal",
    "category": "unluler"
  },
  {
    "name": "Shohreh Aghdashloo",
    "category": "unluler"
  },
  {
    "name": "Agnes Ayres",
    "category": "unluler"
  },
  {
    "name": "Dianna Agron",
    "category": "unluler"
  },
  {
    "name": "Christina Aguilera",
    "category": "unluler"
  },
  {
    "name": "Lassie Lou Ahern",
    "category": "unluler"
  },
  {
    "name": "Aimee Garcia",
    "category": "unluler"
  },
  {
    "name": "Jessica Alba",
    "category": "unluler"
  },
  {
    "name": "Lola Albright",
    "category": "unluler"
  },
  {
    "name": "Rutanya Alda",
    "category": "unluler"
  },
  {
    "name": "Alexa Demie",
    "category": "unluler"
  },
  {
    "name": "Alexandra Bokyun Chun",
    "category": "unluler"
  },
  {
    "name": "Alexandra Daddario",
    "category": "unluler"
  },
  {
    "name": "Alice Brady",
    "category": "unluler"
  },
  {
    "name": "Alice Calhoun",
    "category": "unluler"
  },
  {
    "name": "Alice Greczyn",
    "category": "unluler"
  },
  {
    "name": "Alice Hirson",
    "category": "unluler"
  },
  {
    "name": "Alicia Fox",
    "category": "unluler"
  },
  {
    "name": "Aline MacMahon",
    "category": "unluler"
  },
  {
    "name": "Gia Allemand",
    "category": "unluler"
  },
  {
    "name": "Joan Allen",
    "category": "unluler"
  },
  {
    "name": "Jonelle Allen",
    "category": "unluler"
  },
  {
    "name": "Phyllis Allen",
    "category": "unluler"
  },
  {
    "name": "Sara Allgood",
    "category": "unluler"
  },
  {
    "name": "Allie Grant",
    "category": "unluler"
  },
  {
    "name": "Allison Miller",
    "category": "unluler"
  },
  {
    "name": "Allison Tolman",
    "category": "unluler"
  },
  {
    "name": "Ally Walker",
    "category": "unluler"
  },
  {
    "name": "Alona Tal",
    "category": "unluler"
  },
  {
    "name": "Gitta Alpár",
    "category": "unluler"
  },
  {
    "name": "Carol Alt",
    "category": "unluler"
  },
  {
    "name": "Alycia Delmore",
    "category": "unluler"
  },
  {
    "name": "Amanda Bearse",
    "category": "unluler"
  },
  {
    "name": "Amanda Cerny",
    "category": "unluler"
  },
  {
    "name": "Amanda Schull",
    "category": "unluler"
  },
  {
    "name": "Amber Frank",
    "category": "unluler"
  },
  {
    "name": "Amber Heard",
    "category": "unluler"
  },
  {
    "name": "Amber Midthunder",
    "category": "unluler"
  },
  {
    "name": "Amerie",
    "category": "unluler"
  },
  {
    "name": "Mädchen Amick",
    "category": "unluler"
  },
  {
    "name": "Amy Acker",
    "category": "unluler"
  },
  {
    "name": "Amy Gumenick",
    "category": "unluler"
  },
  {
    "name": "Amy Jo Johnson",
    "category": "unluler"
  },
  {
    "name": "Amy Madigan",
    "category": "unluler"
  },
  {
    "name": "Amy Pietz",
    "category": "unluler"
  },
  {
    "name": "Amy Purdy",
    "category": "unluler"
  },
  {
    "name": "Amy Schumer",
    "category": "unluler"
  },
  {
    "name": "Ana de Armas",
    "category": "unluler"
  },
  {
    "name": "Ananda Lewis",
    "category": "unluler"
  },
  {
    "name": "Bridgette Andersen",
    "category": "unluler"
  },
  {
    "name": "Nicole Anderson",
    "category": "unluler"
  },
  {
    "name": "Mary Anderson",
    "category": "unluler"
  },
  {
    "name": "Mignon Anderson",
    "category": "unluler"
  },
  {
    "name": "Andra Day",
    "category": "unluler"
  },
  {
    "name": "Andrea Barber",
    "category": "unluler"
  },
  {
    "name": "Andrea Deck",
    "category": "unluler"
  },
  {
    "name": "Andrea Evans",
    "category": "unluler"
  },
  {
    "name": "Andrea Fay Friedman",
    "category": "unluler"
  },
  {
    "name": "Andrea Leeds",
    "category": "unluler"
  },
  {
    "name": "Andrea Londo",
    "category": "unluler"
  },
  {
    "name": "Andrea Navedo",
    "category": "unluler"
  },
  {
    "name": "Patty Andrews",
    "category": "unluler"
  },
  {
    "name": "Angela Kinsey",
    "category": "unluler"
  },
  {
    "name": "Angie Everhart",
    "category": "unluler"
  },
  {
    "name": "Angie Stone",
    "category": "unluler"
  },
  {
    "name": "Anita Page",
    "category": "unluler"
  },
  {
    "name": "Ann Blyth",
    "category": "unluler"
  },
  {
    "name": "Ann Cusack",
    "category": "unluler"
  },
  {
    "name": "Ann Harding",
    "category": "unluler"
  },
  {
    "name": "Ann Rutherford",
    "category": "unluler"
  },
  {
    "name": "Ann-Margret",
    "category": "unluler"
  },
  {
    "name": "Anna Camp",
    "category": "unluler"
  },
  {
    "name": "Anna Chlumsky",
    "category": "unluler"
  },
  {
    "name": "Anna Q. Nilsson",
    "category": "unluler"
  },
  {
    "name": "Anna-Lisa",
    "category": "unluler"
  },
  {
    "name": "Annalise Basso",
    "category": "unluler"
  },
  {
    "name": "AnnaSophia Robb",
    "category": "unluler"
  },
  {
    "name": "Anne Buydens",
    "category": "unluler"
  },
  {
    "name": "Anne Heche",
    "category": "unluler"
  },
  {
    "name": "Anne Revere",
    "category": "unluler"
  },
  {
    "name": "Anne Schedeen",
    "category": "unluler"
  },
  {
    "name": "Anne Shirley",
    "category": "unluler"
  },
  {
    "name": "Anne V",
    "category": "unluler"
  },
  {
    "name": "Annette McCarthy",
    "category": "unluler"
  },
  {
    "name": "Susan Anspach",
    "category": "unluler"
  },
  {
    "name": "Anya Taylor-Joy",
    "category": "unluler"
  },
  {
    "name": "Christina Applegate",
    "category": "unluler"
  },
  {
    "name": "April Hunter",
    "category": "unluler"
  },
  {
    "name": "Anne Archer",
    "category": "unluler"
  },
  {
    "name": "Ariana Greenblatt",
    "category": "unluler"
  },
  {
    "name": "Ariel Winter",
    "category": "unluler"
  },
  {
    "name": "Arleen Sorkin",
    "category": "unluler"
  },
  {
    "name": "Arlene Dahl",
    "category": "unluler"
  },
  {
    "name": "Arlene Francis",
    "category": "unluler"
  },
  {
    "name": "Arlene Golonka",
    "category": "unluler"
  },
  {
    "name": "Arlene Harris",
    "category": "unluler"
  },
  {
    "name": "Dimitra Arliss",
    "category": "unluler"
  },
  {
    "name": "Allisyn Ashley Arm",
    "category": "unluler"
  },
  {
    "name": "Bess Armstrong",
    "category": "unluler"
  },
  {
    "name": "Samaire Armstrong",
    "category": "unluler"
  },
  {
    "name": "Béatrice Arnac",
    "category": "unluler"
  },
  {
    "name": "Alexis Arquette",
    "category": "unluler"
  },
  {
    "name": "Patricia Arquette",
    "category": "unluler"
  },
  {
    "name": "Beatrice Arthur",
    "category": "unluler"
  },
  {
    "name": "Carol Arthur",
    "category": "unluler"
  },
  {
    "name": "Katie Aselton",
    "category": "unluler"
  },
  {
    "name": "Ashanti",
    "category": "unluler"
  },
  {
    "name": "Daphne Ashbrook",
    "category": "unluler"
  },
  {
    "name": "Ashley Liao",
    "category": "unluler"
  },
  {
    "name": "Ashley Roberts",
    "category": "unluler"
  },
  {
    "name": "Ashly Burch",
    "category": "unluler"
  },
  {
    "name": "Ashlynn Yennie",
    "category": "unluler"
  },
  {
    "name": "Asia Carrera",
    "category": "unluler"
  },
  {
    "name": "Essence Atkins",
    "category": "unluler"
  },
  {
    "name": "Aubrey Plaza",
    "category": "unluler"
  },
  {
    "name": "Audie England",
    "category": "unluler"
  },
  {
    "name": "Auliʻi Cravalho",
    "category": "unluler"
  },
  {
    "name": "Tina Aumont",
    "category": "unluler"
  },
  {
    "name": "Aunjanue Ellis",
    "category": "unluler"
  },
  {
    "name": "Karen Austin",
    "category": "unluler"
  },
  {
    "name": "Ava Acres",
    "category": "unluler"
  },
  {
    "name": "Patricia Avery",
    "category": "unluler"
  },
  {
    "name": "Awkwafina",
    "category": "unluler"
  },
  {
    "name": "Nicki Aycox",
    "category": "unluler"
  },
  {
    "name": "Odessa A'zion",
    "category": "unluler"
  },
  {
    "name": "Barbara Babcock",
    "category": "unluler"
  },
  {
    "name": "Lauren Bacall",
    "category": "unluler"
  },
  {
    "name": "Morena Baccarin",
    "category": "unluler"
  },
  {
    "name": "Helen Badgley",
    "category": "unluler"
  },
  {
    "name": "Jane Badler",
    "category": "unluler"
  },
  {
    "name": "Bai Ling",
    "category": "unluler"
  },
  {
    "name": "Barbara Bain",
    "category": "unluler"
  },
  {
    "name": "Diora Baird",
    "category": "unluler"
  },
  {
    "name": "Leah Baird",
    "category": "unluler"
  },
  {
    "name": "Carroll Baker",
    "category": "unluler"
  },
  {
    "name": "Diane Baker",
    "category": "unluler"
  },
  {
    "name": "Fairuza Balk",
    "category": "unluler"
  },
  {
    "name": "Lucille Ball",
    "category": "unluler"
  },
  {
    "name": "Kaye Ballard",
    "category": "unluler"
  },
  {
    "name": "Mabel Ballin",
    "category": "unluler"
  },
  {
    "name": "Talia Balsam",
    "category": "unluler"
  },
  {
    "name": "Gertrude Bambrick",
    "category": "unluler"
  },
  {
    "name": "Anne Bancroft",
    "category": "unluler"
  },
  {
    "name": "Tallulah Bankhead",
    "category": "unluler"
  },
  {
    "name": "Christine Baranski",
    "category": "unluler"
  },
  {
    "name": "Barbara Bouchet",
    "category": "unluler"
  },
  {
    "name": "Barbara Britton",
    "category": "unluler"
  },
  {
    "name": "Barbara O'Neil",
    "category": "unluler"
  },
  {
    "name": "Barbara Rush",
    "category": "unluler"
  },
  {
    "name": "Barbara Stanwyck",
    "category": "unluler"
  },
  {
    "name": "Barbara Whiting Smith",
    "category": "unluler"
  },
  {
    "name": "Adrienne Barbeau",
    "category": "unluler"
  },
  {
    "name": "Ellen Barkin",
    "category": "unluler"
  },
  {
    "name": "Binnie Barnes",
    "category": "unluler"
  },
  {
    "name": "Joanne Baron",
    "category": "unluler"
  },
  {
    "name": "Alice Barrett",
    "category": "unluler"
  },
  {
    "name": "Majel Barrett",
    "category": "unluler"
  },
  {
    "name": "Barbara Barrie",
    "category": "unluler"
  },
  {
    "name": "Wendy Barrie",
    "category": "unluler"
  },
  {
    "name": "Patricia Barry",
    "category": "unluler"
  },
  {
    "name": "Drew Barrymore",
    "category": "unluler"
  },
  {
    "name": "Ethel Barrymore",
    "category": "unluler"
  },
  {
    "name": "Mischa Barton",
    "category": "unluler"
  },
  {
    "name": "Skye McCole Bartusiak",
    "category": "unluler"
  },
  {
    "name": "Kim Basinger",
    "category": "unluler"
  },
  {
    "name": "Nicole Bass",
    "category": "unluler"
  },
  {
    "name": "Angela Bassett",
    "category": "unluler"
  },
  {
    "name": "Brec Bassinger",
    "category": "unluler"
  },
  {
    "name": "Justine Bateman",
    "category": "unluler"
  },
  {
    "name": "Kathy Bates",
    "category": "unluler"
  },
  {
    "name": "Jessica Barth",
    "category": "unluler"
  },
  {
    "name": "Simone Battle",
    "category": "unluler"
  },
  {
    "name": "Elizabeth Baur",
    "category": "unluler"
  },
  {
    "name": "Anne Baxter",
    "category": "unluler"
  },
  {
    "name": "Beah Richards",
    "category": "unluler"
  },
  {
    "name": "Jennifer Beals",
    "category": "unluler"
  },
  {
    "name": "Beata Poźniak",
    "category": "unluler"
  },
  {
    "name": "Bebe Neuwirth",
    "category": "unluler"
  },
  {
    "name": "Becky Ann Baker",
    "category": "unluler"
  },
  {
    "name": "Becky G",
    "category": "unluler"
  },
  {
    "name": "Emily Beecham",
    "category": "unluler"
  },
  {
    "name": "Judi Beecher",
    "category": "unluler"
  },
  {
    "name": "Nicole Beharie",
    "category": "unluler"
  },
  {
    "name": "Barbara Bel Geddes",
    "category": "unluler"
  },
  {
    "name": "Doris Belack",
    "category": "unluler"
  },
  {
    "name": "Ashley Bell",
    "category": "unluler"
  },
  {
    "name": "Catherine Bell",
    "category": "unluler"
  },
  {
    "name": "Emma Bell",
    "category": "unluler"
  },
  {
    "name": "Kristen Bell",
    "category": "unluler"
  },
  {
    "name": "Belle Baker",
    "category": "unluler"
  },
  {
    "name": "Camilla Belle",
    "category": "unluler"
  },
  {
    "name": "Maria Bello",
    "category": "unluler"
  },
  {
    "name": "Annette Bening",
    "category": "unluler"
  },
  {
    "name": "Chloe Bennet",
    "category": "unluler"
  },
  {
    "name": "Alma Bennett",
    "category": "unluler"
  },
  {
    "name": "Barbara Bennett",
    "category": "unluler"
  },
  {
    "name": "Constance Bennett",
    "category": "unluler"
  },
  {
    "name": "Haley Bennett",
    "category": "unluler"
  },
  {
    "name": "Julie Bennett",
    "category": "unluler"
  },
  {
    "name": "Patricia Benoit",
    "category": "unluler"
  },
  {
    "name": "Amber Benson",
    "category": "unluler"
  },
  {
    "name": "Ashley Benson",
    "category": "unluler"
  },
  {
    "name": "Berry Berenson",
    "category": "unluler"
  },
  {
    "name": "Bergen Williams",
    "category": "unluler"
  },
  {
    "name": "Candice Bergen",
    "category": "unluler"
  },
  {
    "name": "Polly Bergen",
    "category": "unluler"
  },
  {
    "name": "Àstrid Bergès-Frisbey",
    "category": "unluler"
  },
  {
    "name": "Ingrid Bergman",
    "category": "unluler"
  },
  {
    "name": "Elizabeth Berkley",
    "category": "unluler"
  },
  {
    "name": "Brigid Berlin",
    "category": "unluler"
  },
  {
    "name": "Crystal Bernard",
    "category": "unluler"
  },
  {
    "name": "Susan Bernard",
    "category": "unluler"
  },
  {
    "name": "Elizabeth Berridge",
    "category": "unluler"
  },
  {
    "name": "Valerie Bertinelli",
    "category": "unluler"
  },
  {
    "name": "Marcheline Bertrand",
    "category": "unluler"
  },
  {
    "name": "Bibi Besch",
    "category": "unluler"
  },
  {
    "name": "Bessie Love",
    "category": "unluler"
  },
  {
    "name": "Beth Behrs",
    "category": "unluler"
  },
  {
    "name": "Beth Broderick",
    "category": "unluler"
  },
  {
    "name": "Beth Fowler",
    "category": "unluler"
  },
  {
    "name": "Zina Bethune",
    "category": "unluler"
  },
  {
    "name": "Betsy Blair",
    "category": "unluler"
  },
  {
    "name": "Betsy Gay",
    "category": "unluler"
  },
  {
    "name": "Betsy Randle",
    "category": "unluler"
  },
  {
    "name": "Bette Davis",
    "category": "unluler"
  },
  {
    "name": "Betty Ann Bruno",
    "category": "unluler"
  },
  {
    "name": "Betty Blythe",
    "category": "unluler"
  },
  {
    "name": "Betty Buckley",
    "category": "unluler"
  },
  {
    "name": "Betty Compson",
    "category": "unluler"
  },
  {
    "name": "Betty Lynn",
    "category": "unluler"
  },
  {
    "name": "Beulah Bondi",
    "category": "unluler"
  },
  {
    "name": "Beverly Todd",
    "category": "unluler"
  },
  {
    "name": "Aaron Taylor-Johnson",
    "category": "unluler"
  },
  {
    "name": "Adam Astill",
    "category": "unluler"
  },
  {
    "name": "Adam Howden",
    "category": "unluler"
  },
  {
    "name": "Adeel Akhtar",
    "category": "unluler"
  },
  {
    "name": "Adewale Akinnuoye-Agbaje",
    "category": "unluler"
  },
  {
    "name": "Adrian Rawlins",
    "category": "unluler"
  },
  {
    "name": "Anthony Ainley",
    "category": "unluler"
  },
  {
    "name": "Akın Gazi",
    "category": "unluler"
  },
  {
    "name": "Alan Price",
    "category": "unluler"
  },
  {
    "name": "Albert Austin",
    "category": "unluler"
  },
  {
    "name": "Alec B. Francis",
    "category": "unluler"
  },
  {
    "name": "Alex Lawther",
    "category": "unluler"
  },
  {
    "name": "Olly Alexander",
    "category": "unluler"
  },
  {
    "name": "Alfie Allen",
    "category": "unluler"
  },
  {
    "name": "Alfie Curtis",
    "category": "unluler"
  },
  {
    "name": "Alfred Enoch",
    "category": "unluler"
  },
  {
    "name": "Tom Alter",
    "category": "unluler"
  },
  {
    "name": "Josef Altin",
    "category": "unluler"
  },
  {
    "name": "Joe Alwyn",
    "category": "unluler"
  },
  {
    "name": "Samuel Anderson",
    "category": "unluler"
  },
  {
    "name": "Andrew Jack",
    "category": "unluler"
  },
  {
    "name": "Naveen Andrews",
    "category": "unluler"
  },
  {
    "name": "Andy Smart",
    "category": "unluler"
  },
  {
    "name": "Michael Angelis",
    "category": "unluler"
  },
  {
    "name": "Anthony Quayle",
    "category": "unluler"
  },
  {
    "name": "Anthony Sher",
    "category": "unluler"
  },
  {
    "name": "Michael Apted",
    "category": "unluler"
  },
  {
    "name": "Sean Arnold",
    "category": "unluler"
  },
  {
    "name": "Asa Butterfield",
    "category": "unluler"
  },
  {
    "name": "Rowan Atkinson",
    "category": "unluler"
  },
  {
    "name": "Richard Attenborough",
    "category": "unluler"
  },
  {
    "name": "Colin Baker",
    "category": "unluler"
  },
  {
    "name": "George Baker",
    "category": "unluler"
  },
  {
    "name": "Tom Baker",
    "category": "unluler"
  },
  {
    "name": "Max Baldry",
    "category": "unluler"
  },
  {
    "name": "Bobby Ball",
    "category": "unluler"
  },
  {
    "name": "Roy Barraclough",
    "category": "unluler"
  },
  {
    "name": "Barrie Ingham",
    "category": "unluler"
  },
  {
    "name": "Keith Barron",
    "category": "unluler"
  },
  {
    "name": "Basil Rathbone",
    "category": "unluler"
  },
  {
    "name": "Alan Bates",
    "category": "unluler"
  },
  {
    "name": "Trevor Baxter",
    "category": "unluler"
  },
  {
    "name": "Geoffrey Bayldon",
    "category": "unluler"
  },
  {
    "name": "Sean Bean",
    "category": "unluler"
  },
  {
    "name": "Sam Beazley",
    "category": "unluler"
  },
  {
    "name": "Max Beesley",
    "category": "unluler"
  },
  {
    "name": "Ben Barnes",
    "category": "unluler"
  },
  {
    "name": "Ben Cross",
    "category": "unluler"
  },
  {
    "name": "Ben Hull",
    "category": "unluler"
  },
  {
    "name": "Ben Kingsley",
    "category": "unluler"
  },
  {
    "name": "Ben Miller",
    "category": "unluler"
  },
  {
    "name": "Ben Roberts",
    "category": "unluler"
  },
  {
    "name": "Benedict Cumberbatch",
    "category": "unluler"
  },
  {
    "name": "Benedict Wong",
    "category": "unluler"
  },
  {
    "name": "John Benfield",
    "category": "unluler"
  },
  {
    "name": "Bernard Atha",
    "category": "unluler"
  },
  {
    "name": "Bernard Lee",
    "category": "unluler"
  },
  {
    "name": "Bertie Carvel",
    "category": "unluler"
  },
  {
    "name": "Rodney Bewes",
    "category": "unluler"
  },
  {
    "name": "Paul Bhattacharjee",
    "category": "unluler"
  },
  {
    "name": "Bill Bailey",
    "category": "unluler"
  },
  {
    "name": "Bill Treacher",
    "category": "unluler"
  },
  {
    "name": "Billy Armstrong",
    "category": "unluler"
  },
  {
    "name": "Billy Idol",
    "category": "unluler"
  },
  {
    "name": "Orlando Bloom",
    "category": "unluler"
  },
  {
    "name": "Bob Hoskins",
    "category": "unluler"
  },
  {
    "name": "Philip Bond",
    "category": "unluler"
  },
  {
    "name": "Anthony Booth",
    "category": "unluler"
  },
  {
    "name": "David Bowie",
    "category": "unluler"
  },
  {
    "name": "David Bradley",
    "category": "unluler"
  },
  {
    "name": "Russell Brand",
    "category": "unluler"
  },
  {
    "name": "Brian Bedford",
    "category": "unluler"
  },
  {
    "name": "Brian Blessed",
    "category": "unluler"
  },
  {
    "name": "Brian Cant",
    "category": "unluler"
  },
  {
    "name": "Brian George",
    "category": "unluler"
  },
  {
    "name": "Brian Glover",
    "category": "unluler"
  },
  {
    "name": "Brian Murphy",
    "category": "unluler"
  },
  {
    "name": "Tony Britton",
    "category": "unluler"
  },
  {
    "name": "Jim Broadbent",
    "category": "unluler"
  },
  {
    "name": "Clive Brook",
    "category": "unluler"
  },
  {
    "name": "Tim Brooke-Taylor",
    "category": "unluler"
  },
  {
    "name": "Bruno Lawrence",
    "category": "unluler"
  },
  {
    "name": "Bryan Ferry",
    "category": "unluler"
  },
  {
    "name": "Bryan Marshall",
    "category": "unluler"
  },
  {
    "name": "Burt Kwouk",
    "category": "unluler"
  },
  {
    "name": "Callum Blue",
    "category": "unluler"
  },
  {
    "name": "Callum Turner",
    "category": "unluler"
  },
  {
    "name": "Earl Cameron",
    "category": "unluler"
  },
  {
    "name": "Cary Elwes",
    "category": "unluler"
  },
  {
    "name": "Caspar Zafer",
    "category": "unluler"
  },
  {
    "name": "John Castle",
    "category": "unluler"
  },
  {
    "name": "Keith-Lee Castle",
    "category": "unluler"
  },
  {
    "name": "Chance Perdomo",
    "category": "unluler"
  },
  {
    "name": "Ben Chaplin",
    "category": "unluler"
  },
  {
    "name": "Charlie Chaplin",
    "category": "unluler"
  },
  {
    "name": "Graham Chapman",
    "category": "unluler"
  },
  {
    "name": "Mark Lindsay Chapman",
    "category": "unluler"
  },
  {
    "name": "Charles Dance",
    "category": "unluler"
  },
  {
    "name": "Charlie Heaton",
    "category": "unluler"
  },
  {
    "name": "Charlie Hunnam",
    "category": "unluler"
  },
  {
    "name": "Chiwetel Ejiofor",
    "category": "unluler"
  },
  {
    "name": "Chris Gauthier",
    "category": "unluler"
  },
  {
    "name": "Chris Wiggins",
    "category": "unluler"
  },
  {
    "name": "Christian Coulson",
    "category": "unluler"
  },
  {
    "name": "Christian Roberts",
    "category": "unluler"
  },
  {
    "name": "Christopher Beeny",
    "category": "unluler"
  },
  {
    "name": "Christopher Benjamin",
    "category": "unluler"
  },
  {
    "name": "Christopher Eccleston",
    "category": "unluler"
  },
  {
    "name": "Noel Clarke",
    "category": "unluler"
  },
  {
    "name": "Claude Rains",
    "category": "unluler"
  },
  {
    "name": "Cliff Richard",
    "category": "unluler"
  },
  {
    "name": "Clifford Rose",
    "category": "unluler"
  },
  {
    "name": "Clive Dunn",
    "category": "unluler"
  },
  {
    "name": "Clive Mantle",
    "category": "unluler"
  },
  {
    "name": "Clive Standen",
    "category": "unluler"
  },
  {
    "name": "Colin Clive",
    "category": "unluler"
  },
  {
    "name": "Sacha Baron Cohen",
    "category": "unluler"
  },
  {
    "name": "Raphaël Coleman",
    "category": "unluler"
  },
  {
    "name": "Colin Firth",
    "category": "unluler"
  },
  {
    "name": "Colin Lawrence",
    "category": "unluler"
  },
  {
    "name": "Phil Collins",
    "category": "unluler"
  },
  {
    "name": "Ronald Colman",
    "category": "unluler"
  },
  {
    "name": "Con O'Neill",
    "category": "unluler"
  },
  {
    "name": "Connor Swindells",
    "category": "unluler"
  },
  {
    "name": "Corin Redgrave",
    "category": "unluler"
  },
  {
    "name": "Tom Courtenay",
    "category": "unluler"
  },
  {
    "name": "Noël Coward",
    "category": "unluler"
  },
  {
    "name": "Charlie Cox",
    "category": "unluler"
  },
  {
    "name": "Daniel Craig",
    "category": "unluler"
  },
  {
    "name": "Bernard Cribbins",
    "category": "unluler"
  },
  {
    "name": "Quentin Crisp",
    "category": "unluler"
  },
  {
    "name": "Andy Cunningham",
    "category": "unluler"
  },
  {
    "name": "Peter Cushing",
    "category": "unluler"
  },
  {
    "name": "Dale Meeks",
    "category": "unluler"
  },
  {
    "name": "Daniel Day-Lewis",
    "category": "unluler"
  },
  {
    "name": "Daniel Ings",
    "category": "unluler"
  },
  {
    "name": "Daniel Massey",
    "category": "unluler"
  },
  {
    "name": "Daniel Peacock",
    "category": "unluler"
  },
  {
    "name": "Daniel Radcliffe",
    "category": "unluler"
  },
  {
    "name": "Daniel Sharman",
    "category": "unluler"
  },
  {
    "name": "Anthony Daniels",
    "category": "unluler"
  },
  {
    "name": "Phil Daniels",
    "category": "unluler"
  },
  {
    "name": "James D'Arcy",
    "category": "unluler"
  },
  {
    "name": "Darren Kent",
    "category": "unluler"
  },
  {
    "name": "Darren Shahlavi",
    "category": "unluler"
  },
  {
    "name": "Paul Darrow",
    "category": "unluler"
  },
  {
    "name": "Arthur Darvill",
    "category": "unluler"
  },
  {
    "name": "Dave Legeno",
    "category": "unluler"
  },
  {
    "name": "David Bailie",
    "category": "unluler"
  },
  {
    "name": "David Bateson",
    "category": "unluler"
  },
  {
    "name": "David English",
    "category": "unluler"
  },
  {
    "name": "David Graham",
    "category": "unluler"
  },
  {
    "name": "David Hewlett",
    "category": "unluler"
  },
  {
    "name": "David Horovitch",
    "category": "unluler"
  },
  {
    "name": "David Jason",
    "category": "unluler"
  },
  {
    "name": "David Niven",
    "category": "unluler"
  },
  {
    "name": "David Walliams",
    "category": "unluler"
  },
  {
    "name": "David Warner",
    "category": "unluler"
  },
  {
    "name": "Jaye Davidson",
    "category": "unluler"
  },
  {
    "name": "Greg Davies",
    "category": "unluler"
  },
  {
    "name": "Windsor Davies",
    "category": "unluler"
  },
  {
    "name": "Alexander Davion",
    "category": "unluler"
  },
  {
    "name": "Warwick Davis",
    "category": "unluler"
  },
  {
    "name": "Peter Davison",
    "category": "unluler"
  },
  {
    "name": "Roger Delgado",
    "category": "unluler"
  },
  {
    "name": "Denholm Elliott",
    "category": "unluler"
  },
  {
    "name": "Dennis Waterman",
    "category": "unluler"
  },
  {
    "name": "Derek Jacobi",
    "category": "unluler"
  },
  {
    "name": "Dev Patel",
    "category": "unluler"
  },
  {
    "name": "Sacha Dhawan",
    "category": "unluler"
  },
  {
    "name": "Harris Dickinson",
    "category": "unluler"
  },
  {
    "name": "Frank Dillane",
    "category": "unluler"
  },
  {
    "name": "Stephen Dillane",
    "category": "unluler"
  },
  {
    "name": "Dirk Bogarde",
    "category": "unluler"
  },
  {
    "name": "Divian Ladwa",
    "category": "unluler"
  },
  {
    "name": "Dominic Cooper",
    "category": "unluler"
  },
  {
    "name": "Dominic Holland",
    "category": "unluler"
  },
  {
    "name": "Dominic Sherwood",
    "category": "unluler"
  },
  {
    "name": "Dominic West",
    "category": "unluler"
  },
  {
    "name": "Donald Crisp",
    "category": "unluler"
  },
  {
    "name": "Donald Pleasence",
    "category": "unluler"
  },
  {
    "name": "Robert Donat",
    "category": "unluler"
  },
  {
    "name": "Doug Bradley",
    "category": "unluler"
  },
  {
    "name": "Douglas Booth",
    "category": "unluler"
  },
  {
    "name": "Sam Douglas",
    "category": "unluler"
  },
  {
    "name": "Robin Atkin Downes",
    "category": "unluler"
  },
  {
    "name": "Dudley Moore",
    "category": "unluler"
  },
  {
    "name": "Carl Duering",
    "category": "unluler"
  },
  {
    "name": "Duggie Brown",
    "category": "unluler"
  },
  {
    "name": "Simon Dutton",
    "category": "unluler"
  },
  {
    "name": "Ed Skrein",
    "category": "unluler"
  },
  {
    "name": "Ed Westwick",
    "category": "unluler"
  },
  {
    "name": "Eddie Marsan",
    "category": "unluler"
  },
  {
    "name": "Eddie Redmayne",
    "category": "unluler"
  },
  {
    "name": "Mark Eden",
    "category": "unluler"
  },
  {
    "name": "Edmund Gwenn",
    "category": "unluler"
  },
  {
    "name": "Edward Fox",
    "category": "unluler"
  },
  {
    "name": "Edward Tudor-Pole",
    "category": "unluler"
  },
  {
    "name": "Eric Idle",
    "category": "unluler"
  },
  {
    "name": "Julian Fellowes",
    "category": "unluler"
  },
  {
    "name": "Tom Felton",
    "category": "unluler"
  },
  {
    "name": "Ralph Fiennes",
    "category": "unluler"
  },
  {
    "name": "Peter Finch",
    "category": "unluler"
  },
  {
    "name": "Neil Fingleton",
    "category": "unluler"
  },
  {
    "name": "Frank Finlay",
    "category": "unluler"
  },
  {
    "name": "Finn Cole",
    "category": "unluler"
  },
  {
    "name": "Albert Finney",
    "category": "unluler"
  },
  {
    "name": "Fionn Whitehead",
    "category": "unluler"
  },
  {
    "name": "Jason Flemyng",
    "category": "unluler"
  },
  {
    "name": "Ian McShane",
    "category": "unluler"
  },
  {
    "name": "Bruce Forsyth",
    "category": "unluler"
  },
  {
    "name": "Derek Fowlds",
    "category": "unluler"
  },
  {
    "name": "James Fox",
    "category": "unluler"
  },
  {
    "name": "Clement von Franckenstein",
    "category": "unluler"
  },
  {
    "name": "Frank Willams",
    "category": "unluler"
  },
  {
    "name": "Freddie Highmore",
    "category": "unluler"
  },
  {
    "name": "Nick Frost",
    "category": "unluler"
  },
  {
    "name": "Stephen Fry",
    "category": "unluler"
  },
  {
    "name": "Michael Gambon",
    "category": "unluler"
  },
  {
    "name": "Matthew Garber",
    "category": "unluler"
  },
  {
    "name": "Andrew Garfield",
    "category": "unluler"
  },
  {
    "name": "Tony Garnett",
    "category": "unluler"
  },
  {
    "name": "Mark Gatiss",
    "category": "unluler"
  },
  {
    "name": "George A. Cooper",
    "category": "unluler"
  },
  {
    "name": "George Arliss",
    "category": "unluler"
  },
  {
    "name": "George Blagden",
    "category": "unluler"
  },
  {
    "name": "George Hilton",
    "category": "unluler"
  },
  {
    "name": "George MacKay",
    "category": "unluler"
  },
  {
    "name": "George Relph",
    "category": "unluler"
  },
  {
    "name": "George Sanders",
    "category": "unluler"
  },
  {
    "name": "Gerald Harper",
    "category": "unluler"
  },
  {
    "name": "Gerald Home",
    "category": "unluler"
  },
  {
    "name": "Ricky Gervais",
    "category": "unluler"
  },
  {
    "name": "John Gielgud",
    "category": "unluler"
  },
  {
    "name": "Gildart Jackson",
    "category": "unluler"
  },
  {
    "name": "Peter Gilmore",
    "category": "unluler"
  },
  {
    "name": "Julian Glover",
    "category": "unluler"
  },
  {
    "name": "Adam Godley",
    "category": "unluler"
  },
  {
    "name": "Cary Grant",
    "category": "unluler"
  },
  {
    "name": "Hugh Grant",
    "category": "unluler"
  },
  {
    "name": "Leslie Grantham",
    "category": "unluler"
  },
  {
    "name": "Rupert Grint",
    "category": "unluler"
  },
  {
    "name": "Alec Guinness",
    "category": "unluler"
  },
  {
    "name": "David Gyasi",
    "category": "unluler"
  },
  {
    "name": "Kenneth Haigh",
    "category": "unluler"
  },
  {
    "name": "Andrew Hall",
    "category": "unluler"
  },
  {
    "name": "Anthony Hamilton",
    "category": "unluler"
  },
  {
    "name": "Abigail Cruttenden",
    "category": "unluler"
  },
  {
    "name": "Olivia d'Abo",
    "category": "unluler"
  },
  {
    "name": "Afshan Azad",
    "category": "unluler"
  },
  {
    "name": "Jenny Agutter",
    "category": "unluler"
  },
  {
    "name": "Freema Agyeman",
    "category": "unluler"
  },
  {
    "name": "Alana Boden",
    "category": "unluler"
  },
  {
    "name": "Jean Alexander",
    "category": "unluler"
  },
  {
    "name": "Alison Carroll",
    "category": "unluler"
  },
  {
    "name": "Alison Newman",
    "category": "unluler"
  },
  {
    "name": "Freya Allan",
    "category": "unluler"
  },
  {
    "name": "Lily Allen",
    "category": "unluler"
  },
  {
    "name": "Amanda Holden",
    "category": "unluler"
  },
  {
    "name": "Amanda Tapping",
    "category": "unluler"
  },
  {
    "name": "Amy Nuttall",
    "category": "unluler"
  },
  {
    "name": "Julie Andrews",
    "category": "unluler"
  },
  {
    "name": "Angela Pleasence",
    "category": "unluler"
  },
  {
    "name": "Angela Thorne",
    "category": "unluler"
  },
  {
    "name": "Anjli Mohindra",
    "category": "unluler"
  },
  {
    "name": "Ann Davies",
    "category": "unluler"
  },
  {
    "name": "Ann Emery",
    "category": "unluler"
  },
  {
    "name": "Annabel Scholey",
    "category": "unluler"
  },
  {
    "name": "Annabelle Wallis",
    "category": "unluler"
  },
  {
    "name": "Anne-Marie Duff",
    "category": "unluler"
  },
  {
    "name": "Gabrielle Anwar",
    "category": "unluler"
  },
  {
    "name": "Mina Anwar",
    "category": "unluler"
  },
  {
    "name": "Gemma Arterton",
    "category": "unluler"
  },
  {
    "name": "Jane Asher",
    "category": "unluler"
  },
  {
    "name": "Kate Ashfield",
    "category": "unluler"
  },
  {
    "name": "Ashley Madekwe",
    "category": "unluler"
  },
  {
    "name": "Zawe Ashton",
    "category": "unluler"
  },
  {
    "name": "Coral Atkins",
    "category": "unluler"
  },
  {
    "name": "Eileen Atkins",
    "category": "unluler"
  },
  {
    "name": "Gemma Atkinson",
    "category": "unluler"
  },
  {
    "name": "Audrey Hepburn",
    "category": "unluler"
  },
  {
    "name": "Hermione Baddeley",
    "category": "unluler"
  },
  {
    "name": "Elli Bamber",
    "category": "unluler"
  },
  {
    "name": "Barbara Leigh-Hunt",
    "category": "unluler"
  },
  {
    "name": "Alexandra Bastedo",
    "category": "unluler"
  },
  {
    "name": "Helen Baxendale",
    "category": "unluler"
  },
  {
    "name": "Amber Beattie",
    "category": "unluler"
  },
  {
    "name": "Victoria Beckham",
    "category": "unluler"
  },
  {
    "name": "Kate Beckinsale",
    "category": "unluler"
  },
  {
    "name": "Bel Powley",
    "category": "unluler"
  },
  {
    "name": "Lynda Bellingham",
    "category": "unluler"
  },
  {
    "name": "Eliza Bennett",
    "category": "unluler"
  },
  {
    "name": "Leanne Best",
    "category": "unluler"
  },
  {
    "name": "Daisy Bevan",
    "category": "unluler"
  },
  {
    "name": "Billie Piper",
    "category": "unluler"
  },
  {
    "name": "Billie Whitelaw",
    "category": "unluler"
  },
  {
    "name": "Jacqueline Bisset",
    "category": "unluler"
  },
  {
    "name": "Honor Blackman",
    "category": "unluler"
  },
  {
    "name": "Emily Blunt",
    "category": "unluler"
  },
  {
    "name": "Lilian Bond",
    "category": "unluler"
  },
  {
    "name": "Helena Bonham Carter",
    "category": "unluler"
  },
  {
    "name": "Bonnie Langford",
    "category": "unluler"
  },
  {
    "name": "Leah Bracknell",
    "category": "unluler"
  },
  {
    "name": "Louise Brealey",
    "category": "unluler"
  },
  {
    "name": "Brenda Blethyn",
    "category": "unluler"
  },
  {
    "name": "Briony McRoberts",
    "category": "unluler"
  },
  {
    "name": "Dora Bryan",
    "category": "unluler"
  },
  {
    "name": "Nicola Bryant",
    "category": "unluler"
  },
  {
    "name": "Jackie Burroughs",
    "category": "unluler"
  },
  {
    "name": "Naomi Campbell",
    "category": "unluler"
  },
  {
    "name": "Cara Seymour",
    "category": "unluler"
  },
  {
    "name": "Cara Theobold",
    "category": "unluler"
  },
  {
    "name": "Carmen Chaplin",
    "category": "unluler"
  },
  {
    "name": "Judy Carne",
    "category": "unluler"
  },
  {
    "name": "Carol Raye",
    "category": "unluler"
  },
  {
    "name": "Carole Shelley",
    "category": "unluler"
  },
  {
    "name": "Caroline Goodall",
    "category": "unluler"
  },
  {
    "name": "Jane Carr",
    "category": "unluler"
  },
  {
    "name": "Catherine McCormack",
    "category": "unluler"
  },
  {
    "name": "Kim Cattrall",
    "category": "unluler"
  },
  {
    "name": "Jessie Cave",
    "category": "unluler"
  },
  {
    "name": "Celia Johnson",
    "category": "unluler"
  },
  {
    "name": "Chanel Cresswell",
    "category": "unluler"
  },
  {
    "name": "Charli XCX",
    "category": "unluler"
  },
  {
    "name": "Charlotte Rampling",
    "category": "unluler"
  },
  {
    "name": "China Chow",
    "category": "unluler"
  },
  {
    "name": "Julie Christie",
    "category": "unluler"
  },
  {
    "name": "Christina Pickles",
    "category": "unluler"
  },
  {
    "name": "Claire Bloom",
    "category": "unluler"
  },
  {
    "name": "Claire Forlani",
    "category": "unluler"
  },
  {
    "name": "Claire Foy",
    "category": "unluler"
  },
  {
    "name": "Claire Rushbrook",
    "category": "unluler"
  },
  {
    "name": "Clare Calbraith",
    "category": "unluler"
  },
  {
    "name": "Petula Clark",
    "category": "unluler"
  },
  {
    "name": "Claudie Blakley",
    "category": "unluler"
  },
  {
    "name": "Cleo Laine",
    "category": "unluler"
  },
  {
    "name": "Camille Coduri",
    "category": "unluler"
  },
  {
    "name": "Lauren Cohan",
    "category": "unluler"
  },
  {
    "name": "Christina Cole",
    "category": "unluler"
  },
  {
    "name": "Jenna Coleman",
    "category": "unluler"
  },
  {
    "name": "Joan Collins",
    "category": "unluler"
  },
  {
    "name": "Joely Collins",
    "category": "unluler"
  },
  {
    "name": "Lily Collins",
    "category": "unluler"
  },
  {
    "name": "Pauline Collins",
    "category": "unluler"
  },
  {
    "name": "Charlotte Cornwell",
    "category": "unluler"
  },
  {
    "name": "Cicely Courtneidge",
    "category": "unluler"
  },
  {
    "name": "Peggy Cummins",
    "category": "unluler"
  },
  {
    "name": "Pamela Cundell",
    "category": "unluler"
  },
  {
    "name": "Cynthia Erivo",
    "category": "unluler"
  },
  {
    "name": "Dafne Keen",
    "category": "unluler"
  },
  {
    "name": "Daisy Edgar-Jones",
    "category": "unluler"
  },
  {
    "name": "Daisy Ridley",
    "category": "unluler"
  },
  {
    "name": "Damaris Hayman",
    "category": "unluler"
  },
  {
    "name": "Elizabeth Dawn",
    "category": "unluler"
  },
  {
    "name": "Olivia de Havilland",
    "category": "unluler"
  },
  {
    "name": "Julia Deakin",
    "category": "unluler"
  },
  {
    "name": "Jeanne de Casalis",
    "category": "unluler"
  },
  {
    "name": "Janie Dee",
    "category": "unluler"
  },
  {
    "name": "Frances de la Tour",
    "category": "unluler"
  },
  {
    "name": "Judi Dench",
    "category": "unluler"
  },
  {
    "name": "Denise Bryer",
    "category": "unluler"
  },
  {
    "name": "Denise Coffey",
    "category": "unluler"
  },
  {
    "name": "Denise van Outen",
    "category": "unluler"
  },
  {
    "name": "Diana Dors",
    "category": "unluler"
  },
  {
    "name": "Diana Rigg",
    "category": "unluler"
  },
  {
    "name": "Diane Langton",
    "category": "unluler"
  },
  {
    "name": "Diane Morgan",
    "category": "unluler"
  },
  {
    "name": "Monica Dolan",
    "category": "unluler"
  },
  {
    "name": "Amanda Donohoe",
    "category": "unluler"
  },
  {
    "name": "Hazel Douglas",
    "category": "unluler"
  },
  {
    "name": "Freda Dowie",
    "category": "unluler"
  },
  {
    "name": "Joan Dowling",
    "category": "unluler"
  },
  {
    "name": "Roma Downey",
    "category": "unluler"
  },
  {
    "name": "Hilary Dwyer",
    "category": "unluler"
  },
  {
    "name": "Edith Evans",
    "category": "unluler"
  },
  {
    "name": "Samantha Eggar",
    "category": "unluler"
  },
  {
    "name": "Jennifer Ehle",
    "category": "unluler"
  },
  {
    "name": "Eleanor Tomlinson",
    "category": "unluler"
  },
  {
    "name": "Elisabeth Sladen",
    "category": "unluler"
  },
  {
    "name": "Elizabeth Tan",
    "category": "unluler"
  },
  {
    "name": "Ella Hunt",
    "category": "unluler"
  },
  {
    "name": "Ellen Terry",
    "category": "unluler"
  },
  {
    "name": "Elsa Lanchester",
    "category": "unluler"
  },
  {
    "name": "Elsie Kelly",
    "category": "unluler"
  },
  {
    "name": "Bella Emberg",
    "category": "unluler"
  },
  {
    "name": "Emerald Fennell",
    "category": "unluler"
  },
  {
    "name": "Emilia Clarke",
    "category": "unluler"
  },
  {
    "name": "Emilia Jones",
    "category": "unluler"
  },
  {
    "name": "Emily Carey",
    "category": "unluler"
  },
  {
    "name": "Emily Watson",
    "category": "unluler"
  },
  {
    "name": "Emma Bunton",
    "category": "unluler"
  },
  {
    "name": "Emma Chambers",
    "category": "unluler"
  },
  {
    "name": "Emma Corrin",
    "category": "unluler"
  },
  {
    "name": "Emma Greenwell",
    "category": "unluler"
  },
  {
    "name": "Emma Laird",
    "category": "unluler"
  },
  {
    "name": "Emma Samms",
    "category": "unluler"
  },
  {
    "name": "Gladys Cooper",
    "category": "unluler"
  },
  {
    "name": "Jill Esmond",
    "category": "unluler"
  },
  {
    "name": "Eileen Essell",
    "category": "unluler"
  },
  {
    "name": "Estelle",
    "category": "unluler"
  },
  {
    "name": "Eva Le Gallienne",
    "category": "unluler"
  },
  {
    "name": "Alice Eve",
    "category": "unluler"
  },
  {
    "name": "Evie Templeton",
    "category": "unluler"
  },
  {
    "name": "Suzan Farmer",
    "category": "unluler"
  },
  {
    "name": "Fenella Fielding",
    "category": "unluler"
  },
  {
    "name": "Flora Robson",
    "category": "unluler"
  },
  {
    "name": "Florence Pugh",
    "category": "unluler"
  },
  {
    "name": "Joan Fontaine",
    "category": "unluler"
  },
  {
    "name": "Emilia Fox",
    "category": "unluler"
  },
  {
    "name": "Frances Fisher",
    "category": "unluler"
  },
  {
    "name": "Cornelia Frances",
    "category": "unluler"
  },
  {
    "name": "Francesca Annis",
    "category": "unluler"
  },
  {
    "name": "Liz Fraser",
    "category": "unluler"
  },
  {
    "name": "Anna Friel",
    "category": "unluler"
  },
  {
    "name": "Gabriella Wilde",
    "category": "unluler"
  },
  {
    "name": "Patricia Gage",
    "category": "unluler"
  },
  {
    "name": "Charlotte Gainsbourg",
    "category": "unluler"
  },
  {
    "name": "Greer Garson",
    "category": "unluler"
  },
  {
    "name": "Patricia Garwood",
    "category": "unluler"
  },
  {
    "name": "Jill Gascoine",
    "category": "unluler"
  },
  {
    "name": "Eunice Gayson",
    "category": "unluler"
  },
  {
    "name": "Gemma Chan",
    "category": "unluler"
  },
  {
    "name": "Gemma Whelan",
    "category": "unluler"
  },
  {
    "name": "Geneviève Waïte",
    "category": "unluler"
  },
  {
    "name": "Susan George",
    "category": "unluler"
  },
  {
    "name": "Geri Halliwell",
    "category": "unluler"
  },
  {
    "name": "Mandip Gill",
    "category": "unluler"
  },
  {
    "name": "Fiona Gillies",
    "category": "unluler"
  },
  {
    "name": "Lou Gish",
    "category": "unluler"
  },
  {
    "name": "Glenda Jackson",
    "category": "unluler"
  },
  {
    "name": "Lucy Gordon",
    "category": "unluler"
  },
  {
    "name": "Mia Goth",
    "category": "unluler"
  },
  {
    "name": "Gugu Mbatha-Raw",
    "category": "unluler"
  },
  {
    "name": "Sienna Guillory",
    "category": "unluler"
  },
  {
    "name": "Rebecca Hall",
    "category": "unluler"
  },
  {
    "name": "Hannah Arterton",
    "category": "unluler"
  },
  {
    "name": "Hannah John-Kamen",
    "category": "unluler"
  },
  {
    "name": "Hannah Murray",
    "category": "unluler"
  },
  {
    "name": "Hannah New",
    "category": "unluler"
  },
  {
    "name": "Hannah Spearritt",
    "category": "unluler"
  },
  {
    "name": "Hannah Waddingham",
    "category": "unluler"
  },
  {
    "name": "Harriet Walter",
    "category": "unluler"
  },
  {
    "name": "Naomie Harris",
    "category": "unluler"
  },
  {
    "name": "Sally Hawkins",
    "category": "unluler"
  },
  {
    "name": "Jill Haworth",
    "category": "unluler"
  },
  {
    "name": "Haydn Gwynne",
    "category": "unluler"
  },
  {
    "name": "Hayley Atwell",
    "category": "unluler"
  },
  {
    "name": "Hazel Court",
    "category": "unluler"
  },
  {
    "name": "Hazel Crowney",
    "category": "unluler"
  },
  {
    "name": "Lena Headey",
    "category": "unluler"
  },
  {
    "name": "Heather Sears",
    "category": "unluler"
  },
  {
    "name": "Emma Heming Willis",
    "category": "unluler"
  },
  {
    "name": "Georgie Henley",
    "category": "unluler"
  },
  {
    "name": "Elizabeth Henstridge",
    "category": "unluler"
  },
  {
    "name": "Hermione Gingold",
    "category": "unluler"
  },
  {
    "name": "Jean Heywood",
    "category": "unluler"
  },
  {
    "name": "Joan Hickson",
    "category": "unluler"
  },
  {
    "name": "Clare Higgins",
    "category": "unluler"
  },
  {
    "name": "Jacqueline Hill",
    "category": "unluler"
  },
  {
    "name": "Thora Hird",
    "category": "unluler"
  },
  {
    "name": "Kelly Hunter",
    "category": "unluler"
  },
  {
    "name": "Rosie Huntington-Whiteley",
    "category": "unluler"
  },
  {
    "name": "Elizabeth Hurley",
    "category": "unluler"
  },
  {
    "name": "Ida Lupino",
    "category": "unluler"
  },
  {
    "name": "Imogen Poots",
    "category": "unluler"
  },
  {
    "name": "Isa Briones",
    "category": "unluler"
  },
  {
    "name": "Isla Bevan",
    "category": "unluler"
  },
  {
    "name": "Jackie Forster",
    "category": "unluler"
  },
  {
    "name": "Geraldine James",
    "category": "unluler"
  },
  {
    "name": "Louise Jameson",
    "category": "unluler"
  },
  {
    "name": "Jane Birkin",
    "category": "unluler"
  },
  {
    "name": "Jane Horrocks",
    "category": "unluler"
  },
  {
    "name": "Jane Lapotaire",
    "category": "unluler"
  },
  {
    "name": "Jane Seymour",
    "category": "unluler"
  },
  {
    "name": "Jane Wymark",
    "category": "unluler"
  },
  {
    "name": "Janet McTeer",
    "category": "unluler"
  },
  {
    "name": "Jayalalithaa",
    "category": "unluler"
  },
  {
    "name": "Jean Lodge",
    "category": "unluler"
  },
  {
    "name": "Jean Marsh",
    "category": "unluler"
  },
  {
    "name": "Jean Simmons",
    "category": "unluler"
  },
  {
    "name": "Jeannette Charles",
    "category": "unluler"
  },
  {
    "name": "Jemma Redgrave",
    "category": "unluler"
  },
  {
    "name": "Julika Jenkins",
    "category": "unluler"
  },
  {
    "name": "Jenna Russell",
    "category": "unluler"
  },
  {
    "name": "Jennifer Kendal",
    "category": "unluler"
  },
  {
    "name": "Jennifer Saunders",
    "category": "unluler"
  },
  {
    "name": "Jenny Seagrove",
    "category": "unluler"
  },
  {
    "name": "Jenny Tomasin",
    "category": "unluler"
  },
  {
    "name": "Jessica Barden",
    "category": "unluler"
  },
  {
    "name": "Jessica Brown Findlay",
    "category": "unluler"
  },
  {
    "name": "AJ Mitchell",
    "category": "unluler"
  },
  {
    "name": "Chubby Checker",
    "category": "unluler"
  },
  {
    "name": "David Archuleta",
    "category": "unluler"
  },
  {
    "name": "Florence Warner",
    "category": "unluler"
  },
  {
    "name": "Buddy Greco",
    "category": "unluler"
  },
  {
    "name": "Harry Nilsson",
    "category": "unluler"
  },
  {
    "name": "Jeong Yoonchae",
    "category": "unluler"
  },
  {
    "name": "John Davis",
    "category": "unluler"
  },
  {
    "name": "Jon McLaughlin",
    "category": "unluler"
  },
  {
    "name": "R. Kelly",
    "category": "unluler"
  },
  {
    "name": "Lara Rajagopalan",
    "category": "unluler"
  },
  {
    "name": "Michael Henderson",
    "category": "unluler"
  },
  {
    "name": "Redfoo",
    "category": "unluler"
  },
  {
    "name": "SkyBlu",
    "category": "unluler"
  },
  {
    "name": "Smokey Robinson",
    "category": "unluler"
  },
  {
    "name": "Trini Lopez",
    "category": "unluler"
  },
  {
    "name": "Lucy Thomas",
    "category": "unluler"
  },
  {
    "name": "Marianne Faithfull",
    "category": "unluler"
  },
  {
    "name": "Nathan Carter",
    "category": "unluler"
  },
  {
    "name": "Peter Frampton",
    "category": "unluler"
  },
  {
    "name": "Sandy Denny",
    "category": "unluler"
  },
  {
    "name": "Shelia Mathews",
    "category": "unluler"
  },
  {
    "name": "Alain Berliner",
    "category": "unluler"
  },
  {
    "name": "Brenda Song",
    "category": "unluler"
  },
  {
    "name": "Catherine O'Hara",
    "category": "unluler"
  },
  {
    "name": "Darren Criss",
    "category": "unluler"
  },
  {
    "name": "David Janssen",
    "category": "unluler"
  },
  {
    "name": "Dean Martin",
    "category": "unluler"
  },
  {
    "name": "Dean Stockwell",
    "category": "unluler"
  },
  {
    "name": "Brian Dennehy",
    "category": "unluler"
  },
  {
    "name": "Joely Fisher",
    "category": "unluler"
  },
  {
    "name": "Ruth Prawer Jhabvala",
    "category": "unluler"
  },
  {
    "name": "John Adams",
    "category": "unluler"
  },
  {
    "name": "László Benedek",
    "category": "unluler"
  },
  {
    "name": "Leonard Nimoy",
    "category": "unluler"
  },
  {
    "name": "Leopold Lindtberg",
    "category": "unluler"
  },
  {
    "name": "Eva Longoria",
    "category": "unluler"
  },
  {
    "name": "Madeleine Stowe",
    "category": "unluler"
  },
  {
    "name": "Michael Kamen",
    "category": "unluler"
  },
  {
    "name": "Milyoner",
    "category": "unluler"
  },
  {
    "name": "Mira Nair",
    "category": "unluler"
  },
  {
    "name": "Roger Moore",
    "category": "unluler"
  },
  {
    "name": "Noah Hawley",
    "category": "unluler"
  },
  {
    "name": "Oscar Isaac",
    "category": "unluler"
  },
  {
    "name": "Patrick Stewart",
    "category": "unluler"
  },
  {
    "name": "Deborah Raffin",
    "category": "unluler"
  },
  {
    "name": "A. R. Rahman",
    "category": "unluler"
  },
  {
    "name": "Ray Dolby",
    "category": "unluler"
  },
  {
    "name": "Mark Ruffalo",
    "category": "unluler"
  },
  {
    "name": "S. Epatha Merkerson",
    "category": "unluler"
  },
  {
    "name": "Simone Signoret",
    "category": "unluler"
  },
  {
    "name": "Jason Sudeikis",
    "category": "unluler"
  },
  {
    "name": "Mike Todd",
    "category": "unluler"
  },
  {
    "name": "Paul Verhoeven",
    "category": "unluler"
  },
  {
    "name": "Ving Rhames",
    "category": "unluler"
  },
  {
    "name": "Jeremy Allen White",
    "category": "unluler"
  },
  {
    "name": "II. Bayezid",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Türkiye cumhurbaşkanı",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ahmet Necdet Sezer",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Türkiye cumhurbaşkanı vekili",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Türkiye'de cumhurbaşkanlığı seçimleri",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Şablon:Türkiye cumhurbaşkanları",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Roma imparatoru",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Beş İmparator Yılı",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Beş İyi İmparator",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Altı İmparator Yılı",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Antik Roma tarihinin zaman çizelgesi",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Asker imparator",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Caracalla Yazıtı",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Flavius Hanedanı",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Herakleios",
    "category": "tarihi_kisiler"
  },
  {
    "name": "İliryalı imparatorlar",
    "category": "tarihi_kisiler"
  },
  {
    "name": "I. Konstantin",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Tetrarşi",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Şablon:Roma imparatorları",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Alain Aspect",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Aleksandr Prohorov",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Aleksey Abrikosov",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Alex Müller",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jores Alfyorov",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Alfred Kastler",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Hannes Alfvén",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Carl Anderson",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Andrea Ghez",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Anne L'Huillier",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Anton Zeilinger",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Arthur B. McDonald",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Arthur Schawlow",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Arthur Ashkin",
    "category": "tarihi_kisiler"
  },
  {
    "name": "John Bardeen",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Charles Barkla",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Barry Barish",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Henri Becquerel",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ben R. Mottelson",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Hans Bethe",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Patrick Blackett",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Nicolaas Bloembergen",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Max Born",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Walther Bothe",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Lawrence Bragg",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Brian Josephson",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Percy Bridgman",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Bertram Brockhouse",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Louis de Broglie",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Mario Capecchi",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Carl Wieman",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Carlo Rubbia",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Owen Chamberlain",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Charles Édouard Guillaume",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Charles Townes",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Charles Wilson",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Georges Charpak",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Steven Chu",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Claude Cohen-Tannoudji",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Arthur Compton",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Leon Cooper",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Marie Curie",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Pierre Curie",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Pavel Çerenkov",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Gustaf Dalén",
    "category": "tarihi_kisiler"
  },
  {
    "name": "David Gross",
    "category": "tarihi_kisiler"
  },
  {
    "name": "David Lee",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Raymond Davis",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Clinton Davisson",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Paul Dirac",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Donald A. Glaser",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Donna Strickland",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Douglas Osheroff",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Duncan Haldane",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Edward Appleton",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Edward Purcell",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Albert Einstein",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Emilio Segrè",
    "category": "tarihi_kisiler"
  },
  {
    "name": "François Englert",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Eric Cornell",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Leo Esaki",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Eugene Wigner",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Felix Bloch",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ferdinand Braun",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Enrico Fermi",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Albert Fert",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Richard Feynman",
    "category": "tarihi_kisiler"
  },
  {
    "name": "William Fowler",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Dennis Gabor",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Gabriel Lippmann",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Murray Gell-Mann",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Geoffrey Hinton",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Georg Bednorz",
    "category": "tarihi_kisiler"
  },
  {
    "name": "George Smith",
    "category": "tarihi_kisiler"
  },
  {
    "name": "George Smoot",
    "category": "tarihi_kisiler"
  },
  {
    "name": "George Thomson",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Gerard 't Hooft",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Gerd Binnig",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Riccardo Giacconi",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ivar Giaever",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Vitali Ginzburg",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Giorgio Parisi",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Sheldon Glashow",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Roy Glauber",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Maria Goeppert-Mayer",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Peter Grünberg",
    "category": "tarihi_kisiler"
  },
  {
    "name": "John Hall",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Hans Dehmelt",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Hans Jensen",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Theodor W. Hänsch",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Heinrich Rohrer",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Werner Heisenberg",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Hendrik Lorentz",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Henry Kendall",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Gustav Hertz",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Victor Hess",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Antony Hewish",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Peter Higgs",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Hiroshi Amano",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Russell Hulse",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Isamu Akasaki",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Isidor Isaac Rabi",
    "category": "tarihi_kisiler"
  },
  {
    "name": "İgor Tamm",
    "category": "tarihi_kisiler"
  },
  {
    "name": "İlya Frank",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jack Steinberger",
    "category": "tarihi_kisiler"
  },
  {
    "name": "James Chadwick",
    "category": "tarihi_kisiler"
  },
  {
    "name": "James Cronin",
    "category": "tarihi_kisiler"
  },
  {
    "name": "James Franck",
    "category": "tarihi_kisiler"
  },
  {
    "name": "James Rainwater",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jerome Friedman",
    "category": "tarihi_kisiler"
  },
  {
    "name": "John Clarke",
    "category": "tarihi_kisiler"
  },
  {
    "name": "John Clauser",
    "category": "tarihi_kisiler"
  },
  {
    "name": "John Cockcroft",
    "category": "tarihi_kisiler"
  },
  {
    "name": "John Martinis",
    "category": "tarihi_kisiler"
  },
  {
    "name": "John Van Vleck",
    "category": "tarihi_kisiler"
  },
  {
    "name": "John William Strutt",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Joseph Taylor",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Kai Siegbahn",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Heike Kamerlingh Onnes",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Charles Kao",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Wolfgang Ketterle",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jack Kilby",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Klaus Hasselmann",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Klaus von Klitzing",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ferenc Krausz",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Herbert Kroemer",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Polykarp Kusch",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Willis Lamb",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Robert Laughlin",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Paul Lauterbur",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ernest Lawrence",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Leon Lederman",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Tsung-Dao Lee",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Anthony Leggett",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Philipp Lenard",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Lev Landau",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Luis Alvarez",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Makoto Kobayashi",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Manne Siegbahn",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Peter Mansfield",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Guglielmo Marconi",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Masatoshi Koshiba",
    "category": "tarihi_kisiler"
  },
  {
    "name": "John Mather",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Max von Laue",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Michel Mayor",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Melvin Schwartz",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Michael Kosterlitz",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Albert Michelson",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Robert A. Millikan",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Nevill Mott",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Gérard Mourou",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Rudolf Mössbauer",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Muhammed Abdüsselam",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Yoichiro Nambu",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Louis Néel",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Nikolay Basov",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Konstantin Novoselov",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Wolfgang Paul",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Wolfgang Pauli",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jim Peebles",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Arno Penzias",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Martin Perl",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Saul Perlmutter",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jean Perrin",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Philip Anderson",
    "category": "tarihi_kisiler"
  },
  {
    "name": "William Phillips",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Pierre-Gilles de Gennes",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Max Planck",
    "category": "tarihi_kisiler"
  },
  {
    "name": "David Politzer",
    "category": "tarihi_kisiler"
  },
  {
    "name": "C. F. Powell",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Pyotr Kapitsa",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Didier Queloz",
    "category": "tarihi_kisiler"
  },
  {
    "name": "C. V. Raman",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Norman Ramsey",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Frederick Reines",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Reinhard Genzel",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Richard Taylor",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Owen Richardson",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Burton Richter",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Adam Riess",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Robert Hofstadter",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Robert Richardson",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Robert Wilson",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Roger Penrose",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ernst Ruska",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Martin Ryle",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Brian Schmidt",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Robert Schrieffer",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Erwin Schrödinger",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Julian Schwinger",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Serge Haroche",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Shin'ichirō Tomonaga",
    "category": "tarihi_kisiler"
  },
  {
    "name": "William Shockley",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Shuji Nakamura",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Clifford Shull",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Simon van der Meer",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Johannes Stark",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Otto Stern",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Steven Weinberg",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Horst Störmer",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Subrahmanyan Chandrasekhar",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Syukuro Manabe",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Takaaki Kajita",
    "category": "tarihi_kisiler"
  },
  {
    "name": "J. J. Thomson",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Kip Thorne",
    "category": "tarihi_kisiler"
  },
  {
    "name": "David Thouless",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Samuel C. C. Ting",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Toshihide Maskawa",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Daniel Tsui",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Val Fitch",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Johannes Diderik van der Waals",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Martinus Veltman",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Walter Brattain",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ernest Walton",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Rainer Weiss",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Frank Wilczek",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Wilhelm Röntgen",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Wilhelm Wien",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Willard Boyle",
    "category": "tarihi_kisiler"
  },
  {
    "name": "William Bragg",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Kenneth Wilson",
    "category": "tarihi_kisiler"
  },
  {
    "name": "David Wineland",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Chen Ning Yang",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Hideki Yukava",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Pieter Zeeman",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Frits Zernike",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Aaron Ciechanover",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Adolf Butenandt",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Peter Agre",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Akira Yoshino",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Alan MacDiarmid",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Aleksey Yekimov",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Alexander Todd",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Sidney Altman",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Christian Anfinsen",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Archer Martin",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Arieh Warshel",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Arne Tiselius",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Arthur Harden",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Artturi Virtanen",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Avram Hershko",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Aziz Sancar",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Adolf von Baeyer",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Barry Sharpless",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Benjamin List",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Paul Berg",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Friedrich Bergius",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Bernard L. Feringa",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Paul D. Boyer",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Bruce Merrifield",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Carl Bosch",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Carolyn R. Bertozzi",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Thomas Cech",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Charles Pedersen",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Yves Chauvin",
    "category": "tarihi_kisiler"
  },
  {
    "name": "John Cornforth",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Paul Crutzen",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Cyril Hinshelwood",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Dan Şehtman",
    "category": "tarihi_kisiler"
  },
  {
    "name": "David MacMillan",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Demis Hassabis",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Derek Barton",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Donald Cram",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Dorothy Hodgkin",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jacques Dubochet",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Vincent du Vigneaud",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Eduard Buchner",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ei-ichi Negishi",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Elias James Corey",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Emil Fischer",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Emmanuelle Charpentier",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Eric Betzig",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ernst Otto Fischer",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Richard Ernst",
    "category": "tarihi_kisiler"
  },
  {
    "name": "John Fenn",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Paul Flory",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Frances Arnold",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Francis Aston",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Fraser Stoddart",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Frédéric Joliot-Curie",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Frederick Sanger",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Frederick Soddy",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Fritz Pregl",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Kenichi Fukui",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Geoffrey Wilkinson",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Georg Wittig",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Gerhard Ertl",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Gerhard Herzberg",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Walter Gilbert",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Giulio Natta",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Robert Grubbs",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Fritz Haber",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Otto Hahn",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Hans Fischer",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Hans von Euler-Chelpin",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Hartmut Michel",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Herbert A. Hauptman",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Norman Haworth",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Alan Heeger",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Heinrich Wieland",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Henri Moissan",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Herbert Brown",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Hermann Staudinger",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Dudley Herschbach",
    "category": "tarihi_kisiler"
  },
  {
    "name": "George de Hevesy",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Roald Hoffmann",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Irwin Rose",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jacobus Henricus van 't Hoff",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jaroslav Heyrovský",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jean-Pierre Sauvage",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jennifer Doudna",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jens Skou",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Joachim Frank",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Johann Deisenhofer",
    "category": "tarihi_kisiler"
  },
  {
    "name": "John E. Walker",
    "category": "tarihi_kisiler"
  },
  {
    "name": "John Goodenough",
    "category": "tarihi_kisiler"
  },
  {
    "name": "John Howard Northrop",
    "category": "tarihi_kisiler"
  },
  {
    "name": "John Kendrew",
    "category": "tarihi_kisiler"
  },
  {
    "name": "John M. Jumper",
    "category": "tarihi_kisiler"
  },
  {
    "name": "John Polanyi",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Irène Joliot-Curie",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Karl Ziegler",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jerome Karle",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Aaron Klug",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Brian Kobilka",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Walter Kohn",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Koichi Tanaka",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Roger Kornberg",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Harry Kroto",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Kurt Alder",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Kurt Wüthrich",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Irving Langmuir",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Lavoslav Ružička",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Yuan T. Lee",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jean-Marie Lehn",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Willard Libby",
    "category": "tarihi_kisiler"
  },
  {
    "name": "William Lipscomb",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Louis Brus",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Luis Leloir",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Manfred Eigen",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Rudolph Marcus",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Martin Chalfie",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Martin Karplus",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Edwin McMillan",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Melvin Calvin",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Michael Levitt",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Michael Smith",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Michel Devoret",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Mario Molina",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Stanford Moore",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Morten Meldal",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Moungi Bawendi",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Robert S. Mulliken",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Kary Mullis",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Walther Nernst",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Nikolay Semyonov",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ryōji Noyori",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Odd Hassel",
    "category": "tarihi_kisiler"
  },
  {
    "name": "George Olah",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Lars Onsager",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Osamu Shimomura",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Otto Diels",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Otto Wallach",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Paul Karrer",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Paul Modrich",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Paul Sabatier",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Linus Pauling",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Max Perutz",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Peter Debye",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Polioksimetilen",
    "category": "tarihi_kisiler"
  },
  {
    "name": "John Pople",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Peter Mitchell",
    "category": "tarihi_kisiler"
  },
  {
    "name": "George Porter",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ilya Prigogine",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Venkatraman Ramakrishnan",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Richard Heck",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Richard Henderson",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Richard Kuhn",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Richard Robson",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Richard Schrock",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Richard Synge",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Richard Zsigmondy",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Robert Curl",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Robert Huber",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Robert Lefkowitz",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Robert Robinson",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Robert Woodward",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Roderick MacKinnon",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Roger Tsien",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ronald Norrish",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Sherwood Rowland",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ernest Rutherford",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Paul Scherrer",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Glenn T. Seaborg",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Hideki Shirakawa",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Richard Smalley",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Stanley Whittingham",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Stefan Hell",
    "category": "tarihi_kisiler"
  },
  {
    "name": "James Sumner",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Susumu Kitagawa",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Akira Suzuki",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Svante Arrhenius",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Henry Taube",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Theodor Svedberg",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Theodore Richards",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Thomas A. Steitz",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Tomas Lindahl",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Harold Urey",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Victor Grignard",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Vladimir Prelog",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Wendell Stanley",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Alfred Werner",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Wilhelm Ostwald",
    "category": "tarihi_kisiler"
  },
  {
    "name": "William Giauque",
    "category": "tarihi_kisiler"
  },
  {
    "name": "William Knowles",
    "category": "tarihi_kisiler"
  },
  {
    "name": "William Moerner",
    "category": "tarihi_kisiler"
  },
  {
    "name": "William Ramsay",
    "category": "tarihi_kisiler"
  },
  {
    "name": "William Stein",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Richard Willstätter",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Adolf Windaus",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Gregory Winter",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ada Yonath",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ahmed Zewail",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Alfred G. Gilman",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Allvar Gullstrand",
    "category": "tarihi_kisiler"
  },
  {
    "name": "André Michel Lwoff",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Werner Arber",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ardem Patapoutian",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Arthur Kornberg",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Arvid Carlsson",
    "category": "tarihi_kisiler"
  },
  {
    "name": "August Krogh",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Richard Axel",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Baruch Samuel Blumberg",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Baruj Benacerraf",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Bengt I. Samuelsson",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Sune Bergström",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Bernard Katz",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Bernardo Houssay",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Bert Sakmann",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Bruce Beutler",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Günter Blobel",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Konrad Emil Bloch",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Daniel Bovet",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Sydney Brenner",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Michael Stuart Brown",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Linda B. Buck",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Carl Ferdinand Cori",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Alexis Carrel",
    "category": "tarihi_kisiler"
  },
  {
    "name": "César Milstein",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Charles Brenton Huggins",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Charles Louis Alphonse Laveran",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Charles M. Rice",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Charles Scott Sherrington",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Christiaan Eijkman",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Albert Claude",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Stanley Cohen",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Allan McLeod Cormack",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Corneille Heymans",
    "category": "tarihi_kisiler"
  },
  {
    "name": "André Frédéric Cournand",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Craig C. Mello",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Francis Crick",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Henrik Dam",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Daniel Carleton Gajdusek",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jean Dausset",
    "category": "tarihi_kisiler"
  },
  {
    "name": "David Baltimore",
    "category": "tarihi_kisiler"
  },
  {
    "name": "David H. Hubel",
    "category": "tarihi_kisiler"
  },
  {
    "name": "David Julius",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Christian de Duve",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Max Delbrück",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Gerhard Domagk",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Drew Weissman",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Renato Dulbecco",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Gerald Edelman",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Edgar Douglas Adrian",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Edmond H. Fischer",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Edvard Moser",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Edward Adelbert Doisy",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Edward B. Lewis",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Edward Calvin Kendall",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Edward Lawrie Tatum",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Edwin G. Krebs",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Paul Ehrlich",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Gertrude Belle Elion",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Elizabeth Blackburn",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Emil Adolf von Behring",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Emil Theodor Kocher",
    "category": "tarihi_kisiler"
  },
  {
    "name": "John Franklin Enders",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Eric F. Wieschaus",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Eric Kandel",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ernst Boris Chain",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Erwin Neher",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Andrew Z. Fire",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Alexander Fleming",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Werner Forssmann",
    "category": "tarihi_kisiler"
  },
  {
    "name": "François Jacob",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Françoise Barré-Sinoussi",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Frank Macfarlane Burnet",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Fred Ramsdell",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Frederick Banting",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Frederick Gowland Hopkins",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Karl von Frisch",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Georg von Békésy",
    "category": "tarihi_kisiler"
  },
  {
    "name": "George Wells Beadle",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Georges J. F. Köhler",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Gerty Theresa Cori",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Joseph L. Goldstein",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Camillo Golgi",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Paul Greengard",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Gregg L. Semenza",
    "category": "tarihi_kisiler"
  },
  {
    "name": "H. Robert Horvitz",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Haldan Keffer Hartline",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jeffrey C. Hall",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Hamilton O. Smith",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Harald zur Hausen",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Harold E. Varmus",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Leland H. Hartwell",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Harvey J. Alter",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Henry Hallett Dale",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Herbert Spencer Gasser",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Alfred Hershey",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Archibald Hill",
    "category": "tarihi_kisiler"
  },
  {
    "name": "George H. Hitchings",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Alan Lloyd Hodgkin",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Robert William Holley",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Godfrey Hounsfield",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Howard Walter Florey",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Andrew Huxley",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Louis Ignarro",
    "category": "tarihi_kisiler"
  },
  {
    "name": "J. Michael Bishop",
    "category": "tarihi_kisiler"
  },
  {
    "name": "James P. Allison",
    "category": "tarihi_kisiler"
  },
  {
    "name": "James Rothman",
    "category": "tarihi_kisiler"
  },
  {
    "name": "James W. Black",
    "category": "tarihi_kisiler"
  },
  {
    "name": "John Carew Eccles",
    "category": "tarihi_kisiler"
  },
  {
    "name": "John E. Sulston",
    "category": "tarihi_kisiler"
  },
  {
    "name": "John Gurdon",
    "category": "tarihi_kisiler"
  },
  {
    "name": "John James Rickard Macleod",
    "category": "tarihi_kisiler"
  },
  {
    "name": "John O'Keefe",
    "category": "tarihi_kisiler"
  },
  {
    "name": "John Robert Vane",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Joseph Erlanger",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Joseph Murray",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Joshua Lederberg",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jules A. Hoffmann",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Julius Axelrod",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Julius Wagner-Jauregg",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Katalin Karikó",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Har Gobind Khorana",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Robert Koch",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Albrecht Kossel",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Hans Adolf Krebs",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Karl Landsteiner",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Fritz Albert Lipmann",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Konrad Lorenz",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Salvador Edward Luria",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Feodor Felix Konrad Lynen",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Barry Marshall",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Martin Evans",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Martin Rodbell",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Mary E. Brunkow",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Barbara McClintock",
    "category": "tarihi_kisiler"
  },
  {
    "name": "İlya Meçnikov",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Michael Houghton",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Michael Rosbash",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Michael W. Young",
    "category": "tarihi_kisiler"
  },
  {
    "name": "George Minot",
    "category": "tarihi_kisiler"
  },
  {
    "name": "António Egas Moniz",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jacques Monod",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Luc Montagnier",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Thomas Hunt Morgan",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Hermann Joseph Muller",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ferid Murad",
    "category": "tarihi_kisiler"
  },
  {
    "name": "William P. Murphy",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Daniel Nathans",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Charles Nicolle",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Niels Kaj Jerne",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Niels Ryberg Finsen",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Marshall Warren Nirenberg",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Carol W. Greider",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Christiane Nüsslein-Volhard",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Otto Fritz Meyerhof",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Otto Heinrich Warburg",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Otto Loewi",
    "category": "tarihi_kisiler"
  },
  {
    "name": "George Emil Palade",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Paul Hermann Müller",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Paul Nurse",
    "category": "tarihi_kisiler"
  },
  {
    "name": "İvan Pavlov",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Peter C. Doherty",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Peter J. Ratcliffe",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Peter Medawar",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Philip Showalter Hench",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Phillip Allen Sharp",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Stanley B. Prusiner",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ragnar Granit",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ralph M. Steinman",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Randy Schekman",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Richard J. Roberts",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Dickinson Woodruff Richards",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Charles Robert Richet",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Rita Levi-Montalcini",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Frederick Chapman Robbins",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Robert Bárány",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Robert F. Furchgott",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Robert G. Edwards",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Robin Warren",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Rodney Robert Porter",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Roger Guillemin",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ronald Ross",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Francis Peyton Rous",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Santiago Ramón y Cajal",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Satoshi Ōmura",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Andrew Schally",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Severo Ochoa",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Shimon Sakaguchi",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Shinya Yamanaka",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Oliver Smithies",
    "category": "tarihi_kisiler"
  },
  {
    "name": "George Davis Snell",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Hans Spemann",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Roger Wolcott Sperry",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Susumu Tonegawa",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Earl Wilbur Sutherland",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Svante Pääbo",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Albert Szent-Györgyi",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jack Szostak",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Tadeus Reichstein",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Tasuku Honjo",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Howard Martin Temin",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Max Theiler",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Hugo Theorell",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Thomas C. Südhof",
    "category": "tarihi_kisiler"
  },
  {
    "name": "E. Donnall Thomas",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Tim Hunt",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Nikolaas Tinbergen",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Tu Youyou",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ulf von Euler",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Victor Ambros",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Selman Abraham Waksman",
    "category": "tarihi_kisiler"
  },
  {
    "name": "George Wald",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Walter Rudolf Hess",
    "category": "tarihi_kisiler"
  },
  {
    "name": "James Dewey Watson",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Thomas Huckle Weller",
    "category": "tarihi_kisiler"
  },
  {
    "name": "George Whipple",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Torsten N. Wiesel",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Maurice Wilkins",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Willem Einthoven",
    "category": "tarihi_kisiler"
  },
  {
    "name": "William C. Campbell",
    "category": "tarihi_kisiler"
  },
  {
    "name": "William Kaelin",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Rosalyn Sussman Yalow",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Yoshinori Ohsumi",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Rolf M. Zinkernagel",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Abdulrazak Gurnah",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Vicente Aleixandre",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Aleksandr Soljenitsin",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ivo Andrić",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Annie Ernaux",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Miguel Angel Asturias",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Samuel Beckett",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jacinto Benavente",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Bertrand Russell",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Björnstjerne Björnson",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Heinrich Böll",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Camilo José Cela",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Albert Camus",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Elias Canetti",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Carl Spitteler",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Winston Churchill",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Czesław Miłosz",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Grazia Deledda",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Derek Walcott",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Bob Dylan",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Elfriede Jelinek",
    "category": "tarihi_kisiler"
  },
  {
    "name": "T. S. Eliot",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Erik Axel Karlfeldt",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Eugene O'Neill",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Eugenio Montale",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Eyvind Johnson",
    "category": "tarihi_kisiler"
  },
  {
    "name": "William Faulkner",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Dario Fo",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Anatole France",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Gao Xingjian",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Roger Martin du Gard",
    "category": "tarihi_kisiler"
  },
  {
    "name": "George Bernard Shaw",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Gerhart Hauptmann",
    "category": "tarihi_kisiler"
  },
  {
    "name": "André Gide",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Giosue Carducci",
    "category": "tarihi_kisiler"
  },
  {
    "name": "William Golding",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Nadine Gordimer",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Günter Grass",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Halldór Laxness",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Knut Hamsun",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Han Kang",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Harold Pinter",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Harry Martinson",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Seamus Heaney",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ernest Hemingway",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Henri Bergson",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Herta Müller",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Hermann Hesse",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Imre Kertész",
    "category": "tarihi_kisiler"
  },
  {
    "name": "İvan Bunin",
    "category": "tarihi_kisiler"
  },
  {
    "name": "J. M. Coetzee",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jaroslav Seifert",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jean-Marie Gustave Le Clézio",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Juan Ramón Jiménez",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Johannes Vilhelm Jensen",
    "category": "tarihi_kisiler"
  },
  {
    "name": "John Galsworthy",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jon Fosse",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jose Echegaray",
    "category": "tarihi_kisiler"
  },
  {
    "name": "José Saramago",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Joseph Brodsky",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Karl Adolph Gjellerup",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Kazuo Ishiguro",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Kenzaburo Oe",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Rudyard Kipling",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Selma Lagerlöf",
    "category": "tarihi_kisiler"
  },
  {
    "name": "László Krasznahorkai",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Doris Lessing",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Sinclair Lewis",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Louise Glück",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Luigi Pirandello",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Maurice Maeterlinck",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Mario Vargas Llosa",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Gabriel García Márquez",
    "category": "tarihi_kisiler"
  },
  {
    "name": "François Mauriac",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Frederic Mistral",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Gabriela Mistral",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Mo Yan",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Theodor Mommsen",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Alice Munro",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Necib Mahfuz",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Pablo Neruda",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Odisseus Elitis",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Orhan Pamuk",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Pär Lagerkvist",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Boris Pasternak",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Patrick Modiano",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Patrick White",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Paul Heyse",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Octavio Paz",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Pearl S. Buck",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Peter Handke",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Henrik Pontoppidan",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Salvatore Quasimodo",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Władysław Reymont",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Romain Rolland",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Rudolf Christoph Eucken",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Nelly Sachs",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Saint-John Perse",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jean-Paul Sartre",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Saul Bellow",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Shmuel Yosef Agnon",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Henryk Sienkiewicz",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Frans Eemil Sillanpää",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Claude Simon",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Isaac Bashevis Singer",
    "category": "tarihi_kisiler"
  },
  {
    "name": "John Steinbeck",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Sully Prudhomme",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Svetlana Aleksiyeviç",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Wislawa Szymborska",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Mihail Şolohov",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Rabindranath Tagore",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Thomas Mann",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Tomas Tranströmer",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Toni Morrison",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Uyandırılmış Toprak",
    "category": "tarihi_kisiler"
  },
  {
    "name": "V. S. Naipaul",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Verner von Heidenstam",
    "category": "tarihi_kisiler"
  },
  {
    "name": "William Butler Yeats",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Wole Soyinka",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Yasunari Kavabata",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Yorgos Seferis",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Annibale Caccavello",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Filippo Brunelleschi",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Giorgio Vasari",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Giovanni Antonio Amadeo",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Urs Graf",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Francesco Laurana",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Marcantonio Raimondi",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Matteo di Giovanni",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Michelangelo",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Prospero Spani",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Bülent Arel",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ana-Maria Avram",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Philippe Boesmans",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Bruno Coulais",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Don Shirley",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ekrem Zeki Ün",
    "category": "tarihi_kisiler"
  },
  {
    "name": "George Enescu",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Eugen Doga",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Giuseppe Torelli",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Marvin Hamlisch",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Gustav Holst",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Isaac de Camondo",
    "category": "tarihi_kisiler"
  },
  {
    "name": "John Williams",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Mehmet Ali Bey",
    "category": "tarihi_kisiler"
  },
  {
    "name": "María Luisa Ozaita",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Peer Gynt",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Miklós Rózsa",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Spiridon Samaras",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Stefan Pohlit",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Tomaso Albinoni",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Yiruma",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Albertus Magnus",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Karl-Otto Apel",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Arnold Gehlen",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Arnold Ruge",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Bruno Bauer",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Alexander Gottlieb Baumgarten",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Walter Benjamin",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jakob Böhme",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Carl Friedrich von Weizsäcker",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Carl Gustav Hempel",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Paul Henri Thiry d'Holbach",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Wilhelm Dilthey",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Din Felsefesi Üzerine Dersler",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Hoimar von Ditfurth",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Eduard Bernstein",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Friedrich Engels",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Erich Fromm",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ernst von Aster",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Eugen Dühring",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ferdinand Fellmann",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ludwig Andreas Feuerbach",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Johann Gottlieb Fichte",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Franz Brentano",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Franz Xaver von Baader",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Fredrich Fröbel",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Friedrich Albert Lange",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Friedrich Meinecke",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Friedrich Schelling",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Friedrich Schiller",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Georg Jellinek",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Johann Wolfgang von Goethe",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Gottfried Leibniz",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Gottlob Frege",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jürgen Habermas",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Hans Freyer",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Hans Reichenbach",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Georg Wilhelm Friedrich Hegel",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Heinz Heimsoeth",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Johann Gottfried Herder",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Hermann Conring",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Hermann Samuel Reimarus",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Paul Hoyningen-Huene",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Alexander von Humboldt",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Wilhelm von Humboldt",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Edmund Husserl",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Immanuel Kant",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Johann Friedrich Herbart",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Joseph Dietzgen",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ernst Jünger",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Karl Daub",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Karl Jaspers",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Karl Joel",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Karl Korsch",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Karl Kautsky",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ursula Klein",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ferdinand Lassalle",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Leo Kofler",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Gotthold Ephraim Lessing",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ludwig Büchner",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Herbert Marcuse",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Karl Marx",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Max Beer",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Max Horkheimer",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Meister Eckhart",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Nicolai Hartmann",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Oskar Negt",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Otfried Höffe",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Philipp Mainländer",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Samuel von Pufendorf",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Richard Avenarius",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Rüdiger Safranski",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Saint Victorlu Hugh",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Saksonyalı Albert",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Max Ferdinand Scheler",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Friedrich Schleiermacher",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Moritz Schlick",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Arthur Schopenhauer",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Oswald Spengler",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Edith Stein",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Max Stirner",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Theodor W. Adorno",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ulrich von Hutten",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Pierre Abélard",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Miguel Abensour",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Alain Badiou",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Antoine Augustin Cournot",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Antoine Destutt de Tracy",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Auvergneli William",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Georges Bataille",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Pierre Bayle",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Bernard",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Pierre Bourdieu",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Émile Boutroux",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Lucien Braun",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Étienne Cabet",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Charles Bernard Renouvier",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Charles Fourier",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Christian Bonaud",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Henry Corbin",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Daniel Bensaïd",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Guy Debord",
    "category": "tarihi_kisiler"
  },
  {
    "name": "René Descartes",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Denis Diderot",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Emmanuel Mounier",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Frantz Fanon",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Bernard le Bovier de Fontenelle",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Francisque Bouillier",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Fulcanelli",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Gaston Bachelard",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Georges Politzer",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Sophie Germain",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Gustave Le Bon",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jacques-André Naigeon",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jean Bodin",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jean Buridan",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jean le Rond d'Alembert",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jean-François Lyotard",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jean-Luc Nancy",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Joseph de Maistre",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jules Lachelier",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Julia Kristeva",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Julien Offray de La Mettrie",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Etienne de La Boétie",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Didier Lapeyronnie",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Émile Littré",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Louis Althusser",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Louis Claude de Saint-Martin",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Maine de Biran",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Sylvain Maréchal",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jacques Maritain",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Marquis de Condorcet",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Pierre Louis Maupertuis",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Maurice Clavel",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Maurice Merleau-Ponty",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jean Meslier",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Michel de Certeau",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Monique Wittig",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Michel de Montaigne",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Edgar Morin",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Nicholas Malebranche",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Blaise Pascal",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Paul Janet",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Charles Péguy",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Pierre Duhem",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Pierre Gassendi",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Pierre Leroux",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Pierre-Joseph Proudhon",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Rémi Brague",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Renaud Barbaras",
    "category": "tarihi_kisiler"
  },
  {
    "name": "René Guénon",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Roland Barthes",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Roscelinus",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Jean-Jacques Rousseau",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Sarah Kofman",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Lucien Sève",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Simone de Beauvoir",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Julius Sezar Skaliger",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Georges Vacher de Lapouge",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Vincent Cespedes",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Voltaire",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Astronom",
    "category": "tarihi_kisiler"
  },
  {
    "name": "Ayı Humphrey",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Beagle Boys",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Bucky Bug",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Chip 'n' Dale",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Cin, Can ve Cem",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Clarabelle Cow",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Daisy Duck",
    "category": "cizgi_karakterler"
  },
  {
    "name": "John D. Rockerduck",
    "category": "cizgi_karakterler"
  },
  {
    "name": "José Carioca",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Justin Russo",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Ludwig Von Drake",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Magica De Spell",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Max Goof",
    "category": "cizgi_karakterler"
  },
  {
    "name": "McDuck Klanı",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Paperinik",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Arsız Daffy",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Bosko",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Buddy",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Elmer Fudd",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Hızlı Gonzales",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Lola Bunny",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Pepé Le Pew",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Porky Pig",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Tazmanya Canavarı",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Wile E. Coyote ve Road Runner",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Yosemite Sam",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Black Widow",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Blade",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Carol Danvers",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Daredevil",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Darren Cross",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Deadpool",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Demir Adam",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Doktor Octopus",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Doktor Strange",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Dormammu",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Dum Dum Dugan",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Eternals",
    "category": "cizgi_karakterler"
  },
  {
    "name": "F.R.I.D.A.Y.",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Fantastik Dörtlü",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Leo Fitz",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Howard Stark",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Hulk",
    "category": "cizgi_karakterler"
  },
  {
    "name": "J. Jonah Jameson",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Jane Foster",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Jim Morita",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Joan The Mouse",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kandöken",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kingpin",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Mary Jane Watson",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Melinda May",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Morgan Stark",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Mr. Bumpo",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Ms. Marvel",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Mystique",
    "category": "cizgi_karakterler"
  },
  {
    "name": "New Goblin",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Nick Fury",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Nyx",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Optimus Prime",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Örümcek Adam",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Para-Man",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Punisher",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Rogue",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Savaş Makinesi",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Skaar",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Storm",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Şahin",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Thor",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Tony Stark",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Turk Barrett",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Ulik",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Uzay Şövalyesi Rom",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Üç Savaşçılar",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Wolverine",
    "category": "cizgi_karakterler"
  },
  {
    "name": "X-Men",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Ymir",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Zuri",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Aquaman",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Atom",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Batgirl",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Batman",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Black Canary",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Captain Marvel",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Cassie Cage",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Doomsday",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Eobard Thawne",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Flash",
    "category": "cizgi_karakterler"
  },
  {
    "name": "General Zod",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Green Lantern",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Harvey Bullock",
    "category": "cizgi_karakterler"
  },
  {
    "name": "James Gordon",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Jason Todd",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kedi Kadın",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Lana Lang",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Lex Luthor",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Lois Lane",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Nightwing",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Superman",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Tim Drake",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Vartox",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Wonder Woman",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Zatanna",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Zatara",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Zehirli Sarmaşık",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Süper kahraman",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Freakazoid!",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Gözcüler",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Hellboy",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kâinatın Hâkimleri",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Pırılkız",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Powerpuff Girls",
    "category": "cizgi_karakterler"
  },
  {
    "name": "The Return of Doctor Mysterio",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Süper kahraman romanları",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Spawn",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Abraham Van Helsing",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Bishōjo",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Bishōnen",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Eren Yeager",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Jun Misugi",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Levi Ackerman",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Light Yagami",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Metal Sonic",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Ryuga",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Soft butch",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Spike Spiegel",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Amy Rose",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Armadillo Mighty",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Chao Cheese",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Desmond Miles",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Druuna",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kyle Katarn",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kirpi Nazo",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kirpi Silver",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Prenses Sally Acorn",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Rivyalı Geralt",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Tavşan Cream",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Uçan Sincap Ray",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Amanvermez Avni",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Arthur Hastings",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Baker Sokağı Çetesi",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Başkomiser Battle",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Başmüfettiş Japp",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Bukalemun Espio",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Dedektif Fix",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Irene Adler",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Jack Bauer",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Jesse Stone",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Hans Landa",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Dedektif Lestrade",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Luke Cage",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Madam Vastra, Jenny Flint ve Strax",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Martin Mystère",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Mayk Hammer",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Miss Marple",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Moon Knight",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Mycroft Holmes",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Myron Bolitar",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Nick Raider",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Dipper Pines",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Hercule Poirot",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Question",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Robin",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Saga Norén",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Tommy ve Tuppence",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Velma Dinkley",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Dr. Watson",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Aang",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Aladdin",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Alex Russo",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Amergin",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Apollon",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Arnemetia",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Artemis",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Artio",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Hao Asakura",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Athena",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Avcı Herne",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Aveta",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Balder",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Bloom",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Bonnie Bennett",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Brigid",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Búri",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Büyüfiks",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Chao Chocola",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Dagda",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Dellingr",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Demeter",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Demirci Völund",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Denizci Sinbad",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Cedric Diggory",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Doktor",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kont Drakula",
    "category": "cizgi_karakterler"
  },
  {
    "name": "DreamWorks Ejderhalar",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Efsuncu Amora",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Ekidne Knuckles",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Eragon",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Faust",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Freyja",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Glaistig",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Hebe",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Heimdallr",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Herakles",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Hermes",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Hermóðr",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Hestia",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Hogwarts kadrosu",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Iðunn",
    "category": "cizgi_karakterler"
  },
  {
    "name": "İmhotep",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kar Kraliçesi",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Karlar Ülkesi",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Karlar Ülkesi 2",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Karlar Ülkesi 3",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Katara",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kharis",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kırk Haramiler",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kızıl Cadı",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kirke",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kirpi Sonic",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Korkut Ata",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kutsanmış Bran",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Ler",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Light Gaia",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Llyr",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Lóðurr",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Loki",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Neville Longbottom",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Lugh",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Remus Lupin",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Mace Windu",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Minerva McGonagall",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Meili",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Merlin",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Miles \"Tails\" Prower",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Móði ve Magni",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Morgan le Fay",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Nuada",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Odin",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Óðr",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Ogmios",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Oz Büyücüsü",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Prenses Yasemin",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Qui-Gon Jinn",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Radagast",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Segomo",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Shang Tsung",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Sif",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Stephen Strange",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Taranis",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Thjalfi ve Röskva",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Toph Beifong",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Tutatis",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Utgard Loki",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Uther Pendragon",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Väinämöinen",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Vili ve Vé",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Fred ve George Weasley",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Ginny Weasley",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Wong",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Yarasa Rouge",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Yoda",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Zeus",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Zia Raşit",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Zuko",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kurgusal karakter",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Arif Işık",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Büyük Amiral Thrawn",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Candyman",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Creeper",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Desdemona",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Harry Morgan",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Jack Twist",
    "category": "cizgi_karakterler"
  },
  {
    "name": "James Doakes",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Jin Kazama",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Karınca Adam",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Leo Valdez",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Malcolm",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Matt Cordell",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Maurice",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Michael De Santa",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Noddy",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Palyaço Art",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Pinhead",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Proximus Sezar",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Pugsley Addams",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Ramona Flowers",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Roxane",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Sezar",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Tall Man",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Thénardierler",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Tommy Shelby",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Twilight Sparkle",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Tywin Lannister",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Victor Crowley",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Victor Trevor",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Abdul Alhazred",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Alığ Han",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Alp Er Tunga",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Alpamış",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Altınay",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Aragorn",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Astinus",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Ay Kağan",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Azmanlar",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Banu Çiçek",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Basat",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Battal Gazi",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Bayındır Han",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Begin Oğlu Emren",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Beowulf",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Bernie Rhodenbarr",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Beyaz Tavşan",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Blinky Bill",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Bozkurt",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Bremen Mızıkacıları",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Carter Kane",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Chemosh",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Chibiabos",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Chingachook",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Conseil",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Cormoran",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Cuchulainn",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Culhwch",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Cyrus Smith",
    "category": "cizgi_karakterler"
  },
  {
    "name": "D'Artagnan",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Dağ Han",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Dalamar",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Daleli Allan",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Deli Dumrul",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Dodo",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Don Kişot",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Dr. Jekyll ve Mr. Hyde",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Eldarion",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Erik",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Fatih Robur",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Fistandantilus",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Flint Fireforge",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Frankenstein'ın canavarı",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Fritz",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Galahad",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Gargantua",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Gargantua ile Pantagruel",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Gawain",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Gılgamış",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Gilean",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Gilles de Rais",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Grandgousier",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Gregor Samsa",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Grendel",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Griffin",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Lemuel Gulliver",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Habbakuk",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Haldir",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Hansel ve Gretel",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Hanuman",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Hiawatha",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Hiddukel",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Huban Arığ",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Hueil mab Caw",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Humpty Dumpty",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Ichabod Crane",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Ivanhoe",
    "category": "cizgi_karakterler"
  },
  {
    "name": "İason",
    "category": "cizgi_karakterler"
  },
  {
    "name": "İlmarinen",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kaptan Blood",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kaptan Flint",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kaptan Hook",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kaptan Nemo",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kaptan Smollet",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kel Mahmut",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kertenkele Bill",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Keşiş Tuck",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kıvırcık Çalıdibi",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kızıl Kral",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kintarō",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kiri-Jolith",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kitiara Uth Matar",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kör Pew",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Krabat",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kral Arthur",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Küçük John",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Külkedisi",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kür Şad",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Lady Crysania",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Laurana Kanan",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Dr. Livesey",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Lord Glenarvan",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Lord Soth",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Maedhros",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Magnus Chase",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Magwa",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Majere",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Raistlin Majere",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Meg McCaffrey",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Mishakal",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Mordred",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Mudjekeevis",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Baron Münchausen",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Natty Bumppo",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Ned Land",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Nehiryeli",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Nottingham Şerifi",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Oğuz Kağan",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Orodreth",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Paddington Ayısı",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Paladine",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Pamuk Prenses ve Yedi Cüceler",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Pantagruel",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Panurge",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Percy Jackson",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Picrochole",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Porthos",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Profesör Aronnax",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Profesör Challenger",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Profesör Moriarty",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Reorx",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Scarlet Pimpernel",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Sigurd",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Smaug",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Lemony Snicket",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Squire Trelawney",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Geronimo Stilton",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Sturm Brightblade",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Şapkacı",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Takhisis",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Tanin Majere",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Tanis Yarımelf",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Tasslehoff Burrfoot",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Tepegöz",
    "category": "cizgi_karakterler"
  },
  {
    "name": "The Yellow Kid",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Theseus",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Thingol",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Tika Waylan",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Tom Ayrton",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Tristan",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Tweedledum ve Tweedledee",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Uncas",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Uzun İhsan Efendi",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Vána",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Walt Stone",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Will Scarlet",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Yürek Oğlanı",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Şatarupa",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Thersites",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Can Manay",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Laurent LeClaire",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Piyer Bezuhov",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Rodion Romanoviç Raskolnikov",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Rufus Scrimgeour",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Kilgore Trout",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Vasily Kuragin",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Çirkin Ördek Yavrusu",
    "category": "cizgi_karakterler"
  },
  {
    "name": "Anıl Abanoz",
    "category": "sporcular"
  },
  {
    "name": "Abbas Elkatipzade",
    "category": "sporcular"
  },
  {
    "name": "Eymen Abdülaziz",
    "category": "sporcular"
  },
  {
    "name": "Abdi Aktaş",
    "category": "sporcular"
  },
  {
    "name": "Abdulaziz Demircan",
    "category": "sporcular"
  },
  {
    "name": "Abdulaziz Solmaz",
    "category": "sporcular"
  },
  {
    "name": "Abdulhamit Yıldız",
    "category": "sporcular"
  },
  {
    "name": "Abdulkadir Kuzey",
    "category": "sporcular"
  },
  {
    "name": "Abdulkadir Özdemir",
    "category": "sporcular"
  },
  {
    "name": "Abdulkadir Parmak",
    "category": "sporcular"
  },
  {
    "name": "Abdulkadir Sünger",
    "category": "sporcular"
  },
  {
    "name": "Abdulkadir Şakşak",
    "category": "sporcular"
  },
  {
    "name": "Abdullah Avcı",
    "category": "sporcular"
  },
  {
    "name": "Abdullah Aydın",
    "category": "sporcular"
  },
  {
    "name": "Abdullah Balıkuv",
    "category": "sporcular"
  },
  {
    "name": "Abdullah Boz",
    "category": "sporcular"
  },
  {
    "name": "Abdullah Çuhacıoğlu",
    "category": "sporcular"
  },
  {
    "name": "Abdullah Şahindere",
    "category": "sporcular"
  },
  {
    "name": "Abdullah Topluoğlu",
    "category": "sporcular"
  },
  {
    "name": "Abdullah Ünal",
    "category": "sporcular"
  },
  {
    "name": "Abdullah Yiğiter",
    "category": "sporcular"
  },
  {
    "name": "Abdulsamed Damlu",
    "category": "sporcular"
  },
  {
    "name": "Abdurrahim Dursun",
    "category": "sporcular"
  },
  {
    "name": "Abdurrahman Canlı",
    "category": "sporcular"
  },
  {
    "name": "Abdurrahman Dereli",
    "category": "sporcular"
  },
  {
    "name": "Abdurrahman Üresin",
    "category": "sporcular"
  },
  {
    "name": "Abdülkadir Akyıldız",
    "category": "sporcular"
  },
  {
    "name": "Abdülkadir Arun",
    "category": "sporcular"
  },
  {
    "name": "Abdülkadir Çelik",
    "category": "sporcular"
  },
  {
    "name": "Abdülkadir Demirci",
    "category": "sporcular"
  },
  {
    "name": "Abdülkadir Ömür",
    "category": "sporcular"
  },
  {
    "name": "Abdürrezzak Tığ",
    "category": "sporcular"
  },
  {
    "name": "Abidin Akmanol",
    "category": "sporcular"
  },
  {
    "name": "Tolgahan Acar",
    "category": "sporcular"
  },
  {
    "name": "Tunay Acar",
    "category": "sporcular"
  },
  {
    "name": "Sadullah Acele",
    "category": "sporcular"
  },
  {
    "name": "Akın Açık",
    "category": "sporcular"
  },
  {
    "name": "Merthan Açıl",
    "category": "sporcular"
  },
  {
    "name": "Ada İbik",
    "category": "sporcular"
  },
  {
    "name": "Ertan Adatepe",
    "category": "sporcular"
  },
  {
    "name": "Adem Aydın",
    "category": "sporcular"
  },
  {
    "name": "Adem Çak",
    "category": "sporcular"
  },
  {
    "name": "Adem Çalık",
    "category": "sporcular"
  },
  {
    "name": "Adem Gezici",
    "category": "sporcular"
  },
  {
    "name": "Adem Gökçe",
    "category": "sporcular"
  },
  {
    "name": "Adem Güven",
    "category": "sporcular"
  },
  {
    "name": "Adem Kaya",
    "category": "sporcular"
  },
  {
    "name": "Adem Kurukaya",
    "category": "sporcular"
  },
  {
    "name": "Adem Metin Türk",
    "category": "sporcular"
  },
  {
    "name": "Adem Neboğlu",
    "category": "sporcular"
  },
  {
    "name": "Adem Sağlam",
    "category": "sporcular"
  },
  {
    "name": "Adem Sarı",
    "category": "sporcular"
  },
  {
    "name": "Adem Tula",
    "category": "sporcular"
  },
  {
    "name": "Adem Yeşilyurt",
    "category": "sporcular"
  },
  {
    "name": "Adil Akyüz",
    "category": "sporcular"
  },
  {
    "name": "Adil Demirbağ",
    "category": "sporcular"
  },
  {
    "name": "Olcan Adın",
    "category": "sporcular"
  },
  {
    "name": "Adnan Baytar",
    "category": "sporcular"
  },
  {
    "name": "Adnan Çavdar",
    "category": "sporcular"
  },
  {
    "name": "Adnan Erkan",
    "category": "sporcular"
  },
  {
    "name": "Adnan Esen",
    "category": "sporcular"
  },
  {
    "name": "Adnan İbrahim Pirioğlu",
    "category": "sporcular"
  },
  {
    "name": "Adnan İncirmen",
    "category": "sporcular"
  },
  {
    "name": "Adnan Karahan",
    "category": "sporcular"
  },
  {
    "name": "Adnan Örnek",
    "category": "sporcular"
  },
  {
    "name": "Adnan Sezgin",
    "category": "sporcular"
  },
  {
    "name": "Adnan Süvari",
    "category": "sporcular"
  },
  {
    "name": "Adnan Şentürk",
    "category": "sporcular"
  },
  {
    "name": "Emrecan Afacanoğlu",
    "category": "sporcular"
  },
  {
    "name": "Berkan Afşarlı",
    "category": "sporcular"
  },
  {
    "name": "Halil Ağan",
    "category": "sporcular"
  },
  {
    "name": "Ahmed Ildız",
    "category": "sporcular"
  },
  {
    "name": "Ahmed Kutucu",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Aras",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Arda Tuzcu",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Arı",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Arslaner",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Asena",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Aslan",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Bahçıvan",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Bal",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Börtücene",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Bulut",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Burgaz",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Canbaz",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Çağıran",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Çalık",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Çelikhan",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Dereli",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Devret",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Engin",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Erol",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Gülay",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Hacıhamzaoğlu",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Karademir",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Karlıklı",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Keloğlu",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Kılıçarslan",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Kurt",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Mercan",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Nuri Çelik",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Oğuz",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Özacar",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Robenson",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Sabri Fener",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Sağat",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Sağlam",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Suat Özyazıcı",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Suphi Evke",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Şahin",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Taşyürek",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Yakak",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Yılmaz",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Yılmazer",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Ziya Genç",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Ziya Yüce",
    "category": "sporcular"
  },
  {
    "name": "Ahmetcan Kaplan",
    "category": "sporcular"
  },
  {
    "name": "Ahmethan Köse",
    "category": "sporcular"
  },
  {
    "name": "Aytaç Ak",
    "category": "sporcular"
  },
  {
    "name": "Metin Akan",
    "category": "sporcular"
  },
  {
    "name": "Nihat Akbay",
    "category": "sporcular"
  },
  {
    "name": "Furkan Akbulut",
    "category": "sporcular"
  },
  {
    "name": "Ali Akburç",
    "category": "sporcular"
  },
  {
    "name": "Önder Akdağ",
    "category": "sporcular"
  },
  {
    "name": "Erdal Akdarı",
    "category": "sporcular"
  },
  {
    "name": "Uğur Akdemir",
    "category": "sporcular"
  },
  {
    "name": "Burak Akdiş",
    "category": "sporcular"
  },
  {
    "name": "İsa Akgöl",
    "category": "sporcular"
  },
  {
    "name": "Aykut Akgün",
    "category": "sporcular"
  },
  {
    "name": "Mehmet Akgün",
    "category": "sporcular"
  },
  {
    "name": "Oğuzhan Akgün",
    "category": "sporcular"
  },
  {
    "name": "Akhan Karakurt",
    "category": "sporcular"
  },
  {
    "name": "Akın Akman",
    "category": "sporcular"
  },
  {
    "name": "Akın Alkan",
    "category": "sporcular"
  },
  {
    "name": "Akın Beyazoğlu",
    "category": "sporcular"
  },
  {
    "name": "Akın Sağlam",
    "category": "sporcular"
  },
  {
    "name": "Akın Sinan Dağdelen",
    "category": "sporcular"
  },
  {
    "name": "Akın Vardar",
    "category": "sporcular"
  },
  {
    "name": "Akif Başaran",
    "category": "sporcular"
  },
  {
    "name": "İbrahim Akın",
    "category": "sporcular"
  },
  {
    "name": "Murat Akın",
    "category": "sporcular"
  },
  {
    "name": "Göksel Akıncı",
    "category": "sporcular"
  },
  {
    "name": "Aksel Aktaş",
    "category": "sporcular"
  },
  {
    "name": "Gürsel Aksel",
    "category": "sporcular"
  },
  {
    "name": "Oğuz Aksoy",
    "category": "sporcular"
  },
  {
    "name": "Cafercan Aksu",
    "category": "sporcular"
  },
  {
    "name": "Aktan Kutlu",
    "category": "sporcular"
  },
  {
    "name": "Metin Aktaş",
    "category": "sporcular"
  },
  {
    "name": "Orhan Aktaş",
    "category": "sporcular"
  },
  {
    "name": "Fatih Akyel",
    "category": "sporcular"
  },
  {
    "name": "Lokman Akyıldız",
    "category": "sporcular"
  },
  {
    "name": "Fahri Akyol",
    "category": "sporcular"
  },
  {
    "name": "Serhat Akyüz",
    "category": "sporcular"
  },
  {
    "name": "Kerem Can Akyüz",
    "category": "sporcular"
  },
  {
    "name": "Mehmet Al",
    "category": "sporcular"
  },
  {
    "name": "Alaaddin Okumuş",
    "category": "sporcular"
  },
  {
    "name": "Alaattin Baydar",
    "category": "sporcular"
  },
  {
    "name": "Emin Aladağ",
    "category": "sporcular"
  },
  {
    "name": "Alaettin Çiçek",
    "category": "sporcular"
  },
  {
    "name": "Alaettin Ekici",
    "category": "sporcular"
  },
  {
    "name": "Sinan Alaağaç",
    "category": "sporcular"
  },
  {
    "name": "Eren Albayrak",
    "category": "sporcular"
  },
  {
    "name": "Erhan Albayrak",
    "category": "sporcular"
  },
  {
    "name": "Mikail Albayrak",
    "category": "sporcular"
  },
  {
    "name": "Alberk Koç",
    "category": "sporcular"
  },
  {
    "name": "Aldoğan Argon",
    "category": "sporcular"
  },
  {
    "name": "Aleko Yordan",
    "category": "sporcular"
  },
  {
    "name": "Göksu Alhas",
    "category": "sporcular"
  },
  {
    "name": "Ali Akdeniz",
    "category": "sporcular"
  },
  {
    "name": "Ali Akman",
    "category": "sporcular"
  },
  {
    "name": "Ali Bayraktar",
    "category": "sporcular"
  },
  {
    "name": "Ali Beratlıgil",
    "category": "sporcular"
  },
  {
    "name": "Ali Beykoz",
    "category": "sporcular"
  },
  {
    "name": "Ali Bilgin",
    "category": "sporcular"
  },
  {
    "name": "Ali Çamdalı",
    "category": "sporcular"
  },
  {
    "name": "Ali Çanakçı",
    "category": "sporcular"
  },
  {
    "name": "Ali Çebi",
    "category": "sporcular"
  },
  {
    "name": "Ali Çoban",
    "category": "sporcular"
  },
  {
    "name": "Ali Çobanoğlu",
    "category": "sporcular"
  },
  {
    "name": "Ali Değer",
    "category": "sporcular"
  },
  {
    "name": "Ali Emre Yanar",
    "category": "sporcular"
  },
  {
    "name": "Ali Eren Beşerler",
    "category": "sporcular"
  },
  {
    "name": "Ali Eren İyican",
    "category": "sporcular"
  },
  {
    "name": "Ali Filibeli",
    "category": "sporcular"
  },
  {
    "name": "Ali Gençay",
    "category": "sporcular"
  },
  {
    "name": "Ali Gültiken",
    "category": "sporcular"
  },
  {
    "name": "Ali Günçar",
    "category": "sporcular"
  },
  {
    "name": "Ali Güneş",
    "category": "sporcular"
  },
  {
    "name": "Ali Güzeldal",
    "category": "sporcular"
  },
  {
    "name": "Ali Habeşoğlu",
    "category": "sporcular"
  },
  {
    "name": "Ali Helvacı",
    "category": "sporcular"
  },
  {
    "name": "Ali İhsan Karayiğit",
    "category": "sporcular"
  },
  {
    "name": "Ali İhsan Okçuoğlu",
    "category": "sporcular"
  },
  {
    "name": "Ali Kaan Güneren",
    "category": "sporcular"
  },
  {
    "name": "Ali Kandil",
    "category": "sporcular"
  },
  {
    "name": "Ali Kemal Bakoğlu",
    "category": "sporcular"
  },
  {
    "name": "Ali Kemal Denizci",
    "category": "sporcular"
  },
  {
    "name": "Ali Kemal Karabal",
    "category": "sporcular"
  },
  {
    "name": "Ali Keten",
    "category": "sporcular"
  },
  {
    "name": "Ali Kılıç",
    "category": "sporcular"
  },
  {
    "name": "Ali Kireş",
    "category": "sporcular"
  },
  {
    "name": "Ali Köksal",
    "category": "sporcular"
  },
  {
    "name": "Ali Kuçik",
    "category": "sporcular"
  },
  {
    "name": "Ali Kulaksız",
    "category": "sporcular"
  },
  {
    "name": "Ali Nail Durmuş",
    "category": "sporcular"
  },
  {
    "name": "Ali Nihat Çınar",
    "category": "sporcular"
  },
  {
    "name": "Ali Osman Antepli",
    "category": "sporcular"
  },
  {
    "name": "Ali Osman Çınar",
    "category": "sporcular"
  },
  {
    "name": "Ali Öztürk",
    "category": "sporcular"
  },
  {
    "name": "Ali Rıza Şenol",
    "category": "sporcular"
  },
  {
    "name": "Ali Rıza Tansu",
    "category": "sporcular"
  },
  {
    "name": "Ali Rıza Turan",
    "category": "sporcular"
  },
  {
    "name": "Ali Sami Yen",
    "category": "sporcular"
  },
  {
    "name": "Ali Serçek",
    "category": "sporcular"
  },
  {
    "name": "Ali Soydan",
    "category": "sporcular"
  },
  {
    "name": "Ali Sümer",
    "category": "sporcular"
  },
  {
    "name": "Ali Şahin Yılmaz",
    "category": "sporcular"
  },
  {
    "name": "Ali Şen Kandil",
    "category": "sporcular"
  },
  {
    "name": "Ali Tandoğan",
    "category": "sporcular"
  },
  {
    "name": "Ali Turan",
    "category": "sporcular"
  },
  {
    "name": "Ali Turap Bülbül",
    "category": "sporcular"
  },
  {
    "name": "Ali Türkan",
    "category": "sporcular"
  },
  {
    "name": "Ali Uğur Özen",
    "category": "sporcular"
  },
  {
    "name": "Ali Yalçın",
    "category": "sporcular"
  },
  {
    "name": "Ali Yaşar",
    "category": "sporcular"
  },
  {
    "name": "Ali Yavuz Kol",
    "category": "sporcular"
  },
  {
    "name": "Ali Yüksel Usta",
    "category": "sporcular"
  },
  {
    "name": "Ali Zengin",
    "category": "sporcular"
  },
  {
    "name": "Ali Zorlu",
    "category": "sporcular"
  },
  {
    "name": "Alican Karadağ",
    "category": "sporcular"
  },
  {
    "name": "Alican Özfesli",
    "category": "sporcular"
  },
  {
    "name": "Alican Tez",
    "category": "sporcular"
  },
  {
    "name": "Alihan Kubalas",
    "category": "sporcular"
  },
  {
    "name": "Alim Koyun",
    "category": "sporcular"
  },
  {
    "name": "Alim Öztürk",
    "category": "sporcular"
  },
  {
    "name": "Alioum Boukar",
    "category": "sporcular"
  },
  {
    "name": "Adem Alkaşi",
    "category": "sporcular"
  },
  {
    "name": "Bülent Alkılıç",
    "category": "sporcular"
  },
  {
    "name": "Cenk Ahmet Alkılıç",
    "category": "sporcular"
  },
  {
    "name": "Álmos Kaan Kalafat",
    "category": "sporcular"
  },
  {
    "name": "Alp Arda",
    "category": "sporcular"
  },
  {
    "name": "Alp Sümeralp",
    "category": "sporcular"
  },
  {
    "name": "Alparslan Erdem",
    "category": "sporcular"
  },
  {
    "name": "Alpaslan Eradlı",
    "category": "sporcular"
  },
  {
    "name": "Alpaslan Öztürk",
    "category": "sporcular"
  },
  {
    "name": "Alpay Çelebi",
    "category": "sporcular"
  },
  {
    "name": "Alper Boğuşlu",
    "category": "sporcular"
  },
  {
    "name": "Alper Efe Pazar",
    "category": "sporcular"
  },
  {
    "name": "Arzu Karabulut",
    "category": "sporcular"
  },
  {
    "name": "Arzu Sema Canbul",
    "category": "sporcular"
  },
  {
    "name": "Aslı Canan Sabırlı",
    "category": "sporcular"
  },
  {
    "name": "Aslı Karataş",
    "category": "sporcular"
  },
  {
    "name": "Aybüke Arslan",
    "category": "sporcular"
  },
  {
    "name": "Aycan Yanaç",
    "category": "sporcular"
  },
  {
    "name": "Ayfer Topluoğlu",
    "category": "sporcular"
  },
  {
    "name": "Ayşe Kuru",
    "category": "sporcular"
  },
  {
    "name": "Ayşenur Büyükciğer",
    "category": "sporcular"
  },
  {
    "name": "Bahar Güvenç",
    "category": "sporcular"
  },
  {
    "name": "Bahar Özgüvenç",
    "category": "sporcular"
  },
  {
    "name": "Başak Ersoy",
    "category": "sporcular"
  },
  {
    "name": "Başak İçinözbebek",
    "category": "sporcular"
  },
  {
    "name": "Benan Altıntaş",
    "category": "sporcular"
  },
  {
    "name": "Berivan İçen",
    "category": "sporcular"
  },
  {
    "name": "Berna Yeniçeri",
    "category": "sporcular"
  },
  {
    "name": "Berra Bayraktar",
    "category": "sporcular"
  },
  {
    "name": "Bilge Su Koyun",
    "category": "sporcular"
  },
  {
    "name": "Bilgin Defterli",
    "category": "sporcular"
  },
  {
    "name": "Birgül Sadıkoğlu",
    "category": "sporcular"
  },
  {
    "name": "Busem Şeker",
    "category": "sporcular"
  },
  {
    "name": "Büşra Ahlatcı",
    "category": "sporcular"
  },
  {
    "name": "Büşra Kenet",
    "category": "sporcular"
  },
  {
    "name": "Cansu Nur Kaya",
    "category": "sporcular"
  },
  {
    "name": "Cansu Yağ",
    "category": "sporcular"
  },
  {
    "name": "Ceren Nurlu",
    "category": "sporcular"
  },
  {
    "name": "Ceren Yağcı",
    "category": "sporcular"
  },
  {
    "name": "Çağla Korkmaz",
    "category": "sporcular"
  },
  {
    "name": "Çiğdem Belci",
    "category": "sporcular"
  },
  {
    "name": "Damla Bozyel",
    "category": "sporcular"
  },
  {
    "name": "Demet Bozkurt",
    "category": "sporcular"
  },
  {
    "name": "Derya Arhan",
    "category": "sporcular"
  },
  {
    "name": "Didem Dülber",
    "category": "sporcular"
  },
  {
    "name": "Didem Karagenç",
    "category": "sporcular"
  },
  {
    "name": "Dilan Ağgül",
    "category": "sporcular"
  },
  {
    "name": "Dilara Soley Deli",
    "category": "sporcular"
  },
  {
    "name": "Duygu Erdoğan",
    "category": "sporcular"
  },
  {
    "name": "Ebru Bayraktar",
    "category": "sporcular"
  },
  {
    "name": "Ebru Topçu",
    "category": "sporcular"
  },
  {
    "name": "Ece Tekmen",
    "category": "sporcular"
  },
  {
    "name": "Ece Türkoğlu",
    "category": "sporcular"
  },
  {
    "name": "Ecem Cumert",
    "category": "sporcular"
  },
  {
    "name": "Eda Karataş",
    "category": "sporcular"
  },
  {
    "name": "Elif Keskin",
    "category": "sporcular"
  },
  {
    "name": "Elifenur Karabulut",
    "category": "sporcular"
  },
  {
    "name": "Emine Demir",
    "category": "sporcular"
  },
  {
    "name": "Emine Gümüş",
    "category": "sporcular"
  },
  {
    "name": "Melahat Eryurt",
    "category": "sporcular"
  },
  {
    "name": "Emine Ecem Esen",
    "category": "sporcular"
  },
  {
    "name": "Esra Özkan",
    "category": "sporcular"
  },
  {
    "name": "Esra Sibel Tezkan",
    "category": "sporcular"
  },
  {
    "name": "Eylül Elgalp",
    "category": "sporcular"
  },
  {
    "name": "Ezgi Çağlar",
    "category": "sporcular"
  },
  {
    "name": "Fatma Kara",
    "category": "sporcular"
  },
  {
    "name": "Fatma Şahin",
    "category": "sporcular"
  },
  {
    "name": "Fatma Şakar",
    "category": "sporcular"
  },
  {
    "name": "Fatoş Yıldırım",
    "category": "sporcular"
  },
  {
    "name": "Feride Akgün",
    "category": "sporcular"
  },
  {
    "name": "Filiz Koç",
    "category": "sporcular"
  },
  {
    "name": "Gamze Bezan",
    "category": "sporcular"
  },
  {
    "name": "Gamze Nur Yaman",
    "category": "sporcular"
  },
  {
    "name": "Gizem Yazıcı",
    "category": "sporcular"
  },
  {
    "name": "Göknur Güleryüz",
    "category": "sporcular"
  },
  {
    "name": "Gizem Gönültaş",
    "category": "sporcular"
  },
  {
    "name": "Gülbin Hız",
    "category": "sporcular"
  },
  {
    "name": "Başak Gündoğdu",
    "category": "sporcular"
  },
  {
    "name": "Halle Houssein",
    "category": "sporcular"
  },
  {
    "name": "Hilal Çetinkaya",
    "category": "sporcular"
  },
  {
    "name": "Hümeyra Şanver",
    "category": "sporcular"
  },
  {
    "name": "İlayda Cansu Kara",
    "category": "sporcular"
  },
  {
    "name": "İlayda Civelek",
    "category": "sporcular"
  },
  {
    "name": "İrem Damla Şahin",
    "category": "sporcular"
  },
  {
    "name": "Kader Hançar",
    "category": "sporcular"
  },
  {
    "name": "İpek Kaya",
    "category": "sporcular"
  },
  {
    "name": "Kezban Tağ",
    "category": "sporcular"
  },
  {
    "name": "Lale Orta",
    "category": "sporcular"
  },
  {
    "name": "Esra Manya",
    "category": "sporcular"
  },
  {
    "name": "Medine Erkan",
    "category": "sporcular"
  },
  {
    "name": "Melike Öztürk",
    "category": "sporcular"
  },
  {
    "name": "Melis Özçiğdem",
    "category": "sporcular"
  },
  {
    "name": "Meryem Cennet Çal",
    "category": "sporcular"
  },
  {
    "name": "Meryem Koç",
    "category": "sporcular"
  },
  {
    "name": "Meryem Küçükbirinci",
    "category": "sporcular"
  },
  {
    "name": "Meryem Özyumşak",
    "category": "sporcular"
  },
  {
    "name": "Meryem Yamak",
    "category": "sporcular"
  },
  {
    "name": "Miray Cin",
    "category": "sporcular"
  },
  {
    "name": "Nagehan Akşan",
    "category": "sporcular"
  },
  {
    "name": "Nazlıcan Parlak",
    "category": "sporcular"
  },
  {
    "name": "Nihal Saraç",
    "category": "sporcular"
  },
  {
    "name": "Nihan Su",
    "category": "sporcular"
  },
  {
    "name": "Nihan Üçerler",
    "category": "sporcular"
  },
  {
    "name": "Nurcan Çelik",
    "category": "sporcular"
  },
  {
    "name": "Özlem Başyurt",
    "category": "sporcular"
  },
  {
    "name": "Melike Pekel",
    "category": "sporcular"
  },
  {
    "name": "Pelin Nur Çelebi",
    "category": "sporcular"
  },
  {
    "name": "Peritan Bozdağ",
    "category": "sporcular"
  },
  {
    "name": "Reyhan Şeker",
    "category": "sporcular"
  },
  {
    "name": "Reyhan Yüksekoğlu",
    "category": "sporcular"
  },
  {
    "name": "Rojda Doğan",
    "category": "sporcular"
  },
  {
    "name": "Rojin Polat",
    "category": "sporcular"
  },
  {
    "name": "Safa Merve Nalçacı",
    "category": "sporcular"
  },
  {
    "name": "Seda Nur İncik",
    "category": "sporcular"
  },
  {
    "name": "Sejde Abrahamsson",
    "category": "sporcular"
  },
  {
    "name": "Selda Akgöz",
    "category": "sporcular"
  },
  {
    "name": "Selen Altunkulak",
    "category": "sporcular"
  },
  {
    "name": "Selin Cemal Başdüdükçü",
    "category": "sporcular"
  },
  {
    "name": "Selin Dişli",
    "category": "sporcular"
  },
  {
    "name": "Selin Sivrikaya",
    "category": "sporcular"
  },
  {
    "name": "Selina Çerçi",
    "category": "sporcular"
  },
  {
    "name": "Serenay Aktaş",
    "category": "sporcular"
  },
  {
    "name": "Serenay Öziri",
    "category": "sporcular"
  },
  {
    "name": "Servet Uzunlar",
    "category": "sporcular"
  },
  {
    "name": "Sevgi Çınar",
    "category": "sporcular"
  },
  {
    "name": "Seyhan Gündüz",
    "category": "sporcular"
  },
  {
    "name": "Sibel Nohut",
    "category": "sporcular"
  },
  {
    "name": "Sümeyye Özşahin",
    "category": "sporcular"
  },
  {
    "name": "Şehnaz Dilan",
    "category": "sporcular"
  },
  {
    "name": "Şevval Alpavut",
    "category": "sporcular"
  },
  {
    "name": "Tuğba Karataş",
    "category": "sporcular"
  },
  {
    "name": "Tuğçe Bayındır",
    "category": "sporcular"
  },
  {
    "name": "Ümran Özev",
    "category": "sporcular"
  },
  {
    "name": "Yağmur Uraz",
    "category": "sporcular"
  },
  {
    "name": "Yaşam Göksu",
    "category": "sporcular"
  },
  {
    "name": "Yeliz Açar",
    "category": "sporcular"
  },
  {
    "name": "Adem Bona",
    "category": "sporcular"
  },
  {
    "name": "Adem Ören",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Can Duran",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Düverioğlu",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Gürgen",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Kandemir",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Sarı",
    "category": "sporcular"
  },
  {
    "name": "Şeref Alemdar",
    "category": "sporcular"
  },
  {
    "name": "Ali Işık",
    "category": "sporcular"
  },
  {
    "name": "Ali Limoncuoğlu",
    "category": "sporcular"
  },
  {
    "name": "Ali Tuncer",
    "category": "sporcular"
  },
  {
    "name": "Alican Güney",
    "category": "sporcular"
  },
  {
    "name": "Alihan Deniz Genç",
    "category": "sporcular"
  },
  {
    "name": "Alpay Öztaş",
    "category": "sporcular"
  },
  {
    "name": "Alper Yılmaz",
    "category": "sporcular"
  },
  {
    "name": "Alperen Şengün",
    "category": "sporcular"
  },
  {
    "name": "Altan Dinçer",
    "category": "sporcular"
  },
  {
    "name": "Altan Erol",
    "category": "sporcular"
  },
  {
    "name": "Altar Tunçkol",
    "category": "sporcular"
  },
  {
    "name": "Anıl Alyanak",
    "category": "sporcular"
  },
  {
    "name": "Arca Tülüoğlu",
    "category": "sporcular"
  },
  {
    "name": "Arda Berk Kaya",
    "category": "sporcular"
  },
  {
    "name": "Arda Erdoğan",
    "category": "sporcular"
  },
  {
    "name": "Armağan Asena",
    "category": "sporcular"
  },
  {
    "name": "Hayri Arsebük",
    "category": "sporcular"
  },
  {
    "name": "Asım Pars",
    "category": "sporcular"
  },
  {
    "name": "Ata Kahraman",
    "category": "sporcular"
  },
  {
    "name": "Ata Özbek",
    "category": "sporcular"
  },
  {
    "name": "Atahan Demirtaş",
    "category": "sporcular"
  },
  {
    "name": "Ateş Çubukçu",
    "category": "sporcular"
  },
  {
    "name": "Ayberk Olmaz",
    "category": "sporcular"
  },
  {
    "name": "Aydan Siyavuş",
    "category": "sporcular"
  },
  {
    "name": "Aydın Örs",
    "category": "sporcular"
  },
  {
    "name": "Aydın Uysal",
    "category": "sporcular"
  },
  {
    "name": "Ayduk Koray",
    "category": "sporcular"
  },
  {
    "name": "Aytek Gürkan",
    "category": "sporcular"
  },
  {
    "name": "Aziz Bekir",
    "category": "sporcular"
  },
  {
    "name": "Azizcan Özdemir",
    "category": "sporcular"
  },
  {
    "name": "Barış Ermiş",
    "category": "sporcular"
  },
  {
    "name": "Barış Güney",
    "category": "sporcular"
  },
  {
    "name": "Barış Hersek",
    "category": "sporcular"
  },
  {
    "name": "Barış Küce",
    "category": "sporcular"
  },
  {
    "name": "Barış Özcan",
    "category": "sporcular"
  },
  {
    "name": "Avram Barokas",
    "category": "sporcular"
  },
  {
    "name": "Bartu Encü",
    "category": "sporcular"
  },
  {
    "name": "Battal Durusel",
    "category": "sporcular"
  },
  {
    "name": "Bekir Yarangüme",
    "category": "sporcular"
  },
  {
    "name": "Berk Demir",
    "category": "sporcular"
  },
  {
    "name": "Berk Uğurlu",
    "category": "sporcular"
  },
  {
    "name": "Berkan Durmaz",
    "category": "sporcular"
  },
  {
    "name": "Berkay Candan",
    "category": "sporcular"
  },
  {
    "name": "Berke Aygündüz",
    "category": "sporcular"
  },
  {
    "name": "Berke Büyüktuncel",
    "category": "sporcular"
  },
  {
    "name": "Birkan Batuk",
    "category": "sporcular"
  },
  {
    "name": "Bobby Dixon",
    "category": "sporcular"
  },
  {
    "name": "Bora Hun Paçun",
    "category": "sporcular"
  },
  {
    "name": "Bora Sancar",
    "category": "sporcular"
  },
  {
    "name": "Bora Yaşar",
    "category": "sporcular"
  },
  {
    "name": "Buğra Gacemer",
    "category": "sporcular"
  },
  {
    "name": "Buğrahan Tuncer",
    "category": "sporcular"
  },
  {
    "name": "Burak Bıyıktay",
    "category": "sporcular"
  },
  {
    "name": "Burak Can Yıldızlı",
    "category": "sporcular"
  },
  {
    "name": "Burak Gözeneli",
    "category": "sporcular"
  },
  {
    "name": "Burak Sezgin",
    "category": "sporcular"
  },
  {
    "name": "Burak Yacan Yüksel",
    "category": "sporcular"
  },
  {
    "name": "Ömer Büyükaycan",
    "category": "sporcular"
  },
  {
    "name": "Bülent Tacettin",
    "category": "sporcular"
  },
  {
    "name": "Can Akın",
    "category": "sporcular"
  },
  {
    "name": "Can Altıntığ",
    "category": "sporcular"
  },
  {
    "name": "Can Bartu",
    "category": "sporcular"
  },
  {
    "name": "Can Kaan Turgut",
    "category": "sporcular"
  },
  {
    "name": "Can Korkmaz",
    "category": "sporcular"
  },
  {
    "name": "Can Maxim Mutaf",
    "category": "sporcular"
  },
  {
    "name": "Can Özcan",
    "category": "sporcular"
  },
  {
    "name": "Can Sonat",
    "category": "sporcular"
  },
  {
    "name": "Can Uğur Öğüt",
    "category": "sporcular"
  },
  {
    "name": "Özhan Canaydın",
    "category": "sporcular"
  },
  {
    "name": "Canberk Kuş",
    "category": "sporcular"
  },
  {
    "name": "Caner Erdeniz",
    "category": "sporcular"
  },
  {
    "name": "Caner Osman",
    "category": "sporcular"
  },
  {
    "name": "Caner Öner",
    "category": "sporcular"
  },
  {
    "name": "Caner Topaloğlu",
    "category": "sporcular"
  },
  {
    "name": "Cavit Altunay",
    "category": "sporcular"
  },
  {
    "name": "Cavit Ege Havsa",
    "category": "sporcular"
  },
  {
    "name": "Cedi Osman",
    "category": "sporcular"
  },
  {
    "name": "Cem Akdağ",
    "category": "sporcular"
  },
  {
    "name": "Cem Dinç",
    "category": "sporcular"
  },
  {
    "name": "Cemal Nalga",
    "category": "sporcular"
  },
  {
    "name": "Cenk Akyol",
    "category": "sporcular"
  },
  {
    "name": "Cenk Renda",
    "category": "sporcular"
  },
  {
    "name": "Cevher Özer",
    "category": "sporcular"
  },
  {
    "name": "Ceyhun Altay",
    "category": "sporcular"
  },
  {
    "name": "Cihan Mumcuoğulları",
    "category": "sporcular"
  },
  {
    "name": "Cudi İmamoğulları",
    "category": "sporcular"
  },
  {
    "name": "Cüneyt Erden",
    "category": "sporcular"
  },
  {
    "name": "Yunus Çankaya",
    "category": "sporcular"
  },
  {
    "name": "Damir Mrsic",
    "category": "sporcular"
  },
  {
    "name": "Darius Karutasu",
    "category": "sporcular"
  },
  {
    "name": "Demircan Demir",
    "category": "sporcular"
  },
  {
    "name": "Deniz Can Çevik",
    "category": "sporcular"
  },
  {
    "name": "Deniz Kılıçlı",
    "category": "sporcular"
  },
  {
    "name": "Derin Saran",
    "category": "sporcular"
  },
  {
    "name": "Derya Yannier",
    "category": "sporcular"
  },
  {
    "name": "Nejat Diyarbekirli",
    "category": "sporcular"
  },
  {
    "name": "Doğan Bozveli",
    "category": "sporcular"
  },
  {
    "name": "Doğan Hakyemez",
    "category": "sporcular"
  },
  {
    "name": "Doğukan Sönmez",
    "category": "sporcular"
  },
  {
    "name": "Doğukan Şanlı",
    "category": "sporcular"
  },
  {
    "name": "Doğuş Balbay",
    "category": "sporcular"
  },
  {
    "name": "Doğuş Özdemiroğlu",
    "category": "sporcular"
  },
  {
    "name": "Doruk Dora",
    "category": "sporcular"
  },
  {
    "name": "Dorukhan Engindeniz",
    "category": "sporcular"
  },
  {
    "name": "Duşan Cantekin",
    "category": "sporcular"
  },
  {
    "name": "Efe Aydan",
    "category": "sporcular"
  },
  {
    "name": "Efe Postel",
    "category": "sporcular"
  },
  {
    "name": "Efe Tahmaz",
    "category": "sporcular"
  },
  {
    "name": "Efekan Coşar",
    "category": "sporcular"
  },
  {
    "name": "Ege Akçay",
    "category": "sporcular"
  },
  {
    "name": "Ege Arar",
    "category": "sporcular"
  },
  {
    "name": "Ege Demir",
    "category": "sporcular"
  },
  {
    "name": "Ege Özçelik",
    "category": "sporcular"
  },
  {
    "name": "Egehan Arna",
    "category": "sporcular"
  },
  {
    "name": "Egemen Güven",
    "category": "sporcular"
  },
  {
    "name": "Ekrem Sancaklı",
    "category": "sporcular"
  },
  {
    "name": "Emir Adıgüzel",
    "category": "sporcular"
  },
  {
    "name": "Emir Arda Sivas",
    "category": "sporcular"
  },
  {
    "name": "Emir Gökalp",
    "category": "sporcular"
  },
  {
    "name": "Emir Preldžić",
    "category": "sporcular"
  },
  {
    "name": "Emircan Koşut",
    "category": "sporcular"
  },
  {
    "name": "Emre Bayav",
    "category": "sporcular"
  },
  {
    "name": "Emre Ekim",
    "category": "sporcular"
  },
  {
    "name": "Zaza Enden",
    "category": "sporcular"
  },
  {
    "name": "Ender Arslan",
    "category": "sporcular"
  },
  {
    "name": "Enes Kanter Freedom",
    "category": "sporcular"
  },
  {
    "name": "Engin Atsür",
    "category": "sporcular"
  },
  {
    "name": "Eray Büyükcangaz",
    "category": "sporcular"
  },
  {
    "name": "Erbey Paltacı",
    "category": "sporcular"
  },
  {
    "name": "Erbil Eroğlu",
    "category": "sporcular"
  },
  {
    "name": "Ercan Bayrak",
    "category": "sporcular"
  },
  {
    "name": "Ercan Osmani",
    "category": "sporcular"
  },
  {
    "name": "Erdal Bibo",
    "category": "sporcular"
  },
  {
    "name": "Erdal Koşan",
    "category": "sporcular"
  },
  {
    "name": "Erdal Poyrazoğlu",
    "category": "sporcular"
  },
  {
    "name": "Erdem Türetken",
    "category": "sporcular"
  },
  {
    "name": "Erden Eryüz",
    "category": "sporcular"
  },
  {
    "name": "Erdi Gülaslan",
    "category": "sporcular"
  },
  {
    "name": "Erdim Öztokat",
    "category": "sporcular"
  },
  {
    "name": "Erdoğan Karabelen",
    "category": "sporcular"
  },
  {
    "name": "Eren Beyaz",
    "category": "sporcular"
  },
  {
    "name": "Ergi Tırpancı",
    "category": "sporcular"
  },
  {
    "name": "Ergin Ataman",
    "category": "sporcular"
  },
  {
    "name": "Erhan Yetim",
    "category": "sporcular"
  },
  {
    "name": "Erkan Veyseloğlu",
    "category": "sporcular"
  },
  {
    "name": "Erkan Yılmaz",
    "category": "sporcular"
  },
  {
    "name": "Ermal Kurtoğlu",
    "category": "sporcular"
  },
  {
    "name": "Erman Kunter",
    "category": "sporcular"
  },
  {
    "name": "Erol Demiroma",
    "category": "sporcular"
  },
  {
    "name": "Erolcan Çinko",
    "category": "sporcular"
  },
  {
    "name": "Ersan İlyasova",
    "category": "sporcular"
  },
  {
    "name": "Orkun Kemal Ertaş",
    "category": "sporcular"
  },
  {
    "name": "Ertem Göreç",
    "category": "sporcular"
  },
  {
    "name": "Erten Gazi",
    "category": "sporcular"
  },
  {
    "name": "Nihat Ertuğ",
    "category": "sporcular"
  },
  {
    "name": "Ertuğrul Bayraktar",
    "category": "sporcular"
  },
  {
    "name": "Evren Büker",
    "category": "sporcular"
  },
  {
    "name": "Faruk Akagün",
    "category": "sporcular"
  },
  {
    "name": "Faruk Beşok",
    "category": "sporcular"
  },
  {
    "name": "Fatih Özal",
    "category": "sporcular"
  },
  {
    "name": "Fatih Solak",
    "category": "sporcular"
  },
  {
    "name": "Fehmi Sadıkoğlu",
    "category": "sporcular"
  },
  {
    "name": "Fensal Gürkan",
    "category": "sporcular"
  },
  {
    "name": "Ferhan Baras",
    "category": "sporcular"
  },
  {
    "name": "Ferhat Oktay",
    "category": "sporcular"
  },
  {
    "name": "Fırat Alemdaroğlu",
    "category": "sporcular"
  },
  {
    "name": "Fırat Töz",
    "category": "sporcular"
  },
  {
    "name": "David Filiba",
    "category": "sporcular"
  },
  {
    "name": "Furkan Aldemir",
    "category": "sporcular"
  },
  {
    "name": "Furkan Haltalı",
    "category": "sporcular"
  },
  {
    "name": "Furkan Korkmaz",
    "category": "sporcular"
  },
  {
    "name": "Gökbörü Aygar",
    "category": "sporcular"
  },
  {
    "name": "Gökhan Şirin",
    "category": "sporcular"
  },
  {
    "name": "Gökhan Üçoklar",
    "category": "sporcular"
  },
  {
    "name": "Gökhan Yazıcıoğlu",
    "category": "sporcular"
  },
  {
    "name": "Göksenin Köksal",
    "category": "sporcular"
  },
  {
    "name": "Göktuğ Baş",
    "category": "sporcular"
  },
  {
    "name": "Görkem Doğan",
    "category": "sporcular"
  },
  {
    "name": "Görkem Sönmez",
    "category": "sporcular"
  },
  {
    "name": "Zeki Gülay",
    "category": "sporcular"
  },
  {
    "name": "Sadi Gülçelik",
    "category": "sporcular"
  },
  {
    "name": "Yılmaz Gündüz",
    "category": "sporcular"
  },
  {
    "name": "Güner Yalçıner",
    "category": "sporcular"
  },
  {
    "name": "Güray Kanan",
    "category": "sporcular"
  },
  {
    "name": "Hadi Özdemir",
    "category": "sporcular"
  },
  {
    "name": "Hakan Demirel",
    "category": "sporcular"
  },
  {
    "name": "Hakan Köseoğlu",
    "category": "sporcular"
  },
  {
    "name": "Hakan Sayılı",
    "category": "sporcular"
  },
  {
    "name": "Hakan Yapar",
    "category": "sporcular"
  },
  {
    "name": "Halil Dağlı",
    "category": "sporcular"
  },
  {
    "name": "Halil İbrahim Kuzucu",
    "category": "sporcular"
  },
  {
    "name": "Halil Üner",
    "category": "sporcular"
  },
  {
    "name": "Haluk Yıldırım",
    "category": "sporcular"
  },
  {
    "name": "Harun Erdenay",
    "category": "sporcular"
  },
  {
    "name": "Hasan Arat",
    "category": "sporcular"
  },
  {
    "name": "Henry Turner",
    "category": "sporcular"
  },
  {
    "name": "Hidayet Türkoğlu",
    "category": "sporcular"
  },
  {
    "name": "Hikmet Vardar",
    "category": "sporcular"
  },
  {
    "name": "Hurşit Baytok",
    "category": "sporcular"
  },
  {
    "name": "Hüdai Budanur",
    "category": "sporcular"
  },
  {
    "name": "Hüseyin Alp",
    "category": "sporcular"
  },
  {
    "name": "Hüseyin Beşok",
    "category": "sporcular"
  },
  {
    "name": "Hüseyin Engin Muratoğlu",
    "category": "sporcular"
  },
  {
    "name": "Hüseyin Kozluca",
    "category": "sporcular"
  },
  {
    "name": "Hüseyin Öztürk",
    "category": "sporcular"
  },
  {
    "name": "Hüsnü Çakırgil",
    "category": "sporcular"
  },
  {
    "name": "İbrahim Kutluay",
    "category": "sporcular"
  },
  {
    "name": "İbrahim Yıldırım",
    "category": "sporcular"
  },
  {
    "name": "İhsan Bayülken",
    "category": "sporcular"
  },
  {
    "name": "İlkan Karaman",
    "category": "sporcular"
  },
  {
    "name": "Ömercan İlyasoğlu",
    "category": "sporcular"
  },
  {
    "name": "İnanç Koç",
    "category": "sporcular"
  },
  {
    "name": "İnanç Mert Hotamış",
    "category": "sporcular"
  },
  {
    "name": "İren İmre",
    "category": "sporcular"
  },
  {
    "name": "İsmail Cem Ulusoy",
    "category": "sporcular"
  },
  {
    "name": "İsmail Karabilen",
    "category": "sporcular"
  },
  {
    "name": "İzzet Türkyılmaz",
    "category": "sporcular"
  },
  {
    "name": "Kaan Berk Tarla",
    "category": "sporcular"
  },
  {
    "name": "Kaan Onat",
    "category": "sporcular"
  },
  {
    "name": "Kamil Ocak",
    "category": "sporcular"
  },
  {
    "name": "Karahan Tuan Efeoğlu",
    "category": "sporcular"
  },
  {
    "name": "Kartal Özmızrak",
    "category": "sporcular"
  },
  {
    "name": "Kaya Peker",
    "category": "sporcular"
  },
  {
    "name": "Kemal Can Aktuna",
    "category": "sporcular"
  },
  {
    "name": "Kemal Canbolat",
    "category": "sporcular"
  },
  {
    "name": "Kemal Dinçer",
    "category": "sporcular"
  },
  {
    "name": "Kemal Erdenay",
    "category": "sporcular"
  },
  {
    "name": "Kemal Tunçeri",
    "category": "sporcular"
  },
  {
    "name": "Kenan Sipahi",
    "category": "sporcular"
  },
  {
    "name": "Kerem Gönlüm",
    "category": "sporcular"
  },
  {
    "name": "Kerem Hotiç",
    "category": "sporcular"
  },
  {
    "name": "Kerem Konan",
    "category": "sporcular"
  },
  {
    "name": "Kerem Tunçeri",
    "category": "sporcular"
  },
  {
    "name": "Kristijan Nikolov",
    "category": "sporcular"
  },
  {
    "name": "Leon Harun Apaydın",
    "category": "sporcular"
  },
  {
    "name": "Levent Bilgin",
    "category": "sporcular"
  },
  {
    "name": "Levent Topsakal",
    "category": "sporcular"
  },
  {
    "name": "Levent Türknas",
    "category": "sporcular"
  },
  {
    "name": "Levent Yavuz",
    "category": "sporcular"
  },
  {
    "name": "Ada Korkmaz",
    "category": "sporcular"
  },
  {
    "name": "Alara Altundağ",
    "category": "sporcular"
  },
  {
    "name": "Aleksia Karutasu",
    "category": "sporcular"
  },
  {
    "name": "Aleyna Göçmen",
    "category": "sporcular"
  },
  {
    "name": "Aleyna Sevim",
    "category": "sporcular"
  },
  {
    "name": "Aleyna Vence",
    "category": "sporcular"
  },
  {
    "name": "Arelya Karasoy",
    "category": "sporcular"
  },
  {
    "name": "Arzu Göllü",
    "category": "sporcular"
  },
  {
    "name": "Arzum Tezcan",
    "category": "sporcular"
  },
  {
    "name": "Aslı Ertek Aşçıoğlu",
    "category": "sporcular"
  },
  {
    "name": "Aslı Kalaç",
    "category": "sporcular"
  },
  {
    "name": "Aslı Köprülü",
    "category": "sporcular"
  },
  {
    "name": "Aslı Tecimer",
    "category": "sporcular"
  },
  {
    "name": "Aslıhan Kılıç",
    "category": "sporcular"
  },
  {
    "name": "Aslıhan Sinanoğlu",
    "category": "sporcular"
  },
  {
    "name": "Asuman Karakoyun",
    "category": "sporcular"
  },
  {
    "name": "Aybüke Özel",
    "category": "sporcular"
  },
  {
    "name": "Ayça Aykaç",
    "category": "sporcular"
  },
  {
    "name": "Ayça Naz İhtiyaroğlu",
    "category": "sporcular"
  },
  {
    "name": "Ayçin Akyol",
    "category": "sporcular"
  },
  {
    "name": "Aylin Sarıoğlu",
    "category": "sporcular"
  },
  {
    "name": "Aylin Toktamış",
    "category": "sporcular"
  },
  {
    "name": "Aylin Uysalcan",
    "category": "sporcular"
  },
  {
    "name": "Aysun Özbek",
    "category": "sporcular"
  },
  {
    "name": "Ayşe Çürük",
    "category": "sporcular"
  },
  {
    "name": "Ayşe Melis Gürkaynak",
    "category": "sporcular"
  },
  {
    "name": "Bahanur Gökalp",
    "category": "sporcular"
  },
  {
    "name": "Bahar Akbay",
    "category": "sporcular"
  },
  {
    "name": "Bahar Mert",
    "category": "sporcular"
  },
  {
    "name": "Bahar Toksoy",
    "category": "sporcular"
  },
  {
    "name": "Begüm Hepkaptan",
    "category": "sporcular"
  },
  {
    "name": "Begüm Kaçmaz",
    "category": "sporcular"
  },
  {
    "name": "Beliz Başkır",
    "category": "sporcular"
  },
  {
    "name": "Bengisu Aygün",
    "category": "sporcular"
  },
  {
    "name": "Beren Yeşilırmak",
    "category": "sporcular"
  },
  {
    "name": "Beril Çoban",
    "category": "sporcular"
  },
  {
    "name": "Berin Yıldırım",
    "category": "sporcular"
  },
  {
    "name": "Berka Buse Özden",
    "category": "sporcular"
  },
  {
    "name": "Berra Eren",
    "category": "sporcular"
  },
  {
    "name": "Berrak Deniz Kakaşçı",
    "category": "sporcular"
  },
  {
    "name": "Berre İnce",
    "category": "sporcular"
  },
  {
    "name": "Beyza Arıcı",
    "category": "sporcular"
  },
  {
    "name": "Bianka İlayda Mumcular",
    "category": "sporcular"
  },
  {
    "name": "Bihter Dumanoğlu",
    "category": "sporcular"
  },
  {
    "name": "Bilge Paşa",
    "category": "sporcular"
  },
  {
    "name": "Funda Bilgi",
    "category": "sporcular"
  },
  {
    "name": "Birgül Güler",
    "category": "sporcular"
  },
  {
    "name": "Buket Gülübay",
    "category": "sporcular"
  },
  {
    "name": "Buket Yılmaz",
    "category": "sporcular"
  },
  {
    "name": "Burcu Yönder",
    "category": "sporcular"
  },
  {
    "name": "Buse Kara",
    "category": "sporcular"
  },
  {
    "name": "Buse Kayacan",
    "category": "sporcular"
  },
  {
    "name": "Buse Ünal",
    "category": "sporcular"
  },
  {
    "name": "Büşra Güneş",
    "category": "sporcular"
  },
  {
    "name": "Büşra Kılıçlı",
    "category": "sporcular"
  },
  {
    "name": "Canel Konvur",
    "category": "sporcular"
  },
  {
    "name": "Cansın Sendir",
    "category": "sporcular"
  },
  {
    "name": "Cansın Şurgun",
    "category": "sporcular"
  },
  {
    "name": "Cansu Aydınoğulları",
    "category": "sporcular"
  },
  {
    "name": "Cansu Ayyıldız",
    "category": "sporcular"
  },
  {
    "name": "Cansu Bir",
    "category": "sporcular"
  },
  {
    "name": "Cansu Çetin",
    "category": "sporcular"
  },
  {
    "name": "Cansu Özbay",
    "category": "sporcular"
  },
  {
    "name": "Cemre Erol",
    "category": "sporcular"
  },
  {
    "name": "Ceren Baysal",
    "category": "sporcular"
  },
  {
    "name": "Ceren Hasdemir",
    "category": "sporcular"
  },
  {
    "name": "Ceren Kapucu",
    "category": "sporcular"
  },
  {
    "name": "Ceren Karagöl",
    "category": "sporcular"
  },
  {
    "name": "Ceren Mengüç",
    "category": "sporcular"
  },
  {
    "name": "Ceren Nur Domaç",
    "category": "sporcular"
  },
  {
    "name": "Ceren Önal",
    "category": "sporcular"
  },
  {
    "name": "Ceren Yüzgenç",
    "category": "sporcular"
  },
  {
    "name": "Ceyda Aktaş",
    "category": "sporcular"
  },
  {
    "name": "Ceyda Kuyan",
    "category": "sporcular"
  },
  {
    "name": "Ceylan Arısan",
    "category": "sporcular"
  },
  {
    "name": "Ceylin Kuyan",
    "category": "sporcular"
  },
  {
    "name": "Çağla Akın",
    "category": "sporcular"
  },
  {
    "name": "Çağla Salih",
    "category": "sporcular"
  },
  {
    "name": "Çiğdem Can",
    "category": "sporcular"
  },
  {
    "name": "Çiğdem Öztoprak",
    "category": "sporcular"
  },
  {
    "name": "Dalia Wilson",
    "category": "sporcular"
  },
  {
    "name": "Damla Çakıroğlu",
    "category": "sporcular"
  },
  {
    "name": "Damla Gül Çakan",
    "category": "sporcular"
  },
  {
    "name": "Damla Nur Dündar",
    "category": "sporcular"
  },
  {
    "name": "Damla Tokman",
    "category": "sporcular"
  },
  {
    "name": "Defne Başyolcu",
    "category": "sporcular"
  },
  {
    "name": "Defne Kandemir",
    "category": "sporcular"
  },
  {
    "name": "Deniz Emrelli",
    "category": "sporcular"
  },
  {
    "name": "Deniz Hakyemez",
    "category": "sporcular"
  },
  {
    "name": "Deniz Nazlıcan Zengin",
    "category": "sporcular"
  },
  {
    "name": "Deniz Uyanık",
    "category": "sporcular"
  },
  {
    "name": "Derya Cebecioğlu",
    "category": "sporcular"
  },
  {
    "name": "Derya Çayırgan",
    "category": "sporcular"
  },
  {
    "name": "Derya Güç",
    "category": "sporcular"
  },
  {
    "name": "Dicle Nur Babat",
    "category": "sporcular"
  },
  {
    "name": "Didem Ege",
    "category": "sporcular"
  },
  {
    "name": "Dilara Bağcı",
    "category": "sporcular"
  },
  {
    "name": "Dilara Bilge",
    "category": "sporcular"
  },
  {
    "name": "Dilara Yeşil",
    "category": "sporcular"
  },
  {
    "name": "Dilay Özdemir",
    "category": "sporcular"
  },
  {
    "name": "Dilek Kınık",
    "category": "sporcular"
  },
  {
    "name": "Duru Aksu",
    "category": "sporcular"
  },
  {
    "name": "Duru Şah Tırpancı",
    "category": "sporcular"
  },
  {
    "name": "Duygu Bal",
    "category": "sporcular"
  },
  {
    "name": "Duygu Çetav",
    "category": "sporcular"
  },
  {
    "name": "Duygu Düzceler",
    "category": "sporcular"
  },
  {
    "name": "Duygu Sipahioğlu",
    "category": "sporcular"
  },
  {
    "name": "Ebrar Karakurt",
    "category": "sporcular"
  },
  {
    "name": "Ebru Ceylan",
    "category": "sporcular"
  },
  {
    "name": "Ebru Elhan",
    "category": "sporcular"
  },
  {
    "name": "Ece Deniz Uçarı",
    "category": "sporcular"
  },
  {
    "name": "Ece Eke",
    "category": "sporcular"
  },
  {
    "name": "Ece Hitayca",
    "category": "sporcular"
  },
  {
    "name": "Ece Hocaoğlu",
    "category": "sporcular"
  },
  {
    "name": "Ece Kozdere",
    "category": "sporcular"
  },
  {
    "name": "Ece Morova",
    "category": "sporcular"
  },
  {
    "name": "Ecem Aknam",
    "category": "sporcular"
  },
  {
    "name": "Ecenur Aksoy",
    "category": "sporcular"
  },
  {
    "name": "Ecesu Soner",
    "category": "sporcular"
  },
  {
    "name": "Eda Erdem",
    "category": "sporcular"
  },
  {
    "name": "Ege Melisa Bükmen",
    "category": "sporcular"
  },
  {
    "name": "Elif Ağca Yarar",
    "category": "sporcular"
  },
  {
    "name": "Elif Boran",
    "category": "sporcular"
  },
  {
    "name": "Elif Gülbayrak",
    "category": "sporcular"
  },
  {
    "name": "Elif İlhan",
    "category": "sporcular"
  },
  {
    "name": "Elif Kapar",
    "category": "sporcular"
  },
  {
    "name": "Elif Onur Başaran",
    "category": "sporcular"
  },
  {
    "name": "Elif Su Eriçek",
    "category": "sporcular"
  },
  {
    "name": "Elif Su Yavuz",
    "category": "sporcular"
  },
  {
    "name": "Elif Şahin",
    "category": "sporcular"
  },
  {
    "name": "Elif Uzun",
    "category": "sporcular"
  },
  {
    "name": "Elisa Tuana Köse",
    "category": "sporcular"
  },
  {
    "name": "Emine Arıcı",
    "category": "sporcular"
  },
  {
    "name": "Erçe Su Kasapoğlu",
    "category": "sporcular"
  },
  {
    "name": "Ergül Avcı",
    "category": "sporcular"
  },
  {
    "name": "Eslem Yılmaz",
    "category": "sporcular"
  },
  {
    "name": "Esra Gümüş",
    "category": "sporcular"
  },
  {
    "name": "Esra Yılmaz",
    "category": "sporcular"
  },
  {
    "name": "Eylül Durgun",
    "category": "sporcular"
  },
  {
    "name": "Eylül Karadaş",
    "category": "sporcular"
  },
  {
    "name": "Eylül Yatgın",
    "category": "sporcular"
  },
  {
    "name": "Ezel Balık",
    "category": "sporcular"
  },
  {
    "name": "Ezgi Akyaldız",
    "category": "sporcular"
  },
  {
    "name": "Ezgi Arslan",
    "category": "sporcular"
  },
  {
    "name": "Ezgi Bektaş",
    "category": "sporcular"
  },
  {
    "name": "Ezgi Dilik",
    "category": "sporcular"
  },
  {
    "name": "Ezgi Kapdan",
    "category": "sporcular"
  },
  {
    "name": "Ezgi Kara",
    "category": "sporcular"
  },
  {
    "name": "Ezgi Uludağ",
    "category": "sporcular"
  },
  {
    "name": "Fatma Beyaz",
    "category": "sporcular"
  },
  {
    "name": "Fatma Nur Yılmaz",
    "category": "sporcular"
  },
  {
    "name": "Fatma Şekerci",
    "category": "sporcular"
  },
  {
    "name": "Firdevs Kiremitçi",
    "category": "sporcular"
  },
  {
    "name": "Fulden Ural",
    "category": "sporcular"
  },
  {
    "name": "Gamze Alikaya",
    "category": "sporcular"
  },
  {
    "name": "Gizem Çerağ Düzeltir",
    "category": "sporcular"
  },
  {
    "name": "Gizem Giraygil",
    "category": "sporcular"
  },
  {
    "name": "Gizem Güreşen",
    "category": "sporcular"
  },
  {
    "name": "Gizem Mısra Aşçı",
    "category": "sporcular"
  },
  {
    "name": "Gizem Örge",
    "category": "sporcular"
  },
  {
    "name": "Gizem Türegün",
    "category": "sporcular"
  },
  {
    "name": "Gökçen Denkel",
    "category": "sporcular"
  },
  {
    "name": "Gözde Dal İrgi",
    "category": "sporcular"
  },
  {
    "name": "Gözde Kırdar",
    "category": "sporcular"
  },
  {
    "name": "Gözde Yılmaz",
    "category": "sporcular"
  },
  {
    "name": "Gülcan Özyıldız",
    "category": "sporcular"
  },
  {
    "name": "Gülce Erdemir",
    "category": "sporcular"
  },
  {
    "name": "Gülce Güçtekin",
    "category": "sporcular"
  },
  {
    "name": "Gülçin Doğan",
    "category": "sporcular"
  },
  {
    "name": "Gülden Kayalar",
    "category": "sporcular"
  },
  {
    "name": "Güldeniz Önal",
    "category": "sporcular"
  },
  {
    "name": "Zülfiye Gündoğdu",
    "category": "sporcular"
  },
  {
    "name": "Güneş Çapa",
    "category": "sporcular"
  },
  {
    "name": "Hande Baladın",
    "category": "sporcular"
  },
  {
    "name": "Hande Korkut",
    "category": "sporcular"
  },
  {
    "name": "Hande Naz Sunar",
    "category": "sporcular"
  },
  {
    "name": "Hanife Nur Özaydınlı",
    "category": "sporcular"
  },
  {
    "name": "Hazal Nas Bahtiyar",
    "category": "sporcular"
  },
  {
    "name": "Hazal Selin Uygur",
    "category": "sporcular"
  },
  {
    "name": "Helin Kayıkçı",
    "category": "sporcular"
  },
  {
    "name": "Hilal Kocakara",
    "category": "sporcular"
  },
  {
    "name": "Hilal Yabuz",
    "category": "sporcular"
  },
  {
    "name": "Hülya Cömert",
    "category": "sporcular"
  },
  {
    "name": "Hülya Erçin",
    "category": "sporcular"
  },
  {
    "name": "Hümay Fırıncıoğlu",
    "category": "sporcular"
  },
  {
    "name": "Işıl Kartalkanat",
    "category": "sporcular"
  },
  {
    "name": "Işıl Öz",
    "category": "sporcular"
  },
  {
    "name": "İdil Naz Kanbur",
    "category": "sporcular"
  },
  {
    "name": "İlarya Zararsız",
    "category": "sporcular"
  },
  {
    "name": "İlayda Naz Gergef",
    "category": "sporcular"
  },
  {
    "name": "İlayda Uçak",
    "category": "sporcular"
  },
  {
    "name": "İlkin Aydın",
    "category": "sporcular"
  },
  {
    "name": "İpar Kurt",
    "category": "sporcular"
  },
  {
    "name": "İpek Soroğlu",
    "category": "sporcular"
  },
  {
    "name": "İrem Çor",
    "category": "sporcular"
  },
  {
    "name": "İrem Nur Özsoy",
    "category": "sporcular"
  },
  {
    "name": "Janset Cemre Erkul",
    "category": "sporcular"
  },
  {
    "name": "Kardelen İpek Sümer",
    "category": "sporcular"
  },
  {
    "name": "Karmen Aksoy",
    "category": "sporcular"
  },
  {
    "name": "Oksana Kotelnikova",
    "category": "sporcular"
  },
  {
    "name": "Kübra Akman",
    "category": "sporcular"
  },
  {
    "name": "Kübra Evşen",
    "category": "sporcular"
  },
  {
    "name": "Kübra Kegan",
    "category": "sporcular"
  },
  {
    "name": "Lal Verda Akın",
    "category": "sporcular"
  },
  {
    "name": "Lila Şengün",
    "category": "sporcular"
  },
  {
    "name": "Liray Akpınar",
    "category": "sporcular"
  },
  {
    "name": "Liza Safronova",
    "category": "sporcular"
  },
  {
    "name": "Mahiru Akdağ",
    "category": "sporcular"
  },
  {
    "name": "Mehtap Öztunalı",
    "category": "sporcular"
  },
  {
    "name": "Meliha Diken",
    "category": "sporcular"
  },
  {
    "name": "Melike Yılmaz",
    "category": "sporcular"
  },
  {
    "name": "Melis Demir",
    "category": "sporcular"
  },
  {
    "name": "Melis Durul",
    "category": "sporcular"
  },
  {
    "name": "Melis Erdoğan",
    "category": "sporcular"
  },
  {
    "name": "Melis Yılmaz",
    "category": "sporcular"
  },
  {
    "name": "Melisa Kerman",
    "category": "sporcular"
  },
  {
    "name": "Melissa Vargas",
    "category": "sporcular"
  },
  {
    "name": "Merve Atlıer",
    "category": "sporcular"
  },
  {
    "name": "Merve Çepni",
    "category": "sporcular"
  },
  {
    "name": "Merve Dalbeler",
    "category": "sporcular"
  },
  {
    "name": "Merve İzbilir",
    "category": "sporcular"
  },
  {
    "name": "Merve Nezir",
    "category": "sporcular"
  },
  {
    "name": "Merve Nur Öztürk",
    "category": "sporcular"
  },
  {
    "name": "Merve Tanıl",
    "category": "sporcular"
  },
  {
    "name": "Merve Tanyel",
    "category": "sporcular"
  },
  {
    "name": "Meryem Boz",
    "category": "sporcular"
  },
  {
    "name": "Mesude Kuyan",
    "category": "sporcular"
  },
  {
    "name": "Nalan Ural",
    "category": "sporcular"
  },
  {
    "name": "Natalia Hanikoğlu",
    "category": "sporcular"
  },
  {
    "name": "Naz Aydemir Akyol",
    "category": "sporcular"
  },
  {
    "name": "Naz Döner",
    "category": "sporcular"
  },
  {
    "name": "Nazlı Eda Kafkas",
    "category": "sporcular"
  },
  {
    "name": "Nazlı Özyıldız",
    "category": "sporcular"
  },
  {
    "name": "Necla Güçlü Esepaşa",
    "category": "sporcular"
  },
  {
    "name": "Nefize Bayramoğlu",
    "category": "sporcular"
  },
  {
    "name": "Nehir Kurtulan",
    "category": "sporcular"
  },
  {
    "name": "Neriman Özsoy",
    "category": "sporcular"
  },
  {
    "name": "Neslihan Demir",
    "category": "sporcular"
  },
  {
    "name": "Neşve Büyükbayram",
    "category": "sporcular"
  },
  {
    "name": "Nihal Yeşil",
    "category": "sporcular"
  },
  {
    "name": "Nihan Yeldan Güneyligil",
    "category": "sporcular"
  },
  {
    "name": "Nilay Karaağaç",
    "category": "sporcular"
  },
  {
    "name": "Nilay Konar",
    "category": "sporcular"
  },
  {
    "name": "Nisa Kuliyeva",
    "category": "sporcular"
  },
  {
    "name": "Nisa Nur Yılmaz",
    "category": "sporcular"
  },
  {
    "name": "Nisan Barut",
    "category": "sporcular"
  },
  {
    "name": "Nisan Eroğuz",
    "category": "sporcular"
  },
  {
    "name": "Nur Hacıeyüpoğlu",
    "category": "sporcular"
  },
  {
    "name": "Nur Sevil Aydınlar",
    "category": "sporcular"
  },
  {
    "name": "Alper Potuk",
    "category": "sporcular"
  },
  {
    "name": "Alper Timur",
    "category": "sporcular"
  },
  {
    "name": "Altan Aksoy",
    "category": "sporcular"
  },
  {
    "name": "Altay Yavuzaslan",
    "category": "sporcular"
  },
  {
    "name": "Erhan Altın",
    "category": "sporcular"
  },
  {
    "name": "Yusuf Altıntaş",
    "category": "sporcular"
  },
  {
    "name": "Hamit Altıntop",
    "category": "sporcular"
  },
  {
    "name": "Aral Şimşir",
    "category": "sporcular"
  },
  {
    "name": "Sabih Arca",
    "category": "sporcular"
  },
  {
    "name": "Arda Güler",
    "category": "sporcular"
  },
  {
    "name": "Arda Turan",
    "category": "sporcular"
  },
  {
    "name": "Arif Güney",
    "category": "sporcular"
  },
  {
    "name": "Arif Kocabıyık",
    "category": "sporcular"
  },
  {
    "name": "Hakan Arıkan",
    "category": "sporcular"
  },
  {
    "name": "Özcan Arkoç",
    "category": "sporcular"
  },
  {
    "name": "Cihat Arman",
    "category": "sporcular"
  },
  {
    "name": "Volkan Arslan",
    "category": "sporcular"
  },
  {
    "name": "Ali Artuner",
    "category": "sporcular"
  },
  {
    "name": "Emre Aşık",
    "category": "sporcular"
  },
  {
    "name": "Atakan Karazor",
    "category": "sporcular"
  },
  {
    "name": "Necati Ateş",
    "category": "sporcular"
  },
  {
    "name": "Atila Turan",
    "category": "sporcular"
  },
  {
    "name": "Cengiz Atila",
    "category": "sporcular"
  },
  {
    "name": "Koray Avcı",
    "category": "sporcular"
  },
  {
    "name": "Avni Kurgan",
    "category": "sporcular"
  },
  {
    "name": "Aydemir Nemli",
    "category": "sporcular"
  },
  {
    "name": "Aydın Karabulut",
    "category": "sporcular"
  },
  {
    "name": "Aydın Tohumcu",
    "category": "sporcular"
  },
  {
    "name": "Ayhan Akman",
    "category": "sporcular"
  },
  {
    "name": "Ayhan Hançer",
    "category": "sporcular"
  },
  {
    "name": "Aykut Kocaman",
    "category": "sporcular"
  },
  {
    "name": "Aykut Yiğit",
    "category": "sporcular"
  },
  {
    "name": "Aytaç Kara",
    "category": "sporcular"
  },
  {
    "name": "Volkan Babacan",
    "category": "sporcular"
  },
  {
    "name": "Bahaddin Güneş",
    "category": "sporcular"
  },
  {
    "name": "Bahri Altıntabak",
    "category": "sporcular"
  },
  {
    "name": "Bahtiyar Yorulmaz",
    "category": "sporcular"
  },
  {
    "name": "Baki Mercimek",
    "category": "sporcular"
  },
  {
    "name": "Serkan Balcı",
    "category": "sporcular"
  },
  {
    "name": "Abdülkerim Bardakcı",
    "category": "sporcular"
  },
  {
    "name": "Barış Alper Yılmaz",
    "category": "sporcular"
  },
  {
    "name": "Deniz Barış",
    "category": "sporcular"
  },
  {
    "name": "Yıldıray Baştürk",
    "category": "sporcular"
  },
  {
    "name": "Kemal Batmaz",
    "category": "sporcular"
  },
  {
    "name": "Batuhan Karadeniz",
    "category": "sporcular"
  },
  {
    "name": "Faruk Bayar",
    "category": "sporcular"
  },
  {
    "name": "Altay Bayındır",
    "category": "sporcular"
  },
  {
    "name": "Engin Baytar",
    "category": "sporcular"
  },
  {
    "name": "Bedri Gürsoy",
    "category": "sporcular"
  },
  {
    "name": "Bekir Barçın",
    "category": "sporcular"
  },
  {
    "name": "Bekir İrtegün",
    "category": "sporcular"
  },
  {
    "name": "Bekir Refet Teker",
    "category": "sporcular"
  },
  {
    "name": "Berat Özdemir",
    "category": "sporcular"
  },
  {
    "name": "Berkan Kutlu",
    "category": "sporcular"
  },
  {
    "name": "Berkay Özcan",
    "category": "sporcular"
  },
  {
    "name": "Berke Özer",
    "category": "sporcular"
  },
  {
    "name": "Candemir Berkman",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Berman",
    "category": "sporcular"
  },
  {
    "name": "Bertuğ Yıldırım",
    "category": "sporcular"
  },
  {
    "name": "Bilal Kısa",
    "category": "sporcular"
  },
  {
    "name": "Nazmi Bilge",
    "category": "sporcular"
  },
  {
    "name": "Zafer Bilgetay",
    "category": "sporcular"
  },
  {
    "name": "Birol Pekel",
    "category": "sporcular"
  },
  {
    "name": "Şenol Birol",
    "category": "sporcular"
  },
  {
    "name": "Rıdvan Bolatlı",
    "category": "sporcular"
  },
  {
    "name": "Uğur Boral",
    "category": "sporcular"
  },
  {
    "name": "Umut Bulut",
    "category": "sporcular"
  },
  {
    "name": "Burak Yılmaz",
    "category": "sporcular"
  },
  {
    "name": "Burhan Atak",
    "category": "sporcular"
  },
  {
    "name": "Burhan Tözer",
    "category": "sporcular"
  },
  {
    "name": "Adem Büyük",
    "category": "sporcular"
  },
  {
    "name": "Bülent Baturman",
    "category": "sporcular"
  },
  {
    "name": "Bülent Bölükbaşı",
    "category": "sporcular"
  },
  {
    "name": "Bülent Gürbüz",
    "category": "sporcular"
  },
  {
    "name": "Bülent Uygun",
    "category": "sporcular"
  },
  {
    "name": "Cafer Aydın",
    "category": "sporcular"
  },
  {
    "name": "Cafer Çağatay",
    "category": "sporcular"
  },
  {
    "name": "Cahit Dikici",
    "category": "sporcular"
  },
  {
    "name": "Uğurcan Çakır",
    "category": "sporcular"
  },
  {
    "name": "Can Arat",
    "category": "sporcular"
  },
  {
    "name": "Can Uzun",
    "category": "sporcular"
  },
  {
    "name": "Caner Erkin",
    "category": "sporcular"
  },
  {
    "name": "Hasan Çelik",
    "category": "sporcular"
  },
  {
    "name": "Yasin Çelik",
    "category": "sporcular"
  },
  {
    "name": "Celil Sağır",
    "category": "sporcular"
  },
  {
    "name": "Cenk Gönen",
    "category": "sporcular"
  },
  {
    "name": "Abdullah Çevrim",
    "category": "sporcular"
  },
  {
    "name": "Ceyhun Eriş",
    "category": "sporcular"
  },
  {
    "name": "Orhan Çıkırıkçı",
    "category": "sporcular"
  },
  {
    "name": "Colin Kâzım-Richards",
    "category": "sporcular"
  },
  {
    "name": "Coşkun Ferman",
    "category": "sporcular"
  },
  {
    "name": "Coşkun Özarı",
    "category": "sporcular"
  },
  {
    "name": "Çağdaş Atan",
    "category": "sporcular"
  },
  {
    "name": "Çağlar Birinci",
    "category": "sporcular"
  },
  {
    "name": "Çağlayan Derebaşı",
    "category": "sporcular"
  },
  {
    "name": "Beyhan Çalışkan",
    "category": "sporcular"
  },
  {
    "name": "Tarık Çamdal",
    "category": "sporcular"
  },
  {
    "name": "Ömer Çatkıç",
    "category": "sporcular"
  },
  {
    "name": "Oğuz Çetin",
    "category": "sporcular"
  },
  {
    "name": "Çetiner Erdoğan",
    "category": "sporcular"
  },
  {
    "name": "Raşit Çetiner",
    "category": "sporcular"
  },
  {
    "name": "Hüseyin Çimşir",
    "category": "sporcular"
  },
  {
    "name": "Emre Çolak",
    "category": "sporcular"
  },
  {
    "name": "Uğur Dağdelen",
    "category": "sporcular"
  },
  {
    "name": "Demir Ege Tıknaz",
    "category": "sporcular"
  },
  {
    "name": "Aykut Demir",
    "category": "sporcular"
  },
  {
    "name": "Muhammet Demir",
    "category": "sporcular"
  },
  {
    "name": "Merih Demiral",
    "category": "sporcular"
  },
  {
    "name": "Coşkun Demirbakan",
    "category": "sporcular"
  },
  {
    "name": "Deniz Gül",
    "category": "sporcular"
  },
  {
    "name": "Deniz Türüç",
    "category": "sporcular"
  },
  {
    "name": "Mustafa Denizli",
    "category": "sporcular"
  },
  {
    "name": "Oktay Derelioğlu",
    "category": "sporcular"
  },
  {
    "name": "Enis Destan",
    "category": "sporcular"
  },
  {
    "name": "Rıdvan Dilmen",
    "category": "sporcular"
  },
  {
    "name": "Basri Dirimlili",
    "category": "sporcular"
  },
  {
    "name": "Tolga Doğantez",
    "category": "sporcular"
  },
  {
    "name": "Doğan Alemdar",
    "category": "sporcular"
  },
  {
    "name": "Doğan Küçükduru",
    "category": "sporcular"
  },
  {
    "name": "Ziya Doğan",
    "category": "sporcular"
  },
  {
    "name": "Doğukan Sinik",
    "category": "sporcular"
  },
  {
    "name": "Dorukhan Toköz",
    "category": "sporcular"
  },
  {
    "name": "Candan Dumanlı",
    "category": "sporcular"
  },
  {
    "name": "Abdülkerim Durmaz",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Dursun",
    "category": "sporcular"
  },
  {
    "name": "Serdar Dursun",
    "category": "sporcular"
  },
  {
    "name": "Murat Duruer",
    "category": "sporcular"
  },
  {
    "name": "Bülent Eken",
    "category": "sporcular"
  },
  {
    "name": "Reha Eken",
    "category": "sporcular"
  },
  {
    "name": "Ekrem Günalp",
    "category": "sporcular"
  },
  {
    "name": "Mehmet Ekşi",
    "category": "sporcular"
  },
  {
    "name": "Ayfer Elmastaşoğlu",
    "category": "sporcular"
  },
  {
    "name": "Ayhan Elmastaşoğlu",
    "category": "sporcular"
  },
  {
    "name": "Emirhan İlkhan",
    "category": "sporcular"
  },
  {
    "name": "Emirhan Topçu",
    "category": "sporcular"
  },
  {
    "name": "Emre Akbaba",
    "category": "sporcular"
  },
  {
    "name": "Emre Belözoğlu",
    "category": "sporcular"
  },
  {
    "name": "Emre Kılınç",
    "category": "sporcular"
  },
  {
    "name": "Emre Taşdemir",
    "category": "sporcular"
  },
  {
    "name": "Emre Toraman",
    "category": "sporcular"
  },
  {
    "name": "Ender Konca",
    "category": "sporcular"
  },
  {
    "name": "Enes Ünal",
    "category": "sporcular"
  },
  {
    "name": "Engin Özdemir",
    "category": "sporcular"
  },
  {
    "name": "Engin Verel",
    "category": "sporcular"
  },
  {
    "name": "Erbil Uzel",
    "category": "sporcular"
  },
  {
    "name": "Ercan Aktuna",
    "category": "sporcular"
  },
  {
    "name": "Ercan Koloğlu",
    "category": "sporcular"
  },
  {
    "name": "Abdullah Ercan",
    "category": "sporcular"
  },
  {
    "name": "Ercüment Şahin",
    "category": "sporcular"
  },
  {
    "name": "Aykut Erçetin",
    "category": "sporcular"
  },
  {
    "name": "Erdal Kocaçimen",
    "category": "sporcular"
  },
  {
    "name": "Arif Erdem",
    "category": "sporcular"
  },
  {
    "name": "Naci Erdem",
    "category": "sporcular"
  },
  {
    "name": "Erdoğan Arıca",
    "category": "sporcular"
  },
  {
    "name": "Eren Elmalı",
    "category": "sporcular"
  },
  {
    "name": "Eren Talu",
    "category": "sporcular"
  },
  {
    "name": "Ergin Gürses",
    "category": "sporcular"
  },
  {
    "name": "Ergün Acuner",
    "category": "sporcular"
  },
  {
    "name": "Ergun Ercins",
    "category": "sporcular"
  },
  {
    "name": "Ergun Öztuna",
    "category": "sporcular"
  },
  {
    "name": "Ergün Penbe",
    "category": "sporcular"
  },
  {
    "name": "Erhan Arslan",
    "category": "sporcular"
  },
  {
    "name": "Rebii Erkal",
    "category": "sporcular"
  },
  {
    "name": "Erkan Avseren",
    "category": "sporcular"
  },
  {
    "name": "Erol Bulut",
    "category": "sporcular"
  },
  {
    "name": "Erol Dinler",
    "category": "sporcular"
  },
  {
    "name": "Erol Togay",
    "category": "sporcular"
  },
  {
    "name": "Ersan Gülüm",
    "category": "sporcular"
  },
  {
    "name": "Ersel Altıparmak",
    "category": "sporcular"
  },
  {
    "name": "Ersen Martin",
    "category": "sporcular"
  },
  {
    "name": "Ercan Ertuğ",
    "category": "sporcular"
  },
  {
    "name": "Ertuğrul Ersoy",
    "category": "sporcular"
  },
  {
    "name": "Rober Eryol",
    "category": "sporcular"
  },
  {
    "name": "Bülent Esel",
    "category": "sporcular"
  },
  {
    "name": "Eser Özaltındere",
    "category": "sporcular"
  },
  {
    "name": "Eşref Bilgiç",
    "category": "sporcular"
  },
  {
    "name": "Eşref Özmenç",
    "category": "sporcular"
  },
  {
    "name": "Evren Turhan",
    "category": "sporcular"
  },
  {
    "name": "Fahrettin Cansever",
    "category": "sporcular"
  },
  {
    "name": "Faruk Barlas",
    "category": "sporcular"
  },
  {
    "name": "Faruk Sağnak",
    "category": "sporcular"
  },
  {
    "name": "Fatih Tekke",
    "category": "sporcular"
  },
  {
    "name": "Fehmi Sağınoğlu",
    "category": "sporcular"
  },
  {
    "name": "Ferdi Kadıoğlu",
    "category": "sporcular"
  },
  {
    "name": "Feridun Buğeker",
    "category": "sporcular"
  },
  {
    "name": "Feti Okuroğlu",
    "category": "sporcular"
  },
  {
    "name": "Feyyaz Uçar",
    "category": "sporcular"
  },
  {
    "name": "Fikret Arıcan",
    "category": "sporcular"
  },
  {
    "name": "Fikret Demirer",
    "category": "sporcular"
  },
  {
    "name": "Fikret Kırcan",
    "category": "sporcular"
  },
  {
    "name": "Galip Haktanır",
    "category": "sporcular"
  },
  {
    "name": "Garbis İstanbulluoğlu",
    "category": "sporcular"
  },
  {
    "name": "Mehmet Nazif Gerçin",
    "category": "sporcular"
  },
  {
    "name": "Sercan Görgülü",
    "category": "sporcular"
  },
  {
    "name": "Şeref Görkey",
    "category": "sporcular"
  },
  {
    "name": "Gökdeniz Karadeniz",
    "category": "sporcular"
  },
  {
    "name": "Gökhan Akkan",
    "category": "sporcular"
  },
  {
    "name": "Gökhan Gedikali",
    "category": "sporcular"
  },
  {
    "name": "Gökhan Gönül",
    "category": "sporcular"
  },
  {
    "name": "Gökhan Keskin",
    "category": "sporcular"
  },
  {
    "name": "Gökhan Ünal",
    "category": "sporcular"
  },
  {
    "name": "Gökhan Zan",
    "category": "sporcular"
  },
  {
    "name": "Gökmen Özdenak",
    "category": "sporcular"
  },
  {
    "name": "Zafer Göncüler",
    "category": "sporcular"
  },
  {
    "name": "Şanver Göymen",
    "category": "sporcular"
  },
  {
    "name": "Ceyhun Gülselam",
    "category": "sporcular"
  },
  {
    "name": "Emre Güngör",
    "category": "sporcular"
  },
  {
    "name": "Ceyhun Güray",
    "category": "sporcular"
  },
  {
    "name": "Muharrem Gürbüz",
    "category": "sporcular"
  },
  {
    "name": "Orhan Gülle",
    "category": "sporcular"
  },
  {
    "name": "Aaron Appindangoyé",
    "category": "sporcular"
  },
  {
    "name": "Aaron Boupendza",
    "category": "sporcular"
  },
  {
    "name": "Aaron Lennon",
    "category": "sporcular"
  },
  {
    "name": "Aaron Opoku",
    "category": "sporcular"
  },
  {
    "name": "Aatif Chahechouhe",
    "category": "sporcular"
  },
  {
    "name": "Muhammed Abarhun",
    "category": "sporcular"
  },
  {
    "name": "Abat Ayımbetov",
    "category": "sporcular"
  },
  {
    "name": "Abbasbek Feyzullayev",
    "category": "sporcular"
  },
  {
    "name": "Abdelaziz Barrada",
    "category": "sporcular"
  },
  {
    "name": "Liban Abdi",
    "category": "sporcular"
  },
  {
    "name": "Abdou Razack Traoré",
    "category": "sporcular"
  },
  {
    "name": "Abdoul Sissoko",
    "category": "sporcular"
  },
  {
    "name": "Abdoulay Diaby",
    "category": "sporcular"
  },
  {
    "name": "Abdoulaye Ba",
    "category": "sporcular"
  },
  {
    "name": "Abdoulaye Diallo",
    "category": "sporcular"
  },
  {
    "name": "Abdoulaye Touré",
    "category": "sporcular"
  },
  {
    "name": "Abdul Aziz Tetteh",
    "category": "sporcular"
  },
  {
    "name": "Abdulsamet Burak",
    "category": "sporcular"
  },
  {
    "name": "Abdül Cabbar",
    "category": "sporcular"
  },
  {
    "name": "Abdülilah Fehmi",
    "category": "sporcular"
  },
  {
    "name": "Abdüzzâhir es-Saka",
    "category": "sporcular"
  },
  {
    "name": "Aboubakar Kamara",
    "category": "sporcular"
  },
  {
    "name": "Tammy Abraham",
    "category": "sporcular"
  },
  {
    "name": "Abuda",
    "category": "sporcular"
  },
  {
    "name": "Adalto",
    "category": "sporcular"
  },
  {
    "name": "Adam Bareiro",
    "category": "sporcular"
  },
  {
    "name": "Adam Buksa",
    "category": "sporcular"
  },
  {
    "name": "Adam Stachowiak",
    "category": "sporcular"
  },
  {
    "name": "Adama Traoré",
    "category": "sporcular"
  },
  {
    "name": "Adamo Nagalo",
    "category": "sporcular"
  },
  {
    "name": "Adamu Mohammed",
    "category": "sporcular"
  },
  {
    "name": "Emmanuel Adebayor",
    "category": "sporcular"
  },
  {
    "name": "Adedire Mebude",
    "category": "sporcular"
  },
  {
    "name": "Adel Bettaieb",
    "category": "sporcular"
  },
  {
    "name": "Adem Arus",
    "category": "sporcular"
  },
  {
    "name": "Adem Eren Kabak",
    "category": "sporcular"
  },
  {
    "name": "Adem Ljajić",
    "category": "sporcular"
  },
  {
    "name": "Adis Jahović",
    "category": "sporcular"
  },
  {
    "name": "Admir Teli",
    "category": "sporcular"
  },
  {
    "name": "Adnan Gušo",
    "category": "sporcular"
  },
  {
    "name": "Adnan Januzaj",
    "category": "sporcular"
  },
  {
    "name": "Adnan Uğur",
    "category": "sporcular"
  },
  {
    "name": "Adnane Tighadouini",
    "category": "sporcular"
  },
  {
    "name": "Adolfo Gaich",
    "category": "sporcular"
  },
  {
    "name": "Adolphe Teikeu",
    "category": "sporcular"
  },
  {
    "name": "Adrian Benedyczak",
    "category": "sporcular"
  },
  {
    "name": "Adriano",
    "category": "sporcular"
  },
  {
    "name": "Adriano Facchini",
    "category": "sporcular"
  },
  {
    "name": "Adrien Regattin",
    "category": "sporcular"
  },
  {
    "name": "Luis Advíncula",
    "category": "sporcular"
  },
  {
    "name": "Afonso Sousa",
    "category": "sporcular"
  },
  {
    "name": "Afriyie Acquah",
    "category": "sporcular"
  },
  {
    "name": "Victor Agali",
    "category": "sporcular"
  },
  {
    "name": "Alex Agbo",
    "category": "sporcular"
  },
  {
    "name": "Joachim Yaw",
    "category": "sporcular"
  },
  {
    "name": "Agim Ibraimi",
    "category": "sporcular"
  },
  {
    "name": "Agon Mehmeti",
    "category": "sporcular"
  },
  {
    "name": "Alloysius Agu",
    "category": "sporcular"
  },
  {
    "name": "Agus",
    "category": "sporcular"
  },
  {
    "name": "Ahmed Bilal",
    "category": "sporcular"
  },
  {
    "name": "Ahmed el-Mesudi",
    "category": "sporcular"
  },
  {
    "name": "Ahmed Hassan",
    "category": "sporcular"
  },
  {
    "name": "Ahmed Musa",
    "category": "sporcular"
  },
  {
    "name": "Ahmed Salah Hüsnü",
    "category": "sporcular"
  },
  {
    "name": "Ahmed Yasin",
    "category": "sporcular"
  },
  {
    "name": "Ahmed Yasir Reyyan",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Kanca",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Kıvanç",
    "category": "sporcular"
  },
  {
    "name": "Ahmet Yazar",
    "category": "sporcular"
  },
  {
    "name": "Aílton",
    "category": "sporcular"
  },
  {
    "name": "Ismaïl Aissati",
    "category": "sporcular"
  },
  {
    "name": "Akaki Hubutia",
    "category": "sporcular"
  },
  {
    "name": "Jerry Akaminko",
    "category": "sporcular"
  },
  {
    "name": "Alper Akçam",
    "category": "sporcular"
  },
  {
    "name": "Akeem Agbetu",
    "category": "sporcular"
  },
  {
    "name": "Akhilleas Punguras",
    "category": "sporcular"
  },
  {
    "name": "Ákos Elek",
    "category": "sporcular"
  },
  {
    "name": "Burak Akyıldız",
    "category": "sporcular"
  },
  {
    "name": "Alain Eyobo",
    "category": "sporcular"
  },
  {
    "name": "Alain Traoré",
    "category": "sporcular"
  },
  {
    "name": "Alan Cariús",
    "category": "sporcular"
  },
  {
    "name": "Alan Walsh",
    "category": "sporcular"
  },
  {
    "name": "Alanzinho",
    "category": "sporcular"
  },
  {
    "name": "Alassane Ndao",
    "category": "sporcular"
  },
  {
    "name": "Alban Meha",
    "category": "sporcular"
  },
  {
    "name": "Roland Alberg",
    "category": "sporcular"
  },
  {
    "name": "Albian Ajeti",
    "category": "sporcular"
  },
  {
    "name": "Aldin Čajić",
    "category": "sporcular"
  },
  {
    "name": "Alejandro Capurro",
    "category": "sporcular"
  },
  {
    "name": "Alejandro Pozuelo",
    "category": "sporcular"
  },
  {
    "name": "Aleksandar Aleksandrov",
    "category": "sporcular"
  },
  {
    "name": "Aleksandar Jovanović",
    "category": "sporcular"
  },
  {
    "name": "Aleksandar Pešić",
    "category": "sporcular"
  },
  {
    "name": "Aleksandar Šćekić",
    "category": "sporcular"
  },
  {
    "name": "Aleksandre Amisulaşvili",
    "category": "sporcular"
  },
  {
    "name": "Aleksandros Ciolis",
    "category": "sporcular"
  },
  {
    "name": "Aleksandros Katranis",
    "category": "sporcular"
  },
  {
    "name": "Aleksandros Kiziridis",
    "category": "sporcular"
  },
  {
    "name": "Alen Avdić",
    "category": "sporcular"
  },
  {
    "name": "Alessandro Cambalhota",
    "category": "sporcular"
  },
  {
    "name": "Alessio Cerci",
    "category": "sporcular"
  },
  {
    "name": "Alex de Souza",
    "category": "sporcular"
  },
  {
    "name": "Alex Teixeira",
    "category": "sporcular"
  },
  {
    "name": "Alex Telles",
    "category": "sporcular"
  },
  {
    "name": "Alexander Djiku",
    "category": "sporcular"
  },
  {
    "name": "Alexander Löbe",
    "category": "sporcular"
  },
  {
    "name": "Alexander Søderlund",
    "category": "sporcular"
  },
  {
    "name": "Alexander Sørloth",
    "category": "sporcular"
  },
  {
    "name": "Alexandru Bourceanu",
    "category": "sporcular"
  },
  {
    "name": "Alexandru Cicâldău",
    "category": "sporcular"
  },
  {
    "name": "Alexandru Maxim",
    "category": "sporcular"
  },
  {
    "name": "Alexis Flips",
    "category": "sporcular"
  },
  {
    "name": "Alexis Pérez",
    "category": "sporcular"
  },
  {
    "name": "Ali Adnan",
    "category": "sporcular"
  },
  {
    "name": "Ali Ahamada",
    "category": "sporcular"
  },
  {
    "name": "Ali Faiz Atiyye",
    "category": "sporcular"
  },
  {
    "name": "Ali Fuat Demircioğlu",
    "category": "sporcular"
  },
  {
    "name": "Ali Gökdemir",
    "category": "sporcular"
  },
  {
    "name": "Alain Boghossian",
    "category": "sporcular"
  },
  {
    "name": "Alberto Tarantini",
    "category": "sporcular"
  },
  {
    "name": "Raúl Albiol",
    "category": "sporcular"
  },
  {
    "name": "Alcides Ghiggia",
    "category": "sporcular"
  },
  {
    "name": "Aldair",
    "category": "sporcular"
  },
  {
    "name": "Aldo Olivieri",
    "category": "sporcular"
  },
  {
    "name": "Alessandro Del Piero",
    "category": "sporcular"
  },
  {
    "name": "Álex Baena",
    "category": "sporcular"
  },
  {
    "name": "Álex Grimaldo",
    "category": "sporcular"
  },
  {
    "name": "Alexis Mac Allister",
    "category": "sporcular"
  },
  {
    "name": "Alfred Pfaff",
    "category": "sporcular"
  },
  {
    "name": "Alessandro Altobelli",
    "category": "sporcular"
  },
  {
    "name": "Amarildo",
    "category": "sporcular"
  },
  {
    "name": "Amedeo Biavati",
    "category": "sporcular"
  },
  {
    "name": "Américo Gallego",
    "category": "sporcular"
  },
  {
    "name": "Ânderson Polga",
    "category": "sporcular"
  },
  {
    "name": "José Andrade",
    "category": "sporcular"
  },
  {
    "name": "Ángel Correa",
    "category": "sporcular"
  },
  {
    "name": "Angelo Peruzzi",
    "category": "sporcular"
  },
  {
    "name": "Angelo Schiavio",
    "category": "sporcular"
  },
  {
    "name": "Antoine Griezmann",
    "category": "sporcular"
  },
  {
    "name": "Antonio Cabrini",
    "category": "sporcular"
  },
  {
    "name": "Álvaro Arbeloa",
    "category": "sporcular"
  },
  {
    "name": "Osvaldo Ardiles",
    "category": "sporcular"
  },
  {
    "name": "Alphonse Areola",
    "category": "sporcular"
  },
  {
    "name": "Jimmy Armfield",
    "category": "sporcular"
  },
  {
    "name": "Raimond Aumann",
    "category": "sporcular"
  },
  {
    "name": "Aymeric Laporte",
    "category": "sporcular"
  },
  {
    "name": "Franco Baresi",
    "category": "sporcular"
  },
  {
    "name": "Andrea Barzagli",
    "category": "sporcular"
  },
  {
    "name": "Bebeto",
    "category": "sporcular"
  },
  {
    "name": "Hilderaldo Bellini",
    "category": "sporcular"
  },
  {
    "name": "Benjamin Pavard",
    "category": "sporcular"
  },
  {
    "name": "Giuseppe Bergomi",
    "category": "sporcular"
  },
  {
    "name": "Bernard Diomède",
    "category": "sporcular"
  },
  {
    "name": "Bernard Lama",
    "category": "sporcular"
  },
  {
    "name": "Bernd Hölzenbein",
    "category": "sporcular"
  },
  {
    "name": "Bernhard Klodt",
    "category": "sporcular"
  },
  {
    "name": "Thomas Berthold",
    "category": "sporcular"
  },
  {
    "name": "Bixente Lizarazu",
    "category": "sporcular"
  },
  {
    "name": "Laurent Blanc",
    "category": "sporcular"
  },
  {
    "name": "Jérôme Boateng",
    "category": "sporcular"
  },
  {
    "name": "Bobby Charlton",
    "category": "sporcular"
  },
  {
    "name": "Bodo Illgner",
    "category": "sporcular"
  },
  {
    "name": "Rainer Bonhof",
    "category": "sporcular"
  },
  {
    "name": "Borja Iglesias",
    "category": "sporcular"
  },
  {
    "name": "Branco",
    "category": "sporcular"
  },
  {
    "name": "Andreas Brehme",
    "category": "sporcular"
  },
  {
    "name": "Paul Breitner",
    "category": "sporcular"
  },
  {
    "name": "Brito",
    "category": "sporcular"
  },
  {
    "name": "Bruno Conti",
    "category": "sporcular"
  },
  {
    "name": "Gianluigi Buffon",
    "category": "sporcular"
  },
  {
    "name": "Jorge Burruchaga",
    "category": "sporcular"
  },
  {
    "name": "Sergio Busquets",
    "category": "sporcular"
  },
  {
    "name": "Cafu",
    "category": "sporcular"
  },
  {
    "name": "Fabio Cannavaro",
    "category": "sporcular"
  },
  {
    "name": "Carles Puyol",
    "category": "sporcular"
  },
  {
    "name": "Carlos Alberto Torres",
    "category": "sporcular"
  },
  {
    "name": "Carlos Castilho",
    "category": "sporcular"
  },
  {
    "name": "Carlos Daniel Tapia",
    "category": "sporcular"
  },
  {
    "name": "Carlos Romero",
    "category": "sporcular"
  },
  {
    "name": "Iker Casillas",
    "category": "sporcular"
  },
  {
    "name": "Héctor Castro",
    "category": "sporcular"
  },
  {
    "name": "Jack Charlton",
    "category": "sporcular"
  },
  {
    "name": "Christophe Dugarry",
    "category": "sporcular"
  },
  {
    "name": "Claudio Borghi",
    "category": "sporcular"
  },
  {
    "name": "Claudio Gentile",
    "category": "sporcular"
  },
  {
    "name": "Clodoaldo",
    "category": "sporcular"
  },
  {
    "name": "Corentin Tolisso",
    "category": "sporcular"
  },
  {
    "name": "Cristian Romero",
    "category": "sporcular"
  },
  {
    "name": "Bernhard Cullmann",
    "category": "sporcular"
  },
  {
    "name": "Dani Olmo",
    "category": "sporcular"
  },
  {
    "name": "Daniel Bertoni",
    "category": "sporcular"
  },
  {
    "name": "David Raya",
    "category": "sporcular"
  },
  {
    "name": "David Trezeguet",
    "category": "sporcular"
  },
  {
    "name": "David Villa",
    "category": "sporcular"
  },
  {
    "name": "Denílson",
    "category": "sporcular"
  },
  {
    "name": "Didier Deschamps",
    "category": "sporcular"
  },
  {
    "name": "Ángel Di María",
    "category": "sporcular"
  },
  {
    "name": "Dida",
    "category": "sporcular"
  },
  {
    "name": "Didi",
    "category": "sporcular"
  },
  {
    "name": "Diego Maradona",
    "category": "sporcular"
  },
  {
    "name": "Djalma Santos",
    "category": "sporcular"
  },
  {
    "name": "Djibril Sidibé",
    "category": "sporcular"
  },
  {
    "name": "Dunga",
    "category": "sporcular"
  },
  {
    "name": "Edílson",
    "category": "sporcular"
  },
  {
    "name": "Edmílson",
    "category": "sporcular"
  },
  {
    "name": "Émerson Leão",
    "category": "sporcular"
  },
  {
    "name": "Emiliano Martínez",
    "category": "sporcular"
  },
  {
    "name": "Enrique Ballestrero",
    "category": "sporcular"
  },
  {
    "name": "Enrique Guaita",
    "category": "sporcular"
  },
  {
    "name": "Enzo Fernández",
    "category": "sporcular"
  },
  {
    "name": "Eric García",
    "category": "sporcular"
  },
  {
    "name": "Ernesto Vidal",
    "category": "sporcular"
  },
  {
    "name": "Eusebio Tejera",
    "category": "sporcular"
  },
  {
    "name": "Everaldo",
    "category": "sporcular"
  },
  {
    "name": "Exequiel Palacios",
    "category": "sporcular"
  },
  {
    "name": "Fabián Ruiz",
    "category": "sporcular"
  },
  {
    "name": "Fabien Barthez",
    "category": "sporcular"
  },
  {
    "name": "Fabio Grosso",
    "category": "sporcular"
  },
  {
    "name": "Cesc Fàbregas",
    "category": "sporcular"
  },
  {
    "name": "Felice Borel",
    "category": "sporcular"
  },
  {
    "name": "Félix",
    "category": "sporcular"
  },
  {
    "name": "Ferran Torres",
    "category": "sporcular"
  },
  {
    "name": "Giovanni Ferrari",
    "category": "sporcular"
  },
  {
    "name": "Filippo Inzaghi",
    "category": "sporcular"
  },
  {
    "name": "Ubaldo Fillol",
    "category": "sporcular"
  },
  {
    "name": "Francesco Graziani",
    "category": "sporcular"
  },
  {
    "name": "Francesco Totti",
    "category": "sporcular"
  },
  {
    "name": "Franco Armani",
    "category": "sporcular"
  },
  {
    "name": "Franco Causio",
    "category": "sporcular"
  },
  {
    "name": "Frank Leboeuf",
    "category": "sporcular"
  },
  {
    "name": "Franz Beckenbauer",
    "category": "sporcular"
  },
  {
    "name": "Fulvio Collovati",
    "category": "sporcular"
  },
  {
    "name": "Gabriele Oriali",
    "category": "sporcular"
  },
  {
    "name": "Gaetano Scirea",
    "category": "sporcular"
  },
  {
    "name": "Oscar Garré",
    "category": "sporcular"
  },
  {
    "name": "Garrincha",
    "category": "sporcular"
  },
  {
    "name": "Gavi",
    "category": "sporcular"
  },
  {
    "name": "Gennaro Gattuso",
    "category": "sporcular"
  },
  {
    "name": "Geoff Hurst",
    "category": "sporcular"
  },
  {
    "name": "George Cohen",
    "category": "sporcular"
  },
  {
    "name": "Germán Pezzella",
    "category": "sporcular"
  },
  {
    "name": "Gerónimo Rulli",
    "category": "sporcular"
  },
  {
    "name": "Gerry Byrne",
    "category": "sporcular"
  },
  {
    "name": "Gérson",
    "category": "sporcular"
  },
  {
    "name": "Giancarlo Antognoni",
    "category": "sporcular"
  },
  {
    "name": "Gianluca Zambrotta",
    "category": "sporcular"
  },
  {
    "name": "Gianpiero Combi",
    "category": "sporcular"
  },
  {
    "name": "Alberto Gilardino",
    "category": "sporcular"
  },
  {
    "name": "Gilberto Silva",
    "category": "sporcular"
  },
  {
    "name": "Gilmar",
    "category": "sporcular"
  },
  {
    "name": "Gilmar Rinaldi",
    "category": "sporcular"
  },
  {
    "name": "Gino Colaussi",
    "category": "sporcular"
  },
  {
    "name": "Giovanni Galli",
    "category": "sporcular"
  },
  {
    "name": "Olivier Giroud",
    "category": "sporcular"
  },
  {
    "name": "Giuseppe Meazza",
    "category": "sporcular"
  },
  {
    "name": "Gonzalo Montiel",
    "category": "sporcular"
  },
  {
    "name": "Gordon Banks",
    "category": "sporcular"
  },
  {
    "name": "Jimmy Greaves",
    "category": "sporcular"
  },
  {
    "name": "Guido Buchwald",
    "category": "sporcular"
  },
  {
    "name": "Guido Rodríguez",
    "category": "sporcular"
  },
  {
    "name": "Hans-Georg Schwarzenbeck",
    "category": "sporcular"
  },
  {
    "name": "Héctor Enrique",
    "category": "sporcular"
  },
  {
    "name": "Héctor Zelada",
    "category": "sporcular"
  },
  {
    "name": "Heinz Flohe",
    "category": "sporcular"
  },
  {
    "name": "Helmut Rahn",
    "category": "sporcular"
  },
  {
    "name": "Thierry Henry",
    "category": "sporcular"
  },
  {
    "name": "Uli Hoeneß",
    "category": "sporcular"
  },
  {
    "name": "Horst Eckel",
    "category": "sporcular"
  },
  {
    "name": "Horst-Dieter Höttges",
    "category": "sporcular"
  },
  {
    "name": "Hugo Lloris",
    "category": "sporcular"
  },
  {
    "name": "Ian Callaghan",
    "category": "sporcular"
  },
  {
    "name": "Vincenzo Iaquinta",
    "category": "sporcular"
  },
  {
    "name": "Andrés Iniesta",
    "category": "sporcular"
  },
  {
    "name": "Jair da Costa",
    "category": "sporcular"
  },
  {
    "name": "Jairzinho",
    "category": "sporcular"
  },
  {
    "name": "Joan Capdevila",
    "category": "sporcular"
  },
  {
    "name": "Joan García",
    "category": "sporcular"
  },
  {
    "name": "Jorginho",
    "category": "sporcular"
  },
  {
    "name": "José Altafini",
    "category": "sporcular"
  },
  {
    "name": "José Luis Brown",
    "category": "sporcular"
  },
  {
    "name": "José Luis Cuciuffo",
    "category": "sporcular"
  },
  {
    "name": "José Maria Rodrigues Alves",
    "category": "sporcular"
  },
  {
    "name": "José Nasazzi",
    "category": "sporcular"
  },
  {
    "name": "Josef Posipal",
    "category": "sporcular"
  },
  {
    "name": "Juan Foyth",
    "category": "sporcular"
  },
  {
    "name": "Julián Álvarez",
    "category": "sporcular"
  },
  {
    "name": "Julian Draxler",
    "category": "sporcular"
  },
  {
    "name": "Juliano Belletti",
    "category": "sporcular"
  },
  {
    "name": "Julio César Britos",
    "category": "sporcular"
  },
  {
    "name": "Julio Olarticoechea",
    "category": "sporcular"
  },
  {
    "name": "Julio Pérez",
    "category": "sporcular"
  },
  {
    "name": "Juninho Paulista",
    "category": "sporcular"
  },
  {
    "name": "Juninho Pernambucano",
    "category": "sporcular"
  },
  {
    "name": "Júnior",
    "category": "sporcular"
  },
  {
    "name": "Jupp Heynckes",
    "category": "sporcular"
  },
  {
    "name": "Jürgen Grabowski",
    "category": "sporcular"
  },
  {
    "name": "Jürgen Kohler",
    "category": "sporcular"
  },
  {
    "name": "Kaká",
    "category": "sporcular"
  },
  {
    "name": "N'Golo Kanté",
    "category": "sporcular"
  },
  {
    "name": "Christian Karembeu",
    "category": "sporcular"
  },
  {
    "name": "Karl Mai",
    "category": "sporcular"
  },
  {
    "name": "Karl-Heinz Riedle",
    "category": "sporcular"
  },
  {
    "name": "Mario Kempes",
    "category": "sporcular"
  },
  {
    "name": "Kevin Großkreutz",
    "category": "sporcular"
  },
  {
    "name": "José Kléberson",
    "category": "sporcular"
  },
  {
    "name": "Jürgen Klinsmann",
    "category": "sporcular"
  },
  {
    "name": "Andreas Köpke",
    "category": "sporcular"
  },
  {
    "name": "Toni Kroos",
    "category": "sporcular"
  },
  {
    "name": "Ricardo La Volpe",
    "category": "sporcular"
  },
  {
    "name": "Lamine Yamal",
    "category": "sporcular"
  },
  {
    "name": "Lautaro Martínez",
    "category": "sporcular"
  },
  {
    "name": "Leandro Paredes",
    "category": "sporcular"
  },
  {
    "name": "Leonardo Araújo",
    "category": "sporcular"
  },
  {
    "name": "Leopoldo Luque",
    "category": "sporcular"
  },
  {
    "name": "Lilian Thuram",
    "category": "sporcular"
  },
  {
    "name": "Lionel Charbonnier",
    "category": "sporcular"
  },
  {
    "name": "Lionel Messi",
    "category": "sporcular"
  },
  {
    "name": "Lisandro Martínez",
    "category": "sporcular"
  },
  {
    "name": "Fernando Llorente",
    "category": "sporcular"
  },
  {
    "name": "Lucas Hernández",
    "category": "sporcular"
  },
  {
    "name": "Lúcio",
    "category": "sporcular"
  },
  {
    "name": "Luigi Allemandi",
    "category": "sporcular"
  },
  {
    "name": "Luigi Bertolini",
    "category": "sporcular"
  },
  {
    "name": "Luis Galván",
    "category": "sporcular"
  },
  {
    "name": "Luis Islas",
    "category": "sporcular"
  },
  {
    "name": "Luizão",
    "category": "sporcular"
  },
  {
    "name": "Sepp Maier",
    "category": "sporcular"
  },
  {
    "name": "Steve Mandanda",
    "category": "sporcular"
  },
  {
    "name": "Manfred Kaltz",
    "category": "sporcular"
  },
  {
    "name": "Marc Cucurella",
    "category": "sporcular"
  },
  {
    "name": "Marc Pubill",
    "category": "sporcular"
  },
  {
    "name": "Marcel Desailly",
    "category": "sporcular"
  },
  {
    "name": "Marcelo Trobbiani",
    "category": "sporcular"
  },
  {
    "name": "Carlos Marchena",
    "category": "sporcular"
  },
  {
    "name": "Márcio Santos",
    "category": "sporcular"
  },
  {
    "name": "Marco Amelia",
    "category": "sporcular"
  },
  {
    "name": "Marco Materazzi",
    "category": "sporcular"
  },
  {
    "name": "Marco Tardelli",
    "category": "sporcular"
  },
  {
    "name": "Marcos",
    "category": "sporcular"
  },
  {
    "name": "Marcos Acuña",
    "category": "sporcular"
  },
  {
    "name": "Marcos Llorente",
    "category": "sporcular"
  },
  {
    "name": "Jair Marinho",
    "category": "sporcular"
  },
  {
    "name": "Gianpiero Marini",
    "category": "sporcular"
  },
  {
    "name": "Mario Götze",
    "category": "sporcular"
  },
  {
    "name": "Mário Zagallo",
    "category": "sporcular"
  },
  {
    "name": "Martin Peters",
    "category": "sporcular"
  },
  {
    "name": "Martín Zubimendi",
    "category": "sporcular"
  },
  {
    "name": "Javi Martínez",
    "category": "sporcular"
  },
  {
    "name": "Roque Máspoli",
    "category": "sporcular"
  },
  {
    "name": "Daniele Massaro",
    "category": "sporcular"
  },
  {
    "name": "Juan Mata",
    "category": "sporcular"
  },
  {
    "name": "Lothar Matthäus",
    "category": "sporcular"
  },
  {
    "name": "Matthias Ginter",
    "category": "sporcular"
  },
  {
    "name": "Blaise Matuidi",
    "category": "sporcular"
  },
  {
    "name": "Mauro Camoranesi",
    "category": "sporcular"
  },
  {
    "name": "Mauro Ramos",
    "category": "sporcular"
  },
  {
    "name": "Mauro Silva",
    "category": "sporcular"
  },
  {
    "name": "Mazinho",
    "category": "sporcular"
  },
  {
    "name": "Kylian Mbappé",
    "category": "sporcular"
  },
  {
    "name": "Mesut Özil",
    "category": "sporcular"
  },
  {
    "name": "Óscar Míguez",
    "category": "sporcular"
  },
  {
    "name": "Miho Fukumoto",
    "category": "sporcular"
  },
  {
    "name": "Mikel Merino",
    "category": "sporcular"
  },
  {
    "name": "Mikel Oyarzabal",
    "category": "sporcular"
  },
  {
    "name": "Andreas Möller",
    "category": "sporcular"
  },
  {
    "name": "Luis Monti",
    "category": "sporcular"
  },
  {
    "name": "Bobby Moore",
    "category": "sporcular"
  },
  {
    "name": "Max Morlock",
    "category": "sporcular"
  },
  {
    "name": "Alan Jones",
    "category": "sporcular"
  },
  {
    "name": "Fernando Alonso",
    "category": "sporcular"
  },
  {
    "name": "Mario Andretti",
    "category": "sporcular"
  },
  {
    "name": "Alberto Ascari",
    "category": "sporcular"
  },
  {
    "name": "Ayrton Senna",
    "category": "sporcular"
  },
  {
    "name": "Jim Clark",
    "category": "sporcular"
  },
  {
    "name": "Denny Hulme",
    "category": "sporcular"
  },
  {
    "name": "Giuseppe Farina",
    "category": "sporcular"
  },
  {
    "name": "Emerson Fittipaldi",
    "category": "sporcular"
  },
  {
    "name": "Mika Häkkinen",
    "category": "sporcular"
  },
  {
    "name": "Mike Hawthorn",
    "category": "sporcular"
  },
  {
    "name": "Damon Hill",
    "category": "sporcular"
  },
  {
    "name": "Graham Hill",
    "category": "sporcular"
  },
  {
    "name": "James Hunt",
    "category": "sporcular"
  },
  {
    "name": "Jack Brabham",
    "category": "sporcular"
  },
  {
    "name": "Jackie Stewart",
    "category": "sporcular"
  },
  {
    "name": "Jacques Villeneuve",
    "category": "sporcular"
  },
  {
    "name": "Jenson Button",
    "category": "sporcular"
  },
  {
    "name": "Jochen Rindt",
    "category": "sporcular"
  },
  {
    "name": "Jody Scheckter",
    "category": "sporcular"
  },
  {
    "name": "Juan Manuel Fangio",
    "category": "sporcular"
  },
  {
    "name": "Keke Rosberg",
    "category": "sporcular"
  },
  {
    "name": "Kimi Räikkönen",
    "category": "sporcular"
  },
  {
    "name": "Lando Norris",
    "category": "sporcular"
  },
  {
    "name": "Niki Lauda",
    "category": "sporcular"
  },
  {
    "name": "Lewis Hamilton",
    "category": "sporcular"
  },
  {
    "name": "Nigel Mansell",
    "category": "sporcular"
  },
  {
    "name": "Michael Schumacher",
    "category": "sporcular"
  },
  {
    "name": "Nelson Piquet",
    "category": "sporcular"
  },
  {
    "name": "Phil Hill",
    "category": "sporcular"
  },
  {
    "name": "Alain Prost",
    "category": "sporcular"
  },
  {
    "name": "Nico Rosberg",
    "category": "sporcular"
  },
  {
    "name": "Sebastian Vettel",
    "category": "sporcular"
  },
  {
    "name": "John Surtees",
    "category": "sporcular"
  },
  {
    "name": "Max Verstappen",
    "category": "sporcular"
  },
  {
    "name": "Harry Potter'daki büyülü yaratıklar",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Longbottom ailesi",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Luna Lovegood",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Ölüm Yiyen",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Dolores Umbridge",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Ağaçsakal",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Altınyemiş",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Arwen",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Tom Bombadil",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Cadı Kral",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Celebrimbor",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Déagol",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Denethor",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Elrond",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Éomer",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Éowyn",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Faramir",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Galadriel",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Gandalf",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Gollum",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Gothmog",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Gríma Solucandil",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Isildur",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Meriadoc Brandybuck",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Nazgûl",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Peregrin Took",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Shelob",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Théoden",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Lydia Rodarte Quayle",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Marie Schrader",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Saul Goodman",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Skyler White",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Walter White",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Walter White Jr.",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Ada Wong",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Noah Bennet",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "E-123 Omega",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Erin Driscoll",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Kim Bauer",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Leon S. Kennedy",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Matt Parkman",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Max Payne",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Tony Almeida",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Varys",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Kate Austen",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Bea Smith",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Bender",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Benjamin Miles \"C-Note\" Franklin",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Berlin",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Bowser Jr.",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Brian O'Conner",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Carl Johnson",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Claude",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Crazy Eyes",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Daniel Holtz",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Roland Deschain",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Diabolik",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Dominic Toretto",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Mr. Eko",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Electro",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Eric Cartman",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Fernando Sucre",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Figüran Bob",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "James \"Sawyer\" Ford",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Franky Doyle",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Front Man",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Ganon",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Han",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "D.L. Hawkins",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Homer Simpson",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Gregory House",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Jax Teller",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "John Kramer",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Kano",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Keyser Söze",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Kim Wexler",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Kraven the Hunter",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Jin-Soo Kwon",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Lance Vance",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Lorna Morello",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Luis Fernando Lopez",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Frank Martin",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Maxine Conway",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Mona Simpson",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Nelson Muntz",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Nairobi",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Painkiller Jane",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Piper Chapman",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Profesör",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Puck",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Raquel Murillo",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Rio",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Rupert Thorne",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Tecavüzcü Coşkun",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Tokyo",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Toni Cipriani",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Trevor Philips",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Alex Vause",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Vulcan Raven",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Waluigi",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Wario",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Zorro",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Belit",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Black Sails",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Billy Bones",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Bootstrap Bill Turner",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Carina Smyth",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Conan",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "The Curse of Monkey Island",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Çılgın Korsan Jack",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Define Adası",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Define Adasına Dönüş",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Escape from Monkey Island",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Ben Gunn",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Israel Hands",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Hector Barbossa",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Jack Sparrow",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Jim Hawkins",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Joshamee Gibbs",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Kanca",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Karayip Korsanları",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Karayip Korsanları: Dünyanın Sonu",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Karayip Korsanları: Gizemli Denizlerde",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Karayip Korsanları: Ölü Adamın Sandığı",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Karayip Korsanları: Salazar'ın İntikamı",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Karayip Korsanları: Siyah İnci'nin Laneti",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Long John Silver",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Maymun Jack",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Sandokan",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Smee",
    "category": "dizi_film_karakterleri"
  },
  {
    "name": "Pippi Uzunçorap",
    "category": "dizi_film_karakterleri"
  }
]

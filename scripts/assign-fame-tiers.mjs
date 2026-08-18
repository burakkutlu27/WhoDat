/**
 * Nihai Hassas ve Kültürel Tutarlı Fame Tier Dağıtım Motoru
 */

import { readFileSync, writeFileSync, existsSync, unlinkSync } from 'node:fs'
import { resolve, join } from 'node:path'

const PROJECT_ROOT = resolve('.')
const DATA_FILE = join(PROJECT_ROOT, 'src/lib/game/famousPeopleData.ts')
const PROGRESS_FILE = join(PROJECT_ROOT, 'fame-tier-progress.json')

// ─────────────────────────────────────────────────────────────
// 1. TIER 1: EN BÜYÜK SÜPERSTARLAR & DEV İKONLAR (~4%)
// ─────────────────────────────────────────────────────────────
const TIER_1_KEYWORDS = [
  'atatürk', 'mustafa kemal', 'ismet inönü', 'fatih sultan mehmet', 'kanuni sultan süleyman',
  'yavuz sultan selim', 'osman gazi', 'ii. abdülhamid', 'mevlana', 'mimar sinan', 'yunus emre',
  'aşık veysel', 'barış manço', 'cem karaca', 'tarkan', 'sezen aksu', 'müslüm gürses',
  'ibrahim tatlıses', 'ajda pekkan', 'zeki müren', 'ahmet kaya', 'orhan gencebay',
  'ferdi tayfur', 'neşet ertaş', 'kemal sunal', 'cem yılmaz', 'şener şen', 'halit akçatepe',
  'münir özkul', 'adile naşit', 'tarık akan', 'cüneyt arkın', 'türkan şoray', 'fatma girik',
  'filiz akın', 'hülya koçyiğit', 'kadir inanır', 'sadri alışık', 'zeki alasya', 'metin akpınar',
  'ayşen gruda', 'ilyas salman', 'levent kırca', 'nejat uygur', 'yılmaz erdoğan', 'ata demirer',
  'beyazıt öztürk', 'acun ılıcalı', 'mehmet ali erbil', 'müge anlı', 'haluk bilginer',
  'fatih terim', 'mustafa denizli', 'şenol güneş', 'arda turan', 'hakan şükür', 'naim süleymanoğlu',
  'alex de souza', 'gheorghe hagi', 'muslera', 'volkan demirel', 'rüştü reçber',
  'albert einstein', 'isaac newton', 'leonardo da vinci', 'nikola tesla', 'kristof kolomb',
  'büyük iskender', 'jül sezar', 'napolyon', 'adolf hitler', 'winston churchill',
  'abraham lincoln', 'vladimir lenin', 'joseph stalin', 'mahatma gandhi', 'nelson mandela',
  'che guevara', 'kraliçe ii. elizabeth', 'prenses diana',
  'michael jackson', 'madonna', 'freddie mercury', 'elvis presley', 'eminem', 'shakira',
  'rihanna', 'beyoncé', 'taylor swift', 'justin bieber', 'lady gaga', 'britney spears',
  'brad pitt', 'leonardo dicaprio', 'tom cruise', 'angelina jolie', 'johnny depp',
  'arnold schwarzenegger', 'sylvester stallone', 'marilyn monroe', 'charlie chaplin',
  'morgan freeman', 'will smith', 'keanu reeves', 'jackie chan', 'bruce lee',
  'cristiano ronaldo', 'lionel messi', 'diego maradona', 'pelé', 'zinedine zidane',
  'david beckham', 'ronaldinho', 'neymar', 'kylian mbappé', 'michael jordan',
  'kobe bryant', 'lebron james', 'shaquille o\'neal', 'muhammed ali', 'mike tyson',
  'usain bolt', 'michael schumacher', 'roger federer',
  'recep ivedik', 'polat alemdar', 'süleyman çakır', 'ramiz dayı', 'bihter ziyagil',
  'behlül haznedar', 'burhan altıntop', 'inek şaban', 'kel mahmut', 'güdük necmi',
  'damat ferit', 'badi ekrem', 'tosun paşa', 'kibar feyzo', 'maho ağa', 'züğürt ağa',
  'turist ömer', 'arif ışık', 'batman', 'superman', 'örümcek adam', 'spider-man',
  'demir adam', 'iron man', 'hulk', 'kaptan amerika', 'thor', 'joker', 'harry potter',
  'voldemort', 'dumbledore', 'gandalf', 'darth vader', 'yoda', 'luke skywalker',
  'jack sparrow', 'sherlock holmes', 'james bond', 'terminatör', 'rocky balboa',
  'john rambo', 'mickey mouse', 'donald duck', 'tom ve jerry', 'bugs bunny', 'temel reis',
  'garfield', 'red kit', 'şirin baba', 'gargamel', 'fred çakmaktaş', 'shrek',
  'süngerbob', 'pikachu', 'super mario', 'don kişot', 'drakula', 'frankenstein',
  'küçük prens', 'robin hood', 'pinokyo', 'pamuk prenses', 'külkedisi',
  'kırmızı başlıklı kız', 'aladdin', 'zeus', 'herkül', 'keloğlan', 'nasreddin hoca', 'dede korkut'
]

// ─────────────────────────────────────────────────────────────
// 2. TIER 2: YAYGIN BİLİNEN ÜNLÜLER (~15-18%)
// ─────────────────────────────────────────────────────────────
const TIER_2_KEYWORDS = [
  // Popüler Türk Şarkıcılar & Gruplar
  'hadise', 'murat boz', 'gülşen', 'aleyna tilki', 'edis', 'simge', 'demet akalın',
  'hande yener', 'sıla', 'kenan doğulu', 'sertab erener', 'serdar ortaç', 'mustafa sandal',
  'haluk levent', 'teoman', 'şebnem ferah', 'kayahan', 'erkin koray', 'ilhan irem',
  'emre aydın', 'manga', 'duman', 'mor ve ötesi', 'athena', 'gökhan özoğuz', 'ceza',
  'sagopa', 'ezhel', 'uzi', 'motive', 'sefo', 'reynmen', 'çelik', 'bendeniz',
  'hakan peker', 'burak kut', 'yonca evcimik', 'aşkın nur yengi', 'izel', 'ercan saatçi',
  'yalın', 'gökhan tepe', 'soner sarıkabadayı', 'ferhat göçer', 'kıraç', 'murat kekilli',
  'cem adrian', 'mabel matiz', 'manuş baba', 'koray avcı', 'kubat', 'zara', 'şevval sam',
  'volkan konak', 'cengiz kurtoğlu', 'ümit besen', 'hakan altun', 'coşkun sabah',
  'muazzez ersoy', 'muazzez abacı', 'emel sayın', 'nükhet duru', 'nilüfer', 'erol evgin',
  'selda bağcan', 'cahit berkay', 'moğollar', 'barış akarsu', 'kazım koyuncu', 'intizar',
  'ceylan', 'alişan', 'nihat doğan', 'doğuş', 'rober hatemo', 'kibariye', 'güllü', 'linet',
  'fatih ürek', 'kuşum aydın', 'bedia akartürk', 'belkıs akkale', 'izzet altınmeşe',
  'mahmut tuncer', 'latif doğan', 'banu alkan', 'ahu tuğba', 'serpil çakmaklı', 'oya aydoğan',
  'ebru gündeş', 'sibel can', 'yıldız tilbe', 'mahsun kırmızıgül', 'özcan deniz',
  'sinan akçıl', 'mustafa ceceli', 'emre altuğ', 'berkay', 'gökhan özen', 'tan taşçı',
  'kutsi', 'gripin', 'pinhani', 'yüksek sadakat', 'redd', 'fatma turgut', 'ceylan ertem',
  'kalben', 'sena şener', 'melike şahin', 'emir can iğrek', 'köfn', 'semicenk',
  'dedublüman', 'can bonomo', 'gökhan türkmen', 'ilyas yalçıntaş', 'bilal sonses',
  'buray', 'ece seçkin', 'derya uluğ', 'irem derici', 'tuğçe kandemir', 'melek mosso',

  // Türk Oyuncular
  'kenan imirzalıoğlu', 'kıvanç tatlıtuğ', 'beren saat', 'çetin tekindor', 'tolga çevik',
  'bülent inal', 'engin altan düzyatan', 'burak özçivit', 'fahriye evcen', 'tolga sarıtaş',
  'çağatay ulusoy', 'aras bulut iynemli', 'engin akyürek', 'cansu dere', 'merve dizdar',
  'farah zeynep abdullah', 'kerem bürsin', 'demet özdemir', 'pınar deniz', 'kaan urgancıoğlu',
  'afra saraçoğlu', 'mert ramazan demir', 'hazal kaya', 'ali atay', 'serkan keskin',
  'ahmet kural', 'murat cemcir', 'rasim öztekin', 'erdal beşikçioğlu', 'perran kutman',
  'gülşen bubikoğlu', 'kartal tibet', 'hulusi kentmen', 'ali şen', 'ahmet tarık tekçe',
  'nubar terziyan', 'necdet tosun', 'erdal özyağcılar', 'halit ergenç', 'bergüzar korel',
  'okan yalabık', 'nebahat çehre', 'meryem uzerli', 'vahide perçin', 'tuba büyüküstün',
  'serenay sarıkaya', 'hande erçel', 'barış arduç', 'elçin sangu', 'burcu biricik',
  'özge özpirinçci', 'gökçe bahadır', 'salih bademci', 'uraz kaygılaroğlu', 'feyyaz yiğit',
  'kıvanç kılınç', 'doğu demirkol', 'hasan can kaya', 'kaan sekban', 'eser yenenler',
  'ibrahim büyükak', 'oğuzhan koç', 'büşra pekin', 'şahin ırmak', 'sarp apak', 'öner erkan',
  'hasibe eren', 'gupse özay', 'ezgi mola', 'demet evgar', 'songül öden', 'ceyda düvenci',
  'berna laçin', 'zuhal olcay', 'derya baykal', 'şafak sezer', 'ertan saban', 'önder açıkbaş',
  'alper kul', 'aylin kontante', 'meltem cumbul', 'mehmet günsür', 'nur fettahoğlu',
  'ozan güven', 'selma ergeç', 'engin günaydın', 'binnur kaya', 'necip memili', 'rıza kocaoğlu',
  'erkan kolçak köstendil', 'taner ölmez', 'salih kalyon', 'zafer algöz', 'zerrin tekindor',
  'yurdaer okur', 'ilker kaleli', 'birce akalay', 'buğra gülsoy', 'şükrü özyıldız',
  'hazal subaşı', 'burcu özberk', 'alp navruz', 'aytaç şaşmaz', 'deniz baysal',
  'ahmet mümtaz taylan', 'ali ihsan varol', 'ulaş tuna astepe', 'arif erkin',
  'alperen duymaz', 'berk atan', 'serkan çayoğlu', 'furkan andıç', 'boran kuzum',
  'dilan çiçek deniz', 'ebru şahin', 'melis sezen', 'mert yazıcıoğlu', 'miray daner',
  'öykü karayel', 'özge gürel', 'özgü namal', 'pelin akil', 'pelin karahan', 'seda bakan',
  'selahattin paşalı', 'settar tanrıöğen', 'sinem kobal', 'şebnem bozoklu', 'tolgahan sayışman',
  'tuba ünsal', 'ufuk bayraktar', 'yiğit özşener', 'begüm kütük', 'begüm birgören',
  'başak parlak', 'ceyda ateş', 'buse terim', 'bige önal', 'simay barlas', 'sümeyye aydoğan',
  'rabia soytürk', 'lizge cömert', 'su burcu yazgı coşkun', 'onur seyit yaran',
  'cihan şimşek', 'yiğit koçak', 'halit özgür sarı',

  // Yabancı Sanatçılar / Aktörler
  'adele', 'billie eilish', 'dua lipa', 'bruno mars', 'katy perry', 'selena gomez',
  'ariana grande', 'ed sheeran', 'coldplay', 'metallica', 'queen', 'pink floyd', 'nirvana',
  'bob marley', '2pac', 'snoop dogg', '50 cent', 'drake', 'the weeknd', 'avicii', 'daft punk',
  'robert de niro', 'al pacino', 'anthony hopkins', 'samuel l. jackson', 'clint eastwood',
  'george clooney', 'matt damon', 'ben affleck', 'harrison ford', 'tom hanks',
  'denzel washington', 'meryl streep', 'julia roberts', 'scarlett johansson', 'emma watson',
  'jennifer aniston', 'jennifer lawrence', 'anne hathaway', 'natalie portman', 'hugh jackman',
  'chris hemsworth', 'robert downey jr.', 'chris evans', 'mark ruffalo', 'ryan reynolds',
  'cillian murphy', 'heath ledger', 'christian bale', 'joaquin phoenix', 'pedro pascal',
  'timothée chalamet', 'zendaya', 'woody allen', 'steven spielberg', 'christopher nolan',
  'quentin tarantino', 'martin scorsese', 'stanley kubrick', 'alfred hitchcock',

  // Spor Dünyası
  'arda güler', 'hakan çalhanoğlu', 'kerem aktürkoğlu', 'barış alper yılmaz', 'semih kılıçsoy',
  'ferdi kadıoğlu', 'kenan yıldız', 'merih demiral', 'çağlar söyüncü', 'cenk tosun',
  'burak yılmaz', 'selçuk inan', 'emre belözoğlu', 'sergen yalçın', 'tugay kerimoğlu',
  'nihat kahveci', 'ilkay gündoğan', 'mesut özil', 'cedi osman', 'alperen şengün',
  'furkan korkmaz', 'hidayet türkoğlu', 'mehmet okur', 'ibrahim kutluay', 'eda erdem',
  'zehra güneş', 'melissa vargas', 'ebrar karakurt', 'hande baladın', 'gizem örge',
  'mete gazoz', 'busenaz sürmeneli', 'buse naz çakıroğlu', 'rıza kayaalp', 'taha akgül',
  'servet tazegül', 'hamza yerlikaya', 'halil mutlu', 'semih saygıner', 'kenan sofuoğlu',
  'toprak razgatlıoğlu', 'erling haaland', 'mauro icardi', 'edin dzeko', 'edin džeko',
  'dusan tadic', 'dušan tadić', 'dries mertens', 'lucas torreira', 'vincent aboubakar',
  'fred', 'dominik livakovic', 'rafa silva', 'ciro immobile', 'victor osimhen',
  'zlatan ibrahimovic', 'zlatan ibrahimović', 'karim benzema', 'robert lewandowski',
  'luka modric', 'luka modrić', 'kevin de bruyne', 'mohamed salah', 'gianluigi buffon',
  'manuel neuer', 'thierry henry', 'stephen curry', 'giannis antetokounmpo',
  'novak djokovic', 'rafael nadal', 'serena williams', 'lewis hamilton', 'max verstappen',
  'conor mcgregor', 'khabib nurmagomedov', 'carlos alcaraz', 'jannik sinner',
  'pep guardiola', 'jose mourinho', 'carlo ancelotti', 'jürgen klopp', 'arsène wenger',
  'alex ferguson', 'didier drogba', 'wesley sneijder', 'robin van persie', 'dirk kuyt',
  'mario gomez', 'ricardo quaresma', 'pepe', 'talisca',

  // Tarih / Edebiyat / Bilim
  'barbaros hayreddin paşa', 'piri reis', 'hacı bektaş-ı veli', 'evliya çelebi',
  'osman hamdi bey', 'namık kemal', 'mehmet akif ersoy', 'ziya gökalp', 'nazım hikmet',
  'orhan veli kanık', 'necip fazıl kısakürek', 'yaşar kemal', 'aziz nesin', 'oğuz atay',
  'sabahattin ali', 'halide edip adıvar', 'reşat nuri güntekin', 'peyami safa', 'ahmet hamdi tanpınar',
  'aziz sancar', 'cahit arf', 'ilber ortaylı', 'celal şengör', 'halil inalcık',
  'adnan menderes', 'turgut özal', 'süleyman demirel', 'bülent ecevit', 'necmettin erbakan',
  'alparslan türkeş', 'deniz gezmiş', 'uğur mumcu', 'abdi ipekçi', 'attila', 'cengiz han',
  'timur', 'selahaddin eyyubi', 'alparslan', 'mete han', 'bilge kağan', 'konfüçyüs',
  'buda', 'sokrates', 'platon', 'aristoteles', 'karl marx', 'friedrich nietzsche',
  'sigmund freud', 'charles darwin', 'stephen hawking', 'marie curie', 'thomas edison',
  'alexander graham bell', 'louis pasteur', 'pisagor', 'arşimet', 'hipokrat',
  'kleopatra', 'spartaküs', 'jeanne d\'arc', 'kraliçe victoria', 'john f. kennedy',
  'martin luther king', 'ömer hayyam', 'ibn-i haldun',

  // Popüler Karakterler
  'walter white', 'jesse pinkman', 'saul goodman', 'jon snow', 'daenerys targaryen',
  'tyrion lannister', 'thomas shelby', 'arthur shelby', 'vito corleone', 'michael corleone',
  'tony montana', 'frodo baggins', 'aragorn', 'legolas', 'gollum', 'sauron',
  'neo', 'morpheus', 'john wick', 'forrest gump', 'indiana jones', 'hannibal lecter',
  'tyler durden', 'patrick bateman', 'jordan belfort', 'profesör', 'berlin', 'tokyo',
  'michael scofield', 'theodore bagwell', 'dexter morgan', 'wednesday addams',
  'eleven', 'homelander', 'memati baş', 'abdülhey çoban', 'seyfo dayı', 'aslan akbey',
  'testere necmi', 'laz ziya', 'iskender büyük', 'pala', 'ezel bayraktar',
  'eyşan tezcan', 'cengiz atay', 'kerpeten ali', 'behzat ç.', 'harun', 'hayalet',
  'akbaba', 'ercüment çözer', 'yamaç koçovalı', 'idris koçovalı', 'vartolu sadettin',
  'cumali koçovalı', 'aliço', 'mecnun çınar', 'ismail abi', 'erdal bakkal',
  'yılmaz (gibi)', 'ilkkan (gibi)', 'ersoy (gibi)', 'gaffur aksoy', 'şahika koçarslanlı',
  'kuzey tekinoğlu', 'güney tekinoğlu', 'rıza baba', 'mesut komiser', 'hüsnü çoban',
  'hızır çakırbeyli', 'ilyas çakırbeyli', 'komutan logar', 'robot 216', 'bob marley faruk',
  'erşan kuneri', 'deadpool', 'wolverine', 'kara dul', 'doktor strange', 'flash',
  'aquaman', 'wonder woman', 'harley quinn', 'thanos', 'venom', 'patrick yıldız',
  'squidward', 'bay yengeç', 'plankton', 'goofy', 'daffy duck', 'tweety', 'sylvester',
  'scooby-doo', 'shaggy', 'safinaz', 'kabasakal', 'joe dalton', 'asteriks', 'oburiks',
  'tenten', 'şirine', 'barni moloztaş', 'cedric', 'heidi', 'winnie the pooh', 'simba',
  'mufasa', 'scar', 'fiona', 'eşek', 'çizmeli kedi', 'kung fu panda', 'manny',
  'sid', 'diego', 'scrat', 'woody', 'buzz lightyear', 'şimşek mcqueen', 'nemo', 'gru',
  'minyonlar', 'ben 10', 'samurai jack', 'johnny bravo', 'gumball', 'mordecai', 'rigby',
  'finn', 'jake', 'rafadan tayfa', 'hayri', 'kamil', 'kral şakir', 'fil necati', 'pepee',
  'ash ketchum', 'goku', 'vegeta', 'naruto', 'sasuke', 'kakashi', 'luffy', 'zoro',
  'sailor moon', 'kaptan tsubasa', 'luigi', 'prenses peach', 'bowser', 'sonic', 'link',
  'pac-man', 'crash bandicoot', 'lara croft', 'kratos', 'geralt of rivia', 'arthur morgan',
  'john marston', 'cj', 'tommy vercetti', 'trevor philips', 'niko bellic', 'master chief',
  'doom slayer', 'gordon freeman', 'nathan drake', 'joel miller', 'ellie williams',
  'scorpion', 'sub-zero', 'ryu', 'steve', 'creeper', 'dorian gray', 'raskolnikov',
  'jean valjean', 'müfettiş javert', 'robinson crusoe', 'gulliver', 'tom sawyer',
  'oliver twist', 'romeo', 'juliet', 'hamlet', 'macbeth', 'faust', 'alice', 'şapkacı',
  'moby dick', 'tarzan', 'peter pan', 'kaptan kanca', 'tinker bell', 'gepetto usta',
  'rapunzel', 'uyuyan güzel', 'poseidon', 'hades', 'medusa', 'afrodit', 'ares', 'hermes',
  'apollo', 'artemis', 'athena', 'odin', 'loki', 'anubis', 'ra', 'osiris', 'isis',
  'şahmeran', 'köroğlu'
]

// ─────────────────────────────────────────────────────────────
// 3. TIER 3: ORTA DERECE BİLİNENLER (~28-32%)
// ─────────────────────────────────────────────────────────────
const TIER_3_KEYWORDS = [
  'poyraz karayel', 'nurcan taylan', 'ibn-i sina', 'alfie solomons', 'sonny corleone',
  'gus fring', 'mike ehrmantraut', 'hank schrader', 'polly gray', 'cersei lannister',
  'jaime lannister', 'arya stark', 'sansa stark', 'ned stark', 'gece kralı', 'hermione granger',
  'ron weasley', 'severus snape', 'sirius black', 'rubeus hagrid', 'draco malfoy',
  'bellatrix lestrange', 'dobby', 'samwise gamgee', 'gimli', 'boromir', 'saruman',
  'bilbo baggins', 'prenses leia', 'han solo', 'chewbacca', 'obi-wan kenobi',
  'imparator palpatine', 'darth maul', 'kylo ren', 'mandalorian', 'bebek yoda', 'grogu',
  'will turner', 'elizabeth swann', 'kaptan hector barbossa', 'davy jones', 'dr. john watson',
  'profesör james moriarty', 'trinity', 'ajan smith', 'sarah connor', 'kenan birkan',
  'tefo', 'adnan ziyagil', 'firdevs yöreoğlu', 'matmazel', 'sanço panço', 'cuma',
  'huckleberry finn', 'kral lear', 'othello', 'mefistofeles', 'kupa kraliçesi',
  'cheshire kedisi', 'zeze', 'kaptan ahab', 'kötü kalpli kurt', 'freya', 'atreus',
  'ciri', 'yennefer of vengerberg', 'darwin',
  'altay bayındır', 'uğurcan çakır', 'mert günok', 'samet akaydin', 'abdülkerim bardakcı',
  'kaan ayhan', 'zeki çelik', 'ozan kabak', 'salih özcan', 'ismail yüksek', 'orkun kökçü',
  'irfan can kahveci', 'yunus akgün', 'cengiz ünder', 'yusuf yazıcı', 'enes ünal',
  'bertuğ yıldırım', 'umut nayir', 'salih uçan', 'necip uysal', 'berkan kutlu',
  'abdülkadir ömür', 'dorukhan toköz', 'ozan tufan', 'okay yokuşlu', 'mahmut tekdemir',
  'hasan ali kaldırım', 'caner erkin', 'gökhan gönül', 'mehmet topal', 'sabri sarıoğlu',
  'servet çetin', 'egemen korkmaz', 'gökhan zan', 'ibrahim toraman', 'tuncay şanlı',
  'tümer metin', 'ümit karan', 'ilhan mansız', 'alpay özalan', 'okan buruk', 'emre aşık',
  'bülent korkmaz', 'hakan ünsal', 'ergün penbe', 'arif erdem', 'suat kaya', 'hami mandıralı',
  'aykut kocaman', 'rıdvan dilmen', 'tanju çolak', 'metin oktay', 'lefter küçükandonyadis',
  'can bartu', 'hakkı yeten', 'ersan ilyasova', 'ömer aşık', 'semih erden',
  'kerem tunçeri', 'ender arslan', 'sinan güler', 'oğuz savaş', 'naz aydemir akyol',
  'neslihan demir', 'meryem boz', 'kübra akman', 'cansu özbay', 'elif şahin',
  'derya cebecioğlu', 'ilkin aydın', 'ayça aykaç', 'simge aköz',
  'mozart', 'beethoven', 'bach', 'chopin', 'vivaldi', 'tchaikovsky', 'dante', 'shakespeare',
  'tolstoy', 'dostoyevski', 'victor hugo', 'goethe', 'balzac', 'franz kafka', 'michelangelo',
  'rafael', 'rembrandt', 'van gogh', 'picasso', 'salvador dali', 'monet'
]

function normalize(str) {
  return str.toLocaleLowerCase('tr')
    .replace(/\s*\([^)]*\)/g, '')
    .replace(/[^a-z0-9çğıöşü\s]/g, '')
    .trim()
}

function matchKeywordList(name, norm, kwList) {
  const lower = name.toLocaleLowerCase('tr')
  for (const kw of kwList) {
    if (lower.includes(kw) || norm.includes(kw)) {
      return true
    }
  }
  return false
}

function classifyPerson(item) {
  const { name, category } = item
  const raw = name.trim()
  const lower = raw.toLocaleLowerCase('tr')
  const norm = normalize(name)

  // 1. Tier 1 Kontrolü
  if (matchKeywordList(name, norm, TIER_1_KEYWORDS)) {
    return 1
  }

  // 2. Tier 2 Kontrolü
  if (matchKeywordList(name, norm, TIER_2_KEYWORDS)) {
    return 2
  }

  // 3. Tier 3 Kontrolü
  if (matchKeywordList(name, norm, TIER_3_KEYWORDS)) {
    return 3
  }

  // 4. Kategori Heuristikleri
  if (category === 'dizi_film_karakterleri') {
    return 3
  }

  if (category === 'cizgi_karakterler') {
    return 3
  }

  if (category === 'tarihi_kisiler') {
    if (/sultan|padişah|kral|kraliçe|imparator|cumhurbaşkanı|başbakan|filozof|bilim|nobel/i.test(lower)) {
      return 3
    }
    if (/I\.|II\.|III\.|IV\.|V\.|VI\.|VII\.|VIII\.|IX\.|X\./.test(raw)) {
      return 3
    }
    // Çok eski veya lokal niş maddeler
    if (/m\.ö\.|valisi|sadrazam|mutasarrıf|kadı|beylerbeyi|müderris|oğlu/i.test(lower) || raw.length > 22) {
      return 5
    }
    return 4
  }

  if (category === 'sporcular') {
    if (/milli|şampiyon|olimpiyat|süper lig|fc|sk/i.test(lower)) {
      return 3
    }
    if (/[éèêëàâäôöûüïîç]/i.test(raw) || raw.length > 22 || /güreş|boks|atlet|kürek|halter|voleybolcu|basketbolcu/i.test(lower)) {
      return 5
    }
    return 4
  }

  if (category === 'unluler') {
    if (raw.length > 24) {
      return 5
    }
    // Standart 2-kelimeli sanatçılar Tier 4
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
  
  // 100'lük gruplar halinde işle
  const BATCH_SIZE = 100
  let lastProcessedIndex = 0
  
  while (lastProcessedIndex < totalCount) {
    const endIndex = Math.min(lastProcessedIndex + BATCH_SIZE, totalCount)
    for (let i = lastProcessedIndex; i < endIndex; i++) {
      seedArray[i].fameTier = classifyPerson(seedArray[i])
    }
    lastProcessedIndex = endIndex
    
    writeFileSync(PROGRESS_FILE, JSON.stringify({
      lastProcessedIndex,
      totalCount,
      updatedAt: new Date().toISOString()
    }, null, 2))
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
  
  let newContent = content
  
  newContent = newContent.replace(
    /export interface FamousPersonItem \{([\s\S]*?)\}/,
    `export interface FamousPersonItem {
  id: string
  name: string
  category: Exclude<FamousPersonCategory, 'all'>
  fameTier?: number
}`
  )
  
  newContent = newContent.replace(
    /export interface FamousPersonSeed \{([\s\S]*?)\}/,
    `export interface FamousPersonSeed {
  name: string
  category: string
  fameTier: number
}`
  )
  
  const formattedJson = JSON.stringify(seedArray, null, 2)
  newContent = newContent.replace(
    /export const FAMOUS_PEOPLE_SEED: FamousPersonSeed\[\] = \[[\s\S]*?\n\]/,
    `export const FAMOUS_PEOPLE_SEED: FamousPersonSeed[] = ${formattedJson}`
  )
  
  writeFileSync(DATA_FILE, newContent, 'utf-8')
  console.log('✅ famousPeopleData.ts başarıyla güncellendi!')
  
  if (existsSync(PROGRESS_FILE)) {
    unlinkSync(PROGRESS_FILE)
    console.log('🧹 fame-tier-progress.json temizlendi.')
  }
}

main().catch(err => {
  console.error('❌ Hata:', err)
  process.exit(1)
})

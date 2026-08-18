/**
 * Kapsamlı Yerel Veritabanı Oluşturucu (Offline / Tek Seferlik)
 *
 * Canlı oyunda API çağrılmaz!
 * Bu script tüm küratörlü kült karakterleri (Vito Corleone, Don Kişot, Zeus vb.)
 * ve binlerce doğrulanmış Wikipedia ismini birleştirip `famousPeopleData.ts` ile
 * `supabase/migrations/20260817100000_create_famous_people.sql` dosyalarına yazar.
 */

import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// 1. KESİNLİKLE BULUNMASI GEREKEN KÜRATÖRLÜ KÜLT KARAKTERLER & ÜNLÜLER
const GUARANTEED_CURATED = [
  // ── DİZİ & FİLM KARAKTERLERİ ──
  { name: 'Vito Corleone (Baba / The Godfather)', category: 'dizi_film_karakterleri' },
  { name: 'Michael Corleone', category: 'dizi_film_karakterleri' },
  { name: 'Sonny Corleone', category: 'dizi_film_karakterleri' },
  { name: 'Tony Montana (Yaralı Yüz / Scarface)', category: 'dizi_film_karakterleri' },
  { name: 'Walter White (Heisenberg)', category: 'dizi_film_karakterleri' },
  { name: 'Jesse Pinkman', category: 'dizi_film_karakterleri' },
  { name: 'Saul Goodman (Jimmy McGill)', category: 'dizi_film_karakterleri' },
  { name: 'Gus Fring', category: 'dizi_film_karakterleri' },
  { name: 'Mike Ehrmantraut', category: 'dizi_film_karakterleri' },
  { name: 'Hank Schrader', category: 'dizi_film_karakterleri' },
  { name: 'Thomas Shelby (Peaky Blinders)', category: 'dizi_film_karakterleri' },
  { name: 'Arthur Shelby', category: 'dizi_film_karakterleri' },
  { name: 'Polly Gray (Peaky Blinders)', category: 'dizi_film_karakterleri' },
  { name: 'Alfie Solomons', category: 'dizi_film_karakterleri' },
  { name: 'Jon Snow (Game of Thrones)', category: 'dizi_film_karakterleri' },
  { name: 'Daenerys Targaryen', category: 'dizi_film_karakterleri' },
  { name: 'Tyrion Lannister', category: 'dizi_film_karakterleri' },
  { name: 'Cersei Lannister', category: 'dizi_film_karakterleri' },
  { name: 'Jaime Lannister', category: 'dizi_film_karakterleri' },
  { name: 'Arya Stark', category: 'dizi_film_karakterleri' },
  { name: 'Sansa Stark', category: 'dizi_film_karakterleri' },
  { name: 'Ned Stark', category: 'dizi_film_karakterleri' },
  { name: 'Gece Kralı (Night King)', category: 'dizi_film_karakterleri' },
  { name: 'Harry Potter', category: 'dizi_film_karakterleri' },
  { name: 'Hermione Granger', category: 'dizi_film_karakterleri' },
  { name: 'Ron Weasley', category: 'dizi_film_karakterleri' },
  { name: 'Lord Voldemort', category: 'dizi_film_karakterleri' },
  { name: 'Albus Dumbledore', category: 'dizi_film_karakterleri' },
  { name: 'Severus Snape', category: 'dizi_film_karakterleri' },
  { name: 'Sirius Black', category: 'dizi_film_karakterleri' },
  { name: 'Rubeus Hagrid', category: 'dizi_film_karakterleri' },
  { name: 'Draco Malfoy', category: 'dizi_film_karakterleri' },
  { name: 'Bellatrix Lestrange', category: 'dizi_film_karakterleri' },
  { name: 'Dobby (Ev Cini)', category: 'dizi_film_karakterleri' },
  { name: 'Frodo Baggins', category: 'dizi_film_karakterleri' },
  { name: 'Samwise Gamgee', category: 'dizi_film_karakterleri' },
  { name: 'Gandalf (Gri/Ak Gandalf)', category: 'dizi_film_karakterleri' },
  { name: 'Aragorn (Yolgezer)', category: 'dizi_film_karakterleri' },
  { name: 'Legolas', category: 'dizi_film_karakterleri' },
  { name: 'Gimli', category: 'dizi_film_karakterleri' },
  { name: 'Boromir', category: 'dizi_film_karakterleri' },
  { name: 'Gollum (Smeagol)', category: 'dizi_film_karakterleri' },
  { name: 'Sauron', category: 'dizi_film_karakterleri' },
  { name: 'Saruman', category: 'dizi_film_karakterleri' },
  { name: 'Bilbo Baggins', category: 'dizi_film_karakterleri' },
  { name: 'Luke Skywalker', category: 'dizi_film_karakterleri' },
  { name: 'Darth Vader (Anakin Skywalker)', category: 'dizi_film_karakterleri' },
  { name: 'Prenses Leia', category: 'dizi_film_karakterleri' },
  { name: 'Han Solo', category: 'dizi_film_karakterleri' },
  { name: 'Chewbacca', category: 'dizi_film_karakterleri' },
  { name: 'Yoda (Usta Yoda)', category: 'dizi_film_karakterleri' },
  { name: 'Obi-Wan Kenobi', category: 'dizi_film_karakterleri' },
  { name: 'İmparator Palpatine', category: 'dizi_film_karakterleri' },
  { name: 'Darth Maul', category: 'dizi_film_karakterleri' },
  { name: 'Kylo Ren', category: 'dizi_film_karakterleri' },
  { name: 'Mandalorian (Din Djarin)', category: 'dizi_film_karakterleri' },
  { name: 'Bebek Yoda (Grogu)', category: 'dizi_film_karakterleri' },
  { name: 'Kaptan Jack Sparrow', category: 'dizi_film_karakterleri' },
  { name: 'Will Turner', category: 'dizi_film_karakterleri' },
  { name: 'Elizabeth Swann', category: 'dizi_film_karakterleri' },
  { name: 'Kaptan Hector Barbossa', category: 'dizi_film_karakterleri' },
  { name: 'Davy Jones', category: 'dizi_film_karakterleri' },
  { name: 'Sherlock Holmes', category: 'dizi_film_karakterleri' },
  { name: 'Dr. John Watson', category: 'dizi_film_karakterleri' },
  { name: 'Profesör James Moriarty', category: 'dizi_film_karakterleri' },
  { name: 'James Bond (007)', category: 'dizi_film_karakterleri' },
  { name: 'Neo (Matrix / Thomas Anderson)', category: 'dizi_film_karakterleri' },
  { name: 'Morpheus (Matrix)', category: 'dizi_film_karakterleri' },
  { name: 'Trinity (Matrix)', category: 'dizi_film_karakterleri' },
  { name: 'Ajan Smith', category: 'dizi_film_karakterleri' },
  { name: 'John Wick', category: 'dizi_film_karakterleri' },
  { name: 'Terminatör (T-800)', category: 'dizi_film_karakterleri' },
  { name: 'Sarah Connor', category: 'dizi_film_karakterleri' },
  { name: 'Forrest Gump', category: 'dizi_film_karakterleri' },
  { name: 'Indiana Jones', category: 'dizi_film_karakterleri' },
  { name: 'Rocky Balboa', category: 'dizi_film_karakterleri' },
  { name: 'John Rambo', category: 'dizi_film_karakterleri' },
  { name: 'Hannibal Lecter', category: 'dizi_film_karakterleri' },
  { name: 'Tyler Durden (Dövüş Kulübü)', category: 'dizi_film_karakterleri' },
  { name: 'Patrick Bateman (Amerikan Sapığı)', category: 'dizi_film_karakterleri' },
  { name: 'Jordan Belfort (Para Avcısı)', category: 'dizi_film_karakterleri' },
  { name: 'Profesör (La Casa de Papel)', category: 'dizi_film_karakterleri' },
  { name: 'Berlin (La Casa de Papel)', category: 'dizi_film_karakterleri' },
  { name: 'Tokyo (La Casa de Papel)', category: 'dizi_film_karakterleri' },
  { name: 'Michael Scofield (Prison Break)', category: 'dizi_film_karakterleri' },
  { name: 'Theodore Bagwell (T-Bag)', category: 'dizi_film_karakterleri' },
  { name: 'Dexter Morgan', category: 'dizi_film_karakterleri' },
  { name: 'Wednesday Addams', category: 'dizi_film_karakterleri' },
  { name: 'Eleven (Stranger Things)', category: 'dizi_film_karakterleri' },
  { name: 'Homelander (The Boys)', category: 'dizi_film_karakterleri' },
  { name: 'Billy Butcher (The Boys)', category: 'dizi_film_karakterleri' },
  { name: 'Polat Alemdar', category: 'dizi_film_karakterleri' },
  { name: 'Süleyman Çakır', category: 'dizi_film_karakterleri' },
  { name: 'Memati Baş', category: 'dizi_film_karakterleri' },
  { name: 'Abdülhey Çoban', category: 'dizi_film_karakterleri' },
  { name: 'Seyfo Dayı', category: 'dizi_film_karakterleri' },
  { name: 'Aslan Akbey', category: 'dizi_film_karakterleri' },
  { name: 'Testere Necmi', category: 'dizi_film_karakterleri' },
  { name: 'Laz Ziya', category: 'dizi_film_karakterleri' },
  { name: 'İskender Büyük', category: 'dizi_film_karakterleri' },
  { name: 'Pala (Kurtlar Vadisi)', category: 'dizi_film_karakterleri' },
  { name: 'Ramiz Dayı (Ramiz Karaeski)', category: 'dizi_film_karakterleri' },
  { name: 'Ezel Bayraktar', category: 'dizi_film_karakterleri' },
  { name: 'Eyşan Tezcan', category: 'dizi_film_karakterleri' },
  { name: 'Cengiz Atay', category: 'dizi_film_karakterleri' },
  { name: 'Kerpeten Ali (Ali Kırgız)', category: 'dizi_film_karakterleri' },
  { name: 'Kenan Birkan', category: 'dizi_film_karakterleri' },
  { name: 'Tefo (Tevfik Zaim)', category: 'dizi_film_karakterleri' },
  { name: 'Behzat Ç.', category: 'dizi_film_karakterleri' },
  { name: 'Harun (Behzat Ç.)', category: 'dizi_film_karakterleri' },
  { name: 'Hayalet (Behzat Ç.)', category: 'dizi_film_karakterleri' },
  { name: 'Akbaba (Behzat Ç.)', category: 'dizi_film_karakterleri' },
  { name: 'Ercüment Çözer', category: 'dizi_film_karakterleri' },
  { name: 'Behlül Haznedar', category: 'dizi_film_karakterleri' },
  { name: 'Bihter Ziyagil', category: 'dizi_film_karakterleri' },
  { name: 'Adnan Ziyagil', category: 'dizi_film_karakterleri' },
  { name: 'Firdevs Yöreoğlu', category: 'dizi_film_karakterleri' },
  { name: 'Matmazel (Aşk-ı Memnu)', category: 'dizi_film_karakterleri' },
  { name: 'Yamaç Koçovalı', category: 'dizi_film_karakterleri' },
  { name: 'İdris Koçovalı', category: 'dizi_film_karakterleri' },
  { name: 'Vartolu Sadettin', category: 'dizi_film_karakterleri' },
  { name: 'Cumali Koçovalı', category: 'dizi_film_karakterleri' },
  { name: 'Aliço (Çukur)', category: 'dizi_film_karakterleri' },
  { name: 'Mecnun Çınar', category: 'dizi_film_karakterleri' },
  { name: 'İsmail Abi', category: 'dizi_film_karakterleri' },
  { name: 'Erdal Bakkal', category: 'dizi_film_karakterleri' },
  { name: 'Yılmaz (Gibi)', category: 'dizi_film_karakterleri' },
  { name: 'İlkkan (Gibi)', category: 'dizi_film_karakterleri' },
  { name: 'Ersoy (Gibi)', category: 'dizi_film_karakterleri' },
  { name: 'Burhan Altıntop', category: 'dizi_film_karakterleri' },
  { name: 'Gaffur Aksoy', category: 'dizi_film_karakterleri' },
  { name: 'Şahika Koçarslanlı', category: 'dizi_film_karakterleri' },
  { name: 'Kuzey Tekinoğlu', category: 'dizi_film_karakterleri' },
  { name: 'Güney Tekinoğlu', category: 'dizi_film_karakterleri' },
  { name: 'Rıza Baba (Arka Sokaklar)', category: 'dizi_film_karakterleri' },
  { name: 'Mesut Komiser', category: 'dizi_film_karakterleri' },
  { name: 'Hüsnü Çoban', category: 'dizi_film_karakterleri' },
  { name: 'Hızır Çakırbeyli (EDHO)', category: 'dizi_film_karakterleri' },
  { name: 'İlyas Çakırbeyli', category: 'dizi_film_karakterleri' },
  { name: 'Recep İvedik', category: 'dizi_film_karakterleri' },
  { name: 'İnek Şaban', category: 'dizi_film_karakterleri' },
  { name: 'Damat Ferit', category: 'dizi_film_karakterleri' },
  { name: 'Güdük Necmi', category: 'dizi_film_karakterleri' },
  { name: 'Mahmut Hoca (Kel Mahmut)', category: 'dizi_film_karakterleri' },
  { name: 'Badi Ekrem', category: 'dizi_film_karakterleri' },
  { name: 'Tosun Paşa', category: 'dizi_film_karakterleri' },
  { name: 'Hakiki Tosun Paşa', category: 'dizi_film_karakterleri' },
  { name: 'Kibar Feyzo', category: 'dizi_film_karakterleri' },
  { name: 'Maho Ağa', category: 'dizi_film_karakterleri' },
  { name: 'Züğürt Ağa', category: 'dizi_film_karakterleri' },
  { name: 'Turist Ömer', category: 'dizi_film_karakterleri' },
  { name: 'Arif Işık (G.O.R.A.)', category: 'dizi_film_karakterleri' },
  { name: 'Komutan Logar', category: 'dizi_film_karakterleri' },
  { name: 'Robot 216', category: 'dizi_film_karakterleri' },
  { name: 'Bob Marley Faruk', category: 'dizi_film_karakterleri' },
  { name: 'Erşan Kuneri', category: 'dizi_film_karakterleri' },

  // ── ÇİZGİ KARAKTERLER, KURGUSAL, EDEBİYAT & MİTOLOJİ ──
  { name: 'Don Kişot (Don Quijote)', category: 'cizgi_karakterler' },
  { name: 'Sanço Panço (Sancho Panza)', category: 'cizgi_karakterler' },
  { name: 'Kont Drakula (Dracula)', category: 'cizgi_karakterler' },
  { name: 'Frankenstein (Canavar)', category: 'cizgi_karakterler' },
  { name: 'Dorian Gray', category: 'cizgi_karakterler' },
  { name: 'Raskolnikov (Suç ve Ceza)', category: 'cizgi_karakterler' },
  { name: 'Jean Valjean (Sefiller)', category: 'cizgi_karakterler' },
  { name: 'Müfettiş Javert', category: 'cizgi_karakterler' },
  { name: 'Küçük Prens (Le Petit Prince)', category: 'cizgi_karakterler' },
  { name: 'Robinson Crusoe', category: 'cizgi_karakterler' },
  { name: 'Cuma (Robinson Crusoe)', category: 'cizgi_karakterler' },
  { name: 'Gulliver (Gulliver’in Gezileri)', category: 'cizgi_karakterler' },
  { name: 'Huckleberry Finn', category: 'cizgi_karakterler' },
  { name: 'Tom Sawyer', category: 'cizgi_karakterler' },
  { name: 'Oliver Twist', category: 'cizgi_karakterler' },
  { name: 'Romeo (Romeo ve Juliet)', category: 'cizgi_karakterler' },
  { name: 'Juliet (Romeo ve Juliet)', category: 'cizgi_karakterler' },
  { name: 'Hamlet', category: 'cizgi_karakterler' },
  { name: 'Kral Lear', category: 'cizgi_karakterler' },
  { name: 'Macbeth', category: 'cizgi_karakterler' },
  { name: 'Othello', category: 'cizgi_karakterler' },
  { name: 'Faust (Goethe)', category: 'cizgi_karakterler' },
  { name: 'Mefistofeles (Faust)', category: 'cizgi_karakterler' },
  { name: 'Alice (Harikalar Diyarında)', category: 'cizgi_karakterler' },
  { name: 'Şapkacı (Mad Hatter)', category: 'cizgi_karakterler' },
  { name: 'Kupa Kraliçesi (Queen of Hearts)', category: 'cizgi_karakterler' },
  { name: 'Cheshire Kedisi', category: 'cizgi_karakterler' },
  { name: 'Zeze (Şeker Portakalı)', category: 'cizgi_karakterler' },
  { name: 'Kaptan Ahab (Moby Dick)', category: 'cizgi_karakterler' },
  { name: 'Moby Dick (Beyaz Balina)', category: 'cizgi_karakterler' },
  { name: 'Tarzan', category: 'cizgi_karakterler' },
  { name: 'Robin Hood', category: 'cizgi_karakterler' },
  { name: 'Peter Pan', category: 'cizgi_karakterler' },
  { name: 'Kaptan Kanca (Captain Hook)', category: 'cizgi_karakterler' },
  { name: 'Tinker Bell', category: 'cizgi_karakterler' },
  { name: 'Pinokyo (Pinocchio)', category: 'cizgi_karakterler' },
  { name: 'Gepetto Usta', category: 'cizgi_karakterler' },
  { name: 'Kırmızı Başlıklı Kız', category: 'cizgi_karakterler' },
  { name: 'Kötü Kalpli Kurt (Masal)', category: 'cizgi_karakterler' },
  { name: 'Pamuk Prenses', category: 'cizgi_karakterler' },
  { name: 'Külkedisi (Sindirella)', category: 'cizgi_karakterler' },
  { name: 'Rapunzel', category: 'cizgi_karakterler' },
  { name: 'Uyuyan Güzel', category: 'cizgi_karakterler' },
  { name: 'Aladdin (Alaaddin)', category: 'cizgi_karakterler' },
  { name: 'Sihirli Lambanın Cini', category: 'cizgi_karakterler' },
  { name: 'Ali Baba (Kırk Haramiler)', category: 'cizgi_karakterler' },
  { name: 'Sinbad (Denizci Sinbad)', category: 'cizgi_karakterler' },
  { name: 'Zeus (Yunan Baş Tanrısı)', category: 'cizgi_karakterler' },
  { name: 'Poseidon (Denizler Tanrısı)', category: 'cizgi_karakterler' },
  { name: 'Hades (Yeraltı Tanrısı)', category: 'cizgi_karakterler' },
  { name: 'Herkül (Herakles)', category: 'cizgi_karakterler' },
  { name: 'Medusa (Yılan Saçlı)', category: 'cizgi_karakterler' },
  { name: 'Afrodit (Aşk Tanrıçası)', category: 'cizgi_karakterler' },
  { name: 'Ares (Savaş Tanrısı)', category: 'cizgi_karakterler' },
  { name: 'Hermes (Haberci Tanrı)', category: 'cizgi_karakterler' },
  { name: 'Apollo (Güneş Tanrısı)', category: 'cizgi_karakterler' },
  { name: 'Artemis (Avcılık Tanrıçası)', category: 'cizgi_karakterler' },
  { name: 'Athena (Bilgelik Tanrıçası)', category: 'cizgi_karakterler' },
  { name: 'Odin (İskandinav Baş Tanrısı)', category: 'cizgi_karakterler' },
  { name: 'Thor (Şimşek Tanrısı)', category: 'cizgi_karakterler' },
  { name: 'Loki (Fesatlık Tanrısı)', category: 'cizgi_karakterler' },
  { name: 'Freya', category: 'cizgi_karakterler' },
  { name: 'Anubis (Mısır Ölüm Tanrısı)', category: 'cizgi_karakterler' },
  { name: 'Ra (Güneş Tanrısı)', category: 'cizgi_karakterler' },
  { name: 'Osiris', category: 'cizgi_karakterler' },
  { name: 'İsis', category: 'cizgi_karakterler' },
  { name: 'Şahmeran (Yılanların Şahı)', category: 'cizgi_karakterler' },
  { name: 'Keloğlan', category: 'cizgi_karakterler' },
  { name: 'Nasreddin Hoca', category: 'cizgi_karakterler' },
  { name: 'Dede Korkut', category: 'cizgi_karakterler' },
  { name: 'Köroğlu', category: 'cizgi_karakterler' },
  { name: 'Batman (Bruce Wayne)', category: 'cizgi_karakterler' },
  { name: 'Joker', category: 'cizgi_karakterler' },
  { name: 'Superman (Clark Kent)', category: 'cizgi_karakterler' },
  { name: 'Örümcek Adam (Spider-Man / Peter Parker)', category: 'cizgi_karakterler' },
  { name: 'Demir Adam (Iron Man / Tony Stark)', category: 'cizgi_karakterler' },
  { name: 'Kaptan Amerika (Steve Rogers)', category: 'cizgi_karakterler' },
  { name: 'Thor (Marvel)', category: 'cizgi_karakterler' },
  { name: 'Hulk (Bruce Banner)', category: 'cizgi_karakterler' },
  { name: 'Kara Dul (Black Widow / Natasha Romanoff)', category: 'cizgi_karakterler' },
  { name: 'Doktor Strange (Stephen Strange)', category: 'cizgi_karakterler' },
  { name: 'Deadpool (Wade Wilson)', category: 'cizgi_karakterler' },
  { name: 'Wolverine (Logan)', category: 'cizgi_karakterler' },
  { name: 'Flash (Barry Allen)', category: 'cizgi_karakterler' },
  { name: 'Aquaman (Arthur Curry)', category: 'cizgi_karakterler' },
  { name: 'Wonder Woman (Diana Prince)', category: 'cizgi_karakterler' },
  { name: 'Harley Quinn', category: 'cizgi_karakterler' },
  { name: 'Thanos', category: 'cizgi_karakterler' },
  { name: 'Venom', category: 'cizgi_karakterler' },
  { name: 'SüngerBob KareŞort', category: 'cizgi_karakterler' },
  { name: 'Patrick Yıldız', category: 'cizgi_karakterler' },
  { name: 'Squidward', category: 'cizgi_karakterler' },
  { name: 'Bay Yengeç', category: 'cizgi_karakterler' },
  { name: 'Plankton', category: 'cizgi_karakterler' },
  { name: 'Mickey Mouse', category: 'cizgi_karakterler' },
  { name: 'Donald Duck', category: 'cizgi_karakterler' },
  { name: 'Goofy', category: 'cizgi_karakterler' },
  { name: 'Bugs Bunny', category: 'cizgi_karakterler' },
  { name: 'Daffy Duck', category: 'cizgi_karakterler' },
  { name: 'Tweety', category: 'cizgi_karakterler' },
  { name: 'Sylvester', category: 'cizgi_karakterler' },
  { name: 'Tom ve Jerry', category: 'cizgi_karakterler' },
  { name: 'Scooby-Doo', category: 'cizgi_karakterler' },
  { name: 'Shaggy', category: 'cizgi_karakterler' },
  { name: 'Temel Reis', category: 'cizgi_karakterler' },
  { name: 'Safinaz', category: 'cizgi_karakterler' },
  { name: 'Kabasakal', category: 'cizgi_karakterler' },
  { name: 'Garfield', category: 'cizgi_karakterler' },
  { name: 'Red Kit (Lucky Luke)', category: 'cizgi_karakterler' },
  { name: 'Joe Dalton', category: 'cizgi_karakterler' },
  { name: 'Asteriks (Asterix)', category: 'cizgi_karakterler' },
  { name: 'Oburiks (Obelix)', category: 'cizgi_karakterler' },
  { name: 'Tenten (Tintin)', category: 'cizgi_karakterler' },
  { name: 'Şirin Baba', category: 'cizgi_karakterler' },
  { name: 'Şirine', category: 'cizgi_karakterler' },
  { name: 'Gargamel', category: 'cizgi_karakterler' },
  { name: 'Fred Çakmaktaş', category: 'cizgi_karakterler' },
  { name: 'Barni Moloztaş', category: 'cizgi_karakterler' },
  { name: 'Cedric', category: 'cizgi_karakterler' },
  { name: 'Heidi', category: 'cizgi_karakterler' },
  { name: 'Winnie the Pooh', category: 'cizgi_karakterler' },
  { name: 'Simba (Aslan Kral)', category: 'cizgi_karakterler' },
  { name: 'Mufasa', category: 'cizgi_karakterler' },
  { name: 'Scar (Aslan Kral)', category: 'cizgi_karakterler' },
  { name: 'Shrek', category: 'cizgi_karakterler' },
  { name: 'Fiona (Shrek)', category: 'cizgi_karakterler' },
  { name: 'Eşek (Shrek)', category: 'cizgi_karakterler' },
  { name: 'Çizmeli Kedi', category: 'cizgi_karakterler' },
  { name: 'Kung Fu Panda (Po)', category: 'cizgi_karakterler' },
  { name: 'Manny (Buz Devri)', category: 'cizgi_karakterler' },
  { name: 'Sid (Buz Devri)', category: 'cizgi_karakterler' },
  { name: 'Diego (Buz Devri)', category: 'cizgi_karakterler' },
  { name: 'Scrat (Buz Devri)', category: 'cizgi_karakterler' },
  { name: 'Woody (Oyuncak Hikayesi)', category: 'cizgi_karakterler' },
  { name: 'Buzz Lightyear', category: 'cizgi_karakterler' },
  { name: 'Şimşek McQueen (Arabalar)', category: 'cizgi_karakterler' },
  { name: 'Nemo (Kayıp Balık Nemo)', category: 'cizgi_karakterler' },
  { name: 'Gru (Çılgın Hırsız)', category: 'cizgi_karakterler' },
  { name: 'Minyonlar (Minions)', category: 'cizgi_karakterler' },
  { name: 'Ben 10', category: 'cizgi_karakterler' },
  { name: 'Samurai Jack', category: 'cizgi_karakterler' },
  { name: 'Johnny Bravo', category: 'cizgi_karakterler' },
  { name: 'Gumball', category: 'cizgi_karakterler' },
  { name: 'Darwin (Gumball)', category: 'cizgi_karakterler' },
  { name: 'Mordecai (Sürekli Dizi)', category: 'cizgi_karakterler' },
  { name: 'Rigby (Sürekli Dizi)', category: 'cizgi_karakterler' },
  { name: 'Finn (Adventure Time)', category: 'cizgi_karakterler' },
  { name: 'Jake (Adventure Time)', category: 'cizgi_karakterler' },
  { name: 'Rafadan Tayfa', category: 'cizgi_karakterler' },
  { name: 'Hayri (Rafadan Tayfa)', category: 'cizgi_karakterler' },
  { name: 'Kamil (Rafadan Tayfa)', category: 'cizgi_karakterler' },
  { name: 'Kral Şakir', category: 'cizgi_karakterler' },
  { name: 'Fil Necati', category: 'cizgi_karakterler' },
  { name: 'Pepee', category: 'cizgi_karakterler' },
  { name: 'Pikachu (Pokemon)', category: 'cizgi_karakterler' },
  { name: 'Ash Ketchum (Pokemon)', category: 'cizgi_karakterler' },
  { name: 'Goku (Dragon Ball)', category: 'cizgi_karakterler' },
  { name: 'Vegeta (Dragon Ball)', category: 'cizgi_karakterler' },
  { name: 'Naruto Uzumaki', category: 'cizgi_karakterler' },
  { name: 'Sasuke Uchiha', category: 'cizgi_karakterler' },
  { name: 'Kakashi Hatake', category: 'cizgi_karakterler' },
  { name: 'Monkey D. Luffy (One Piece)', category: 'cizgi_karakterler' },
  { name: 'Roronoa Zoro (One Piece)', category: 'cizgi_karakterler' },
  { name: 'Sailor Moon (Ay Savaşçısı)', category: 'cizgi_karakterler' },
  { name: 'Kaptan Tsubasa (Tsubasa Ozora)', category: 'cizgi_karakterler' },
  { name: 'Kojiro Hyuga', category: 'cizgi_karakterler' },
  { name: 'Super Mario', category: 'cizgi_karakterler' },
  { name: 'Luigi', category: 'cizgi_karakterler' },
  { name: 'Prenses Peach', category: 'cizgi_karakterler' },
  { name: 'Bowser', category: 'cizgi_karakterler' },
  { name: 'Sonic (Kirpi Sonic)', category: 'cizgi_karakterler' },
  { name: 'Link (Zelda)', category: 'cizgi_karakterler' },
  { name: 'Prenses Zelda', category: 'cizgi_karakterler' },
  { name: 'Pac-Man', category: 'cizgi_karakterler' },
  { name: 'Crash Bandicoot', category: 'cizgi_karakterler' },
  { name: 'Lara Croft (Tomb Raider)', category: 'cizgi_karakterler' },
  { name: 'Kratos (God of War)', category: 'cizgi_karakterler' },
  { name: 'Atreus (God of War)', category: 'cizgi_karakterler' },
  { name: 'Rivialı Geralt (The Witcher)', category: 'cizgi_karakterler' },
  { name: 'Ciri (The Witcher)', category: 'cizgi_karakterler' },
  { name: 'Yennefer of Vengerberg', category: 'cizgi_karakterler' },
  { name: 'Arthur Morgan (Red Dead Redemption 2)', category: 'cizgi_karakterler' },
  { name: 'John Marston (Red Dead Redemption)', category: 'cizgi_karakterler' },
  { name: 'CJ (Carl Johnson - GTA San Andreas)', category: 'cizgi_karakterler' },
  { name: 'Tommy Vercetti (GTA Vice City)', category: 'cizgi_karakterler' },
  { name: 'Trevor Philips (GTA V)', category: 'cizgi_karakterler' },
  { name: 'Niko Bellic (GTA IV)', category: 'cizgi_karakterler' },
  { name: 'Master Chief (Halo)', category: 'cizgi_karakterler' },
  { name: 'Doom Slayer (Doom)', category: 'cizgi_karakterler' },
  { name: 'Gordon Freeman (Half-Life)', category: 'cizgi_karakterler' },
  { name: 'Nathan Drake (Uncharted)', category: 'cizgi_karakterler' },
  { name: 'Joel Miller (The Last of Us)', category: 'cizgi_karakterler' },
  { name: 'Ellie Williams (The Last of Us)', category: 'cizgi_karakterler' },
  { name: 'Scorpion (Mortal Kombat)', category: 'cizgi_karakterler' },
  { name: 'Sub-Zero (Mortal Kombat)', category: 'cizgi_karakterler' },
  { name: 'Ryu (Street Fighter)', category: 'cizgi_karakterler' },
  { name: 'Steve (Minecraft)', category: 'cizgi_karakterler' },
  { name: 'Creeper (Minecraft)', category: 'cizgi_karakterler' },
]

// Wikipedia kategorileri (offline genişletme için)
const CATEGORY_MAPPINGS = [
  {
    category: 'unluler',
    wikiCategories: [
      'Türk_erkek_sinema_oyuncuları',
      'Türk_kadın_sinema_oyuncuları',
      'Türk_erkek_dizi_oyuncuları',
      'Türk_kadın_dizi_oyuncuları',
      'Türk_pop_şarkıcıları',
      'Türk_rock_şarkıcıları',
      'Türk_rap_şarkıcıları',
      'Türk_halk_müziği_şarkıcıları',
      'Türk_sanat_müziği_şarkıcıları',
      'Türk_komedyenler',
      'Türk_televizyon_sunucuları',
      'Amerikalı_erkek_sinema_oyuncuları',
      'Amerikalı_kadın_sinema_oyuncuları',
      'İngiliz_erkek_sinema_oyuncuları',
      'İngiliz_kadın_sinema_oyuncuları',
      'Amerikalı_pop_şarkıcıları',
      'İngiliz_şarkıcılar',
      'Altın_Küre_Ödülü_sahipleri',
    ],
  },
  {
    category: 'tarihi_kisiler',
    wikiCategories: [
      'Osmanlı_padişahları',
      'Büyük_Selçuklu_Devleti_hükümdarları',
      'Türkiye_cumhurbaşkanları',
      'Türk_hükümdarlar',
      'Roma_imparatorları',
      'Antik_Yunan_filozofları',
      'Nobel_Fizik_Ödülü_sahipleri',
      'Nobel_Kimya_Ödülü_sahipleri',
      'Nobel_Fizyoloji_veya_Tıp_Ödülü_sahipleri',
      'Nobel_Edebiyat_Ödülü_sahipleri',
      'Rönesans_sanatçıları',
      'Klasik_müzik_bestecileri',
      'Tarihteki_kadın_hükümdarlar',
      'Alman_filozoflar',
      'Fransız_filozoflar',
      'Antik_Yunan_matematikçileri',
      'Astronomlar',
    ],
  },
  {
    category: 'cizgi_karakterler',
    wikiCategories: [
      'Disney_karakterleri',
      'Looney_Tunes_karakterleri',
      'Marvel_Comics_karakterleri',
      'DC_Comics_karakterleri',
      'Süper_kahramanlar',
      'Anime_ve_manga_karakterleri',
      'Video_oyunu_karakterleri',
      'Kurgusal_dedektifler',
      'Çizgi_roman_karakterleri',
      'Kurgusal_büyücüler',
      'Kurgusal_karakterler',
      'Edebiyat_karakterleri',
      'Mitolojik_karakterler',
      'Roman_karakterleri',
      'Masal_karakterleri',
    ],
  },
  {
    category: 'sporcular',
    wikiCategories: [
      'Türk_erkek_futbolcular',
      'Türk_kadın_futbolcular',
      'Türk_erkek_basketbolcular',
      'Türk_kadın_voleybolcular',
      'Türkiye_millî_futbol_takımı_futbolcuları',
      'Süper_Lig_futbolcuları',
      'Altın_Top_kazananları',
      'FIFA_Dünya_Kupası_kazanan_futbolcular',
      'NBA_oyuncuları',
      'Türk_Olimpiyat_sporcuları',
      'Formula_1_Dünya_Sürücüler_Şampiyonları',
      'Grand_Slam_tekler_şampiyonları',
      'Türk_güreşçiler',
      'Türk_boksörler',
    ],
  },
  {
    category: 'dizi_film_karakterleri',
    wikiCategories: [
      'Türk_televizyon_dizisi_karakterleri',
      'Sinema_karakterleri',
      'Harry_Potter_karakterleri',
      'Yüzüklerin_Efendisi_karakterleri',
      'Star_Wars_karakterleri',
      'Taht_Oyunları_karakterleri',
      'Breaking_Bad_karakterleri',
      'Kurgusal_ajanlar',
      'Kurgusal_suçlular',
      'Kurgusal_korsanlar',
    ],
  },
]

async function fetchCategoryMembers(categoryName) {
  const url = `https://tr.wikipedia.org/w/api.php?action=query&list=categorymembers&cmtitle=Category:${encodeURIComponent(categoryName)}&cmlimit=250&cmtype=page&format=json&origin=*`
  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent': 'WhoDatTriviaBot/2.0 (https://whodat.app; contact@whodat.app)',
        Accept: 'application/json',
      },
    })
    if (!res.ok) return []
    const data = await res.json()
    const members = data.query?.categorymembers || []
    return members.map((m) => m.title)
  } catch {
    return []
  }
}

function cleanTitle(title) {
  let clean = title.replace(/\s*\([^)]*\)/g, '').trim()
  if (
    clean.startsWith('Liste') ||
    clean.startsWith('Taslak') ||
    clean.startsWith('Kategori') ||
    clean.startsWith('Dosya') ||
    clean.includes('Ödülü') ||
    clean.includes('şablon') ||
    clean.includes('listesi') ||
    clean.includes('maddesi') ||
    clean.includes('sezonu') ||
    clean.includes('filmleri') ||
    clean.includes('dizileri') ||
    clean.length < 2 ||
    clean.length > 50
  ) {
    return null
  }
  return clean
}

async function main() {
  console.log('🚀 Birleşik Veritabanı Oluşturuluyor (Küratörlü + Wikipedia)...')

  const allEntries = []
  const seenNames = new Set()

  // 1. Önce kesin bulunması gereken kült karakterleri ekle
  for (const item of GUARANTEED_CURATED) {
    const key = item.name.toLocaleLowerCase('tr')
    if (!seenNames.has(key)) {
      seenNames.add(key)
      allEntries.push(item)
    }
  }
  console.log(`✓ ${GUARANTEED_CURATED.length} garantili kült karakter yüklendi (Vito Corleone, Don Kişot, Gandalf vb.)`)

  // 2. Wikipedia kategorilerinden tamamlayıcı isimleri çek
  for (const group of CATEGORY_MAPPINGS) {
    console.log(`\n📦 Kategori taranıyor: [${group.category}]`)
    let addedCount = 0

    for (const catName of group.wikiCategories) {
      await sleep(200)
      const titles = await fetchCategoryMembers(catName)
      for (const rawTitle of titles) {
        const cleaned = cleanTitle(rawTitle)
        if (!cleaned) continue
        const key = cleaned.toLocaleLowerCase('tr')
        if (!seenNames.has(key)) {
          seenNames.add(key)
          allEntries.push({ name: cleaned, category: group.category })
          addedCount++
        }
      }
    }
    console.log(`  ✓ ${group.category}: +${addedCount} yeni isim eklendi`)
  }

  console.log(`\n🎉 Toplam ${allEntries.length} tekil isimlik devasa veritabanı hazırlandı!`)

  // 3. famousPeopleData.ts oluştur
  const tsContent = `export type FamousPersonCategory =
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

export const FAMOUS_PEOPLE_SEED: FamousPersonSeed[] = ${JSON.stringify(allEntries, null, 2)}
`

  const tsPath = resolve(process.cwd(), 'src/lib/game/famousPeopleData.ts')
  writeFileSync(tsPath, tsContent, 'utf-8')
  console.log(`✅ ${tsPath} yerel dosyası güncellendi.`)

  // 4. Migration SQL oluştur
  const sqlValues = allEntries
    .map((e) => `  ('${e.name.replace(/'/g, "''")}', '${e.category}')`)
    .join(',\n')

  const sqlContent = `-- Ünlü/Karakter Veritabanı Tablosu ve Kapsamlı Başlangıç Veri Seti (${allEntries.length} Kayıt)

create table if not exists public.famous_people (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null check (category in ('unluler', 'tarihi_kisiler', 'cizgi_karakterler', 'sporcular', 'dizi_film_karakterleri')),
  created_at timestamptz default now()
);

create index if not exists famous_people_category_idx on public.famous_people (category);
create index if not exists famous_people_name_idx on public.famous_people (name);

alter table public.famous_people enable row level security;

create policy "famous_people_select_policy"
  on public.famous_people
  for select
  using (true);

insert into public.famous_people (name, category) values
${sqlValues}
on conflict do nothing;
`

  const sqlPath = resolve(process.cwd(), 'supabase/migrations/20260817100000_create_famous_people.sql')
  writeFileSync(sqlPath, sqlContent, 'utf-8')
  console.log(`✅ ${sqlPath} migration dosyası güncellendi.`)
}

main().catch(console.error)

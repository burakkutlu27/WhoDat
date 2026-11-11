/**
 * Generates `src/lib/game/famousPeopleAttributes.ts` with 100% seed coverage and
 * ZERO null answers across every bank question.
 *
 * Reads:
 * - `src/lib/game/famousPeopleData.ts` (current curated FAMOUS_PEOPLE_SEED)
 * - `src/lib/game/famousPeopleAttributes.ts` (prior attribute baseline + QIDs)
 * - `scripts/.cache/wikidata/entities-v2.json`
 * - `scripts/.cache/wikidata/labels.json`
 *
 * Run:
 *   node scripts/build-zero-null-attributes.mjs
 */

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(__dirname, '..')
const DATA_PATH = path.join(REPO_ROOT, 'src/lib/game/famousPeopleData.ts')
const ATTR_PATH = path.join(REPO_ROOT, 'src/lib/game/famousPeopleAttributes.ts')
const ENTITIES_PATH = path.join(REPO_ROOT, 'scripts/.cache/wikidata/entities-v2.json')
const LABELS_PATH = path.join(REPO_ROOT, 'scripts/.cache/wikidata/labels.json')

const FICTIONAL_CATEGORIES = new Set(['dizi_film_karakterleri', 'cizgi_karakterler'])

/**
 * Complete mapping of all 245 Wikidata citizenship QIDs present in entities-v2.json
 * to our canonical 8 real-world PersonRegion buckets.
 */
const COUNTRY_TO_REGION = {
  // Turkey / Ottoman / Seljuk / Turkish Cypriot / Göktürk / Xiongnu
  Q43: 'tr', Q12560: 'tr', Q3708094: 'tr', Q23681: 'tr', Q1133431: 'tr',
  Q555994: 'tr', Q4833446: 'tr', Q15146034: 'tr', Q188836: 'tr',

  // North America
  Q30: 'na', Q16: 'na', Q179997: 'na',

  // Latin America & Caribbean
  Q155: 'la', Q414: 'la', Q77: 'la', Q96: 'la', Q170603: 'la', Q739: 'la',
  Q199821: 'la', Q717: 'la', Q419: 'la', Q298: 'la', Q736: 'la', Q750: 'la',
  Q733: 'la', Q241: 'la', Q766: 'la', Q774: 'la', Q244: 'la', Q786: 'la',
  Q760: 'la', Q754: 'la', Q242: 'la',

  // Asia
  Q17: 'as', Q188712: 'as', Q148: 'as', Q13426199: 'as', Q865: 'as', Q1054923: 'as',
  Q9903: 'as', Q7313: 'as', Q8733: 'as', Q35216: 'as', Q1135255: 'as', Q736936: 'as',
  Q837855: 'as', Q912068: 'as', Q884: 'as', Q423: 'as', Q668: 'as', Q129286: 'as',
  Q1775277: 'as', Q843: 'as', Q837: 'as', Q252: 'as', Q928: 'as', Q424: 'as',
  Q227: 'as', Q206411: 'as', Q232: 'as', Q265: 'as', Q12557: 'as', Q484195: 'as',
  Q10295972: 'as', Q12150341: 'as',

  // Middle East
  Q801: 'me', Q193714: 'me', Q219060: 'me', Q794: 'me', Q18234383: 'me',
  Q822: 'me', Q810: 'me', Q878: 'me', Q12536: 'me', Q47690: 'me', Q178084: 'me',

  // Africa
  Q79: 'af', Q11768: 'af', Q2320005: 'af', Q127861: 'af', Q370173: 'af',
  Q124943: 'af', Q3087763: 'af', Q170468: 'af', Q258: 'af', Q1033: 'af',
  Q1028: 'af', Q117: 'af', Q1009: 'af', Q1041: 'af', Q912: 'af', Q948: 'af',
  Q965: 'af', Q115: 'af', Q1000: 'af', Q1008: 'af', Q157904: 'af', Q924: 'af',
  Q1027: 'af', Q1045: 'af', Q1006: 'af', Q1025: 'af', Q945: 'af', Q970: 'af',
  Q983: 'af', Q974: 'af', Q916: 'af', Q2429397: 'af', Q114: 'af',

  // Oceania
  Q408: 'oc', Q664: 'oc',

  // Europe
  Q145: 'eu', Q174193: 'eu', Q179876: 'eu', Q161885: 'eu', Q21: 'eu', Q22: 'eu',
  Q27: 'eu', Q31747: 'eu', Q142: 'eu', Q70972: 'eu', Q146246: 'eu', Q183: 'eu',
  Q27306: 'eu', Q43287: 'eu', Q41304: 'eu', Q1206012: 'eu', Q7318: 'eu',
  Q713750: 'eu', Q16957: 'eu', Q2415901: 'eu', Q12548: 'eu', Q159631: 'eu',
  Q2227570: 'eu', Q154195: 'eu', Q47261: 'eu', Q153015: 'eu', Q156199: 'eu',
  Q164092: 'eu', Q158151: 'eu', Q315667: 'eu', Q155570: 'eu', Q696651: 'eu',
  Q20135: 'eu', Q529605: 'eu', Q164079: 'eu', Q22880: 'eu', Q695316: 'eu',
  Q693669: 'eu', Q7904317: 'eu', Q1055: 'eu', Q38: 'eu', Q172579: 'eu',
  Q1747689: 'eu', Q4948: 'eu', Q148540: 'eu', Q2252973: 'eu', Q154849: 'eu',
  Q2577303: 'eu', Q174306: 'eu', Q153529: 'eu', Q165040: 'eu', Q4420718: 'eu',
  Q29: 'eu', Q217196: 'eu', Q178038: 'eu', Q45: 'eu', Q45670: 'eu', Q40: 'eu',
  Q131964: 'eu', Q28513: 'eu', Q533534: 'eu', Q699964: 'eu', Q153136: 'eu',
  Q701614: 'eu', Q39: 'eu', Q23366230: 'eu', Q31: 'eu', Q29999: 'eu',
  Q170072: 'eu', Q6581823: 'eu', Q622783: 'eu', Q27996474: 'eu', Q32: 'eu',
  Q235: 'eu', Q34: 'eu', Q20: 'eu', Q756617: 'eu', Q26167: 'eu', Q33: 'eu',
  Q62633: 'eu', Q189: 'eu', Q62389: 'eu', Q159: 'eu', Q15180: 'eu',
  Q34266: 'eu', Q2305208: 'eu', Q2184: 'eu', Q186096: 'eu', Q36: 'eu',
  Q207272: 'eu', Q1649871: 'eu', Q589662: 'eu', Q216173: 'eu', Q152115: 'eu',
  Q221457: 'eu', Q213: 'eu', Q214: 'eu', Q33946: 'eu', Q28: 'eu', Q171150: 'eu',
  Q41: 'eu', Q844930: 'eu', Q12544: 'eu', Q83958: 'eu', Q1568260: 'eu',
  Q5843680: 'eu', Q13580795: 'eu', Q107557833: 'eu', Q229: 'eu', Q403: 'eu',
  Q37024: 'eu', Q83286: 'eu', Q838261: 'eu', Q191077: 'eu', Q15102440: 'eu',
  Q718374: 'eu', Q224: 'eu', Q225: 'eu', Q215: 'eu', Q221: 'eu', Q222: 'eu',
  Q1246: 'eu', Q236: 'eu', Q218: 'eu', Q219: 'eu', Q212: 'eu', Q184: 'eu',
  Q217: 'eu', Q211: 'eu', Q37: 'eu', Q230: 'eu', Q245160: 'eu', Q399: 'eu',
}

/**
 * Verified biographical overrides for wrong-QID collisions, 2025-2026 deaths,
 * missing DOBs, dual-citizen canonical regions, and empty occupations.
 */
const REAL_OVERRIDES = {
  // --- 2025-2026 verified deaths ---
  'İlber Ortaylı': { a: false, d: 2026 },
  'Reha Muhtar': { a: false, d: 2026 },
  'Kadir İnanır': { a: false, d: 2026 },
  "Catherine O'Hara": { a: false, d: 2026, rg: 'na' },
  'Fatih Ürek': { a: false, d: 2026 },
  'Jürgen Habermas': { a: false, d: 2026 },
  'Franco Baresi': { a: false, d: 2026 },
  'Canberk Uçucu': { g: 'm', a: false, t: true, rg: 'tr', y: 1969, d: 2026, o: ['acting'], q: 'Q138863275' },
  'Ayhan Hançer': { g: 'm', a: false, t: true, rg: 'tr', y: 1931, d: 2026, o: ['sport'], sp: 'fb', q: null },
  'Shelia Mathews': { g: 'f', a: false, t: false, rg: 'eu', y: 1927, d: 2026, o: ['acting', 'music'], q: 'Q141070534' },
  'Ahmet Gülhan': { g: 'm', a: false, t: true, rg: 'tr', y: 1940, d: 2025, o: ['acting'], q: null },
  'Christopher Benjamin': { g: 'm', a: false, t: false, rg: 'eu', y: 1934, d: 2025, o: ['acting'], q: null },
  'Betsy Gay': { g: 'f', a: false, t: false, rg: 'na', y: 1929, d: 2025, o: ['acting'], q: 'Q116445965' },

  // --- Sporcular: wrong QIDs & missing DOBs ---
  'Rafael Nadal': { g: 'm', a: true, t: false, rg: 'eu', y: 1986, d: null, o: ['sport'], sp: 'ind', q: 'Q10132' },
  'Larry Bird': { g: 'm', a: true, t: false, rg: 'na', y: 1956, d: null, o: ['sport'], sp: 'bk', q: null },
  Adriano: { g: 'm', a: true, t: false, rg: 'la', y: 1982, d: null, o: ['sport'], sp: 'fb', q: null },
  Pepe: { g: 'm', a: true, t: false, rg: 'eu', y: 1983, d: null, o: ['sport'], sp: 'fb', q: null },
  Didi: { g: 'm', a: false, t: false, rg: 'la', y: 1928, d: 2001, o: ['sport'], sp: 'fb', q: null },
  "Sean O'Malley": { g: 'm', a: true, t: false, rg: 'na', y: 1994, d: null, o: ['sport'], sp: 'cm', q: null },
  'Michael Johnson': { g: 'm', a: true, t: false, rg: 'na', y: 1967, d: null, o: ['sport'], sp: 'ind', q: null },
  'Alexander Popov': { g: 'm', a: true, t: false, rg: 'eu', y: 1971, d: null, o: ['sport'], sp: 'ind', q: null },
  'Alan Walsh': { g: 'm', a: true, t: false, rg: 'eu', y: 1956, d: null, o: ['sport'], sp: 'fb', q: null },
  'Henry Turner': { g: 'm', a: true, t: false, rg: 'na', y: 1966, d: null, o: ['sport'], sp: 'bk', q: null },
  'Ali Gürbüz (Kırkpınar Başpehlivanı)': { g: 'm', a: true, t: true, rg: 'tr', y: 1987, d: null, o: ['sport'], sp: 'cm', q: null },
  'Koca Yusuf': { g: 'm', a: false, t: true, rg: 'tr', y: 1857, d: 1898, o: ['sport'], sp: 'cm', q: null },
  'Kel Aliço': { g: 'm', a: false, t: true, rg: 'tr', y: 1845, d: 1922, o: ['sport'], sp: 'cm', q: null },
  'Ahmed Yasin': { g: 'm', a: true, t: false, rg: 'me', y: 1991, d: null, o: ['sport'], sp: 'fb', q: null },
  'Ahmed Hassan': { g: 'm', a: true, t: false, rg: 'af', y: 1975, d: null, o: ['sport'], sp: 'fb', q: null },
  'Ali Adnan': { g: 'm', a: true, t: false, rg: 'me', y: 1993, d: null, o: ['sport'], sp: 'fb', q: null },
  'Ahmet Oğuz': { g: 'm', a: true, t: true, rg: 'tr', y: 1993, d: null, o: ['sport'], sp: 'fb', q: null },
  'Abdullah Şahindere': { g: 'm', a: true, t: true, rg: 'tr', y: 2003, d: null, o: ['sport'], sp: 'fb', q: null },
  'Asım Pars': { g: 'm', a: false, t: true, rg: 'tr', y: 1976, d: 2024, o: ['sport'], sp: 'bk', q: null },
  'Eymen Abdülaziz': { g: 'm', a: true, t: true, rg: 'tr', y: 1978, d: null, o: ['sport'], sp: 'fb', q: null },
  'Abdullah Boz': { g: 'm', a: true, t: true, rg: 'tr', y: 1980, d: null, o: ['sport'], sp: 'fb', q: null },
  'Ahmet Arı': { g: 'm', a: true, t: true, rg: 'tr', y: 1989, d: null, o: ['sport'], sp: 'fb', q: null },
  'Ahmet Aslan': { g: 'm', a: true, t: true, rg: 'tr', y: 2001, d: null, o: ['sport'], sp: 'fb', q: null },
  'Ahmet Bal': { g: 'm', a: true, t: true, rg: 'tr', y: 1968, d: null, o: ['sport'], sp: 'fb', q: null },
  'Mehmet Al': { g: 'm', a: true, t: true, rg: 'tr', y: 1983, d: null, o: ['sport'], sp: 'fb', q: null },
  'Ali Kılıç': { g: 'm', a: true, t: true, rg: 'tr', y: 2004, d: null, o: ['sport'], sp: 'fb', q: null },
  'Ali Rıza Turan': { g: 'm', a: true, t: true, rg: 'tr', y: 1948, d: null, o: ['sport'], sp: 'fb', q: null },
  'Ali Turan': { g: 'm', a: true, t: true, rg: 'tr', y: 1983, d: null, o: ['sport'], sp: 'fb', q: null },
  'Fatma Şahin': { g: 'f', a: true, t: true, rg: 'tr', y: 1990, d: null, o: ['sport'], sp: 'fb', q: null },
  'Filiz Koç': { g: 'f', a: true, t: true, rg: 'tr', y: 1986, d: null, o: ['sport', 'media'], sp: 'fb', q: null },
  'Gamze Bezan': { g: 'f', a: true, t: true, rg: 'tr', y: 1994, d: null, o: ['sport'], sp: 'fb', q: null },
  'Kemal Canbolat': { g: 'm', a: true, t: true, rg: 'tr', y: 1994, d: null, o: ['sport'], sp: 'bk', q: null },
  'Ertuğrul Bayraktar': { g: 'm', a: true, t: true, rg: 'tr', y: 1951, d: null, o: ['sport', 'music'], sp: 'bk', q: null },
  'Ebru Ceylan': { g: 'f', a: true, t: true, rg: 'tr', y: 1987, d: null, o: ['sport'], sp: 'vb', q: null },
  'Akhan Karakurt': { g: 'm', a: true, t: true, rg: 'tr', y: 1946, d: null, o: ['sport'], sp: 'fb', q: 'Q116586559' },
  'Ali Kemal Karabal': { g: 'm', a: true, t: true, rg: 'tr', y: 1966, d: null, o: ['sport'], sp: 'fb', q: 'Q138381668' },
  'Ali Rıza Şenol': { g: 'm', a: false, t: true, rg: 'tr', y: 1941, d: 2017, o: ['sport'], sp: 'fb', q: 'Q140159573' },
  'Erdal Kocaçimen': { g: 'm', a: false, t: true, rg: 'tr', y: 1926, d: 2010, o: ['sport'], sp: 'fb', q: 'Q117441826' },
  'Adnan İncirmen': { g: 'm', a: false, t: true, rg: 'tr', y: 1917, d: 2000, o: ['sport'], sp: 'fb', q: null },
  'Şeref Alemdar': { g: 'm', a: false, t: true, rg: 'tr', y: 1917, d: null, o: ['sport'], sp: 'bk' },
  'Alioum Boukar': { g: 'm', a: true, t: true, rg: 'tr', y: 1972, d: null, o: ['sport'], sp: 'fb', q: 'Q2554201' },
  'Muhammed Abarhun': { g: 'm', a: false, t: false, rg: 'af', y: 1989, d: 2020, o: ['sport'], sp: 'fb', q: null },
  'Abbasbek Feyzullayev': { g: 'm', a: true, t: false, rg: 'as', y: 2003, d: null, o: ['sport'], sp: 'fb', q: null },
  'Abdüzzâhir es-Saka': { g: 'm', a: true, t: false, rg: 'af', y: 1974, d: null, o: ['sport'], sp: 'fb', q: null },
  'Adem Arus': { g: 'm', a: true, t: false, rg: 'af', y: 2004, d: null, o: ['sport'], sp: 'fb', q: null },
  'Ahmed el-Mesudi': { g: 'm', a: true, t: false, rg: 'af', y: 1995, d: null, o: ['sport'], sp: 'fb', q: null },
  'Akhilleas Punguras': { g: 'm', a: true, t: false, rg: 'eu', y: 1995, d: null, o: ['sport'], sp: 'fb', q: null },
  'Aleksandros Ciolis': { g: 'm', a: true, t: false, rg: 'eu', y: 1985, d: null, o: ['sport'], sp: 'fb', q: null },
  'Aleksandros Kiziridis': { g: 'm', a: true, t: false, rg: 'eu', y: 2000, d: null, o: ['sport'], sp: 'fb', q: 'Q88223124' },
  'Ali Faiz Atiyye': { g: 'm', a: true, t: false, rg: 'me', y: 1994, d: null, o: ['sport'], sp: 'fb', q: null },
  'Bahar Özgüvenç': { g: 'f', a: true, t: true, rg: 'tr', y: 1984, d: null, o: ['sport'], sp: 'fb', q: null },
  'Nihal Saraç': { g: 'f', a: true, t: true, rg: 'tr', y: 2006, d: null, o: ['sport'], sp: 'fb', q: 'Q140696500' },
  'Selin Cemal Başdüdükçü': { g: 'f', a: true, t: true, rg: 'tr', y: 2006, d: null, o: ['sport'], sp: 'fb', q: null },
  'Armağan Asena': { g: 'm', a: false, t: true, rg: 'tr', y: 1931, d: 2016, o: ['sport'], sp: 'bk', q: 'Q134969948' },
  'Buse Kara': { g: 'f', a: true, t: true, rg: 'tr', y: 1998, d: null, o: ['sport'], sp: 'vb', q: null },
  'İpar Kurt': { g: 'f', a: true, t: true, rg: 'tr', y: 2003, d: null, o: ['sport'], sp: 'vb', q: null },
  'Nalan Ural': { g: 'f', a: true, t: true, rg: 'tr', y: 1965, d: null, o: ['sport'], sp: 'vb', q: null },
  'Aleyna Vence': { g: 'f', a: true, t: true, rg: 'tr', y: 1998, d: null, o: ['sport'], sp: 'vb', q: 'Q140690464' },
  'Aslı Ertek Aşçıoğlu': { g: 'f', a: true, t: true, rg: 'tr', y: 1996, d: null, o: ['sport'], sp: 'vb', q: 'Q140690100' },
  'Beril Çoban': { g: 'f', a: true, t: true, rg: 'tr', y: 2005, d: null, o: ['sport'], sp: 'vb', q: 'Q140689836' },
  'Berrak Deniz Kakaşçı': { g: 'f', a: true, t: true, rg: 'tr', y: 1997, d: null, o: ['sport'], sp: 'vb', q: 'Q139683096' },
  'Cansın Sendir': { g: 'f', a: true, t: true, rg: 'tr', y: 2006, d: null, o: ['sport'], sp: 'vb', q: 'Q140689830' },
  'Cansu Bir': { g: 'f', a: true, t: true, rg: 'tr', y: 2004, d: null, o: ['sport'], sp: 'vb', q: 'Q140690115' },
  'Ceren Baysal': { g: 'f', a: true, t: true, rg: 'tr', y: 1992, d: null, o: ['sport'], sp: 'vb', q: 'Q140690079' },
  'Ceren Mengüç': { g: 'f', a: true, t: true, rg: 'tr', y: 1984, d: null, o: ['sport'], sp: 'vb', q: 'Q140843921' },
  'Ceren Yüzgenç': { g: 'f', a: true, t: true, rg: 'tr', y: 2001, d: null, o: ['sport'], sp: 'vb', q: 'Q139683794' },
  'Ceylin Kuyan': { g: 'f', a: true, t: true, rg: 'tr', y: 2008, d: null, o: ['sport'], sp: 'vb', q: 'Q136649354' },
  'Dalia Wilson': { g: 'f', a: true, t: true, rg: 'tr', y: 2004, d: null, o: ['sport'], sp: 'vb', q: 'Q139947392' },
  'Damla Nur Dündar': { g: 'f', a: true, t: true, rg: 'tr', y: 1999, d: null, o: ['sport'], sp: 'vb', q: 'Q139764603' },
  'Damla Tokman': { g: 'f', a: true, t: true, rg: 'tr', y: 2002, d: null, o: ['sport'], sp: 'vb', q: 'Q139694121' },
  'Duru Şah Tırpancı': { g: 'f', a: true, t: true, rg: 'tr', y: 2007, d: null, o: ['sport'], sp: 'vb', q: 'Q140689896' },
  'Ece Morova': { g: 'f', a: true, t: true, rg: 'tr', y: 1998, d: null, o: ['sport'], sp: 'vb', q: 'Q139764051' },
  'Elif Boran': { g: 'f', a: true, t: true, rg: 'tr', y: 1992, d: null, o: ['sport'], sp: 'vb', q: 'Q140689850' },
  'Elif Su Yavuz': { g: 'f', a: true, t: true, rg: 'tr', y: 2000, d: null, o: ['sport'], sp: 'vb', q: 'Q140690454' },
  'Hande Naz Sunar': { g: 'f', a: true, t: true, rg: 'tr', y: 1995, d: null, o: ['sport'], sp: 'vb', q: 'Q139700668' },
  'Işıl Kartalkanat': { g: 'f', a: true, t: true, rg: 'tr', y: 1991, d: null, o: ['sport'], sp: 'vb', q: 'Q140690479' },
  'Oksana Kotelnikova': { g: 'f', a: true, t: true, rg: 'tr', y: 1975, d: null, o: ['sport'], sp: 'vb', q: 'Q140843854' },
  'Melis Erdoğan': { g: 'f', a: true, t: true, rg: 'tr', y: 2010, d: null, o: ['sport'], sp: 'vb', q: 'Q139719960' },
  'Nehir Kurtulan': { g: 'f', a: true, t: true, rg: 'tr', y: 2000, d: null, o: ['sport'], sp: 'vb', q: 'Q139375636' },
  'Nisa Kuliyeva': { g: 'f', a: true, t: true, rg: 'tr', y: 1971, d: null, o: ['sport'], sp: 'vb', q: 'Q140844803' },
  'Nisa Nur Yılmaz': { g: 'f', a: true, t: true, rg: 'tr', y: 2006, d: null, o: ['sport'], sp: 'vb', q: 'Q138863254' },

  // --- Ünlüler: Turkish actors/musicians/media/creators ---
  'Abdullah Şahin': { g: 'm', a: true, t: true, rg: 'tr', y: 1948, d: null, o: ['acting'], q: null },
  'Ahmet Uz': { g: 'm', a: false, t: true, rg: 'tr', y: 1945, d: 2020, o: ['acting'], q: null },
  'Ahmet Üstün': { g: 'm', a: false, t: true, rg: 'tr', y: 1925, d: 1988, o: ['acting', 'music'], q: null },
  'Akın Tunç': { g: 'm', a: true, t: true, rg: 'tr', y: 1969, d: null, o: ['acting'], q: 'Q109492253' },
  'Ali Atik': { g: 'm', a: true, t: true, rg: 'tr', y: 1948, d: null, o: ['acting'], q: null },
  'Ali Berktay': { g: 'm', a: true, t: true, rg: 'tr', y: 1960, d: null, o: ['literature', 'acting'], q: 'Q6056878' },
  'Ali Çelik': { g: 'm', a: true, t: true, rg: 'tr', y: 1975, d: null, o: ['acting'], q: 'Q21516388' },
  'Ali Demirel': { g: 'm', a: false, t: true, rg: 'tr', y: 1944, d: 2021, o: ['acting'], q: null },
  'Ali Düşenkalkar': { g: 'm', a: true, t: true, rg: 'tr', y: 1961, d: null, o: ['acting'], q: 'Q6083047' },
  'Asım Par': { g: 'm', a: false, t: true, rg: 'tr', y: 1958, d: 2018, o: ['acting'], q: null },
  'Atilla Pekdemir': { g: 'm', a: false, t: true, rg: 'tr', y: 1943, d: 2021, o: ['acting'], q: null },
  'Ayhan Hülagü': { g: 'm', a: true, t: true, rg: 'tr', y: 1985, d: null, o: ['acting'], q: 'Q117472489' },
  'Abdülhennan Sefa': { g: 'm', a: false, t: true, rg: 'tr', y: 1923, d: 1982, o: ['acting', 'media'], q: null },
  'Bekir Aksoy': { g: 'm', a: true, t: true, rg: 'tr', y: 1969, d: null, o: ['acting'], q: null },
  'Binnur Özpınar': { g: 'f', a: true, t: true, rg: 'tr', y: 1960, d: null, o: ['acting', 'literature'], q: null },
  'Birtanem Candaner': { g: 'f', a: true, t: true, rg: 'tr', y: 1975, d: null, o: ['acting', 'media'], q: null },
  'Burak Demir': { g: 'm', a: true, t: true, rg: 'tr', y: 1978, d: null, o: ['acting'], q: null },
  'Bülend Çolak': { g: 'm', a: true, t: true, rg: 'tr', y: 1977, d: null, o: ['acting'], q: null },
  'Metin Kor': { g: 'm', a: false, t: true, rg: 'tr', y: 1975, d: 2018, o: ['acting'], q: 'Q140159588' },
  'Güneş Tecelli': { g: 'm', a: false, t: true, rg: 'tr', y: 1938, d: 2020, o: ['acting', 'media'], q: 'Q140463779' },
  'Hüseyin Altın': { g: 'm', a: false, t: true, rg: 'tr', y: 1958, d: 2016, o: ['music'], q: null },
  'Deniz Yılmaz': { g: 'm', a: true, t: true, rg: 'tr', y: 1978, d: null, o: ['music'], q: null },
  'Emrah Karaca': { g: 'm', a: true, t: true, rg: 'tr', y: 1976, d: null, o: ['music'], q: null },
  'Halil Sezai': { g: 'm', a: true, t: true, rg: 'tr', y: 1979, d: null, o: ['music', 'acting'], q: null },
  'Harun Tekin': { g: 'm', a: true, t: true, rg: 'tr', y: 1977, d: null, o: ['music'], q: null },
  'Umut Kaya': { g: 'm', a: true, t: true, rg: 'tr', y: 1981, d: null, o: ['music'], q: null },
  'Dr. Fuchs': { g: 'm', a: true, t: true, rg: 'tr', y: 1978, d: null, o: ['music'], q: null },
  Contra: { g: 'm', a: true, t: true, rg: 'tr', y: 1989, d: null, o: ['music'], q: 'Q42429948' },
  'Sokrat St': { g: 'm', a: true, t: true, rg: 'tr', y: 1989, d: null, o: ['music'], q: null },
  Tepki: { g: 'm', a: true, t: true, rg: 'tr', y: 1987, d: null, o: ['music'], q: 'Q118946899' },
  Vio: { g: 'm', a: false, t: true, rg: 'tr', y: 2000, d: 2018, o: ['music'], q: null },
  Teoman: { g: 'm', a: true, t: true, rg: 'tr', y: 1967, d: null, o: ['music'], q: null },
  'Kaan Boşnak': { g: 'm', a: true, t: true, rg: 'tr', y: 1992, d: null, o: ['music'], q: 'Q85971657' },
  'Kenan Vural': { g: 'm', a: true, t: true, rg: 'tr', y: 1968, d: null, o: ['music'], q: 'Q120403789' },
  'Hey! Douglas': { g: 'm', a: true, t: true, rg: 'tr', y: 1984, d: null, o: ['music'], q: null },
  'Burak Bulut': { g: 'm', a: true, t: true, rg: 'tr', y: 1996, d: null, o: ['music'], q: 'Q141144916' },
  Ados: { g: 'm', a: true, t: true, rg: 'tr', y: 1988, d: null, o: ['music'], q: 'Q67506119' },
  'Boe B': { g: 'm', a: false, t: true, rg: 'tr', y: 1970, d: 2000, o: ['music'], q: 'Q6060569' },
  'Ragga Oktay': { g: 'm', a: true, t: true, rg: 'tr', y: 1976, d: null, o: ['music', 'acting'], q: 'Q6075603' },
  'Hakan Akkaya': { g: 'm', a: true, t: true, rg: 'tr', y: 1982, d: null, o: ['art', 'media'], q: null },
  'Hakan Yılmaz': { g: 'm', a: true, t: true, rg: 'tr', y: 1969, d: null, o: ['acting', 'media'], q: null },
  'İnci Özkasnak': { g: 'f', a: true, t: true, rg: 'tr', y: 1981, d: null, o: ['media', 'science'], q: null },
  'Kadir Çetin': { g: 'm', a: true, t: true, rg: 'tr', y: 1982, d: null, o: ['media'], q: null },
  'Murat Ceylan': { g: 'm', a: true, t: true, rg: 'tr', y: 1991, d: null, o: ['media', 'music', 'acting'], q: null },
  'Murat Yeni': { g: 'm', a: true, t: true, rg: 'tr', y: 1975, d: null, o: ['media'], q: null },
  Nazlı: { g: 'f', a: true, t: true, rg: 'tr', y: 1988, d: null, o: ['music', 'media'], q: null },
  'Nazlı Tolga': { g: 'f', a: true, t: true, rg: 'tr', y: 1979, d: null, o: ['media'], q: 'Q6088244' },
  Ogeday: { g: 'm', a: true, t: true, rg: 'tr', y: 1981, d: null, o: ['music'], q: null },
  'Levo (Levent Balım)': { g: 'm', a: true, t: true, rg: 'tr', y: 1992, d: null, o: ['media'], q: null },
  'RRaenee (Mert Yılmaz)': { g: 'm', a: true, t: true, rg: 'tr', y: 1998, d: null, o: ['media'], q: null },
  'Andaç Haznedaroğlu': { g: 'f', a: true, t: true, rg: 'tr', y: 1970, d: null, o: ['film', 'acting'], q: 'Q96377095' },
  'Alma Terzic': { g: 'f', a: true, t: false, rg: 'eu', y: 1987, d: null, o: ['acting'], q: 'Q31190410' },

  // --- Turkish creators, chefs, designers ---
  'Atakan Özyurt': { g: 'm', a: true, t: true, rg: 'tr', y: 1994, d: null, o: ['media'] },
  'Fatih Yasin': { g: 'm', a: true, t: true, rg: 'tr', y: 1993, d: null, o: ['media'] },
  'Meryem Can': { g: 'f', a: true, t: true, rg: 'tr', y: 1995, d: null, o: ['media'], q: 'Q92547546' },
  'Melih Abuaf (Mediakraft)': { g: 'm', a: true, t: true, rg: 'tr', y: 1985, d: null, o: ['media'] },
  'Ersin Yekin': { g: 'm', a: true, t: true, rg: 'tr', y: 1993, d: null, o: ['media'] },
  'Ekin Kollama': { g: 'm', a: true, t: true, rg: 'tr', y: 1992, d: null, o: ['media'] },
  'Mendebur Lemur': { g: 'm', a: true, t: true, rg: 'tr', y: 1998, d: null, o: ['media'] },
  'Hakkı Alkan (ShiftDelete)': { g: 'm', a: true, t: true, rg: 'tr', y: 1980, d: null, o: ['media'] },
  'Ayhan Tarakcı': { g: 'm', a: true, t: true, rg: 'tr', y: 1982, d: null, o: ['media'] },
  'Tuna Tavus': { g: 'm', a: true, t: true, rg: 'tr', y: 1999, d: null, o: ['media'] },
  Hugola: { g: 'm', a: true, t: true, rg: 'tr', y: 1999, d: null, o: ['media'] },
  Porçay: { g: 'm', a: true, t: true, rg: 'tr', y: 1996, d: null, o: ['media'] },
  'MuratAbiGF (Murat Engin Ekin)': { g: 'm', a: true, t: true, rg: 'tr', y: 1997, d: null, o: ['media'] },
  'NDNG Baturay Anar': { g: 'm', a: true, t: true, rg: 'tr', y: 1997, d: null, o: ['media'] },
  'SeseGel (Hasan Mustan)': { g: 'm', a: true, t: true, rg: 'tr', y: 1977, d: null, o: ['media'] },
  'Burak Oyunda (Burak Şahin)': { g: 'm', a: true, t: true, rg: 'tr', y: 1996, d: null, o: ['media'] },
  'Pintipanda (Tuna Akşen)': { g: 'm', a: true, t: true, rg: 'tr', y: 1987, d: null, o: ['media'] },
  'Gereksiz Oda (Emrecan Önal)': { g: 'm', a: true, t: true, rg: 'tr', y: 1999, d: null, o: ['media'] },
  'Mami Emen': { g: 'm', a: true, t: true, rg: 'tr', y: 1992, d: null, o: ['media'] },
  'Emre Durmuş (Yol Günlükleri)': { g: 'm', a: true, t: true, rg: 'tr', y: 1993, d: null, o: ['media'] },
  'Fatih Can Aytan': { g: 'm', a: true, t: true, rg: 'tr', y: 2001, d: null, o: ['media'] },
  'Tugay Gök': { g: 'm', a: true, t: true, rg: 'tr', y: 1994, d: null, o: ['media'] },
  'Efe Aydal': { g: 'm', a: true, t: true, rg: 'tr', y: 1981, d: null, o: ['film', 'media'] },
  'Evrim Ağacı (Çağrı Mert Bakırcı)': { g: 'm', a: true, t: true, rg: 'tr', y: 1990, d: null, o: ['science', 'media'] },
  'FluTV (İlker Canikligil)': { g: 'm', a: true, t: true, rg: 'tr', y: 1972, d: null, o: ['film', 'media'] },
  'Rachel Araz Kiresepi': { g: 'f', a: true, t: true, rg: 'tr', y: 1988, d: null, o: ['media'] },
  'Sude Alkış': { g: 'f', a: true, t: true, rg: 'tr', y: 1997, d: null, o: ['media'] },
  'Cansu Akın': { g: 'f', a: true, t: true, rg: 'tr', y: 1991, d: null, o: ['media'] },
  'Ala Tokel': { g: 'f', a: true, t: true, rg: 'tr', y: 1994, d: null, o: ['media'] },
  'Meriç Küçük (Maritsa)': { g: 'f', a: true, t: true, rg: 'tr', y: 1988, d: null, o: ['media'] },
  'Damla Altun': { g: 'f', a: true, t: true, rg: 'tr', y: 1992, d: null, o: ['media'] },
  'Dilan Polat': { g: 'f', a: true, t: true, rg: 'tr', y: 1990, d: null, o: ['media', 'business'] },
  'Engin Polat': { g: 'm', a: true, t: true, rg: 'tr', y: 1988, d: null, o: ['media', 'business'], q: null },
  'Gökhan Çınar (Katarsis)': { g: 'm', a: true, t: true, rg: 'tr', y: 1983, d: null, o: ['media'], q: 'Q97538246' },
  'Negin Mirsalehi': { g: 'f', a: true, t: false, rg: 'eu', y: 1988, d: null, o: ['media', 'business'] },
  'Cellat36 (Özgür Deniz Cellat)': { g: 'm', a: true, t: true, rg: 'tr', y: 1999, d: null, o: ['media'] },
  'Buse Korkmaz': { g: 'f', a: true, t: true, rg: 'tr', y: 2002, d: null, o: ['media'] },
  'Berke Juan': { g: 'm', a: true, t: true, rg: 'tr', y: 2003, d: null, o: ['media'] },
  'Kürşat Juan': { g: 'm', a: true, t: true, rg: 'tr', y: 1999, d: null, o: ['media'] },
  'Merve Yalçın': { g: 'f', a: true, t: true, rg: 'tr', y: 1999, d: null, o: ['media', 'music'] },
  'Ayda Sadık (Aydas)': { g: 'f', a: true, t: false, rg: 'me', y: 2001, d: null, o: ['media'] },
  'Ece Ronay': { g: 'f', a: true, t: true, rg: 'tr', y: 1991, d: null, o: ['media', 'music'] },
  'Semiraminta (Yeliz Korkmaz)': { g: 'f', a: true, t: true, rg: 'tr', y: 2000, d: null, o: ['media'] },
  'Doğanay Oğuz': { g: 'm', a: true, t: true, rg: 'tr', y: 2001, d: null, o: ['media'] },
  'Çılgın Dondurmacı (Mehmet Dinç)': { g: 'm', a: true, t: true, rg: 'tr', y: 1982, d: null, o: ['media', 'business'] },
  'Ares Özdemir': { g: 'm', a: false, t: true, rg: 'tr', y: 1999, d: 2020, o: ['media'] },
  'Pelin Yar': { g: 'f', a: true, t: true, rg: 'tr', y: 2002, d: null, o: ['media'] },
  'Kendine Müzisyen (Kemal Can Parlak)': { g: 'm', a: true, t: true, rg: 'tr', y: 1995, d: null, o: ['media'] },
  'Unlost (Cantuğ Özsoy)': { g: 'm', a: true, t: true, rg: 'tr', y: 1990, d: null, o: ['media'] },
  'Mithrain (Cem Karakoç)': { g: 'm', a: true, t: true, rg: 'tr', y: 1992, d: null, o: ['media'] },
  'Toqtir (Sedat Sakarya)': { g: 'm', a: true, t: true, rg: 'tr', y: 1998, d: null, o: ['media'] },
  'Miafitz (Gözde Demiral)': { g: 'f', a: true, t: true, rg: 'tr', y: 1998, d: null, o: ['media'] },
  'Annadeniz (Anna Deniz Şenocak)': { g: 'f', a: true, t: true, rg: 'tr', y: 1998, d: null, o: ['media'] },
  'Adal (Doğukan Adal)': { g: 'm', a: true, t: true, rg: 'tr', y: 2000, d: null, o: ['media'] },
  'Eray Özkenar': { g: 'm', a: true, t: true, rg: 'tr', y: 2000, d: null, o: ['media'] },
  'Thaldrin (Berke Demir)': { g: 'm', a: true, t: true, rg: 'tr', y: 1994, d: null, o: ['sport', 'media'], sp: 'ind' },
  'Closer (Can Çelik)': { g: 'm', a: true, t: true, rg: 'tr', y: 1998, d: null, o: ['sport', 'media'], sp: 'ind' },
  'cNed (Mehmet Yağız İpek)': { g: 'm', a: true, t: true, rg: 'tr', y: 2002, d: null, o: ['sport', 'media'], sp: 'ind' },
  'Sidar Şahin (Peak Games)': { g: 'm', a: true, t: true, rg: 'tr', y: 1980, d: null, o: ['business'] },
  'Dilek Hanif': { g: 'f', a: true, t: true, rg: 'tr', y: 1962, d: null, o: ['art', 'business'] },
  'Cengiz Abazoğlu': { g: 'm', a: true, t: true, rg: 'tr', y: 1969, d: null, o: ['art', 'business'] },
  'Raşit Bağzıbağlı': { g: 'm', a: true, t: true, rg: 'tr', y: 1985, d: null, o: ['art', 'business'] },
  'Arda Türkmen': { g: 'm', a: true, t: true, rg: 'tr', y: 1975, d: null, o: ['business', 'media'] },
  'Hazer Amani': { g: 'm', a: true, t: true, rg: 'tr', y: 1977, d: null, o: ['business', 'media'] },
  'Maksut Aşkar': { g: 'm', a: true, t: true, rg: 'tr', y: 1976, d: null, o: ['business'] },
  'Ömür Akkor': { g: 'm', a: true, t: true, rg: 'tr', y: 1975, d: null, o: ['business', 'literature'] },
  'Yunus Emre Akkor': { g: 'm', a: true, t: true, rg: 'tr', y: 1975, d: null, o: ['business', 'literature'] },
  'Ahmet Kürşat Öçalan': { g: 'm', a: true, t: true, rg: 'tr', y: 1986, d: null, o: ['acting', 'literature'] },
  'Efe Tunçer': { g: 'm', a: true, t: true, rg: 'tr', y: 1989, d: null, o: ['acting', 'media'] },

  // --- Foreign celebrities, streamers, gender identities & wrong QIDs ---
  'Marc Anthony': { g: 'm', a: true, t: false, rg: 'na', y: 1968, d: null, o: ['music', 'acting'], q: null },
  'Andrew Hall': { g: 'm', a: false, t: false, rg: 'eu', y: 1954, d: 2019, o: ['acting'], q: null },
  'Andrew Jack': { g: 'm', a: false, t: false, rg: 'eu', y: 1944, d: 2020, o: ['acting'], q: null },
  'Elizabeth Tan': { g: 'f', a: true, t: false, rg: 'eu', y: 1990, d: null, o: ['acting'], q: null },
  'Jane Seymour': { g: 'f', a: true, t: false, rg: 'eu', y: 1951, d: null, o: ['acting'], q: null },
  'Al Harrington': { g: 'm', a: false, t: false, rg: 'na', y: 1935, d: 2021, o: ['acting'], q: null },
  'Kevin Anderson': { g: 'm', a: true, t: false, rg: 'na', y: 1960, d: null, o: ['acting'], q: null },
  'Anthony Johnson': { g: 'm', a: false, t: false, rg: 'na', y: 1966, d: 2021, o: ['acting'], q: null },
  'Robert Axelrod': { g: 'm', a: false, t: false, rg: 'na', y: 1949, d: 2019, o: ['acting'], q: null },
  'Ben Johnson': { g: 'm', a: false, t: false, rg: 'na', y: 1918, d: 1996, o: ['acting'], q: null },
  'Bill Stevenson': { g: 'm', a: true, t: false, rg: 'na', y: 1963, d: null, o: ['music'], q: null },
  'Billy Dean': { g: 'm', a: true, t: false, rg: 'na', y: 1962, d: null, o: ['music'], q: null },
  'Alicia Fox': { g: 'f', a: true, t: false, rg: 'na', y: 1986, d: null, o: ['sport', 'acting'], sp: 'cm', q: null },
  'Wendy Barrie': { g: 'f', a: false, t: false, rg: 'eu', y: 1912, d: 1978, o: ['acting'], q: null },
  'Anthony Sher': { g: 'm', a: false, t: false, rg: 'eu', y: 1949, d: 2021, o: ['acting'], q: null },
  'Bobby Ball': { g: 'm', a: false, t: false, rg: 'eu', y: 1944, d: 2020, o: ['acting'], q: null },
  'Andy Cunningham': { g: 'm', a: false, t: false, rg: 'eu', y: 1950, d: 2017, o: ['acting'], q: null },
  'Darren Kent': { g: 'm', a: false, t: false, rg: 'eu', y: 1987, d: 2023, o: ['acting'], q: null },
  'Jon McLaughlin': { g: 'm', a: true, t: false, rg: 'na', y: 1982, d: null, o: ['music'], q: null },
  'Adam Rich': { g: 'm', a: false, t: false, rg: 'na', y: 1968, d: 2023, o: ['acting'], q: null },
  'Betty Lynn': { g: 'f', a: false, t: false, rg: 'na', y: 1926, d: 2021, o: ['acting'], q: null },
  'Michael Le (JustMaiko)': { g: 'm', a: true, t: false, rg: 'na', y: 2000, d: null, o: ['media', 'art'], q: null },
  'Gildart Jackson': { g: 'm', a: true, t: false, rg: 'eu', y: 1963, d: null, o: ['acting', 'film'], q: 'Q1524203' },
  'Divian Ladwa': { g: 'm', a: true, t: false, rg: 'eu', y: 1990, d: null, o: ['acting'], q: 'Q30110166' },
  'David English': { g: 'm', a: false, t: false, rg: 'eu', y: 1946, d: 2022, o: ['acting', 'sport'], sp: 'ind', q: 'Q112252096' },
  'John Adames': { g: 'm', a: true, t: false, rg: 'na', y: 1972, d: null, o: ['acting'], q: 'Q6029937' },
  'Adam Howden': { g: 'm', a: true, t: false, rg: 'eu', y: 1983, d: null, o: ['acting'], q: 'Q4679259' },
  SkyBlu: { g: 'm', a: true, t: false, rg: 'na', y: 1986, d: null, o: ['music'], q: null },
  'Alexis Arquette': { g: 'f', a: false, t: false, rg: 'na', y: 1969, d: 2016, o: ['acting'], q: 'Q254431' },
  'Olly Alexander': { g: 'none', a: true, t: false, rg: 'eu', y: 1990, d: null, o: ['music', 'acting'], q: 'Q7088396' },
  'Emily Carey': { g: 'none', a: true, t: false, rg: 'eu', y: 2003, d: null, o: ['acting'], q: 'Q16239251' },
  'Emma Corrin': { g: 'none', a: true, t: false, rg: 'eu', y: 1995, d: null, o: ['acting'], q: 'Q63086179' },
  'Ayta Sözeri': { g: 'f' },
  'Çağla Akalın': { g: 'f' },
  'Selin Ciğerci': { g: 'f' },
  'Quentin Crisp': { g: 'm' },
  'TimTheTatman (Timothy Betar)': { g: 'm', a: true, t: false, rg: 'na', y: 1990, d: null, o: ['media', 'music'], q: 'Q61789029' },
  'Mizkif (Matthew Rinaudo)': { g: 'm', a: true, t: false, rg: 'na', y: 1995, d: null, o: ['media'], q: 'Q104641928' },
  'Narendra Modi': { rg: 'as', t: false },

  // --- Historical, monarchs, scholars & ancient figures ---
  Bâkî: { g: 'm', a: false, t: true, rg: 'tr', y: 1526, d: 1600, o: ['literature'], q: null },
  Nâbî: { g: 'm', a: false, t: true, rg: 'tr', y: 1642, d: 1712, o: ['literature'], q: null },
  Attila: { g: 'm', a: false, t: false, rg: 'as', y: 406, d: 453, o: ['politics'], q: null },
  'Cezeri (El-Cezeri)': { g: 'm', a: false, t: true, rg: 'tr', y: 1136, d: 1206, o: ['science'] },
  'El-Cezeri': { g: 'm', a: false, t: true, rg: 'tr', y: 1136, d: 1206, o: ['science'] },
  Alparslan: { g: 'm', a: false, t: true, rg: 'tr', y: 1029, d: 1072, o: ['politics'], q: null },
  'Çandarlı Halil Paşa': { g: 'm', a: false, t: true, rg: 'tr', y: 1390, d: 1453, o: ['literature', 'politics'], q: 'Q1572451' },
  'Auvergneli William': { g: 'm', a: false, t: false, rg: 'eu', y: 1180, d: 1249, o: ['literature', 'science'], q: null },
  'Muhammed Abdüsselam': { g: 'm', a: false, t: false, rg: 'as', y: 1926, d: 1996, o: ['science'], q: null },
  'Kraliçe II. Elizabeth': { g: 'f', a: false, t: false, rg: 'eu', y: 1926, d: 2022, o: ['politics'], q: null },
  'Kral III. Charles': { g: 'm', a: true, t: false, rg: 'eu', y: 1948, d: null, o: ['politics'], q: null },
  'Kraliçe Victoria': { g: 'f', a: false, t: false, rg: 'eu', y: 1819, d: 1901, o: ['politics'], q: null },
  'Kraliçe I. Elizabeth': { g: 'f', a: false, t: false, rg: 'eu', y: 1533, d: 1603, o: ['politics'], q: null },
  'Kral VIII. Henry': { g: 'm', a: false, t: false, rg: 'eu', y: 1491, d: 1547, o: ['politics'], q: null },
  'Kral VI. George (Zoraki Kral)': { g: 'm', a: false, t: false, rg: 'eu', y: 1895, d: 1952, o: ['politics'], q: null },
  'Çar II. Nikolay (Son Rus Çarı)': { g: 'm', a: false, t: false, rg: 'eu', y: 1868, d: 1918, o: ['politics'], q: null },
  'Kral XIV. Louis (Güneş Kral)': { g: 'm', a: false, t: false, rg: 'eu', y: 1638, d: 1715, o: ['politics'], q: null },
  'Korkunç İvan': { g: 'm', a: false, t: false, rg: 'eu', y: 1530, d: 1584, o: ['politics'], q: null },
  'Wolfgang Paul': { g: 'm', a: false, t: false, rg: 'eu', y: 1913, d: 1993, o: ['science'], q: null },
  'İbn-i Haldun': { g: 'm', a: false, t: false, rg: 'af', y: 1332, d: 1406, o: ['science', 'literature'], q: null },
  'Buda (Siddhartha Gautama)': { g: 'm', a: false, t: false, rg: 'as', y: -563, d: -483, o: ['literature'], q: null },
  'İbni Batuta': { g: 'm', a: false, t: false, rg: 'af', y: 1304, d: 1369, o: ['science', 'literature'], q: null },
  'İbn-i Heysem': { g: 'm', a: false, t: false, rg: 'me', y: 965, d: 1040, o: ['science'], q: null },
  Öklid: { g: 'm', a: false, t: false, rg: 'af', y: -325, d: -265, o: ['science'], q: null },
  Spartaküs: { g: 'm', a: false, t: false, rg: 'eu', y: -103, d: -71, o: ['politics'], q: 'Q83406' },
  'Hacı Bektaş-ı Veli': { t: true, rg: 'tr' },
  'Mevlana Celaleddin Rumi': { t: true, rg: 'tr' },
  'II. Bayezid': { t: true, rg: 'tr' },
  'İbn-i Sina': { t: false, rg: 'me' },
  'El-Hârizmî': { t: false, rg: 'me' },
  'İbn-i Rüşd': { t: false, rg: 'eu' },
  'Harun Reşid': { t: false, rg: 'me' },
  'Frantz Fanon': { t: false, rg: 'la' },
  Herakleios: { t: false, rg: 'eu' },
  Aristoteles: { t: false, rg: 'eu' },
  Hipokrat: { t: false, rg: 'eu' },
  'Prenses Diana': { o: ['media', 'politics'] },
  'Annibale Caccavello': { t: false, rg: 'eu' },
  'Matteo di Giovanni': { t: false, rg: 'eu' },
  'Saksonyalı Albert': { t: false, rg: 'eu' },
  'Julius Sezar Skaliger': { t: false, rg: 'eu' },
  Tonyukuk: { t: true, rg: 'tr' },
}

/** Canonical region overrides for famous multi-citizenship / naturalized public figures. */
const REGION_OVERRIDES = {
  'Jackie Chan': 'as',
  'Angelina Jolie': 'na',
  Shakira: 'la',
  'Albert Einstein': 'eu',
  'Nikola Tesla': 'eu',
  'Elon Musk': 'na',
  'Arnold Schwarzenegger': 'eu',
  'Boris Johnson': 'eu',
  'Christian Bale': 'eu',
  'George Washington': 'na',
  'Andrew Carnegie': 'na',
  'Simón Bolívar': 'la',
  'Bobby Fischer': 'na',
  'Martina Navratilova': 'eu',
  'Monica Seles': 'eu',
  'Hakeem Olajuwon': 'af',
  'Steve Nash': 'na',
  'Sigmund Freud': 'eu',
  'Arno Penzias': 'na',
  'Joseph Brodsky': 'eu',
  'Syukuro Manabe': 'as',
  'Jensen Huang': 'na',
  'Sundar Pichai': 'as',
  'Satya Nadella': 'as',
  'Cary Grant': 'na',
  'Daniel Craig': 'eu',
  'Emily Blunt': 'eu',
  'Hayley Atwell': 'eu',
  'Olivia de Havilland': 'na',
  'Kim Cattrall': 'na',
  'Ana de Armas': 'la',
  'Gemma Chan': 'eu',
  'Pokimane (Imane Anys)': 'na',
  'Emerson Fittipaldi': 'la',
  'Elena Rybakina': 'as',
  'Khamzat Chimaev': 'eu',
  'İlham Aliyev': 'as',
  'Kasım Cömert Tokayev': 'as',
  'Şavkat Mirziyoyev': 'as',
  'Hulagu Han': 'as',
  'Andrew Garfield': 'na',
  'Peter Finch': 'oc',
  'Adewale Akinnuoye-Agbaje': 'eu',
  'Chiwetel Ejiofor': 'eu',
  'Steve Mandanda': 'eu',
  'Michael Le (JustMaiko)': 'na',
  'Bella Poarch': 'na',
  'Lele Pons': 'na',
  'Dan Bilzerian': 'na',
  'Natalia Tena': 'eu',
  'Natalie Portman': 'na',
  'Aleksandar Aleksandrov': 'eu',
  'Peritan Bozdağ': 'as',
}

/** Maps occupation labels -> PersonDomain. */
function inferDomainsFromOccupations(occLabels, category) {
  const out = new Set()
  if (category === 'sporcular') out.add('sport')
  for (const raw of occLabels) {
    const l = raw.toLowerCase()
    if (
      l.includes('actor') || l.includes('actress') || l.includes('voice ') ||
      l.includes('comedian') || l.includes('stunt')
    ) out.add('acting')
    if (
      l.includes('film ') || l.includes('screenwriter') || l.includes('director') ||
      l.includes('cinematograph') || l.includes('animator') || l.includes('producer')
    ) out.add('film')
    if (
      l.includes('singer') || l.includes('musician') || l.includes('composer') ||
      l.includes('rapper') || l.includes('guitarist') || l.includes('pianist') ||
      l.includes('conductor') || l.includes('dj') || l.includes('music ') ||
      l.includes('songwriter') || l.includes('recording artist')
    ) out.add('music')
    if (
      l.includes('painter') || l.includes('sculptor') || l.includes('architect') ||
      l.includes('designer') || l.includes('photographer') || l.includes('illustrator') ||
      l.includes('model') || l.includes('dancer') || l.includes('calligraph') ||
      l.includes('artist') || l.includes('fashion')
    ) out.add('art')
    if (
      l.includes('writer') || l.includes('poet') || l.includes('novelist') ||
      l.includes('philosopher') || l.includes('author') || l.includes('translator') ||
      l.includes('playwright') || l.includes('essayist') || l.includes('historian') ||
      l.includes('theologian') || l.includes('esperantist') || l.includes('teacher')
    ) out.add('literature')
    if (
      l.includes('journalist') || l.includes('presenter') || l.includes('broadcaster') ||
      l.includes('youtuber') || l.includes('streamer') || l.includes('podcaster') ||
      l.includes('radio ') || l.includes('pundit') || l.includes('commentator') ||
      l.includes('blogger') || l.includes('announcer') || l.includes('critic') ||
      l.includes('reality television')
    ) out.add('media')
    if (
      l.includes('politician') || l.includes('statesperson') || l.includes('monarch') ||
      l.includes('president') || l.includes('minister') || l.includes('diplomat') ||
      l.includes('military') || l.includes('general') || l.includes('soldier') ||
      l.includes('governor') || l.includes('mayor') || l.includes('activist') ||
      l.includes('advocate') || l.includes('khan') || l.includes('sultan') ||
      l.includes('wali') || l.includes('aristocrat') || l.includes('lady-in-waiting') ||
      l.includes('human rights') || l.includes('pacifist') || l.includes('partisan') ||
      l.includes('priest') || l.includes('cleric') || l.includes('religious') ||
      l.includes('pastor') || l.includes('preacher') || l.includes('parson') ||
      l.includes('jurist') || l.includes('lawyer') || l.includes('gladiator')
    ) out.add('politics')
    if (
      l.includes('scientist') || l.includes('biochemist') || l.includes('physicist') ||
      l.includes('chemist') || l.includes('biologist') || l.includes('mathematic') ||
      l.includes('physician') || l.includes('surgeon') || l.includes('neuroscien') ||
      l.includes('microbiologist') || l.includes('pharmacolog') || l.includes('pharmacist') ||
      l.includes('geneticist') || l.includes('immunologist') || l.includes('physiologist') ||
      l.includes('virologist') || l.includes('botanist') || l.includes('psycholog') ||
      l.includes('psychiatrist') || l.includes('neurologist') || l.includes('researcher') ||
      l.includes('university teacher') || l.includes('professor') || l.includes('docent') ||
      l.includes('climatologist') || l.includes('meteorologist') || l.includes('sociologist') ||
      l.includes('parasitologist') || l.includes('bacteriologist') || l.includes('biophysicist') ||
      l.includes('biotechnologist') || l.includes('veterinarian') || l.includes('pathologist') ||
      l.includes('astronom') || l.includes('engineer') || l.includes('inventor') ||
      l.includes('economist') || l.includes('programmer') || l.includes('developer')
    ) out.add('science')
    if (
      l.includes('business') || l.includes('entrepreneur') || l.includes('financier') ||
      l.includes('manufacturer') || l.includes('merchant') || l.includes('proprietor') ||
      l.includes('ship-owner') || l.includes('restaurateur') || l.includes('philanthropist') ||
      l.includes('benefactor') || l.includes('socialite')
    ) out.add('business')
    if (
      l.includes('football') || l.includes('basketball') || l.includes('volleyball') ||
      l.includes('tennis') || l.includes('athlete') || l.includes('boxer') ||
      l.includes('wrestl') || l.includes('swimmer') || l.includes('cricketer') ||
      l.includes('biathlete') || l.includes('figure skater') || l.includes('martial') ||
      l.includes('judo') || l.includes('karate') || l.includes('taekwondo') ||
      l.includes('golfer') || l.includes('driver') || l.includes('runner') ||
      l.includes('sprinter') || l.includes('chess') || l.includes('grandmaster') ||
      l.includes('gymnast') || l.includes('weightlift') || l.includes('skater') ||
      l.includes('cyclist') || l.includes('rower') || l.includes('fencer') ||
      l.includes('archer') || l.includes('snooker') || l.includes('billiards') ||
      l.includes('pool player') || l.includes('poker') || l.includes('coach')
    ) out.add('sport')
  }
  return [...out]
}

const DOMAIN_FALLBACK_BY_CAT = {
  sporcular: 'sport',
  unluler: 'acting',
  tarihi_kisiler: 'politics',
}

/** Explicit sport branch overrides for multi-sport or non-`sporcular` entries. */
const SPORT_BRANCH_OVERRIDES = {
  'Mike Tyson': 'cm',
  'Muhammad Ali': 'cm',
  'Khabib Nurmagomedov': 'cm',
  'Conor McGregor': 'cm',
  'Jon Jones': 'cm',
  'Brock Lesnar': 'cm',
  'John Cena': 'cm',
  'The Rock (Dwayne Johnson)': 'cm',
  'Dwayne Johnson': 'cm',
  'Logan Paul': 'cm',
  'Jake Paul': 'cm',
  'Manny Pacquiao': 'cm',
  'Floyd Mayweather Jr.': 'cm',
  'Anthony Joshua': 'cm',
  'Tyson Fury': 'cm',
  'Oleksandr Usyk': 'cm',
  'Israel Adesanya': 'cm',
  'Anderson Silva': 'cm',
  'Khamzat Chimaev': 'cm',
  'Badr Hari': 'cm',
  'Roy Jones Jr.': 'cm',
  'Gökhan Saki': 'cm',
  'Rıza Kayaalp': 'cm',
  'Taha Akgül': 'cm',
  'Hamza Yerlikaya': 'cm',
  'Busenaz Sürmeneli': 'cm',
  'Buse Naz Çakıroğlu': 'cm',
  'Yasemin Adar': 'cm',
  'Hatice Kübra İlgün': 'cm',
  'Nafia Kuş': 'cm',
  'Hakan Reçber': 'cm',
  'Servet Tazegül': 'cm',
  'Nur Tatar': 'cm',
  'Vinnie Jones': 'fb',
  'Jason Statham': 'ind',
  'Arnold Schwarzenegger': 'ind',
  'Kaan Kural': null,
  'Ersin Düzen': null,
  'Emre Gönlüşen': null,
  'Murat Kosova': null,
  Ogeday: null,
  'Acun Ilıcalı': null,
}

function inferSportBranch(name, domains, occLabels, category) {
  if (Object.prototype.hasOwnProperty.call(SPORT_BRANCH_OVERRIDES, name)) {
    return SPORT_BRANCH_OVERRIDES[name]
  }
  const hasSport = category === 'sporcular' || domains.includes('sport')
  if (!hasSport) return null

  const joined = occLabels.map((l) => l.toLowerCase()).join(' | ')
  // Order matters only slightly: prioritize primary competitive branches cleanly.
  if (joined.includes('volleyball')) return 'vb'
  if (joined.includes('basketball')) return 'bk'
  if (
    joined.includes('football') || joined.includes('soccer') ||
    joined.includes('futsal') || joined.includes('goalkeeper coach')
  ) return 'fb'
  if (
    joined.includes('boxer') || joined.includes('wrestl') ||
    joined.includes('mixed martial') || joined.includes('martial artist') ||
    joined.includes('taekwondo') || joined.includes('judo') ||
    joined.includes('karate') || joined.includes('kickbox') ||
    joined.includes('sambo') || joined.includes('jiu-jitsu') ||
    joined.includes('aikido') || joined.includes('fencer')
  ) return 'cm'
  return 'ind'
}

function inferRegion(name, tFlag, cits) {
  if (REGION_OVERRIDES[name]) return REGION_OVERRIDES[name]
  if (tFlag) return 'tr'
  for (const qid of cits) {
    const reg = COUNTRY_TO_REGION[qid]
    if (reg && reg !== 'tr') return reg
  }
  if (cits.some((q) => COUNTRY_TO_REGION[q] === 'tr')) return 'tr'
  return 'eu'
}

/** ================== FICTIONAL TAXONOMY TABLES ================== */

const FICTIONAL_TV_TR = new Set([
  'Polat Alemdar', 'Süleyman Çakır', 'Memati Baş', 'Abdülhey Çoban', 'Seyfo Dayı',
  'Aslan Akbey', 'Testere Necmi', 'Laz Ziya', 'İskender Büyük', 'Pala (Kurtlar Vadisi)',
  'Ramiz Dayı (Ramiz Karaeski)', 'Ezel Bayraktar', 'Eyşan Tezcan', 'Cengiz Atay',
  'Kerpeten Ali (Ali Kırgız)', 'Kenan Birkan', 'Tefo (Tevfik Zaim)',
  'Behzat Ç.', 'Harun (Behzat Ç.)', 'Hayalet (Behzat Ç.)', 'Akbaba (Behzat Ç.)', 'Ercüment Çözer',
  'Behlül Haznedar', 'Bihter Ziyagil', 'Adnan Ziyagil', 'Firdevs Yöreoğlu', 'Matmazel (Aşk-ı Memnu)',
  'Yamaç Koçovalı', 'İdris Koçovalı', 'Vartolu Sadettin', 'Cumali Koçovalı', 'Aliço (Çukur)',
  'Mecnun Çınar', 'İsmail Abi', 'Erdal Bakkal',
  'Yılmaz (Gibi)', 'İlkkan (Gibi)', 'Ersoy (Gibi)',
  'Burhan Altıntop', 'Gaffur Aksoy', 'Şahika Koçarslanlı',
  'Kuzey Tekinoğlu', 'Güney Tekinoğlu',
  'Rıza Baba (Arka Sokaklar)', 'Mesut Komiser', 'Hüsnü Çoban',
  'Hızır Çakırbeyli (EDHO)', 'İlyas Çakırbeyli',
  'Can Manay', 'Kudret (Kardeş Payı / Ahmet Kural)',
  'Ilgaz Kaya (Savcı Ilgaz / Yargı)', 'Ceylin Erguvan (Avukat Ceylin / Yargı)',
  'Yekta Tilmen (Yargı)', 'Eren Duman (Komiser Eren / Yargı)', 'Pars Seçkin (Başsavcı Pars / Yargı)',
  'Pembe Ünal (Kızılcık Şerbeti)', 'Doğa Korkmaz (Kızılcık Şerbeti)',
  'Fatih Ünal (Kızılcık Şerbeti)', 'Alev Arslan (Kızılcık Şerbeti)',
  'Kıvılcım Arslan (Kızılcık Şerbeti)', 'Ömer Ünal (Kızılcık Şerbeti)', 'Nursema Ünal (Kızılcık Şerbeti)',
  'Seyran Şanlı (Yalı Çapkını)', 'Ferit Korhan (Yalı Çapkını)',
  'Halis Ağa (Halis Korhan / Yalı Çapkını)', 'Kazım Şanlı (Kazım Ağa / Yalı Çapkını)', 'İfakat Korhan',
  'Süleyman (Halit Ergenç / Muhteşem Yüzyıl)', 'Pargalı İbrahim (Okan Yalabık / Muhteşem Yüzyıl)',
  'Mahidevran Sultan (Nur Fettahoğlu)', 'Malkoçoğlu Bali Bey (Burak Özçivit)',
  'Şehzade Mustafa (Mehmet Günsür)', 'Şehzade Bayezid (Aras Bulut İynemli)',
  'Şehzade Selim (Engin Öztürk)', 'Şehzade Cihangir (Tolga Sarıtaş)',
  'Sümbül Ağa (Selim Bayraktar)', 'Gül Ağa (Engin Günaydın)',
  'Kemal Soydere (Kara Sevda)', 'Nihan Sezin (Kara Sevda)', 'Emir Kozcuoğlu (Kaan Urgancıoğlu / Kara Sevda)',
  'Züleyha Altun (Bir Zamanlar Çukurova)', 'Demir Yaman (Bir Zamanlar Çukurova)',
  'Yılmaz Akkaya (Bir Zamanlar Çukurova)', 'Fekeli (Ali Rahmet Fekeli / Kerem Alışık)', 'Hünkar Yaman (Vahide Perçin)',
  'Meryem (Kuvvetli Bir Alkış)', 'Peri (Bir Başkadır)', 'Ruhi (Bir Başkadır)',
  'Gülben Derenoğlu (Masumlar Apartmanı)', 'Safiye Derenoğlu (Ezgi Mola / Masumlar Apartmanı)',
  'Han Derenoğlu (Birkan Sokullu)', 'İnci Özdemir (Farah Zeynep Abdullah)',
  'Ali Rıza Bey (Yaprak Dökümü)', 'Hayriye Hanım (Ağzımızın Tadı Kaçmasın)',
  'Ferhunde Güven (Deniz Çakır / Yaprak Dökümü)', 'Oğuz Güven (Tolga Karel / Yaprak Dökümü)',
  'Leyla Tekin (Gökçe Bahadır)', 'Necla Tekin (Fahriye Evcen)',
  'Şevket Tekin (Caner Kurtaran)', 'Fikret Tekin (Bennu Yıldırımlar)', 'Sedef (Seda Demir)',
  'Sıla Gencer (Cansu Dere / Sıla)', 'Boran Ağa (Mehmet Akif Alakurt / Sıla)',
  'Ali Kaptan (Erkan Petekkaya / Öyle Bir Geçer Zaman ki)', 'Cemile Akarsu (Ayça Bingöl)',
  'Caroline (Wilma Elles / Öyle Bir Geçer Zaman ki)', 'Mete Akarsu (Aras Bulut İynemli)',
  'Osman Akarsu (Küçük Osman / Emir Berke Zincidi)', 'Berrin Akarsu',
  'Aylin Akarsu (Farah Zeynep Abdullah)', 'Soner Talaşoğlu (Mete Horozoğlu)', 'Ahmet Taşer (Tolga Güleç)',
  'Ertuğrul Bey (Engin Altan Düzyatan / Diriliş Ertuğrul)', 'Halime Hatun (Esra Bilgiç)',
  'Turgut Alp (Cengiz Coşkun)', 'Bamsı Beyrek (Nurettin Sönmez)', 'Doğan Alp',
  'Osman Bey (Burak Özçivit / Kuruluş Osman)', 'Bala Hatun (Özge Törer)',
  'Malhun Hatun (Yıldız Çağrı Atiksoy)', 'Şeyh Edebali (Kuruluş Osman)',
])

const FICTIONAL_FILM_TR = new Set([
  'Recep İvedik', 'İnek Şaban', 'Damat Ferit', 'Güdük Necmi', 'Mahmut Hoca (Kel Mahmut)', 'Badi Ekrem',
  'Tosun Paşa', 'Hakiki Tosun Paşa', 'Kibar Feyzo', 'Maho Ağa', 'Züğürt Ağa', 'Turist Ömer',
  'Arif Işık (G.O.R.A.)', 'Komutan Logar', 'Robot 216', 'Bob Marley Faruk', 'Erşan Kuneri',
  'Tecavüzcü Coşkun',
  'Deli Emin (Vizontele / Yılmaz Erdoğan)', 'Başkan Nazmi (Vizontele / Altan Erkekli)',
  'Fikri (Vizontele / Cem Yılmaz)', 'Sıti Ana (Vizontele / Demet Akbağ)',
  'Baran (Eşkıya / Şener Şen)', 'Cumali (Eşkıya / Uğur Yücel)',
  'Keje (Eşkıya / Şermin Hürmeriç)', 'Mahmut (Eşkıya / Berke Hürmeriç)',
  'Muhsin Bey (Şener Şen)', 'Ali Nazik (Muhsin Bey / Uğur Yücel)',
  'Ferman (Av Mevsimi / Şener Şen)', 'İdris (Av Mevsimi / Cem Yılmaz / Deli İdris)', 'Hasan (Av Mevsimi / Okan Yalabık)',
  'Malkoçoğlu (Cüneyt Arkın)', "Kara Murat (Fatih'in Fedaisi / Cüneyt Arkın)",
  "Kurt (Tarkan'ın Kurdu)", 'Ahtapot (Tarkan Viking Kanı Dev Ahtapot)', 'Hain Kostok (Tarkan Düşmanı)',
  'Gülümser (Selvi Boylum Al Yazmalım / Türkan Şoray / Asya)',
  'İlyas (Selvi Boylum Al Yazmalım / Kadir İnanır)',
  'Cemşit (Selvi Boylum Al Yazmalım / Ahmet Mekin / Sevgi Emektir)',
  'Tatar Ramazan (Kadir İnanır / Ben Bu Oyunu Bozarım)',
  'Komiser Şekip (Pardon / Ferhan Şensoy)', 'İbrahim (Pardon / Ferhan Şensoy)', 'Muzo (Pardon / Rasim Öztekin)',
  'Tülay (Düğün Dernek)', 'Tüpçü Fikret (Düğün Dernek / Ahmet Kural)',
  'Çetin (Düğün Dernek / Murat Cemcir)', 'Muallim Saffet (Düğün Dernek / Barış Yıldız)',
  'Gürkan (Çalgı Çengi)', 'Salih (Çalgı Çengi)',
])

const FICTIONAL_TOON_TR = new Set([
  'Keloğlan', 'Kara Vezir (Keloğlan)', 'Balkız (Keloğlan)', 'Uzun (Keloğlan)', 'Huysuz (Keloğlan)',
  'Hayri (Rafadan Tayfa)', 'Kamil (Rafadan Tayfa)', 'Akın (Rafadan Tayfa)', 'Mert (Rafadan Tayfa)',
  'Basri Amca (Rafadan Tayfa)', 'Sevim (Rafadan Tayfa)', 'Hale (Rafadan Tayfa)',
  'Kral Şakir', 'Fil Necati', 'Canan (Kral Şakir)', 'Remzi (Kral Şakir)', 'Kadriye (Kral Şakir)', 'Mirket (Kral Şakir)',
  'Pepee', 'Şila (Pepee)', 'Bebee (Pepee)',
  'Niloya', 'Tospik (Niloya)', 'Murat (Niloya)',
  'Müge (Canım Kardeşim)', 'Mine (Canım Kardeşim)', 'Mıncır (Canım Kardeşim)',
  'Emiray', 'İbi (İbi ve Tosi)',
])

const FICTIONAL_TR_BOOKS_FOLK = new Set([
  'Nasreddin Hoca', 'Dede Korkut', 'Köroğlu', 'Şahmeran (Yılanların Şahı)',
  'Amanvermez Avni', 'Korkut Ata', 'Alığ Han', 'Alp Er Tunga', 'Alpamış', 'Altınay',
  'Ay Kağan', 'Banu Çiçek', 'Basat', 'Battal Gazi', 'Bayındır Han', 'Begin Oğlu Emren',
  'Bozkurt', 'Dağ Han', 'Deli Dumrul', 'Huban Arığ', 'Kür Şad', 'Oğuz Kağan',
  'Uzun İhsan Efendi', 'Tepegöz',
])

const FICTIONAL_ANIME = new Set([
  'Pikachu (Pokemon)', 'Ash Ketchum (Pokemon)', 'Misty (Pokemon)', 'Brock (Pokemon)',
  'Charizard (Pokemon)', 'Mewtwo (Pokemon)',
  'Goku (Dragon Ball)', 'Vegeta (Dragon Ball)', 'Piccolo (Dragon Ball)',
  'Naruto Uzumaki', 'Sasuke Uchiha', 'Kakashi Hatake', 'Itachi Uchiha', 'Madara Uchiha',
  'Jiraiya (Naruto)', 'Tsunade', 'Orochimaru',
  'Monkey D. Luffy (One Piece)', 'Roronoa Zoro (One Piece)', 'Sanji (One Piece)',
  'Nami (One Piece)', 'Trafalgar Law', 'Portgas D. Ace',
  'Sailor Moon (Ay Savaşçısı)', 'Tuxedo Mask (Mamoru Chiba)',
  'Kaptan Tsubasa (Tsubasa Ozora)', 'Kojiro Hyuga', 'Jun Misugi',
  'Tsubasa Ozora (Kaptan Tsubasa)', 'Genzo Wakabayashi (Kaleci Wakabayashi)',
  'Taro Misaki (Altın İkili)', 'Ken Wakashimazu (Karateci Kaleci)',
  'Eren Yeager', 'Levi Ackerman', 'Mikasa Ackerman', 'Armin Arlert', 'Erwin Smith',
  'Light Yagami', 'L (L Lawliet / Death Note)', 'Ryuk (Ölüm Meleği / Shinigami)', 'Misa Amane',
  'Spike Spiegel', 'Hao Asakura', 'Ryuga',
  'Tyson Granger (Beyblade)', 'Kai Hiwatari (Dranzer / Beyblade)',
  'Ray Kon (Driger / Beyblade)', 'Max Tate (Draciel / Beyblade)',
  'Saitama (Kel Pelerinli / One Punch Man)', 'Genos (One Punch Man)',
  'Tanjiro Kamado (Demon Slayer)', 'Nezuko Kamado', 'Zenitsu Agatsuma',
  'Inosuke Hashibira', 'Kyojuro Rengoku',
  'Satoru Gojo (Jujutsu Kaisen)', 'Yuji Itadori', 'Megumi Fushiguro', 'Ryomen Sukuna',
  'Edward Elric (Fullmetal Alchemist)', 'Alphonse Elric', 'Roy Mustang',
  'Yugi Muto (Yu-Gi-Oh!)', 'Seto Kaiba', 'Guts (Berserk)', 'Griffith (Berserk)',
  'Totoro (Komşum Totoro / Studio Ghibli)', 'Chihiro (Ruhların Kaçışı / Spirited Away)',
  'Haku (Spirited Away)', 'Kaonashi (Yüzsüz / No-Face)', 'Howl (Yürüyen Şato)',
  'Prenses Mononoke (San)',
  'Heidi', "Peter (Heidi'nin Arkadaşı)", 'Clara (Heidi)', "Alp Dede (Heidi'nin Büyükbabası)",
])

const FICTIONAL_GAMES = new Set([
  'Super Mario', 'Luigi', 'Prenses Peach', 'Bowser', 'Bowser Jr.', 'Wario', 'Waluigi',
  'Sonic (Kirpi Sonic)', 'Metal Sonic', 'Kirpi Nazo', 'Kirpi Silver', 'Amy Rose',
  'Armadillo Mighty', 'Chao Cheese', 'Chao Chocola', 'Light Gaia', 'Ekidne Knuckles',
  'Miles "Tails" Prower', 'Bukalemun Espio', 'Prenses Sally Acorn', 'Tavşan Cream',
  'Uçan Sincap Ray', 'E-123 Omega',
  'Link (Zelda)', 'Prenses Zelda', 'Ganon',
  'Pac-Man', 'Crash Bandicoot', 'Lara Croft (Tomb Raider)',
  'Kratos (God of War)', 'Atreus (God of War)',
  'Ciri (The Witcher)', 'Yennefer of Vengerberg',
  'Arthur Morgan (Red Dead Redemption 2)', 'John Marston (Red Dead Redemption)',
  'CJ (Carl Johnson - GTA San Andreas)', 'Tommy Vercetti (GTA Vice City)',
  'Trevor Philips (GTA V)', 'Niko Bellic (GTA IV)', 'Claude', 'Lance Vance',
  'Luis Fernando Lopez', 'Toni Cipriani', 'Michael De Santa',
  'Master Chief (Halo)', 'Doom Slayer (Doom)', 'Gordon Freeman (Half-Life)',
  'Nathan Drake (Uncharted)', 'Joel Miller (The Last of Us)', 'Ellie Williams (The Last of Us)',
  'Scorpion (Mortal Kombat)', 'Sub-Zero (Mortal Kombat)', 'Cassie Cage', 'Kano', 'Shang Tsung',
  'Ryu (Street Fighter)', 'Jin Kazama',
  'Steve (Minecraft)', 'Creeper (Minecraft)',
  'Ada Wong', 'Leon S. Kennedy', 'Max Payne', 'Desmond Miles', 'Kyle Katarn', 'Vulcan Raven',
])

const FICTIONAL_CARTOONS = new Set([
  // Looney Tunes / Disney / Pixar / Hanna-Barbera / Cartoon Network / Comedy Animation
  'SüngerBob KareŞort', 'Patrick Yıldız', 'Squidward', 'Bay Yengeç', 'Plankton', 'Gary (SüngerBob Salyangozu)',
  'Sandy Cheeks (Sincap Sandy)',
  'Mickey Mouse', 'Donald Duck', 'Goofy', 'Daisy Duck', 'Pluto (Mickey\'nin Köpeği)',
  'Clarabelle Cow', 'Ayı Humphrey', 'Bucky Bug', 'John D. Rockerduck', 'José Carioca',
  'Ludwig Von Drake', 'Magica De Spell', 'Max Goof', 'Paperinik', 'Vakıf Dede (Scrooge McDuck / Varyemez Amca)',
  'Bugs Bunny', 'Daffy Duck', 'Tweety', 'Sylvester', 'Elmer Fudd', 'Lola Bunny', 'Pepé Le Pew',
  'Porky Pig', 'Tazmanya Canavarı', 'Yosemite Sam', 'Bosko', 'Buddy', 'Road Runner (Bip Bip)',
  'Wile E. Coyote (Çakal)', 'Marvin the Martian (Marslı Marvin)', 'Speedy Gonzales',
  'Tom (Tom ve Jerry)', 'Jerry (Tom ve Jerry)',
  'Scooby-Doo', 'Shaggy', 'Fred Jones (Scooby-Doo)', 'Daphne Blake (Scooby-Doo)', 'Velma Dinkley',
  'Temel Reis', 'Safinaz', 'Kabasakal', 'Garfield', 'Odie (Garfield Köpeği)', 'Jon Arbuckle (Garfield Sahibi)',
  'Red Kit (Lucky Luke)', 'Joe Dalton', 'Averell Dalton', 'Düldül (Jolly Jumper)', 'Rintintin (Rantanplan)',
  'Asteriks (Asterix)', 'Oburiks (Obelix)', 'Büyüfiks', 'Tenten (Tintin)',
  'Şirin Baba', 'Şirine', 'Gargamel', 'Azman (Gargamel\'in Kedisi)',
  'Gözlüklü Şirin', 'Güçlü Şirin', 'Uykucu Şirin', 'Sakar Şirin', 'Tembel Şirin',
  'Fred Çakmaktaş', 'Barni Moloztaş', 'Vilma Çakmaktaş (Wilma Flintstone)', 'Beti Moloztaş (Betty Rubble)', 'Dino (Çakmaktaşlar Köpeği)',
  'George Jetson (Jetgiller)', 'Jane Jetson', 'Astro (Jetgiller Köpeği)', 'Rosie (Robot Hizmetçi Rosie)',
  'Cedric', 'Chen (Cedric\'in Aşkı)', 'Christian (Cedric\'in Rakibi)', 'Büyükbaba (Cedric)', 'Calimero (Haksızlık Bu Ama)',
  'Winnie the Pooh', 'Tigger (Kaplan Tigger)', 'Piglet (Domuzcuk)', 'Eeyore (Eşek Eeyore)',
  'Simba (Aslan Kral)', 'Mufasa', 'Scar (Aslan Kral)',
  'Shrek', 'Fiona (Shrek)', 'Eşek (Shrek)', 'Çizmeli Kedi', 'Kung Fu Panda (Po)',
  'Manny (Buz Devri)', 'Sid (Buz Devri)', 'Diego (Buz Devri)', 'Scrat (Buz Devri)',
  'Woody (Oyuncak Hikayesi)', 'Buzz Lightyear', 'Jessie (Oyuncak Hikayesi)',
  'Şimşek McQueen (Arabalar)', 'Çekici Mater (Arabalar)',
  'Nemo (Kayıp Balık Nemo)', 'Dory (Kayıp Balık Dory)', 'Gru (Çılgın Hırsız)',
  'Elsa (Karlar Ülkesi / Frozen)', 'Anna (Frozen)', 'Olaf (Kardan Adam Olaf)',
  'Sully (James P. Sullivan / Sevimli Canavarlar)', 'Mike Wazowski (Sevimli Canavarlar)',
  'Wall-E', 'EVE (Wall-E)', 'Remy (Aşçı Fare / Ratatouille)', 'Linguini (Ratatouille)',
  'Carl Fredricksen (Yukarı Bak / Up)', 'Russell (Yukarı Bak / Up)',
  'Bay İnanılmaz (Bob Parr)', 'Lastik Kız (Helen Parr / Elastigirl)',
  'Mulan', 'Mushu (Mulan Ejderhası)', 'Pocahontas', 'Belle (Güzel ve Çirkin)', 'Canavar (Güzel ve Çirkin)',
  'Ariel (Küçük Deniz Kızı)', 'Moana', 'Maui (Moana)', 'Stitch (Lilo ve Stitch)', 'Lilo Pelekai',
  'Malefiz (Maleficent)', 'Cruella de Vil (101 Dalmaçyalı)', 'Jafar (Aladdin)', 'Aladdin', 'Prenses Yasemin',
  'Ursula (Küçük Deniz Kızı)', 'Megara (Meg / Herkül)', 'Bambi', 'Dumbo',
  'Kuzco (Şaşkın İmparator)', 'Kronk (Şaşkın İmparator)', 'Yzma',
  'Joy (Neşe / Ters Yüz / Inside Out)', 'Sadness (Üzüntü / Inside Out)', 'Bing Bong (Inside Out)',
  'Miguel Rivera (Coco)', 'Hector Rivera (Coco)', 'Mama Coco',
  'Ben 10', 'Gwen Tennyson (Ben 10)', 'Büyükbaba Max (Ben 10)', 'Dört Kol (Ben 10)', 'Ateş Topu (Ben 10)',
  'Şimşek Hız (Ben 10)', 'Elmas Kafa (Ben 10)', 'Vilgax (Ben 10 Düşmanı)',
  'Samurai Jack', 'Aku (Samurai Jack Düşmanı)', 'Johnny Bravo',
  'Gumball', 'Darwin (Gumball)', 'Anais Watterson (Gumball)', 'Nicole Watterson (Anne / Gumball)', 'Richard Watterson (Baba / Gumball)',
  'Mordecai (Sürekli Dizi)', 'Rigby (Sürekli Dizi)', 'Benson (Sakız Makinesi Müdür)', 'Skips (Ölümsüz Goril)',
  'Pops (Lolipop Adam)', 'Kas Adam (Muscle Man)', 'Çak beşlik Hayalet (Hi-Five Ghost)',
  'Finn (Adventure Time)', 'Jake (Adventure Time)', 'Buz Kralı (Ice King / Simon Petrikov)',
  'Prenses Ciklet (Princess Bubblegum)', 'Marceline (Vampir Kraliçesi)',
  'Dexter (Dexter\'ın Laboratuvarı)', 'Dee Dee (Dexter)', 'Mandark (Dexter\'ın Rakibi)',
  'Mojo Jojo (Powerpuff Girls Düşmanı)', 'Profesör Utonium',
  'Courage the Cowardly Dog (Cesur Korkak Köpek)', 'Muriel Bagge (Cesur Sahibi)', 'Eustace Bagge (Aptal Köpek)',
  'Phineas Flynn (Phineas ve Ferb)', 'Ferb Fletcher', 'Ajan P (Ornitorenk Perry)', 'Dr. Heinz Doofenshmirtz', 'Candace Flynn',
  'Dipper Pines', 'Mabel Pines (Esrarengiz Kasaba)', 'Harika Amca Stan (Grunkle Stan)', 'Bill Cipher (Üçgen İblis)',
  'Soos Ramirez', 'Wendy Corduroy',
  'Pembe Panter (The Pink Panther)', 'Casper (Sevimli Hayalet)',
  'Snoopy (Peanuts)', 'Charlie Brown', 'Woodstock (Snoopy Kuşu)', 'Woody Woodpecker (Ağaçkakan Woody)',
  'Müfettiş Gadget (Inspector Gadget)', 'Penny (Müfettiş Gadget)', 'Brain (Gadget Köpeği)', 'Doktor Pençe (Dr. Claw)',
  'He-Man (Gölgelerin Gücü Adına)', 'İskeletor (Skeletor / He-Man)', 'Korkak Kaplan (Battle Cat / Cringer)', 'She-Ra (Prenses Gücü)',
  'Usta Splinter (Ninja Kaplumbağalar)', 'Shredder (Ninja Kaplumbağalar)', 'April O\'Neil', 'Krang (Beyin)',
  'Aang', 'Katara', 'Toph Beifong', 'Zuko', 'Twilight Sparkle', 'Bloom', 'Optimus Prime',
  'Homer Simpson', 'Marge Simpson', 'Bart Simpson', 'Lisa Simpson', 'Maggie Simpson', 'Mona Simpson',
  'Mr. Burns (Montgomery Burns / Simpsons)', 'Ned Flanders (Simpsons)', 'Moe Szyslak', 'Figüran Bob', 'Mona Simpson', 'Nelson Muntz',
  'Peter Griffin (Family Guy)', 'Lois Griffin', 'Stewie Griffin (Family Guy)', 'Brian Griffin (Konuşan Köpek)',
  'Meg Griffin', 'Chris Griffin', 'Glenn Quagmire (Giggity)',
  'Rick Sanchez (Rick and Morty)', 'Morty Smith (Rick and Morty)', 'Summer Smith', 'Beth Smith', 'Jerry Smith',
  'Mr. Meeseeks (Look at me!)','Birdperson (Rick and Morty)',
  'BoJack Horseman', 'Princess Carolyn (BoJack Horseman)', 'Diane Nguyen (BoJack)', 'Mr. Peanutbutter', 'Todd Chavez',
  'Stan Marsh (South Park)', 'Kyle Broflovski', 'Kenny McCormick (They killed Kenny!)', 'Eric Cartman',
  'Randy Marsh (Lorde / Tegridy Farms)', 'Butters Stotch (Professor Chaos)',
  'Philip J. Fry (Fry / Futurama)', 'Bender', 'Turanga Leela', 'Profesör Farnsworth (Good news, everyone!)', 'Dr. Zoidberg',
  'Martin Mystère', 'Nick Raider', 'Diabolik', 'Zorro',
  // Comics characters placed under cizgi_karakterler (Marvel, DC, Image, etc.)
  'Joker', 'Kaptan Amerika (Steve Rogers)', 'Kara Dul (Black Widow / Natasha Romanoff)', 'Harley Quinn',
  'Thanos', 'Venom', 'Black Widow', 'Blade', 'Daredevil', 'Darren Cross', 'Deadpool', 'Demir Adam',
  'Doktor Octopus', 'Doktor Strange', 'Dormammu', 'Dum Dum Dugan', 'F.R.I.D.A.Y.', 'Leo Fitz',
  'Howard Stark', 'Hulk', 'J. Jonah Jameson', 'Jane Foster', 'Jim Morita', 'Joan The Mouse',
  'Kandöken', 'Kingpin', 'Mary Jane Watson', 'Melinda May', 'Morgan Stark', 'Mr. Bumpo',
  'Mystique', 'New Goblin', 'Nick Fury', 'Nyx', 'Örümcek Adam', 'Para-Man', 'Punisher', 'Rogue',
  'Savaş Makinesi', 'Skaar', 'Storm', 'Şahin', 'Thor', 'Turk Barrett', 'Ulik', 'Uzay Şövalyesi Rom',
  'Wolverine', 'Ymir', 'Zuri', 'Luke Cage', 'Moon Knight', 'Karınca Adam', 'Wong',
  'Aquaman', 'Atom', 'Batgirl', 'Batman', 'Black Canary', 'Captain Marvel', 'Doomsday',
  'Eobard Thawne', 'Flash', 'General Zod', 'Green Lantern', 'Harvey Bullock', 'James Gordon',
  'Jason Todd', 'Lana Lang', 'Lois Lane', 'Nightwing', 'Superman', 'Tim Drake', 'Vartox',
  'Wonder Woman', 'Zatanna', 'Zatara', 'Zehirli Sarmaşık', 'Question', 'Robin', 'Rupert Thorne',
  'Efsuncu Amora', 'Freakazoid!', 'Hellboy', 'Pırılkız', 'Spawn', 'Painkiller Jane',
  'Druuna', 'The Yellow Kid', 'Ramona Flowers', 'Yarasa Rouge',
])

const FICTIONAL_GLOBAL_TV = new Set([
  'Jesse Pinkman', 'Gus Fring', 'Mike Ehrmantraut', 'Hank Schrader', 'Walter White',
  'Lydia Rodarte Quayle', 'Marie Schrader', 'Saul Goodman', 'Skyler White', 'Walter White Jr.', 'Kim Wexler',
  'Thomas Shelby (Peaky Blinders)', 'Arthur Shelby', 'Polly Gray (Peaky Blinders)', 'Alfie Solomons',
  'Jon Snow (Game of Thrones)', 'Daenerys Targaryen', 'Tyrion Lannister', 'Cersei Lannister',
  'Jaime Lannister', 'Arya Stark', 'Sansa Stark', 'Ned Stark', 'Gece Kralı (Night King)',
  'Varys', 'Tywin Lannister',
  'Daemon Targaryen (House of the Dragon / Matt Smith)', 'Rhaenyra Targaryen (Emma D\'Arcy / Milly Alcock)',
  'Alicent Hightower (Olivia Cooke / Emily Carey)', 'Viserys Targaryen (Kral Viserys / Paddy Considine)',
  'Aemond Targaryen (Tek Gözlü Aemond / Ewan Mitchell)', 'Otto Hightower (Rhys Ifans)',
  'Mandalorian (Din Djarin)', 'Bebek Yoda (Grogu)', 'Büyük Amiral Thrawn',
  'Profesör (La Casa de Papel)', 'Berlin (La Casa de Papel)', 'Tokyo (La Casa de Papel)',
  'Nairobi', 'Rio', 'Denver (Jaime Lorente / O meşhur gülüş)', 'Helsinki (Darko Peric)',
  'Moskova (Paco Tous)', 'Oslo (Roberto Garcia)', 'Müfettiş Raquel Murillo (Lizbon / Itziar Ituno)',
  'Alicia Sierra (Najwa Nimri)', 'Arturito (Arturo Roman / Enrique Arce)', 'Palermo (Rodrigo de la Serna)',
  'Bogota (Hovik Keuchkerian)', 'Marsilya (Luka Peros)',
  'Michael Scofield (Prison Break)', 'Theodore Bagwell (T-Bag)', 'Benjamin Miles "C-Note" Franklin', 'Fernando Sucre',
  'Dexter Morgan', 'Harry Morgan', 'James Doakes',
  'Wednesday Addams', 'Pugsley Addams',
  'Eleven (Stranger Things)', 'Jim Hopper (Stranger Things / David Harbour)', 'Joyce Byers (Winona Ryder / Stranger Things)',
  'Mike Wheeler (Stranger Things)', 'Dustin Henderson (Stranger Things / Gaten Matarazzo)',
  'Lucas Sinclair', 'Will Byers', 'Steve Harrington (Joe Keery / King Steve)',
  'Nancy Wheeler', 'Jonathan Byers', 'Robin Buckley (Maya Hawke)', 'Max Mayfield (Sadie Sink)',
  'Eddie Munson (Joseph Quinn / Master of Puppets)', 'Vecna (Henry Creel / 001)',
  'Homelander (The Boys)', 'Billy Butcher (The Boys)', 'Starlight (Annie January / The Boys)',
  'Hughie Campbell (Jack Quaid / The Boys)', 'A-Train (The Boys)', 'The Deep (Chace Crawford / The Boys)',
  'Black Noir', 'Queen Maeve (Dominique McElligott)', 'Soldier Boy (Jensen Ackles / The Boys)',
  'Noah Bennet', 'Erin Driscoll', 'Kim Bauer', 'Matt Parkman', 'Tony Almeida', 'Jack Bauer',
  'Kate Austen', 'Mr. Eko', 'James "Sawyer" Ford', 'Jin-Soo Kwon', 'D.L. Hawkins',
  'Bea Smith', 'Crazy Eyes', 'Franky Doyle', 'Front Man', 'Gregory House', 'Jax Teller',
  'Lorna Morello', 'Maxine Conway', 'Piper Chapman', 'Alex Vause', 'Daniel Holtz',
  'Jesse Stone', 'Saga Norén', 'Doktor', 'Justin Russo', 'Alex Russo', 'Bonnie Bennett',
  'Rachel Green (Jennifer Aniston / Friends)', 'Monica Geller (Courteney Cox / Friends)',
  'Phoebe Buffay (Lisa Kudrow / Smelly Cat)', 'Joey Tribbiani (Matt LeBlanc / How you doin\'?)',
  'Chandler Bing (Matthew Perry / Friends)', 'Ross Geller (David Schwimmer / We were on a break!)',
  'Tony Soprano (The Sopranos / James Gandolfini)', 'Carmela Soprano (Edie Falco)',
  'Christopher Moltisanti (Michael Imperioli)', 'Paulie Walnuts', 'Silvio Dante',
  'Ted Mosby (How I Met Your Mother / Josh Radnor)', 'Barney Stinson (Neil Patrick Harris / Legen-wait for it-dary!)',
  'Robin Scherbatsky (Cobie Smulders / Robin Sparkles)', 'Marshall Eriksen (Jason Segel)',
  'Lily Aldrin (Alyson Hannigan)', 'Tracy McConnell (The Mother)',
  'Michael Scott (The Office / Steve Carell / That\'s what she said)', 'Dwight Schrute (The Office / Rainn Wilson)',
  'Jim Halpert (The Office / John Krasinski)', 'Pam Beesly (The Office / Jenna Fischer)',
  'Ryan Howard (The Office)', 'Stanley Hudson (Pretzel Day)', 'Kevin Malone (The Office)',
  'Andy Bernard (Nard Dog)', 'Creed Bratton (The Office)',
  'Sheldon Cooper (The Big Bang Theory / Jim Parsons / Bazinga!)', 'Leonard Hofstadter (Johnny Galecki)',
  'Howard Wolowitz (Simon Helberg)', 'Rajesh Koothrappali (Kunal Nayyar)',
  'Amy Farrah Fowler (Mayim Bialik)', 'Bernadette Rostenkowski',
  'Geralt of Rivia (The Witcher / Henry Cavill)', 'Jaskier (Dandelion / Toss a Coin to Your Witcher)',
  'Laurent LeClaire', 'Puck',
])

const FICTIONAL_GLOBAL_FILM = new Set([
  'Vito Corleone (Baba / The Godfather)', 'Michael Corleone', 'Sonny Corleone', 'Tony Montana (Yaralı Yüz / Scarface)',
  'Harry Potter', 'Hermione Granger', 'Ron Weasley', 'Lord Voldemort', 'Albus Dumbledore',
  'Severus Snape', 'Sirius Black', 'Rubeus Hagrid', 'Draco Malfoy', 'Bellatrix Lestrange', 'Dobby (Ev Cini)',
  'Cedric Diggory', 'Neville Longbottom', 'Remus Lupin', 'Minerva McGonagall', 'Ginny Weasley',
  'Rufus Scrimgeour', 'Luna Lovegood', 'Dolores Umbridge',
  'Frodo Baggins', 'Samwise Gamgee', 'Legolas', 'Gimli', 'Boromir', 'Sauron', 'Saruman', 'Bilbo Baggins',
  'Gandalf', 'Gollum', 'Aragorn', 'Ağaçsakal', 'Altınyemiş', 'Arwen', 'Tom Bombadil', 'Cadı Kral',
  'Celebrimbor', 'Déagol', 'Denethor', 'Elrond', 'Éomer', 'Éowyn', 'Faramir', 'Galadriel', 'Gothmog',
  'Gríma Solucandil', 'Isildur', 'Meriadoc Brandybuck', 'Nazgûl', 'Peregrin Took', 'Shelob', 'Théoden', 'Haldir',
  'Luke Skywalker', 'Darth Vader (Anakin Skywalker)', 'Prenses Leia', 'Han Solo', 'Chewbacca',
  'Obi-Wan Kenobi', 'İmparator Palpatine', 'Darth Maul', 'Kylo Ren', 'Yoda', 'Mace Windu', 'Qui-Gon Jinn',
  'Will Turner', 'Elizabeth Swann', 'Kaptan Hector Barbossa', 'Hector Barbossa', 'Davy Jones',
  'Bootstrap Bill Turner', 'Carina Smyth', 'Joshamee Gibbs', 'Maymun Jack', 'Jack Sparrow', 'Çılgın Korsan Jack',
  'Sherlock Holmes', 'Dr. John Watson', 'Profesör James Moriarty', 'James Bond (007)',
  'Neo (Matrix / Thomas Anderson)', 'Morpheus (Matrix)', 'Trinity (Matrix)', 'Ajan Smith',
  'John Wick', 'Terminatör (T-800)', 'Sarah Connor', 'Forrest Gump', 'Indiana Jones',
  'Rocky Balboa', 'John Rambo', 'Hannibal Lecter', 'Tyler Durden (Dövüş Kulübü)',
  'Patrick Bateman (Amerikan Sapığı)', 'Jordan Belfort (Para Avcısı)',
  'Müfettiş Clouseau', 'İmhotep', 'Kharis', 'Hans Landa', 'Frank Martin',
  "Brian O'Conner", 'Keyser Söze', 'Conan', 'Candyman', 'Matt Cordell', 'Maurice', 'Palyaço Art',
  'Pinhead', 'Proximus Sezar', 'Sezar', 'Tall Man', 'Victor Crowley', 'Malcolm', 'Jack Twist',
  'Şahin Göz (Hawkeye / Clint Barton)', 'Kara Panter (Black Panther / T\'Challa / Chadwick Boseman)',
  'Kaptan Marvel (Carol Danvers)', 'Vision (Marvel)', 'Profesör X (Charles Xavier)', 'Magneto (Erik Lehnsherr)',
  'Star-Lord (Peter Quill / Galaksinin Koruyucuları)', 'Gamora', 'Drax the Destroyer',
  'Rocket Raccoon (Roket)', 'Groot (I am Groot)', 'Electro', 'Kraven the Hunter',
  'Bane (The Dark Knight Rises / Tom Hardy)', 'Penguen (The Penguin / Oswald Cobblepot)',
  'Bulmacacı (The Riddler / Edward Nygma)', 'İki Yüz (Two-Face / Harvey Dent)',
  'Catwoman (Kedi Kadın / Selina Kyle)', 'Alfred Pennyworth (Batman\'in Uşağı)',
  'Komiser James Gordon (Jim Gordon)',
  'Pennywise (O / It / Palyaço)', 'Freddy Krueger (Elm Sokağında Kabus)', 'Jason Voorhees (13. Cuma)',
  'Michael Myers (Cadılar Bayramı / Halloween)', 'Chucky (Katil Bebek Chucky)',
  'Testere (Jigsaw / John Kramer / Saw)', 'Ghostface (Çığlık / Scream)', 'Norman Bates (Sapık / Psycho)',
  'Jack Torrance (Cinnet / The Shining / Jack Nicholson)', 'Edward Scissorhands (Makas Eller / Johnny Depp)',
  'Willy Wonka (Charlie\'nin Çikolata Fabrikası)', 'Sweeney Todd (Johnny Depp)',
  'Mad Max (Max Rockatansky)', 'Furiosa (Mad Max)',
  'Katniss Everdeen (Açlık Oyunları / Jennifer Lawrence)', 'Peeta Mellark (Açlık Oyunları)',
  'Gale Hawthorne', 'Haymitch Abernathy (Woody Harrelson)',
  'Bella Swan (Alacakaranlık / Twilight)', 'Edward Cullen (Robert Pattinson / Alacakaranlık)', 'Jacob Black (Kurt Adam Jacob)',
  'Dom Toretto (Hızlı ve Öfkeli / Vin Diesel / Aile)', 'Letty Ortiz (Michelle Rodriguez)',
  'Luke Hobbs (Dwayne Johnson / The Rock)', 'Deckard Shaw (Jason Statham)',
  'Ethan Hunt (Görevimiz Tehlike / Tom Cruise)', 'Jason Bourne (Matt Damon)',
  'Barbie (Margot Robbie / Film)', 'Ken (Ryan Gosling / Barbie)',
  'Kaptan Blood', 'Sandokan',
])

const FICTIONAL_FEMALE = new Set([
  'Polly Gray (Peaky Blinders)', 'Daenerys Targaryen', 'Cersei Lannister', 'Arya Stark', 'Sansa Stark',
  'Hermione Granger', 'Bellatrix Lestrange', 'Prenses Leia', 'Elizabeth Swann', 'Trinity (Matrix)',
  'Sarah Connor', 'Tokyo (La Casa de Papel)', 'Wednesday Addams', 'Eleven (Stranger Things)',
  'Eyşan Tezcan', 'Bihter Ziyagil', 'Firdevs Yöreoğlu', 'Matmazel (Aşk-ı Memnu)', 'Şahika Koçarslanlı',
  'Juliet (Romeo ve Juliet)', 'Alice (Harikalar Diyarında)', 'Kupa Kraliçesi (Queen of Hearts)',
  'Kırmızı Başlıklı Kız', 'Pamuk Prenses', 'Külkedisi (Sindirella)', 'Rapunzel', 'Uyuyan Güzel',
  'Tinker Bell', 'Medusa (Yılan Saçlı)', 'Afrodit (Aşk Tanrıçası)', 'Athena (Bilgelik Tanrıçası)',
  'Freya', 'İsis', 'Şahmeran (Yılanların Şahı)',
  'Kara Dul (Black Widow / Natasha Romanoff)', 'Harley Quinn', 'Safinaz', 'Şirine', 'Heidi',
  'Fiona (Shrek)', 'Sailor Moon (Ay Savaşçısı)', 'Prenses Peach', 'Prenses Zelda', 'Lara Croft (Tomb Raider)',
  'Ciri (The Witcher)', 'Yennefer of Vengerberg', 'Ellie Williams (The Last of Us)',
  'Clarabelle Cow', 'Daisy Duck', 'Magica De Spell', 'Lola Bunny', 'Black Widow', 'Jane Foster',
  'Joan The Mouse', 'Mary Jane Watson', 'Melinda May', 'Morgan Stark', 'Mystique', 'Rogue', 'Storm',
  'Batgirl', 'Black Canary', 'Captain Marvel', 'Cassie Cage', 'Lana Lang', 'Lois Lane',
  'Wonder Woman', 'Zatanna', 'Zehirli Sarmaşık', 'Pırılkız', 'Amy Rose', 'Druuna',
  'Prenses Sally Acorn', 'Tavşan Cream', 'Irene Adler', 'Miss Marple', 'Saga Norén', 'Velma Dinkley',
  'Alex Russo', 'Arnemetia', 'Artemis', 'Artio', 'Aveta', 'Bloom', 'Bonnie Bennett', 'Brigid',
  'Demeter', 'Efsuncu Amora', 'Hebe', 'Hestia', 'Iðunn', 'Kar Kraliçesi', 'Katara', 'Kirke',
  'Minerva McGonagall', 'Morgan le Fay', 'Prenses Yasemin', 'Sif', 'Toph Beifong', 'Ginny Weasley',
  'Yarasa Rouge', 'Zia Raşit', 'Desdemona', 'Ramona Flowers', 'Roxane', 'Twilight Sparkle',
  'Altınay', 'Banu Çiçek', 'Huban Arığ', 'Kitiara Uth Matar', 'Lady Crysania', 'Laurana Kanan',
  'Meg McCaffrey', 'Mishakal', 'Takhisis', 'Tika Waylan', 'Vána', 'Şatarupa',
  'Luna Lovegood', 'Dolores Umbridge', 'Altınyemiş', 'Arwen', 'Éowyn', 'Galadriel',
  'Lydia Rodarte Quayle', 'Marie Schrader', 'Skyler White', 'Ada Wong', 'Erin Driscoll', 'Kim Bauer',
  'Kate Austen', 'Bea Smith', 'Crazy Eyes', 'Franky Doyle', 'Kim Wexler', 'Lorna Morello',
  'Maxine Conway', 'Mona Simpson', 'Nairobi', 'Painkiller Jane', 'Piper Chapman', 'Alex Vause',
  'Belit', 'Carina Smyth', 'Pippi Uzunçorap',
  'Sevim (Rafadan Tayfa)', 'Hale (Rafadan Tayfa)', 'Canan (Kral Şakir)', 'Kadriye (Kral Şakir)',
  'Şila (Pepee)', 'Bebee (Pepee)', 'Niloya', 'Balkız (Keloğlan)', 'Müge (Canım Kardeşim)',
  'Mine (Canım Kardeşim)', 'İbi (İbi ve Tosi)',
  'Jessie (Oyuncak Hikayesi)', 'Dory (Kayıp Balık Dory)', 'Elsa (Karlar Ülkesi / Frozen)', 'Anna (Frozen)',
  'Mulan', 'Pocahontas', 'Belle (Güzel ve Çirkin)', 'Ariel (Küçük Deniz Kızı)', 'Moana', 'Lilo Pelekai',
  'Malefiz (Maleficent)', 'Cruella de Vil (101 Dalmaçyalı)', 'Ursula (Küçük Deniz Kızı)',
  'Megara (Meg / Herkül)', 'Yzma', 'Joy (Neşe / Ters Yüz / Inside Out)', 'Sadness (Üzüntü / Inside Out)', 'Mama Coco',
  'Tsunade', 'Nami (One Piece)', 'Mikasa Ackerman', 'Misa Amane', 'Nezuko Kamado', 'Misty (Pokemon)',
  'Chihiro (Ruhların Kaçışı / Spirited Away)', 'Prenses Mononoke (San)',
  'Daphne Blake (Scooby-Doo)', 'Vilma Çakmaktaş (Wilma Flintstone)', 'Beti Moloztaş (Betty Rubble)',
  'Jane Jetson', 'She-Ra (Prenses Gücü)', "April O'Neil", "Chen (Cedric'in Aşkı)", 'Clara (Heidi)',
  'Gwen Tennyson (Ben 10)', 'Dee Dee (Dexter)', 'Muriel Bagge (Cesur Sahibi)',
  'Anais Watterson (Gumball)', 'Nicole Watterson (Anne / Gumball)', 'Prenses Ciklet (Princess Bubblegum)',
  'Marceline (Vampir Kraliçesi)', 'Candace Flynn', 'Mabel Pines (Esrarengiz Kasaba)', 'Wendy Corduroy',
  'Sandy Cheeks (Sincap Sandy)', 'Marge Simpson', 'Lisa Simpson', 'Maggie Simpson',
  'Lois Griffin', 'Meg Griffin', 'Summer Smith', 'Beth Smith', 'Princess Carolyn (BoJack Horseman)',
  'Diane Nguyen (BoJack)', 'Turanga Leela',
  'Ceylin Erguvan (Avukat Ceylin / Yargı)', 'Pembe Ünal (Kızılcık Şerbeti)', 'Doğa Korkmaz (Kızılcık Şerbeti)',
  'Alev Arslan (Kızılcık Şerbeti)', 'Kıvılcım Arslan (Kızılcık Şerbeti)', 'Nursema Ünal (Kızılcık Şerbeti)',
  'Seyran Şanlı (Yalı Çapkını)', 'İfakat Korhan', 'Mahidevran Sultan (Nur Fettahoğlu)',
  'Nihan Sezin (Kara Sevda)', 'Züleyha Altun (Bir Zamanlar Çukurova)', 'Hünkar Yaman (Vahide Perçin)',
  'Meryem (Kuvvetli Bir Alkış)', 'Peri (Bir Başkadır)', 'Ruhi (Bir Başkadır)',
  'Gülben Derenoğlu (Masumlar Apartmanı)', 'Safiye Derenoğlu (Ezgi Mola / Masumlar Apartmanı)',
  'İnci Özdemir (Farah Zeynep Abdullah)', 'Hayriye Hanım (Ağzımızın Tadı Kaçmasın)',
  'Ferhunde Güven (Deniz Çakır / Yaprak Dökümü)', 'Leyla Tekin (Gökçe Bahadır)', 'Necla Tekin (Fahriye Evcen)',
  'Fikret Tekin (Bennu Yıldırımlar)', 'Sedef (Seda Demir)', 'Sıla Gencer (Cansu Dere / Sıla)',
  'Cemile Akarsu (Ayça Bingöl)', 'Caroline (Wilma Elles / Öyle Bir Geçer Zaman ki)', 'Berrin Akarsu',
  'Aylin Akarsu (Farah Zeynep Abdullah)', 'Halime Hatun (Esra Bilgiç)', 'Bala Hatun (Özge Törer)',
  'Malhun Hatun (Yıldız Çağrı Atiksoy)', 'Sıti Ana (Vizontele / Demet Akbağ)', 'Keje (Eşkıya / Şermin Hürmeriç)',
  'Gülümser (Selvi Boylum Al Yazmalım / Türkan Şoray / Asya)', 'Tülay (Düğün Dernek)',
  'Kaptan Marvel (Carol Danvers)', 'Gamora', 'Catwoman (Kedi Kadın / Selina Kyle)',
  'Furiosa (Mad Max)', 'Katniss Everdeen (Açlık Oyunları / Jennifer Lawrence)', 'Bella Swan (Alacakaranlık / Twilight)',
  'Letty Ortiz (Michelle Rodriguez)', 'Barbie (Margot Robbie / Film)',
  'Rachel Green (Jennifer Aniston / Friends)', 'Monica Geller (Courteney Cox / Friends)',
  'Phoebe Buffay (Lisa Kudrow / Smelly Cat)', 'Carmela Soprano (Edie Falco)',
  'Robin Scherbatsky (Cobie Smulders / Robin Sparkles)', 'Lily Aldrin (Alyson Hannigan)',
  'Tracy McConnell (The Mother)', 'Pam Beesly (The Office / Jenna Fischer)',
  'Amy Farrah Fowler (Mayim Bialik)', 'Bernadette Rostenkowski',
  'Joyce Byers (Winona Ryder / Stranger Things)', 'Nancy Wheeler', 'Robin Buckley (Maya Hawke)',
  'Max Mayfield (Sadie Sink)', 'Müfettiş Raquel Murillo (Lizbon / Itziar Ituno)', 'Alicia Sierra (Najwa Nimri)',
  'Starlight (Annie January / The Boys)', 'Queen Maeve (Dominique McElligott)',
  'Rhaenyra Targaryen (Emma D\'Arcy / Milly Alcock)', 'Alicent Hightower (Olivia Cooke / Emily Carey)',
])

/** Genderless creatures, monsters, robots, AI, silent/non-anthropomorphic animals. */
const FICTIONAL_GENDERLESS = new Set([
  'Cheshire Kedisi', 'Moby Dick (Beyaz Balina)', 'Kötü Kalpli Kurt (Masal)',
  'Pikachu (Pokemon)', 'Charizard (Pokemon)', 'Mewtwo (Pokemon)',
  'Creeper (Minecraft)', 'Metal Sonic', 'E-123 Omega', 'F.R.I.D.A.Y.',
  'Robot 216', 'Wall-E', 'EVE (Wall-E)', 'Rosie (Robot Hizmetçi Rosie)', 'Bender',
  'Chao Cheese', 'Chao Chocola', 'Light Gaia', 'Tepegöz', 'Glaistig',
  'Nazgûl', 'Shelob', 'Smaug', 'Tospik (Niloya)', 'Mıncır (Canım Kardeşim)',
  'Totoro (Komşum Totoro / Studio Ghibli)', 'Kaonashi (Yüzsüz / No-Face)',
  'Dino (Çakmaktaşlar Köpeği)', 'Astro (Jetgiller Köpeği)', 'Rintintin (Rantanplan)',
  'Düldül (Jolly Jumper)', "Azman (Gargamel'in Kedisi)", 'Odie (Garfield Köpeği)',
  'Woodstock (Snoopy Kuşu)', "Pluto (Mickey'nin Köpeği)", 'Gary (SüngerBob Salyangozu)',
  'Bill Cipher (Üçgen İblis)', "Kurt (Tarkan'ın Kurdu)", 'Ahtapot (Tarkan Viking Kanı Dev Ahtapot)',
  'Maymun Jack', 'Mr. Meeseeks (Look at me!)', 'Bambi', 'Dumbo',
  'Scrat (Buz Devri)', 'Çak beşlik Hayalet (Hi-Five Ghost)', 'Bozkurt',
  'Ymir', 'Grendel', 'Groot (I am Groot)', 'Çirkin Ördek Yavrusu', 'Beyaz Tavşan', 'Dodo',
])

/** Live-action MCU/DC characters that also originate from superhero comics (`n: true`). */
const FICTIONAL_LIVE_COMIC_EXTRA = new Set([
  'Şahin Göz (Hawkeye / Clint Barton)', 'Kara Panter (Black Panther / T\'Challa / Chadwick Boseman)',
  'Kaptan Marvel (Carol Danvers)', 'Vision (Marvel)', 'Profesör X (Charles Xavier)', 'Magneto (Erik Lehnsherr)',
  'Star-Lord (Peter Quill / Galaksinin Koruyucuları)', 'Gamora', 'Drax the Destroyer',
  'Rocket Raccoon (Roket)', 'Groot (I am Groot)', 'Electro', 'Kraven the Hunter',
  'Bane (The Dark Knight Rises / Tom Hardy)', 'Penguen (The Penguin / Oswald Cobblepot)',
  'Bulmacacı (The Riddler / Edward Nygma)', 'İki Yüz (Two-Face / Harvey Dent)',
  'Catwoman (Kedi Kadın / Selina Kyle)', "Alfred Pennyworth (Batman'in Uşağı)",
  'Komiser James Gordon (Jim Gordon)',
])

/** Fictional characters with clear superpowers, magic, or supernatural traits. */
const FICTIONAL_SUPERPOWER = new Set([
  'Gece Kralı (Night King)',
  'Harry Potter', 'Hermione Granger', 'Ron Weasley', 'Lord Voldemort', 'Albus Dumbledore',
  'Severus Snape', 'Sirius Black', 'Rubeus Hagrid', 'Draco Malfoy', 'Bellatrix Lestrange',
  'Dobby (Ev Cini)', 'Luna Lovegood', 'Dolores Umbridge', 'Cedric Diggory', 'Neville Longbottom',
  'Remus Lupin', 'Minerva McGonagall', 'Ginny Weasley', 'Rufus Scrimgeour',
  'Gandalf', 'Sauron', 'Saruman', 'Galadriel', 'Elrond', 'Arwen', 'Tom Bombadil', 'Ağaçsakal',
  'Altınyemiş', 'Nazgûl', 'Cadı Kral', 'Celebrimbor', 'Gothmog', 'Shelob', 'Smaug',
  'Maedhros', 'Orodreth', 'Thingol', 'Vána',
  'Luke Skywalker', 'Darth Vader (Anakin Skywalker)', 'Prenses Leia', 'Obi-Wan Kenobi',
  'İmparator Palpatine', 'Darth Maul', 'Kylo Ren', 'Bebek Yoda (Grogu)', 'Yoda', 'Mace Windu', 'Qui-Gon Jinn',
  'Davy Jones', 'Neo (Matrix / Thomas Anderson)', 'Morpheus (Matrix)', 'Trinity (Matrix)', 'Ajan Smith',
  'Terminatör (T-800)', 'Eleven (Stranger Things)', 'Vecna (Henry Creel / 001)',
  'Homelander (The Boys)', 'Starlight (Annie January / The Boys)', 'A-Train (The Boys)',
  'The Deep (Chace Crawford / The Boys)', 'Queen Maeve (Dominique McElligott)',
  'Soldier Boy (Jensen Ackles / The Boys)', 'Black Noir',
  'Geralt of Rivia (The Witcher / Henry Cavill)', 'Ciri (The Witcher)', 'Yennefer of Vengerberg',
  'Arif Işık (G.O.R.A.)', 'Kont Drakula (Dracula)', "Frankenstein (Canavar)", "Frankenstein'ın canavarı",
  'Mefistofeles (Faust)', 'Dorian Gray', 'Cheshire Kedisi', 'Tinker Bell', 'Sihirli Lambanın Cini',
  'Poseidon (Denizler Tanrısı)', 'Hades (Yeraltı Tanrısı)', 'Herkül (Herakles)', 'Medusa (Yılan Saçlı)',
  'Afrodit (Aşk Tanrıçası)', 'Ares (Savaş Tanrısı)', 'Apollo (Güneş Tanrısı)', 'Athena (Bilgelik Tanrıçası)',
  'Freya', 'Anubis (Mısır Ölüm Tanrısı)', 'Ra (Güneş Tanrısı)', 'Osiris', 'İsis', 'Şahmeran (Yılanların Şahı)',
  'Kaptan Amerika (Steve Rogers)', 'Thanos', 'Venom', 'Demir Adam', 'Doktor Strange', 'Dormammu',
  'Deadpool', 'Hulk', 'Mystique', 'New Goblin', 'Nyx', 'Örümcek Adam', 'Para-Man', 'Rogue',
  'Savaş Makinesi', 'Skaar', 'Storm', 'Şahin', 'Thor', 'Ulik', 'Uzay Şövalyesi Rom', 'Wolverine', 'Ymir',
  'Luke Cage', 'Moon Knight', 'Karınca Adam', 'Wong', 'Blade', 'Daredevil', 'Darren Cross', 'Doktor Octopus',
  'Aquaman', 'Atom', 'Captain Marvel', 'Doomsday', 'Eobard Thawne', 'Flash', 'General Zod',
  'Green Lantern', 'Superman', 'Vartox', 'Wonder Woman', 'Zatanna', 'Zatara', 'Zehirli Sarmaşık',
  'Freakazoid!', 'Hellboy', 'Spawn', 'Pırılkız', 'Electro',
  'Şahin Göz (Hawkeye / Clint Barton)', 'Kara Panter (Black Panther / T\'Challa / Chadwick Boseman)',
  'Kaptan Marvel (Carol Danvers)', 'Vision (Marvel)', 'Profesör X (Charles Xavier)', 'Magneto (Erik Lehnsherr)',
  'Star-Lord (Peter Quill / Galaksinin Koruyucuları)', 'Gamora', 'Drax the Destroyer', 'Groot (I am Groot)',
  'Pikachu (Pokemon)', 'Charizard (Pokemon)', 'Mewtwo (Pokemon)',
  'Goku (Dragon Ball)', 'Vegeta (Dragon Ball)', 'Piccolo (Dragon Ball)',
  'Naruto Uzumaki', 'Sasuke Uchiha', 'Kakashi Hatake', 'Itachi Uchiha', 'Madara Uchiha',
  'Jiraiya (Naruto)', 'Tsunade', 'Orochimaru',
  'Monkey D. Luffy (One Piece)', 'Trafalgar Law', 'Portgas D. Ace',
  'Sailor Moon (Ay Savaşçısı)', 'Tuxedo Mask (Mamoru Chiba)',
  'Eren Yeager', 'Ryuk (Ölüm Meleği / Shinigami)', 'Hao Asakura',
  'Saitama (Kel Pelerinli / One Punch Man)', 'Genos (One Punch Man)',
  'Tanjiro Kamado (Demon Slayer)', 'Nezuko Kamado', 'Zenitsu Agatsuma', 'Inosuke Hashibira', 'Kyojuro Rengoku',
  'Satoru Gojo (Jujutsu Kaisen)', 'Yuji Itadori', 'Megumi Fushiguro', 'Ryomen Sukuna',
  'Edward Elric (Fullmetal Alchemist)', 'Alphonse Elric', 'Roy Mustang',
  'Totoro (Komşum Totoro / Studio Ghibli)', 'Haku (Spirited Away)', 'Kaonashi (Yüzsüz / No-Face)', 'Howl (Yürüyen Şato)',
  'Aang', 'Katara', 'Toph Beifong', 'Zuko', 'Bloom', 'Alex Russo', 'Bonnie Bennett',
  'Oburiks (Obelix)', 'Büyüfiks', 'Şirin Baba', 'Gargamel', 'Magica De Spell',
  'Bay İnanılmaz (Bob Parr)', 'Lastik Kız (Helen Parr / Elastigirl)', 'Elsa (Karlar Ülkesi / Frozen)',
  'Maui (Moana)', 'Mushu (Mulan Ejderhası)', 'Stitch (Lilo ve Stitch)',
  'Malefiz (Maleficent)', 'Ursula (Küçük Deniz Kızı)', 'Jafar (Aladdin)',
  'Ben 10', 'Gwen Tennyson (Ben 10)', 'Dört Kol (Ben 10)', 'Ateş Topu (Ben 10)',
  'Şimşek Hız (Ben 10)', 'Elmas Kafa (Ben 10)', 'Vilgax (Ben 10 Düşmanı)',
  'Aku (Samurai Jack Düşmanı)', 'Mojo Jojo (Powerpuff Girls Düşmanı)',
  'Buz Kralı (Ice King / Simon Petrikov)', 'Prenses Ciklet (Princess Bubblegum)', 'Marceline (Vampir Kraliçesi)',
  'Skips (Ölümsüz Goril)', 'Çak beşlik Hayalet (Hi-Five Ghost)', 'Bill Cipher (Üçgen İblis)',
  'Casper (Sevimli Hayalet)', 'He-Man (Gölgelerin Gücü Adına)', 'İskeletor (Skeletor / He-Man)', 'She-Ra (Prenses Gücü)',
  'Optimus Prime', 'Sonic (Kirpi Sonic)', 'Metal Sonic', 'Kirpi Nazo', 'Kirpi Silver', 'Ekidne Knuckles',
  'Miles "Tails" Prower', 'Light Gaia', 'Super Mario', 'Luigi', 'Bowser', 'Link (Zelda)', 'Prenses Zelda', 'Ganon',
  'Kratos (God of War)', 'Scorpion (Mortal Kombat)', 'Sub-Zero (Mortal Kombat)', 'Shang Tsung', 'Ryu (Street Fighter)',
  'Jin Kazama', 'Master Chief (Halo)', 'Doom Slayer (Doom)', 'Creeper (Minecraft)',
  'Freddy Krueger (Elm Sokağında Kabus)', 'Jason Voorhees (13. Cuma)', 'Chucky (Katil Bebek Chucky)',
  'Pennywise (O / It / Palyaço)', 'Pinhead', 'Candyman', 'Tall Man', 'Victor Crowley',
  'Edward Cullen (Robert Pattinson / Alacakaranlık)', 'Jacob Black (Kurt Adam Jacob)', 'İmhotep', 'Kharis',
  'Arnemetia', 'Artemis', 'Artio', 'Avcı Herne', 'Aveta', 'Balder', 'Brigid', 'Búri', 'Dagda', 'Dellingr',
  'Demeter', 'Demirci Völund', 'Eragon', 'Glaistig', 'Hebe', 'Heimdallr', 'Hermes', 'Hermóðr', 'Hestia',
  'Iðunn', 'Kar Kraliçesi', 'Kirke', 'Kutsanmış Bran', 'Ler', 'Llyr', 'Lóðurr', 'Loki', 'Lugh', 'Meili',
  'Merlin', 'Morgan le Fay', 'Nuada', 'Odin', 'Óðr', 'Ogmios', 'Segomo', 'Sif', 'Taranis', 'Tutatis',
  'Utgard Loki', 'Väinämöinen', 'Zia Raşit', 'Carter Kane', 'Percy Jackson', 'Leo Valdez', 'Magnus Chase',
  'Chemosh', 'Chibiabos', 'Dalamar', 'Fistandantilus', 'Gilean', 'Habbakuk', 'Hanuman', 'Hiddukel',
  'Ilmarinen', 'İlmarinen', 'Kiri-Jolith', 'Majere', 'Raistlin Majere', 'Mishakal', 'Paladine',
  'Reorx', 'Takhisis', 'Tepegöz', 'Noah Bennet', 'Matt Parkman', 'D.L. Hawkins', 'Mr. Meeseeks (Look at me!)',
  'Doktor',
])

const FICTIONAL_SPOKEN_EXCEPTIONS_TURKISH_TV = new Set([
  'Aliço (Çukur)',
])

function deriveFictionalType(name) {
  if (FICTIONAL_TOON_TR.has(name)) return 'tr_toon'
  if (FICTIONAL_TV_TR.has(name) || FICTIONAL_SPOKEN_EXCEPTIONS_TURKISH_TV.has(name)) return 'tr_tv'
  if (FICTIONAL_FILM_TR.has(name)) return 'tr_film'
  if (FICTIONAL_ANIME.has(name)) return 'anime'
  if (FICTIONAL_GAMES.has(name)) return 'game'
  if (FICTIONAL_CARTOONS.has(name)) return 'cartoon'
  if (FICTIONAL_GLOBAL_TV.has(name)) return 'global_tv'
  if (FICTIONAL_GLOBAL_FILM.has(name)) return 'global_film'
  return 'book_myth'
}

function buildAttributes() {
  const dataTs = fs.readFileSync(DATA_PATH, 'utf8')
  const attrTs = fs.readFileSync(ATTR_PATH, 'utf8')
  const entities = JSON.parse(fs.readFileSync(ENTITIES_PATH, 'utf8'))
  const labels = JSON.parse(fs.readFileSync(LABELS_PATH, 'utf8'))

  const s0 = dataTs.indexOf('[', dataTs.indexOf('export const FAMOUS_PEOPLE_SEED'))
  const seed = Function(`"use strict"; return (${dataTs.slice(s0, dataTs.indexOf('\n]', s0) + 2)})`)()

  const a0 = attrTs.indexOf('{', attrTs.indexOf('export const FAMOUS_PEOPLE_ATTRIBUTES'))
  const prevAttrs = Function(`"use strict"; return (${attrTs.slice(a0, attrTs.lastIndexOf('}') + 1)})`)()

  const result = {}
  const unmatchedBookMyth = []

  for (const person of seed) {
    const prev = prevAttrs[person.name] || null

    if (FICTIONAL_CATEGORIES.has(person.category)) {
      const ft = deriveFictionalType(person.name)
      const g = FICTIONAL_GENDERLESS.has(person.name)
        ? 'none'
        : FICTIONAL_FEMALE.has(person.name)
          ? 'f'
          : 'm'
      const t = ft === 'tr_tv' || ft === 'tr_film' || ft === 'tr_toon' || FICTIONAL_TR_BOOKS_FOLK.has(person.name)
      const n = ft === 'tr_toon' || ft === 'anime' || ft === 'cartoon' || FICTIONAL_LIVE_COMIC_EXTRA.has(person.name)
      const s = FICTIONAL_SUPERPOWER.has(person.name)

      if (ft === 'book_myth' && person.category === 'dizi_film_karakterleri') {
        unmatchedBookMyth.push(person.name)
      }

      // Clear collided city/person QIDs for fictional characters unless genuinely distinct
      const cleanQ = prev?.q && !['Q1757', 'Q585', 'Q2841', 'Q72', 'Q1046049', 'Q192179', 'Q57458'].includes(prev.q)
        ? prev.q
        : null

      result[person.name] = {
        r: false,
        g,
        a: false,
        t,
        y: null,
        d: null,
        o: [],
        n,
        s,
        rg: 'fic',
        sp: null,
        ft,
        q: cleanQ,
      }
      continue
    }

    // Real person
    const ov = REAL_OVERRIDES[person.name] || {}
    const q = ov.q !== undefined ? ov.q : (prev?.q ?? null)
    const ent = q ? entities[q] : null
    const cits = ent?.citizenship || []
    const occLabels = (ent?.occupations || []).map((qid) => labels[qid] || qid)

    let g = ov.g ?? prev?.g ?? null
    if (!g && ent?.sex?.length) {
      if (ent.sex.includes('Q6581072')) g = 'f'
      else if (ent.sex.includes('Q6581097')) g = 'm'
    }
    if (!g) throw new Error(`Missing gender for real person: ${person.name}`)

    const y = ov.y !== undefined ? ov.y : (prev?.y ?? ent?.born ?? null)
    if (y === null) throw new Error(`Missing birth year for real person: ${person.name}`)

    const d = ov.d !== undefined ? ov.d : (prev?.d ?? ent?.died ?? null)
    const a = ov.a !== undefined
      ? ov.a
      : (d !== null || y < 1920 ? false : (prev?.a ?? true))

    const t = ov.t !== undefined
      ? ov.t
      : (cits.some((c) => COUNTRY_TO_REGION[c] === 'tr') ? true : (prev?.t ?? false))

    const rg = ov.rg ?? inferRegion(person.name, t, cits)

    let o = ov.o ? [...ov.o] : [...(prev?.o || [])]
    if (o.length === 0) {
      o = inferDomainsFromOccupations(occLabels, person.category)
    }
    if (o.length === 0) {
      o = [DOMAIN_FALLBACK_BY_CAT[person.category] || 'media']
    }

    const sp = ov.sp !== undefined ? ov.sp : inferSportBranch(person.name, o, occLabels, person.category)
    const s = sp !== null || o.includes('sport') || person.category === 'sporcular'

    result[person.name] = {
      r: true,
      g,
      a,
      t,
      y,
      d,
      o,
      n: false,
      s,
      rg,
      sp,
      ft: null,
      q,
    }
  }

  return { seed, result, unmatchedBookMyth }
}

function validateAndReport(seed, attrs, unmatchedBookMyth) {
  if (unmatchedBookMyth.length > 0) {
    console.warn('WARN: dizi_film_karakterleri classified as book_myth:', unmatchedBookMyth)
  }

  const stats = {
    total: seed.length,
    g: {},
    rg: {},
    sp: {},
    ft: {},
    realCount: 0,
    ficCount: 0,
    ficSuperpowerTrue: 0,
    ficNoneGender: 0,
  }

  for (const p of seed) {
    const a = attrs[p.name]
    if (!a) throw new Error(`Missing output entry: ${p.name}`)
    if (typeof a.r !== 'boolean' || typeof a.a !== 'boolean' || typeof a.t !== 'boolean' || typeof a.n !== 'boolean' || typeof a.s !== 'boolean') {
      throw new Error(`Non-boolean core flag on ${p.name}: ${JSON.stringify(a)}`)
    }
    if (!['m', 'f', 'none'].includes(a.g)) throw new Error(`Invalid gender on ${p.name}: ${a.g}`)
    if (!['tr', 'eu', 'na', 'la', 'as', 'me', 'af', 'oc', 'fic'].includes(a.rg)) throw new Error(`Invalid rg on ${p.name}: ${a.rg}`)

    if (a.r) {
      stats.realCount++
      if (a.y === null || !Number.isInteger(a.y)) throw new Error(`Missing integer y on real person ${p.name}`)
      if (a.d !== null && a.y > a.d) throw new Error(`y > d on ${p.name}: ${a.y} > ${a.d}`)
      if (a.o.length === 0) throw new Error(`Empty o[] on real person ${p.name}`)
      if (a.rg === 'fic') throw new Error(`Real person has rg='fic': ${p.name}`)
      if (a.ft !== null) throw new Error(`Real person has non-null ft: ${p.name}`)
      if (p.category === 'sporcular' && !a.sp) throw new Error(`Sporcu missing sp: ${p.name}`)
    } else {
      stats.ficCount++
      if (!a.ft) throw new Error(`Fictional missing ft: ${p.name}`)
      if (a.rg !== 'fic') throw new Error(`Fictional must have rg='fic': ${p.name}`)
      if (a.sp !== null) throw new Error(`Fictional must have sp=null: ${p.name}`)
      if (a.s) stats.ficSuperpowerTrue++
      if (a.g === 'none') stats.ficNoneGender++
    }

    stats.g[a.g] = (stats.g[a.g] || 0) + 1
    stats.rg[a.rg] = (stats.rg[a.rg] || 0) + 1
    if (a.sp) stats.sp[a.sp] = (stats.sp[a.sp] || 0) + 1
    if (a.ft) stats.ft[a.ft] = (stats.ft[a.ft] || 0) + 1
  }

  console.log('Zero-null attribute build stats:', JSON.stringify(stats, null, 2))
}

function writeAttributesTs(seed, attrs) {
  const header = `// Auto-generated by scripts/build-zero-null-attributes.mjs — do not edit by hand.
// Wikidata structured attributes for FAMOUS_PEOPLE_SEED (100% seed coverage, zero nulls on bank questions).

export type PersonDomain =
  | 'acting'
  | 'art'
  | 'business'
  | 'film'
  | 'literature'
  | 'media'
  | 'music'
  | 'politics'
  | 'science'
  | 'sport'

export type PersonGender = 'm' | 'f' | 'none'

export type PersonRegion =
  | 'tr'
  | 'eu'
  | 'na'
  | 'la'
  | 'as'
  | 'me'
  | 'af'
  | 'oc'
  | 'fic'

export type SportBranch = 'fb' | 'bk' | 'vb' | 'cm' | 'ind'

export type FictionalWorkType =
  | 'tr_tv'
  | 'tr_film'
  | 'tr_toon'
  | 'global_tv'
  | 'global_film'
  | 'anime'
  | 'cartoon'
  | 'game'
  | 'book_myth'

export interface PersonAttributes {
  /** true = gerçek kişi, false = kurgusal karakter */
  r: boolean
  /** 'm' = erkek, 'f' = kadın, 'none' = cinsiyetsiz kurgusal varlık veya non-binary kişi */
  g: PersonGender
  /** true = hayatta (kurgusal karakterlerde false) */
  a: boolean
  /** true = Türkiye bağlantılı (vatandaş / Osmanlı-Selçuklu / yerli yapım veya eser) */
  t: boolean
  /** Doğum yılı (kurgusal karakterlerde null; MÖ yıllar negatif) */
  y: number | null
  /** Vefat yılı (hayatta olanlar ve kurgusal karakterler için null) */
  d: number | null
  /** Bilinen meslek/alan etiketleri */
  o: PersonDomain[]
  /** Çizgi film, anime, animasyon veya çizgi roman karakteri */
  n: boolean
  /** Spor bağlantılı (gerçek) veya süper güç/fantastik yetenek sahibi (kurgusal) */
  s: boolean
  /** Coğrafi bölge / köken grubu ('fic' = kurgusal) */
  rg: PersonRegion
  /** Ana spor dalı (yalnızca sporcular/ilgili dallar, diğerlerinde null) */
  sp: SportBranch | null
  /** Kurgusal evren / mecra sınıfı (yalnızca kurgusal karakterler, diğerlerinde null) */
  ft: FictionalWorkType | null
  /** Wikidata QID */
  q: string | null
}

export const FAMOUS_PEOPLE_ATTRIBUTES: Record<string, PersonAttributes> = {
`

  const lines = seed.map((p) => `  ${JSON.stringify(p.name)}: ${JSON.stringify(attrs[p.name])},`)
  const content = `${header}${lines.join('\n')}\n}\n`
  fs.writeFileSync(ATTR_PATH, content, 'utf8')
  console.log(`Wrote ${seed.length} attribute records to ${path.relative(REPO_ROOT, ATTR_PATH)}`)
}

const { seed, result, unmatchedBookMyth } = buildAttributes()
validateAndReport(seed, result, unmatchedBookMyth)
writeAttributesTs(seed, result)

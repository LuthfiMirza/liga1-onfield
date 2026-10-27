// src/data/liga1Data.ts
// Data terpusat BRI Super League (I.League) Indonesia

export interface Club {
  id: string;
  name: string;
  shortName: string;
  code: string;
  city: string;
  stadium: string;
  stadiumCapacity: number;
  foundedYear: number;
  primaryColor: string;
  accentColor: string;
  coach: string;
  currentRank: number;
  badgeText: string;
}

export interface StandingsRow {
  rank: number;
  clubId: string;
  clubName: string;
  code: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: ('W' | 'D' | 'L')[];
}

export interface MatchFixture {
  id: string;
  matchday: number;
  date: string;
  dayName: string;
  time: string; // WIB
  homeClub: {
    id: string;
    name: string;
    code: string;
    primaryColor: string;
  };
  awayClub: {
    id: string;
    name: string;
    code: string;
    primaryColor: string;
  };
  stadium: string;
  city: string;
  broadcast: string;
  isBigMatch?: boolean;
}

export interface PlayerStat {
  id: string;
  rank: number;
  category: 'scorer' | 'assist' | 'saves' | 'passes';
  playerName: string;
  position: string;
  clubName: string;
  clubCode: string;
  clubColor: string;
  value: number;
  unit: string;
  detail: string;
  seasonStats: {
    matches: number;
    minutes: number;
    efficiency: string;
  };
}

export interface SeasonAttendanceRecord {
  season: string;
  totalSpectators: number;
  avgPerMatch: number;
  highestMatch: string;
  topVenue: string;
  status: 'completed' | 'ongoing';
  note: string;
}

export interface NewsItem {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  venue: string;
  matchHighlight?: string;
  accentColor: string;
}

export interface Partner {
  id: string;
  name: string;
  category: 'Title Sponsor' | 'Official Broadcaster' | 'Official Partner' | 'Ball & Equipment';
  label: string;
  isMain?: boolean;
}

// 1. Data 18 Klub Peserta
export const CLUBS_DATA: Club[] = [
  {
    id: "persib",
    name: "Persib Bandung",
    shortName: "Persib",
    code: "PERSIB",
    city: "Bandung, Jawa Barat",
    stadium: "Gelora Bandung Lautan Api",
    stadiumCapacity: 38000,
    foundedYear: 1933,
    primaryColor: "#004B93",
    accentColor: "#D4FF00",
    coach: "Bojan Hodak",
    currentRank: 1,
    badgeText: "PSB",
  },
  {
    id: "borneo",
    name: "Borneo FC Samarinda",
    shortName: "Borneo FC",
    code: "BORNEO",
    city: "Samarinda, Kalimantan Timur",
    stadium: "Stadion Segiri",
    stadiumCapacity: 16000,
    foundedYear: 2014,
    primaryColor: "#E05A1F",
    accentColor: "#F4F4F6",
    coach: "Pieter Huistra",
    currentRank: 2,
    badgeText: "BFC",
  },
  {
    id: "persebaya",
    name: "Persebaya Surabaya",
    shortName: "Persebaya",
    code: "PERSEBAYA",
    city: "Surabaya, Jawa Timur",
    stadium: "Gelora Bung Tomo",
    stadiumCapacity: 46806,
    foundedYear: 1927,
    primaryColor: "#007A33",
    accentColor: "#D4FF00",
    coach: "Paul Munster",
    currentRank: 3,
    badgeText: "SBY",
  },
  {
    id: "bali-utd",
    name: "Bali United FC",
    shortName: "Bali United",
    code: "BALI",
    city: "Gianyar, Bali",
    stadium: "Kapten I Wayan Dipta",
    stadiumCapacity: 18000,
    foundedYear: 1989,
    primaryColor: "#BA0C2F",
    accentColor: "#F4F4F6",
    coach: "Stefano Cugurra",
    currentRank: 4,
    badgeText: "BLI",
  },
  {
    id: "persija",
    name: "Persija Jakarta",
    shortName: "Persija",
    code: "PERSIJA",
    city: "Jakarta",
    stadium: "Jakarta International Stadium",
    stadiumCapacity: 82000,
    foundedYear: 1928,
    primaryColor: "#E42313",
    accentColor: "#F58220",
    coach: "Carlos Pena",
    currentRank: 5,
    badgeText: "PSJ",
  },
  {
    id: "psm",
    name: "PSM Makassar",
    shortName: "PSM",
    code: "PSM",
    city: "Makassar, Sulawesi Selatan",
    stadium: "Gelora B.J. Habibie",
    stadiumCapacity: 20000,
    foundedYear: 1915,
    primaryColor: "#860012",
    accentColor: "#D4FF00",
    coach: "Bernardo Tavares",
    currentRank: 6,
    badgeText: "MKS",
  },
  {
    id: "arema",
    name: "Arema FC",
    shortName: "Arema",
    code: "AREMA",
    city: "Malang, Jawa Timur",
    stadium: "Kanjuruhan Stadium",
    stadiumCapacity: 30000,
    foundedYear: 1987,
    primaryColor: "#002B7F",
    accentColor: "#E05A1F",
    coach: "Joel Cornelli",
    currentRank: 7,
    badgeText: "ARM",
  },
  {
    id: "persik",
    name: "Persik Kediri",
    shortName: "Persik",
    code: "PERSIK",
    city: "Kediri, Jawa Timur",
    stadium: "Brawijaya Stadium",
    stadiumCapacity: 20000,
    foundedYear: 1950,
    primaryColor: "#592D86",
    accentColor: "#D4FF00",
    coach: "Marcelo Rospide",
    currentRank: 8,
    badgeText: "KDR",
  },
  {
    id: "dewa-utd",
    name: "Dewa United FC",
    shortName: "Dewa United",
    code: "DEWA",
    city: "Tangerang Selatan, Banten",
    stadium: "Indomilk Arena",
    stadiumCapacity: 15000,
    foundedYear: 2021,
    primaryColor: "#D4AF37",
    accentColor: "#131318",
    coach: "Jan Olde Riekerink",
    currentRank: 9,
    badgeText: "DEW",
  },
  {
    id: "malut-utd",
    name: "Malut United FC",
    shortName: "Malut United",
    code: "MALUT",
    city: "Ternate, Maluku Utara",
    stadium: "Gelora Kie Raha",
    stadiumCapacity: 15000,
    foundedYear: 2023,
    primaryColor: "#A30D11",
    accentColor: "#00529C",
    coach: "Imran Nahumarury",
    currentRank: 10,
    badgeText: "MLT",
  },
  {
    id: "psbs",
    name: "PSBS Biak",
    shortName: "PSBS",
    code: "PSBS",
    city: "Biak Numfor, Papua",
    stadium: "Cendrawasih Stadium",
    stadiumCapacity: 15000,
    foundedYear: 1968,
    primaryColor: "#005EA6",
    accentColor: "#F4F4F6",
    coach: "Emral Abus",
    currentRank: 11,
    badgeText: "BIK",
  },
  {
    id: "semen-padang",
    name: "Semen Padang FC",
    shortName: "Semen Padang",
    code: "SEMEN PADANG",
    city: "Padang, Sumatera Barat",
    stadium: "Gelora Haji Agus Salim",
    stadiumCapacity: 28000,
    foundedYear: 1980,
    primaryColor: "#C8102E",
    accentColor: "#EAA728",
    coach: "Eduardo Almeida",
    currentRank: 12,
    badgeText: "SP",
  },
  {
    id: "barito",
    name: "PS Barito Putera",
    shortName: "Barito Putera",
    code: "BARITO",
    city: "Banjarmasin, Kalimantan Selatan",
    stadium: "Demang Lehman",
    stadiumCapacity: 15000,
    foundedYear: 1988,
    primaryColor: "#FED100",
    accentColor: "#004B93",
    coach: "Rahmad Darmawan",
    currentRank: 13,
    badgeText: "BRT",
  },
  {
    id: "persita",
    name: "Persita Tangerang",
    shortName: "Persita",
    code: "PERSITA",
    city: "Tangerang, Banten",
    stadium: "Indomilk Arena",
    stadiumCapacity: 15000,
    foundedYear: 1953,
    primaryColor: "#4B286D",
    accentColor: "#D4FF00",
    coach: "Fabio Lefundes",
    currentRank: 14,
    badgeText: "PST",
  },
  {
    id: "pss",
    name: "PSS Sleman",
    shortName: "PSS",
    code: "PSS",
    city: "Sleman, D.I. Yogyakarta",
    stadium: "Maguwoharjo Stadium",
    stadiumCapacity: 31700,
    foundedYear: 1976,
    primaryColor: "#005E2B",
    accentColor: "#F4F4F6",
    coach: "Mazola Junior",
    currentRank: 15,
    badgeText: "SLM",
  },
  {
    id: "madura-utd",
    name: "Madura United FC",
    shortName: "Madura United",
    code: "MADURA",
    city: "Pamekasan, Madura",
    stadium: "Gelora Ratu Pamelingan",
    stadiumCapacity: 15000,
    foundedYear: 2016,
    primaryColor: "#9E1B32",
    accentColor: "#D4FF00",
    coach: "Paulo Menezes",
    currentRank: 16,
    badgeText: "MDR",
  },
  {
    id: "persis",
    name: "Persis Solo",
    shortName: "Persis",
    code: "PERSIS",
    city: "Surakarta, Jawa Tengah",
    stadium: "Manahan Stadium",
    stadiumCapacity: 20000,
    foundedYear: 1923,
    primaryColor: "#D21034",
    accentColor: "#F4F4F6",
    coach: "Hanaing",
    currentRank: 17,
    badgeText: "SOL",
  },
  {
    id: "psis",
    name: "PSIS Semarang",
    shortName: "PSIS",
    code: "PSIS",
    city: "Semarang, Jawa Tengah",
    stadium: "Jatidiri Stadium",
    stadiumCapacity: 25000,
    foundedYear: 1932,
    primaryColor: "#0047AB",
    accentColor: "#D4FF00",
    coach: "Gilbert Agius",
    currentRank: 18,
    badgeText: "SMG",
  },
];

// 2. Klasemen Sementara (Jelang Pekan 7)
export const STANDINGS_DATA: StandingsRow[] = [
  { rank: 1, clubId: "persib", clubName: "Persib Bandung", code: "PERSIB", played: 6, won: 4, drawn: 2, lost: 0, goalsFor: 14, goalsAgainst: 5, goalDifference: 9, points: 14, form: ['W', 'D', 'W', 'W', 'D'] },
  { rank: 2, clubId: "borneo", clubName: "Borneo FC", code: "BORNEO", played: 6, won: 4, drawn: 2, lost: 0, goalsFor: 10, goalsAgainst: 3, goalDifference: 7, points: 14, form: ['W', 'W', 'W', 'D', 'D'] },
  { rank: 3, clubId: "persebaya", clubName: "Persebaya Surabaya", code: "PERSEBAYA", played: 6, won: 4, drawn: 1, lost: 1, goalsFor: 9, goalsAgainst: 4, goalDifference: 5, points: 13, form: ['W', 'W', 'W', 'W', 'D'] },
  { rank: 4, clubId: "bali-utd", clubName: "Bali United FC", code: "BALI", played: 6, won: 3, drawn: 2, lost: 1, goalsFor: 12, goalsAgainst: 6, goalDifference: 6, points: 11, form: ['W', 'D', 'W', 'L', 'D'] },
  { rank: 5, clubId: "persija", clubName: "Persija Jakarta", code: "PERSIJA", played: 6, won: 3, drawn: 2, lost: 1, goalsFor: 10, goalsAgainst: 6, goalDifference: 4, points: 11, form: ['W', 'D', 'L', 'D', 'W'] },
  { rank: 6, clubId: "psm", clubName: "PSM Makassar", code: "PSM", played: 6, won: 3, drawn: 2, lost: 1, goalsFor: 9, goalsAgainst: 5, goalDifference: 4, points: 11, form: ['D', 'D', 'L', 'W', 'W'] },
  { rank: 7, clubId: "arema", clubName: "Arema FC", code: "AREMA", played: 6, won: 2, drawn: 3, lost: 1, goalsFor: 7, goalsAgainst: 5, goalDifference: 2, points: 9, form: ['D', 'W', 'D', 'L', 'W'] },
  { rank: 8, clubId: "persik", clubName: "Persik Kediri", code: "PERSIK", played: 6, won: 2, drawn: 3, lost: 1, goalsFor: 8, goalsAgainst: 7, goalDifference: 1, points: 9, form: ['W', 'D', 'D', 'W', 'L'] },
  { rank: 9, clubId: "dewa-utd", clubName: "Dewa United FC", code: "DEWA", played: 6, won: 2, drawn: 2, lost: 2, goalsFor: 11, goalsAgainst: 10, goalDifference: 1, points: 8, form: ['D', 'W', 'L', 'D', 'W'] },
  { rank: 10, clubId: "malut-utd", clubName: "Malut United FC", code: "MALUT", played: 6, won: 2, drawn: 2, lost: 2, goalsFor: 7, goalsAgainst: 8, goalDifference: -1, points: 8, form: ['D', 'D', 'W', 'L', 'W'] },
  { rank: 11, clubId: "psbs", clubName: "PSBS Biak", code: "PSBS", played: 6, won: 2, drawn: 1, lost: 3, goalsFor: 8, goalsAgainst: 11, goalDifference: -3, points: 7, form: ['L', 'L', 'L', 'W', 'W'] },
  { rank: 12, clubId: "semen-padang", clubName: "Semen Padang FC", code: "SEMEN PADANG", played: 6, won: 2, drawn: 0, lost: 4, goalsFor: 5, goalsAgainst: 10, goalDifference: -5, points: 6, form: ['L', 'W', 'L', 'L', 'L'] },
  { rank: 13, clubId: "barito", clubName: "Barito Putera", code: "BARITO", played: 6, won: 1, drawn: 2, lost: 3, goalsFor: 6, goalsAgainst: 10, goalDifference: -4, points: 5, form: ['L', 'W', 'D', 'L', 'L'] },
  { rank: 14, clubId: "persita", clubName: "Persita Tangerang", code: "PERSITA", played: 6, won: 1, drawn: 2, lost: 3, goalsFor: 3, goalsAgainst: 6, goalDifference: -3, points: 5, form: ['W', 'D', 'L', 'L', 'D'] },
  { rank: 15, clubId: "pss", clubName: "PSS Sleman", code: "PSS", played: 6, won: 1, drawn: 2, lost: 3, goalsFor: 5, goalsAgainst: 8, goalDifference: -3, points: 5, form: ['L', 'L', 'L', 'D', 'W'] },
  { rank: 16, clubId: "madura-utd", clubName: "Madura United", code: "MADURA", played: 6, won: 0, drawn: 3, lost: 3, goalsFor: 4, goalsAgainst: 10, goalDifference: -6, points: 3, form: ['L', 'D', 'L', 'L', 'D'] },
  { rank: 17, clubId: "persis", clubName: "Persis Solo", code: "PERSIS", played: 6, won: 1, drawn: 0, lost: 5, goalsFor: 5, goalsAgainst: 12, goalDifference: -7, points: 3, form: ['L', 'L', 'L', 'W', 'L'] },
  { rank: 18, clubId: "psis", clubName: "PSIS Semarang", code: "PSIS", played: 6, won: 0, drawn: 2, lost: 4, goalsFor: 3, goalsAgainst: 10, goalDifference: -7, points: 2, form: ['L', 'L', 'D', 'L', 'L'] },
];

// 3. Jadwal Lengkap Pekan 7 (Dengan Jam WIB, TV Broadcaster, & Venue)
export const FIXTURES_WEEK_7: MatchFixture[] = [
  {
    id: "f7-1",
    matchday: 7,
    date: "2026-10-30",
    dayName: "Jumat, 30 Okt 2026",
    time: "15:30 WIB",
    homeClub: { id: "semen-padang", name: "Semen Padang", code: "SEMEN PADANG", primaryColor: "#C8102E" },
    awayClub: { id: "dewa-utd", name: "Dewa United", code: "DEWA", primaryColor: "#D4AF37" },
    stadium: "Stadion Gelora Haji Agus Salim",
    city: "Padang",
    broadcast: "Indosiar & Vidio",
  },
  {
    id: "f7-2",
    matchday: 7,
    date: "2026-10-30",
    dayName: "Jumat, 30 Okt 2026",
    time: "19:00 WIB",
    homeClub: { id: "borneo", name: "Borneo FC", code: "BORNEO", primaryColor: "#E05A1F" },
    awayClub: { id: "psbs", name: "PSBS Biak", code: "PSBS", primaryColor: "#005EA6" },
    stadium: "Stadion Segiri",
    city: "Samarinda",
    broadcast: "Indosiar & Vidio",
    isBigMatch: true,
  },
  {
    id: "f7-3",
    matchday: 7,
    date: "2026-10-31",
    dayName: "Sabtu, 31 Okt 2026",
    time: "15:30 WIB",
    homeClub: { id: "malut-utd", name: "Malut United", code: "MALUT", primaryColor: "#A30D11" },
    awayClub: { id: "barito", name: "Barito Putera", code: "BARITO", primaryColor: "#FED100" },
    stadium: "Stadion Gelora Kie Raha",
    city: "Ternate",
    broadcast: "Vidio",
  },
  {
    id: "f7-4",
    matchday: 7,
    date: "2026-10-31",
    dayName: "Sabtu, 31 Okt 2026",
    time: "19:00 WIB",
    homeClub: { id: "persib", name: "Persib Bandung", code: "PERSIB", primaryColor: "#004B93" },
    awayClub: { id: "persik", name: "Persik Kediri", code: "PERSIK", primaryColor: "#592D86" },
    stadium: "Gelora Bandung Lautan Api",
    city: "Bandung",
    broadcast: "Indosiar & Vidio",
    isBigMatch: true,
  },
  {
    id: "f7-5",
    matchday: 7,
    date: "2026-11-01",
    dayName: "Minggu, 01 Nov 2026",
    time: "15:30 WIB",
    homeClub: { id: "arema", name: "Arema FC", code: "AREMA", primaryColor: "#002B7F" },
    awayClub: { id: "persija", name: "Persija Jakarta", code: "PERSIJA", primaryColor: "#E42313" },
    stadium: "Stadion Kanjuruhan",
    city: "Malang",
    broadcast: "Indosiar & Vidio",
    isBigMatch: true,
  },
  {
    id: "f7-6",
    matchday: 7,
    date: "2026-11-01",
    dayName: "Minggu, 01 Nov 2026",
    time: "19:00 WIB",
    homeClub: { id: "psm", name: "PSM Makassar", code: "PSM", primaryColor: "#860012" },
    awayClub: { id: "madura-utd", name: "Madura United", code: "MADURA", primaryColor: "#9E1B32" },
    stadium: "Gelora B.J. Habibie",
    city: "Parepare",
    broadcast: "Indosiar & Vidio",
  },
  {
    id: "f7-7",
    matchday: 7,
    date: "2026-11-02",
    dayName: "Senin, 02 Nov 2026",
    time: "15:30 WIB",
    homeClub: { id: "persita", name: "Persita Tangerang", code: "PERSITA", primaryColor: "#4B286D" },
    awayClub: { id: "pss", name: "PSS Sleman", code: "PSS", primaryColor: "#005E2B" },
    stadium: "Indomilk Arena",
    city: "Tangerang",
    broadcast: "Vidio",
  },
  {
    id: "f7-8",
    matchday: 7,
    date: "2026-11-02",
    dayName: "Senin, 02 Nov 2026",
    time: "19:00 WIB",
    homeClub: { id: "persebaya", name: "Persebaya Surabaya", code: "PERSEBAYA", primaryColor: "#007A33" },
    awayClub: { id: "persis", name: "Persis Solo", code: "PERSIS", primaryColor: "#D21034" },
    stadium: "Gelora Bung Tomo",
    city: "Surabaya",
    broadcast: "Indosiar & Vidio",
    isBigMatch: true,
  },
  {
    id: "f7-9",
    matchday: 7,
    date: "2026-11-03",
    dayName: "Selasa, 03 Nov 2026",
    time: "19:00 WIB",
    homeClub: { id: "bali-utd", name: "Bali United", code: "BALI", primaryColor: "#BA0C2F" },
    awayClub: { id: "psis", name: "PSIS Semarang", code: "PSIS", primaryColor: "#0047AB" },
    stadium: "Kapten I Wayan Dipta",
    city: "Gianyar",
    broadcast: "Indosiar & Vidio",
  },
];

// 4. Record Books & Individual Stats (Top Scorer, Top Assist, Top Saves, Top Passes)
export const RECORD_BOOKS_DATA: PlayerStat[] = [
  // Top Scorers
  {
    id: "stat-s1",
    rank: 1,
    category: "scorer",
    playerName: "David da Silva",
    position: "Striker",
    clubName: "Persib Bandung",
    clubCode: "PERSIB",
    clubColor: "#004B93",
    value: 8,
    unit: "GOL",
    detail: "6 Open Play • 2 Penalti • XG 5.82",
    seasonStats: { matches: 6, minutes: 540, efficiency: "67.5 Menit / Gol" },
  },
  {
    id: "stat-s2",
    rank: 2,
    category: "scorer",
    playerName: "Alex Martins",
    position: "Forward",
    clubName: "Dewa United",
    clubCode: "DEWA",
    clubColor: "#D4AF37",
    value: 7,
    unit: "GOL",
    detail: "5 Kaki Kanan • 2 Sundulan Kepala",
    seasonStats: { matches: 6, minutes: 512, efficiency: "73.1 Menit / Gol" },
  },
  {
    id: "stat-s3",
    rank: 3,
    category: "scorer",
    playerName: "Gustavo Almeida",
    position: "Striker",
    clubName: "Persija Jakarta",
    clubCode: "PERSIJA",
    clubColor: "#E42313",
    value: 6,
    unit: "GOL",
    detail: "4 Open Play • 1 Hattrick (vs Barito)",
    seasonStats: { matches: 6, minutes: 530, efficiency: "88.3 Menit / Gol" },
  },
  {
    id: "stat-s4",
    rank: 4,
    category: "scorer",
    playerName: "Dalberto Luan",
    position: "Center Forward",
    clubName: "Arema FC",
    clubCode: "AREMA",
    clubColor: "#002B7F",
    value: 6,
    unit: "GOL",
    detail: "3 Tendangan Jauh • 3 Inside Box",
    seasonStats: { matches: 6, minutes: 495, efficiency: "82.5 Menit / Gol" },
  },
  {
    id: "stat-s5",
    rank: 5,
    category: "scorer",
    playerName: "Flávio Silva",
    position: "Striker",
    clubName: "Persebaya Surabaya",
    clubCode: "PERSEBAYA",
    clubColor: "#007A33",
    value: 5,
    unit: "GOL",
    detail: "Akurasi Tembakan 72% On-Target",
    seasonStats: { matches: 6, minutes: 480, efficiency: "96.0 Menit / Gol" },
  },

  // Top Assists
  {
    id: "stat-a1",
    rank: 1,
    category: "assist",
    playerName: "Tyronne del Pino",
    position: "Attacking Midfielder",
    clubName: "Persib Bandung",
    clubCode: "PERSIB",
    clubColor: "#004B93",
    value: 5,
    unit: "ASSIST",
    detail: "19 Peluang Diciptakan • Key Passes 3.1/Laga",
    seasonStats: { matches: 6, minutes: 520, efficiency: "104 Menit / Assist" },
  },
  {
    id: "stat-a2",
    rank: 2,
    category: "assist",
    playerName: "Francisco Rivera",
    position: "Playmaker",
    clubName: "Persebaya Surabaya",
    clubCode: "PERSEBAYA",
    clubColor: "#007A33",
    value: 5,
    unit: "ASSIST",
    detail: "16 Umpan Terobosan Sukses",
    seasonStats: { matches: 6, minutes: 540, efficiency: "108 Menit / Assist" },
  },
  {
    id: "stat-a3",
    rank: 3,
    category: "assist",
    playerName: "Berguinho",
    position: "Winger",
    clubName: "Borneo FC",
    clubCode: "BORNEO",
    clubColor: "#E05A1F",
    value: 4,
    unit: "ASSIST",
    detail: "Crossing Sukses 41% dari Flank Kanan",
    seasonStats: { matches: 6, minutes: 490, efficiency: "122 Menit / Assist" },
  },
  {
    id: "stat-a4",
    rank: 4,
    category: "assist",
    playerName: "Alexis Messidoro",
    position: "Central Midfielder",
    clubName: "Dewa United",
    clubCode: "DEWA",
    clubColor: "#D4AF37",
    value: 4,
    unit: "ASSIST",
    detail: "2 Assist Set-Piece Corner Kick",
    seasonStats: { matches: 6, minutes: 535, efficiency: "133 Menit / Assist" },
  },
  {
    id: "stat-a5",
    rank: 5,
    category: "assist",
    playerName: "Ryo Matsumura",
    position: "Winger / AM",
    clubName: "Persija Jakarta",
    clubCode: "PERSIJA",
    clubColor: "#E42313",
    value: 4,
    unit: "ASSIST",
    detail: "14 Dribel Sukses Berujung Peluang Emas",
    seasonStats: { matches: 6, minutes: 510, efficiency: "127 Menit / Assist" },
  },

  // Top Saves
  {
    id: "stat-sv1",
    rank: 1,
    category: "saves",
    playerName: "Lucas Frigeri",
    position: "Goalkeeper",
    clubName: "Arema FC",
    clubCode: "AREMA",
    clubColor: "#002B7F",
    value: 32,
    unit: "PENYELAMATAN",
    detail: "Clean Sheet: 3 • Persentase Saves: 86.4%",
    seasonStats: { matches: 6, minutes: 540, efficiency: "5.3 Saves / Laga" },
  },
  {
    id: "stat-sv2",
    rank: 2,
    category: "saves",
    playerName: "Ernando Ari",
    position: "Goalkeeper",
    clubName: "Persebaya Surabaya",
    clubCode: "PERSEBAYA",
    clubColor: "#007A33",
    value: 29,
    unit: "PENYELAMATAN",
    detail: "Clean Sheet: 3 • 1 Penyelamatan Penalti",
    seasonStats: { matches: 6, minutes: 540, efficiency: "4.8 Saves / Laga" },
  },
  {
    id: "stat-sv3",
    rank: 3,
    category: "saves",
    playerName: "Adilson Maringá",
    position: "Goalkeeper",
    clubName: "Bali United FC",
    clubCode: "BALI",
    clubColor: "#BA0C2F",
    value: 27,
    unit: "PENYELAMATAN",
    detail: "11 Penyelamatan Refleks Dalam Kotak 6-Yard",
    seasonStats: { matches: 6, minutes: 540, efficiency: "4.5 Saves / Laga" },
  },
  {
    id: "stat-sv4",
    rank: 4,
    category: "saves",
    playerName: "Nadeo Argawinata",
    position: "Goalkeeper",
    clubName: "Borneo FC",
    clubCode: "BORNEO",
    clubColor: "#E05A1F",
    value: 25,
    unit: "PENYELAMATAN",
    detail: "Kebobolan Paling Sedikit di Liga (Hanya 3)",
    seasonStats: { matches: 6, minutes: 540, efficiency: "4.1 Saves / Laga" },
  },
  {
    id: "stat-sv5",
    rank: 5,
    category: "saves",
    playerName: "Reza Arya Pratama",
    position: "Goalkeeper",
    clubName: "PSM Makassar",
    clubCode: "PSM",
    clubColor: "#860012",
    value: 23,
    unit: "PENYELAMATAN",
    detail: "Akurasi Umpan Panjang Goal Kick 64%",
    seasonStats: { matches: 6, minutes: 540, efficiency: "3.8 Saves / Laga" },
  },

  // Top Passes
  {
    id: "stat-p1",
    rank: 1,
    category: "passes",
    playerName: "Alexis Messidoro",
    position: "Midfielder",
    clubName: "Dewa United",
    clubCode: "DEWA",
    clubColor: "#D4AF37",
    value: 482,
    unit: "OPERAN",
    detail: "Akurasi Sukses 88.6% • 312 Forward Passes",
    seasonStats: { matches: 6, minutes: 535, efficiency: "80.3 Operan / Laga" },
  },
  {
    id: "stat-p2",
    rank: 2,
    category: "passes",
    playerName: "Marc Klok",
    position: "Central Midfielder",
    clubName: "Persib Bandung",
    clubCode: "PERSIB",
    clubColor: "#004B93",
    value: 461,
    unit: "OPERAN",
    detail: "Akurasi Sukses 89.4% • 38 Long Ball Akurat",
    seasonStats: { matches: 6, minutes: 520, efficiency: "76.8 Operan / Laga" },
  },
  {
    id: "stat-p3",
    rank: 3,
    category: "passes",
    playerName: "Christophe Nduwarugira",
    position: "Defensive Midfielder",
    clubName: "Borneo FC",
    clubCode: "BORNEO",
    clubColor: "#E05A1F",
    value: 440,
    unit: "OPERAN",
    detail: "Akurasi Sukses 91.2% di Paruh Lapangan Sendiri",
    seasonStats: { matches: 6, minutes: 540, efficiency: "73.3 Operan / Laga" },
  },
  {
    id: "stat-p4",
    rank: 4,
    category: "passes",
    playerName: "Mohammed Rashid",
    position: "Central Midfielder",
    clubName: "Persebaya Surabaya",
    clubCode: "PERSEBAYA",
    clubColor: "#007A33",
    value: 418,
    unit: "OPERAN",
    detail: "Akurasi 87.8% • Transisi Serangan Cepat",
    seasonStats: { matches: 6, minutes: 530, efficiency: "69.6 Operan / Laga" },
  },
  {
    id: "stat-p5",
    rank: 5,
    category: "passes",
    playerName: "Ricky Kambuaya",
    position: "Midfielder",
    clubName: "Dewa United",
    clubCode: "DEWA",
    clubColor: "#D4AF37",
    value: 395,
    unit: "OPERAN",
    detail: "Akurasi 86.2% • Progressive Carries 24 Kali",
    seasonStats: { matches: 6, minutes: 510, efficiency: "65.8 Operan / Laga" },
  },
];

// 5. Riwayat Jumlah Penonton Musim 2021 - 2027
export const ATTENDANCE_TIMELINE: SeasonAttendanceRecord[] = [
  {
    season: "2021/22",
    totalSpectators: 0,
    avgPerMatch: 0,
    highestMatch: "Tanpa Penonton (Protokol Pandemi)",
    topVenue: "Stadion Kapten I Wayan Dipta",
    status: "completed",
    note: "Sistem Bubble Format Tertutup di Bali & Jabodetabek",
  },
  {
    season: "2022/23",
    totalSpectators: 1845210,
    avgPerMatch: 6029,
    highestMatch: "Persija vs Persib (60.134 Penonton)",
    topVenue: "Stadion Utama Gelora Bung Karno",
    status: "completed",
    note: "Kembalinya Suporter ke Stadion pasca era pandemi",
  },
  {
    season: "2023/24",
    totalSpectators: 2120450,
    avgPerMatch: 6929,
    highestMatch: "Persib vs Madura United - Final (27.892 Penonton)",
    topVenue: "Stadion Gelora Bandung Lautan Api",
    status: "completed",
    note: "Championship Series Format baru menghasilkan atmosfer dramatis",
  },
  {
    season: "2024/25",
    totalSpectators: 2489312,
    avgPerMatch: 8135,
    highestMatch: "Persebaya vs Arema (45.000 Penonton)",
    topVenue: "Stadion Gelora Bung Tomo",
    status: "completed",
    note: "Peningkatan 17.4% kehadiran berkat standardisasi fasilitas liga",
  },
  {
    season: "2025/26",
    totalSpectators: 2795400,
    avgPerMatch: 9135,
    highestMatch: "Persija vs Persebaya (55.430 Penonton)",
    topVenue: "Jakarta International Stadium (JIS)",
    status: "completed",
    note: "Rekor baru rata-rata penonton stadion termegah tanah air",
  },
  {
    season: "2026/27",
    totalSpectators: 432384,
    avgPerMatch: 9608,
    highestMatch: "Persib vs Persija (32.400 Penonton)",
    topVenue: "Stadion Gelora Bandung Lautan Api",
    status: "ongoing",
    note: "Musim berjalan (Pekan 7 dari 34) - Tren kenaikan 5.2% dibanding musim lalu",
  },
];

// 6. Berita & Editorial Terbaru (Atmosfer Stadion & Media)
export const NEWS_EDITORIAL_DATA: NewsItem[] = [
  {
    id: "news-1",
    title: "ATMOsFER DINGIN BANDUNG: 32.000 BOBOTOH KUNCI KEMENANGAN DERBI",
    category: "Matchday Report",
    date: "26 Okt 2026",
    readTime: "4 Menit Baca",
    excerpt:
      "Tensi tinggi di Gelora Bandung Lautan Api saat gol telat David da Silva mengunci 3 poin krusial atas rival abadi Persija Jakarta di hadapan lautan biru.",
    venue: "Gelora Bandung Lautan Api, Bandung",
    accentColor: "#004B93",
  },
  {
    id: "news-2",
    title: "KONSISTENSI PESUT ETAM: BORNEO FC TAK TERKALAHKAN DI 6 LAGA PERDANA",
    category: "Analisis Taktik",
    date: "24 Okt 2026",
    readTime: "3 Menit Baca",
    excerpt:
      "Dengan kebobolan terendah dan pertahanan paling solid, skuad asuhan Pieter Huistra membuktikan kekuatan skema transisi cepat dari Segiri ke seantero Nusantara.",
    venue: "Stadion Segiri, Samarinda",
    accentColor: "#E05A1F",
  },
  {
    id: "news-3",
    title: "GELORA BUNG TOMO MENGGEMURUH: BONEK CATAT TINGKAT OKUPANSI 94%",
    category: "Fan Culture",
    date: "22 Okt 2026",
    readTime: "5 Menit Baca",
    excerpt:
      "Koreografi raksasa tribun utara dan selatan menyambut duel sengit Persebaya. Sepak bola Surabaya bukan sekadar 90 menit pertandingan, melainkan detak nadi kota.",
    venue: "Gelora Bung Tomo, Surabaya",
    accentColor: "#007A33",
  },
  {
    id: "news-4",
    title: "REKOR SAVE TERBAIK: DINDING KOKOH LUCAS FRIGERI SELAMATKAN SINGO EDAN",
    category: "Stat Insight",
    date: "20 Okt 2026",
    readTime: "3 Menit Baca",
    excerpt:
      "32 penyelamatan dalam 6 pekan pertandingan pertama membuat Frigeri menjadi kiper dengan penyelamatan krusial terbanyak di kompetisi sejauh ini.",
    venue: "Stadion Kanjuruhan, Malang",
    accentColor: "#002B7F",
  },
];

// 7. Daftar Sponsor & Partner Resmi
export const PARTNERS_DATA: Partner[] = [
  { id: "bri", name: "Bank Rakyat Indonesia (BRI)", category: "Title Sponsor", label: "BRI SUPER LEAGUE", isMain: true },
  { id: "indosiar", name: "Indosiar", category: "Official Broadcaster", label: "OFFICIAL BROADCASTER TV", isMain: true },
  { id: "vidio", name: "Vidio OTT", category: "Official Broadcaster", label: "LIVE STREAMING PLATFORM", isMain: true },
  { id: "adidas", name: "Adidas", category: "Ball & Equipment", label: "OFFICIAL MATCH BALL & APPAREL" },
  { id: "coca-cola", name: "Coca-Cola", category: "Official Partner", label: "OFFICIAL BEVERAGE PARTNER" },
  { id: "powerade", name: "Powerade", category: "Official Partner", label: "OFFICIAL ISOTONIC DRINK" },
  { id: "garuda", name: "Garuda Indonesia", category: "Official Partner", label: "OFFICIAL AIRLINE PARTNER" },
  { id: "hyundai", name: "Hyundai Motors", category: "Official Partner", label: "OFFICIAL MOBILITY PARTNER" },
  { id: "kopi-kapal-api", name: "Kopi Kapal Api", category: "Official Partner", label: "OFFICIAL COFFEE PARTNER" },
];

// 8. Statistik Global / KPI Live Counter
export const GLOBAL_KPI_STATS = {
  totalClubs: 18,
  currentMatchday: 7,
  totalMatchesThisSeason: 306,
  matchesPlayed: 54,
  totalGoalsScored: 142,
  averageGoalsPerMatch: 2.63,
  currentSeasonAttendance: 432384,
  averageAttendancePerMatch: 8007,
  seasonLabel: "BRI Super League 2026/27",
  lastUpdated: "Pekan 7 Berjalan (Okt 2026)",
};

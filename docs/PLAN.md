# Implementation Plan: I.League On-Field Web

- [x] **Fase 1: Inisialisasi Proyek & Data Layer**
  - [x] Setup Next.js + Tailwind CSS + TypeScript.
  - [x] Install dependencies: `gsap`, `lenis`, `framer-motion`, `lucide-react`.
  - [x] Buat konfigurasi font (`Oswald`/`Anton` + `Space Grotesk` + `Inter`) dan skema warna di Tailwind.
  - [x] Buat file `src/data/liga1Data.ts` berisi data lengkap dari `ileague.id` (18 klub, klasemen, jadwal pekan 7, top scorer/assist/saves/passes, rekor penonton 2021-2027, berita, dan partner).

- [x] **Fase 2: Core Layout, Preloader, Smooth Scroll & Hero Section**
  - [x] Setup `SmoothScrollProvider` dengan Lenis.
  - [x] Buat komponen `Preloader` (counter 0-100%).
  - [x] Buat `Navbar` bergaya floating kaca (glassmorphism).
  - [x] Buat `HeroOnField` dengan tipografi raksasa, gambar utama parallax, dan 4 counter KPI cepat.

- [x] **Fase 3: Interactive Season Timeline, Klasemen & Jadwal**
  - [x] Buat komponen `SeasonTimeline` (selector tahun 2021-2027 dengan animasi angka total penonton).
  - [x] Buat komponen `StandingsAndSchedule` (Tabel Klasemen 18 Klub & Kartu Jadwal Pekan 7 yang mendukung swipe/horizontal scroll).

- [x] **Fase 4: "Record Books" (Filterable Top Stats Grid)**
  - [x] Buat komponen `RecordBooksGrid` dengan tab filter interaktif (`Semua`, `Top Scorer`, `Top Assist`, `Top Saves`, `Top Passes`, `Rekor Penonton`).
  - [x] Terapkan desain kartu tipografi besar ala `jjettas.com/on-field`.

- [ ] **Fase 5: Pinned Editorial Showcase, Partner Marquee & Footer Portal**
  - Buat komponen `InfluenceShowcase` (Pinned scroll + kinetic text marquee + kartu berita & galeri pertandingan).
  - Buat komponen `PartnerTicker` (Infinite marquee 18 klub & sponsor resmi BRI, Indosiar, Vidio, Adidas, dll.).
  - Buat komponen `FooterPortal` (transisi menuju halaman Off-Field/Media).
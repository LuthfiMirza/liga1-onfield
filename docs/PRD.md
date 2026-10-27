# PRD: I.League "On-Field" Interactive Experience

## 1. Visi Produk
Membangun web showcase interaktif untuk Liga 1 Indonesia (BRI Super League - I.League) yang mengadaptasi konsep layout, tipografi, dan animasi scrollytelling dari `https://jjettas.com/on-field` dengan konten aktual dari `https://ileague.id/`.

## 2. Target Pengguna & Pengalaman (UX)
- Penggemar sepak bola Indonesia yang menginginkan pengalaman visual modern, cepat, dan imersif.
- Pengalaman utama: Smooth scrolling (Lenis), animasi berbasis scroll (GSAP ScrollTrigger), tipografi olahraga yang tegas (Condensed Sans-Serif + Monospace untuk angka), dan tema warna kontras tinggi (Dark Turf Pitch `#0A0A0C`, Electric Lime/Gold Accent `#D4FF00` atau Biru Elektrik BRI `#00529C`, dan Off-White `#F4F4F6`).

## 3. Fitur & Struktur Halaman (Single-Page Scrollytelling)
1. **Preloader Screen**: Persentase loading 0-100% dengan animasi tirai terbuka.
2. **Navbar Minimalis**: Navigasi mengambang (Beranda, On-Field, Klasemen, Jadwal, Statistik, Media) + Ticker skor singkat.
3. **Hero Section ("ON-FIELD")**:
   - Tipografi raksasa bertumpuk & kutipan semangat kompetisi.
   - Visual utama pemain/stadion dengan efek parallax.
   - 4 Live Counter Statistik: Total Klub (18), Pekan Berjalan (Pekan 7), Total Penonton Musim Ini (432.384), Total Pertandingan.
4. **Interactive Season & Standings Section**:
   - Selector Tahun/Musim (2021/22 hingga 2026/27) yang menampilkan rekor jumlah penonton tiap musim.
   - Tabel Klasemen 18 Klub BRI Super League & Jadwal Pertandingan Pekan Ini (dengan indikator stasiun TV Indosiar/Vidio dan nama stadion) yang mendukung horizontal swipe/scroll.
5. **Filterable Stats & Record Books ("Puncak Performa")**:
   - Filter interaktif: `Semua`, `Top Scorer`, `Top Assist`, `Top Saves`, `Top Passes`, `Rekor Penonton`.
   - Grid kartu statistik bergaya editorial dengan angka berukuran masif dan deskripsi pencapaian pemain/klub.
6. **Editorial & Media Showcase ("Atmosfer Stadion")**:
   - Pinned scroll section dengan teks marquee kinetik.
   - Kartu Berita Terbaru, Galeri Foto Pertandingan, dan Cuplikan Video (Highlights).
7. **Infinite Club & Partner Ticker ("Setting the Pace")**:
   - Marquee berjalan tanpa henti berisi 18 klub peserta dan sponsor resmi (BRI, Indosiar, Vidio, Adidas, Coca-Cola, Powerade, Garuda).
8. **Footer Portal Transition**:
   - Transisi penutup imersif menuju seksi "Off-Field / Sisi Lain".

## 4. Tech Stack
- Framework: Next.js (App Router, TypeScript)
- Styling: Tailwind CSS
- Animasi: GSAP (GreenSock) + ScrollTrigger, Framer Motion (untuk filter tab)
- Smooth Scroll: Lenis (`@studio-freight/lenis` atau `lenis`)
- Icons: Lucide React
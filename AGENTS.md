# Project Rules: Sports Scrollytelling (Liga 1 "On-Field" Experience)

Pedoman desain & engineering bergaya Awwwards / LayerTwo (seperti jjettas.com/on-field) menggunakan Next.js, Tailwind CSS, GSAP ScrollTrigger, dan Lenis.

## 1. Aturan Tipografi & Layout
- Gunakan kombinasi font:
  - Heading Utama: `Anton`, `Bebas Neue`, atau `Oswald` (Uppercase, tracking rapat `tracking-tighter`, line-height sangat rapat `leading-[0.88]`).
  - Data & Angka Statistik: Font Monospace atau Geometric Sans tebal (`Space Grotesk` / `JetBrains Mono`) agar angka sejajar rapi (`tabular-nums`).
- Gunakan kontras ukuran ekstrem: Angka statistik pada kartu rekor harus berukuran sangat besar (`text-6xl` hingga `text-9xl`), sedangkan label penjelasnya berukuran kecil dan rapi (`text-xs uppercase tracking-widest`).

## 2. Aturan Animasi (GSAP & Lenis)
- Selalu inisialisasi **Lenis Smooth Scroll** di level root layout.
- Gunakan `gsap.context()` atau hook `useGSAP()` di dalam komponen React agar tidak terjadi memory leak saat unmount.
- Efek Wajib:
  1. **Number Counter Up**: Angka statistik (penonton, gol, operan) harus beranimasi menghitung naik dari 0 saat masuk ke viewport.
  2. **Kinetic Marquee**: Teks latar belakang dan deretan klub/sponsor bergerak horizontal secara terus-menerus dan kecepatannya bereaksi terhadap kecepatan scroll.
  3. **Pinned Section**: Pada seksi "Atmosfer & Media", kunci (pin) gambar latar stadion sementara kartu berita dan kutipan bergerak melewati layar.
  4. **Staggered Filter Grid**: Saat pengguna menekan filter (`Top Scorer`, `Top Assist`, `Top Saves`, `Top Passes`), kartu harus bertransisi dengan mulus (fade + scale/slide).

## 3. Arsitektur Data
- Pisahkan seluruh data Liga 1 (18 klub, klasemen, jadwal pekan 7, top stats, berita, riwayat penonton, daftar sponsor) ke dalam satu file terpusat `src/data/liga1Data.ts` agar mudah dikelola dan di-update.

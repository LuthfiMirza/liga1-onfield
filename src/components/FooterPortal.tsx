"use client";

import { ArrowUp, ArrowUpRight, Heart } from "lucide-react";

export default function FooterPortal() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative pt-24 pb-12 border-t border-[#E2DDD5] bg-[#F6F3EF] overflow-hidden">
      {/* Top Transition Portal to "OFF-FIELD" */}
      <div className="mx-auto max-w-7xl px-4 sm:px-8 mb-20">
        <div className="p-8 sm:p-14 lg:p-16 rounded-3xl bg-gradient-to-b from-[#FFFFFF] to-[#FAF8F5] border border-[#E2DDD5] relative overflow-hidden group hover:border-[#171220] shadow-xl transition-all duration-500">
          {/* Subtle Ambient Radial */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#00529C]/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-[#00529C]/10 transition-all duration-500" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#171220] text-[11px] font-mono uppercase tracking-widest text-[#D4FF00] font-bold mb-4 shadow-sm">
                <span>PORTAL TRANSISI BERIKUTNYA</span>
              </div>
              <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold uppercase tracking-tight font-anton text-[#171220] leading-[0.88] select-none">
                OFF-FIELD
              </h2>
              <p className="mt-4 max-w-lg text-sm sm:text-base text-[#6E6D7A] font-sans">
                Memasuki ruang ganti, suara ruang taktik, gaya hidup para pemain, serta dedikasi komunitas suporter di seantero Nusantara.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="#hero"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#171220] hover:bg-[#00529C] text-[#FFFFFF] font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-xl hover:scale-105"
              >
                <span>MENUJU SISI LAIN</span>
                <ArrowUpRight className="w-4 h-4 text-[#D4FF00]" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Meta & Copyright */}
      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-[#E2DDD5]">
          {/* Col 1: Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#FFFFFF] border border-[#E2DDD5] shadow-sm">
                <span className="font-mono text-xs font-black text-[#00529C]">
                  IL
                </span>
              </div>
              <span className="text-base font-bold font-mono tracking-tight text-[#171220]">
                I.LEAGUE // ON-FIELD EXPERIENCE
              </span>
            </div>
            <p className="text-xs text-[#6E6D7A] leading-relaxed max-w-md font-sans">
              Eksperimen showcase visual interaktif BRI Super League (Liga 1 Indonesia), diadaptasi dengan estetika editorial Awwwards / LayerTwo menggunakan Next.js, Tailwind CSS, dan GSAP.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#171220] font-bold mb-4">
              NAVIGASI
            </h4>
            <ul className="space-y-2 text-xs font-mono text-[#6E6D7A]">
              <li>
                <a href="#hero" className="hover:text-[#171220] transition-colors">
                  ON-FIELD HERO
                </a>
              </li>
              <li>
                <a href="#timeline" className="hover:text-[#171220] transition-colors">
                  TIMELINE PENONTON
                </a>
              </li>
              <li>
                <a href="#standings" className="hover:text-[#171220] transition-colors">
                  KLASEMEN 18 KLUB
                </a>
              </li>
              <li>
                <a href="#record-books" className="hover:text-[#171220] transition-colors">
                  RECORD BOOKS
                </a>
              </li>
              <li>
                <a href="#atmosphere" className="hover:text-[#171220] transition-colors">
                  ATMOSFER & MEDIA
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Official Broadcasters */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-[#171220] font-bold mb-4">
              SIARAN RESMI
            </h4>
            <div className="flex flex-col gap-2 text-xs font-mono text-[#6E6D7A]">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#171220]" />
                <span>INDOSIAR (FREE TO AIR)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00529C]" />
                <span>VIDIO (LIVE STREAMING)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E05A1F]" />
                <span>BRI SUPER LEAGUE 2026/27</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Back to Top and Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#6E6D7A]">
          <div className="flex items-center gap-2">
            <span>© 2026/27 I.LEAGUE INDONESIA • DIBUAT DENGAN</span>
            <Heart className="w-3.5 h-3.5 text-[#E42313] fill-[#E42313]" />
            <span>UNTUK SEPAK BOLA NUSANTARA</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFFFFF] border border-[#E2DDD5] hover:border-[#171220] hover:text-[#171220] shadow-sm transition-colors text-xs font-mono uppercase font-bold text-[#171220]"
          >
            <span>KEMBALI KE ATAS</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}

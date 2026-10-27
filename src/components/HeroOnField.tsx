"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GLOBAL_KPI_STATS } from "@/data/liga1Data";
import { ArrowDown, Flame, Trophy, Users, ShieldAlert } from "lucide-react";

export default function HeroOnField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const counterClubsRef = useRef<HTMLSpanElement>(null);
  const counterMatchdayRef = useRef<HTMLSpanElement>(null);
  const counterSpectatorsRef = useRef<HTMLSpanElement>(null);
  const counterGoalsRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Background Parallax on Scroll
      gsap.to(bgImageRef.current, {
        yPercent: 25,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // 2. Headline subtle parallax
      gsap.to(headlineRef.current, {
        yPercent: -20,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // 3. Number Counter Animation on view
      const counterTargets = [
        { ref: counterClubsRef, endVal: GLOBAL_KPI_STATS.totalClubs, decimals: 0 },
        { ref: counterMatchdayRef, endVal: GLOBAL_KPI_STATS.currentMatchday, decimals: 0, prefix: "0" },
        { ref: counterSpectatorsRef, endVal: GLOBAL_KPI_STATS.currentSeasonAttendance, decimals: 0, isLocale: true },
        { ref: counterGoalsRef, endVal: GLOBAL_KPI_STATS.totalGoalsScored, decimals: 0 },
      ];

      ScrollTrigger.create({
        trigger: cardsRef.current,
        start: "top 90%",
        onEnter: () => {
          counterTargets.forEach((target) => {
            const el = target.ref.current;
            if (!el) return;
            const obj = { val: 0 };
            gsap.to(obj, {
              val: target.endVal,
              duration: 2.2,
              ease: "power2.out",
              onUpdate: () => {
                if (target.isLocale) {
                  el.textContent = Math.floor(obj.val).toLocaleString("id-ID");
                } else if (target.prefix && obj.val < 10) {
                  el.textContent = `${target.prefix}${Math.floor(obj.val)}`;
                } else {
                  el.textContent = Math.floor(obj.val).toString();
                }
              },
            });
          });
        },
        once: true,
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 px-4 sm:px-8 overflow-hidden bg-[#0A0A0C]"
    >
      {/* Background Parallax Visual */}
      <div
        ref={bgImageRef}
        className="absolute inset-0 -top-20 h-[125%] w-full pointer-events-none select-none z-0"
      >
        <Image
          src="/images/hero_stadium.jpg"
          alt="Liga 1 Stadium On-Field Experience"
          fill
          priority
          className="object-cover object-center opacity-45 scale-105"
        />
        {/* Dark Vignette and Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0C] via-[#0A0A0C]/60 to-transparent" />
        <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#0A0A0C]/50 to-[#0A0A0C]" />
      </div>

      {/* Top Banner Tag */}
      <div className="relative z-10 mx-auto max-w-7xl w-full flex items-center justify-between">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#131318]/90 border border-[#23232C] backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-ping" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#F4F4F6]">
            EDISI RESMI // BRI SUPER LEAGUE 2026/27
          </span>
        </div>
        <div className="hidden md:flex items-center gap-4 text-xs font-mono text-[#8E8E9A]">
          <span>GBLA • GBT • JIS • SEGIPI</span>
          <span className="text-[#D4FF00]">● LIVE BROADCAST</span>
        </div>
      </div>

      {/* Center Main Athletic Headline */}
      <div className="relative z-10 mx-auto max-w-7xl w-full my-auto py-10 sm:py-16">
        <div className="flex flex-col">
          <p className="text-xs sm:text-sm font-mono tracking-[0.3em] uppercase text-[#D4FF00] mb-2">
            DETAK NADI SEPAK BOLA NUSANTARA
          </p>

          <h1
            ref={headlineRef}
            className="text-6xl sm:text-8xl md:text-[10rem] lg:text-[13rem] font-bold uppercase tracking-tighter leading-[0.85] text-[#F4F4F6] font-anton select-none"
          >
            ON-FIELD
            <span className="block text-2xl sm:text-4xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-[#D4FF00] via-[#F4F4F6] to-[#0070BA] tracking-tight mt-1">
              · BRI SUPER LEAGUE ·
            </span>
          </h1>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mt-6">
            <div className="max-w-xl flex flex-col gap-4">
              {/* Iconic Quote Box */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#131318]/80 border border-[#23232C] backdrop-blur-md">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4FF00]" />
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#D4FF00]">
                    KUTIPAN SEMANGAT KOMPETISI
                  </span>
                </div>
                <p className="text-sm sm:text-base text-[#F4F4F6] font-sans italic leading-relaxed">
                  &ldquo;Sepak bola Indonesia bukan sekadar 90 menit di atas rumput hijau; ini adalah identitas kota, kehormatan lambang di dada, dan detak jantung jutaan suporter di tribun.&rdquo;
                </p>
              </div>

              <p className="text-sm sm:text-base text-[#8E8E9A] leading-relaxed font-sans">
                Eksplorasi visual dan data berkecepatan tinggi dari panggung sepak bola kasta tertinggi Indonesia. Pantau persaingan 18 klub, intensitas tribun stadion, dan catatan rekor legendaris musim ini.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <a
                href="#standings"
                className="px-6 py-3.5 rounded-full bg-[#D4FF00] hover:bg-[#bce400] text-[#0A0A0C] font-mono font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(212,255,0,0.3)] hover:scale-105"
              >
                JELAJAHI KLASEMEN
              </a>
              <a
                href="#record-books"
                className="px-6 py-3.5 rounded-full bg-[#131318] hover:bg-[#1C1C24] border border-[#23232C] text-[#F4F4F6] font-mono font-medium text-xs uppercase tracking-wider transition-all duration-300"
              >
                RECORD BOOKS
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom KPI Stat Counter Cards */}
      <div
        ref={cardsRef}
        className="relative z-10 mx-auto max-w-7xl w-full grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-6"
      >
        {/* Card 1: Total Klub */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#131318]/90 border border-[#23232C] hover:border-[#D4FF00]/50 backdrop-blur-xl transition-all duration-300 group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#8E8E9A]">
              Klub Peserta
            </span>
            <Trophy className="w-4 h-4 text-[#8E8E9A] group-hover:text-[#D4FF00] transition-colors" />
          </div>
          <div className="text-4xl sm:text-6xl font-bold font-mono tracking-tight text-[#F4F4F6] tabular-nums">
            <span ref={counterClubsRef}>0</span>
          </div>
          <p className="text-[10px] font-mono text-[#8E8E9A] mt-2 uppercase tracking-wide">
            18 Kota Sabang - Merauke
          </p>
        </div>

        {/* Card 2: Pekan Berjalan */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#131318]/90 border border-[#23232C] hover:border-[#D4FF00]/50 backdrop-blur-xl transition-all duration-300 group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#8E8E9A]">
              Pekan Berjalan
            </span>
            <Flame className="w-4 h-4 text-[#D4FF00]" />
          </div>
          <div className="text-4xl sm:text-6xl font-bold font-mono tracking-tight text-[#F4F4F6] tabular-nums">
            <span>PEKAN </span>
            <span ref={counterMatchdayRef} className="text-[#D4FF00]">
              07
            </span>
          </div>
          <p className="text-[10px] font-mono text-[#8E8E9A] mt-2 uppercase tracking-wide">
            9 Laga Sengit Menanti
          </p>
        </div>

        {/* Card 3: Total Penonton */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#131318]/90 border border-[#23232C] hover:border-[#D4FF00]/50 backdrop-blur-xl transition-all duration-300 group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#8E8E9A]">
              Total Penonton
            </span>
            <Users className="w-4 h-4 text-[#8E8E9A] group-hover:text-[#D4FF00] transition-colors" />
          </div>
          <div className="text-3xl sm:text-5xl lg:text-5xl font-bold font-mono tracking-tight text-[#F4F4F6] tabular-nums">
            <span ref={counterSpectatorsRef}>0</span>
          </div>
          <p className="text-[10px] font-mono text-[#8E8E9A] mt-2 uppercase tracking-wide">
            Rata-rata 8.007 / Pertandingan
          </p>
        </div>

        {/* Card 4: Total Gol */}
        <div className="p-4 sm:p-6 rounded-2xl bg-[#131318]/90 border border-[#23232C] hover:border-[#D4FF00]/50 backdrop-blur-xl transition-all duration-300 group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-[#8E8E9A]">
              Gol Tercipta
            </span>
            <ShieldAlert className="w-4 h-4 text-[#8E8E9A] group-hover:text-[#D4FF00] transition-colors" />
          </div>
          <div className="text-4xl sm:text-6xl font-bold font-mono tracking-tight text-[#F4F4F6] tabular-nums">
            <span ref={counterGoalsRef}>0</span>
            <span className="text-sm font-sans text-[#8E8E9A] ml-2">GOL</span>
          </div>
          <p className="text-[10px] font-mono text-[#8E8E9A] mt-2 uppercase tracking-wide">
            Rasio 2.63 Gol Tiap 90 Menit
          </p>
        </div>
      </div>

      {/* Down Indicator */}
      <div className="relative z-10 flex justify-center mt-6">
        <a
          href="#timeline"
          className="flex flex-col items-center gap-1 text-[10px] font-mono text-[#8E8E9A] hover:text-[#D4FF00] transition-colors"
        >
          <span>SCROLL KE BAWAH</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#D4FF00]" />
        </a>
      </div>
    </section>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ATTENDANCE_TIMELINE, GLOBAL_KPI_STATS, SeasonAttendanceRecord } from "@/data/liga1Data";

export default function SeasonTimeline() {
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(
    ATTENDANCE_TIMELINE.length - 1
  );
  const currentRecord: SeasonAttendanceRecord =
    ATTENDANCE_TIMELINE[selectedSeasonIndex];

  const statsSectionRef = useRef<HTMLDivElement>(null);
  const statsPaneRef = useRef<HTMLDivElement>(null);
  const leftCutoutRef = useRef<HTMLDivElement>(null);
  const rightCutoutRef = useRef<HTMLDivElement>(null);
  const statsParkRef = useRef<HTMLDivElement>(null);
  const megaCounterRef = useRef<HTMLDivElement>(null);

  // Counter refs for the 4 big stats
  const countClubsRef = useRef<HTMLSpanElement>(null);
  const countMatchdayRef = useRef<HTMLSpanElement>(null);
  const countGoalsRef = useRef<HTMLSpanElement>(null);
  const countPassesRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Floating 3D cutouts parallax movement across 260vh scroll
      gsap.to(leftCutoutRef.current, {
        y: "-50vh",
        rotation: -22,
        ease: "none",
        scrollTrigger: {
          trigger: statsSectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
        },
      });

      gsap.to(rightCutoutRef.current, {
        y: "-65vh",
        rotation: 16,
        ease: "none",
        scrollTrigger: {
          trigger: statsSectionRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5,
        },
      });

      // 2. Count-up animation for the 4 athletic numbers
      const targets = [
        { ref: countClubsRef, end: GLOBAL_KPI_STATS.totalClubs },
        { ref: countMatchdayRef, end: GLOBAL_KPI_STATS.currentMatchday, prefix: "0" },
        { ref: countGoalsRef, end: GLOBAL_KPI_STATS.totalGoalsScored },
        { ref: countPassesRef, end: 78.4, suffix: "%", decimals: 1 },
      ];

      ScrollTrigger.create({
        trigger: statsSectionRef.current,
        start: "top 70%",
        onEnter: () => {
          targets.forEach((item) => {
            const el = item.ref.current;
            if (!el) return;
            const obj = { val: 0 };
            gsap.to(obj, {
              val: item.end,
              duration: 2,
              ease: "power2.out",
              onUpdate: () => {
                if (item.decimals) {
                  el.textContent = `${obj.val.toFixed(item.decimals)}${item.suffix || ""}`;
                } else if (item.prefix && obj.val < 10) {
                  el.textContent = `${item.prefix}${Math.floor(obj.val)}`;
                } else {
                  el.textContent = Math.floor(obj.val).toString();
                }
              },
            });
          });
        },
        once: true,
      });

      // 3. Mega attendance counter scrub
      const megaEl = megaCounterRef.current;
      if (megaEl) {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: currentRecord.totalSpectators,
          duration: 1.2,
          ease: "power2.out",
          onUpdate: () => {
            megaEl.textContent = Math.floor(obj.val).toLocaleString("id-ID");
          },
        });
      }
    }, statsSectionRef);

    return () => ctx.revert();
  }, [selectedSeasonIndex, currentRecord.totalSpectators]);

  return (
    <>
      {/* 1. On-Stats 260vh Pinned Pane */}
      <section
        id="stats"
        ref={statsSectionRef}
        data-section="on-stats"
        data-tone="dark"
        data-stats-pin="true"
        className="relative w-full max-md:overflow-x-clip md:h-[260vh] bg-[#0B0A0F]"
      >
        <div
          ref={statsPaneRef}
          data-stats-pane="true"
          className="flex flex-col items-center justify-center overflow-x-clip px-6 py-16 md:sticky md:top-0 md:h-screen md:py-0 select-none"
        >
          {/* Floating Parallax Cutout 1: Classic Football (Left side) */}
          <div
            ref={leftCutoutRef}
            aria-hidden="true"
            data-on-field-catch="true"
            className="pointer-events-none absolute -left-12 top-[38%] z-20 w-[42vw] md:w-[26vw] will-change-transform filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.8)]"
            style={{ transform: "rotate(-10deg)" }}
          >
            <div className="relative aspect-square w-full opacity-85">
              <div className="w-full h-full rounded-full border-2 border-[#D4FF00]/30 bg-gradient-to-tr from-[#131318] to-[#23232C] flex items-center justify-center p-8">
                <span className="text-7xl md:text-9xl font-anton text-[#D4FF00]/40">⚽</span>
              </div>
            </div>
          </div>

          {/* Floating Parallax Cutout 2: Golden Glove / Trophy (Right side) */}
          <div
            ref={rightCutoutRef}
            aria-hidden="true"
            data-on-field-catch="true"
            className="pointer-events-none absolute -right-10 top-[22%] z-20 w-[48vw] md:w-[32vw] will-change-transform filter drop-shadow-[0_20px_45px_rgba(0,0,0,0.8)]"
            style={{ transform: "rotate(6deg)" }}
          >
            <div className="relative aspect-square w-full opacity-85">
              <div className="w-full h-full rounded-full border-2 border-[#0070BA]/30 bg-gradient-to-bl from-[#131318] to-[#23232C] flex items-center justify-center p-8">
                <span className="text-7xl md:text-9xl font-anton text-[#0070BA]/40">🏆</span>
              </div>
            </div>
          </div>

          {/* Central 4 Massive Athletic Numbers (data-stats-park) */}
          <div
            ref={statsParkRef}
            data-stats-park="true"
            className="relative z-10 flex w-full flex-col items-center max-w-[1440px]"
          >
            <div className="grid w-full grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4">
              {/* Stat 1: Total Klub */}
              <div className="flex flex-col items-center gap-3 text-center">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8E8E9A]">
                  Klub Peserta
                </span>
                <span
                  ref={countClubsRef}
                  className="font-anton uppercase text-[#F6F3EF] leading-none tabular-nums"
                  style={{ fontSize: "clamp(56px, 8.2vw, 190px)" }}
                >
                  18
                </span>
                <span className="text-[10px] font-mono text-[#D4FF00] uppercase tracking-wider">
                  Sabang - Merauke
                </span>
              </div>

              {/* Stat 2: Pekan Berjalan */}
              <div className="flex flex-col items-center gap-3 text-center">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8E8E9A]">
                  Pekan Berjalan
                </span>
                <span
                  ref={countMatchdayRef}
                  className="font-anton uppercase text-[#D4FF00] leading-none tabular-nums"
                  style={{ fontSize: "clamp(56px, 8.2vw, 190px)" }}
                >
                  07
                </span>
                <span className="text-[10px] font-mono text-[#8E8E9A] uppercase tracking-wider">
                  9 Laga / Pekan
                </span>
              </div>

              {/* Stat 3: Total Gol */}
              <div className="flex flex-col items-center gap-3 text-center">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8E8E9A]">
                  Gol Tercipta
                </span>
                <span
                  ref={countGoalsRef}
                  className="font-anton uppercase text-[#F6F3EF] leading-none tabular-nums"
                  style={{ fontSize: "clamp(56px, 8.2vw, 190px)" }}
                >
                  142
                </span>
                <span className="text-[10px] font-mono text-[#8E8E9A] uppercase tracking-wider">
                  Rasio 2.63 / Laga
                </span>
              </div>

              {/* Stat 4: Akurasi Operan */}
              <div className="flex flex-col items-center gap-3 text-center">
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8E8E9A]">
                  Akurasi Operan
                </span>
                <span
                  ref={countPassesRef}
                  className="font-anton uppercase text-[#F6F3EF] leading-none tabular-nums"
                  style={{ fontSize: "clamp(56px, 8.2vw, 190px)" }}
                >
                  78.4%
                </span>
                <span className="text-[10px] font-mono text-[#D4FF00] uppercase tracking-wider">
                  Kualitas Penguasaan
                </span>
              </div>
            </div>

            {/* Timeline Scrubber (2021 ──── 2027) ala jjettas */}
            <div className="relative mt-16 md:mt-24 w-full max-w-4xl px-4">
              <div className="flex items-center justify-between border-b border-[#23232C] pb-4">
                {ATTENDANCE_TIMELINE.map((item, index) => {
                  const isActive = selectedSeasonIndex === index;
                  return (
                    <button
                      key={item.season}
                      onClick={() => setSelectedSeasonIndex(index)}
                      className="group flex flex-col items-center gap-2 cursor-pointer transition-all duration-300 relative focus:outline-none"
                    >
                      <span
                        className={`text-xs md:text-sm font-mono tracking-widest uppercase transition-colors ${
                          isActive
                            ? "text-[#D4FF00] font-bold scale-110"
                            : "text-[#8E8E9A] hover:text-[#F6F3EF]"
                        }`}
                      >
                        {item.season.split("/")[0]}
                      </span>

                      {/* Vertical Tick Mark */}
                      <span
                        className={`h-4 w-px transition-colors ${
                          isActive ? "bg-[#D4FF00] h-6" : "bg-[#23232C] group-hover:bg-[#8E8E9A]"
                        }`}
                      />

                      {/* Active Year Dot */}
                      {isActive && (
                        <span className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-[#D4FF00] shadow-[0_0_8px_#D4FF00]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Selected Season Detail Label */}
              <div className="flex flex-col sm:flex-row items-center justify-between mt-4 text-xs font-mono text-[#8E8E9A]">
                <span>
                  EDISI:{" "}
                  <strong className="text-[#F6F3EF] uppercase">
                    {currentRecord.season}
                  </strong>{" "}
                  — {currentRecord.status === "ongoing" ? "SEDANG BERJALAN" : "SELESAI"}
                </span>
                <span className="text-[#D4FF00]">
                  VENUE UTAMA: {currentRecord.topVenue}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. On-Total-Yards (Mega Number Display: 70vw) ala jjettas */}
      <section
        id="attendance-total"
        data-section="on-total-yards"
        data-tone="dark"
        className="relative flex flex-col items-center justify-center overflow-hidden px-4 pt-10 pb-24 md:-mt-[25vh] md:min-h-[85vh] bg-[#0B0A0F] border-b border-[#23232C]/60 select-none"
        aria-label="Total Penonton Stadion Musim Ini"
      >
        <div className="relative w-full max-w-7xl flex flex-col items-center text-center">
          {/* Subtle Ambient Radial Light */}
          <div
            className="absolute inset-0 pointer-events-none opacity-25"
            style={{
              backgroundImage:
                "radial-gradient(ellipse at center, #D4FF00 0%, transparent 60%)",
              filter: "blur(110px)",
            }}
          />

          {/* Ultra Mega 70vw Numeric Counter */}
          <div className="relative w-full overflow-hidden">
            <div
              ref={megaCounterRef}
              className="font-anton uppercase tracking-tighter text-[#F6F3EF] whitespace-nowrap text-center leading-[0.78]"
              style={{
                fontSize: "clamp(60px, 16vw, 240px)",
              }}
            >
              {currentRecord.totalSpectators.toLocaleString("id-ID")}
            </div>
          </div>

          {/* Monospace Sub-label */}
          <div className="mt-8 flex flex-col items-center gap-2">
            <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.3em] text-[#8E8E9A]">
              TOTAL KEHADIRAN SUPORTER MUSIM {currentRecord.season}
            </p>
            <p className="text-[11px] font-mono text-[#D4FF00] uppercase tracking-wider max-w-md">
              &ldquo;{currentRecord.note}&rdquo;
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

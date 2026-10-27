"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ATTENDANCE_TIMELINE, SeasonAttendanceRecord } from "@/data/liga1Data";
import { Calendar, TrendingUp, MapPin, Users, Award } from "lucide-react";

export default function SeasonTimeline() {
  const [selectedSeasonIndex, setSelectedSeasonIndex] = useState(
    ATTENDANCE_TIMELINE.length - 1
  );
  const currentRecord: SeasonAttendanceRecord =
    ATTENDANCE_TIMELINE[selectedSeasonIndex];

  const counterRef = useRef<HTMLSpanElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Maximum attendance across all seasons for relative progress calculation
  const maxAttendance = Math.max(
    ...ATTENDANCE_TIMELINE.map((item) => item.totalSpectators)
  );

  useEffect(() => {
    const el = counterRef.current;
    if (!el) return;

    const obj = { val: 0 };
    const targetVal = currentRecord.totalSpectators;

    const tween = gsap.to(obj, {
      val: targetVal,
      duration: 1.2,
      ease: "power2.out",
      onUpdate: () => {
        el.textContent = Math.floor(obj.val).toLocaleString("id-ID");
      },
    });

    return () => {
      tween.kill();
    };
  }, [selectedSeasonIndex, currentRecord.totalSpectators]);

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative py-24 px-4 sm:px-8 border-t border-[#23232C] bg-[#0A0A0C] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-[#D4FF00]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#D4FF00]" />
              <span className="text-xs font-mono tracking-widest text-[#D4FF00] uppercase">
                REKOR KEHADIRAN STADION // 2021 - 2027
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight font-anton text-[#F4F4F6] leading-none">
              GELOMBANG SUPORTER
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#8E8E9A] font-sans">
            Transformasi atmosfer sepak bola tanah air dari era sistem bubble tanpa penonton hingga mencetak rekor jutaan suporter di tribun setiap musimnya.
          </p>
        </div>

        {/* Season Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 scrollbar-none">
          {ATTENDANCE_TIMELINE.map((item, index) => {
            const isActive = selectedSeasonIndex === index;
            return (
              <button
                key={item.season}
                onClick={() => setSelectedSeasonIndex(index)}
                className={`relative px-5 py-3 rounded-xl font-mono text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-300 flex items-center gap-2 border ${
                  isActive
                    ? "bg-[#D4FF00] text-[#0A0A0C] border-[#D4FF00] font-bold shadow-[0_0_20px_rgba(212,255,0,0.25)] scale-105"
                    : "bg-[#131318] text-[#8E8E9A] border-[#23232C] hover:border-[#D4FF00]/40 hover:text-[#F4F4F6]"
                }`}
              >
                <Calendar className={`w-3.5 h-3.5 ${isActive ? "text-[#0A0A0C]" : "text-[#8E8E9A]"}`} />
                <span>{item.season}</span>
                {item.status === "ongoing" && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-full uppercase font-bold ${
                      isActive ? "bg-[#0A0A0C] text-[#D4FF00]" : "bg-[#D4FF00]/10 text-[#D4FF00]"
                    }`}
                  >
                    LIVE
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Main Attendance Display Card */}
        <div className="mt-8 p-6 sm:p-10 lg:p-12 rounded-3xl bg-[#131318]/90 border border-[#23232C] backdrop-blur-xl relative overflow-hidden">
          {/* Subtle Year Backdrop */}
          <div className="absolute right-4 bottom-2 text-8xl sm:text-[14rem] md:text-[18rem] font-anton text-[#F4F4F6]/[0.03] select-none pointer-events-none leading-none">
            {currentRecord.season.split("/")[0]}
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Giant Attendance Counter */}
            <div className="lg:col-span-7 flex flex-col">
              <span className="text-xs sm:text-sm font-mono tracking-widest uppercase text-[#8E8E9A] mb-2 flex items-center gap-2">
                <Users className="w-4 h-4 text-[#D4FF00]" />
                TOTAL KEHADIRAN SUPORTER MUSIM {currentRecord.season}
              </span>

              <div className="flex items-baseline font-mono tracking-tighter">
                <span
                  ref={counterRef}
                  className="text-6xl sm:text-8xl md:text-9xl font-bold text-[#F4F4F6] tabular-nums leading-none"
                >
                  0
                </span>
                <span className="text-xl sm:text-3xl font-sans text-[#D4FF00] ml-3 uppercase font-bold">
                  JIWA
                </span>
              </div>

              {/* Progress relative to peak */}
              <div className="mt-8">
                <div className="flex justify-between items-center text-xs font-mono text-[#8E8E9A] mb-2">
                  <span>OKUPANSI TRIBUN DIBANDING REKOR TERTINGGI</span>
                  <span className="text-[#D4FF00] font-bold">
                    {maxAttendance > 0
                      ? Math.round((currentRecord.totalSpectators / maxAttendance) * 100)
                      : 0}
                    %
                  </span>
                </div>
                <div className="h-2 w-full bg-[#0A0A0C] rounded-full overflow-hidden border border-[#23232C]">
                  <div
                    className="h-full bg-gradient-to-r from-[#00529C] via-[#0070BA] to-[#D4FF00] transition-all duration-700 ease-out"
                    style={{
                      width: `${
                        maxAttendance > 0
                          ? (currentRecord.totalSpectators / maxAttendance) * 100
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              <p className="mt-6 text-sm text-[#8E8E9A] font-sans border-l-2 border-[#D4FF00] pl-4 italic">
                &ldquo;{currentRecord.note}&rdquo;
              </p>
            </div>

            {/* Right: Key Milestones for Selected Season */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {/* Box 1: Highest Attendance Match */}
              <div className="p-5 rounded-2xl bg-[#0A0A0C]/80 border border-[#23232C]">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8E8E9A] mb-2">
                  <Award className="w-4 h-4 text-[#D4FF00]" />
                  <span>Pertandingan Teramai</span>
                </div>
                <p className="text-base sm:text-lg font-bold text-[#F4F4F6] font-mono leading-snug">
                  {currentRecord.highestMatch}
                </p>
              </div>

              {/* Box 2: Average Attendance */}
              <div className="p-5 rounded-2xl bg-[#0A0A0C]/80 border border-[#23232C]">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8E8E9A] mb-2">
                  <TrendingUp className="w-4 h-4 text-[#D4FF00]" />
                  <span>Rata-Rata Per Laga</span>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-[#D4FF00] font-mono tabular-nums">
                  {currentRecord.avgPerMatch.toLocaleString("id-ID")}{" "}
                  <span className="text-xs text-[#8E8E9A] font-normal">PENONTON</span>
                </p>
              </div>

              {/* Box 3: Venue of the Season */}
              <div className="p-5 rounded-2xl bg-[#0A0A0C]/80 border border-[#23232C] sm:col-span-2 lg:col-span-1">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[#8E8E9A] mb-2">
                  <MapPin className="w-4 h-4 text-[#D4FF00]" />
                  <span>Venue Paling Bergemuruh</span>
                </div>
                <p className="text-base font-medium text-[#F4F4F6] font-sans">
                  {currentRecord.topVenue}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { STANDINGS_DATA, FIXTURES_WEEK_7 } from "@/data/liga1Data";
import { Trophy, CalendarDays, Tv, MapPin, Search } from "lucide-react";

export default function StandingsAndSchedule() {
  const [activeTab, setActiveTab] = useState<"standings" | "fixtures">("standings");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStandings = STANDINGS_DATA.filter(
    (row) =>
      row.clubName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section
      id="standings"
      data-section="on-career"
      data-tone="dark"
      className="relative mx-auto max-w-[1728px] px-6 py-20 md:px-14 md:py-28 bg-[#0B0A0F] border-t border-[#23232C]/80"
      aria-label="Liga 1 Standings & Fixtures"
    >
      {/* 2-Column Grid ala jjettas on-career section */}
      <div className="grid gap-12 lg:grid-cols-[minmax(320px,min(32vw,480px))_1fr] lg:gap-16 items-start">
        {/* COLUMN 1 (LEFT): Editorial Heading + Stadium Atmosphere Portrait (4:5) */}
        <div className="flex flex-col">
          {/* Main Display Title */}
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#D4FF00]" />
            <span className="text-xs font-mono tracking-widest text-[#D4FF00] uppercase">
              PANGGUNG KOMPETISI RESMI
            </span>
          </div>

          <h2
            className="font-anton uppercase tracking-tight text-[#F6F3EF] leading-none"
            style={{ fontSize: "clamp(48px, 5.5vw, 84px)" }}
          >
            KLASEMEN & JADWAL
          </h2>

          <p className="label-sm mt-3 font-mono text-xs text-[#8E8E9A] uppercase tracking-wider">
            BRI SUPER LEAGUE // MUSIM 2026/2027
          </p>

          {/* Editorial Portrait (4:5 Aspect Ratio) ala jjettas */}
          <div className="relative mt-8 aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[#23232C] bg-[#131318] shadow-2xl group">
            <Image
              src="/images/stadium_fans.jpg"
              alt="Atmosfer Tribun Liga 1"
              fill
              className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 filter saturate-[1.2]"
            />
            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B0A0F] via-transparent to-transparent opacity-90" />
            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#D4FF00]">
                ATMOSFER PEKAN 07
              </span>
              <p className="text-base font-bold text-[#F6F3EF] font-mono leading-tight mt-1">
                Stadion Gelora Bandung Lautan Api
              </p>
              <p className="text-xs text-[#8E8E9A] mt-1 font-sans">
                38.000 suporter bersatu dalam persaingan kasta tertinggi sepak bola tanah air.
              </p>
            </div>
          </div>

          {/* Matchday 7 Highlight Info Card */}
          <div className="mt-6 p-5 rounded-xl bg-[#131318]/70 border border-[#23232C] flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-[#8E8E9A] uppercase">BIG MATCH PEKAN INI</span>
              <span className="px-2 py-0.5 rounded bg-[#D4FF00] text-[#0B0A0F] font-bold text-[10px]">
                LIVE INDOSIAR
              </span>
            </div>
            <p className="text-sm font-bold text-[#F6F3EF] font-mono">
              PERSIB BANDUNG vs PERSIJA JAKARTA
            </p>
            <p className="text-xs text-[#8E8E9A] font-sans">
              Minggu, 15:30 WIB • Gelora Bandung Lautan Api
            </p>
          </div>
        </div>

        {/* COLUMN 2 (RIGHT): Tab Controls + Standings Table / Fixtures */}
        <div className="flex flex-col gap-6">
          {/* Top Controls: Tabs & Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pb-4 border-b border-[#23232C]">
            {/* Tab Buttons */}
            <div className="flex items-center p-1 rounded-xl bg-[#131318] border border-[#23232C]">
              <button
                onClick={() => setActiveTab("standings")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  activeTab === "standings"
                    ? "bg-[#D4FF00] text-[#0A0A0C] font-bold shadow-[0_0_15px_rgba(212,255,0,0.25)]"
                    : "text-[#8E8E9A] hover:text-[#F6F3EF]"
                }`}
              >
                <Trophy className="w-3.5 h-3.5" />
                <span>Klasemen (18 Klub)</span>
              </button>
              <button
                onClick={() => setActiveTab("fixtures")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                  activeTab === "fixtures"
                    ? "bg-[#D4FF00] text-[#0A0A0C] font-bold shadow-[0_0_15px_rgba(212,255,0,0.25)]"
                    : "text-[#8E8E9A] hover:text-[#F6F3EF]"
                }`}
              >
                <CalendarDays className="w-3.5 h-3.5" />
                <span>Jadwal Pekan 7</span>
              </button>
            </div>

            {/* Quick Search Bar */}
            {activeTab === "standings" && (
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#8E8E9A]" />
                <input
                  type="text"
                  placeholder="Cari klub..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#131318] border border-[#23232C] rounded-xl text-xs font-mono text-[#F6F3EF] placeholder-[#8E8E9A] focus:outline-none focus:border-[#D4FF00]"
                />
              </div>
            )}
          </div>

          {/* TAB 1: KLASEMEN TABULAR TABLE */}
          {activeTab === "standings" && (
            <div className="flex flex-col gap-4 animate-in fade-in duration-300">
              <div className="overflow-x-auto rounded-2xl border border-[#23232C] bg-[#131318]/90 backdrop-blur-xl">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-[#23232C] text-[11px] font-mono uppercase tracking-wider text-[#8E8E9A] bg-[#0A0A0C]/70">
                      <th className="py-3.5 px-4 w-12 text-center">POS</th>
                      <th className="py-3.5 px-4 min-w-[200px]">KLUB</th>
                      <th className="py-3.5 px-3 text-center">MAIN</th>
                      <th className="py-3.5 px-3 text-center">M</th>
                      <th className="py-3.5 px-3 text-center">S</th>
                      <th className="py-3.5 px-3 text-center">K</th>
                      <th className="py-3.5 px-3 text-center">SG</th>
                      <th className="py-3.5 px-4 text-center font-bold text-[#D4FF00]">POIN</th>
                      <th className="py-3.5 px-4 text-center min-w-[120px]">BENTUK FORM</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#23232C]/60 text-xs font-mono">
                    {filteredStandings.map((row) => {
                      const isChampionship = row.position <= 4;
                      const isRelegation = row.position >= 16;

                      return (
                        <tr
                          key={row.position}
                          className="hover:bg-[#1C1C24]/80 transition-colors duration-150 group"
                        >
                          {/* Position with Status Badge */}
                          <td className="py-3.5 px-4 text-center">
                            <span
                              className={`inline-flex items-center justify-center w-6 h-6 rounded-md font-bold text-xs ${
                                isChampionship
                                  ? "bg-[#D4FF00] text-[#0A0A0C]"
                                  : isRelegation
                                  ? "bg-[#E42313] text-white"
                                  : "text-[#8E8E9A]"
                              }`}
                            >
                              {row.position}
                            </span>
                          </td>

                          {/* Club Name & City */}
                          <td className="py-3.5 px-4">
                            <div className="flex flex-col">
                              <span className="font-bold text-[#F6F3EF] group-hover:text-[#D4FF00] transition-colors">
                                {row.clubName}
                              </span>
                              <span className="text-[10px] text-[#8E8E9A] uppercase tracking-wider">
                                {row.stadium}
                              </span>
                            </div>
                          </td>

                          {/* Stats */}
                          <td className="py-3.5 px-3 text-center text-[#8E8E9A] tabular-nums">
                            {row.played}
                          </td>
                          <td className="py-3.5 px-3 text-center text-[#8E8E9A] tabular-nums">
                            {row.won}
                          </td>
                          <td className="py-3.5 px-3 text-center text-[#8E8E9A] tabular-nums">
                            {row.drawn}
                          </td>
                          <td className="py-3.5 px-3 text-center text-[#8E8E9A] tabular-nums">
                            {row.lost}
                          </td>
                          <td className="py-3.5 px-3 text-center tabular-nums">
                            <span
                              className={
                                row.goalDifference > 0
                                  ? "text-[#D4FF00]"
                                  : row.goalDifference < 0
                                  ? "text-[#E42313]"
                                  : "text-[#8E8E9A]"
                              }
                            >
                              {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                            </span>
                          </td>

                          {/* Points */}
                          <td className="py-3.5 px-4 text-center font-bold text-[#D4FF00] text-sm tabular-nums">
                            {row.points}
                          </td>

                          {/* Form Streak */}
                          <td className="py-3.5 px-4 text-center">
                            <div className="flex items-center justify-center gap-1">
                              {row.form.map((res, i) => (
                                <span
                                  key={i}
                                  className={`w-4 h-4 rounded-sm flex items-center justify-center text-[9px] font-bold ${
                                    res === "W"
                                      ? "bg-[#D4FF00] text-[#0A0A0C]"
                                      : res === "D"
                                      ? "bg-[#8E8E9A] text-[#0A0A0C]"
                                      : "bg-[#E42313] text-white"
                                  }`}
                                >
                                  {res}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Legend Bar */}
              <div className="flex items-center justify-between text-[11px] font-mono text-[#8E8E9A] px-2">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#D4FF00]" />
                    Championship Series (1-4)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#E42313]" />
                    Zona Degradasi (16-18)
                  </span>
                </div>
                <span>Update Resmi: Pekan 07</span>
              </div>
            </div>
          )}

          {/* TAB 2: FIXTURES JADWAL PEKAN 7 */}
          {activeTab === "fixtures" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in duration-300">
              {FIXTURES_WEEK_7.map((fix) => (
                <div
                  key={fix.id}
                  className="p-5 rounded-2xl bg-[#131318]/90 border border-[#23232C] hover:border-[#D4FF00]/40 transition-all flex flex-col justify-between gap-4"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-[#8E8E9A]">
                    <div className="flex items-center gap-2">
                      <CalendarDays className="w-3.5 h-3.5 text-[#D4FF00]" />
                      <span>{fix.dayName}</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-[#0A0A0C] border border-[#23232C] text-[#D4FF00] font-bold">
                      {fix.time}
                    </span>
                  </div>

                  {/* Matchup Clubs */}
                  <div className="flex items-center justify-between gap-4 py-2">
                    <span className="text-sm font-bold text-[#F6F3EF] font-mono flex-1 text-right">
                      {fix.homeClub.name}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#0A0A0C] font-mono font-bold text-xs text-[#8E8E9A]">
                      VS
                    </span>
                    <span className="text-sm font-bold text-[#F6F3EF] font-mono flex-1 text-left">
                      {fix.awayClub.name}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-[#23232C]/60 text-xs font-mono text-[#8E8E9A]">
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#8E8E9A]" />
                      <span className="truncate max-w-[160px]">{fix.stadium}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#D4FF00]">
                      <Tv className="w-3.5 h-3.5" />
                      <span>{fix.broadcast}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

"use client";

import { useState } from "react";
import { STANDINGS_DATA, FIXTURES_WEEK_7, StandingsRow, MatchFixture } from "@/data/liga1Data";
import { Trophy, CalendarDays, Tv, MapPin, Search } from "lucide-react";

export default function StandingsAndSchedule() {
  const [activeTab, setActiveTab] = useState<"standings" | "fixtures">("standings");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredStandings = STANDINGS_DATA.filter((row) =>
    row.clubName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section
      id="standings"
      className="relative py-24 px-4 sm:px-8 border-t border-[#23232C] bg-[#0A0A0C]"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#00529C]" />
              <span className="text-xs font-mono tracking-widest text-[#0070BA] uppercase">
                KOMPETISI RESMI // BRI SUPER LEAGUE 2026/27
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight font-anton text-[#F4F4F6] leading-none">
              PANGGUNG PERSAINGAN
            </h2>
          </div>

          {/* Tab Selector */}
          <div className="flex items-center p-1 rounded-2xl bg-[#131318] border border-[#23232C]">
            <button
              onClick={() => setActiveTab("standings")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                activeTab === "standings"
                  ? "bg-[#D4FF00] text-[#0A0A0C] font-bold shadow-[0_0_15px_rgba(212,255,0,0.2)]"
                  : "text-[#8E8E9A] hover:text-[#F4F4F6]"
              }`}
            >
              <Trophy className="w-4 h-4" />
              <span>Klasemen (18 Klub)</span>
            </button>
            <button
              onClick={() => setActiveTab("fixtures")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
                activeTab === "fixtures"
                  ? "bg-[#D4FF00] text-[#0A0A0C] font-bold shadow-[0_0_15px_rgba(212,255,0,0.2)]"
                  : "text-[#8E8E9A] hover:text-[#F4F4F6]"
              }`}
            >
              <CalendarDays className="w-4 h-4" />
              <span>Jadwal Pekan 7</span>
            </button>
          </div>
        </div>

        {/* VIEW 1: STANDINGS TABLE */}
        {activeTab === "standings" && (
          <div className="flex flex-col gap-4 animate-in fade-in duration-300">
            {/* Search and Legend */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#131318]/60 border border-[#23232C]">
              {/* Search Bar */}
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8E8E9A]" />
                <input
                  type="text"
                  placeholder="Cari klub..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#0A0A0C] border border-[#23232C] rounded-xl text-xs font-mono text-[#F4F4F6] placeholder-[#8E8E9A] focus:outline-none focus:border-[#D4FF00]"
                />
              </div>

              {/* Qualification Legend */}
              <div className="flex items-center gap-4 text-[11px] font-mono text-[#8E8E9A]">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D4FF00]" />
                  <span>Zona Championship (1-4)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E42313]" />
                  <span>Zona Degradasi (16-18)</span>
                </div>
              </div>
            </div>

            {/* Table Container */}
            <div className="overflow-x-auto rounded-2xl border border-[#23232C] bg-[#131318]/90 backdrop-blur-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-[#23232C] text-[11px] font-mono uppercase tracking-wider text-[#8E8E9A] bg-[#0A0A0C]/50">
                    <th className="py-4 px-4 w-12 text-center">POS</th>
                    <th className="py-4 px-4 min-w-[200px]">KLUB</th>
                    <th className="py-4 px-3 text-center">MAIN</th>
                    <th className="py-4 px-3 text-center">M</th>
                    <th className="py-4 px-3 text-center">S</th>
                    <th className="py-4 px-3 text-center">K</th>
                    <th className="py-4 px-3 text-center hidden md:table-cell">GM</th>
                    <th className="py-4 px-3 text-center hidden md:table-cell">GK</th>
                    <th className="py-4 px-3 text-center font-bold">SG</th>
                    <th className="py-4 px-4 text-center font-bold text-[#D4FF00]">POIN</th>
                    <th className="py-4 px-4 text-center hidden lg:table-cell min-w-[130px]">FORM</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#23232C]/60 text-sm font-mono">
                  {filteredStandings.map((club: StandingsRow) => {
                    const isTop4 = club.rank <= 4;
                    const isRelegation = club.rank >= 16;

                    return (
                      <tr
                        key={club.clubId}
                        className={`hover:bg-[#1A1A22] transition-colors ${
                          isTop4 ? "bg-[#D4FF00]/[0.02]" : ""
                        }`}
                      >
                        {/* Position */}
                        <td className="py-3 px-4 text-center">
                          <span
                            className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold ${
                              isTop4
                                ? "bg-[#D4FF00] text-[#0A0A0C]"
                                : isRelegation
                                ? "bg-[#E42313] text-white"
                                : "bg-[#23232C] text-[#F4F4F6]"
                            }`}
                          >
                            {club.rank}
                          </span>
                        </td>

                        {/* Club Name & Badge */}
                        <td className="py-3 px-4 font-sans font-semibold text-[#F4F4F6] flex items-center gap-3">
                          <span className="w-2.5 h-6 rounded-full bg-[#23232C] inline-block" />
                          <div className="flex flex-col">
                            <span className="text-sm font-bold tracking-tight">
                              {club.clubName}
                            </span>
                            <span className="text-[10px] font-mono text-[#8E8E9A] uppercase tracking-wider">
                              {club.code}
                            </span>
                          </div>
                        </td>

                        {/* Matches Played */}
                        <td className="py-3 px-3 text-center text-[#8E8E9A]">{club.played}</td>
                        {/* Won */}
                        <td className="py-3 px-3 text-center text-[#F4F4F6]">{club.won}</td>
                        {/* Drawn */}
                        <td className="py-3 px-3 text-center text-[#8E8E9A]">{club.drawn}</td>
                        {/* Lost */}
                        <td className="py-3 px-3 text-center text-[#8E8E9A]">{club.lost}</td>
                        {/* Goals For */}
                        <td className="py-3 px-3 text-center text-[#8E8E9A] hidden md:table-cell">
                          {club.goalsFor}
                        </td>
                        {/* Goals Against */}
                        <td className="py-3 px-3 text-center text-[#8E8E9A] hidden md:table-cell">
                          {club.goalsAgainst}
                        </td>
                        {/* Goal Diff */}
                        <td className="py-3 px-3 text-center font-bold">
                          <span
                            className={
                              club.goalDifference > 0
                                ? "text-[#D4FF00]"
                                : club.goalDifference < 0
                                ? "text-[#E42313]"
                                : "text-[#8E8E9A]"
                            }
                          >
                            {club.goalDifference > 0 ? `+${club.goalDifference}` : club.goalDifference}
                          </span>
                        </td>
                        {/* Points */}
                        <td className="py-3 px-4 text-center font-bold text-base text-[#D4FF00] tabular-nums">
                          {club.points}
                        </td>
                        {/* Form Last 5 */}
                        <td className="py-3 px-4 text-center hidden lg:table-cell">
                          <div className="flex items-center justify-center gap-1.5">
                            {club.form.map((res, i) => (
                              <span
                                key={i}
                                className={`w-5 h-5 rounded text-[10px] font-bold flex items-center justify-center ${
                                  res === "W"
                                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                                    : res === "D"
                                    ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                                    : "bg-rose-500/20 text-rose-400 border border-rose-500/40"
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
          </div>
        )}

        {/* VIEW 2: FIXTURES PEKAN 7 */}
        {activeTab === "fixtures" && (
          <div className="flex flex-col gap-6 animate-in fade-in duration-300">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#131318]/60 border border-[#23232C]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4FF00] animate-pulse" />
                <span className="text-xs font-mono uppercase text-[#F4F4F6] font-bold">
                  9 PERTANDINGAN PEKAN 7 // JADWAL RESMI
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#8E8E9A]">
                WAKTU INDONESIA BARAT (WIB)
              </span>
            </div>

            {/* Fixtures Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {FIXTURES_WEEK_7.map((fixture: MatchFixture) => (
                <div
                  key={fixture.id}
                  className={`p-5 rounded-2xl bg-[#131318]/90 border transition-all duration-300 hover:border-[#D4FF00]/50 relative overflow-hidden group ${
                    fixture.isBigMatch
                      ? "border-[#D4FF00]/30 shadow-[0_0_20px_rgba(212,255,0,0.06)]"
                      : "border-[#23232C]"
                  }`}
                >
                  {/* Big match badge */}
                  {fixture.isBigMatch && (
                    <div className="absolute top-0 right-0 px-3 py-1 bg-[#D4FF00] text-[#0A0A0C] text-[9px] font-mono font-bold uppercase rounded-bl-xl tracking-wider">
                      SUPER BIG MATCH
                    </div>
                  )}

                  {/* Date & Time */}
                  <div className="flex items-center gap-2 text-xs font-mono text-[#8E8E9A] mb-4">
                    <span>{fixture.dayName}</span>
                    <span>•</span>
                    <span className="text-[#D4FF00] font-bold">{fixture.time}</span>
                  </div>

                  {/* Clubs Faceoff */}
                  <div className="flex items-center justify-between gap-3 py-3 border-y border-[#23232C]/60 my-2">
                    {/* Home Club */}
                    <div className="flex-1 flex flex-col items-start">
                      <span className="text-base font-bold text-[#F4F4F6] font-sans group-hover:text-[#D4FF00] transition-colors leading-tight">
                        {fixture.homeClub.name}
                      </span>
                      <span className="text-[10px] font-mono text-[#8E8E9A]">TUAN RUMAH</span>
                    </div>

                    <div className="px-3 py-1 rounded-lg bg-[#0A0A0C] border border-[#23232C] text-xs font-mono font-bold text-[#8E8E9A]">
                      VS
                    </div>

                    {/* Away Club */}
                    <div className="flex-1 flex flex-col items-end text-right">
                      <span className="text-base font-bold text-[#F4F4F6] font-sans group-hover:text-[#D4FF00] transition-colors leading-tight">
                        {fixture.awayClub.name}
                      </span>
                      <span className="text-[10px] font-mono text-[#8E8E9A]">TIM TAMU</span>
                    </div>
                  </div>

                  {/* Venue & Broadcast */}
                  <div className="flex items-center justify-between text-xs font-mono text-[#8E8E9A] pt-2">
                    <div className="flex items-center gap-1.5 truncate max-w-[65%]">
                      <MapPin className="w-3.5 h-3.5 text-[#D4FF00] flex-shrink-0" />
                      <span className="truncate">{fixture.stadium}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] text-[#F4F4F6] bg-[#0A0A0C] px-2 py-0.5 rounded border border-[#23232C]">
                      <Tv className="w-3 h-3 text-[#D4FF00]" />
                      <span>{fixture.broadcast}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

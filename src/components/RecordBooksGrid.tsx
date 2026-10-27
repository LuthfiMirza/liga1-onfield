"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RECORD_BOOKS_DATA, PlayerStat } from "@/data/liga1Data";
import { Target, Sparkles, Shield, Activity, Flame, Award, Users } from "lucide-react";

type FilterCategory = "all" | "scorer" | "assist" | "saves" | "passes" | "attendance";

const CATEGORIES = [
  { id: "all", label: "SEMUA REKOR", icon: Flame },
  { id: "scorer", label: "TOP SCORER", icon: Target },
  { id: "assist", label: "TOP ASSIST", icon: Sparkles },
  { id: "saves", label: "TOP SAVES", icon: Shield },
  { id: "passes", label: "TOP PASSES", icon: Activity },
  { id: "attendance", label: "REKOR PENONTON", icon: Users },
];

export default function RecordBooksGrid() {
  const [activeCategory, setActiveCategory] = useState<FilterCategory>("all");

  const filteredStats =
    activeCategory === "all"
      ? RECORD_BOOKS_DATA
      : RECORD_BOOKS_DATA.filter((stat) => stat.category === activeCategory);

  return (
    <section
      id="record-books"
      className="relative py-28 px-4 sm:px-8 border-t border-[#23232C] bg-[#0A0A0C] overflow-hidden"
    >
      {/* Background glow and lines */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-[#00529C]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#D4FF00]" />
              <span className="text-xs font-mono tracking-widest text-[#D4FF00] uppercase">
                REWRITING THE RECORD BOOKS // PUNCAK PERFORMA LIGA 1
              </span>
            </div>
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-bold uppercase tracking-tight font-anton text-[#F4F4F6] leading-[0.88]">
              INDIVIDUAL & STADIUM RECORDS
            </h2>
          </div>
          <p className="max-w-md text-sm sm:text-base text-[#8E8E9A] font-sans">
            Catatan rekor bersejarah sepak bola Indonesia. Dari mesin gol predator kotak penalti, visi magis playmaker, benteng tangguh di bawah mistar, hingga atmosfer gemuruh puluhan ribu suporter di tribun.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-6 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as FilterCategory)}
                className={`relative px-5 py-3 rounded-full text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all duration-300 flex items-center gap-2.5 border ${
                  isActive
                    ? "bg-[#D4FF00] text-[#0A0A0C] border-[#D4FF00] font-bold shadow-[0_0_25px_rgba(212,255,0,0.3)] scale-105"
                    : "bg-[#131318] text-[#8E8E9A] border-[#23232C] hover:border-[#D4FF00]/40 hover:text-[#F4F4F6]"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#0A0A0C]" : "text-[#D4FF00]"}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Animated Staggered Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4"
        >
          <AnimatePresence>
            {filteredStats.map((stat: PlayerStat) => {
              const isRankOne = stat.rank === 1;
              const formattedValue =
                stat.value >= 1000
                  ? stat.value.toLocaleString("id-ID")
                  : stat.value.toString();

              return (
                <motion.div
                  key={stat.id}
                  layout
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94, y: -20 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className={`p-6 sm:p-8 rounded-3xl bg-[#131318]/90 border backdrop-blur-xl relative overflow-hidden transition-all duration-300 group hover:border-[#D4FF00] ${
                    isRankOne
                      ? "border-[#D4FF00]/40 shadow-[0_10px_35px_-10px_rgba(212,255,0,0.15)]"
                      : "border-[#23232C]"
                  }`}
                >
                  {/* Club Accent Top Border Strip */}
                  <div
                    className="absolute top-0 left-0 right-0 h-1"
                    style={{ backgroundColor: stat.clubColor }}
                  />

                  {/* Header Row: Rank and Category */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold ${
                        isRankOne
                          ? "bg-[#D4FF00] text-[#0A0A0C]"
                          : "bg-[#0A0A0C] text-[#8E8E9A] border border-[#23232C]"
                      }`}
                    >
                      {isRankOne && <Award className="w-3.5 h-3.5" />}
                      <span>RANK #{stat.rank}</span>
                    </span>

                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#8E8E9A]">
                      {stat.category === "attendance" ? "STADION" : stat.category.toUpperCase()} • LIGA 1
                    </span>
                  </div>

                  {/* Extreme Stat Value */}
                  <div className="my-6">
                    <div className="flex items-baseline font-mono tracking-tighter">
                      <span className="text-6xl sm:text-7xl md:text-8xl font-bold tabular-nums text-[#F4F4F6] leading-none group-hover:text-[#D4FF00] transition-colors">
                        {formattedValue}
                      </span>
                      <span className="text-xs sm:text-sm font-bold font-mono text-[#D4FF00] ml-3 tracking-widest uppercase">
                        {stat.unit}
                      </span>
                    </div>
                  </div>

                  {/* Player & Club Identity */}
                  <div className="pt-4 border-t border-[#23232C]/80">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-xl sm:text-2xl font-bold font-anton tracking-tight text-[#F4F4F6] uppercase">
                        {stat.playerName}
                      </h3>
                      <span className="text-xs font-mono font-semibold text-[#8E8E9A]">
                        {stat.position}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <span
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: stat.clubColor }}
                      />
                      <span className="text-xs font-mono uppercase text-[#F4F4F6]">
                        {stat.clubName}
                      </span>
                    </div>

                    {/* Breakdown Detail */}
                    <p className="text-xs font-mono text-[#8E8E9A] mt-3 bg-[#0A0A0C] p-2.5 rounded-xl border border-[#23232C]">
                      {stat.detail}
                    </p>

                    {/* Efficiency Metric */}
                    <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-[#8E8E9A]">
                      <span>{stat.seasonStats.matches} Laga • {stat.seasonStats.minutes}&apos;</span>
                      <span className="text-[#D4FF00] font-bold">
                        {stat.seasonStats.efficiency}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

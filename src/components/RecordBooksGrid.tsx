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
      data-section="on-records"
      data-tone="dark"
      className="relative mx-auto max-w-[1728px] px-6 py-20 md:px-14 md:py-28 bg-[#0B0A0F] border-t border-[#23232C]/80"
      aria-label="Liga 1 Record Books"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#D4FF00]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header ala jjettas on-records */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#D4FF00]" />
            <span className="text-xs font-mono tracking-widest text-[#D4FF00] uppercase">
              REWRITING THE RECORD BOOKS
            </span>
          </div>
          <h2
            className="font-anton uppercase tracking-tight text-[#F6F3EF] leading-none"
            style={{ fontSize: "clamp(48px, 6vw, 92px)" }}
          >
            CATATAN REKOR
          </h2>
        </div>
        <p className="max-w-md text-xs sm:text-sm text-[#8E8E9A] font-sans leading-relaxed">
          Pencapaian bersejarah dari mesin gol tajam, playmaker visioner, penjaga gawang tangguh, hingga stadion tergemuruh di tanah air.
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
              className={`relative px-5 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-all duration-300 flex items-center gap-2 border ${
                isActive
                  ? "bg-[#D4FF00] text-[#0A0A0C] border-[#D4FF00] font-bold shadow-[0_0_20px_rgba(212,255,0,0.3)] scale-105"
                  : "bg-[#131318] text-[#8E8E9A] border-[#23232C] hover:border-[#D4FF00]/40 hover:text-[#F6F3EF]"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#0A0A0C]" : "text-[#D4FF00]"}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4-Column Athletic Trading Cards Grid ala jjettas on-records */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-4"
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
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94, y: -15 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#131318]/90 border backdrop-blur-xl relative overflow-hidden transition-all duration-300 group hover:border-[#D4FF00] min-h-[420px] ${
                  isRankOne
                    ? "border-[#D4FF00]/40 shadow-[0_12px_35px_-10px_rgba(212,255,0,0.18)]"
                    : "border-[#23232C]"
                }`}
              >
                {/* Accent Top Border */}
                <div
                  className="absolute top-0 left-0 right-0 h-1"
                  style={{ backgroundColor: stat.clubColor || "#D4FF00" }}
                />

                {/* Top Badge: Rank & Category */}
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                        isRankOne
                          ? "bg-[#D4FF00] text-[#0A0A0C]"
                          : "bg-[#0A0A0C] text-[#8E8E9A] border border-[#23232C]"
                      }`}
                    >
                      {isRankOne && <Award className="w-3 h-3" />}
                      <span>RANK #{stat.rank}</span>
                    </span>

                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#8E8E9A]">
                      {stat.category === "attendance" ? "STADION" : stat.category.toUpperCase()}
                    </span>
                  </div>

                  {/* Massive Hero Number at the Peak of Card ala jjettas */}
                  <div className="mt-8 mb-2">
                    <div className="font-anton uppercase tracking-tight text-[#F6F3EF] leading-[0.82] tabular-nums text-7xl sm:text-8xl group-hover:text-[#D4FF00] transition-colors">
                      {formattedValue}
                    </div>
                    <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D4FF00] mt-2 font-bold">
                      {stat.unit}
                    </p>
                  </div>
                </div>

                {/* Middle & Bottom: Headline, Athlete Name, Narrative */}
                <div className="pt-6 border-t border-[#23232C]/60 flex flex-col gap-2">
                  <h3 className="text-lg font-bold font-anton uppercase text-[#F6F3EF] leading-tight group-hover:text-[#D4FF00] transition-colors">
                    {stat.name}
                  </h3>

                  <div className="flex items-center justify-between text-xs font-mono text-[#8E8E9A]">
                    <span className="text-[#F6F3EF] font-medium">{stat.club}</span>
                    <span>{stat.detail}</span>
                  </div>

                  <p className="text-xs text-[#8E8E9A] font-sans leading-relaxed mt-2 line-clamp-3">
                    {stat.highlight}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}

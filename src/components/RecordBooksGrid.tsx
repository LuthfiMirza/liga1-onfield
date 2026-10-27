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
      data-tone="light"
      className="relative mx-auto max-w-[1728px] px-6 py-20 md:px-14 md:py-28 bg-[#F6F3EF] border-t border-[#E2DDD5]"
      aria-label="Liga 1 Record Books"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#00529C]/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header ala jjettas on-records */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#00529C]" />
            <span className="text-xs font-mono tracking-widest text-[#00529C] uppercase font-bold">
              REWRITING THE RECORD BOOKS
            </span>
          </div>
          <h2
            className="font-anton uppercase tracking-tight text-[#171220] leading-none"
            style={{ fontSize: "clamp(48px, 6vw, 92px)" }}
          >
            CATATAN REKOR
          </h2>
        </div>
        <p className="max-w-md text-xs sm:text-sm text-[#6E6D7A] font-sans leading-relaxed">
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
                  ? "bg-[#171220] text-[#D4FF00] border-[#171220] font-bold shadow-md scale-105"
                  : "bg-[#FFFFFF] text-[#6E6D7A] border-[#E2DDD5] hover:border-[#171220] hover:text-[#171220]"
              }`}
            >
              <Icon className={`w-3.5 h-3.5 ${isActive ? "text-[#D4FF00]" : "text-[#00529C]"}`} />
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
                className={`flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-[#FFFFFF] border shadow-sm relative overflow-hidden transition-all duration-300 group hover:border-[#171220] hover:shadow-xl min-h-[420px] ${
                  isRankOne
                    ? "border-[#171220] shadow-[0_12px_35px_-10px_rgba(0,0,0,0.08)]"
                    : "border-[#E2DDD5]"
                }`}
              >
                {/* Accent Top Border */}
                <div
                  className="absolute top-0 left-0 right-0 h-1.5"
                  style={{ backgroundColor: stat.clubColor || "#00529C" }}
                />

                {/* Top Badge: Rank & Category */}
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                        isRankOne
                          ? "bg-[#171220] text-[#D4FF00]"
                          : "bg-[#FAF8F5] text-[#6E6D7A] border border-[#E2DDD5]"
                      }`}
                    >
                      {isRankOne && <Award className="w-3 h-3 text-[#D4FF00]" />}
                      <span>RANK #{stat.rank}</span>
                    </span>

                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#6E6D7A]">
                      {stat.category === "attendance" ? "STADION" : stat.category.toUpperCase()}
                    </span>
                  </div>

                  {/* Massive Hero Number at the Peak of Card ala jjettas */}
                  <div className="mt-8 mb-2">
                    <div className="font-anton uppercase tracking-tight text-[#171220] leading-[0.82] tabular-nums text-7xl sm:text-8xl group-hover:text-[#00529C] transition-colors">
                      {formattedValue}
                    </div>
                    <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#00529C] mt-2 font-bold">
                      {stat.unit}
                    </p>
                  </div>
                </div>

                {/* Middle & Bottom: Headline, Athlete Name, Narrative */}
                <div className="pt-6 border-t border-[#E2DDD5] flex flex-col gap-2">
                  <h3 className="text-lg font-bold font-anton uppercase text-[#171220] leading-tight group-hover:text-[#00529C] transition-colors">
                    {stat.playerName}
                  </h3>

                  <div className="flex items-center justify-between text-xs font-mono text-[#6E6D7A]">
                    <span className="text-[#171220] font-semibold">{stat.clubName}</span>
                    <span>{stat.position}</span>
                  </div>

                  <p className="text-xs text-[#6E6D7A] font-sans leading-relaxed mt-2 line-clamp-3">
                    {stat.detail}
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

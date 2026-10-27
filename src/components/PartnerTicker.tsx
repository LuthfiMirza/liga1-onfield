"use client";

import { CLUBS_DATA, PARTNERS_DATA } from "@/data/liga1Data";
import { ShieldCheck, Award } from "lucide-react";

export default function PartnerTicker() {
  return (
    <section className="relative py-16 border-t border-[#E2DDD5] bg-[#F6F3EF] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 mb-8 text-center">
        <span className="text-xs font-mono tracking-widest text-[#6E6D7A] uppercase flex items-center justify-center gap-2 font-bold">
          <ShieldCheck className="w-4 h-4 text-[#00529C]" />
          EKOSISTEM KOMPETISI RESMI // 18 KLUB & MITRA STRATEGIS
        </span>
      </div>

      {/* Row 1: 18 Clubs Continuous Marquee */}
      <div className="relative w-full overflow-hidden flex whitespace-nowrap mb-6 py-2">
        <div className="flex animate-[marquee_35s_linear_infinite] gap-4 items-center">
          {[...CLUBS_DATA, ...CLUBS_DATA].map((club, idx) => (
            <div
              key={`${club.id}-${idx}`}
              className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#FFFFFF] border border-[#E2DDD5] hover:border-[#171220] shadow-sm transition-colors flex-shrink-0"
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: club.primaryColor }}
              />
              <span className="text-xs font-mono font-bold uppercase text-[#171220]">
                {club.name}
              </span>
              <span className="text-[10px] font-mono text-[#6E6D7A] px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E2DDD5]">
                {club.badgeText}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Partners & Sponsors Marquee in Reverse Direction */}
      <div className="relative w-full overflow-hidden flex whitespace-nowrap py-2">
        <div className="flex animate-[marquee-reverse_30s_linear_infinite] gap-4 items-center">
          {[...PARTNERS_DATA, ...PARTNERS_DATA, ...PARTNERS_DATA].map((partner, idx) => (
            <div
              key={`${partner.id}-${idx}`}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl border flex-shrink-0 shadow-sm ${
                partner.isMain
                  ? "bg-[#FFFFFF] border-[#00529C]/40 shadow-[0_4px_20px_rgba(0,82,156,0.08)]"
                  : "bg-[#FAF8F5] border-[#E2DDD5]"
              }`}
            >
              <Award className={`w-4 h-4 ${partner.isMain ? "text-[#00529C]" : "text-[#6E6D7A]"}`} />
              <div className="flex flex-col">
                <span className="text-xs font-mono font-bold uppercase text-[#171220]">
                  {partner.name}
                </span>
                <span className="text-[9px] font-mono tracking-wider text-[#6E6D7A] uppercase">
                  {partner.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

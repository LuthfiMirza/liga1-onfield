"use client";

import { CLUBS_DATA, PARTNERS_DATA } from "@/data/liga1Data";
import { ShieldCheck, Award } from "lucide-react";

export default function PartnerTicker() {
  return (
    <section className="relative py-16 border-t border-[#23232C] bg-[#0A0A0C] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 mb-8 text-center">
        <span className="text-xs font-mono tracking-widest text-[#8E8E9A] uppercase flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#D4FF00]" />
          EKOSISTEM KOMPETISI RESMI // 18 KLUB & MITRA STRATEGIS
        </span>
      </div>

      {/* Row 1: 18 Clubs Continuous Marquee */}
      <div className="relative w-full overflow-hidden flex whitespace-nowrap mb-6 py-2">
        <div className="flex animate-[marquee_35s_linear_infinite] gap-4 items-center">
          {[...CLUBS_DATA, ...CLUBS_DATA].map((club, idx) => (
            <div
              key={`${club.id}-${idx}`}
              className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#131318] border border-[#23232C] hover:border-[#D4FF00]/50 transition-colors flex-shrink-0"
            >
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: club.primaryColor }}
              />
              <span className="text-xs font-mono font-bold uppercase text-[#F4F4F6]">
                {club.name}
              </span>
              <span className="text-[10px] font-mono text-[#8E8E9A] px-1.5 py-0.5 rounded bg-[#0A0A0C]">
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
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl border flex-shrink-0 ${
                partner.isMain
                  ? "bg-[#131318] border-[#D4FF00]/30 shadow-[0_0_15px_rgba(212,255,0,0.08)]"
                  : "bg-[#0A0A0C] border-[#23232C]"
              }`}
            >
              <Award className={`w-4 h-4 ${partner.isMain ? "text-[#D4FF00]" : "text-[#8E8E9A]"}`} />
              <div className="flex flex-col">
                <span className="text-xs font-mono font-bold uppercase text-[#F4F4F6]">
                  {partner.name}
                </span>
                <span className="text-[9px] font-mono tracking-wider text-[#8E8E9A] uppercase">
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

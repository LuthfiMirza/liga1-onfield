"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NEWS_EDITORIAL_DATA, NewsItem } from "@/data/liga1Data";
import { Radio, Newspaper, ArrowRight, MapPin, Volume2 } from "lucide-react";

export default function InfluenceShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Kinetic Marquee Scroll Acceleration
      const marquee = marqueeRef.current;
      if (marquee) {
        gsap.to(marquee, {
          xPercent: -35,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        });
      }

      // 2. Horizontal Scroll pinning for the editorial cards on desktop
      const cards = cardsContainerRef.current;
      if (cards && window.innerWidth >= 768) {
        const totalScrollWidth = cards.scrollWidth - cards.clientWidth;

        gsap.to(cards, {
          x: () => -totalScrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${totalScrollWidth + 300}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="atmosphere"
      ref={sectionRef}
      className="relative min-h-screen py-24 border-t border-[#23232C] bg-[#0A0A0C] overflow-hidden flex flex-col justify-between"
    >
      {/* Background Kinetic Marquee */}
      <div className="absolute top-12 left-0 w-full overflow-hidden pointer-events-none select-none opacity-[0.06] z-0">
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap text-8xl sm:text-[12rem] md:text-[16rem] font-bold font-anton tracking-tighter uppercase text-[#F4F4F6]"
        >
          <span>ATMOSFER TRIBUN • DETAK NADI KULTUR BOLA • SUPORTER NUSANTARA • </span>
          <span>ATMOSFER TRIBUN • DETAK NADI KULTUR BOLA • SUPORTER NUSANTARA • </span>
        </div>
      </div>

      {/* Header Info */}
      <div className="relative z-10 px-4 sm:px-8 mx-auto max-w-7xl w-full mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Volume2 className="w-4 h-4 text-[#D4FF00] animate-pulse" />
          <span className="text-xs font-mono tracking-widest text-[#D4FF00] uppercase">
            ATMOSFER STADION & MEDIA // LIPUTAN KHUSUS
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight font-anton text-[#F4F4F6] leading-[0.88]">
            DI LUAR 90 MENIT
          </h2>
          <p className="max-w-md text-xs sm:text-sm text-[#8E8E9A] font-sans">
            Gairah tak terbendung dari tribun stadion termegah Indonesia. Simak sorotan eksklusif kultur suporter, derbi panas, dan aksi heroik para penggawa.
          </p>
        </div>
      </div>

      {/* Editorial Horizontal Scroller Track */}
      <div className="relative z-10 w-full overflow-hidden px-4 sm:px-8 my-auto">
        <div
          ref={cardsContainerRef}
          className="flex gap-6 md:gap-8 will-change-transform pb-6 md:pb-0"
        >
          {NEWS_EDITORIAL_DATA.map((item: NewsItem, idx: number) => (
            <article
              key={item.id}
              className="flex-shrink-0 w-[85vw] sm:w-[420px] lg:w-[480px] p-6 sm:p-8 rounded-3xl bg-[#131318]/95 border border-[#23232C] hover:border-[#D4FF00]/60 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Colored Accent Top Glow */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5 opacity-80"
                style={{ backgroundColor: item.accentColor }}
              />

              <div>
                {/* Meta category & date */}
                <div className="flex items-center justify-between text-xs font-mono text-[#8E8E9A] mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-[#0A0A0C] border border-[#23232C] text-[#D4FF00] text-[10px] font-bold uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span>{item.date}</span>
                </div>

                {/* Article Headline */}
                <h3 className="text-xl sm:text-2xl font-bold font-anton tracking-tight text-[#F4F4F6] uppercase leading-snug group-hover:text-[#D4FF00] transition-colors my-3">
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-[#8E8E9A] font-sans leading-relaxed mt-2 line-clamp-3">
                  {item.excerpt}
                </p>
              </div>

              {/* Bottom Venue & Read CTA */}
              <div className="pt-6 mt-6 border-t border-[#23232C] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#8E8E9A] truncate max-w-[65%]">
                  <MapPin className="w-3.5 h-3.5 text-[#D4FF00] flex-shrink-0" />
                  <span className="truncate">{item.venue}</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#F4F4F6] group-hover:text-[#D4FF00] transition-colors">
                  <span>BACA</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="relative z-10 px-4 sm:px-8 mx-auto max-w-7xl w-full flex items-center justify-between text-[11px] font-mono text-[#8E8E9A] mt-6">
        <span>GESER HORIZONTAL ATAU SCROLL UNTUK EKSPLORASI LIPUTAN</span>
        <span className="text-[#D4FF00] font-bold">4 LIPUTAN TERPILIH</span>
      </div>
    </section>
  );
}

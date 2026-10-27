"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NEWS_EDITORIAL_DATA, NewsItem } from "@/data/liga1Data";
import { Volume2, MapPin, ArrowRight, Play, Camera, Film } from "lucide-react";

interface MediaHighlight {
  id: string;
  title: string;
  type: "video" | "photo";
  duration?: string;
  venue: string;
  image: string;
  tag: string;
}

const MEDIA_HIGHLIGHTS: MediaHighlight[] = [
  {
    id: "media-1",
    title: "KOREOGRAFI 360 DERAJAT TRIBUN BONEK DI GELORA BUNG TOMO",
    type: "photo",
    venue: "Gelora Bung Tomo, Surabaya",
    image: "/images/stadium_fans.jpg",
    tag: "FAN CULTURE GALLERY",
  },
  {
    id: "media-2",
    title: "CUPLIKAN HIGHLIGHT: GOL SALTO DAVID DA SILVA MENIT 89'",
    type: "video",
    duration: "03:45",
    venue: "Gelora Bandung Lautan Api, Bandung",
    image: "/images/hero_stadium.jpg",
    tag: "MATCH HIGHLIGHTS",
  },
  {
    id: "media-3",
    title: "SOROTAN SUPORTER: GEMURUH JAKMANIA MEMBAKAR SEMANGAT JIS",
    type: "video",
    duration: "04:12",
    venue: "Jakarta International Stadium",
    image: "/images/stadium_fans.jpg",
    tag: "ULTRAS TRIBUNE",
  },
  {
    id: "media-4",
    title: "ATMOSFER DERBI ETAM: DETIK-DETIK PERAYAAN KEMENANGAN DI SEGIRI",
    type: "photo",
    venue: "Stadion Segiri, Samarinda",
    image: "/images/hero_stadium.jpg",
    tag: "POST-MATCH EMOTION",
  },
];

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

      // 2. Horizontal Scroll pinning for cards on desktop
      const cards = cardsContainerRef.current;
      if (cards && window.innerWidth >= 768) {
        const totalScrollWidth = cards.scrollWidth - cards.clientWidth;

        gsap.to(cards, {
          x: () => -totalScrollWidth,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: () => `+=${totalScrollWidth + 400}`,
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
      data-tone="light"
      className="relative min-h-screen py-24 border-t border-[#E2DDD5] bg-[#F6F3EF] overflow-hidden flex flex-col justify-between"
    >
      {/* Background Kinetic Marquee */}
      <div className="absolute top-12 left-0 w-full overflow-hidden pointer-events-none select-none opacity-[0.05] z-0">
        <div
          ref={marqueeRef}
          className="flex whitespace-nowrap text-8xl sm:text-[12rem] md:text-[16rem] font-bold font-anton tracking-tighter uppercase text-[#171220]"
        >
          <span>ATMOSFER TRIBUN • DETAK NADI KULTUR BOLA • SUPORTER NUSANTARA • </span>
          <span>ATMOSFER TRIBUN • DETAK NADI KULTUR BOLA • SUPORTER NUSANTARA • </span>
        </div>
      </div>

      {/* Header Info */}
      <div className="relative z-10 px-4 sm:px-8 mx-auto max-w-7xl w-full mb-8">
        <div className="flex items-center gap-2 mb-2">
          <Volume2 className="w-4 h-4 text-[#00529C] animate-pulse" />
          <span className="text-xs font-mono tracking-widest text-[#00529C] uppercase font-bold">
            ATMOSFER STADION & MEDIA // LIPUTAN BERITA & GALERI
          </span>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-bold uppercase tracking-tight font-anton text-[#171220] leading-[0.88]">
            DI LUAR 90 MENIT
          </h2>
          <p className="max-w-md text-xs sm:text-sm text-[#6E6D7A] font-sans">
            Gairah tak terbendung dari tribun stadion termegah Indonesia. Simak berita taktik terkini, galeri visual koreografi, dan cuplikan video aksi heroik pemain.
          </p>
        </div>
      </div>

      {/* Horizontal Scroller Track: News + Photo/Video Highlights */}
      <div className="relative z-10 w-full overflow-hidden px-4 sm:px-8 my-auto">
        <div
          ref={cardsContainerRef}
          className="flex gap-6 md:gap-8 will-change-transform pb-6 md:pb-0"
        >
          {/* 1. News Articles */}
          {NEWS_EDITORIAL_DATA.map((item: NewsItem) => (
            <article
              key={item.id}
              className="flex-shrink-0 w-[85vw] sm:w-[420px] lg:w-[460px] p-6 sm:p-8 rounded-3xl bg-[#FFFFFF] border border-[#E2DDD5] hover:border-[#171220] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Colored Accent Top Glow */}
              <div
                className="absolute top-0 left-0 right-0 h-1.5 opacity-90"
                style={{ backgroundColor: item.accentColor }}
              />

              <div>
                {/* Meta category & date */}
                <div className="flex items-center justify-between text-xs font-mono text-[#6E6D7A] mb-4">
                  <span className="px-2.5 py-1 rounded-full bg-[#FAF8F5] border border-[#E2DDD5] text-[#00529C] text-[10px] font-bold uppercase tracking-wider">
                    {item.category}
                  </span>
                  <span>{item.date}</span>
                </div>

                {/* Article Headline */}
                <h3 className="text-xl sm:text-2xl font-bold font-anton tracking-tight text-[#171220] uppercase leading-snug group-hover:text-[#00529C] transition-colors my-3">
                  {item.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm text-[#6E6D7A] font-sans leading-relaxed mt-2 line-clamp-3">
                  {item.excerpt}
                </p>
              </div>

              {/* Bottom Venue & Read CTA */}
              <div className="pt-6 mt-6 border-t border-[#E2DDD5] flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#6E6D7A] truncate max-w-[65%]">
                  <MapPin className="w-3.5 h-3.5 text-[#00529C] flex-shrink-0" />
                  <span className="truncate">{item.venue}</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-[#171220] group-hover:text-[#00529C] transition-colors">
                  <span>BACA</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </article>
          ))}

          {/* 2. Photo & Video Highlights Cards */}
          {MEDIA_HIGHLIGHTS.map((media) => (
            <div
              key={media.id}
              className="flex-shrink-0 w-[85vw] sm:w-[420px] lg:w-[460px] rounded-3xl bg-[#171220] border border-[#E2DDD5] hover:border-[#171220] transition-all duration-300 relative overflow-hidden flex flex-col justify-end p-6 sm:p-8 group min-h-[360px] shadow-lg"
            >
              {/* Background Thumbnail Image */}
              <Image
                src={media.image}
                alt={media.title}
                fill
                className="object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171220] via-[#171220]/60 to-transparent" />

              {/* Center Play Button for Video */}
              {media.type === "video" && (
                <div className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#D4FF00] text-[#171220] flex items-center justify-center shadow-[0_0_20px_rgba(212,255,0,0.4)] group-hover:scale-110 transition-transform">
                  <Play className="w-4 h-4 fill-[#171220] ml-0.5" />
                </div>
              )}

              {/* Top Tag */}
              <div className="relative z-10 flex items-center gap-2 mb-auto">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#171220]/80 border border-white/20 text-[10px] font-mono font-bold uppercase text-[#D4FF00] backdrop-blur-md">
                  {media.type === "video" ? (
                    <Film className="w-3 h-3" />
                  ) : (
                    <Camera className="w-3 h-3" />
                  )}
                  <span>{media.tag}</span>
                </span>
                {media.duration && (
                  <span className="text-[10px] font-mono text-white bg-[#171220]/80 px-2 py-0.5 rounded border border-white/20">
                    {media.duration}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="relative z-10 pt-8">
                <h3 className="text-xl sm:text-2xl font-bold font-anton tracking-tight text-white uppercase leading-tight group-hover:text-[#D4FF00] transition-colors mb-2">
                  {media.title}
                </h3>
                <div className="flex items-center gap-1.5 text-xs font-mono text-[#E2DDD5]">
                  <MapPin className="w-3.5 h-3.5 text-[#D4FF00]" />
                  <span>{media.venue}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="relative z-10 px-4 sm:px-8 mx-auto max-w-7xl w-full flex items-center justify-between text-[11px] font-mono text-[#6E6D7A] mt-6">
        <span>SCROLL / GESER UNTUK MELIHAT BERITA & GALERI VIDEO</span>
        <span className="text-[#00529C] font-bold">8 KONTEN MULTIMEDIA</span>
      </div>
    </section>
  );
}

"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown } from "lucide-react";

export default function HeroOnField() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinPaneRef = useRef<HTMLDivElement>(null);
  const bgVisualRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const quotePullRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Hero background zoom & fade as user scrolls through the 190vh track
      gsap.to(bgVisualRef.current, {
        scale: 1.15,
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      // 2. Title slight drift & fade on scroll
      gsap.to(titleRef.current, {
        yPercent: -20,
        opacity: 0.35,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "60% top",
          scrub: true,
        },
      });

      // 3. Pull-up quote reveal animation as it slides up over hero
      gsap.fromTo(
        quotePullRef.current,
        {
          opacity: 0.7,
        },
        {
          opacity: 1,
          ease: "none",
          scrollTrigger: {
            trigger: quotePullRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      {/* 1. On-Hero 190vh Pinned Stage */}
      <section
        id="hero"
        ref={containerRef}
        data-section="on-hero"
        className="relative w-full"
        style={{ overflowX: "clip" }}
      >
        <div className="relative" style={{ height: "190vh" }}>
          {/* Pinned Inner Pane */}
          <div
            ref={pinPaneRef}
            data-tone="dark"
            data-on-hero-pane="true"
            className="sticky top-0 z-0 h-screen w-full overflow-hidden bg-[#0B0A0F]"
            aria-label="On-Field Liga 1 Experience"
          >
            {/* Background Visual Container with Parallax Zoom */}
            <div
              ref={bgVisualRef}
              className="absolute inset-[-4%] will-change-transform z-0 select-none pointer-events-none"
            >
              <Image
                src="/images/hero_stadium.jpg"
                alt="Liga 1 Stadium On-Field Stage"
                fill
                priority
                className="object-cover object-center filter saturate-[1.3] contrast-[1.15] brightness-[1.1]"
              />

              {/* CRT Scanline Layer: Horizontal repeating bands */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, rgba(0, 0, 0, 0) 0px, rgba(0, 0, 0, 0) 3px, rgba(0, 0, 0, 0.55) 3px, rgba(0, 0, 0, 0.55) 5px)",
                }}
              />

              {/* CRT RGB Sub-pixel Overlay */}
              <div
                className="absolute inset-0 pointer-events-none hidden md:block"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(90deg, rgba(255, 40, 70, 0.7) 0px, rgba(255, 40, 70, 0.7) 2px, rgba(40, 255, 120, 0.7) 2px, rgba(40, 255, 120, 0.7) 4px, rgba(60, 90, 255, 0.7) 4px, rgba(60, 90, 255, 0.7) 6px)",
                  mixBlendMode: "overlay",
                  opacity: 0.25,
                }}
              />

              {/* Vignette Gradients ala jjettas */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 50%, rgba(11, 10, 15, 0.75) 100%)",
                }}
              />
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(45vw 35% at 0% 0%, rgba(11, 10, 15, 0.8), transparent 75%), radial-gradient(45vw 35% at 100% 0%, rgba(11, 10, 15, 0.8), transparent 75%), radial-gradient(60vw 55% at 0% 100%, rgba(11, 10, 15, 0.9), transparent 75%), radial-gradient(50vw 45% at 100% 100%, rgba(11, 10, 15, 0.9), transparent 75%)",
                }}
              />
            </div>

            {/* Pinned Chrome Overlay (Title, Badges) */}
            <div
              data-on-hero-chrome="true"
              className="pointer-events-none absolute inset-x-0 top-0 z-10 h-screen flex flex-col justify-between px-6 py-8 md:px-14 md:py-12 select-none"
            >
              {/* Top Navigation Row Space */}
              <div className="flex items-center justify-between w-full">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#131318]/80 border border-[#23232C] backdrop-blur-md">
                  <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-ping" />
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#F6F3EF]">
                    BRI SUPER LEAGUE 2026/27
                  </span>
                </div>
                <div className="hidden md:flex items-center gap-4 text-[11px] font-mono text-[#8E8E9A]">
                  <span>GBLA • GBT • JIS • SEGIPI</span>
                  <span className="text-[#D4FF00]">● MATCHDAY LIVE</span>
                </div>
              </div>

              {/* Bottom Area: Massive Stacking "ON-FIELD" Title (Left) + Matchday Badge (Right) */}
              <div className="relative flex flex-col md:flex-row items-start md:items-end justify-between gap-6 pb-4">
                {/* Massive Stacking Title ala jjettas: "On-" stacked with "Field" */}
                <h1
                  ref={titleRef}
                  data-hero-title="true"
                  aria-label="On-Field Liga 1"
                  className="relative z-10 uppercase text-[#F6F3EF] font-anton tracking-tighter select-none"
                  style={{
                    fontSize: "clamp(64px, 14.5vw, 212px)",
                    lineHeight: 0.75,
                    letterSpacing: "-0.02em",
                  }}
                >
                  <span className="block">On-</span>
                  <span className="block text-[#D4FF00]">Field</span>
                </h1>

                {/* Right Badge: Official Liga 1 / BRI Matchday Mark */}
                <div
                  ref={badgeRef}
                  data-hero-mark="true"
                  className="relative z-10 flex flex-col md:items-end gap-2"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex flex-col text-left md:text-right">
                      <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#8E8E9A]">
                        BRI SUPER LEAGUE
                      </span>
                      <span className="text-[11px] font-mono text-[#F6F3EF]">
                        EDISI RESMI 2026/2027
                      </span>
                    </div>
                    <div className="px-3 py-1.5 bg-[#D4FF00] text-[#0B0A0F] font-mono font-bold text-xs uppercase tracking-wider rounded-md shadow-[0_0_20px_rgba(212,255,0,0.35)]">
                      PEKAN 07
                    </div>
                  </div>
                  <p className="text-[10px] font-mono uppercase tracking-widest text-[#8E8E9A]">
                    18 KOTA • 306 PERTANDINGAN
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Pull-Up Quote Section ala jjettas (margin-top: -82vh) */}
      <div
        ref={quotePullRef}
        data-quote-pull="true"
        className="relative z-20 w-full overflow-hidden"
        style={{ marginTop: "-82vh" }}
      >
        <section
          data-tone="dark"
          className="relative flex min-h-[90vh] items-center justify-center px-6 py-24 md:py-36 bg-[#0B0A0F]/95 border-t border-[#23232C]/60 backdrop-blur-2xl"
          aria-label="Records are meant to be broken"
        >
          {/* Subtle Ambient Light Grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 50% 50%, #D4FF00 0%, transparent 65%)",
              filter: "blur(90px)",
            }}
          />

          <div className="relative z-10 mx-auto max-w-6xl text-center flex flex-col items-center">
            {/* Massive Dramatic Quote */}
            <blockquote
              className="display relative z-10 uppercase font-anton tracking-tight text-[#F6F3EF] select-none"
              style={{
                fontSize: "clamp(38px, 8.2vw, 142px)",
                lineHeight: 0.94,
              }}
            >
              <span>
                RECORDS ARE{" "}
                <span className="text-[#D4FF00]">MEANT TO BE</span> BROKEN.
              </span>
            </blockquote>

            {/* Subtitle & Story Hook */}
            <div className="mt-8 sm:mt-12 max-w-2xl text-center">
              <p className="text-sm sm:text-base md:text-lg font-sans text-[#8E8E9A] leading-relaxed">
                &ldquo;Sepak bola Indonesia bukan sekadar 90 menit di atas rumput hijau; ini adalah identitas kota, kehormatan lambang di dada, dan detak jantung jutaan suporter di tribun.&rdquo;
              </p>
              <div className="flex items-center justify-center gap-3 mt-6">
                <span className="h-px w-10 bg-[#D4FF00]" />
                <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#D4FF00]">
                  ON-FIELD ARCHIVE 2026/27
                </span>
                <span className="h-px w-10 bg-[#D4FF00]" />
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="mt-14 flex flex-col items-center gap-2 text-center">
              <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[#8E8E9A]">
                SCROLL UNTUK DATA STATISTIK
              </span>
              <ArrowDown className="w-4 h-4 text-[#D4FF00] animate-bounce" />
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

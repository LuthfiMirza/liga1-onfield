"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const curtainTopRef = useRef<HTMLDivElement>(null);
  const curtainBottomRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counterObj = { value: 0 };

      // Number counter 0 -> 100
      gsap.to(counterObj, {
        value: 100,
        duration: 2.2,
        ease: "power2.inOut",
        onUpdate: () => {
          setProgress(Math.floor(counterObj.value));
        },
        onComplete: () => {
          // Exit curtain animation
          const tl = gsap.timeline({
            onComplete: () => {
              setIsDone(true);
              if (onComplete) onComplete();
            },
          });

          tl.to(contentRef.current, {
            opacity: 0,
            y: -20,
            duration: 0.4,
            ease: "power2.in",
          })
            .to(
              curtainTopRef.current,
              {
                yPercent: -100,
                duration: 0.8,
                ease: "expo.inOut",
              },
              "-=0.1"
            )
            .to(
              curtainBottomRef.current,
              {
                yPercent: 100,
                duration: 0.8,
                ease: "expo.inOut",
              },
              "<"
            );
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden pointer-events-none select-none"
    >
      {/* Top Curtain */}
      <div
        ref={curtainTopRef}
        className="absolute top-0 left-0 w-full h-1/2 bg-[#0A0A0C] border-b border-[#23232C] z-10"
      />

      {/* Bottom Curtain */}
      <div
        ref={curtainBottomRef}
        className="absolute bottom-0 left-0 w-full h-1/2 bg-[#0A0A0C] border-t border-[#23232C] z-10"
      />

      {/* Central Content */}
      <div
        ref={contentRef}
        className="relative z-20 flex flex-col items-center justify-center px-6 text-center"
      >
        {/* Subtle Pitch Badge */}
        <div className="flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-[#131318] border border-[#23232C]">
          <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-pulse" />
          <span className="text-[11px] font-mono tracking-widest uppercase text-[#8E8E9A]">
            I.LEAGUE // BRI SUPER LEAGUE 2026/27
          </span>
        </div>

        {/* Massive 0-100 Percentage Counter */}
        <div className="flex items-baseline font-mono tracking-tighter">
          <span className="text-8xl sm:text-9xl md:text-[14rem] font-bold tabular-nums text-[#F4F4F6] leading-none">
            {progress.toString().padStart(2, "0")}
          </span>
          <span className="text-3xl sm:text-5xl md:text-7xl font-sans text-[#D4FF00] ml-2">
            %
          </span>
        </div>

        {/* Progress Bar & Status */}
        <div className="w-64 sm:w-80 mt-6">
          <div className="h-[2px] w-full bg-[#23232C] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#D4FF00] transition-all duration-75 ease-out shadow-[0_0_12px_#D4FF00]"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-2 text-[10px] font-mono text-[#8E8E9A] uppercase tracking-wider">
            <span>MEMUAT DATA STADION</span>
            <span className="text-[#D4FF00]">18 KLUB TERHUBUNG</span>
          </div>
        </div>
      </div>
    </div>
  );
}

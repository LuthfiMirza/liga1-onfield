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
  const panelRef = useRef<HTMLDivElement>(null);
  const markFillRef = useRef<SVGRectElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const counterObj = { value: 0 };

      // Number counter 0 -> 100 with liquid mark fill (y: 43 -> 0, height: 0 -> 43)
      gsap.to(counterObj, {
        value: 100,
        duration: 2.2,
        ease: "power2.inOut",
        onUpdate: () => {
          const currentVal = Math.floor(counterObj.value);
          setProgress(currentVal);

          // SVG fill calculation (viewBox height 43)
          if (markFillRef.current) {
            const h = (currentVal / 100) * 43;
            markFillRef.current.setAttribute("y", (43 - h).toString());
            markFillRef.current.setAttribute("height", h.toString());
          }
        },
        onComplete: () => {
          // Exit animation ala jjettas: panel slides up smoothly
          const tl = gsap.timeline({
            onComplete: () => {
              setIsDone(true);
              if (onComplete) onComplete();
            },
          });

          tl.to(counterRef.current, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
          })
            .to(
              markFillRef.current?.parentElement || {},
              {
                scale: 0.95,
                opacity: 0.4,
                duration: 0.35,
                ease: "power2.in",
              },
              "-=0.2"
            )
            .to(panelRef.current, {
              yPercent: -100,
              duration: 0.85,
              ease: "expo.inOut",
            });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      data-home-loader="true"
      data-loader-phase="loading"
      className="pointer-events-auto fixed inset-0 z-[100] overflow-hidden select-none"
    >
      {/* Background Curtain Panel */}
      <div
        ref={panelRef}
        className="relative flex h-full w-full flex-col items-center justify-center bg-[#0B0A0F]"
      >
        {/* Central Logo Mark with Liquid ClipPath */}
        <div data-loader-mark="true" className="relative flex flex-col items-center">
          <svg
            viewBox="0 0 37 43"
            xmlns="http://www.w3.org/2000/svg"
            className="relative h-28 w-auto md:h-36"
            role="img"
            aria-label="Loading Liga 1 Experience"
          >
            <defs>
              <clipPath id="liga1-loader-clip">
                {/* Athletic geometric shield mark */}
                <path d="M27.9271 35.2244L28.9161 42.818L18.486 35.4071L7.90283 42.9264L8.88835 35.3355L18.4858 28.5164L27.9271 35.2244Z" />
                <path d="M15.4903 23.3423L0 34.2789L1.75369 20.6774L7.34806 16.7187L6.74483 23.1164L10.9979 20.1124L13.1327 3.79814L18.5 0L15.4903 23.3423Z" />
                <path d="M23.8673 3.79814L26.0021 20.1124L30.2552 23.1164L29.6519 16.7187L35.2463 20.6774L37 34.2789L21.5097 23.3423L18.5 0L23.8673 3.79814Z" />
              </clipPath>
            </defs>

            {/* Ghost Silhouette Base (18% Opacity) */}
            <g fill="#F6F3EF" opacity="0.18">
              <path d="M27.9271 35.2244L28.9161 42.818L18.486 35.4071L7.90283 42.9264L8.88835 35.3355L18.4858 28.5164L27.9271 35.2244Z" />
              <path d="M15.4903 23.3423L0 34.2789L1.75369 20.6774L7.34806 16.7187L6.74483 23.1164L10.9979 20.1124L13.1327 3.79814L18.5 0L15.4903 23.3423Z" />
              <path d="M23.8673 3.79814L26.0021 20.1124L30.2552 23.1164L29.6519 16.7187L35.2463 20.6774L37 34.2789L21.5097 23.3423L18.5 0L23.8673 3.79814Z" />
            </g>

            {/* Liquid Fill Rect clipped to Shield */}
            <rect
              ref={markFillRef}
              x="0"
              y="43"
              width="37"
              height="0"
              fill="#D4FF00"
              clipPath="url(#liga1-loader-clip)"
            />
          </svg>

          {/* Monospace 0-100% Counter under logo */}
          <div
            ref={counterRef}
            aria-hidden="true"
            className="absolute left-1/2 top-full mt-5 -translate-x-1/2 select-none text-[11px] tabular-nums md:text-xs font-mono"
            style={{
              letterSpacing: "0.2em",
              paddingLeft: "0.2em",
              color: "#F6F3EF",
              opacity: 0.5,
            }}
          >
            {progress}%
          </div>
        </div>

        {/* Subtle Brand Tagline at Bottom */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#8E8E9A]">
            BRI SUPER LEAGUE 2026/27 · ON-FIELD
          </p>
        </div>
      </div>
    </div>
  );
}

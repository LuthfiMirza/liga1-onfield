"use client";

import { useState, useEffect } from "react";
import { Menu, X, Radio, ArrowUpRight } from "lucide-react";

const NAV_LINKS = [
  { label: "ON-FIELD", href: "#hero" },
  { label: "TIMELINE", href: "#timeline" },
  { label: "KLASEMEN", href: "#standings" },
  { label: "RECORD BOOKS", href: "#record-books" },
  { label: "ATMOSFER", href: "#atmosphere" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-4 sm:px-8 py-4 sm:py-6 transition-all duration-300">
      <div
        className={`mx-auto max-w-7xl flex items-center justify-between px-5 py-3 rounded-full border transition-all duration-300 ${
          isScrolled
            ? "bg-[#0A0A0C]/85 backdrop-blur-xl border-[#23232C] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)]"
            : "bg-[#0A0A0C]/40 backdrop-blur-md border-[#23232C]/50"
        }`}
      >
        {/* Left: Brand Identity */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-[#131318] border border-[#23232C] group-hover:border-[#D4FF00] transition-colors">
            <span className="font-mono text-xs font-black text-[#D4FF00]">
              IL
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-tight uppercase font-mono text-[#F4F4F6] leading-none group-hover:text-[#D4FF00] transition-colors">
              I.LEAGUE
            </span>
            <span className="text-[9px] font-mono tracking-widest text-[#8E8E9A] uppercase leading-tight">
              BRI SUPER LEAGUE
            </span>
          </div>
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3.5 py-1.5 text-xs font-mono uppercase tracking-wider text-[#8E8E9A] hover:text-[#D4FF00] hover:bg-[#131318] rounded-full transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right: Live Matchday Badge & Action */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#131318] border border-[#23232C]">
            <Radio className="w-3 h-3 text-[#D4FF00] animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#F4F4F6]">
              PEKAN 7 <span className="text-[#8E8E9A]">• 9 LAGA</span>
            </span>
          </div>

          <a
            href="#standings"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#D4FF00] hover:bg-[#bce400] text-[#0A0A0C] font-mono text-xs font-bold uppercase tracking-wider transition-colors"
          >
            <span>LIVE STATS</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg bg-[#131318] border border-[#23232C] text-[#F4F4F6] hover:text-[#D4FF00] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-7xl p-5 rounded-2xl bg-[#0A0A0C]/95 backdrop-blur-2xl border border-[#23232C] flex flex-col gap-3 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-200">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2 text-sm font-mono uppercase tracking-wider text-[#8E8E9A] hover:text-[#D4FF00] hover:bg-[#131318] rounded-xl transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-[#23232C] flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#8E8E9A]">
              BRI SUPER LEAGUE 2026/27
            </span>
            <span className="px-2.5 py-1 rounded bg-[#D4FF00]/10 text-[#D4FF00] font-mono text-[10px] font-bold">
              PEKAN 7
            </span>
          </div>
        </div>
      )}
    </header>
  );
}

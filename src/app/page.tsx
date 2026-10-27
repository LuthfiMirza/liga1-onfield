import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import HeroOnField from "@/components/HeroOnField";
import SeasonTimeline from "@/components/SeasonTimeline";
import StandingsAndSchedule from "@/components/StandingsAndSchedule";
import RecordBooksGrid from "@/components/RecordBooksGrid";
import InfluenceShowcase from "@/components/InfluenceShowcase";
import PartnerTicker from "@/components/PartnerTicker";
import FooterPortal from "@/components/FooterPortal";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0A0A0C] text-[#F4F4F6] overflow-x-hidden">
      {/* 0-100% Split Curtain Preloader */}
      <Preloader />

      {/* Floating Glassmorphism Navbar */}
      <Navbar />

      {/* 1. Hero Section ("ON-FIELD") */}
      <HeroOnField />

      {/* 2. Interactive Season Timeline (2021-2027) */}
      <SeasonTimeline />

      {/* 3. Klasemen 18 Klub & Jadwal Pekan 7 */}
      <StandingsAndSchedule />

      {/* 4. Record Books (Filterable Top Stats Grid) */}
      <RecordBooksGrid />

      {/* 5. Atmosfer & Media Showcase (Pinned Horizontal Scroll + Kinetic Marquee) */}
      <InfluenceShowcase />

      {/* 6. Partner & Clubs Infinite Marquee */}
      <PartnerTicker />

      {/* 7. Footer Portal Transition */}
      <FooterPortal />
    </main>
  );
}

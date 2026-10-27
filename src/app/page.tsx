import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import HeroOnField from "@/components/HeroOnField";
import SeasonTimeline from "@/components/SeasonTimeline";
import StandingsAndSchedule from "@/components/StandingsAndSchedule";
import RecordBooksGrid from "@/components/RecordBooksGrid";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0A0A0C] text-[#F4F4F6]">
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
    </main>
  );
}

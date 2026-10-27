import Navbar from "@/components/Navbar";
import Preloader from "@/components/Preloader";
import HeroOnField from "@/components/HeroOnField";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#0A0A0C] text-[#F4F4F6]">
      {/* 0-100% Split Curtain Preloader */}
      <Preloader />

      {/* Floating Glassmorphism Navbar */}
      <Navbar />

      {/* Hero Section */}
      <HeroOnField />
    </main>
  );
}

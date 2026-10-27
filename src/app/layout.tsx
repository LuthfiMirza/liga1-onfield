import type { Metadata } from "next";
import { Anton, Oswald, Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "I.LEAGUE ON-FIELD EXPERIENCE | BRI Super League",
  description:
    "Showcase scrollytelling interaktif BRI Super League (Liga 1 Indonesia). Statistik real-time, klasemen 18 klub, jadwal pekan 7, dan rekor penonton.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${anton.variable} ${oswald.variable} ${spaceGrotesk.variable} ${inter.variable} dark`}
    >
      <body className="min-h-screen bg-[#0A0A0C] text-[#F4F4F6] antialiased selection:bg-[#D4FF00] selection:text-[#0A0A0C]">
        {children}
      </body>
    </html>
  );
}

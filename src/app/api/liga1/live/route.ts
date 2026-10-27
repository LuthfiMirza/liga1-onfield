import { NextRequest, NextResponse } from "next/server";
import { fetchLiveStandings, fetchLiveFixtures, fetchLivePlayerStats } from "@/lib/ileagueLiveService";

export async function GET(request: NextRequest) {
  try {
    const [standings, fixtures, topStats] = await Promise.all([
      fetchLiveStandings(),
      fetchLiveFixtures(),
      fetchLivePlayerStats(),
    ]);

    return NextResponse.json(
      {
        success: true,
        source: "https://ileague.id",
        timestamp: new Date().toISOString(),
        totalClubs: standings.length,
        standings,
        fixtures,
        topStats,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
        },
      }
    );
  } catch (error) {
    console.error("[API /api/liga1/live] Error fetching live data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch live Liga 1 data",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";
import { fetchLiveScore } from "@/lib/ileagueLiveService";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const matchId = searchParams.get("matchId");

  if (!matchId) {
    return NextResponse.json(
      { success: false, error: "Missing matchId query parameter" },
      { status: 400 }
    );
  }

  const liveResult = await fetchLiveScore(matchId);

  return NextResponse.json(
    {
      success: true,
      matchId,
      ...liveResult,
      timestamp: new Date().toISOString(),
    },
    {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}

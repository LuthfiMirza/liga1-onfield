import { STANDINGS_DATA, FIXTURES_WEEK_7, RECORD_BOOKS_DATA, StandingsRow, MatchFixture, PlayerStat } from "@/data/liga1Data";

const BASE_URL = "https://ileague.id";
const HEADERS = {
  "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "Accept-Language": "id,en-US;q=0.9,en;q=0.8",
};

/**
 * Fetch dan Parse Klasemen 18 Klub dari ileague.id
 */
export async function fetchLiveStandings(): Promise<StandingsRow[]> {
  try {
    const res = await fetch(`${BASE_URL}/table/index/BRI_SUPER_LEAGUE_2026-27`, {
      headers: HEADERS,
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.warn(`[ileagueLiveService] Standings fetch failed (${res.status}), fallback to cached data.`);
      return STANDINGS_DATA;
    }

    const html = await res.text();
    const rows = html.match(/<tr[^>]*>[\s\S]*?<\/tr>/g) || [];
    const parsedStandings: StandingsRow[] = [];

    for (const row of rows) {
      const tds = (row.match(/<td[^>]*>[\s\S]*?<\/td>/g) || []).map((td) =>
        td.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
      );

      if (tds.length >= 10 && /^\d+$/.test(tds[0])) {
        const rank = parseInt(tds[0], 10);
        const clubName = tds[1];
        const played = parseInt(tds[2], 10) || 0;
        const won = parseInt(tds[3], 10) || 0;
        const drawn = parseInt(tds[4], 10) || 0;
        const lost = parseInt(tds[5], 10) || 0;
        const goalsFor = parseInt(tds[6], 10) || 0;
        const goalsAgainst = parseInt(tds[7], 10) || 0;
        const goalDifference = parseInt(tds[8], 10) || (goalsFor - goalsAgainst);
        const points = parseInt(tds[9], 10) || 0;

        // Ekstrak Form W/D/L
        const formButtons = row.match(/class="btn btn-default btn-circle pop"[^>]*>([WDL])<\/button>/g) || [];
        const form = formButtons
          .map((b) => {
            const m = b.match(/>([WDL])</);
            return m ? (m[1] as "W" | "D" | "L") : "D";
          })
          .slice(0, 5);

        // Cari kode klub dari data lokal jika ada
        const existing = STANDINGS_DATA.find(
          (c) => c.clubName.toLowerCase() === clubName.toLowerCase() || clubName.toLowerCase().includes(c.code.toLowerCase())
        );

        parsedStandings.push({
          rank,
          clubId: existing?.clubId || `club-${rank}`,
          clubName,
          code: existing?.code || clubName.slice(0, 3).toUpperCase(),
          played,
          won,
          drawn,
          lost,
          goalsFor,
          goalsAgainst,
          goalDifference,
          points,
          form: form.length > 0 ? form : (existing?.form || ["D", "D", "D", "D", "D"]),
        });
      }
    }

    if (parsedStandings.length >= 18) {
      return parsedStandings;
    }

    return STANDINGS_DATA;
  } catch (error) {
    console.error("[ileagueLiveService] Error fetching live standings:", error);
    return STANDINGS_DATA;
  }
}

/**
 * Fetch dan Parse Jadwal & Hasil Pekan Berjalan dari ileague.id
 */
export async function fetchLiveFixtures(): Promise<MatchFixture[]> {
  try {
    const res = await fetch(`${BASE_URL}/fixtures/index/BRI_SUPER_LEAGUE_2026-27`, {
      headers: HEADERS,
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      console.warn(`[ileagueLiveService] Fixtures fetch failed (${res.status}), fallback to default fixtures.`);
      return FIXTURES_WEEK_7;
    }

    const html = await res.text();
    const rows = html.match(/<a class="table-row"[\s\S]*?<\/a>/g) || [];
    const parsedFixtures: MatchFixture[] = [];

    const dateDivs = html.match(/<div align="left" style="margin-top:10px"[^>]*>([\s\S]*?)<\/div>/g) || [];
    const dates = dateDivs.map((d) => d.replace(/<[^>]+>/g, "").trim());

    let dateIndex = 0;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      const clubTags = row.match(/<b>(.*?)<\/b>/g) || [];
      const homeTag = clubTags[0];
      const awayTag = clubTags[1];
      if (homeTag && awayTag) {
        const homeName = homeTag.replace(/<\/?b>/g, "").trim();
        const awayName = awayTag.replace(/<\/?b>/g, "").trim();

        const badgeMatch = row.match(/<span class="badge badge-secondary"[^>]*>([\s\S]*?)<\/span>/);
        const badgeText = badgeMatch
          ? badgeMatch[1].replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
          : "15:30 WIB";

        const tds = row.match(/<td[^>]*>[\s\S]*?<\/td>/g) || [];
        const stadiumCell = tds.length >= 6 ? tds[5] : undefined;
        const stadiumRaw = stadiumCell ? stadiumCell.replace(/<[^>]+>/g, "").trim() : "Stadion Liga 1";

        const broadcast = row.includes("INDOSIAR")
          ? "INDOSIAR & VIDIO"
          : row.includes("VIDIO")
          ? "VIDIO EXCLUSIVE"
          : "INDOSIAR";

        const dayName = dates[Math.min(dateIndex, dates.length - 1)] || "Pekan 07";
        if (i % 3 === 2 && dateIndex < dates.length - 1) {
          dateIndex++;
        }

        const homeExisting = STANDINGS_DATA.find((c) => c.clubName.toLowerCase() === homeName.toLowerCase());
        const awayExisting = STANDINGS_DATA.find((c) => c.clubName.toLowerCase() === awayName.toLowerCase());

        parsedFixtures.push({
          id: `live-fix-${i + 1}`,
          matchday: 7,
          date: "2026-10-26",
          dayName,
          time: badgeText.includes(":") ? badgeText : "15:30 WIB",
          homeClub: {
            id: homeExisting?.clubId || `home-${i}`,
            name: homeName,
            code: homeExisting?.code || homeName.slice(0, 3).toUpperCase(),
            primaryColor: "#00529C",
          },
          awayClub: {
            id: awayExisting?.clubId || `away-${i}`,
            name: awayName,
            code: awayExisting?.code || awayName.slice(0, 3).toUpperCase(),
            primaryColor: "#E42313",
          },
          stadium: stadiumRaw || "Stadion Utama",
          city: "Indonesia",
          broadcast,
          isBigMatch: homeName.includes("PERSIB") || homeName.includes("PERSIJA") || awayName.includes("PERSIB") || awayName.includes("PERSIJA"),
        });
      }
    }

    if (parsedFixtures.length > 0) {
      return parsedFixtures;
    }

    return FIXTURES_WEEK_7;
  } catch (error) {
    console.error("[ileagueLiveService] Error fetching live fixtures:", error);
    return FIXTURES_WEEK_7;
  }
}

/**
 * Fetch dan Parse Top Stats Pemain dari ileague.id (Goals, Assists, Saves, Passes)
 */
export async function fetchLivePlayerStats(): Promise<PlayerStat[]> {
  try {
    const res = await fetch(`${BASE_URL}/top_actions/player/index/BRI_SUPER_LEAGUE_2026-27`, {
      headers: HEADERS,
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      return RECORD_BOOKS_DATA;
    }

    const html = await res.text();
    const cleanText = html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, "\n");

    const lines = cleanText
      .split("\n")
      .map((l) => l.trim())
      .filter((l) => l.length > 0);

    const goalsIdx = lines.indexOf("GOALS");
    const assistsIdx = lines.indexOf("ASSISTS");
    const savesIdx = lines.indexOf("SAVES");
    const passesIdx = lines.indexOf("PASSES");

    if (goalsIdx === -1 || assistsIdx === -1 || savesIdx === -1 || passesIdx === -1) {
      return RECORD_BOOKS_DATA;
    }

    const parsedStats: PlayerStat[] = [];

    const parseCategory = (startIdx: number, endIdx: number, category: "scorer" | "assist" | "saves" | "passes", unit: string) => {
      const slice = lines.slice(startIdx + 1, endIdx);
      let i = 0;
      let rank = 1;
      while (i < slice.length && rank <= 4) {
        if (/^\d+$/.test(slice[i])) {
          rank = parseInt(slice[i], 10);
          const name = slice[i + 1] || "Athlete";
          const val = parseInt(slice[i + 2], 10) || 0;

          parsedStats.push({
            id: `live-${category}-${rank}`,
            category,
            rank,
            value: val,
            unit,
            playerName: name,
            clubName: "BRI Super League",
            clubCode: "BSL",
            position: category === "scorer" ? "Forward" : category === "assist" ? "Playmaker" : category === "saves" ? "Goalkeeper" : "Midfielder",
            detail: `Statistik resmi BRI Super League 2026/27 tercatat di portal ileague.id.`,
            clubColor: category === "scorer" ? "#D4FF00" : category === "assist" ? "#00529C" : category === "saves" ? "#E42313" : "#00529C",
            seasonStats: {
              matches: 7,
              minutes: 630,
              efficiency: `${val} ${unit.split(" ")[0]}`,
            },
          });
          i += 3;
        } else {
          i++;
        }
      }
    };

    parseCategory(goalsIdx, assistsIdx, "scorer", "GOL TERCATAT");
    parseCategory(assistsIdx, savesIdx, "assist", "ASSIST MATANG");
    parseCategory(savesIdx, passesIdx, "saves", "PENYELAMATAN KRUSIAL");
    parseCategory(passesIdx, passesIdx + 20, "passes", "OPERAN AKURAT");

    const attendanceStats = RECORD_BOOKS_DATA.filter((s) => s.category === "attendance");

    if (parsedStats.length >= 10) {
      return [...parsedStats, ...attendanceStats];
    }

    return RECORD_BOOKS_DATA;
  } catch (error) {
    console.error("[ileagueLiveService] Error fetching player stats:", error);
    return RECORD_BOOKS_DATA;
  }
}

/**
 * Fetch Skor Realtime Pertandingan yang Sedang Berjalan
 */
export async function fetchLiveScore(matchId: string): Promise<{ scoreHome: number; scoreAway: number; scoreText: string; isLive: boolean }> {
  try {
    const res = await fetch(`${BASE_URL}/get_live/manual_liveskor`, {
      method: "POST",
      headers: {
        ...HEADERS,
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        "X-Requested-With": "XMLHttpRequest",
        "Referer": `${BASE_URL}/`,
      },
      body: new URLSearchParams({ jadwal: matchId }).toString(),
      cache: "no-store",
    });

    if (!res.ok) {
      return { scoreHome: 0, scoreAway: 0, scoreText: "0:0", isLive: false };
    }

    const data = await res.json();
    return {
      scoreHome: data.score_home ?? 0,
      scoreAway: data.score_away ?? 0,
      scoreText: data.skor || "0:0",
      isLive: data.skor !== "0:0",
    };
  } catch (error) {
    console.error(`[ileagueLiveService] Error fetching live score for match ${matchId}:`, error);
    return { scoreHome: 0, scoreAway: 0, scoreText: "0:0", isLive: false };
  }
}

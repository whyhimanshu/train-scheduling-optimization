import type { NextRequest } from "next/server"

type Settings = {
  headwayTargetMin: number
  maxSpeedKmph: number
  optimizationMode: "balanced" | "throughput" | "punctuality"
}

function parseCookieSettings(cookie: string | null): Settings | null {
  if (!cookie) return null
  try {
    const val = JSON.parse(decodeURIComponent(cookie))
    return val
  } catch {
    return null
  }
}

export async function GET(req: NextRequest) {
  const cookie = req.cookies.get("app_settings")?.value ?? null
  const current =
    parseCookieSettings(cookie) ??
    ({
      headwayTargetMin: 7,
      maxSpeedKmph: 110,
      optimizationMode: "balanced",
    } as Settings)

  return Response.json({ settings: current })
}

export async function POST(req: NextRequest) {
  const body = (await req.json().catch(() => ({}))) as Partial<Settings>
  const next: Settings = {
    headwayTargetMin: Math.max(2, Math.min(30, Number(body.headwayTargetMin ?? 7))),
    maxSpeedKmph: Math.max(40, Math.min(200, Number(body.maxSpeedKmph ?? 110))),
    optimizationMode: (body.optimizationMode as Settings["optimizationMode"]) ?? "balanced",
  }

  const cookieVal = encodeURIComponent(JSON.stringify(next))
  return new Response(JSON.stringify({ ok: true, settings: next }), {
    headers: {
      "Content-Type": "application/json",
      // Set cookie for 1 year
      "Set-Cookie": `app_settings=${cookieVal}; Path=/; Max-Age=31536000; SameSite=Lax`,
    },
  })
}

import type { NextRequest } from "next/server"

type ActionItem = {
  action: string
  trainId: string
  parameter?: string
  result: string
  at: string
}

let HISTORY: ActionItem[] = []

export async function GET() {
  return Response.json({ history: HISTORY })
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const item: ActionItem = {
    action: body.action ?? "hold",
    trainId: body.trainId ?? "unknown",
    parameter: body.parameter,
    result:
      body.action === "hold"
        ? "Applied dwell extension"
        : body.action === "reroute"
          ? "Rerouted via nearest loop"
          : "Granted temporary precedence",
    at: new Date().toISOString(),
  }
  HISTORY = [item, ...HISTORY].slice(0, 100)
  return Response.json({ ok: true, item })
}

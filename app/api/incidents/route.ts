import type { NextRequest } from "next/server"

type Incident = {
  id: string
  line: string
  location: string
  severity: "low" | "medium" | "high"
  status: "open" | "investigating" | "resolved"
  startedAt: string
  note?: string
}

// In-memory store (resets on redeploy; sufficient for prototype)
let INCIDENTS: Incident[] = [
  {
    id: "INC-1001",
    line: "Blue Line",
    location: "KM 45/2",
    severity: "high",
    status: "open",
    startedAt: new Date(Date.now() - 1000 * 60 * 22).toISOString(),
    note: "Track obstruction reported",
  },
]

export async function GET() {
  return Response.json({ incidents: INCIDENTS })
}

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}))
  const id = `INC-${String(Math.floor(Math.random() * 9000) + 1000)}`
  const incident: Incident = {
    id,
    line: body.line ?? "Main Line",
    location: body.location ?? "KM 0/0",
    severity: (body.severity ?? "low") as Incident["severity"],
    status: "open",
    startedAt: new Date().toISOString(),
    note: body.note,
  }
  INCIDENTS = [incident, ...INCIDENTS]
  return Response.json({ incident })
}

export async function PATCH(req: NextRequest) {
  const { id, status } = await req.json().catch(() => ({}))
  if (!id || !status) {
    return new Response("Invalid input", { status: 400 })
  }
  INCIDENTS = INCIDENTS.map((i) => (i.id === id ? { ...i, status } : i))
  return Response.json({ ok: true })
}

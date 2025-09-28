function sample<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)]
}

const SOURCES = ["optimizer", "ingestion", "scheduler", "ui", "controller"]
const MESSAGES = [
  "Recomputed path graph",
  "Applied constraint relaxation",
  "Ingested track circuit update",
  "Conflict resolved via precedence",
  "Fallback heuristic used",
  "Updated ETA for 5 trains",
  "Load shed non-critical tasks",
]

let LOGS = Array.from({ length: 24 }).map((_, i) => ({
  id: `LOG-${i + 1}`,
  level: i % 7 === 0 ? "error" : i % 5 === 0 ? "warn" : "info",
  message: MESSAGES[i % MESSAGES.length],
  source: SOURCES[i % SOURCES.length],
  ts: new Date(Date.now() - i * 60_000).toISOString(),
}))

export async function GET() {
  // Occasionally append a fresh log to simulate live activity
  if (Math.random() < 0.5) {
    LOGS = [
      {
        id: `LOG-${Date.now()}`,
        level: sample(["info", "warn", "error"]),
        message: sample(MESSAGES),
        source: sample(SOURCES),
        ts: new Date().toISOString(),
      },
      ...LOGS,
    ].slice(0, 100)
  }
  return Response.json({ logs: LOGS })
}

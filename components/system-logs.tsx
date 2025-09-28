"use client"

import useSWR from "swr"
import { useState } from "react"

type Log = {
  id: string
  level: "info" | "warn" | "error"
  message: string
  ts: string
  source: string
}

const fetcher = (u: string) => fetch(u).then((r) => r.json())

export default function SystemLogs() {
  const [auto, setAuto] = useState(true)
  const { data, isLoading } = useSWR<{ logs: Log[] }>("/api/logs", fetcher, { refreshInterval: auto ? 5000 : 0 })

  if (isLoading) return <div>Loading logs…</div>
  const logs = data?.logs ?? []

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">Total logs: {logs.length}</p>
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={auto} onChange={(e) => setAuto(e.target.checked)} />
          Auto-refresh
        </label>
      </div>
      <div className="overflow-auto rounded border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3">Time</th>
              <th className="text-left p-3">Level</th>
              <th className="text-left p-3">Source</th>
              <th className="text-left p-3">Message</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((l) => (
              <tr key={l.id} className="border-t">
                <td className="p-3">{new Date(l.ts).toLocaleString()}</td>
                <td className="p-3 capitalize">{l.level}</td>
                <td className="p-3">{l.source}</td>
                <td className="p-3">{l.message}</td>
              </tr>
            ))}
            {logs.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-muted-foreground">
                  No logs yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

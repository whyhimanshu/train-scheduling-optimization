"use client"

import useSWR from "swr"
import { Button } from "@/components/ui/button"
import { useState } from "react"

type Incident = {
  id: string
  line: string
  location: string
  severity: "low" | "medium" | "high"
  status: "open" | "investigating" | "resolved"
  startedAt: string
  note?: string
}

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export default function IncidentsTable() {
  const { data, isLoading, mutate } = useSWR<{ incidents: Incident[] }>("/api/incidents", fetcher)
  const [creating, setCreating] = useState(false)

  async function createIncident() {
    setCreating(true)
    try {
      const res = await fetch("/api/incidents", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          line: "Red Line",
          location: "KM 124/6",
          severity: "medium",
          note: "Signal failure reported by field staff",
        }),
      })
      if (!res.ok) throw new Error("Failed to create")
      await mutate()
    } finally {
      setCreating(false)
    }
  }

  async function updateStatus(id: string, status: Incident["status"]) {
    await fetch("/api/incidents", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    })
    await mutate()
  }

  if (isLoading) return <div>Loading incidents…</div>
  const incidents = data?.incidents ?? []

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Active incidents: {incidents.filter((i) => i.status !== "resolved").length}
        </p>
        <Button onClick={createIncident} disabled={creating}>
          {creating ? "Creating…" : "Report Incident"}
        </Button>
      </div>
      <div className="overflow-auto rounded border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-3">ID</th>
              <th className="text-left p-3">Line</th>
              <th className="text-left p-3">Location</th>
              <th className="text-left p-3">Severity</th>
              <th className="text-left p-3">Status</th>
              <th className="text-left p-3">Started</th>
              <th className="text-left p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {incidents.map((i) => (
              <tr key={i.id} className="border-t">
                <td className="p-3">{i.id}</td>
                <td className="p-3">{i.line}</td>
                <td className="p-3">{i.location}</td>
                <td className="p-3 capitalize">{i.severity}</td>
                <td className="p-3 capitalize">{i.status}</td>
                <td className="p-3">{new Date(i.startedAt).toLocaleString()}</td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => updateStatus(i.id, "investigating")}
                      disabled={i.status !== "open"}
                    >
                      Mark Investigating
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => updateStatus(i.id, "resolved")}
                      disabled={i.status === "resolved"}
                    >
                      Resolve
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {incidents.length === 0 && (
              <tr>
                <td colSpan={7} className="p-6 text-center text-muted-foreground">
                  No incidents yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

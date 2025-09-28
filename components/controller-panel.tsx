"use client"

import { useState } from "react"
import useSWR from "swr"
import { Button } from "@/components/ui/button"

const fetcher = (u: string) => fetch(u).then((r) => r.json())

export default function ControllerPanel() {
  const { data, mutate } = useSWR("/api/controller/actions", fetcher)
  const [submitting, setSubmitting] = useState(false)
  const [form, setForm] = useState({
    action: "hold",
    trainId: "12345",
    parameter: "5", // minutes or km
  })

  async function submit() {
    setSubmitting(true)
    try {
      const res = await fetch("/api/controller/actions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error("Failed")
      await mutate()
    } finally {
      setSubmitting(false)
    }
  }

  const history = data?.history ?? []

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded border p-4">
        <h2 className="font-medium mb-3">New Action</h2>
        <div className="grid gap-3">
          <label className="grid gap-1">
            <span className="text-sm text-muted-foreground">Action</span>
            <select
              className="border rounded px-3 py-2 bg-background"
              value={form.action}
              onChange={(e) => setForm((f) => ({ ...f, action: e.target.value }))}
            >
              <option value="hold">Hold at Next Station</option>
              <option value="reroute">Reroute via Loop</option>
              <option value="priority-pass">Grant Priority Pass</option>
            </select>
          </label>
          <label className="grid gap-1">
            <span className="text-sm text-muted-foreground">Train ID</span>
            <input
              className="border rounded px-3 py-2 bg-background"
              value={form.trainId}
              onChange={(e) => setForm((f) => ({ ...f, trainId: e.target.value }))}
            />
          </label>
          <label className="grid gap-1">
            <span className="text-sm text-muted-foreground">Parameter</span>
            <input
              className="border rounded px-3 py-2 bg-background"
              value={form.parameter}
              onChange={(e) => setForm((f) => ({ ...f, parameter: e.target.value }))}
            />
          </label>
          <Button onClick={submit} disabled={submitting}>
            {submitting ? "Submitting…" : "Submit Action"}
          </Button>
        </div>
      </div>

      <div className="rounded border p-4">
        <h2 className="font-medium mb-3">Recent Actions</h2>
        <ul className="space-y-2 text-sm">
          {history.map((h: any, idx: number) => (
            <li key={idx} className="rounded border p-3">
              <div className="flex items-center justify-between">
                <span className="font-medium">{h.action}</span>
                <span className="text-muted-foreground">{new Date(h.at).toLocaleTimeString()}</span>
              </div>
              <div className="text-muted-foreground">
                Train {h.trainId} • Param: {h.parameter}
              </div>
              <div>Status: {h.result}</div>
            </li>
          ))}
          {history.length === 0 && <li className="text-muted-foreground">No actions yet.</li>}
        </ul>
      </div>
    </div>
  )
}

"use client"

import useSWR from "swr"
import { useState } from "react"
import { Button } from "@/components/ui/button"

type Settings = {
  headwayTargetMin: number
  maxSpeedKmph: number
  optimizationMode: "balanced" | "throughput" | "punctuality"
}

const fetcher = (u: string) => fetch(u).then((r) => r.json())

export default function SettingsForm() {
  const { data, isLoading, mutate } = useSWR<{ settings: Settings }>("/api/settings", fetcher)
  const s = data?.settings
  const [form, setForm] = useState<Settings>({
    headwayTargetMin: s?.headwayTargetMin ?? 7,
    maxSpeedKmph: s?.maxSpeedKmph ?? 110,
    optimizationMode: s?.optimizationMode ?? "balanced",
  })

  // Keep form in sync once data arrives
  if (
    s &&
    (form.headwayTargetMin !== s.headwayTargetMin ||
      form.maxSpeedKmph !== s.maxSpeedKmph ||
      form.optimizationMode !== s.optimizationMode)
  ) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    setForm(s)
  }

  async function save() {
    const res = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    if (res.ok) {
      await mutate()
    }
  }

  if (isLoading) return <div>Loading settings…</div>

  return (
    <div className="rounded border p-4 grid gap-4 max-w-xl">
      <label className="grid gap-1">
        <span className="text-sm text-muted-foreground">Headway target (min)</span>
        <input
          type="number"
          className="border rounded px-3 py-2 bg-background"
          value={form.headwayTargetMin}
          onChange={(e) => setForm((f) => ({ ...f, headwayTargetMin: Number(e.target.value) }))}
          min={2}
          max={30}
        />
      </label>
      <label className="grid gap-1">
        <span className="text-sm text-muted-foreground">Max speed (km/h)</span>
        <input
          type="number"
          className="border rounded px-3 py-2 bg-background"
          value={form.maxSpeedKmph}
          onChange={(e) => setForm((f) => ({ ...f, maxSpeedKmph: Number(e.target.value) }))}
          min={40}
          max={200}
        />
      </label>
      <label className="grid gap-1">
        <span className="text-sm text-muted-foreground">Optimization mode</span>
        <select
          className="border rounded px-3 py-2 bg-background"
          value={form.optimizationMode}
          onChange={(e) => setForm((f) => ({ ...f, optimizationMode: e.target.value as Settings["optimizationMode"] }))}
        >
          <option value="balanced">Balanced</option>
          <option value="throughput">Throughput</option>
          <option value="punctuality">Punctuality</option>
        </select>
      </label>
      <div className="flex justify-end">
        <Button onClick={save}>Save Settings</Button>
      </div>
    </div>
  )
}

"use client"

import { DashboardHeader } from "@/components/dashboard-header"
import { Sidebar } from "@/components/sidebar"
import { RealTimeMonitor } from "@/components/real-time-monitor"

export default function MonitoringPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-6">
          <RealTimeMonitor />
        </main>
      </div>
    </div>
  )
}

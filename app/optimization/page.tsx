import { DashboardHeader } from "@/components/dashboard-header"
import { Sidebar } from "@/components/sidebar"
import { OptimizationEngine } from "@/components/optimization-engine"

export default function OptimizationPage() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-6">
          <OptimizationEngine />
        </main>
      </div>
    </div>
  )
}

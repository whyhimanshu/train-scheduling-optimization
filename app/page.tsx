import { DashboardHeader } from "@/components/dashboard-header"
import { Sidebar } from "@/components/sidebar"
import { TrafficOverview } from "@/components/traffic-overview"
import { TrainMovements } from "@/components/train-movements"
import { OptimizationPanel } from "@/components/optimization-panel"
import { PerformanceMetrics } from "@/components/performance-metrics"

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        <main className="flex-1 overflow-auto p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <TrafficOverview />
            </div>
            <div>
              <OptimizationPanel />
            </div>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <TrainMovements />
            <PerformanceMetrics />
          </div>
        </main>
      </div>
    </div>
  )
}

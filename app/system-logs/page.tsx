import SystemLogs from "@/components/system-logs"

export const metadata = {
  title: "System Logs | Divide and Conquer",
}

export default function SystemLogsPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-pretty">System Logs</h1>
      <SystemLogs />
    </main>
  )
}

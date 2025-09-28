import IncidentsTable from "@/components/incidents-table"

export const metadata = {
  title: "Incidents | Divide and Conquer",
}

export default function IncidentsPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-pretty">Incidents</h1>
      <IncidentsTable />
    </main>
  )
}

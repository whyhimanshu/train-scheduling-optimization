import ControllerPanel from "@/components/controller-panel"

export const metadata = {
  title: "Controller | Divide and Conquer",
}

export default function ControllerPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-pretty">Controller Actions</h1>
      <ControllerPanel />
    </main>
  )
}

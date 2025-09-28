import SettingsForm from "@/components/settings-form"

export const metadata = {
  title: "Settings | Divide and Conquer",
}

export default function SettingsPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold mb-4 text-pretty">Settings</h1>
      <SettingsForm />
    </main>
  )
}

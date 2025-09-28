import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell, Settings, User, AlertTriangle } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="border-b border-border bg-card px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-xl font-semibold text-foreground">Divide and Conquer</h1>
            <p className="text-sm text-muted-foreground">Intelligent Railway Traffic Control</p>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            Mumbai Central Division
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="text-muted-foreground">Live</span>
          </div>

          <Button variant="ghost" size="sm" className="relative">
            <Bell className="h-4 w-4" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-destructive">3</Badge>
          </Button>

          <Button variant="ghost" size="sm">
            <Settings className="h-4 w-4" />
          </Button>

          <Button variant="ghost" size="sm">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 mt-3">
        <div className="flex items-center gap-2 text-sm">
          <AlertTriangle className="h-4 w-4 text-chart-3" />
          <span className="text-muted-foreground">2 trains delayed, 1 platform conflict detected</span>
        </div>
      </div>
    </header>
  )
}

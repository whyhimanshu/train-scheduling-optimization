"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Train, BarChart3, Settings, Users, MapPin, Clock, AlertCircle, TrendingUp, Database, Zap } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const navigationItems = [
  { icon: BarChart3, label: "Overview", active: true, badge: null, path: "/" },
  { icon: Train, label: "Train Management", active: false, badge: "12", path: "/" },
  { icon: MapPin, label: "Track Status", active: false, badge: null, path: "/monitoring" },
  { icon: Clock, label: "Scheduling", active: false, badge: "3", path: "/" },
  { icon: AlertCircle, label: "Incidents", active: false, badge: "2", path: "/incidents" },
  { icon: TrendingUp, label: "Analytics", active: false, badge: null, path: "/analytics" },
  { icon: Users, label: "Controllers", active: false, badge: null, path: "/controller" },
  { icon: Database, label: "System Logs", active: false, badge: null, path: "/system-logs" },
  { icon: Zap, label: "AI Optimizer", active: false, badge: "NEW", path: "/optimization" },
  { icon: Settings, label: "Settings", active: false, badge: null, path: "/settings" },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Train className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-semibold text-sidebar-foreground">Divide and Conquer</h2>
            <p className="text-xs text-sidebar-foreground/60">Traffic Management</p>
          </div>
        </div>
      </div>

      <nav className="px-3">
        <div className="space-y-1">
          {navigationItems.map((item, index) => {
            const isActive = item.path ? pathname === item.path : false
            const inner = (
              <>
                <item.icon className="h-4 w-4" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <Badge variant={item.badge === "NEW" ? "default" : "secondary"} className="text-xs">
                    {item.badge}
                  </Badge>
                )}
              </>
            )

            if (item.path) {
              return (
                <Button
                  asChild
                  key={index}
                  variant={isActive ? "secondary" : "ghost"}
                  className={`w-full justify-start gap-3 ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <Link href={item.path}>{inner}</Link>
                </Button>
              )
            }

            return (
              <Button
                key={index}
                variant={isActive ? "secondary" : "ghost"}
                className={`w-full justify-start gap-3 ${
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                }`}
              >
                {inner}
              </Button>
            )
          })}
        </div>
      </nav>

      <div className="absolute bottom-4 left-3 right-3">
        <div className="bg-sidebar-accent rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <span className="text-xs font-medium text-sidebar-accent-foreground">System Status</span>
          </div>
          <p className="text-xs text-sidebar-accent-foreground/80">All systems operational</p>
        </div>
      </div>
    </div>
  )
}

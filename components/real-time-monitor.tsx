"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertTriangle, CheckCircle, Clock, Zap, Bell, Eye, MapPin, Activity, Wifi, WifiOff } from "lucide-react"
import { useEffect, useState } from "react"

const liveAlerts = [
  {
    id: 1,
    type: "critical",
    title: "Platform Conflict Detected",
    description: "Express 12951 and Local 67890 both assigned to Platform 2",
    timestamp: "2 min ago",
    location: "Platform 2",
    status: "active",
  },
  {
    id: 2,
    type: "warning",
    title: "Signal Delay",
    description: "Outer signal 45A showing amber for 8 minutes",
    timestamp: "5 min ago",
    location: "Signal 45A",
    status: "investigating",
  },
  {
    id: 3,
    type: "info",
    title: "Optimization Applied",
    description: "AI recommendation for freight rerouting implemented",
    timestamp: "12 min ago",
    location: "Track 3B",
    status: "resolved",
  },
]

const systemStatus = [
  { name: "Signaling System", status: "operational", uptime: "99.8%", lastCheck: "30s ago" },
  { name: "Track Sensors", status: "operational", uptime: "99.9%", lastCheck: "15s ago" },
  { name: "Communication Network", status: "operational", uptime: "100%", lastCheck: "10s ago" },
  { name: "Power Systems", status: "operational", uptime: "99.7%", lastCheck: "45s ago" },
  { name: "Weather Monitoring", status: "warning", uptime: "98.2%", lastCheck: "2m ago" },
  { name: "AI Optimization Engine", status: "operational", uptime: "99.9%", lastCheck: "5s ago" },
]

const liveTrains = [
  { id: "12951", name: "Mumbai Rajdhani", speed: 85, location: "Km 245.8", status: "on-time", signal: "green" },
  { id: "67890", name: "Local Suburban", speed: 45, location: "Platform 1", status: "boarding", signal: "red" },
  { id: "24567", name: "Freight Container", speed: 60, location: "Km 189.2", status: "moving", signal: "yellow" },
  { id: "11058", name: "Amritsar Express", speed: 0, location: "Outer Signal", status: "held", signal: "red" },
]

export function RealTimeMonitor() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [connectionStatus, setConnectionStatus] = useState("connected")

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-4 w-4 text-destructive" />
      case "warning":
        return <Clock className="h-4 w-4 text-chart-3" />
      default:
        return <CheckCircle className="h-4 w-4 text-accent" />
    }
  }

  const getAlertColor = (type: string) => {
    switch (type) {
      case "critical":
        return "bg-destructive/10 text-destructive border-destructive/20"
      case "warning":
        return "bg-chart-3/10 text-chart-3 border-chart-3/20"
      default:
        return "bg-accent/10 text-accent border-accent/20"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational":
        return <CheckCircle className="h-4 w-4 text-accent" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-chart-3" />
      default:
        return <AlertTriangle className="h-4 w-4 text-destructive" />
    }
  }

  const getSignalColor = (signal: string) => {
    switch (signal) {
      case "green":
        return "bg-accent"
      case "yellow":
        return "bg-chart-3"
      default:
        return "bg-destructive"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Real-time Monitoring</h1>
          <p className="text-muted-foreground">Live system status and alerts</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            {connectionStatus === "connected" ? (
              <Wifi className="h-4 w-4 text-accent" />
            ) : (
              <WifiOff className="h-4 w-4 text-destructive" />
            )}
            <span className="text-muted-foreground">
              {connectionStatus === "connected" ? "Connected" : "Disconnected"}
            </span>
          </div>
          <div className="text-sm text-muted-foreground">{currentTime.toLocaleTimeString()}</div>
          <Button variant="outline" size="sm">
            <Bell className="h-4 w-4 mr-2" />
            Alerts (3)
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="alerts" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="alerts">Live Alerts</TabsTrigger>
              <TabsTrigger value="trains">Train Tracking</TabsTrigger>
              <TabsTrigger value="systems">System Status</TabsTrigger>
            </TabsList>

            <TabsContent value="alerts" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-card-foreground">Active Alerts</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
                      <span className="text-sm text-muted-foreground">Live</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-3">
                      {liveAlerts.map((alert) => (
                        <div key={alert.id} className="bg-secondary/30 rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              {getAlertIcon(alert.type)}
                              <div>
                                <h4 className="font-medium text-secondary-foreground">{alert.title}</h4>
                                <p className="text-sm text-muted-foreground">{alert.description}</p>
                              </div>
                            </div>
                            <Badge variant="outline" className={getAlertColor(alert.type)}>
                              {alert.type}
                            </Badge>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <MapPin className="h-3 w-3 text-muted-foreground" />
                                <span className="text-muted-foreground">{alert.location}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span className="text-muted-foreground">{alert.timestamp}</span>
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent">
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </Button>
                              {alert.status === "active" && (
                                <Button size="sm" className="h-7 text-xs">
                                  Resolve
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="trains" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">Live Train Tracking</CardTitle>
                  <p className="text-sm text-muted-foreground">Real-time train positions and status</p>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96">
                    <div className="space-y-3">
                      {liveTrains.map((train) => (
                        <div key={train.id} className="bg-secondary/30 rounded-lg p-4 space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full ${getSignalColor(train.signal)}`}></div>
                              <div>
                                <h4 className="font-medium text-secondary-foreground">{train.name}</h4>
                                <p className="text-sm text-muted-foreground">Train {train.id}</p>
                              </div>
                            </div>
                            <Badge
                              variant="outline"
                              className={
                                train.status === "on-time"
                                  ? "bg-accent/10 text-accent border-accent/20"
                                  : train.status === "held"
                                    ? "bg-destructive/10 text-destructive border-destructive/20"
                                    : "bg-primary/10 text-primary border-primary/20"
                              }
                            >
                              {train.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Speed</span>
                              <div className="font-medium text-secondary-foreground">{train.speed} km/h</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Location</span>
                              <div className="font-medium text-secondary-foreground">{train.location}</div>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Signal</span>
                              <div className="flex items-center gap-2">
                                <div className={`w-2 h-2 rounded-full ${getSignalColor(train.signal)}`}></div>
                                <span className="font-medium text-secondary-foreground capitalize">{train.signal}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="systems" className="space-y-4">
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-card-foreground">System Health</CardTitle>
                  <p className="text-sm text-muted-foreground">Infrastructure and system status monitoring</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {systemStatus.map((system, index) => (
                      <div key={index} className="bg-secondary/30 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(system.status)}
                            <span className="font-medium text-secondary-foreground">{system.name}</span>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              system.status === "operational"
                                ? "bg-accent/10 text-accent border-accent/20"
                                : "bg-chart-3/10 text-chart-3 border-chart-3/20"
                            }
                          >
                            {system.status}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-4">
                            <span className="text-muted-foreground">Uptime: {system.uptime}</span>
                            <span className="text-muted-foreground">Last check: {system.lastCheck}</span>
                          </div>
                          <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent">
                            Details
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Live Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-secondary/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-secondary-foreground">Active Trains</span>
                </div>
                <div className="text-2xl font-bold text-secondary-foreground">75</div>
                <div className="text-xs text-accent">+3 from last hour</div>
              </div>

              <div className="bg-secondary/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-chart-3" />
                  <span className="text-sm font-medium text-secondary-foreground">Active Alerts</span>
                </div>
                <div className="text-2xl font-bold text-secondary-foreground">3</div>
                <div className="text-xs text-destructive">1 critical, 2 warnings</div>
              </div>

              <div className="bg-secondary/30 rounded-lg p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="h-4 w-4 text-accent" />
                  <span className="text-sm font-medium text-secondary-foreground">System Load</span>
                </div>
                <div className="text-2xl font-bold text-secondary-foreground">67%</div>
                <div className="text-xs text-accent">Normal range</div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <AlertTriangle className="h-4 w-4 mr-2" />
                Emergency Stop All
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Zap className="h-4 w-4 mr-2" />
                Run Optimization
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Bell className="h-4 w-4 mr-2" />
                Broadcast Alert
              </Button>
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Eye className="h-4 w-4 mr-2" />
                View Network Map
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

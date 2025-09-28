import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, Download, Filter } from "lucide-react"

const performanceTrends = [
  { date: "2024-01-01", punctuality: 85, throughput: 120, delays: 8.5, utilization: 72 },
  { date: "2024-01-02", punctuality: 87, throughput: 125, delays: 7.2, utilization: 75 },
  { date: "2024-01-03", punctuality: 89, throughput: 132, delays: 6.8, utilization: 78 },
  { date: "2024-01-04", punctuality: 86, throughput: 128, delays: 7.5, utilization: 76 },
  { date: "2024-01-05", punctuality: 91, throughput: 138, delays: 5.9, utilization: 82 },
  { date: "2024-01-06", punctuality: 88, throughput: 135, delays: 6.3, utilization: 80 },
  { date: "2024-01-07", punctuality: 92, throughput: 142, delays: 5.1, utilization: 85 },
]

const hourlyAnalytics = [
  { hour: "00", trains: 12, delays: 0.5, efficiency: 95 },
  { hour: "04", trains: 25, delays: 1.2, efficiency: 92 },
  { hour: "06", trains: 45, delays: 2.8, efficiency: 88 },
  { hour: "08", trains: 78, delays: 4.5, efficiency: 82 },
  { hour: "10", trains: 72, delays: 3.2, efficiency: 85 },
  { hour: "12", trains: 68, delays: 2.9, efficiency: 87 },
  { hour: "14", trains: 75, delays: 3.1, efficiency: 86 },
  { hour: "16", trains: 82, delays: 4.8, efficiency: 81 },
  { hour: "18", trains: 89, delays: 5.2, efficiency: 79 },
  { hour: "20", trains: 65, delays: 2.1, efficiency: 90 },
  { hour: "22", trains: 35, delays: 1.0, efficiency: 94 },
]

const routePerformance = [
  { route: "Mumbai-Delhi", trains: 24, punctuality: 89, avgDelay: 4.2, utilization: 85 },
  { route: "Mumbai-Pune", trains: 45, punctuality: 92, avgDelay: 2.8, utilization: 78 },
  { route: "Mumbai-Ahmedabad", trains: 18, punctuality: 87, avgDelay: 5.1, utilization: 82 },
  { route: "Local Suburban", trains: 156, punctuality: 94, avgDelay: 1.9, utilization: 88 },
  { route: "Freight Corridor", trains: 32, punctuality: 76, avgDelay: 8.7, utilization: 65 },
]

const incidentAnalysis = [
  { type: "Signal Failure", count: 12, impact: "High", avgResolution: "45 min" },
  { type: "Track Maintenance", count: 8, impact: "Medium", avgResolution: "120 min" },
  { type: "Weather Delay", count: 15, impact: "Low", avgResolution: "25 min" },
  { type: "Rolling Stock Issue", count: 6, impact: "High", avgResolution: "90 min" },
  { type: "Platform Conflict", count: 22, impact: "Medium", avgResolution: "15 min" },
]

const kpiData = [
  { name: "Punctuality", current: 87, target: 90, trend: "+3%", status: "improving" },
  { name: "Throughput", current: 142, target: 150, trend: "+5%", status: "improving" },
  { name: "Avg Delay", current: 4.2, target: 3.0, trend: "-8%", status: "improving" },
  { name: "Utilization", current: 78, target: 85, trend: "+2%", status: "stable" },
]

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Performance Analytics</h1>
          <p className="text-muted-foreground">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <Select defaultValue="7d">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => (
          <Card key={index} className="bg-card border-border">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-muted-foreground">{kpi.name}</span>
                <div className="flex items-center gap-1 text-xs">
                  {kpi.trend.startsWith("+") || kpi.trend.startsWith("-") ? (
                    kpi.trend.startsWith("+") ? (
                      <TrendingUp className="h-3 w-3 text-accent" />
                    ) : (
                      <TrendingUp className="h-3 w-3 text-destructive rotate-180" />
                    )
                  ) : null}
                  <span
                    className={
                      kpi.trend.startsWith("+")
                        ? "text-accent"
                        : kpi.trend.startsWith("-")
                          ? "text-destructive"
                          : "text-muted-foreground"
                    }
                  >
                    {kpi.trend}
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-card-foreground">
                  {kpi.current}
                  {kpi.name === "Avg Delay" ? "m" : kpi.name === "Throughput" ? "" : "%"}
                </span>
                <Badge
                  variant="outline"
                  className={
                    kpi.status === "improving"
                      ? "bg-accent/10 text-accent border-accent/20"
                      : "bg-primary/10 text-primary border-primary/20"
                  }
                >
                  {kpi.status}
                </Badge>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Target: {kpi.target}
                {kpi.name === "Avg Delay" ? "m" : kpi.name === "Throughput" ? "" : "%"}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="trends">Performance Trends</TabsTrigger>
          <TabsTrigger value="hourly">Hourly Analysis</TabsTrigger>
          <TabsTrigger value="routes">Route Performance</TabsTrigger>
          <TabsTrigger value="incidents">Incident Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Punctuality & Throughput</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="date"
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                        tickFormatter={(value) =>
                          new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                        }
                      />
                      <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          color: "hsl(var(--card-foreground))",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="punctuality"
                        stroke="hsl(var(--primary))"
                        strokeWidth={2}
                        name="Punctuality (%)"
                      />
                      <Line
                        type="monotone"
                        dataKey="throughput"
                        stroke="hsl(var(--accent))"
                        strokeWidth={2}
                        name="Throughput"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Delays & Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="date"
                        tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                        tickFormatter={(value) =>
                          new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric" })
                        }
                      />
                      <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "hsl(var(--card))",
                          border: "1px solid hsl(var(--border))",
                          borderRadius: "8px",
                          color: "hsl(var(--card-foreground))",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="delays"
                        stackId="1"
                        stroke="hsl(var(--destructive))"
                        fill="hsl(var(--destructive))"
                        fillOpacity={0.3}
                        name="Avg Delays (min)"
                      />
                      <Area
                        type="monotone"
                        dataKey="utilization"
                        stackId="2"
                        stroke="hsl(var(--chart-3))"
                        fill="hsl(var(--chart-3))"
                        fillOpacity={0.3}
                        name="Utilization (%)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="hourly" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">24-Hour Performance Analysis</CardTitle>
              <p className="text-sm text-muted-foreground">Train movements, delays, and efficiency by hour</p>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={hourlyAnalytics}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="hour" tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                    <YAxis tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                        color: "hsl(var(--card-foreground))",
                      }}
                    />
                    <Bar dataKey="trains" fill="hsl(var(--primary))" name="Train Count" />
                    <Bar dataKey="delays" fill="hsl(var(--destructive))" name="Avg Delays (min)" />
                    <Bar dataKey="efficiency" fill="hsl(var(--accent))" name="Efficiency %" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="routes" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Route Performance Comparison</CardTitle>
              <p className="text-sm text-muted-foreground">Performance metrics by route and service type</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {routePerformance.map((route, index) => (
                  <div key={index} className="bg-secondary/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-medium text-secondary-foreground">{route.route}</h4>
                        <p className="text-sm text-muted-foreground">{route.trains} trains daily</p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          route.punctuality >= 90
                            ? "bg-accent/10 text-accent border-accent/20"
                            : route.punctuality >= 80
                              ? "bg-primary/10 text-primary border-primary/20"
                              : "bg-destructive/10 text-destructive border-destructive/20"
                        }
                      >
                        {route.punctuality}% On-time
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Avg Delay</span>
                        <div className="font-medium text-secondary-foreground">{route.avgDelay}m</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Utilization</span>
                        <div className="font-medium text-secondary-foreground">{route.utilization}%</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Daily Trains</span>
                        <div className="font-medium text-secondary-foreground">{route.trains}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incidents" className="space-y-4">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Incident Analysis</CardTitle>
              <p className="text-sm text-muted-foreground">Breakdown of incidents and their impact on operations</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {incidentAnalysis.map((incident, index) => (
                  <div key={index} className="bg-secondary/30 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-secondary-foreground">{incident.type}</h4>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className={
                            incident.impact === "High"
                              ? "bg-destructive/10 text-destructive border-destructive/20"
                              : incident.impact === "Medium"
                                ? "bg-chart-3/10 text-chart-3 border-chart-3/20"
                                : "bg-primary/10 text-primary border-primary/20"
                          }
                        >
                          {incident.impact} Impact
                        </Badge>
                        <Badge variant="secondary">{incident.count} incidents</Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Average Resolution Time</span>
                      <span className="font-medium text-secondary-foreground">{incident.avgResolution}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

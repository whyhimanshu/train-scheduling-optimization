import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts"
import { TrendingUp, Zap } from "lucide-react"

const performanceData = [
  { metric: "Punctuality", value: 87, target: 90, trend: "+3%" },
  { metric: "Throughput", value: 142, target: 150, trend: "+5%" },
  { metric: "Platform Utilization", value: 78, target: 85, trend: "+2%" },
  { metric: "Average Delay", value: 4.2, target: 3.0, trend: "-8%" },
]

const hourlyThroughput = [
  { hour: "06", trains: 45 },
  { hour: "07", trains: 62 },
  { hour: "08", trains: 78 },
  { hour: "09", trains: 85 },
  { hour: "10", trains: 72 },
  { hour: "11", trains: 68 },
  { hour: "12", trains: 75 },
]

const trainTypeData = [
  { name: "Express", value: 35, color: "hsl(var(--primary))" },
  { name: "Local", value: 45, color: "hsl(var(--accent))" },
  { name: "Freight", value: 20, color: "hsl(var(--chart-3))" },
]

export function PerformanceMetrics() {
  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-card-foreground">Performance Metrics</CardTitle>
            <p className="text-sm text-muted-foreground">Key performance indicators and analytics</p>
          </div>
          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
            <TrendingUp className="h-3 w-3 mr-1" />
            Improving
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {performanceData.map((item, index) => (
            <div key={index} className="bg-secondary/30 rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-secondary-foreground">{item.metric}</span>
                <div className="flex items-center gap-1 text-xs">
                  {item.trend.startsWith("+") ? (
                    <TrendingUp className="h-3 w-3 text-accent" />
                  ) : (
                    <TrendingUp className="h-3 w-3 text-destructive rotate-180" />
                  )}
                  <span className={item.trend.startsWith("+") ? "text-accent" : "text-destructive"}>{item.trend}</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-secondary-foreground">
                    {item.value}
                    {item.metric === "Average Delay" ? "m" : item.metric === "Throughput" ? "" : "%"}
                  </span>
                  <span className="text-muted-foreground">
                    Target: {item.target}
                    {item.metric === "Average Delay" ? "m" : item.metric === "Throughput" ? "" : "%"}
                  </span>
                </div>
                <Progress
                  value={
                    item.metric === "Average Delay"
                      ? (item.target / item.value) * 100
                      : (item.value / item.target) * 100
                  }
                  className="h-2"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-medium text-card-foreground mb-3">Hourly Throughput</h4>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyThroughput}>
                  <XAxis
                    dataKey="hour"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 10 }}
                  />
                  <YAxis hide />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                      color: "hsl(var(--card-foreground))",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="trains" fill="hsl(var(--primary))" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-medium text-card-foreground mb-3">Train Types</h4>
            <div className="h-32">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={trainTypeData} cx="50%" cy="50%" innerRadius={20} outerRadius={50} dataKey="value">
                    {trainTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                      color: "hsl(var(--card-foreground))",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 mt-2">
              {trainTypeData.map((item, index) => (
                <div key={index} className="flex items-center gap-1 text-xs">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-secondary/30 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-secondary-foreground">AI Optimization Impact</span>
          </div>
          <div className="grid grid-cols-3 gap-3 text-xs">
            <div className="text-center">
              <div className="text-accent font-medium">+12%</div>
              <div className="text-muted-foreground">Efficiency</div>
            </div>
            <div className="text-center">
              <div className="text-accent font-medium">-8%</div>
              <div className="text-muted-foreground">Delays</div>
            </div>
            <div className="text-center">
              <div className="text-accent font-medium">+5%</div>
              <div className="text-muted-foreground">Throughput</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

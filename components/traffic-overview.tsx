import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts"
import { TrendingUp, TrendingDown, Clock, Train } from "lucide-react"

const trafficData = [
  { time: "06:00", trains: 45, delays: 2 },
  { time: "07:00", trains: 62, delays: 4 },
  { time: "08:00", trains: 78, delays: 6 },
  { time: "09:00", trains: 85, delays: 3 },
  { time: "10:00", trains: 72, delays: 2 },
  { time: "11:00", trains: 68, delays: 1 },
  { time: "12:00", trains: 75, delays: 3 },
]

export function TrafficOverview() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-card-foreground">Traffic Overview</CardTitle>
          <p className="text-sm text-muted-foreground">Real-time train movements and delays</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20">
            Live Data
          </Badge>
          <Button variant="outline" size="sm">
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-secondary/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Train className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-secondary-foreground">Active Trains</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-secondary-foreground">75</span>
              <div className="flex items-center gap-1 text-xs text-accent">
                <TrendingUp className="h-3 w-3" />
                <span>+12%</span>
              </div>
            </div>
          </div>

          <div className="bg-secondary/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="h-4 w-4 text-chart-3" />
              <span className="text-sm font-medium text-secondary-foreground">Avg Delay</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-secondary-foreground">4.2m</span>
              <div className="flex items-center gap-1 text-xs text-destructive">
                <TrendingDown className="h-3 w-3" />
                <span>-8%</span>
              </div>
            </div>
          </div>

          <div className="bg-secondary/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-accent rounded-full"></div>
              <span className="text-sm font-medium text-secondary-foreground">On Time</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-secondary-foreground">87%</span>
              <div className="flex items-center gap-1 text-xs text-accent">
                <TrendingUp className="h-3 w-3" />
                <span>+3%</span>
              </div>
            </div>
          </div>

          <div className="bg-secondary/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 bg-primary rounded-full"></div>
              <span className="text-sm font-medium text-secondary-foreground">Throughput</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-secondary-foreground">142</span>
              <div className="flex items-center gap-1 text-xs text-accent">
                <TrendingUp className="h-3 w-3" />
                <span>+5%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trafficData}>
              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
              />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
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
                dataKey="trains"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--primary))", strokeWidth: 2, r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="delays"
                stroke="hsl(var(--destructive))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--destructive))", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

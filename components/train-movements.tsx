import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Train, MapPin, Clock, AlertCircle, CheckCircle, Pause } from "lucide-react"

const trainData = [
  {
    id: "12951",
    name: "Mumbai Rajdhani Express",
    type: "Express",
    status: "on-time",
    currentLocation: "Platform 2",
    nextAction: "Departure in 3 min",
    priority: "high",
    delay: 0,
    route: "Mumbai → New Delhi",
  },
  {
    id: "67890",
    name: "Local Suburban",
    type: "Local",
    status: "delayed",
    currentLocation: "Signal 45A",
    nextAction: "Waiting for clearance",
    priority: "medium",
    delay: 5,
    route: "Andheri → Churchgate",
  },
  {
    id: "24567",
    name: "Freight Container",
    type: "Freight",
    status: "moving",
    currentLocation: "Track 3B",
    nextAction: "Approaching junction",
    priority: "low",
    delay: 0,
    route: "JNPT → Tughlakabad",
  },
  {
    id: "11058",
    name: "Amritsar Express",
    type: "Express",
    status: "held",
    currentLocation: "Outer Signal",
    nextAction: "Platform allocation pending",
    priority: "high",
    delay: 8,
    route: "Mumbai → Amritsar",
  },
  {
    id: "19216",
    name: "Saurashtra Express",
    type: "Express",
    status: "on-time",
    currentLocation: "Platform 4",
    nextAction: "Boarding in progress",
    priority: "medium",
    delay: 0,
    route: "Mumbai → Rajkot",
  },
]

const getStatusIcon = (status: string) => {
  switch (status) {
    case "on-time":
      return <CheckCircle className="h-4 w-4 text-accent" />
    case "delayed":
      return <AlertCircle className="h-4 w-4 text-destructive" />
    case "held":
      return <Pause className="h-4 w-4 text-chart-3" />
    default:
      return <Train className="h-4 w-4 text-primary" />
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "on-time":
      return "bg-accent/10 text-accent border-accent/20"
    case "delayed":
      return "bg-destructive/10 text-destructive border-destructive/20"
    case "held":
      return "bg-chart-3/10 text-chart-3 border-chart-3/20"
    default:
      return "bg-primary/10 text-primary border-primary/20"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "high":
      return "bg-destructive text-destructive-foreground"
    case "medium":
      return "bg-chart-3 text-chart-3-foreground"
    default:
      return "bg-secondary text-secondary-foreground"
  }
}

export function TrainMovements() {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-card-foreground">Active Train Movements</CardTitle>
          <p className="text-sm text-muted-foreground">Real-time train positions and status</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <MapPin className="h-4 w-4 mr-2" />
            Track View
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-96">
          <div className="space-y-3">
            {trainData.map((train) => (
              <div key={train.id} className="bg-secondary/30 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(train.status)}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-secondary-foreground">{train.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {train.id}
                        </Badge>
                        <Badge className={`text-xs ${getPriorityColor(train.priority)}`}>{train.priority}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{train.route}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className={`${getStatusColor(train.status)}`}>
                    {train.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-secondary-foreground">{train.currentLocation}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-secondary-foreground">{train.nextAction}</span>
                  </div>
                </div>

                {train.delay > 0 && (
                  <div className="flex items-center gap-2 text-sm">
                    <AlertCircle className="h-4 w-4 text-destructive" />
                    <span className="text-destructive">Delayed by {train.delay} minutes</span>
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <Badge variant="secondary" className="text-xs">
                    {train.type}
                  </Badge>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent">
                      Details
                    </Button>
                    <Button size="sm" variant="outline" className="h-7 text-xs bg-transparent">
                      Control
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

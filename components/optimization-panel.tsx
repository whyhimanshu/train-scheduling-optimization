"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Zap, Brain, CheckCircle, AlertTriangle, Clock } from "lucide-react"
import { useState } from "react"

type Rec = {
  id: number
  type: string
  title: string
  description: string
  confidence: number
  impact: "Low" | "Medium" | "High"
  status: "pending" | "applied"
}

const initialRecommendations: Rec[] = [
  {
    id: 1,
    type: "priority",
    title: "Prioritize Express 12951",
    description: "Clear platform 3 for incoming Rajdhani Express",
    confidence: 95,
    impact: "High",
    status: "pending",
  },
  {
    id: 2,
    type: "routing",
    title: "Reroute Freight 24567",
    description: "Use alternate track to avoid passenger conflict",
    confidence: 87,
    impact: "Medium",
    status: "pending",
  },
  {
    id: 3,
    type: "timing",
    title: "Hold Local 67890",
    description: "Delay by 3 minutes to optimize crossing",
    confidence: 92,
    impact: "Low",
    status: "applied",
  },
]

export function OptimizationPanel() {
  const [recs, setRecs] = useState<Rec[]>(initialRecommendations)
  const [loading, setLoading] = useState(false)
  const [aiText, setAiText] = useState<string | null>(null)

  async function runOptimization() {
    try {
      setLoading(true)
      setAiText(null)
      const res = await fetch("/api/ai/optimize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "recommendations",
          context: {
            recommendations: recs.map(({ id, status, impact, title, description }) => ({
              id,
              status,
              impact,
              title,
              description,
            })),
          },
        }),
      })
      const data = await res.json()
      setAiText(data.text || "No AI output.")
    } catch (e) {
      setAiText("AI optimization failed. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  function applyRec(id: number) {
    setRecs((prev) => prev.map((r) => (r.id === id ? { ...r, status: "applied" } : r)))
  }
  function rejectRec(id: number) {
    setRecs((prev) => prev.filter((r) => r.id !== id))
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-primary" />
            <CardTitle className="text-card-foreground">AI Optimizer</CardTitle>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            <Zap className="h-3 w-3 mr-1" />
            Active
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground">Real-time optimization recommendations</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-secondary/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-secondary-foreground">System Confidence</span>
            <span className="text-sm text-accent">91%</span>
          </div>
          <Progress value={91} className="h-2" />
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-card-foreground">Recommendations</h4>
          {recs.map((rec) => (
            <div key={rec.id} className="bg-secondary/30 rounded-lg p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {rec.status === "applied" ? (
                    <CheckCircle className="h-4 w-4 text-accent" />
                  ) : rec.impact === "High" ? (
                    <AlertTriangle className="h-4 w-4 text-chart-3" />
                  ) : (
                    <Clock className="h-4 w-4 text-primary" />
                  )}
                  <span className="text-sm font-medium text-secondary-foreground">{rec.title}</span>
                </div>
                <Badge
                  variant={rec.impact === "High" ? "destructive" : rec.impact === "Medium" ? "default" : "secondary"}
                  className="text-xs"
                >
                  {rec.impact}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{rec.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Confidence: {rec.confidence}%</span>
                {rec.status === "pending" ? (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-6 text-xs bg-transparent"
                      onClick={() => rejectRec(rec.id)}
                    >
                      Reject
                    </Button>
                    <Button size="sm" className="h-6 text-xs" onClick={() => applyRec(rec.id)}>
                      Apply
                    </Button>
                  </div>
                ) : (
                  <Badge variant="outline" className="text-xs bg-accent/10 text-accent border-accent/20">
                    Applied
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        <Button className="w-full bg-transparent" variant="outline" onClick={runOptimization} disabled={loading}>
          <Brain className="h-4 w-4 mr-2" />
          {loading ? "Running Optimization..." : "Run Full Optimization"}
        </Button>

        {aiText && (
          <div className="bg-secondary/30 rounded-lg p-3">
            <h5 className="text-sm font-medium text-card-foreground mb-2">AI Plan</h5>
            <p className="text-xs whitespace-pre-wrap text-muted-foreground">{aiText}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

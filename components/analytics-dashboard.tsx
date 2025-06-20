import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BarChart3, TrendingUp, Calendar } from "lucide-react"

interface AnalyticsProps {
  analytics: {
    totalProducts: number
    totalLeads: number
    totalCategories: number
    totalBrands: number
    featuredProducts: number
    recentLeads: number
    leadsBySource: Record<string, number>
  }
}

export function AnalyticsDashboard({ analytics }: AnalyticsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <Card className="border-0 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics.recentLeads}</div>
          <p className="text-xs text-muted-foreground">New leads this week</p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Featured Products</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{analytics.featuredProducts}</div>
          <p className="text-xs text-muted-foreground">
            {((analytics.featuredProducts / analytics.totalProducts) * 100).toFixed(1)}% of total
          </p>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-lg">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Lead Sources</CardTitle>
          <BarChart3 className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {Object.entries(analytics.leadsBySource).map(([source, count]) => (
              <div key={source} className="flex items-center justify-between">
                <Badge variant="outline" className="capitalize">
                  {source}
                </Badge>
                <span className="text-sm font-medium">{count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

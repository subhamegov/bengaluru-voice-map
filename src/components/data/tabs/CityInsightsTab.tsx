import React from 'react';
import { Building2, BarChart3, TrendingUp, Lightbulb, AlertTriangle, FileText, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { DepartmentRatingsDetail } from '../cards/DepartmentRatingsDetail';
import { OverviewCards } from '../cards/OverviewCards';
import { StatusByBoundaryTable } from '../cards/StatusByBoundaryTable';
import { ComplaintsByStatusBar } from '../cards/ComplaintsByStatusBar';
import { cn } from '@/lib/utils';

interface Props {
  timeRange: string;
  subCounty: string;
}

// Mock data for proactive vs reactive insights
const REACTIVE_TOP = [
  { category: 'Road Repair', complaints: 512, trend: 'up' as const },
  { category: 'Garbage Collection', complaints: 487, trend: 'up' as const },
  { category: 'Water Supply', complaints: 342, trend: 'stable' as const },
  { category: 'Street Lighting', complaints: 156, trend: 'down' as const },
];

const PROACTIVE_TOP = [
  { title: 'Community road repair fund', supporters: 234, category: 'Road Repair' },
  { title: 'Ward-level waste composting', supporters: 189, category: 'Garbage Collection' },
  { title: 'Rainwater harvesting pilot', supporters: 156, category: 'Water Supply' },
  { title: 'Park adoption programme', supporters: 98, category: 'Parks' },
];

const OVERLAP_INSIGHTS = [
  'Road repair is the top complaint category and also the most proposed community improvement.',
  'Garbage collection complaints are rising, and a citizen-led composting proposal has 189 supporters.',
  'Water supply complaints are steady — a rainwater harvesting pilot proposal is gaining traction.',
];

export function CityInsightsTab({ timeRange, subCounty }: Props) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Section 1: Department Ratings */}
      <section className="space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
            <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground">Department Ratings</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">Citizen feedback and performance ratings by department</p>
          </div>
        </div>
        <DepartmentRatingsDetail />
      </section>

      {/* Section 2: City Service Performance */}
      <section className="space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground">City Service Performance</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">Overall complaint metrics across the city</p>
          </div>
        </div>
        <OverviewCards timeRange={timeRange} subCounty={subCounty} />
        <ComplaintsByStatusBar />
      </section>

      {/* Section 3: Ward Comparison */}
      <section className="space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground">Ward Comparison</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">Compare complaint data, resolution time, and types across wards</p>
          </div>
        </div>
        <StatusByBoundaryTable />
      </section>

      {/* Section 4: Proactive vs Reactive Governance */}
      <section className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-success" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">City Action Insights</h2>
            <p className="text-sm text-muted-foreground">Where complaints and citizen proposals intersect</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Reactive: Top Complaints */}
          <Card className="gov-card">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <CardTitle className="text-base">Reactive — Top Complaint Categories</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {REACTIVE_TOP.map((item) => (
                <div key={item.category} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div>
                    <p className="font-semibold text-foreground text-sm">{item.category}</p>
                    <p className="text-xs text-muted-foreground">{item.complaints.toLocaleString()} complaints</p>
                  </div>
                  <Badge
                    className={cn(
                      'text-xs border-0',
                      item.trend === 'up' ? 'bg-destructive/10 text-destructive' :
                      item.trend === 'down' ? 'bg-success/10 text-success' :
                      'bg-muted text-muted-foreground'
                    )}
                  >
                    {item.trend === 'up' ? '↑ Rising' : item.trend === 'down' ? '↓ Declining' : '→ Stable'}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Proactive: Top Proposals */}
          <Card className="gov-card">
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-success" />
                <CardTitle className="text-base">Proactive — Top Citizen Proposals</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {PROACTIVE_TOP.map((item) => (
                <div key={item.title} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex-1 min-w-0 mr-3">
                    <p className="font-semibold text-foreground text-sm truncate">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.supporters} supporters • {item.category}</p>
                  </div>
                  <Link to="/proposals">
                    <Button variant="ghost" size="sm" className="gap-1 text-xs shrink-0">
                      View <ArrowRight className="w-3 h-3" />
                    </Button>
                  </Link>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Overlap Insights */}
        <Card className="gov-card border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="space-y-1.5">
                <p className="text-sm font-semibold text-foreground">Where Complaints & Proposals Overlap</p>
                {OVERLAP_INSIGHTS.map((insight, i) => (
                  <p key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    {insight}
                  </p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

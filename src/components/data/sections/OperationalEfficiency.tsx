import React from 'react';
import { Activity, TrendingUp, TrendingDown, AlertTriangle, Clock, CheckCircle2, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { OverviewCards } from '../cards/OverviewCards';
import { CumulativeLineChart } from '../cards/CumulativeLineChart';
import { AverageSolutionTimeCard } from '../cards/AverageSolutionTimeCard';
import { InfoTooltip } from '../ServiceAnalytics';
import { getOverviewStats, getComplaintsByStatus } from '@/lib/serviceAnalyticsData';

interface Props {
  timeRange: string;
  subCounty: string;
}

// Mock automated insights based on data
function generateInsights(timeRange: string, subCounty: string): string[] {
  const stats = getOverviewStats(timeRange, subCounty);
  const insights: string[] = [];

  if (stats.slaAchievementPercent < 80) {
    insights.push('On-time resolution has dipped below 80% — road and water complaints are taking longer.');
  } else {
    insights.push('Average resolution time improved by 12% compared to last period.');
  }

  insights.push('Road complaints increased 18% this month, primarily in South and East zones.');

  if (stats.completionRatePercent > 50) {
    insights.push(`${stats.completionRatePercent}% of complaints have been closed — up from last month.`);
  }

  return insights;
}

export function OperationalEfficiency({ timeRange, subCounty }: Props) {
  const statusData = getComplaintsByStatus();
  const insights = generateInsights(timeRange, subCounty);

  // Extract key statuses for the status strip
  const statusStrip = [
    { label: 'Open', count: statusData.find(s => s.status === 'Open')?.count || 0, icon: Clock, className: 'text-muted-foreground' },
    { label: 'Assigned', count: statusData.find(s => s.status === 'Assigned')?.count || 0, icon: Zap, className: 'text-primary' },
    { label: 'In Progress', count: statusData.find(s => s.status === 'In Progress')?.count || 0, icon: TrendingUp, className: 'text-amber-600' },
    { label: 'Resolved', count: statusData.find(s => s.status === 'Resolved')?.count || 0, icon: CheckCircle2, className: 'text-success' },
    { label: 'Escalated', count: statusData.find(s => s.status === 'Reopened')?.count || 0, icon: AlertTriangle, className: 'text-destructive' },
  ];

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Activity className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Operational Efficiency in Your Ward</h2>
          <p className="text-sm text-muted-foreground">How well is your ward's service delivery performing?</p>
        </div>
      </div>

      {/* KPI Cards */}
      <OverviewCards timeRange={timeRange} subCounty={subCounty} />

      {/* Status Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {statusStrip.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="gov-card">
              <CardContent className="p-4 flex items-center gap-3">
                <Icon className={`w-5 h-5 flex-shrink-0 ${s.className}`} />
                <div>
                  <p className="text-2xl font-bold text-foreground">{s.count.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Automated Insights */}
      <Card className="gov-card border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            <div className="space-y-1.5">
              <p className="text-sm font-semibold text-foreground">Key Insights</p>
              {insights.map((insight, i) => (
                <p key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  {insight}
                </p>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CumulativeLineChart timeRange={timeRange} />
        <AverageSolutionTimeCard />
      </div>
    </section>
  );
}

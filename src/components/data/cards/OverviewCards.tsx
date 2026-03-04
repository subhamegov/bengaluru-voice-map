import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { InfoTooltip } from '../ServiceAnalytics';
import { getOverviewStats, KPI_DEFINITIONS } from '@/lib/serviceAnalyticsData';

interface OverviewCardsProps {
  timeRange: string;
  subCounty: string;
}

export function OverviewCards({ timeRange, subCounty }: OverviewCardsProps) {
  const stats = getOverviewStats(timeRange, subCounty);

  const cards = [
    {
      label: 'Total Complaints',
      value: stats.totalComplaints.toLocaleString(),
      definition: KPI_DEFINITIONS.totalComplaints,
      trend: '+12%',
      trendUp: true,
    },
    {
      label: 'Closed Complaints',
      value: stats.closedComplaints.toLocaleString(),
      definition: KPI_DEFINITIONS.closedComplaints,
      trend: '+8%',
      trendUp: true,
    },
    {
      label: 'On-Time Resolution',
      value: `${stats.slaAchievementPercent}%`,
      definition: KPI_DEFINITIONS.slaAchievement,
      trend: '-2.1%',
      trendUp: false,
    },
    {
      label: 'Completion Rate',
      value: `${stats.completionRatePercent}%`,
      definition: KPI_DEFINITIONS.completionRate,
      trend: '+5.3%',
      trendUp: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.label} className="gov-card">
          <CardContent className="p-6">
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-muted-foreground">
                    {card.label}
                  </p>
                  <InfoTooltip definition={card.definition} />
                </div>
                <p className="text-3xl font-bold text-foreground">
                  {card.value}
                </p>
              </div>
              <div
                className={`flex items-center gap-1 text-sm font-medium ${
                  card.trendUp ? 'text-success' : 'text-destructive'
                }`}
              >
                {card.trendUp ? (
                  <TrendingUp className="w-4 h-4" />
                ) : (
                  <TrendingDown className="w-4 h-4" />
                )}
                {card.trend}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

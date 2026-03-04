import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InfoTooltip } from '../ServiceAnalytics';
import { getCumulativeData, KPI_DEFINITIONS } from '@/lib/serviceAnalyticsData';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface CumulativeLineChartProps {
  timeRange: string;
}

export function CumulativeLineChart({ timeRange }: CumulativeLineChartProps) {
  const data = getCumulativeData(timeRange);

  return (
    <Card className="gov-card">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg">Cumulative Complaints over Time</CardTitle>
          <InfoTooltip definition={KPI_DEFINITIONS.totalComplaints} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]" aria-label="Cumulative complaints line chart showing total, closed, and reopened complaints over time">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis
                dataKey="month"
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                labelStyle={{ color: 'hsl(var(--foreground))' }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="total"
                name="Total Complaints"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--primary))' }}
              />
              <Line
                type="monotone"
                dataKey="closed"
                name="Closed"
                stroke="hsl(var(--success))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--success))' }}
              />
              <Line
                type="monotone"
                dataKey="reopened"
                name="Reopened"
                stroke="hsl(var(--destructive))"
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--destructive))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

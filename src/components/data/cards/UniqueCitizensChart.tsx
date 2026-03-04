import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InfoTooltip } from '../ServiceAnalytics';
import { getUniqueCitizensData, KPI_DEFINITIONS } from '@/lib/serviceAnalyticsData';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface UniqueCitizensChartProps {
  timeRange: string;
}

export function UniqueCitizensChart({ timeRange }: UniqueCitizensChartProps) {
  const data = getUniqueCitizensData(timeRange);

  return (
    <Card className="gov-card">
      <CardHeader className="pb-2">
        <div className="flex items-center gap-2">
          <CardTitle className="text-lg">Unique Citizens Raising Complaints</CardTitle>
          <InfoTooltip definition={KPI_DEFINITIONS.uniqueCitizens} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[260px]" aria-label="Line chart showing unique citizens over time">
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
                formatter={(value: number) => [value.toLocaleString(), 'Citizens']}
              />
              <Line
                type="monotone"
                dataKey="count"
                name="Unique Citizens"
                stroke="#7B68AE"
                strokeWidth={2}
                dot={{ fill: '#7B68AE' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

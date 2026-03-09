import React from 'react';
import { Activity, MapPin, Heart, Map } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { OperationalEfficiency } from '../sections/OperationalEfficiency';
import { TopComplaintsChart } from '../cards/TopComplaintsChart';
import { CumulativeLineChart } from '../cards/CumulativeLineChart';

interface Props {
  timeRange: string;
  subCounty: string;
}

// Ward-level data for Koramangala (example ward)
const WARD_COMPLAINTS = {
  thisMonth: 456,
  closed: 378,
  avgResolution: 3.8,
  onTimePercent: 72,
  appreciations: 32,
  serviceCompletion: 83,
};

const WARD_TOP_COMPLAINTS = [
  { category: 'Water Outage', count: 156 },
  { category: 'Low Pressure', count: 98 },
  { category: 'Sewage Overflow', count: 87 },
  { category: 'Billing Dispute', count: 65 },
  { category: 'Pipe Burst', count: 47 },
];

const WARD_MONTHLY_TREND = [
  { month: 'Jul', total: 68, closed: 55 },
  { month: 'Aug', total: 72, closed: 61 },
  { month: 'Sep', total: 85, closed: 70 },
  { month: 'Oct', total: 78, closed: 68 },
  { month: 'Nov', total: 82, closed: 70 },
  { month: 'Dec', total: 71, closed: 53 },
];

const ZONE_COMPLAINTS = [
  { zone: 'Koramangala', count: 456, x: 52, y: 58 },
  { zone: 'Whitefield', count: 389, x: 82, y: 38 },
  { zone: 'Yelahanka', count: 312, x: 45, y: 12 },
  { zone: 'Indiranagar', count: 278, x: 62, y: 42 },
  { zone: 'Jayanagar', count: 241, x: 38, y: 62 },
  { zone: 'HSR Layout', count: 228, x: 55, y: 72 },
];

export function MyWardInsightsTab({ timeRange, subCounty }: Props) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Block 1: Ward Service Performance — reuse OperationalEfficiency */}
      <OperationalEfficiency timeRange={timeRange} subCounty={subCounty} />

      {/* Block 2: Top Local Issues */}
      <section className="space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
            <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground">Top Local Issues</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">Most reported complaint types in your ward</p>
          </div>
        </div>
        <TopComplaintsChart />
      </section>

      {/* Block 3: Ward Trends */}
      <section className="space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Activity className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground">Ward Trends</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">Monthly complaint trends for your ward</p>
          </div>
        </div>
        <CumulativeLineChart timeRange={timeRange} />
      </section>

      {/* Block 4: Complaints by Zone — static bubble map */}
      <section className="space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
            <Map className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground">Complaints by Zone</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">Complaint volume across major areas</p>
          </div>
        </div>
        <Card className="gov-card">
          <CardContent className="p-4 sm:p-6">
            <div className="relative w-full aspect-[4/3] bg-muted/20 rounded-lg border border-border overflow-hidden">
              {/* Simple SVG bubble map */}
              <svg viewBox="0 0 100 85" className="w-full h-full" aria-label="Bengaluru zone complaint bubbles">
                {/* City outline approximation */}
                <ellipse cx="50" cy="42" rx="42" ry="38" fill="none" stroke="hsl(var(--border))" strokeWidth="0.5" strokeDasharray="2 1" />
                {ZONE_COMPLAINTS.map((z) => {
                  const maxCount = Math.max(...ZONE_COMPLAINTS.map(zc => zc.count));
                  const minR = 4;
                  const maxR = 9;
                  const r = minR + ((z.count / maxCount) * (maxR - minR));
                  return (
                    <g key={z.zone}>
                      <circle
                        cx={z.x}
                        cy={z.y}
                        r={r}
                        fill="hsl(var(--primary))"
                        fillOpacity={0.25}
                        stroke="hsl(var(--primary))"
                        strokeWidth="0.5"
                      />
                      <text
                        x={z.x}
                        y={z.y - 0.5}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="fill-foreground"
                        fontSize="2.8"
                        fontWeight="700"
                      >
                        {z.count}
                      </text>
                      <text
                        x={z.x}
                        y={z.y + r + 2.5}
                        textAnchor="middle"
                        className="fill-muted-foreground"
                        fontSize="2.2"
                      >
                        {z.zone}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Block 5: Community Feedback (Appreciations) */}
      <section className="space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-success/10 flex items-center justify-center">
            <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground">Community Feedback</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">Appreciations and positive feedback received in your ward</p>
          </div>
        </div>
        <AppreciationCards />
      </section>
    </div>
  );
}

// Simple appreciation cards
function AppreciationCards() {
  const appreciations = [
    { dept: 'Environment and Solid Waste', count: 48, topPraise: 'Quick response' },
    { dept: 'Public Health', count: 28, topPraise: 'Thorough inspection' },
    { dept: 'Works', count: 22, topPraise: 'Quality work' },
    { dept: 'Mobility and ICT Infrastructure', count: 18, topPraise: 'Fast repair' },
    { dept: 'Water and Sewerage', count: 32, topPraise: 'Fast repair' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {appreciations.map((a) => (
        <div key={a.dept} className="p-4 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-foreground text-sm">{a.dept}</h4>
            <div className="flex items-center gap-1 text-success text-sm font-semibold">
              <Heart className="w-3.5 h-3.5 fill-success" />
              {a.count}
            </div>
          </div>
          <p className="text-xs text-muted-foreground">
            Top praise: <span className="font-medium text-foreground">{a.topPraise}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

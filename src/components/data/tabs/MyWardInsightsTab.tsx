import React from 'react';
import { Activity, MapPin, Heart } from 'lucide-react';
import { OperationalEfficiency } from '../sections/OperationalEfficiency';
import { TopComplaintsChart } from '../cards/TopComplaintsChart';
import { CumulativeLineChart } from '../cards/CumulativeLineChart';

interface Props {
  timeRange: string;
  subCounty: string;
}

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

      {/* Block 4: Community Feedback (Appreciations) */}
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
        {/* Reuse DepartmentRatingsDetail which shows appreciations */}
        <AppreciationCards />
      </section>
    </div>
  );
}

// Simple appreciation cards reusing existing data patterns
function AppreciationCards() {
  const appreciations = [
    { dept: 'Environment', count: 48, topPraise: 'Quick response' },
    { dept: 'Public Health', count: 28, topPraise: 'Thorough inspection' },
    { dept: 'Works', count: 22, topPraise: 'Quality work' },
    { dept: 'Mobility & ICT', count: 18, topPraise: 'Fast repair' },
    { dept: 'Water & Sewerage', count: 32, topPraise: 'Fast repair' },
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

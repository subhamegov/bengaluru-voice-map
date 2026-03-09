import React, { useState, useMemo } from 'react';
import { Filter, Info } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { OverviewCards } from './cards/OverviewCards';
import { CumulativeLineChart } from './cards/CumulativeLineChart';
import { ComplaintsBySourceChart } from './cards/ComplaintsBySourceChart';
import { ComplaintsByStatusBar } from './cards/ComplaintsByStatusBar';
import { ComplaintsByStatusPie } from './cards/ComplaintsByStatusPie';
import { ComplaintsByDepartmentPie } from './cards/ComplaintsByDepartmentPie';
import { ComplaintsByChannelPie } from './cards/ComplaintsByChannelPie';
import { AverageSolutionTimeCard } from './cards/AverageSolutionTimeCard';
import { UniqueCitizensChart } from './cards/UniqueCitizensChart';
import { TopComplaintsChart } from './cards/TopComplaintsChart';
import { StatusByBoundaryTable } from './cards/StatusByBoundaryTable';
import { MyComplaintsSummary } from './cards/MyComplaintsSummary';
import {
  SUB_COUNTIES,
  TIME_RANGES,
  CATEGORIES,
  SOURCES,
} from '@/lib/serviceAnalyticsData';

export function ServiceAnalytics() {
  const [subCounty, setSubCounty] = useState('all');
  const [timeRange, setTimeRange] = useState('30days');
  const [category, setCategory] = useState('all');
  const [source, setSource] = useState('all');

  return (
    <div className="space-y-6">
      {/* My Complaints Summary & Similar Complaints */}
      <MyComplaintsSummary />
      {/* Aggregate Analytics Filter Bar */}
      <Card className="gov-card">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Filter className="w-4 h-4" />
              Filters:
            </div>
            
            <Select value={subCounty} onValueChange={setSubCounty}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Zone" />
              </SelectTrigger>
              <SelectContent>
                {SUB_COUNTIES.map((sc) => (
                  <SelectItem key={sc.value} value={sc.value}>
                    {sc.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Time Range" />
              </SelectTrigger>
              <SelectContent>
                {TIME_RANGES.map((tr) => (
                  <SelectItem key={tr.value} value={tr.value}>
                    {tr.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={source} onValueChange={setSource}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                {SOURCES.map((src) => (
                  <SelectItem key={src.value} value={src.value}>
                    {src.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Card 1: Overview KPIs */}
      <OverviewCards timeRange={timeRange} subCounty={subCounty} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card 2: Cumulative Line Chart */}
        <CumulativeLineChart timeRange={timeRange} />

        {/* Card 3: By Source */}
        <ComplaintsBySourceChart />

        {/* Card 4: By Status Bar */}
        <ComplaintsByStatusBar />

        {/* Card 5: By Status Pie */}
        <ComplaintsByStatusPie />

        {/* Card 6: By Department */}
        <ComplaintsByDepartmentPie />

        {/* Card 7: By Channel */}
        <ComplaintsByChannelPie />

        {/* Card 8: Average Solution Time */}
        <AverageSolutionTimeCard />

        {/* Card 9: Unique Citizens */}
        <UniqueCitizensChart timeRange={timeRange} />
      </div>

      {/* Card 10: Top Complaints */}
      <TopComplaintsChart />

      {/* Card 11: Status by Boundary Table */}
      <StatusByBoundaryTable />
    </div>
  );
}

// Reusable tooltip info icon
export function InfoTooltip({ definition }: { definition: string }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          className="inline-flex items-center justify-center w-5 h-5 rounded-full hover:bg-muted transition-colors"
          aria-label="View definition"
        >
          <Info className="w-4 h-4 text-muted-foreground" />
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs text-sm">
        {definition}
      </TooltipContent>
    </Tooltip>
  );
}

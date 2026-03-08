import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { OperationalEfficiency } from './sections/OperationalEfficiency';
import { WardSentiment } from './sections/WardSentiment';
import { QualityOfLife } from './sections/QualityOfLife';
import { CommunityAction } from './sections/CommunityAction';
import {
  SUB_COUNTIES,
  TIME_RANGES,
  CATEGORIES,
  SOURCES,
} from '@/lib/serviceAnalyticsData';

export function CitizenDashboard() {
  const [subCounty, setSubCounty] = useState('all');
  const [timeRange, setTimeRange] = useState('30days');
  const [category, setCategory] = useState('all');
  const [source, setSource] = useState('all');

  return (
    <div className="space-y-10">
      {/* Filters */}
      <Card className="gov-card">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Filter className="w-4 h-4" />
              Filters:
            </div>
            <Select value={subCounty} onValueChange={setSubCounty}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Ward" /></SelectTrigger>
              <SelectContent>
                {SUB_COUNTIES.map((sc) => (
                  <SelectItem key={sc.value} value={sc.value}>{sc.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Time Range" /></SelectTrigger>
              <SelectContent>
                {TIME_RANGES.map((tr) => (
                  <SelectItem key={tr.value} value={tr.value}>{tr.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Category" /></SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={source} onValueChange={setSource}>
              <SelectTrigger className="w-[180px]"><SelectValue placeholder="Source" /></SelectTrigger>
              <SelectContent>
                {SOURCES.map((src) => (
                  <SelectItem key={src.value} value={src.value}>{src.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Section 1: Operational Efficiency */}
      <OperationalEfficiency timeRange={timeRange} subCounty={subCounty} />

      {/* Section 2: Ward Sentiment */}
      <WardSentiment />

      {/* Section 3: Quality of Life */}
      <QualityOfLife />

      {/* Section 4: Community Action */}
      <CommunityAction />
    </div>
  );
}

import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MyTicketsTab } from './tabs/MyTicketsTab';
import { MyWardInsightsTab } from './tabs/MyWardInsightsTab';
import { CityInsightsTab } from './tabs/CityInsightsTab';
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
  const [activeTab, setActiveTab] = useState('my-tickets');

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-3">
          <TabsTrigger value="my-tickets">My Tickets</TabsTrigger>
          <TabsTrigger value="my-ward">My Ward Insights</TabsTrigger>
          <TabsTrigger value="city">City Insights</TabsTrigger>
        </TabsList>

        {/* Filters — shared across tabs */}
        <Card className="gov-card mt-4">
          <CardContent className="p-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <Filter className="w-4 h-4" />
                Filters:
              </div>
              <Select value={subCounty} onValueChange={setSubCounty}>
                <SelectTrigger className="w-full sm:w-[160px]"><SelectValue placeholder="Ward" /></SelectTrigger>
                <SelectContent>
                  {SUB_COUNTIES.map((sc) => (
                    <SelectItem key={sc.value} value={sc.value}>{sc.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-full sm:w-[160px]"><SelectValue placeholder="Time Range" /></SelectTrigger>
                <SelectContent>
                  {TIME_RANGES.map((tr) => (
                    <SelectItem key={tr.value} value={tr.value}>{tr.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-full sm:w-[160px]"><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={source} onValueChange={setSource}>
                <SelectTrigger className="w-full sm:w-[160px]"><SelectValue placeholder="Source" /></SelectTrigger>
                <SelectContent>
                  {SOURCES.map((src) => (
                    <SelectItem key={src.value} value={src.value}>{src.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <TabsContent value="my-tickets" className="mt-6 space-y-6">
          <MyTicketsTab />
        </TabsContent>

        <TabsContent value="my-ward" className="mt-6 space-y-6">
          <MyWardInsightsTab timeRange={timeRange} subCounty={subCounty} />
        </TabsContent>

        <TabsContent value="city" className="mt-6 space-y-6">
          <CityInsightsTab timeRange={timeRange} subCounty={subCounty} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

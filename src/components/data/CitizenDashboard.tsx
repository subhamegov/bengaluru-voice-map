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
    <div className="space-y-4 sm:space-y-6">
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full grid grid-cols-3 h-auto">
          <TabsTrigger value="my-tickets" className="text-xs sm:text-sm px-2 py-2">My Tickets</TabsTrigger>
          <TabsTrigger value="my-ward" className="text-xs sm:text-sm px-2 py-2">My Ward</TabsTrigger>
          <TabsTrigger value="city" className="text-xs sm:text-sm px-2 py-2">City Insights</TabsTrigger>
        </TabsList>

        {/* Filters — shared across tabs */}
        <Card className="gov-card mt-3 sm:mt-4">
          <CardContent className="p-3 sm:p-4">
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-muted-foreground">
                <Filter className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                Filters:
              </div>
              <Select value={subCounty} onValueChange={setSubCounty}>
                <SelectTrigger className="w-[calc(50%-0.5rem)] sm:w-[160px] text-xs sm:text-sm"><SelectValue placeholder="Ward" /></SelectTrigger>
                <SelectContent>
                  {SUB_COUNTIES.map((sc) => (
                    <SelectItem key={sc.value} value={sc.value}>{sc.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={timeRange} onValueChange={setTimeRange}>
                <SelectTrigger className="w-[calc(50%-0.5rem)] sm:w-[160px] text-xs sm:text-sm"><SelectValue placeholder="Time Range" /></SelectTrigger>
                <SelectContent>
                  {TIME_RANGES.map((tr) => (
                    <SelectItem key={tr.value} value={tr.value}>{tr.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[calc(50%-0.5rem)] sm:w-[160px] text-xs sm:text-sm"><SelectValue placeholder="Category" /></SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={source} onValueChange={setSource}>
                <SelectTrigger className="w-[calc(50%-0.5rem)] sm:w-[160px] text-xs sm:text-sm"><SelectValue placeholder="Source" /></SelectTrigger>
                <SelectContent>
                  {SOURCES.map((src) => (
                    <SelectItem key={src.value} value={src.value}>{src.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <TabsContent value="my-tickets" className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
          <MyTicketsTab />
        </TabsContent>

        <TabsContent value="my-ward" className="mt-4 sm:mt-6 space-y-4 sm:space-y-6">
          <MyWardInsightsTab timeRange={timeRange} subCounty={subCounty} />
        </TabsContent>

        <TabsContent value="city" className="mt-6 space-y-6">
          <CityInsightsTab timeRange={timeRange} subCounty={subCounty} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

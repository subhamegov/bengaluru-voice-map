import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { UX4GPageHeader } from '@/components/layout/UX4GPageHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ServiceAnalytics } from '@/components/data/ServiceAnalytics';
import { BarChart3, TrendingUp } from 'lucide-react';

export default function Data() {
  const [activeTab, setActiveTab] = useState('service');

  return (
    <AppLayout>
      <div className="space-y-6">
        <UX4GPageHeader
          icon={BarChart3}
          title="Data & Analytics"
          description="Aggregate complaint analytics and service performance metrics."
        />

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2 mb-6">
            <TabsTrigger value="service" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Service
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2" disabled>
              <TrendingUp className="w-4 h-4" />
              Trends
            </TabsTrigger>
          </TabsList>

          <TabsContent value="service" className="mt-0">
            <ServiceAnalytics />
          </TabsContent>

          <TabsContent value="trends">
            <div className="text-center py-12 text-muted-foreground">
              Trends analytics coming soon
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

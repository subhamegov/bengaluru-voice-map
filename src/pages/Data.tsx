import React from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { UX4GPageHeader } from '@/components/layout/UX4GPageHeader';
import { CitizenDashboard } from '@/components/data/CitizenDashboard';
import { BarChart3 } from 'lucide-react';

export default function Data() {
  return (
    <AppLayout>
      <div className="space-y-6">
        <UX4GPageHeader
          icon={BarChart3}
          title="Civic Intelligence"
          description="Understand how your ward is functioning, what residents are talking about, and where you can help."
        />
        <CitizenDashboard />
      </div>
    </AppLayout>
  );
}

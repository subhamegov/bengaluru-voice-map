import { ClipboardList } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { UX4GPageHeader } from '@/components/layout/UX4GPageHeader';
import { ActiveSurveys } from '@/components/surveys/ActiveSurveys';

const Surveys = () => {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <UX4GPageHeader
          icon={ClipboardList}
          title="Active Surveys"
          description="Participate in surveys that shape city priorities and infrastructure planning. Your feedback directly influences service delivery."
        />
        <ActiveSurveys />
      </div>
    </AppLayout>
  );
};

export default Surveys;

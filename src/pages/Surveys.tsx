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
          description="Shape city decisions"
        />
        <ActiveSurveys />
      </div>
    </AppLayout>
  );
};

export default Surveys;

import { FileText } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { UX4GPageHeader } from '@/components/layout/UX4GPageHeader';
import { PolicyFeedbackSection } from '@/components/policy/PolicyFeedbackSection';

const Policy = () => {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto">
        <UX4GPageHeader
          icon={FileText}
          title="Policy Feedback"
          description="Improve city policies"
        />
        <PolicyFeedbackSection />
      </div>
    </AppLayout>
  );
};

export default Policy;

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
          title="Provide Policy Feedback"
          description="Share your views on draft laws, regulations, and city plans before they are finalized."
        />
        <PolicyFeedbackSection />
      </div>
    </AppLayout>
  );
};

export default Policy;

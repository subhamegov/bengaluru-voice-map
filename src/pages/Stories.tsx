import React from 'react';
import { MessageCircle } from 'lucide-react';
import { AppLayout } from '@/components/layout/AppLayout';
import { UX4GPageHeader } from '@/components/layout/UX4GPageHeader';
import { StoryFeed } from '@/components/story/StoryFeed';

const Stories = () => {
  return (
    <AppLayout>
      <div className="max-w-3xl mx-auto">
        <UX4GPageHeader
          icon={MessageCircle}
          title="Community Stories"
          description="Browse citizen reports, ideas, and appreciations from across the city."
        />
        <StoryFeed />
      </div>
    </AppLayout>
  );
};

export default Stories;

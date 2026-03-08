import React from 'react';
import { Link } from 'react-router-dom';
import { Users, ThumbsUp, MessageSquare, Eye, FileText, ArrowRight, LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ActionItem {
  title: string;
  description: string;
  icon: LucideIcon;
  link: string;
  linkLabel: string;
  badge?: string;
  stat?: string;
}

const COMMUNITY_ACTIONS: ActionItem[] = [
  {
    title: 'Support a Proposal',
    description: 'Back citizen proposals for ward improvements — road fixes, park upgrades, traffic changes.',
    icon: ThumbsUp,
    link: '/proposals',
    linkLabel: 'View Proposals',
    badge: '3 new',
    stat: '12 active proposals in your ward',
  },
  {
    title: 'Join Neighbourhood Discussion',
    description: 'Participate in ongoing discussions about issues affecting your area.',
    icon: MessageSquare,
    link: '/about-my-city',
    linkLabel: 'Join Discussion',
    stat: '48 active discussions',
  },
  {
    title: 'Track Project Updates',
    description: 'Follow government works and infrastructure projects happening near you.',
    icon: Eye,
    link: '/about-my-city',
    linkLabel: 'View Projects',
    badge: '2 updates',
    stat: '7 active projects in your ward',
  },
  {
    title: 'Submit Additional Reports',
    description: 'Help by reporting unresolved issues — your input helps prioritise ward improvements.',
    icon: FileText,
    link: '/report',
    linkLabel: 'Report an Issue',
    stat: '150+ citizens reported this month',
  },
];

export function CommunityAction() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
          <Users className="w-5 h-5 text-amber-600" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Where Your Community Can Help</h2>
          <p className="text-sm text-muted-foreground">Take action on unresolved issues and rising complaints</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {COMMUNITY_ACTIONS.map((action) => {
          const Icon = action.icon;
          return (
            <Card key={action.title} className="gov-card hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground text-sm">{action.title}</h3>
                      {action.badge && (
                        <Badge variant="secondary" className="text-xs">{action.badge}</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{action.description}</p>
                    {action.stat && (
                      <p className="text-xs text-muted-foreground mb-3">{action.stat}</p>
                    )}
                    <Link to={action.link}>
                      <Button variant="outline" size="sm" className="gap-1.5">
                        {action.linkLabel}
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

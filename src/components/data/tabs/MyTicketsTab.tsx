import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  User, ArrowRight, FileText, FolderKanban, MessageSquare, ThumbsUp,
  Clock, TrendingUp, CheckCircle2, Users, Heart, ClipboardList,
  Megaphone, Eye, Sparkles,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Story, ISSUE_CATEGORIES } from '@/types/story';
import { ISSUE_CATEGORY_ICONS } from '@/lib/iconMaps';
import { apiClient } from '@/lib/apiClient';
import { cn } from '@/lib/utils';
import { InfoTooltip } from '../ServiceAnalytics';
import { getComplaintsByDepartment, getOverviewStats } from '@/lib/serviceAnalyticsData';
import { getCompletedSurveys } from '@/lib/surveyData';

const CATEGORY_TO_DEPARTMENT: Record<string, string> = {
  'WASTE': 'Environment',
  'WATER': 'Water and Sewerage',
  'ROADS': 'Works',
  'STREETLIGHTS': 'Mobility and ICT Infrastructure',
  'NOISE': 'Public Health',
  'OTHER': 'Public Health',
};

interface SimilarComplaint {
  category: string;
  categoryLabel: string;
  othersCount: number;
}

export function MyTicketsTab() {
  const [myTickets, setMyTickets] = useState<Story[]>([]);
  const [allStories, setAllStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const [tickets, stories] = await Promise.all([
          apiClient.getMyTickets(),
          apiClient.getStories()
        ]);
        setMyTickets(tickets);
        setAllStories(stories);
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  const myStats = useMemo(() => {
    const complaints = myTickets.filter(t => t.category === 'complaint');
    const serviceComplaints = complaints.filter(t => t.issueCategory);
    const projectComplaints = complaints.filter(t => !t.issueCategory);
    const feedbacks = myTickets.filter(t => t.category === 'idea' || t.category === 'appreciation');
    return {
      serviceComplaints: serviceComplaints.length,
      projectComplaints: projectComplaints.length,
      feedbacks: feedbacks.length,
      proposalsSupported: 4, // mock
      surveysCompleted: getCompletedSurveys().length || 2, // fallback mock
      inProgress: complaints.filter(t => t.status === 'in_progress' || t.status === 'assigned').length,
      resolved: complaints.filter(t => t.status === 'resolved').length,
      new: complaints.filter(t => t.status === 'new').length,
    };
  }, [myTickets]);

  // Ward participation stats (mock)
  const wardStats = useMemo(() => {
    const stats = getOverviewStats('30days', 'all');
    return { wardTotal: stats.totalComplaints, userCount: myStats.serviceComplaints + myStats.projectComplaints };
  }, [myStats]);

  // Similar complaints — simplified for "Issues People Like You Are Reporting"
  const topIssues = useMemo((): SimilarComplaint[] => {
    const departmentData = getComplaintsByDepartment();
    const myCategories = new Set(myTickets.map(t => t.issueCategory).filter(Boolean));

    // Use user's categories first, then fill with top department data
    const categories = myCategories.size > 0
      ? Array.from(myCategories)
      : ['ROADS', 'WASTE', 'STREETLIGHTS'];

    return categories.slice(0, 4).map(categoryCode => {
      const categoryInfo = ISSUE_CATEGORIES.find(c => c.code === categoryCode);
      const departmentName = CATEGORY_TO_DEPARTMENT[categoryCode || 'OTHER'];
      const deptData = departmentData.find(d => d.department === departmentName);
      const othersCount = deptData ? deptData.count : Math.round(Math.random() * 500 + 100);
      return {
        category: categoryCode || 'other',
        categoryLabel: categoryInfo?.label || 'Other',
        othersCount,
      };
    });
  }, [myTickets]);

  if (isLoading) {
    return (
      <Card className="gov-card">
        <CardContent className="p-6">
          <div className="h-32 flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">Loading your data...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (myTickets.length === 0) {
    return (
      <Card className="gov-card border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="font-semibold text-foreground">Start making an impact</h3>
              <p className="text-sm text-muted-foreground">
                Report an issue, share feedback, or support a proposal to see your civic impact here.
              </p>
            </div>
            <Link to="/report">
              <Button className="gap-2">
                Report Issue <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    );
  }

  const participationPercent = wardStats.wardTotal > 0
    ? Math.min(Math.round((wardStats.userCount / wardStats.wardTotal) * 100), 100)
    : 0;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Section Header */}
      <div className="flex items-center gap-2.5 sm:gap-3">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-foreground">Your Civic Impact</h2>
          <p className="text-xs sm:text-sm text-muted-foreground">How your participation helps improve your city.</p>
        </div>
      </div>

      {/* Section 1 — Your Contribution */}
      <Card className="gov-card border-primary/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg">Your Contribution</CardTitle>
            </div>
            <Link to="/my-tickets">
              <Button variant="outline" size="sm" className="gap-2">
                View All <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <ContributionCard
              label="Complaints Reported"
              value={myStats.serviceComplaints + myStats.projectComplaints}
              subtitle={`${myStats.serviceComplaints + myStats.projectComplaints} reports submitted`}
              icon={<FileText className="w-4 h-4" />}
              className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300"
            />
            <ContributionCard
              label="Feedback Shared"
              value={myStats.feedbacks}
              subtitle={`${myStats.feedbacks} feedback submitted`}
              icon={<MessageSquare className="w-4 h-4" />}
              className="bg-teal-100 text-teal-700 dark:bg-teal-900/30 dark:text-teal-300"
            />
            <ContributionCard
              label="Proposals Supported"
              value={myStats.proposalsSupported}
              subtitle={`${myStats.proposalsSupported} community proposals`}
              icon={<ThumbsUp className="w-4 h-4" />}
              className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
            />
            <ContributionCard
              label="Surveys Participated"
              value={myStats.surveysCompleted}
              subtitle={`${myStats.surveysCompleted} surveys completed`}
              icon={<ClipboardList className="w-4 h-4" />}
              className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
            />
          </div>
          <p className="text-xs text-muted-foreground italic border-t border-border pt-3">
            Citizen reports like yours help identify issues faster and guide city improvements.
          </p>
        </CardContent>
      </Card>

      {/* Section 2 — Community Participation */}
      <Card className="gov-card">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-muted-foreground" />
            <CardTitle className="text-lg">Community Participation</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-muted-foreground">Residents in your ward submitted</span>
            <span className="font-bold text-foreground">{wardStats.wardTotal.toLocaleString()} complaints this month</span>
          </div>
          <div className="flex items-baseline justify-between text-sm">
            <span className="text-muted-foreground">You contributed</span>
            <span className="font-bold text-primary">{wardStats.userCount} reports</span>
          </div>
          <Progress value={participationPercent} className="h-2" />
          <p className="text-xs text-muted-foreground italic">
            You are among the residents helping surface local issues.
          </p>
        </CardContent>
      </Card>

      {/* Section 3 — What Happened After Your Report */}
      <Card className="gov-card">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Eye className="w-5 h-5 text-muted-foreground" />
            <CardTitle className="text-lg">What Happened After Your Report</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <OutcomeCard
              label="Issues being addressed"
              value={myStats.inProgress}
              subtitle={`${myStats.inProgress} reports in progress`}
              icon={<TrendingUp className="w-4 h-4" />}
              className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
            />
            <OutcomeCard
              label="Resolved issues"
              value={myStats.resolved}
              subtitle={`${myStats.resolved} reports resolved`}
              icon={<CheckCircle2 className="w-4 h-4" />}
              className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300"
            />
            <OutcomeCard
              label="Under review"
              value={myStats.new}
              subtitle={`${myStats.new} reports awaiting action`}
              icon={<Clock className="w-4 h-4" />}
              className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300"
            />
          </div>
          <p className="text-xs text-muted-foreground italic border-t border-border pt-3">
            City teams use citizen reports to prioritise service improvements.
          </p>
        </CardContent>
      </Card>

      {/* Section 4 — Issues People Like You Are Reporting */}
      {topIssues.length > 0 && (
        <Card className="gov-card">
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-muted-foreground" />
              <CardTitle className="text-lg">Issues People Like You Are Reporting</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {topIssues.map((issue) => {
                const Icon = ISSUE_CATEGORY_ICONS[issue.category as keyof typeof ISSUE_CATEGORY_ICONS] || ISSUE_CATEGORY_ICONS.other;
                return (
                  <div key={issue.category} className="p-4 rounded-lg border border-border bg-muted/30">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon className="w-5 h-5 text-primary flex-shrink-0" aria-hidden="true" />
                      <h4 className="font-semibold text-foreground text-sm">{issue.categoryLabel}</h4>
                    </div>
                    <p className="text-lg font-bold text-foreground">{issue.othersCount.toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">reports citywide</p>
                  </div>
                );
              })}
            </div>
            <p className="text-xs text-muted-foreground italic border-t border-border pt-3">
              These are the most common issues residents are reporting.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Section 5 — Next Ways to Participate */}
      <Card className="gov-card border-primary/10">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <CardTitle className="text-lg">Next Ways to Participate</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <NextAction
              label="Support proposals addressing local problems"
              link="/proposals"
              icon={<ThumbsUp className="w-4 h-4" />}
            />
            <NextAction
              label="Share feedback on upcoming policies"
              link="/policy"
              icon={<MessageSquare className="w-4 h-4" />}
            />
            <NextAction
              label="Participate in citizen surveys"
              link="/surveys"
              icon={<ClipboardList className="w-4 h-4" />}
            />
            <NextAction
              label="Track progress of city improvement projects"
              link="/happenings"
              icon={<Eye className="w-4 h-4" />}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ContributionCard({ label, value, subtitle, icon, className }: {
  label: string; value: number; subtitle: string; icon: React.ReactNode; className?: string;
}) {
  return (
    <div className={cn('rounded-xl p-3 flex flex-col items-center justify-center min-h-[90px]', className)}>
      <div className="flex items-center justify-center gap-1.5 mb-1">
        {icon}
        <span className="text-2xl font-bold leading-none">{value}</span>
      </div>
      <p className="text-xs font-medium text-center leading-tight">{label}</p>
    </div>
  );
}

function OutcomeCard({ label, value, subtitle, icon, className }: {
  label: string; value: number; subtitle: string; icon: React.ReactNode; className?: string;
}) {
  return (
    <div className={cn('rounded-xl p-4 flex flex-col min-h-[80px]', className)}>
      <div className="flex items-center gap-2 mb-1">
        {icon}
        <span className="text-2xl font-bold leading-none">{value}</span>
      </div>
      <p className="text-xs font-medium leading-tight">{label}</p>
      <p className="text-[10px] opacity-75 mt-0.5">{subtitle}</p>
    </div>
  );
}

function NextAction({ label, link, icon }: { label: string; link: string; icon: React.ReactNode }) {
  return (
    <Link to={link} className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors group">
      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
        {icon}
      </div>
      <span className="text-sm text-foreground group-hover:text-primary transition-colors">{label}</span>
      <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto flex-shrink-0" />
    </Link>
  );
}

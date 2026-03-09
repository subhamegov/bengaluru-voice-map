import React from 'react';
import { Building2, BarChart3, TrendingUp, Lightbulb, AlertTriangle, FileText, ArrowRight, Users, MessageSquare, CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { DepartmentRatingsDetail } from '../cards/DepartmentRatingsDetail';
import { OverviewCards } from '../cards/OverviewCards';
import { StatusByBoundaryTable } from '../cards/StatusByBoundaryTable';
import { ComplaintsByStatusBar } from '../cards/ComplaintsByStatusBar';
import { cn } from '@/lib/utils';

interface Props {
  timeRange: string;
  subCounty: string;
}

// City Participation Overview
const PARTICIPATION_OVERVIEW = [
  { label: 'Citizen Voices', value: '8,420', icon: MessageSquare, color: 'bg-primary/10 text-primary' },
  { label: 'Issues Under Review', value: '1,120', icon: FileText, color: 'bg-amber-500/10 text-amber-600' },
  { label: 'Actions Taken', value: '740', icon: CheckCircle2, color: 'bg-success/10 text-success' },
  { label: 'Residents Participating', value: '3,200', icon: Users, color: 'bg-secondary/10 text-secondary' },
];

const PARTICIPATION_BREAKDOWN = [
  {
    title: 'Citizen Voices',
    items: [
      { label: 'Complaints', value: 6250 },
      { label: 'Proposals', value: 740 },
      { label: 'Survey responses', value: 1200 },
      { label: 'Policy feedback', value: 230 },
    ],
  },
  {
    title: 'Issues Under Review',
    items: [
      { label: 'Complaints in progress', value: 840 },
      { label: 'Proposals under review', value: 160 },
      { label: 'Policy consultations open', value: 120 },
    ],
  },
  {
    title: 'Actions Taken',
    items: [
      { label: 'Issues resolved', value: 520 },
      { label: 'Proposals accepted', value: 120 },
      { label: 'Ward decisions implemented', value: 100 },
    ],
  },
  {
    title: 'Residents Participating',
    items: [
      { label: 'Complaint reporters', value: 1600 },
      { label: 'Proposal authors/supporters', value: 420 },
      { label: 'Survey participants', value: 900 },
      { label: 'Policy respondents', value: 280 },
    ],
  },
];

// Proactive vs Reactive data — aligned with city complaint totals (6,250)
const REACTIVE_TOP = [
  { category: 'Roads & Potholes', complaints: 742, proposals: 18, trend: 'up' as const },
  { category: 'Garbage Management', complaints: 568, proposals: 42, trend: 'up' as const },
  { category: 'Water Supply', complaints: 621, proposals: 9, trend: 'stable' as const },
  { category: 'Street Lighting', complaints: 285, proposals: 24, trend: 'down' as const },
];

const OVERLAP_INSIGHTS = [
  'Garbage management has both high complaint volume (568) and high community proposal activity (42 proposals).',
  'Roads & potholes lead in complaints (742), with 18 citizen proposals for road resurfacing.',
  'Water supply has 621 complaints, but only 9 proposals — an area where more citizen-led ideas could help.',
  'Street lighting complaints are declining — community proposals for safety improvements have 24 active submissions.',
];

export function CityInsightsTab({ timeRange, subCounty }: Props) {
  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Section 0: City Participation Overview */}
      <section className="space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground">City Participation Overview</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">How residents are engaging with civic processes</p>
          </div>
        </div>

        {/* Top-level KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {PARTICIPATION_OVERVIEW.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.label} className="gov-card">
                <CardContent className="p-4 sm:p-5">
                  <div className={cn('w-8 h-8 rounded-lg flex items-center justify-center mb-2', item.color)}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-foreground">{item.value}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">{item.label}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Breakdowns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {PARTICIPATION_BREAKDOWN.map((group) => (
            <Card key={group.title} className="gov-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">{group.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-1.5">
                {group.items.map((item) => (
                  <div key={item.label} className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground text-xs">{item.label}</span>
                    <span className="font-semibold text-foreground">{item.value.toLocaleString()}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Section 1: Department Ratings */}
      <section className="space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
            <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground">Department Ratings</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">Citizen feedback and performance ratings by department</p>
          </div>
        </div>
        <DepartmentRatingsDetail />
      </section>

      {/* Section 2: City Service Performance */}
      <section className="space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center">
            <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground">City Service Performance</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">Overall complaint metrics across the city</p>
          </div>
        </div>
        <OverviewCards timeRange={timeRange} subCounty={subCounty} />
        <ComplaintsByStatusBar />
      </section>

      {/* Section 3: Ward Comparison */}
      <section className="space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-amber-600" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground">Ward Comparison</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">Compare complaint data, resolution time, and types across wards</p>
          </div>
        </div>
        <StatusByBoundaryTable />
      </section>

      {/* Section 4: Complaints and Community Proposals */}
      <section className="space-y-3 sm:space-y-4">
        <div className="flex items-center gap-2.5 sm:gap-3">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-success/10 flex items-center justify-center">
            <Lightbulb className="w-4 h-4 sm:w-5 sm:h-5 text-success" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-foreground">Complaints and Community Proposals</h2>
            <p className="text-xs sm:text-sm text-muted-foreground">Where complaints and citizen proposals intersect</p>
          </div>
        </div>

        <Card className="gov-card">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-3">
              {REACTIVE_TOP.map((item) => (
                <div key={item.category} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex-1 min-w-0 mr-3">
                    <p className="font-semibold text-foreground text-sm">{item.category}</p>
                    <p className="text-xs text-muted-foreground">
                      {item.complaints.toLocaleString()} complaints · {item.proposals} proposals
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      className={cn(
                        'text-xs border-0',
                        item.trend === 'up' ? 'bg-destructive/10 text-destructive' :
                        item.trend === 'down' ? 'bg-success/10 text-success' :
                        'bg-muted text-muted-foreground'
                      )}
                    >
                      {item.trend === 'up' ? '↑ Rising' : item.trend === 'down' ? '↓ Declining' : '→ Stable'}
                    </Badge>
                    <Link to="/proposals">
                      <Button variant="ghost" size="sm" className="gap-1 text-xs shrink-0">
                        View <ArrowRight className="w-3 h-3" />
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Overlap Insights */}
        <Card className="gov-card border-primary/20 bg-primary/5">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div className="space-y-1.5">
                <p className="text-sm font-semibold text-foreground">Where Complaints & Proposals Overlap</p>
                {OVERLAP_INSIGHTS.map((insight, i) => (
                  <p key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    {insight}
                  </p>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

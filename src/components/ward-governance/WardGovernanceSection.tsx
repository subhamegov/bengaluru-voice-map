import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Users, Calendar, MapPin, FileText, CheckCircle2, Clock,
  ArrowRight, IndianRupee, Landmark, ClipboardList, AlertCircle,
  ChevronDown, ChevronUp, Download,
} from 'lucide-react';
import { downloadWardSabhaAgenda, downloadWardSabhaSummary } from '@/lib/wardSabhaPdf';

// ── Mock data ──

const upcomingMeeting = {
  date: '21 Dec 2024',
  time: '10:00 AM – 12:00 PM',
  venue: 'Community Hall, Ward 148',
  wardName: 'Ward 148 – Malleshwaram',
};

const latestMeeting = {
  id: 'ws-sep-2024',
  title: 'Ward Sabha – Sep 2024',
  date: '15 Sep 2024',
  wardName: 'Ward 148',
  attendance: 82,
  topics: ['Road resurfacing priority list', 'Waste segregation compliance', 'Streetlight gaps identified'],
  actions: [
    'Tender issued for 2.1 km road resurfacing on 5th Cross',
    'Weekly wet-waste audit to begin from Oct 2024',
    '40 new LED streetlights approved for dark stretches',
  ],
};

const decisions = [
  { text: 'Allocate ₹25 lakh for road resurfacing – 5th Cross & 8th Main', status: 'approved' as const, meeting: 'Sep 2024' },
  { text: 'Install 40 LED streetlights in identified dark stretches', status: 'approved' as const, meeting: 'Sep 2024' },
  { text: 'Weekly wet-waste compliance audit by SWM marshals', status: 'approved' as const, meeting: 'Sep 2024' },
  { text: 'Construct new footpath along 3rd Main Road', status: 'approved' as const, meeting: 'Jun 2024' },
  { text: 'Upgrade community park – Malleshwaram 12th Cross', status: 'approved' as const, meeting: 'Jun 2024' },
];

const budgetData = {
  totalAllocation: '₹1.2 Cr',
  financialYear: 'FY 2024-25',
  approved: '₹35 L',
  spent: '₹18 L',
  remaining: '₹85 L',
  percentUsed: 29,
  projects: [
    { name: 'Road resurfacing – 5th Cross', amount: '₹25 L', status: 'In Progress' },
    { name: 'LED streetlight installation', amount: '₹6 L', status: 'Scheduled' },
    { name: 'Footpath – 3rd Main Road', amount: '₹4 L', status: 'Tender Issued' },
  ],
};

const actionTracker = [
  { decision: 'Road resurfacing – 5th Cross', status: 'in_progress' as const, dueDate: 'Mar 2025', progress: 40 },
  { decision: 'LED streetlight installation', status: 'scheduled' as const, dueDate: 'Jan 2025', progress: 10 },
  { decision: 'Wet-waste compliance audit', status: 'completed' as const, dueDate: 'Oct 2024', progress: 100 },
  { decision: 'Footpath – 3rd Main Road', status: 'pending' as const, dueDate: 'Apr 2025', progress: 0 },
  { decision: 'Park upgrade – 12th Cross', status: 'in_progress' as const, dueDate: 'Feb 2025', progress: 55 },
];

const pastMeetings = [
  { id: 'ws-sep-2024', title: 'Ward Sabha – Sep 2024', date: '15 Sep 2024', wardName: 'Ward 148', attendance: 82, topics: ['Roads repair', 'Waste collection'] },
  { id: 'ws-jun-2024', title: 'Ward Sabha – Jun 2024', date: '22 Jun 2024', wardName: 'Ward 148', attendance: 67, topics: ['Streetlight installation', 'Drain cleaning'] },
  { id: 'ws-mar-2024', title: 'Ward Sabha – Mar 2024', date: '16 Mar 2024', wardName: 'Ward 148', attendance: 95, topics: ['Budget review', 'Park development', 'Water supply'] },
];

const actionStatusConfig: Record<string, { label: string; color: string; icon: React.ElementType }> = {
  completed: { label: 'Completed', color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle2 },
  in_progress: { label: 'In Progress', color: 'bg-orange-100 text-orange-700 border-orange-200', icon: Clock },
  scheduled: { label: 'Scheduled', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Calendar },
  pending: { label: 'Pending', color: 'bg-muted text-muted-foreground border-border', icon: AlertCircle },
};

export default function WardGovernanceSection() {
  const [showAllDecisions, setShowAllDecisions] = useState(false);
  const [showAllActions, setShowAllActions] = useState(false);
  const [showAllPast, setShowAllPast] = useState(false);

  const visibleDecisions = showAllDecisions ? decisions : decisions.slice(0, 3);
  const visibleActions = showAllActions ? actionTracker : actionTracker.slice(0, 3);
  const visiblePast = showAllPast ? pastMeetings : pastMeetings.slice(0, 2);

  return (
    <div className="space-y-6">
      {/* ── 1. What is a Ward Sabha ── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Landmark className="w-5 h-5 text-primary" />
            What is a Ward Sabha?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            Ward Sabhas are open meetings where residents discuss ward-level issues, review budgets, 
            and set priorities for local infrastructure and services. Every resident can attend, raise 
            concerns, and vote on proposals. Decisions made here directly influence how ward funds are spent.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button size="sm" className="gap-1.5" onClick={() => downloadWardSabhaAgenda(upcomingMeeting.wardName, upcomingMeeting.date)}>
              <Calendar className="w-4 h-4" />
              View Upcoming Meeting
            </Button>
            <Button size="sm" variant="outline" className="gap-1.5" onClick={() => {
              document.getElementById('past-meetings-section')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              <Clock className="w-4 h-4" />
              View Past Meetings
            </Button>
          </div>
          {/* Upcoming meeting info chip */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground p-3 rounded-lg bg-primary/5 border border-primary/10">
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {upcomingMeeting.date} • {upcomingMeeting.time}</span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {upcomingMeeting.venue}</span>
          </div>
        </CardContent>
      </Card>

      {/* ── 2. Latest Ward Sabha ── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ClipboardList className="w-5 h-5 text-primary" />
            Latest Ward Sabha
          </CardTitle>
          <CardDescription>{latestMeeting.title} • {latestMeeting.attendance} residents attended</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Topics Discussed</p>
            <ul className="space-y-1.5">
              {latestMeeting.topics.map((t, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">{i + 1}</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Actions Taken</p>
            <ul className="space-y-1.5">
              {latestMeeting.actions.map((a, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-2 pt-2 border-t">
            <Button size="sm" variant="outline" className="gap-1.5" onClick={() => downloadWardSabhaSummary(latestMeeting.wardName, latestMeeting.date, latestMeeting.attendance)}>
              <Download className="w-4 h-4" />
              Download Summary
            </Button>
            <Button size="sm" variant="outline" className="gap-1.5" onClick={() => {
              document.getElementById('decisions-section')?.scrollIntoView({ behavior: 'smooth' });
            }}>
              <ArrowRight className="w-4 h-4" />
              View Decisions
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* ── 3. Decisions Taken ── */}
      <div id="decisions-section">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              Decisions Taken
            </CardTitle>
            <CardDescription>Key decisions approved in recent Ward Sabha meetings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {visibleDecisions.map((d, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{d.text}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{d.meeting}</p>
                </div>
                <Badge variant="outline" className="text-xs shrink-0 bg-green-50 text-green-700 border-green-200">Approved</Badge>
              </div>
            ))}
            {decisions.length > 3 && (
              <Button variant="ghost" size="sm" className="w-full gap-1" onClick={() => setShowAllDecisions(!showAllDecisions)}>
                {showAllDecisions ? <><ChevronUp className="w-4 h-4" /> Show Less</> : <><ChevronDown className="w-4 h-4" /> Show All {decisions.length} Decisions</>}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* ── 4. Ward Budget Snapshot ── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <IndianRupee className="w-5 h-5 text-primary" />
            Ward Budget Snapshot
          </CardTitle>
          <CardDescription>{budgetData.financialYear} • Total allocation: {budgetData.totalAllocation}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 rounded-lg bg-primary/5">
              <p className="text-lg font-bold text-foreground">{budgetData.approved}</p>
              <p className="text-xs text-muted-foreground">Approved</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
              <p className="text-lg font-bold text-foreground">{budgetData.spent}</p>
              <p className="text-xs text-muted-foreground">Spent</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-muted/50">
              <p className="text-lg font-bold text-foreground">{budgetData.remaining}</p>
              <p className="text-xs text-muted-foreground">Remaining</p>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-muted-foreground mb-1">
              <span>Budget utilisation</span>
              <span>{budgetData.percentUsed}%</span>
            </div>
            <Progress value={budgetData.percentUsed} className="h-2" />
          </div>
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Approved Projects</p>
            <div className="space-y-2">
              {budgetData.projects.map((p, i) => (
                <div key={i} className="flex items-center justify-between p-2.5 rounded-lg border text-sm">
                  <span className="text-foreground">{p.name}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-semibold text-foreground">{p.amount}</span>
                    <Badge variant="outline" className="text-xs">{p.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── 5. Action Tracker ── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <ClipboardList className="w-5 h-5 text-primary" />
            Action Tracker
          </CardTitle>
          <CardDescription>Status of decisions taken in Ward Sabha meetings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {visibleActions.map((item, i) => {
            const cfg = actionStatusConfig[item.status];
            const StatusIcon = cfg.icon;
            return (
              <div key={i} className="p-3 rounded-lg border space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-medium text-foreground">{item.decision}</p>
                  <Badge variant="outline" className={`text-xs shrink-0 ${cfg.color}`}>
                    <StatusIcon className="w-3 h-3 mr-1" />
                    {cfg.label}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>Due: {item.dueDate}</span>
                  <span>{item.progress}%</span>
                </div>
                <Progress value={item.progress} className="h-1.5" />
              </div>
            );
          })}
          {actionTracker.length > 3 && (
            <Button variant="ghost" size="sm" className="w-full gap-1" onClick={() => setShowAllActions(!showAllActions)}>
              {showAllActions ? <><ChevronUp className="w-4 h-4" /> Show Less</> : <><ChevronDown className="w-4 h-4" /> Show All {actionTracker.length} Actions</>}
            </Button>
          )}
        </CardContent>
      </Card>

      {/* ── 6. Past Ward Sabha Meetings ── */}
      <div id="past-meetings-section">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Calendar className="w-5 h-5 text-primary" />
              Past Ward Sabha Meetings
            </CardTitle>
            <CardDescription>Historic meetings with downloadable summaries</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {visiblePast.map((meeting) => (
              <div key={meeting.id} className="p-4 rounded-lg border hover:shadow-sm transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h4 className="font-semibold text-sm text-foreground">{meeting.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" /> {meeting.date}
                    <span>•</span>
                    <Users className="w-3.5 h-3.5" /> {meeting.attendance}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {meeting.topics.map((topic) => (
                    <Badge key={topic} variant="secondary" className="text-xs">{topic}</Badge>
                  ))}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5"
                  onClick={() => downloadWardSabhaSummary(meeting.wardName, meeting.date, meeting.attendance)}
                >
                  <FileText className="w-4 h-4" />
                  Download Summary
                </Button>
              </div>
            ))}
            {pastMeetings.length > 2 && (
              <Button variant="ghost" size="sm" className="w-full gap-1" onClick={() => setShowAllPast(!showAllPast)}>
                {showAllPast ? <><ChevronUp className="w-4 h-4" /> Show Less</> : <><ChevronDown className="w-4 h-4" /> Show All {pastMeetings.length} Meetings</>}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

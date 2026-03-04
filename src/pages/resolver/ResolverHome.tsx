import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ClipboardList, 
  CheckCircle2, 
  Clock, 
  Target, 
  Heart, 
  TrendingUp, 
  TrendingDown,
  ArrowUpRight,
  Send,
  FileEdit,
  MessageSquarePlus,
  CheckCheck,
  PhoneMissed
} from 'lucide-react';
import { ResolverLayout } from '@/components/layout/ResolverLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Mock data for resolver metrics
const RESOLVER_METRICS = [
  {
    label: 'My Assigned Issues',
    value: 42,
    icon: ClipboardList,
    trend: '+3 today',
    trendUp: true,
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    label: 'Missed Call Tickets',
    value: 8,
    icon: PhoneMissed,
    trend: '+2 today',
    trendUp: true,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
    description: 'Missed calls are automatically created as tickets',
  },
  {
    label: 'Resolved This Week',
    value: 19,
    icon: CheckCircle2,
    trend: '+7 vs last week',
    trendUp: true,
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  {
    label: 'Avg Resolution Time',
    value: '26.4',
    unit: 'hrs',
    icon: Clock,
    trend: '-2.1 hrs',
    trendUp: true,
    color: 'text-info',
    bgColor: 'bg-info/10',
  },
  {
    label: 'SLA Achievement',
    value: 86,
    unit: '%',
    icon: Target,
    trend: '+4%',
    trendUp: true,
    color: 'text-warning',
    bgColor: 'bg-warning/10',
  },
  {
    label: 'Citizen Appreciations',
    value: 7,
    icon: Heart,
    trend: '+2 this week',
    trendUp: true,
    color: 'text-destructive',
    bgColor: 'bg-destructive/10',
  },
];

// Recent assigned issues
const RECENT_ISSUES = [
  { id: 'ULB-2025-0487', category: 'Pothole on Main Road', status: 'Open', priority: 'High', time: '2h ago' },
  { id: 'ULB-2025-0486', category: 'Burst Sewer Line', status: 'Assigned', priority: 'Critical', time: '3h ago' },
  { id: 'ULB-2025-0485', category: 'Garbage Collection', status: 'In Progress', priority: 'Medium', time: '5h ago' },
  { id: 'ULB-2025-0484', category: 'Street Light Fault', status: 'Assigned', priority: 'Low', time: '6h ago' },
];

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'open': return 'bg-destructive/15 text-destructive';
    case 'assigned': return 'bg-info/15 text-info';
    case 'in progress': return 'bg-warning/15 text-warning';
    case 'closed': return 'bg-success/15 text-success';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'critical': return 'text-destructive font-bold';
    case 'high': return 'text-warning font-semibold';
    case 'medium': return 'text-info';
    case 'low': return 'text-muted-foreground';
    default: return 'text-foreground';
  }
};

export default function ResolverHome() {
  return (
    <ResolverLayout>
      {/* Welcome Section */}
      <section className="mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Good morning, Resolver</h1>
            <p className="text-muted-foreground mt-1">
              You have <span className="font-semibold text-primary">12 pending tasks</span> requiring attention today.
            </p>
          </div>
          <Link to="/resolver/tasks">
            <Button className="gap-2">
              <ClipboardList className="w-4 h-4" />
              View All Tasks
              <ArrowUpRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Quick Metrics */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">Your Performance</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <TooltipProvider>
            {RESOLVER_METRICS.map((metric, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <Card className="relative overflow-hidden cursor-default">
                    <CardContent className="p-4">
                      <div className={`w-10 h-10 rounded-lg ${metric.bgColor} flex items-center justify-center mb-3`}>
                        <metric.icon className={`w-5 h-5 ${metric.color}`} />
                      </div>
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-foreground">{metric.value}</span>
                        {metric.unit && <span className="text-sm text-muted-foreground">{metric.unit}</span>}
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{metric.label}</p>
                      <div className={`flex items-center gap-1 mt-2 text-xs ${metric.trendUp ? 'text-success' : 'text-destructive'}`}>
                        {metric.trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        <span>{metric.trend}</span>
                      </div>
                    </CardContent>
                  </Card>
                </TooltipTrigger>
                {metric.description && (
                  <TooltipContent side="bottom" className="max-w-[200px]">
                    <p className="text-xs">{metric.description}</p>
                  </TooltipContent>
                )}
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-auto py-4 flex-col gap-2 hover:bg-primary/5 hover:border-primary">
            <Send className="w-6 h-6 text-primary" />
            <span className="text-sm font-medium">Reassign / Escalate</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex-col gap-2 hover:bg-info/5 hover:border-info">
            <FileEdit className="w-6 h-6 text-info" />
            <span className="text-sm font-medium">Update Status</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex-col gap-2 hover:bg-warning/5 hover:border-warning">
            <MessageSquarePlus className="w-6 h-6 text-warning" />
            <span className="text-sm font-medium">Add Resolution Notes</span>
          </Button>
          <Button variant="outline" className="h-auto py-4 flex-col gap-2 hover:bg-success/5 hover:border-success">
            <CheckCheck className="w-6 h-6 text-success" />
            <span className="text-sm font-medium">Mark Resolved</span>
          </Button>
        </div>
      </section>

      {/* Recent Issues */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Recent Assigned Issues</h2>
          <Link to="/resolver/tasks" className="text-sm text-primary hover:underline flex items-center gap-1">
            View all <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Ticket ID</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Category</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Priority</th>
                    <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Time</th>
                  </tr>
                </thead>
                <tbody>
                  {RECENT_ISSUES.map((issue) => (
                    <tr key={issue.id} className="border-b border-border last:border-0 hover:bg-muted/30 cursor-pointer transition-colors">
                      <td className="py-3 px-4">
                        <span className="font-mono text-sm font-medium text-primary">{issue.id}</span>
                      </td>
                      <td className="py-3 px-4 text-sm text-foreground">{issue.category}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                          {issue.status}
                        </span>
                      </td>
                      <td className={`py-3 px-4 text-sm ${getPriorityColor(issue.priority)}`}>
                        {issue.priority}
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{issue.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>
    </ResolverLayout>
  );
}

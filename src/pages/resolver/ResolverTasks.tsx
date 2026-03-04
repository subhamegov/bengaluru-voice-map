import React, { useState, useMemo, useEffect } from 'react';
import { 
  RefreshCw, 
  Clock, 
  AlertTriangle, 
  ArrowUpDown, 
  Eye,
  Image,
  Mic,
  RotateCcw,
  MoreHorizontal,
  UserPlus,
  ArrowUpCircle,
  FileText,
  RefreshCcw,
  Send,
  Building2,
  Copy,
  MessageSquareMore
} from 'lucide-react';
import { ResolverLayout } from '@/components/layout/ResolverLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import {
  ALL_COUNTY_ISSUES,
  CURRENT_RESOLVER,
  getMyAssignedIssues,
  getDepartmentIssues,
  getAwaitingResponseIssues,
  getReopenedIssues,
  getClosedByMeIssues,
  getIssueAge,
  getSlaCountdown,
  DEPARTMENT_COLORS,
  type ResolverIssue,
} from '@/lib/resolverIssuesData';

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'open': return 'bg-destructive/15 text-destructive';
    case 'assigned': return 'bg-info/15 text-info';
    case 'in progress': return 'bg-warning/15 text-warning';
    case 'awaiting response': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400';
    case 'reopened': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400';
    case 'closed': return 'bg-success/15 text-success';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getPriorityBadge = (priority: string) => {
  switch (priority.toLowerCase()) {
    case 'critical': return <Badge variant="destructive">{priority}</Badge>;
    case 'high': return <Badge className="bg-warning text-warning-foreground">{priority}</Badge>;
    case 'medium': return <Badge variant="secondary">{priority}</Badge>;
    case 'low': return <Badge variant="outline">{priority}</Badge>;
    default: return <Badge variant="outline">{priority}</Badge>;
  }
};

export default function ResolverTasks() {
  const [activeTab, setActiveTab] = useState('assigned-to-me');
  const [selectedIssue, setSelectedIssue] = useState<ResolverIssue | null>(null);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setLastRefresh(new Date());
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastRefresh(new Date());
      setIsRefreshing(false);
    }, 500);
  };

  // Get issues for each tab
  const myAssignedIssues = useMemo(() => getMyAssignedIssues(), [lastRefresh]);
  const departmentIssues = useMemo(() => getDepartmentIssues(), [lastRefresh]);
  const awaitingResponseIssues = useMemo(() => getAwaitingResponseIssues(), [lastRefresh]);
  const reopenedIssues = useMemo(() => getReopenedIssues(), [lastRefresh]);
  const closedByMeIssues = useMemo(() => getClosedByMeIssues(), [lastRefresh]);

  const tabCounts = {
    'assigned-to-me': myAssignedIssues.length,
    'department': departmentIssues.length,
    'awaiting-response': awaitingResponseIssues.length,
    'reopened': reopenedIssues.length,
    'closed-by-me': closedByMeIssues.length,
  };

  const getCurrentTabIssues = () => {
    switch (activeTab) {
      case 'assigned-to-me': return myAssignedIssues;
      case 'department': return departmentIssues;
      case 'awaiting-response': return awaitingResponseIssues;
      case 'reopened': return reopenedIssues;
      case 'closed-by-me': return closedByMeIssues;
      default: return myAssignedIssues;
    }
  };

  return (
    <ResolverLayout>
      {/* Header */}
      <section className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Tasks</h1>
            <p className="text-muted-foreground mt-1">
              Issues assigned to you for action
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground">
              Last updated: {lastRefresh.toLocaleTimeString()}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={handleManualRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 h-auto">
          <TabsTrigger value="assigned-to-me" className="flex flex-col py-2 px-1 text-xs md:text-sm">
            <span>Assigned to Me</span>
            <Badge variant="secondary" className="mt-1">{tabCounts['assigned-to-me']}</Badge>
          </TabsTrigger>
          <TabsTrigger value="department" className="flex flex-col py-2 px-1 text-xs md:text-sm">
            <span>My Department</span>
            <Badge variant="secondary" className="mt-1">{tabCounts['department']}</Badge>
          </TabsTrigger>
          <TabsTrigger value="awaiting-response" className="flex flex-col py-2 px-1 text-xs md:text-sm">
            <span>Awaiting Response</span>
            <Badge variant="secondary" className="mt-1">{tabCounts['awaiting-response']}</Badge>
          </TabsTrigger>
          <TabsTrigger value="reopened" className="flex flex-col py-2 px-1 text-xs md:text-sm">
            <span>Reopened</span>
            <Badge variant={tabCounts['reopened'] > 0 ? 'destructive' : 'secondary'} className="mt-1">
              {tabCounts['reopened']}
            </Badge>
          </TabsTrigger>
          <TabsTrigger value="closed-by-me" className="flex flex-col py-2 px-1 text-xs md:text-sm">
            <span>Closed by Me</span>
            <Badge variant="secondary" className="mt-1">{tabCounts['closed-by-me']}</Badge>
          </TabsTrigger>
        </TabsList>

        {/* Tab Content */}
        <TabsContent value={activeTab}>
          <IssueTable 
            issues={getCurrentTabIssues()} 
            onViewIssue={setSelectedIssue}
            showAssignedTo={activeTab === 'department'}
          />
        </TabsContent>
      </Tabs>

      {/* Issue Detail Dialog */}
      <IssueDetailDialog 
        issue={selectedIssue} 
        onClose={() => setSelectedIssue(null)} 
      />
    </ResolverLayout>
  );
}

interface IssueTableProps {
  issues: ResolverIssue[];
  onViewIssue: (issue: ResolverIssue) => void;
  showAssignedTo?: boolean;
}

function IssueTable({ issues, onViewIssue, showAssignedTo }: IssueTableProps) {
  if (issues.length === 0) {
    return (
      <Card className="p-8 text-center">
        <p className="text-muted-foreground">No issues in this category.</p>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full" role="table">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">
                  <button className="flex items-center gap-1 hover:text-foreground">
                    Issue ID <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Category</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Location</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">
                  <button className="flex items-center gap-1 hover:text-foreground">
                    Age <ArrowUpDown className="w-3 h-3" />
                  </button>
                </th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Status</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">SLA</th>
                {showAssignedTo && (
                  <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Assigned To</th>
                )}
                <th className="text-left py-3 px-4 text-xs font-semibold text-muted-foreground uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {issues.map((issue) => {
                const sla = getSlaCountdown(issue.slaHoursRemaining);
                return (
                  <tr
                    key={issue.id}
                    className={`border-b border-border last:border-0 hover:bg-muted/30 transition-colors ${
                      issue.isReopened ? 'bg-orange-50 dark:bg-orange-950/20' : ''
                    }`}
                    role="row"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-medium text-primary">{issue.id}</span>
                        {issue.hasImages && <Image className="w-3 h-3 text-muted-foreground" />}
                        {issue.hasVoiceNote && <Mic className="w-3 h-3 text-muted-foreground" />}
                        {issue.isReopened && <RotateCcw className="w-3 h-3 text-orange-500" />}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-foreground">{issue.category}</span>
                        <Badge className={DEPARTMENT_COLORS[issue.department] || 'bg-muted'} variant="secondary">
                          {issue.department}
                        </Badge>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm text-muted-foreground">
                      <div className="flex flex-col">
                        <span>{issue.ward}</span>
                        <span className="text-xs">{issue.zone}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm font-medium text-foreground">
                      {getIssueAge(issue.createdAt)}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                        {issue.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className={`flex items-center gap-1 text-sm ${
                        sla.isOverdue ? 'text-destructive font-semibold' : 
                        sla.isUrgent ? 'text-warning font-medium' : 'text-muted-foreground'
                      }`}>
                        {(sla.isOverdue || sla.isUrgent) && <AlertTriangle className="w-3 h-3" />}
                        <Clock className="w-3 h-3" />
                        {sla.text}
                      </div>
                    </td>
                    {showAssignedTo && (
                      <td className="py-3 px-4 text-sm text-muted-foreground">
                        {issue.assignedTo ? 'Officer Assigned' : 'Unassigned'}
                      </td>
                    )}
                    <td className="py-3 px-4">
                      <Button
                        size="sm"
                        className="gap-1"
                        onClick={() => onViewIssue(issue)}
                      >
                        <Eye className="w-4 h-4" />
                        Open Issue
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

interface IssueDetailDialogProps {
  issue: ResolverIssue | null;
  onClose: () => void;
}

const RESOLVERS = [
  { id: 'R001', name: 'John Kamau', department: 'Environment' },
  { id: 'R002', name: 'Mary Wanjiku', department: 'Water and Sewerage' },
  { id: 'R003', name: 'Peter Ochieng', department: 'Works' },
  { id: 'R004', name: 'Grace Muthoni', department: 'Public Health' },
  { id: 'R005', name: 'David Kiprop', department: 'Mobility & ICT Infrastructure' },
];

const SUPERVISORS = [
  { id: 'S001', name: 'Dr. Sarah Kimani', role: 'Department Head - Environment' },
  { id: 'S002', name: 'Eng. James Otieno', role: 'Department Head - Works' },
  { id: 'S003', name: 'Mr. Michael Wafula', role: 'Deputy Director' },
  { id: 'S004', name: 'Ms. Catherine Nyambura', role: 'County Complaints Officer' },
];

const DEPARTMENTS = [
  { id: 'env', name: 'Environment' },
  { id: 'water', name: 'Water and Sewerage' },
  { id: 'works', name: 'Works' },
  { id: 'health', name: 'Public Health' },
  { id: 'mobility', name: 'Mobility & ICT Infrastructure' },
];

function IssueDetailDialog({ issue, onClose }: IssueDetailDialogProps) {
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showEscalateModal, setShowEscalateModal] = useState(false);
  const [showForwardModal, setShowForwardModal] = useState(false);
  const [showDuplicateModal, setShowDuplicateModal] = useState(false);
  const [showRequestInfoModal, setShowRequestInfoModal] = useState(false);
  
  const [newStatus, setNewStatus] = useState('');
  const [noteText, setNoteText] = useState('');
  const [assignee, setAssignee] = useState('');
  const [escalateTo, setEscalateTo] = useState('');
  const [escalateReason, setEscalateReason] = useState('');
  const [forwardDept, setForwardDept] = useState('');
  const [forwardReason, setForwardReason] = useState('');
  const [duplicateId, setDuplicateId] = useState('');
  const [requestInfoMessage, setRequestInfoMessage] = useState('');
  
  if (!issue) return null;
  
  const sla = getSlaCountdown(issue.slaHoursRemaining);
  const isUnassigned = issue.status === 'Open';

  return (
    <>
      <Dialog open={!!issue} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="font-mono text-primary">{issue.id}</span>
              {issue.isReopened && (
                <Badge variant="destructive" className="gap-1">
                  <RotateCcw className="w-3 h-3" />
                  Reopened ({issue.reopenCount}x)
                </Badge>
              )}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Citizen's Report */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-2">Citizen Report</h4>
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="font-medium text-foreground">{issue.citizenTitle}</p>
                <p className="text-sm text-muted-foreground">{issue.description}</p>
                <div className="flex items-center gap-4 pt-2">
                  {issue.hasImages && (
                    <Button variant="outline" size="sm" className="gap-1">
                      <Image className="w-4 h-4" />
                      View Photos
                    </Button>
                  )}
                  {issue.hasVoiceNote && (
                    <Button variant="outline" size="sm" className="gap-1">
                      <Mic className="w-4 h-4" />
                      Play Voice Note
                    </Button>
                  )}
                </div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-xs font-medium text-muted-foreground uppercase">Location</h4>
                <p className="text-foreground">{issue.ward}, {issue.zone}</p>
                <p className="text-sm text-muted-foreground">{issue.subCounty}</p>
              </div>
              <div>
                <h4 className="text-xs font-medium text-muted-foreground uppercase">Department</h4>
                <Badge className={DEPARTMENT_COLORS[issue.department]} variant="secondary">
                  {issue.department}
                </Badge>
              </div>
              <div>
                <h4 className="text-xs font-medium text-muted-foreground uppercase">Status</h4>
                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                  {issue.status}
                </span>
              </div>
              <div>
                <h4 className="text-xs font-medium text-muted-foreground uppercase">Priority</h4>
                {getPriorityBadge(issue.priority)}
              </div>
              <div>
                <h4 className="text-xs font-medium text-muted-foreground uppercase">SLA Deadline</h4>
                <div className={`flex items-center gap-1 ${
                  sla.isOverdue ? 'text-destructive font-semibold' : 
                  sla.isUrgent ? 'text-warning' : 'text-foreground'
                }`}>
                  {(sla.isOverdue || sla.isUrgent) && <AlertTriangle className="w-4 h-4" />}
                  {sla.text}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-medium text-muted-foreground uppercase">Submitted</h4>
                <p className="text-foreground">{issue.createdOn}</p>
                <p className="text-sm text-muted-foreground">{getIssueAge(issue.createdAt)} ago</p>
              </div>
            </div>

            {/* Citizen Info */}
            <div>
              <h4 className="text-xs font-medium text-muted-foreground uppercase mb-2">Citizen</h4>
              <p className="text-foreground">{issue.citizenName}</p>
              {issue.citizenPhone && (
                <p className="text-sm text-muted-foreground">{issue.citizenPhone}</p>
              )}
            </div>

            {/* Scalable Actions Dropdown */}
            <div className="flex justify-end pt-4 border-t border-border">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="gap-2">
                    Act on Grievance
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-popover border border-border z-50">
                  <DropdownMenuItem onClick={() => setShowStatusModal(true)} className="gap-2 cursor-pointer">
                    <RefreshCcw className="w-4 h-4" />
                    Update Status
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowNotesModal(true)} className="gap-2 cursor-pointer">
                    <FileText className="w-4 h-4" />
                    Add Notes
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowAssignModal(true)} className="gap-2 cursor-pointer">
                    <UserPlus className="w-4 h-4" />
                    {isUnassigned ? 'Assign' : 'Reassign'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowEscalateModal(true)} className="gap-2 cursor-pointer">
                    <ArrowUpCircle className="w-4 h-4" />
                    Escalate
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowForwardModal(true)} className="gap-2 cursor-pointer">
                    <Building2 className="w-4 h-4" />
                    Forward to Department
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowDuplicateModal(true)} className="gap-2 cursor-pointer">
                    <Copy className="w-4 h-4" />
                    Mark as Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowRequestInfoModal(true)} className="gap-2 cursor-pointer">
                    <MessageSquareMore className="w-4 h-4" />
                    Request More Info
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Update Status Modal */}
      <Dialog open={showStatusModal} onOpenChange={setShowStatusModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Update Status</DialogTitle>
            <DialogDescription>
              Change the status of issue {issue.id}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>New Status</Label>
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select new status" />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-border z-50">
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="awaiting-response">Awaiting Citizen Response</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button 
              className="w-full gap-2" 
              onClick={() => {
                toast.success(`Status updated to "${newStatus.replace('-', ' ')}" for ${issue.id}. Citizen will be notified via SMS.`);
                setShowStatusModal(false);
                setNewStatus('');
              }}
              disabled={!newStatus}
            >
              <Send className="w-4 h-4" />
              Update & Notify Citizen
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Notes Modal */}
      <Dialog open={showNotesModal} onOpenChange={setShowNotesModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Add Internal Notes</DialogTitle>
            <DialogDescription>
              Add notes visible only to county staff for {issue.id}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Note</Label>
              <Textarea
                placeholder="Enter your notes here..."
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={4}
              />
            </div>
            <Button 
              className="w-full gap-2" 
              onClick={() => {
                toast.success(`Note added to ${issue.id}. Visible in issue timeline for staff.`);
                setShowNotesModal(false);
                setNoteText('');
              }}
              disabled={!noteText.trim()}
            >
              <FileText className="w-4 h-4" />
              Save Note
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Assign/Reassign Modal */}
      <Dialog open={showAssignModal} onOpenChange={setShowAssignModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{isUnassigned ? 'Assign Issue' : 'Reassign Issue'}</DialogTitle>
            <DialogDescription>
              {isUnassigned ? 'Assign' : 'Reassign'} {issue.id} to a resolver
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Issue Context - Read Only */}
            <div className="grid grid-cols-3 gap-3 p-3 bg-muted/50 rounded-lg">
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Department</Label>
                <p className="text-sm font-medium">{issue.department}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Sub-County</Label>
                <p className="text-sm font-medium">{issue.subCounty || 'South Zone'}</p>
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">Ward</Label>
                <p className="text-sm font-medium">{issue.ward}</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Select Resolver</Label>
              <Select value={assignee} onValueChange={setAssignee}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a resolver" />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-border z-50">
                  {RESOLVERS.map((resolver) => (
                    <SelectItem key={resolver.id} value={resolver.id}>
                      {resolver.name} - {resolver.department}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button 
              className="w-full gap-2" 
              onClick={() => {
                const resolver = RESOLVERS.find(r => r.id === assignee);
                toast.success(`${issue.id} ${isUnassigned ? 'assigned' : 'reassigned'} to ${resolver?.name}. They will receive a notification.`);
                setShowAssignModal(false);
                setAssignee('');
              }}
              disabled={!assignee}
            >
              <UserPlus className="w-4 h-4" />
              {isUnassigned ? 'Assign Issue' : 'Reassign Issue'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Escalate Modal */}
      <Dialog open={showEscalateModal} onOpenChange={setShowEscalateModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Escalate Issue</DialogTitle>
            <DialogDescription>
              Escalate {issue.id} to a supervisor or department head
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Escalate To</Label>
              <Select value={escalateTo} onValueChange={setEscalateTo}>
                <SelectTrigger>
                  <SelectValue placeholder="Select supervisor" />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-border z-50">
                  {SUPERVISORS.map((supervisor) => (
                    <SelectItem key={supervisor.id} value={supervisor.id}>
                      {supervisor.name} - {supervisor.role}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Reason for Escalation</Label>
              <Textarea
                placeholder="Explain why this issue needs escalation..."
                value={escalateReason}
                onChange={(e) => setEscalateReason(e.target.value)}
                rows={3}
              />
            </div>
            <Button 
              className="w-full gap-2" 
              onClick={() => {
                const supervisor = SUPERVISORS.find(s => s.id === escalateTo);
                toast.success(`${issue.id} escalated to ${supervisor?.name}. Issue marked as priority and supervisor notified.`);
                setShowEscalateModal(false);
                setEscalateTo('');
                setEscalateReason('');
              }}
              disabled={!escalateTo || !escalateReason.trim()}
            >
              <ArrowUpCircle className="w-4 h-4" />
              Escalate Issue
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Forward to Department Modal */}
      <Dialog open={showForwardModal} onOpenChange={setShowForwardModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Forward to Department</DialogTitle>
            <DialogDescription>
              Transfer {issue.id} to another department for handling
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Current Department - Read Only */}
            <div className="p-3 bg-muted/50 rounded-lg">
              <Label className="text-xs text-muted-foreground">Current Department</Label>
              <p className="text-sm font-medium">{issue.department}</p>
            </div>
            
            <div className="space-y-2">
              <Label>Forward To</Label>
              <Select value={forwardDept} onValueChange={setForwardDept}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent className="bg-popover border border-border z-50">
                  {DEPARTMENTS.filter(d => d.name !== issue.department).map((dept) => (
                    <SelectItem key={dept.id} value={dept.id}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Reason for Transfer</Label>
              <Textarea
                placeholder="Explain why this issue belongs to another department..."
                value={forwardReason}
                onChange={(e) => setForwardReason(e.target.value)}
                rows={3}
              />
            </div>
            <Button 
              className="w-full gap-2" 
              onClick={() => {
                const dept = DEPARTMENTS.find(d => d.id === forwardDept);
                toast.success(`${issue.id} forwarded to ${dept?.name}. New department will be notified and issue removed from your queue.`);
                setShowForwardModal(false);
                setForwardDept('');
                setForwardReason('');
              }}
              disabled={!forwardDept || !forwardReason.trim()}
            >
              <Building2 className="w-4 h-4" />
              Forward Issue
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Mark as Duplicate Modal */}
      <Dialog open={showDuplicateModal} onOpenChange={setShowDuplicateModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Mark as Duplicate</DialogTitle>
            <DialogDescription>
              Link {issue.id} to an existing issue as a duplicate
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Original Issue ID</Label>
              <input
                type="text"
                placeholder="e.g., GRV-2024-001"
                value={duplicateId}
                onChange={(e) => setDuplicateId(e.target.value.toUpperCase())}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <p className="text-xs text-muted-foreground">
                Enter the ID of the original issue this is a duplicate of
              </p>
            </div>
            <Button 
              className="w-full gap-2" 
              onClick={() => {
                toast.success(`${issue.id} marked as duplicate of ${duplicateId}. Issues are now linked and citizen notified to track ${duplicateId} instead.`);
                setShowDuplicateModal(false);
                setDuplicateId('');
              }}
              disabled={!duplicateId.trim()}
            >
              <Copy className="w-4 h-4" />
              Mark as Duplicate
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Request More Info Modal */}
      <Dialog open={showRequestInfoModal} onOpenChange={setShowRequestInfoModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Request More Information</DialogTitle>
            <DialogDescription>
              Ask the citizen for additional details about {issue.id}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Message to Citizen</Label>
              <Textarea
                placeholder="Please provide more details about..."
                value={requestInfoMessage}
                onChange={(e) => setRequestInfoMessage(e.target.value)}
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                This message will be sent via SMS to {issue.citizenName}
              </p>
            </div>
            <Button 
              className="w-full gap-2" 
              onClick={() => {
                toast.success(`Request sent to ${issue.citizenName}. Status changed to "Awaiting Response" and SLA paused until citizen replies.`);
                setShowRequestInfoModal(false);
                setRequestInfoMessage('');
              }}
              disabled={!requestInfoMessage.trim()}
            >
              <MessageSquareMore className="w-4 h-4" />
              Send Request
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

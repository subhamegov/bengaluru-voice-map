import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  ThumbsUp,
  ThumbsDown,
  Minus,
  MessageSquare,
  MapPin,
  User,
  Calendar,
  Building2,
  IndianRupee,
  Clock,
  Shield,
  Pin,
  Send,
  Check,
  X,
  ArrowRight,
  AlertTriangle,
  Share2,
  Copy,
  ExternalLink,
  ChevronDown,
  Globe,
  Newspaper,
  Users,
} from 'lucide-react';
import {
  Proposal,
  getCategoryLabel,
  getCategoryColor,
  DeliberationStatement,
  ProposalComment,
} from '@/types/proposal';
import {
  reactToProposal,
  addStatement,
  voteOnStatement,
  addProposalComment,
} from '@/lib/proposalData';

interface Props {
  proposal: Proposal | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSupport: (id: string) => void;
}

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  draft: { label: 'Draft', className: 'bg-muted text-muted-foreground' },
  proposed: { label: 'Proposed', className: 'bg-info/15 text-info border-info/30' },
  under_review: { label: 'Under Review', className: 'bg-warning/15 text-warning border-warning/30' },
  approved: { label: 'Approved', className: 'bg-success/15 text-success border-success/30' },
  budgeted: { label: 'Budgeted', className: 'bg-primary/15 text-primary border-primary/30' },
  completed: { label: 'Completed', className: 'bg-success/15 text-success border-success/30' },
  rejected: { label: 'Rejected', className: 'bg-destructive/15 text-destructive border-destructive/30' },
};

// Mock public discussion data
const MOCK_DISCUSSIONS = [
  { id: '1', snippet: '"The PHC upgrade will greatly benefit families in Indiranagar who currently travel to Domlur for diagnostics."', source: 'Platform', icon: Globe },
  { id: '2', snippet: '"Ward 74 residents have been asking for maternal care facilities since 2023. This is a welcome move."', source: 'Social Media', icon: Users },
  { id: '3', snippet: '"BBMP approves ₹5.4 Cr health centre upgrade for Indiranagar ward."', source: 'News', icon: Newspaper },
];

/* ---------- Civic Quality Meter ---------- */
function getCivicQualityScore(text: string): { score: number; label: string; color: string; guidance: string } {
  const lower = text.toLowerCase();
  const abusiveWords = ['idiot', 'stupid', 'corrupt', 'useless', 'waste', 'fool', 'liar', 'thief', 'scam'];
  const attackWords = ['you are', 'people like you', 'your fault'];
  const spamPatterns = [/(.)\1{4,}/, /!!+/, /\?\?+/];

  let deductions = 0;
  abusiveWords.forEach(w => { if (lower.includes(w)) deductions += 25; });
  attackWords.forEach(w => { if (lower.includes(w)) deductions += 20; });
  spamPatterns.forEach(p => { if (p.test(lower)) deductions += 15; });
  if (text.length < 10 && text.length > 0) deductions += 10;

  const score = Math.max(0, Math.min(100, 100 - deductions));

  if (score >= 70) return { score, label: 'Constructive', color: 'hsl(var(--success))', guidance: 'Great! Your comment is constructive and civic.' };
  if (score >= 40) return { score, label: 'Needs Improvement', color: 'hsl(var(--warning))', guidance: 'Consider rephrasing to be more constructive. Avoid personal attacks.' };
  return { score, label: 'Likely Violates Guidelines', color: 'hsl(var(--destructive))', guidance: 'This comment may violate community guidelines. Please revise.' };
}

/* ---------- Sentiment Bar ---------- */
function SentimentBar({ support, concern, neutral }: { support: number; concern: number; neutral: number }) {
  const total = support + concern + neutral || 1;
  const sp = (support / total) * 100;
  const cp = (concern / total) * 100;
  const np = (neutral / total) * 100;

  return (
    <div className="space-y-1.5">
      <div className="flex h-2.5 w-full rounded-full overflow-hidden">
        <div className="bg-success transition-all" style={{ width: `${sp}%` }} />
        <div className="bg-destructive/70 transition-all" style={{ width: `${cp}%` }} />
        <div className="bg-muted-foreground/40 transition-all" style={{ width: `${np}%` }} />
      </div>
    </div>
  );
}

/* ---------- Statement Card ---------- */
function StatementCard({
  statement,
  proposalId,
  onVote,
}: {
  statement: DeliberationStatement;
  proposalId: string;
  onVote: () => void;
}) {
  const total = statement.agree + statement.disagree + statement.pass || 1;

  const handleVote = (vote: 'agree' | 'disagree' | 'pass') => {
    voteOnStatement(proposalId, statement.id, vote);
    onVote();
  };

  return (
    <div className="border rounded-lg p-3 space-y-2.5 bg-card">
      <p className="text-sm leading-relaxed text-foreground">"{statement.text}"</p>
      <p className="text-xs text-muted-foreground">— {statement.authorName} · {statement.createdAt}</p>
      <div className="flex h-1.5 w-full rounded-full overflow-hidden">
        <div className="bg-success transition-all" style={{ width: `${(statement.agree / total) * 100}%` }} />
        <div className="bg-destructive/70 transition-all" style={{ width: `${(statement.disagree / total) * 100}%` }} />
        <div className="bg-muted-foreground/30 transition-all" style={{ width: `${(statement.pass / total) * 100}%` }} />
      </div>
      <div className="flex gap-1.5">
        <Button variant={statement.userVote === 'agree' ? 'default' : 'outline'} size="sm" className="flex-1 h-8 text-xs" onClick={() => handleVote('agree')}>
          <Check className="w-3 h-3 mr-1" /> Agree ({statement.agree})
        </Button>
        <Button variant={statement.userVote === 'disagree' ? 'destructive' : 'outline'} size="sm" className="flex-1 h-8 text-xs" onClick={() => handleVote('disagree')}>
          <X className="w-3 h-3 mr-1" /> Disagree ({statement.disagree})
        </Button>
        <Button variant={statement.userVote === 'pass' ? 'secondary' : 'outline'} size="sm" className="flex-1 h-8 text-xs" onClick={() => handleVote('pass')}>
          <Minus className="w-3 h-3 mr-1" /> Pass ({statement.pass})
        </Button>
      </div>
    </div>
  );
}

/* ---------- Comment Item ---------- */
function CommentItem({ comment }: { comment: ProposalComment }) {
  const roleStyle = comment.authorRole === 'officer'
    ? 'border-l-primary bg-primary/5'
    : comment.authorRole === 'councillor'
      ? 'border-l-warning bg-warning/5'
      : '';

  const roleBadge = comment.authorRole === 'officer'
    ? 'Dept. Officer'
    : comment.authorRole === 'councillor'
      ? 'Ward Councillor'
      : null;

  return (
    <div className={`border rounded-lg p-3 space-y-1.5 ${comment.isPinned ? `border-l-4 ${roleStyle}` : 'bg-card'}`}>
      {comment.isPinned && (
        <div className="flex items-center gap-1 text-xs text-primary font-medium">
          <Pin className="w-3 h-3" /> Official Response
        </div>
      )}
      <p className="text-sm leading-relaxed">{comment.text}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-foreground">{comment.authorName}</span>
          {roleBadge && (
            <Badge variant="outline" className="text-[10px] h-5 px-1.5">{roleBadge}</Badge>
          )}
          <span className="text-xs text-muted-foreground">{comment.createdAt}</span>
        </div>
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <ThumbsUp className="w-3 h-3" /> {comment.helpfulCount}
        </span>
      </div>
    </div>
  );
}

/* ---------- Collapsible Admin Card ---------- */
function AdminDetailCard({ icon: Icon, label, value, subtitle }: { icon: React.ElementType; label: string; value: string; subtitle?: string }) {
  return (
    <Collapsible>
      <CollapsibleTrigger className="w-full flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors text-left">
        <div className="flex items-center gap-2.5">
          <Icon className="w-4 h-4 text-primary flex-shrink-0" />
          <span className="text-sm font-medium text-foreground">{label}</span>
        </div>
        <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform [[data-state=open]>&]:rotate-180" />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-3 pb-3 pt-1.5 ml-6.5">
          <p className="text-sm font-semibold text-foreground">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

/* ---------- Share Panel ---------- */
function SharePanel({ proposal, onClose }: { proposal: Proposal; onClose: () => void }) {
  const [copied, setCopied] = useState(false);
  const shareUrl = `${window.location.origin}/my-proposals?id=${proposal.id}`;
  const shareText = `${proposal.title} — Ward ${proposal.wardNumber ?? ''} ${proposal.wardName}, ${proposal.city}. ${proposal.reactions.support} supporters. Check it out:`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;

  return (
    <div className="bg-muted/50 border rounded-xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-foreground">Share this proposal</h4>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border bg-card text-sm font-medium text-foreground hover:bg-muted transition-colors">
          <span className="text-base">💬</span> WhatsApp
        </a>
        <a href={twitterUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border bg-card text-sm font-medium text-foreground hover:bg-muted transition-colors">
          <span className="text-base">𝕏</span> Post on X
        </a>
        <a href={facebookUrl} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border bg-card text-sm font-medium text-foreground hover:bg-muted transition-colors">
          <span className="text-base">📘</span> Facebook
        </a>
        <button onClick={handleCopy}
          className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border bg-card text-sm font-medium text-foreground hover:bg-muted transition-colors">
          {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy Link'}
        </button>
      </div>
    </div>
  );
}

/* ========== Main Modal ========== */
export function ProposalDetailModal({ proposal, open, onOpenChange, onSupport }: Props) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [newStatement, setNewStatement] = useState('');
  const [newComment, setNewComment] = useState('');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showSharePanel, setShowSharePanel] = useState(false);
  const civicScore = useMemo(() => getCivicQualityScore(newComment), [newComment]);

  if (!proposal) return null;
  const p = proposal;

  const statusCfg = STATUS_CONFIG[p.status] ?? STATUS_CONFIG.draft;
  const totalReactions = p.reactions.support + p.reactions.concern + p.reactions.neutral;
  const descriptionIsLong = p.description.length > 180;

  const handleReaction = (reaction: 'support' | 'concern' | 'neutral') => {
    reactToProposal(p.id, reaction);
    if (reaction === 'support') onSupport(p.id);
    setRefreshKey(k => k + 1);
  };

  const handleAddStatement = () => {
    if (!newStatement.trim()) return;
    addStatement(p.id, newStatement.trim());
    setNewStatement('');
    setRefreshKey(k => k + 1);
  };

  const handleAddComment = () => {
    if (!newComment.trim() || civicScore.score < 40) return;
    addProposalComment(p.id, newComment.trim());
    setNewComment('');
    setRefreshKey(k => k + 1);
  };

  const pinnedComments = p.comments.filter(c => c.isPinned);
  const citizenComments = p.comments.filter(c => !c.isPinned);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-2xl p-0 gap-0 max-h-[90vh] overflow-hidden"
        style={{ zIndex: 10000 }}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <ScrollArea className="max-h-[90vh]">
          <div className="space-y-0">

            {/* ===== 1. COMPACT HEADER ===== */}
            <div className="p-4 sm:p-5 pb-3 space-y-2.5 bg-background">
              {/* Chips row */}
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  <Badge
                    variant="outline"
                    style={{ borderColor: getCategoryColor(p.category), color: getCategoryColor(p.category) }}
                    className="text-xs"
                  >
                    {getCategoryLabel(p.category)}
                  </Badge>
                  <Badge className={`${statusCfg.className} text-xs`} variant="outline">
                    {statusCfg.label}
                  </Badge>
                </div>
                <button
                  onClick={() => setShowSharePanel(!showSharePanel)}
                  className="p-2 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                  aria-label="Share proposal"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Title */}
              <h2 className="text-lg sm:text-xl font-bold text-foreground leading-snug pr-6">
                {p.title}
              </h2>

              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  Ward {p.wardNumber ?? '—'} · {p.wardName}
                </span>
                <span className="flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5" />
                  {p.city}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" />
                  {p.createdAt}
                </span>
              </div>
            </div>

            {/* ===== Share Panel (conditionally shown) ===== */}
            {showSharePanel && (
              <div className="px-4 sm:px-5 pb-3">
                <SharePanel proposal={p} onClose={() => setShowSharePanel(false)} />
              </div>
            )}

            {/* ===== 2. SUPPORT INDICATOR ===== */}
            <div className="px-4 sm:px-5 pb-2">
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-success inline-block" />
                  <strong className="text-foreground">{p.reactions.support}</strong> Support
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-destructive/70 inline-block" />
                  <strong className="text-foreground">{p.reactions.concern}</strong> Concern
                </span>
                <span className="flex items-center gap-1">
                  <MessageSquare className="w-3 h-3" />
                  <strong className="text-foreground">{p.comments.length}</strong> Comments
                </span>
              </div>
              <div className="mt-2">
                <SentimentBar support={p.reactions.support} concern={p.reactions.concern} neutral={p.reactions.neutral} />
              </div>
            </div>

            {/* ===== 3. PARTICIPATION ACTION BAR ===== */}
            <div className="px-4 sm:px-5 py-3 border-y border-border bg-muted/20">
              <div className="grid grid-cols-4 gap-2">
                <Button
                  variant={p.reactions.userReaction === 'support' ? 'default' : 'outline'}
                  size="sm"
                  className="h-10 text-xs flex-col gap-0.5 px-1"
                  onClick={() => handleReaction('support')}
                >
                  <ThumbsUp className="w-4 h-4" />
                  Support
                </Button>
                <Button
                  variant={p.reactions.userReaction === 'concern' ? 'destructive' : 'outline'}
                  size="sm"
                  className="h-10 text-xs flex-col gap-0.5 px-1"
                  onClick={() => handleReaction('concern')}
                >
                  <AlertTriangle className="w-4 h-4" />
                  Concern
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 text-xs flex-col gap-0.5 px-1"
                  onClick={() => {
                    // Scroll to comment section
                    document.getElementById('proposal-comment-section')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <MessageSquare className="w-4 h-4" />
                  Comment
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-10 text-xs flex-col gap-0.5 px-1"
                  onClick={() => setShowSharePanel(!showSharePanel)}
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* ===== 4. PROPOSAL DESCRIPTION ===== */}
            <div className="px-4 sm:px-5 py-4 space-y-2">
              <p className={`text-sm text-foreground leading-relaxed ${!showFullDescription && descriptionIsLong ? 'line-clamp-3' : ''}`}>
                {p.description}
              </p>
              {descriptionIsLong && (
                <button
                  onClick={() => setShowFullDescription(!showFullDescription)}
                  className="text-xs font-medium text-primary hover:underline"
                >
                  {showFullDescription ? 'Show less' : 'Read more'}
                </button>
              )}
            </div>

            <Separator />

            {/* ===== 5. OFFICIAL RESPONSES (pinned at top) ===== */}
            {pinnedComments.length > 0 && (
              <div className="px-4 sm:px-5 py-4 space-y-3">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Shield className="w-4 h-4 text-primary" />
                  Official Responses
                </h3>
                <div className="space-y-2">
                  {pinnedComments.map(c => (
                    <CommentItem key={c.id} comment={c} />
                  ))}
                </div>
              </div>
            )}

            {pinnedComments.length > 0 && <Separator />}

            {/* ===== 6. WHAT PEOPLE ARE SAYING ===== */}
            <div className="px-4 sm:px-5 py-4 space-y-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <Users className="w-4 h-4 text-primary" />
                What people are saying
              </h3>
              <p className="text-xs text-muted-foreground">{MOCK_DISCUSSIONS.length} public mentions</p>
              <div className="space-y-2">
                {MOCK_DISCUSSIONS.slice(0, 3).map(d => (
                  <div key={d.id} className="border rounded-lg p-3 bg-card space-y-1.5">
                    <p className="text-sm text-foreground leading-relaxed">{d.snippet}</p>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <d.icon className="w-3 h-3" />
                      {d.source}
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="ghost" size="sm" className="text-xs text-primary p-0 h-auto hover:bg-transparent hover:underline">
                View all discussion <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            </div>

            <Separator />

            {/* ===== 7. ADMIN DETAILS (collapsible) ===== */}
            <div className="px-4 sm:px-5 py-4 space-y-2">
              <h3 className="text-sm font-semibold text-foreground mb-2">Project Details</h3>
              {p.department && (
                <AdminDetailCard icon={Building2} label="Department" value={p.department} />
              )}
              {p.estimatedBudget && (
                <AdminDetailCard icon={IndianRupee} label="Estimated Budget" value={p.estimatedBudget} />
              )}
              {p.targetTimeline && (
                <AdminDetailCard icon={Clock} label="Target Timeline" value={p.targetTimeline} />
              )}
              {p.representatives && p.representatives.length > 0 && (
                <AdminDetailCard
                  icon={User}
                  label="Representative"
                  value={p.representatives[0].name}
                  subtitle={p.representatives[0].role}
                />
              )}

              {/* Map section — collapsible */}
              <Collapsible>
                <CollapsibleTrigger className="w-full flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors text-left">
                  <div className="flex items-center gap-2.5">
                    <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                    <span className="text-sm font-medium text-foreground">Project Location</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform [[data-state=open]>&]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="p-3 space-y-2">
                    <div className="rounded-lg border bg-muted/30 p-3 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          Ward {p.wardNumber ?? '—'} ({p.wardName})
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {p.lat.toFixed(4)}°N, {p.lng.toFixed(4)}°E · {p.city}
                        </p>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      This proposal affects Ward {p.wardNumber ?? '—'} residents.
                    </p>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>

            <Separator />

            {/* ===== 8. DELIBERATION STATEMENTS ===== */}
            <div className="px-4 sm:px-5 py-4 space-y-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                Deliberation · {p.statements.length} statement{p.statements.length !== 1 ? 's' : ''}
              </h3>
              <p className="text-xs text-muted-foreground">
                Add a statement about this proposal. Others can agree, disagree, or pass.
              </p>

              <div className="flex gap-2">
                <Input
                  value={newStatement}
                  onChange={e => setNewStatement(e.target.value)}
                  placeholder="Add a statement…"
                  className="flex-1"
                  maxLength={280}
                  onKeyDown={e => e.key === 'Enter' && handleAddStatement()}
                />
                <Button size="sm" onClick={handleAddStatement} disabled={!newStatement.trim()}>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-2">
                {p.statements.map(s => (
                  <StatementCard
                    key={s.id}
                    statement={s}
                    proposalId={p.id}
                    onVote={() => setRefreshKey(k => k + 1)}
                  />
                ))}
                {p.statements.length === 0 && (
                  <p className="text-xs text-muted-foreground text-center py-4 border rounded-lg bg-muted/30">
                    No statements yet. Be the first to add one.
                  </p>
                )}
              </div>
            </div>

            <Separator />

            {/* ===== 9. COMMENTS ===== */}
            <div id="proposal-comment-section" className="px-4 sm:px-5 py-4 space-y-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                Comments · {p.comments.length}
              </h3>

              <div className="space-y-2">
                <Textarea
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  placeholder="Share a constructive comment…"
                  rows={3}
                  maxLength={500}
                />

                {newComment.length > 0 && (
                  <div className="space-y-1.5 p-3 rounded-lg border bg-muted/30">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-foreground">Civic Quality Score</span>
                      <span className="text-xs font-semibold" style={{ color: civicScore.color }}>
                        {civicScore.label}
                      </span>
                    </div>
                    <Progress
                      value={civicScore.score}
                      className="h-2"
                      style={{ ['--progress-color' as string]: civicScore.color }}
                    />
                    <p className="text-xs text-muted-foreground">{civicScore.guidance}</p>
                  </div>
                )}

                <p className="text-xs text-muted-foreground">
                  Constructive comments help the city prioritize better. Avoid personal attacks.
                </p>

                <Button
                  onClick={handleAddComment}
                  disabled={!newComment.trim() || civicScore.score < 40}
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <Send className="w-4 h-4 mr-1.5" />
                  Submit Comment
                </Button>
              </div>

              <div className="space-y-2">
                {citizenComments.map(c => (
                  <CommentItem key={c.id} comment={c} />
                ))}
                {citizenComments.length === 0 && (
                  <p className="text-xs text-muted-foreground text-center py-3 border rounded-lg bg-muted/30">
                    No citizen comments yet.
                  </p>
                )}
              </div>
            </div>

            {/* ===== FOOTER ===== */}
            <div className="px-4 sm:px-5 py-3 border-t border-border bg-muted/10">
              <Button onClick={() => onOpenChange(false)} variant="outline" className="w-full">
                Close
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

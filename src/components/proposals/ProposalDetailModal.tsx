import React, { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
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
  BarChart3,
  AlertTriangle,
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
    <div className="space-y-2">
      <div className="flex h-3 w-full rounded-full overflow-hidden">
        <div className="bg-success transition-all" style={{ width: `${sp}%` }} title={`Support: ${support}`} />
        <div className="bg-destructive/70 transition-all" style={{ width: `${cp}%` }} title={`Concern: ${concern}`} />
        <div className="bg-muted-foreground/40 transition-all" style={{ width: `${np}%` }} title={`Neutral: ${neutral}`} />
      </div>
      <div className="flex justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success inline-block" /> Support {support}</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-destructive/70 inline-block" /> Concern {concern}</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-muted-foreground/40 inline-block" /> Neutral {neutral}</span>
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

      {/* Vote distribution bar */}
      <div className="flex h-1.5 w-full rounded-full overflow-hidden">
        <div className="bg-success transition-all" style={{ width: `${(statement.agree / total) * 100}%` }} />
        <div className="bg-destructive/70 transition-all" style={{ width: `${(statement.disagree / total) * 100}%` }} />
        <div className="bg-muted-foreground/30 transition-all" style={{ width: `${(statement.pass / total) * 100}%` }} />
      </div>

      <div className="flex gap-1.5">
        <Button
          variant={statement.userVote === 'agree' ? 'default' : 'outline'}
          size="sm"
          className="flex-1 h-8 text-xs"
          onClick={() => handleVote('agree')}
        >
          <Check className="w-3 h-3 mr-1" /> Agree ({statement.agree})
        </Button>
        <Button
          variant={statement.userVote === 'disagree' ? 'destructive' : 'outline'}
          size="sm"
          className="flex-1 h-8 text-xs"
          onClick={() => handleVote('disagree')}
        >
          <X className="w-3 h-3 mr-1" /> Disagree ({statement.disagree})
        </Button>
        <Button
          variant={statement.userVote === 'pass' ? 'secondary' : 'outline'}
          size="sm"
          className="flex-1 h-8 text-xs"
          onClick={() => handleVote('pass')}
        >
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

/* ---------- Main Modal ---------- */
export function ProposalDetailModal({ proposal, open, onOpenChange, onSupport }: Props) {
  const [refreshKey, setRefreshKey] = useState(0);
  const [newStatement, setNewStatement] = useState('');
  const [newComment, setNewComment] = useState('');

  // Force re-read proposal data on interactions
  const p = proposal;
  if (!p) return null;

  const statusCfg = STATUS_CONFIG[p.status] ?? STATUS_CONFIG.draft;
  const totalReactions = p.reactions.support + p.reactions.concern + p.reactions.neutral;
  const civicScore = useMemo(() => getCivicQualityScore(newComment), [newComment]);

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
          <div className="p-5 sm:p-6 space-y-5">

            {/* ===== HEADER ===== */}
            <div className="space-y-3">
              <div className="flex flex-wrap gap-2 items-center">
                <Badge
                  variant="outline"
                  style={{ borderColor: getCategoryColor(p.category), color: getCategoryColor(p.category) }}
                >
                  {getCategoryLabel(p.category)}
                </Badge>
                <Badge className={statusCfg.className} variant="outline">
                  {statusCfg.label}
                </Badge>
              </div>

              <DialogHeader className="p-0">
                <DialogTitle className="text-xl leading-snug pr-8">{p.title}</DialogTitle>
              </DialogHeader>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  Ward {p.wardNumber ?? '—'} · {p.wardName}
                </span>
                <span className="flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5" />
                  {p.city}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {p.createdAt}
                </span>
              </div>
            </div>

            <Separator />

            {/* ===== PROPOSAL DETAILS ===== */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                Proposal Details
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {p.department && (
                  <div className="flex items-start gap-2 p-2.5 rounded-lg bg-muted/50 text-sm">
                    <Building2 className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Department</p>
                      <p className="font-medium text-foreground">{p.department}</p>
                    </div>
                  </div>
                )}
                {p.estimatedBudget && (
                  <div className="flex items-start gap-2 p-2.5 rounded-lg bg-muted/50 text-sm">
                    <IndianRupee className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Estimated Budget</p>
                      <p className="font-medium text-foreground">{p.estimatedBudget}</p>
                    </div>
                  </div>
                )}
                {p.targetTimeline && (
                  <div className="flex items-start gap-2 p-2.5 rounded-lg bg-muted/50 text-sm">
                    <Clock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Target Timeline</p>
                      <p className="font-medium text-foreground">{p.targetTimeline}</p>
                    </div>
                  </div>
                )}
                {p.representatives && p.representatives.length > 0 && (
                  <div className="flex items-start gap-2 p-2.5 rounded-lg bg-muted/50 text-sm">
                    <User className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-muted-foreground">Representative</p>
                      <p className="font-medium text-foreground">{p.representatives[0].name}</p>
                      <p className="text-xs text-muted-foreground">{p.representatives[0].role}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* ===== MAP CONTEXT ===== */}
            <div className="rounded-lg border bg-muted/30 p-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  This proposal affects Ward {p.wardNumber ?? '—'} ({p.wardName}) residents.
                </p>
                <p className="text-xs text-muted-foreground">
                  Location: {p.lat.toFixed(4)}°N, {p.lng.toFixed(4)}°E · {p.city}
                </p>
              </div>
            </div>

            <Separator />

            {/* ===== CIVIC REACTIONS ===== */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-primary" />
                Civic Reaction · {totalReactions} responses
              </h3>

              <div className="flex gap-2">
                <Button
                  variant={p.reactions.userReaction === 'support' ? 'default' : 'outline'}
                  size="sm"
                  className="flex-1"
                  onClick={() => handleReaction('support')}
                >
                  <ThumbsUp className="w-4 h-4 mr-1.5" />
                  Support
                </Button>
                <Button
                  variant={p.reactions.userReaction === 'concern' ? 'destructive' : 'outline'}
                  size="sm"
                  className="flex-1"
                  onClick={() => handleReaction('concern')}
                >
                  <AlertTriangle className="w-4 h-4 mr-1.5" />
                  Concern
                </Button>
                <Button
                  variant={p.reactions.userReaction === 'neutral' ? 'secondary' : 'outline'}
                  size="sm"
                  className="flex-1"
                  onClick={() => handleReaction('neutral')}
                >
                  <Minus className="w-4 h-4 mr-1.5" />
                  Neutral
                </Button>
              </div>

              <SentimentBar
                support={p.reactions.support}
                concern={p.reactions.concern}
                neutral={p.reactions.neutral}
              />
            </div>

            <Separator />

            {/* ===== DELIBERATION STATEMENTS ===== */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                Deliberation · {p.statements.length} statement{p.statements.length !== 1 ? 's' : ''}
              </h3>
              <p className="text-xs text-muted-foreground">
                Add a statement about this proposal. Others can agree, disagree, or pass.
              </p>

              {/* Add statement */}
              <div className="flex gap-2">
                <Input
                  value={newStatement}
                  onChange={e => setNewStatement(e.target.value)}
                  placeholder="Add a statement about this proposal…"
                  className="flex-1"
                  maxLength={280}
                  onKeyDown={e => e.key === 'Enter' && handleAddStatement()}
                />
                <Button size="sm" onClick={handleAddStatement} disabled={!newStatement.trim()}>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>

              {/* Statement cards */}
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

            {/* ===== REPRESENTATIVE FEEDBACK ===== */}
            {pinnedComments.length > 0 && (
              <>
                <div className="space-y-3">
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
                <Separator />
              </>
            )}

            {/* ===== COMMENTS ===== */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-primary" />
                Comments · {p.comments.length}
              </h3>

              {/* Comment input with moderation meter */}
              <div className="space-y-2">
                <Textarea
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  placeholder="Share a constructive comment about this proposal…"
                  rows={3}
                  maxLength={500}
                />

                {/* Civic Quality Meter */}
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
                      style={{
                        ['--progress-color' as string]: civicScore.color,
                      }}
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

              {/* Comment list */}
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

            {/* ===== FOOTER ACTIONS ===== */}
            <Separator />
            <div className="flex flex-col sm:flex-row gap-2 pb-1">
              <Button onClick={() => onOpenChange(false)} variant="outline" className="flex-1">
                Close
              </Button>
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}

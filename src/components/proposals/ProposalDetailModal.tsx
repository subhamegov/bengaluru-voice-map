import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, MessageSquare } from 'lucide-react';
import { Proposal, getCategoryLabel, getCategoryColor } from '@/types/proposal';

interface Props {
  proposal: Proposal | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSupport: (id: string) => void;
}

export function ProposalDetailModal({ proposal, open, onOpenChange, onSupport }: Props) {
  if (!proposal) return null;

  const statusMap: Record<string, string> = {
    draft: 'Draft',
    open: 'Open',
    under_review: 'Under Review',
    approved: 'Approved',
    rejected: 'Rejected',
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg">{proposal.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Badge
              variant="outline"
              style={{ borderColor: getCategoryColor(proposal.category), color: getCategoryColor(proposal.category) }}
            >
              {getCategoryLabel(proposal.category)}
            </Badge>
            <Badge variant="secondary">{statusMap[proposal.status]}</Badge>
            <Badge variant="outline">{proposal.wardName}</Badge>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">{proposal.description}</p>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>By: <strong className="text-foreground">{proposal.creatorName}</strong></span>
            <span className="flex items-center gap-1"><ThumbsUp className="w-3.5 h-3.5" /> {proposal.supportCount}</span>
            <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" /> {proposal.commentCount}</span>
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              onClick={() => onSupport(proposal.id)}
              disabled={proposal.supportedByUser}
              className="flex-1"
            >
              <ThumbsUp className="w-4 h-4 mr-1" />
              {proposal.supportedByUser ? 'Supported' : 'Support Proposal'}
            </Button>
            <Button variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

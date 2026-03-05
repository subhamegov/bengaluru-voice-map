import React, { useState } from 'react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThumbsUp, Eye } from 'lucide-react';
import { Proposal, getCategoryLabel, getCategoryColor } from '@/types/proposal';

interface Props {
  proposals: Proposal[];
  onView: (p: Proposal) => void;
  onSupport: (id: string) => void;
}

const PAGE_SIZE = 8;

const STATUS_LABEL: Record<string, string> = {
  draft: 'Draft', open: 'Open', under_review: 'Under Review', approved: 'Approved', rejected: 'Rejected',
};

export function ProposalTable({ proposals, onView, onSupport }: Props) {
  const [page, setPage] = useState(0);
  const [sortField, setSortField] = useState<'supportCount' | 'createdAt'>('createdAt');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

  const sorted = [...proposals].sort((a, b) => {
    const va = a[sortField]; const vb = b[sortField];
    if (va < vb) return sortDir === 'asc' ? -1 : 1;
    if (va > vb) return sortDir === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const pageData = sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const toggleSort = (field: typeof sortField) => {
    if (sortField === field) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortField(field); setSortDir('desc'); }
  };

  return (
    <div className="space-y-3">
      <div className="overflow-x-auto border border-border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-24">ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Ward</TableHead>
              <TableHead className="cursor-pointer select-none" onClick={() => toggleSort('supportCount')}>
                Support {sortField === 'supportCount' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
              </TableHead>
              <TableHead>Comments</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pageData.length === 0 && (
              <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground py-8">No proposals found</TableCell></TableRow>
            )}
            {pageData.map(p => (
              <TableRow key={p.id} className="hover:bg-muted/50">
                <TableCell className="font-mono text-xs text-muted-foreground">{p.id.slice(0, 8)}</TableCell>
                <TableCell className="font-medium max-w-[200px] truncate">{p.title}</TableCell>
                <TableCell>
                  <Badge variant="outline" style={{ borderColor: getCategoryColor(p.category), color: getCategoryColor(p.category) }}>
                    {getCategoryLabel(p.category)}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm">{p.wardName}</TableCell>
                <TableCell className="text-sm">{p.supportCount}</TableCell>
                <TableCell className="text-sm">{p.commentCount}</TableCell>
                <TableCell><Badge variant="secondary">{STATUS_LABEL[p.status]}</Badge></TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center gap-1 justify-end">
                    <Button size="sm" variant="ghost" onClick={() => onView(p)}><Eye className="w-4 h-4" /></Button>
                    <Button size="sm" variant="ghost" onClick={() => onSupport(p.id)} disabled={p.supportedByUser}>
                      <ThumbsUp className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button size="sm" variant="outline" disabled={page === 0} onClick={() => setPage(p => p - 1)}>Previous</Button>
          <span className="text-sm text-muted-foreground">Page {page + 1} of {totalPages}</span>
          <Button size="sm" variant="outline" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>Next</Button>
        </div>
      )}
    </div>
  );
}

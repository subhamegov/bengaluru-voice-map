import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { PROPOSAL_CATEGORIES, ProposalCategory } from '@/types/proposal';
import { loadWardPref } from '@/services/wardPreferences';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (data: { title: string; description: string; category: string; wardCode: string; wardName: string }) => void;
}

const WARDS = [
  { code: 'JAYANAGAR', name: 'Jayanagar' },
  { code: 'KORAMANGALA', name: 'Koramangala' },
  { code: 'INDIRANAGAR', name: 'Indiranagar' },
  { code: 'WHITEFIELD', name: 'Whitefield' },
  { code: 'MARATHAHALLI', name: 'Marathahalli' },
  { code: 'HSR_LAYOUT', name: 'HSR Layout' },
  { code: 'HEBBAL', name: 'Hebbal' },
  { code: 'MALLESHWARAM', name: 'Malleshwaram' },
  { code: 'BASAVANAGUDI', name: 'Basavanagudi' },
];

export function CreateProposalModal({ open, onOpenChange, onCreate }: Props) {
  const pref = loadWardPref();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<string>('');
  const [wardCode, setWardCode] = useState(pref.defaultWardId ?? '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !category || !wardCode) return;
    const ward = WARDS.find(w => w.code === wardCode);
    onCreate({ title, description, category, wardCode, wardName: ward?.name ?? wardCode });
    setTitle('');
    setDescription('');
    setCategory('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Proposal</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="proposal-title">Title *</Label>
            <Input id="proposal-title" value={title} onChange={e => setTitle(e.target.value)} placeholder="Proposal title" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="proposal-category">Category *</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
              <SelectContent>
                {PROPOSAL_CATEGORIES.map(c => (
                  <SelectItem key={c.id} value={c.id}>{c.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="proposal-ward">Ward *</Label>
            <Select value={wardCode} onValueChange={setWardCode}>
              <SelectTrigger><SelectValue placeholder="Select ward" /></SelectTrigger>
              <SelectContent>
                {WARDS.map(w => (
                  <SelectItem key={w.code} value={w.code}>{w.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="proposal-desc">Description</Label>
            <Textarea id="proposal-desc" value={description} onChange={e => setDescription(e.target.value)} placeholder="Describe your proposal..." rows={4} />
          </div>
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
            <Button type="submit" disabled={!title || !category || !wardCode}>Submit</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

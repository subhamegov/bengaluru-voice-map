import React from 'react';
import { X, MessageCircle, Copy, Mail, Check } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  summary: string;
  url?: string;
}

export function ShareModal({ open, onOpenChange, title, summary, url }: ShareModalProps) {
  const [copied, setCopied] = React.useState(false);
  const shareUrl = url || window.location.href;
  const shareText = `${title}\n\n${summary}\n\n${shareUrl}`;

  const handleWhatsApp = () => {
    const encoded = encodeURIComponent(shareText);
    window.open(`https://wa.me/?text=${encoded}`, '_blank');
  };

  const handleEmail = () => {
    const subject = encodeURIComponent(title);
    const body = encodeURIComponent(`${summary}\n\nMore details: ${shareUrl}`);
    window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = shareText;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold text-foreground">Share</DialogTitle>
        </DialogHeader>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{title}</p>

        <div className="space-y-2">
          <button
            onClick={handleWhatsApp}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-border hover:bg-muted transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <span className="text-sm font-semibold text-foreground">WhatsApp</span>
              <span className="block text-xs text-muted-foreground">Share via WhatsApp</span>
            </div>
          </button>

          <button
            onClick={handleEmail}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-border hover:bg-muted transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <span className="text-sm font-semibold text-foreground">Email</span>
              <span className="block text-xs text-muted-foreground">Share via email</span>
            </div>
          </button>

          <button
            onClick={handleCopy}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg border border-border hover:bg-muted transition-colors text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <div className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
              copied ? 'bg-green-100' : 'bg-muted'
            )}>
              {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5 text-muted-foreground" />}
            </div>
            <div>
              <span className="text-sm font-semibold text-foreground">{copied ? 'Copied!' : 'Copy Link'}</span>
              <span className="block text-xs text-muted-foreground">Copy to clipboard</span>
            </div>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

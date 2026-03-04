import React from 'react';
import { Calendar, MapPin, Building2, ChevronRight } from 'lucide-react';
import { Happening, HAPPENING_TYPE_LABELS } from '@/types/happenings';
import { HAPPENING_TYPE_ICON_COMPONENTS } from '@/lib/iconMaps';
import { cn } from '@/lib/utils';

interface HappeningCardProps {
  happening: Happening;
  className?: string;
  onClick?: () => void;
}

export function HappeningCard({ happening, className, onClick }: HappeningCardProps) {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  const getTypeColor = () => {
    switch (happening.type) {
      case 'INFRASTRUCTURE': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'EVENT': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'NOTICE': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'SERVICE': return 'bg-green-100 text-green-800 border-green-200';
      case 'EMERGENCY': return 'bg-red-100 text-red-800 border-red-200';
      case 'COMMUNITY': return 'bg-teal-100 text-teal-800 border-teal-200';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <article
      className={cn(
        'gov-card p-4 cursor-pointer group',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      aria-labelledby={`happening-title-${happening.id}`}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
      tabIndex={0}
      role="button"
    >
      {/* Row 1: Badge + Date */}
      <div className="flex items-center justify-between gap-2 mb-2">
        <span
          className={cn(
            'inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold border',
            getTypeColor()
          )}
        >
          {(() => {
            const Icon = HAPPENING_TYPE_ICON_COMPONENTS[happening.type];
            return <Icon className="w-3 h-3" aria-hidden="true" />;
          })()}
          {HAPPENING_TYPE_LABELS[happening.type]}
        </span>

        <time
          dateTime={happening.date}
          className="flex items-center gap-1 text-xs text-muted-foreground"
        >
          <Calendar className="w-3 h-3" aria-hidden="true" />
          {formatDate(happening.date)}
        </time>
      </div>

      {/* Row 2: Title */}
      <h3
        id={`happening-title-${happening.id}`}
        className="font-semibold text-foreground mb-1 text-sm leading-snug"
      >
        {happening.title}
      </h3>

      {/* Row 3: Summary (2-line clamp) */}
      <p className="text-xs text-muted-foreground leading-relaxed mb-2 line-clamp-2">
        {happening.summary}
      </p>

      {/* Row 4: Source + Ward + arrow */}
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Building2 className="w-3 h-3" aria-hidden="true" />
            {happening.source}
          </span>
          {happening.wardName && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" aria-hidden="true" />
              {happening.wardName}
            </span>
          )}
        </div>
        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" aria-hidden="true" />
      </div>
    </article>
  );
}

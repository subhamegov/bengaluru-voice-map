import React from 'react';
import { IssueCategory, ISSUE_CATEGORIES } from '@/types/story';
import { ISSUE_CATEGORY_ICONS } from '@/lib/iconMaps';
import { cn } from '@/lib/utils';

interface CategoryPickerProps {
  selected: IssueCategory | null;
  onSelect: (category: IssueCategory) => void;
  className?: string;
}

export function CategoryPicker({ selected, onSelect, className }: CategoryPickerProps) {
  return (
    <div className={className}>
      <fieldset>
        <legend className="text-xl font-bold text-foreground mb-4">
          What type of issue is this?
        </legend>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {ISSUE_CATEGORIES.map((cat) => {
            const IconComponent = ISSUE_CATEGORY_ICONS[cat.code];
            return (
              <label
                key={cat.code}
                className={cn(
                  'flex flex-col items-center p-4 rounded-xl border-2 cursor-pointer transition-all text-center',
                  'focus-within:ring-2 focus-within:ring-primary',
                  selected === cat.code
                    ? 'border-primary bg-primary/10 shadow-md ring-1 ring-primary/30'
                    : 'border-border bg-card hover:border-primary/60 hover:bg-primary/5 hover:shadow-sm'
                )}
              >
                <input
                  type="radio"
                  name="issueCategory"
                  value={cat.code}
                  checked={selected === cat.code}
                  onChange={() => onSelect(cat.code)}
                  className="sr-only"
                />
                <IconComponent className="w-8 h-8 mb-2 text-primary" aria-hidden="true" />
                <span className="font-semibold text-foreground text-sm">{cat.label}</span>
                <span className="text-xs text-muted-foreground mt-1">{cat.description}</span>
              </label>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}

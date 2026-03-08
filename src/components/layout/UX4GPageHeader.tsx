import React from 'react';
import { LucideIcon, Home } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface UX4GPageHeaderProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function UX4GPageHeader({ icon: Icon, title, description, action, className }: UX4GPageHeaderProps) {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header
      className={cn('pt-5 sm:pt-8 pb-4 sm:pb-6 mb-4 sm:mb-6 max-w-[1100px]', className)}
      aria-labelledby="page-header-title"
    >
      {!isHome && (
        <div className="mb-3">
          <Link to="/" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
        </div>
      )}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
            )}
            <h1
              id="page-header-title"
              className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-[1.2] tracking-tight text-foreground font-display"
            >
              {title}
            </h1>
          </div>
          <p className="text-lg text-muted-foreground mt-2 max-w-2xl">
            {description}
          </p>
        </div>

        {action && (
          <div className="flex-shrink-0 pt-1">
            {action}
          </div>
        )}
      </div>
    </header>
  );
}

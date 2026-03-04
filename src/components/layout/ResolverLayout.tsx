import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Home, ClipboardList, Search, BarChart3, AlertTriangle, Users, ClipboardCheck, Bell, HelpCircle, User, GraduationCap, Building, ArrowRightLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CITY } from '@/config/city';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface ResolverLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Home', href: '/resolver', icon: Home, description: 'Overview & KPIs' },
  { name: 'Tasks', href: '/resolver/tasks', icon: ClipboardList, description: 'All assigned issues' },
  { name: 'Search Issues', href: '/resolver/search', icon: Search, description: 'Browse & find any issue' },
  { name: 'Data', href: '/resolver/data', icon: BarChart3, description: 'Analytics & trends' },
  { name: 'Internal Issues', href: '/resolver/internal', icon: AlertTriangle, description: 'Staff tickets' },
  { name: 'Employee Corner', href: '/resolver/employee', icon: Users, description: 'HR & SOPs' },
  { name: 'Surveys', href: '/resolver/surveys', icon: ClipboardCheck, description: 'Survey admin' },
  { name: 'Training', href: '/resolver/training', icon: GraduationCap, description: 'Training & SOPs' },
  { name: 'About My City', href: '/resolver/about', icon: Building, description: 'City reference' },
];

export function ResolverLayout({ children }: ResolverLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Top bar */}
      <div className="gov-topbar">
        <div className="container flex items-center justify-between">
          <span className="font-medium">{CITY.portalStaffTitle}</span>
          <span className="hidden sm:inline text-white/70">{CITY.authorityName}</span>
        </div>
      </div>

      {/* Accent bar */}
      <div className="gov-accent-bar" />

      {/* Header */}
      <header className="gov-header sticky top-0 z-40">
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            <NavLink to="/resolver" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <img src={CITY.emblemAsset} alt={CITY.emblemAlt} className="w-12 h-12 md:w-14 md:h-14 object-contain" />
              <div>
                <h1 className="text-lg md:text-xl font-bold leading-tight tracking-tight font-display text-foreground">
                  {CITY.portalStaffTitle}
                </h1>
                <p className="text-xs md:text-sm text-muted-foreground font-medium">{CITY.authorityName}</p>
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1" aria-label="Main navigation">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  end={item.href === '/resolver'}
                  className={({ isActive }) =>
                    cn('gov-nav-item', isActive && 'gov-nav-item-active')
                  }
                  aria-label={item.description}
                >
                  <item.icon className="w-5 h-5" aria-hidden="true" />
                  <span className="hidden 2xl:inline">{item.name}</span>
                </NavLink>
              ))}

              <NavLink
                to="/"
                className="gov-nav-item ml-2 border-l border-border pl-3"
                aria-label="Switch to Citizen Portal"
              >
                <ArrowRightLeft className="w-5 h-5" aria-hidden="true" />
                <span className="hidden 2xl:inline">Switch to Citizen</span>
              </NavLink>
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-muted relative" aria-label="Notifications">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-muted hidden md:flex" aria-label="Help">
                <HelpCircle className="w-5 h-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground hover:bg-muted" aria-label="Profile menu">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>My Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <button
                type="button"
                className="xl:hidden flex items-center justify-center w-11 h-11 rounded text-foreground hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="xl:hidden bg-primary text-primary-foreground border-t animate-slide-up" aria-label="Mobile navigation">
            <div className="container py-4 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  end={item.href === '/resolver'}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-4 py-3 rounded font-medium transition-all hover:bg-white/10',
                      isActive && 'bg-white/20 font-bold'
                    )
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="w-6 h-6" aria-hidden="true" />
                  <div>
                    <span className="block font-semibold">{item.name}</span>
                    <span className="text-sm opacity-80">{item.description}</span>
                  </div>
                </NavLink>
              ))}

              <NavLink
                to="/"
                className="flex items-center gap-3 px-4 py-3 rounded font-medium transition-all hover:bg-white/10 mt-4 border-t border-white/10 pt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ArrowRightLeft className="w-6 h-6" aria-hidden="true" />
                <div>
                  <span className="block font-semibold">Switch to Citizen</span>
                  <span className="text-sm opacity-80">Go to citizen portal</span>
                </div>
              </NavLink>
            </div>
          </nav>
        )}
      </header>

      {/* Main Content */}
      <main id="main-content" className="flex-1 container py-6 md:py-8" tabIndex={-1}>
        {children}
      </main>

      {/* Footer */}
      <footer className="gov-footer py-4">
        <div className="container text-center text-sm text-white/50">
          <p>{CITY.copyright(new Date().getFullYear())} — {CITY.portalStaffTitle}</p>
        </div>
      </footer>
    </div>
  );
}

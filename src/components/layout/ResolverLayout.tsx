import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, Home, ClipboardList, Search, BarChart3, AlertTriangle, Users, ClipboardCheck, Bell, HelpCircle, User, GraduationCap, Building, ArrowRightLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import kenyaCoatOfArms from '@/assets/kenya-coat-of-arms.png';
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
      {/* Skip to main content link for screen readers */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Top accent bar - slightly different color for staff portal */}
      <div className="h-1 bg-gradient-to-r from-accent via-primary to-accent" />

      {/* Header */}
      <header className="ncc-header sticky top-0 z-40">
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo / Title */}
            <NavLink to="/resolver" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <div className="relative">
                <img
                  src={kenyaCoatOfArms}
                  alt="Kenya Coat of Arms"
                  className="w-12 h-12 md:w-14 md:h-14 object-contain drop-shadow-lg"
                />
              </div>
              <div>
                <h1 className="text-lg md:text-xl font-bold leading-tight tracking-tight font-display">
                  Nairobi City County
                </h1>
                <p className="text-xs md:text-sm text-white/80 font-medium">
                  Resolver Dashboard
                </p>
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
                    cn(
                      'ncc-nav-item',
                      isActive && 'ncc-nav-item-active'
                    )
                  }
                  aria-label={item.description}
                >
                  <item.icon className="w-5 h-5" aria-hidden="true" />
                  <span className="hidden 2xl:inline">{item.name}</span>
                </NavLink>
              ))}
              
              {/* Switch to Citizen Portal */}
              <NavLink
                to="/"
                className="ncc-nav-item ml-2 border-l border-white/20 pl-3"
                aria-label="Switch to Citizen Portal"
              >
                <ArrowRightLeft className="w-5 h-5" aria-hidden="true" />
                <span className="hidden 2xl:inline">Switch to Citizen</span>
              </NavLink>
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-secondary rounded-full" />
              </Button>

              {/* Help */}
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 hidden md:flex"
                aria-label="Help"
              >
                <HelpCircle className="w-5 h-5" />
              </Button>

              {/* Profile */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10"
                    aria-label="Profile menu"
                  >
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>My Profile</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive">Sign Out</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Button */}
              <button
                type="button"
                className="xl:hidden flex items-center justify-center w-11 h-11 rounded-lg hover:bg-white/10 focus-visible:ring-2 focus-visible:ring-white transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav
            id="mobile-menu"
            className="xl:hidden bg-primary/95 backdrop-blur-sm border-t border-white/10 animate-slide-up"
            aria-label="Mobile navigation"
          >
            <div className="container py-4 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  end={item.href === '/resolver'}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all',
                      'hover:bg-white/10',
                      isActive && 'bg-secondary text-secondary-foreground'
                    )
                  }
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label={item.description}
                >
                  <item.icon className="w-6 h-6" aria-hidden="true" />
                  <div>
                    <span className="block font-semibold">{item.name}</span>
                    <span className="text-sm opacity-80">{item.description}</span>
                  </div>
                </NavLink>
              ))}
              
              {/* Switch to Citizen Portal - Mobile */}
              <NavLink
                to="/"
                className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all hover:bg-white/10 mt-4 border-t border-white/10 pt-4"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Switch to Citizen Portal"
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

      {/* Simplified Footer for Staff Portal */}
      <footer className="bg-muted border-t border-border py-4">
        <div className="container text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Nairobi City County — Resolver Portal</p>
        </div>
      </footer>
    </div>
  );
}

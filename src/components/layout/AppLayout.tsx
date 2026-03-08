import React from 'react';
import { NavLink } from 'react-router-dom';
import { MapPin, Menu, X, Home, Ticket, Phone, Mail, Globe, ClipboardList, FileText, BarChart3, GraduationCap, Building, ArrowRightLeft, Users, Search, Accessibility, Languages, User, ChevronDown, Bell, ScrollText } from 'lucide-react';
import { NotificationsPanel, getUnreadNotificationCount } from '@/components/notifications/NotificationsPanel';
import { loadUserPreferences } from '@/components/preferences/UserPreferencesModal';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CITY } from '@/config/city';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

interface AppLayoutProps {
  children: React.ReactNode;
}

const citizenNav = [
  { name: 'Home', href: '/', icon: Home, description: 'Discover what is happening' },
  { name: 'About My City', href: '/about-my-city', icon: Building, description: 'How your city works' },
  { name: 'Share Your Voice', href: '/report', icon: MapPin, description: 'Complaints, feedback & appreciation' },
  { name: 'Active Surveys', href: '/surveys', icon: ClipboardList, description: 'Shape city decisions' },
  { name: 'Policy Feedback', href: '/policy', icon: FileText, description: 'Improve city policies' },
  { name: 'My Proposals', href: '/my-proposals', icon: ScrollText, description: 'Needs, wants & ideas' },
  { name: 'My Tickets', href: '/my-tickets', icon: Ticket, description: 'Track issue progress' },
  { name: 'Data', href: '/data', icon: BarChart3, description: 'Insights on city performance' },
  { name: 'Training & Help', href: '/training', icon: GraduationCap, description: 'How the city works' },
];

const portalLinks = [
  { name: 'Resolver Dashboard', href: '/resolver', icon: ArrowRightLeft, description: 'Go to staff portal' },
  { name: 'Elected Representative', href: '/elected', icon: Users, description: 'Go to elected rep view' },
];

export function AppLayout({ children }: AppLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* ── Accessibility / Utility Bar ── */}
      <div className="mygov-utility-bar">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={CITY.stateEmblemAsset} alt={CITY.stateEmblemAlt} className="w-6 h-6 object-contain" />
            <span className="font-semibold text-xs sm:text-sm tracking-wide uppercase">
              {CITY.authorityName}
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-background focus:text-foreground focus:p-2">
              Skip to main content
            </a>
            <button className="mygov-utility-btn" aria-label="Change language" title="Language">
              <Languages className="w-4 h-4" />
              <span className="hidden sm:inline text-xs">English</span>
            </button>
            <button className="mygov-utility-btn" aria-label="Accessibility options" title="Accessibility">
              <Accessibility className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Gradient accent bar ── */}
      <div className="mygov-accent-bar" />

      {/* ── Main Header ── */}
      <header className="mygov-header sticky top-0 z-[1100] shadow-sm" style={{ backgroundColor: 'hsl(var(--background, 0 0% 100%))', opacity: 1 }}>
        <div className="container">
          {/* Top row: emblem + name + search + profile */}
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            <NavLink to="/" className="flex items-center gap-2 md:gap-3 hover:opacity-90 transition-opacity min-w-0 flex-1 mr-2">
              <img
                src={CITY.stateEmblemAsset}
                alt={CITY.stateEmblemAlt}
                className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 object-contain flex-shrink-0"
              />
              <img
                src={CITY.emblemAsset}
                alt={CITY.emblemAlt}
                className="w-9 h-9 sm:w-11 sm:h-11 md:w-12 md:h-12 object-contain flex-shrink-0"
              />
              <div className="min-w-0 overflow-hidden">
                <p className="text-sm sm:text-base md:text-lg font-bold leading-tight tracking-tight text-foreground truncate">
                  Greater Bengaluru Authority
                </p>
                <p className="text-[10px] sm:text-[11px] md:text-xs text-muted-foreground font-medium truncate">
                  {CITY.portalCitizenTitle}
                </p>
                <p className="hidden sm:block text-[10px] md:text-[11px] text-muted-foreground/80 font-medium leading-tight truncate">
                  {CITY.portalCitizenTitleKn}
                </p>
              </div>
            </NavLink>
            <div className="flex items-center gap-1">
              {/* Notifications Bell */}
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="relative flex items-center justify-center w-11 h-11 rounded text-foreground hover:bg-muted transition-colors"
                    aria-label="Notifications"
                    title="Notifications"
                  >
                    <Bell className="w-5 h-5" />
                    {(() => {
                      const unreadCount = getUnreadNotificationCount();
                      return unreadCount > 0 ? (
                        <span className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] rounded-full bg-destructive text-destructive-foreground text-[10px] font-bold px-1">
                          {unreadCount}
                        </span>
                      ) : null;
                    })()}
                  </button>
                </PopoverTrigger>
                <PopoverContent align="end" className="w-[380px] max-h-[70vh] overflow-y-auto p-0 bg-background border border-border shadow-lg" sideOffset={8}>
                  <NotificationsPanel className="p-4" />
                </PopoverContent>
              </Popover>

              {/* Mobile Menu Button */}
              <button
                type="button"
                className="lg:hidden flex items-center justify-center w-11 h-11 rounded text-foreground hover:bg-muted transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-menu"
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* ── Desktop Navigation Row (MyGov style: text + chevrons) ── */}
        <nav className="hidden lg:block border-t border-border/50" aria-label="Main navigation">
          <div className="container">
            <div className="flex items-center justify-between">
              <div className="mygov-nav-row">
                {citizenNav.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    end={item.href === '/'}
                    className={({ isActive }) =>
                      cn('mygov-nav-text-item', isActive && 'mygov-nav-text-item--active')
                    }
                    aria-label={item.description}
                  >
                    {item.name}
                    <ChevronDown className="w-3.5 h-3.5 opacity-40" aria-hidden="true" />
                  </NavLink>
                ))}
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Navigation — Sheet/Drawer */}
      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent
          side="right"
          className="w-[85vw] max-w-sm p-0 [&>button]:hidden flex flex-col"
          style={{ backgroundColor: '#FFFFFF', zIndex: 9999 }}
        >
          <SheetHeader className="px-5 pt-4 pb-3 border-b border-border">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-sm font-bold text-neutral-900">Menu</SheetTitle>
              <SheetClose asChild>
                <button
                  type="button"
                  className="flex items-center justify-center w-10 h-10 rounded hover:bg-neutral-100 transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5 text-neutral-700" />
                </button>
              </SheetClose>
            </div>
          </SheetHeader>

          <nav className="py-2 px-5 space-y-1 overflow-y-auto flex-1" aria-label="Mobile navigation">
            {citizenNav.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                end={item.href === '/'}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-3 px-3 py-3 rounded-lg transition-all',
                    isActive
                      ? 'bg-primary/10 text-primary font-bold'
                      : 'text-neutral-900 hover:bg-neutral-100'
                  )
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                <div className="min-w-0">
                  <span className="block text-sm font-semibold">{item.name}</span>
                  <span className="block text-xs text-neutral-500">{item.description}</span>
                </div>
              </NavLink>
            ))}

            <div className="border-t border-neutral-200 my-3" />

            {portalLinks.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-neutral-900 hover:bg-neutral-100 transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <span className="block text-sm font-semibold">{item.name}</span>
                  <span className="block text-xs text-neutral-500">{item.description}</span>
                </div>
              </NavLink>
            ))}
          </nav>
        </SheetContent>
      </Sheet>

      {/* Main Content */}
      <main id="main-content" className="flex-1 container py-6 md:py-8" tabIndex={-1}>
        {children}
      </main>

      {/* Footer */}
      <footer className="gov-footer">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <img src={CITY.emblemAsset} alt={CITY.emblemAlt} className="w-10 h-10 object-contain brightness-200" />
                <div>
                  <p className="font-bold font-display">{CITY.authorityName}</p>
                  <p className="text-sm opacity-80">{CITY.portalCitizenTitle}</p>
                  <p className="text-xs opacity-70">{CITY.portalCitizenTitleKn}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-sm uppercase tracking-wider opacity-80">Quick Links</h3>
              <ul className="space-y-1.5 text-sm">
                {citizenNav.slice(0, 5).map((item) => (
                  <li key={item.name}>
                    <NavLink to={item.href} className="opacity-70 hover:opacity-100 transition-opacity inline-flex items-center gap-2">
                      <item.icon className="w-3.5 h-3.5" />
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-sm uppercase tracking-wider opacity-80">Contact</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 opacity-70">
                  <Phone className="w-3.5 h-3.5" />
                  <span>{CITY.helpline}</span>
                </li>
                <li className="flex items-center gap-2 opacity-70">
                  <Mail className="w-3.5 h-3.5" />
                  <span>{CITY.email}</span>
                </li>
                <li className="flex items-center gap-2 opacity-70">
                  <Globe className="w-3.5 h-3.5" />
                  <a href={CITY.website} target="_blank" rel="noopener noreferrer" className="hover:opacity-100">
                    {CITY.website}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 border-t border-white/10 text-center">
            <p className="text-xs opacity-50">{CITY.copyright(new Date().getFullYear())}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

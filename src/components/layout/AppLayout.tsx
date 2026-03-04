import React from 'react';
import ReactDOM from 'react-dom';
import { NavLink } from 'react-router-dom';
import { MapPin, Menu, X, Home, Ticket, Phone, Mail, Globe, ClipboardList, FileText, BarChart3, GraduationCap, Building, ArrowRightLeft, Users, Search, Accessibility, Languages, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { CITY } from '@/config/city';

interface AppLayoutProps {
  children: React.ReactNode;
}

const navigation = [
  { name: 'Home', href: '/', icon: Home, description: 'Discover what is happening' },
  { name: 'About My City', href: '/about-my-city', icon: Building, description: 'City info, events & FAQs' },
  { name: 'Report Issue', href: '/report', icon: MapPin, description: 'Report an issue' },
  { name: 'Active Surveys', href: '/surveys', icon: ClipboardList, description: 'Participate in surveys' },
  { name: 'Policy Feedback', href: '/policy', icon: FileText, description: 'Share views on policies' },
  { name: 'My Tickets', href: '/my-tickets', icon: Ticket, description: 'Track your reports' },
  { name: 'Data', href: '/data', icon: BarChart3, description: 'Service analytics' },
  { name: 'Training & Help', href: '/training', icon: GraduationCap, description: 'Learn how to use the portal' },
];

export function AppLayout({ children }: AppLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* ── Accessibility / Utility Bar (MyGov style) ── */}
      <div className="mygov-utility-bar">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Indian flag placeholder */}
            <span className="mygov-flag" aria-label="Indian flag">🇮🇳</span>
            <span className="font-semibold text-xs sm:text-sm tracking-wide uppercase">
              {CITY.authorityName}
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <a href="#main-content" className="mygov-utility-link hidden sm:inline-flex">
              Skip to main content
            </a>
            <button
              className="mygov-utility-btn"
              aria-label="Change language"
              title="Language"
            >
              <Languages className="w-4 h-4" />
              <span className="hidden sm:inline text-xs">English</span>
            </button>
            <button
              className="mygov-utility-btn"
              aria-label="Accessibility options"
              title="Accessibility"
            >
              <Accessibility className="w-4 h-4" />
            </button>
            <button
              className="mygov-utility-btn"
              aria-label="Sign in"
              title="Sign in"
            >
              <User className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Gradient accent bar (saffron → magenta, MyGov style) ── */}
      <div className="mygov-accent-bar" />

      {/* ── Main Header ── */}
      <header className="mygov-header sticky top-0 z-50">
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-[72px]">
            {/* Logo + Name */}
            <NavLink to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity flex-shrink-0">
              <img
                src={CITY.emblemAsset}
                alt={CITY.emblemAlt}
                className="w-11 h-11 md:w-12 md:h-12 object-contain"
              />
              <div className="min-w-0">
                <p className="text-base md:text-lg font-bold leading-tight tracking-tight text-foreground truncate">
                  {CITY.authorityName}
                </p>
                <p className="text-[11px] md:text-xs text-muted-foreground font-medium">
                  {CITY.portalCitizenTitle}
                </p>
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  end={item.href === '/'}
                  className={({ isActive }) =>
                    cn('mygov-nav-item', isActive && 'mygov-nav-item--active')
                  }
                  aria-label={item.description}
                >
                  <item.icon className="w-4 h-4" aria-hidden="true" />
                  <span className="hidden xl:inline">{item.name}</span>
                </NavLink>
              ))}

              <div className="w-px h-6 bg-border mx-1.5" aria-hidden="true" />

              <NavLink
                to="/resolver"
                className={({ isActive }) =>
                  cn('mygov-nav-item', isActive && 'mygov-nav-item--active')
                }
                aria-label="Switch to Resolver Dashboard"
              >
                <ArrowRightLeft className="w-4 h-4" aria-hidden="true" />
                <span className="hidden xl:inline">Resolver</span>
              </NavLink>

              <NavLink
                to="/elected"
                className={({ isActive }) =>
                  cn('mygov-nav-item', isActive && 'mygov-nav-item--active')
                }
                aria-label="Elected Representative View"
              >
                <Users className="w-4 h-4" aria-hidden="true" />
                <span className="hidden xl:inline">Elected Rep</span>
              </NavLink>
            </nav>

            {/* Desktop: Search icon */}
            <button className="hidden lg:flex items-center justify-center w-10 h-10 rounded-full hover:bg-muted transition-colors text-muted-foreground" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>

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
      </header>

      {/* Mobile Navigation */}
      {mobileMenuOpen && ReactDOM.createPortal(
        <>
          <div
            className="fixed inset-0 bg-black/60 z-[9998]"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <nav
            id="mobile-menu"
            className="fixed top-0 right-0 bottom-0 z-[9999] w-[85vw] max-w-sm bg-background shadow-2xl overflow-y-auto"
            aria-label="Mobile navigation"
          >
            <div className="py-4 px-5 space-y-1">
              {/* Close header */}
              <div className="flex items-center justify-between mb-5 pb-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <img src={CITY.emblemAsset} alt={CITY.emblemAlt} className="w-8 h-8 object-contain" />
                  <span className="font-bold text-sm text-foreground">Menu</span>
                </div>
                <button
                  type="button"
                  className="flex items-center justify-center w-10 h-10 rounded hover:bg-muted transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  end={item.href === '/'}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-3 py-3 rounded-lg text-foreground transition-all',
                      isActive
                        ? 'bg-primary/10 text-primary font-bold'
                        : 'hover:bg-muted'
                    )
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                  <div className="min-w-0">
                    <span className="block text-sm font-semibold">{item.name}</span>
                    <span className="block text-xs text-muted-foreground">{item.description}</span>
                  </div>
                </NavLink>
              ))}

              <div className="border-t border-border my-3" />

              <NavLink
                to="/resolver"
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-foreground hover:bg-muted transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ArrowRightLeft className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <span className="block text-sm font-semibold">Switch to Resolver</span>
                  <span className="block text-xs text-muted-foreground">Go to staff portal</span>
                </div>
              </NavLink>

              <NavLink
                to="/elected"
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-foreground hover:bg-muted transition-all"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Users className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                <div>
                  <span className="block text-sm font-semibold">Elected Representative</span>
                  <span className="block text-xs text-muted-foreground">Go to elected rep view</span>
                </div>
              </NavLink>
            </div>
          </nav>
        </>,
        document.body
      )}

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
                  <p className="text-xs opacity-70">{CITY.portalCitizenTitle}</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold text-sm uppercase tracking-wider opacity-80">Quick Links</h3>
              <ul className="space-y-1.5 text-sm">
                {navigation.slice(0, 5).map((item) => (
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

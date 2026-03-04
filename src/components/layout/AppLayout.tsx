import React from 'react';
import { NavLink } from 'react-router-dom';
import { MapPin, Menu, X, Home, Ticket, Phone, Mail, Globe, ClipboardList, FileText, BarChart3, GraduationCap, Building, ArrowRightLeft, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { brand } from '@/lib/brandConfig';
import kenyaCoatOfArms from '@/assets/kenya-coat-of-arms.png';

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
      {/* Skip to main content */}
      <a href="#main-content" className="skip-link">Skip to main content</a>

      {/* Top bar */}
      <div className="gov-topbar">
        <div className="container flex items-center justify-between">
          <span className="font-medium">{brand.name}</span>
          <span className="hidden sm:inline text-white/70">{brand.tagline}</span>
        </div>
      </div>

      {/* Accent bar */}
      <div className="gov-accent-bar" />

      {/* Header */}
      <header className="gov-header sticky top-0 z-40">
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <NavLink to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <img
                src={kenyaCoatOfArms}
                alt={brand.emblemAlt}
                className="w-12 h-12 md:w-14 md:h-14 object-contain"
              />
              <div>
                <h1 className="text-lg md:text-xl font-bold leading-tight tracking-tight font-display text-foreground">
                  {brand.name}
                </h1>
                <p className="text-xs md:text-sm text-muted-foreground font-medium">
                  {brand.tagline}
                </p>
              </div>
            </NavLink>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center gap-1" aria-label="Main navigation">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    cn('gov-nav-item', isActive && 'gov-nav-item-active')
                  }
                  aria-label={item.description}
                >
                  <item.icon className="w-5 h-5" aria-hidden="true" />
                  <span className="hidden 2xl:inline">{item.name}</span>
                </NavLink>
              ))}

              {/* Switch to Resolver Portal */}
              <NavLink
                to="/resolver"
                className="gov-nav-item ml-2 border-l border-border pl-3"
                aria-label="Switch to Resolver Dashboard"
              >
                <ArrowRightLeft className="w-5 h-5" aria-hidden="true" />
                <span className="hidden 2xl:inline">Switch to Resolver</span>
              </NavLink>

              {/* Switch to Elected Representative View */}
              <NavLink
                to="/elected"
                className="gov-nav-item"
                aria-label="Switch to Elected Representative View"
              >
                <Users className="w-5 h-5" aria-hidden="true" />
                <span className="hidden 2xl:inline">Elected Rep</span>
              </NavLink>
            </nav>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="xl:hidden flex items-center justify-center w-11 h-11 rounded-lg text-foreground hover:bg-muted transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav id="mobile-menu" className="xl:hidden bg-primary text-primary-foreground border-t animate-slide-up" aria-label="Mobile navigation">
            <div className="container py-4 space-y-1">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all hover:bg-white/10',
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
                to="/resolver"
                className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all hover:bg-white/10 mt-4 border-t border-white/10 pt-4"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ArrowRightLeft className="w-6 h-6" aria-hidden="true" />
                <div>
                  <span className="block font-semibold">Switch to Resolver</span>
                  <span className="text-sm opacity-80">Go to staff portal</span>
                </div>
              </NavLink>

              <NavLink
                to="/elected"
                className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all hover:bg-white/10"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Users className="w-6 h-6" aria-hidden="true" />
                <div>
                  <span className="block font-semibold">Elected Representative</span>
                  <span className="text-sm opacity-80">Go to elected rep view</span>
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
      <footer className="gov-footer">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img src={kenyaCoatOfArms} alt={brand.emblemAlt} className="w-12 h-12 object-contain brightness-200" />
                <div>
                  <p className="font-bold text-lg font-display">{brand.name}</p>
                  <p className="text-sm opacity-80">{brand.tagline}</p>
                </div>
              </div>
              <p className="text-sm opacity-75 max-w-xs">{brand.footerTagline}</p>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg font-display">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                {navigation.slice(0, 5).map((item) => (
                  <li key={item.name}>
                    <NavLink to={item.href} className="opacity-80 hover:opacity-100 hover:text-secondary transition-all inline-flex items-center gap-2 min-h-0">
                      <item.icon className="w-4 h-4" />
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="font-bold text-lg font-display">Contact Us</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3 opacity-80">
                  <Phone className="w-4 h-4 text-secondary" />
                  <span>{brand.phone}</span>
                </li>
                <li className="flex items-center gap-3 opacity-80">
                  <Mail className="w-4 h-4 text-secondary" />
                  <span>{brand.email}</span>
                </li>
                <li className="flex items-center gap-3 opacity-80">
                  <Globe className="w-4 h-4 text-secondary" />
                  <a href={brand.website} target="_blank" rel="noopener noreferrer" className="hover:text-secondary min-h-0">
                    {brand.website}
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 text-center">
            <p className="text-sm opacity-60">{brand.copyright(new Date().getFullYear())}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

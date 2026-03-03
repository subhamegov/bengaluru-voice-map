import React from 'react';
import { NavLink } from 'react-router-dom';
import { MapPin, Menu, X, Home, Ticket, Phone, Mail, Globe, ClipboardList, FileText, BarChart3, GraduationCap, Building, ArrowRightLeft, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
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
      {/* Skip to main content link for screen readers */}
      <a
        href="#main-content"
        className="skip-link"
      >
        Skip to main content
      </a>

      {/* Top accent bar */}
      <div className="ncc-accent-bar" />

      {/* Header */}
      <header className="ncc-header sticky top-0 z-40">
        <div className="container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo / Title - Official Government Style */}
            <NavLink to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
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
                  Citizen Service Portal
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
              
              {/* Switch to Resolver Portal */}
              <NavLink
                to="/resolver"
                className="ncc-nav-item ml-2 border-l border-white/20 pl-3"
                aria-label="Switch to Resolver Dashboard"
              >
                <ArrowRightLeft className="w-5 h-5" aria-hidden="true" />
                <span className="hidden 2xl:inline">Switch to Resolver</span>
              </NavLink>
              
              {/* Switch to Elected Representative View */}
              <NavLink
                to="/elected"
                className="ncc-nav-item"
                aria-label="Switch to Elected Representative View"
              >
                <Users className="w-5 h-5" aria-hidden="true" />
                <span className="hidden 2xl:inline">Elected Rep</span>
              </NavLink>
            </nav>

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
              
              {/* Switch to Resolver Portal - Mobile */}
              <NavLink
                to="/resolver"
                className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all hover:bg-white/10 mt-4 border-t border-white/10 pt-4"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Switch to Resolver Dashboard"
              >
                <ArrowRightLeft className="w-6 h-6" aria-hidden="true" />
                <div>
                  <span className="block font-semibold">Switch to Resolver</span>
                  <span className="text-sm opacity-80">Go to staff portal</span>
                </div>
              </NavLink>
              
              {/* Switch to Elected Representative View - Mobile */}
              <NavLink
                to="/elected"
                className="flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all hover:bg-white/10"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Switch to Elected Representative View"
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
      <footer className="ncc-footer">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand Column */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img 
                  src={kenyaCoatOfArms} 
                  alt="Kenya Coat of Arms" 
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <p className="font-bold text-lg font-display">
                    Nairobi City County
                  </p>
                  <p className="text-sm opacity-80">
                    Citizen Service Portal
                  </p>
                </div>
              </div>
              <p className="text-sm opacity-75 max-w-xs">
                Report issues, track progress, and stay informed about what's happening in your ward.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg font-display">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <NavLink 
                      to={item.href}
                      className="opacity-80 hover:opacity-100 hover:text-secondary transition-all inline-flex items-center gap-2"
                    >
                      <item.icon className="w-4 h-4" />
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="font-bold text-lg font-display">Contact Us</h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3 opacity-80">
                  <Phone className="w-4 h-4 text-secondary" />
                  <span>+254 (0)20 222 1111</span>
                </li>
                <li className="flex items-center gap-3 opacity-80">
                  <Mail className="w-4 h-4 text-secondary" />
                  <span>info@nairobi.go.ke</span>
                </li>
                <li className="flex items-center gap-3 opacity-80">
                  <Globe className="w-4 h-4 text-secondary" />
                  <a href="https://nairobi.go.ke" target="_blank" rel="noopener noreferrer" className="hover:text-secondary">
                    nairobi.go.ke
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="pt-8 border-t border-white/10 text-center">
            <p className="text-sm opacity-60">
              © {new Date().getFullYear()} Nairobi City County. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

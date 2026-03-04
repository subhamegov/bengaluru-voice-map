import React, { useState } from 'react';
import { AppLayout } from '@/components/layout/AppLayout';
import { UX4GPageHeader } from '@/components/layout/UX4GPageHeader';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { 
  Users, Building2, Clock, Droplets, Calendar, MapPin, ExternalLink, 
  Share2, CalendarPlus, AlertTriangle, Zap, Trash2, Search, Phone,
  MessageCircle, Volume2, Mic, Info, ChevronRight, HelpCircle,
  Landmark, Globe, Smartphone, Link2, FileText, ScrollText,
  Shield, Map, Leaf, Eye, Briefcase, ArrowRight, Mail
} from 'lucide-react';
import { EVENT_TYPE_ICONS, StatusDot } from '@/lib/iconMaps';
import { BENGALURU_ZONES } from '@/lib/bengaluruAdminData';

// GBA Officers data from bbmp.gov.in
const gbaOfficers = [
  {
    name: 'Sri Maheshwar Rao M, I.A.S',
    designation: 'Chief Commissioner - GBA and Administrator - All Bengaluru City Corporations',
    email: 'comm@bbmp.gov.in',
    photo: 'https://bbmp.gov.in/maheshwar.png',
  },
  {
    name: 'Sri Munish Moudgil, I.A.S',
    designation: 'Special Commissioner (Revenue & IT)',
    photo: 'https://bbmp.gov.in/Munish.jpg',
  },
  {
    name: 'Sri Suralkar Vikas Kishor, I.A.S',
    designation: 'Special Commissioner (Education & Welfare)',
    photo: 'https://bbmp.gov.in/SuralKar.jpg',
  },
  {
    name: 'Dr. Harish Kumar K, I.A.S',
    designation: 'Special Commissioner (Admin, Finance, Disaster Management & CFO)',
    photo: 'https://bbmp.gov.in/Harish.jpg',
  },
  {
    name: 'Sri Ramachandran R, I.A.S',
    designation: 'Special Commissioner (FECCM, Health, Election & PR)',
    photo: 'https://bbmp.gov.in/Ramachandra.jpg',
  },
];

// City Corporations
const cityCorporations = [
  { name: 'Bengaluru Central City Corporation', icon: Building2 },
  { name: 'Bengaluru North City Corporation', icon: Building2 },
  { name: 'Bengaluru East City Corporation', icon: Building2 },
  { name: 'Bengaluru South City Corporation', icon: Building2 },
  { name: 'Bengaluru West City Corporation', icon: Building2 },
];

// e-Services from bbmp.gov.in
const eServices = [
  { name: 'Ward Delimitation', icon: Map, url: 'https://bbmp.gov.in', desc: 'Check your ward boundaries' },
  { name: 'e-Aasthi', icon: Landmark, url: 'https://bbmp.gov.in', desc: 'Property registration' },
  { name: 'B to A Khata / Single Plot Khata', icon: FileText, url: 'https://bbmp.gov.in', desc: 'Khata conversion' },
  { name: 'Property Tax', icon: Landmark, url: 'https://bbmptax.karnataka.gov.in', desc: 'Pay property tax online' },
  { name: 'Trade License', icon: Briefcase, url: 'https://bbmp.gov.in/trade-licence', desc: 'Apply for trade licence' },
  { name: 'Trade License Renewal', icon: Briefcase, url: 'https://bbmp.gov.in', desc: 'Renew your trade licence' },
  { name: 'Building Permission', icon: Building2, url: 'https://bbmp.gov.in', desc: 'Apply for building plan approval' },
  { name: 'Birth & Death Certificate', icon: ScrollText, url: 'https://bbmp.gov.in', desc: 'Apply for certificates' },
  { name: 'Electrical Crematorium', icon: Zap, url: 'https://bbmp.gov.in', desc: 'Book services' },
  { name: 'Telecom Tower Infrastructure', icon: Building2, url: 'https://bbmp.gov.in', desc: 'Tower permissions' },
  { name: 'MARCS 3.0', icon: Globe, url: 'https://bbmp.gov.in', desc: 'Municipal accounting & reporting' },
  { name: 'OFC', icon: Globe, url: 'https://bbmp.gov.in', desc: 'Optical fibre cable permissions' },
  { name: 'Road History 2.0', icon: Map, url: 'https://bbmp.gov.in', desc: 'Road maintenance records' },
  { name: 'SAHAAYA 2.0', icon: MessageCircle, url: 'https://bbmp.gov.in', desc: 'Public grievance redressal' },
  { name: 'Hasiru Rakshaka', icon: Leaf, url: 'https://bbmp.gov.in', desc: 'Green guardian programme' },
  { name: 'Lakes Monitoring System', icon: Droplets, url: 'https://bbmp.gov.in', desc: 'Lake health monitoring' },
  { name: 'Parks Monitoring System', icon: Leaf, url: 'https://bbmp.gov.in', desc: 'Parks maintenance monitoring' },
];

// Quick Links from bbmp.gov.in
const quickLinks = [
  { name: 'Notifications, Circulars & Orders', url: 'https://bbmp.gov.in', icon: FileText },
  { name: 'Tenders', url: 'https://bbmp.gov.in', icon: ScrollText },
  { name: 'Resolutions', url: 'https://bbmp.gov.in', icon: FileText },
  { name: 'RTI', url: 'https://bbmp.gov.in', icon: Eye },
  { name: 'CSR & Philanthropy Opportunities', url: 'https://bbmp.gov.in', icon: Users },
  { name: 'Land Use Maps', url: 'https://bbmp.gov.in', icon: Map },
  { name: 'Bengaluru Climate Action Cell', url: 'https://bbmp.gov.in', icon: Leaf },
  { name: 'GBA GIS Viewer', url: 'https://bbmp.gov.in', icon: Globe },
];

// Mobile App Links from bbmp.gov.in
const mobileApps = [
  { name: 'Property GPS', url: 'https://play.google.com/store/apps/details?id=com.bbmp.propertygps', icon: MapPin },
  { name: 'Namma Bengaluru [Sahaaya 2.0]', url: 'https://play.google.com/store/apps/details?id=com.nammabengaluruNew.org', icon: MessageCircle },
  { name: 'Fix Pothole', url: 'https://play.google.com/store/apps/details?id=com.indigo.bbmp.fixpothole', icon: AlertTriangle },
  { name: 'Dishaank', url: 'https://play.google.com/store/apps/details?id=com.dishaank', icon: Map },
];

// Important Links from bbmp.gov.in
const importantLinks = [
  { name: 'Guarantee Schemes', url: 'https://sevasindhugs.karnataka.gov.in/', icon: Shield },
  { name: 'Brand Bengaluru', url: 'https://brandbengaluru.karnataka.gov.in/', icon: Globe },
  { name: 'Janaspandana iPGRS', url: 'https://ipgrs.karnataka.gov.in/', icon: MessageCircle },
  { name: 'Janasevaka', url: 'https://www.janasevaka.karnataka.gov.in/', icon: Users },
  { name: 'Seva Sindhu', url: 'https://sevasindhuservices.karnataka.gov.in/', icon: Globe },
];

// Latest Updates
const latestUpdates = [
  {
    type: 'event',
    title: 'Know your nearby Polio Booth, UPHC and Namma Clinic for Pulse Polio Campaign',
    url: 'https://gba.karnataka.gov.in/polio/',
  },
  {
    type: 'news',
    title: 'GBA Draft Electoral List 2026',
    url: 'https://gba.karnataka.gov.in/electoral2026/',
  },
  {
    type: 'news',
    title: 'Global tender for GIS based Master Plan for Greater Bengaluru Local Planning Area',
    url: 'https://bbmp.gov.in/csr/TENDER%20DOCUMENT_TOWNPLANNING.pdf',
  },
  {
    type: 'news',
    title: 'Invitation for Applications – Urban Design Cell (Planner, Designer & Transport Expert)',
    url: 'https://bbmp.gov.in',
  },
  {
    type: 'news',
    title: 'Greater Bengaluru Authority (GBA) Launched – Check Your New City Corporation & Ward',
    url: 'https://gba.karnataka.gov.in/',
  },
];

// Mock city metrics data
const cityMetrics = {
  population: '1.3 crore',
  activeProjects: 198,
  subCounties: 8,
  avgResponseTime: '3.2 days',
  waterUptime: 92,
};

// Mock events data
const upcomingEvents = [
  {
    id: 1,
    title: 'Public Budget Hearing – FY 2025/26',
    date: '15 Dec 2024',
    time: '10:00 AM – 1:00 PM',
    venue: 'BBMP Head Office, Hudson Circle',
    type: 'budget',
  },
  {
    id: 2,
    title: 'Ward Development Committee Meeting',
    date: '18 Dec 2024',
    time: '2:00 PM – 4:00 PM',
    venue: 'Jayanagar Community Hall',
    type: 'meeting',
  },
  {
    id: 3,
    title: 'Environmental Clean-up Day',
    date: '21 Dec 2024',
    time: '7:00 AM – 12:00 PM',
    venue: 'Cubbon Park, MG Road',
    type: 'event',
  },
  {
    id: 4,
    title: 'Public Participation Forum – Health Services',
    date: '28 Dec 2024',
    time: '9:00 AM – 12:00 PM',
    venue: 'Bowring Hospital, Shivajinagar',
    type: 'forum',
  },
];

// Mock service updates data
const serviceUpdates = [
  {
    id: 1,
    category: 'Water Supply',
    status: 'partial',
    message: 'Temporary outage in Koramangala – restoration expected by 8 PM.',
    icon: Droplets,
    lastUpdated: '2 hours ago',
  },
  {
    id: 2,
    category: 'Electricity',
    status: 'partial',
    message: 'Scheduled transformer maintenance in Indiranagar, 3–5 PM today.',
    icon: Zap,
    lastUpdated: '4 hours ago',
  },
  {
    id: 3,
    category: 'Garbage Collection',
    status: 'outage',
    message: 'Collection delays in Mahadevapura Zone due to vehicle repairs.',
    icon: Trash2,
    lastUpdated: '1 hour ago',
  },
  {
    id: 4,
    category: 'Roads & Traffic',
    status: 'normal',
    message: 'All major roads operational. Minor works on Outer Ring Road.',
    icon: Building2,
    lastUpdated: '30 mins ago',
  },
];

// FAQ data
const faqData = [
  {
    question: 'How do I pay property tax?',
    answer: 'Property tax can be paid online at bbmptax.karnataka.gov.in, at BBMP zonal offices, or at designated bank branches. Use SAS (Self Assessment Scheme) for calculation.',
  },
  {
    question: 'How do I apply for a trade license?',
    answer: 'Trade licences can be applied for online at bbmp.gov.in/trade-licence. Create an account and follow the application process. Processing takes 3-5 working days.',
  },
  {
    question: 'Who collects garbage in my ward?',
    answer: 'Garbage collection is managed by BBMP SWM Division through auto-tippers and marshals. Contact your ward health officer or call helpline 1533.',
  },
  {
    question: 'How do I get a Khata certificate?',
    answer: 'Khata transfer and property documents are handled at the respective BBMP zonal office Revenue section. Use e-Aasthi portal for online applications.',
  },
  {
    question: 'How do I report a pothole?',
    answer: 'Report potholes through this portal, the Fix Pothole app on Google Play, or call the BBMP helpline 1533.',
  },
  {
    question: 'How do I get a birth/death certificate?',
    answer: 'Apply online through the Birth & Death Registration portal or visit your nearest BBMP zonal office with required documents.',
  },
];

const statusColors: Record<string, { bg: string; text: string; status: 'normal' | 'partial' | 'outage' }> = {
  normal: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', status: 'normal' },
  partial: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-400', status: 'partial' },
  outage: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', status: 'outage' },
};

export default function AboutMyCity() {
  const [selectedSubCounty, setSelectedSubCounty] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showPastEvents, setShowPastEvents] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-IN';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  const filteredFAQs = faqData.filter(
    faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedServices = showAllServices ? eServices : eServices.slice(0, 8);

  return (
    <AppLayout>
      <div className="space-y-8 md:space-y-12">
        <UX4GPageHeader
          icon={Building2}
          title="City at a Glance"
          description="Everything about Greater Bengaluru Authority — officers, services, corporations, and more."
          action={
            <Button
              variant="outline"
              size="sm"
              className="gap-2 h-9"
              onClick={() => speakText('City at a Glance. Everything about Greater Bengaluru Authority.')}
              aria-label="Read aloud"
            >
              <Volume2 className="w-4 h-4" />
              Read Aloud
            </Button>
          }
        />

        {/* ── Latest Updates Banner ── */}
        <section aria-labelledby="updates-banner">
          <h2 id="updates-banner" className="text-xl md:text-2xl font-bold font-display flex items-center gap-2 mb-4">
            <AlertTriangle className="w-6 h-6 text-primary" aria-hidden="true" />
            Latest Updates
          </h2>
          <div className="space-y-2">
            {latestUpdates.map((update, i) => (
              <a
                key={i}
                href={update.url}
                target="_blank"
                rel="noopener noreferrer"
                className="gov-card p-3 flex items-center gap-3 hover:shadow-md transition-shadow group cursor-pointer block"
              >
                <Badge variant="outline" className="text-xs shrink-0 capitalize">{update.type}</Badge>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors flex-1">{update.title}</span>
                <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" />
              </a>
            ))}
          </div>
        </section>

        {/* ── GBA Officers ── */}
        <section aria-labelledby="officers-heading">
          <h2 id="officers-heading" className="text-xl md:text-2xl font-bold font-display flex items-center gap-2 mb-4">
            <Users className="w-6 h-6 text-primary" aria-hidden="true" />
            GBA Officers
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {gbaOfficers.map((officer, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow text-center">
                <CardContent className="p-4 flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden bg-muted mb-3 border-2 border-border">
                    <img
                      src={officer.photo}
                      alt={officer.name}
                      className="w-full h-full object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  </div>
                  <p className="font-semibold text-sm text-foreground leading-tight">{officer.name}</p>
                  <p className="text-xs text-muted-foreground mt-1 leading-tight">{officer.designation}</p>
                  {officer.email && (
                    <a href={`mailto:${officer.email}`} className="text-xs text-primary mt-2 flex items-center gap-1">
                      <Mail className="w-3 h-3" /> {officer.email}
                    </a>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ── City Corporations ── */}
        <section aria-labelledby="corporations-heading">
          <h2 id="corporations-heading" className="text-xl md:text-2xl font-bold font-display flex items-center gap-2 mb-4">
            <Landmark className="w-6 h-6 text-primary" aria-hidden="true" />
            City Corporations
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {cityCorporations.map((corp, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-foreground leading-tight">{corp.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ── e-Services ── */}
        <section aria-labelledby="eservices-heading">
          <div className="flex items-center justify-between mb-4">
            <h2 id="eservices-heading" className="text-xl md:text-2xl font-bold font-display flex items-center gap-2">
              <Globe className="w-6 h-6 text-primary" aria-hidden="true" />
              e-Services
            </h2>
            <a href="https://bbmp.gov.in" target="_blank" rel="noopener noreferrer" className="text-sm text-primary hover:underline flex items-center gap-1">
              View all on bbmp.gov.in <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {displayedServices.map((service, i) => (
              <a
                key={i}
                href={service.url}
                target="_blank"
                rel="noopener noreferrer"
                className="gov-task-tile group"
              >
                <service.icon className="w-7 h-7 text-primary mb-2" />
                <span className="font-semibold text-sm text-foreground">{service.name}</span>
                <span className="text-xs text-muted-foreground mt-0.5 leading-tight">{service.desc}</span>
              </a>
            ))}
          </div>
          {eServices.length > 8 && (
            <div className="mt-3 text-center">
              <Button variant="outline" size="sm" onClick={() => setShowAllServices(!showAllServices)}>
                {showAllServices ? 'Show Less' : `Show All ${eServices.length} Services`}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </section>

        {/* ── Metrics ── */}
        <section className="space-y-4">
          <h2 className="text-xl md:text-2xl font-bold font-display flex items-center gap-2">
            <Building2 className="w-6 h-6 text-primary" aria-hidden="true" />
            City Overview
          </h2>
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Filter by zone:</label>
            <Select value={selectedSubCounty} onValueChange={setSelectedSubCounty}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Select zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Zones</SelectItem>
                {BENGALURU_ZONES.map((sc) => (
                  <SelectItem key={sc.name} value={sc.name}>{sc.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <Card>
              <CardContent className="p-4">
                <Users className="w-6 h-6 mb-2 text-primary" aria-hidden="true" />
                <p className="text-2xl md:text-3xl font-bold text-foreground">{cityMetrics.population}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Residents served</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <Building2 className="w-6 h-6 mb-2 text-primary" aria-hidden="true" />
                <p className="text-2xl md:text-3xl font-bold text-foreground">{cityMetrics.activeProjects}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Active projects</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <Clock className="w-6 h-6 mb-2 text-primary" aria-hidden="true" />
                <p className="text-2xl md:text-3xl font-bold text-foreground">{cityMetrics.avgResponseTime}</p>
                <p className="text-xs md:text-sm text-muted-foreground">Avg. service response</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <Droplets className="w-6 h-6 mb-2 text-primary" aria-hidden="true" />
                <p className="text-2xl md:text-3xl font-bold text-foreground">{cityMetrics.waterUptime}%</p>
                <p className="text-xs md:text-sm text-muted-foreground">Water supply operational</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ── Service Updates ── */}
        <section aria-labelledby="service-updates-heading">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <h2 id="service-updates-heading" className="text-xl md:text-2xl font-bold font-display flex items-center gap-2">
              <AlertTriangle className="w-6 h-6 text-primary" aria-hidden="true" />
              City Service Updates
            </h2>
            <Button variant="outline" size="sm">
              <Info className="w-4 h-4 mr-1" /> Subscribe to Alerts
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {serviceUpdates.map((update) => {
              const statusStyle = statusColors[update.status];
              const IconComponent = update.icon;
              return (
                <Card key={update.id} className={`${statusStyle.bg} border-0`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <IconComponent className={`w-5 h-5 ${statusStyle.text}`} aria-hidden="true" />
                        <span className="font-semibold text-sm">{update.category}</span>
                      </div>
                      <StatusDot status={statusStyle.status} />
                    </div>
                    <p className="text-sm text-foreground/80 mb-3">{update.message}</p>
                    <span className="text-xs text-muted-foreground">Updated {update.lastUpdated}</span>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          <div className="flex items-center justify-center gap-6 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><StatusDot status="normal" /> Normal</span>
            <span className="flex items-center gap-1"><StatusDot status="partial" /> Partial</span>
            <span className="flex items-center gap-1"><StatusDot status="outage" /> Outage</span>
          </div>
        </section>

        {/* ── Events ── */}
        <section aria-labelledby="events-heading">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <h2 id="events-heading" className="text-xl md:text-2xl font-bold font-display flex items-center gap-2">
              <Calendar className="w-6 h-6 text-primary" aria-hidden="true" />
              What's Happening
            </h2>
            <Button variant={showPastEvents ? 'default' : 'outline'} size="sm" onClick={() => setShowPastEvents(!showPastEvents)}>
              {showPastEvents ? 'Upcoming Only' : 'Show Past Events'}
            </Button>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 md:p-5">
                  <Badge variant="outline" className="mb-2 text-xs flex items-center gap-1 w-fit">
                    {(() => { const Icon = EVENT_TYPE_ICONS[event.type]; return Icon ? <Icon className="w-3.5 h-3.5" /> : null; })()}
                    {event.type}
                  </Badge>
                  <h3 className="font-semibold text-base md:text-lg mb-2">{event.title}</h3>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2"><Calendar className="w-4 h-4" />{event.date} • {event.time}</p>
                    <p className="flex items-center gap-2"><MapPin className="w-4 h-4" />{event.venue}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t">
                    <Button size="sm" variant="default" className="flex-1 md:flex-none">
                      <ExternalLink className="w-4 h-4 mr-1" /> View Agenda
                    </Button>
                    <Button size="sm" variant="ghost" aria-label="Add to calendar"><CalendarPlus className="w-4 h-4" /></Button>
                    <Button size="sm" variant="ghost" aria-label="Share"><Share2 className="w-4 h-4" /></Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* ── Quick Links ── */}
        <section aria-labelledby="quicklinks-heading">
          <h2 id="quicklinks-heading" className="text-xl md:text-2xl font-bold font-display flex items-center gap-2 mb-4">
            <Link2 className="w-6 h-6 text-primary" aria-hidden="true" />
            Quick Links
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {quickLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="gov-task-tile group"
              >
                <link.icon className="w-6 h-6 text-primary mb-1" />
                <span className="text-sm font-semibold text-foreground leading-tight">{link.name}</span>
              </a>
            ))}
          </div>
        </section>

        {/* ── Mobile App Links ── */}
        <section aria-labelledby="apps-heading">
          <h2 id="apps-heading" className="text-xl md:text-2xl font-bold font-display flex items-center gap-2 mb-4">
            <Smartphone className="w-6 h-6 text-primary" aria-hidden="true" />
            Mobile App Links
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mobileApps.map((app, i) => (
              <a
                key={i}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="gov-task-tile group"
              >
                <app.icon className="w-8 h-8 text-primary mb-2" />
                <span className="text-sm font-semibold text-foreground">{app.name}</span>
                <span className="text-xs text-muted-foreground mt-1">Download on Play Store</span>
              </a>
            ))}
          </div>
        </section>

        {/* ── Important Links ── */}
        <section aria-labelledby="important-heading">
          <h2 id="important-heading" className="text-xl md:text-2xl font-bold font-display flex items-center gap-2 mb-4">
            <Shield className="w-6 h-6 text-primary" aria-hidden="true" />
            Important Links
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {importantLinks.map((link, i) => (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="gov-task-tile group"
              >
                <link.icon className="w-7 h-7 text-primary mb-2" />
                <span className="text-sm font-semibold text-foreground">{link.name}</span>
              </a>
            ))}
          </div>
        </section>

        {/* ── FAQs ── */}
        <section aria-labelledby="faq-heading">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-primary" aria-hidden="true" />
                Need Help? Start Here.
              </CardTitle>
              <CardDescription>Search for answers or browse common questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Type a question, e.g., 'How do I pay property tax?'"
                  className="pl-10 pr-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search FAQs"
                />
                <Button size="sm" variant="ghost" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-2" aria-label="Voice search">
                  <Mic className="w-4 h-4" />
                </Button>
              </div>

              {!searchQuery && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-muted-foreground">Popular:</span>
                  {['property tax', 'trade license', 'garbage', 'pothole', 'khata'].map((term) => (
                    <Button key={term} variant="outline" size="sm" className="h-7 text-xs" onClick={() => setSearchQuery(term)}>
                      {term}
                    </Button>
                  ))}
                </div>
              )}

              <Accordion type="single" collapsible className="w-full">
                {filteredFAQs.map((faq, index) => (
                  <AccordionItem key={index} value={`faq-${index}`}>
                    <AccordionTrigger className="text-left hover:no-underline">
                      <span className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-primary shrink-0" aria-hidden="true" />
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-6 pr-2">
                        <p className="text-muted-foreground mb-3">{faq.answer}</p>
                        <Button size="sm" variant="ghost" onClick={() => speakText(`${faq.question}. ${faq.answer}`)} aria-label="Read aloud">
                          <Volume2 className="w-4 h-4 mr-1" /> Read Aloud
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>

              {filteredFAQs.length === 0 && searchQuery && (
                <div className="text-center py-8 text-muted-foreground">
                  <HelpCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No results found for "{searchQuery}"</p>
                  <p className="text-sm mt-1">Try a different search term or contact us directly</p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                <Button variant="default" className="flex-1" asChild>
                  <a href="tel:1533"><Phone className="w-4 h-4 mr-2" /> Call Helpline 1533</a>
                </Button>
                <Button variant="outline" className="flex-1">
                  <MessageCircle className="w-4 h-4 mr-2" /> Chat with Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </AppLayout>
  );
}

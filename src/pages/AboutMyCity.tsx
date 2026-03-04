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
  Banknote, Landmark, TreePine, CircleDot
} from 'lucide-react';
import { EVENT_TYPE_ICONS, StatusDot } from '@/lib/iconMaps';
import { BENGALURU_ZONES } from '@/lib/bengaluruAdminData';

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
    message: 'Collection delays in Mahadevapura Zone due to vehicle repairs. Expected resumption tomorrow.',
    icon: Trash2,
    lastUpdated: '1 hour ago',
  },
  {
    id: 4,
    category: 'Roads & Traffic',
    status: 'normal',
    message: 'All major roads operational. Minor works on Outer Ring Road near Silk Board.',
    icon: Building2,
    lastUpdated: '30 mins ago',
  },
];

// FAQ data
const faqData = [
  {
    question: 'Where do I pay parking fees?',
    answer: 'Property tax can be paid online at bbmptax.karnataka.gov.in, at BBMP zonal offices, or at designated bank branches. Use SAS (Self Assessment Scheme) for calculation.',
  },
  {
    question: 'How do I apply for a business permit?',
    answer: 'Trade licences can be applied for online at bbmp.gov.in/trade-licence. Create an account and follow the application process. Physical applications at BBMP zonal offices. Processing takes 3-5 working days.',
  },
  {
    question: 'Who collects garbage in my ward?',
    answer: 'Garbage collection is managed by BBMP SWM Division through auto-tippers and marshals. Contact your ward health officer or call BBMP helpline 080-22660000 for your collection schedule.',
  },
  {
    question: 'How can I attend county meetings?',
    answer: 'BBMP council meetings are open to public. Ward Sabha meetings are held quarterly. Check bbmp.gov.in for schedules. Follow @ABORBBMP on social media for updates.',
  },
  {
    question: 'How do I report a water leak or burst pipe?',
    answer: 'Report water leaks to BWSSB via their helpline 1916, or through this portal by selecting "Water" category. Emergency leaks should be called in directly to BWSSB control room.',
  },
  {
    question: 'Where can I get my land rates clearance certificate?',
    answer: 'Khata transfer and property documents are handled at the respective BBMP zonal office Revenue section. Ensure property tax is fully paid. Processing takes 15-30 working days.',
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

  // Text-to-speech function
  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-IN';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Filter FAQs based on search
  const filteredFAQs = faqData.filter(
    faq =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="space-y-8 md:space-y-12">
        <UX4GPageHeader
          icon={Building2}
          title="City at a Glance"
          description="Stay updated on city performance, services, and opportunities to participate in building a better city."
          action={
            <Button
              variant="outline"
              size="sm"
              className="gap-2 h-9"
              onClick={() => speakText('Bengaluru at a Glance. Stay updated on city performance, services, and opportunities to participate.')}
              aria-label="Read aloud"
            >
              <Volume2 className="w-4 h-4" />
              Read Aloud
            </Button>
          }
        />

        {/* Sub-county filter & Metrics */}
        <section className="space-y-4">
          <div>
            <label className="text-sm text-muted-foreground mb-2 block">Show my area:</label>
            <Select value={selectedSubCounty} onValueChange={setSelectedSubCounty}>
              <SelectTrigger className="w-full md:w-64">
                <SelectValue placeholder="Select sub-county" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sub-Counties</SelectItem>
                {BENGALURU_ZONES.map((sc) => (
                  <SelectItem key={sc.name} value={sc.name}>{sc.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Metric Cards */}
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
                <p className="text-xs md:text-sm text-muted-foreground">Active projects across {cityMetrics.subCounties} zones</p>
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

        {/* Events & Public Meetings */}
        <section aria-labelledby="events-heading">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 id="events-heading" className="text-xl md:text-2xl font-bold font-display flex items-center gap-2">
                <Calendar className="w-6 h-6 text-primary" aria-hidden="true" />
                What's Happening
              </h2>
              <p className="text-muted-foreground text-sm mt-1">Public meetings, events, and participation opportunities</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant={showPastEvents ? 'default' : 'outline'}
                size="sm"
                onClick={() => setShowPastEvents(!showPastEvents)}
              >
                {showPastEvents ? 'Upcoming Only' : 'Show Past Events'}
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4 md:p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <Badge variant="outline" className="mb-2 text-xs flex items-center gap-1 w-fit">
                        {(() => { const Icon = EVENT_TYPE_ICONS[event.type]; return Icon ? <Icon className="w-3.5 h-3.5" /> : null; })()}
                        {event.type === 'budget' && 'Budget'}
                        {event.type === 'meeting' && 'Meeting'}
                        {event.type === 'event' && 'Event'}
                        {event.type === 'forum' && 'Forum'}
                      </Badge>
                      <h3 className="font-semibold text-base md:text-lg mb-2">{event.title}</h3>
                      
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" aria-hidden="true" />
                          {event.date} • {event.time}
                        </p>
                        <p className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" aria-hidden="true" />
                          {event.venue}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-4 pt-3 border-t">
                    <Button size="sm" variant="default" className="flex-1 md:flex-none">
                      <ExternalLink className="w-4 h-4 mr-1" />
                      View Agenda
                    </Button>
                    <Button size="sm" variant="ghost" aria-label="Add to calendar">
                      <CalendarPlus className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" aria-label="Share event">
                      <Share2 className="w-4 h-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      aria-label="Read event details aloud"
                      onClick={() => speakText(`${event.title}. ${event.date} at ${event.time}. Venue: ${event.venue}`)}
                    >
                      <Volume2 className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Service Updates */}
        <section aria-labelledby="updates-heading">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <h2 id="updates-heading" className="text-xl md:text-2xl font-bold font-display flex items-center gap-2">
                <AlertTriangle className="w-6 h-6 text-primary" aria-hidden="true" />
                City Service Updates
              </h2>
              <p className="text-muted-foreground text-sm mt-1">Real-time status of essential services</p>
            </div>
            
            <Button variant="outline" size="sm">
              <Info className="w-4 h-4 mr-1" />
              Subscribe to Alerts
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
                      <span aria-label={`Status: ${update.status}`}><StatusDot status={statusStyle.status} /></span>
                    </div>
                    
                    <p className="text-sm text-foreground/80 mb-3">{update.message}</p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Updated {update.lastUpdated}</span>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="h-7 px-2"
                        aria-label={`Read ${update.category} update aloud`}
                        onClick={() => speakText(`${update.category}: ${update.message}`)}
                      >
                        <Volume2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* Status Legend */}
          <div className="flex items-center justify-center gap-6 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><StatusDot status="normal" /> Normal</span>
            <span className="flex items-center gap-1"><StatusDot status="partial" /> Partial disruption</span>
            <span className="flex items-center gap-1"><StatusDot status="outage" /> Outage</span>
          </div>
        </section>

        {/* FAQs / Quick Help */}
        <section aria-labelledby="faq-heading">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-primary" aria-hidden="true" />
                Need Help? Start Here.
              </CardTitle>
              <CardDescription>
                Search for answers or browse common questions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" aria-hidden="true" />
                <Input
                  type="search"
                  placeholder="Type a question, e.g., 'Where do I pay parking fees?'"
                  className="pl-10 pr-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  aria-label="Search FAQs"
                />
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute right-1 top-1/2 -translate-y-1/2 h-8 px-2"
                  aria-label="Voice search"
                >
                  <Mic className="w-4 h-4" />
                </Button>
              </div>

              {/* Quick suggestions */}
              {!searchQuery && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-muted-foreground">Popular:</span>
                  {['parking fees', 'business permit', 'garbage', 'county meetings'].map((term) => (
                    <Button
                      key={term}
                      variant="outline"
                      size="sm"
                      className="h-7 text-xs"
                      onClick={() => setSearchQuery(term)}
                    >
                      {term}
                    </Button>
                  ))}
                </div>
              )}

              {/* FAQ Accordion */}
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
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => speakText(`${faq.question}. ${faq.answer}`)}
                          aria-label="Read answer aloud"
                        >
                          <Volume2 className="w-4 h-4 mr-1" />
                          Read Aloud
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

              {/* Contact options */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                <Button variant="default" className="flex-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Call 1553
                </Button>
                <Button variant="outline" className="flex-1">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Chat with Us
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </AppLayout>
  );
}

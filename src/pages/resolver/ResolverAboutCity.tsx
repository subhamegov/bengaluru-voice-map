import React, { useState } from 'react';
import {
  Users,
  MapPin,
  Trash2,
  Phone,
  Car,
  FileText,
  ExternalLink,
  Star,
  Heart,
  ChevronRight,
  Search,
  Calendar,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Leaf,
  Droplets,
  Hammer,
  Monitor,
  Filter,
  Volume2,
} from 'lucide-react';
import { ResolverLayout } from '@/components/layout/ResolverLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  CITY_METRICS,
  CHARTER_RIGHTS,
  DEPARTMENTS,
  SERVICE_UPDATES,
  CITY_EVENTS,
  QUICK_HELP,
  type Department,
  type CityMetric,
} from '@/lib/resolverCityData';

const ICON_MAP: Record<string, React.ElementType> = {
  Users,
  MapPin,
  Trash2,
  Phone,
  Car,
  FileText,
  Leaf,
  Droplets,
  Hammer,
  Heart,
  Monitor,
};

const STATUS_CONFIG = {
  normal: { icon: CheckCircle2, color: 'text-success', bg: 'bg-success/10', label: 'Normal' },
  partial: { icon: AlertTriangle, color: 'text-warning', bg: 'bg-warning/10', label: 'Partial Disruption' },
  outage: { icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10', label: 'Outage' },
};

const EVENT_TYPE_COLORS = {
  hearing: 'bg-info/15 text-info',
  budget: 'bg-warning/15 text-warning',
  baraza: 'bg-primary/15 text-primary',
  consultation: 'bg-accent/15 text-accent-foreground',
};

export default function ResolverAboutCity() {
  const [selectedMetric, setSelectedMetric] = useState<CityMetric | null>(null);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [quickHelpSearch, setQuickHelpSearch] = useState('');

  const filteredQuickHelp = quickHelpSearch
    ? QUICK_HELP.filter(
        (item) =>
          item.question.toLowerCase().includes(quickHelpSearch.toLowerCase()) ||
          item.answer.toLowerCase().includes(quickHelpSearch.toLowerCase())
      )
    : QUICK_HELP;

  return (
    <ResolverLayout>
      <div className="space-y-10">
        {/* Header */}
        <header className="space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground font-display">
                About My City
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Quick reference guide to city services, responsibilities, and outcomes.
              </p>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Volume2 className="w-4 h-4" />
              Read Aloud
            </Button>
          </div>
        </header>

        {/* Section A: City Snapshot Metrics */}
        <section>
          <div className="gov-section-header">
            <h2 className="text-xl font-bold text-foreground">City-Level Snapshot</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {CITY_METRICS.map((metric) => {
              const Icon = ICON_MAP[metric.icon] || FileText;
              return (
                <Card
                  key={metric.id}
                  className="cursor-pointer hover:shadow-md hover:border-primary/30 transition-all"
                  onClick={() => setSelectedMetric(metric)}
                >
                  <CardContent className="p-4 text-center">
                    <div className="w-10 h-10 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{metric.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Section B: Service Charter */}
        <section>
          <div className="gov-section-header">
            <h2 className="text-xl font-bold text-foreground">City Service Charter Reference</h2>
          </div>
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Citizen Service Charter
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Official document outlining citizen rights and service standards
                  </p>
                </div>
                <Button className="gap-2" asChild>
                  <a
                    href="https://bbmp.gov.in/service-charter"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FileText className="w-4 h-4" />
                    View Full Charter
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-3">
                {CHARTER_RIGHTS.map((right, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-foreground">{right}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Section C: Departments */}
        <section>
          <div className="gov-section-header">
            <h2 className="text-xl font-bold text-foreground">Roles & Responsibilities</h2>
          </div>
          <p className="text-muted-foreground mb-4">
            The 5 priority departments handling citizen service delivery
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DEPARTMENTS.map((dept) => {
              const Icon = ICON_MAP[dept.icon] || FileText;
              return (
                <Card
                  key={dept.id}
                  className="hover:shadow-md hover:border-primary/30 transition-all cursor-pointer"
                  onClick={() => setSelectedDepartment(dept)}
                >
                  <CardContent className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="w-4 h-4 text-secondary fill-secondary" />
                        <span className="font-semibold">{dept.rating}</span>
                        <span className="text-muted-foreground">({dept.totalRatings})</span>
                      </div>
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">{dept.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Heart className="w-4 h-4 text-destructive" />
                      <span>{dept.appreciations} appreciations</span>
                    </div>
                    <Button variant="outline" size="sm" className="w-full gap-2">
                      View Details
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Section D: Service Updates */}
        <section>
          <div className="gov-section-header">
            <h2 className="text-xl font-bold text-foreground">Service Updates</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {SERVICE_UPDATES.map((update) => {
              const config = STATUS_CONFIG[update.status];
              const StatusIcon = config.icon;
              return (
                <Card key={update.id} className={`border-l-4 ${update.status === 'outage' ? 'border-l-destructive' : update.status === 'partial' ? 'border-l-warning' : 'border-l-success'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <Badge className={config.bg + ' ' + config.color}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {config.label}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{update.updatedAt}</span>
                    </div>
                    <h4 className="font-semibold text-foreground mb-1">{update.service}</h4>
                    <p className="text-sm text-foreground mb-2">{update.title}</p>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <p><span className="font-medium">Affected:</span> {update.affectedAreas.join(', ')}</p>
                      <p><span className="font-medium">Department:</span> {update.department}</p>
                      <p className="text-primary font-medium">
                        <Clock className="w-3 h-3 inline mr-1" />
                        Expected Fix: {update.expectedFixTime}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Section E: Quick Help */}
        <section>
          <div className="gov-section-header">
            <h2 className="text-xl font-bold text-foreground">Quick Help / FAQs</h2>
          </div>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search quick help..."
              value={quickHelpSearch}
              onChange={(e) => setQuickHelpSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Card>
            <CardContent className="p-0">
              <Accordion type="single" collapsible className="w-full">
                {filteredQuickHelp.map((item) => (
                  <AccordionItem key={item.id} value={item.id}>
                    <AccordionTrigger className="px-4 py-3 text-left hover:no-underline hover:bg-muted/30">
                      <span className="font-medium text-foreground">{item.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </section>

        {/* Section F: City Events */}
        <section>
          <div className="gov-section-header">
            <h2 className="text-xl font-bold text-foreground">City Events & Public Meetings</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {CITY_EVENTS.map((event) => (
              <Card key={event.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <Badge className={EVENT_TYPE_COLORS[event.type]}>
                      {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {new Date(event.date).toLocaleDateString('en-GB', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{event.title}</h4>
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {event.time}
                    </p>
                    <p className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {event.venue}
                    </p>
                  </div>
                  {event.agendaUrl && (
                    <Button variant="link" size="sm" className="px-0 mt-2 gap-1" asChild>
                      <a href={event.agendaUrl} target="_blank" rel="noopener noreferrer">
                        View Agenda Topics
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>

      {/* Metric Detail Modal */}
      <Dialog open={!!selectedMetric} onOpenChange={() => setSelectedMetric(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{selectedMetric?.label}</DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <p className="text-4xl font-bold text-primary mb-4">{selectedMetric?.value}</p>
            <p className="text-muted-foreground">{selectedMetric?.description}</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Department Detail Modal */}
      <Dialog open={!!selectedDepartment} onOpenChange={() => setSelectedDepartment(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedDepartment && (
                <>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    {(() => {
                      const Icon = ICON_MAP[selectedDepartment.icon] || FileText;
                      return <Icon className="w-5 h-5 text-primary" />;
                    })()}
                  </div>
                  {selectedDepartment.name}
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          {selectedDepartment && (
            <div className="space-y-6">
              {/* Rating Header */}
              <div className="flex items-center gap-6 p-4 bg-muted/50 rounded-lg">
                <div className="text-center">
                  <div className="flex items-center gap-1 justify-center">
                    <Star className="w-5 h-5 text-secondary fill-secondary" />
                    <span className="text-2xl font-bold">{selectedDepartment.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{selectedDepartment.totalRatings} ratings</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center gap-1 justify-center">
                    <Heart className="w-5 h-5 text-destructive" />
                    <span className="text-2xl font-bold">{selectedDepartment.appreciations}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">appreciations</p>
                </div>
              </div>

              {/* Responsibilities */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Responsibilities</h4>
                <ul className="space-y-2">
                  {selectedDepartment.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <ChevronRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Key Outcomes */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Key Outcomes</h4>
                <ul className="space-y-2">
                  {selectedDepartment.keyOutcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Escalation Contacts */}
              <div>
                <h4 className="font-semibold text-foreground mb-3">Team Escalation Contacts</h4>
                <div className="space-y-2">
                  {selectedDepartment.escalationContacts.map((contact, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                      <div>
                        <p className="font-medium text-foreground">{contact.name}</p>
                        <p className="text-xs text-muted-foreground">{contact.role}</p>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Phone className="w-4 h-4" />
                        {contact.phone}
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4 border-t border-border">
                <Button variant="outline" className="flex-1 gap-2">
                  <Filter className="w-4 h-4" />
                  See Related Issues
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </ResolverLayout>
  );
}

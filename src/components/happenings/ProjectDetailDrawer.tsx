import React, { useState } from 'react';
import { 
  Calendar, MapPin, Building2, Banknote, Volume2, ExternalLink, 
  MessageSquare, Ticket, ClipboardList, Share2, X, Check, CalendarPlus, FileText, Clock
} from 'lucide-react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Happening, 
  HAPPENING_TYPE_LABELS, 
  PROJECT_STATUS_LABELS,
  PROJECT_STATUS_COLORS,
  ProjectComment
} from '@/types/happenings';
import { HAPPENING_TYPE_ICON_COMPONENTS } from '@/lib/iconMaps';
import { ProjectTimeline } from './ProjectTimeline';
import { EngagementSummary } from './EngagementSummary';
import { CommunityFeedback } from './CommunityFeedback';
import { ShareModal } from './ShareModal';
import { speakText, stopSpeaking } from '@/lib/apiClient';
import { cn } from '@/lib/utils';

interface ProjectDetailDrawerProps {
  happening: Happening | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function generateICS(happening: Happening): string {
  const dtStart = happening.date.replace(/-/g, '') + 'T100000';
  const dtEnd = (happening.endDate || happening.date).replace(/-/g, '') + 'T120000';
  const location = happening.location || happening.wardName || '';
  const description = (happening.summary || '').replace(/\n/g, '\\n');

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Bengaluru Citizen Portal//EN',
    'BEGIN:VEVENT',
    `DTSTART:${dtStart}`,
    `DTEND:${dtEnd}`,
    `SUMMARY:${happening.title}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

function downloadICS(happening: Happening) {
  const ics = generateICS(happening);
  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${happening.title.replace(/[^a-zA-Z0-9]/g, '_').slice(0, 40)}.ics`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function ProjectDetailDrawer({ happening, open, onOpenChange }: ProjectDetailDrawerProps) {
  const [isReading, setIsReading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [localComments, setLocalComments] = useState<ProjectComment[]>([]);
  const [shareOpen, setShareOpen] = useState(false);

  if (!happening) return null;

  const details = happening.projectDetails;
  const agenda = happening.agenda || details?.agenda || [];
  const allComments = [...(details?.comments || []), ...localComments].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      weekday: 'short',
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const handleReadAloud = async () => {
    if (isReading) {
      stopSpeaking();
      setIsReading(false);
      return;
    }

    const textToRead = `${happening.title}. ${details?.fullDescription || happening.summary}. Project by ${happening.source} in ${happening.wardName} Ward.`;
    setIsReading(true);
    await speakText(textToRead);
    setIsReading(false);
  };

  const handleFollowToggle = () => {
    setIsFollowing(!isFollowing);
  };

  const handleAddComment = (text: string, affectedAs?: string) => {
    const newComment: ProjectComment = {
      id: `comment_${Date.now()}`,
      author: 'You',
      authorType: 'citizen',
      text,
      timestamp: new Date().toISOString(),
      affectedAs,
      helpfulCount: 0
    };
    setLocalComments(prev => [newComment, ...prev]);
  };

  const getTypeColor = () => {
    switch (happening.type) {
      case 'INFRASTRUCTURE': return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'EVENT': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'NOTICE': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'SERVICE': return 'bg-green-100 text-green-800 border-green-200';
      case 'EMERGENCY': return 'bg-red-100 text-red-800 border-red-200';
      case 'COMMUNITY': return 'bg-teal-100 text-teal-800 border-teal-200';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <>
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className="max-h-[90vh] overflow-hidden flex flex-col">
          <DrawerHeader className="border-b border-border pb-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                {/* Category and Status badges */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={cn(
                    'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border',
                    getTypeColor()
                  )}>
                    {(() => { const Icon = HAPPENING_TYPE_ICON_COMPONENTS[happening.type]; return <Icon className="w-3.5 h-3.5" aria-hidden="true" />; })()}
                    {HAPPENING_TYPE_LABELS[happening.type]}
                  </span>
                  {details?.status && (
                    <span className={cn(
                      'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border',
                      PROJECT_STATUS_COLORS[details.status]
                    )}>
                      {PROJECT_STATUS_LABELS[details.status]}
                    </span>
                  )}
                </div>
                
                <DrawerTitle className="text-xl font-bold text-foreground text-left">
                  {happening.title}
                </DrawerTitle>
                
                {/* Meta info */}
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-4 h-4" />
                    {happening.source}
                  </span>
                  {happening.wardName && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {happening.wardName} Ward
                    </span>
                  )}
                  {details?.expectedEndDate && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Due: {formatDate(details.expectedEndDate)}
                    </span>
                  )}
                </div>

                {/* Location line */}
                {happening.location && (
                  <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    {happening.location}
                  </div>
                )}

                {/* Quick action bar: View Agenda | Add to Calendar | Share */}
                <div className="flex items-center gap-0 mt-3 pt-3 border-t border-border">
                  {agenda.length > 0 && (
                    <a
                      href="#agenda-section"
                      className="inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-primary hover:bg-muted rounded-lg transition-colors"
                      onClick={(e) => {
                        e.preventDefault();
                        document.getElementById('agenda-section')?.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Agenda
                    </a>
                  )}
                  <button
                    onClick={() => downloadICS(happening)}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    aria-label="Add to calendar"
                    title="Add to Calendar"
                  >
                    <CalendarPlus className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setShareOpen(true)}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                    aria-label="Share"
                    title="Share"
                  >
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <DrawerClose className="rounded-full p-2 hover:bg-muted transition-colors">
                <X className="w-5 h-5" />
                <span className="sr-only">Close</span>
              </DrawerClose>
            </div>
          </DrawerHeader>

          <ScrollArea className="flex-1 overflow-y-auto px-4 py-4" style={{ maxHeight: 'calc(90vh - 140px)' }}>
            <div className="space-y-6 pb-6">
              {/* Engagement Summary */}
              {details?.engagement && (
                <EngagementSummary
                  engagement={details.engagement}
                  isFollowing={isFollowing}
                  onFollowToggle={handleFollowToggle}
                />
              )}

              {/* Agenda Section */}
              {agenda.length > 0 && (
                <section id="agenda-section">
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-primary" />
                    Agenda
                  </h3>
                  <div className="bg-muted/30 rounded-lg border border-border overflow-hidden">
                    {agenda.map((item, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          'flex items-start gap-3 px-4 py-3',
                          idx < agenda.length - 1 && 'border-b border-border/50'
                        )}
                      >
                        <span className="text-xs font-mono font-semibold text-primary bg-primary/10 px-2 py-1 rounded flex-shrink-0 mt-0.5">
                          {item.time}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground">{item.topic}</p>
                          {item.presenter && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              — {item.presenter}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Overview Section */}
              <section>
                <h3 className="text-sm font-semibold text-foreground mb-3">Overview</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {details?.fullDescription || happening.summary}
                </p>
                
                {/* Key Facts Table */}
                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Agency:</span>
                      <span className="ml-2 font-medium text-foreground">{happening.source}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Ward:</span>
                      <span className="ml-2 font-medium text-foreground">{happening.wardName}</span>
                    </div>
                    {details?.budget && (
                      <div>
                        <span className="text-muted-foreground">Budget:</span>
                        <span className="ml-2 font-medium text-foreground">{details.budget}</span>
                      </div>
                    )}
                    {details?.financialYear && (
                      <div>
                        <span className="text-muted-foreground">Funding:</span>
                        <span className="ml-2 font-medium text-foreground">{details.financialYear}</span>
                      </div>
                    )}
                    <div>
                      <span className="text-muted-foreground">Start:</span>
                      <span className="ml-2 font-medium text-foreground">{formatDate(happening.date)}</span>
                    </div>
                    {details?.expectedEndDate && (
                      <div>
                        <span className="text-muted-foreground">Expected End:</span>
                        <span className="ml-2 font-medium text-foreground">{formatDate(details.expectedEndDate)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </section>

              {/* Vertical Timeline */}
              {details?.timeline && details.timeline.length > 0 && (
                <section>
                  <h3 className="text-sm font-semibold text-foreground mb-4">Project Timeline</h3>
                  <ProjectTimeline timeline={details.timeline} />
                </section>
              )}

              {/* Community Feedback */}
              <section>
                <CommunityFeedback 
                  comments={allComments}
                  onAddComment={handleAddComment}
                />
              </section>

              {/* Related Activity */}
              {(details?.relatedTickets?.length || details?.relatedSurveys?.length || details?.publicUpdates?.length) && (
                <section>
                  <h3 className="text-sm font-semibold text-foreground mb-3">Related Activity</h3>
                  
                  {details?.relatedTickets && details.relatedTickets.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                        <Ticket className="w-3 h-3" />
                        Linked Complaints ({details.relatedTickets.length})
                      </h4>
                      <ul className="space-y-2">
                        {details.relatedTickets.map(ticket => (
                          <li 
                            key={ticket.id}
                            className="text-sm flex items-start gap-2 pl-2 border-l-2 border-muted-foreground/30"
                          >
                            <div className="flex-1">
                              <span className="text-foreground">{ticket.summary}</span>
                              <span className="text-xs text-muted-foreground font-mono block mt-0.5">{ticket.id}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {details?.relatedSurveys && details.relatedSurveys.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                        <ClipboardList className="w-3 h-3" />
                        Related Surveys
                      </h4>
                      <ul className="space-y-1">
                        {details.relatedSurveys.map(survey => (
                          <li 
                            key={survey.id}
                            className="text-sm bg-blue-50 text-blue-700 rounded px-3 py-2 flex items-center gap-2"
                          >
                            <ClipboardList className="w-4 h-4" />
                            {survey.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {details?.publicUpdates && details.publicUpdates.length > 0 && (
                    <div>
                      <h4 className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        Public Updates
                      </h4>
                      <ul className="space-y-2">
                        {details.publicUpdates.map((update, index) => (
                          <li 
                            key={index}
                            className="text-sm border-l-2 border-primary pl-3 py-1"
                          >
                            <time className="text-xs text-muted-foreground block mb-1">
                              {formatDate(update.date)}
                            </time>
                            <p className="text-foreground">{update.text}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </section>
              )}

              {/* Citizen Tools */}
              <section className="pt-4 border-t border-border">
                <h3 className="text-sm font-semibold text-foreground mb-3">Actions</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={handleReadAloud}
                    className={cn(
                      'inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                      isReading
                        ? 'bg-secondary text-secondary-foreground'
                        : 'bg-muted text-foreground hover:bg-muted/80'
                    )}
                  >
                    <Volume2 className="w-4 h-4" />
                    {isReading ? 'Stop Reading' : 'Read Aloud'}
                  </button>
                  
                  <button
                    onClick={handleFollowToggle}
                    className={cn(
                      'inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-colors',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
                      isFollowing
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-foreground hover:bg-muted/80'
                    )}
                  >
                    {isFollowing ? <><Check className="w-4 h-4" /> Following</> : 'Follow Project'}
                  </button>

                  <button
                    onClick={() => downloadICS(happening)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-muted text-foreground hover:bg-muted/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <CalendarPlus className="w-4 h-4" />
                    Add to Calendar
                  </button>

                  <button
                    onClick={() => setShareOpen(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-muted text-foreground hover:bg-muted/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>

                  {happening.link && (
                    <a
                      href={happening.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium bg-muted text-foreground hover:bg-muted/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <ExternalLink className="w-4 h-4" />
                      More Details
                    </a>
                  )}
                </div>
              </section>
            </div>
          </ScrollArea>
        </DrawerContent>
      </Drawer>

      <ShareModal
        open={shareOpen}
        onOpenChange={setShareOpen}
        title={happening.title}
        summary={happening.summary}
      />
    </>
  );
}

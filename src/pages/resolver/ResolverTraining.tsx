import React, { useState, useMemo } from 'react';
import { 
  Search, 
  BookOpen, 
  Video, 
  Download, 
  ChevronDown, 
  ChevronRight, 
  Volume2,
  VolumeX,
  Play,
  FileText,
  Bookmark,
  Clock,
  ExternalLink
} from 'lucide-react';
import { ResolverLayout } from '@/components/layout/ResolverLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  RESOLVER_FAQS,
  RESOLVER_FAQ_CATEGORIES,
  RESOLVER_VIDEOS,
  RESOLVER_DOWNLOADS,
  type ResolverFAQ,
} from '@/lib/resolverTrainingData';
import { useSpeech } from '@/hooks/use-speech';

export default function ResolverTraining() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('faqs');
  const [expandedFaqs, setExpandedFaqs] = useState<string[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>(RESOLVER_FAQ_CATEGORIES);

  // Filter FAQs based on search
  const filteredFaqs = useMemo(() => {
    if (!searchQuery) return RESOLVER_FAQS;
    const query = searchQuery.toLowerCase();
    return RESOLVER_FAQS.filter(
      (faq) =>
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.category.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Group FAQs by category
  const faqsByCategory = useMemo(() => {
    const grouped: Record<string, ResolverFAQ[]> = {};
    RESOLVER_FAQ_CATEGORIES.forEach((cat) => {
      grouped[cat] = filteredFaqs.filter((faq) => faq.category === cat);
    });
    return grouped;
  }, [filteredFaqs]);

  // Filter videos based on search
  const filteredVideos = useMemo(() => {
    if (!searchQuery) return RESOLVER_VIDEOS;
    const query = searchQuery.toLowerCase();
    return RESOLVER_VIDEOS.filter(
      (video) =>
        video.title.toLowerCase().includes(query) ||
        video.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Filter downloads based on search
  const filteredDownloads = useMemo(() => {
    if (!searchQuery) return RESOLVER_DOWNLOADS;
    const query = searchQuery.toLowerCase();
    return RESOLVER_DOWNLOADS.filter(
      (dl) =>
        dl.name.toLowerCase().includes(query) ||
        dl.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const toggleFaq = (faqId: string) => {
    setExpandedFaqs((prev) =>
      prev.includes(faqId) ? prev.filter((id) => id !== faqId) : [...prev, faqId]
    );
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <ResolverLayout>
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header */}
        <header className="space-y-2">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground font-display">
                Training Module
              </h1>
              <p className="text-lg text-muted-foreground mt-2">
                Upskill yourself with structured, easy-to-follow training content designed for resolvers.
              </p>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Volume2 className="w-4 h-4" />
              Read Aloud
            </Button>
          </div>
        </header>

        {/* Search */}
        <section>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search training content..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search training content"
            />
          </div>
        </section>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="faqs" className="gap-2">
              <BookOpen className="w-4 h-4" />
              FAQs
            </TabsTrigger>
            <TabsTrigger value="videos" className="gap-2">
              <Video className="w-4 h-4" />
              Videos
            </TabsTrigger>
            <TabsTrigger value="downloads" className="gap-2">
              <Download className="w-4 h-4" />
              Downloads
            </TabsTrigger>
          </TabsList>

          {/* FAQs Tab */}
          <TabsContent value="faqs" className="space-y-4">
            {Object.entries(faqsByCategory).map(([category, faqs]) => {
              if (faqs.length === 0) return null;
              const isExpanded = expandedCategories.includes(category);

              return (
                <Collapsible
                  key={category}
                  open={isExpanded}
                  onOpenChange={() => toggleCategory(category)}
                >
                  <Card>
                    <CollapsibleTrigger asChild>
                      <button className="w-full p-4 flex items-center justify-between hover:bg-muted/50 transition-colors rounded-t-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <BookOpen className="w-4 h-4 text-primary" />
                          </div>
                          <span className="font-semibold text-foreground">{category}</span>
                          <Badge variant="secondary" className="ml-2">
                            {faqs.length}
                          </Badge>
                        </div>
                        {isExpanded ? (
                          <ChevronDown className="w-5 h-5 text-muted-foreground" />
                        ) : (
                          <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        )}
                      </button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <div className="border-t border-border">
                        {faqs.map((faq) => (
                          <FaqItem
                            key={faq.id}
                            faq={faq}
                            isExpanded={expandedFaqs.includes(faq.id)}
                            onToggle={() => toggleFaq(faq.id)}
                          />
                        ))}
                      </div>
                    </CollapsibleContent>
                  </Card>
                </Collapsible>
              );
            })}

            {filteredFaqs.length === 0 && (
              <Card className="p-8 text-center">
                <BookOpen className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No FAQs found matching your search.</p>
              </Card>
            )}
          </TabsContent>

          {/* Videos Tab */}
          <TabsContent value="videos" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {filteredVideos.map((video) => (
                <Card key={video.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="aspect-video bg-muted relative flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center cursor-pointer hover:bg-primary transition-colors">
                      <Play className="w-8 h-8 text-primary-foreground ml-1" />
                    </div>
                    <Badge className="absolute top-2 right-2 bg-background/90 text-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      {video.duration}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold text-foreground mb-1">{video.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {video.description}
                    </p>
                    <div className="flex items-center gap-2 mt-3">
                      <Button size="sm" className="gap-2 flex-1">
                        <Play className="w-4 h-4" />
                        Watch
                      </Button>
                      <Button size="sm" variant="outline">
                        <Bookmark className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredVideos.length === 0 && (
              <Card className="p-8 text-center">
                <Video className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No videos found matching your search.</p>
              </Card>
            )}
          </TabsContent>

          {/* Downloads Tab */}
          <TabsContent value="downloads" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {filteredDownloads.map((download) => (
                <Card key={download.id} className="p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-destructive" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground">{download.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {download.description}
                      </p>
                      <div className="flex items-center gap-3 mt-3">
                        <Badge variant="outline">{download.type}</Badge>
                        <span className="text-xs text-muted-foreground">{download.size}</span>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="gap-2 flex-shrink-0">
                      <Download className="w-4 h-4" />
                      Download
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {filteredDownloads.length === 0 && (
              <Card className="p-8 text-center">
                <Download className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">No downloads found matching your search.</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </ResolverLayout>
  );
}

interface FaqItemProps {
  faq: ResolverFAQ;
  isExpanded: boolean;
  onToggle: () => void;
}

function FaqItem({ faq, isExpanded, onToggle }: FaqItemProps) {
  return (
    <Collapsible open={isExpanded} onOpenChange={onToggle}>
      <CollapsibleTrigger asChild>
        <button className="w-full px-4 py-3 flex items-start justify-between hover:bg-muted/30 transition-colors text-left border-b border-border last:border-0">
          <div className="flex items-start gap-3 flex-1">
            {isExpanded ? (
              <ChevronDown className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
            ) : (
              <ChevronRight className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
            )}
            <span className={`font-medium ${isExpanded ? 'text-primary' : 'text-foreground'}`}>
              {faq.question}
            </span>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
            {faq.isNew && (
              <Badge className="bg-success text-success-foreground">New</Badge>
            )}
            {faq.isUpdated && (
              <Badge variant="secondary">Updated</Badge>
            )}
          </div>
        </button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="px-4 py-4 pl-12 bg-muted/20 border-b border-border">
          <div className="prose prose-sm max-w-none text-muted-foreground">
            {faq.answer.split('\n\n').map((paragraph, idx) => (
              <p key={idx} className="mb-3 last:mb-0 whitespace-pre-wrap">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border">
            <Button size="sm" variant="ghost" className="gap-2 text-xs">
              <Volume2 className="w-3 h-3" />
              Read Aloud
            </Button>
            <Button size="sm" variant="ghost" className="gap-2 text-xs">
              <Bookmark className="w-3 h-3" />
              Bookmark
            </Button>
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}

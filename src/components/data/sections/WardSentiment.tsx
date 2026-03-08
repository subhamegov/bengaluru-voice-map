import React from 'react';
import { MessageCircle, TrendingUp, TrendingDown, Minus, Newspaper, Share2, Hash } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface SentimentIssue {
  topic: string;
  sentiment: 'positive' | 'neutral' | 'negative';
  mentions: number;
  socialSignals: number;
  newsMentions: number;
  trendDirection: 'up' | 'down' | 'stable';
}

const WARD_ISSUES: SentimentIssue[] = [
  {
    topic: 'Water Supply Issues',
    sentiment: 'negative',
    mentions: 342,
    socialSignals: 128,
    newsMentions: 5,
    trendDirection: 'up',
  },
  {
    topic: 'Street Lighting',
    sentiment: 'positive',
    mentions: 156,
    socialSignals: 45,
    newsMentions: 2,
    trendDirection: 'down',
  },
  {
    topic: 'Garbage Collection',
    sentiment: 'negative',
    mentions: 487,
    socialSignals: 203,
    newsMentions: 8,
    trendDirection: 'up',
  },
  {
    topic: 'Road Conditions',
    sentiment: 'neutral',
    mentions: 278,
    socialSignals: 92,
    newsMentions: 4,
    trendDirection: 'stable',
  },
  {
    topic: 'Public Safety',
    sentiment: 'positive',
    mentions: 98,
    socialSignals: 34,
    newsMentions: 1,
    trendDirection: 'down',
  },
  {
    topic: 'Park Maintenance',
    sentiment: 'positive',
    mentions: 67,
    socialSignals: 22,
    newsMentions: 1,
    trendDirection: 'stable',
  },
];

const POPULAR_POSTS = [
  {
    platform: 'X',
    author: '@BengaluruWard42',
    text: 'Water supply has been irregular for 3 days straight. When will BWSSB fix this? #BengaluruWater',
    likes: 234,
    time: '2h ago',
  },
  {
    platform: 'Reddit',
    author: 'u/koramangala_resident',
    text: 'Shoutout to BBMP for finally fixing the potholes on 80ft road! Smooth ride after months.',
    likes: 156,
    time: '5h ago',
  },
  {
    platform: 'X',
    author: '@CleanBLR',
    text: 'Garbage not collected in HSR Layout sector 2 for the second week. @BBMP please respond.',
    likes: 189,
    time: '8h ago',
  },
];

const sentimentConfig = {
  positive: { color: 'text-success', bg: 'bg-success/10', label: 'Positive', icon: TrendingUp },
  neutral: { color: 'text-muted-foreground', bg: 'bg-muted', label: 'Neutral', icon: Minus },
  negative: { color: 'text-destructive', bg: 'bg-destructive/10', label: 'Negative', icon: TrendingDown },
};

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus,
};

export function WardSentiment() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-secondary" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">What People in Your Ward Are Talking About</h2>
          <p className="text-sm text-muted-foreground">Trending topics, social media buzz, and media coverage</p>
        </div>
      </div>

      {/* Issue Sentiment Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {WARD_ISSUES.map((issue) => {
          const config = sentimentConfig[issue.sentiment];
          const TrendIcon = trendIcons[issue.trendDirection];
          return (
            <Card key={issue.topic} className="gov-card hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-foreground text-sm">{issue.topic}</h3>
                  <Badge className={cn('text-xs', config.bg, config.color, 'border-0')}>
                    {config.label}
                  </Badge>
                </div>

                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Hash className="w-3.5 h-3.5" />
                      Mentions
                    </span>
                    <span className="font-semibold text-foreground flex items-center gap-1">
                      {issue.mentions.toLocaleString()}
                      <TrendIcon className={cn('w-3.5 h-3.5', 
                        issue.trendDirection === 'up' ? 'text-destructive' : 
                        issue.trendDirection === 'down' ? 'text-success' : 'text-muted-foreground'
                      )} />
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Share2 className="w-3.5 h-3.5" />
                      Social Signals
                    </span>
                    <span className="font-semibold text-foreground">{issue.socialSignals}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Newspaper className="w-3.5 h-3.5" />
                      News Mentions
                    </span>
                    <span className="font-semibold text-foreground">{issue.newsMentions}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Popular Posts */}
      <Card className="gov-card">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">Popular Posts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {POPULAR_POSTS.map((post, i) => (
            <div key={i} className="flex gap-3 p-3 rounded-lg border border-border bg-muted/20">
              <Badge variant="outline" className="h-6 flex-shrink-0 text-xs">
                {post.platform}
              </Badge>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">{post.text}</p>
                <div className="flex items-center gap-3 mt-1.5 text-xs text-muted-foreground">
                  <span>{post.author}</span>
                  <span>•</span>
                  <span>{post.time}</span>
                  <span>•</span>
                  <span>♥ {post.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}

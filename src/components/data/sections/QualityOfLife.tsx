import React from 'react';
import { Heart, TrendingUp, TrendingDown, Minus, Droplets, Car, Trash2, Shield, Lightbulb, LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface QoLIndicator {
  name: string;
  icon: LucideIcon;
  sentimentTrend: 'improving' | 'stable' | 'declining';
  complaintsThisMonth: number;
  activeWorks: number;
  resolutionTrend: number; // percentage change
  score: number; // 0-100
}

const QOL_INDICATORS: QoLIndicator[] = [
  {
    name: 'Water Availability',
    icon: Droplets,
    sentimentTrend: 'declining',
    complaintsThisMonth: 342,
    activeWorks: 3,
    resolutionTrend: -8,
    score: 62,
  },
  {
    name: 'Road Conditions',
    icon: Car,
    sentimentTrend: 'stable',
    complaintsThisMonth: 278,
    activeWorks: 7,
    resolutionTrend: 5,
    score: 55,
  },
  {
    name: 'Waste Collection',
    icon: Trash2,
    sentimentTrend: 'declining',
    complaintsThisMonth: 487,
    activeWorks: 2,
    resolutionTrend: -12,
    score: 48,
  },
  {
    name: 'Public Safety',
    icon: Shield,
    sentimentTrend: 'improving',
    complaintsThisMonth: 98,
    activeWorks: 1,
    resolutionTrend: 15,
    score: 78,
  },
  {
    name: 'Street Lighting',
    icon: Lightbulb,
    sentimentTrend: 'improving',
    complaintsThisMonth: 156,
    activeWorks: 4,
    resolutionTrend: 22,
    score: 72,
  },
];

const trendConfig = {
  improving: { label: 'Improving', color: 'text-success', bg: 'bg-success/10', icon: TrendingUp },
  stable: { label: 'Stable', color: 'text-muted-foreground', bg: 'bg-muted', icon: Minus },
  declining: { label: 'Declining', color: 'text-destructive', bg: 'bg-destructive/10', icon: TrendingDown },
};

function getScoreColor(score: number) {
  if (score >= 70) return 'text-success';
  if (score >= 50) return 'text-amber-600';
  return 'text-destructive';
}

function getProgressColor(score: number) {
  if (score >= 70) return '[&>div]:bg-success';
  if (score >= 50) return '[&>div]:bg-amber-500';
  return '[&>div]:bg-destructive';
}

export function QualityOfLife() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
          <Heart className="w-5 h-5 text-success" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-foreground">Quality of Life Indicators</h2>
          <p className="text-sm text-muted-foreground">How key services are performing in your ward</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {QOL_INDICATORS.map((indicator) => {
          const Icon = indicator.icon;
          const trend = trendConfig[indicator.sentimentTrend];
          const TrendIcon = trend.icon;
          return (
            <Card key={indicator.name} className="gov-card hover:shadow-md transition-shadow">
              <CardContent className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-4.5 h-4.5 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm">{indicator.name}</h3>
                  </div>
                  <Badge className={cn('text-xs border-0', trend.bg, trend.color)}>
                    <TrendIcon className="w-3 h-3 mr-1" />
                    {trend.label}
                  </Badge>
                </div>

                {/* Score */}
                <div className="mb-4">
                  <div className="flex items-end justify-between mb-1.5">
                    <span className="text-xs text-muted-foreground">Quality Score</span>
                    <span className={cn('text-lg font-bold', getScoreColor(indicator.score))}>
                      {indicator.score}/100
                    </span>
                  </div>
                  <Progress value={indicator.score} className={cn('h-2', getProgressColor(indicator.score))} />
                </div>

                {/* Stats */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Complaints this month</span>
                    <span className="font-semibold text-foreground">{indicator.complaintsThisMonth}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Active govt. works</span>
                    <span className="font-semibold text-foreground">{indicator.activeWorks}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Resolution trend</span>
                    <span className={cn('font-semibold flex items-center gap-1',
                      indicator.resolutionTrend >= 0 ? 'text-success' : 'text-destructive'
                    )}>
                      {indicator.resolutionTrend >= 0 ? (
                        <TrendingUp className="w-3.5 h-3.5" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5" />
                      )}
                      {indicator.resolutionTrend >= 0 ? '+' : ''}{indicator.resolutionTrend}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

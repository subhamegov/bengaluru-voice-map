/**
 * Central Lucide icon maps — replaces all emoji-based iconography.
 * Every consumer imports from here for consistent, accessible icons.
 */
import React from 'react';
import {
  Route, Droplets, Trash2, Lightbulb, Volume2, ClipboardList,
  FilePen, UserCheck, Wrench, HelpCircle, CheckCircle2, AlertTriangle, Lock, LockOpen,
  Construction, Calendar, Megaphone, Landmark, AlertOctagon, Handshake,
  FileWarning, MessageSquare, Star, CircleDot,
  Banknote, TreePine, Mic, TrafficCone, Shield, Building,
  type LucideIcon,
} from 'lucide-react';
import type { IssueCategory, WorkflowAction } from '@/types/story';
import type { HappeningType } from '@/types/happenings';

/* ── Issue Categories ─────────────────────────────── */

export const ISSUE_CATEGORY_ICONS: Record<IssueCategory, LucideIcon> = {
  roads: Route,
  water: Droplets,
  waste: Trash2,
  streetlights: Lightbulb,
  encroachment: Building,
  traffic: TrafficCone,
  construction: Construction,
  safety: Shield,
  other: ClipboardList,
};

/* ── Workflow Actions ─────────────────────────────── */

export const WORKFLOW_ACTION_ICONS: Record<WorkflowAction, LucideIcon> = {
  CREATE: FilePen,
  ASSIGN: UserCheck,
  IN_PROGRESS: Wrench,
  REQUEST_INFO: HelpCircle,
  RESOLVE: CheckCircle2,
  ESCALATE: AlertTriangle,
  CLOSE: Lock,
  REOPEN: LockOpen,
};

/* ── Happening Types ──────────────────────────────── */

export const HAPPENING_TYPE_ICON_COMPONENTS: Record<HappeningType, LucideIcon> = {
  INFRASTRUCTURE: Construction,
  EVENT: Calendar,
  NOTICE: Megaphone,
  SERVICE: Landmark,
  EMERGENCY: AlertOctagon,
  COMMUNITY: Handshake,
};

/* ── Complaint Intent ─────────────────────────────── */

export type ComplaintIntentType = 'service' | 'project' | 'feedback' | 'appreciation';

export const COMPLAINT_INTENT_ICONS: Record<ComplaintIntentType, LucideIcon> = {
  service: FileWarning,
  project: Construction,
  feedback: MessageSquare,
  appreciation: Star,
};

/* ── Event Types (AboutMyCity) ────────────────────── */

export const EVENT_TYPE_ICONS: Record<string, LucideIcon> = {
  budget: Banknote,
  meeting: Landmark,
  event: TreePine,
  forum: Mic,
};

/* ── Status Indicator (replaces colored circle emojis) ── */

export function StatusDot({ status, className }: { status: 'normal' | 'partial' | 'outage'; className?: string }) {
  const colors: Record<string, string> = {
    normal: 'text-green-500',
    partial: 'text-orange-500',
    outage: 'text-red-500',
  };
  return <CircleDot className={`w-4 h-4 ${colors[status]} ${className ?? ''}`} aria-hidden="true" />;
}

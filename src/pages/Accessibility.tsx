import { AppLayout } from '@/components/layout/AppLayout';
import { UX4GPageHeader } from '@/components/layout/UX4GPageHeader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accessibility, Type, Eye, Focus, HelpCircle } from 'lucide-react';

const textReading = [
  { name: 'Bigger Text', desc: 'Increase text size for easier reading' },
  { name: 'Smaller Text', desc: 'Decrease text size if the default is too large' },
  { name: 'Text Spacing', desc: 'Add extra space between letters for clarity' },
  { name: 'Line Height', desc: 'Increase spacing between lines of text' },
  { name: 'Dyslexia Friendly', desc: 'Use a font designed to improve readability for dyslexic users' },
  { name: 'Text To Speech', desc: 'Listen to page content aloud' },
];

const focusAttention = [
  { name: 'ADHD Mode', desc: 'Reduce distractions and highlight the content you are reading' },
  { name: 'Pause Animation', desc: 'Reduce movement on the screen' },
  { name: 'Cursor', desc: 'Enlarge or highlight the cursor for easier tracking' },
];

const visualAdjustments = [
  { name: 'Saturation', desc: 'Adjust colour intensity of the interface' },
  { name: 'Light / Dark', desc: 'Switch between light and dark colour schemes' },
  { name: 'Invert Colors', desc: 'Reverse colours for improved contrast' },
  { name: 'Hide Images', desc: 'Remove images to focus on text content' },
  { name: 'Highlight Links', desc: 'Make clickable links more visible on every page' },
];

interface FeatureListProps {
  items: { name: string; desc: string }[];
}

function FeatureList({ items }: FeatureListProps) {
  return (
    <ul className="divide-y divide-border">
      {items.map((item) => (
        <li key={item.name} className="py-3 first:pt-0 last:pb-0">
          <p className="text-sm font-semibold text-foreground">{item.name}</p>
          <p className="text-sm text-muted-foreground">{item.desc}</p>
        </li>
      ))}
    </ul>
  );
}

export default function AccessibilityPage() {
  return (
    <AppLayout>
      <UX4GPageHeader
        icon={Accessibility}
        title="Accessibility Options"
        description="Adjust the experience to suit your reading, viewing, and interaction needs."
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Type className="w-5 h-5 text-primary" aria-hidden="true" />
              Text &amp; Reading
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FeatureList items={textReading} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Focus className="w-5 h-5 text-primary" aria-hidden="true" />
              Focus &amp; Attention
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FeatureList items={focusAttention} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Eye className="w-5 h-5 text-primary" aria-hidden="true" />
              Visual Adjustments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <FeatureList items={visualAdjustments} />
          </CardContent>
        </Card>
      </div>

      {/* Help section */}
      <Card className="mt-8 max-w-5xl border-dashed">
        <CardContent className="flex items-start gap-3 py-5">
          <HelpCircle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold text-foreground">Need help choosing settings?</p>
            <p className="text-sm text-muted-foreground mt-1">
              You can combine text, colour, and focus settings to make the portal easier to use.
              Use the floating accessibility panel on any page to apply changes instantly.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Keyboard shortcut hint */}
      <p className="mt-6 text-xs text-muted-foreground max-w-5xl">
        <strong>Tip:</strong> Open this page anytime with{' '}
        <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted text-[11px] font-mono">Ctrl + F12</kbd>{' '}
        on Windows or{' '}
        <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted text-[11px] font-mono">⌥ ⌘ 5</kbd>{' '}
        on Mac.
      </p>
    </AppLayout>
  );
}



## Plan: Align All Charts to UX4G Government of India Color Palette

### Reference Analysis
The uploaded UX4G chart reference shows a consistent **indigo-purple-lavender** palette with soft coral/peach accents:
- **Primary**: Deep indigo `#4C3D8F` 
- **Secondary**: Medium purple `#7B68AE`
- **Tertiary**: Lavender `#B4A7D6`
- **Quaternary**: Light lavender `#D4CCE6`
- **Accent 1**: Soft coral `#E8A598`
- **Accent 2**: Pale peach `#F5D5C8`
- **Accent 3**: Mint `#A8D8B8`
- **Accent 4**: Sage `#C5DFC0`

All charts use clean, minimal styling with rounded bar corners, thin grid lines, and muted axis text.

### Files to Edit

**1. `src/lib/serviceAnalyticsData.ts`** — Central color source
- Update all hardcoded `hsl(...)` colors in `getComplaintsByStatus()`, `getComplaintsByDepartment()`, and `getComplaintsByChannel()` to the UX4G palette
- No logic changes

**2. `src/components/data/cards/ComplaintsBySourceChart.tsx`** — Bar chart
- Change `fill` from `hsl(var(--primary))` to UX4G deep indigo
- No logic changes

**3. `src/components/data/cards/ComplaintsByStatusBar.tsx`** — Already uses per-item colors from data; inherits fix from step 1

**4. `src/components/data/cards/ComplaintsByStatusPie.tsx`** — Doughnut chart; inherits fix from step 1

**5. `src/components/data/cards/ComplaintsByDepartmentPie.tsx`** — Doughnut chart; inherits fix from step 1

**6. `src/components/data/cards/ComplaintsByChannelPie.tsx`** — Doughnut chart; inherits fix from step 1

**7. `src/components/data/cards/CumulativeLineChart.tsx`** — Line chart
- Change line strokes to UX4G palette: deep indigo for Total, medium purple for Closed, coral for Reopened

**8. `src/components/data/cards/UniqueCitizensChart.tsx`** — Line chart
- Change stroke from `hsl(var(--secondary))` to UX4G medium purple

**9. `src/components/data/cards/TopComplaintsChart.tsx`** — Horizontal bar
- Change fill from `hsl(var(--info))` to UX4G deep indigo

**10. `src/components/data/cards/DepartmentRatingsDetail.tsx`** — Chart config
- Update `chartConfig` colors to UX4G palette

### Approach
- Define the UX4G chart palette as a constant array in `serviceAnalyticsData.ts` so all chart components can reference it
- Update all individual chart files to use these colors
- Zero business logic changes


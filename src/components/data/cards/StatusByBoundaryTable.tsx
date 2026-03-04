import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Info, ArrowUpDown } from 'lucide-react';
import { getStatusByBoundary, KPI_DEFINITIONS } from '@/lib/serviceAnalyticsData';
import { Button } from '@/components/ui/button';

type SortField = 'boundary' | 'total' | 'completionRate' | 'slaAchievement';
type SortDirection = 'asc' | 'desc';

export function StatusByBoundaryTable() {
  const [dimension, setDimension] = useState<'ward' | 'department'>('ward');
  const [sortField, setSortField] = useState<SortField>('total');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const rawData = getStatusByBoundary(dimension);

  const data = [...rawData].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
    }
    return sortDirection === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const ColumnHeader = ({ field, label, definition }: { field: SortField; label: string; definition?: string }) => (
    <TableHead className="text-xs">
      <Button
        variant="ghost"
        size="sm"
        className="h-auto p-0 font-semibold hover:bg-transparent flex items-center gap-1"
        onClick={() => handleSort(field)}
      >
        {label}
        <ArrowUpDown className="w-3 h-3" />
        {definition && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Info className="w-3 h-3 text-muted-foreground ml-1" />
            </TooltipTrigger>
            <TooltipContent side="top" className="max-w-xs text-xs">
              {definition}
            </TooltipContent>
          </Tooltip>
        )}
      </Button>
    </TableHead>
  );

  const StaticHeader = ({ label, definition }: { label: string; definition: string }) => (
    <TableHead className="text-xs">
      <div className="flex items-center gap-1">
        {label}
        <Tooltip>
          <TooltipTrigger asChild>
            <Info className="w-3 h-3 text-muted-foreground" />
          </TooltipTrigger>
          <TooltipContent side="top" className="max-w-xs text-xs">
            {definition}
          </TooltipContent>
        </Tooltip>
      </div>
    </TableHead>
  );

  return (
    <Card className="gov-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <CardTitle className="text-lg">Complaint Status by Boundary / Department</CardTitle>
          <Select value={dimension} onValueChange={(v: 'ward' | 'department') => setDimension(v)}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ward">By Ward</SelectItem>
              <SelectItem value="department">By Department</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Table aria-label="Complaint status breakdown by boundary or department">
          <TableHeader>
            <TableRow>
              <ColumnHeader field="boundary" label={dimension === 'ward' ? 'Ward' : 'Department'} />
              <StaticHeader label="Open" definition={KPI_DEFINITIONS.openComplaints} />
              <StaticHeader label="Assigned" definition={KPI_DEFINITIONS.assignedComplaints} />
              <StaticHeader label="Rejected" definition={KPI_DEFINITIONS.rejectedComplaints} />
              <StaticHeader label="Reassign Req." definition={KPI_DEFINITIONS.reassignRequested} />
              <StaticHeader label="Reassigned" definition={KPI_DEFINITIONS.reassignedComplaints} />
              <StaticHeader label="Reopened" definition={KPI_DEFINITIONS.reopenedComplaints} />
              <StaticHeader label="Resolved" definition={KPI_DEFINITIONS.resolvedComplaints} />
              <StaticHeader label="Closed" definition={KPI_DEFINITIONS.closedComplaints} />
              <ColumnHeader field="total" label="Total" definition={KPI_DEFINITIONS.totalComplaints} />
              <ColumnHeader field="completionRate" label="Completion %" definition={KPI_DEFINITIONS.completionRate} />
              <ColumnHeader field="slaAchievement" label="On-Time %" definition={KPI_DEFINITIONS.slaAchievement} />
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.boundary}>
                <TableCell className="font-medium">{row.boundary}</TableCell>
                <TableCell>{row.open}</TableCell>
                <TableCell>{row.assigned}</TableCell>
                <TableCell>{row.rejected}</TableCell>
                <TableCell>{row.reassignRequested}</TableCell>
                <TableCell>{row.reassigned}</TableCell>
                <TableCell>{row.reopened}</TableCell>
                <TableCell>{row.resolved}</TableCell>
                <TableCell>{row.closed}</TableCell>
                <TableCell className="font-semibold">{row.total}</TableCell>
                <TableCell>
                  <span
                    className={`font-semibold ${
                      row.completionRate >= 70
                        ? 'text-success'
                        : row.completionRate >= 50
                        ? 'text-warning'
                        : 'text-destructive'
                    }`}
                  >
                    {row.completionRate}%
                  </span>
                </TableCell>
                <TableCell>
                  <span
                    className={`font-semibold ${
                      row.slaAchievement >= 80
                        ? 'text-success'
                        : row.slaAchievement >= 60
                        ? 'text-warning'
                        : 'text-destructive'
                    }`}
                  >
                    {row.slaAchievement}%
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}

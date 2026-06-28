import React, { useState, useMemo } from 'react';
import { Input } from '../ui/input';
import { Search } from 'lucide-react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import EmptyState from './EmptyState';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const DataTable = ({
  columns,
  data,
  searchKeys = [],
  filters = [],
  pageSize = 10,
  emptyTitle = 'No records found',
  emptyDescription = 'Try adjusting filters or add a new record.',
  toolbarActions,
  testId = 'datatable'
}) => {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [filterValues, setFilterValues] = useState(
    filters.reduce((acc, f) => ({ ...acc, [f.key]: 'all' }), {})
  );

  const filtered = useMemo(() => {
    let result = data;
    if (query && searchKeys.length) {
      const q = query.toLowerCase();
      result = result.filter(row => searchKeys.some(k => String(row[k] ?? '').toLowerCase().includes(q)));
    }
    filters.forEach(f => {
      const v = filterValues[f.key];
      if (v && v !== 'all') {
        result = result.filter(row => String(row[f.key]) === String(v));
      }
    });
    return result;
  }, [data, query, filterValues, searchKeys, filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageData = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  return (
    <Card className="bg-white border border-gray-200/80 rounded-xl overflow-hidden" data-testid={testId}>
      {/* Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 p-4 border-b border-gray-100">
        {searchKeys.length > 0 && (
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              data-testid={`${testId}-search`}
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPage(1); }}
              placeholder="Search..."
              className="pl-9 h-9 bg-gray-50 border-gray-200"
            />
          </div>
        )}
        {filters.map(f => (
          <Select key={f.key} value={filterValues[f.key]} onValueChange={(v) => { setFilterValues(prev => ({ ...prev, [f.key]: v })); setPage(1); }}>
            <SelectTrigger className="h-9 w-44 bg-white" data-testid={`${testId}-filter-${f.key}`}>
              <SelectValue placeholder={f.label} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All {f.label}</SelectItem>
              {f.options.map(opt => (
                <SelectItem key={opt} value={opt}>{opt}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        ))}
        {toolbarActions && <div className="md:ml-auto flex items-center gap-2">{toolbarActions}</div>}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {pageData.length === 0 ? (
          <EmptyState title={emptyTitle} description={emptyDescription} />
        ) : (
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/60 hover:bg-gray-50/60">
                {columns.map(col => (
                  <TableHead key={col.key} className={`text-[11px] uppercase tracking-wider font-semibold text-gray-600 ${col.align === 'right' ? 'text-right' : ''} ${col.className || ''}`}>
                    {col.label}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {pageData.map((row, i) => (
                <TableRow key={row.id || i} className="hover:bg-blue-50/30 transition-colors border-b border-gray-100">
                  {columns.map(col => (
                    <TableCell key={col.key} className={`text-sm py-3 ${col.align === 'right' ? 'text-right tabular-nums' : ''} ${col.cellClassName || ''}`}>
                      {col.render ? col.render(row) : row[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>

      {/* Pagination */}
      {filtered.length > 0 && (
        <div className="flex items-center justify-between gap-3 p-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Showing {(safePage - 1) * pageSize + 1}–{Math.min(safePage * pageSize, filtered.length)} of {filtered.length}
          </p>
          <div className="flex items-center gap-2">
            <Button
              data-testid={`${testId}-prev`}
              variant="outline" size="sm"
              disabled={safePage === 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
            ><ChevronLeft className="w-4 h-4" /></Button>
            <span className="text-sm font-medium tabular-nums">{safePage} / {totalPages}</span>
            <Button
              data-testid={`${testId}-next`}
              variant="outline" size="sm"
              disabled={safePage === totalPages}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            ><ChevronRight className="w-4 h-4" /></Button>
          </div>
        </div>
      )}
    </Card>
  );
};

export default DataTable;

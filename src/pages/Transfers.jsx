import React from 'react';
import { Plus, ArrowLeftRight } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import DataTable from '../components/common/DataTable';
import StatusBadge from '../components/common/StatusBadge';
import RowActions from '../components/common/RowActions';
import { Button } from '../components/ui/button';
import { transfers } from '../data/operations';
import { branches } from '../data/branches';
import { formatAED, formatDate } from '../utils/format';
import { toast } from 'sonner';

export default function Transfers() {
  const columns = [
    { key: 'id', label: 'Transfer #', render: (r) => <span className="font-mono font-medium text-blue-600">{r.id}</span> },
    { key: 'date', label: 'Date', render: (r) => formatDate(r.date) },
    { key: 'route', label: 'From → To', render: (r) => (
      <div className="flex items-center gap-2 text-sm">
        <span className="font-medium">{r.from}</span>
        <ArrowLeftRight className="w-3.5 h-3.5 text-blue-500" />
        <span className="font-medium">{r.to}</span>
      </div>
    ) },
    { key: 'requestedBy', label: 'Requested By' },
    { key: 'items', label: 'Items', align: 'right', render: (r) => <span className="font-mono font-semibold">{r.items}</span> },
    { key: 'total', label: 'Value', align: 'right', render: (r) => <span className="font-mono">{formatAED(r.total, { showSymbol: false })}</span> },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'actions', label: '', render: (r) => <RowActions testId={`transfer-actions-${r.id}`} onView={() => toast(`Viewing ${r.id}`)} onEdit={() => toast(`Editing ${r.id}`)} onPrint={() => toast(`Printing ${r.id}`)} /> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Branch Transfers"
        subtitle="Move stock between branches across the UAE"
        testIdPrefix="transfers"
        actions={<Button className="bg-[#0B1F4D] hover:bg-[#071635]" data-testid="transfers-new-btn"><Plus className="w-4 h-4 mr-1.5" />New Transfer</Button>}
      />
      <DataTable
        testId="transfers-table"
        columns={columns}
        data={transfers}
        searchKeys={['id', 'from', 'to', 'requestedBy']}
        filters={[
          { key: 'status', label: 'Status', options: ['Draft', 'Requested', 'Approved', 'Dispatched', 'In Transit', 'Received', 'Cancelled'] },
          { key: 'from', label: 'From', options: branches.map(b => b.name) },
        ]}
      />
    </div>
  );
}

import React from 'react';
import { Plus } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import RowActions from '../../components/common/RowActions';
import { Button } from '../../components/ui/button';
import { invoices } from '../../data/invoices';
import { branches } from '../../data/branches';
import { formatAED, formatDate } from '../../utils/format';
import { toast } from 'sonner';

export default function Invoices() {
  const columns = [
    { key: 'id', label: 'Invoice #', render: (r) => <span className="font-mono font-medium text-blue-600">{r.id}</span> },
    { key: 'date', label: 'Date', render: (r) => formatDate(r.date) },
    { key: 'dueDate', label: 'Due', render: (r) => <span className="text-xs">{formatDate(r.dueDate)}</span> },
    { key: 'customer', label: 'Customer', render: (r) => <span className="font-medium truncate max-w-[200px] block">{r.customer}</span> },
    { key: 'branch', label: 'Branch' },
    { key: 'total', label: 'Total', align: 'right', render: (r) => <span className="font-mono font-semibold">{formatAED(r.total, { showSymbol: false })}</span> },
    { key: 'balance', label: 'Balance', align: 'right', render: (r) => <span className={`font-mono ${r.balance > 0 ? 'text-amber-700 font-semibold' : 'text-gray-400'}`}>{formatAED(r.balance, { showSymbol: false })}</span> },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'actions', label: '', render: (r) => (
      <RowActions
        testId={`invoice-actions-${r.id}`}
        onView={() => toast(`Viewing ${r.id}`)}
        onEdit={() => toast(`Editing ${r.id}`)}
        onPrint={() => toast(`Printing ${r.id}`)}
        onDownload={() => toast(`Downloaded ${r.id}.pdf`)}
      />
    ) },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Sales Invoices"
        subtitle={`${invoices.length} invoices · Track payments and aging`}
        breadcrumbs={[{ label: 'Sales' }, { label: 'Invoices' }]}
        testIdPrefix="invoices"
        actions={
          <Button className="bg-[#0B1F4D] hover:bg-[#071635]" data-testid="invoices-new-btn">
            <Plus className="w-4 h-4 mr-1.5" />New Invoice
          </Button>
        }
      />
      <DataTable
        testId="invoices-table"
        columns={columns}
        data={invoices}
        searchKeys={['id', 'customer']}
        filters={[
          { key: 'status', label: 'Status', options: ['Paid', 'Partially Paid', 'Unpaid', 'Overdue', 'Cancelled'] },
          { key: 'branch', label: 'Branch', options: branches.map(b => b.name) },
        ]}
      />
    </div>
  );
}

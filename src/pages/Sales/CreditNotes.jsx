import React from 'react';
import { Plus } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import RowActions from '../../components/common/RowActions';
import { Button } from '../../components/ui/button';
import { creditNotes } from '../../data/invoices';
import { formatAED, formatDate } from '../../utils/format';
import { toast } from 'sonner';

export default function CreditNotes() {
  const columns = [
    { key: 'id', label: 'Credit Note #', render: (r) => <span className="font-mono font-medium text-blue-600">{r.id}</span> },
    { key: 'invoiceRef', label: 'Invoice Ref', render: (r) => <span className="font-mono text-xs text-gray-700">{r.invoiceRef}</span> },
    { key: 'date', label: 'Date', render: (r) => formatDate(r.date) },
    { key: 'customer', label: 'Customer', render: (r) => <span className="font-medium">{r.customer}</span> },
    { key: 'reason', label: 'Reason' },
    { key: 'amount', label: 'Amount', align: 'right', render: (r) => <span className="font-mono font-semibold text-red-600">-{formatAED(r.amount, { showSymbol: false })}</span> },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'actions', label: '', render: (r) => <RowActions testId={`cn-actions-${r.id}`} onView={() => toast(`Viewing ${r.id}`)} onPrint={() => toast(`Printing ${r.id}`)} /> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Credit Notes"
        subtitle={`Manage returns, refunds and pricing adjustments`}
        breadcrumbs={[{ label: 'Sales' }, { label: 'Credit Notes' }]}
        testIdPrefix="creditnotes"
        actions={<Button className="bg-[#0B1F4D] hover:bg-[#071635]" data-testid="cn-new-btn"><Plus className="w-4 h-4 mr-1.5" />New Credit Note</Button>}
      />
      <DataTable
        testId="cn-table"
        columns={columns}
        data={creditNotes}
        searchKeys={['id', 'customer', 'invoiceRef']}
        filters={[
          { key: 'status', label: 'Status', options: ['Issued', 'Approved'] },
          { key: 'reason', label: 'Reason', options: ['Damaged product', 'Wrong item delivered', 'Return accepted', 'Pricing correction'] },
        ]}
      />
    </div>
  );
}

import React from 'react';
import { Plus, FileText, Send, Edit, Eye, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import RowActions from '../../components/common/RowActions';
import { Button } from '../../components/ui/button';
import { quotations } from '../../data/invoices';
import { branches } from '../../data/branches';
import { formatAED, formatDate } from '../../utils/format';
import { toast } from 'sonner';

export default function Quotations() {
  const navigate = useNavigate();
  const columns = [
    { key: 'id', label: 'Quote #', render: (r) => <span className="font-mono font-medium text-blue-600">{r.id}</span> },
    { key: 'date', label: 'Date', render: (r) => formatDate(r.date) },
    { key: 'customer', label: 'Customer', render: (r) => <span className="font-medium">{r.customer}</span> },
    { key: 'salesperson', label: 'Salesperson' },
    { key: 'validUntil', label: 'Valid Until', render: (r) => <span className="text-xs">{formatDate(r.validUntil)}</span> },
    { key: 'total', label: 'Amount', align: 'right', render: (r) => <span className="font-mono font-semibold">{formatAED(r.total, { showSymbol: false })}</span> },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'actions', label: '', render: (r) => (
      <RowActions
        testId={`quote-actions-${r.id}`}
        onView={() => toast(`Viewing ${r.id}`)}
        onEdit={() => toast(`Editing ${r.id}`)}
        onPrint={() => toast(`Printing ${r.id}`)}
        onDownload={() => toast(`Downloaded ${r.id}.pdf`)}
        onDelete={() => toast.success(`${r.id} deleted`)}
      />
    ) },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Quotations"
        subtitle={`${quotations.length} quotations · Track from draft to invoice conversion`}
        breadcrumbs={[{ label: 'Sales' }, { label: 'Quotations' }]}
        testIdPrefix="quotations"
        actions={
          <Button className="bg-[#0B1F4D] hover:bg-[#071635]" onClick={() => toast('Open quotation form')} data-testid="quotations-new-btn">
            <Plus className="w-4 h-4 mr-1.5" />New Quotation
          </Button>
        }
      />

      <DataTable
        testId="quotations-table"
        columns={columns}
        data={quotations}
        searchKeys={['id', 'customer', 'salesperson']}
        filters={[
          { key: 'status', label: 'Status', options: ['Draft', 'Sent', 'Approved', 'Rejected', 'Expired', 'Converted to Invoice'] },
          { key: 'branch', label: 'Branch', options: branches.map(b => b.name) },
        ]}
      />
    </div>
  );
}

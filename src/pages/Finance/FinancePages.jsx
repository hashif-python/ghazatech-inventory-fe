import React from 'react';
import { Plus, FileDown } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import RowActions from '../../components/common/RowActions';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { paymentsReceived, paymentsMade } from '../../data/operations';
import { customers } from '../../data/customers';
import { invoices } from '../../data/invoices';
import { formatAED, formatDate } from '../../utils/format';
import { toast } from 'sonner';

export function PaymentsReceived() {
  const totalReceived = paymentsReceived.reduce((s, p) => s + p.amount, 0);
  const columns = [
    { key: 'id', label: 'Receipt #', render: (r) => <span className="font-mono font-medium text-blue-600">{r.id}</span> },
    { key: 'date', label: 'Date', render: (r) => formatDate(r.date) },
    { key: 'customer', label: 'Customer', render: (r) => <span className="font-medium">{r.customer}</span> },
    { key: 'invoiceRef', label: 'Invoice', render: (r) => <span className="font-mono text-xs">{r.invoiceRef}</span> },
    { key: 'method', label: 'Method' },
    { key: 'reference', label: 'Reference', render: (r) => <span className="font-mono text-xs text-gray-500">{r.reference}</span> },
    { key: 'amount', label: 'Amount', align: 'right', render: (r) => <span className="font-mono font-bold text-green-700">+{formatAED(r.amount, { showSymbol: false })}</span> },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'actions', label: '', render: (r) => <RowActions testId={`pr-actions-${r.id}`} onView={() => toast(`Viewing ${r.id}`)} onPrint={() => toast(`Printing ${r.id}`)} /> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payments Received"
        subtitle="All customer payments received against invoices"
        breadcrumbs={[{ label: 'Finance' }, { label: 'Payments Received' }]}
        testIdPrefix="pr"
        actions={<Button className="bg-[#0B1F4D] hover:bg-[#071635]" data-testid="pr-new-btn"><Plus className="w-4 h-4 mr-1.5" />Record Payment</Button>}
      />
      <Card className="bg-gradient-to-br from-green-50 to-green-100/40 border border-green-200 rounded-xl p-5 max-w-sm">
        <p className="text-xs uppercase tracking-wider text-green-700 font-semibold">Total Received (MTD)</p>
        <p className="font-heading text-3xl font-bold mt-2 text-green-900">{formatAED(totalReceived)}</p>
      </Card>
      <DataTable testId="pr-table" columns={columns} data={paymentsReceived} searchKeys={['id', 'customer', 'invoiceRef']} filters={[{ key: 'method', label: 'Method', options: ['Cash', 'Card', 'Bank Transfer', 'Cheque'] }]} />
    </div>
  );
}

export function PaymentsMade() {
  const totalPaid = paymentsMade.reduce((s, p) => s + p.amount, 0);
  const columns = [
    { key: 'id', label: 'Payment #', render: (r) => <span className="font-mono font-medium text-blue-600">{r.id}</span> },
    { key: 'date', label: 'Date', render: (r) => formatDate(r.date) },
    { key: 'supplier', label: 'Supplier', render: (r) => <span className="font-medium">{r.supplier}</span> },
    { key: 'billRef', label: 'Bill Ref', render: (r) => <span className="font-mono text-xs">{r.billRef}</span> },
    { key: 'method', label: 'Method' },
    { key: 'amount', label: 'Amount', align: 'right', render: (r) => <span className="font-mono font-bold text-red-600">-{formatAED(r.amount, { showSymbol: false })}</span> },
    { key: 'notes', label: 'Notes', render: (r) => <span className="text-xs text-gray-500">{r.notes}</span> },
    { key: 'actions', label: '', render: (r) => <RowActions testId={`pm-actions-${r.id}`} onView={() => toast(`Viewing ${r.id}`)} onPrint={() => toast(`Printing ${r.id}`)} /> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payments Made"
        subtitle="All supplier payments and bill settlements"
        breadcrumbs={[{ label: 'Finance' }, { label: 'Payments Made' }]}
        testIdPrefix="pm"
        actions={<Button className="bg-[#0B1F4D] hover:bg-[#071635]" data-testid="pm-new-btn"><Plus className="w-4 h-4 mr-1.5" />Record Payment</Button>}
      />
      <Card className="bg-gradient-to-br from-red-50 to-orange-100/40 border border-red-200 rounded-xl p-5 max-w-sm">
        <p className="text-xs uppercase tracking-wider text-red-700 font-semibold">Total Paid (MTD)</p>
        <p className="font-heading text-3xl font-bold mt-2 text-red-900">{formatAED(totalPaid)}</p>
      </Card>
      <DataTable testId="pm-table" columns={columns} data={paymentsMade} searchKeys={['id', 'supplier', 'billRef']} filters={[{ key: 'method', label: 'Method', options: ['Cash', 'Card', 'Bank Transfer', 'Cheque'] }]} />
    </div>
  );
}

export function Ledger() {
  const ledgerEntries = customers.flatMap(c => {
    const custInvoices = invoices.filter(i => i.customerId === c.id);
    return custInvoices.map(i => ({
      id: i.id,
      date: i.date,
      customer: c.name,
      type: 'Invoice',
      debit: i.total,
      credit: i.paid,
      balance: i.balance,
      reference: i.id
    }));
  });

  const columns = [
    { key: 'date', label: 'Date', render: (r) => formatDate(r.date) },
    { key: 'customer', label: 'Customer', render: (r) => <span className="font-medium">{r.customer}</span> },
    { key: 'type', label: 'Type' },
    { key: 'reference', label: 'Reference', render: (r) => <span className="font-mono text-xs text-blue-600">{r.reference}</span> },
    { key: 'debit', label: 'Debit', align: 'right', render: (r) => <span className="font-mono">{formatAED(r.debit, { showSymbol: false })}</span> },
    { key: 'credit', label: 'Credit', align: 'right', render: (r) => <span className="font-mono text-green-700">{r.credit ? formatAED(r.credit, { showSymbol: false }) : '-'}</span> },
    { key: 'balance', label: 'Balance', align: 'right', render: (r) => <span className="font-mono font-bold">{formatAED(r.balance, { showSymbol: false })}</span> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Customer Ledger" subtitle="Track all customer transactions in one place" breadcrumbs={[{ label: 'Finance' }, { label: 'Ledger' }]} testIdPrefix="ledger" />
      <DataTable testId="ledger-table" columns={columns} data={ledgerEntries} searchKeys={['customer', 'reference']} filters={[{ key: 'customer', label: 'Customer', options: customers.map(c => c.name) }]} pageSize={15} />
    </div>
  );
}

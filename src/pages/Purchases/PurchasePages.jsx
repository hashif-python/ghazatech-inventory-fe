import React from 'react';
import { Plus } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import RowActions from '../../components/common/RowActions';
import { Button } from '../../components/ui/button';
import { purchaseOrders, supplierBills } from '../../data/operations';
import { formatAED, formatDate } from '../../utils/format';
import { toast } from 'sonner';

export function PurchaseOrders() {
  const columns = [
    { key: 'id', label: 'PO #', render: (r) => <span className="font-mono font-medium text-blue-600">{r.id}</span> },
    { key: 'supplier', label: 'Supplier', render: (r) => <span className="font-medium">{r.supplier}</span> },
    { key: 'date', label: 'Order Date', render: (r) => formatDate(r.date) },
    { key: 'expectedDelivery', label: 'Expected', render: (r) => <span className="text-xs">{formatDate(r.expectedDelivery)}</span> },
    { key: 'total', label: 'Total', align: 'right', render: (r) => <span className="font-mono font-semibold">{formatAED(r.total, { showSymbol: false })}</span> },
    { key: 'payStatus', label: 'Payment', render: (r) => <StatusBadge status={r.payStatus} /> },
    { key: 'status', label: 'Order Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'actions', label: '', render: (r) => <RowActions testId={`po-actions-${r.id}`} onView={() => toast(`Viewing ${r.id}`)} onEdit={() => toast(`Editing ${r.id}`)} onPrint={() => toast(`Printing ${r.id}`)} /> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Purchase Orders"
        subtitle={`${purchaseOrders.length} purchase orders`}
        breadcrumbs={[{ label: 'Purchases' }, { label: 'Orders' }]}
        testIdPrefix="po"
        actions={<Button className="bg-[#0B1F4D] hover:bg-[#071635]" data-testid="po-new-btn"><Plus className="w-4 h-4 mr-1.5" />New PO</Button>}
      />
      <DataTable
        testId="po-table"
        columns={columns}
        data={purchaseOrders}
        searchKeys={['id', 'supplier']}
        filters={[{ key: 'status', label: 'Status', options: ['Draft', 'Sent', 'Partially Received', 'Received', 'Cancelled'] }]}
      />
    </div>
  );
}

export function SupplierBills() {
  const columns = [
    { key: 'id', label: 'Bill #', render: (r) => <span className="font-mono font-medium text-blue-600">{r.id}</span> },
    { key: 'supplier', label: 'Supplier', render: (r) => <span className="font-medium">{r.supplier}</span> },
    { key: 'date', label: 'Date', render: (r) => formatDate(r.date) },
    { key: 'dueDate', label: 'Due', render: (r) => <span className="text-xs">{formatDate(r.dueDate)}</span> },
    { key: 'amount', label: 'Amount', align: 'right', render: (r) => <span className="font-mono font-semibold">{formatAED(r.amount, { showSymbol: false })}</span> },
    { key: 'paid', label: 'Paid', align: 'right', render: (r) => <span className="font-mono text-green-700">{formatAED(r.paid, { showSymbol: false })}</span> },
    { key: 'balance', label: 'Balance', align: 'right', render: (r) => <span className={`font-mono font-semibold ${r.balance > 0 ? 'text-red-600' : 'text-gray-400'}`}>{formatAED(r.balance, { showSymbol: false })}</span> },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'actions', label: '', render: (r) => <RowActions testId={`bill-actions-${r.id}`} onView={() => toast(`Viewing ${r.id}`)} /> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Supplier Bills" subtitle="Track and pay supplier invoices" breadcrumbs={[{ label: 'Purchases' }, { label: 'Bills' }]} testIdPrefix="bills" />
      <DataTable testId="bills-table" columns={columns} data={supplierBills} searchKeys={['id', 'supplier']} filters={[{ key: 'status', label: 'Status', options: ['Paid', 'Partially Paid', 'Unpaid'] }]} />
    </div>
  );
}

export function GRN() {
  return (
    <div className="space-y-6">
      <PageHeader title="Goods Received Notes" subtitle="Receive deliveries against purchase orders" breadcrumbs={[{ label: 'Purchases' }, { label: 'GRN' }]} testIdPrefix="grn"
        actions={<Button className="bg-[#0B1F4D] hover:bg-[#071635]" data-testid="grn-new-btn"><Plus className="w-4 h-4 mr-1.5" />New GRN</Button>}
      />
      <DataTable
        testId="grn-table"
        columns={[
          { key: 'id', label: 'GRN #', render: () => <span className="font-mono text-blue-600 font-medium">GRN-2026-0028</span> },
          { key: 'poRef', label: 'PO Ref', render: () => <span className="font-mono text-xs">PO-2026-0041</span> },
          { key: 'supplier', label: 'Supplier', render: () => 'Dubai Computer Parts Trading' },
          { key: 'date', label: 'Received', render: () => formatDate('2026-02-08') },
          { key: 'items', label: 'Items', align: 'right', render: () => '12' },
          { key: 'damaged', label: 'Damaged', align: 'right', render: () => '0' },
          { key: 'status', label: 'Status', render: () => <StatusBadge status="Received" /> },
          { key: 'actions', label: '', render: () => <RowActions onView={() => toast('Viewing GRN')} /> },
        ]}
        data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
      />
    </div>
  );
}

export function SupplierReturns() {
  return (
    <div className="space-y-6">
      <PageHeader title="Supplier Returns" subtitle="Return defective items to suppliers" breadcrumbs={[{ label: 'Purchases' }, { label: 'Returns' }]} testIdPrefix="returns"
        actions={<Button className="bg-[#0B1F4D] hover:bg-[#071635]" data-testid="returns-new-btn"><Plus className="w-4 h-4 mr-1.5" />New Return</Button>}
      />
      <DataTable
        testId="returns-table"
        columns={[
          { key: 'id', label: 'Return #', render: () => <span className="font-mono text-blue-600 font-medium">SR-2026-0008</span> },
          { key: 'supplier', label: 'Supplier', render: () => 'Shenzhen Laptop Parts Co.' },
          { key: 'date', label: 'Date', render: () => formatDate('2026-02-04') },
          { key: 'items', label: 'Products', render: () => 'Dell 5400 Keyboard ×2' },
          { key: 'reason', label: 'Reason', render: () => 'Defective on arrival' },
          { key: 'amount', label: 'Amount', align: 'right', render: () => <span className="font-mono font-semibold text-red-600">-{formatAED(170, { showSymbol: false })}</span> },
          { key: 'status', label: 'Status', render: () => <StatusBadge status="Approved" /> },
          { key: 'actions', label: '', render: () => <RowActions onView={() => toast('Viewing return')} /> },
        ]}
        data={[{ id: 1 }, { id: 2 }]}
      />
    </div>
  );
}

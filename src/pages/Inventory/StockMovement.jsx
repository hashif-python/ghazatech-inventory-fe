import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import { Badge } from '../../components/ui/badge';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { stockMovements } from '../../data/operations';
import { branches } from '../../data/branches';

const typeColors = {
  'Purchase received': 'bg-green-100 text-green-700',
  'Sale completed': 'bg-blue-100 text-blue-700',
  'Stock transfer sent': 'bg-purple-100 text-purple-700',
  'Stock transfer received': 'bg-cyan-100 text-cyan-700',
  'Customer return': 'bg-amber-100 text-amber-700',
  'Supplier return': 'bg-orange-100 text-orange-700',
  'Manual stock adjustment': 'bg-gray-100 text-gray-700',
};

export default function StockMovement() {
  const columns = [
    { key: 'date', label: 'Date', render: (r) => <span className="font-mono text-xs">{r.date}</span> },
    { key: 'product', label: 'Product', render: (r) => <span className="font-medium">{r.product}</span> },
    { key: 'type', label: 'Movement Type', render: (r) => <Badge className={`${typeColors[r.type] || 'bg-gray-100 text-gray-700'} font-medium`} variant="outline">{r.type}</Badge> },
    { key: 'branch', label: 'Branch' },
    { key: 'ref', label: 'Reference', render: (r) => <span className="font-mono text-xs text-blue-600">{r.ref}</span> },
    {
      key: 'qty', label: 'Qty', align: 'right', render: (r) => (
        <span className={`inline-flex items-center gap-1 font-mono font-bold ${r.qty > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {r.qty > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
          {Math.abs(r.qty)}
        </span>
      )
    },
    { key: 'balance', label: 'Balance', align: 'right', render: (r) => <span className="font-mono">{r.balance}</span> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Stock Movement"
        subtitle="Complete audit trail of all inventory changes"
        breadcrumbs={[{ label: 'Inventory', to: '/inventory/products' }, { label: 'Stock Movement' }]}
        testIdPrefix="movement"
      />
      <DataTable
        testId="movement-table"
        columns={columns}
        data={stockMovements}
        searchKeys={['product', 'ref']}
        filters={[
          { key: 'branch', label: 'Branch', options: branches.map(b => b.name) },
          { key: 'type', label: 'Type', options: Object.keys(typeColors) }
        ]}
      />
    </div>
  );
}

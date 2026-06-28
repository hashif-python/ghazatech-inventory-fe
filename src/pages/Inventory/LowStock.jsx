import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { AlertTriangle, ShoppingBag } from 'lucide-react';
import { getLowStockProducts } from '../../data/products';
import { formatAED } from '../../utils/format';
import { toast } from 'sonner';

export default function LowStock() {
  const items = getLowStockProducts();

  const columns = [
    { key: 'name', label: 'Product', render: (r) => (
      <div>
        <div className="font-medium">{r.name}</div>
        <div className="text-[11px] text-gray-500 font-mono">{r.sku}</div>
      </div>
    ) },
    { key: 'branch', label: 'Branch' },
    { key: 'category', label: 'Category' },
    { key: 'stock', label: 'Current Stock', align: 'right', render: (r) => <span className="font-mono font-bold text-red-600">{r.stock}</span> },
    { key: 'reorder', label: 'Reorder Level', align: 'right', render: (r) => <span className="font-mono">{r.reorder}</span> },
    { key: 'alert', label: 'Alert', render: (r) => {
      const ratio = r.stock / r.reorder;
      return ratio === 0 ? <Badge className="bg-red-100 text-red-700 border-red-200" variant="outline">Out of Stock</Badge>
        : ratio < 0.5 ? <Badge className="bg-red-100 text-red-700 border-red-200" variant="outline">Critical</Badge>
        : <Badge className="bg-amber-100 text-amber-700 border-amber-200" variant="outline">Low</Badge>;
    } },
    { key: 'salePrice', label: 'Sale Price', align: 'right', render: (r) => <span className="font-mono">{formatAED(r.salePrice, { showSymbol: false })}</span> },
    { key: 'actions', label: '', render: (r) => (
      <Button size="sm" variant="outline" onClick={() => toast.success(`PO request created for ${r.name}`)} data-testid={`reorder-${r.id}`}>
        <ShoppingBag className="w-3.5 h-3.5 mr-1" /> Reorder
      </Button>
    ) },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Low Stock Report"
        subtitle={`${items.length} items below reorder level — restock recommended`}
        breadcrumbs={[{ label: 'Inventory', to: '/inventory/products' }, { label: 'Low Stock' }]}
        testIdPrefix="lowstock"
      />

      <div className="bg-amber-50/70 border border-amber-200 rounded-xl p-4 flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <h4 className="font-semibold text-amber-900 text-sm">Action Required</h4>
          <p className="text-xs text-amber-800 mt-0.5">The items below have stock at or below their reorder threshold. Generate purchase orders to avoid stock-outs.</p>
        </div>
      </div>

      <DataTable testId="lowstock-table" columns={columns} data={items} searchKeys={['name', 'sku']} />
    </div>
  );
}

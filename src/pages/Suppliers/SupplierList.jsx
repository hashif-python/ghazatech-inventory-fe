import React from 'react';
import { Plus, Building2, Mail, Phone } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import RowActions from '../../components/common/RowActions';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { suppliers } from '../../data/suppliers';
import { formatAED } from '../../utils/format';
import { toast } from 'sonner';

const categories = ['Local Supplier', 'UAE Distributor', 'China Supplier', 'Dubai Market Supplier', 'Manufacturer', 'Import Supplier'];

export default function SupplierList() {
  const columns = [
    { key: 'code', label: 'Code', render: (r) => <span className="font-mono text-xs font-medium">{r.code}</span> },
    { key: 'name', label: 'Supplier', render: (r) => (
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-purple-50 to-blue-50 border border-gray-100 flex items-center justify-center">
          <Building2 className="w-4 h-4 text-purple-600" />
        </div>
        <div>
          <div className="font-medium">{r.name}</div>
          <div className="text-[11px] text-gray-500">{r.contact}</div>
        </div>
      </div>
    ) },
    { key: 'category', label: 'Category', render: (r) => <Badge variant="outline" className="font-medium">{r.category}</Badge> },
    { key: 'country', label: 'Country' },
    { key: 'phone', label: 'Contact', render: (r) => <span className="font-mono text-xs">{r.phone}</span> },
    { key: 'trn', label: 'TRN', render: (r) => <span className="font-mono text-xs">{r.trn}</span> },
    { key: 'payable', label: 'Payable', align: 'right', render: (r) => <span className={`font-mono font-semibold ${r.payable > 0 ? 'text-red-600' : 'text-gray-400'}`}>{formatAED(r.payable, { showSymbol: false })}</span> },
    { key: 'totalPurchases', label: 'Total Purchases', align: 'right', render: (r) => <span className="font-mono">{formatAED(r.totalPurchases, { showSymbol: false })}</span> },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'actions', label: '', render: (r) => (
      <RowActions
        testId={`supplier-actions-${r.id}`}
        onView={() => toast(`Viewing ${r.name}`)}
        onEdit={() => toast(`Editing ${r.name}`)}
        onDelete={() => toast.success(`${r.name} deleted`)}
      />
    ) },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Suppliers / Vendors"
        subtitle={`${suppliers.length} suppliers · From UAE to China & India`}
        testIdPrefix="suppliers"
        actions={<Button className="bg-[#0B1F4D] hover:bg-[#071635]" data-testid="suppliers-add-btn"><Plus className="w-4 h-4 mr-1.5" />Add Supplier</Button>}
      />
      <DataTable
        testId="suppliers-table"
        columns={columns}
        data={suppliers}
        searchKeys={['name', 'code', 'contact', 'email']}
        filters={[
          { key: 'category', label: 'Category', options: categories },
          { key: 'country', label: 'Country', options: ['UAE', 'China', 'India'] },
        ]}
      />
    </div>
  );
}

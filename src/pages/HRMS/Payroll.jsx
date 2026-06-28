import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import RowActions from '../../components/common/RowActions';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Wallet, FileDown, Printer } from 'lucide-react';
import { payroll } from '../../data/operations';
import { formatAED } from '../../utils/format';
import { toast } from 'sonner';

export default function Payroll() {
  const pending = payroll.filter(p => p.status === 'Pending');
  const totalPending = pending.reduce((s, p) => s + p.net, 0);
  const paid = payroll.filter(p => p.status === 'Paid');
  const totalPaid = paid.reduce((s, p) => s + p.net, 0);

  const columns = [
    { key: 'id', label: 'Payroll #', render: (r) => <span className="font-mono font-medium text-blue-600">{r.id}</span> },
    { key: 'month', label: 'Month' },
    { key: 'employee', label: 'Employee', render: (r) => <span className="font-medium">{r.employee}</span> },
    { key: 'basic', label: 'Basic', align: 'right', render: (r) => <span className="font-mono">{formatAED(r.basic, { showSymbol: false })}</span> },
    { key: 'allowances', label: 'Allowances', align: 'right', render: (r) => <span className="font-mono">{formatAED(r.allowances, { showSymbol: false })}</span> },
    { key: 'overtime', label: 'OT', align: 'right', render: (r) => <span className="font-mono text-green-700">{r.overtime > 0 ? `+${formatAED(r.overtime, { showSymbol: false })}` : '-'}</span> },
    { key: 'deductions', label: 'Deductions', align: 'right', render: (r) => <span className="font-mono text-red-600">{r.deductions > 0 ? `-${formatAED(r.deductions, { showSymbol: false })}` : '-'}</span> },
    { key: 'net', label: 'Net Salary', align: 'right', render: (r) => <span className="font-mono font-bold text-[#0B1F4D]">{formatAED(r.net, { showSymbol: false })}</span> },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'actions', label: '', render: (r) => <RowActions testId={`payroll-actions-${r.id}`} onView={() => toast(`Viewing payslip ${r.id}`)} onPrint={() => toast(`Printing payslip ${r.id}`)} onDownload={() => toast(`Downloaded ${r.id}.pdf`)} /> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Payroll"
        subtitle="Process monthly payroll, salary slips and WPS submissions"
        breadcrumbs={[{ label: 'HRMS' }, { label: 'Payroll' }]}
        testIdPrefix="payroll"
        actions={
          <>
            <Button variant="outline" size="sm" data-testid="payroll-export-btn"><FileDown className="w-4 h-4 mr-1.5" />Export</Button>
            <Button className="bg-[#0B1F4D] hover:bg-[#071635]" data-testid="payroll-generate-btn"><Wallet className="w-4 h-4 mr-1.5" />Generate Payroll</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200 rounded-xl p-5">
          <p className="text-xs uppercase tracking-wider text-amber-700 font-semibold">Pending Payroll</p>
          <p className="font-heading text-3xl font-bold mt-2 text-amber-900">{formatAED(totalPending)}</p>
          <p className="text-xs text-amber-700/80 mt-1">{pending.length} employees · Feb 2026</p>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200 rounded-xl p-5">
          <p className="text-xs uppercase tracking-wider text-green-700 font-semibold">Paid This Cycle</p>
          <p className="font-heading text-3xl font-bold mt-2 text-green-900">{formatAED(totalPaid)}</p>
          <p className="text-xs text-green-700/80 mt-1">{paid.length} salaries · Jan 2026</p>
        </Card>
        <Card className="bg-white rounded-xl border border-gray-200/80 p-5">
          <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">YTD Total</p>
          <p className="font-heading text-3xl font-bold mt-2 text-[#0B1F4D]">{formatAED(totalPending + totalPaid)}</p>
          <p className="text-xs text-gray-500 mt-1">2026 fiscal year</p>
        </Card>
      </div>

      <DataTable
        testId="payroll-table"
        columns={columns}
        data={payroll}
        searchKeys={['employee', 'id']}
        filters={[{ key: 'status', label: 'Status', options: ['Pending', 'Paid'] }]}
      />
    </div>
  );
}

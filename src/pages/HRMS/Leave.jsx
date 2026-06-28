import React, { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import { Button } from '../../components/ui/button';
import { Plus, Check, X } from 'lucide-react';
import { leaveRequests as initial } from '../../data/operations';
import { formatDate } from '../../utils/format';
import { toast } from 'sonner';

const leaveTypes = ['Annual Leave', 'Sick Leave', 'Emergency Leave', 'Unpaid Leave', 'Maternity Leave', 'Paternity Leave'];

export default function Leave() {
  const [items, setItems] = useState(initial);

  const approve = (id) => { setItems(items.map(i => i.id === id ? { ...i, status: 'Approved' } : i)); toast.success('Leave approved'); };
  const reject = (id) => { setItems(items.map(i => i.id === id ? { ...i, status: 'Rejected' } : i)); toast.success('Leave rejected'); };

  const columns = [
    { key: 'id', label: 'Request #', render: (r) => <span className="font-mono font-medium text-blue-600">{r.id}</span> },
    { key: 'employee', label: 'Employee', render: (r) => (
      <div>
        <div className="font-medium">{r.employee}</div>
        <div className="text-[11px] text-gray-500 font-mono">{r.empId}</div>
      </div>
    ) },
    { key: 'type', label: 'Leave Type' },
    { key: 'start', label: 'From', render: (r) => formatDate(r.start) },
    { key: 'end', label: 'To', render: (r) => formatDate(r.end) },
    { key: 'days', label: 'Days', align: 'right', render: (r) => <span className="font-mono font-semibold">{r.days}</span> },
    { key: 'reason', label: 'Reason', render: (r) => <span className="text-xs text-gray-600">{r.reason}</span> },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'actions', label: '', render: (r) => r.status === 'Pending' ? (
      <div className="flex gap-1">
        <Button size="sm" variant="outline" className="h-7 px-2 text-green-700 border-green-300 hover:bg-green-50" onClick={() => approve(r.id)} data-testid={`leave-approve-${r.id}`}>
          <Check className="w-3.5 h-3.5" />
        </Button>
        <Button size="sm" variant="outline" className="h-7 px-2 text-red-700 border-red-300 hover:bg-red-50" onClick={() => reject(r.id)} data-testid={`leave-reject-${r.id}`}>
          <X className="w-3.5 h-3.5" />
        </Button>
      </div>
    ) : <span className="text-xs text-gray-400">-</span> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Leave Management"
        subtitle="Approve, reject and manage employee leave requests"
        breadcrumbs={[{ label: 'HRMS' }, { label: 'Leave' }]}
        testIdPrefix="leave"
        actions={<Button className="bg-[#0B1F4D] hover:bg-[#071635]" data-testid="leave-new-btn"><Plus className="w-4 h-4 mr-1.5" />Apply Leave</Button>}
      />
      <DataTable
        testId="leave-table"
        columns={columns}
        data={items}
        searchKeys={['employee', 'id']}
        filters={[
          { key: 'type', label: 'Type', options: leaveTypes },
          { key: 'status', label: 'Status', options: ['Pending', 'Approved', 'Rejected'] },
        ]}
      />
    </div>
  );
}

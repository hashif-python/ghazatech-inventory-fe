import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Clock, LogIn, LogOut, FileDown, Calendar } from 'lucide-react';
import { attendance } from '../../data/operations';
import { departments } from '../../data/employees';
import { toast } from 'sonner';

export default function Attendance() {
  const present = attendance.filter(a => a.status === 'Present' || a.status === 'Late').length;
  const onLeave = attendance.filter(a => a.status === 'On Leave').length;
  const halfDay = attendance.filter(a => a.status === 'Half Day').length;

  const columns = [
    { key: 'employee', label: 'Employee', render: (r) => (
      <div>
        <div className="font-medium">{r.employee}</div>
        <div className="text-[11px] text-gray-500 font-mono">{r.empId} · {r.dept}</div>
      </div>
    ) },
    { key: 'checkIn', label: 'Check-In', render: (r) => <span className="font-mono text-sm flex items-center gap-1"><LogIn className="w-3.5 h-3.5 text-green-600" />{r.checkIn}</span> },
    { key: 'checkOut', label: 'Check-Out', render: (r) => <span className="font-mono text-sm flex items-center gap-1"><LogOut className="w-3.5 h-3.5 text-red-500" />{r.checkOut}</span> },
    { key: 'hours', label: 'Hours', align: 'right', render: (r) => <span className="font-mono font-semibold">{r.hours.toFixed(2)}</span> },
    { key: 'late', label: 'Late', render: (r) => r.late ? <Badge variant="outline" className="bg-amber-100 text-amber-700 border-amber-200">Late</Badge> : <span className="text-xs text-gray-400">-</span> },
    { key: 'ot', label: 'Overtime', align: 'right', render: (r) => <span className="font-mono text-xs">{r.ot > 0 ? `+${r.ot.toFixed(2)}h` : '-'}</span> },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Attendance"
        subtitle="Daily attendance log with check-in/out times"
        breadcrumbs={[{ label: 'HRMS' }, { label: 'Attendance' }]}
        testIdPrefix="attendance"
        actions={
          <>
            <Button variant="outline" size="sm" data-testid="attendance-checkin-btn"><Clock className="w-4 h-4 mr-1.5" />My Check-In</Button>
            <Button variant="outline" size="sm" data-testid="attendance-export-btn"><FileDown className="w-4 h-4 mr-1.5" />Export</Button>
          </>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-white rounded-xl border border-gray-200/80 p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Present</p>
          <p className="font-heading text-2xl font-bold mt-1">{present}</p>
        </Card>
        <Card className="bg-white rounded-xl border border-gray-200/80 p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider">On Leave</p>
          <p className="font-heading text-2xl font-bold mt-1 text-amber-700">{onLeave}</p>
        </Card>
        <Card className="bg-white rounded-xl border border-gray-200/80 p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Half Day</p>
          <p className="font-heading text-2xl font-bold mt-1 text-blue-700">{halfDay}</p>
        </Card>
        <Card className="bg-white rounded-xl border border-gray-200/80 p-4">
          <p className="text-xs text-gray-500 uppercase tracking-wider">Avg. Hours</p>
          <p className="font-heading text-2xl font-bold mt-1">8.4</p>
        </Card>
      </div>

      <DataTable
        testId="attendance-table"
        columns={columns}
        data={attendance}
        searchKeys={['employee', 'empId']}
        filters={[
          { key: 'dept', label: 'Department', options: departments },
          { key: 'status', label: 'Status', options: ['Present', 'Late', 'On Leave', 'Half Day', 'Absent', 'Work From Home'] },
        ]}
      />
    </div>
  );
}

import React from 'react';
import PageHeader from '../components/common/PageHeader';
import DataTable from '../components/common/DataTable';
import { Badge } from '../components/ui/badge';
import { auditLogs } from '../data/operations';

const actionStyles = {
  Create: 'bg-green-100 text-green-700 border-green-200',
  Update: 'bg-blue-100 text-blue-700 border-blue-200',
  Delete: 'bg-red-100 text-red-700 border-red-200',
  Login: 'bg-purple-100 text-purple-700 border-purple-200',
};

export default function AuditLogs() {
  const columns = [
    { key: 'timestamp', label: 'Date & Time', render: (r) => <span className="font-mono text-xs">{r.timestamp}</span> },
    { key: 'user', label: 'User', render: (r) => (
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center text-[10px] font-semibold">
          {r.user.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </div>
        <span className="font-medium">{r.user}</span>
      </div>
    ) },
    { key: 'module', label: 'Module', render: (r) => <Badge variant="outline">{r.module}</Badge> },
    { key: 'action', label: 'Action', render: (r) => <Badge className={actionStyles[r.action] || 'bg-gray-100 text-gray-700'} variant="outline">{r.action}</Badge> },
    { key: 'description', label: 'Description', render: (r) => <span className="text-sm text-gray-700">{r.description}</span> },
    { key: 'branch', label: 'Branch', render: (r) => <span className="text-xs text-gray-600">{r.branch}</span> },
    { key: 'ip', label: 'IP', render: (r) => <span className="font-mono text-xs text-gray-500">{r.ip}</span> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader title="Audit Logs" subtitle="Track every action performed in the system for security and compliance" testIdPrefix="audit" />
      <DataTable
        testId="audit-table"
        columns={columns}
        data={auditLogs}
        searchKeys={['user', 'description', 'module']}
        filters={[
          { key: 'module', label: 'Module', options: ['Sales', 'Inventory', 'Finance', 'Purchase', 'HRMS', 'Settings'] },
          { key: 'action', label: 'Action', options: ['Create', 'Update', 'Delete', 'Login'] },
        ]}
        pageSize={15}
      />
    </div>
  );
}

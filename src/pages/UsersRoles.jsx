import React, { useState } from 'react';
import { Plus, Shield, Check } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import DataTable from '../components/common/DataTable';
import StatusBadge from '../components/common/StatusBadge';
import RowActions from '../components/common/RowActions';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { Card } from '../components/ui/card';
import { users, roles } from '../data/operations';
import { branches } from '../data/branches';
import { toast } from 'sonner';

const permissions = [
  { module: 'Dashboard', actions: ['View'] },
  { module: 'Inventory', actions: ['View', 'Create', 'Edit', 'Delete'] },
  { module: 'Sales', actions: ['View', 'Create', 'Edit', 'Delete', 'Approve'] },
  { module: 'Purchases', actions: ['View', 'Create', 'Edit', 'Delete', 'Approve'] },
  { module: 'Customers', actions: ['View', 'Create', 'Edit', 'Delete'] },
  { module: 'Suppliers', actions: ['View', 'Create', 'Edit', 'Delete'] },
  { module: 'HRMS', actions: ['View', 'Create', 'Edit', 'Delete', 'Approve Leave'] },
  { module: 'Finance', actions: ['View', 'Create', 'Edit', 'Delete'] },
  { module: 'Reports', actions: ['View', 'Export'] },
  { module: 'Settings', actions: ['View', 'Edit'] },
];

const rolePermissions = {
  'Super Admin': () => true,
  'Branch Manager': (m, a) => !['Settings'].includes(m) || a === 'View',
  'Sales Manager': (m, a) => ['Dashboard', 'Sales', 'Customers', 'Inventory', 'Reports'].includes(m),
  'Sales Executive': (m, a) => (['Sales', 'Customers'].includes(m) && a !== 'Delete') || (m === 'Dashboard' && a === 'View'),
  'Inventory Manager': (m, a) => ['Dashboard', 'Inventory', 'Reports'].includes(m),
  'Accountant': (m, a) => ['Dashboard', 'Finance', 'Reports'].includes(m),
  'HR Manager': (m, a) => ['Dashboard', 'HRMS', 'Reports'].includes(m),
  'Viewer': (m, a) => a === 'View',
};

export default function UsersRoles() {
  const [selectedRole, setSelectedRole] = useState('Super Admin');

  const userColumns = [
    { key: 'name', label: 'User', render: (r) => (
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center text-xs font-semibold">
          {r.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
        </div>
        <div>
          <div className="font-medium">{r.name}</div>
          <div className="text-[11px] text-gray-500">{r.email}</div>
        </div>
      </div>
    ) },
    { key: 'role', label: 'Role', render: (r) => <Badge className="bg-blue-100 text-blue-700 border-blue-200" variant="outline">{r.role}</Badge> },
    { key: 'branch', label: 'Branch' },
    { key: 'lastLogin', label: 'Last Login', render: (r) => <span className="font-mono text-xs">{r.lastLogin}</span> },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'actions', label: '', render: (r) => <RowActions testId={`user-actions-${r.id}`} onEdit={() => toast(`Editing ${r.name}`)} onDelete={() => toast.success('Deleted')} /> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Users & Roles"
        subtitle="Manage system users, roles and permission matrix"
        testIdPrefix="users-roles"
        actions={<Button className="bg-[#0B1F4D] hover:bg-[#071635]" data-testid="users-add-btn"><Plus className="w-4 h-4 mr-1.5" />Add User</Button>}
      />

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users" data-testid="tab-users">Users ({users.length})</TabsTrigger>
          <TabsTrigger value="roles" data-testid="tab-roles">Roles ({roles.length})</TabsTrigger>
          <TabsTrigger value="permissions" data-testid="tab-permissions">Permission Matrix</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <DataTable
            testId="users-table"
            columns={userColumns}
            data={users}
            searchKeys={['name', 'email', 'role']}
            filters={[
              { key: 'role', label: 'Role', options: roles },
              { key: 'status', label: 'Status', options: ['Active', 'Inactive'] },
              { key: 'branch', label: 'Branch', options: [...branches.map(b => b.name), 'All Branches'] },
            ]}
          />
        </TabsContent>

        <TabsContent value="roles">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map(r => (
              <Card key={r} className="bg-white border border-gray-200/80 rounded-xl p-5 hover:border-blue-300 transition-all cursor-pointer">
                <div className="flex items-start justify-between">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Shield className="w-5 h-5" />
                  </div>
                  <Badge variant="outline">{users.filter(u => u.role === r).length} users</Badge>
                </div>
                <h3 className="font-heading font-semibold mt-3">{r}</h3>
                <p className="text-xs text-gray-500 mt-1">System-defined role</p>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="permissions">
          <Card className="bg-white border border-gray-200/80 rounded-xl p-5">
            <div className="mb-4 flex flex-wrap gap-2">
              {roles.slice(0, 6).map(r => (
                <button
                  key={r}
                  onClick={() => setSelectedRole(r)}
                  data-testid={`role-select-${r.replace(/\s+/g, '-')}`}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium ${selectedRole === r ? 'bg-[#0B1F4D] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                >
                  {r}
                </button>
              ))}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[11px] uppercase tracking-wider text-gray-500 border-b border-gray-200">
                    <th className="text-left py-2 px-3 font-semibold">Module</th>
                    {['View', 'Create', 'Edit', 'Delete', 'Approve'].map(a => (
                      <th key={a} className="text-center py-2 px-3 font-semibold">{a}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {permissions.map(p => (
                    <tr key={p.module} className="border-b border-gray-100 hover:bg-blue-50/20">
                      <td className="py-3 px-3 font-medium">{p.module}</td>
                      {['View', 'Create', 'Edit', 'Delete', 'Approve'].map(a => {
                        const allowed = (rolePermissions[selectedRole] || (() => false))(p.module, a);
                        return (
                          <td key={a} className="py-3 px-3 text-center">
                            {allowed ? <Check className="w-4 h-4 text-green-600 inline" /> : <span className="text-gray-300">—</span>}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

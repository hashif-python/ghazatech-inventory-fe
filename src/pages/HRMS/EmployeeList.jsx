import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, FileDown, Eye, Edit, Trash2, Calendar, Plane, IdCard } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import RowActions from '../../components/common/RowActions';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription
} from '../../components/ui/sheet';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';
import { employees as initialEmployees, departments } from '../../data/employees';
import { branches } from '../../data/branches';
import { formatDate, expiryLevel, formatAED } from '../../utils/format';
import { toast } from 'sonner';

const ExpiryBadge = ({ date, label }) => {
  if (!date) return <span className="text-xs text-gray-400">-</span>;
  const e = expiryLevel(date);
  const cls = e.level === 'expired' ? 'bg-red-100 text-red-700 border-red-200' :
    e.level === 'critical' ? 'bg-red-100 text-red-700 border-red-200' :
    e.level === 'warning' ? 'bg-amber-100 text-amber-700 border-amber-200' :
    e.level === 'soon' ? 'bg-blue-100 text-blue-700 border-blue-200' :
    'bg-green-100 text-green-700 border-green-200';
  return (
    <div className="text-xs">
      <div className="font-mono">{formatDate(date)}</div>
      <Badge className={`${cls} mt-0.5 text-[10px]`} variant="outline">{e.label}</Badge>
    </div>
  );
};

export default function EmployeeList() {
  const [items, setItems] = useState(initialEmployees);
  const [selected, setSelected] = useState(null);
  const [open, setOpen] = useState(false);

  const handleView = (e) => { setSelected(e); setOpen(true); };

  const columns = [
    { key: 'employee', label: 'Employee', render: (r) => (
      <div className="flex items-center gap-3">
        <img src={r.photo} alt={r.name} className="w-9 h-9 rounded-full ring-2 ring-gray-100" />
        <div>
          <div className="font-medium">{r.name}</div>
          <div className="text-[11px] text-gray-500 font-mono">{r.id}</div>
        </div>
      </div>
    ) },
    { key: 'department', label: 'Department', render: (r) => <Badge variant="outline" className="font-medium">{r.department}</Badge> },
    { key: 'designation', label: 'Designation' },
    { key: 'branch', label: 'Branch' },
    { key: 'mobile', label: 'Mobile', render: (r) => <span className="font-mono text-xs">{r.mobile}</span> },
    { key: 'joinDate', label: 'Joined', render: (r) => formatDate(r.joinDate) },
    { key: 'visa', label: 'Visa Expiry', render: (r) => <ExpiryBadge date={r.visa.expiry} /> },
    { key: 'emiratesId', label: 'Emirates ID', render: (r) => <ExpiryBadge date={r.emiratesId.expiry} /> },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'actions', label: '', render: (r) => (
      <RowActions
        testId={`employee-actions-${r.id}`}
        onView={() => handleView(r)}
        onEdit={() => toast(`Edit ${r.name}`)}
        onDelete={() => { setItems(items.filter(e => e.id !== r.id)); toast.success('Deleted'); }}
      />
    ) },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Employees"
        subtitle={`${items.length} active employees · Manage details, documents and salary info`}
        breadcrumbs={[{ label: 'HRMS' }, { label: 'Employees' }]}
        testIdPrefix="employees"
        actions={
          <>
            <Button variant="outline" size="sm" data-testid="employees-export-btn"><FileDown className="w-4 h-4 mr-1.5" />Export</Button>
            <Button className="bg-[#0B1F4D] hover:bg-[#071635]" data-testid="employees-add-btn"><Plus className="w-4 h-4 mr-1.5" />Add Employee</Button>
          </>
        }
      />

      <DataTable
        testId="employees-table"
        columns={columns}
        data={items}
        searchKeys={['name', 'id', 'designation', 'department']}
        filters={[
          { key: 'department', label: 'Department', options: departments },
          { key: 'branch', label: 'Branch', options: branches.map(b => b.name) },
          { key: 'status', label: 'Status', options: ['Active', 'On Leave', 'Resigned', 'Terminated', 'Probation'] },
        ]}
      />

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent className="sm:max-w-2xl overflow-y-auto">
          {selected && (
            <>
              <SheetHeader>
                <div className="flex items-center gap-4">
                  <img src={selected.photo} alt={selected.name} className="w-16 h-16 rounded-full ring-4 ring-blue-100" />
                  <div>
                    <SheetTitle className="font-heading text-2xl">{selected.name}</SheetTitle>
                    <SheetDescription>
                      <span className="font-mono">{selected.id}</span> · {selected.designation} · {selected.department}
                    </SheetDescription>
                    <StatusBadge status={selected.status} className="mt-1.5" />
                  </div>
                </div>
              </SheetHeader>

              <Tabs defaultValue="overview" className="mt-6">
                <TabsList className="grid grid-cols-4 w-full">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="employment">Employment</TabsTrigger>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="alerts">Alerts</TabsTrigger>
                </TabsList>
                <TabsContent value="overview" className="space-y-3 text-sm pt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Info label="Gender" value={selected.gender} />
                    <Info label="DOB" value={formatDate(selected.dob)} />
                    <Info label="Nationality" value={selected.nationality} />
                    <Info label="Mobile" value={selected.mobile} />
                    <Info label="Personal Email" value={selected.personalEmail} />
                    <Info label="Work Email" value={selected.workEmail} />
                    <Info label="Address" value={selected.address} full />
                    <Info label="Emergency Contact" value={`${selected.emergencyName} (${selected.relationship})`} />
                    <Info label="Emergency Phone" value={selected.emergencyPhone} />
                  </div>
                </TabsContent>
                <TabsContent value="employment" className="space-y-3 text-sm pt-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Info label="Branch" value={selected.branch} />
                    <Info label="Department" value={selected.department} />
                    <Info label="Designation" value={selected.designation} />
                    <Info label="Manager" value={selected.manager} />
                    <Info label="Joining Date" value={formatDate(selected.joinDate)} />
                    <Info label="Employment Type" value={selected.employmentType} />
                    <Info label="Basic Salary" value={formatAED(selected.basicSalary)} />
                    <Info label="Allowances" value={formatAED(selected.allowances)} />
                    <Info label="Bank" value={selected.bank} />
                    <Info label="IBAN" value={selected.iban} mono />
                    <Info label="WPS Number" value={selected.wps} mono />
                  </div>
                </TabsContent>
                <TabsContent value="documents" className="space-y-3 text-sm pt-4">
                  <DocSection title="Passport" icon={Plane} doc={selected.passport} />
                  <DocSection title="Visa" icon={IdCard} doc={selected.visa} />
                  <DocSection title="Emirates ID" icon={IdCard} doc={selected.emiratesId} />
                  <DocSection title="Labour Card" icon={Calendar} doc={selected.labourCard} />
                  <DocSection title="Driving License" icon={Calendar} doc={selected.drivingLicense} />
                  <DocSection title="Medical Insurance" icon={Calendar} doc={selected.insurance} />
                </TabsContent>
                <TabsContent value="alerts" className="space-y-2 pt-4">
                  {[
                    { type: 'visa', date: selected.visa.expiry, label: 'Visa' },
                    { type: 'eid', date: selected.emiratesId.expiry, label: 'Emirates ID' },
                    { type: 'passport', date: selected.passport.expiry, label: 'Passport' },
                    { type: 'labour', date: selected.labourCard.expiry, label: 'Labour Card' },
                    { type: 'insurance', date: selected.insurance.expiry, label: 'Insurance' },
                  ].map(item => {
                    const e = expiryLevel(item.date);
                    if (e.level === 'valid') return null;
                    return (
                      <div key={item.type} className={`p-3 rounded-lg border ${e.level === 'expired' || e.level === 'critical' ? 'bg-red-50 border-red-200' : e.level === 'warning' ? 'bg-amber-50 border-amber-200' : 'bg-blue-50 border-blue-200'}`}>
                        <div className="font-medium text-sm">{item.label} {e.level === 'expired' ? 'expired' : `expires in ${e.days} days`}</div>
                        <div className="text-xs text-gray-600 mt-0.5">Expiry: {formatDate(item.date)}</div>
                      </div>
                    );
                  })}
                </TabsContent>
              </Tabs>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

const Info = ({ label, value, full, mono }) => (
  <div className={full ? 'col-span-2' : ''}>
    <div className="text-[10px] uppercase text-gray-500 tracking-wider">{label}</div>
    <div className={`text-sm font-medium text-gray-900 mt-0.5 ${mono ? 'font-mono text-xs' : ''}`}>{value || '-'}</div>
  </div>
);

const DocSection = ({ title, icon: Icon, doc }) => {
  const e = doc.expiry ? expiryLevel(doc.expiry) : null;
  const cls = !e ? 'bg-gray-100 text-gray-500' :
    e.level === 'expired' || e.level === 'critical' ? 'bg-red-100 text-red-700 border-red-200' :
    e.level === 'warning' ? 'bg-amber-100 text-amber-700 border-amber-200' :
    e.level === 'soon' ? 'bg-blue-100 text-blue-700 border-blue-200' :
    'bg-green-100 text-green-700 border-green-200';
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg border border-gray-200">
      <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <div className="font-medium text-sm">{title}</div>
        <div className="text-xs text-gray-500 font-mono">{doc.number || 'Not provided'}</div>
      </div>
      <div className="text-right">
        <div className="text-xs text-gray-500">Expires</div>
        <div className="text-xs font-mono">{doc.expiry ? formatDate(doc.expiry) : '-'}</div>
        {e && <Badge className={`${cls} text-[10px] mt-0.5`} variant="outline">{e.label}</Badge>}
      </div>
    </div>
  );
};

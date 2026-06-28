import React, { useMemo } from 'react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import { Button } from '../../components/ui/button';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Bell, FileDown, Plane, IdCard, Calendar, FileText } from 'lucide-react';
import { employees } from '../../data/employees';
import { formatDate, daysUntil } from '../../utils/format';

const docTypes = ['Visa', 'Passport', 'Emirates ID', 'Labour Card', 'Driving License', 'Medical Insurance'];

export default function DocumentExpiry() {
  const allDocs = useMemo(() => {
    const list = [];
    employees.forEach(e => {
      const docs = [
        { type: 'Visa', number: e.visa.number, expiry: e.visa.expiry },
        { type: 'Passport', number: e.passport.number, expiry: e.passport.expiry },
        { type: 'Emirates ID', number: e.emiratesId.number, expiry: e.emiratesId.expiry },
        { type: 'Labour Card', number: e.labourCard.number, expiry: e.labourCard.expiry },
        { type: 'Driving License', number: e.drivingLicense.number, expiry: e.drivingLicense.expiry },
        { type: 'Medical Insurance', number: e.insurance.number, expiry: e.insurance.expiry },
      ];
      docs.forEach(d => {
        if (!d.expiry) return;
        const days = daysUntil(d.expiry);
        const alertLevel = days < 0 ? 'Expired' :
          days <= 7 ? 'Expiring in 7 days' :
          days <= 30 ? 'Expiring in 30 days' :
          days <= 60 ? 'Expiring in 60 days' : 'Valid';
        list.push({
          id: `${e.id}-${d.type}`,
          employee: e.name,
          empId: e.id,
          department: e.department,
          photo: e.photo,
          docType: d.type,
          docNumber: d.number,
          expiry: d.expiry,
          daysRemaining: days,
          alertLevel,
        });
      });
    });
    return list.sort((a, b) => a.daysRemaining - b.daysRemaining);
  }, []);

  const expired = allDocs.filter(d => d.alertLevel === 'Expired').length;
  const within7 = allDocs.filter(d => d.alertLevel === 'Expiring in 7 days').length;
  const within30 = allDocs.filter(d => d.alertLevel === 'Expiring in 30 days').length;
  const within60 = allDocs.filter(d => d.alertLevel === 'Expiring in 60 days').length;

  const alertColor = (level) => {
    if (level === 'Expired') return 'bg-red-100 text-red-700 border-red-200';
    if (level === 'Expiring in 7 days') return 'bg-red-100 text-red-700 border-red-200';
    if (level === 'Expiring in 30 days') return 'bg-amber-100 text-amber-700 border-amber-200';
    if (level === 'Expiring in 60 days') return 'bg-blue-100 text-blue-700 border-blue-200';
    return 'bg-green-100 text-green-700 border-green-200';
  };

  const docIcon = (t) => t === 'Visa' || t === 'Passport' ? Plane : t.includes('License') || t.includes('ID') || t.includes('Card') ? IdCard : t === 'Medical Insurance' ? FileText : Calendar;

  const columns = [
    { key: 'employee', label: 'Employee', render: (r) => (
      <div className="flex items-center gap-3">
        <img src={r.photo} className="w-8 h-8 rounded-full" alt={r.employee} />
        <div>
          <div className="font-medium">{r.employee}</div>
          <div className="text-[11px] text-gray-500 font-mono">{r.empId}</div>
        </div>
      </div>
    ) },
    { key: 'department', label: 'Department', render: (r) => <Badge variant="outline">{r.department}</Badge> },
    { key: 'docType', label: 'Document', render: (r) => {
      const Icon = docIcon(r.docType);
      return (
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-blue-600" />
          <span className="font-medium">{r.docType}</span>
        </div>
      );
    } },
    { key: 'docNumber', label: 'Number', render: (r) => <span className="font-mono text-xs">{r.docNumber}</span> },
    { key: 'expiry', label: 'Expiry Date', render: (r) => <span className="font-mono text-xs">{formatDate(r.expiry)}</span> },
    { key: 'daysRemaining', label: 'Days', align: 'right', render: (r) => (
      <span className={`font-mono font-bold ${r.daysRemaining < 0 ? 'text-red-600' : r.daysRemaining <= 30 ? 'text-amber-700' : 'text-gray-700'}`}>
        {r.daysRemaining < 0 ? `${Math.abs(r.daysRemaining)}d ago` : `${r.daysRemaining}d`}
      </span>
    ) },
    { key: 'alertLevel', label: 'Alert', render: (r) => <Badge className={alertColor(r.alertLevel)} variant="outline">{r.alertLevel}</Badge> },
    { key: 'actions', label: '', render: (r) => <Button size="sm" variant="outline" className="h-7"><Bell className="w-3.5 h-3.5 mr-1" />Notify</Button> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Document Expiry Tracker"
        subtitle="Real-time monitoring of UAE legal document expiries"
        breadcrumbs={[{ label: 'HRMS' }, { label: 'Document Expiry' }]}
        testIdPrefix="expiry"
        actions={<Button variant="outline" size="sm" data-testid="expiry-export-btn"><FileDown className="w-4 h-4 mr-1.5" />Export Report</Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-red-50 to-red-100/50 border border-red-200 rounded-xl p-5">
          <p className="text-xs uppercase tracking-wider text-red-700 font-semibold">Expired</p>
          <p className="font-heading text-3xl font-bold mt-2 text-red-900">{expired}</p>
          <p className="text-xs text-red-700/80 mt-1">Immediate action needed</p>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-amber-50 border border-red-200 rounded-xl p-5">
          <p className="text-xs uppercase tracking-wider text-red-700 font-semibold">Within 7 days</p>
          <p className="font-heading text-3xl font-bold mt-2 text-red-900">{within7}</p>
          <p className="text-xs text-red-700/80 mt-1">Critical</p>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200 rounded-xl p-5">
          <p className="text-xs uppercase tracking-wider text-amber-700 font-semibold">Within 30 days</p>
          <p className="font-heading text-3xl font-bold mt-2 text-amber-900">{within30}</p>
          <p className="text-xs text-amber-700/80 mt-1">Plan renewal</p>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 rounded-xl p-5">
          <p className="text-xs uppercase tracking-wider text-blue-700 font-semibold">Within 60 days</p>
          <p className="font-heading text-3xl font-bold mt-2 text-blue-900">{within60}</p>
          <p className="text-xs text-blue-700/80 mt-1">Monitor</p>
        </Card>
      </div>

      <DataTable
        testId="expiry-table"
        columns={columns}
        data={allDocs}
        searchKeys={['employee', 'docNumber']}
        filters={[
          { key: 'docType', label: 'Document Type', options: docTypes },
          { key: 'alertLevel', label: 'Alert Level', options: ['Expired', 'Expiring in 7 days', 'Expiring in 30 days', 'Expiring in 60 days', 'Valid'] },
        ]}
        pageSize={15}
      />
    </div>
  );
}

import React, { useState } from 'react';
import { Plus, Users as UsersIcon, Mail, Phone, MapPin } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import RowActions from '../../components/common/RowActions';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from '../../components/ui/dialog';
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription
} from '../../components/ui/sheet';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '../../components/ui/select';
import { customers as initialCustomers } from '../../data/customers';
import { invoices } from '../../data/invoices';
import { formatAED, formatDate } from '../../utils/format';
import { toast } from 'sonner';

const customerTypes = ['Walk-in', 'Retail', 'Wholesale', 'Corporate'];

export default function CustomerList() {
  const [items, setItems] = useState(initialCustomers);
  const [open, setOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [selected, setSelected] = useState(null);
  const blank = { name: '', type: 'Retail', contact: '', phone: '', whatsapp: '', email: '', address: '', city: '', trn: '', creditLimit: 0, terms: 'Net 30', notes: '' };
  const [form, setForm] = useState(blank);

  const handleAdd = () => {
    if (!form.name) { toast.error('Customer name required'); return; }
    const id = `C-${1100 + items.length}`;
    setItems([{ id, code: `CUST-${String(items.length + 1).padStart(3, '0')}`, ...form, outstanding: 0, totalSales: 0, status: 'Active' }, ...items]);
    toast.success('Customer added');
    setOpen(false); setForm(blank);
  };

  const handleView = (row) => { setSelected(row); setDetailOpen(true); };

  const columns = [
    { key: 'code', label: 'Code', render: (r) => <span className="font-mono text-xs font-medium">{r.code}</span> },
    { key: 'name', label: 'Customer', render: (r) => (
      <div>
        <div className="font-medium text-gray-900">{r.name}</div>
        <div className="text-[11px] text-gray-500">{r.contact}</div>
      </div>
    ) },
    { key: 'type', label: 'Type', render: (r) => <Badge variant="outline" className="font-medium">{r.type}</Badge> },
    { key: 'phone', label: 'Phone', render: (r) => <span className="font-mono text-xs">{r.phone}</span> },
    { key: 'trn', label: 'TRN', render: (r) => <span className="font-mono text-xs text-gray-600">{r.trn}</span> },
    { key: 'creditLimit', label: 'Credit', align: 'right', render: (r) => <span className="font-mono">{formatAED(r.creditLimit, { showSymbol: false })}</span> },
    { key: 'outstanding', label: 'Outstanding', align: 'right', render: (r) => <span className={`font-mono font-semibold ${r.outstanding > 0 ? 'text-amber-700' : 'text-gray-400'}`}>{formatAED(r.outstanding, { showSymbol: false })}</span> },
    { key: 'totalSales', label: 'Total Sales', align: 'right', render: (r) => <span className="font-mono">{formatAED(r.totalSales, { showSymbol: false })}</span> },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    { key: 'actions', label: '', render: (r) => (
      <RowActions
        testId={`customer-actions-${r.id}`}
        onView={() => handleView(r)}
        onEdit={() => toast(`Edit ${r.name}`)}
        onDelete={() => { setItems(items.filter(c => c.id !== r.id)); toast.success('Deleted'); }}
      />
    ) },
  ];

  const customerInvoices = selected ? invoices.filter(i => i.customerId === selected.id) : [];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Customers"
        subtitle={`${items.length} customers across UAE`}
        testIdPrefix="customers"
        actions={
          <Button className="bg-[#0B1F4D] hover:bg-[#071635]" onClick={() => setOpen(true)} data-testid="customers-add-btn">
            <Plus className="w-4 h-4 mr-1.5" />Add Customer
          </Button>
        }
      />

      <DataTable
        testId="customers-table"
        columns={columns}
        data={items}
        searchKeys={['name', 'code', 'phone', 'email']}
        filters={[
          { key: 'type', label: 'Type', options: customerTypes },
          { key: 'status', label: 'Status', options: ['Active', 'Inactive'] },
        ]}
      />

      {/* Add Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Customer</DialogTitle>
            <DialogDescription>Create a new customer record with credit and contact information.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
            <div className="space-y-1.5 md:col-span-2">
              <Label>Customer Name *</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} data-testid="customer-form-name" />
            </div>
            <div className="space-y-1.5">
              <Label>Customer Type</Label>
              <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{customerTypes.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5"><Label>Contact Person</Label><Input value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>Mobile Number</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>WhatsApp</Label><Input value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>City</Label><Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} /></div>
            <div className="md:col-span-2 space-y-1.5"><Label>Address</Label><Textarea rows={2} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>TRN Number</Label><Input value={form.trn} onChange={(e) => setForm({ ...form, trn: e.target.value })} placeholder="15 digits" /></div>
            <div className="space-y-1.5"><Label>Credit Limit (AED)</Label><Input type="number" value={form.creditLimit} onChange={(e) => setForm({ ...form, creditLimit: e.target.value })} /></div>
            <div className="space-y-1.5"><Label>Payment Terms</Label>
              <Select value={form.terms} onValueChange={(v) => setForm({ ...form, terms: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Net 15">Net 15</SelectItem>
                  <SelectItem value="Net 30">Net 30</SelectItem>
                  <SelectItem value="Net 45">Net 45</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2 space-y-1.5"><Label>Notes</Label><Textarea rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleAdd} className="bg-[#0B1F4D] hover:bg-[#071635]" data-testid="customer-form-submit">Add Customer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Detail Sheet */}
      <Sheet open={detailOpen} onOpenChange={setDetailOpen}>
        <SheetContent className="sm:max-w-xl overflow-y-auto">
          {selected && (
            <>
              <SheetHeader>
                <SheetTitle className="font-heading text-2xl">{selected.name}</SheetTitle>
                <SheetDescription className="font-mono text-xs">{selected.code} · {selected.type}</SheetDescription>
              </SheetHeader>
              <div className="mt-6 space-y-5">
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-blue-50 rounded-lg p-3">
                    <p className="text-[10px] uppercase text-blue-700">Total Sales</p>
                    <p className="font-heading font-bold text-blue-900 mt-1">{formatAED(selected.totalSales)}</p>
                  </div>
                  <div className="bg-amber-50 rounded-lg p-3">
                    <p className="text-[10px] uppercase text-amber-700">Outstanding</p>
                    <p className="font-heading font-bold text-amber-900 mt-1">{formatAED(selected.outstanding)}</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-3">
                    <p className="text-[10px] uppercase text-green-700">Credit Limit</p>
                    <p className="font-heading font-bold text-green-900 mt-1">{formatAED(selected.creditLimit)}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-700"><Mail className="w-4 h-4 text-gray-400" />{selected.email}</div>
                  <div className="flex items-center gap-2 text-gray-700"><Phone className="w-4 h-4 text-gray-400" />{selected.phone}</div>
                  <div className="flex items-center gap-2 text-gray-700"><MapPin className="w-4 h-4 text-gray-400" />{selected.address}, {selected.city}</div>
                  <div className="text-xs text-gray-500">TRN: <span className="font-mono">{selected.trn}</span> · Terms: <strong>{selected.terms}</strong></div>
                </div>

                <div>
                  <h4 className="font-heading font-semibold text-sm mb-2">Recent Invoices</h4>
                  {customerInvoices.length === 0 ? (
                    <p className="text-xs text-gray-500">No invoices yet.</p>
                  ) : (
                    <div className="space-y-1.5">
                      {customerInvoices.map(inv => (
                        <div key={inv.id} className="flex items-center justify-between px-3 py-2 rounded-lg bg-gray-50">
                          <div>
                            <div className="font-mono text-xs text-blue-600">{inv.id}</div>
                            <div className="text-[11px] text-gray-500">{formatDate(inv.date)}</div>
                          </div>
                          <div className="text-right">
                            <div className="font-mono font-semibold">{formatAED(inv.total)}</div>
                            <StatusBadge status={inv.status} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

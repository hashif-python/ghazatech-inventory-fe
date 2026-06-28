import React, { useState } from 'react';
import { Plus, Receipt, FileDown } from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import DataTable from '../components/common/DataTable';
import RowActions from '../components/common/RowActions';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '../components/ui/select';
import { expenses as initial } from '../data/operations';
import { branches } from '../data/branches';
import { formatAED, formatDate } from '../utils/format';
import { toast } from 'sonner';

const expenseCategories = ['Shop Rent', 'Electricity', 'Internet', 'Employee Salary', 'Transportation', 'Delivery Charges', 'Office Supplies', 'Repair Charges', 'Marketing', 'Other Expenses'];

export default function Expenses() {
  const [items, setItems] = useState(initial);
  const [open, setOpen] = useState(false);
  const blank = { date: new Date().toISOString().slice(0, 10), category: '', branch: branches[0].name, amount: 0, paymentMethod: 'Cash', vendor: '', notes: '' };
  const [form, setForm] = useState(blank);

  const total = items.reduce((s, e) => s + e.amount, 0);

  const submit = () => {
    if (!form.category || !form.amount) { toast.error('Category and amount required'); return; }
    const id = `EXP-${String(146 + items.length).padStart(4, '0')}`;
    setItems([{ id, ...form, amount: Number(form.amount) }, ...items]);
    toast.success('Expense added');
    setOpen(false); setForm(blank);
  };

  const columns = [
    { key: 'id', label: 'Expense #', render: (r) => <span className="font-mono font-medium text-blue-600">{r.id}</span> },
    { key: 'date', label: 'Date', render: (r) => formatDate(r.date) },
    { key: 'category', label: 'Category', render: (r) => <Badge variant="outline" className="font-medium">{r.category}</Badge> },
    { key: 'vendor', label: 'Vendor/Payee', render: (r) => <span className="font-medium">{r.vendor}</span> },
    { key: 'branch', label: 'Branch' },
    { key: 'paymentMethod', label: 'Method' },
    { key: 'amount', label: 'Amount', align: 'right', render: (r) => <span className="font-mono font-bold text-red-600">-{formatAED(r.amount, { showSymbol: false })}</span> },
    { key: 'notes', label: 'Notes', render: (r) => <span className="text-xs text-gray-500 truncate max-w-[160px] inline-block">{r.notes}</span> },
    { key: 'actions', label: '', render: (r) => <RowActions testId={`exp-actions-${r.id}`} onView={() => toast(`Viewing ${r.id}`)} onEdit={() => toast(`Editing ${r.id}`)} onDelete={() => { setItems(items.filter(x => x.id !== r.id)); toast.success('Deleted'); }} /> },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Expenses"
        subtitle="Track shop rent, utilities, transportation and operational costs"
        testIdPrefix="expenses"
        actions={
          <>
            <Button variant="outline" size="sm" data-testid="expenses-export-btn"><FileDown className="w-4 h-4 mr-1.5" />Export</Button>
            <Button className="bg-[#0B1F4D] hover:bg-[#071635]" onClick={() => setOpen(true)} data-testid="expenses-add-btn"><Plus className="w-4 h-4 mr-1.5" />Add Expense</Button>
          </>
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-red-50 to-orange-100/40 border border-red-200 rounded-xl p-5">
          <p className="text-xs uppercase tracking-wider text-red-700 font-semibold">Total Expenses MTD</p>
          <p className="font-heading text-3xl font-bold mt-2 text-red-900">{formatAED(total)}</p>
          <p className="text-xs text-red-700/80 mt-1">{items.length} entries this month</p>
        </Card>
        <Card className="bg-white rounded-xl border border-gray-200/80 p-5">
          <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Highest Category</p>
          <p className="font-heading text-2xl font-bold mt-2">Shop Rent</p>
          <p className="text-xs text-gray-500 mt-1">{formatAED(18000)} this month</p>
        </Card>
        <Card className="bg-white rounded-xl border border-gray-200/80 p-5">
          <p className="text-xs uppercase tracking-wider text-gray-500 font-semibold">vs Last Month</p>
          <p className="font-heading text-2xl font-bold mt-2 text-amber-700">+2.1%</p>
          <p className="text-xs text-gray-500 mt-1">Slight increase</p>
        </Card>
      </div>

      <DataTable
        testId="expenses-table"
        columns={columns}
        data={items}
        searchKeys={['id', 'vendor', 'category']}
        filters={[
          { key: 'category', label: 'Category', options: expenseCategories },
          { key: 'branch', label: 'Branch', options: branches.map(b => b.name) },
          { key: 'paymentMethod', label: 'Method', options: ['Cash', 'Card', 'Bank Transfer', 'Credit Card'] },
        ]}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Add New Expense</DialogTitle>
            <DialogDescription>Record an operational expense.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
            <div className="space-y-1.5"><Label>Date *</Label><Input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} data-testid="expense-form-date" /></div>
            <div className="space-y-1.5">
              <Label>Category *</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger data-testid="expense-form-category"><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>{expenseCategories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Branch</Label>
              <Select value={form.branch} onValueChange={(v) => setForm({ ...form, branch: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{branches.map(b => <SelectItem key={b.id} value={b.name}>{b.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5"><Label>Amount (AED) *</Label><Input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} data-testid="expense-form-amount" /></div>
            <div className="space-y-1.5">
              <Label>Payment Method</Label>
              <Select value={form.paymentMethod} onValueChange={(v) => setForm({ ...form, paymentMethod: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cash">Cash</SelectItem>
                  <SelectItem value="Card">Card</SelectItem>
                  <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                  <SelectItem value="Credit Card">Credit Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5"><Label>Vendor / Payee</Label><Input value={form.vendor} onChange={(e) => setForm({ ...form, vendor: e.target.value })} /></div>
            <div className="md:col-span-2 space-y-1.5"><Label>Notes</Label><Textarea rows={2} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={submit} className="bg-[#0B1F4D] hover:bg-[#071635]" data-testid="expense-form-submit">Add Expense</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

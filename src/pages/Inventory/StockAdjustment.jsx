import React, { useState } from 'react';
import { Plus, ClipboardCheck } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '../../components/ui/select';
import { products } from '../../data/products';
import { toast } from 'sonner';

const reasons = [
  'Damaged item', 'Lost item', 'Physical count correction',
  'Return from customer', 'Return to supplier', 'Internal use', 'Opening stock adjustment'
];

export default function StockAdjustment() {
  const [form, setForm] = useState({ product: '', reason: '', type: 'decrease', qty: '', notes: '' });

  const submit = () => {
    if (!form.product || !form.reason || !form.qty) { toast.error('Please fill required fields'); return; }
    toast.success('Stock adjustment recorded', { description: `${form.type === 'increase' ? '+' : '-'}${form.qty} units` });
    setForm({ product: '', reason: '', type: 'decrease', qty: '', notes: '' });
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Stock Adjustment"
        subtitle="Adjust inventory for damage, loss, returns or physical count corrections"
        breadcrumbs={[{ label: 'Inventory', to: '/inventory/products' }, { label: 'Stock Adjustment' }]}
        testIdPrefix="adjustment"
      />

      <Card className="max-w-3xl bg-white rounded-xl border border-gray-200/80 p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
            <ClipboardCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-gray-900">New Adjustment</h3>
            <p className="text-xs text-gray-500">Changes are logged in stock movement history</p>
          </div>
        </div>

        <div className="space-y-5">
          <div className="space-y-1.5">
            <Label>Product *</Label>
            <Select value={form.product} onValueChange={(v) => setForm({ ...form, product: v })}>
              <SelectTrigger data-testid="adjustment-product"><SelectValue placeholder="Select product" /></SelectTrigger>
              <SelectContent>{products.map(p => <SelectItem key={p.id} value={p.name}>{p.name} ({p.sku})</SelectItem>)}</SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label>Adjustment Type *</Label>
              <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="increase">Increase (+)</SelectItem>
                  <SelectItem value="decrease">Decrease (-)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Quantity *</Label>
              <Input type="number" value={form.qty} onChange={(e) => setForm({ ...form, qty: e.target.value })} data-testid="adjustment-qty" />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label>Reason *</Label>
            <Select value={form.reason} onValueChange={(v) => setForm({ ...form, reason: v })}>
              <SelectTrigger data-testid="adjustment-reason"><SelectValue placeholder="Select reason" /></SelectTrigger>
              <SelectContent>{reasons.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
            </Select>
          </div>

          <div className="space-y-1.5">
            <Label>Notes</Label>
            <Textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} placeholder="Optional reference or context" />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline">Cancel</Button>
            <Button onClick={submit} className="bg-[#0B1F4D] hover:bg-[#071635]" data-testid="adjustment-submit">
              <Plus className="w-4 h-4 mr-1.5" /> Record Adjustment
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

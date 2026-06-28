import React, { useState } from 'react';
import { Plus, Package, FileDown, Pencil, Eye, Trash2, Image as ImageIcon } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import DataTable from '../../components/common/DataTable';
import StatusBadge from '../../components/common/StatusBadge';
import RowActions from '../../components/common/RowActions';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription
} from '../../components/ui/dialog';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Switch } from '../../components/ui/switch';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '../../components/ui/select';
import { products, categories, brands } from '../../data/products';
import { branches } from '../../data/branches';
import { suppliers } from '../../data/suppliers';
import { formatAED } from '../../utils/format';
import { toast } from 'sonner';

export default function ProductList() {
  const [items, setItems] = useState(products);
  const [open, setOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [selected, setSelected] = useState(null);

  const blank = {
    sku: '', name: '', brand: '', category: '', models: '', supplier: '',
    purchasePrice: '', salePrice: '', wholesalePrice: '', minPrice: '', stock: '',
    reorder: '', rack: '', warranty: '', description: '', branch: branches[0].name, status: 'Active'
  };
  const [form, setForm] = useState(blank);

  const openAdd = () => { setEditing(null); setForm(blank); setOpen(true); };
  const openEdit = (row) => {
    setEditing(row);
    setForm({ ...blank, ...row, models: (row.models || []).join(', ') });
    setOpen(true);
  };
  const handleView = (row) => { setSelected(row); setViewOpen(true); };
  const handleDelete = (row) => {
    setItems(items.filter(p => p.id !== row.id));
    toast.success(`Deleted ${row.name}`);
  };
  const handleSubmit = () => {
    if (!form.name || !form.sku) { toast.error('Name and SKU are required'); return; }
    const payload = {
      ...form,
      models: form.models ? form.models.split(',').map(s => s.trim()).filter(Boolean) : [],
      purchasePrice: Number(form.purchasePrice) || 0,
      salePrice: Number(form.salePrice) || 0,
      wholesalePrice: Number(form.wholesalePrice) || 0,
      stock: Number(form.stock) || 0,
      reorder: Number(form.reorder) || 0,
    };
    if (editing) {
      setItems(items.map(p => p.id === editing.id ? { ...p, ...payload } : p));
      toast.success('Product updated');
    } else {
      const id = `P-${1100 + items.length}`;
      setItems([{ id, ...payload }, ...items]);
      toast.success('Product added');
    }
    setOpen(false);
  };

  const columns = [
    {
      key: 'image', label: 'Product', render: (r) => (
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center shrink-0 border border-gray-100">
            <Package className="w-4 h-4 text-blue-600" />
          </div>
          <div className="min-w-0">
            <div className="font-medium text-gray-900 truncate max-w-[220px]">{r.name}</div>
            <div className="text-[11px] text-gray-500 font-mono">{r.sku}</div>
          </div>
        </div>
      )
    },
    { key: 'brand', label: 'Brand', render: (r) => <Badge variant="outline" className="font-medium">{r.brand}</Badge> },
    { key: 'category', label: 'Category', render: (r) => <span className="text-xs text-gray-700">{r.category}</span> },
    { key: 'branch', label: 'Branch', render: (r) => <span className="text-xs text-gray-700">{r.branch}</span> },
    { key: 'purchasePrice', label: 'Purchase', align: 'right', render: (r) => <span className="font-mono text-xs">{formatAED(r.purchasePrice, { showSymbol: false })}</span> },
    { key: 'salePrice', label: 'Sale Price', align: 'right', render: (r) => <span className="font-mono text-sm font-semibold">{formatAED(r.salePrice, { showSymbol: false })}</span> },
    {
      key: 'stock', label: 'Stock', align: 'right', render: (r) => {
        const low = r.stock <= r.reorder;
        return (
          <div className="text-right">
            <span className={`font-mono font-bold ${low ? 'text-red-600' : 'text-gray-900'}`}>{r.stock}</span>
            <div className="text-[10px] text-gray-400">reorder: {r.reorder}</div>
          </div>
        );
      }
    },
    { key: 'status', label: 'Status', render: (r) => <StatusBadge status={r.status} /> },
    {
      key: 'actions', label: '', render: (r) => (
        <RowActions
          testId={`product-actions-${r.id}`}
          onView={() => handleView(r)}
          onEdit={() => openEdit(r)}
          onDelete={() => handleDelete(r)}
        />
      )
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        subtitle={`${items.length} SKUs · Manage laptop spare-part inventory across all branches`}
        breadcrumbs={[{ label: 'Inventory', to: '/inventory/products' }, { label: 'Products' }]}
        testIdPrefix="products"
        actions={
          <>
            <Button variant="outline" size="sm" data-testid="products-export-btn"><FileDown className="w-4 h-4 mr-1.5" />Export</Button>
            <Button size="sm" className="bg-[#0B1F4D] hover:bg-[#071635]" onClick={openAdd} data-testid="products-add-btn">
              <Plus className="w-4 h-4 mr-1.5" />Add Product
            </Button>
          </>
        }
      />

      <DataTable
        testId="products-table"
        columns={columns}
        data={items}
        searchKeys={['name', 'sku', 'brand', 'category']}
        filters={[
          { key: 'category', label: 'Category', options: categories },
          { key: 'brand', label: 'Brand', options: brands },
          { key: 'branch', label: 'Branch', options: branches.map(b => b.name) },
          { key: 'status', label: 'Status', options: ['Active', 'Inactive'] },
        ]}
        pageSize={10}
      />

      {/* Add/Edit Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit Product' : 'Add New Product'}</DialogTitle>
            <DialogDescription>Maintain laptop spare-part details across branches.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-2">
            <div className="space-y-1.5">
              <Label>Product Name *</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} data-testid="product-form-name" placeholder="e.g. Dell Latitude 5400 Keyboard" />
            </div>
            <div className="space-y-1.5">
              <Label>SKU / Barcode *</Label>
              <Input value={form.sku} onChange={(e) => setForm({ ...form, sku: e.target.value })} data-testid="product-form-sku" placeholder="e.g. KB-DEL-5400" />
            </div>
            <div className="space-y-1.5">
              <Label>Brand</Label>
              <Select value={form.brand} onValueChange={(v) => setForm({ ...form, brand: v })}>
                <SelectTrigger data-testid="product-form-brand"><SelectValue placeholder="Select brand" /></SelectTrigger>
                <SelectContent>{brands.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Category</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger data-testid="product-form-category"><SelectValue placeholder="Select category" /></SelectTrigger>
                <SelectContent>{categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 md:col-span-2">
              <Label>Compatible Laptop Models (comma separated)</Label>
              <Input value={form.models} onChange={(e) => setForm({ ...form, models: e.target.value })} placeholder="e.g. Latitude 5400, 5410, 5420" />
            </div>
            <div className="space-y-1.5">
              <Label>Supplier</Label>
              <Select value={form.supplier} onValueChange={(v) => setForm({ ...form, supplier: v })}>
                <SelectTrigger><SelectValue placeholder="Select supplier" /></SelectTrigger>
                <SelectContent>{suppliers.map(s => <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Branch</Label>
              <Select value={form.branch} onValueChange={(v) => setForm({ ...form, branch: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{branches.map(b => <SelectItem key={b.id} value={b.name}>{b.name}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Purchase Price (AED)</Label>
              <Input type="number" value={form.purchasePrice} onChange={(e) => setForm({ ...form, purchasePrice: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Retail Price (AED)</Label>
              <Input type="number" value={form.salePrice} onChange={(e) => setForm({ ...form, salePrice: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Wholesale Price (AED)</Label>
              <Input type="number" value={form.wholesalePrice} onChange={(e) => setForm({ ...form, wholesalePrice: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Minimum Selling Price (AED)</Label>
              <Input type="number" value={form.minPrice} onChange={(e) => setForm({ ...form, minPrice: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Current Stock</Label>
              <Input type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Reorder Level</Label>
              <Input type="number" value={form.reorder} onChange={(e) => setForm({ ...form, reorder: e.target.value })} />
            </div>
            <div className="space-y-1.5">
              <Label>Rack / Shelf</Label>
              <Input value={form.rack} onChange={(e) => setForm({ ...form, rack: e.target.value })} placeholder="A1-12" />
            </div>
            <div className="space-y-1.5">
              <Label>Warranty Period</Label>
              <Input value={form.warranty} onChange={(e) => setForm({ ...form, warranty: e.target.value })} placeholder="6 months" />
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <Label>Product Image</Label>
              <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center hover:border-blue-300 cursor-pointer">
                <ImageIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-400 mt-0.5">PNG, JPG up to 2MB</p>
              </div>
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <Label>Description</Label>
              <Textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </div>
            <div className="md:col-span-2 flex items-center justify-between border-t pt-4">
              <Label>Active</Label>
              <Switch checked={form.status === 'Active'} onCheckedChange={(c) => setForm({ ...form, status: c ? 'Active' : 'Inactive' })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmit} className="bg-[#0B1F4D] hover:bg-[#071635]" data-testid="product-form-submit">{editing ? 'Save Changes' : 'Add Product'}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="max-w-2xl">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-blue-600" />
                  {selected.name}
                </DialogTitle>
                <DialogDescription className="font-mono text-xs">{selected.sku}</DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-2 gap-4 py-3 text-sm">
                <div><span className="text-gray-500">Brand:</span> <span className="font-medium">{selected.brand}</span></div>
                <div><span className="text-gray-500">Category:</span> <span className="font-medium">{selected.category}</span></div>
                <div><span className="text-gray-500">Branch:</span> <span className="font-medium">{selected.branch}</span></div>
                <div><span className="text-gray-500">Rack:</span> <span className="font-mono">{selected.rack}</span></div>
                <div><span className="text-gray-500">Purchase Price:</span> <span className="font-semibold">{formatAED(selected.purchasePrice)}</span></div>
                <div><span className="text-gray-500">Sale Price:</span> <span className="font-semibold text-blue-600">{formatAED(selected.salePrice)}</span></div>
                <div><span className="text-gray-500">Wholesale:</span> <span className="font-semibold">{formatAED(selected.wholesalePrice)}</span></div>
                <div><span className="text-gray-500">Warranty:</span> <span>{selected.warranty}</span></div>
                <div><span className="text-gray-500">Stock:</span> <span className="font-bold">{selected.stock} units</span></div>
                <div><span className="text-gray-500">Reorder Level:</span> <span>{selected.reorder} units</span></div>
                <div className="col-span-2">
                  <span className="text-gray-500">Compatible Models:</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {(selected.models || []).map(m => <Badge key={m} variant="outline">{m}</Badge>)}
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

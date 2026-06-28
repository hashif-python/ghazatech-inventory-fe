import React, { useState } from 'react';
import { QrCode, Printer, ScanLine } from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Checkbox } from '../../components/ui/checkbox';
import { products } from '../../data/products';
import { toast } from 'sonner';

export default function Barcode() {
  const [selected, setSelected] = useState([]);
  const [scanInput, setScanInput] = useState('');

  const toggle = (id) => setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  const printLabels = () => {
    if (!selected.length) { toast.error('Select at least one product'); return; }
    toast.success(`Printing ${selected.length} labels...`);
  };
  const handleScan = (e) => {
    e.preventDefault();
    const p = products.find(p => p.sku.toLowerCase() === scanInput.toLowerCase());
    if (p) { toast.success(`Scanned: ${p.name}`); setScanInput(''); }
    else toast.error('Product not found');
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Barcode / Labels"
        subtitle="Generate barcodes and print labels for spare parts"
        breadcrumbs={[{ label: 'Inventory', to: '/inventory/products' }, { label: 'Barcode' }]}
        testIdPrefix="barcode"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 bg-white rounded-xl border border-gray-200/80 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold">Select Products to Print</h3>
            <Button size="sm" onClick={printLabels} className="bg-[#0B1F4D] hover:bg-[#071635]" data-testid="barcode-print-btn">
              <Printer className="w-4 h-4 mr-1.5" /> Print Labels ({selected.length})
            </Button>
          </div>
          <div className="max-h-[420px] overflow-y-auto space-y-1.5 pr-2">
            {products.slice(0, 12).map(p => (
              <label key={p.id} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 cursor-pointer border border-gray-100">
                <Checkbox checked={selected.includes(p.id)} onCheckedChange={() => toggle(p.id)} data-testid={`barcode-select-${p.id}`} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{p.name}</div>
                  <div className="text-[11px] text-gray-500 font-mono">{p.sku}</div>
                </div>
                <div className="font-mono text-xs text-gray-400 tracking-widest">| ||| | || |||</div>
              </label>
            ))}
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="bg-white rounded-xl border border-gray-200/80 p-5">
            <div className="flex items-center gap-2 mb-3">
              <ScanLine className="w-4 h-4 text-blue-600" />
              <h3 className="font-heading font-semibold text-sm">Scan Barcode</h3>
            </div>
            <form onSubmit={handleScan} className="space-y-3">
              <Input
                value={scanInput}
                onChange={(e) => setScanInput(e.target.value)}
                placeholder="Enter or scan SKU..."
                data-testid="barcode-scan-input"
                autoFocus
              />
              <Button type="submit" className="w-full" variant="outline">Lookup Product</Button>
            </form>
          </Card>

          <Card className="bg-white rounded-xl border border-gray-200/80 p-5">
            <div className="flex items-center gap-2 mb-3">
              <QrCode className="w-4 h-4 text-purple-600" />
              <h3 className="font-heading font-semibold text-sm">Label Preview</h3>
            </div>
            <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
              <div className="font-mono text-2xl tracking-widest text-gray-700">||| || ||||</div>
              <div className="font-mono text-xs text-gray-500 mt-2">SKU-DEMO-001</div>
              <div className="text-xs mt-1">Sample Product</div>
              <div className="text-xs font-bold mt-1">AED 245.00</div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

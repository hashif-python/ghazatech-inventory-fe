import React, { useState, useMemo } from 'react';
import {
  Search, Plus, Minus, X, ShoppingCart, CreditCard, Banknote, Building, Wallet,
  Trash2, Pause, Printer, UserPlus, Package
} from 'lucide-react';
import PageHeader from '../../components/common/PageHeader';
import { Card } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Badge } from '../../components/ui/badge';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '../../components/ui/select';
import { ScrollArea } from '../../components/ui/scroll-area';
import { products, categories } from '../../data/products';
import { customers } from '../../data/customers';
import { formatAED } from '../../utils/format';
import { toast } from 'sonner';

const paymentMethods = [
  { id: 'cash', label: 'Cash', icon: Banknote, color: 'bg-green-50 text-green-600 border-green-200' },
  { id: 'card', label: 'Card', icon: CreditCard, color: 'bg-blue-50 text-blue-600 border-blue-200' },
  { id: 'bank', label: 'Bank Transfer', icon: Building, color: 'bg-purple-50 text-purple-600 border-purple-200' },
  { id: 'credit', label: 'Credit', icon: Wallet, color: 'bg-amber-50 text-amber-600 border-amber-200' },
];

export default function POS() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [customer, setCustomer] = useState('C-1005');
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('cash');

  const filtered = useMemo(() => products.filter(p =>
    (category === 'all' || p.category === category) &&
    (!query || p.name.toLowerCase().includes(query.toLowerCase()) || p.sku.toLowerCase().includes(query.toLowerCase()))
  ), [query, category]);

  const addToCart = (p) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === p.id);
      if (existing) return prev.map(i => i.id === p.id ? { ...i, qty: i.qty + 1 } : i);
      return [...prev, { id: p.id, name: p.name, sku: p.sku, price: p.salePrice, qty: 1 }];
    });
    toast.success(`${p.name} added`, { duration: 1500 });
  };
  const updateQty = (id, delta) => {
    setCart(prev => prev.map(i => i.id === id ? { ...i, qty: Math.max(1, i.qty + delta) } : i));
  };
  const removeItem = (id) => setCart(cart.filter(i => i.id !== id));
  const clearCart = () => { setCart([]); setDiscount(0); toast('Cart cleared'); };

  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const discountAmt = (subtotal * (discount || 0)) / 100;
  const afterDiscount = subtotal - discountAmt;
  const vat = afterDiscount * 0.05;
  const total = afterDiscount + vat;

  const completeSale = () => {
    if (!cart.length) { toast.error('Cart is empty'); return; }
    toast.success('Sale completed!', { description: `${formatAED(total)} paid via ${paymentMethod}` });
    setCart([]); setDiscount(0);
  };
  const holdSale = () => {
    if (!cart.length) return;
    toast.success('Sale held for later');
    setCart([]);
  };

  return (
    <div className="space-y-4 -mx-4 lg:-mx-6 xl:-mx-8 -mt-4 lg:-mt-6 xl:-mt-8">
      <div className="px-4 lg:px-6 xl:px-8 pt-4 lg:pt-6 xl:pt-8">
        <PageHeader
          title="Direct Sale (POS)"
          subtitle="Walk-in customer checkout — fast, no quotation needed"
          breadcrumbs={[{ label: 'Sales' }, { label: 'POS' }]}
          testIdPrefix="pos"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 px-4 lg:px-6 xl:px-8 pb-4 lg:pb-6 xl:pb-8">
        {/* Product picker */}
        <div className="lg:col-span-3 space-y-4">
          <Card className="bg-white rounded-xl border border-gray-200/80 p-4">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search by name, SKU, or scan barcode..."
                  className="pl-9 h-10 bg-gray-50"
                  data-testid="pos-product-search"
                />
              </div>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="md:w-48 h-10" data-testid="pos-category-filter">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </Card>

          <ScrollArea className="h-[calc(100vh-280px)]">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 pr-2">
              {filtered.map(p => (
                <button
                  key={p.id}
                  onClick={() => addToCart(p)}
                  data-testid={`pos-product-${p.id}`}
                  className="group bg-white border border-gray-200 rounded-xl p-3 text-left hover:border-blue-400 hover:shadow-md transition-all"
                >
                  <div className="aspect-square rounded-lg bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center mb-2 border border-gray-100">
                    <Package className="w-8 h-8 text-blue-500" strokeWidth={1.5} />
                  </div>
                  <div className="text-[11px] text-gray-500 font-mono">{p.sku}</div>
                  <div className="text-xs font-medium text-gray-900 line-clamp-2 mt-0.5 min-h-[2rem]">{p.name}</div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="font-heading font-bold text-blue-600 text-sm">{formatAED(p.salePrice, { showSymbol: false, decimals: 0 })}</span>
                    <Badge variant="outline" className={`text-[10px] ${p.stock <= p.reorder ? 'text-red-600 border-red-200' : 'text-gray-600'}`}>
                      {p.stock} pcs
                    </Badge>
                  </div>
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Cart */}
        <div className="lg:col-span-2">
          <Card className="bg-white rounded-xl border border-gray-200/80 flex flex-col h-[calc(100vh-160px)] sticky top-20">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5 text-blue-600" />
                <h3 className="font-heading font-semibold">Current Sale</h3>
                <Badge variant="secondary">{cart.length} items</Badge>
              </div>
              <Button variant="ghost" size="icon" onClick={clearCart} className="h-7 w-7 text-gray-500 hover:text-red-600" data-testid="pos-clear-cart">
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>

            {/* Customer */}
            <div className="p-4 border-b border-gray-100">
              <Label className="text-xs text-gray-500">Customer</Label>
              <div className="flex gap-2 mt-1">
                <Select value={customer} onValueChange={setCustomer}>
                  <SelectTrigger className="flex-1" data-testid="pos-customer-select">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {customers.map(c => <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon" data-testid="pos-add-customer" onClick={() => toast('Add customer modal')}>
                  <UserPlus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Items */}
            <ScrollArea className="flex-1 px-4 py-3">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-12">
                  <ShoppingCart className="w-12 h-12 text-gray-300 mb-3" strokeWidth={1.2} />
                  <p className="text-sm font-medium text-gray-700">Cart is empty</p>
                  <p className="text-xs text-gray-500 mt-0.5">Tap products to add them</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {cart.map(item => (
                    <div key={item.id} className="flex items-center gap-2 p-2 rounded-lg border border-gray-100 hover:border-gray-200 bg-white">
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium truncate">{item.name}</div>
                        <div className="text-[11px] text-gray-500 font-mono">{item.sku} · {formatAED(item.price, { showSymbol: false })}</div>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center" data-testid={`pos-decrease-${item.id}`}>
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-mono font-semibold w-6 text-center text-sm">{item.qty}</span>
                        <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 flex items-center justify-center" data-testid={`pos-increase-${item.id}`}>
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <div className="w-20 text-right font-mono font-semibold text-sm tabular-nums">
                        {formatAED(item.price * item.qty, { showSymbol: false })}
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>

            {/* Totals + Payment */}
            <div className="border-t border-gray-100 p-4 space-y-3 bg-gray-50/40">
              <div className="flex items-center gap-2">
                <Label className="text-xs text-gray-500 w-20">Discount %</Label>
                <Input
                  type="number" min={0} max={100}
                  value={discount}
                  onChange={(e) => setDiscount(Number(e.target.value) || 0)}
                  className="h-8 w-20"
                  data-testid="pos-discount"
                />
              </div>

              <div className="space-y-1 text-sm tabular-nums">
                <div className="flex justify-between"><span className="text-gray-500">Subtotal</span><span>{formatAED(subtotal, { showSymbol: false })}</span></div>
                {discount > 0 && <div className="flex justify-between text-red-600"><span>Discount ({discount}%)</span><span>-{formatAED(discountAmt, { showSymbol: false })}</span></div>}
                <div className="flex justify-between"><span className="text-gray-500">VAT (5%)</span><span>{formatAED(vat, { showSymbol: false })}</span></div>
                <div className="flex justify-between pt-2 mt-1 border-t border-gray-200">
                  <span className="font-heading font-bold">Total</span>
                  <span className="font-heading font-bold text-lg text-[#0B1F4D]">{formatAED(total)}</span>
                </div>
              </div>

              <div>
                <Label className="text-xs text-gray-500">Payment Method</Label>
                <div className="grid grid-cols-2 gap-2 mt-1.5">
                  {paymentMethods.map(m => (
                    <button
                      key={m.id}
                      onClick={() => setPaymentMethod(m.id)}
                      data-testid={`pos-payment-${m.id}`}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 text-sm font-medium transition-all ${paymentMethod === m.id ? m.color : 'border-gray-200 text-gray-600 bg-white hover:border-gray-300'}`}
                    >
                      <m.icon className="w-4 h-4" />{m.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1">
                <Button variant="outline" size="sm" onClick={holdSale} data-testid="pos-hold-btn">
                  <Pause className="w-3.5 h-3.5 mr-1" />Hold
                </Button>
                <Button variant="outline" size="sm" data-testid="pos-print-btn">
                  <Printer className="w-3.5 h-3.5 mr-1" />Print
                </Button>
                <Button
                  size="sm"
                  onClick={completeSale}
                  className="bg-green-600 hover:bg-green-700 text-white"
                  data-testid="pos-complete-btn"
                >Complete</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

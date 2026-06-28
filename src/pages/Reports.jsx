import React from 'react';
import {
  FileSpreadsheet, FileBarChart, TrendingUp, Users, Building, Package,
  Wallet, AlertTriangle, Calendar, Clock, DollarSign, FileDown, ChevronRight
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Badge } from '../components/ui/badge';
import { toast } from 'sonner';

const reports = [
  { id: 'sales', title: 'Sales Report', desc: 'Complete sales analysis by period', icon: TrendingUp, color: 'bg-blue-50 text-blue-600', category: 'Sales' },
  { id: 'sales-customer', title: 'Sales by Customer', desc: 'Customer-wise revenue breakdown', icon: Users, color: 'bg-blue-50 text-blue-600', category: 'Sales' },
  { id: 'sales-product', title: 'Sales by Product', desc: 'Product-level sales performance', icon: Package, color: 'bg-blue-50 text-blue-600', category: 'Sales' },
  { id: 'sales-category', title: 'Sales by Category', desc: 'Category-wise revenue mix', icon: FileBarChart, color: 'bg-blue-50 text-blue-600', category: 'Sales' },
  { id: 'salesperson', title: 'Salesperson Performance', desc: 'Top performers analysis', icon: TrendingUp, color: 'bg-blue-50 text-blue-600', category: 'Sales' },

  { id: 'purchase', title: 'Purchase Report', desc: 'All purchase transactions', icon: FileBarChart, color: 'bg-purple-50 text-purple-600', category: 'Purchase' },
  { id: 'purchase-supplier', title: 'Purchase by Supplier', desc: 'Supplier-wise spending', icon: Building, color: 'bg-purple-50 text-purple-600', category: 'Purchase' },

  { id: 'inventory', title: 'Inventory Valuation', desc: 'Current stock value by branch', icon: Package, color: 'bg-green-50 text-green-600', category: 'Inventory' },
  { id: 'lowstock', title: 'Low Stock Report', desc: 'Items below reorder level', icon: AlertTriangle, color: 'bg-green-50 text-green-600', category: 'Inventory' },
  { id: 'stock-movement', title: 'Stock Movement', desc: 'In-out movement history', icon: FileBarChart, color: 'bg-green-50 text-green-600', category: 'Inventory' },
  { id: 'branch-stock', title: 'Branch Stock Report', desc: 'Stock distribution across branches', icon: Package, color: 'bg-green-50 text-green-600', category: 'Inventory' },

  { id: 'profit', title: 'Profit Margin Report', desc: 'Product-level profitability', icon: DollarSign, color: 'bg-amber-50 text-amber-600', category: 'Finance' },
  { id: 'expense', title: 'Expense Report', desc: 'Operational expense breakdown', icon: Wallet, color: 'bg-amber-50 text-amber-600', category: 'Finance' },
  { id: 'receivable', title: 'Customer Outstanding', desc: 'Receivables aging report', icon: DollarSign, color: 'bg-amber-50 text-amber-600', category: 'Finance' },
  { id: 'payable', title: 'Supplier Payables', desc: 'Payables aging report', icon: DollarSign, color: 'bg-amber-50 text-amber-600', category: 'Finance' },

  { id: 'attendance', title: 'Attendance Report', desc: 'Employee attendance summary', icon: Clock, color: 'bg-pink-50 text-pink-600', category: 'HRMS' },
  { id: 'leave', title: 'Leave Report', desc: 'Leave balance and history', icon: Calendar, color: 'bg-pink-50 text-pink-600', category: 'HRMS' },
  { id: 'payroll', title: 'Payroll Report', desc: 'Monthly salary processing', icon: Wallet, color: 'bg-pink-50 text-pink-600', category: 'HRMS' },
  { id: 'visa-expiry', title: 'Document Expiry Report', desc: 'Visa / Passport / Emirates ID', icon: AlertTriangle, color: 'bg-pink-50 text-pink-600', category: 'HRMS' },
];

const categories = ['All', 'Sales', 'Purchase', 'Inventory', 'Finance', 'HRMS'];

export default function Reports() {
  const [filter, setFilter] = React.useState('All');
  const filtered = filter === 'All' ? reports : reports.filter(r => r.category === filter);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        subtitle="Generate detailed reports across sales, inventory, finance and HR"
        testIdPrefix="reports"
      />

      <div className="flex flex-wrap gap-2">
        {categories.map(c => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            data-testid={`report-filter-${c.toLowerCase()}`}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${filter === c ? 'bg-[#0B1F4D] text-white' : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-300'}`}
          >
            {c} {c === 'All' && <Badge variant="secondary" className="ml-1.5 text-[10px]">{reports.length}</Badge>}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(r => (
          <Card
            key={r.id}
            className="bg-white border border-gray-200/80 rounded-xl p-5 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer group"
            onClick={() => toast.success(`Opening ${r.title}`)}
            data-testid={`report-card-${r.id}`}
          >
            <div className={`w-12 h-12 rounded-xl ${r.color} flex items-center justify-center mb-3 group-hover:scale-105 transition-transform`}>
              <r.icon className="w-5 h-5" strokeWidth={1.8} />
            </div>
            <h3 className="font-heading font-semibold text-gray-900">{r.title}</h3>
            <p className="text-xs text-gray-500 mt-1 leading-relaxed">{r.desc}</p>
            <div className="flex items-center justify-between mt-4">
              <Badge variant="outline" className="text-[10px]">{r.category}</Badge>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
            </div>
          </Card>
        ))}
      </div>

      {/* Sample filter card */}
      <Card className="bg-white border border-gray-200/80 rounded-xl p-5">
        <h3 className="font-heading font-semibold mb-4">Quick Report Builder</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div>
            <Label className="text-xs">From Date</Label>
            <Input type="date" defaultValue="2026-02-01" className="mt-1" />
          </div>
          <div>
            <Label className="text-xs">To Date</Label>
            <Input type="date" defaultValue="2026-02-08" className="mt-1" />
          </div>
          <div>
            <Label className="text-xs">Branch</Label>
            <Input defaultValue="All Branches" className="mt-1" />
          </div>
          <div className="flex items-end gap-2">
            <Button variant="outline" className="flex-1"><FileDown className="w-4 h-4 mr-1.5" />Excel</Button>
            <Button className="flex-1 bg-[#0B1F4D] hover:bg-[#071635]"><FileSpreadsheet className="w-4 h-4 mr-1.5" />PDF</Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

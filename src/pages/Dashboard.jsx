import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Wallet, TrendingUp, ShoppingCart, ShoppingBag, ArrowDownLeft, ArrowUpRight,
  Receipt, PackageX, FileText, Plus, FileSpreadsheet, UserPlus, PackagePlus,
  ArrowLeftRight, UsersRound, Banknote
} from 'lucide-react';
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import PageHeader from '../components/common/PageHeader';
import StatCard from '../components/common/StatCard';
import ChartCard from '../components/common/ChartCard';
import StatusBadge from '../components/common/StatusBadge';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { formatAED, formatNumber, formatDate } from '../utils/format';
import { kpis, monthlySalesPurchases, stockByBranch, topSelling, salesByCategory, recentActivities } from '../data/dashboardData';
import { invoices } from '../data/invoices';
import { getLowStockProducts } from '../data/products';
import { transfers } from '../data/operations';

const CHART_COLORS = ['#2563EB', '#6D4AFF', '#22C55E', '#F59E0B', '#EF4444', '#06B6D4'];

const quickActions = [
  { icon: FileText, label: 'New Quotation', color: 'bg-blue-50 text-blue-600', to: '/sales/quotations' },
  { icon: ShoppingCart, label: 'Direct Sale', color: 'bg-purple-50 text-purple-600', to: '/sales/pos' },
  { icon: FileSpreadsheet, label: 'Create Invoice', color: 'bg-green-50 text-green-600', to: '/sales/invoices' },
  { icon: UserPlus, label: 'Add Customer', color: 'bg-amber-50 text-amber-600', to: '/customers' },
  { icon: PackagePlus, label: 'Add Product', color: 'bg-cyan-50 text-cyan-600', to: '/inventory/products' },
  { icon: ShoppingBag, label: 'Purchase Order', color: 'bg-orange-50 text-orange-600', to: '/purchases/orders' },
  { icon: ArrowLeftRight, label: 'Stock Transfer', color: 'bg-pink-50 text-pink-600', to: '/transfers' },
  { icon: Receipt, label: 'Add Expense', color: 'bg-rose-50 text-rose-600', to: '/expenses' },
  { icon: UsersRound, label: 'Add Employee', color: 'bg-indigo-50 text-indigo-600', to: '/hrms/employees' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const lowStock = getLowStockProducts();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard Overview"
        subtitle={`Good morning, Admin · Here's what's happening across all branches today, ${formatDate(new Date())}`}
        testIdPrefix="dashboard"
        actions={
          <>
            <Button variant="outline" size="sm" data-testid="dashboard-export-btn"><FileSpreadsheet className="w-4 h-4 mr-1.5" />Export</Button>
            <Button size="sm" className="bg-[#0B1F4D] hover:bg-[#071635]" onClick={() => navigate('/sales/pos')} data-testid="dashboard-quick-pos">
              <Plus className="w-4 h-4 mr-1.5" /> New Sale
            </Button>
          </>
        }
      />

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <StatCard testId="kpi-stock-value" icon={Wallet} title="Total Stock Value" value={formatAED(kpis.stockValue)} trend={5.2} color="blue" />
        <StatCard testId="kpi-sales" icon={TrendingUp} title="Sales This Month" value={formatAED(kpis.salesThisMonth)} trend={12.4} color="green" />
        <StatCard testId="kpi-purchases" icon={ShoppingBag} title="Purchases This Month" value={formatAED(kpis.purchasesThisMonth)} trend={-3.1} color="purple" />
        <StatCard testId="kpi-receivables" icon={ArrowDownLeft} title="Total Receivables" value={formatAED(kpis.receivables)} sub="From 8 customers" color="orange" />
        <StatCard testId="kpi-payables" icon={ArrowUpRight} title="Total Payables" value={formatAED(kpis.payables)} sub="To 4 suppliers" color="red" />
        <StatCard testId="kpi-expenses" icon={Receipt} title="Expenses This Month" value={formatAED(kpis.expenses)} trend={2.1} color="navy" />
        <StatCard testId="kpi-low-stock" icon={PackageX} title="Low Stock Items" value={formatNumber(kpis.lowStock)} sub="Need restocking" color="red" />
        <StatCard testId="kpi-pending-quotes" icon={FileText} title="Pending Quotations" value={formatNumber(kpis.pendingQuotations)} sub="Awaiting response" color="blue" />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Sales vs Purchases" subtitle="Last 6 months performance" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={monthlySalesPurchases} barGap={6}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis dataKey="month" stroke="#9CA3AF" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}K`} />
              <Tooltip cursor={{ fill: 'rgba(37,99,235,0.04)' }} contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 12 }} formatter={(v) => formatAED(v)} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="sales" fill="#2563EB" radius={[6, 6, 0, 0]} name="Sales" />
              <Bar dataKey="purchases" fill="#6D4AFF" radius={[6, 6, 0, 0]} name="Purchases" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Stock Value by Branch" subtitle="Distribution across UAE">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={stockByBranch} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={55} outerRadius={90} paddingAngle={2}>
                {stockByBranch.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 12 }} formatter={(v) => formatAED(v)} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {stockByBranch.map((s, i) => (
              <div key={s.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: CHART_COLORS[i % CHART_COLORS.length] }} />
                <span className="text-gray-600 truncate">{s.name}</span>
              </div>
            ))}
          </div>
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Sales Trend" subtitle="6-month moving">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={monthlySalesPurchases}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis dataKey="month" stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 12 }} formatter={(v) => formatAED(v)} />
              <Line type="monotone" dataKey="sales" stroke="#2563EB" strokeWidth={2.5} dot={{ r: 4, fill: '#2563EB' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top Selling Parts" subtitle="By units sold this month">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={topSelling} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={false} />
              <XAxis type="number" stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="name" stroke="#9CA3AF" fontSize={10} tickLine={false} axisLine={false} width={110} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 12 }} />
              <Bar dataKey="qty" fill="#6D4AFF" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Sales by Category" subtitle="Revenue mix">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={salesByCategory} dataKey="value" nameKey="category" cx="50%" cy="50%" outerRadius={80}>
                {salesByCategory.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 12 }} formatter={(v) => formatAED(v)} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Quick Actions */}
      <Card className="bg-white border border-gray-200/80 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-heading text-base font-semibold text-gray-900">Quick Actions</h3>
            <p className="text-xs text-gray-500">Frequently used shortcuts</p>
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3">
          {quickActions.map((q) => (
            <button
              key={q.label}
              data-testid={`quick-action-${q.label.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => navigate(q.to)}
              className="group flex flex-col items-center gap-2 p-3 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50/30 transition-all"
            >
              <div className={`w-11 h-11 rounded-xl ${q.color} flex items-center justify-center group-hover:scale-105 transition-transform`}>
                <q.icon className="w-5 h-5" strokeWidth={1.8} />
              </div>
              <span className="text-[11px] font-medium text-gray-700 text-center leading-tight">{q.label}</span>
            </button>
          ))}
        </div>
      </Card>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border border-gray-200/80 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-heading text-base font-semibold">Recent Invoices</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate('/sales/invoices')} data-testid="dashboard-view-all-invoices">View all</Button>
          </div>
          <div className="overflow-x-auto -mx-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-gray-500 border-b border-gray-100">
                  <th className="text-left py-2 px-2 font-semibold">Invoice</th>
                  <th className="text-left py-2 px-2 font-semibold">Customer</th>
                  <th className="text-right py-2 px-2 font-semibold">Total</th>
                  <th className="text-left py-2 px-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {invoices.slice(0, 5).map(inv => (
                  <tr key={inv.id} className="border-b border-gray-50 hover:bg-blue-50/30">
                    <td className="py-2.5 px-2 font-mono text-xs text-blue-600 font-medium">{inv.id}</td>
                    <td className="py-2.5 px-2 truncate max-w-[160px]">{inv.customer}</td>
                    <td className="py-2.5 px-2 text-right tabular-nums font-medium">{formatAED(inv.total, { showSymbol: false })}</td>
                    <td className="py-2.5 px-2"><StatusBadge status={inv.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="bg-white border border-gray-200/80 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-heading text-base font-semibold">Low Stock Items</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate('/inventory/low-stock')} data-testid="dashboard-view-low-stock">View all</Button>
          </div>
          <div className="space-y-1.5">
            {lowStock.slice(0, 6).map(p => (
              <div key={p.id} className="flex items-center justify-between gap-3 px-2 py-2 rounded-lg hover:bg-red-50/40">
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{p.name}</div>
                  <div className="text-[11px] text-gray-500 font-mono">{p.sku} · {p.branch}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-red-600 tabular-nums">{p.stock}/{p.reorder}</div>
                  <div className="text-[10px] text-gray-400 uppercase">in stock</div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-white border border-gray-200/80 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-heading text-base font-semibold">Recent Stock Transfers</h3>
            <Button variant="ghost" size="sm" onClick={() => navigate('/transfers')}>View all</Button>
          </div>
          <div className="space-y-1.5">
            {transfers.slice(0, 5).map(t => (
              <div key={t.id} className="flex items-center justify-between gap-3 px-2 py-2 rounded-lg hover:bg-gray-50">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <ArrowLeftRight className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{t.from} → {t.to}</div>
                    <div className="text-[11px] text-gray-500 font-mono">{t.id} · {t.items} items</div>
                  </div>
                </div>
                <StatusBadge status={t.status} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-white border border-gray-200/80 rounded-xl p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-heading text-base font-semibold">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            {recentActivities.map(a => (
              <div key={a.id} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white flex items-center justify-center text-[11px] font-semibold shrink-0">
                  {a.user.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-700">
                    <span className="font-medium text-gray-900">{a.user}</span> {a.action} <span className="font-medium text-blue-600">{a.target}</span>
                  </p>
                  <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-0.5">
                    <span>{a.time}</span>·<span className="text-gray-500">{a.module}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

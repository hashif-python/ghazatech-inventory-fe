import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, Search, Bell, Calendar as CalendarIcon, ChevronDown, MapPin } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { branches } from '../../data/branches';
import { products } from '../../data/products';
import { customers } from '../../data/customers';
import { invoices, quotations } from '../../data/invoices';
import { employees } from '../../data/employees';
import { purchaseOrders } from '../../data/operations';
import { notifications } from '../../data/operations';
import { formatDate } from '../../utils/format';

const pageTitles = {
  '/dashboard': 'Dashboard',
  '/inventory/products': 'Products',
  '/inventory/stock-movement': 'Stock Movement',
  '/inventory/stock-adjustment': 'Stock Adjustment',
  '/inventory/low-stock': 'Low Stock Report',
  '/inventory/barcode': 'Barcode / Labels',
  '/sales/pos': 'Direct Sale (POS)',
  '/sales/quotations': 'Quotations',
  '/sales/invoices': 'Sales Invoices',
  '/sales/credit-notes': 'Credit Notes',
  '/purchases/orders': 'Purchase Orders',
  '/purchases/grn': 'Goods Received',
  '/purchases/bills': 'Supplier Bills',
  '/purchases/returns': 'Supplier Returns',
  '/transfers': 'Branch Transfers',
  '/shipments': 'Shipments & Delivery',
  '/expenses': 'Expenses',
  '/customers': 'Customers',
  '/suppliers': 'Suppliers / Vendors',
  '/hrms': 'HR Dashboard',
  '/hrms/employees': 'Employees',
  '/hrms/attendance': 'Attendance',
  '/hrms/leave': 'Leave Management',
  '/hrms/payroll': 'Payroll',
  '/hrms/document-expiry': 'Document Expiry Tracker',
  '/finance/payments-received': 'Payments Received',
  '/finance/payments-made': 'Payments Made',
  '/finance/ledger': 'Customer Ledger',
  '/reports': 'Reports',
  '/notifications': 'Notifications',
  '/audit-logs': 'Audit Logs',
  '/users-roles': 'Users & Roles',
  '/settings': 'Settings',
};

const TopNav = ({ onToggleSidebar, currentBranch, onBranchChange }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const title = pageTitles[location.pathname] || 'GHAZA COMPUTER';
  const unread = notifications.filter(n => n.unread).length;
  const today = formatDate(new Date());

  const results = !query ? [] : [
    ...products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()) || p.sku.toLowerCase().includes(query.toLowerCase())).slice(0, 3).map(p => ({ type: 'Product', label: p.name, sub: p.sku, to: '/inventory/products' })),
    ...customers.filter(c => c.name.toLowerCase().includes(query.toLowerCase())).slice(0, 3).map(c => ({ type: 'Customer', label: c.name, sub: c.code, to: '/customers' })),
    ...invoices.filter(i => i.id.toLowerCase().includes(query.toLowerCase())).slice(0, 2).map(i => ({ type: 'Invoice', label: i.id, sub: i.customer, to: '/sales/invoices' })),
    ...quotations.filter(q => q.id.toLowerCase().includes(query.toLowerCase())).slice(0, 2).map(q => ({ type: 'Quotation', label: q.id, sub: q.customer, to: '/sales/quotations' })),
    ...employees.filter(e => e.name.toLowerCase().includes(query.toLowerCase())).slice(0, 2).map(e => ({ type: 'Employee', label: e.name, sub: e.designation, to: '/hrms/employees' })),
    ...purchaseOrders.filter(p => p.id.toLowerCase().includes(query.toLowerCase())).slice(0, 2).map(p => ({ type: 'Purchase', label: p.id, sub: p.supplier, to: '/purchases/orders' })),
  ];

  return (
    <header
      data-testid="app-topnav"
      className="sticky top-0 z-30 w-full bg-white/85 backdrop-blur-xl border-b border-gray-200"
    >
      <div className="flex items-center gap-3 px-4 lg:px-6 h-16">
        <button
          data-testid="topnav-menu-toggle"
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>

        <div className="flex-1 min-w-0">
          <h1 className="font-heading text-xl font-semibold text-gray-900 tracking-tight truncate" data-testid="topnav-page-title">{title}</h1>
        </div>

        {/* Global Search */}
        <div className="relative hidden md:block w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            data-testid="global-search-input"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSearchOpen(true); }}
            onFocus={() => setSearchOpen(true)}
            onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
            placeholder="Search products, customers, invoices..."
            className="pl-9 h-9 bg-gray-50 border-gray-200 focus-visible:ring-blue-500/20 focus-visible:border-blue-500"
          />
          {searchOpen && query && (
            <div className="absolute top-full mt-2 left-0 right-0 bg-white border border-gray-200 rounded-xl shadow-xl max-h-96 overflow-auto z-50">
              {results.length === 0 ? (
                <div className="p-4 text-sm text-gray-500 text-center">No results found</div>
              ) : results.map((r, i) => (
                <button
                  key={i}
                  data-testid={`search-result-${i}`}
                  onClick={() => { navigate(r.to); setQuery(''); setSearchOpen(false); }}
                  className="w-full flex items-center justify-between px-4 py-2.5 hover:bg-blue-50/50 text-left border-b border-gray-100 last:border-0"
                >
                  <div>
                    <div className="text-sm font-medium text-gray-900">{r.label}</div>
                    <div className="text-xs text-gray-500">{r.sub}</div>
                  </div>
                  <Badge variant="outline" className="text-[10px] font-mono">{r.type}</Badge>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Branch */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button data-testid="topnav-branch-selector" variant="outline" size="sm" className="hidden lg:flex h-9 gap-2 font-medium">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="hidden xl:inline">{currentBranch.name}</span>
              <span className="xl:hidden">{currentBranch.code}</span>
              <ChevronDown className="w-3.5 h-3.5 opacity-60" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuLabel>Switch Branch</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {branches.map(b => (
              <DropdownMenuItem key={b.id} onClick={() => onBranchChange(b)} data-testid={`topnav-branch-${b.id}`}>
                <div>
                  <div className="text-sm font-medium">{b.name}</div>
                  <div className="text-xs text-muted-foreground">{b.location}</div>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Date */}
        <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-200">
          <CalendarIcon className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700 font-medium tabular-nums">{today}</span>
        </div>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button data-testid="topnav-notifications" className="relative p-2 rounded-lg hover:bg-gray-100">
              <Bell className="w-5 h-5 text-gray-700" />
              {unread > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-red-500 text-white text-[10px] font-semibold flex items-center justify-center">
                  {unread}
                </span>
              )}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              Notifications
              <Badge variant="secondary" className="text-[10px]">{unread} new</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {notifications.slice(0, 5).map(n => (
              <DropdownMenuItem key={n.id} className="flex flex-col items-start gap-0.5 py-2.5">
                <div className="flex items-center gap-2 w-full">
                  <span className={`w-2 h-2 rounded-full ${
                    n.type === 'urgent' ? 'bg-red-500' :
                    n.type === 'warning' ? 'bg-orange-500' :
                    n.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                  }`} />
                  <span className="text-sm font-medium">{n.title}</span>
                </div>
                <span className="text-xs text-muted-foreground ml-4">{n.body}</span>
                <span className="text-[10px] text-muted-foreground ml-4 mt-1">{n.time}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem data-testid="topnav-notifications-view-all" onClick={() => navigate('/notifications')} className="justify-center text-blue-600 font-medium">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button data-testid="topnav-user-menu" className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-100">
              <Avatar className="w-8 h-8">
                <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white text-xs font-semibold">AU</AvatarFallback>
              </Avatar>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div>
                <div className="font-medium">Admin User</div>
                <div className="text-xs text-muted-foreground font-normal">admin@ghazacomputer.ae</div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/settings')}>Settings</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/users-roles')}>Users & Roles</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600" onClick={() => navigate('/')}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopNav;

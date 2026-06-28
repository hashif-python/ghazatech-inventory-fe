import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, Package, ShoppingCart, ShoppingBag, ArrowLeftRight,
  Truck, Receipt, Users, Building2, UsersRound, Banknote, BarChart3,
  Bell, History, Shield, Settings, ChevronLeft, ChevronDown, ChevronRight,
  Cpu, LogOut, Monitor, Boxes, FileText, Calendar, Wallet, MapPin
} from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
  DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator
} from '../ui/dropdown-menu';
import { branches } from '../../data/branches';

const sections = [
  {
    label: 'Main',
    items: [
      { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', testId: 'sidebar-dashboard' },
      { to: '/inventory', icon: Boxes, label: 'Inventory', testId: 'sidebar-inventory',
        children: [
          { to: '/inventory/products', label: 'Products', testId: 'sidebar-inventory-products' },
          { to: '/inventory/stock-movement', label: 'Stock Movement', testId: 'sidebar-inventory-movement' },
          { to: '/inventory/stock-adjustment', label: 'Stock Adjustment', testId: 'sidebar-inventory-adjustment' },
          { to: '/inventory/low-stock', label: 'Low Stock', testId: 'sidebar-inventory-lowstock' },
          { to: '/inventory/barcode', label: 'Barcode / Labels', testId: 'sidebar-inventory-barcode' },
        ]
      },
      { to: '/sales', icon: ShoppingCart, label: 'Sales', testId: 'sidebar-sales',
        children: [
          { to: '/sales/pos', label: 'Direct Sale (POS)', testId: 'sidebar-sales-pos' },
          { to: '/sales/quotations', label: 'Quotations', testId: 'sidebar-sales-quotations' },
          { to: '/sales/invoices', label: 'Invoices', testId: 'sidebar-sales-invoices' },
          { to: '/sales/credit-notes', label: 'Credit Notes', testId: 'sidebar-sales-creditnotes' },
        ]
      },
      { to: '/purchases', icon: ShoppingBag, label: 'Purchases', testId: 'sidebar-purchases',
        children: [
          { to: '/purchases/orders', label: 'Purchase Orders', testId: 'sidebar-purchases-orders' },
          { to: '/purchases/grn', label: 'Goods Received', testId: 'sidebar-purchases-grn' },
          { to: '/purchases/bills', label: 'Supplier Bills', testId: 'sidebar-purchases-bills' },
          { to: '/purchases/returns', label: 'Supplier Returns', testId: 'sidebar-purchases-returns' },
        ]
      },
      { to: '/transfers', icon: ArrowLeftRight, label: 'Transfers', testId: 'sidebar-transfers' },
      { to: '/shipments', icon: Truck, label: 'Shipments', testId: 'sidebar-shipments' },
      { to: '/expenses', icon: Receipt, label: 'Expenses', testId: 'sidebar-expenses' },
    ]
  },
  {
    label: 'Management',
    items: [
      { to: '/customers', icon: Users, label: 'Customers', testId: 'sidebar-customers' },
      { to: '/suppliers', icon: Building2, label: 'Vendors / Suppliers', testId: 'sidebar-suppliers' },
      { to: '/hrms', icon: UsersRound, label: 'HRMS', testId: 'sidebar-hrms',
        children: [
          { to: '/hrms', label: 'HR Dashboard', testId: 'sidebar-hrms-dashboard', end: true },
          { to: '/hrms/employees', label: 'Employees', testId: 'sidebar-hrms-employees' },
          { to: '/hrms/attendance', label: 'Attendance', testId: 'sidebar-hrms-attendance' },
          { to: '/hrms/leave', label: 'Leave Management', testId: 'sidebar-hrms-leave' },
          { to: '/hrms/payroll', label: 'Payroll', testId: 'sidebar-hrms-payroll' },
          { to: '/hrms/document-expiry', label: 'Document Expiry', testId: 'sidebar-hrms-docexpiry' },
        ]
      },
      { to: '/finance', icon: Banknote, label: 'Finance & Payments', testId: 'sidebar-finance',
        children: [
          { to: '/finance/payments-received', label: 'Payments Received', testId: 'sidebar-finance-received' },
          { to: '/finance/payments-made', label: 'Payments Made', testId: 'sidebar-finance-made' },
          { to: '/finance/ledger', label: 'Customer Ledger', testId: 'sidebar-finance-ledger' },
        ]
      },
      { to: '/reports', icon: BarChart3, label: 'Reports', testId: 'sidebar-reports' },
    ]
  },
  {
    label: 'System',
    items: [
      { to: '/notifications', icon: Bell, label: 'Notifications', testId: 'sidebar-notifications' },
      { to: '/audit-logs', icon: History, label: 'Audit Logs', testId: 'sidebar-audit' },
      { to: '/users-roles', icon: Shield, label: 'Users & Roles', testId: 'sidebar-users' },
      { to: '/settings', icon: Settings, label: 'Settings', testId: 'sidebar-settings' },
    ]
  }
];

const Sidebar = ({ collapsed, onToggle, currentBranch, onBranchChange, onLogout, onCloseMobile }) => {
  const [openGroups, setOpenGroups] = useState({ '/inventory': false, '/sales': false, '/purchases': false, '/hrms': false, '/finance': false });

  const toggleGroup = (key) => setOpenGroups(prev => ({ ...prev, [key]: !prev[key] }));

  return (
    <aside
      data-testid="app-sidebar"
      className={`sidebar-scroll fixed left-0 top-0 z-50 h-screen bg-[#071635] text-white/80 transition-all duration-300 flex flex-col overflow-y-auto overflow-x-hidden ${collapsed ? 'w-20' : 'w-64'}`}
    >
      {/* Brand */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-white/5 shrink-0">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2563EB] to-[#6D4AFF] flex items-center justify-center shrink-0 shadow-lg shadow-blue-500/20">
          <Cpu className="w-5 h-5 text-white" strokeWidth={2.2} />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <div className="font-heading font-bold text-white text-base tracking-tight whitespace-nowrap">GHAZA COMPUTER</div>
            <div className="text-[10px] text-white/50 uppercase tracking-[0.18em] whitespace-nowrap">Laptop Spare Parts</div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-6">
        {sections.map((section) => (
          <div key={section.label}>
            {!collapsed && (
              <div className="px-3 mb-2 text-[10px] uppercase tracking-[0.2em] text-white/40 font-semibold">{section.label}</div>
            )}
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const hasChildren = item.children && item.children.length > 0;
                const isOpen = openGroups[item.to];
                return (
                  <li key={item.to}>
                    {hasChildren ? (
                      <>
                        <button
                          data-testid={item.testId}
                          onClick={() => !collapsed && toggleGroup(item.to)}
                          className="w-full group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/5 transition-colors"
                        >
                          <Icon className="w-[18px] h-[18px] shrink-0" strokeWidth={1.8} />
                          {!collapsed && (
                            <>
                              <span className="flex-1 text-left">{item.label}</span>
                              {isOpen ? <ChevronDown className="w-4 h-4 opacity-60" /> : <ChevronRight className="w-4 h-4 opacity-60" />}
                            </>
                          )}
                        </button>
                        {!collapsed && isOpen && (
                          <ul className="mt-0.5 ml-3 pl-4 border-l border-white/10 space-y-0.5">
                            {item.children.map((child) => (
                              <li key={child.to}>
                                <NavLink
                                  to={child.to}
                                  end={child.end}
                                  data-testid={child.testId}
                                  onClick={onCloseMobile}
                                  className={({ isActive }) => `flex items-center px-3 py-2 rounded-md text-[13px] transition-colors ${isActive ? 'text-white bg-white/8 font-medium' : 'text-white/55 hover:text-white hover:bg-white/5'}`}
                                >
                                  {child.label}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        )}
                      </>
                    ) : (
                      <NavLink
                        to={item.to}
                        data-testid={item.testId}
                        onClick={onCloseMobile}
                        className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors relative ${isActive ? 'bg-[#0B1F4D] text-white font-medium' : 'text-white/70 hover:text-white hover:bg-white/5'}`}
                      >
                        {({ isActive }) => (
                          <>
                            {isActive && <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#2563EB] rounded-r-full" />}
                            <Icon className="w-[18px] h-[18px] shrink-0" strokeWidth={1.8} />
                            {!collapsed && <span>{item.label}</span>}
                          </>
                        )}
                      </NavLink>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* Branch + User footer */}
      <div className="border-t border-white/5 p-3 space-y-2 shrink-0">
        {!collapsed && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                data-testid="sidebar-branch-selector"
                className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-left"
              >
                <MapPin className="w-4 h-4 text-[#2563EB] shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] text-white/50 uppercase tracking-wider">Current Branch</div>
                  <div className="text-sm text-white font-medium truncate">{currentBranch.name}</div>
                </div>
                <ChevronDown className="w-4 h-4 text-white/50" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-60">
              <DropdownMenuLabel>Switch Branch</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {branches.map((b) => (
                <DropdownMenuItem
                  key={b.id}
                  data-testid={`branch-option-${b.id}`}
                  onClick={() => onBranchChange(b)}
                  className="flex flex-col items-start gap-0.5"
                >
                  <span className="font-medium text-sm">{b.name}</span>
                  <span className="text-xs text-muted-foreground">{b.location}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              data-testid="sidebar-user-menu"
              className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-white/5 transition-colors"
            >
              <Avatar className="w-9 h-9 ring-2 ring-[#2563EB]/30">
                <AvatarFallback className="bg-gradient-to-br from-[#2563EB] to-[#6D4AFF] text-white text-xs font-semibold">AU</AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="flex-1 min-w-0 text-left">
                  <div className="text-sm text-white font-medium truncate">Admin User</div>
                  <div className="text-[11px] text-white/50">Administrator</div>
                </div>
              )}
              {!collapsed && <ChevronDown className="w-4 h-4 text-white/50" />}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Admin User</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem data-testid="user-profile-link">Profile</DropdownMenuItem>
            <DropdownMenuItem data-testid="user-settings-link">Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem data-testid="user-logout" onClick={onLogout} className="text-red-600">
              <LogOut className="w-4 h-4 mr-2" /> Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Collapse handle (desktop) */}
      <button
        data-testid="sidebar-collapse-toggle"
        onClick={onToggle}
        className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-[#0B1F4D] border border-white/10 rounded-full items-center justify-center hover:bg-[#2563EB] transition-colors shadow-lg"
      >
        <ChevronLeft className={`w-3.5 h-3.5 text-white transition-transform ${collapsed ? 'rotate-180' : ''}`} />
      </button>
    </aside>
  );
};

export default Sidebar;

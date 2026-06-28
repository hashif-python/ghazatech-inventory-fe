import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import '@/App.css';

import Login from '@/pages/Login';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Dashboard from '@/pages/Dashboard';

import ProductList from '@/pages/Inventory/ProductList';
import StockMovement from '@/pages/Inventory/StockMovement';
import StockAdjustment from '@/pages/Inventory/StockAdjustment';
import LowStock from '@/pages/Inventory/LowStock';
import Barcode from '@/pages/Inventory/Barcode';

import POS from '@/pages/Sales/POS';
import Quotations from '@/pages/Sales/Quotations';
import Invoices from '@/pages/Sales/Invoices';
import CreditNotes from '@/pages/Sales/CreditNotes';

import { PurchaseOrders, SupplierBills, GRN, SupplierReturns } from '@/pages/Purchases/PurchasePages';

import CustomerList from '@/pages/Customers/CustomerList';
import SupplierList from '@/pages/Suppliers/SupplierList';

import HRMSDashboard from '@/pages/HRMS/HRMSDashboard';
import EmployeeList from '@/pages/HRMS/EmployeeList';
import Attendance from '@/pages/HRMS/Attendance';
import Leave from '@/pages/HRMS/Leave';
import Payroll from '@/pages/HRMS/Payroll';
import DocumentExpiry from '@/pages/HRMS/DocumentExpiry';

import { PaymentsReceived, PaymentsMade, Ledger } from '@/pages/Finance/FinancePages';

import Transfers from '@/pages/Transfers';
import Shipments from '@/pages/Shipments';
import Expenses from '@/pages/Expenses';
import Reports from '@/pages/Reports';
import Notifications from '@/pages/Notifications';
import AuditLogs from '@/pages/AuditLogs';
import UsersRoles from '@/pages/UsersRoles';
import SettingsPage from '@/pages/Settings';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />

          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />

            {/* Inventory */}
            <Route path="/inventory" element={<Navigate to="/inventory/products" replace />} />
            <Route path="/inventory/products" element={<ProductList />} />
            <Route path="/inventory/stock-movement" element={<StockMovement />} />
            <Route path="/inventory/stock-adjustment" element={<StockAdjustment />} />
            <Route path="/inventory/low-stock" element={<LowStock />} />
            <Route path="/inventory/barcode" element={<Barcode />} />

            {/* Sales */}
            <Route path="/sales" element={<Navigate to="/sales/pos" replace />} />
            <Route path="/sales/pos" element={<POS />} />
            <Route path="/sales/quotations" element={<Quotations />} />
            <Route path="/sales/invoices" element={<Invoices />} />
            <Route path="/sales/credit-notes" element={<CreditNotes />} />

            {/* Purchases */}
            <Route path="/purchases" element={<Navigate to="/purchases/orders" replace />} />
            <Route path="/purchases/orders" element={<PurchaseOrders />} />
            <Route path="/purchases/grn" element={<GRN />} />
            <Route path="/purchases/bills" element={<SupplierBills />} />
            <Route path="/purchases/returns" element={<SupplierReturns />} />

            {/* Transfers / Shipments / Expenses */}
            <Route path="/transfers" element={<Transfers />} />
            <Route path="/shipments" element={<Shipments />} />
            <Route path="/expenses" element={<Expenses />} />

            {/* Customers / Suppliers */}
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/suppliers" element={<SupplierList />} />

            {/* HRMS */}
            <Route path="/hrms" element={<HRMSDashboard />} />
            <Route path="/hrms/employees" element={<EmployeeList />} />
            <Route path="/hrms/attendance" element={<Attendance />} />
            <Route path="/hrms/leave" element={<Leave />} />
            <Route path="/hrms/payroll" element={<Payroll />} />
            <Route path="/hrms/document-expiry" element={<DocumentExpiry />} />

            {/* Finance */}
            <Route path="/finance" element={<Navigate to="/finance/payments-received" replace />} />
            <Route path="/finance/payments-received" element={<PaymentsReceived />} />
            <Route path="/finance/payments-made" element={<PaymentsMade />} />
            <Route path="/finance/ledger" element={<Ledger />} />

            {/* Reports / System */}
            <Route path="/reports" element={<Reports />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/audit-logs" element={<AuditLogs />} />
            <Route path="/users-roles" element={<UsersRoles />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

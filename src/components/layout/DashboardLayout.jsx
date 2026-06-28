import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import { branches } from '../../data/branches';
import { Toaster } from '../ui/sonner';

const DashboardLayout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [currentBranch, setCurrentBranch] = useState(branches[0]);

  const handleLogout = () => navigate('/');

  return (
    <div className="min-h-screen bg-[#F6F8FC]">
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className={`${mobileOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform`}>
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed(!collapsed)}
          currentBranch={currentBranch}
          onBranchChange={setCurrentBranch}
          onLogout={handleLogout}
          onCloseMobile={() => setMobileOpen(false)}
        />
      </div>

      <div className={`min-h-screen flex flex-col transition-all duration-300 ${collapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        <TopNav
          onToggleSidebar={() => setMobileOpen(!mobileOpen)}
          currentBranch={currentBranch}
          onBranchChange={setCurrentBranch}
        />
        <main className="flex-1 p-4 lg:p-6 xl:p-8 animate-fade-in">
          <Outlet context={{ currentBranch }} />
        </main>
      </div>

      <Toaster position="top-right" richColors closeButton />
    </div>
  );
};

export default DashboardLayout;

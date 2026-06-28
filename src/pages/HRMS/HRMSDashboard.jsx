import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users, UserCheck, UserX, Coffee, Calendar, IdCard, FileWarning, Plane,
  TrendingUp, Wallet, ChevronRight
} from 'lucide-react';
import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, LineChart, Line, Legend
} from 'recharts';
import PageHeader from '../../components/common/PageHeader';
import StatCard from '../../components/common/StatCard';
import ChartCard from '../../components/common/ChartCard';
import { Card } from '../../components/ui/card';
import { Badge } from '../../components/ui/badge';
import { Button } from '../../components/ui/button';
import { employees } from '../../data/employees';
import { attendance, leaveRequests, payroll } from '../../data/operations';
import { formatAED, daysUntil, expiryLevel } from '../../utils/format';

const CHART_COLORS = ['#2563EB', '#6D4AFF', '#22C55E', '#F59E0B', '#EF4444', '#06B6D4'];

export default function HRMSDashboard() {
  const navigate = useNavigate();
  const total = employees.length;
  const present = attendance.filter(a => a.status === 'Present' || a.status === 'Late').length;
  const absent = attendance.filter(a => a.status === 'Absent').length;
  const onLeave = attendance.filter(a => a.status === 'On Leave').length;
  const pendingLeaves = leaveRequests.filter(l => l.status === 'Pending').length;
  const pendingPayroll = payroll.filter(p => p.status === 'Pending').length;

  const visaSoon = employees.filter(e => { const d = daysUntil(e.visa.expiry); return d >= 0 && d <= 60; }).length;
  const eidSoon = employees.filter(e => { const d = daysUntil(e.emiratesId.expiry); return d >= 0 && d <= 60; }).length;
  const passportSoon = employees.filter(e => { const d = daysUntil(e.passport.expiry); return d >= 0 && d <= 90; }).length;

  // Charts data
  const attendanceTrend = [
    { day: 'Mon', present: 6, absent: 0, leave: 1 },
    { day: 'Tue', present: 6, absent: 0, leave: 1 },
    { day: 'Wed', present: 5, absent: 1, leave: 1 },
    { day: 'Thu', present: 5, absent: 0, leave: 2 },
    { day: 'Fri', present: 5, absent: 0, leave: 2 },
    { day: 'Sat', present: 6, absent: 0, leave: 1 },
    { day: 'Sun', present: 5, absent: 0, leave: 2 },
  ];
  const deptCounts = employees.reduce((acc, e) => ({ ...acc, [e.department]: (acc[e.department] || 0) + 1 }), {});
  const deptData = Object.entries(deptCounts).map(([name, value]) => ({ name, value }));
  const leaveDist = [
    { name: 'Annual', value: 12 },
    { name: 'Sick', value: 4 },
    { name: 'Emergency', value: 1 },
    { name: 'Unpaid', value: 0 },
  ];
  const payrollSummary = [
    { month: 'Oct', net: 58000 },
    { month: 'Nov', net: 59200 },
    { month: 'Dec', net: 61000 },
    { month: 'Jan', net: 58950 },
    { month: 'Feb', net: 38950 },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title="HR Dashboard"
        subtitle="Workforce overview · attendance, leaves, payroll & UAE document compliance"
        breadcrumbs={[{ label: 'HRMS' }]}
        testIdPrefix="hr-dashboard"
        actions={<Button className="bg-[#0B1F4D] hover:bg-[#071635]" onClick={() => navigate('/hrms/employees')} data-testid="hr-view-employees-btn">View Employees<ChevronRight className="w-4 h-4 ml-1" /></Button>}
      />

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <StatCard testId="hr-kpi-total" icon={Users} title="Total Employees" value={total} sub="Across all branches" color="blue" />
        <StatCard testId="hr-kpi-present" icon={UserCheck} title="Present Today" value={present} sub={`${Math.round(present/total*100)}% attendance`} color="green" />
        <StatCard testId="hr-kpi-absent" icon={UserX} title="Absent Today" value={absent} color="red" />
        <StatCard testId="hr-kpi-leave" icon={Coffee} title="On Leave" value={onLeave} color="orange" />
        <StatCard testId="hr-kpi-visa" icon={Plane} title="Visa Expiring" value={visaSoon} sub="Within 60 days" color="red" />
        <StatCard testId="hr-kpi-eid" icon={IdCard} title="Emirates ID Expiring" value={eidSoon} sub="Within 60 days" color="orange" />
        <StatCard testId="hr-kpi-passport" icon={FileWarning} title="Passport Expiring" value={passportSoon} sub="Within 90 days" color="purple" />
        <StatCard testId="hr-kpi-payroll" icon={Wallet} title="Payroll Pending" value={pendingPayroll} sub={`${pendingLeaves} leave requests`} color="navy" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ChartCard title="Attendance Trend" subtitle="Last 7 days" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={attendanceTrend} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis dataKey="day" stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="present" stackId="a" fill="#22C55E" radius={[6, 6, 0, 0]} />
              <Bar dataKey="leave" stackId="a" fill="#F59E0B" />
              <Bar dataKey="absent" stackId="a" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Department Distribution">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={deptData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {deptData.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 12 }} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Leave Distribution" subtitle="This month">
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={leaveDist} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" horizontal={false} />
              <XAxis type="number" stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis type="category" dataKey="name" stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 12 }} />
              <Bar dataKey="value" fill="#6D4AFF" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Monthly Payroll" subtitle="Net payroll trend" className="lg:col-span-2">
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={payrollSummary}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis dataKey="month" stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#9CA3AF" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}K`} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #E5E7EB', fontSize: 12 }} formatter={(v) => formatAED(v)} />
              <Line type="monotone" dataKey="net" stroke="#2563EB" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <Card className="bg-white border border-gray-200/80 rounded-xl p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-heading text-base font-semibold">Document Expiry Alerts</h3>
          <Button variant="ghost" size="sm" onClick={() => navigate('/hrms/document-expiry')} data-testid="hr-view-expiry-btn">View all<ChevronRight className="w-3.5 h-3.5 ml-1" /></Button>
        </div>
        <div className="space-y-1.5">
          {employees.filter(e => daysUntil(e.visa.expiry) <= 60).slice(0, 5).map(e => {
            const v = expiryLevel(e.visa.expiry);
            return (
              <div key={e.id} className="flex items-center gap-3 p-2.5 rounded-lg border border-gray-100 hover:bg-gray-50">
                <img src={e.photo} alt={e.name} className="w-9 h-9 rounded-full" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{e.name}</div>
                  <div className="text-[11px] text-gray-500">{e.designation} · {e.department}</div>
                </div>
                <div className="text-right">
                  <Badge className={
                    v.level === 'expired' ? 'bg-red-100 text-red-700 border-red-200' :
                    v.level === 'critical' ? 'bg-red-100 text-red-700 border-red-200' :
                    v.level === 'warning' ? 'bg-amber-100 text-amber-700 border-amber-200' :
                    'bg-blue-100 text-blue-700 border-blue-200'
                  } variant="outline">
                    Visa {v.level === 'expired' ? 'expired' : v.label}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

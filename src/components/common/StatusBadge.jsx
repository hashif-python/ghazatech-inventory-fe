import React from 'react';
import { Badge } from '../ui/badge';

const palette = {
  // Generic
  active: 'bg-green-100 text-green-800 hover:bg-green-100 border-green-200/60',
  inactive: 'bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200',
  // Invoice/Payment
  paid: 'bg-green-100 text-green-800 hover:bg-green-100 border-green-200/60',
  'partially paid': 'bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200/60',
  unpaid: 'bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200',
  overdue: 'bg-red-100 text-red-800 hover:bg-red-100 border-red-200/60',
  cancelled: 'bg-gray-100 text-gray-500 hover:bg-gray-100 border-gray-200 line-through',
  // Quotation
  draft: 'bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200',
  sent: 'bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200/60',
  approved: 'bg-green-100 text-green-800 hover:bg-green-100 border-green-200/60',
  rejected: 'bg-red-100 text-red-800 hover:bg-red-100 border-red-200/60',
  expired: 'bg-orange-100 text-orange-800 hover:bg-orange-100 border-orange-200/60',
  'converted to invoice': 'bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200/60',
  // Purchase
  'partially received': 'bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200/60',
  received: 'bg-green-100 text-green-800 hover:bg-green-100 border-green-200/60',
  // Transfer/Ship
  requested: 'bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200/60',
  dispatched: 'bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200/60',
  'in transit': 'bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200/60',
  pending: 'bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200/60',
  packed: 'bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200/60',
  'out for delivery': 'bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200/60',
  delivered: 'bg-green-100 text-green-800 hover:bg-green-100 border-green-200/60',
  returned: 'bg-orange-100 text-orange-800 hover:bg-orange-100 border-orange-200/60',
  // Employee
  'on leave': 'bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200/60',
  resigned: 'bg-gray-100 text-gray-500 hover:bg-gray-100 border-gray-200',
  terminated: 'bg-red-100 text-red-800 hover:bg-red-100 border-red-200/60',
  probation: 'bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200/60',
  // Attendance
  present: 'bg-green-100 text-green-800 hover:bg-green-100 border-green-200/60',
  absent: 'bg-red-100 text-red-800 hover:bg-red-100 border-red-200/60',
  late: 'bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200/60',
  'half day': 'bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200/60',
  'work from home': 'bg-purple-100 text-purple-800 hover:bg-purple-100 border-purple-200/60',
  holiday: 'bg-gray-100 text-gray-700 hover:bg-gray-100 border-gray-200',
  // Expiry
  valid: 'bg-green-100 text-green-800 hover:bg-green-100 border-green-200/60',
  warning: 'bg-amber-100 text-amber-800 hover:bg-amber-100 border-amber-200/60',
  critical: 'bg-red-100 text-red-800 hover:bg-red-100 border-red-200/60',
  soon: 'bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200/60',
  // Payment/Receipt
  cleared: 'bg-green-100 text-green-800 hover:bg-green-100 border-green-200/60',
  received_alt: 'bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200/60',
  issued: 'bg-blue-100 text-blue-800 hover:bg-blue-100 border-blue-200/60',
};

export const StatusBadge = ({ status, className = '' }) => {
  if (!status) return null;
  const key = String(status).toLowerCase();
  const cls = palette[key] || palette.draft;
  return (
    <Badge variant="outline" className={`${cls} ${className} font-medium rounded-full text-[11px] px-2.5 py-0.5`} data-testid={`status-${key.replace(/\s+/g, '-')}`}>
      {status}
    </Badge>
  );
};

export default StatusBadge;

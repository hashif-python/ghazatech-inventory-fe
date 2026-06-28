import React, { useState } from 'react';
import {
  AlertTriangle, PackageX, Calendar, FileText, Clock, CheckCircle, Truck, UserCheck, Bell
} from 'lucide-react';
import PageHeader from '../components/common/PageHeader';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { notifications as initial } from '../data/operations';
import { toast } from 'sonner';

const iconMap = { AlertTriangle, PackageX, Calendar, FileText, Clock, CheckCircle, TruckIcon: Truck, UserCheck };

const typeStyles = {
  urgent: { dot: 'bg-red-500', badge: 'bg-red-100 text-red-700 border-red-200', icon: 'bg-red-50 text-red-600' },
  warning: { dot: 'bg-amber-500', badge: 'bg-amber-100 text-amber-700 border-amber-200', icon: 'bg-amber-50 text-amber-600' },
  info: { dot: 'bg-blue-500', badge: 'bg-blue-100 text-blue-700 border-blue-200', icon: 'bg-blue-50 text-blue-600' },
  success: { dot: 'bg-green-500', badge: 'bg-green-100 text-green-700 border-green-200', icon: 'bg-green-50 text-green-600' },
};

export default function Notifications() {
  const [items, setItems] = useState(initial);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? items : items.filter(n => n.type === filter);
  const unread = items.filter(n => n.unread).length;

  const markAllRead = () => { setItems(items.map(n => ({ ...n, unread: false }))); toast.success('All notifications marked read'); };
  const markRead = (id) => setItems(items.map(n => n.id === id ? { ...n, unread: false } : n));

  return (
    <div className="space-y-6">
      <PageHeader
        title="Notification Center"
        subtitle={`${unread} unread · Stay on top of inventory, payments and HR alerts`}
        testIdPrefix="notifications"
        actions={<Button variant="outline" onClick={markAllRead} data-testid="notifications-mark-all"><CheckCircle className="w-4 h-4 mr-1.5" />Mark all as read</Button>}
      />

      <div className="flex flex-wrap gap-2">
        {[
          { id: 'all', label: 'All', count: items.length },
          { id: 'urgent', label: 'Urgent', count: items.filter(n => n.type === 'urgent').length },
          { id: 'warning', label: 'Warning', count: items.filter(n => n.type === 'warning').length },
          { id: 'info', label: 'Info', count: items.filter(n => n.type === 'info').length },
          { id: 'success', label: 'Success', count: items.filter(n => n.type === 'success').length },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setFilter(t.id)}
            data-testid={`notifications-filter-${t.id}`}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1.5 ${filter === t.id ? 'bg-[#0B1F4D] text-white' : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-300'}`}
          >
            {t.label}
            <Badge variant="secondary" className="text-[10px]">{t.count}</Badge>
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map(n => {
          const Icon = iconMap[n.icon] || Bell;
          const styles = typeStyles[n.type] || typeStyles.info;
          return (
            <Card
              key={n.id}
              className={`rounded-xl p-4 transition-all hover:shadow-sm cursor-pointer ${n.unread ? 'bg-white border-l-4 border-l-blue-500 border-gray-200' : 'bg-gray-50/60 border border-gray-200'}`}
              onClick={() => markRead(n.id)}
              data-testid={`notification-${n.id}`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-11 h-11 rounded-xl ${styles.icon} flex items-center justify-center shrink-0`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold text-gray-900 text-sm">{n.title}</h4>
                    {n.unread && <span className="w-2 h-2 rounded-full bg-blue-500" />}
                    <Badge variant="outline" className={`${styles.badge} text-[10px] capitalize`}>{n.type}</Badge>
                    <Badge variant="outline" className="text-[10px]">{n.module}</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{n.body}</p>
                  <p className="text-xs text-gray-400 mt-1.5">{n.time}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

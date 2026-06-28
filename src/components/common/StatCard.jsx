import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

const colorMap = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', ring: 'ring-blue-100' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', ring: 'ring-purple-100' },
  green: { bg: 'bg-green-50', text: 'text-green-600', ring: 'ring-green-100' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-600', ring: 'ring-orange-100' },
  red: { bg: 'bg-red-50', text: 'text-red-600', ring: 'ring-red-100' },
  navy: { bg: 'bg-slate-100', text: 'text-slate-700', ring: 'ring-slate-200' },
};

export const StatCard = ({ icon: Icon, title, value, sub, trend, color = 'blue', testId }) => {
  const c = colorMap[color] || colorMap.blue;
  return (
    <div
      data-testid={testId}
      className="group bg-white rounded-xl border border-gray-200/80 p-5 hover:shadow-[0_8px_30px_-12px_rgba(37,99,235,0.18)] hover:border-blue-200 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wider truncate">{title}</p>
          <p className="mt-2 font-heading text-2xl font-bold text-gray-900 tracking-tight tabular-nums truncate">{value}</p>
          {sub && <p className="mt-1 text-xs text-gray-500 truncate">{sub}</p>}
          {trend !== undefined && (
            <div className={`mt-2 inline-flex items-center gap-1 text-xs font-medium ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span>{trend >= 0 ? '+' : ''}{trend}% vs last month</span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={`shrink-0 w-11 h-11 rounded-xl ${c.bg} ${c.text} flex items-center justify-center ring-4 ${c.ring} group-hover:scale-105 transition-transform`}>
            <Icon className="w-5 h-5" strokeWidth={1.8} />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;

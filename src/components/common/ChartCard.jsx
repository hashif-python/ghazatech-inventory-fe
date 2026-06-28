import React from 'react';
import { Card } from '../ui/card';

export const ChartCard = ({ title, subtitle, action, children, className = '' }) => {
  return (
    <Card className={`bg-white border border-gray-200/80 rounded-xl p-5 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-heading text-base font-semibold text-gray-900">{title}</h3>
          {subtitle && <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>}
        </div>
        {action}
      </div>
      <div>{children}</div>
    </Card>
  );
};

export default ChartCard;

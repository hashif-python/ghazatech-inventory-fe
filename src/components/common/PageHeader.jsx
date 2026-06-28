import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

export const PageHeader = ({ title, subtitle, breadcrumbs = [], actions, testIdPrefix = 'page' }) => {
  return (
    <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
      <div>
        {breadcrumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-2" data-testid={`${testIdPrefix}-breadcrumbs`}>
            {breadcrumbs.map((b, i) => (
              <React.Fragment key={i}>
                {b.to ? <Link to={b.to} className="hover:text-blue-600">{b.label}</Link> : <span>{b.label}</span>}
                {i < breadcrumbs.length - 1 && <ChevronRight className="w-3.5 h-3.5" />}
              </React.Fragment>
            ))}
          </nav>
        )}
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-gray-900 tracking-tight" data-testid={`${testIdPrefix}-title`}>
          {title}
        </h1>
        {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
};

export default PageHeader;

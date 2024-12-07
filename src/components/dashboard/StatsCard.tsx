import React from 'react';
import { cn } from '../../utils/cn';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  type?: 'primary' | 'success' | 'warning' | 'error';
}

const StatsCard: React.FC<StatsCardProps> = ({
  label,
  value,
  subtext,
  icon: Icon,
  trend,
  type = 'primary'
}) => {
  const styles = {
    primary: 'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400',
    success: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400',
    warning: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400',
    error: 'bg-rose-50 text-rose-600 dark:bg-rose-900/20 dark:text-rose-400',
  }[type];

  return (
    <div className="bg-white dark:bg-navy-800 rounded-xl p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-navy-600 dark:text-tan-200">
            {label}
          </p>
          <div className="flex items-baseline space-x-2">
            <p className="text-2xl font-bold text-navy-900 dark:text-tan-50">
              {value}
            </p>
            {trend && (
              <span className={cn(
                "text-sm font-medium",
                trend.isPositive ? "text-emerald-600" : "text-rose-600"
              )}>
                {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
              </span>
            )}
          </div>
          {subtext && (
            <p className="text-sm text-navy-500 dark:text-tan-300">
              {subtext}
            </p>
          )}
        </div>
        <div className={cn('p-3 rounded-xl', styles)}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
import React from 'react';
import { ServiceLevel } from '../../types/airport';
import { Zap, Users } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ServiceLevelSelectorProps {
  value: ServiceLevel;
  onChange: (value: ServiceLevel) => void;
}

const ServiceLevelSelector: React.FC<ServiceLevelSelectorProps> = ({ value, onChange }) => {
  const options = [
    {
      value: 'express' as ServiceLevel,
      label: 'Express',
      description: 'Direct transfer to your destination',
      icon: Zap,
    },
    {
      value: 'multiStop' as ServiceLevel,
      label: 'Multi Stop',
      description: 'Shared ride with multiple stops',
      icon: Users,
    },
  ];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-navy-900 dark:text-tan-50">
        Service Level
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              'flex flex-col items-start p-4 rounded-xl border-2 transition-all text-left',
              'hover:border-wine-500 hover:bg-wine-50 dark:hover:bg-navy-700',
              value === option.value
                ? 'border-wine-500 bg-wine-50 dark:bg-navy-700'
                : 'border-tan-200 dark:border-navy-600'
            )}
          >
            <div className="flex items-center mb-2">
              <option.icon className={cn(
                'w-5 h-5 mr-2',
                value === option.value
                  ? 'text-wine-500'
                  : 'text-navy-400 dark:text-tan-300'
              )} />
              <span className={cn(
                'font-medium',
                value === option.value
                  ? 'text-wine-500'
                  : 'text-navy-600 dark:text-tan-200'
              )}>
                {option.label}
              </span>
            </div>
            <p className="text-sm text-navy-500 dark:text-tan-300">
              {option.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServiceLevelSelector;
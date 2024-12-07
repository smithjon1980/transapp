import React from 'react';
import { ServiceLevel } from '../../../types/airport';
import { Zap, Users } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface ServiceLevelStepProps {
  value: ServiceLevel;
  onChange: (value: ServiceLevel) => void;
}

const ServiceLevelStep: React.FC<ServiceLevelStepProps> = ({ value, onChange }) => {
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
      description: 'Multiple pickup or dropoff locations',
      icon: Users,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              'flex items-start p-6 rounded-xl border-2 transition-all text-left',
              'hover:border-wine-500 hover:bg-wine-50 dark:hover:bg-navy-700',
              value === option.value
                ? 'border-wine-500 bg-wine-50 dark:bg-navy-700'
                : 'border-tan-200 dark:border-navy-600'
            )}
          >
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <option.icon className={cn(
                  'w-6 h-6 mr-3',
                  value === option.value
                    ? 'text-wine-500'
                    : 'text-navy-400 dark:text-tan-300'
                )} />
                <span className={cn(
                  'font-medium text-lg',
                  value === option.value
                    ? 'text-wine-500'
                    : 'text-navy-600 dark:text-tan-200'
                )}>
                  {option.label}
                </span>
              </div>
              <p className="text-navy-500 dark:text-tan-300 ml-9">
                {option.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ServiceLevelStep;
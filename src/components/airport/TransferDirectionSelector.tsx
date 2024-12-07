import React from 'react';
import { TransferDirection } from '../../types/airport';
import { PlaneLanding, PlaneTakeoff } from 'lucide-react';
import { cn } from '../../utils/cn';

interface TransferDirectionSelectorProps {
  value: TransferDirection;
  onChange: (value: TransferDirection) => void;
}

const TransferDirectionSelector: React.FC<TransferDirectionSelectorProps> = ({ value, onChange }) => {
  const options = [
    {
      value: 'arrival' as TransferDirection,
      label: 'Airport Arrival',
      description: 'Pick up from airport',
      icon: PlaneLanding,
    },
    {
      value: 'departure' as TransferDirection,
      label: 'Airport Departure',
      description: 'Drop off at airport',
      icon: PlaneTakeoff,
    },
  ];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-navy-900 dark:text-tan-50">
        Transfer Direction
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

export default TransferDirectionSelector;
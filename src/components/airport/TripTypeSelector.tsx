import React from 'react';
import { TripType } from '../../types/airport';
import { Plane } from 'lucide-react';
import { cn } from '../../utils/cn';

interface TripTypeSelectorProps {
  value: TripType;
  onChange: (value: TripType) => void;
}

const TripTypeSelector: React.FC<TripTypeSelectorProps> = ({ value, onChange }) => {
  const options: { value: TripType; label: string }[] = [
    { value: 'oneWay', label: 'One Way' },
    { value: 'roundTrip', label: 'Round Trip' },
  ];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-navy-900 dark:text-tan-50">
        Trip Type
      </label>
      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              'flex items-center justify-center p-4 rounded-xl border-2 transition-all',
              'hover:border-wine-500 hover:bg-wine-50 dark:hover:bg-navy-700',
              value === option.value
                ? 'border-wine-500 bg-wine-50 dark:bg-navy-700'
                : 'border-tan-200 dark:border-navy-600'
            )}
          >
            <Plane className={cn(
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
          </button>
        ))}
      </div>
    </div>
  );
};

export default TripTypeSelector;
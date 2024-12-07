import React from 'react';
import { TripType } from '../../../types/airport';
import { Plane } from 'lucide-react';
import { cn } from '../../../utils/cn';

interface TripTypeStepProps {
  value: TripType;
  onChange: (value: TripType) => void;
}

const TripTypeStep: React.FC<TripTypeStepProps> = ({ value, onChange }) => {
  const options: { value: TripType; label: string }[] = [
    { value: 'oneWay', label: 'One Way' },
    { value: 'roundTrip', label: 'Round Trip' },
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              'flex items-center justify-center p-6 rounded-xl border-2 transition-all',
              'hover:border-wine-500 hover:bg-wine-50 dark:hover:bg-navy-700',
              value === option.value
                ? 'border-wine-500 bg-wine-50 dark:bg-navy-700'
                : 'border-tan-200 dark:border-navy-600'
            )}
          >
            <div className="text-center">
              <div className="flex justify-center mb-3">
                <Plane className={cn(
                  'w-8 h-8',
                  value === option.value
                    ? 'text-wine-500'
                    : 'text-navy-400 dark:text-tan-300'
                )} />
              </div>
              <span className={cn(
                'font-medium text-lg',
                value === option.value
                  ? 'text-wine-500'
                  : 'text-navy-600 dark:text-tan-200'
              )}>
                {option.label}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TripTypeStep;
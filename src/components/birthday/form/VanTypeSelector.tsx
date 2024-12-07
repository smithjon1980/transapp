import React from 'react';
import { Car, Crown, PartyPopper } from 'lucide-react';
import { VanType } from '../../../types/birthday';
import { cn } from '../../../utils/cn';

interface VanTypeSelectorProps {
  selectedType: VanType;
  onChange: (type: VanType) => void;
}

const vanTypes = [
  {
    type: 'standard' as VanType,
    label: 'Standard Van',
    description: 'Comfortable transportation for up to 12 passengers',
    icon: Car,
  },
  {
    type: 'luxury' as VanType,
    label: 'Luxury Van',
    description: 'Premium experience with enhanced amenities',
    icon: Crown,
  },
  {
    type: 'party' as VanType,
    label: 'Party Van',
    description: 'Specially equipped for celebrations',
    icon: PartyPopper,
  },
];

const VanTypeSelector: React.FC<VanTypeSelectorProps> = ({ selectedType, onChange }) => {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-navy-900 dark:text-tan-50">
        Select Van Type
      </label>
      <div className="grid grid-cols-1 gap-4">
        {vanTypes.map((type) => (
          <button
            key={type.type}
            type="button"
            onClick={() => onChange(type.type)}
            className={cn(
              "flex items-start p-6 rounded-xl border-2 transition-all text-left",
              "hover:border-wine-500 hover:bg-wine-50 dark:hover:bg-navy-700",
              selectedType === type.type
                ? "border-wine-500 bg-wine-50 dark:bg-navy-700"
                : "border-tan-200 dark:border-navy-600"
            )}
          >
            <div className="flex-1">
              <div className="flex items-center mb-2">
                <type.icon className={cn(
                  "w-6 h-6 mr-3",
                  selectedType === type.type
                    ? "text-wine-500"
                    : "text-navy-400 dark:text-tan-300"
                )} />
                <span className={cn(
                  "font-medium text-lg",
                  selectedType === type.type
                    ? "text-wine-500"
                    : "text-navy-600 dark:text-tan-200"
                )}>
                  {type.label}
                </span>
              </div>
              <p className="text-navy-500 dark:text-tan-300 ml-9">
                {type.description}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default VanTypeSelector;
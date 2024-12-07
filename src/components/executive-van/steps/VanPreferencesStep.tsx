import React from 'react';
import { Users, Briefcase, Wifi, Coffee, Tv, Laptop } from 'lucide-react';
import Input from '../../ui/Input';
import { cn } from '../../../utils/cn';

interface VanPreferencesStepProps {
  value: {
    passengers: number;
    luggageCount: number;
    amenities: {
      wifi: boolean;
      refreshments: boolean;
      entertainment: boolean;
      workstation: boolean;
    };
    specialRequests?: string;
  };
  onChange: (value: any) => void;
}

const VanPreferencesStep: React.FC<VanPreferencesStepProps> = ({ value, onChange }) => {
  const amenities = [
    { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
    { id: 'refreshments', label: 'Refreshments', icon: Coffee },
    { id: 'entertainment', label: 'Entertainment', icon: Tv },
    { id: 'workstation', label: 'Mobile Workstation', icon: Laptop },
  ];

  const toggleAmenity = (amenityId: keyof typeof value.amenities) => {
    onChange({
      ...value,
      amenities: {
        ...value.amenities,
        [amenityId]: !value.amenities[amenityId],
      },
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Number of Passengers"
          type="number"
          value={value.passengers}
          onChange={(e) => onChange({
            ...value,
            passengers: parseInt(e.target.value),
          })}
          min={1}
          max={15}
          icon={Users}
          required
        />

        <Input
          label="Pieces of Luggage"
          type="number"
          value={value.luggageCount}
          onChange={(e) => onChange({
            ...value,
            luggageCount: parseInt(e.target.value),
          })}
          min={0}
          max={20}
          icon={Briefcase}
          required
        />
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-navy-900 dark:text-tan-50">
          Preferred Amenities
        </label>
        <div className="grid grid-cols-2 gap-4">
          {amenities.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => toggleAmenity(id as keyof typeof value.amenities)}
              className={cn(
                "flex items-center p-4 rounded-xl border-2 transition-all",
                "hover:border-wine-500 hover:bg-wine-50 dark:hover:bg-navy-700",
                value.amenities[id as keyof typeof value.amenities]
                  ? "border-wine-500 bg-wine-50 dark:bg-navy-700"
                  : "border-tan-200 dark:border-navy-600"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 mr-3",
                value.amenities[id as keyof typeof value.amenities]
                  ? "text-wine-500"
                  : "text-navy-400 dark:text-tan-300"
              )} />
              <span className={cn(
                "font-medium",
                value.amenities[id as keyof typeof value.amenities]
                  ? "text-wine-500"
                  : "text-navy-600 dark:text-tan-200"
              )}>
                {label}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-navy-900 dark:text-tan-50 mb-2">
          Special Requests
        </label>
        <textarea
          value={value.specialRequests}
          onChange={(e) => onChange({
            ...value,
            specialRequests: e.target.value,
          })}
          placeholder="Any special requirements or preferences?"
          className="w-full rounded-lg border-2 border-tan-200 dark:border-navy-600 p-3 bg-white/95 dark:bg-navy-800/95"
          rows={4}
        />
      </div>
    </div>
  );
};

export default VanPreferencesStep;
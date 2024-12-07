import React from 'react';
import { Users, Wifi, Coffee, Music, PartyPopper, Speaker } from 'lucide-react';
import Input from '../../ui/Input';
import { VanPreferences, VanType, VanAmenity } from '../../../types/birthday';
import { cn } from '../../../utils/cn';

interface VanPreferencesStepProps {
  value: VanPreferences;
  onChange: (value: VanPreferences) => void;
}

const vanTypes: Array<{ type: VanType; label: string; description: string }> = [
  {
    type: 'standard',
    label: 'Standard Van',
    description: 'Comfortable transportation for up to 12 passengers',
  },
  {
    type: 'luxury',
    label: 'Luxury Van',
    description: 'Premium experience with enhanced amenities',
  },
  {
    type: 'party',
    label: 'Party Van',
    description: 'Specially equipped for celebrations with lighting and sound system',
  },
];

const amenities: Array<{ id: VanAmenity; label: string; icon: any }> = [
  { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
  { id: 'refreshments', label: 'Refreshments', icon: Coffee },
  { id: 'entertainment', label: 'Entertainment', icon: Music },
  { id: 'decorations', label: 'Birthday Decorations', icon: PartyPopper },
  { id: 'audioSystem', label: 'Premium Audio', icon: Speaker },
];

const VanPreferencesStep: React.FC<VanPreferencesStepProps> = ({ value, onChange }) => {
  const handleVanTypeChange = (type: VanType) => {
    onChange({ ...value, vanType: type });
  };

  const toggleAmenity = (amenity: VanAmenity) => {
    const newAmenities = value.amenities.includes(amenity)
      ? value.amenities.filter(a => a !== amenity)
      : [...value.amenities, amenity];
    onChange({ ...value, amenities: newAmenities });
  };

  return (
    <div className="space-y-8">
      <Input
        label="Number of Passengers"
        type="number"
        value={value.passengerCount}
        onChange={(e) => onChange({
          ...value,
          passengerCount: parseInt(e.target.value),
        })}
        min={1}
        max={15}
        icon={Users}
        required
      />

      <div className="space-y-4">
        <label className="block text-sm font-medium text-navy-900 dark:text-tan-50">
          Van Type
        </label>
        <div className="grid grid-cols-1 gap-4">
          {vanTypes.map((type) => (
            <button
              key={type.type}
              type="button"
              onClick={() => handleVanTypeChange(type.type)}
              className={cn(
                "p-4 rounded-xl border-2 transition-all text-left",
                "hover:border-wine-500 hover:bg-wine-50 dark:hover:bg-navy-700",
                value.vanType === type.type
                  ? "border-wine-500 bg-wine-50 dark:bg-navy-700"
                  : "border-tan-200 dark:border-navy-600"
              )}
            >
              <h3 className="font-medium text-lg text-navy-900 dark:text-tan-50">
                {type.label}
              </h3>
              <p className="text-sm text-navy-600 dark:text-tan-200 mt-1">
                {type.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-navy-900 dark:text-tan-50">
          Party Van Amenities
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {amenities.map((amenity) => (
            <button
              key={amenity.id}
              type="button"
              onClick={() => toggleAmenity(amenity.id)}
              className={cn(
                "p-4 rounded-xl border-2 transition-all",
                "hover:border-wine-500 hover:bg-wine-50 dark:hover:bg-navy-700",
                value.amenities.includes(amenity.id)
                  ? "border-wine-500 bg-wine-50 dark:bg-navy-700"
                  : "border-tan-200 dark:border-navy-600"
              )}
            >
              <div className="flex flex-col items-center">
                <amenity.icon className={cn(
                  "w-6 h-6 mb-2",
                  value.amenities.includes(amenity.id)
                    ? "text-wine-500"
                    : "text-navy-400 dark:text-tan-300"
                )} />
                <span className={cn(
                  "text-sm font-medium text-center",
                  value.amenities.includes(amenity.id)
                    ? "text-wine-500"
                    : "text-navy-600 dark:text-tan-200"
                )}>
                  {amenity.label}
                </span>
              </div>
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
          placeholder="Any additional requirements for the birthday celebration?"
          className="w-full rounded-lg border-2 border-tan-200 dark:border-navy-600 p-3 bg-white/95 dark:bg-navy-800/95"
          rows={4}
        />
      </div>
    </div>
  );
};

export default VanPreferencesStep;
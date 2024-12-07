import React from 'react';
import { Wifi, Droplets, Newspaper, Baby, Music, Thermometer } from 'lucide-react';
import Input from '../../ui/Input';
import { cn } from '../../../utils/cn';

interface GuestPreferencesStepProps {
  value: {
    amenities: {
      wifi: boolean;
      waterService: boolean;
      newspaper: boolean;
      childSeat: boolean;
    };
    temperature?: string;
    musicPreference?: string;
    specialRequests?: string;
  };
  onChange: (value: any) => void;
}

const amenities = [
  { id: 'wifi', label: 'Wi-Fi', icon: Wifi },
  { id: 'waterService', label: 'Water Service', icon: Droplets },
  { id: 'newspaper', label: 'Newspaper', icon: Newspaper },
  { id: 'childSeat', label: 'Child Seat', icon: Baby },
];

const GuestPreferencesStep: React.FC<GuestPreferencesStepProps> = ({ value, onChange }) => {
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
      <div className="space-y-4">
        <label className="block text-sm font-medium text-navy-900 dark:text-tan-50">
          Preferred Amenities
        </label>
        <div className="grid grid-cols-2 gap-4">
          {amenities.map((amenity) => (
            <button
              key={amenity.id}
              type="button"
              onClick={() => toggleAmenity(amenity.id as keyof typeof value.amenities)}
              className={cn(
                "p-4 rounded-xl border-2 transition-all",
                "hover:border-wine-500 hover:bg-wine-50 dark:hover:bg-navy-700",
                value.amenities[amenity.id as keyof typeof value.amenities]
                  ? "border-wine-500 bg-wine-50 dark:bg-navy-700"
                  : "border-tan-200 dark:border-navy-600"
              )}
            >
              <div className="flex items-center">
                <amenity.icon className={cn(
                  "w-5 h-5 mr-3",
                  value.amenities[amenity.id as keyof typeof value.amenities]
                    ? "text-wine-500"
                    : "text-navy-400 dark:text-tan-300"
                )} />
                <span className={cn(
                  "font-medium",
                  value.amenities[amenity.id as keyof typeof value.amenities]
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Temperature Preference"
          value={value.temperature}
          onChange={(e) => onChange({ ...value, temperature: e.target.value })}
          placeholder="e.g., 72°F"
          icon={Thermometer}
        />

        <Input
          label="Music Preference"
          value={value.musicPreference}
          onChange={(e) => onChange({ ...value, musicPreference: e.target.value })}
          placeholder="e.g., Jazz, Classical"
          icon={Music}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-navy-900 dark:text-tan-50 mb-2">
          Special Requests
        </label>
        <textarea
          value={value.specialRequests}
          onChange={(e) => onChange({ ...value, specialRequests: e.target.value })}
          placeholder="Any additional preferences or requests?"
          className="w-full rounded-lg border-2 border-tan-200 dark:border-navy-600 p-3 bg-white/95 dark:bg-navy-800/95"
          rows={4}
        />
      </div>
    </div>
  );
};

export default GuestPreferencesStep;
import React from 'react';
import { Wifi, Coffee, Music, PartyPopper, Speaker } from 'lucide-react';
import { VanAmenity } from '../../../types/birthday';
import { cn } from '../../../utils/cn';

interface AmenitiesSelectorProps {
  selectedAmenities: VanAmenity[];
  onToggle: (amenity: VanAmenity) => void;
}

const amenities = [
  { id: 'wifi' as VanAmenity, label: 'Wi-Fi', icon: Wifi },
  { id: 'refreshments' as VanAmenity, label: 'Refreshments', icon: Coffee },
  { id: 'entertainment' as VanAmenity, label: 'Entertainment', icon: Music },
  { id: 'decorations' as VanAmenity, label: 'Decorations', icon: PartyPopper },
  { id: 'audioSystem' as VanAmenity, label: 'Audio System', icon: Speaker },
];

const AmenitiesSelector: React.FC<AmenitiesSelectorProps> = ({
  selectedAmenities,
  onToggle,
}) => {
  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-navy-900 dark:text-tan-50">
        Select Amenities
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {amenities.map((amenity) => (
          <button
            key={amenity.id}
            type="button"
            onClick={() => onToggle(amenity.id)}
            className={cn(
              "p-4 rounded-xl border-2 transition-all",
              "hover:border-wine-500 hover:bg-wine-50 dark:hover:bg-navy-700",
              selectedAmenities.includes(amenity.id)
                ? "border-wine-500 bg-wine-50 dark:bg-navy-700"
                : "border-tan-200 dark:border-navy-600"
            )}
          >
            <div className="flex flex-col items-center">
              <amenity.icon className={cn(
                "w-6 h-6 mb-2",
                selectedAmenities.includes(amenity.id)
                  ? "text-wine-500"
                  : "text-navy-400 dark:text-tan-300"
              )} />
              <span className={cn(
                "text-sm font-medium text-center",
                selectedAmenities.includes(amenity.id)
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
  );
};

export default AmenitiesSelector;
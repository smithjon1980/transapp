import React from 'react';
import { MapPin, Plus, Trash2 } from 'lucide-react';
import LocationInput from '../LocationInput';
import Button from '../../ui/Button';
import { cn } from '../../../utils/cn';

interface LocationDetailsStepProps {
  value: {
    pickup: Array<{ address: string; notes?: string }>;
    dropoff: string;
  };
  onChange: (value: any) => void;
  serviceLevel: 'express' | 'multiStop';
}

const LocationDetailsStep: React.FC<LocationDetailsStepProps> = ({
  value,
  onChange,
  serviceLevel,
}) => {
  const handlePickupChange = (index: number, field: 'address' | 'notes') => (
    newValue: string
  ) => {
    const newPickups = [...value.pickup];
    newPickups[index] = {
      ...newPickups[index],
      [field]: newValue,
    };
    onChange({ ...value, pickup: newPickups });
  };

  const addPickupLocation = () => {
    onChange({
      ...value,
      pickup: [...value.pickup, { address: '', notes: '' }],
    });
  };

  const removePickupLocation = (index: number) => {
    const newPickups = value.pickup.filter((_, i) => i !== index);
    onChange({ ...value, pickup: newPickups });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {value.pickup.map((location, index) => (
          <div
            key={index}
            className={cn(
              "p-4 rounded-lg border transition-all",
              "border-tan-200 dark:border-navy-600",
              "bg-white/50 dark:bg-navy-800/50"
            )}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-navy-600 dark:text-tan-200">
                  {serviceLevel === 'multiStop' ? `Stop ${index + 1}` : 'Pickup Location'}
                </span>
                {serviceLevel === 'multiStop' && value.pickup.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removePickupLocation(index)}
                    className="text-wine-500 hover:text-wine-600 dark:hover:text-wine-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
              
              <LocationInput
                value={location.address}
                onChange={(newValue) => handlePickupChange(index, 'address')(newValue)}
                placeholder="Enter address or airport code"
                required
              />
              
              <LocationInput
                value={location.notes || ''}
                onChange={(newValue) => handlePickupChange(index, 'notes')(newValue)}
                placeholder="Additional notes (optional)"
                allowAirportCode={false}
              />
            </div>
          </div>
        ))}

        {serviceLevel === 'multiStop' && (
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={addPickupLocation}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Another Stop
          </Button>
        )}
      </div>

      {value.dropoff && (
        <div className="p-4 bg-tan-50 dark:bg-navy-700 rounded-lg">
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-wine-500 mt-0.5" />
            <div className="space-y-2">
              <p className="text-sm font-medium text-navy-900 dark:text-tan-50">
                Route Summary
              </p>
              <div className="space-y-1 text-sm text-navy-600 dark:text-tan-200">
                {value.pickup.map((location, index) => (
                  <div key={index} className="space-y-1">
                    <p>{serviceLevel === 'multiStop' ? `Stop ${index + 1}` : 'Pickup'}: {location.address}</p>
                    {location.notes && (
                      <p className="text-xs text-navy-500 dark:text-tan-300 pl-4">
                        Note: {location.notes}
                      </p>
                    )}
                  </div>
                ))}
                <p className="mt-2 pt-2 border-t border-tan-100 dark:border-navy-600">
                  Airport: {value.dropoff}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationDetailsStep;
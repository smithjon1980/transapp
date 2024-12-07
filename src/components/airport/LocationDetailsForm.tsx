import React from 'react';
import { LocationDetails, Location, ServiceLevel } from '../../types/airport';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { MapPin, Plus, Trash2 } from 'lucide-react';
import { cn } from '../../utils/cn';

interface LocationDetailsFormProps {
  value: LocationDetails;
  direction: 'arrival' | 'departure';
  serviceLevel: ServiceLevel;
  airport?: string;
  onChange: (value: LocationDetails) => void;
}

const LocationDetailsForm: React.FC<LocationDetailsFormProps> = ({
  value = { pickup: [{ address: '', notes: '' }], dropoff: '' },
  direction,
  serviceLevel,
  airport,
  onChange,
}) => {
  React.useEffect(() => {
    if (airport) {
      onChange({ ...value, dropoff: airport });
    }
  }, [airport]);

  const handlePickupChange = (index: number, field: keyof Location) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newPickups = [...value.pickup];
    newPickups[index] = {
      ...newPickups[index],
      [field]: e.target.value,
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

  const getLabels = () => {
    if (direction === 'arrival') {
      return {
        pickup: serviceLevel === 'multiStop' ? 'Additional Stops' : 'Destination Address',
        pickupPlaceholder: 'Enter address',
      };
    }
    return {
      pickup: serviceLevel === 'multiStop' ? 'Pickup Locations' : 'Pickup Address',
      pickupPlaceholder: 'Enter pickup address',
    };
  };

  const labels = getLabels();

  return (
    <div className="space-y-6">
      {serviceLevel === 'multiStop' && (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-navy-900 dark:text-tan-50">
            {labels.pickup}
          </label>
          
          {value.pickup.map((location, index) => (
            <div 
              key={index}
              className={cn(
                "p-4 rounded-lg border",
                "border-tan-200 dark:border-navy-600",
                "bg-white/50 dark:bg-navy-800/50"
              )}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-navy-600 dark:text-tan-200">
                    Stop {index + 1}
                  </span>
                  {value.pickup.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removePickupLocation(index)}
                      className="text-wine-500 hover:text-wine-600 dark:hover:text-wine-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
                
                <Input
                  placeholder={labels.pickupPlaceholder}
                  value={location.address}
                  onChange={handlePickupChange(index, 'address')}
                  icon={MapPin}
                  required
                />
                
                <Input
                  placeholder="Additional notes (optional)"
                  value={location.notes || ''}
                  onChange={handlePickupChange(index, 'notes')}
                  icon={MapPin}
                />
              </div>
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={addPickupLocation}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Another Stop
          </Button>
        </div>
      )}

      {serviceLevel === 'express' && (
        <Input
          label={direction === 'arrival' ? 'Destination Address' : 'Pickup Address'}
          value={value.pickup[0].address}
          onChange={handlePickupChange(0, 'address')}
          placeholder={labels.pickupPlaceholder}
          icon={MapPin}
          required
        />
      )}

      {((serviceLevel === 'express' && value.pickup[0].address) || 
        (serviceLevel === 'multiStop' && value.pickup.some(loc => loc.address))) && 
        value.dropoff && (
        <div className="p-4 bg-tan-50 dark:bg-navy-700 rounded-lg">
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-wine-500 mt-0.5" />
            <div className="space-y-2">
              <p className="text-sm font-medium text-navy-900 dark:text-tan-50">
                Route Summary
              </p>
              <div className="space-y-1 text-sm text-navy-600 dark:text-tan-200">
                {serviceLevel === 'multiStop' ? (
                  value.pickup.map((location, index) => (
                    <div key={index} className="space-y-1">
                      <p>Stop {index + 1}: {location.address}</p>
                      {location.notes && (
                        <p className="text-xs text-navy-500 dark:text-tan-300 pl-4">
                          Note: {location.notes}
                        </p>
                      )}
                    </div>
                  ))
                ) : (
                  <p>{direction === 'arrival' ? 'Destination' : 'Pickup'}: {value.pickup[0].address}</p>
                )}
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

export default LocationDetailsForm;
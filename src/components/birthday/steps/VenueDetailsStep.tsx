import React from 'react';
import { MapPin, Plus, Trash2 } from 'lucide-react';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { VenueDetails } from '../../../types/birthday';

interface VenueDetailsStepProps {
  value: VenueDetails;
  onChange: (value: VenueDetails) => void;
}

const VenueDetailsStep: React.FC<VenueDetailsStepProps> = ({ value, onChange }) => {
  const addVenue = () => {
    onChange({
      ...value,
      venues: [...value.venues, { address: '', arrivalTime: '', departureTime: '' }],
    });
  };

  const removeVenue = (index: number) => {
    const newVenues = value.venues.filter((_, i) => i !== index);
    onChange({ ...value, venues: newVenues });
  };

  const updateVenue = (index: number, field: string, newValue: string) => {
    const newVenues = [...value.venues];
    newVenues[index] = { ...newVenues[index], [field]: newValue };
    onChange({ ...value, venues: newVenues });
  };

  return (
    <div className="space-y-6">
      <Input
        label="Pickup Location"
        value={value.pickupLocation}
        onChange={(e) => onChange({ ...value, pickupLocation: e.target.value })}
        placeholder="Enter pickup address"
        icon={MapPin}
        required
      />

      <div className="space-y-4">
        <label className="block text-sm font-medium text-navy-900 dark:text-tan-50">
          Venue Stops
        </label>
        {value.venues.map((venue, index) => (
          <div
            key={index}
            className="p-4 bg-tan-50 dark:bg-navy-700 rounded-lg space-y-4"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Stop {index + 1}</span>
              {value.venues.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeVenue(index)}
                  className="text-wine-500 hover:text-wine-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <Input
              label="Venue Address"
              value={venue.address}
              onChange={(e) => updateVenue(index, 'address', e.target.value)}
              placeholder="Enter venue address"
              icon={MapPin}
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Arrival Time"
                type="time"
                value={venue.arrivalTime}
                onChange={(e) => updateVenue(index, 'arrivalTime', e.target.value)}
                required
              />
              <Input
                label="Departure Time"
                type="time"
                value={venue.departureTime}
                onChange={(e) => updateVenue(index, 'departureTime', e.target.value)}
                required
              />
            </div>
          </div>
        ))}

        <Button
          type="button"
          variant="outline"
          onClick={addVenue}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Another Venue
        </Button>
      </div>

      <Input
        label="Return Location"
        value={value.returnLocation}
        onChange={(e) => onChange({ ...value, returnLocation: e.target.value })}
        placeholder="Enter return address"
        icon={MapPin}
        required
      />
    </div>
  );
};

export default VenueDetailsStep;
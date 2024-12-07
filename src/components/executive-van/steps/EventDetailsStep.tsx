import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';
import Input from '../../ui/Input';

interface EventDetailsStepProps {
  value: {
    date: string;
    pickupTime: string;
    pickupLocation: string;
    dropoffLocation: string;
    returnPickup?: {
      time: string;
      location: string;
    };
  };
  onChange: (value: any) => void;
}

const EventDetailsStep: React.FC<EventDetailsStepProps> = ({ value, onChange }) => {
  const handleChange = (field: string, nestedField?: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (nestedField) {
      onChange({
        ...value,
        [field]: {
          ...value[field],
          [nestedField]: e.target.value,
        },
      });
    } else {
      onChange({
        ...value,
        [field]: e.target.value,
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Event Date"
          type="date"
          value={value.date}
          onChange={handleChange('date')}
          icon={Calendar}
          min={new Date().toISOString().split('T')[0]}
          required
        />

        <Input
          label="Pickup Time"
          type="time"
          value={value.pickupTime}
          onChange={handleChange('pickupTime')}
          icon={Clock}
          required
        />
      </div>

      <Input
        label="Pickup Location"
        value={value.pickupLocation}
        onChange={handleChange('pickupLocation')}
        placeholder="Enter pickup address"
        icon={MapPin}
        required
      />

      <Input
        label="Drop-off Location"
        value={value.dropoffLocation}
        onChange={handleChange('dropoffLocation')}
        placeholder="Enter destination address"
        icon={MapPin}
        required
      />

      <div className="p-4 bg-tan-50 dark:bg-navy-700 rounded-lg space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="needsReturn"
            checked={!!value.returnPickup}
            onChange={(e) => {
              if (e.target.checked) {
                onChange({
                  ...value,
                  returnPickup: { time: '', location: '' },
                });
              } else {
                const { returnPickup, ...rest } = value;
                onChange(rest);
              }
            }}
            className="rounded border-tan-200 text-wine-500 focus:ring-wine-500"
          />
          <label
            htmlFor="needsReturn"
            className="text-sm font-medium text-navy-900 dark:text-tan-50"
          >
            Need Return Service?
          </label>
        </div>

        {value.returnPickup && (
          <div className="space-y-4">
            <Input
              label="Return Pickup Time"
              type="time"
              value={value.returnPickup.time}
              onChange={handleChange('returnPickup', 'time')}
              icon={Clock}
              required
            />

            <Input
              label="Return Pickup Location"
              value={value.returnPickup.location}
              onChange={handleChange('returnPickup', 'location')}
              placeholder="Enter return pickup location"
              icon={MapPin}
              required
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetailsStep;
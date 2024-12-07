import React from 'react';
import { Calendar, Clock, MapPin, User, Users } from 'lucide-react';
import Input from '../../ui/Input';
import { EventDetails } from '../../../types/birthday';

interface EventDetailsStepProps {
  value: EventDetails;
  onChange: (value: EventDetails) => void;
}

const EventDetailsStep: React.FC<EventDetailsStepProps> = ({ value, onChange }) => {
  const handleChange = (field: keyof EventDetails) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    onChange({
      ...value,
      [field]: e.target.value,
    });
  };

  return (
    <div className="space-y-6">
      <Input
        label="Birthday Person's Name"
        value={value.birthdayPerson}
        onChange={handleChange('birthdayPerson')}
        placeholder="Who's celebrating?"
        icon={User}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Event Date"
          type="date"
          value={value.eventDate}
          onChange={handleChange('eventDate')}
          min={new Date().toISOString().split('T')[0]}
          icon={Calendar}
          required
        />

        <Input
          label="Pickup Time"
          type="time"
          value={value.pickupDateTime}
          onChange={handleChange('pickupDateTime')}
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
        label="Event Venue"
        value={value.dropoffLocation}
        onChange={handleChange('dropoffLocation')}
        placeholder="Enter venue address"
        icon={MapPin}
        required
      />

      <Input
        label="Number of Guests"
        type="number"
        value={value.numberOfGuests}
        onChange={(e) => onChange({
          ...value,
          numberOfGuests: parseInt(e.target.value),
        })}
        min={1}
        max={20}
        icon={Users}
        required
      />

      <div>
        <label className="block text-sm font-medium text-navy-900 dark:text-tan-50 mb-2">
          Special Instructions
        </label>
        <textarea
          value={value.specialInstructions}
          onChange={handleChange('specialInstructions')}
          placeholder="Any special requirements or preferences?"
          className="w-full rounded-lg border-2 border-tan-200 dark:border-navy-600 p-3 bg-white/95 dark:bg-navy-800/95"
          rows={4}
        />
      </div>
    </div>
  );
};

export default EventDetailsStep;
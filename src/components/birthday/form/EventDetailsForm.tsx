import React from 'react';
import { Calendar, Clock, MapPin, User, Users } from 'lucide-react';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import LocationInput from './LocationInput';
import { EventDetails } from '../../../types/birthday';

interface EventDetailsFormProps {
  initialData: EventDetails;
  onSubmit: (data: EventDetails) => void;
  onBack: () => void;
}

const EventDetailsForm: React.FC<EventDetailsFormProps> = ({
  initialData,
  onSubmit,
  onBack,
}) => {
  const [formData, setFormData] = React.useState(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-navy-900 dark:text-tan-50">
          Birthday Event Details
        </h2>
        <p className="text-navy-600 dark:text-tan-200 mt-2">
          Tell us about the birthday celebration
        </p>
      </div>

      <Input
        label="Birthday Person's Name"
        value={formData.birthdayPerson}
        onChange={(e) => setFormData({ ...formData, birthdayPerson: e.target.value })}
        placeholder="Who's celebrating?"
        icon={User}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Event Date"
          type="date"
          value={formData.eventDate}
          onChange={(e) => setFormData({ ...formData, eventDate: e.target.value })}
          min={new Date().toISOString().split('T')[0]}
          icon={Calendar}
          required
        />

        <Input
          label="Pickup Time"
          type="time"
          value={formData.pickupDateTime}
          onChange={(e) => setFormData({ ...formData, pickupDateTime: e.target.value })}
          icon={Clock}
          required
        />
      </div>

      <LocationInput
        label="Pickup Location"
        value={formData.pickupLocation}
        onChange={(value) => setFormData({ ...formData, pickupLocation: value })}
        required
      />

      <LocationInput
        label="Event Venue"
        value={formData.dropoffLocation}
        onChange={(value) => setFormData({ ...formData, dropoffLocation: value })}
        required
      />

      <Input
        label="Number of Guests"
        type="number"
        value={formData.numberOfGuests}
        onChange={(e) => setFormData({ ...formData, numberOfGuests: parseInt(e.target.value) })}
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
          value={formData.specialInstructions}
          onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
          placeholder="Any special requirements or preferences?"
          className="w-full rounded-lg border-2 border-tan-200 dark:border-navy-600 p-3 bg-white/95 dark:bg-navy-800/95"
          rows={4}
        />
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">
          Continue
        </Button>
      </div>
    </form>
  );
};

export default EventDetailsForm;
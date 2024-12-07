import React from 'react';
import { Calendar, Clock, MapPin, Music } from 'lucide-react';
import Input from '../../ui/Input';
import { cn } from '../../../utils/cn';

interface EventDetailsStepProps {
  value: {
    venueName: string;
    eventDate: string;
    eventStartTime: string;
    eventEndTime: string;
    eventType: string;
    customEventType?: string;
    ticketSection?: string;
  };
  onChange: (value: any) => void;
}

const eventTypes = [
  { value: 'concert', label: 'Concert' },
  { value: 'theater', label: 'Theater' },
  { value: 'festival', label: 'Festival' },
  { value: 'comedy', label: 'Comedy Show' },
  { value: 'other', label: 'Other' },
];

const EventDetailsStep: React.FC<EventDetailsStepProps> = ({ value, onChange }) => {
  const handleChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    onChange({
      ...value,
      [field]: e.target.value,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="block text-sm font-medium text-navy-900 dark:text-tan-50">
          Event Type
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {eventTypes.map((type) => (
            <button
              key={type.value}
              type="button"
              onClick={() => onChange({ ...value, eventType: type.value })}
              className={cn(
                "p-4 rounded-xl border-2 transition-all text-left",
                "hover:border-wine-500 hover:bg-wine-50 dark:hover:bg-navy-700",
                value.eventType === type.value
                  ? "border-wine-500 bg-wine-50 dark:bg-navy-700"
                  : "border-tan-200 dark:border-navy-600"
              )}
            >
              <div className="flex items-center">
                <Music className={cn(
                  "w-5 h-5 mr-3",
                  value.eventType === type.value
                    ? "text-wine-500"
                    : "text-navy-400 dark:text-tan-300"
                )} />
                <span className={cn(
                  "font-medium",
                  value.eventType === type.value
                    ? "text-wine-500"
                    : "text-navy-600 dark:text-tan-200"
                )}>
                  {type.label}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {value.eventType === 'other' && (
        <Input
          label="Specify Event Type"
          value={value.customEventType}
          onChange={handleChange('customEventType')}
          placeholder="Enter event type"
          required
        />
      )}

      <Input
        label="Venue Name"
        value={value.venueName}
        onChange={handleChange('venueName')}
        placeholder="Enter venue name"
        icon={MapPin}
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

        <div className="grid grid-cols-2 gap-2">
          <Input
            label="Start Time"
            type="time"
            value={value.eventStartTime}
            onChange={handleChange('eventStartTime')}
            icon={Clock}
            required
          />
          <Input
            label="End Time"
            type="time"
            value={value.eventEndTime}
            onChange={handleChange('eventEndTime')}
            icon={Clock}
            required
          />
        </div>
      </div>

      <Input
        label="Ticket Section/Area (Optional)"
        value={value.ticketSection}
        onChange={handleChange('ticketSection')}
        placeholder="e.g., VIP, Floor, Section 101"
      />
    </div>
  );
};

export default EventDetailsStep;
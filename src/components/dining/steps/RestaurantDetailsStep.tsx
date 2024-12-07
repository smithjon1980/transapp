import React from 'react';
import { Calendar, Clock, Users, GlassWine } from 'lucide-react';
import Input from '../../ui/Input';
import { cn } from '../../../utils/cn';

interface RestaurantDetailsStepProps {
  value: {
    name: string;
    date: string;
    time: string;
    partySize: number;
    occasion?: string;
    customOccasion?: string;
    specialRequests?: string;
  };
  onChange: (value: any) => void;
}

const occasions = [
  { value: 'business', label: 'Business Dinner' },
  { value: 'anniversary', label: 'Anniversary' },
  { value: 'birthday', label: 'Birthday' },
  { value: 'other', label: 'Other' },
];

const RestaurantDetailsStep: React.FC<RestaurantDetailsStepProps> = ({ value, onChange }) => {
  const handleChange = (field: string) => (
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
        label="Restaurant Name"
        value={value.name}
        onChange={handleChange('name')}
        placeholder="Enter restaurant name"
        icon={GlassWine}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Date"
          type="date"
          value={value.date}
          onChange={handleChange('date')}
          min={new Date().toISOString().split('T')[0]}
          icon={Calendar}
          required
        />

        <Input
          label="Time"
          type="time"
          value={value.time}
          onChange={handleChange('time')}
          icon={Clock}
          required
        />
      </div>

      <Input
        label="Party Size"
        type="number"
        value={value.partySize}
        onChange={handleChange('partySize')}
        min={1}
        max={20}
        icon={Users}
        required
      />

      <div className="space-y-4">
        <label className="block text-sm font-medium text-navy-900 dark:text-tan-50">
          Dining Occasion
        </label>
        <div className="grid grid-cols-2 gap-4">
          {occasions.map((occasion) => (
            <button
              key={occasion.value}
              type="button"
              onClick={() => onChange({ ...value, occasion: occasion.value })}
              className={cn(
                "p-4 rounded-xl border-2 transition-all",
                "hover:border-wine-500 hover:bg-wine-50 dark:hover:bg-navy-700",
                value.occasion === occasion.value
                  ? "border-wine-500 bg-wine-50 dark:bg-navy-700"
                  : "border-tan-200 dark:border-navy-600"
              )}
            >
              <span className={cn(
                "font-medium",
                value.occasion === occasion.value
                  ? "text-wine-500"
                  : "text-navy-600 dark:text-tan-200"
              )}>
                {occasion.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {value.occasion === 'other' && (
        <Input
          label="Specify Occasion"
          value={value.customOccasion}
          onChange={handleChange('customOccasion')}
          placeholder="Enter occasion"
          required
        />
      )}

      <div>
        <label className="block text-sm font-medium text-navy-900 dark:text-tan-50 mb-2">
          Special Requests
        </label>
        <textarea
          value={value.specialRequests}
          onChange={handleChange('specialRequests')}
          placeholder="Any special requirements or preferences?"
          className="w-full rounded-lg border-2 border-tan-200 dark:border-navy-600 p-3 bg-white/95 dark:bg-navy-800/95"
          rows={4}
        />
      </div>
    </div>
  );
};

export default RestaurantDetailsStep;
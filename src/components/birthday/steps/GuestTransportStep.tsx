import React from 'react';
import { Users, Baby, Wheelchair } from 'lucide-react';
import Input from '../../ui/Input';
import { GuestTransport } from '../../../types/birthday';
import { cn } from '../../../utils/cn';

interface GuestTransportStepProps {
  value: GuestTransport;
  onChange: (value: GuestTransport) => void;
}

const GuestTransportStep: React.FC<GuestTransportStepProps> = ({ value, onChange }) => {
  const handleChange = (field: keyof GuestTransport) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.type === 'number'
      ? parseInt(e.target.value)
      : e.target.type === 'checkbox'
      ? (e.target as HTMLInputElement).checked
      : e.target.value;

    onChange({
      ...value,
      [field]: newValue,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Total Passengers"
          type="number"
          value={value.totalPassengers}
          onChange={handleChange('totalPassengers')}
          min={1}
          max={50}
          icon={Users}
          required
        />

        <Input
          label="Adult Count"
          type="number"
          value={value.adultCount}
          onChange={handleChange('adultCount')}
          min={1}
          max={50}
          icon={Users}
          required
        />

        <Input
          label="Child Count"
          type="number"
          value={value.childCount}
          onChange={handleChange('childCount')}
          min={0}
          max={50}
          icon={Users}
          required
        />
      </div>

      <div className="p-4 bg-tan-50 dark:bg-navy-700 rounded-lg space-y-4">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="needsCarSeat"
            checked={value.needsCarSeat}
            onChange={handleChange('needsCarSeat')}
            className="rounded border-tan-200 text-wine-500 focus:ring-wine-500"
          />
          <label
            htmlFor="needsCarSeat"
            className="text-sm font-medium text-navy-900 dark:text-tan-50"
          >
            Car Seats Needed
          </label>
        </div>

        {value.needsCarSeat && (
          <Input
            label="Number of Car Seats"
            type="number"
            value={value.carSeatCount}
            onChange={handleChange('carSeatCount')}
            min={1}
            max={10}
            icon={Baby}
            required
          />
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-navy-900 dark:text-tan-50 mb-2">
          Special Assistance Requirements
        </label>
        <textarea
          value={value.specialAssistance}
          onChange={handleChange('specialAssistance')}
          placeholder="Any special assistance needed for passengers?"
          className="w-full rounded-lg border-2 border-tan-200 dark:border-navy-600 p-3 bg-white/95 dark:bg-navy-800/95"
          rows={3}
        />
      </div>
    </div>
  );
};

export default GuestTransportStep;
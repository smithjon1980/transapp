import React from 'react';
import { Users } from 'lucide-react';
import Input from '../../ui/Input';
import { GuestInfo } from '../../../types/birthday';

interface GuestInfoStepProps {
  value: GuestInfo;
  onChange: (value: GuestInfo) => void;
}

const GuestInfoStep: React.FC<GuestInfoStepProps> = ({ value, onChange }) => {
  const handleChange = (field: keyof GuestInfo) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.type === 'number' ? parseInt(e.target.value) : e.target.value;
    onChange({
      ...value,
      [field]: newValue,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          label="Total Guests"
          type="number"
          value={value.totalGuests}
          onChange={handleChange('totalGuests')}
          min={1}
          max={50}
          icon={Users}
          required
        />

        <Input
          label="Adult Guests"
          type="number"
          value={value.adultGuests}
          onChange={handleChange('adultGuests')}
          min={1}
          max={50}
          icon={Users}
          required
        />

        <Input
          label="Child Guests"
          type="number"
          value={value.childGuests}
          onChange={handleChange('childGuests')}
          min={0}
          max={50}
          icon={Users}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-navy-900 dark:text-tan-50 mb-2">
          Special Requirements
        </label>
        <textarea
          value={value.specialNeeds}
          onChange={handleChange('specialNeeds')}
          placeholder="Enter any special requirements or accommodations needed"
          className="w-full rounded-lg border-2 border-tan-200 dark:border-navy-600 p-3 bg-white/95 dark:bg-navy-800/95"
          rows={4}
        />
      </div>
    </div>
  );
};

export default GuestInfoStep;
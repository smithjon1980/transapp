import React from 'react';
import { Calendar, Clock, User, Palette, FileText } from 'lucide-react';
import Input from '../../ui/Input';
import { PartyDetails } from '../../../types/birthday';

interface PartyDetailsStepProps {
  value: PartyDetails;
  onChange: (value: PartyDetails) => void;
}

const PartyDetailsStep: React.FC<PartyDetailsStepProps> = ({ value, onChange }) => {
  const handleChange = (field: keyof PartyDetails) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newValue = e.target.type === 'number' 
      ? parseInt(e.target.value) 
      : e.target.value;
    
    onChange({
      ...value,
      [field]: newValue,
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Party Date"
          type="date"
          value={value.date}
          onChange={handleChange('date')}
          icon={Calendar}
          min={new Date().toISOString().split('T')[0]}
          required
        />

        <div className="grid grid-cols-2 gap-2">
          <Input
            label="Start Time"
            type="time"
            value={value.startTime}
            onChange={handleChange('startTime')}
            icon={Clock}
            required
          />
          <Input
            label="End Time"
            type="time"
            value={value.endTime}
            onChange={handleChange('endTime')}
            icon={Clock}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Birthday Celebrant"
          value={value.celebrantName}
          onChange={handleChange('celebrantName')}
          placeholder="Enter celebrant's name"
          icon={User}
          required
        />

        <Input
          label="Age Celebrating"
          type="number"
          value={value.celebrantAge}
          onChange={handleChange('celebrantAge')}
          min={1}
          max={120}
          icon={User}
          required
        />
      </div>

      <Input
        label="Party Theme"
        value={value.theme}
        onChange={handleChange('theme')}
        placeholder="e.g., Princess Party, Superhero, etc."
        icon={Palette}
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
          rows={3}
        />
      </div>
    </div>
  );
};

export default PartyDetailsStep;
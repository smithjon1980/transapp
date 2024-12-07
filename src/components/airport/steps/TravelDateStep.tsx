import React from 'react';
import { Calendar } from 'lucide-react';
import Input from '../../ui/Input';

interface TravelDateStepProps {
  value: {
    departure: string;
    return?: string;
  };
  onChange: (value: any) => void;
  isRoundTrip: boolean;
}

const TravelDateStep: React.FC<TravelDateStepProps> = ({
  value = { departure: '', return: '' },
  onChange,
  isRoundTrip,
}) => {
  const today = new Date().toISOString().split('T')[0];

  const handleChange = (field: 'departure' | 'return') => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({
      ...value,
      [field]: e.target.value,
    });
  };

  return (
    <div className="space-y-6">
      <Input
        label="Departure Date"
        type="date"
        value={value.departure}
        onChange={handleChange('departure')}
        min={today}
        icon={Calendar}
        required
      />

      {isRoundTrip && (
        <Input
          label="Return Date"
          type="date"
          value={value.return}
          onChange={handleChange('return')}
          min={value.departure || today}
          icon={Calendar}
          required
        />
      )}
    </div>
  );
};

export default TravelDateStep;
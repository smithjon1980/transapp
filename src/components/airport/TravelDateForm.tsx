import React from 'react';
import { TravelDate } from '../../types/airport';
import Input from '../ui/Input';
import { Calendar } from 'lucide-react';

interface TravelDateFormProps {
  value: TravelDate;
  isRoundTrip: boolean;
  onChange: (value: TravelDate) => void;
}

const TravelDateForm: React.FC<TravelDateFormProps> = ({ 
  value = { departure: '', return: '' },
  isRoundTrip, 
  onChange 
}) => {
  const handleChange = (field: keyof TravelDate) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, [field]: e.target.value });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="space-y-4">
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
          value={value.return || ''}
          onChange={handleChange('return')}
          min={value.departure || today}
          icon={Calendar}
          required
        />
      )}
    </div>
  );
};

export default TravelDateForm;
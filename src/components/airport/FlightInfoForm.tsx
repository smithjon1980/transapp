import React from 'react';
import { FlightInfo } from '../../types/airport';
import Input from '../ui/Input';
import { Plane } from 'lucide-react';
import { cn } from '../../utils/cn';

interface FlightInfoFormProps {
  value: FlightInfo;
  onChange: (value: FlightInfo) => void;
}

const FlightInfoForm: React.FC<FlightInfoFormProps> = ({ value, onChange }) => {
  const handleTypeChange = (type: 'flightNumber' | 'tailNumber') => {
    onChange({ ...value, type });
  };

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...value, value: e.target.value });
  };

  return (
    <div className="space-y-4">
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={() => handleTypeChange('flightNumber')}
          className={cn(
            'flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors',
            value.type === 'flightNumber'
              ? 'bg-wine-500 text-white'
              : 'bg-tan-100 text-navy-600 hover:bg-tan-200 dark:bg-navy-700 dark:text-tan-200 dark:hover:bg-navy-600'
          )}
        >
          Flight Number
        </button>
        <button
          type="button"
          onClick={() => handleTypeChange('tailNumber')}
          className={cn(
            'flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors',
            value.type === 'tailNumber'
              ? 'bg-wine-500 text-white'
              : 'bg-tan-100 text-navy-600 hover:bg-tan-200 dark:bg-navy-700 dark:text-tan-200 dark:hover:bg-navy-600'
          )}
        >
          Tail Number
        </button>
      </div>

      <Input
        label={value.type === 'flightNumber' ? 'Flight Number' : 'Tail Number'}
        placeholder={value.type === 'flightNumber' ? 'e.g., AA1234' : 'e.g., N12345'}
        value={value.value}
        onChange={handleValueChange}
        icon={Plane}
        required
      />
    </div>
  );
};

export default FlightInfoForm;
import React, { useState } from 'react';
import { MapPin, Plane } from 'lucide-react';
import Input from '../ui/Input';
import { cn } from '../../utils/cn';

interface LocationInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  label?: string;
  allowAirportCode?: boolean;
  required?: boolean;
}

const LocationInput: React.FC<LocationInputProps> = ({
  value,
  onChange,
  placeholder,
  label,
  allowAirportCode = true,
  required = false,
}) => {
  const [inputType, setInputType] = useState<'address' | 'airport'>('address');
  const [error, setError] = useState<string>('');

  const validateAirportCode = (code: string) => {
    const airportCodeRegex = /^[A-Z]{3}$/;
    return airportCodeRegex.test(code);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toUpperCase();
    setError('');

    if (inputType === 'airport' && newValue.length > 3) {
      setError('Airport code must be exactly 3 letters');
      return;
    }

    if (inputType === 'airport' && newValue.length === 3 && !validateAirportCode(newValue)) {
      setError('Invalid airport code format');
      return;
    }

    onChange(newValue);
  };

  return (
    <div className="space-y-4">
      {allowAirportCode && (
        <div className="flex space-x-2">
          <button
            type="button"
            onClick={() => setInputType('address')}
            className={cn(
              'flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors',
              inputType === 'address'
                ? 'bg-wine-500 text-white'
                : 'bg-tan-100 text-navy-600 hover:bg-tan-200 dark:bg-navy-700 dark:text-tan-200'
            )}
          >
            <div className="flex items-center justify-center">
              <MapPin className="w-4 h-4 mr-2" />
              Address
            </div>
          </button>
          <button
            type="button"
            onClick={() => setInputType('airport')}
            className={cn(
              'flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors',
              inputType === 'airport'
                ? 'bg-wine-500 text-white'
                : 'bg-tan-100 text-navy-600 hover:bg-tan-200 dark:bg-navy-700 dark:text-tan-200'
            )}
          >
            <div className="flex items-center justify-center">
              <Plane className="w-4 h-4 mr-2" />
              Airport Code
            </div>
          </button>
        </div>
      )}

      <Input
        label={label}
        value={value}
        onChange={handleChange}
        placeholder={inputType === 'airport' ? 'Enter airport code (e.g., LAX)' : placeholder}
        icon={inputType === 'airport' ? Plane : MapPin}
        error={error}
        required={required}
        maxLength={inputType === 'airport' ? 3 : undefined}
      />

      {inputType === 'airport' && (
        <p className="text-sm text-navy-500 dark:text-tan-300">
          Enter the 3-letter IATA airport code (e.g., LAX, JFK, LHR)
        </p>
      )}
    </div>
  );
};

export default LocationInput;
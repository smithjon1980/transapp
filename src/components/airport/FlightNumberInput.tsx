import React, { useState } from 'react';
import { Plane } from 'lucide-react';
import Input from '../ui/Input';
import { validateFlightNumber } from '../../services/flightService';
import FlightInfoDisplay from './FlightInfoDisplay';

interface FlightNumberInputProps {
  value: any;
  onChange: (value: any, airport?: string) => void;
  direction: 'arrival' | 'departure';
}

const FlightNumberInput: React.FC<FlightNumberInputProps> = ({
  value,
  onChange,
  direction,
}) => {
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string>('');
  const [flightInfo, setFlightInfo] = useState<any>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toUpperCase();
    onChange({ type: 'flightNumber', value: newValue });
    setError('');
    setFlightInfo(null);

    if (newValue.length >= 6) {
      setIsValidating(true);
      try {
        const response = await validateFlightNumber(newValue);
        if (response.isValid) {
          setFlightInfo(response.flightInfo);
          const airport = direction === 'arrival' 
            ? response.flightInfo.arrival.airport 
            : response.flightInfo.departure.airport;
          onChange({ type: 'flightNumber', value: newValue }, airport);
        } else {
          setError(response.error || 'Invalid flight number');
        }
      } catch (err) {
        setError('Unable to validate flight number');
      } finally {
        setIsValidating(false);
      }
    }
  };

  return (
    <div className="space-y-4">
      <Input
        label="Flight Number"
        value={value?.value || ''}
        onChange={handleChange}
        placeholder="e.g., AA1234"
        icon={Plane}
        error={error}
        required
      />
      
      {isValidating && (
        <div className="text-sm text-navy-600 dark:text-tan-200 animate-pulse">
          Validating flight number...
        </div>
      )}
      
      {flightInfo && <FlightInfoDisplay flightInfo={flightInfo} />}
    </div>
  );
};

export default FlightNumberInput;
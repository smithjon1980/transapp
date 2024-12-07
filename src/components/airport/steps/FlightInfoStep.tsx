import React, { useState } from 'react';
import { FlightInfo } from '../../../types/airport';
import { Plane } from 'lucide-react';
import Input from '../../ui/Input';
import { validateFlightNumber } from '../../../services/flightService';
import { cn } from '../../../utils/cn';

interface FlightInfoStepProps {
  value: FlightInfo;
  onChange: (value: FlightInfo, airport?: string) => void;
}

const FlightInfoStep: React.FC<FlightInfoStepProps> = ({ value = { type: 'flightNumber', value: '' }, onChange }) => {
  const [error, setError] = useState<string>('');
  const [isValidating, setIsValidating] = useState(false);
  const [flightInfo, setFlightInfo] = useState<any>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.toUpperCase();
    onChange({ ...value, value: newValue });
    setError('');
    setFlightInfo(null);

    if (newValue.length >= 6) {
      setIsValidating(true);
      try {
        const response = await validateFlightNumber(newValue);
        if (response.isValid) {
          setFlightInfo(response.flightInfo);
          onChange({ ...value, value: newValue }, response.flightInfo.arrival.airport);
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
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => onChange({ ...value, type: 'flightNumber' })}
            className={cn(
              'flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors',
              value.type === 'flightNumber'
                ? 'bg-wine-500 text-white'
                : 'bg-tan-100 text-navy-600 hover:bg-tan-200 dark:bg-navy-700 dark:text-tan-200 dark:hover:bg-navy-600'
            )}
          >
            Flight Number
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...value, type: 'tailNumber' })}
            className={cn(
              'flex-1 py-3 px-4 rounded-lg text-sm font-medium transition-colors',
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
          value={value.value}
          onChange={handleChange}
          placeholder={value.type === 'flightNumber' ? 'e.g., AA1234' : 'e.g., N12345'}
          icon={Plane}
          error={error}
          required
        />

        {isValidating && (
          <div className="text-sm text-navy-600 dark:text-tan-200 animate-pulse">
            Validating flight number...
          </div>
        )}

        {flightInfo && (
          <div className="bg-tan-50 dark:bg-navy-700 rounded-lg p-4 space-y-2">
            <h4 className="font-medium text-navy-900 dark:text-tan-50">
              Flight Details
            </h4>
            <div className="space-y-1 text-sm text-navy-600 dark:text-tan-200">
              <p>Airline: {flightInfo.airline}</p>
              <p>From: {flightInfo.departure.airport}</p>
              <p>To: {flightInfo.arrival.airport}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightInfoStep;
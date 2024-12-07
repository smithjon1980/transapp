import React, { useState } from 'react';
import { MapPin, Plane } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { validateFlightNumber } from '../../services/flightService';
import { useLanguage } from '../../utils/LanguageContext';

interface LocationStepProps {
  serviceType: string;
  formData: any;
  onSubmit: (data: any) => void;
}

const LocationStep: React.FC<LocationStepProps> = ({
  serviceType,
  formData,
  onSubmit,
}) => {
  const { t } = useLanguage();
  const [flightError, setFlightError] = useState<string>('');
  const [isValidating, setIsValidating] = useState(false);
  const [flightInfo, setFlightInfo] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = {
      pickupLocation: form.pickupLocation.value,
      dropoffLocation: form.dropoffLocation.value,
      flightNumber: form.flightNumber?.value,
    };

    if (serviceType === 'airportTransfer' && data.flightNumber) {
      setIsValidating(true);
      setFlightError('');
      
      try {
        const validation = await validateFlightNumber(data.flightNumber);
        if (!validation.isValid) {
          setFlightError(validation.error || t('flight.validation.error'));
          setIsValidating(false);
          return;
        }
        setFlightInfo(validation.flightInfo);
      } catch (error) {
        setFlightError(t('flight.validation.failed'));
        setIsValidating(false);
        return;
      }
    }

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {serviceType === 'airportTransfer' && (
        <div className="space-y-2 mb-6">
          <Input
            label={t('form.flightNumber')}
            id="flightNumber"
            name="flightNumber"
            icon={Plane}
            defaultValue={formData.flightNumber}
            placeholder={t('form.flightNumber.placeholder')}
            error={flightError}
          />
          {flightInfo && (
            <div className="p-4 bg-navy-50 rounded-lg text-sm">
              <p className="font-medium text-navy-900">{t('flight.details')}</p>
              <div className="mt-2 space-y-1 text-navy-700">
                <p>{t('flight.airline')} {flightInfo.airline}</p>
                <p>{t('flight.departure')} {flightInfo.departure.airport}</p>
                <p>{t('flight.arrival')} {flightInfo.arrival.airport}</p>
              </div>
            </div>
          )}
        </div>
      )}

      <div className="space-y-4">
        <Input
          label={t('form.pickupLocation')}
          id="pickupLocation"
          name="pickupLocation"
          icon={MapPin}
          required
          defaultValue={formData.pickupLocation}
          placeholder={t('form.pickupLocation')}
        />

        <Input
          label={t('form.dropoffLocation')}
          id="dropoffLocation"
          name="dropoffLocation"
          icon={MapPin}
          required={serviceType !== 'cityTransfer'}
          defaultValue={formData.dropoffLocation}
          placeholder={t('form.dropoffLocation')}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full"
        disabled={isValidating}
      >
        {isValidating ? t('button.validating') : t('button.continue')}
      </Button>
    </form>
  );
};

export default LocationStep;
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';
import TripTypeSelector from './TripTypeSelector';
import ServiceLevelSelector from './ServiceLevelSelector';
import TransferDirectionSelector from './TransferDirectionSelector';
import FlightNumberInput from './FlightNumberInput';
import TravelDateForm from './TravelDateForm';
import PassengerInfoForm from './PassengerInfoForm';
import LocationDetailsForm from './LocationDetailsForm';
import { AirportTransferData } from '../../types/airport';

interface AirportBookingWizardProps {
  onSubmit: (data: AirportTransferData) => void;
  isSubmitting?: boolean;
}

const initialFormData: AirportTransferData = {
  tripType: 'oneWay',
  serviceLevel: 'express',
  direction: 'arrival',
  flightInfo: {
    type: 'flightNumber',
    value: '',
  },
  travelDate: {
    departure: '',
    return: '',
  },
  passengerInfo: {
    name: '',
    total: 1,
  },
  locationDetails: {
    pickup: [{ address: '', notes: '' }],
    dropoff: '',
  },
};

// Organize steps in a logical flow
const steps = [
  {
    id: 'tripType',
    title: 'Trip Type',
    component: TripTypeSelector,
    description: 'Select one-way or round trip',
  },
  {
    id: 'direction',
    title: 'Transfer Direction',
    component: TransferDirectionSelector,
    description: 'Choose pickup or dropoff at airport',
  },
  {
    id: 'flightInfo',
    title: 'Flight Details',
    component: FlightNumberInput,
    description: 'Enter your flight information',
  },
  {
    id: 'travelDate',
    title: 'Travel Date',
    component: TravelDateForm,
    description: 'Select your travel date and time',
  },
  {
    id: 'serviceLevel',
    title: 'Service Level',
    component: ServiceLevelSelector,
    description: 'Choose between express or multi-stop service',
  },
  {
    id: 'locationDetails',
    title: 'Pickup Details',
    component: LocationDetailsForm,
    description: 'Enter pickup location details',
  },
  {
    id: 'passengerInfo',
    title: 'Passenger Details',
    component: PassengerInfoForm,
    description: 'Enter passenger information',
  },
];

const AirportBookingWizard: React.FC<AirportBookingWizardProps> = ({
  onSubmit,
  isSubmitting = false,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<AirportTransferData>(initialFormData);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(current => current + 1);
    } else {
      onSubmit(formData);
    }
  };

  const handleBack = () => {
    setCurrentStep(current => Math.max(0, current - 1));
  };

  const updateFormData = (key: keyof AirportTransferData, value: any, airport?: string) => {
    setFormData(prev => {
      const newData = { ...prev, [key]: value };
      if (key === 'flightInfo' && airport) {
        newData.locationDetails.dropoff = airport;
      }
      return newData;
    });
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Progress Steps */}
      <div className="relative">
        <div className="h-2 bg-tan-100 dark:bg-navy-700 rounded-full">
          <div
            className="h-2 bg-wine-500 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>
        <div className="mt-4">
          <h2 className="text-xl font-bold text-navy-900 dark:text-tan-50">
            {steps[currentStep].title}
          </h2>
          <p className="text-sm text-navy-600 dark:text-tan-200 mt-1">
            {steps[currentStep].description}
          </p>
        </div>
      </div>

      {/* Form Step */}
      <div className="bg-white/95 dark:bg-navy-800/95 rounded-xl p-6 shadow-lg border border-tan-100/50 dark:border-navy-600/50 min-h-[300px]">
        <CurrentStepComponent
          value={formData[steps[currentStep].id as keyof AirportTransferData]}
          onChange={(value: any, airport?: string) => 
            updateFormData(steps[currentStep].id as keyof AirportTransferData, value, airport)
          }
          direction={formData.direction}
          serviceLevel={formData.serviceLevel}
          isRoundTrip={formData.tripType === 'roundTrip'}
          airport={formData.locationDetails.dropoff}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        {currentStep > 0 ? (
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        ) : (
          <div />
        )}

        <Button
          onClick={handleNext}
          disabled={isSubmitting}
          className="flex items-center"
        >
          {currentStep === steps.length - 1 ? (
            isSubmitting ? 'Processing...' : 'Submit Booking'
          ) : (
            <>
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default AirportBookingWizard;
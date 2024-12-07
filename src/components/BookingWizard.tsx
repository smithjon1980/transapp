import React, { useState } from 'react';
import { useBookingStore } from '../store/bookingStore';
import {
  TripTypeStep,
  ServiceLevelStep,
  FlightInfoStep,
  TravelDateStep,
  LocationDetailsStep,
  PassengerInfoStep,
} from './airport/steps';
import { createBooking } from '../services/bookingService';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from './ui/Button';

const BookingWizard: React.FC = () => {
  const { selectedService, resetBooking } = useBookingStore();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    tripType: 'oneWay',
    serviceLevel: 'express',
    flightInfo: {
      type: 'flightNumber',
      value: '',
    },
    travelDate: {
      departure: '',
      return: '',
    },
    locationDetails: {
      pickup: [{ address: '', notes: '' }],
      dropoff: '',
    },
    passengerInfo: {
      total: 1,
      name: '',
    },
  });

  const steps = [
    {
      id: 'tripType',
      title: 'Trip Type',
      description: 'Select one-way or round trip',
      component: TripTypeStep,
    },
    {
      id: 'serviceLevel',
      title: 'Service Level',
      description: 'Choose express or multi-stop service',
      component: ServiceLevelStep,
    },
    {
      id: 'flightInfo',
      title: 'Flight Information',
      description: 'Enter flight number or tail number',
      component: FlightInfoStep,
    },
    {
      id: 'travelDate',
      title: 'Travel Date',
      description: 'Select your travel date',
      component: TravelDateStep,
    },
    {
      id: 'locationDetails',
      title: 'Pickup Details',
      description: 'Enter pickup location details',
      component: LocationDetailsStep,
    },
    {
      id: 'passengerInfo',
      title: 'Passenger Information',
      description: 'Enter passenger details',
      component: PassengerInfoStep,
    },
  ];

  const handleNext = async () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(current => current + 1);
    } else {
      try {
        const response = await createBooking(formData);
        // Handle booking submission success
      } catch (error) {
        // Handle error
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(current => current - 1);
    } else {
      resetBooking();
    }
  };

  const handleStepChange = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const CurrentStepComponent = steps[currentStep].component;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Indicator */}
      <div className="mb-8">
        <div className="relative">
          <div className="h-2 bg-tan-100 dark:bg-navy-700 rounded-full">
            <div
              className="h-2 bg-wine-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
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

      {/* Form Content */}
      <div className="bg-white dark:bg-navy-800 rounded-xl p-6 shadow-lg">
        <CurrentStepComponent
          value={formData[steps[currentStep].id]}
          onChange={(value: any) => handleStepChange(steps[currentStep].id, value)}
          isRoundTrip={formData.tripType === 'roundTrip'}
          serviceLevel={formData.serviceLevel}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handleBack}
          className="flex items-center"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          {currentStep === 0 ? 'Cancel' : 'Back'}
        </Button>

        <Button
          onClick={handleNext}
          className="flex items-center"
        >
          {currentStep === steps.length - 1 ? (
            'Submit Request'
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

export default BookingWizard;
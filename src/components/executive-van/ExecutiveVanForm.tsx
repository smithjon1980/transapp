import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ExecutiveVanBooking } from '../../types/executiveVan';
import CustomerInfoStep from './steps/CustomerInfoStep';
import EventDetailsStep from './steps/EventDetailsStep';
import VanPreferencesStep from './steps/VanPreferencesStep';
import Button from '../ui/Button';

interface ExecutiveVanFormProps {
  onSubmit: (data: ExecutiveVanBooking) => void;
  isSubmitting?: boolean;
}

const ExecutiveVanForm: React.FC<ExecutiveVanFormProps> = ({ onSubmit, isSubmitting }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ExecutiveVanBooking>({
    customerInfo: {
      fullName: '',
      email: '',
      phone: '',
    },
    eventDetails: {
      date: '',
      pickupTime: '',
      pickupLocation: '',
      dropoffLocation: '',
    },
    vanPreferences: {
      passengers: 1,
      luggageCount: 0,
      amenities: {
        wifi: false,
        refreshments: false,
        entertainment: false,
        workstation: false,
      },
    },
  });

  const steps = [
    {
      title: 'Customer Information',
      component: CustomerInfoStep,
    },
    {
      title: 'Event Details',
      component: EventDetailsStep,
    },
    {
      title: 'Van Preferences',
      component: VanPreferencesStep,
    },
  ];

  const handleStepChange = (field: keyof ExecutiveVanBooking, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

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
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white dark:bg-navy-800 rounded-xl p-6 shadow-lg">
        <CurrentStepComponent
          value={formData[steps[currentStep].title.toLowerCase().replace(' ', '') as keyof ExecutiveVanBooking]}
          onChange={(value: any) => handleStepChange(
            steps[currentStep].title.toLowerCase().replace(' ', '') as keyof ExecutiveVanBooking,
            value
          )}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 0}
          className="flex items-center"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <Button
          onClick={handleNext}
          disabled={isSubmitting}
          className="flex items-center"
        >
          {currentStep === steps.length - 1 ? (
            isSubmitting ? 'Processing...' : 'Complete Booking'
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

export default ExecutiveVanForm;
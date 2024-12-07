import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';
import CustomerInfoStep from './steps/CustomerInfoStep';
import EventDetailsStep from './steps/EventDetailsStep';
import VanPreferencesStep from './steps/VanPreferencesStep';
import { BirthdayBookingData } from '../../types/birthday';

interface BirthdayBookingFormProps {
  onSubmit: (data: BirthdayBookingData) => void;
  isSubmitting?: boolean;
}

const BirthdayBookingForm: React.FC<BirthdayBookingFormProps> = ({ onSubmit, isSubmitting }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<BirthdayBookingData>({
    customerInfo: {
      fullName: '',
      email: '',
      phone: '',
    },
    eventDetails: {
      birthdayPerson: '',
      eventDate: '',
      pickupDateTime: '',
      dropoffLocation: '',
      pickupLocation: '',
      numberOfGuests: 1,
      specialInstructions: '',
    },
    vanPreferences: {
      passengerCount: 1,
      vanType: 'standard',
      amenities: [],
      specialRequests: '',
    },
  });

  const steps = [
    {
      title: 'Customer Information',
      description: 'Tell us about yourself',
      component: CustomerInfoStep,
    },
    {
      title: 'Birthday Event Details',
      description: 'Tell us about the celebration',
      component: EventDetailsStep,
    },
    {
      title: 'Van Preferences',
      description: 'Choose your perfect party van',
      component: VanPreferencesStep,
    },
  ];

  const handleStepChange = (key: keyof BirthdayBookingData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value,
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
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="relative">
          <div className="h-2 bg-tan-100 dark:bg-navy-700 rounded-full">
            <div
              className="h-2 bg-wine-500 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
          <div className="absolute top-0 left-0 w-full flex justify-between -mt-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`w-4 h-4 rounded-full ${
                  index <= currentStep
                    ? 'bg-wine-500'
                    : 'bg-tan-100 dark:bg-navy-700'
                } border-2 border-white dark:border-navy-900`}
              />
            ))}
          </div>
        </div>
        
        {/* Step Title */}
        <div className="text-center mt-8">
          <h2 className="text-2xl font-bold text-navy-900 dark:text-tan-50">
            {steps[currentStep].title}
          </h2>
          <p className="text-navy-600 dark:text-tan-200 mt-2">
            {steps[currentStep].description}
          </p>
        </div>
      </div>

      {/* Form Content */}
      <div className="bg-white dark:bg-navy-800 rounded-xl p-6 shadow-lg">
        <CurrentStepComponent
          value={formData[steps[currentStep].title.toLowerCase().replace(' ', '') as keyof BirthdayBookingData]}
          onChange={(value: any) => handleStepChange(
            steps[currentStep].title.toLowerCase().replace(' ', '') as keyof BirthdayBookingData,
            value
          )}
        />
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        {currentStep > 0 && (
          <Button
            variant="outline"
            onClick={handleBack}
            className="flex items-center"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        )}
        
        <div className="flex-1" />
        
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

export default BirthdayBookingForm;
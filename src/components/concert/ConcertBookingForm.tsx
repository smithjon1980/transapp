import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';
import EventDetailsStep from './steps/EventDetailsStep';
import TransportationPlanStep from './steps/TransportationPlanStep';
import GroupDetailsStep from './steps/GroupDetailsStep';
import ContactInfoStep from '../shared/ContactInfoStep';
import { ConcertBookingData } from '../../types/concert';

interface ConcertBookingFormProps {
  onSubmit: (data: ConcertBookingData) => void;
  isSubmitting?: boolean;
}

const ConcertBookingForm: React.FC<ConcertBookingFormProps> = ({ onSubmit, isSubmitting }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ConcertBookingData>({
    eventDetails: {
      venueName: '',
      eventDate: '',
      eventStartTime: '',
      eventEndTime: '',
      eventType: 'concert',
    },
    transportationPlan: {
      pickupLocation: '',
      pickupTime: '',
      returnLocation: '',
      vehiclePreference: 'luxury-sedan',
      passengerCount: 1,
      additionalStops: [],
    },
    groupDetails: {
      totalPassengers: 1,
      hasVIP: false,
      vipServices: {
        priorityEntry: false,
        backstageAccess: false,
        meetAndGreet: false,
      },
    },
    contactInfo: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const steps = [
    { title: 'Event Details', component: EventDetailsStep },
    { title: 'Transportation Plan', component: TransportationPlanStep },
    { title: 'Group Details', component: GroupDetailsStep },
    { title: 'Contact Information', component: ContactInfoStep },
  ];

  const handleStepChange = (field: keyof ConcertBookingData, value: any) => {
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
          value={formData[steps[currentStep].title.toLowerCase().replace(' ', '') as keyof ConcertBookingData]}
          onChange={(value: any) => handleStepChange(
            steps[currentStep].title.toLowerCase().replace(' ', '') as keyof ConcertBookingData,
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

export default ConcertBookingForm;
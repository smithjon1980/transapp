import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Button from '../ui/Button';
import HotelDetailsStep from './steps/HotelDetailsStep';
import TransportationPlanStep from './steps/TransportationPlanStep';
import GuestPreferencesStep from './steps/GuestPreferencesStep';
import ContactInfoStep from '../shared/ContactInfoStep';
import { HotelTransferData } from '../../types/hotel';

interface HotelTransferFormProps {
  onSubmit: (data: HotelTransferData) => void;
  isSubmitting?: boolean;
}

const HotelTransferForm: React.FC<HotelTransferFormProps> = ({ onSubmit, isSubmitting }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<HotelTransferData>({
    hotelDetails: {
      pickupHotel: '',
      dropoffHotel: '',
      date: '',
      time: '',
    },
    transportationPlan: {
      vehicleType: 'luxury-sedan',
      passengerCount: 1,
      luggageCount: 1,
      additionalStops: [],
    },
    guestPreferences: {
      amenities: {
        wifi: false,
        waterService: false,
        newspaper: false,
        childSeat: false,
      },
    },
    contactInfo: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const steps = [
    { title: 'Hotel Details', component: HotelDetailsStep },
    { title: 'Transportation Plan', component: TransportationPlanStep },
    { title: 'Guest Preferences', component: GuestPreferencesStep },
    { title: 'Contact Information', component: ContactInfoStep },
  ];

  const handleStepChange = (field: keyof HotelTransferData, value: any) => {
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
          value={formData[steps[currentStep].title.toLowerCase().replace(' ', '') as keyof HotelTransferData]}
          onChange={(value: any) => handleStepChange(
            steps[currentStep].title.toLowerCase().replace(' ', '') as keyof HotelTransferData,
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

export default HotelTransferForm;
import React, { useState } from 'react';
import ServiceButtons from './ServiceButtons';
import AirportTransferForm from './airport/AirportTransferForm';
import CityTransferForm from './city/CityTransferForm';
import MedicalTransferForm from './medical/MedicalTransferForm';
import { useLanguage } from '../utils/LanguageContext';
import { createBooking } from '../services/bookingService';
import { BookingResponse } from '../types/booking';
import BookingConfirmation from './BookingConfirmation';

const BookingSection = () => {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [bookingConfirmation, setBookingConfirmation] = useState<BookingResponse | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleServiceSelect = (serviceType: string) => {
    setSelectedService(serviceType);
    setShowForm(true);
    setBookingConfirmation(null);
    setError(null);
  };

  const handleBookingSubmit = async (data: any) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const confirmation = await createBooking(data);
      setBookingConfirmation(confirmation);
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSelectedService(null);
    setShowForm(false);
    setBookingConfirmation(null);
    setError(null);
  };

  const renderForm = () => {
    switch (selectedService) {
      case 'airportTransfer':
        return (
          <AirportTransferForm
            onSubmit={handleBookingSubmit}
            isSubmitting={isSubmitting}
          />
        );
      case 'cityTransfer':
        return (
          <CityTransferForm
            onSubmit={handleBookingSubmit}
            isSubmitting={isSubmitting}
          />
        );
      case 'medicalTransport':
        return (
          <MedicalTransferForm
            onSubmit={handleBookingSubmit}
            isSubmitting={isSubmitting}
          />
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    if (bookingConfirmation) {
      return <BookingConfirmation booking={bookingConfirmation} onReset={handleReset} />;
    }

    if (showForm && selectedService) {
      return (
        <div className="mt-8 sm:mt-12 max-w-2xl mx-auto">
          <div className="wizard-step">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-navy-900 dark:text-tan-50">
              {t('header.completeBooking')}
            </h3>
            {error && (
              <div className="mb-6 p-4 bg-wine-50 border border-wine-200 rounded-lg text-wine-700">
                {error}
              </div>
            )}
            {renderForm()}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-navy-900 dark:text-tan-50">
            {t('header.chooseService')}
          </h2>
          <p className="text-base sm:text-lg text-navy-600 dark:text-tan-200 max-w-2xl mx-auto">
            {t('header.chooseService.subtitle')}
          </p>
        </div>

        <ServiceButtons
          onServiceSelect={handleServiceSelect}
          selectedService={selectedService}
        />

        {renderContent()}
      </div>
    </div>
  );
};

export default BookingSection;
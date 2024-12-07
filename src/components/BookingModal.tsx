import React from 'react';
import { X } from 'lucide-react';
import { useBookingStore } from '../store/bookingStore';
import ServiceSelector from './ServiceSelector';
import BookingWizard from './BookingWizard';

const BookingModal: React.FC = () => {
  const { isBookingModalOpen, closeBookingModal, selectedService } = useBookingStore();

  if (!isBookingModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={closeBookingModal} 
      />

      {/* Modal */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative bg-white dark:bg-navy-800 rounded-2xl shadow-xl w-full max-w-5xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-tan-200 dark:border-navy-700">
            <h2 className="text-xl font-bold text-navy-900 dark:text-tan-50">
              {selectedService ? 'Complete Booking' : 'Select Service Type'}
            </h2>
            <button
              onClick={closeBookingModal}
              className="p-2 rounded-lg hover:bg-tan-100 dark:hover:bg-navy-700 transition-colors"
            >
              <X className="w-5 h-5 text-navy-600 dark:text-tan-200" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {selectedService ? (
              <BookingWizard />
            ) : (
              <ServiceSelector inModal />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
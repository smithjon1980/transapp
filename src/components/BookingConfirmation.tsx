import React from 'react';
import { CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { BookingResponse } from '../types/booking';
import Button from './ui/Button';

interface BookingConfirmationProps {
  booking: BookingResponse;
  onReset: () => void;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ booking, onReset }) => {
  const isPending = booking.status === 'pending';

  return (
    <div className="mt-8 max-w-2xl mx-auto">
      <div className="bg-white dark:bg-navy-800 rounded-2xl p-8 shadow-lg text-center">
        <div className="flex justify-center mb-6">
          {isPending ? (
            <Clock className="w-16 h-16 text-navy-500 dark:text-tan-300" />
          ) : booking.status === 'confirmed' ? (
            <CheckCircle className="w-16 h-16 text-green-500" />
          ) : (
            <AlertCircle className="w-16 h-16 text-wine-500" />
          )}
        </div>
        
        <h3 className="text-2xl font-bold text-navy-900 dark:text-tan-50 mb-4">
          {isPending ? 'Booking Submitted!' : 'Booking ' + booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
        </h3>
        
        <div className="space-y-4 mb-8">
          {isPending ? (
            <>
              <p className="text-navy-600 dark:text-tan-200">
                Your booking request has been submitted and is pending approval from our dispatch manager.
              </p>
              <div className="bg-tan-50 dark:bg-navy-700 rounded-lg p-6 text-left">
                <p className="text-sm text-navy-500 dark:text-tan-300 mb-2">
                  Estimated Response Time
                </p>
                <p className="text-lg font-medium text-navy-900 dark:text-tan-50">
                  {booking.estimatedResponseTime}
                </p>
                <p className="text-sm text-navy-600 dark:text-tan-200 mt-4">
                  We will notify you via email once your booking is confirmed.
                </p>
              </div>
            </>
          ) : (
            <div className="bg-tan-50 dark:bg-navy-700 rounded-lg p-6 space-y-3">
              {booking.confirmationNumber && (
                <div>
                  <span className="text-sm text-navy-500 dark:text-tan-300">Confirmation Number</span>
                  <p className="text-lg font-semibold text-navy-900 dark:text-tan-50">
                    {booking.confirmationNumber}
                  </p>
                </div>
              )}
              
              {booking.totalPrice && (
                <div>
                  <span className="text-sm text-navy-500 dark:text-tan-300">Total Price</span>
                  <p className="text-lg font-semibold text-navy-900 dark:text-tan-50">
                    ${booking.totalPrice.toFixed(2)}
                  </p>
                </div>
              )}
              
              <div>
                <span className="text-sm text-navy-500 dark:text-tan-300">Status</span>
                <p className={`text-lg font-semibold ${
                  booking.status === 'confirmed' ? 'text-green-600' : 'text-wine-500'
                }`}>
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </p>
              </div>
            </div>
          )}
        </div>
        
        <div className="space-y-3">
          {!isPending && (
            <Button
              variant="primary"
              className="w-full"
              onClick={() => window.print()}
            >
              Print {booking.status === 'confirmed' ? 'Confirmation' : 'Details'}
            </Button>
          )}
          
          <Button
            variant="outline"
            className="w-full"
            onClick={onReset}
          >
            Book Another Transfer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
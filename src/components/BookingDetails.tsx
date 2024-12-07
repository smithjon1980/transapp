import React from 'react';
import { useBookingStore } from '../store/bookingStore';
import { MapPin, Users, Calendar, Clock, Plane } from 'lucide-react';
import Button from './ui/Button';

const BookingDetails = () => {
  const { selectedBooking, updateBookingStatus } = useBookingStore();

  if (!selectedBooking) return null;

  const handleStatusUpdate = async (status: 'confirmed' | 'rejected') => {
    await updateBookingStatus(selectedBooking.id, status);
  };

  return (
    <div className="bg-white dark:bg-navy-800 rounded-lg shadow-lg p-6">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold text-navy-900 dark:text-tan-50 mb-2">
            Booking Details
          </h2>
          <p className="text-sm text-navy-500 dark:text-tan-300">
            ID: {selectedBooking.id}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h3 className="text-sm font-medium text-navy-900 dark:text-tan-50 mb-2">
              Customer Information
            </h3>
            <div className="space-y-2">
              <p className="text-sm text-navy-600 dark:text-tan-200">
                {selectedBooking.customer.name}
              </p>
              <p className="text-sm text-navy-600 dark:text-tan-200">
                {selectedBooking.customer.email}
              </p>
              <p className="text-sm text-navy-600 dark:text-tan-200">
                {selectedBooking.customer.phone}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-navy-900 dark:text-tan-50 mb-2">
              Service Details
            </h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-navy-500" />
                <span className="text-sm text-navy-600 dark:text-tan-200">
                  {selectedBooking.serviceDetails.date}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-navy-500" />
                <span className="text-sm text-navy-600 dark:text-tan-200">
                  {selectedBooking.serviceDetails.time}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-navy-500" />
                <span className="text-sm text-navy-600 dark:text-tan-200">
                  {selectedBooking.serviceDetails.passengers} passengers
                </span>
              </div>
            </div>
          </div>
        </div>

        {selectedBooking.flightInfo && (
          <div>
            <h3 className="text-sm font-medium text-navy-900 dark:text-tan-50 mb-2">
              Flight Information
            </h3>
            <div className="flex items-center space-x-2">
              <Plane className="w-4 h-4 text-navy-500" />
              <span className="text-sm text-navy-600 dark:text-tan-200">
                {selectedBooking.flightInfo.number} ({selectedBooking.flightInfo.direction})
              </span>
            </div>
          </div>
        )}

        <div>
          <h3 className="text-sm font-medium text-navy-900 dark:text-tan-50 mb-2">
            Locations
          </h3>
          <div className="space-y-2">
            {selectedBooking.serviceDetails.pickup.map((location, index) => (
              <div key={index} className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 text-navy-500 mt-1" />
                <div>
                  <p className="text-sm text-navy-600 dark:text-tan-200">
                    Pickup {index + 1}: {location}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex items-start space-x-2">
              <MapPin className="w-4 h-4 text-navy-500 mt-1" />
              <div>
                <p className="text-sm text-navy-600 dark:text-tan-200">
                  Dropoff: {selectedBooking.serviceDetails.dropoff}
                </p>
              </div>
            </div>
          </div>
        </div>

        {selectedBooking.status === 'pending' && (
          <div className="flex space-x-4">
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => handleStatusUpdate('confirmed')}
            >
              Confirm Booking
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => handleStatusUpdate('rejected')}
            >
              Reject Booking
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingDetails;
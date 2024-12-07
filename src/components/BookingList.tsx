import React from 'react';
import { useDispatchStore } from '../store/dispatchStore';
import { formatDistanceToNow } from 'date-fns';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '../utils/cn';

const BookingList: React.FC = () => {
  const { bookings, setSelectedBooking, selectedBooking } = useDispatchStore();

  if (!bookings.length) {
    return (
      <div className="text-center py-8 text-navy-500 dark:text-tan-300">
        No bookings found
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {bookings.map((booking) => {
        const StatusIcon = {
          pending: Clock,
          confirmed: CheckCircle,
          rejected: XCircle,
        }[booking.status];

        const statusStyles = {
          pending: 'text-yellow-500',
          confirmed: 'text-green-500',
          rejected: 'text-red-500',
        }[booking.status];

        return (
          <button
            key={booking.id}
            onClick={() => setSelectedBooking(booking)}
            className={cn(
              'w-full text-left p-4 rounded-lg transition-colors',
              'hover:bg-gray-50 dark:hover:bg-navy-700/50',
              selectedBooking?.id === booking.id && 'bg-gray-50 dark:bg-navy-700/50'
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <StatusIcon className={cn('w-5 h-5', statusStyles)} />
                <div>
                  <h3 className="font-medium text-navy-900 dark:text-tan-50">
                    {booking.customer.name}
                  </h3>
                  <p className="text-sm text-navy-500 dark:text-tan-300">
                    {booking.type.charAt(0).toUpperCase() + booking.type.slice(1)} Transfer
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-navy-600 dark:text-tan-200">
                  {formatDistanceToNow(new Date(booking.submittedAt), { addSuffix: true })}
                </p>
                <p className="text-sm font-medium text-navy-500 dark:text-tan-300">
                  {booking.serviceDetails.date} at {booking.serviceDetails.time}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default BookingList;
import React from 'react';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { Booking } from '../types/booking';

interface BookingListItemProps {
  booking: Booking;
  onSelect: () => void;
}

const BookingListItem: React.FC<BookingListItemProps> = ({ booking, onSelect }) => {
  const StatusIcon = {
    pending: Clock,
    confirmed: CheckCircle,
    rejected: XCircle,
  }[booking.status];

  const statusColors = {
    pending: 'text-navy-500',
    confirmed: 'text-green-500',
    rejected: 'text-wine-500',
  }[booking.status];

  return (
    <div
      className="bg-white dark:bg-navy-800 rounded-lg shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow"
      onClick={onSelect}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <StatusIcon className={`w-5 h-5 ${statusColors}`} />
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
    </div>
  );
};

export default BookingListItem;
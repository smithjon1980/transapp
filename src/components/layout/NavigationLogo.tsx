import React from 'react';
import { Car } from 'lucide-react';
import { useBookingStore } from '../../store/bookingStore';

const NavigationLogo: React.FC = () => {
  const { resetBooking } = useBookingStore();

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    resetBooking();
    window.location.href = '/';
  };

  return (
    <a 
      href="/" 
      onClick={handleHomeClick}
      className="flex items-center space-x-2"
    >
      <Car className="w-8 h-8 text-wine-500" />
      <span className="text-xl font-bold text-navy-900 dark:text-tan-50">
        Premium Transport
      </span>
    </a>
  );
};

export default NavigationLogo;
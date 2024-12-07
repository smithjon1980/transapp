import React from 'react';
import { cn } from '../../utils/cn';
import NavigationLinks from './NavigationLinks';

interface NavigationMobileProps {
  isOpen: boolean;
  onClose: () => void;
}

const NavigationMobile: React.FC<NavigationMobileProps> = ({ isOpen, onClose }) => {
  return (
    <div
      className={cn(
        "md:hidden fixed inset-0 z-50 transform transition-transform duration-300",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Menu Content */}
      <div className="absolute right-0 top-0 bottom-0 w-64 bg-white dark:bg-navy-800 shadow-xl">
        <div className="p-6 space-y-4">
          <div className="flex flex-col space-y-2">
            <NavigationLinks />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationMobile;
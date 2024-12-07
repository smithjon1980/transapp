import React from 'react';
import { useBookingStore } from '../../store/bookingStore';
import { cn } from '../../utils/cn';
import { useLocation } from '../hooks/useLocation';

const NavigationLinks: React.FC = () => {
  const { currentPath } = useLocation();
  const { resetBooking } = useBookingStore();

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    resetBooking();
    window.location.href = href;
  };

  const navigationItems = [
    { href: '/', label: 'Home' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      {navigationItems.map((item) => (
        <a
          key={item.label}
          href={item.href}
          onClick={(e) => handleNavClick(e, item.href)}
          className={cn(
            "px-3 py-2 rounded-lg text-sm font-medium transition-colors",
            "hover:bg-tan-50 dark:hover:bg-navy-700",
            currentPath === item.href
              ? "text-wine-600 dark:text-wine-400"
              : "text-navy-600 dark:text-tan-200"
          )}
        >
          {item.label}
        </a>
      ))}
    </>
  );
};

export default NavigationLinks;
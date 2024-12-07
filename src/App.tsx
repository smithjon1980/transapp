import React from 'react';
import { useTheme } from './utils/ThemeContext';
import { useAuthStore } from './store/authStore';
import ThemeToggle from './components/ThemeToggle';
import LanguageToggle from './components/LanguageToggle';
import ServiceSelector from './components/ServiceSelector';
import BookingWizard from './components/BookingWizard';
import Dashboard from './components/Dashboard';
import { useBookingStore } from './store/bookingStore';
import BackgroundPattern from './components/BackgroundPattern';
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import AuthGuard from './components/auth/AuthGuard';

export default function App() {
  const { theme } = useTheme();
  const { selectedService } = useBookingStore();
  const { user } = useAuthStore();

  const renderContent = () => {
    if (user?.role === 'dispatcher') {
      return (
        <AuthGuard requiredRole="dispatcher">
          <Dashboard />
        </AuthGuard>
      );
    }

    return selectedService ? (
      <AuthGuard requiredRole="client">
        <BookingWizard />
      </AuthGuard>
    ) : (
      <ServiceSelector />
    );
  };

  return (
    <div className="min-h-screen bg-tan-50 dark:bg-navy-900 relative">
      <BackgroundPattern />

      {/* Navigation */}
      <Navigation />

      {/* Content */}
      <div className="relative z-10 pt-16">
        <div className="fixed top-4 right-4 flex items-center space-x-4">
          <LanguageToggle />
          <ThemeToggle />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          {renderContent()}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};
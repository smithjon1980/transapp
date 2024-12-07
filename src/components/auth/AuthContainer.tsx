import React, { useState } from 'react';
import { useBookingStore } from '../../store/bookingStore';
import { useAuthStore } from '../../store/authStore';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import ServiceSelector from '../ServiceSelector';
import { ServiceType } from '../../types/booking';

type AuthView = 'login' | 'signup' | 'affiliate-signup';

const serviceTypeToRole = {
  airport: ['client', 'dispatcher'],
  birthday: ['client', 'dispatcher'],
  concert: ['client', 'dispatcher'],
  dinner: ['client', 'dispatcher'],
  hotel: ['client', 'dispatcher', 'affiliate'],
  sports: ['client', 'dispatcher'],
} as const;

const AuthContainer: React.FC = () => {
  const [view, setView] = useState<AuthView>('login');
  const { selectedService } = useBookingStore();
  const { user } = useAuthStore();

  const allowedRoles = selectedService ? serviceTypeToRole[selectedService] : ['client', 'dispatcher', 'affiliate'];

  // If user is logged in, show service selector
  if (user) {
    return (
      <div className="min-h-screen bg-tan-50 dark:bg-navy-900">
        <ServiceSelector />
      </div>
    );
  }

  const renderView = () => {
    switch (view) {
      case 'signup':
        return <SignUpForm onBack={() => setView('login')} />;
      case 'affiliate-signup':
        return <SignUpForm onBack={() => setView('login')} isAffiliate />;
      default:
        return (
          <LoginForm
            onSignUpClick={() => setView('signup')}
            onAffiliateSignUpClick={() => setView('affiliate-signup')}
            allowedRoles={allowedRoles}
            serviceType={selectedService}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-tan-50 dark:bg-navy-900">
      <div className="w-full max-w-md">
        {renderView()}
      </div>
    </div>
  );
};

export default AuthContainer;
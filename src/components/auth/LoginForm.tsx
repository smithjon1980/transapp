import React, { useState } from 'react';
import { Mail, Lock, LogIn } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useBookingStore } from '../../store/bookingStore';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { cn } from '../../utils/cn';
import { UserRole } from '../../types/auth';
import { ServiceType } from '../../types/booking';
import TwoFactorVerification from './TwoFactorVerification';

interface LoginFormProps {
  onSignUpClick: () => void;
  onAffiliateSignUpClick: () => void;
  allowedRoles: UserRole[];
  serviceType?: ServiceType | null;
}

const roleLabels: Record<UserRole, string> = {
  client: 'Client',
  dispatcher: 'Dispatcher',
  affiliate: 'Affiliate',
};

const LoginForm: React.FC<LoginFormProps> = ({ 
  onSignUpClick,
  onAffiliateSignUpClick,
  allowedRoles,
  serviceType,
}) => {
  const { 
    login, 
    error, 
    isLoading, 
    twoFactorPending, 
    pendingUserId, 
    verifyTwoFactor, 
    cancelTwoFactor 
  } = useAuthStore();
  
  const { resetBooking } = useBookingStore();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<UserRole>(allowedRoles[0]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let loginEmail = email;
    
    if (userType === 'dispatcher' && !email.includes('@')) {
      loginEmail = `${email}@dispatch.premiumtransport.com`;
    } else if (userType === 'affiliate' && !email.includes('@')) {
      loginEmail = `${email}@partner.com`;
    }

    try {
      await login({ email: loginEmail, password, userType });
      if (!twoFactorPending) {
        resetBooking();
      }
    } catch (err) {
      // Error is handled by the store
    }
  };

  const handleVerifyTwoFactor = async (code: string) => {
    if (!pendingUserId) return;
    
    await verifyTwoFactor({
      userId: pendingUserId,
      code,
      method: userType === 'dispatcher' ? 'sms' : 'email',
    });

    if (!error) {
      resetBooking();
    }
  };

  if (twoFactorPending) {
    return (
      <TwoFactorVerification
        onVerify={handleVerifyTwoFactor}
        onCancel={cancelTwoFactor}
        method={userType === 'dispatcher' ? 'sms' : 'email'}
        isLoading={isLoading}
        error={error}
      />
    );
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-navy-800 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-navy-900 dark:text-tan-50 mb-2">
            {serviceType ? `Book ${serviceType.charAt(0).toUpperCase() + serviceType.slice(1)} Service` : 'Welcome Back'}
          </h2>
          <p className="text-navy-600 dark:text-tan-200">
            Sign in to your account to continue
          </p>
        </div>

        {/* User Type Selector */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {allowedRoles.map((type) => (
            <button
              key={type}
              onClick={() => setUserType(type)}
              className={cn(
                'py-3 px-4 rounded-xl text-sm font-medium transition-all',
                userType === type
                  ? 'bg-wine-500 text-white'
                  : 'bg-tan-100 text-navy-600 hover:bg-tan-200 dark:bg-navy-700 dark:text-tan-200'
              )}
            >
              {roleLabels[type]}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label={userType === 'client' ? 'Email' : 'Username'}
            type={userType === 'client' ? 'email' : 'text'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={userType === 'client' ? 'Enter email' : 'Enter username'}
            icon={Mail}
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            icon={Lock}
            required
          />

          {error && (
            <div className="text-sm text-wine-600 bg-wine-50 dark:bg-wine-900/20 p-3 rounded-lg">
              {error}
            </div>
          )}

          <Button
            type="submit"
            className="w-full"
            disabled={isLoading}
          >
            <LogIn className="w-4 h-4 mr-2" />
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
        </form>

        {userType === 'client' && (
          <div className="mt-6 text-center">
            <p className="text-sm text-navy-600 dark:text-tan-200">
              Don't have an account?{' '}
              <button 
                type="button"
                onClick={onSignUpClick}
                className="text-wine-500 hover:text-wine-600 font-medium"
              >
                Sign Up
              </button>
            </p>
          </div>
        )}

        {userType === 'affiliate' && (
          <div className="mt-6 text-center">
            <p className="text-sm text-navy-600 dark:text-tan-200">
              Want to become an affiliate?{' '}
              <button 
                type="button"
                onClick={onAffiliateSignUpClick}
                className="text-wine-500 hover:text-wine-600 font-medium"
              >
                Apply Now
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
import React, { useState } from 'react';
import { Shield, ArrowLeft } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { TwoFactorMethod } from '../../types/auth';
import { cn } from '../../utils/cn';

interface TwoFactorVerificationProps {
  onVerify: (code: string) => Promise<void>;
  onCancel: () => void;
  method: TwoFactorMethod;
  isLoading?: boolean;
  error?: string;
}

const TwoFactorVerification: React.FC<TwoFactorVerificationProps> = ({
  onVerify,
  onCancel,
  method,
  isLoading,
  error,
}) => {
  const [code, setCode] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onVerify(code);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-navy-800 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-wine-50 dark:bg-wine-900/20 rounded-full flex items-center justify-center">
              <Shield className="w-8 h-8 text-wine-500" />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-navy-900 dark:text-tan-50 mb-2">
            Two-Factor Authentication
          </h2>
          <p className="text-navy-600 dark:text-tan-200">
            {method === 'sms' 
              ? 'Enter the verification code sent to your phone'
              : 'Enter the verification code sent to your email'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Verification Code"
            value={code}
            onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
            placeholder="Enter 6-digit code"
            pattern="\d{6}"
            maxLength={6}
            required
            className="text-center text-2xl tracking-wide"
          />

          {error && (
            <div className="text-sm text-wine-600 bg-wine-50 dark:bg-wine-900/20 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-3">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || code.length !== 6}
            >
              {isLoading ? 'Verifying...' : 'Verify Code'}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onCancel}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Login
            </Button>
          </div>
        </form>

        <div className="mt-6 text-center">
          <button 
            className="text-sm text-wine-500 hover:text-wine-600 font-medium"
            onClick={() => {/* Implement resend logic */}}
          >
            Didn't receive a code? Send again
          </button>
        </div>
      </div>
    </div>
  );
};

export default TwoFactorVerification;
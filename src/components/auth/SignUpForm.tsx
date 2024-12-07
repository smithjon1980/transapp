import React, { useState } from 'react';
import { Mail, Lock, User, Phone, Building2 } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { cn } from '../../utils/cn';
import { useAuthStore } from '../../store/authStore';

interface SignUpFormProps {
  onSuccess?: () => void;
  onBack: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ onSuccess, onBack }) => {
  const { register, isLoading, error } = useAuthStore();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    company: '',
    agreeToTerms: false,
  });

  const handleChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      // Handle password mismatch
      return;
    }

    try {
      await register({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
        company: formData.company,
      });
      onSuccess?.();
    } catch (err) {
      // Error handled by store
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white dark:bg-navy-800 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-navy-900 dark:text-tan-50 mb-2">
            Create Your Account
          </h2>
          <p className="text-navy-600 dark:text-tan-200">
            Join us to start booking premium transportation services
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              value={formData.firstName}
              onChange={handleChange('firstName')}
              placeholder="Enter first name"
              icon={User}
              required
            />

            <Input
              label="Last Name"
              value={formData.lastName}
              onChange={handleChange('lastName')}
              placeholder="Enter last name"
              icon={User}
              required
            />
          </div>

          <Input
            label="Email"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            placeholder="your@email.com"
            icon={Mail}
            required
          />

          <Input
            label="Phone Number"
            type="tel"
            value={formData.phone}
            onChange={handleChange('phone')}
            placeholder="Enter phone number"
            icon={Phone}
            required
          />

          <Input
            label="Company (Optional)"
            value={formData.company}
            onChange={handleChange('company')}
            placeholder="Enter company name"
            icon={Building2}
          />

          <Input
            label="Password"
            type="password"
            value={formData.password}
            onChange={handleChange('password')}
            placeholder="Create password"
            icon={Lock}
            required
          />

          <Input
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
            placeholder="Confirm password"
            icon={Lock}
            required
          />

          <div className="flex items-start space-x-2">
            <input
              type="checkbox"
              id="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange('agreeToTerms')}
              className="mt-1 rounded border-tan-200 text-wine-500 focus:ring-wine-500"
              required
            />
            <label 
              htmlFor="agreeToTerms" 
              className="text-sm text-navy-600 dark:text-tan-200"
            >
              I agree to the{' '}
              <button type="button" className="text-wine-500 hover:text-wine-600">
                Terms of Service
              </button>
              {' '}and{' '}
              <button type="button" className="text-wine-500 hover:text-wine-600">
                Privacy Policy
              </button>
            </label>
          </div>

          {error && (
            <div className="text-sm text-wine-600 bg-wine-50 dark:bg-wine-900/20 p-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="space-y-3">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading || !formData.agreeToTerms}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onBack}
            >
              Back to Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
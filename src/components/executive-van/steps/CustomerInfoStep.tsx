import React from 'react';
import { User, Mail, Phone } from 'lucide-react';
import Input from '../../ui/Input';

interface CustomerInfoStepProps {
  value: {
    fullName: string;
    email: string;
    phone: string;
  };
  onChange: (value: any) => void;
}

const CustomerInfoStep: React.FC<CustomerInfoStepProps> = ({ value, onChange }) => {
  const handleChange = (field: string) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange({
      ...value,
      [field]: e.target.value,
    });
  };

  return (
    <div className="space-y-6">
      <Input
        label="Full Name"
        value={value.fullName}
        onChange={handleChange('fullName')}
        placeholder="Enter your full name"
        icon={User}
        required
      />

      <Input
        label="Email Address"
        type="email"
        value={value.email}
        onChange={handleChange('email')}
        placeholder="your@email.com"
        icon={Mail}
        required
      />

      <Input
        label="Phone Number"
        type="tel"
        value={value.phone}
        onChange={handleChange('phone')}
        placeholder="Your phone number"
        icon={Phone}
        required
      />
    </div>
  );
};

export default CustomerInfoStep;
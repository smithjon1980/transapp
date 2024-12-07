import React from 'react';
import { User, Mail, Phone } from 'lucide-react';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import { CustomerInfo } from '../../../types/birthday';

interface CustomerInfoFormProps {
  initialData: CustomerInfo;
  onSubmit: (data: CustomerInfo) => void;
}

const CustomerInfoForm: React.FC<CustomerInfoFormProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = React.useState(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-navy-900 dark:text-tan-50">
          Customer Information
        </h2>
        <p className="text-navy-600 dark:text-tan-200 mt-2">
          Please provide your contact details
        </p>
      </div>

      <Input
        label="Full Name"
        value={formData.fullName}
        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
        placeholder="Enter your full name"
        icon={User}
        required
      />

      <Input
        label="Email Address"
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="your@email.com"
        icon={Mail}
        required
      />

      <Input
        label="Phone Number"
        type="tel"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        placeholder="Your phone number"
        icon={Phone}
        required
      />

      <Button type="submit" className="w-full mt-8">
        Continue
      </Button>
    </form>
  );
};

export default CustomerInfoForm;
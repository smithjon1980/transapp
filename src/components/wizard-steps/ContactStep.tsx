import React from 'react';
import { User, Mail, Phone } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface ContactStepProps {
  formData: any;
  onSubmit: (data: any) => void;
}

const ContactStep: React.FC<ContactStepProps> = ({ formData, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    onSubmit({
      name: form.name.value,
      email: form.email.value,
      phone: form.phone.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Input
          label="Full Name"
          id="name"
          name="name"
          icon={User}
          required
          defaultValue={formData.name}
          placeholder="Enter your full name"
        />

        <Input
          label="Email"
          id="email"
          name="email"
          type="email"
          icon={Mail}
          required
          defaultValue={formData.email}
          placeholder="your@email.com"
        />

        <Input
          label="Phone Number"
          id="phone"
          name="phone"
          type="tel"
          icon={Phone}
          required
          defaultValue={formData.phone}
          placeholder="Your phone number"
        />
      </div>

      <Button type="submit" className="w-full">
        Complete Booking
      </Button>
    </form>
  );
};

export default ContactStep;
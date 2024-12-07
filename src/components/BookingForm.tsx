import React, { useState } from 'react';
import Input from './ui/Input';
import Button from './ui/Button';
import { MapPin, Calendar, Clock, Mail, User } from 'lucide-react';

interface BookingFormProps {
  serviceType: string;
  onSubmit: (data: BookingFormData) => void;
}

interface BookingFormData {
  name: string;
  email: string;
  date: string;
  time: string;
  pickupLocation: string;
  dropoffLocation: string;
  specialRequests?: string;
}

const BookingForm: React.FC<BookingFormProps> = ({ serviceType, onSubmit }) => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    email: '',
    date: '',
    time: '',
    pickupLocation: '',
    dropoffLocation: '',
    specialRequests: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getLocationPlaceholder = (field: 'pickupLocation' | 'dropoffLocation') => {
    switch (serviceType) {
      case 'airportTransfer':
        return field === 'pickupLocation' 
          ? 'Airport terminal'
          : 'Destination address';
      case 'cityTransfer':
        return field === 'pickupLocation'
          ? 'Pickup location'
          : 'Optional destination';
      case 'medicalTransport':
        return field === 'pickupLocation'
          ? 'Pickup location'
          : 'Medical facility';
      default:
        return 'Enter address';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      await onSubmit(formData);
      setFormData({
        name: '',
        email: '',
        date: '',
        time: '',
        pickupLocation: '',
        dropoffLocation: '',
        specialRequests: '',
      });
    } catch (error) {
      console.error('Submission error:', error);
      setErrors({
        submit: 'Failed to submit booking. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Input
          label="Pickup Location"
          id="pickupLocation"
          name="pickupLocation"
          required
          value={formData.pickupLocation}
          onChange={handleChange}
          placeholder={getLocationPlaceholder('pickupLocation')}
          icon={MapPin}
          error={errors.pickupLocation}
        />

        <Input
          label="Dropoff Location"
          id="dropoffLocation"
          name="dropoffLocation"
          required={serviceType !== 'cityTransfer'}
          value={formData.dropoffLocation}
          onChange={handleChange}
          placeholder={getLocationPlaceholder('dropoffLocation')}
          icon={MapPin}
          error={errors.dropoffLocation}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Date"
            id="date"
            name="date"
            type="date"
            required
            value={formData.date}
            onChange={handleChange}
            icon={Calendar}
            error={errors.date}
            min={new Date().toISOString().split('T')[0]}
          />

          <Input
            label="Time"
            id="time"
            name="time"
            type="time"
            required
            value={formData.time}
            onChange={handleChange}
            icon={Clock}
            error={errors.time}
          />
        </div>

        <Input
          label="Full Name"
          id="name"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          icon={User}
          error={errors.name}
        />

        <Input
          label="Email"
          id="email"
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="your@email.com"
          icon={Mail}
          error={errors.email}
        />

        <div>
          <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700 mb-1">
            Special Requests
          </label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            rows={2}
            value={formData.specialRequests}
            onChange={handleChange}
            placeholder="Any special requirements?"
            className="w-full rounded-lg border-2 border-gray-200 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {errors.submit && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
          {errors.submit}
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Processing...' : 'Complete Booking'}
      </Button>
    </form>
  );
};

export default BookingForm;
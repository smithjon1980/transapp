import React, { useState } from 'react';
import { Clock, MapPin, Users, FileText } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { CityTransferData } from '../../types/cityTransfer';

interface CityTransferFormProps {
  onSubmit: (data: CityTransferData) => void;
  isSubmitting?: boolean;
}

const CityTransferForm: React.FC<CityTransferFormProps> = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState<CityTransferData>({
    serviceType: 'hourly',
    hours: 4,
    pickupLocation: '',
    pickupDate: '',
    pickupTime: '',
    passengerCount: 1,
    itinerary: [''],
    contactInfo: {
      name: '',
      email: '',
      phone: '',
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleContactChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value
      }
    }));
  };

  const addItineraryStop = () => {
    setFormData(prev => ({
      ...prev,
      itinerary: [...(prev.itinerary || []), '']
    }));
  };

  const updateItineraryStop = (index: number, value: string) => {
    setFormData(prev => {
      const newItinerary = [...(prev.itinerary || [])];
      newItinerary[index] = value;
      return {
        ...prev,
        itinerary: newItinerary
      };
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-navy-900 dark:text-tan-50 mb-2">
              Service Type
            </label>
            <div className="flex space-x-4">
              {['hourly', 'fullDay'].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleChange('serviceType', type)}
                  className={`px-4 py-2 rounded-lg ${
                    formData.serviceType === type
                      ? 'bg-wine-500 text-white'
                      : 'bg-tan-100 text-navy-600 dark:bg-navy-700 dark:text-tan-200'
                  }`}
                >
                  {type === 'hourly' ? 'Hourly Service' : 'Full Day'}
                </button>
              ))}
            </div>
          </div>

          {formData.serviceType === 'hourly' && (
            <Input
              label="Number of Hours"
              type="number"
              value={formData.hours}
              onChange={(e) => handleChange('hours', parseInt(e.target.value))}
              min={2}
              max={12}
              icon={Clock}
              required
            />
          )}
        </div>

        <Input
          label="Pickup Location"
          value={formData.pickupLocation}
          onChange={(e) => handleChange('pickupLocation', e.target.value)}
          placeholder="Enter pickup address"
          icon={MapPin}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Date"
            type="date"
            value={formData.pickupDate}
            onChange={(e) => handleChange('pickupDate', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            icon={Clock}
            required
          />

          <Input
            label="Time"
            type="time"
            value={formData.pickupTime}
            onChange={(e) => handleChange('pickupTime', e.target.value)}
            icon={Clock}
            required
          />
        </div>

        <Input
          label="Number of Passengers"
          type="number"
          value={formData.passengerCount}
          onChange={(e) => handleChange('passengerCount', parseInt(e.target.value))}
          min={1}
          max={8}
          icon={Users}
          required
        />

        <div className="space-y-4">
          <label className="block text-sm font-medium text-navy-900 dark:text-tan-50">
            Planned Stops
          </label>
          {formData.itinerary?.map((stop, index) => (
            <Input
              key={index}
              value={stop}
              onChange={(e) => updateItineraryStop(index, e.target.value)}
              placeholder={`Stop ${index + 1}`}
              icon={MapPin}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            onClick={addItineraryStop}
            className="w-full"
          >
            Add Another Stop
          </Button>
        </div>

        <div className="space-y-4">
          <Input
            label="Full Name"
            value={formData.contactInfo.name}
            onChange={(e) => handleContactChange('name', e.target.value)}
            placeholder="Enter your full name"
            required
          />

          <Input
            label="Email"
            type="email"
            value={formData.contactInfo.email}
            onChange={(e) => handleContactChange('email', e.target.value)}
            placeholder="your@email.com"
            required
          />

          <Input
            label="Phone"
            type="tel"
            value={formData.contactInfo.phone}
            onChange={(e) => handleContactChange('phone', e.target.value)}
            placeholder="Your phone number"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-navy-900 dark:text-tan-50 mb-2">
            Special Requests
          </label>
          <textarea
            value={formData.specialRequests}
            onChange={(e) => handleChange('specialRequests', e.target.value)}
            placeholder="Any special requirements?"
            className="w-full rounded-lg border-2 border-tan-200 dark:border-navy-600 p-3 bg-white/95 dark:bg-navy-800/95"
            rows={3}
          />
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? 'Processing...' : 'Complete Booking'}
      </Button>
    </form>
  );
};

export default CityTransferForm;
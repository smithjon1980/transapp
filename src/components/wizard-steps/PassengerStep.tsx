import React from 'react';
import { Users, Briefcase } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';

interface PassengerStepProps {
  formData: any;
  onSubmit: (data: any) => void;
}

const PassengerStep: React.FC<PassengerStepProps> = ({ formData, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    onSubmit({
      passengers: parseInt(form.passengers.value, 10),
      luggage: parseInt(form.luggage.value, 10),
      specialRequests: form.specialRequests.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Input
          label="Number of Passengers"
          id="passengers"
          name="passengers"
          type="number"
          icon={Users}
          required
          min="1"
          max="8"
          defaultValue={formData.passengers}
        />

        <Input
          label="Number of Luggage"
          id="luggage"
          name="luggage"
          type="number"
          icon={Briefcase}
          required
          min="0"
          max="8"
          defaultValue={formData.luggage}
        />

        <div>
          <label
            htmlFor="specialRequests"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Special Requests
          </label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            rows={3}
            defaultValue={formData.specialRequests}
            placeholder="Any special requirements?"
            className="w-full rounded-lg border-2 border-gray-200 shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      <Button type="submit" className="w-full">
        Continue
      </Button>
    </form>
  );
};

export default PassengerStep;
import React from 'react';
import Button from '../../ui/Button';
import VanTypeSelector from './VanTypeSelector';
import AmenitiesSelector from './AmenitiesSelector';
import { VanPreferences, VanAmenity } from '../../../types/birthday';

interface VanPreferencesFormProps {
  initialData: VanPreferences;
  onSubmit: (data: VanPreferences) => void;
  onBack: () => void;
  isSubmitting?: boolean;
}

const VanPreferencesForm: React.FC<VanPreferencesFormProps> = ({
  initialData,
  onSubmit,
  onBack,
  isSubmitting,
}) => {
  const [formData, setFormData] = React.useState(initialData);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleAmenityToggle = (amenity: VanAmenity) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-navy-900 dark:text-tan-50">
          Van Preferences
        </h2>
        <p className="text-navy-600 dark:text-tan-200 mt-2">
          Choose your perfect party van setup
        </p>
      </div>

      <VanTypeSelector
        selectedType={formData.vanType}
        onChange={(type) => setFormData({ ...formData, vanType: type })}
      />

      <AmenitiesSelector
        selectedAmenities={formData.amenities}
        onToggle={handleAmenityToggle}
      />

      <div>
        <label className="block text-sm font-medium text-navy-900 dark:text-tan-50 mb-2">
          Special Requests
        </label>
        <textarea
          value={formData.specialRequests}
          onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
          placeholder="Any additional requirements or preferences?"
          className="w-full rounded-lg border-2 border-tan-200 dark:border-navy-600 p-3 bg-white/95 dark:bg-navy-800/95"
          rows={4}
        />
      </div>

      <div className="flex justify-between pt-4">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Processing...' : 'Complete Booking'}
        </Button>
      </div>
    </form>
  );
};

export default VanPreferencesForm;
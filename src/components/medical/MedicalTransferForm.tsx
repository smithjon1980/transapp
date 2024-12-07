import React, { useState } from 'react';
import { MapPin, Calendar, Clock, User, FileText } from 'lucide-react';
import Input from '../ui/Input';
import Button from '../ui/Button';
import { MedicalTransferData } from '../../types/medicalTransfer';

interface MedicalTransferFormProps {
  onSubmit: (data: MedicalTransferData) => void;
  isSubmitting?: boolean;
}

const MedicalTransferForm: React.FC<MedicalTransferFormProps> = ({ onSubmit, isSubmitting }) => {
  const [formData, setFormData] = useState<MedicalTransferData>({
    serviceType: 'standard',
    pickupLocation: '',
    dropoffLocation: '',
    appointmentDate: '',
    appointmentTime: '',
    returnTransfer: false,
    patientInfo: {
      name: '',
      age: 0,
      mobility: 'walking',
    },
    contactInfo: {
      name: '',
      email: '',
      phone: '',
      relationship: '',
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

  const handlePatientInfoChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      patientInfo: {
        ...prev.patientInfo,
        [field]: value
      }
    }));
  };

  const handleContactInfoChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value
      }
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-navy-900 dark:text-tan-50 mb-2">
            Service Type
          </label>
          <div className="grid grid-cols-3 gap-4">
            {['standard', 'wheelchair', 'stretcher'].map((type) => (
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
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Input
            label="Pickup Location"
            value={formData.pickupLocation}
            onChange={(e) => handleChange('pickupLocation', e.target.value)}
            placeholder="Enter pickup address"
            icon={MapPin}
            required
          />

          <Input
            label="Medical Facility"
            value={formData.dropoffLocation}
            onChange={(e) => handleChange('dropoffLocation', e.target.value)}
            placeholder="Enter medical facility name/address"
            icon={MapPin}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Appointment Date"
            type="date"
            value={formData.appointmentDate}
            onChange={(e) => handleChange('appointmentDate', e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            icon={Calendar}
            required
          />

          <Input
            label="Appointment Time"
            type="time"
            value={formData.appointmentTime}
            onChange={(e) => handleChange('appointmentTime', e.target.value)}
            icon={Clock}
            required
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="returnTransfer"
            checked={formData.returnTransfer}
            onChange={(e) => handleChange('returnTransfer', e.target.checked)}
            className="rounded border-tan-200 dark:border-navy-600"
          />
          <label htmlFor="returnTransfer" className="text-sm text-navy-900 dark:text-tan-50">
            Need return transfer?
          </label>
        </div>

        {formData.returnTransfer && (
          <Input
            label="Return Time"
            type="time"
            value={formData.returnTime}
            onChange={(e) => handleChange('returnTime', e.target.value)}
            icon={Clock}
            required
          />
        )}

        <div className="space-y-4 border-t border-tan-200 dark:border-navy-600 pt-4">
          <h3 className="text-lg font-medium text-navy-900 dark:text-tan-50">
            Patient Information
          </h3>
          
          <Input
            label="Patient Name"
            value={formData.patientInfo.name}
            onChange={(e) => handlePatientInfoChange('name', e.target.value)}
            placeholder="Enter patient's full name"
            icon={User}
            required
          />

          <Input
            label="Patient Age"
            type="number"
            value={formData.patientInfo.age}
            onChange={(e) => handlePatientInfoChange('age', parseInt(e.target.value))}
            min={0}
            max={120}
            icon={User}
            required
          />

          <div>
            <label className="block text-sm font-medium text-navy-900 dark:text-tan-50 mb-2">
              Mobility Status
            </label>
            <div className="grid grid-cols-3 gap-4">
              {['walking', 'wheelchair', 'stretcher'].map((mobility) => (
                <button
                  key={mobility}
                  type="button"
                  onClick={() => handlePatientInfoChange('mobility', mobility)}
                  className={`px-4 py-2 rounded-lg ${
                    formData.patientInfo.mobility === mobility
                      ? 'bg-wine-500 text-white'
                      : 'bg-tan-100 text-navy-600 dark:bg-navy-700 dark:text-tan-200'
                  }`}
                >
                  {mobility.charAt(0).toUpperCase() + mobility.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-navy-900 dark:text-tan-50 mb-2">
              Medical Condition
            </label>
            <textarea
              value={formData.patientInfo.medicalCondition}
              onChange={(e) => handlePatientInfoChange('medicalCondition', e.target.value)}
              placeholder="Describe any relevant medical conditions"
              className="w-full rounded-lg border-2 border-tan-200 dark:border-navy-600 p-3 bg-white/95 dark:bg-navy-800/95"
              rows={3}
            />
          </div>
        </div>

        <div className="space-y-4 border-t border-tan-200 dark:border-navy-600 pt-4">
          <h3 className="text-lg font-medium text-navy-900 dark:text-tan-50">
            Contact Information
          </h3>
          
          <Input
            label="Contact Name"
            value={formData.contactInfo.name}
            onChange={(e) => handleContactInfoChange('name', e.target.value)}
            placeholder="Enter contact person's name"
            icon={User}
            required
          />

          <Input
            label="Relationship to Patient"
            value={formData.contactInfo.relationship}
            onChange={(e) => handleContactInfoChange('relationship', e.target.value)}
            placeholder="e.g., Family Member, Caregiver"
            icon={User}
            required
          />

          <Input
            label="Email"
            type="email"
            value={formData.contactInfo.email}
            onChange={(e) => handleContactInfoChange('email', e.target.value)}
            placeholder="your@email.com"
            required
          />

          <Input
            label="Phone"
            type="tel"
            value={formData.contactInfo.phone}
            onChange={(e) => handleContactInfoChange('phone', e.target.value)}
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
            placeholder="Any special requirements or instructions?"
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

export default MedicalTransferForm;
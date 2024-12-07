import React from 'react';
import AirportBookingWizard from './AirportBookingWizard';
import { AirportTransferData } from '../../types/airport';

interface AirportTransferFormProps {
  onSubmit: (data: AirportTransferData) => void;
  isSubmitting?: boolean;
}

const AirportTransferForm: React.FC<AirportTransferFormProps> = ({ onSubmit, isSubmitting = false }) => {
  return (
    <div className="max-w-2xl mx-auto">
      <AirportBookingWizard onSubmit={onSubmit} isSubmitting={isSubmitting} />
    </div>
  );
};

export default AirportTransferForm;
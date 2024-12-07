export interface MedicalTransferData {
  serviceType: 'standard' | 'wheelchair' | 'stretcher';
  pickupLocation: string;
  dropoffLocation: string;
  appointmentDate: string;
  appointmentTime: string;
  returnTransfer: boolean;
  returnTime?: string;
  patientInfo: {
    name: string;
    age: number;
    mobility: 'walking' | 'wheelchair' | 'stretcher';
    medicalCondition?: string;
  };
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    relationship: string;
  };
  specialRequests?: string;
}
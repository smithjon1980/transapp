export type ServiceType = 
  | 'dinner'
  | 'airport'
  | 'hotel'
  | 'concert'
  | 'sports'
  | 'birthday';

export type BookingStatus = 'pending' | 'confirmed' | 'rejected';

export interface BookingResponse {
  bookingId: string;
  status: BookingStatus;
  submittedAt: string;
  estimatedResponseTime: string;
  confirmationNumber?: string;
  totalPrice?: number;
}
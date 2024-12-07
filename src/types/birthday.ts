export interface CustomerInfo {
  fullName: string;
  email: string;
  phone: string;
}

export interface EventDetails {
  birthdayPerson: string;
  eventDate: string;
  pickupDateTime: string;
  dropoffLocation: string;
  pickupLocation: string;
  numberOfGuests: number;
  specialInstructions: string;
}

export type VanType = 'standard' | 'luxury' | 'party';
export type VanAmenity = 'wifi' | 'refreshments' | 'entertainment' | 'decorations' | 'audioSystem';

export interface VanPreferences {
  passengerCount: number;
  vanType: VanType;
  amenities: VanAmenity[];
  specialRequests: string;
}

export interface BirthdayBookingData {
  customerInfo: CustomerInfo;
  eventDetails: EventDetails;
  vanPreferences: VanPreferences;
}
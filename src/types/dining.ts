import { ContactInfo } from './shared';

export interface DiningBookingData {
  restaurantDetails: {
    name: string;
    date: string;
    time: string;
    partySize: number;
    occasion?: 'business' | 'anniversary' | 'birthday' | 'other';
    customOccasion?: string;
    specialRequests?: string;
  };
  transportationPlan: {
    pickupLocation: string;
    pickupTime: string;
    returnLocation: string;
    vehiclePreference: 'luxury-sedan' | 'suv' | 'limo';
    additionalStops: Array<{
      location: string;
      time: string;
      purpose: string;
    }>;
  };
  diningPreferences: {
    tablePreference?: 'window' | 'private' | 'patio' | 'any';
    dietaryRestrictions: string[];
    wineService: boolean;
    sommelierService: boolean;
    chefTable: boolean;
    notes?: string;
  };
  contactInfo: ContactInfo;
}
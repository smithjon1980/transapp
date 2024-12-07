export interface CityTransferData {
  serviceType: 'hourly' | 'fullDay';
  duration: number;
  date: string;
  time: string;
  itinerary: Array<{
    location: string;
    notes?: string;
  }>;
  passengerInfo: {
    total: number;
    name: string;
  };
  contactInfo: {
    name: string;
    email: string;
    phone: string;
  };
  specialRequests?: string;
}
export interface HotelTransferData {
  hotelDetails: {
    pickupHotel: string;
    dropoffHotel: string;
    date: string;
    time: string;
    hotelConfirmation?: string;
    roomNumber?: string;
    conciergeContact?: string;
  };
  transportationPlan: {
    vehicleType: 'luxury-sedan' | 'suv' | 'van' | 'limo';
    passengerCount: number;
    luggageCount: number;
    additionalStops: Array<{
      location: string;
      time: string;
      purpose: string;
    }>;
  };
  guestPreferences: {
    amenities: {
      wifi: boolean;
      waterService: boolean;
      newspaper: boolean;
      childSeat: boolean;
    };
    temperature?: string;
    musicPreference?: string;
    specialRequests?: string;
  };
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    alternatePhone?: string;
  };
}
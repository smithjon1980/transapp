export interface ExecutiveVanBooking {
  customerInfo: {
    fullName: string;
    email: string;
    phone: string;
  };
  eventDetails: {
    date: string;
    pickupTime: string;
    pickupLocation: string;
    dropoffLocation: string;
    returnPickup?: {
      time: string;
      location: string;
    };
  };
  vanPreferences: {
    passengers: number;
    luggageCount: number;
    amenities: {
      wifi: boolean;
      refreshments: boolean;
      entertainment: boolean;
      workstation: boolean;
    };
    specialRequests?: string;
  };
}
export interface ConcertBookingData {
  eventDetails: {
    venueName: string;
    eventDate: string;
    eventStartTime: string;
    eventEndTime: string;
    eventType: 'concert' | 'theater' | 'festival' | 'comedy' | 'other';
    customEventType?: string;
    ticketSection?: string;
  };
  transportationPlan: {
    pickupLocation: string;
    pickupTime: string;
    returnLocation: string;
    vehiclePreference: 'luxury-sedan' | 'suv' | 'van' | 'limo';
    passengerCount: number;
    additionalStops: Array<{
      location: string;
      time: string;
      purpose: string;
    }>;
  };
  groupDetails: {
    totalPassengers: number;
    hasVIP: boolean;
    vipServices: {
      priorityEntry: boolean;
      backstageAccess: boolean;
      meetAndGreet: boolean;
    };
    specialRequests?: string;
  };
  contactInfo: {
    name: string;
    email: string;
    phone: string;
    alternatePhone?: string;
  };
}
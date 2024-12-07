export interface Booking {
  id: string;
  type: 'airport' | 'city' | 'medical';
  status: 'pending' | 'confirmed' | 'rejected';
  submittedAt: string;
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  serviceDetails: {
    date: string;
    time: string;
    passengers: number;
    pickup: string[];
    dropoff: string;
  };
  flightInfo?: {
    number: string;
    direction: 'arrival' | 'departure';
  };
}

export interface DispatchState {
  bookings: Booking[];
  selectedBooking: Booking | null;
  loading: boolean;
  error: string | null;
}
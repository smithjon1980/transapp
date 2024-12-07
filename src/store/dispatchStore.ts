import { create } from 'zustand';
import { Booking, DispatchState } from '../types/dispatch';

interface DispatchStore extends DispatchState {
  fetchBookings: () => Promise<void>;
  setSelectedBooking: (booking: Booking | null) => void;
  updateBookingStatus: (bookingId: string, status: 'confirmed' | 'rejected') => Promise<void>;
}

export const useDispatchStore = create<DispatchStore>((set, get) => ({
  bookings: [],
  selectedBooking: null,
  loading: false,
  error: null,

  fetchBookings: async () => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock data
      const mockBookings: Booking[] = Array.from({ length: 10 }, (_, i) => ({
        id: `BK${Math.random().toString(36).substr(2, 9)}`,
        type: ['airport', 'city', 'medical'][Math.floor(Math.random() * 3)] as any,
        status: 'pending',
        submittedAt: new Date(Date.now() - Math.random() * 86400000 * 7).toISOString(),
        customer: {
          name: `Customer ${i + 1}`,
          email: `customer${i + 1}@example.com`,
          phone: `+1 (555) ${String(Math.floor(Math.random() * 900) + 100)}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
        },
        serviceDetails: {
          date: new Date(Date.now() + Math.random() * 86400000 * 30).toISOString().split('T')[0],
          time: `${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
          passengers: Math.floor(Math.random() * 4) + 1,
          pickup: [`${Math.floor(Math.random() * 1000)} Main St`],
          dropoff: 'LAX Airport',
        },
        flightInfo: Math.random() > 0.5 ? {
          number: `AA${Math.floor(Math.random() * 9000) + 1000}`,
          direction: Math.random() > 0.5 ? 'arrival' : 'departure',
        } : undefined,
      }));

      set({ bookings: mockBookings, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch bookings', loading: false });
    }
  },

  setSelectedBooking: (booking) => set({ selectedBooking: booking }),

  updateBookingStatus: async (bookingId, status) => {
    set({ loading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update local state
      const updatedBookings = get().bookings.map(booking =>
        booking.id === bookingId ? { ...booking, status } : booking
      );

      set({
        bookings: updatedBookings,
        selectedBooking: null,
        loading: false,
      });
    } catch (error) {
      set({ error: 'Failed to update booking status', loading: false });
    }
  },
}));
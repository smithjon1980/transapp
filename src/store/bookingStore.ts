import { create } from 'zustand';
import { ServiceType } from '../types/booking';

interface BookingStore {
  selectedService: ServiceType | null;
  isBookingModalOpen: boolean;
  setSelectedService: (service: ServiceType | null) => void;
  openBookingModal: () => void;
  closeBookingModal: () => void;
  resetBooking: () => void;
}

export const useBookingStore = create<BookingStore>((set) => ({
  // Initialize selectedService from localStorage if available
  selectedService: localStorage.getItem('selectedService') as ServiceType | null,
  isBookingModalOpen: false,
  setSelectedService: (service) => {
    // Store the selection in localStorage
    if (service) {
      localStorage.setItem('selectedService', service);
    } else {
      localStorage.removeItem('selectedService');
    }
    set({ selectedService: service });
  },
  openBookingModal: () => set({ isBookingModalOpen: true }),
  closeBookingModal: () => set({ isBookingModalOpen: false }),
  resetBooking: () => {
    localStorage.removeItem('selectedService');
    set({ selectedService: null, isBookingModalOpen: false });
  },
}));
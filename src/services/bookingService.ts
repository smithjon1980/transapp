import axios from 'axios';
import { BookingResponse } from '../types/booking';
import { AirportTransferBooking } from '../types/airport';

const API_BASE_URL = 'https://api.example.com/v1'; // Replace with actual API URL

export async function createBooking(bookingData: AirportTransferBooking): Promise<BookingResponse> {
  try {
    // For demo purposes, simulate API call
    // In production, replace with actual API call:
    // const response = await axios.post(`${API_BASE_URL}/bookings`, bookingData);
    
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    
    return {
      bookingId: `BK${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      status: 'pending',
      submittedAt: new Date().toISOString(),
      estimatedResponseTime: '15-30 minutes',
    };
  } catch (error) {
    console.error('Booking creation failed:', error);
    throw new Error('Failed to submit booking request. Please try again.');
  }
}
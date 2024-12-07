import axios from 'axios';

const FLIGHTAWARE_API_KEY = 'J3VBIjv6GKNC4AedHpqQzoxHse8X59Qn';
const FLIGHTAWARE_API_BASE = 'https://aeroapi.flightaware.com/aeroapi';

interface FlightValidationResponse {
  isValid: boolean;
  error?: string;
  flightInfo?: {
    airline: string;
    flightNumber: string;
    departure: {
      airport: string;
      terminal?: string;
      time: string;
    };
    arrival: {
      airport: string;
      terminal?: string;
      time: string;
    };
  };
}

export async function validateFlightNumber(flightNumber: string): Promise<FlightValidationResponse> {
  try {
    // Basic flight number format validation
    const flightNumberRegex = /^[A-Z]{2,3}\d{1,4}$/;
    if (!flightNumberRegex.test(flightNumber.toUpperCase())) {
      return {
        isValid: false,
        error: 'Invalid flight number format. Example: AA1234',
      };
    }

    // Call FlightAware API
    const response = await axios.get(`${FLIGHTAWARE_API_BASE}/flights/${flightNumber}`, {
      headers: {
        'x-apikey': FLIGHTAWARE_API_KEY,
      },
    });

    const flight = response.data.flights[0];
    if (!flight) {
      return {
        isValid: false,
        error: 'Flight not found',
      };
    }

    return {
      isValid: true,
      flightInfo: {
        airline: flight.operator,
        flightNumber: flight.ident,
        departure: {
          airport: flight.origin.name,
          terminal: flight.origin.terminal || undefined,
          time: flight.scheduled_out,
        },
        arrival: {
          airport: flight.destination.name,
          terminal: flight.destination.terminal || undefined,
          time: flight.scheduled_in,
        },
      },
    };
  } catch (error) {
    console.error('FlightAware API Error:', error);
    return {
      isValid: false,
      error: 'Unable to validate flight number. Please try again.',
    };
  }
}
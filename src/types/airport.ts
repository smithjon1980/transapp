export type TripType = 'oneWay' | 'roundTrip';
export type ServiceLevel = 'express' | 'multiStop';
export type TransferDirection = 'arrival' | 'departure';

export interface FlightInfo {
  type: 'flightNumber' | 'tailNumber';
  value: string;
}

export interface TravelDate {
  departure: string;
  return?: string;
}

export interface PassengerInfo {
  name: string;
  total: number;
}

export interface Location {
  address: string;
  notes?: string;
}

export interface LocationDetails {
  pickup: Location[];
  dropoff: string;
}

export interface AirportTransferData {
  tripType: TripType;
  serviceLevel: ServiceLevel;
  direction: TransferDirection;
  flightInfo: FlightInfo;
  travelDate: TravelDate;
  passengerInfo: PassengerInfo;
  locationDetails: LocationDetails;
}
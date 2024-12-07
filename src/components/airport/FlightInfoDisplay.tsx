import React from 'react';
import { Plane, Clock, MapPin } from 'lucide-react';

interface FlightInfoDisplayProps {
  flightInfo: {
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

const FlightInfoDisplay: React.FC<FlightInfoDisplayProps> = ({ flightInfo }) => {
  return (
    <div className="p-4 bg-tan-50 dark:bg-navy-700 rounded-lg space-y-3">
      <div className="flex items-center space-x-2 text-wine-500">
        <Plane className="w-5 h-5" />
        <span className="font-medium">{flightInfo.airline} {flightInfo.flightNumber}</span>
      </div>
      
      <div className="space-y-2">
        <div className="flex items-start space-x-3">
          <MapPin className="w-4 h-4 text-navy-400 dark:text-tan-300 mt-1" />
          <div>
            <p className="text-sm text-navy-500 dark:text-tan-300">From</p>
            <p className="text-navy-900 dark:text-tan-50">
              {flightInfo.departure.airport}
              {flightInfo.departure.terminal && 
                <span className="text-sm text-navy-500 dark:text-tan-300 ml-2">
                  Terminal {flightInfo.departure.terminal}
                </span>
              }
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <MapPin className="w-4 h-4 text-navy-400 dark:text-tan-300 mt-1" />
          <div>
            <p className="text-sm text-navy-500 dark:text-tan-300">To</p>
            <p className="text-navy-900 dark:text-tan-50">
              {flightInfo.arrival.airport}
              {flightInfo.arrival.terminal && 
                <span className="text-sm text-navy-500 dark:text-tan-300 ml-2">
                  Terminal {flightInfo.arrival.terminal}
                </span>
              }
            </p>
          </div>
        </div>

        <div className="flex items-start space-x-3">
          <Clock className="w-4 h-4 text-navy-400 dark:text-tan-300 mt-1" />
          <div>
            <p className="text-sm text-navy-500 dark:text-tan-300">Schedule</p>
            <p className="text-navy-900 dark:text-tan-50">
              {new Date(flightInfo.departure.time).toLocaleTimeString()} - 
              {new Date(flightInfo.arrival.time).toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlightInfoDisplay;
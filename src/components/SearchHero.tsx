import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';

const SearchHero = () => {
  return (
    <div className="bg-primary-blue pb-16 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-white mb-8">Find your perfect ride</h2>
        
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Pickup Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Enter pickup location"
                  className="pl-10 w-full border-2 border-gray-200 rounded-md py-2 focus:ring-2 focus:ring-primary-blue focus:border-primary-blue"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="date"
                  className="pl-10 w-full border-2 border-gray-200 rounded-md py-2 focus:ring-2 focus:ring-primary-blue focus:border-primary-blue"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="time"
                  className="pl-10 w-full border-2 border-gray-200 rounded-md py-2 focus:ring-2 focus:ring-primary-blue focus:border-primary-blue"
                />
              </div>
            </div>
          </div>

          <button className="mt-4 w-full bg-primary-yellow text-gray-900 font-bold py-3 rounded-md hover:bg-primary-yellow/90 transition-colors">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchHero;
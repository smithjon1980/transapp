import React from 'react';
import { Shield, Clock, Award, ThumbsUp } from 'lucide-react';

const highlights = [
  {
    icon: Shield,
    title: 'Safe and Secure',
    description: 'All our drivers are verified and vehicles regularly inspected'
  },
  {
    icon: Clock,
    title: '24/7 Service',
    description: 'Available round the clock for your convenience'
  },
  {
    icon: Award,
    title: 'Best Price Guarantee',
    description: 'We match any comparable service price'
  },
  {
    icon: ThumbsUp,
    title: 'Satisfaction Guaranteed',
    description: '4.8/5 average rating from our customers'
  }
];

const ServiceHighlights = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {highlights.map((item, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm">
              <div className="p-3 bg-primary-blue/10 rounded-full mb-4">
                <item.icon className="h-6 w-6 text-primary-blue" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceHighlights;
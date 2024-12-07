import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Calendar, Clock } from 'lucide-react';
import { Car, Timer, AlertTriangle, TrendingUp, Users, MapPin } from 'lucide-react';
import { useDispatchStore } from '../store/dispatchStore';
import { useBookingStore } from '../store/bookingStore';
import BookingList from './BookingList';
import BookingDetails from './BookingDetails';
import BookingModal from './BookingModal';
import Input from './ui/Input';
import Button from './ui/Button';
import StatsCard from './dashboard/StatsCard';
import DashboardLayout from './dashboard/DashboardLayout';

const Dashboard: React.FC = () => {
  const { bookings, selectedBooking, fetchBookings } = useDispatchStore();
  const { openBookingModal } = useBookingStore();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  // Calculate KPIs
  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.status === 'pending').length;
  const inProgressBookings = bookings.filter(b => b.status === 'confirmed').length;
  const completedBookings = bookings.filter(b => b.status === 'completed').length;

  const stats = [
    {
      label: 'Pending Requests',
      value: pendingBookings,
      subtext: 'Awaiting confirmation',
      icon: AlertTriangle,
      type: 'warning' as const,
    },
    {
      label: 'Active Rides',
      value: inProgressBookings,
      subtext: 'Currently in progress',
      icon: Car,
      type: 'success' as const,
    },
    {
      label: 'Available Drivers',
      value: '8',
      subtext: 'Ready for dispatch',
      icon: Users,
      type: 'primary' as const,
    },
    {
      label: 'Service Areas',
      value: '12',
      subtext: 'Active coverage zones',
      icon: MapPin,
      type: 'primary' as const,
    },
  ];

  return (
    <DashboardLayout>
      {/* Header */}
      <header className="bg-white dark:bg-navy-800 border-b border-gray-200 dark:border-navy-700">
        <div className="px-6">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold text-navy-900 dark:text-tan-50">
              Dashboard
            </h1>
            
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                size="sm"
                onClick={openBookingModal}
              >
                <Plus className="w-4 h-4 mr-2" />
                New Booking
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Schedule
              </Button>
              <Button variant="outline" size="sm">
                <Clock className="w-4 h-4 mr-2" />
                Dispatch Board
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="p-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <StatsCard
              key={stat.label}
              {...stat}
            />
          ))}
        </div>

        {/* Bookings Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bookings List */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-navy-800 rounded-lg shadow-sm">
              <div className="p-4 border-b border-gray-200 dark:border-navy-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-navy-900 dark:text-tan-50">
                    Recent Bookings
                  </h2>
                  <div className="flex items-center space-x-4">
                    <div className="w-64">
                      <Input
                        placeholder="Search bookings..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        icon={Search}
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <BookingList />
              </div>
            </div>
          </div>

          {/* Booking Details */}
          <div className="bg-white dark:bg-navy-800 rounded-lg shadow-sm">
            <div className="p-4 border-b border-gray-200 dark:border-navy-700">
              <h2 className="text-lg font-semibold text-navy-900 dark:text-tan-50">
                Booking Details
              </h2>
            </div>
            
            <div className="p-4">
              {selectedBooking ? (
                <BookingDetails />
              ) : (
                <div className="text-center py-8 text-navy-500 dark:text-tan-300">
                  Select a booking to view details
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal />
    </DashboardLayout>
  );
};

export default Dashboard;
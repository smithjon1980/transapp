import React from 'react';
import { Truck, MapPin, BarChart3, FileText, Settings } from 'lucide-react';

const menuItems = [
  { icon: Truck, label: 'Deliveries', active: true },
  { icon: MapPin, label: 'Locations' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: FileText, label: 'Reports' },
  { icon: Settings, label: 'Settings' }
];

const Sidebar: React.FC = () => {
  return (
    <aside className="w-16 lg:w-64 h-screen bg-white dark:bg-navy-800 border-r border-gray-200 dark:border-navy-700 fixed">
      <div className="h-16 flex items-center px-4">
        <h1 className="text-lg font-bold text-navy-900 dark:text-tan-50 hidden lg:block">
          Dispatch Manager
        </h1>
      </div>
      <nav className="p-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center space-x-3 p-3 rounded-lg mb-1 ${
              item.active 
                ? 'bg-navy-50 text-navy-900 dark:bg-navy-700 dark:text-tan-50'
                : 'hover:bg-gray-100 text-navy-600 dark:hover:bg-navy-700 dark:text-tan-200'
            }`}
          >
            <item.icon className="w-5 h-5 min-w-[20px]" />
            <span className="hidden lg:block text-sm">{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
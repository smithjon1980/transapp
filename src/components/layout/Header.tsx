import React from 'react';
import { Bell, Grid, Plus, User } from 'lucide-react';
import ThemeToggle from '../ThemeToggle';
import LanguageToggle from '../LanguageToggle';

const Header: React.FC = () => {
  return (
    <header className="h-16 bg-white dark:bg-navy-800 border-b border-gray-200 dark:border-navy-700 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <h2 className="text-xl font-semibold text-navy-900 dark:text-tan-50">
          Dashboard
        </h2>
      </div>
      
      <div className="flex items-center space-x-2">
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-navy-700 rounded-lg">
          <Plus className="w-5 h-5 text-navy-600 dark:text-tan-200" />
        </button>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-navy-700 rounded-lg">
          <Grid className="w-5 h-5 text-navy-600 dark:text-tan-200" />
        </button>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-navy-700 rounded-lg">
          <Bell className="w-5 h-5 text-navy-600 dark:text-tan-200" />
        </button>
        <LanguageToggle />
        <ThemeToggle />
        <button className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
          <span className="text-sm font-medium">AB</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
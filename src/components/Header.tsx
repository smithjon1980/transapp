import React from 'react';
import { Search } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-primary-blue py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">TransportGo</h1>
          <nav className="hidden md:flex space-x-6">
            {['Airport Transfer', 'City Transfer', 'Medical Transport'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-white/90 hover:text-white text-sm font-medium"
              >
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center space-x-4">
            <button className="text-white/90 hover:text-white text-sm font-medium">
              Sign In
            </button>
            <button className="bg-white text-primary-blue px-4 py-2 rounded-md text-sm font-medium">
              Register
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
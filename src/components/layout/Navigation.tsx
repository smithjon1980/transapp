import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '../../utils/cn';
import NavigationLinks from './NavigationLinks';
import NavigationLogo from './NavigationLogo';
import NavigationMobile from './NavigationMobile';
import UserMenu from './UserMenu';

const Navigation: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-navy-800/80 backdrop-blur-lg border-b border-tan-100 dark:border-navy-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <NavigationLogo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationLinks />
          </div>

          {/* User Menu & Mobile Toggle */}
          <div className="flex items-center space-x-4">
            <UserMenu />
            
            {/* Mobile Menu Button */}
            <button
              type="button"
              className={cn(
                "md:hidden inline-flex items-center justify-center p-2 rounded-lg",
                "text-navy-600 dark:text-tan-200",
                "hover:bg-tan-50 dark:hover:bg-navy-700",
                "focus:outline-none focus:ring-2 focus:ring-inset focus:ring-wine-500"
              )}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">
                {isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              </span>
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <NavigationMobile isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </nav>
  );
};

export default Navigation;
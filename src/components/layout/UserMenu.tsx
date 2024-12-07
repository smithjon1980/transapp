import React, { useState } from 'react';
import { User, LogIn, UserPlus, Settings, LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { cn } from '../../utils/cn';
import Button from '../ui/Button';

const UserMenu: React.FC = () => {
  const { user, logout } = useAuthStore();
  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
    return (
      <div className="flex items-center space-x-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.location.href = '/login'}
        >
          <LogIn className="w-4 h-4 mr-2" />
          Sign In
        </Button>
        <Button
          size="sm"
          onClick={() => window.location.href = '/signup'}
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Sign Up
        </Button>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center space-x-2 p-2 rounded-lg",
          "hover:bg-tan-50 dark:hover:bg-navy-700",
          "transition-colors duration-200"
        )}
      >
        <div className="w-8 h-8 rounded-full bg-wine-500 flex items-center justify-center">
          <span className="text-sm font-medium text-white">
            {user.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <span className="hidden sm:block text-sm font-medium text-navy-900 dark:text-tan-50">
          {user.name}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-navy-800 rounded-xl shadow-lg border border-tan-100 dark:border-navy-700">
          <div className="py-2">
            <a
              href="/profile"
              className="flex items-center px-4 py-2 text-sm text-navy-600 dark:text-tan-200 hover:bg-tan-50 dark:hover:bg-navy-700"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </a>
            <a
              href="/settings"
              className="flex items-center px-4 py-2 text-sm text-navy-600 dark:text-tan-200 hover:bg-tan-50 dark:hover:bg-navy-700"
            >
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </a>
            <button
              onClick={logout}
              className="w-full flex items-center px-4 py-2 text-sm text-wine-600 hover:bg-tan-50 dark:hover:bg-navy-700"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
import React from 'react';
import { 
  Car, CalendarClock, Users, FileText, Settings, Menu,
  BarChart3, Bell
} from 'lucide-react';
import { cn } from '../../utils/cn';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const menuItems = [
  { icon: Car, label: 'Bookings', active: true },
  { icon: CalendarClock, label: 'Schedule' },
  { icon: Users, label: 'Drivers' },
  { icon: BarChart3, label: 'Analytics' },
  { icon: FileText, label: 'Reports' },
  { icon: Settings, label: 'Settings' }
];

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-900 flex">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50",
        "bg-white dark:bg-navy-800",
        "border-r border-gray-200 dark:border-navy-700",
        "transition-all duration-300 ease-in-out",
        "flex flex-col",
        isSidebarOpen ? "w-64" : "w-20"
      )}>
        {/* Sidebar Header */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-gray-200 dark:border-navy-700">
          <h1 className={cn(
            "font-bold text-navy-900 dark:text-tan-50 transition-opacity duration-300",
            isSidebarOpen ? "opacity-100" : "opacity-0 w-0"
          )}>
            Dispatch Manager
          </h1>
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-navy-700"
          >
            <Menu className="w-5 h-5 text-navy-600 dark:text-tan-200" />
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.label}
              className={cn(
                "w-full flex items-center px-3 py-2 rounded-lg transition-colors",
                "hover:bg-gray-100 dark:hover:bg-navy-700",
                item.active 
                  ? "bg-wine-50 text-wine-600 dark:bg-wine-900/20 dark:text-wine-400"
                  : "text-navy-600 dark:text-tan-200"
              )}
            >
              <item.icon className="w-5 h-5 min-w-[20px]" />
              {isSidebarOpen && (
                <span className="ml-3 text-sm font-medium">{item.label}</span>
              )}
            </button>
          ))}
        </nav>

        {/* User Profile */}
        {isSidebarOpen && (
          <div className="p-4 border-t border-gray-200 dark:border-navy-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-wine-500 flex items-center justify-center">
                <span className="text-sm font-medium text-white">DM</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-navy-900 dark:text-tan-50 truncate">
                  Dispatch Manager
                </p>
                <p className="text-xs text-navy-500 dark:text-tan-300 truncate">
                  Online
                </p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className={cn(
        "flex-1 transition-all duration-300",
        isSidebarOpen ? "ml-64" : "ml-20"
      )}>
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
import React from 'react';
import { useAuthStore } from '../../store/authStore';
import { UserRole } from '../../types/auth';
import AuthContainer from './AuthContainer';

interface AuthGuardProps {
  children: React.ReactNode;
  requiredRole?: UserRole | UserRole[];
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children, requiredRole }) => {
  const { user } = useAuthStore();

  if (!user) {
    return <AuthContainer />;
  }

  if (requiredRole) {
    const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
    if (!allowedRoles.includes(user.role)) {
      return (
        <div className="text-center p-8">
          <h2 className="text-xl font-bold text-wine-500 mb-2">
            Access Denied
          </h2>
          <p className="text-navy-600 dark:text-tan-200">
            You don't have permission to access this area.
          </p>
        </div>
      );
    }
  }

  return <>{children}</>;
};

export default AuthGuard;
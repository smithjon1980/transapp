export type UserRole = 'client' | 'dispatcher' | 'affiliate';
export type TwoFactorMethod = 'sms' | 'email';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  createdAt: string;
  affiliateCode?: string;
  company?: string;
  phone?: string;
  twoFactorEnabled?: boolean;
  preferredTwoFactorMethod?: TwoFactorMethod;
}

export interface LoginCredentials {
  email: string;
  password: string;
  userType: UserRole;
}

export interface TwoFactorVerification {
  userId: string;
  code: string;
  method: TwoFactorMethod;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  twoFactorPending: boolean;
  pendingUserId?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  requiresTwoFactor: boolean;
}
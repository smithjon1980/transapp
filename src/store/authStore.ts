import { create } from 'zustand';
import { AuthState, LoginCredentials, User, TwoFactorVerification } from '../types/auth';
import { sendTwoFactorCode, verifyTwoFactorCode } from '../services/twoFactorService';

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  company?: string;
}

interface AuthStore extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  verifyTwoFactor: (verification: TwoFactorVerification) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
  setLoading: (isLoading: boolean) => void;
  cancelTwoFactor: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  twoFactorPending: false,
  pendingUserId: undefined,

  register: async (data) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user: User = {
        id: Math.random().toString(36).substr(2, 9),
        email: data.email,
        name: `${data.firstName} ${data.lastName}`,
        role: 'client',
        createdAt: new Date().toISOString(),
        phone: data.phone,
        company: data.company,
      };

      set({ user, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Registration failed',
        isLoading: false 
      });
    }
  },

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      let user: User;
      
      switch (credentials.userType) {
        case 'dispatcher':
          if (!credentials.email.endsWith('@dispatch.premiumtransport.com')) {
            throw new Error('Invalid dispatcher email domain');
          }
          user = {
            id: Math.random().toString(36).substr(2, 9),
            email: credentials.email,
            name: credentials.email.split('@')[0],
            role: 'dispatcher',
            createdAt: new Date().toISOString(),
            twoFactorEnabled: true,
            preferredTwoFactorMethod: 'sms',
            phone: '+1234567890', // Demo phone number
          };
          break;
          
        case 'affiliate':
          if (!credentials.email.endsWith('@partner.com')) {
            throw new Error('Invalid affiliate email domain');
          }
          user = {
            id: Math.random().toString(36).substr(2, 9),
            email: credentials.email,
            name: credentials.email.split('@')[0],
            role: 'affiliate',
            createdAt: new Date().toISOString(),
            affiliateCode: 'AFF' + Math.random().toString(36).substr(2, 6).toUpperCase(),
            company: 'Partner Company',
            twoFactorEnabled: true,
            preferredTwoFactorMethod: 'email',
          };
          break;
          
        default:
          user = {
            id: Math.random().toString(36).substr(2, 9),
            email: credentials.email,
            name: credentials.email.split('@')[0],
            role: 'client',
            createdAt: new Date().toISOString(),
            twoFactorEnabled: false,
          };
      }

      if (user.twoFactorEnabled) {
        // Send 2FA code
        const destination = user.preferredTwoFactorMethod === 'sms' ? user.phone! : user.email;
        const sent = await sendTwoFactorCode(user.id, user.preferredTwoFactorMethod!, destination);
        
        if (!sent) {
          throw new Error('Failed to send verification code');
        }

        set({ 
          isLoading: false, 
          twoFactorPending: true,
          pendingUserId: user.id,
        });
      } else {
        set({ user, isLoading: false });
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Invalid credentials',
        isLoading: false 
      });
    }
  },

  verifyTwoFactor: async (verification) => {
    set({ isLoading: true, error: null });
    try {
      const isValid = await verifyTwoFactorCode(verification);
      
      if (!isValid) {
        throw new Error('Invalid verification code');
      }

      // In production, you would fetch the user data again
      // For demo, we'll create a mock user
      const user: User = {
        id: verification.userId,
        email: 'user@example.com',
        name: 'Demo User',
        role: 'dispatcher',
        createdAt: new Date().toISOString(),
        twoFactorEnabled: true,
        preferredTwoFactorMethod: verification.method,
      };

      set({ 
        user,
        isLoading: false,
        twoFactorPending: false,
        pendingUserId: undefined,
      });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Verification failed',
        isLoading: false 
      });
    }
  },

  cancelTwoFactor: () => {
    set({ 
      twoFactorPending: false,
      pendingUserId: undefined,
      error: null,
    });
  },

  logout: () => {
    set({ 
      user: null,
      error: null,
      twoFactorPending: false,
      pendingUserId: undefined,
    });
  },

  setUser: (user) => set({ user }),
  setError: (error) => set({ error }),
  setLoading: (isLoading) => set({ isLoading }),
}));
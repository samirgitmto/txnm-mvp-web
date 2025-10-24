import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, authService } from '../services/auth/authService';
import SessionService from '../services/sessionService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  loginWithGoogle: (email: string, googleId: string, fullName: string) => Promise<void>;
  loginAsGuest: () => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sessionService = SessionService.getInstance();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const sessionId = sessionService.getSessionId();
        if (sessionId) {
          const isValid = await sessionService.validateSession();
          if (isValid) {
            // Session is valid, get user data
            const sessionInfo = sessionService.getSessionInfo();
            if (sessionInfo) {
              setUser({
                id: 0, // This will be set by the backend
                email: sessionInfo.email || null,
                googleId: null,
                fullName: sessionInfo.fullName || null,
                userType: sessionInfo.userType,
                sessionId: sessionInfo.sessionId,
                lastLogin: new Date().toISOString(),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
              });
            }
          } else {
            // Session is invalid, clear it
            await sessionService.deleteSession();
            authService.clearSession();
          }
        }
      } catch (err) {
        console.error('Auth initialization error:', err);
        setError('Failed to initialize authentication');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Set up session refresh interval
    const refreshInterval = setInterval(async () => {
      if (user) {
        try {
          await sessionService.refreshSession();
        } catch (err) {
          console.error('Session refresh error:', err);
        }
      }
    }, 30 * 60 * 1000); // Refresh every 30 minutes

    return () => clearInterval(refreshInterval);
  }, [user]);

  const loginWithGoogle = async (email: string, googleId: string, fullName: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authService.handleGoogleLogin(email, googleId, fullName);
      if (response.success && response.data) {
        setUser(response.data);
      } else {
        throw new Error(response.message || 'Failed to login with Google');
      }
    } catch (err) {
      console.error('Google login error:', err);
      setError('Failed to login with Google');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginAsGuest = async () => {
    try {
      setLoading(true);
      setError(null);
      const sessionInfo = await sessionService.createGuestSession();
      setUser({
        id: 0, // This will be set by the backend
        email: null,
        googleId: null,
        fullName: null,
        userType: 'GUEST',
        sessionId: sessionInfo.sessionId,
        lastLogin: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      console.error('Guest login error:', err);
      setError('Failed to login as guest');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      setError(null);
      await sessionService.deleteSession();
      authService.clearSession();
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
      setError('Failed to logout');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    loginWithGoogle,
    loginAsGuest,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 
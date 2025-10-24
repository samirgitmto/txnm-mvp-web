import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithGoogle, loginAsGuest, loading, error } = useAuth();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleGoogleLogin = async () => {
    try {
      // In a real implementation, you would integrate with Google OAuth
      // For now, we'll simulate a successful Google login
      const mockGoogleUser = {
        email: 'test@example.com',
        googleId: '123456789',
        fullName: 'Test User'
      };

      await loginWithGoogle(
        mockGoogleUser.email,
        mockGoogleUser.googleId,
        mockGoogleUser.fullName
      );
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Google login failed:', err);
    }
  };

  const handleGuestLogin = async () => {
    try {
      await loginAsGuest();
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Guest login failed:', err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <button
              onClick={handleGoogleLogin}
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? 'Loading...' : 'Sign in with Google'}
            </button>
          </div>
          <div className="flex items-center justify-center">
            <div className="text-sm">
              <span className="text-gray-500">or</span>
            </div>
          </div>
          <div className="rounded-md shadow-sm -space-y-px">
            <button
              onClick={handleGuestLogin}
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue as Guest
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login; 
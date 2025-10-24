import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { loginWithGoogle, loginAsGuest, loading, error } = useAuth();
  const [localError, setLocalError] = useState<string | null>(null);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    try {
      setLocalError(null);
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
      onSuccess();
      navigate('/transactions');
    } catch (err) {
      console.error('Google login failed:', err);
      setLocalError('Failed to login with Google. Please try again.');
    }
  };

  const handleGuestLogin = async () => {
    try {
      setLocalError(null);
      await loginAsGuest();
      onSuccess();
      navigate('/transactions');
    } catch (err) {
      console.error('Guest login failed:', err);
      setLocalError('Failed to continue as guest. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Sign in to continue</h3>
          <div className="mt-2 px-7 py-3">
            {(error || localError) && (
              <div className="mb-4 p-2 text-sm text-red-700 bg-red-100 rounded-lg">
                {error || localError}
              </div>
            )}
            <div className="space-y-4">
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Sign in with Google'}
              </button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>

              <button
                onClick={handleGuestLogin}
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Continue as Guest'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal; 
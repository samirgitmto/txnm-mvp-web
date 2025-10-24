import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Pages.css';

interface SubscriptionTier {
  name: string;
  price: string;
  features: string[];
  documentLimit: string;
  storageLimit: string;
}

const subscriptionTiers: SubscriptionTier[] = [
  {
    name: 'Guest',
    price: 'Free',
    features: [
      'Basic transaction analysis',
      'Limited document processing',
      'Basic analytics',
      '3-5 documents limit'
    ],
    documentLimit: '3-5 documents',
    storageLimit: 'Basic storage'
  },
  {
    name: 'Basic',
    price: '$9.99/month',
    features: [
      'Advanced transaction analysis',
      'Unlimited document processing',
      'Enhanced analytics',
      'Priority support',
      'Custom categorization'
    ],
    documentLimit: 'Limited storage',
    storageLimit: 'Standard storage'
  },
  {
    name: 'Premium',
    price: '$19.99/month',
    features: [
      'All Basic features',
      'Unlimited storage',
      'Advanced analytics',
      'Custom reporting',
      'API access',
      'Dedicated support',
      'Team collaboration'
    ],
    documentLimit: 'Unlimited documents',
    storageLimit: 'Unlimited storage'
  }
];

const Register: React.FC = () => {
  const { loginWithGoogle } = useAuth();
  const [registrationMethod, setRegistrationMethod] = useState<'google' | 'custom'>('google');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: 'individual'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement registration logic
    console.log('Form submitted:', formData);
  };

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
    } catch (err) {
      console.error('Google login failed:', err);
    }
  };

  return (
    <div className="page-container">
      <section className="register-section">
        <h1>Create Your Account</h1>
        <p className="subtitle">Join TXNM and start managing your finances today</p>

        <div className="registration-toggle">
          <button
            className={`toggle-button ${registrationMethod === 'google' ? 'active' : ''}`}
            onClick={() => setRegistrationMethod('google')}
          >
            Sign up with Google
          </button>
          <button
            className={`toggle-button ${registrationMethod === 'custom' ? 'active' : ''}`}
            onClick={() => setRegistrationMethod('custom')}
          >
            Custom Registration
          </button>
        </div>

        {registrationMethod === 'google' ? (
          <div className="google-registration">
            <button className="google-button" onClick={handleGoogleLogin}>
              <img src="/google-icon.png" alt="Google" className="google-icon" />
              Sign up with Google
            </button>
            
            <div className="subscription-tiers">
              <h2>Choose Your Plan</h2>
              <div className="tiers-grid">
                {subscriptionTiers.map((tier) => (
                  <div key={tier.name} className="tier-card">
                    <h3>{tier.name}</h3>
                    <div className="tier-price">{tier.price}</div>
                    <ul className="tier-features">
                      {tier.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                    <div className="tier-limits">
                      <p>Document Limit: {tier.documentLimit}</p>
                      <p>Storage: {tier.storageLimit}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="custom-registration">
            <div className="not-supported-banner">
              Custom registration is currently not supported. Please use Google Sign-up.
            </div>
            <form onSubmit={handleSubmit} className="register-form">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  disabled
                />
              </div>

              <div className="form-group">
                <label htmlFor="accountType">Account Type</label>
                <select
                  id="accountType"
                  name="accountType"
                  value={formData.accountType}
                  onChange={handleChange}
                  required
                  disabled
                >
                  <option value="individual">Individual</option>
                  <option value="business">Business</option>
                </select>
              </div>

              <button type="submit" className="submit-button" disabled>
                Create Account
              </button>
            </form>
          </div>
        )}

        <div className="login-link">
          Already have an account? <a href="/login">Sign in</a>
        </div>
      </section>
    </div>
  );
};

export default Register; 
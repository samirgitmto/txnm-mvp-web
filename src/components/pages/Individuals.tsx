import React from 'react';
import './Pages.css';

const Individuals: React.FC = () => {
  return (
    <div className="page-container">
      <section className="hero-section">
        <h1>Banking Solutions for Individuals</h1>
        <p className="subtitle">Manage your personal finances with ease and security</p>
      </section>

      <section className="features-section">
        <div className="feature-card">
          <h3>Personal Account Management</h3>
          <p>Track your transactions, manage your budget, and monitor your spending patterns all in one place.</p>
        </div>
        <div className="feature-card">
          <h3>Secure Transactions</h3>
          <p>Bank with confidence using our advanced security measures and real-time fraud detection.</p>
        </div>
        <div className="feature-card">
          <h3>Financial Insights</h3>
          <p>Get detailed analytics and insights about your spending habits and financial health.</p>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Get Started?</h2>
        <p>Join thousands of individuals who trust TXNM for their banking needs.</p>
        <button className="cta-button">Open an Account</button>
      </section>
    </div>
  );
};

export default Individuals; 
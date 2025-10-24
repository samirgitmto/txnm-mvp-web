import React from 'react';
import './Pages.css';

const Businesses: React.FC = () => {
  return (
    <div className="page-container">
      <section className="hero-section">
        <h1>Business Banking Solutions</h1>
        <p className="subtitle">Power your business with our comprehensive banking services</p>
      </section>

      <section className="features-section">
        <div className="feature-card">
          <h3>Business Account Management</h3>
          <p>Streamline your business finances with our powerful account management tools.</p>
        </div>
        <div className="feature-card">
          <h3>Transaction Analytics</h3>
          <p>Gain valuable insights into your business transactions and cash flow patterns.</p>
        </div>
        <div className="feature-card">
          <h3>Multi-User Access</h3>
          <p>Enable secure access for multiple team members with customizable permissions.</p>
        </div>
      </section>

      <section className="business-benefits">
        <h2>Why Choose TXNM for Your Business?</h2>
        <div className="benefits-grid">
          <div className="benefit-item">
            <h4>24/7 Support</h4>
            <p>Round-the-clock customer support for all your business needs</p>
          </div>
          <div className="benefit-item">
            <h4>Advanced Security</h4>
            <p>Enterprise-grade security to protect your business transactions</p>
          </div>
          <div className="benefit-item">
            <h4>Scalable Solutions</h4>
            <p>Grow your business with our scalable banking solutions</p>
          </div>
          <div className="benefit-item">
            <h4>Integration Ready</h4>
            <p>Seamlessly integrate with your existing business tools</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Transform Your Business Banking?</h2>
        <p>Join leading businesses that trust TXNM for their financial operations.</p>
        <button className="cta-button">Start Business Banking</button>
      </section>
    </div>
  );
};

export default Businesses; 
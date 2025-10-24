import React from 'react';
import './Pages.css';

const AboutUs: React.FC = () => {
  return (
    <div className="page-container">
      <section className="hero-section">
        <h1>About TXNM</h1>
        <p className="subtitle">Revolutionizing Banking for Everyone</p>
      </section>

      <section className="about-section">
        <div className="mission-vision">
          <div className="mission">
            <h2>Our Mission</h2>
            <p>To provide accessible, secure, and innovative banking solutions that empower individuals and businesses to achieve their financial goals.</p>
          </div>
          <div className="vision">
            <h2>Our Vision</h2>
            <p>To be the leading digital banking platform that transforms how people manage their finances through technology and exceptional service.</p>
          </div>
        </div>

        <div className="values-section">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-item">
              <h3>Innovation</h3>
              <p>Continuously improving our services through cutting-edge technology</p>
            </div>
            <div className="value-item">
              <h3>Security</h3>
              <p>Protecting our customers' data and assets with the highest standards</p>
            </div>
            <div className="value-item">
              <h3>Accessibility</h3>
              <p>Making banking services available to everyone, everywhere</p>
            </div>
            <div className="value-item">
              <h3>Trust</h3>
              <p>Building lasting relationships through transparency and reliability</p>
            </div>
          </div>
        </div>

        <div className="team-section">
          <h2>Our Leadership Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <h3>John Doe</h3>
              <p className="position">Chief Executive Officer</p>
              <p>20+ years of experience in financial technology</p>
            </div>
            <div className="team-member">
              <h3>Jane Smith</h3>
              <p className="position">Chief Technology Officer</p>
              <p>Expert in banking systems and security</p>
            </div>
            <div className="team-member">
              <h3>Mike Johnson</h3>
              <p className="position">Chief Operations Officer</p>
              <p>Specialized in financial operations and compliance</p>
            </div>
          </div>
        </div>

        <div className="contact-section">
          <h2>Get in Touch</h2>
          <p>Have questions? We'd love to hear from you.</p>
          <div className="contact-info">
            <div className="contact-item">
              <h3>Email</h3>
              <p>contact@txnm.com</p>
            </div>
            <div className="contact-item">
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
            <div className="contact-item">
              <h3>Address</h3>
              <p>123 Banking Street<br />Financial District<br />New York, NY 10004</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs; 
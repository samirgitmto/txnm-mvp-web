import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="/">TXNM</Link>
        </div>
        <nav className="nav-tabs">
          <Link 
            to="/individuals" 
            className={`nav-tab ${isActive('/individuals') ? 'active' : ''}`}
          >
            Individuals
          </Link>
          <Link 
            to="/businesses" 
            className={`nav-tab ${isActive('/businesses') ? 'active' : ''}`}
          >
            Businesses
          </Link>
          <Link 
            to="/register" 
            className={`nav-tab ${isActive('/register') ? 'active' : ''}`}
          >
            Register
          </Link>
          <Link 
            to="/about" 
            className={`nav-tab ${isActive('/about') ? 'active' : ''}`}
          >
            About Us
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header; 
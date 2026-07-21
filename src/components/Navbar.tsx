import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/IIAS_Logo.png';

export default function Navbar() {
  const { user } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Library', path: '/library' },
    { label: 'Academics & Fellowships', path: '/academics' },
    { label: 'Publications', path: '/publications' },
    { label: 'Administration', path: '/administration' },
    { label: 'For Tourists', path: '/tourists' },
  ];

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header className="iias-header">
      {/* Top Banner Ticker */}
      <div className="iias-topbar">
        <div className="topbar-content">
          <span>🏛️ <strong>Rashtrapati Nivas (Viceregal Lodge), Shimla - 171005</strong></span>
          <div className="topbar-links">
            <a href="tel:+911772831370">📞 +91 (177) 2831370</a>
            <span className="divider">|</span>
            <a href="mailto:info@iias.ac.in">✉️ info@iias.ac.in</a>
          </div>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="iias-nav-container">
        <Link to="/" className="iias-brand">
          <img src={logoImg} alt="IIAS Shimla Emblem" className="brand-logo" />
          <div className="brand-text">
            <span className="brand-title-hindi">भारतीय उच्च अध्ययन संस्थान</span>
            <span className="brand-title-en">Indian Institute of Advanced Study</span>
            <span className="brand-subtitle">Rashtrapati Nivas, Shimla • Established 1964</span>
          </div>
        </Link>

        {/* Mobile menu toggle */}
        <button
          className="mobile-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation"
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>

        {/* Desktop Navigation */}
        <nav className={`iias-nav ${mobileMenuOpen ? 'open' : ''}`}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.label}
            </Link>
          ))}

          <div className="nav-auth-action">
            {user ? (
              <Link to="/dashboard" className="btn btn-portal active-portal" onClick={() => setMobileMenuOpen(false)}>
                <span>👤 Portal ({user.role === 'admin' ? 'Admin' : 'Dashboard'})</span>
              </Link>
            ) : (
              <Link to="/auth" className="btn btn-portal" onClick={() => setMobileMenuOpen(false)}>
                <span>🔒 Staff & Fellow Portal</span>
              </Link>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}

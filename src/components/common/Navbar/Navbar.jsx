import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRightRef = useRef(null);
  const location = useLocation();

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) => !prev);
    // Prevent body scroll when menu is open
    document.body.style.overflow = !isMenuOpen ? 'hidden' : 'auto';
  };

  const handleLinkClick = () => {
    setIsMenuOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Sync navbar background color with menu state
  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    navbar.style.background = isMenuOpen
      ? 'rgba(4, 6, 14, 0.98)'
      : 'rgba(4, 6, 14, 0.55)';
  }, [isMenuOpen]);

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <div className="navbar-container">

        {/* Left — Brand Logo Blocks */}
        <div className="nav-left">
          <div className="brand-block">
            <img src="/images/logos/iem.webp" alt="IEM" />
          </div>
          <div className="brand-block large-block">
            <img src="/images/logos/esummit_f.jpg" alt="BENGAL E-SUMMIT 2026" />
          </div>
          <div className="brand-block">
            <img src="/images/logos/uem.webp" alt="UEM" />
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div
          className={`mobile-menu-btn${isMenuOpen ? ' active' : ''}`}
          id="mobile-menu-btn"
          onClick={handleMenuToggle}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Right — Navigation Links */}
        <div
          className={`nav-right${isMenuOpen ? ' active' : ''}`}
          id="nav-right"
          ref={navRightRef}
        >
          <Link to="/"          className={`nav-link${isActive('/') ? ' active' : ''}`} onClick={handleLinkClick}>HOME</Link>
          <Link to="/events"    className={`nav-link${isActive('/events') ? ' active' : ''}`} onClick={handleLinkClick}>EVENTS</Link>
          <Link to="/flashback" className={`nav-link${isActive('/flashback') ? ' active' : ''}`} onClick={handleLinkClick}>FLASHBACK</Link>
          <Link to="/partners"  className={`nav-link${isActive('/partners') ? ' active' : ''}`} onClick={handleLinkClick}>PARTNERS</Link>
          <Link to="/teams"     className={`nav-link${isActive('/teams') ? ' active' : ''}`} onClick={handleLinkClick}>TEAM</Link>
          <a href="#register"   className="btn-register" onClick={handleLinkClick}>REGISTER</a>
        </div>

      </div>
    </nav>
  );
}

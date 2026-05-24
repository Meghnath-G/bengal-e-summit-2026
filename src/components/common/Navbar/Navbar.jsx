import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import bgm from '../../../assets/bgm.mp3';
import './Navbar.css';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRightRef = useRef(null);
  const location = useLocation();

  const audioRef = useRef(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    audioRef.current = new Audio(bgm);

    // Automatically play theme music by default
    audioRef.current.play().catch(err => {
      console.warn("Autoplay prevented:", err);
    });

    const handleEnded = () => {
      // Audio ended
    };
    audioRef.current.addEventListener('ended', handleEnded);

    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('ended', handleEnded);
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;

    // If playback was blocked initially by browser policies, ensure it starts
    if (audioRef.current.paused) {
      audioRef.current.play().catch(err => {
        console.error("Audio playback failed:", err);
      });
    }

    const newMutedState = !isMuted;
    audioRef.current.muted = newMutedState;
    setIsMuted(newMutedState);
  };

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
          <Link to="/" className={`nav-link${isActive('/') ? ' active' : ''}`} onClick={handleLinkClick}>HOME</Link>
          <Link to="/events" className={`nav-link${isActive('/events') ? ' active' : ''}`} onClick={handleLinkClick}>EVENTS</Link>
          <Link to="/flashback" className={`nav-link${isActive('/flashback') ? ' active' : ''}`} onClick={handleLinkClick}>FLASHBACK</Link>
          <Link to="/partners" className={`nav-link${isActive('/partners') ? ' active' : ''}`} onClick={handleLinkClick}>PARTNERS</Link>
          <Link to="/teams" className={`nav-link${isActive('/teams') ? ' active' : ''}`} onClick={handleLinkClick}>TEAM</Link>
          <a href="https://forms.gle/CVJszvgztG12A59Y7" className="btn-register" onClick={handleLinkClick}>REGISTER</a>
          <button
            className="btn-music-toggle"
            onClick={toggleAudio}
            aria-label={isMuted ? "Unmute theme music" : "Mute theme music"}
          >
            {isMuted ? (
              <svg viewBox="0 0 24 24" className="music-icon">
                <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="music-icon">
                <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
              </svg>
            )}
          </button>
        </div>

      </div>
    </nav>
  );
}

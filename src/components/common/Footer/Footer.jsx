import './Footer.css';

export default function Footer() {
  return (
    <footer className="cinematic-footer">
      <div className="footer-top-border"></div>
      
      <div className="footer-container">
        
        {/* Left Side: Brand & Mission */}
        <div className="footer-column footer-left">
          <h3 className="footer-brand-title">BENGAL E-SUMMIT 2026</h3>
          <p className="footer-description">
            An experience at Institute of Engineering and Management (IEM), Kolkata where founders, investors, thought leaders, and changemakers gather to shape the future of Bengal's entrepreneurial and technological landscape.
          </p>
        </div>

        {/* Center: Brochure CTA */}
        <div className="footer-column footer-center">
          <a href="#" className="cinematic-brochure-btn">
            <span className="btn-glow"></span>
            <span className="btn-text">Download Brochure</span>
          </a>
        </div>

        {/* Right Side: Contact Info */}
        <div className="footer-column footer-right">
          <div className="contact-item">
            <span className="contact-icon">⚲</span>
            <p>Institute of Engineering and Management (IEM), Gurukul Building</p>
          </div>
          
          <div className="contact-item">
            <span className="contact-icon">✉</span>
            <a href="mailto:bengalesummit@gmail.com" className="contact-link">bengalesummit@gmail.com</a>
          </div>
        </div>

      </div>

      <div className="footer-bottom-glow"></div>
    </footer>
  );
}

import { useEffect } from 'react';
import { gsap } from 'gsap';
import '../styles/FooterCTA.css';

export default function FooterCTA() {
  useEffect(() => {
    gsap.fromTo('.footer-content',
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: '#footer-cta', start: 'top 80%' }
      }
    );
  }, []);

  return (
    <footer id="footer-cta" className="section-footer">
      <div className="footer-content">
        <p className="footer-sub">THE STORY NEVER ENDS</p>
        <h2 className="footer-heading">
          THE LEGACY CONTINUES<br />
          <span className="footer-year">— AUGUST 2026</span>
        </h2>
        <div className="footer-rule"></div>
        <div className="footer-chevron">
          {/* Kept exactly empty as per index.html */}
        </div>
      </div>
    </footer>
  );
}

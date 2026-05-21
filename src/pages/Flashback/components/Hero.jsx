import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../styles/Hero.css';

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo('#hero-eyebrow',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.9 }
    )
      .fromTo('#hero-title',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9 },
        '-=0.6'
      )
      .fromTo('#hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.6'
      )
      .fromTo('#hero-divider',
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.7, transformOrigin: 'center' },
        '-=0.5'
      )
      .fromTo('#hero-stats',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.4'
      )
      .fromTo('#hero-scroll-cue',
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        '-=0.2'
      );
  }, []);

  return (
    <section id="hero" ref={heroRef}>
      <div className="hero-content">
        <p className="hero-eyebrow" id="hero-eyebrow">THROUGH THE YEARS</p>
        <h1 className="hero-title" id="hero-title">FLASHBACK</h1>
        <p className="hero-subtitle" id="hero-subtitle">Bengal E-Summit — A Legacy of Innovation</p>
        <div className="hero-divider" id="hero-divider"></div>
        <p className="hero-stats" id="hero-stats">3 YEARS &nbsp;·&nbsp; 10,000+ ATTENDEES</p>
      </div>
      <div className="hero-scroll-cue" id="hero-scroll-cue">
        <span className="chevron-down">&#10094;</span>
      </div>
    </section>
  );
}

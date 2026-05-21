import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '../hooks/useGSAP';
import './Hero.css';

export default function Hero() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".hero-title, .hero-subtitle, .hero-divider, .hero-tagline", {
      y: 30,
      opacity: 0,
      duration: 1.2,
      stagger: 0.15,
      ease: "power3.out",
      delay: 0.2
    });
  }, []);

  return (
    <section className="hero" id="hero" ref={containerRef}>
      <div className="hero-content">
        <h1 className="hero-title">EVENTS</h1>
        <p className="hero-subtitle">ALL EVENTS · BENGAL E-SUMMIT 2026</p>
        <div className="hero-divider"></div>
        <p className="hero-tagline">The Path of Ascension</p>
      </div>
      <div className="scroll-cue" aria-label="Scroll down">⌄</div>
    </section>
  );
}

import React from 'react';
import ScrollReveal from './ScrollReveal';

export default function PageHero({ eyebrow = "BENGAL E-SUMMIT 2026", title = "PARTNERS", subtitle = "The forces that make it possible." }) {
  return (
    <header className="hero">
      <ScrollReveal baseClass="section-heading-reveal" className="hero-content">
        <span className="hero-eyebrow">{eyebrow}</span>
        <h1 className="hero-heading">
          <span className="hero-line1">{title}</span>
        </h1>
        <div className="hero-divider"></div>
        <p className="hero-subtext">{subtitle}</p>
      </ScrollReveal>
    </header>
  );
}

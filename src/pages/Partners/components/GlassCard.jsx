import React from 'react';
import ScrollReveal from './ScrollReveal';

export default function GlassCard({ title, children, className = '' }) {
  return (
    <section className={`partners-section section-glass ${className}`}>
      <ScrollReveal baseClass="section-heading-reveal">
        <h2 className="section-title">{title}</h2>
      </ScrollReveal>
      
      {children}
    </section>
  );
}
